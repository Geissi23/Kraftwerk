// Automatische Tests für Kraftwerk (nur Testdaten, nie echte Daten).
// Nutzung: node tests/app.test.js [pfad/zur/index.html]
// Umgebungsvariable BROWSERS (z. B. "chromium,webkit"), Standard: chromium.
const fs = require('fs');
const path = require('path');
const { chromium, webkit, devices } = require('playwright');

const HTML = path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html'));
const BROWSERS = (process.env.BROWSERS || 'chromium').split(',').map(s => s.trim()).filter(Boolean);
const OUT = process.env.TEST_OUT || '';
const fails = [];
const ok = (cond, msg) => { if (!cond) { fails.push(msg); console.log('  ✗ ' + msg); } else console.log('  ✓ ' + msg); };

// 1) JavaScript-Syntax
function syntaxCheck() {
  console.log('Syntax');
  const src = fs.readFileSync(HTML, 'utf8');
  const scripts = [...src.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  ok(scripts.length > 0, 'Inline-Skript gefunden');
  const tmp = path.join(require('os').tmpdir(), 'kraftwerk-syntax.js');
  scripts.forEach((s, i) => {
    fs.writeFileSync(tmp, s);
    try { require('child_process').execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); ok(true, 'Skript ' + (i + 1) + ' ist gültiges JavaScript'); }
    catch (e) { ok(false, 'Skript ' + (i + 1) + ' Syntaxfehler: ' + String(e.stderr || e).slice(0, 400)); }
  });
}

// Testdaten (läuft im Browser): 9 Wochen, 3 Trainings pro Woche, plus Körperwerte.
const seed = () => {
  const day = 864e5, now = Date.now(), rs = S.routines.filter(r => r.rot); let k = 0; S.workouts = [];
  for (let w = 8; w >= 0; w--) for (const d of [0, 2, 4]) {
    const t = now - (w * 7 + (6 - d)) * day - 3 * day; if (t > now - day) continue; const r = rs[k++ % rs.length];
    const exs = r.ex.map((e, i) => { const base = [60, 52.5, 45, 37.5, 25, 17.5, 12][i % 7] + (8 - w) * 1.25;
      return { key: exKey(e.name), name: e.name, sets: e.sets, repMin: e.repMin, repMax: e.repMax, rest: e.rest, ss: e.ss || '',
        rows: Array.from({ length: e.sets }, (_, j) => ({ w: Math.round(base * 2) / 2, r: e.repMax - j, done: true })) }; });
    S.workouts.push({ id: 'test' + k, routineId: r.id, name: r.name, start: t, end: t + 50 * 60e3, kind: 'gym', exs, prs: 0 });
  }
  S.bodyweight = [{ d: ymd(new Date(now - 20 * day)), kg: 80.4 }, { d: ymd(new Date(now - 3 * day)), kg: 81.3 }];
  S.gear = {}; S.jarvisNotes = [{ t: now - day, text: 'Testnotiz' }]; persist();
  localStorage.setItem('kraftwerk.ghsync', JSON.stringify({ repo: 'test/test', token: 'test', last: now, err: '' }));
  const days = {}; for (let i = 0; i < 14; i++) days[ymd(new Date(now - i * day))] = { sl: 7.5 * 3600, hv: 50, hs: 'BALANCED', hb: [44, 66], rh: 52, bb: 70 };
  localStorage.setItem('kraftwerk.garmin', JSON.stringify({ t: now, repo: 'test/test', days, at: new Date(now).toISOString(), err: '' }));
};
const snapshot = () => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o; };

