// ═══════════════════════════════════════════════════════════════
// TRUCK COUNT — met kapasiteit, geskiedenis, bestuurder, vloot
// ═══════════════════════════════════════════════════════════════
let activeTruckTab = 'sessions';

function renderTrucks() {
  const el = document.getElementById('truck-list');
  if (!el) return;
  if (!truckCounts.length) {
    el.innerHTML = '<div class="empty">Geen laaisessies nie. Tik + om te begin.</div>';
    return;
  }
  el.innerHTML = truckCounts.map(t => {
    const bags = t.items.reduce((s,i) => s+i.qty, 0);
    const val  = t.items.reduce((s,i) => s+i.total, 0);
    const ton  = ((bags*50)/1000).toFixed(1);
    const fleetTruck = fleet.find(f => f.id === t.fleetId || f.name === t.name);
    const totalCap   = fleetTruck ? fleetTruck.truckCapacity + (fleetTruck.hasTrailer ? fleetTruck.trailerCapacity : 0) : 0;
    const fillPct    = totalCap > 0 ? Math.min(100, Math.round(bags/totalCap*100)) : 0;
    const fillColor  = fillPct >= 90 ? 'var(--red)' : fillPct >= 70 ? 'var(--orange)' : 'var(--accent)';
    return `<div class="truck-card" onclick="openTruckDetail(${t.id})">
      <div class="truck-icon">🚛</div>
      <div class="truck-card-visual" style="flex:1">
        <span class="truck-name">${escH(t.name)}${t.driverName?` <span style="font-size:11px;color:var(--text3)">· ${escH(t.driverName)}</span>`:''}</span>
        <span class="truck-meta">${t.date} · ${t.items.length} produkte · ${bags} sakke · ${ton} ton</span>
        <span class="truck-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
        ${totalCap>0?`<div style="margin-top:4px">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-bottom:2px">
            <span>${bags}/${totalCap} sakke (${fillPct}%)</span>
            <span>${ton}/${((totalCap*50)/1000).toFixed(1)} ton</span>
          </div>
          <div class="truck-mini-fill"><div class="truck-mini-fill-bar" style="width:${fillPct}%;background:${fillColor}"></div></div>
        </div>`:''}
      </div>
      ${t.delivered?'<span class="badge badge-green" style="flex-shrink:0">Afgelewer</span>':''}
      <button class="icon-btn red sm" style="flex-shrink:0" onclick="event.stopPropagation();deleteTruck(${t.id})">🗑</button>
    </div>`;
  }).join('');
}

function switchTruckTab(tab) {
  activeTruckTab = tab;
  ['sessions','fleet','drivers','history'].forEach(t => {
    const btn = document.getElementById('ttab-'+t);
    const content = document.getElementById('truck-'+t+'-tab');
    if (btn) btn.className = 'tab-btn'+(t===tab?' active':'');
    if (content) content.style.display = t===tab?'':'none';
  });
  if (tab==='sessions') renderTrucks();
  if (tab==='fleet')    renderFleet();
  if (tab==='drivers')  renderDrivers();
  if (tab==='history')  renderTruckHistory();
}

// ── TRUCK ADD ──────────────────────────────────────────────────
function openTruckAddModal() {
  const driverSel = document.getElementById('ta-driver');
  if (driverSel) {
    driverSel.innerHTML = '<option value="">-- Kies bestuurder --</option>' +
      drivers.filter(d=>d.active).map(d =>
        `<option value="${escH(d.name)}">${escH(d.name)} (${escH(d.licenseCode||'EC')})</option>`
      ).join('');
  }
  const fleetSel = document.getElementById('ta-fleet');
  if (fleetSel) {
    fleetSel.innerHTML = '<option value="">-- Kies vragmotor (opsioneel) --</option>' +
      fleet.map(f => {
        const tot = f.truckCapacity + (f.hasTrailer?f.trailerCapacity:0);
        return `<option value="${f.id}">${escH(f.emoji||'🚛')} ${escH(f.name)} – ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</option>`;
      }).join('');
  }
  const prev = document.getElementById('ta-cap-preview');
  if (prev) prev.style.display = 'none';
  openModal('truck-add-modal');
}

