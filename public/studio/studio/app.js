/* InspaceCraft Design Studio · customer edition (no 3D engine)
   Pages: the studio (home, needs, package and look, estimate with PDF), package comparison,
   mood board pages, the same room in every package, a 3D design request from the customer's
   own words, and offers. Leads: PDF form to a Google Sheet (studio/config.js submitUrl);
   3D requests to the existing InspaceCraft backend (requestApi). */
(() => {
  'use strict';
  const CAT = window.IC_CATALOG;
  const CFG = Object.assign({ submitUrl: '', requestApi: '', sendPdf: true, showRates: true, whatsapp: '', showSetup: false }, window.IC_CONFIG || {});
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const IMG = n => 'img/' + n + '.jpg';
  const pad = n => String(n).padStart(2, '0');
  const IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');

  const BHK = CAT.bhk, STD_AREA = CAT.stdArea, TK = ['b', 's', 'p'], TIERS = CAT.tiers, MATERIALS = CAT.materials;
  const BOARDS = CAT.boards, ITEMS = CAT.items, ROOMS = CAT.rooms, ALT = CAT.alt;
  const SET = { gst: CAT.gst, fee: CAT.fee };
  const STEPS = [['Your home', 'Home'], ['What you need', 'Needs'], ['Package and look', 'Style'], ['Your estimate', 'Estimate']];
  const NEXT = { 1: 'Next: what you need', 2: 'Next: choose a look', 3: 'See my estimate', 4: 'Save as PDF' };
  const NEXT_SHORT = { 1: 'Next', 2: 'Next', 3: 'Estimate', 4: 'Save PDF' };
  const LAST = 4;
  const CALL_TIMES = ['Any time', 'Morning, 10 am to 1 pm', 'Afternoon, 1 to 5 pm', 'Evening, 5 to 8 pm'];
  const VIEWS = ['studio', 'compare', 'rooms', 'request', 'offers', 'setup'];

  /* ---------------- colours of each mood board ---------------- */
  const SW = {};
  Object.keys(CAT.swatches).forEach(list => CAT.swatches[list].forEach((s, i) => { SW[list + ':' + s.id] = Object.assign({ list, code: CAT.codes[list] + '-' + pad(i + 1) }, s); }));
  const STONE = { b: 'stone_b', s: 'stone_s', p: 'stone_p' };
  function swatch(ref) {
    if (!ref) return null;
    if (ref.indexOf('stone:') === 0) { const id = ref.slice(6); for (const l of ['stone_b', 'stone_s', 'stone_p']) if (SW[l + ':' + id]) return SW[l + ':' + id]; return null; }
    return SW[ref] || null;
  }
  function finishesFor(slot, tier) { const k = CAT.slots[slot].kind; return (k === 'cabinet' || k === 'feature' || k === 'splash') ? CAT.finishes[k][tier] : []; }
  function colourList(slot, tier, f) {
    const meta = CAT.slots[slot];
    if (meta.list === 'stone') return STONE[tier];
    if (meta.kind === 'cabinet' || meta.kind === 'feature') { const fn = f && CAT.finishNames[f]; return fn && fn.wood ? 'wood' : fn && fn.paint ? 'paint' : 'shutter'; }
    if (meta.kind === 'splash') return f === 'glass' ? 'shutter' : 'tile';
    return meta.list;
  }
  function resolve(board, tier, room, slot) {
    const look = (BOARDS[board] || BOARDS.s1).look;
    let v = (look[room] && look[room][slot]) || look.all[slot] || CAT.defaults[slot];
    v = typeof v === 'string' ? { c: v } : v;
    const fins = finishesFor(slot, tier), f = fins.length ? (fins.indexOf(v.f) >= 0 ? v.f : fins[0]) : null;
    const list = colourList(slot, tier, f);
    let s = swatch(v.c);
    if (s && CAT.slots[slot].list === 'stone' && s.list !== list) s = null;
    if (!s) s = SW[list + ':' + CAT.swatches[list][0].id];
    return { hex: s.hex, name: s.name, code: s.code, finishName: f ? CAT.finishNames[f].name : '' };
  }
  const vizRoomsFor = c => Object.keys(CAT.vizRooms).filter(k => !(CAT.vizRooms[k].min && c.bhk < CAT.vizRooms[k].min));
  const slotLabel = (room, slot) => { const R = CAT.vizRooms[room]; return (R && R.labels && R.labels[slot]) || CAT.slots[slot].label; };

  /* ---------------- calculator ---------------- */
  function calc(c, t) {
    const ti = TK.indexOf(t), b = c.bhk;
    const area = c.area >= 150 ? c.area : STD_AREA[b];
    const f = Math.min(1.6, Math.max(0.7, area / STD_AREA[b]));
    const rooms = [];
    let subtotal = 0;
    for (const R of ROOMS) {
      if (R.min && b < R.min) continue;
      if (R.req && !c.req[R.req]) continue;
      const lines = [];
      for (const [id, q, req, scale] of R.lines) {
        if (req && !c.req[req]) continue;
        let qty = q === 'area' ? Math.round(area * 3) : q[b];
        if (!qty) continue;
        if (scale) qty = Math.round(qty * f);
        const it = ITEMS[id], rate = Number(it.r[ti]) || 0;
        lines.push({ id, name: it.name, spec: it.spec[ti], unit: it.unit, qty, rate, amt: qty * rate });
      }
      if (!lines.length) continue;
      const sub = lines.reduce((s, l) => s + l.amt, 0);
      rooms.push({ key: R.key, name: R.name, lines, sub });
      subtotal += sub;
    }
    const fee = Math.round(subtotal * SET.fee / 100), gst = Math.round((subtotal + fee) * SET.gst / 100);
    return { rooms, subtotal, fee, gst, total: subtotal + fee + gst, area };
  }
  function deltaFor(c, key) {
    const on = Object.assign({}, c, { req: Object.assign({}, c.req, { [key]: true }) }), off = Object.assign({}, c, { req: Object.assign({}, c.req, { [key]: false }) });
    return calc(on, c.tier).total - calc(off, c.tier).total;
  }

  /* ---------------- formatting ---------------- */
  const fmtINR = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const fmtRs = n => 'Rs. ' + Math.round(n).toLocaleString('en-IN');
  const fmtNum = n => Math.round(n).toLocaleString('en-IN');
  const fmtL = n => n >= 1e7 ? '₹' + (n / 1e7).toFixed(2) + ' Cr' : '₹' + (n / 1e5).toFixed(1) + ' L';
  const fmtRange = n => '₹' + (n * 0.95 / 1e5).toFixed(1) + ' – ' + (n * 1.08 / 1e5).toFixed(1) + ' L';
  const fmtDate = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const swatchesHTML = B => '<span class="sws">' + B.pal.map(([n, h]) => '<span class="sw" style="background:' + h + '" title="' + esc(n) + '"></span>').join('') + '</span>';
  const tpill = t => '<span class="tpill t-' + t + '">' + TIERS[t].name + '</span>';
  const validMobile = m => (m || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').length === 10;
  const validEmail = e => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const slug = s => String(s || 'home').trim().replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'home';
  const boardsOf = t => Object.keys(BOARDS).filter(k => BOARDS[k].tier === t);

  /* ---------------- the customer's choices (kept on this device) ---------------- */
  const SAVE_FIELDS = ['name', 'mobile', 'email', 'society', 'callTime', 'message', 'locality', 'bhk', 'area', 'purpose', 'possession', 'family', 'req', 'priorities', 'tier', 'board'];
  function normalize(d) {
    const c = Object.assign({ name: '', mobile: '', email: '', society: '', callTime: CALL_TIMES[0], message: '', locality: 'Kokar', bhk: 1, area: 900, purpose: 'Move in', possession: 'Within 3 months', family: [], req: {}, priorities: [], tier: 's', board: 's1' }, d || {});
    c.req = Object.assign({}, CAT.defaultReq, c.req || {});
    if (!BOARDS[c.board]) c.board = 's1';
    if (TK.indexOf(c.tier) < 0) c.tier = BOARDS[c.board].tier;
    c.bhk = Math.max(0, Math.min(3, Number(c.bhk) || 0));
    c.area = Number(c.area) || STD_AREA[c.bhk];
    c.family = Array.isArray(c.family) ? c.family.slice() : [];
    c.priorities = Array.isArray(c.priorities) ? c.priorities.slice() : [];
    if (CAT.localities.indexOf(c.locality) < 0) c.locality = 'Other';
    if (CALL_TIMES.indexOf(c.callTime) < 0) c.callTime = CALL_TIMES[0];
    ['name', 'mobile', 'email', 'society', 'message'].forEach(k => { c[k] = String(c[k] || ''); });
    return c;
  }
  function newQuoteNo() { const d = new Date(); return 'IC-E-' + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(); }
  const LS_KEY = 'inspacecraft-studio-v4';
  let C = normalize({});
  const cur = () => C;
  const state = { view: 'studio', step: 1, mtier: 's', quoteNo: newQuoteNo(), sending: false, status: '', result: null, lastSentKey: '', confirmReset: false, restored: false, board: null, roomKey: 'living', req: { name: '', mobile: '', city: 'Ranchi', room: CAT.requestRooms[0], tier: 's', board: '', prompt: '' }, reqSending: false, reqResult: null };
  function loadLocal() {
    try {
      const d = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (!d || d.v !== 4 || !d.c) return;
      C = normalize(d.c);
      state.step = Math.max(1, Math.min(LAST, Number(d.step) || 1));
      if (d.quoteNo) state.quoteNo = String(d.quoteNo);
      state.lastSentKey = String(d.lastSentKey || '');
      state.restored = true;
    } catch (e) { /* storage unavailable: start fresh */ }
  }
  let lsTimer = 0;
  function persist() {
    clearTimeout(lsTimer);
    lsTimer = setTimeout(() => {
      try { const c = {}; SAVE_FIELDS.forEach(k => { c[k] = C[k]; }); localStorage.setItem(LS_KEY, JSON.stringify({ v: 4, c, step: state.step, quoteNo: state.quoteNo, lastSentKey: state.lastSentKey })); } catch (e) { /* nothing to keep */ }
    }, 400);
  }
  function startOver() {
    try { localStorage.removeItem(LS_KEY); } catch (e) { /* ignore */ }
    C = normalize({});
    Object.assign(state, { step: 1, mtier: 's', quoteNo: newQuoteNo(), result: null, lastSentKey: '', confirmReset: false, restored: false });
    goView('studio'); toast('Started a new estimate');
  }

  /* ---------------- studio steps ---------------- */
  function navRow(step) {
    return '<div class="navrow">' + (step > 1 ? '<button type="button" class="btn ghost" data-act="go" data-step="' + (step - 1) + '">Back</button>' : '<span></span>') +
      '<button type="button" class="btn" data-act="next">' + NEXT[step] + '</button></div>';
  }
  function field(id, label, control) { return '<div class="field"><label for="f-' + id + '">' + label + '</label>' + control + '</div>'; }
  function selectHTML(id, opts, v, attr) { return '<select id="' + id + '" ' + attr + '>' + opts.map(o => '<option' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>'; }
  function chip(group, x, on) { return '<button type="button" class="opt" data-act="chip" data-g="' + group + '" data-v="' + esc(x) + '" aria-pressed="' + on + '">' + esc(x) + '</button>'; }
  function resetHTML() {
    return state.confirmReset
      ? '<div class="reset-row"><span class="hint">Clear this estimate and start again?</span><button type="button" class="btn sm" data-act="resetyes">Yes, start over</button><button type="button" class="link" data-act="resetno">Keep it</button></div>'
      : '<button type="button" class="link quiet" data-act="reset">Start a new estimate</button>';
  }
  function stepHome(c) {
    return '<div class="panel">' +
      (state.restored ? '<div class="note ok"><div><b>Welcome back.</b> Your choices are as you left them on this device.</div><div class="reset-slot">' + resetHTML() + '</div></div>' : '') +
      '<div class="p-head"><div><h2>Tell us about your home</h2><p class="lead">It takes a minute. Your estimate updates as you go, and nothing is sent until you save your PDF.</p></div></div>' +
      '<form class="stack" novalidate>' +
      '<div class="field"><span class="lbl">Your floorplan</span><div class="seg">' + BHK.map((x, i) => '<button type="button" class="opt" data-act="bhk" data-v="' + i + '" aria-pressed="' + (c.bhk === i) + '">' + x + '</button>').join('') + '</div></div>' +
      '<div class="fgrid three">' +
      field('area', 'Carpet area (sq ft)', '<input id="f-area" data-f="area" type="number" min="200" max="6000" step="10" inputmode="numeric" value="' + c.area + '"><p class="hint">Typical ' + BHK[c.bhk] + ': ' + fmtNum(STD_AREA[c.bhk]) + ' sq ft. Not sure? Keep the typical size.</p>') +
      field('locality', 'Locality', selectHTML('f-locality', CAT.localities, c.locality, 'data-f="locality"')) +
      field('possession', 'When do you get the keys?', selectHTML('f-possession', CAT.possession, c.possession, 'data-f="possession"')) +
      '</div>' +
      '<div class="field"><span class="lbl">This home is to</span><div class="seg">' + CAT.purpose.map(x => '<button type="button" class="opt" data-act="purpose" data-v="' + x + '" aria-pressed="' + (c.purpose === x) + '">' + x + '</button>').join('') + '</div></div>' +
      '<div class="field"><span class="lbl">Who lives here</span><div class="seg">' + CAT.family.map(x => chip('family', x, c.family.indexOf(x) >= 0)).join('') + '</div></div>' +
      '</form>' + navRow(1) + '</div>';
  }
  function stepNeeds(c) {
    const b = c.bhk, T = TIERS[c.tier];
    const rooms = ROOMS.filter(R => R.key !== 'whole' && !(R.min && b < R.min) && !(R.req && !c.req[R.req])).map(R => R.name);
    const studyWhere = b >= 2 ? 'Kids bedroom' : b === 1 ? 'Bedroom 2' : 'Master bedroom';
    const tiles = CAT.reqs.map(r => '<button type="button" class="tile" data-act="req" data-v="' + r.key + '" aria-pressed="' + !!c.req[r.key] + '">' +
      '<span class="art"><img src="' + IMG(r.img) + '" alt=""></span>' +
      '<span class="meta"><span class="nm">' + r.name + '</span><span class="wh">' + (r.key === 'study' ? studyWhere : r.where) + '</span><span class="delta">+' + fmtINR(deltaFor(c, r.key)) + '</span></span>' +
      '<span class="check" aria-hidden="true">✓</span></button>').join('');
    const incl = CAT.included.filter(x => !(x.min && b < x.min)).map(x => '<figure><img src="' + IMG(x.img) + '" alt="' + x.name + '"></figure>').join('');
    return '<div class="panel"><div class="p-head"><div><h2>What do you need?</h2><p class="lead">One complete-home package for your ' + BHK[b] + '. Tap an extra to add or remove it. Prices are for the ' + T.name + ' package and include GST.</p></div></div>' +
      '<div class="stack">' +
      '<div><h3 class="gt">Rooms covered</h3><div class="rooms">' + rooms.map(n => '<span class="room">' + n + '</span>').join('') + '</div></div>' +
      '<div><h3 class="gt">Choose extras</h3><div class="tiles">' + tiles + '</div></div>' +
      '<div><h3 class="gt">Included in every package</h3><div class="incl">' + incl + '</div></div>' +
      '<div><h3 class="gt">What matters most to you</h3><div class="seg">' + CAT.priorities.map(p => chip('priorities', p, c.priorities.indexOf(p) >= 0)).join('') + '</div><p class="hint mt">Our designer reads these before calling you. They do not change the price.</p></div>' +
      '</div>' + navRow(2) + '</div>';
  }
  function boardCard(id, c) {
    const B = BOARDS[id], sel = c.board === id;
    return '<div class="board' + (sel ? ' is-sel' : '') + '">' +
      '<a class="collage' + (B.imgs.length === 2 ? ' two' : '') + '" href="#board-' + id + '" aria-label="Open the ' + esc(B.name) + ' mood board">' + B.imgs.map(n => '<img src="' + IMG(n) + '" alt="">').join('') + '</a>' +
      '<div class="bmeta"><div class="brow"><h4>' + esc(B.name) + '</h4>' + swatchesHTML(B) + '</div><p class="bnote">' + B.note + '</p>' +
      '<div class="bact"><a class="link" href="#board-' + id + '">Open mood board</a>' +
      '<button type="button" class="btn sm' + (sel ? '' : ' ghost') + '" data-act="pick" data-v="' + id + '" aria-pressed="' + sel + '">' + (sel ? 'Selected' : 'Choose this look') + '</button></div></div></div>';
  }
  function stepStyle(c) {
    const totals = TK.map(t => calc(c, t).total), area = calc(c, c.tier).area;
    const cols = TK.map((t, i) => {
      const T = TIERS[t];
      return '<article class="tier' + (c.tier === t ? ' is-sel' : '') + '" data-tier="' + t + '">' +
        '<header><div class="tname"><h3>' + T.name + '</h3><span class="tag' + (t === 's' ? ' hot' : '') + '">' + T.tag + '</span></div>' +
        '<p class="price">' + fmtRange(totals[i]) + '</p><p class="psub">Incl. GST · your ' + BHK[c.bhk] + ', ' + fmtNum(area) + ' sq ft</p>' +
        '<p class="tmeta">Ready in ' + T.days + ' days · ' + T.warranty + ' warranty</p></header>' +
        '<dl class="mats">' + MATERIALS.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v[i] + '</dd></div>').join('') + '</dl>' +
        '<div class="boards">' + boardsOf(t).map(id => boardCard(id, c)).join('') + '</div></article>';
    }).join('');
    return '<div class="panel"><div class="p-head"><div><h2>Choose your package and look</h2><p class="lead">Each package has its own materials and two mood boards from our projects. Prices are for your ' + BHK[c.bhk] + ' with the extras you picked.</p></div>' +
      '<div class="row-btns"><a class="btn ghost sm" href="#compare">Compare packages</a><a class="btn ghost sm" href="#rooms">Same room, 3 packages</a></div></div>' +
      '<div class="tswitch seg" role="group" aria-label="Package">' + TK.map(t => '<button type="button" class="opt" data-act="mtier" data-v="' + t + '" aria-pressed="' + (state.mtier === t) + '">' + TIERS[t].name + '</button>').join('') + '</div>' +
      '<div class="tiers" data-show="' + state.mtier + '">' + cols + '</div>' + navRow(3) + '</div>';
  }
  function scheduleHTML(c) {
    const rooms = vizRoomsFor(c), n = rooms.reduce((s, r) => s + CAT.vizRooms[r].slots.length, 0);
    return '<details class="sched"><summary><span>Colours and finishes in your look</span><span class="hint">' + n + ' choices across ' + rooms.length + ' rooms</span></summary>' +
      '<div class="tbl-wrap"><table class="cmp sch"><thead><tr><th scope="col">Room</th><th scope="col">Element</th><th scope="col">Colour</th><th scope="col">Finish</th></tr></thead><tbody>' +
      rooms.map(room => CAT.vizRooms[room].slots.map((s, i) => {
        const r = resolve(c.board, c.tier, room, s);
        return '<tr>' + (i === 0 ? '<th scope="rowgroup" rowspan="' + CAT.vizRooms[room].slots.length + '">' + esc(CAT.vizRooms[room].label) + '</th>' : '') +
          '<td>' + esc(slotLabel(room, s)) + '</td><td><span class="sch-c"><i class="chipc" style="--sw:' + r.hex + '"></i>' + esc(r.name) + ' <small>' + esc(r.code) + '</small></span></td><td>' + esc(r.finishName || '—') + '</td></tr>';
      }).join('')).join('') + '</tbody></table></div></details>';
  }
  const sendOn = () => !!CFG.submitUrl || CFG.showSetup;
  function waLink(text) {
    if (!CFG.whatsapp) return '';
    return '<a class="btn ghost" href="https://wa.me/' + encodeURIComponent(CFG.whatsapp) + '?text=' + encodeURIComponent(text || ('Hi InspaceCraft, I made an estimate in your Design Studio (' + state.quoteNo + '). Please call me back.')) + '" target="_blank" rel="noopener">Chat on WhatsApp</a>';
  }
  function lf(id, label, type, ac, value, ph, mode) {
    return '<div class="field"><label for="l-' + id + '">' + label + '</label><input id="l-' + id + '" data-lf="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (mode ? ' inputmode="' + mode + '"' : '') + ' value="' + esc(value) + '" placeholder="' + esc(ph) + '"><p class="err" id="le-' + id + '" hidden></p></div>';
  }
  function resultHTML() {
    const r = state.result;
    if (!r) return '';
    const copy = {
      sent: ['ok', 'Your PDF is saved, and InspaceCraft has your details. A designer will call you soon.'],
      skip: ['ok', 'Your PDF is saved. InspaceCraft already has these details from your last save.'],
      off: ['ok', 'Your PDF is saved.' + (CFG.showSetup ? ' The Google Sheet link is not connected yet, so these details were not sent.' : '')],
      preview: ['ok', 'Your PDF is saved.' + (CFG.showSetup ? ' Sending works on your website; this preview inside Claude blocks outside connections.' : '')],
      failed: ['warn', 'Your PDF is saved, but your details could not be sent. Please call us on ' + CAT.brand.phone + ' or message us on WhatsApp.'],
      declined: ['warn', 'The PDF was not saved, so nothing was sent. Press Save as PDF to try again.'],
      error: ['warn', 'The PDF could not be created. Check your internet connection and try again.']
    }[r] || ['warn', 'Something went wrong. Please try again.'];
    return '<div class="note ' + copy[0] + '" role="status"><div>' + esc(copy[1]) + '</div></div>';
  }
  function leadHTML(c) {
    return '<section class="lead-box" id="lead" aria-labelledby="lead-h">' +
      '<div class="lead-head"><p class="gt">Estimate ' + esc(state.quoteNo) + '</p><h3 id="lead-h">Save your estimate as a PDF</h3><p class="lead">The PDF has your package, look, colours and the full estimate.' + (sendOn() ? ' A copy goes to InspaceCraft so a designer can call you with a free site visit.' : '') + '</p></div>' +
      '<form id="f-lead" class="stack" novalidate>' +
      '<div class="fgrid">' +
      lf('name', 'Full name', 'text', 'name', c.name, 'Your name') +
      lf('mobile', 'Mobile number', 'tel', 'tel', c.mobile, '10-digit mobile', 'tel') +
      lf('email', 'Email (optional)', 'email', 'email', c.email, 'name@example.com', 'email') +
      lf('society', 'Society or building (optional)', 'text', 'address-line1', c.society, 'Building and tower') +
      '</div><div class="fgrid">' +
      '<div class="field"><label for="l-callTime">Best time to call</label>' + selectHTML('l-callTime', CALL_TIMES, c.callTime, 'data-lf="callTime"') + '</div>' +
      '<div class="field"><label for="l-message">Anything else? (optional)</label><textarea id="l-message" data-lf="message" rows="2" placeholder="For example: we want a study corner in the living room">' + esc(c.message) + '</textarea></div>' +
      '</div>' +
      '<div class="hp" aria-hidden="true"><label for="l-website">Leave this empty</label><input id="l-website" name="website" tabindex="-1" autocomplete="off"></div>' +
      '<div class="lead-act"><button type="submit" class="btn" id="pdf-btn"' + (state.sending ? ' disabled' : '') + '>' + (state.sending ? esc(state.status || 'Preparing…') : 'Save as PDF') + '</button>' + waLink() + '<a class="btn ghost" href="#request">Request a 3D design</a></div>' +
      (sendOn() ? '<p class="hint">By saving, you agree that InspaceCraft can call or message you about this estimate.</p>' : '') +
      '</form><div id="lead-result">' + resultHTML() + '</div><div class="reset-slot lead-reset">' + resetHTML() + '</div></section>';
  }
  function stepEstimate(c) {
    const q = calc(c, c.tier), B = BOARDS[c.board], T = TIERS[c.tier];
    const today = new Date(), valid = new Date(today.getTime() + 15 * 864e5);
    const rooms = q.rooms.map((r, ri) =>
      '<details' + (ri === 0 ? ' open' : '') + '><summary><span class="rn">' + r.name + '</span><span class="rs">' + fmtINR(r.sub) + '</span></summary>' +
      '<div class="row hdr"><span>#</span><span>Item and specification</span><span class="r">Qty</span><span class="r">Rate</span><span class="r">Amount</span></div>' +
      r.lines.map((l, i) => {
        const qs = fmtNum(l.qty) + ' ' + l.unit;
        return '<div class="row"><span class="num">' + (ri + 1) + '.' + (i + 1) + '</span><span class="item"><b>' + l.name + '</b><span class="spec">' + esc(l.spec) + '</span><span class="calc">' + qs + (CFG.showRates ? ' × ' + fmtINR(l.rate) : '') + '</span></span><span class="qty">' + qs + '</span><span class="rate">' + (CFG.showRates ? fmtINR(l.rate) : '') + '</span><span class="amt">' + fmtINR(l.amt) + '</span></div>';
      }).join('') + '</details>').join('');
    return '<div class="panel quote' + (CFG.showRates ? '' : ' no-rates') + '">' +
      '<div class="q-top"><div class="q-brand"><span class="plate"><img class="qlogo" src="img/logo.png" alt="InspaceCraft"></span><div><h2>Your estimate</h2><p class="lead">Complete home interiors · ' + T.name + ' package</p></div></div>' +
      '<dl class="q-meta"><div><dt>Estimate no.</dt><dd>' + esc(state.quoteNo) + '</dd></div><div><dt>Date</dt><dd>' + fmtDate(today) + '</dd></div><div><dt>Valid till</dt><dd>' + fmtDate(valid) + '</dd></div></dl></div>' +
      '<div class="q-parties">' +
      '<div><p class="gt">Your home</p><p class="strong">' + BHK[c.bhk] + ' · ' + fmtNum(q.area) + ' sq ft</p><p>' + esc(c.locality) + ', Ranchi · ' + esc(c.purpose) + '</p></div>' +
      '<div><p class="gt">Package</p><p class="strong">' + T.name + '</p><p>Ready in ' + T.days + ' days · ' + T.warranty + ' warranty</p></div>' +
      '<div class="q-look"><img src="' + IMG(B.imgs[0]) + '" alt="' + esc(ALT[B.imgs[0]] || '') + '"><div><p class="gt">Your look</p><p class="strong">' + esc(B.name) + '</p>' + swatchesHTML(B) + '</div></div>' +
      '</div>' +
      '<div class="q-sum"><div class="gcell"><span>Estimated total</span><b>' + fmtINR(q.total) + '</b><small>About ' + fmtINR(q.total / q.area) + ' per sq ft</small></div>' +
      '<div><span>Subtotal</span><b>' + fmtINR(q.subtotal) + '</b></div><div><span>GST ' + SET.gst + '%</span><b>' + fmtINR(q.gst) + '</b></div><div><span>Ready in</span><b>' + T.days + ' days</b></div></div>' +
      '<p class="hint mt">This estimate uses standard sizes for a ' + BHK[c.bhk] + '. Your final quote follows a free site visit and measurement.</p>' +
      '<div class="q-switch"><span>Same home in other packages:</span>' + TK.map(t => '<button type="button" class="opt" data-act="qtier" data-v="' + t + '" aria-pressed="' + (c.tier === t) + '">' + TIERS[t].name + ' · ' + fmtL(calc(c, t).total) + '</button>').join('') + '<a class="link" href="#compare">Compare in detail</a></div>' +
      leadHTML(c) +
      '<h3 class="sec">Your look: ' + esc(B.name) + '</h3><div class="qr-grid">' + B.imgs.map(n => '<a class="qr" href="#board-' + c.board + '"><img src="' + IMG(n) + '" alt="' + esc(ALT[n] || '') + '"><span>' + esc(ALT[n] || '') + '</span></a>').join('') + '</div>' + scheduleHTML(c) +
      '<h3 class="sec">What the estimate covers</h3><div class="boq">' + rooms + '</div>' +
      '<div class="q-bottom"><div>' +
      '<h3 class="sec">Payment schedule</h3><div class="pay">' + CAT.pay.map(([p, l]) => '<div><b>' + p + '%</b><span>' + l + '</span><em>' + fmtINR(q.total * p / 100) + '</em></div>').join('') + '</div>' +
      '<h3 class="sec">Not included</h3><ul class="ticks">' + CAT.notIncluded.filter(x => x.indexOf('3D') < 0).map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
      '</div><dl class="q-totals">' +
      '<div><dt>Subtotal</dt><dd>' + fmtINR(q.subtotal) + '</dd></div>' +
      '<div><dt>Design and project management</dt><dd>' + (q.fee ? fmtINR(q.fee) : 'Included') + '</dd></div>' +
      '<div><dt>GST ' + SET.gst + '%</dt><dd>' + fmtINR(q.gst) + '</dd></div>' +
      '<div class="gtot"><dt>Estimated total</dt><dd>' + fmtINR(q.total) + '</dd></div>' +
      '</dl></div></div>';
  }
  function asideHTML(c) {
    const B = BOARDS[c.board], totals = TK.map(t => calc(c, t).total), max = Math.max.apply(null, totals), q = calc(c, c.tier);
    return '<div class="sum">' +
      '<p class="gt"><span>Your home</span><span class="badge ok">Kept on this device</span></p>' +
      '<div><p class="sname">' + BHK[c.bhk] + ' · ' + fmtNum(q.area) + ' sq ft</p><p class="ssub">' + esc(c.locality) + ', Ranchi · ' + esc(c.purpose) + '</p></div>' +
      '<div class="slook"><img src="' + IMG(B.imgs[0]) + '" alt="' + esc(ALT[B.imgs[0]] || '') + '"><div>' + tpill(c.tier) + '<b>' + esc(B.name) + '</b>' + swatchesHTML(B) + '</div></div>' +
      '<div class="stot"><span>Estimated total</span><b>' + fmtINR(q.total) + '</b><small>Incl. GST · about ' + fmtINR(q.total / q.area) + ' per sq ft</small></div>' +
      '<div class="bars" role="group" aria-label="Switch package">' + TK.map((t, i) => '<button type="button" class="bar' + (c.tier === t ? ' on' : '') + '" data-act="qtier" data-v="' + t + '"><span class="bl">' + TIERS[t].name + '</span><span class="bt"><span style="width:' + (totals[i] / max * 100).toFixed(1) + '%"></span></span><span class="bv">' + fmtL(totals[i]) + '</span></button>').join('') + '</div>' +
      '<button type="button" class="btn full" data-act="next">' + NEXT[state.step] + '</button>' +
      '<div class="reset-slot">' + resetHTML() + '</div></div>';
  }
  function renderMbar() {
    const c = cur(), B = BOARDS[c.board], el = $('#mbar');
    if (state.view !== 'studio') { el.innerHTML = ''; return; }
    el.innerHTML = '<div><span class="mb-t">' + TIERS[c.tier].name + ' · ' + esc(B.name) + '</span><b>' + fmtINR(calc(c, c.tier).total) + '</b></div><button type="button" class="btn" data-act="next"' + (state.sending ? ' disabled' : '') + '>' + (state.sending ? 'Saving…' : NEXT_SHORT[state.step]) + '</button>';
  }
  function renderStudio() {
    const c = cur();
    $('#steps').innerHTML = STEPS.map(([l, s], i) => {
      const n = i + 1, done = n < state.step;
      return '<li><button type="button" class="step' + (done ? ' done' : '') + '" data-act="go" data-step="' + n + '"' + (state.step === n ? ' aria-current="step"' : '') + '><span class="n">' + (done ? '✓' : n) + '</span><span class="l">' + l + '</span><span class="s">' + s + '</span></button></li>';
    }).join('');
    $('#stepbody').innerHTML = [null, stepHome, stepNeeds, stepStyle, stepEstimate][state.step](c);
    $('#aside').innerHTML = asideHTML(c);
    renderMbar();
  }
  function renderLive() { const a = $('#aside'); if (a) a.innerHTML = asideHTML(cur()); renderMbar(); }
  function refreshReset() { $$('.reset-slot').forEach(el => { el.innerHTML = resetHTML(); }); }

  /* ---------------- page: compare packages ---------------- */
  function pageCompare() {
    const c = cur(), qs = TK.map(t => calc(c, t)), sel = t => c.tier === t ? ' class="sel"' : '';
    const roomKeys = qs[1].rooms.map(r => r.key);
    const roomRow = key => {
      const name = qs[1].rooms.find(r => r.key === key).name;
      return '<tr><th scope="row">' + esc(name) + '</th>' + TK.map((t, i) => { const r = qs[i].rooms.find(x => x.key === key); return '<td' + sel(t) + '>' + (r ? fmtINR(r.sub) : '—') + '</td>'; }).join('') + '</tr>';
    };
    return '<div class="panel">' +
      '<div class="p-head"><div><p class="gt">Package comparison</p><h2>Essential, Comfort and Luxury side by side</h2><p class="lead">Prices are for your ' + BHK[c.bhk] + ' of ' + fmtNum(qs[0].area) + ' sq ft with the extras you picked, including GST. <a class="link" href="#" data-act="tostep" data-step="1">Change your home</a></p></div></div>' +
      '<div class="cmp-cards">' + TK.map((t, i) => {
        const T = TIERS[t], b0 = BOARDS[boardsOf(t)[0]];
        return '<article class="cmp-card' + (c.tier === t ? ' is-sel' : '') + '"><img src="' + IMG(b0.imgs[0]) + '" alt="' + esc(ALT[b0.imgs[0]] || '') + '">' +
          '<div class="cmp-body"><div class="tname"><h3>' + T.name + '</h3><span class="tag' + (t === 's' ? ' hot' : '') + '">' + T.tag + '</span></div>' +
          '<p class="price">' + fmtINR(qs[i].total) + '</p><p class="psub">About ' + fmtINR(qs[i].total / qs[i].area) + ' per sq ft</p>' +
          '<button type="button" class="btn sm' + (c.tier === t ? '' : ' ghost') + '" data-act="choosetier" data-v="' + t + '">' + (c.tier === t ? 'Your package' : 'Choose ' + T.name) + '</button></div></article>';
      }).join('') + '</div>' +
      '<h3 class="sec">Materials and service</h3><div class="tbl-wrap"><table class="cmp"><thead><tr><th scope="col"></th>' + TK.map(t => '<th scope="col"' + sel(t) + '>' + TIERS[t].name + '</th>').join('') + '</tr></thead><tbody>' +
      MATERIALS.map(([k, v]) => '<tr><th scope="row">' + k + '</th>' + TK.map((t, i) => '<td' + sel(t) + '>' + v[i] + '</td>').join('') + '</tr>').join('') +
      '<tr><th scope="row">Warranty</th>' + TK.map(t => '<td' + sel(t) + '>' + TIERS[t].warranty + '</td>').join('') + '</tr>' +
      '<tr><th scope="row">Ready in</th>' + TK.map(t => '<td' + sel(t) + '>' + TIERS[t].days + ' days</td>').join('') + '</tr>' +
      '<tr><th scope="row">Mood boards</th>' + TK.map(t => '<td' + sel(t) + '>' + boardsOf(t).map(id => '<a class="link" href="#board-' + id + '">' + esc(BOARDS[id].name) + '</a>').join('<br>') + '</td>').join('') + '</tr>' +
      '</tbody></table></div>' +
      '<h3 class="sec">Price room by room</h3><div class="tbl-wrap"><table class="cmp"><thead><tr><th scope="col">Room</th>' + TK.map(t => '<th scope="col"' + sel(t) + '>' + TIERS[t].name + '</th>').join('') + '</tr></thead><tbody>' +
      roomKeys.map(roomRow).join('') +
      '<tr><th scope="row">GST ' + SET.gst + '%</th>' + TK.map((t, i) => '<td' + sel(t) + '>' + fmtINR(qs[i].gst) + '</td>').join('') + '</tr>' +
      '<tr class="tot"><th scope="row">Total</th>' + TK.map((t, i) => '<td' + sel(t) + '>' + fmtINR(qs[i].total) + '</td>').join('') + '</tr></tbody></table></div>' +
      '<div class="navrow"><a class="btn ghost" href="#rooms">See the same room in each package</a><button type="button" class="btn" data-act="tostep" data-step="4">See my estimate</button></div></div>';
  }

  /* ---------------- page: one mood board ---------------- */
  function pageBoard(id) {
    const B = BOARDS[id], c = cur(), t = B.tier, T = TIERS[t], ti = TK.indexOf(t);
    const cc = Object.assign({}, c, { tier: t, board: id }), price = calc(cc, t).total;
    const rooms = vizRoomsFor(cc);
    const others = Object.keys(BOARDS).filter(k => k !== id);
    return '<div class="panel">' +
      '<p class="crumbs"><a class="link" href="#">Studio</a> / <a class="link" href="#compare">Packages</a> / ' + esc(B.name) + '</p>' +
      '<div class="p-head"><div><p class="gt">' + T.name + ' mood board</p><h2>' + esc(B.name) + '</h2><p class="lead">' + B.note + ' The photos are InspaceCraft projects in this style.</p></div>' +
      '<div class="d-pill">' + tpill(t) + '<span>' + fmtINR(price) + ' for your ' + BHK[c.bhk] + '</span></div></div>' +
      '<div class="mb-gal' + (B.imgs.length === 2 ? ' two' : '') + '">' + B.imgs.map((n, i) => '<figure' + (i === 0 ? ' class="main"' : '') + '><img src="' + IMG(n) + '" alt="' + esc(ALT[n] || '') + '"><figcaption>' + esc(ALT[n] || '') + '</figcaption></figure>').join('') + '</div>' +
      '<h3 class="sec">Colour palette</h3><div class="pal">' + B.pal.map(([n, h]) => '<div><i style="background:' + h + '"></i><b>' + esc(n) + '</b><span>' + h + '</span></div>').join('') + '</div>' +
      '<h3 class="sec">Materials in ' + T.name + '</h3><dl class="mats two">' + MATERIALS.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v[ti] + '</dd></div>').join('') + '</dl>' +
      '<h3 class="sec">Room by room</h3><div class="mb-rooms">' + rooms.map(room => '<div class="mb-room"><h4>' + esc(CAT.vizRooms[room].label) + '</h4><ul>' + CAT.vizRooms[room].slots.map(s => { const r = resolve(id, t, room, s); return '<li><i class="chipc" style="--sw:' + r.hex + '"></i><span>' + esc(slotLabel(room, s)) + '</span><b>' + esc(r.name) + '</b>' + (r.finishName ? '<small>' + esc(r.finishName) + '</small>' : '') + '</li>'; }).join('') + '</ul></div>').join('') + '</div>' +
      '<div class="navrow"><button type="button" class="btn ghost" data-act="reqboard" data-v="' + id + '">Request a 3D design in this look</button><button type="button" class="btn" data-act="pickgo" data-v="' + id + '">' + (c.board === id ? 'Keep this look and see my estimate' : 'Choose this look') + '</button></div>' +
      '<h3 class="sec">Other mood boards</h3><div class="mb-others">' + others.map(k => '<a class="qr" href="#board-' + k + '"><img src="' + IMG(BOARDS[k].imgs[0]) + '" alt=""><span>' + esc(BOARDS[k].name) + ' · ' + TIERS[BOARDS[k].tier].name + '</span></a>').join('') + '</div></div>';
  }

  /* ---------------- page: same room in each package ---------------- */
  function pageRooms() {
    const room = CAT.roomCompare.find(r => r.key === state.roomKey) || CAT.roomCompare[0];
    return '<div class="panel">' +
      '<div class="p-head"><div><p class="gt">Same room, three packages</p><h2>See what changes from Essential to Luxury</h2><p class="lead">Pick a room. Each picture shows that room as it looks in each package, with the materials that make the difference.</p></div></div>' +
      '<div class="seg mt" role="group" aria-label="Room">' + CAT.roomCompare.map(r => '<button type="button" class="opt" data-act="roomkey" data-v="' + r.key + '" aria-pressed="' + (r.key === room.key) + '">' + esc(r.name) + '</button>').join('') + '</div>' +
      '<div class="rc-grid">' + TK.map(t => '<article class="rc"><a class="rc-pic" href="img/compare/' + room.key + '-' + TIERS[t].name.toLowerCase() + '.webp" target="_blank" rel="noopener" title="Open full size"><img src="img/compare/' + room.key + '-' + TIERS[t].name.toLowerCase() + '.webp" alt="' + esc(room.name + ' in the ' + TIERS[t].name + ' package') + '" loading="lazy" width="1400" height="1050"></a><div class="rc-body"><div class="tname"><h3>' + TIERS[t].name + '</h3>' + tpill(t) + '</div><p>' + esc(room.notes[t]) + '</p></div></article>').join('') + '</div>' +
      '<div class="navrow"><a class="btn ghost" href="#compare">Compare prices</a><a class="btn" href="#request">Request a 3D design of my room</a></div></div>';
  }

  /* ---------------- page: 3D design request ---------------- */
  function reqResultHTML() {
    const r = state.reqResult;
    if (!r) return '';
    const msg = {
      sent: ['ok', 'Thank you. Your 3D design request has reached our designers. We will call you to discuss it.'],
      preview: ['ok', 'Your request is ready to send. Sending works on your website; this preview inside Claude blocks outside connections.'],
      off: ['warn', 'Requests are not switched on yet. Please call us on ' + CAT.brand.phone + '.'],
      failed: ['warn', 'Your request could not be sent. Please try again, or call us on ' + CAT.brand.phone + '.']
    }[r];
    return '<div class="note ' + msg[0] + '" role="status"><div>' + esc(msg[1]) + '</div>' + (r === 'failed' ? waLink('Hi InspaceCraft, I would like a 3D design of my ' + state.req.room + ': ' + state.req.prompt.slice(0, 300)) : '') + '</div>';
  }
  function pageRequest() {
    const r = state.req;
    return '<div class="panel">' +
      '<div class="p-head"><div><p class="gt">3D design request</p><h2>Describe your room. We design it in 3D.</h2><p class="lead">Tell us in your own words how you want the room to feel. Our designers turn it into a 3D design for your home and call you to walk you through it. It is free.</p></div></div>' +
      '<form id="f-req" class="stack" novalidate>' +
      '<div class="field"><label for="r-prompt">How should the room look and feel?</label><textarea id="r-prompt" data-rq="prompt" rows="4" placeholder="For example: a calm master bedroom in warm wood and white, a full-height wardrobe, soft lighting and space for a study table">' + esc(r.prompt) + '</textarea><p class="err" id="re-prompt" hidden></p>' +
      '<div class="seg mt" aria-label="Ideas">' + CAT.promptIdeas.map(p => '<button type="button" class="opt sm" data-act="idea" data-v="' + esc(p) + '">+ ' + esc(p) + '</button>').join('') + '</div></div>' +
      '<div class="fgrid three">' +
      '<div class="field"><label for="r-room">Room</label>' + selectHTML('r-room', CAT.requestRooms, r.room, 'data-rq="room"') + '</div>' +
      '<div class="field"><label for="r-tier">Package</label><select id="r-tier" data-rq="tier">' + TK.map(t => '<option value="' + t + '"' + (r.tier === t ? ' selected' : '') + '>' + TIERS[t].name + '</option>').join('') + '</select></div>' +
      '<div class="field"><label for="r-board">Look (optional)</label><select id="r-board" data-rq="board"><option value="">No preference</option>' + Object.keys(BOARDS).map(k => '<option value="' + k + '"' + (r.board === k ? ' selected' : '') + '>' + esc(BOARDS[k].name) + ' · ' + TIERS[BOARDS[k].tier].name + '</option>').join('') + '</select></div>' +
      '</div><div class="fgrid three">' +
      '<div class="field"><label for="r-name">Your name</label><input id="r-name" data-rq="name" autocomplete="name" value="' + esc(r.name) + '"><p class="err" id="re-name" hidden></p></div>' +
      '<div class="field"><label for="r-mobile">Mobile number</label><input id="r-mobile" data-rq="mobile" type="tel" inputmode="tel" autocomplete="tel" value="' + esc(r.mobile) + '"><p class="err" id="re-mobile" hidden></p></div>' +
      '<div class="field"><label for="r-city">City</label><input id="r-city" data-rq="city" autocomplete="address-level2" value="' + esc(r.city) + '"></div>' +
      '</div>' +
      '<div class="hp" aria-hidden="true"><label for="r-website">Leave this empty</label><input id="r-website" tabindex="-1" autocomplete="off"></div>' +
      '<div class="lead-act"><button type="submit" class="btn" id="req-btn"' + (state.reqSending ? ' disabled' : '') + '>' + (state.reqSending ? 'Sending…' : 'Send my 3D request') + '</button></div>' +
      '<p class="hint">By sending, you agree that InspaceCraft can call or message you about this request.</p>' +
      '</form><div id="req-result">' + reqResultHTML() + '</div></div>';
  }
  async function sendRequest() {
    if (state.reqSending) return;
    const r = state.req;
    const err = (id, m) => { const e = $('#re-' + id); if (e) { e.textContent = m || ''; e.hidden = !m; } };
    err('prompt'); err('name'); err('mobile');
    let bad = null;
    if (r.prompt.trim().length < 10) { err('prompt', 'Describe the room in a sentence or two.'); bad = bad || 'r-prompt'; }
    if (r.name.trim().length < 2) { err('name', 'Enter your name.'); bad = bad || 'r-name'; }
    if (!validMobile(r.mobile)) { err('mobile', 'Enter a 10-digit mobile number.'); bad = bad || 'r-mobile'; }
    if (bad) { $('#' + bad).focus(); return; }
    if (($('#r-website') || {}).value) { state.reqResult = 'sent'; render(); return; }
    let result;
    if (!CFG.requestApi) result = 'off';
    else if (IN_CLAUDE) result = 'preview';
    else {
      state.reqSending = true; const b = $('#req-btn'); if (b) { b.disabled = true; b.textContent = 'Sending…'; }
      try {
        const res = await fetch(CFG.requestApi, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          name: r.name.trim(), contact: r.mobile.trim(), city: r.city.trim() || 'Ranchi', source: '3D design request',
          room: r.room, package: TIERS[r.tier].name, look: r.board ? BOARDS[r.board].name : '', prompt: r.prompt.trim().slice(0, 2000),
          message: '3D request · ' + r.room + ' · ' + TIERS[r.tier].name + (r.board ? ' · ' + BOARDS[r.board].name : '') + ' · ' + r.prompt.trim().slice(0, 1500)
        }) });
        result = res.ok ? 'sent' : 'failed';
      } catch (e) { result = 'failed'; }
      state.reqSending = false;
    }
    state.reqResult = result;
    if (result === 'sent') { if (window.fbq) window.fbq('track', 'Lead'); r.prompt = ''; }
    render();
  }

  /* ---------------- page: offers ---------------- */
  function pageOffers() {
    const today = new Date().toISOString().slice(0, 10);
    const live = CAT.offers.filter(o => !o.ends || o.ends >= today);
    return '<div class="panel">' +
      '<div class="p-head"><div><p class="gt">Offers</p><h2>Discounted interiors this season</h2><p class="lead">Limited-time prices on our most popular work. Ask for any offer and a designer will call you.</p></div>' +
      (CFG.showSetup ? '<span class="badge">Sample offers · edit in studio/catalog.js</span>' : '') + '</div>' +
      (live.length ? '<div class="offers">' + live.map(o => {
        const off = Math.round((1 - o.now / o.was) * 100);
        return '<article class="offer"><div class="of-img"><img src="' + IMG(o.img) + '" alt=""><span class="of-tag">' + off + '% off</span></div>' +
          '<div class="of-body"><h3>' + esc(o.title) + '</h3><p>' + esc(o.note) + '</p>' +
          '<p class="of-price"><b>' + fmtINR(o.now) + '</b> <s>' + fmtINR(o.was) + '</s></p>' +
          '<p class="hint">You save ' + fmtINR(o.was - o.now) + (o.ends ? ' · Ends ' + fmtDate(new Date(o.ends + 'T00:00:00')) : '') + '</p>' +
          '<button type="button" class="btn sm" data-act="offer" data-v="' + o.id + '">Ask for this offer</button></div></article>';
      }).join('') + '</div>' : '<div class="empty-r"><div>No offers are running right now. Check back soon.</div></div>') +
      '<p class="hint mt">Prices include GST and are for standard sizes. Offers cannot be combined.</p></div>';
  }

  /* ---------------- PDF and the Google Sheet ---------------- */
  const blobToDataUrl = b => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(b); });
  async function saveFile(filename, blob) {
    if (IN_CLAUDE) {
      let dl = null;
      try { dl = await window.claude.use('downloads'); } catch (e) { dl = null; }
      if (dl) {
        try { await dl.save({ filename, data: blob }); return true; }
        catch (e) { if (!e || e.code !== 'declined') toast('The file could not be saved here.'); return false; }
      }
      if (window.top !== window.self) { toast('Downloads are not available in this view.'); return false; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    return true;
  }
  function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s); }); }
  function hexRgb(h) { const x = h.replace('#', ''); return [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16)]; }
  async function buildPdf(c) {
    if (!(window.jspdf && window.jspdf.jsPDF)) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    const doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297, M = 14, CW = PW - 2 * M, bottom = PH - 18;
    const q = calc(c, c.tier), T = TIERS[c.tier], Bd = BOARDS[c.board];
    const today = new Date(), valid = new Date(Date.now() + 15 * 864e5);
    const INK = [22, 18, 19], MUTE = [122, 113, 116], LINE = [225, 218, 213];
    const col = a => doc.setTextColor(a[0], a[1], a[2]);
    const font = (w, s) => { doc.setFont('helvetica', w); doc.setFontSize(s); };
    const img = async n => blobToDataUrl(await (await fetch(n)).blob());
    let y = M;
    const ensure = h => { if (y + h > bottom) { doc.addPage(); y = M + 2; } };
    const heading = t => { ensure(14); font('bold', 11.5); col(INK); doc.text(t, M, y); y += 6; };
    try { doc.addImage(await img('img/logo.png'), 'PNG', M, y, 50, 13.9); } catch (e) { font('bold', 16); col(INK); doc.text('InspaceCraft', M, y + 9); }
    font('bold', 17); col(INK); doc.text('Estimate', PW - M, y + 6, { align: 'right' });
    font('normal', 9); col(MUTE);
    doc.text('Estimate no. ' + state.quoteNo, PW - M, y + 11.5, { align: 'right' });
    doc.text('Date ' + fmtDate(today) + '   Valid till ' + fmtDate(valid), PW - M, y + 16, { align: 'right' });
    y += 21; doc.setDrawColor(231, 28, 36); doc.setLineWidth(0.8); doc.line(M, y, PW - M, y); y += 7;
    const party = (x, label, lines) => { font('bold', 7.5); col(MUTE); doc.text(label.toUpperCase(), x, y); lines.filter(Boolean).forEach((l, i) => { font(i === 0 ? 'bold' : 'normal', 9.5); col(INK); doc.text(doc.splitTextToSize(String(l), CW / 3 - 4)[0] || '', x, y + 5 + i * 4.6); }); };
    party(M, 'Prepared for', [c.name || 'Customer', c.mobile, c.email, (c.society ? c.society + ', ' : '') + c.locality + ', Ranchi']);
    party(M + CW / 3, 'Home', [BHK[c.bhk] + ' · ' + fmtNum(q.area) + ' sq ft', c.purpose + ' · ' + c.possession, c.family.join(', ')]);
    party(M + 2 * CW / 3, 'Package and look', [T.name + ' · ' + Bd.name, 'Ready in ' + T.days + ' days', T.warranty + ' warranty']);
    y += 25;
    doc.setFillColor(253, 240, 240); doc.roundedRect(M, y, CW, 16, 2, 2, 'F');
    font('bold', 7.5); col(MUTE); doc.text('ESTIMATED TOTAL, INCLUDING GST', M + 5, y + 6);
    font('bold', 15); col(INK); doc.text(fmtRs(q.total), M + 5, y + 12.6);
    font('normal', 8.5); col(MUTE); doc.text('Subtotal ' + fmtRs(q.subtotal) + '   GST ' + SET.gst + '% ' + fmtRs(q.gst) + '   About ' + fmtRs(q.total / q.area) + ' per sq ft', PW - M - 5, y + 10, { align: 'right' });
    y += 21;
    font('normal', 8.2); col(MUTE); doc.text('This estimate uses standard sizes for a ' + BHK[c.bhk] + '. Your final quote follows a free site visit and measurement.', M, y); y += 7;
    heading('Your look: ' + Bd.name);
    const pics = Bd.imgs.slice(0, 3), w = (CW - 4 * (pics.length - 1)) / pics.length, h = w * 0.66;
    ensure(h + 8);
    for (let i = 0; i < pics.length; i++) { try { doc.addImage(await img(IMG(pics[i])), 'JPEG', M + i * (w + 4), y, w, h); } catch (e) { /* skip */ } }
    y += h + 4; font('normal', 8); col(MUTE); doc.text(Bd.note, M, y); y += 7;
    heading('What the estimate covers');
    const X = { item: M + 2, qty: PW - M - 60, rate: PW - M - 32, amt: PW - M - 2 };
    const header = () => { doc.setFillColor(247, 243, 238); doc.rect(M, y - 4, CW, 6.2, 'F'); font('bold', 7.2); col(MUTE); doc.text('ITEM AND SPECIFICATION', X.item, y); doc.text('QTY', X.qty, y, { align: 'right' }); if (CFG.showRates) doc.text('RATE', X.rate, y, { align: 'right' }); doc.text('AMOUNT', X.amt, y, { align: 'right' }); y += 5.5; };
    header();
    q.rooms.forEach((r, ri) => {
      if (y + 14 > bottom) { doc.addPage(); y = M + 4; header(); }
      font('bold', 9.5); col(INK); doc.text((ri + 1) + '. ' + r.name, X.item, y); doc.text(fmtRs(r.sub), X.amt, y, { align: 'right' });
      y += 1.8; doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.setLineWidth(0.2); doc.line(M, y, PW - M, y); y += 4.2;
      r.lines.forEach(l => {
        font('normal', 7.6);
        const spec = doc.splitTextToSize(l.spec, X.qty - X.item - 30), hgt = 4.2 + spec.length * 3.4;
        if (y + hgt > bottom) { doc.addPage(); y = M + 4; header(); }
        font('normal', 9); col(INK); doc.text(l.name, X.item + 3, y);
        doc.text(fmtNum(l.qty) + ' ' + l.unit, X.qty, y, { align: 'right' });
        if (CFG.showRates) doc.text(fmtRs(l.rate), X.rate, y, { align: 'right' });
        doc.text(fmtRs(l.amt), X.amt, y, { align: 'right' });
        font('normal', 7.6); col(MUTE); doc.text(spec, X.item + 3, y + 3.6);
        y += hgt;
      });
      y += 2;
    });
    ensure(32);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.line(PW - M - 92, y - 2, PW - M, y - 2); y += 3;
    const tl = (label, val, big) => { font(big ? 'bold' : 'normal', big ? 11 : 9.5); col(INK); doc.text(label, PW - M - 92, y); doc.text(val, X.amt, y, { align: 'right' }); y += big ? 7.5 : 5.6; };
    tl('Subtotal', fmtRs(q.subtotal)); tl('Design and project management', q.fee ? fmtRs(q.fee) : 'Included'); tl('GST ' + SET.gst + '%', fmtRs(q.gst)); tl('Estimated total', fmtRs(q.total), true);
    y += 3;
    heading('Colours and finishes in your look');
    vizRoomsFor(c).forEach(room => {
      const R = CAT.vizRooms[room];
      ensure(10 + R.slots.length * 4.4);
      font('bold', 9); col(INK); doc.text(R.label, M + 2, y); y += 4.6;
      R.slots.forEach(s => {
        const r = resolve(c.board, c.tier, room, s), rgb = hexRgb(r.hex);
        doc.setFillColor(rgb[0], rgb[1], rgb[2]); doc.setDrawColor(200, 195, 190); doc.roundedRect(M + 3, y - 2.8, 3.4, 3.4, 0.6, 0.6, 'FD');
        font('normal', 8.4); col(INK); doc.text(slotLabel(room, s), M + 9, y); doc.text(r.name + ' (' + r.code + ')', M + 70, y);
        col(MUTE); doc.text(r.finishName || '', M + 130, y); y += 4.4;
      });
      y += 1.5;
    });
    if (c.priorities.length || c.message) {
      heading('Notes for the designer'); font('normal', 9); col(INK);
      [c.priorities.length ? 'Priorities: ' + c.priorities.join(', ') : '', c.message ? 'Message: ' + c.message : ''].filter(Boolean).forEach(t => { const ls = doc.splitTextToSize(t, CW - 4); ensure(ls.length * 4.4); doc.text(ls, M + 2, y); y += ls.length * 4.4 + 1; });
      y += 2;
    }
    heading('Payment schedule');
    CAT.pay.forEach(([p, l]) => { ensure(6); font('normal', 9); col(INK); doc.text(p + '%  ' + l, M + 2, y); doc.text(fmtRs(q.total * p / 100), X.amt, y, { align: 'right' }); y += 5.2; });
    y += 2; heading('Not included');
    CAT.notIncluded.filter(x => x.indexOf('3D') < 0).forEach(x => { ensure(5); font('normal', 8.8); col(INK); doc.text('–  ' + x, M + 2, y); y += 4.8; });
    y += 2; heading('Next steps');
    ['Free site visit and measurement by an InspaceCraft designer.', 'Final quote and 3D designs for your exact sizes.', 'Design sign-off, then production and installation in ' + T.days + ' days.', 'Visit our design studio: ' + CAT.brand.address + '. Call ' + CAT.brand.phone + '.'].forEach((x, i) => { font('normal', 8.8); const ls = doc.splitTextToSize((i + 1) + '.  ' + x, CW - 4); ensure(ls.length * 4.4 + 1); col(INK); doc.text(ls, M + 2, y); y += ls.length * 4.4 + 0.8; });
    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) { doc.setPage(i); font('normal', 7.2); col(MUTE); doc.text(CAT.brand.name + ' · ' + CAT.brand.address + ' · ' + CAT.brand.phone + ' · ' + CAT.brand.email, M, PH - 8); doc.text('Page ' + i + ' of ' + n, PW - M, PH - 8, { align: 'right' }); }
    return doc.output('blob');
  }
  function leadKey() { const o = {}; SAVE_FIELDS.forEach(k => { o[k] = C[k]; }); return JSON.stringify(o); }
  function leadPayload(pdfBase64, pdfName, honeypot) {
    const c = C, q = calc(c, c.tier), T = TIERS[c.tier], B = BOARDS[c.board];
    const colours = vizRoomsFor(c).map(room => CAT.vizRooms[room].label + ': ' + CAT.vizRooms[room].slots.map(s => { const r = resolve(c.board, c.tier, room, s); return slotLabel(room, s) + ' ' + r.name + (r.finishName ? ' (' + r.finishName + ')' : ''); }).join('; ')).join(' | ');
    return {
      quoteNo: state.quoteNo, name: c.name.trim(), mobile: c.mobile.trim(), email: c.email.trim(), society: c.society.trim(),
      locality: c.locality, home: BHK[c.bhk], area: q.area, purpose: c.purpose, possession: c.possession,
      family: c.family.join(', '), priorities: c.priorities.join(', '), extras: CAT.reqs.filter(r => c.req[r.key]).map(r => r.name).join(', '),
      package: T.name, look: B.name, total: Math.round(q.total), subtotal: Math.round(q.subtotal), gst: Math.round(q.gst),
      colours, callTime: c.callTime, message: c.message.trim().slice(0, 1000),
      pdfName, pdfBase64: pdfBase64 || '', source: location.href.split('#')[0], website: honeypot || ''
    };
  }
  async function sendLead(payload) {
    if (!CFG.submitUrl) return 'off';
    if (IN_CLAUDE) return 'preview';
    try { await fetch(CFG.submitUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) }); return 'sent'; }
    catch (e) { return 'failed'; }
  }
  function setStatus(msg) {
    state.status = msg;
    const b = $('#pdf-btn'); if (b) { b.disabled = !!state.sending; b.textContent = state.sending ? msg : 'Save as PDF'; }
    renderMbar();
  }
  function setLeadErr(id, msg) { const e = $('#le-' + id), i = $('#l-' + id); if (e) { e.textContent = msg || ''; e.hidden = !msg; } if (i) i.setAttribute('aria-invalid', msg ? 'true' : 'false'); }
  function validateLead() {
    let first = null;
    if (C.name.trim().length < 2) { setLeadErr('name', 'Enter your name.'); first = first || 'name'; }
    if (!validMobile(C.mobile)) { setLeadErr('mobile', 'Enter a 10-digit mobile number.'); first = first || 'mobile'; }
    if (!validEmail(C.email.trim())) { setLeadErr('email', 'Check the email address, or leave it empty.'); first = first || 'email'; }
    if (first) { const el = $('#l-' + first); if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); } return false; }
    return true;
  }
  async function savePdf() {
    if (state.sending) return;
    if (state.view !== 'studio' || state.step !== LAST) { state.step = LAST; goView('studio'); }
    if (!validateLead()) return;
    const honeypot = ($('#l-website') || {}).value || '';
    state.sending = true; state.result = null;
    const res = $('#lead-result'); if (res) res.innerHTML = '';
    setStatus('Building your PDF…');
    try {
      const blob = await buildPdf(C);
      const fname = 'InspaceCraft-Estimate-' + slug(C.name) + '.pdf';
      const saved = await saveFile(fname, blob);
      let result = saved ? 'off' : 'declined';
      if (saved && CFG.submitUrl) {
        const key = leadKey();
        if (key === state.lastSentKey && !IN_CLAUDE) result = 'skip';
        else {
          setStatus('Sending to InspaceCraft…');
          const b64 = CFG.sendPdf ? (await blobToDataUrl(blob)).split(',')[1] : '';
          result = await sendLead(leadPayload(b64, fname, honeypot));
          if (result === 'sent') state.lastSentKey = key;
        }
      }
      state.result = result;
    } catch (e) { console.error(e); state.result = 'error'; }
    finally { state.sending = false; state.status = ''; setStatus(''); const r = $('#lead-result'); if (r) r.innerHTML = resultHTML(); persist(); }
  }

  /* ---------------- admin setup guide (hidden on the live site) ---------------- */
  const APPS_SCRIPT = String.raw`/**
 * InspaceCraft Design Studio -> Google Sheet
 * 1. Paste this into Extensions > Apps Script of your Google Sheet and press Save.
 * 2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 3. Copy the Web app URL into studio/config.js as submitUrl.
 */
const SHEET_NAME = 'Leads';
const FOLDER_NAME = 'InspaceCraft Studio PDFs';
const COLUMNS = [
  ['submittedAt', 'Submitted at'], ['quoteNo', 'Estimate no.'], ['name', 'Name'], ['mobile', 'Mobile'], ['email', 'Email'],
  ['society', 'Society or building'], ['locality', 'Locality'], ['home', 'Home'], ['area', 'Carpet area (sq ft)'], ['purpose', 'Purpose'],
  ['possession', 'Possession'], ['family', 'Who lives here'], ['priorities', 'Priorities'], ['extras', 'Extras'],
  ['package', 'Package'], ['look', 'Look'], ['total', 'Estimated total (Rs.)'], ['subtotal', 'Subtotal (Rs.)'], ['gst', 'GST (Rs.)'],
  ['colours', 'Colours and finishes'], ['callTime', 'Best time to call'], ['message', 'Message'], ['pdf', 'PDF'], ['source', 'Page']
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.website) return json_({ ok: true });
    if (!data.name || !data.mobile) return json_({ ok: false, error: 'Name and mobile are required' });
    let pdf = '';
    if (data.pdfBase64) {
      const bytes = Utilities.base64Decode(data.pdfBase64);
      const name = safeName_(data.pdfName || ((data.quoteNo || 'estimate') + '.pdf'));
      pdf = folder_().createFile(Utilities.newBlob(bytes, 'application/pdf', name)).getUrl();
    }
    const row = Object.assign({}, data, { submittedAt: new Date(), pdf: pdf, mobile: "'" + String(data.mobile) });
    sheet_().appendRow(COLUMNS.map(function (c) { return row[c[0]] == null ? '' : row[c[0]]; }));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'InspaceCraft Design Studio' });
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sh;
}

function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

function safeName_(s) {
  return String(s).replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
`;
  function pageSetup() {
    const steps = [
      ['Create the sheet', 'Open sheets.new while signed in to the Google account that should receive customers. Name it "InspaceCraft Studio Leads".'],
      ['Add the script', 'Extensions, then Apps Script. Delete the sample code, paste the code below and press Save.'],
      ['Publish it', 'Deploy, New deployment, type Web app. Execute as Me, Who has access Anyone. Deploy and allow access.'],
      ['Copy the link', 'Copy the Web app URL that ends in /exec.'],
      ['Paste it', 'Put it in studio/config.js as submitUrl. Every saved PDF then adds a row and saves the PDF in Drive.'],
      ['3D requests', 'These go to requestApi in studio/config.js, your existing lead backend. Its /lead route receives name, contact, city plus room, package, look and prompt.']
    ];
    return '<div class="panel"><div class="p-head"><div><p class="gt">For the InspaceCraft team</p><h2>Studio setup</h2><p class="lead">PDF estimates go to a Google Sheet. 3D design requests go to your lead backend. Offers, mood boards and room pictures are edited in studio/catalog.js.</p></div>' +
      '<span class="badge' + (CFG.submitUrl ? ' ok' : '') + '">' + (CFG.submitUrl ? 'Sheet link connected' : 'Sheet link not connected yet') + '</span></div>' +
      '<ol class="howto">' + steps.map(([h, p]) => '<li><b>' + h + '</b><span>' + p + '</span></li>').join('') + '</ol>' +
      '<h3 class="sec">Apps Script code</h3><div class="code"><pre>' + esc(APPS_SCRIPT) + '</pre><button type="button" class="btn sm ghost" data-act="copyscript">Copy code</button><textarea id="script-src" class="sr" readonly>' + esc(APPS_SCRIPT) + '</textarea></div>' +
      (IN_CLAUDE ? '<div class="note mt"><div>This preview runs inside Claude, which blocks connections to other websites. Sending works on your website.</div></div>' : '') +
      '<div class="navrow"><span></span><a class="btn" href="#">Back to the studio</a></div></div>';
  }

  /* ---------------- dialogs and toast ---------------- */
  let toastTimer = 0;
  function toast(msg, ms) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, ms || 2800); }
  function copyText(text, el) {
    const fallback = () => { if (el) { el.classList.remove('sr'); el.focus(); el.select(); } toast('Selected. Press Ctrl+C to copy.'); };
    try { navigator.clipboard.writeText(text).then(() => toast('Copied'), fallback); } catch (e) { fallback(); }
  }

  /* ---------------- routing ---------------- */
  function parseHash() {
    const h = location.hash.replace('#', '');
    if (h.indexOf('board-') === 0 && BOARDS[h.slice(6)]) return { view: 'board', board: h.slice(6) };
    if (h === 'setup' && !CFG.showSetup) return { view: 'studio' };
    return { view: VIEWS.indexOf(h) >= 0 ? h : 'studio' };
  }
  function render() {
    const v = state.view, page = v !== 'studio';
    document.body.classList.toggle('on-studio', !page);
    $('#v-studio').hidden = page;
    $('#v-page').hidden = !page;
    $$('[data-nav]').forEach(a => a.setAttribute('aria-current', String(a.dataset.nav === (v === 'board' ? 'compare' : v))));
    if (!page) { renderStudio(); return; }
    const html = v === 'compare' ? pageCompare() : v === 'board' ? pageBoard(state.board) : v === 'rooms' ? pageRooms() : v === 'request' ? pageRequest() : v === 'offers' ? pageOffers() : pageSetup();
    $('#page').innerHTML = html;
    renderMbar();
  }
  function route() { const r = parseHash(); state.view = r.view; state.board = r.board || null; render(); window.scrollTo(0, 0); }
  function goView(v) { const h = v === 'studio' ? '' : '#' + v; if (location.hash !== h && !(v === 'studio' && !location.hash)) location.hash = h; else route(); }
  function scrollStudio() { const el = $('#v-studio'); if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' }); }
  function goStep(s) {
    state.step = s; state.restored = false; state.confirmReset = false;
    if (state.view !== 'studio') { history.pushState(null, '', location.pathname + location.search); state.view = 'studio'; render(); window.scrollTo(0, 0); }
    else { renderStudio(); scrollStudio(); }
    persist();
  }
  function setTier(c, t) { c.tier = t; if (BOARDS[c.board].tier !== t) c.board = boardsOf(t)[0]; state.mtier = t; }
  function pickBoard(c, id) {
    if (c.board !== id) { c.board = id; c.tier = BOARDS[id].tier; toast(BOARDS[id].name + ' in ' + TIERS[c.tier].name + ' selected'); }
    state.mtier = c.tier; persist();
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]');
    if (!a) return;
    const act = a.dataset.act, v = a.dataset.v, c = cur();
    switch (act) {
      case 'next': if (state.step < LAST) goStep(state.step + 1); else savePdf(); break;
      case 'go': goStep(+a.dataset.step); break;
      case 'tostep': e.preventDefault(); goStep(+a.dataset.step); break;
      case 'cta': goStep(LAST); break;
      case 'bhk': c.bhk = +v; c.area = STD_AREA[c.bhk]; persist(); renderStudio(); break;
      case 'purpose': c.purpose = v; persist(); renderStudio(); break;
      case 'chip': { const arr = c[a.dataset.g], i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); a.setAttribute('aria-pressed', String(i < 0)); persist(); break; }
      case 'req': c.req[v] = !c.req[v]; persist(); renderStudio(); break;
      case 'pick': pickBoard(c, v); renderStudio(); break;
      case 'pickgo': pickBoard(c, v); goStep(LAST); break;
      case 'choosetier': setTier(c, v); persist(); render(); toast(TIERS[v].name + ' selected'); break;
      case 'mtier': state.mtier = v; renderStudio(); break;
      case 'qtier': setTier(c, v); persist(); renderStudio(); break;
      case 'roomkey': state.roomKey = v; render(); break;
      case 'reqboard': state.req.board = v; state.req.tier = BOARDS[v].tier; goView('request'); break;
      case 'idea': { const t = $('#r-prompt'); state.req.prompt = (state.req.prompt.trim() ? state.req.prompt.trim().replace(/[.,]?$/, ', ') : '') + v.toLowerCase(); if (t) { t.value = state.req.prompt; t.focus(); } break; }
      case 'offer': {
        const o = CAT.offers.find(x => x.id === v);
        if (o) { state.req.prompt = 'I would like the offer: ' + o.title + ' at ' + fmtINR(o.now) + '. '; state.reqResult = null; goView('request'); }
        break;
      }
      case 'copyscript': { const ta = $('#script-src'); if (ta) copyText(ta.value, ta); break; }
      case 'reset': state.confirmReset = true; refreshReset(); break;
      case 'resetno': state.confirmReset = false; refreshReset(); break;
      case 'resetyes': startOver(); break;
    }
  });
  document.addEventListener('input', e => {
    const t = e.target, c = cur();
    if (t.dataset.f) { c[t.dataset.f] = t.dataset.f === 'area' ? (parseInt(t.value, 10) || 0) : t.value; renderLive(); persist(); }
    else if (t.dataset.lf) { c[t.dataset.lf] = t.value; setLeadErr(t.dataset.lf, ''); persist(); }
    else if (t.dataset.rq) { state.req[t.dataset.rq] = t.value; }
  });
  document.addEventListener('submit', e => { e.preventDefault(); if (e.target.id === 'f-lead') savePdf(); if (e.target.id === 'f-req') sendRequest(); });
  window.addEventListener('hashchange', route);

  /* ---------------- start ---------------- */
  if (/[?&]embed=1/.test(location.search)) document.body.classList.add('embed');
  const setupLink = $('#setup-link'); if (setupLink) setupLink.hidden = !CFG.showSetup;
  loadLocal();
  state.mtier = C.tier;
  route();
  window.icStudio = { calc, cur, state, buildPdf, leadPayload };
})();