async function runDevice(browserType, bname, devName, scheme) {
  const label = `${bname} ${devName} ${scheme}`;
  console.log(label);
  const b = await browserType.launch();
  const ctx = await b.newContext({ ...devices[devName], colorScheme: scheme });
  const p = await ctx.newPage();
  p.setDefaultTimeout(5000);
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERR ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/ERR_FAILED|Failed to fetch|ERR_ABORTED|Failed to load resource|Load failed|network connection/i.test(m.text())) errs.push(m.text()); });
  // Kein echtes Netz. GitHub-API wird simuliert, damit der Jarvis-Sync geprüft werden kann.
  const puts = [];
  await p.route(/^https?:\/\//, async r => {
    const u = r.request().url();
    if (u.startsWith('https://api.github.com/repos/test/test/contents/')) {
      if (r.request().method() === 'PUT') { puts.push(JSON.parse(r.request().postData() || '{}')); return r.fulfill({ status: 200, contentType: 'application/json', body: '{"content":{"sha":"b"}}' }); }
      return r.fulfill({ status: 404, contentType: 'application/json', body: '{}' });
    }
    return r.abort();
  });
  await p.goto('file://' + HTML); await p.waitForTimeout(300);
  await p.evaluate(seed); await p.reload(); await p.waitForTimeout(500);
  const before = await p.evaluate(snapshot);
  const oldWorkouts = JSON.parse(before['kraftwerk.v1']).workouts;
  ok(oldWorkouts.length > 10, label + ': Testdaten geladen');
  const shot = async n => { if (OUT) await p.screenshot({ path: path.join(OUT, `${bname}-${devName.replace(/\s/g, '')}-${scheme}-${n}.png`) }); };

  // Alle Screens
  const noHScroll = async where => {
    const r = await p.evaluate(() => { const W = innerWidth; if (document.documentElement.scrollWidth <= W + 1) return '';
      const bad = [...document.querySelectorAll('#main *')].filter(e => e.getBoundingClientRect().right > W + 1 && getComputedStyle(e).position !== 'fixed')
        .map(e => (e.className || e.tagName) + ':' + Math.round(e.getBoundingClientRect().right)).slice(-3);
      return document.documentElement.scrollWidth + 'px > ' + W + 'px ' + bad.join(' '); });
    ok(!r, label + ': kein horizontales Scrollen (' + where + ')' + (r ? ' → ' + r : ''));
  };
  await noHScroll('Übersicht'); await shot('1-uebersicht');
  await p.click('[data-tab="plan"]'); await p.waitForTimeout(200); await noHScroll('Plan'); await shot('2-plan');
  await p.click('[data-tab="stats"]'); await p.waitForTimeout(200);
  for (const s of ['tr', 'body', 'rec']) { await p.click(`[data-act="statsub"][data-s="${s}"]`); await p.waitForTimeout(200); await noHScroll('Fortschritt ' + s); }
  await shot('3-fortschritt');
  await p.click('[data-tab="plan"]'); await p.waitForTimeout(200);
  await p.evaluate(() => ACT.settings()); await p.waitForTimeout(200);
  ok(await p.isVisible('#sheet, .sheet.open, [role="dialog"]').catch(() => true), label + ': Einstellungen öffnen');
  await shot('4-einstellungen');
  await p.evaluate(() => closeSheet()); await p.waitForTimeout(200);

  // Training komplett durchklicken
  await p.click('[data-tab="today"]'); await p.waitForTimeout(200);
  await p.locator('#main [data-act="start"]').first().click(); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !!S.active), label + ': Training gestartet');
  const confirm = async () => {
    const rir = p.locator('#wk [data-act="rir"][data-v="2"]').first();
    if (await rir.count()) await rir.click();
    await p.locator('#wk [data-act="check"][aria-label$="bestätigen"]').first().click(); await p.waitForTimeout(150);
  };
  const ex0 = await p.evaluate(() => S.active.exs[0].name);
  const sets0 = await p.evaluate(() => S.active.exs[0].rows.length);
  await confirm();
  ok(await p.evaluate(() => S.active.exs[0].rows[0].done && S.active.exs[0].rows[0].rir === 2), label + ': Satz eingetragen (mit RIR)');
  ok(await p.evaluate(() => document.getElementById('rest').classList.contains('on')), label + ': Pause läuft als Leiste');
  await shot('5-training-pause');
  await p.click('#rest [data-act="restundo"]'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => !S.active.exs[0].rows[0].done), label + ': Rückgängig öffnet den Satz wieder');
  await confirm();
  await p.click('#rest [data-act="restskip"]'); await p.waitForTimeout(100);
  ok(await p.evaluate(() => !document.getElementById('rest').classList.contains('on')), label + ': Pause beenden');
  // Restliche Sätze der ersten Übung (bei Supersätzen auch die Partner-Übung)
  for (let n = 0; n < 12 && await p.evaluate(() => !S.active.exs[0].rows.every(r => r.done)); n++) { await confirm(); await p.evaluate(() => stopRest()); }
  ok(await p.evaluate(() => S.active.exs[0].rows.every(r => r.done)), label + `: alle ${sets0} Sätze von «${ex0}» abgehakt`);
  const nxt = await p.evaluate(() => { const a = activeSet(S.active); return a ? a.i : -1; });
  ok(nxt > 0, label + ': nächste Übung ist aktiv');
  // Abschluss
  await p.locator('#wk [data-act="finish"]').first().click(); await p.waitForTimeout(200);
  await p.locator('[data-act="finishok"]').first().click(); await p.waitForTimeout(600);
  await shot('6-abschluss');
  const after = await p.evaluate(() => ({ active: S.active, n: S.workouts.length, w: JSON.parse(localStorage.getItem('kraftwerk.v1')).workouts }));
  ok(!after.active && after.n === oldWorkouts.length + 1, label + ': Training abgeschlossen und gespeichert');
  ok(JSON.stringify(after.w.slice(0, oldWorkouts.length)) === JSON.stringify(oldWorkouts), label + ': alle bisherigen Trainings unverändert');
  // Andere Schlüssel unverändert (ausser erwarteten)
  const snap2 = await p.evaluate(snapshot);
  const changed = Object.keys(before).filter(k => k !== 'kraftwerk.v1' && k !== 'kraftwerk.ghsync' && snap2[k] !== before[k]);
  ok(changed.length === 0, label + ': übrige gespeicherte Daten unverändert' + (changed.length ? ' (' + changed.join(', ') + ')' : ''));

  // Jarvis-Sync: Upload enthält alle Trainings
  await p.waitForTimeout(1500);
  if (!puts.length) await p.evaluate(() => ghPush(false));
  await p.waitForTimeout(300);
  let synced = null; try { synced = JSON.parse(Buffer.from(puts[puts.length - 1].content, 'base64').toString('utf8')); } catch (e) {}
  ok(synced && synced.data && synced.data.workouts.length === after.n, label + ': Jarvis-Sync überträgt alle Trainings');

  // Backup: Export = Daten, alter Backup ohne neue Felder lädt weiterhin
  const bk = await p.evaluate(() => { ACT.export(); const t = document.getElementById('bk').value; closeSheet(); return t; });
  const bko = JSON.parse(bk);
  ok(bko.app === 'kraftwerk' && bko.data.workouts.length === after.n, label + ': Backup enthält alle Trainings');
  const oldBk = JSON.stringify({ app: 'kraftwerk', v: 1, data: { routines: bko.data.routines, schedules: bko.data.schedules, goal: 3, workouts: oldWorkouts.map(w => ({ ...w, exs: w.exs.map(e => ({ ...e, rows: e.rows.map(({ rir, ...r }) => r) })) })) } });
  await p.evaluate(t => { ACT.import(); document.getElementById('bkin').value = t; ACT.doimport(); }, oldBk);
  await p.waitForTimeout(300);
  ok(await p.evaluate(n => S.workouts.length === n && Array.isArray(S.routines), oldWorkouts.length), label + ': altes Backup (ohne neue Felder) lädt');
  await p.evaluate(() => { ACT.tab({ dataset: { tab: 'stats' } }); ACT.tab({ dataset: { tab: 'today' } }); }); await p.waitForTimeout(200);

  ok(errs.length === 0, label + ': keine Konsolenfehler' + (errs.length ? ' → ' + errs.slice(0, 5).join(' | ') : ''));
  await ctx.close(); await b.close();
}

(async () => {
  syntaxCheck();
  const types = { chromium, webkit };
  for (const bn of BROWSERS) {
    if (!types[bn]) { ok(false, 'Unbekannter Browser ' + bn); continue; }
    for (const dev of (process.env.DEVICES || 'iPhone 13,iPhone SE').split(',')) for (const scheme of ['light', 'dark']) {
      try { await runDevice(types[bn], bn, dev, scheme); } catch (e) { ok(false, `${bn} ${dev} ${scheme}: Abbruch – ${e.message.split('\n')[0]}`); }
    }
  }
  console.log(fails.length ? `\n${fails.length} Fehler` : '\nAlle Tests grün');
  process.exit(fails.length ? 1 : 0);
})();