function updateTruckCapPreview() {
  const sel = document.getElementById('ta-fleet');
  const prev = document.getElementById('ta-cap-preview');
  if (!sel||!prev) return;
  const f = fleet.find(x => x.id===parseInt(sel.value));
  if (f) {
    const tot = f.truckCapacity+(f.hasTrailer?f.trailerCapacity:0);
    prev.style.display='';
    prev.innerHTML=`🚛 Vragmotor: ${f.truckCapacity} sakke${f.hasTrailer?` &nbsp;|&nbsp; 🚌 Sleepwa: ${f.trailerCapacity} sakke`:''} &nbsp;|&nbsp; <strong>Totaal: ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</strong>`;
  } else { prev.style.display='none'; }
}

function addTruck() {
  const name = document.getElementById('ta-name').value.trim(); if (!name) return;
  const driverName = document.getElementById('ta-driver')?.value||'';
  const fleetId = parseInt(document.getElementById('ta-fleet')?.value)||null;
  const fleetTruck = fleet.find(f=>f.id===fleetId);
  const t = {
    id:uid(), name, driverName, fleetId,
    truckCapacity: fleetTruck?fleetTruck.truckCapacity:0,
    hasTrailer: fleetTruck?fleetTruck.hasTrailer:false,
    trailerCapacity: fleetTruck?fleetTruck.trailerCapacity:0,
    date: new Date().toLocaleDateString('af-ZA'),
    items: [], delivered: false,
    loadChecklist: { truckLoaded:false, trailerLoaded:false, sealCovered:false, driveComplete:false }
  };
  truckCounts.unshift(t);
  save('v3_trucks', truckCounts);
  document.getElementById('ta-name').value='';
  closeModal('truck-add-modal');
  openTruckDetail(t.id);
}

function deleteTruck(id) {
  if (!confirm('Verwyder hierdie laaisessie?')) return;
  truckCounts = truckCounts.filter(t=>t.id!==id);
  save('v3_trucks',truckCounts);
  renderTrucks();
}

// ── TRUCK DETAIL ───────────────────────────────────────────────

function openTruckDetail(id) {
  currentTruckId = id;
  const t = truckCounts.find(x=>x.id===id); if (!t) return;
  document.getElementById('truck-list-view').style.display='none';
  document.getElementById('truck-detail-view').style.display='';
  document.getElementById('truck-detail-name').textContent = t.name;
  const notice = document.getElementById('eie-notice-truck');
  if (notice) notice.innerHTML = eieGeelActive?'<div class="eie-notice" style="margin-bottom:10px">🌽 Eie Geel afslag toegepas</div>':'';
  renderTruckDetail();
}

function closeTruckDetail() {
  currentTruckId = null;
  document.getElementById('truck-list-view').style.display='';
  document.getElementById('truck-detail-view').style.display='none';
  renderTrucks();
}

