/* Driftline service worker 3.0.0: instant open, offline shell, alerts, background check-ins. */
const VERSION = '7.0.0';
const CACHE = 'driftline-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './badge-96.png', './emoji.js', './crayon.html', './shot-1.png', './shot-2.png', './shot-3.png'];
const FONT_CSS = ['https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600;700&display=swap', 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'];
function warmFonts(){ return Promise.race([warmFonts2(), new Promise(r => setTimeout(r, 8000))]); }
async function warmFonts2(){ try{ const fc = await caches.open('driftline-fonts'); for (const u of FONT_CSS){ try{ const r = await fetch(u); if (!r.ok) continue; const css = await r.clone().text(); await fc.put(u, r); const urls = Array.from(new Set((css.match(/https:\/\/fonts\.gstatic\.com\/[^)'"\s]+/g) || []))); await Promise.all(urls.map(f => fc.match(f).then(h => h || fetch(f).then(x => x.ok ? fc.put(f, x) : 0)).catch(() => {}))); }catch(x){} } }catch(x){} }
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => warmFonts()).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== 'driftline-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', (e) => { if (e.data === 'skip') self.skipWaiting(); if (e.data && e.data.type === 'quiet') kvSet('quiet', e.data.q || null); });
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method === 'GET' && (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com')){
    e.respondWith(caches.open('driftline-fonts').then(c => c.match(r, { ignoreVary:true }).then(m => { const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone()); return res; }).catch(() => m || Response.error()); return m || net; })));
    return;
  }
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.endsWith('version.json')) return;
  e.respondWith(fetch(r).then(res => { if (res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); } return res; }).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const act = e.action || '';
  const chat = (e.notification.data && e.notification.data.chat) || '';
  e.waitUntil(self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
    for (const c of list){ if ('focus' in c){ if (act) c.postMessage({ type:'call-action', action:act }); else { c.postMessage({ type:'open-chat', chat }); } c.postMessage({ type:'pending' }); if (act === 'decline') return; return c.focus(); } }
    if (act === 'decline') return;
    return self.clients.openWindow(act === 'answer' ? './?answer=1' : './');
  }));
});
/* tiny IndexedDB helpers */
function idb(){ return new Promise((res, rej) => { const r = indexedDB.open('dl-sw', 1); r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('kv')) r.result.createObjectStore('kv'); }; r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
async function kvGet(k){ const d = await idb(); return new Promise(res => { const q = d.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => res(undefined); }); }
async function kvSet(k, v){ const d = await idb(); return new Promise(res => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = () => res(true); t.onerror = () => res(false); }); }
const newer = (a, b) => { a = String(a).split('.').map(Number); b = String(b).split('.').map(Number); for (let i = 0; i < 3; i++){ if ((a[i]||0) !== (b[i]||0)) return (a[i]||0) > (b[i]||0); } return false; };
async function checkUpdate(){
  try{
    const r = await fetch('version.json?t=' + Date.now(), { cache:'no-store' }); const j = await r.json();
    const told = await kvGet('toldVersion');
    if (newer(j.version, VERSION) && told !== j.version){ await kvSet('toldVersion', j.version); await self.registration.showNotification('Driftline update available', { body:'Version ' + j.version + ' is ready. Open Driftline to update.', icon:'icon-192.png', badge:'badge-96.png', tag:'dl-update' }); }
  }catch(e){}
}
async function checkIn(){
  const cfg = await kvGet('cfg'); if (!cfg || !cfg.checkin || !cfg.notify || !(cfg.eddies || []).length) return;
  const h = new Date().getHours(); if (h >= 22 || h < 7) return;
  const last = (await kvGet('last')) || {}; const now = Date.now(); const gap = (cfg.hours || 12) * 3600000;
  const e = cfg.eddies.filter(x => !last[x.id] || now - last[x.id] >= gap).sort((a, b) => (last[a.id]||0) - (last[b.id]||0))[0];
  if (!e) return;
  if (!last[e.id]){ last[e.id] = now; await kvSet('last', last); return; }
  const sys = 'You are ' + e.name + (e.tagline ? ', ' + e.tagline : '') + ', an AI character in a chat app. ' + (e.persona || 'You are friendly and honest.') + ' Write ONE short natural message (one or two sentences) checking in on ' + (cfg.userName || 'the user') + ', in your own voice. Never use emoji. Do not say you were prompted.';
  let url = 'https://text.pollinations.ai/openai', headers = { 'Content-Type':'application/json' }, model = cfg.model || 'openai';
  if (cfg.provider === 'custom' && cfg.customUrl && cfg.customKey){ url = cfg.customUrl; model = cfg.customModel; if (cfg.customKey) headers.Authorization = 'Bearer ' + cfg.customKey; }
  try{
    const res = await fetch(url, { method:'POST', headers, body:JSON.stringify({ model, messages:[{ role:'system', content:sys }, { role:'user', content:'(Say hello on your own.)' }] }) });
    const j = await res.json(); let t = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
    t = t.replace(/\n*(?:-{3,}\s*\n)?\**\s*(?:Powered by|Support) Pollinations[\s\S]*$/i, '').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
    if (!t) return;
    last[e.id] = now; await kvSet('last', last);
    const q = (await kvGet('pending')) || []; q.push({ eddyId:e.id, text:t, ts:now }); await kvSet('pending', q.slice(-30));
    await self.registration.showNotification(e.name, { body:t.slice(0, 160), icon:'icon-192.png', badge:'badge-96.png', tag:'ci-' + e.id, data:{ chat:'e-' + e.id } });
  }catch(err){}
}
self.addEventListener('periodicsync', (e) => { if (e.tag === 'dl-tick') e.waitUntil(Promise.all([checkUpdate(), checkIn()])); });

