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
  // Same script serves the English page and the Chinese one (/zh/), keyed off <html lang>.
  const ZH = (document.documentElement.lang || '').toLowerCase().startsWith('zh');
  const T = (en, zh) => (ZH ? zh : en);
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
    const rowsEn = [
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
    const rowsZh = [
      ['Grok Bot', 'xAI', '2026.8', 'beta', '自家app + 云电脑', '后台跑多步任务'],
      ['Meta Muse', 'Meta', '2026.9', '9月8日', '自家app、WhatsApp', '日程、购物、长期目标'],
      ['OpenAI Dots', 'OpenAI', '2026.9', '9月29日', 'ChatGPT / Codex', '订餐厅到做网站，“什么都管”'],
      ['Claude Duet', 'Anthropic', '2026.10', '研究预览', '独立app', '晨报、收件箱、日程、代拟回复'],
      ['Gemini Spark', 'Google', '2026.5', 'I/O', 'Gemini app、Gmail', '接Workspace，后台常驻'],
      ['Instinct', 'Instinct', '2026.8', 'early access', 'iMessage、电话', '旅行、买菜、退订阅'],
      ['Poke', 'Interaction Co.', '2025', '2025–26', 'iMessage / SMS', '发短信就能设自动化'],
      ['Tab', 'Tab', '2026', '出隐身', 'iMessage、WhatsApp', '打电话、订机票、付款'],
      ['Town', 'Town', '2026.6', '6月', '工作邮箱 / 日历', '给每个员工一个助理'],
      ['Tolan', 'Portola', '2024', '2024–', '自家app', '外星人朋友，陪你聊'],
    ];
    const TYPE = { 'coworker': '同事', 'executive assistant': '秘书', 'executive assistant + coworker': '秘书+同事', 'executive assistant (with a personality)': '秘书（有性格）', 'friend': '朋友' };
    const rows = rowsEn.map((r, i) => ZH ? [...rowsZh[i], r[6]] : r);
    const col = t => t.includes('friend') ? C.friend : t.includes('personality') ? '#3aa8b2' : C.sec;
    HOST.innerHTML = `
      <p class="fig-title">${T('Personal agents of 2026', '2026年主流personal agent')}</p>
      <p class="fig-subtitle">${T('The personal agents that launched or made news in 2026. Filter by what each one is pitched as.', '2026年发布或上新闻的personal agent。可以按官方主打的定位筛选。')}</p>
      <div class="pa-controls"></div>
      <div class="pa-tablewrap"><table class="pa-table">
        <thead><tr>${T(['Product', 'Company', 'Launch', 'Lives in', 'Pitched as', 'Type'], ['产品', '公司', '上线', '住在哪', '官方主打', '归类']).map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr data-type="${esc(r[6])}"><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td>
          <td>${esc(r[2])} <span class="pa-dim">${esc(r[3])}</span></td><td>${esc(r[4])}</td><td>${esc(r[5])}</td>
          <td><span class="pa-pill" style="--c:${col(r[6])}">${esc(T(r[6], TYPE[r[6]]))}</span></td></tr>`).join('')}</tbody>
      </table></div>
      <figcaption>${T("Sources: company announcements and coverage by TechCrunch, CNBC, Engadget, a16z and others (May–Nov 2026); some launch dates vary by source. The type column is my classification by each product's headline features.", '来源：各公司公告，以及TechCrunch、CNBC、Engadget、a16z等报道（2026年5–11月），部分上线时间各方说法略有出入。最后一列是我按各产品官方主打功能归的类。')}</figcaption>`;
    const trs = HOST.querySelectorAll('tbody tr');
    seg($(HOST, '.pa-controls'), [
      { key: 'all', label: T('all 10', '全部10个') }, { key: 'executive assistant', label: T('executive assistant', '秘书') },
      { key: 'coworker', label: T('coworker', '同事') }, { key: 'friend', label: T('friend', '朋友') },
    ], k => trs.forEach(tr => tr.classList.toggle('pa-out', k !== 'all' && !tr.dataset.type.includes(k))));
  })();

  // ------------------------------------------------------------------ positioning map
  (function () {
    const HOST = document.getElementById('map-figure');
    if (!HOST) return;
    const ptsEn = [
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
    const zhInfo = [
      ['Grok Bot', 'xAI · 一组常驻的agent，各自有云端电脑'], ['Claude Duet', 'Anthropic · 晨报、收件箱、日程、代拟回复'],
      ['Town', '给每个员工一个助理', '估值10亿美元'], ['OpenAI Dots', 'OpenAI · 订餐厅到做网站'],
      ['Gemini Spark', 'Google · 接Workspace，后台常驻'], ['豆包手机助手', '字节的手机助手'],
      ['Tab', '住在iMessage和WhatsApp里'], ['Instinct', '住在iMessage里', '估值100亿美元'],
      ['Meta Muse', '自家app和WhatsApp'], ['Poke', 'iMessage / SMS，有性格'],
      ['ChatGPT', '通用聊天机器人，作参照'], ['Tolan', '外星人朋友，陪你聊', '总共融了约6000万美元'],
      ['Character.AI', '和AI角色聊天'], ['微软小冰 (2014)', '微软的共情聊天机器人，故事从这里开始'],
    ];
    const pts = ptsEn.map((p, i) => ZH ? [zhInfo[i][0], p[1], p[2], p[3], zhInfo[i][1], zhInfo[i][2], p[0]] : [...p.slice(0, 6), p[0]]);
    const col = { sec: C.sec, chat: C.chat, friend: C.friend, gray: C.gray };
    const W = 640, H = 460, P = 36, sx = x => P + x / 10 * (W - 2 * P), sy = y => H - P - y / 10 * (H - 2 * P);
    HOST.innerHTML = `
      <p class="fig-title">${T('Where personal agents sit', 'personal agent定位分布')}</p>
      <p class="fig-subtitle">${T('x: warmth (EQ) · y: gets things done (IQ). Hover a dot. Positions are placed by hand, not measured.', '横轴：有没有温度（EQ）· 纵轴：能不能办事（IQ）。鼠标放到点上看详情。位置是我手动摆的，不是测量数据。')}</p>
      <div class="fig-legend">
        <span><i style="background:${C.sec}"></i>${T('assistant / work tool', '助理 / 工作工具')}</span>
        <span><i style="background:${C.chat}"></i>${T('lives inside a chat app', '住在聊天软件里')}</span>
        <span><i style="background:${C.friend}"></i>${T('companion', '陪伴型')}</span>
      </div>
      <div class="pa-controls"></div>
      <div class="pa-mapwrap">
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Personal agents placed by warmth and usefulness">
          <rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}" fill="#fbfdfd" stroke="#b2dce2"/>
          <line x1="${W / 2}" y1="${P}" x2="${W / 2}" y2="${H - P}" stroke="#b2dce2" stroke-dasharray="3 3"/>
          <line x1="${P}" y1="${H / 2}" x2="${W - P}" y2="${H / 2}" stroke="#b2dce2" stroke-dasharray="3 3"/>
          <text x="${P + 8}" y="${P + 18}" class="pa-q" fill="${C.sec}">${T('executive assistant / coworker', '秘书 / 同事')}</text>
          <text x="${W - P - 8}" y="${H - P - 10}" class="pa-q" text-anchor="end" fill="${C.friend}">${T('friend / companion', '朋友 / 陪伴')}</text>
          <text x="${P}" y="${H - 10}" class="pa-ax">${T('cold', '冷')}</text><text x="${W - P}" y="${H - 10}" class="pa-ax" text-anchor="end">${T('warm', '暖')}</text>
          <text x="12" y="${H - P}" class="pa-ax" transform="rotate(-90 12 ${H - P})">${T('chat', '闲聊')}</text>
          <text x="12" y="${P + 30}" class="pa-ax" transform="rotate(-90 12 ${P + 30})">${T('tasks', '办事')}</text>
          <g class="pa-money"></g>
          ${pts.map((p, i) => `<g class="pa-pt" data-i="${i}" tabindex="0">
            <circle cx="${sx(p[1])}" cy="${sy(p[2])}" r="6.5" fill="${col[p[3]]}" stroke="#fff" stroke-width="1.5"/>
            <text x="${sx(p[1]) + 11}" y="${sy(p[2]) + 4}" class="pa-lab">${esc(p[0])}</text></g>`).join('')}
        </svg>
        <p class="pa-read"></p>
      </div>
      <figcaption>${T('Dark teal: officially positioned as an assistant or work tool. Light teal: an assistant that lives inside iMessage / WhatsApp. Orange: companion. Money figures are as reported: valuations for Instinct and Town, total funding raised for Tolan.', '深青：官方定位为助理或工作工具；浅青：住在iMessage / WhatsApp里的助理；橙：陪伴型。金额按公开报道：Instinct和Town是估值，Tolan是累计融资。')}</figcaption>`;
    const svg = $(HOST, 'svg'), read = $(HOST, '.pa-read'), money = $(HOST, '.pa-money');
    const idle = T('Hover or tap a dot to see what it is.', '鼠标放到点上，或点一下，看看它是什么。');
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
    seg($(HOST, '.pa-controls'), [{ key: 'off', label: T('positions', '定位') }, { key: 'on', label: T('show the money', '看看钱') }], k => {
      money.innerHTML = k === 'on' ? pts.map(p => {
        if (!p[5]) return '';
        const r = p[6] === 'Instinct' ? 46 : p[6] === 'Town' ? 26 : 9;
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
      <p class="fig-title">${T('ChatGPT consumer messages not about work', 'ChatGPT消费者版里跟工作无关的消息')}</p>
      <p class="fig-subtitle">${T("100 messages from ChatGPT's consumer plans. Orange: not about work.", 'ChatGPT消费者版的100条消息。橙色：跟工作无关。')}</p>
      <div class="pa-controls"></div>
      <div class="pa-waffle-row"><div class="pa-waffle">${'<i></i>'.repeat(100)}</div><div class="pa-big"></div></div>
      <figcaption>${T('Source: OpenAI Economic Research and David Deming (Harvard), "How People Use ChatGPT," NBER working paper, Sept 2025; ~1.5M conversations, consumer plans only. OpenAI\'s own summary says "about 70%".', '来源：OpenAI经济研究团队与哈佛David Deming，《How People Use ChatGPT》，NBER工作论文，2025年9月；约150万条对话，仅含消费者版。OpenAI官网摘要写的是“约70%”。')}</figcaption>`;
    const cells = HOST.querySelectorAll('.pa-waffle i'), big = $(HOST, '.pa-big');
    const vals = { y24: 53, y25: 73 };
    let picked = 'y24';
    function paint(k) {
      const n = vals[k];
      cells.forEach((c, i) => { c.style.background = i < n ? C.friend : '#e3eef0'; c.style.transitionDelay = (i * 6) + 'ms'; });
      big.innerHTML = `<b>${n}%</b><span>${T(`not about work, June ${k === 'y24' ? '2024' : '2025'}`, `跟工作无关，${k === 'y24' ? '2024' : '2025'}年6月`)}</span>`;
    }
    const pick = seg($(HOST, '.pa-controls'), [{ key: 'y24', label: T('June 2024', '2024年6月') }, { key: 'y25', label: T('June 2025', '2025年6月') }], k => { picked = k; paint(k); });
    onVisible(HOST, () => setTimeout(() => pick('y25'), 700));
  })();

  // ------------------------------------------------------------------ daily minutes
  (function () {
    const HOST = document.getElementById('minutes-figure');
    if (!HOST) return;
    HOST.innerHTML = `
      <p class="fig-title">${T('Minutes a day in the app', '每天在app里花多少分钟')}</p>
      <p class="fig-subtitle">${T('Average minutes a day spent in the app.', '日均使用时长（分钟）。')}</p>
      <div class="pa-chart"></div>
      <figcaption>${T("Sources: TikTok, eMarketer forecast for US adults, April 2025 (paywalled; the figure is consistently cited elsewhere). Character.AI, the CEO's public figure: ~6M daily users, 70–80 minutes a day (self-reported, not third-party measured; bar drawn at the 75-minute midpoint).", '来源：TikTok为eMarketer 2025年4月对美国成年用户的预测（原报告付费，数字经多家来源一致转引）；Character.AI为CEO公开口径，约600万日活、日均70–80分钟（公司自报，非第三方测量；柱子画在75分钟）。')}</figcaption>`;
    const set = hbars($(HOST, '.pa-chart'));
    const L1 = T('TikTok (US adults)', 'TikTok（美国成年用户）'), L2 = T('Character.AI (per user)', 'Character.AI（人均）');
    set([{ label: L1, v: 0, text: '' }, { label: L2, v: 0, text: '' }], 90);
    onVisible(HOST, () => set([
      { label: L1, v: 52, text: T('~52 min', '约52分钟'), color: C.gray },
      { label: L2, v: 75, text: T('70–80 min', '70–80分钟'), color: C.friend },
    ], 90));
  })();

  // ------------------------------------------------------------------ retention
  (function () {
    const HOST = document.getElementById('retention-figure');
    if (!HOST) return;
    const d = { d1: [73.3, 41.3], d14: [22.5, 26.8] };
    HOST.innerHTML = `
      <p class="fig-title">${T('New-install return rate: Meta Muse vs ChatGPT', '新安装用户回访率：Meta Muse vs ChatGPT')}</p>
      <p class="fig-subtitle">${T('Share of new installs that came back, September 2026. Only these two days are measured, so no curve is drawn between them.', '2026年9月新安装用户的回访比例。只测了这两天，所以中间不画曲线。')}</p>
      <div class="fig-legend"><span><i style="background:${C.chat}"></i>Meta Muse</span><span><i style="background:${C.gray}"></i>ChatGPT</span></div>
      <div class="pa-controls"></div>
      <div class="pa-chart"></div>
      <p class="pa-read"></p>
      <figcaption>${T("Source: Sensor Tower, Sept 2026, posted on X by Deedy Das (Menlo Ventures) and reported by eWeek on Oct 14, 2026; new installs across 81 countries. Other trackers measure differently, so their numbers don't mix with these.", '来源：Sensor Tower 2026年9月数据，Menlo Ventures合伙人Deedy Das在X上发布，eWeek 2026年10月14日报道；81个国家的新安装用户。其他机构口径不同，数字不能混用。')}</figcaption>`;
    const set = hbars($(HOST, '.pa-chart')), read = $(HOST, '.pa-read');
    function show(k) {
      const [m, g] = d[k];
      set([{ label: 'Meta Muse', v: m, text: m + '%', color: C.chat }, { label: 'ChatGPT', v: g, text: g + '%', color: C.gray }], 80);
      read.innerHTML = k === 'd1'
        ? `<b>${T('Day 1', '第1天')}:</b> Muse ${m}%, ChatGPT ${g}%.`
        : `<b>${T('Day 14', '第14天')}:</b> Muse ${m}%, ChatGPT ${g}%.`;
    }
    const pick = seg($(HOST, '.pa-controls'), [{ key: 'd1', label: T('day 1', '第1天') }, { key: 'd14', label: T('day 14', '第14天') }], show);
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
    const CELL = 14, GAP = 3, L = 34, TOP = 22, weeks = 25;
    let cells = '', months = '';
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const day = new Date(start.getTime() + (w * 7 + d) * 864e5);
        if (day < first || day > last) continue;
        const key = day.toISOString().slice(0, 10), n = DAYS[key] || 0;
        cells += `<rect class="pa-day" x="${L + w * (CELL + GAP)}" y="${TOP + d * (CELL + GAP)}" width="${CELL}" height="${CELL}" rx="2.5"
                   fill="${shade(n)}" data-k="${key}" data-n="${n}"/>`;
      }
      const wd = new Date(start.getTime() + w * 7 * 864e5);
      if (wd.getUTCDate() <= 7) months += `<text x="${L + w * (CELL + GAP)}" y="${TOP - 8}" class="pa-ax">${ZH ? (wd.getUTCMonth() + 1) + '月' : wd.toLocaleString('en', { month: 'short', timeZone: 'UTC' })}</text>`;
    }
    const aw = L + 8 * (CELL + GAP) + 6, ae = L + 13 * (CELL + GAP) - GAP;
    const W = L + weeks * (CELL + GAP) + 6, H = TOP + 7 * (CELL + GAP) + 34;
    HOST.innerHTML = `
      <p class="fig-title">${T('Task sessions per day', '每日任务会话数')}</p>
      <p class="fig-subtitle">${T('My Instinct task sessions, one square per day, Jun 3 – Nov 16, 2026. Darker means more tasks. Hover a day.', '我的Instinct任务会话，2026年6月3日–11月16日，一格一天，颜色越深当天任务越多。鼠标放上去看每天。')}</p>
      <div class="pa-mapwrap pa-scrollx"><svg viewBox="0 0 ${W} ${H}" style="min-width:520px" role="img" aria-label="Daily task sessions heatmap">
        ${months}
        <text x="${L - 8}" y="${TOP + 11}" class="pa-ax" text-anchor="end">${T('Mon', '周一')}</text>
        <text x="${L - 8}" y="${TOP + 3 * (CELL + GAP) + 11}" class="pa-ax" text-anchor="end">${T('Thu', '周四')}</text>
        <text x="${L - 8}" y="${TOP + 6 * (CELL + GAP) + 11}" class="pa-ax" text-anchor="end">${T('Sun', '周日')}</text>
        ${cells}
        <path d="M${aw} ${H - 26} v6 H${ae} v-6" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="1"/>
        <text x="${(aw + ae) / 2}" y="${H - 6}" text-anchor="middle" class="pa-ax">${T('August: Instinct launches', '8月：Instinct正式发布')}</text>
      </svg></div>
      <p class="pa-read"></p>
      <div class="pa-tiles">
        ${T([['57%', 'share of days active', '95 of 167 days'], ['97%', 'days active since Aug 21', '85 of 88; longest streak 65'], ['5.9', 'tasks per active day', 'peak: 24 on Sep 16'], ['23', 'watcher tasks', 'replies, deliveries, openings, weather'], ['28%', 'tasks that touched my calendar', 'add, move, reshuffle'], ['65%', 'to-dos completed', '210 of 321']],
            [['57%', '活跃天数占比', '167天里95天'], ['97%', '8月21日起活跃天数占比', '88天里85天；最长连续65天'], ['5.9', '每个活跃日的任务数', '最高一天24个（9月16日）'], ['23', 'watcher类任务', '等回信、到货、开放申请、天气'], ['28%', '动过日历的任务', '新增、挪块、重排'], ['65%', '待办完成率', '321条里完成210条']]).map(t => `<div><b>${t[0]}</b><span>${t[1]}</span><em>${t[2]}</em></div>`).join('')}
      </div>
      <figcaption>${T('Data: my exported Instinct task log (563 sessions, 321 to-dos). "Active" means at least one new task session that day; scheduled background messages don\'t count. Watcher and calendar counts are keyword estimates. June to August only kept title-level records, so early gaps may partly be missing data.', '数据：我导出的Instinct任务记录（563次会话、321条待办）。“活跃”指当天至少新开一个任务会话，不含后台定时任务自动发的消息。watcher和日历的数字是按标题关键词估的。6–8月只保留了标题级记录，早期空白可能有一部分是缺记录。')}</figcaption>`;
    const read = $(HOST, '.pa-read'), idle = T('Hover or tap a day.', '鼠标放到某一天上，或点一下。');
    read.textContent = idle;
    const svg = $(HOST, 'svg');
    function show(r) {
      if (!r) { read.textContent = idle; return; }
      const dt = new Date(r.dataset.k + 'T12:00:00Z');
      const n = +r.dataset.n;
      read.innerHTML = ZH
        ? `<b>${dt.getUTCMonth() + 1}月${dt.getUTCDate()}日 周${'日一二三四五六'[dt.getUTCDay()]}</b>：${n ? n + '个任务' : '没有任务'}`
        : `<b>${dt.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}</b>: ${n ? n + ' task' + (n > 1 ? 's' : '') : 'nothing'}`;
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
      <p class="fig-title">${T('My 77 Instinct invite codes, by recipient', '77个Instinct分享码的领取者')}</p>
      <p class="fig-subtitle">${T('Invite links I sent through RedNote DMs, Oct 7 – Nov 2, 2026.', '2026年10月7日–11月2日，我在小红书私信发出的邀请链接。')}</p>
      <div class="pa-controls"></div>
      <div class="pa-view"></div>
      <figcaption>${T('Data: my own RedNote DMs, checked Nov 3, 2026. Location is the IP location RedNote shows; "other mainland" is approximate, so rows sum to 76. Profile groups are examples, not a full count, and no handles are listed.', '数据：我自己的小红书私信，2026年11月3日统计。地区以小红书显示的IP属地为准；“其他国内”是约数，所以分项加起来是76。人群是举例归类，不是完整统计，也不列账号名。')}</figcaption>`;
    const view = $(HOST, '.pa-view');
    const where = [[T('Shanghai', '上海'), 15, C.cn], [T('United States', '美国'), 12, C.os], [T('Other mainland', '其他国内'), 10, C.cn, T('~10', '约10')], [T('Guangdong', '广东'), 8, C.cn],
      [T('Beijing', '北京'), 7, C.cn], [T('Zhejiang', '浙江'), 6, C.cn], [T('Canada', '加拿大'), 3, C.os], [T('United Kingdom', '英国'), 3, C.os], [T('Australia', '澳洲'), 2, C.os],
      [T('Germany', '德国'), 1, C.os], [T('Hong Kong', '香港'), 1, C.os], [T('Hidden', '未显示'), 8, C.na]];
    const whoEn = [['AI research / engineering', 'big-tech post-training engineers, research labs, PhDs, FDEs, programmers'],
      ['AI product / startups', 'AI PMs, solo founders, product leads, growth, people journaling their startups'],
      ['Finance / VC', 'Wall Street turned VC, US macro, overseas real-estate sales'],
      ['Students abroad', 'students in the US, UK, France and Australia'],
      ['Lifestyle / everyday users', 'new moms, picture books, trailing spouses, travel, sleep, a toy designer'],
      ['Peers / competitors', "another iMessage assistant's official account, people posting Muse invite codes"]];
    const who = T(whoEn, [['AI研究 / 工程', '大厂post-training工程师、科研院所、PhD、FDE、程序员'], ['AI产品 / 创业', 'AI PM、一人公司、产品专家、增长、写创业日记的人'],
      ['金融 / VC', '华尔街转VC、美股宏观、海外房产销售'], ['留学生', '美 / 英 / 法 / 澳各校在读学生'],
      ['生活博主 / 普通用户', '新手妈妈、亲子绘本、随迁家属、旅行、睡眠、玩具设计师'], ['同行 / 竞品', '另一款iMessage助理的官方号、发Muse邀请码的人']]);
    seg($(HOST, '.pa-controls'), [{ key: 'where', label: T('where they are', '来自哪里') }, { key: 'followers', label: T('follower counts', '粉丝数') }, { key: 'who', label: T('who they are', '都是谁') }], k => {
      view.innerHTML = '';
      if (k === 'where') {
        const stack = document.createElement('div'); stack.className = 'pa-stack';
        stack.innerHTML = `<i style="flex:46;background:${C.cn}">${T('mainland China 46', '国内 46')}</i><i style="flex:22;background:${C.os}">${T('overseas 22', '海外 22')}</i><i style="flex:8;background:${C.na};color:${C.ink}">${T('hidden 8', '未显示 8')}</i>`;
        view.appendChild(stack);
        hbars(view)(where.map(r => ({ label: r[0], v: r[1], text: r[3] || r[1], color: r[2] })), 15);
      } else if (k === 'followers') {
        vbars(view, 190)([{ label: '&lt; 100', v: 42, color: C.sec }, { label: '100 – 1k', v: 27, color: '#3aa8b2' },
          { label: '1k – 10k', v: 7, color: '#8fd9e0' }, { label: '10k +', v: 1, color: '#c9ecef' }]);
        const p = document.createElement('p'); p.className = 'pa-read'; p.innerHTML = T('<b>Median: 96 followers.</b>', '<b>粉丝数中位数：96。</b>');
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
      ['出行 / 活动 / 社交', 'Travel / events / social', '#f97316'], ['生活杂务', 'Life admin', '#fbbf8a'], ['阅读 / 研究 / 写作', 'Reading / research / writing', '#0c1c20'], ['其他', 'Other', '#d6e3e5']]
      .map(a => [a[0], ZH ? a[0] : a[1], a[2]]);
    const MONTH = {"2026-06":{"日历 / 时间管理":3,"阅读 / 研究 / 写作":9,"出行 / 活动 / 社交":3,"生活杂务":4,"求职 / 申请":2},"2026-07":{"求职 / 申请":1,"日历 / 时间管理":1},"2026-08":{"日历 / 时间管理":8,"出行 / 活动 / 社交":14,"求职 / 申请":7,"生活杂务":3,"其他":1,"学校":4,"阅读 / 研究 / 写作":2},"2026-09":{"日历 / 时间管理":37,"学校":60,"求职 / 申请":65,"出行 / 活动 / 社交":31,"生活杂务":43,"阅读 / 研究 / 写作":11,"其他":3},"2026-10":{"出行 / 活动 / 社交":28,"生活杂务":20,"求职 / 申请":90,"学校":34,"阅读 / 研究 / 写作":16,"日历 / 时间管理":7,"其他":1},"2026-11":{"求职 / 申请":21,"日历 / 时间管理":6,"阅读 / 研究 / 写作":7,"学校":9,"生活杂务":5,"出行 / 活动 / 社交":6,"其他":1}};
    const CAT = {"日历 / 时间管理":62,"阅读 / 研究 / 写作":45,"出行 / 活动 / 社交":82,"生活杂务":75,"求职 / 申请":186,"其他":6,"学校":107};
    const HOURS = {"20":24,"22":33,"23":27,"18":17,"19":29,"12":14,"17":45,"9":20,"2":9,"21":24,"0":33,"14":46,"16":69,"11":24,"1":16,"6":2,"10":35,"13":35,"15":41,"8":10,"3":6,"4":3,"7":1};
    HOST.innerHTML = `
      <p class="fig-title">${T('My 563 Instinct tasks', '我的563个Instinct任务')}</p>
      <p class="fig-subtitle">${T("My Instinct task sessions, Jun 3 – Nov 16, 2026, grouped by keywords in each task's title (rough; one group per task).", '2026年6月3日–11月16日的Instinct任务会话，按任务标题关键词粗分（一个任务只归一类）。')}</p>
      <div class="pa-controls"></div>
      <div class="pa-view"></div>
      <p class="pa-read"></p>
      <figcaption>${T('Data: my exported Instinct task log. Times are Pacific, when the session was created. June to August only kept title-level records, so the July dip may partly be missing data. Life admin = shopping, doctor visits, bills, housing.', '数据：我导出的Instinct任务记录。时间为太平洋时间，是会话创建的时刻。6–8月只保留了标题级记录，7月偏少可能有一部分是缺记录。生活杂务 = 购物、就医、账单、住房。')}</figcaption>`;
    const view = $(HOST, '.pa-view'), read = $(HOST, '.pa-read');
    seg($(HOST, '.pa-controls'), [{ key: 'month', label: T('by month', '按月') }, { key: 'area', label: T('by area', '按领域') }, { key: 'hour', label: T('by hour', '按小时') }], k => {
      view.innerHTML = ''; read.textContent = '';
      if (k === 'month') {
        const months = Object.keys(MONTH), labs = T(['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov (to 16th)'], ['6月', '7月', '8月', '9月', '10月', '11月（至16日）']);
        const tot = months.map(m => Object.values(MONTH[m]).reduce((a, b) => a + b, 0)), max = Math.max(...tot);
        view.innerHTML = `<div class="fig-legend">${AREAS.map(a => `<span><i style="background:${a[2]}"></i>${a[1]}</span>`).join('')}</div>
          <div class="pa-vbars pa-stackcols" style="height:220px">${months.map((m, i) => `
            <div class="pa-vcol" data-m="${i}"><span class="pa-vval">${tot[i]}</span>
              <span class="pa-vstack" style="height:0" data-h="${(220 - 46) * tot[i] / max}">${AREAS.map(a => MONTH[m][a[0]] ? `<i style="flex:${MONTH[m][a[0]]};background:${a[2]}"></i>` : '').join('')}</span>
              <span class="pa-vlab">${labs[i]}</span></div>`).join('')}</div>`;
        requestAnimationFrame(() => requestAnimationFrame(() => view.querySelectorAll('.pa-vstack').forEach(s => { s.style.height = Math.max(2, +s.dataset.h) + 'px'; })));
        read.textContent = T('Hover a month for its mix.', '鼠标放到某个月上，看任务构成。');
        view.querySelectorAll('.pa-vcol').forEach(c => c.addEventListener('mouseenter', () => {
          const m = MONTH[months[+c.dataset.m]];
          read.innerHTML = `<b>${labs[+c.dataset.m]}</b>: ` + AREAS.filter(a => m[a[0]]).map(a => `${a[1]} ${m[a[0]]}`).join(' · ');
        }));
      } else if (k === 'area') {
        hbars(view)(AREAS.map(a => ({ label: a[1], v: CAT[a[0]], text: `${CAT[a[0]]} (${Math.round(100 * CAT[a[0]] / 563)}%)`, color: a[2] })), 186);
        read.textContent = T('Jobs, school and calendar: 355 of 563 tasks (63%).', '求职、学校、日历加起来：563个里有355个（63%）。');
      } else {
        const rows = [...Array(24).keys()].map(h => ({ label: h % 3 === 0 ? String(h) : '', v: HOURS[h] || 0, text: '', color: C.sec }));
        const set = vbars(view, 180); set(rows, 69);
        view.querySelector('.pa-vbars').classList.add('pa-thin');
        view.querySelectorAll('.pa-vcol').forEach((c, h) => {
          c.title = T(`${h}:00 · ${HOURS[h] || 0} tasks`, `${h}点 · ${HOURS[h] || 0}个任务`);
          c.addEventListener('mouseenter', () => { read.innerHTML = T(`<b>${h}:00–${h}:59</b>: ${HOURS[h] || 0} tasks`, `<b>${h}点</b>：${HOURS[h] || 0}个任务`); });
        });
        read.textContent = T('Hover an hour. 4 pm: 69 tasks. Midnight–3 am: 64 tasks.', '鼠标放到某个小时上。下午4点：69个任务；凌晨0–3点：64个任务。');
      }
    });
  })();
})();
