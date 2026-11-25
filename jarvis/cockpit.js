// Jarvis: erzeugt die Cockpit-Dateien aus kraftwerk-daten.json mit den Funktionen der App selbst.
// Aufruf: node jarvis/cockpit.js <kraftwerk-daten.json> <index.html> <ausgabe-ordner>
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [dataFile,appFile,out]=process.argv.slice(2);
(async()=>{
  const data=JSON.parse(fs.readFileSync(dataFile)).data;
  const b=await chromium.launch();const p=await b.newPage();
  await p.addInitScript(d=>localStorage.setItem('kraftwerk.v1',JSON.stringify(d)),data);
  await p.route(/^https?:/,r=>r.abort());
  await p.goto('file://'+path.resolve(appFile));await p.waitForTimeout(500);
  const res=await p.evaluate(()=>{
    const g=gymOnly(),day=t=>ymd(t);
    const sessions=g.map(w=>({datum:day(w.start),training:w.name,saetze:doneCount(w),volumen_kg:Math.round(vol(w)),minuten:Math.round((w.end-w.start)/60000)}));
    const prog=[];g.forEach(w=>w.exs.forEach(ex=>{const r=ex.rows.filter(x=>x.done);if(!r.length)return;
      prog.push({datum:day(w.start),uebung:ex.name,top_kg:Math.max(...r.map(x=>num(x.w))),e1rm_kg:Math.round(Math.max(...r.map(x=>e1(num(x.w),num(x.r))))*10)/10,saetze:r.length});}));
    const to=Date.now(),from=to-56*864e5;const ms=muscleSetsRange(from,to);
    const cnt=ms.cnt||ms;const info=typeof MG_INFO!=='undefined'?MG_INFO:{};const muskeln=MG.map(m=>{const I=info[m]||{};return {muskelgruppe:m,hauptgruppe:I.g||'',saetze_8_wochen:Math.round((cnt[m]||0)*10)/10,pro_woche:Math.round((cnt[m]||0)/8*10)/10,richtwert:I.lo?I.lo+'–'+I.hi:'indirekt'};});
    const bw=[...S.bodyweight].sort((a,b)=>a.d.localeCompare(b.d)).map(x=>({datum:x.d,kg:num(x.kg)}));
    return {sessions,prog,muskeln,bw};
  });
  await b.close();
  const code=fs.readFileSync(__filename,'utf8');
  const meta=[{label:'cockpit.js',value:code,type:'code',lang:'javascript'},{label:'Input',value:'kraftwerk-daten.json (privat, Jarvis-Sync)'}];
  fs.mkdirSync(out,{recursive:true});
  for(const [k,rows] of Object.entries({trainings:res.sessions,uebungen:res.prog,muskeln:res.muskeln,gewicht:res.bw}))
    fs.writeFileSync(path.join(out,k+'.json'),JSON.stringify({rows,meta}));
  console.log(Object.fromEntries(Object.entries(res).map(([k,v])=>[k,v.length])));
})();
