// ═══════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════


// Weather widget logic (wmoInfo, windDir, uvLevel, getFarmAlerts,
// detectLocation, loadWeather, renderWeather) now lives in weather.js.
// renderDashboard() below calls loadWeather().

const DAYSAF=['Sondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrydag','Saterdag'];
const MONTHS=['Jan','Feb','Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Des'];
function renderDashboard(){
  const now=new Date();
  const el=id=>document.getElementById(id);
  if(el('dash-date')) el('dash-date').textContent=`${DAYSAF[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  if(el('dash-time')) el('dash-time').textContent=now.toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'});
  loadWeather();

  // Alerts
  const expired=factoryStock.filter(i=>['Verval','Expired'].includes(i.status));
  const low=factoryStock.filter(i=>['Lae Voorraad','Low'].includes(i.status));
  const near=factoryStock.filter(i=>['Naby Verval','Near Expiry'].includes(i.status));
  const minA=factoryStock.filter(i=>i.minQty&&i.qty<=i.minQty);
  const total=expired.length+low.length+near.length+minA.length;
  const parts=[expired.length>0&&`${expired.length} verval`,low.length>0&&`${low.length} lae voorraad`,near.length>0&&`${near.length} byna verval`,minA.length>0&&`${minA.length} onder minimum`].filter(Boolean).join(' · ');
  el('dash-alert').innerHTML=total>0?`<button class="alert-banner" onclick="navTo('stock')">⚠️ ${parts} ›</button>`:'';

  // Stats
  const thisMonth=now.toISOString().slice(0,7);
  const monthSales=sales.filter(s=>s.date&&s.date.startsWith(thisMonth));
  const rev=monthSales.reduce((s,x)=>s+(x.total||0),0);
  el('dash-stats').innerHTML=`
    <div class="dash-stat" onclick="navTo('customers')"><span style="font-size:20px">👥</span><span class="dash-stat-val">${customers.length}</span><div class="dash-stat-lbl">Klante</div></div>
    <div class="dash-stat" onclick="navTo('sales')"><span style="font-size:20px">💰</span><span class="dash-stat-val">R${rev>0?(rev/1000).toFixed(1)+'k':'0'}</span><div class="dash-stat-lbl">Hierdie maand</div></div>
    <div class="dash-stat" onclick="navTo('truck')"><span style="font-size:20px">🚛</span><span class="dash-stat-val">${truckCounts.length}</span><div class="dash-stat-lbl">Vragmotors</div></div>
    <div class="dash-stat" onclick="navTo('stock')" style="${total>0?'border-color:var(--red)':''}"><span style="font-size:20px">🏭</span><span class="dash-stat-val" style="${total>0?'color:var(--red)':''}">${factoryStock.length}</span><div class="dash-stat-lbl">Voorraad</div></div>`;

  // Quick nav
  const qnav=[
    {label:'Produkte',icon:'📦',to:'products'},{label:'Vragmotor',icon:'🚛',to:'truck'},
    {label:'Voorraad',icon:'🏭',to:'stock'},{label:'Klante',icon:'👥',to:'customers'},
    {label:'Berekenaar',icon:'🧮',to:'calc'},{label:'Beesbestuur',icon:'📖',to:'beesbestuur'},
    {label:'Werknemers',icon:'👷',to:'workers'},{label:'Uitvoer',icon:'💾',to:'export'},
  ];
  el('quick-nav').innerHTML=qnav.map(n=>`<button class="qnav-btn" onclick="navTo('${n.to}')"><div class="qnav-icon">${n.icon}</div>${n.label}</button>`).join('');

  // Reminders
  const engDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const engDay=engDays[now.getDay()];
  const todayRems=reminders.filter(r=>r.active&&r.days.includes(engDay)).slice(0,4);
  el('dash-reminders-section').innerHTML=todayRems.length?`
    <div class="section-title">🔔 Vandag se Herinneringe</div>
    <div class="dash-rem-list">${todayRems.map(r=>`<div class="dash-rem-row"><span class="dash-rem-time">${r.time}</span><span class="dash-rem-title">${escH(r.title)}</span></div>`).join('')}</div>`:'';

  // Min alerts
  el('dash-minalerts-section').innerHTML=minA.length?`
    <div class="section-title">⚠️ Onder Minimum Vlak</div>
    <div class="dash-alert-list">${minA.slice(0,4).map(i=>`<div class="dash-alert-row warn" onclick="navTo('stock')">${escH(i.name)}<span>Huidig: ${i.qty} | Min: ${i.minQty}</span></div>`).join('')}</div>`:'';

  // Sales
  el('dash-sales-section').innerHTML=monthSales.length?`
    <div class="section-title" style="display:flex;justify-content:space-between">Onlangse Verkope<button class="icon-btn sm" onclick="navTo('sales')">›</button></div>
    <div class="dash-sale-list">${monthSales.slice(0,4).map(s=>`<div class="dash-sale-row"><div><div class="dash-sale-name">${escH(s.customerName)}</div><div class="dash-sale-date">${s.date}</div></div><div class="dash-sale-amt">R${(s.total||0).toFixed(2)}</div></div>`).join('')}</div>`:'';

  // Stock alerts
  const allAlerts=factoryStock.filter(i=>['Verval','Expired','Lae Voorraad','Low','Naby Verval','Near Expiry'].includes(i.status));
  el('dash-stock-alerts-section').innerHTML=allAlerts.length?`
    <div class="section-title">⚠️ Voorraad Aandag</div>
    <div class="dash-alert-list">${allAlerts.slice(0,4).map(i=>`<div class="dash-alert-row ${['Verval','Expired'].includes(i.status)?'danger':'warn'}">${escH(i.name)}<span>${i.status} · ${i.qty}</span></div>`).join('')}</div>`:'';

  el('dash-all-good').innerHTML=(!monthSales.length&&!allAlerts.length&&!todayRems.length&&!minA.length)?`<div class="dash-all-good">✅ Alles lyk goed vir vandag!</div>`:'';
}