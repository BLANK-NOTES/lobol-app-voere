// ═══════════════════════════════════════════════════════════════
// REMINDERS  (+ notifications)
//
// Notifications work in two ways:
//  1) IN-APP / LIVE  — while the app is open (or recently open in the
//     background) we check every 30s and fire a Notification at the
//     reminder time. Needs the user to tap "Skakel kennisgewings aan".
//  2) PHONE ALARM    — each reminder can be sent to the iPhone's own
//     Calendar/Clock as a real .ics event WITH an alarm, so it alerts
//     even when the app is completely closed. (True background push
//     from a static site isn't possible on iOS, so this is the
//     reliable way to be reminded when the app isn't running.)
// ═══════════════════════════════════════════════════════════════
const ENG_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const AF_DAYS=['Maa','Din','Woe','Don','Vry','Sat','Son'];
let newRemDays=[...ENG_DAYS];

// Tracks which reminders we've already notified today so we don't
// fire the same one repeatedly. Key: id + date + time.
let firedNotifs = {};

function timeToMin(t){ const[h,m]=t.split(':').map(Number); return h*60+m; }
function nowMin(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); }
function getRemStatus(r){
  if(!r.active) return 'off';
  const diff=timeToMin(r.time)-nowMin();
  if(diff>=0&&diff<=60) return 'soon';
  if(diff<0&&diff>=-30) return 'recent';
  return 'scheduled';
}

// ── Notification permission ────────────────────────────────────
function notifSupported(){ return typeof Notification !== 'undefined'; }
function notifPermission(){ return notifSupported() ? Notification.permission : 'unsupported'; }

function requestNotifPerm(){
  if(!notifSupported()){
    alert('Hierdie toestel/blaaier ondersteun nie in-app kennisgewings nie. Gebruik "📲 Voeg by Foon" om die foon se eie wekker te gebruik.');
    return;
  }
  Notification.requestPermission().then(()=>{ renderNotifBanner(); });
}

function renderNotifBanner(){
  const el=document.getElementById('rem-notif-banner'); if(!el) return;
  const perm=notifPermission();
  if(perm==='granted'){
    el.innerHTML=`<div class="card" style="border-color:var(--accent);display:flex;align-items:center;gap:10px;padding:12px 14px">
      <span style="font-size:18px">🔔</span>
      <div style="flex:1;font-size:13px;color:var(--text2)">In-app kennisgewings is <strong style="color:var(--accent)">aan</strong>. Hou die app oop of in die agtergrond om herinnerings te kry. Vir wanneer die app toe is, gebruik <strong>📲 Voeg by Foon</strong> by elke herinnering.</div>
    </div>`;
  } else if(perm==='unsupported'){
    el.innerHTML=`<div class="card" style="display:flex;align-items:center;gap:10px;padding:12px 14px">
      <span style="font-size:18px">📲</span>
      <div style="flex:1;font-size:13px;color:var(--text2)">Hierdie blaaier ondersteun nie in-app kennisgewings nie. Gebruik <strong>📲 Voeg by Foon</strong> by elke herinnering om die foon se eie wekker te stel (werk selfs as die app toe is).</div>
    </div>`;
  } else {
    el.innerHTML=`<div class="card" style="display:flex;align-items:center;gap:10px;padding:12px 14px">
      <span style="font-size:18px">🔕</span>
      <div style="flex:1;font-size:13px;color:var(--text2)">Kennisgewings is af.</div>
      <button class="btn btn-primary btn-sm" onclick="requestNotifPerm()">Skakel aan</button>
    </div>`;
  }
}

// ── In-app scheduler: fire notifications at the right time ──────
function checkReminderNotifs(){
  if(notifPermission()!=='granted') return;
  const now=new Date();
  const curIdx=now.getDay()===0?6:now.getDay()-1;
  const curEng=ENG_DAYS[curIdx];
  const today=now.toLocaleDateString('af-ZA');
  const cur=nowMin();
  reminders.forEach(r=>{
    if(!r.active) return;
    if(!r.days.includes(curEng)) return;
    const key=r.id+'|'+today+'|'+r.time;
    if(firedNotifs[key]) return;
    const diff=cur-timeToMin(r.time);
    // fire if we're within 0-2 minutes past the set time
    if(diff>=0 && diff<=2){
      try{
        new Notification('🔔 LOBOL Herinnering', { body:r.title+(r.notes?'\n'+r.notes:''), tag:key });
      }catch(e){}
      firedNotifs[key]=true;
      // keep firedNotifs from growing forever
      const keys=Object.keys(firedNotifs);
      if(keys.length>200) keys.slice(0,100).forEach(k=>delete firedNotifs[k]);
    }
  });
}