function renderTruckDetail() {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const bags  = t.items.reduce((s,i)=>s+i.qty,0);
  const val   = t.items.reduce((s,i)=>s+i.total,0);
  const ton   = ((bags*50)/1000).toFixed(1);
  const totalCap = t.truckCapacity + (t.hasTrailer?t.trailerCapacity:0);
  const fillPct  = totalCap>0?Math.min(100,Math.round(bags/totalCap*100)):0;
  const fillColor= fillPct>=90?'var(--red)':fillPct>=70?'var(--orange)':'var(--accent)';

  document.getElementById('truck-summary').innerHTML=`
    <div class="sum-item">
      <div class="sum-label">Totaal Sakke</div>
      <span class="sum-val" style="color:var(--accent)">${bags}</span>
    </div>
    <div class="sum-item">
      <div class="sum-label">Totale Waarde</div>
      <span class="sum-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
    </div>
    <div class="sum-item">
      <div class="sum-label">Ton Gelaai</div>
      <span class="sum-val">${ton}</span>
    </div>
    ${totalCap>0?`<div class="sum-item" style="grid-column:1/-1">
      <div class="sum-label">Kapasiteit (${fillPct}% vol)</div>
      <div class="fill-bar-wrap" style="margin-top:4px"><div class="fill-bar" style="width:${fillPct}%;background:${fillColor}"></div></div>
      <div style="font-size:11px;color:var(--text3);margin-top:2px">${bags}/${totalCap} sakke · ${ton}/${((totalCap*50)/1000).toFixed(1)} ton</div>
    </div>`:''}`;

  // ── LAAI KONTROLELYS ──────────────────────────────────────────
  const cl = t.loadChecklist || {};
  const checkItems = [
    {key:'truckLoaded',   label:'🚛 Vragmotor gelaai',         desc:'Alle items op die vragmotor'},
    {key:'trailerLoaded', label:'🚌 Sleepwa gelaai',           desc:'Alle items op die sleepwa', show: t.hasTrailer},
    {key:'sealCovered',   label:'🎪 Seildoek bedek',           desc:'Alle laaie bedek teen reën'},
    {key:'driveComplete', label:'✅ Rit voltooi / Afgelewer',  desc:'Bestuurder het teruggekeer'},
  ];
  const visibleItems = checkItems.filter(x => x.show !== false);
  const allDone = visibleItems.every(x => cl[x.key]);

  document.getElementById('truck-visual-section').innerHTML = `
    <div class="card" style="margin-bottom:12px">
      <div style="font-weight:700;font-size:13px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
        📋 Laai Kontrolelys ${t.driverName?`<span style="font-size:12px;color:var(--text3)">Bestuurder: ${escH(t.driverName)}</span>`:''}
      </div>
      ${visibleItems.map(item=>`
        <div onclick="toggleTruckCheck(${t.id},'${item.key}')"
          style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg3);border-radius:8px;margin-bottom:6px;cursor:pointer;transition:background .15s;${cl[item.key]?'background:var(--adim)':''}">
          <div class="check-box${cl[item.key]?' checked':''}" style="flex-shrink:0">${cl[item.key]?'✓':''}</div>
          <div>
            <div style="font-weight:600;font-size:14px;${cl[item.key]?'color:var(--accent)':''}">${item.label}</div>
            <div style="font-size:11px;color:var(--text3)">${item.desc}</div>
          </div>
        </div>`).join('')}
      ${allDone?`<div style="background:var(--adim);color:var(--accent);border-radius:8px;padding:10px;font-weight:700;text-align:center;font-size:13px;margin-top:6px">
        🎉 Alles voltooi! Wil jy hierdie sessie na geskiedenis stuur?
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn btn-primary btn-full" onclick="archiveTruck(${t.id})">📦 Stuur na Geskiedenis</button>
        </div>
      </div>`:''}
    </div>`;

  // ── CLIENT STOPS / ROUTE ──────────────────────────────────────
  renderTruckRoute(t);

  const itemsEl = document.getElementById('truck-items');
  if (!t.items.length) { itemsEl.innerHTML='<div class="empty">Geen items nie – tik "Voeg Produk By"</div>'; return; }

  // Group items by their client stop (null = "no client / general load")
  const stops = t.stops||[];
  const groups = [{id:null,label:'📦 Algemene lading (geen klant)'}]
    .concat(stops.map(s=>({id:s.id,label:'👤 '+s.customerName+(s.km?` · ${s.km}km`:'')})));
  const itemRow = item=>`
    <div class="count-row">
      <div class="count-info">
        <span class="count-name">${escH(item.name)}</span>
        <span class="count-sub">${item.unit} · R${item.price.toFixed(2)} elk · Totaal: R${item.total.toFixed(2)}</span>
      </div>
      <div class="count-controls">
        <button class="qty-btn" onclick="updateTruckQty(${item.productId},-1,${item.stopId?`'${item.stopId}'`:'null'})">−</button>
        <input type="number" class="qty-input" value="${item.qty}" min="0" onchange="setTruckQty(${item.productId},this.value,${item.stopId?`'${item.stopId}'`:'null'})"/>
        <button class="qty-btn" onclick="updateTruckQty(${item.productId},1,${item.stopId?`'${item.stopId}'`:'null'})">+</button>
        <button class="icon-btn red sm" onclick="removeTruckItem(${item.productId},${item.stopId?`'${item.stopId}'`:'null'})">✕</button>
      </div>
    </div>`;
  itemsEl.innerHTML = groups.map(g=>{
    const its=t.items.filter(i=>(i.stopId||null)===g.id);
    if(!its.length && g.id===null && stops.length) return ''; // hide empty general group when using stops
    const bags=its.reduce((s,i)=>s+i.qty,0);
    const val=its.reduce((s,i)=>s+i.total,0);
    return `<div style="margin-bottom:10px">
      <div class="section-title" style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
        <span>${g.label}</span>
        <span style="font-size:11px;color:var(--text3);font-weight:600">${bags} sakke · R${val.toFixed(2)}</span>
      </div>
      ${its.length?its.map(itemRow).join('')
        :`<div class="empty" style="padding:14px;font-size:12px">Geen produkte ${g.id?'vir hierdie klant':''} nie.${g.id?` <button class="btn btn-secondary btn-sm" style="margin-top:6px" onclick="openTruckItemModal('${g.id}')">＋ Voeg produk by</button>`:''}</div>`}
    </div>`;
  }).join('');
}

