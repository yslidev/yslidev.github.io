#!/usr/bin/env python3
"""Convert an Apple Health export into the desk's health/summary.json.

Usage:
  1. iPhone: Health app -> profile photo -> Export All Health Data
  2. AirDrop export.zip to your Mac and unzip it
  3. python3 scripts/apple_health_to_summary.py path/to/apple_health_export/export.xml
  4. Commit the printed summary.json to the brain repo at health/summary.json

The export.xml can be hundreds of MB; this streams it with iterparse and
keeps only daily aggregates for the last DAYS days.
"""

import json
import sys
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

DAYS = 120

STEP_TYPE = "HKQuantityTypeIdentifierStepCount"
SLEEP_TYPE = "HKCategoryTypeIdentifierSleepAnalysis"
RHR_TYPE = "HKQuantityTypeIdentifierRestingHeartRate"

# Sleep records whose value contains one of these count as actual sleep
ASLEEP_MARKERS = ("Asleep",)


def parse_apple_date(value: str) -> datetime:
    # e.g. "2026-07-01 23:41:02 -0700"
    return datetime.strptime(value, "%Y-%m-%d %H:%M:%S %z")


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(f"usage: {sys.argv[0]} path/to/export.xml")

    xml_path = Path(sys.argv[1])
    if not xml_path.exists():
        sys.exit(f"not found: {xml_path}")

    cutoff = date.today() - timedelta(days=DAYS)

    steps: dict[str, float] = defaultdict(float)
    sleep_seconds: dict[str, float] = defaultdict(float)
    rhr_values: dict[str, list[float]] = defaultdict(list)

    for _, elem in ET.iterparse(str(xml_path), events=("end",)):
        if elem.tag != "Record":
            continue
        rtype = elem.get("type")
        if rtype not in (STEP_TYPE, SLEEP_TYPE, RHR_TYPE):
            elem.clear()
            continue
        try:
            start = parse_apple_date(elem.get("startDate", ""))
        except ValueError:
            elem.clear()
            continue
        day = start.date()
        if day < cutoff:
            elem.clear()
            continue
        key = day.isoformat()

        if rtype == STEP_TYPE:
            try:
                steps[key] += float(elem.get("value", "0"))
            except ValueError:
                pass
        elif rtype == RHR_TYPE:
            try:
                rhr_values[key].append(float(elem.get("value", "0")))
            except ValueError:
                pass
        elif rtype == SLEEP_TYPE:
            value = elem.get("value", "")
            if any(marker in value for marker in ASLEEP_MARKERS):
                try:
                    end = parse_apple_date(elem.get("endDate", ""))
                    sleep_seconds[key] += (end - start).total_seconds()
                except ValueError:
                    pass
        elem.clear()

    all_days = sorted(set(steps) | set(sleep_seconds) | set(rhr_values))
    days_out = []
    for key in all_days:
        entry: dict[str, object] = {"date": key}
        if key in steps:
            entry["steps"] = round(steps[key])
        if key in sleep_seconds:
            entry["sleep_hours"] = round(sleep_seconds[key] / 3600, 2)
        if key in rhr_values:
            entry["resting_hr"] = round(
                sum(rhr_values[key]) / len(rhr_values[key]), 1
            )
        days_out.append(entry)

    summary = {"updated": date.today().isoformat(), "days": days_out}

    out_path = Path("summary.json")
    out_path.write_text(json.dumps(summary, indent=2) + "\n")
    print(f"wrote {out_path} with {len(days_out)} days")
    print("-> commit it to the brain repo as health/summary.json")


if __name__ == "__main__":
    main()