/* ---- background alerts: sealed Web Push. The sender seals {who, what} with MY inbox key; only this phone can open it. ---- */
async function dlAesKey(secret){ const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('dl3key|' + secret)); return crypto.subtle.importKey('raw', h, 'AES-GCM', false, ['decrypt']); }
function dlB64(s){ const b = atob(s), o = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) o[i] = b.charCodeAt(i); return o; }
async function dlUnseal(secret, s){ const p = String(s).split('.'); if (p.length !== 2) throw new Error('bad'); const pt = await crypto.subtle.decrypt({ name:'AES-GCM', iv:dlB64(p[0]) }, await dlAesKey(secret), dlB64(p[1])); return new TextDecoder().decode(pt); }
self.addEventListener('push', (e) => {
  e.waitUntil((async () => {
    let j = {}; try{ j = e.data ? e.data.json() : {}; }catch(x){}
    let info = { t:j.k === 'call' ? 'call' : 'msg', n:'', f:'', v:0 };
    try{ const ik = await kvGet('ik'); const olds = (await kvGet('ikold')) || []; if (j.s){ for (const k of [ik].concat(olds)){ if (!k) continue; try{ const o = JSON.parse(await dlUnseal(k, j.s)); info = Object.assign(info, o); break; }catch(y){} } } }catch(x){}
    const list = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    if (info.t !== 'call' && list.some(c => c.visibilityState === 'visible' && c.focused)) return;
    if (info.t === 'call' && info.a && Date.now() - info.a > 60000) return;
    const who = String(info.n || '').slice(0, 40) || 'Driftline';
    const call = info.t === 'call';
    const tag = call ? 'call' : ('chat-d-' + (info.f || 'msg'));
    let cnt = 1;
    try{ const have = await self.registration.getNotifications({ tag }); if (have && have.length){ if (call) return; cnt = ((have[0].data && have[0].data.n) || 1) + 1; } }catch(x){}
    if (!call){ try{ const q = await kvGet('quiet'); if (q && q.on){ const d = new Date(), n = d.getHours() * 60 + d.getMinutes(), f = (x) => { const p = String(x).split(':'); return (+p[0]) * 60 + (+p[1]); }, a = f(q.a), b = f(q.b); if (a <= b ? (n >= a && n < b) : (n >= a || n < b)) return; } }catch(x){} }
    await self.registration.showNotification(call ? who + ' is calling' : who, {
      body: call ? (info.v ? 'Incoming video call' : 'Incoming voice call') : (cnt > 1 ? cnt + ' new messages' : 'New message'),
      icon:'icon-192.png', badge:'badge-96.png', tag, renotify:!call && cnt > 1,
      vibrate: call ? [300, 150, 300, 150, 300] : [120, 60, 120], requireInteraction: call, timestamp: Date.now(),
      actions: call ? [{ action:'answer', title:'Answer' }, { action:'decline', title:'Decline' }] : [],
      data:{ chat: info.f ? 'd-' + info.f : '', n:cnt }
    });
    if (call){ await new Promise(r => setTimeout(r, 45000)); try{ (await self.registration.getNotifications({ tag:'call' })).forEach(n => n.close()); }catch(x){} }
  })());
});
