// Interactive figures for "Is a personal agent an executive assistant, a coworker, or a friend?"
//
// One IIFE per <d-figure>. Bars are HTML with CSS transitions (they animate
// when the figure scrolls into view); the map and the heatmap are SVG so they
// can be hovered point by point. Every number here is the one in the essay;
// nothing is interpolated.

(function () {
  // Site palette: teal from the banner water, persimmon from the logo, ink.
  const C = {
    sec: '#1a7a9e',      // executive assistant / coworker (teal-dark)
    chat: '#64cad1',     // assistants that live inside a chat app (teal)
    friend: '#f97316',   // companion (persimmon)
    gray: '#a7b4b7',
    ink: '#0c1c20',
    soft: 'rgba(0,0,0,0.5)',
    cn: '#f97316', os: '#1a7a9e', na: '#d6e3e5',
  };
  const $ = (root, sel) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Run fn once when the element first scrolls into view (or right away).
  function onVisible(node, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); fn(); }
    }, { threshold: 0.25 });
    io.observe(node);
  }

  // Segmented buttons: [{key,label}], calls onPick(key).
  function seg(host, items, onPick, initial) {
    const wrap = document.createElement('div');
    wrap.className = 'pa-seg';
    items.forEach(it => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = it.label; b.dataset.key = it.key;
      b.addEventListener('click', () => pick(it.key));
      wrap.appendChild(b);
    });
    function pick(k) {
      wrap.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.key === k));
      onPick(k);
    }
    host.appendChild(wrap);
    pick(initial ?? items[0].key);
    return pick;
  }

  // Horizontal bar list; returns a set(rows) function that animates.
  function hbars(host, opts = {}) {
    const box = document.createElement('div');
    box.className = 'pa-hbars';
    host.appendChild(box);
    return function set(rows, max) {
      const m = max || Math.max(...rows.map(r => r.v));
      box.innerHTML = rows.map(r => `
        <div class="pa-hrow" title="${esc(r.label)}: ${esc(r.text ?? r.v)}">
          <span class="pa-hlab">${esc(r.label)}</span>
          <span class="pa-htrack"><i style="width:0;background:${r.color || C.sec}"></i></span>
          <span class="pa-hval">${esc(r.text ?? r.v)}</span>
        </div>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        box.querySelectorAll('.pa-htrack i').forEach((i, k) => {
          i.style.width = (100 * rows[k].v / m) + '%';
        });
      }));
    };
  }

  // Vertical bars; returns set(rows) that animates heights.
  function vbars(host, height = 170) {
    const box = document.createElement('div');
    box.className = 'pa-vbars';
    box.style.height = height + 'px';
    host.appendChild(box);
    return function set(rows, max) {
      const m = max || Math.max(...rows.map(r => r.v));
      box.innerHTML = rows.map(r => `
        <div class="pa-vcol" title="${esc(r.label)}: ${esc(r.text ?? r.v)}">
          <span class="pa-vval">${esc(r.text ?? r.v)}</span>
          <span class="pa-vbar" style="height:0;background:${r.color || C.sec}"></span>
          <span class="pa-vlab">${r.label}</span>
        </div>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        box.querySelectorAll('.pa-vbar').forEach((b, k) => {
          b.style.height = Math.max(2, (height - 46) * rows[k].v / m) + 'px';
        });
      }));
    };
  }

  // ------------------------------------------------------------------ landscape
  (function () {
    const HOST = document.getElementById('landscape-figure');
    if (!HOST) return;
    const rows = [
      ['Grok Bot', 'xAI', '2026.8', 'beta', 'own app + cloud PC', 'multi-step background tasks', 'coworker'],
      ['Meta Muse', 'Meta', '2026.9', 'Sept 8', 'own app, WhatsApp', 'schedule, shopping, goals', 'executive assistant'],
      ['OpenAI Dots', 'OpenAI', '2026.9', 'Sept 29', 'ChatGPT / Codex', 'restaurants to websites, "does it all"', 'executive assistant + coworker'],
      ['Claude Duet', 'Anthropic', '2026.10', 'research preview', 'standalone app', 'briefings, inbox, calendar, drafts', 'coworker'],
      ['Gemini Spark', 'Google', '2026.5', 'I/O', 'Gemini app, Gmail', 'Workspace-connected, always on', 'executive assistant + coworker'],
      ['Instinct', 'Instinct', '2026.8', 'early access', 'iMessage, phone', 'travel, groceries, cancel subs', 'executive assistant'],
      ['Poke', 'Interaction Co.', '2025', '2025–26', 'iMessage / SMS', 'automations by text', 'executive assistant (with a personality)'],
      ['Tab', 'Tab', '2026', 'out of stealth', 'iMessage, WhatsApp', 'calls, flights, payments', 'executive assistant'],
      ['Town', 'Town', '2026.6', 'June', 'work email / calendar', 'an assistant for every employee', 'coworker'],
      ['Tolan', 'Portola', '2024', '2024–', 'own app', 'an alien friend to talk to', 'friend'],
    ];
    const col = t => t.includes('friend') ? C.friend : t.includes('personality') ? '#3aa8b2' : C.sec;
    HOST.innerHTML = `
      <p class="fig-title">Personal agents of 2026</p>
      <p class="fig-subtitle">The personal agents that launched or made news in 2026. Filter by what each one is pitched as.</p>
      <div class="pa-controls"></div>
      <div class="pa-tablewrap"><table class="pa-table">
        <thead><tr><th>Product</th><th>Company</th><th>Launch</th><th>Lives in</th><th>Pitched as</th><th>Type</th></tr></thead>
        <tbody>${rows.map(r => `<tr data-type="${esc(r[6])}"><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td>
          <td>${esc(r[2])} <span class="pa-dim">${esc(r[3])}</span></td><td>${esc(r[4])}</td><td>${esc(r[5])}</td>
          <td><span class="pa-pill" style="--c:${col(r[6])}">${esc(r[6])}</span></td></tr>`).join('')}</tbody>
      </table></div>
      <figcaption>Sources: company announcements and coverage by TechCrunch, CNBC, Engadget, a16z and others (May–Nov 2026); some launch dates vary by source. The type column is my classification by each product's headline features.</figcaption>`;
    const trs = HOST.querySelectorAll('tbody tr');
    seg($(HOST, '.pa-controls'), [
      { key: 'all', label: 'all 10' }, { key: 'executive assistant', label: 'executive assistant' },
      { key: 'coworker', label: 'coworker' }, { key: 'friend', label: 'friend' },
    ], k => trs.forEach(tr => tr.classList.toggle('pa-out', k !== 'all' && !tr.dataset.type.includes(k))));
  })();

  // ------------------------------------------------------------------ positioning map
  (function () {
    const HOST = document.getElementById('map-figure');
    if (!HOST) return;
    const pts = [
      ['Grok Bot', 1.0, 8.9, 'sec', 'xAI · always-on agents with their own cloud computers'],
      ['Claude Duet', 1.9, 8.4, 'sec', 'Anthropic · briefings, inbox, calendar, drafts'],
      ['Town', 1.2, 7.7, 'sec', 'an assistant for every employee', '$1B valuation'],
      ['OpenAI Dots', 2.5, 9.1, 'sec', 'OpenAI · restaurants to websites'],
      ['Gemini Spark', 2.9, 8.0, 'sec', 'Google · Workspace-connected, always on'],
      ['Doubao', 2.2, 6.8, 'sec', "ByteDance's phone assistant"],
      ['Tab', 3.4, 7.2, 'chat', 'lives in iMessage and WhatsApp'],
      ['Instinct', 4.3, 8.7, 'chat', 'lives in iMessage', '$10B valuation'],
      ['Meta Muse', 4.4, 6.6, 'chat', 'own app and WhatsApp'],
      ['Poke', 5.4, 5.8, 'chat', 'iMessage / SMS, with a personality'],
      ['ChatGPT', 4.6, 5.4, 'gray', 'the general-purpose chatbot, for reference'],
      ['Tolan', 7.6, 3.4, 'friend', 'an alien friend to talk to', '~$60M raised in total'],
      ['Character.AI', 7.6, 2.4, 'friend', 'AI characters to chat with'],
      ['XiaoIce (2014)', 6.8, 1.4, 'friend', "Microsoft's empathetic chatbot, where this story starts"],
    ];
    const col = { sec: C.sec, chat: C.chat, friend: C.friend, gray: C.gray };
    const W = 640, H = 460, P = 36, sx = x => P + x / 10 * (W - 2 * P), sy = y => H - P - y / 10 * (H - 2 * P);
    HOST.innerHTML = `
      <p class="fig-title">Where personal agents sit</p>
      <p class="fig-subtitle">x: warmth (EQ) · y: gets things done (IQ). Hover a dot. Positions are placed by hand, not measured.</p>
      <div class="fig-legend">
        <span><i style="background:${C.sec}"></i>assistant / work tool</span>
        <span><i style="background:${C.chat}"></i>lives inside a chat app</span>
        <span><i style="background:${C.friend}"></i>companion</span>
      </div>
      <div class="pa-controls"></div>
      <div class="pa-mapwrap">
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Personal agents placed by warmth and usefulness">
          <rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}" fill="#fbfdfd" stroke="#b2dce2"/>
          <line x1="${W / 2}" y1="${P}" x2="${W / 2}" y2="${H - P}" stroke="#b2dce2" stroke-dasharray="3 3"/>
          <line x1="${P}" y1="${H / 2}" x2="${W - P}" y2="${H / 2}" stroke="#b2dce2" stroke-dasharray="3 3"/>
          <text x="${P + 8}" y="${P + 18}" class="pa-q" fill="${C.sec}">executive assistant / coworker</text>
          <text x="${W - P - 8}" y="${H - P - 10}" class="pa-q" text-anchor="end" fill="${C.friend}">friend / companion</text>
          <text x="${P}" y="${H - 10}" class="pa-ax">cold</text><text x="${W - P}" y="${H - 10}" class="pa-ax" text-anchor="end">warm</text>
          <text x="12" y="${H - P}" class="pa-ax" transform="rotate(-90 12 ${H - P})">chat</text>
          <text x="12" y="${P + 30}" class="pa-ax" transform="rotate(-90 12 ${P + 30})">tasks</text>
          <g class="pa-money"></g>
          ${pts.map((p, i) => `<g class="pa-pt" data-i="${i}" tabindex="0">
            <circle cx="${sx(p[1])}" cy="${sy(p[2])}" r="6.5" fill="${col[p[3]]}" stroke="#fff" stroke-width="1.5"/>
            <text x="${sx(p[1]) + 11}" y="${sy(p[2]) + 4}" class="pa-lab">${esc(p[0])}</text></g>`).join('')}
        </svg>
        <p class="pa-read"></p>
      </div>
      <figcaption>Dark teal: officially positioned as an assistant or work tool. Light teal: an assistant that lives inside iMessage / WhatsApp. Orange: companion. Money figures are as reported: valuations for Instinct and Town, total funding raised for Tolan.</figcaption>`;
    const svg = $(HOST, 'svg'), read = $(HOST, '.pa-read'), money = $(HOST, '.pa-money');
    const idle = 'Hover or tap a dot to see what it is.';
    read.textContent = idle;
    function show(i) {
      svg.querySelectorAll('.pa-pt').forEach(g => g.classList.toggle('pa-dimmed', i != null && +g.dataset.i !== i));
      if (i == null) { read.textContent = idle; return; }
      const p = pts[i];
      read.innerHTML = `<b>${esc(p[0])}</b>: ${esc(p[4])}${p[5] ? ` · <span style="color:#7a2a00">${esc(p[5])}</span>` : ''}`;
    }
    svg.addEventListener('mouseover', e => { const g = e.target.closest('.pa-pt'); if (g) show(+g.dataset.i); });
    svg.addEventListener('mouseleave', () => show(null));
    svg.addEventListener('click', e => { const g = e.target.closest('.pa-pt'); show(g ? +g.dataset.i : null); });
    seg($(HOST, '.pa-controls'), [{ key: 'off', label: 'positions' }, { key: 'on', label: 'show the money' }], k => {
      money.innerHTML = k === 'on' ? pts.map(p => {
        if (!p[5]) return '';
        const r = p[0] === 'Instinct' ? 46 : p[0] === 'Town' ? 26 : 9;
        return `<circle cx="${sx(p[1])}" cy="${sy(p[2])}" r="${r}" fill="${col[p[3]]}" opacity="0.18" class="pa-grow"/>
                <text x="${sx(p[1])}" y="${sy(p[2]) - r - 5}" text-anchor="middle" class="pa-moneylab">${esc(p[5])}</text>`;
      }).join('') : '';
    });
  })();

  // ------------------------------------------------------------------ non-work share (waffle)
  (function () {
    const HOST = document.getElementById('nonwork-figure');
    if (!HOST) return;
    HOST.innerHTML = `
      <p class="fig-title">ChatGPT consumer messages not about work</p>
      <p class="fig-subtitle">100 messages from ChatGPT's consumer plans. Orange: not about work.</p>
      <div class="pa-controls"></div>
      <div class="pa-waffle-row"><div class="pa-waffle">${'<i></i>'.repeat(100)}</div><div class="pa-big"></div></div>
      <figcaption>Source: OpenAI Economic Research and David Deming (Harvard), "How People Use ChatGPT," NBER working paper, Sept 2025; ~1.5M conversations, consumer plans only. OpenAI's own summary says "about 70%".</figcaption>`;
    const cells = HOST.querySelectorAll('.pa-waffle i'), big = $(HOST, '.pa-big');
    const vals = { y24: 53, y25: 73 };
    let picked = 'y24';
    function paint(k) {
      const n = vals[k];
      cells.forEach((c, i) => { c.style.background = i < n ? C.friend : '#e3eef0'; c.style.transitionDelay = (i * 6) + 'ms'; });
      big.innerHTML = `<b>${n}%</b><span>not about work, June ${k === 'y24' ? '2024' : '2025'}</span>`;
    }
    const pick = seg($(HOST, '.pa-controls'), [{ key: 'y24', label: 'June 2024' }, { key: 'y25', label: 'June 2025' }], k => { picked = k; paint(k); });
    onVisible(HOST, () => setTimeout(() => pick('y25'), 700));
  })();

  // ------------------------------------------------------------------ daily minutes
  (function () {
    const HOST = document.getElementById('minutes-figure');
    if (!HOST) return;
    HOST.innerHTML = `
      <p class="fig-title">Minutes a day in the app</p>
      <p class="fig-subtitle">Average minutes a day spent in the app.</p>
      <div class="pa-chart"></div>
      <figcaption>Sources: TikTok, eMarketer forecast for US adults, April 2025 (paywalled; the figure is consistently cited elsewhere). Character.AI, the CEO's public figure: ~6M daily users, 70–80 minutes a day (self-reported, not third-party measured; bar drawn at the 75-minute midpoint).</figcaption>`;
    const set = hbars($(HOST, '.pa-chart'));
    set([{ label: 'TikTok (US adults)', v: 0, text: '' }, { label: 'Character.AI (per user)', v: 0, text: '' }], 90);
    onVisible(HOST, () => set([
      { label: 'TikTok (US adults)', v: 52, text: '~52 min', color: C.gray },
      { label: 'Character.AI (per user)', v: 75, text: '70–80 min', color: C.friend },
    ], 90));
  })();

  // ------------------------------------------------------------------ retention
  (function () {
    const HOST = document.getElementById('retention-figure');
    if (!HOST) return;
    const d = { d1: [73.3, 41.3], d14: [22.5, 26.8] };
    HOST.innerHTML = `
      <p class="fig-title">New-install return rate: Meta Muse vs ChatGPT</p>
      <p class="fig-subtitle">Share of new installs that came back, September 2026. Only these two days are measured, so no curve is drawn between them.</p>
      <div class="fig-legend"><span><i style="background:${C.chat}"></i>Meta Muse</span><span><i style="background:${C.gray}"></i>ChatGPT</span></div>
      <div class="pa-controls"></div>
      <div class="pa-chart"></div>
      <p class="pa-read"></p>
      <figcaption>Source: Sensor Tower, Sept 2026, posted on X by Deedy Das (Menlo Ventures) and reported by eWeek on Oct 14, 2026; new installs across 81 countries. Other trackers measure differently, so their numbers don't mix with these.</figcaption>`;
    const set = hbars($(HOST, '.pa-chart')), read = $(HOST, '.pa-read');
    function show(k) {
      const [m, g] = d[k];
      set([{ label: 'Meta Muse', v: m, text: m + '%', color: C.chat }, { label: 'ChatGPT', v: g, text: g + '%', color: C.gray }], 80);
      read.innerHTML = k === 'd1'
        ? `<b>Day 1:</b> Muse ${m}%, ChatGPT ${g}%.`
        : `<b>Day 14:</b> Muse ${m}%, ChatGPT ${g}%.`;
    }
    const pick = seg($(HOST, '.pa-controls'), [{ key: 'd1', label: 'day 1' }, { key: 'd14', label: 'day 14' }], show);
    onVisible(HOST, () => setTimeout(() => pick('d14'), 1600));
  })();

  // ------------------------------------------------------------------ daily heatmap
  (function () {
    const HOST = document.getElementById('heatmap-figure');
    if (!HOST) return;
    const DAYS = {"2026-06-03":5,"2026-06-04":5,"2026-06-06":2,"2026-06-07":2,"2026-06-08":6,"2026-06-10":1,"2026-07-08":1,"2026-07-26":1,"2026-08-06":1,"2026-08-13":1,"2026-08-21":2,"2026-08-22":2,"2026-08-23":6,"2026-08-24":3,"2026-08-25":3,"2026-08-26":5,"2026-08-27":8,"2026-08-28":1,"2026-08-29":1,"2026-08-30":2,"2026-08-31":4,"2026-09-01":4,"2026-09-02":9,"2026-09-03":14,"2026-09-04":9,"2026-09-05":8,"2026-09-06":4,"2026-09-07":3,"2026-09-08":11,"2026-09-09":7,"2026-09-10":11,"2026-09-11":5,"2026-09-12":8,"2026-09-13":2,"2026-09-14":12,"2026-09-15":18,"2026-09-16":24,"2026-09-17":16,"2026-09-18":12,"2026-09-19":13,"2026-09-20":4,"2026-09-21":6,"2026-09-22":10,"2026-09-23":4,"2026-09-24":2,"2026-09-25":2,"2026-09-26":3,"2026-09-27":4,"2026-09-28":1,"2026-09-29":4,"2026-09-30":20,"2026-10-01":7,"2026-10-02":7,"2026-10-03":9,"2026-10-04":5,"2026-10-05":13,"2026-10-06":12,"2026-10-07":3,"2026-10-08":6,"2026-10-09":6,"2026-10-10":5,"2026-10-11":2,"2026-10-12":8,"2026-10-13":5,"2026-10-14":9,"2026-10-15":14,"2026-10-16":13,"2026-10-17":1,"2026-10-18":11,"2026-10-19":3,"2026-10-20":8,"2026-10-21":7,"2026-10-22":3,"2026-10-23":7,"2026-10-24":4,"2026-10-26":4,"2026-10-27":6,"2026-10-28":7,"2026-10-29":4,"2026-10-30":5,"2026-10-31":2,"2026-11-01":4,"2026-11-02":4,"2026-11-03":3,"2026-11-04":4,"2026-11-05":7,"2026-11-06":2,"2026-11-07":13,"2026-11-08":2,"2026-11-09":4,"2026-11-10":1,"2026-11-11":1,"2026-11-12":3,"2026-11-13":6,"2026-11-16":1};
    const shades = ['#eef4f5', '#c9ecef', '#8fd9e0', '#3aa8b2', '#1a7a9e'];
    const shade = n => !n ? shades[0] : n <= 2 ? shades[1] : n <= 5 ? shades[2] : n <= 10 ? shades[3] : shades[4];
    const start = new Date(Date.UTC(2026, 5, 1)), first = new Date(Date.UTC(2026, 5, 3)), last = new Date(Date.UTC(2026, 10, 16));
    const CELL = 14, GAP = 3, L = 34, T = 22, weeks = 25;
    let cells = '', months = '';
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const day = new Date(start.getTime() + (w * 7 + d) * 864e5);
        if (day < first || day > last) continue;
        const key = day.toISOString().slice(0, 10), n = DAYS[key] || 0;
        cells += `<rect class="pa-day" x="${L + w * (CELL + GAP)}" y="${T + d * (CELL + GAP)}" width="${CELL}" height="${CELL}" rx="2.5"
                   fill="${shade(n)}" data-k="${key}" data-n="${n}"/>`;
      }
      const wd = new Date(start.getTime() + w * 7 * 864e5);
      if (wd.getUTCDate() <= 7) months += `<text x="${L + w * (CELL + GAP)}" y="${T - 8}" class="pa-ax">${wd.toLocaleString('en', { month: 'short', timeZone: 'UTC' })}</text>`;
    }
    const aw = L + 8 * (CELL + GAP) + 6, ae = L + 13 * (CELL + GAP) - GAP;
    const W = L + weeks * (CELL + GAP) + 6, H = T + 7 * (CELL + GAP) + 34;
    HOST.innerHTML = `
      <p class="fig-title">Task sessions per day</p>
      <p class="fig-subtitle">My Instinct task sessions, one square per day, Jun 3 – Nov 16, 2026. Darker means more tasks. Hover a day.</p>
      <div class="pa-mapwrap pa-scrollx"><svg viewBox="0 0 ${W} ${H}" style="min-width:520px" role="img" aria-label="Daily task sessions heatmap">
        ${months}
        <text x="${L - 8}" y="${T + 11}" class="pa-ax" text-anchor="end">Mon</text>
        <text x="${L - 8}" y="${T + 3 * (CELL + GAP) + 11}" class="pa-ax" text-anchor="end">Thu</text>
        <text x="${L - 8}" y="${T + 6 * (CELL + GAP) + 11}" class="pa-ax" text-anchor="end">Sun</text>
        ${cells}
        <path d="M${aw} ${H - 26} v6 H${ae} v-6" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="1"/>
        <text x="${(aw + ae) / 2}" y="${H - 6}" text-anchor="middle" class="pa-ax">August: Instinct launches</text>
      </svg></div>
      <p class="pa-read"></p>
      <div class="pa-tiles">
        <div><b>57%</b><span>share of days active</span><em>95 of 167 days</em></div>
        <div><b>97%</b><span>days active since Aug 21</span><em>85 of 88; longest streak 65</em></div>
        <div><b>5.9</b><span>tasks per active day</span><em>peak: 24 on Sep 16</em></div>
        <div><b>23</b><span>watcher tasks</span><em>replies, deliveries, openings, weather</em></div>
        <div><b>28%</b><span>tasks that touched my calendar</span><em>add, move, reshuffle</em></div>
        <div><b>65%</b><span>to-dos completed</span><em>210 of 321</em></div>
      </div>
      <figcaption>Data: my exported Instinct task log (563 sessions, 321 to-dos). "Active" means at least one new task session that day; scheduled background messages don't count. Watcher and calendar counts are keyword estimates. June to August only kept title-level records, so early gaps may partly be missing data.</figcaption>`;
    const read = $(HOST, '.pa-read'), idle = 'Hover or tap a day.';
    read.textContent = idle;
    const svg = $(HOST, 'svg');
    function show(r) {
      if (!r) { read.textContent = idle; return; }
      const dt = new Date(r.dataset.k + 'T12:00:00Z');
      const n = +r.dataset.n;
      read.innerHTML = `<b>${dt.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}</b>: ${n ? n + ' task' + (n > 1 ? 's' : '') : 'nothing'}`;
    }
    svg.addEventListener('mouseover', e => show(e.target.closest('.pa-day')));
    svg.addEventListener('click', e => show(e.target.closest('.pa-day')));
    svg.addEventListener('mouseleave', () => show(null));
  })();

  // ------------------------------------------------------------------ invite codes
  (function () {
    const HOST = document.getElementById('invite-figure');
    if (!HOST) return;
    HOST.innerHTML = `
      <p class="fig-title">My 77 Instinct invite codes, by recipient</p>
      <p class="fig-subtitle">Invite links I sent through RedNote DMs, Oct 7 – Nov 2, 2026.</p>
      <div class="pa-controls"></div>
      <div class="pa-view"></div>
      <figcaption>Data: my own RedNote DMs, checked Nov 3, 2026. Location is the IP location RedNote shows; "other mainland" is approximate, so rows sum to 76. Profile groups are examples, not a full count, and no handles are listed.</figcaption>`;
    const view = $(HOST, '.pa-view');
    const where = [['Shanghai', 15, C.cn], ['United States', 12, C.os], ['Other mainland', 10, C.cn, '~10'], ['Guangdong', 8, C.cn],
      ['Beijing', 7, C.cn], ['Zhejiang', 6, C.cn], ['Canada', 3, C.os], ['United Kingdom', 3, C.os], ['Australia', 2, C.os],
      ['Germany', 1, C.os], ['Hong Kong', 1, C.os], ['Hidden', 8, C.na]];
    const who = [['AI research / engineering', 'big-tech post-training engineers, research labs, PhDs, FDEs, programmers'],
      ['AI product / startups', 'AI PMs, solo founders, product leads, growth, people journaling their startups'],
      ['Finance / VC', 'Wall Street turned VC, US macro, overseas real-estate sales'],
      ['Students abroad', 'students in the US, UK, France and Australia'],
      ['Lifestyle / everyday users', 'new moms, picture books, trailing spouses, travel, sleep, a toy designer'],
      ['Peers / competitors', "another iMessage assistant's official account, people posting Muse invite codes"]];
    seg($(HOST, '.pa-controls'), [{ key: 'where', label: 'where they are' }, { key: 'followers', label: 'follower counts' }, { key: 'who', label: 'who they are' }], k => {
      view.innerHTML = '';
      if (k === 'where') {
        const stack = document.createElement('div'); stack.className = 'pa-stack';
        stack.innerHTML = `<i style="flex:46;background:${C.cn}">mainland China 46</i><i style="flex:22;background:${C.os}">overseas 22</i><i style="flex:8;background:${C.na};color:${C.ink}">hidden 8</i>`;
        view.appendChild(stack);
        hbars(view)(where.map(r => ({ label: r[0], v: r[1], text: r[3] || r[1], color: r[2] })), 15);
      } else if (k === 'followers') {
        vbars(view, 190)([{ label: '&lt; 100', v: 42, color: C.sec }, { label: '100 – 1k', v: 27, color: '#3aa8b2' },
          { label: '1k – 10k', v: 7, color: '#8fd9e0' }, { label: '10k +', v: 1, color: '#c9ecef' }]);
        const p = document.createElement('p'); p.className = 'pa-read'; p.innerHTML = '<b>Median: 96 followers.</b>';
        view.appendChild(p);
      } else {
        view.innerHTML = `<div class="pa-cards">${who.map(w => `<div><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>`).join('')}</div>`;
      }
    });
  })();

  // ------------------------------------------------------------------ task log
  (function () {
    const HOST = document.getElementById('tasklog-figure');
    if (!HOST) return;
    const AREAS = [['求职 / 申请', 'Jobs / applications', '#1a7a9e'], ['学校', 'School', '#3aa8b2'], ['日历 / 时间管理', 'Calendar / time', '#8fd9e0'],
      ['出行 / 活动 / 社交', 'Travel / events / social', '#f97316'], ['生活杂务', 'Life admin', '#fbbf8a'], ['阅读 / 研究 / 写作', 'Reading / research / writing', '#0c1c20'], ['其他', 'Other', '#d6e3e5']];
    const MONTH = {"2026-06":{"日历 / 时间管理":3,"阅读 / 研究 / 写作":9,"出行 / 活动 / 社交":3,"生活杂务":4,"求职 / 申请":2},"2026-07":{"求职 / 申请":1,"日历 / 时间管理":1},"2026-08":{"日历 / 时间管理":8,"出行 / 活动 / 社交":14,"求职 / 申请":7,"生活杂务":3,"其他":1,"学校":4,"阅读 / 研究 / 写作":2},"2026-09":{"日历 / 时间管理":37,"学校":60,"求职 / 申请":65,"出行 / 活动 / 社交":31,"生活杂务":43,"阅读 / 研究 / 写作":11,"其他":3},"2026-10":{"出行 / 活动 / 社交":28,"生活杂务":20,"求职 / 申请":90,"学校":34,"阅读 / 研究 / 写作":16,"日历 / 时间管理":7,"其他":1},"2026-11":{"求职 / 申请":21,"日历 / 时间管理":6,"阅读 / 研究 / 写作":7,"学校":9,"生活杂务":5,"出行 / 活动 / 社交":6,"其他":1}};
    const CAT = {"日历 / 时间管理":62,"阅读 / 研究 / 写作":45,"出行 / 活动 / 社交":82,"生活杂务":75,"求职 / 申请":186,"其他":6,"学校":107};
    const HOURS = {"20":24,"22":33,"23":27,"18":17,"19":29,"12":14,"17":45,"9":20,"2":9,"21":24,"0":33,"14":46,"16":69,"11":24,"1":16,"6":2,"10":35,"13":35,"15":41,"8":10,"3":6,"4":3,"7":1};
    HOST.innerHTML = `
      <p class="fig-title">My 563 Instinct tasks</p>
      <p class="fig-subtitle">My Instinct task sessions, Jun 3 – Nov 16, 2026, grouped by keywords in each task's title (rough; one group per task).</p>
      <div class="pa-controls"></div>
      <div class="pa-view"></div>
      <p class="pa-read"></p>
      <figcaption>Data: my exported Instinct task log. Times are Pacific, when the session was created. June to August only kept title-level records, so the July dip may partly be missing data. Life admin = shopping, doctor visits, bills, housing.</figcaption>`;
    const view = $(HOST, '.pa-view'), read = $(HOST, '.pa-read');
    seg($(HOST, '.pa-controls'), [{ key: 'month', label: 'by month' }, { key: 'area', label: 'by area' }, { key: 'hour', label: 'by hour' }], k => {
      view.innerHTML = ''; read.textContent = '';
      if (k === 'month') {
        const months = Object.keys(MONTH), labs = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov (to 16th)'];
        const tot = months.map(m => Object.values(MONTH[m]).reduce((a, b) => a + b, 0)), max = Math.max(...tot);
        view.innerHTML = `<div class="fig-legend">${AREAS.map(a => `<span><i style="background:${a[2]}"></i>${a[1]}</span>`).join('')}</div>
          <div class="pa-vbars pa-stackcols" style="height:220px">${months.map((m, i) => `
            <div class="pa-vcol" data-m="${i}"><span class="pa-vval">${tot[i]}</span>
              <span class="pa-vstack" style="height:0" data-h="${(220 - 46) * tot[i] / max}">${AREAS.map(a => MONTH[m][a[0]] ? `<i style="flex:${MONTH[m][a[0]]};background:${a[2]}"></i>` : '').join('')}</span>
              <span class="pa-vlab">${labs[i]}</span></div>`).join('')}</div>`;
        requestAnimationFrame(() => requestAnimationFrame(() => view.querySelectorAll('.pa-vstack').forEach(s => { s.style.height = Math.max(2, +s.dataset.h) + 'px'; })));
        read.textContent = 'Hover a month for its mix.';
        view.querySelectorAll('.pa-vcol').forEach(c => c.addEventListener('mouseenter', () => {
          const m = MONTH[months[+c.dataset.m]];
          read.innerHTML = `<b>${labs[+c.dataset.m]}</b>: ` + AREAS.filter(a => m[a[0]]).map(a => `${a[1]} ${m[a[0]]}`).join(' · ');
        }));
      } else if (k === 'area') {
        hbars(view)(AREAS.map(a => ({ label: a[1], v: CAT[a[0]], text: `${CAT[a[0]]} (${Math.round(100 * CAT[a[0]] / 563)}%)`, color: a[2] })), 186);
        read.textContent = 'Jobs, school and calendar: 355 of 563 tasks (63%).';
      } else {
        const rows = [...Array(24).keys()].map(h => ({ label: h % 3 === 0 ? String(h) : '', v: HOURS[h] || 0, text: '', color: C.sec }));
        const set = vbars(view, 180); set(rows, 69);
        view.querySelector('.pa-vbars').classList.add('pa-thin');
        view.querySelectorAll('.pa-vcol').forEach((c, h) => {
          c.title = `${h}:00 · ${HOURS[h] || 0} tasks`;
          c.addEventListener('mouseenter', () => { read.innerHTML = `<b>${h}:00–${h}:59</b>: ${HOURS[h] || 0} tasks`; });
        });
        read.textContent = 'Hover an hour. 4 pm: 69 tasks. Midnight–3 am: 64 tasks.';
      }
    });
  })();
})();