// ── Send a reminder to the phone's Calendar/Clock as an .ics ────
function pad2(n){ return String(n).padStart(2,'0'); }
function icsDays(days){
  // map our ENG_DAYS to iCal BYDAY codes
  const m={Mon:'MO',Tue:'TU',Wed:'WE',Thu:'TH',Fri:'FR',Sat:'SA',Sun:'SU'};
  return days.map(d=>m[d]).filter(Boolean).join(',');
}
function addReminderToPhone(id){
  const r=reminders.find(x=>x.id===id); if(!r) return;
  const [hh,mm]=r.time.split(':').map(Number);
  // Build the first occurrence: today if still upcoming, else tomorrow
  const now=new Date();
  const start=new Date(now.getFullYear(),now.getMonth(),now.getDate(),hh,mm,0);
  if(start<=now) start.setDate(start.getDate()+1);
  const end=new Date(start.getTime()+15*60000);
  const fmt=d=>`${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
  const byday=icsDays(r.days);
  const rrule=byday?`RRULE:FREQ=WEEKLY;BYDAY=${byday}`:'';
  const uidStr='lobol-'+r.id+'@lobol.app';
  const lines=[
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//LOBOL//Herinnering//AF','CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:'+uidStr,
    'DTSTAMP:'+fmt(now),
    'DTSTART:'+fmt(start),
    'DTEND:'+fmt(end),
    rrule,
    'SUMMARY:'+(r.title||'LOBOL Herinnering').replace(/[\n,;]/g,' '),
    r.notes?('DESCRIPTION:'+r.notes.replace(/[\n,;]/g,' ')):'',
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+(r.title||'LOBOL'),'TRIGGER:PT0M','END:VALARM',
    'END:VEVENT','END:VCALENDAR'
  ].filter(Boolean);
  const blob=new Blob([lines.join('\r\n')],{type:'text/calendar'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=(r.title||'herinnering').replace(/[^a-z0-9]+/gi,'_').toLowerCase()+'.ics';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}

function renderReminders(){
  document.getElementById('rem-time').textContent=new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'});
  renderNotifBanner();
  const el=document.getElementById('rem-list');
  if(!reminders.length){ el.innerHTML='<div class="empty">Geen herinneringe nie.</div>'; }
  else {
    const now=new Date();
    const curIdx=now.getDay()===0?6:now.getDay()-1;
    const curEng=ENG_DAYS[curIdx];
    const sorted=[...reminders].sort((a,b)=>timeToMin(a.time)-timeToMin(b.time));
    const statusLbl={soon:{l:'Nou-nou!',c:'badge-orange'},recent:{l:'Pas verby',c:'badge-red'},off:{l:'Af',c:'badge-dim'},scheduled:{l:'Beplan',c:'badge-green'}};
    el.innerHTML=sorted.map(r=>{
      const st=getRemStatus(r);
      const {l,c}=statusLbl[st];
      return `<div class="rem-card${st==='soon'?' soon':''}${!r.active?' inactive':''}">
        <div class="rem-top">
          <div class="rem-time-block">
            <span class="rem-time">${r.time}</span>
            <span class="badge ${c}">${l}</span>
          </div>
          <div class="rem-acts">
            <button class="icon-btn sm" onclick="addReminderToPhone(${r.id})" title="Voeg by foon se kalender/wekker">📲</button>
            <button class="icon-btn sm" onclick="toggleRemActive(${r.id})">${r.active?'🔔':'🔕'}</button>
            <button class="icon-btn sm" onclick="editReminder(${r.id})">✏</button>
            <button class="icon-btn red sm" onclick="deleteReminder(${r.id})">🗑</button>
          </div>
        </div>
        <div class="rem-title">${escH(r.title)}</div>
        <div class="rem-days">${AF_DAYS.map((d,i)=>`<span class="day-tag${r.days.includes(ENG_DAYS[i])?' active':''}${ENG_DAYS[i]===curEng&&r.days.includes(ENG_DAYS[i])?' today':''}">${d}</span>`).join('')}</div>
        ${r.notes?`<div class="duty-notes">${escH(r.notes)}</div>`:''}
      </div>`;
    }).join('');
  }
  // Build day picker for add modal
  const dpEl=document.getElementById('ra-days');
  if(dpEl) dpEl.innerHTML=AF_DAYS.map((d,i)=>`<button class="day-btn${newRemDays.includes(ENG_DAYS[i])?' active':''}" onclick="toggleRemDay('${ENG_DAYS[i]}')">${d}</button>`).join('');
}
function toggleRemDay(d){ if(newRemDays.includes(d)) newRemDays=newRemDays.filter(x=>x!==d); else newRemDays.push(d); document.getElementById('ra-days').innerHTML=AF_DAYS.map((af,i)=>`<button class="day-btn${newRemDays.includes(ENG_DAYS[i])?' active':''}" onclick="toggleRemDay('${ENG_DAYS[i]}')">${af}</button>`).join(''); }
function addReminder(){
  const title=document.getElementById('ra-title').value.trim(); if(!title) return;
  reminders.push({id:uid(),title,time:document.getElementById('ra-time').value,days:[...newRemDays],notes:document.getElementById('ra-notes').value,active:true});
  save('v3_reminders',reminders); newRemDays=[...ENG_DAYS];
  document.getElementById('ra-title').value=''; document.getElementById('ra-notes').value='';
  // First time adding, offer to enable notifications
  if(notifSupported() && notifPermission()==='default') requestNotifPerm();
  closeModal('rem-add-modal'); renderReminders();
}
function toggleRemActive(id){ const r=reminders.find(x=>x.id===id); if(r){ r.active=!r.active; save('v3_reminders',reminders); renderReminders(); } }
function editReminder(id){
  const r=reminders.find(x=>x.id===id); if(!r) return;
  const title=prompt('Taaknaam:',r.title); if(title===null) return;
  const time=prompt('Tyd (HH:MM):',r.time); if(time===null) return;
  const notes=prompt('Notas:',r.notes||''); if(notes===null) return;
  Object.assign(r,{title,time,notes}); save('v3_reminders',reminders); renderReminders();
}
function deleteReminder(id){ if(!confirm('Verwyder hierdie herinnering?')) return; reminders=reminders.filter(r=>r.id!==id); save('v3_reminders',reminders); renderReminders(); }