// Route summary: total km, fuel estimate, per-client stop cards
function renderTruckRoute(t){
  const el=document.getElementById('truck-route-section'); if(!el) return;
  const stops=t.stops||[];
  const totalKm=stops.reduce((s,x)=>s+(x.km||0),0);
  // round trip (there and back) is the usual diesel cost
  const roundKm=totalKm*2;
  const litresPer100 = t.fuelPer100 || 35;   // sensible default for a loaded truck
  const litres = roundKm * litresPer100/100;
  el.innerHTML=`
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-weight:700;font-size:13px">🗺️ Roete &amp; Kliënte (${stops.length})</div>
        <button class="btn btn-secondary btn-sm" onclick="openTruckStopModal()">＋ Klant</button>
      </div>
      ${stops.length?`
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <div class="route-stat"><div class="route-stat-val">${stops.length}</div><div class="route-stat-lbl">Kliënte</div></div>
          <div class="route-stat"><div class="route-stat-val">${totalKm}</div><div class="route-stat-lbl">km enkel</div></div>
          <div class="route-stat"><div class="route-stat-val">${roundKm}</div><div class="route-stat-lbl">km heen&amp;terug</div></div>
          <div class="route-stat"><div class="route-stat-val">${litres.toFixed(0)}L</div><div class="route-stat-lbl">±diesel</div></div>
        </div>
        ${stops.map((s,idx)=>{
          const its=t.items.filter(i=>(i.stopId||null)===s.id);
          const bags=its.reduce((a,i)=>a+i.qty,0);
          return `<div class="stop-card${s.done?' done-stop':''}">
            <div style="display:flex;align-items:center;gap:10px">
              <div class="check-box${s.done?' checked':''}" onclick="toggleStopDone('${s.id}')" style="flex-shrink:0">${s.done?'✓':''}</div>
              <div style="flex:1;min-width:0">
                <div style="font-weight:700;font-size:14px">${idx+1}. ${escH(s.customerName)}</div>
                ${s.address?`<div style="font-size:11px;color:var(--text3)">${escH(s.address)}</div>`:''}
                <div style="font-size:11px;color:var(--text3)">${its.length} produkte · ${bags} sakke</div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
                <div style="display:flex;align-items:center;gap:4px">
                  <input type="number" inputmode="numeric" class="qty-input" style="width:62px" value="${s.km||''}" placeholder="km" onchange="updateStopKm('${s.id}',this.value)"/>
                  <span style="font-size:11px;color:var(--text3)">km</span>
                </div>
              </div>
            </div>
            <div style="display:flex;gap:6px;margin-top:8px">
              <button class="btn btn-secondary btn-sm" style="flex:1" onclick="openTruckItemModal('${s.id}')">＋ Produk vir klant</button>
              ${s.address?`<a class="btn btn-secondary btn-sm" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" style="flex:0 0 auto">🧭</a>`:''}
              <button class="icon-btn red sm" onclick="removeTruckStop('${s.id}')">🗑</button>
            </div>
          </div>`;
        }).join('')}
      `:'<div class="empty" style="padding:14px;font-size:12px">Geen kliënte nie. Pak meer as een klant op een vrag om diesel te spaar – tik “＋ Klant”.</div>'}
    </div>`;
}

function toggleTruckCheck(truckId, key) {
  const t = truckCounts.find(x=>x.id===truckId); if (!t) return;
  if (!t.loadChecklist) t.loadChecklist = {};
  t.loadChecklist[key] = !t.loadChecklist[key];
  if (key==='driveComplete' && t.loadChecklist[key]) t.delivered = true;
  save('v3_trucks', truckCounts);
  renderTruckDetail();
}

function archiveTruck(id) {
  const t = truckCounts.find(x=>x.id===id); if (!t) return;
  truckHistory.unshift({ ...t, archivedAt: new Date().toLocaleDateString('af-ZA') });
  truckCounts = truckCounts.filter(x=>x.id!==id);
  save('v3_trucks', truckCounts);
  save('v3_truckHistory', truckHistory);
  closeTruckDetail();
  alert('✅ Laaisessie gestoor in geskiedenis!');
}

// ── TRUCK HISTORY ──────────────────────────────────────────────
function renderTruckHistory() {
  const el = document.getElementById('truck-history-tab');
  if (!el) return;
  if (!truckHistory.length) { el.innerHTML='<div class="empty">Geen geskiedenis nie. Sessies verskyn hier nadat hulle geargiveer is.</div>'; return; }
  el.innerHTML = truckHistory.map(t => {
    const bags = t.items.reduce((s,i)=>s+i.qty,0);
    const val  = t.items.reduce((s,i)=>s+i.total,0);
    return `<div class="truck-card" style="opacity:.85">
      <div class="truck-icon" style="opacity:.6">📦</div>
      <div class="truck-card-visual" style="flex:1">
        <span class="truck-name">${escH(t.name)}${t.driverName?` · ${escH(t.driverName)}`:''}</span>
        <span class="truck-meta">Gery: ${t.date} · Geargiveer: ${t.archivedAt} · ${bags} sakke</span>
        <span class="truck-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
      </div>
      <button class="icon-btn red sm" onclick="deleteTruckHistory(${t.id})">🗑</button>
    </div>`;
  }).join('');
}

function deleteTruckHistory(id) {
  if (!confirm('Verwyder hierdie geskiedenisinskrywing?')) return;
  truckHistory = truckHistory.filter(t=>t.id!==id);
  save('v3_truckHistory', truckHistory);
  renderTruckHistory();
}

// ── TRUCK ITEMS ────────────────────────────────────────────────
let currentStopId = null;  // when set, products added go to this client stop

function openTruckItemModal(stopId){
  currentStopId = stopId || null;
  const t = truckCounts.find(x=>x.id===currentTruckId);
  const titleEl = document.getElementById('ti-modal-title');
  if(titleEl){
    if(currentStopId && t){
      const st=(t.stops||[]).find(s=>s.id===currentStopId);
      titleEl.textContent = st?('Produkte vir '+st.customerName):'Voeg by Vragmotor';
    } else titleEl.textContent='Voeg by Vragmotor';
  }
  document.getElementById('ti-search').value='';
  renderTruckPicker();
  openModal('truck-item-modal');
}

function renderTruckPicker() {
  const search = (document.getElementById('ti-search')?.value||'').toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(search)||p.category.toLowerCase().includes(search)).slice(0,40);
  document.getElementById('ti-picker').innerHTML = filtered.map(p=>
    `<button class="picker-item" onclick="addTruckItem(${p.id})">
      <span class="picker-name">${escH(p.name)}</span>
      <span class="picker-sub">${p.category} · R${getDiscounted(p).toFixed(2)}</span>
    </button>`
  ).join('');
}

function addTruckItem(prodId) {
  const p = products.find(x=>x.id===prodId); if (!p||!currentTruckId) return;
  const price = getDiscounted(p);
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  // Items are keyed by product + which client stop they belong to, so
  // the same product going to two different clients stays separate.
  const stopId = currentStopId || null;
  const ex = t.items.find(i=>i.productId===prodId && (i.stopId||null)===stopId);
  if (ex) { ex.qty++; ex.total=ex.qty*ex.price; }
  else t.items.push({productId:prodId,name:p.name,unit:p.unit,price,qty:1,total:price,stopId});
  save('v3_trucks',truckCounts);
  closeModal('truck-item-modal');
  renderTruckDetail();
}

function updateTruckQty(prodId,delta,stopId) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const i = t.items.find(x=>x.productId===prodId && (x.stopId||null)===(stopId||null)); if (!i) return;
  i.qty=Math.max(0,i.qty+delta); i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function setTruckQty(prodId,val,stopId) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const i = t.items.find(x=>x.productId===prodId && (x.stopId||null)===(stopId||null)); if (!i) return;
  i.qty=parseInt(val)||0; i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function removeTruckItem(prodId,stopId) {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  t.items=t.items.filter(i=>!(i.productId===prodId && (i.stopId||null)===(stopId||null)));
  save('v3_trucks',truckCounts); renderTruckDetail();
}

// ── CLIENT STOPS (merged delivery) ─────────────────────────────
function openTruckStopModal(){
  const sel=document.getElementById('ts-cust');
  if(sel) sel.innerHTML='<option value="">-- Kies klant --</option>'+customers.map(c=>`<option value="${c.id}">${escH(c.name)}</option>`).join('');
  document.getElementById('ts-km').value='';
  document.getElementById('ts-notes').value='';
  openModal('truck-stop-modal');
}

function addTruckStop(){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const custId=parseInt(document.getElementById('ts-cust').value);
  if(!custId){ alert('Kies asseblief \u2019n klant'); return; }
  const cust=customers.find(c=>c.id===custId); if(!cust) return;
  const km=parseFloat(document.getElementById('ts-km').value)||0;
  if(!t.stops) t.stops=[];
  t.stops.push({id:uid(),customerId:cust.id,customerName:cust.name,
    address:cust.farm?`${cust.farm}, ${cust.area||''}`:(cust.area||''),
    km, notes:document.getElementById('ts-notes').value, done:false});
  save('v3_trucks',truckCounts);
  closeModal('truck-stop-modal');
  renderTruckDetail();
}

function updateStopKm(stopId,val){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const s=(t.stops||[]).find(x=>x.id===stopId); if(!s) return;
  s.km=parseFloat(val)||0; save('v3_trucks',truckCounts);
  renderTruckRoute(t); // light refresh of just the route totals
}

function toggleStopDone(stopId){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const s=(t.stops||[]).find(x=>x.id===stopId); if(!s) return;
  s.done=!s.done; save('v3_trucks',truckCounts); renderTruckDetail();
}

function removeTruckStop(stopId){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  if(!confirm('Verwyder hierdie klant van die sessie?')) return;
  t.stops=(t.stops||[]).filter(s=>s.id!==stopId);
  // un-tag any items that were for this stop (keep them on the load)
  t.items.forEach(i=>{ if((i.stopId||null)===stopId) i.stopId=null; });
  save('v3_trucks',truckCounts); renderTruckDetail();
}

function exportTruckList() {
  const t = truckCounts.find(x=>x.id===currentTruckId); if (!t) return;
  const bags=t.items.reduce((s,i)=>s+i.qty,0);
  const val=t.items.reduce((s,i)=>s+i.total,0);
  const lines=['LOBOL – Vragmotor Laailys',`Vragmotor: ${t.name}`,`Bestuurder: ${t.driverName||'—'}`,`Datum: ${t.date}`,'',
    ...t.items.map(i=>`${i.name} – ${i.qty} x R${i.price.toFixed(2)} = R${i.total.toFixed(2)}`),
    '',`Totaal Sakke: ${bags}`,`Totale Waarde: R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}`];
  dl(lines.join('\n'),`${t.name.replace(/\s/g,'_')}_laailys.txt`,'text/plain');
}

// ── FLEET ──────────────────────────────────────────────────────
function renderFleet() {
  const el=document.getElementById('fleet-list'); if (!el) return;
  if (!fleet.length) { el.innerHTML='<div class="empty">Geen vragmotors in vloot nie. Tik + om by te voeg.</div>'; return; }
  el.innerHTML=fleet.map(t=>{
    const tot=t.truckCapacity+(t.hasTrailer?t.trailerCapacity:0);
    return `<div class="fleet-item">
      <div class="fleet-icon">${t.emoji||'🚛'}</div>
      <div class="fleet-info">
        <div class="fleet-name">${escH(t.name)}</div>
        <div class="fleet-meta">${t.notes?escH(t.notes):'Geen notas'}</div>
        <div class="fleet-caps">
          <span class="fleet-cap-chip">🚛 ${t.truckCapacity} sakke (${((t.truckCapacity*50)/1000).toFixed(1)} ton)</span>
          ${t.hasTrailer?`<span class="fleet-cap-chip">🚌 Sleepwa: ${t.trailerCapacity} sakke (${((t.trailerCapacity*50)/1000).toFixed(1)} ton)</span>`:''}
          <span class="fleet-cap-chip" style="background:var(--adim);color:var(--accent);font-weight:700">Totaal: ${tot} sakke / ${((tot*50)/1000).toFixed(1)} ton</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="icon-btn sm" onclick="editFleet(${t.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteFleet(${t.id})">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function addFleet() {
  const name=document.getElementById('fa-name').value.trim(); if (!name) return;
  const hasTrailer=document.getElementById('fa-has-trailer').checked;
  fleet.push({id:uid(),name,emoji:document.getElementById('fa-emoji').value||'🚛',
    truckCapacity:parseInt(document.getElementById('fa-truck-cap').value)||0,
    hasTrailer,trailerCapacity:hasTrailer?(parseInt(document.getElementById('fa-trailer-cap').value)||0):0,
    notes:document.getElementById('fa-notes').value});
  save('v3_fleet',fleet);
  ['fa-name','fa-truck-cap','fa-trailer-cap','fa-notes'].forEach(x=>{const el=document.getElementById(x);if(el)el.value='';});
  closeModal('fleet-add-modal'); renderFleet();
}

function editFleet(id) {
  const t=fleet.find(x=>x.id===id); if (!t) return;
  const name=prompt('Naam:',t.name); if (name===null) return;
  const cap=prompt('Vragmotor kapasiteit (sakke):',t.truckCapacity); if (cap===null) return;
  const trailer=confirm('Sleepwa?');
  let tCap=0;
  if (trailer) { const tc=prompt('Sleepwa kapasiteit (sakke):',t.trailerCapacity||0); if (tc===null) return; tCap=parseInt(tc)||0; }
  const notes=prompt('Notas:',t.notes||''); if (notes===null) return;
  Object.assign(t,{name,truckCapacity:parseInt(cap)||0,hasTrailer:trailer,trailerCapacity:tCap,notes});
  save('v3_fleet',fleet); renderFleet();
}

function deleteFleet(id) {
  if (!confirm('Verwyder?')) return;
  fleet=fleet.filter(x=>x.id!==id); save('v3_fleet',fleet); renderFleet();
}

function toggleTrailerField() {
  const cb=document.getElementById('fa-has-trailer');
  const row=document.getElementById('fa-trailer-row');
  if (row) row.style.display=cb&&cb.checked?'':'none';
}

// ── DRIVERS ────────────────────────────────────────────────────
function renderDrivers() {
  const el=document.getElementById('driver-list'); if (!el) return;
  if (!drivers.length) { el.innerHTML='<div class="empty">Geen bestuurders nie.</div>'; return; }
  el.innerHTML=drivers.map(d=>`
    <div class="driver-row${!d.active?' worker-inactive':''}">
      <div class="driver-av">${d.name.charAt(0).toUpperCase()}</div>
      <div class="driver-info">
        <div class="driver-name">${escH(d.name)}</div>
        <div class="driver-role">Lisensie: ${escH(d.licenseCode||'EC')} ${d.phone?'· '+escH(d.phone):''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        ${!d.active?'<span class="badge badge-dim">Af</span>':''}
        <button class="icon-btn sm" onclick="editDriver(${d.id})">✏</button>
        <button class="icon-btn sm" onclick="toggleDriverActive(${d.id})">${d.active?'✕':'✓'}</button>
        <button class="icon-btn red sm" onclick="deleteDriver(${d.id})">🗑</button>
      </div>
    </div>`).join('');
}

function addDriver() {
  const name=document.getElementById('da2-name').value.trim(); if (!name) return;
  drivers.push({id:uid(),name,phone:document.getElementById('da2-phone').value,
    licenseCode:document.getElementById('da2-license').value||'EC',
    notes:document.getElementById('da2-notes').value,active:true});
  save('v3_drivers',drivers);
  ['da2-name','da2-phone','da2-notes'].forEach(x=>{const el=document.getElementById(x);if(el)el.value='';});
  closeModal('driver-add-modal'); renderDrivers();
}

function editDriver(id) {
  const d=drivers.find(x=>x.id===id); if (!d) return;
  const name=prompt('Naam:',d.name); if (name===null) return;
  const phone=prompt('Tel:',d.phone||''); if (phone===null) return;
  const lic=prompt('Lisensiekode:',d.licenseCode||'EC'); if (lic===null) return;
  Object.assign(d,{name,phone,licenseCode:lic}); save('v3_drivers',drivers); renderDrivers();
}

function toggleDriverActive(id) {
  const d=drivers.find(x=>x.id===id); if(d){d.active=!d.active;save('v3_drivers',drivers);renderDrivers();}
}

function deleteDriver(id) {
  if (!confirm('Verwyder?')) return;
  drivers=drivers.filter(x=>x.id!==id); save('v3_drivers',drivers); renderDrivers();
}
// ═══════════════════════════════════════════════════════════════
// TRUCK COMPARE  (was missing from the modular build — lived only
// in the old app.js monolith, so the "Vergelyking" page threw a
// ReferenceError: renderCompare is not defined)
// ═══════════════════════════════════════════════════════════════
function renderCompare(){
  const sel=document.getElementById('cmp-truck-select');
  if(!sel) return;
  if(!truckCounts.length){
    sel.innerHTML='<div class="empty">Geen vragmotor tellings nie.</div>';
    const r=document.getElementById('cmp-results'); if(r) r.innerHTML='';
    return;
  }
  sel.innerHTML=truckCounts.map(t=>{
    const bags=t.items.reduce((s,i)=>s+i.qty,0);
    const isSel=cmpSelected.includes(t.id);
    return `<button class="cmp-truck-btn${isSel?' sel':''}" onclick="toggleCmpTruck(${t.id})">
      <span class="cmp-truck-icon">🚛</span>
      <div style="flex:1"><span class="cmp-truck-name">${escH(t.name)}</span><span class="cmp-truck-meta">${t.date} · ${bags} sakke</span></div>
      ${isSel?'<span style="color:var(--accent)">✓</span>':''}
    </button>`;
  }).join('');
  renderCmpResults();
}

function toggleCmpTruck(id){
  if(cmpSelected.includes(id)) cmpSelected=cmpSelected.filter(x=>x!==id);
  else if(cmpSelected.length<4) cmpSelected.push(id);
  renderCompare();
}

function renderCmpResults(){
  const res=document.getElementById('cmp-results'); if(!res) return;
  const selected=truckCounts.filter(t=>cmpSelected.includes(t.id));
  if(!selected.length){
    res.innerHTML='<div class="cmp-empty-hint" style="text-align:center;padding:40px;color:var(--text3)">🚛 Kies vragmotors hierbo om te vergelyk</div>';
    return;
  }
  const map={};
  selected.forEach(t=>t.items.forEach(i=>{
    if(!map[i.productId]) map[i.productId]={name:i.name,unit:i.unit,trucks:{}};
    map[i.productId].trucks[t.id]={qty:i.qty,total:i.total,price:i.price};
  }));
  const allProds=Object.values(map);
  const totals={};
  selected.forEach(t=>{ totals[t.id]={bags:t.items.reduce((s,i)=>s+i.qty,0),val:t.items.reduce((s,i)=>s+i.total,0),prods:t.items.length}; });
  const grandBags=Object.values(totals).reduce((s,t)=>s+t.bags,0);
  const grandVal=Object.values(totals).reduce((s,t)=>s+t.val,0);

  res.innerHTML=`
    <div class="cmp-sum-row">${selected.map(t=>`<div class="cmp-sum-card">
      <div class="cmp-lbl">🚛 ${escH(t.name)}</div>
      <div class="cmp-bags">${totals[t.id].bags} <span>sakke</span></div>
      <div class="cmp-val">R${totals[t.id].val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</div>
      <div class="cmp-prods">${totals[t.id].prods} produkte</div>
    </div>`).join('')}</div>
    ${selected.length>1?`<div class="cmp-grand">Gesamentlik: <strong>${grandBags} sakke</strong> · R${grandVal.toLocaleString('af-ZA',{minimumFractionDigits:2})}</div>`:''}
    <div class="cmp-table-wrap"><table class="cmp-table">
      <thead><tr><th class="cmp-th-prod">Produk</th>${selected.map(t=>`<th class="cmp-th-truck">🚛 ${escH(t.name)}</th>`).join('')}<th class="cmp-th-total">Totaal</th></tr></thead>
      <tbody>${allProds.map(p=>{
        const maxQ=Math.max(...selected.map(t=>p.trucks[t.id]?.qty||0));
        const totalQ=Object.values(p.trucks).reduce((s,x)=>s+x.qty,0);
        const totalV=Object.values(p.trucks).reduce((s,x)=>s+x.total,0);
        return `<tr>
          <td class="cmp-td-prod"><div class="cmp-prod-name">${escH(p.name)}</div><div class="cmp-prod-unit">${p.unit}</div></td>
          ${selected.map(t=>{
            const e=p.trucks[t.id];
            const isMax=e&&e.qty===maxQ&&maxQ>0&&selected.length>1;
            return `<td class="cmp-td-qty${isMax?' cmp-max':''}${!e?' cmp-absent':''}">${e?`<div class="cmp-qty">${e.qty}</div><div class="cmp-sub">R${e.total.toFixed(2)}</div>`:'<span class="cmp-none">–</span>'}</td>`;
          }).join('')}
          <td class="cmp-td-total"><div class="cmp-qty accent">${totalQ}</div><div class="cmp-sub">R${totalV.toFixed(2)}</div></td>
        </tr>`;
      }).join('')}</tbody>
      <tfoot class="cmp-foot">
        <tr><td class="cmp-td-prod"><strong>Totaal Sakke</strong></td>${selected.map(t=>`<td class="cmp-td-qty"><strong>${totals[t.id].bags}</strong></td>`).join('')}<td class="cmp-td-total"><strong>${grandBags}</strong></td></tr>
        <tr><td class="cmp-td-prod"><strong>Totale Waarde</strong></td>${selected.map(t=>`<td class="cmp-td-qty"><strong style="color:var(--accent)">R${totals[t.id].val.toFixed(2)}</strong></td>`).join('')}<td class="cmp-td-total"><strong style="color:var(--accent)">R${grandVal.toFixed(2)}</strong></td></tr>
      </tfoot>
    </table></div>`;
}
