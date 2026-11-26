// Screenshots mit reinen Testdaten (keine echten Daten). Nutzung: node demo.js <html> <outprefix>
const {chromium,devices}=require('playwright');
const [,,html,out]=process.argv;
const seed=()=>{ // läuft im Browser
  const day=864e5,now=Date.now(),rs=S.routines.filter(r=>r.rot);let k=0;S.workouts=[];
  for(let w=8;w>=0;w--)for(let d of [0,2,4]){const t=now-(w*7+ (6-d))*day-3*day;if(t>now-day)continue;const r=rs[k++%rs.length];
    const exs=r.ex.map((e,i)=>{const base=[60,52.5,45,37.5,25,17.5,12][i%7]+ (8-w)*1.25;return {key:exKey(e.name),name:e.name,sets:e.sets,repMin:e.repMin,repMax:e.repMax,rest:e.rest,ss:e.ss||'',rows:Array.from({length:e.sets},(_,j)=>({w:Math.round(base*2)/2+(j===0&&i===0?2.5:0),r:e.repMax-j,done:true}))};});
    S.workouts.push({id:'demo'+k,routineId:r.id,name:r.name,start:t,end:t+50*60e3,kind:'gym',exs,prs:k%4===0?1:0});}
  S.bodyweight=[{d:ymd(new Date(now-20*day)),kg:80.4},{d:ymd(new Date(now-10*day)),kg:80.9},{d:ymd(new Date(now-3*day)),kg:81.3}];
  S.gear={};S.jarvisNotes=[];persist();
  localStorage.setItem('kraftwerk.ghsync',JSON.stringify({repo:'demo/demo',token:'x',last:Date.now(),err:''}));
  const days={};for(let i=0;i<14;i++){const dd=ymd(new Date(now-i*day));days[dd]={sl:(7+((i*37)%10)/10)*3600,hv:48+(i%5),hs:'BALANCED',hb:[44,66],rh:52+(i%3),bb:70};}
  localStorage.setItem('kraftwerk.garmin',JSON.stringify({t:now,repo:'demo/demo',days,at:new Date(now).toISOString(),err:''}));
};
(async()=>{const b=await chromium.launch();const errs=[];
 for(const scheme of ['light','dark']){
  const ctx=await b.newContext({...devices['iPhone 13'],colorScheme:scheme});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(scheme+' PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED|Failed to fetch|ERR_ABORTED/.test(m.text()))errs.push(scheme+' '+m.text())});
  await p.route(/^https?:\/\//,r=>r.abort());
  await p.goto('file://'+html);await p.waitForTimeout(300);await p.evaluate(seed);await p.reload();await p.waitForTimeout(500);
  const shot=async (n,full)=>{if(full)await p.addStyleTag({content:'.nav{position:static!important}#toast{display:none!important}'});await p.screenshot({path:`${out}-${scheme}-${n}.png`,fullPage:!!full});if(full)await p.evaluate(()=>{const s=[...document.querySelectorAll('style')].pop();s.remove();});};
  await shot('1-heute',1);
  await p.click('[data-tab="plan"]');await p.waitForTimeout(250);await shot('3-plan',1);
  await p.click('[data-tab="stats"]');await p.waitForTimeout(250);await shot('4-fortschritt',1);
  await p.click('[data-tab="today"]');await p.waitForTimeout(250);
  await p.evaluate(()=>ACT.start({dataset:{id:'r_k1'}}));await p.waitForTimeout(500);await shot('2-training');
  await p.evaluate(()=>ACT.wkclose());
  await ctx.close();}
 console.log('ERR',errs.join('\n')||'none');await b.close();})();
