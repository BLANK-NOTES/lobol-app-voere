// ═══════════════════════════════════════════════════════════════
// EXPORT / BACKUP
// ═══════════════════════════════════════════════════════════════
function dl(content,filename,type='text/csv'){
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function toCSV(headers,rows){
  const esc=v=>{ const s=String(v??''); return s.includes(',')||s.includes('"')||s.includes('\n')?`"${s.replace(/"/g,'""')}"`:''; };
  return [headers,...rows].map(r=>r.map(esc).join(',')).join('\n');
}
function renderExport(){
  const date=new Date().toLocaleDateString('af-ZA').replace(/\//g,'-');
  document.getElementById('export-stats').innerHTML=`
    <div class="exp-stat"><span class="exp-stat-val">${products.length}</span><span class="exp-stat-lbl">Produkte</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${factoryStock.length}</span><span class="exp-stat-lbl">Voorraad</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${sales.length}</span><span class="exp-stat-lbl">Verkope</span></div>
    <div class="exp-stat"><span class="exp-stat-val">${customers.length}</span><span class="exp-stat-lbl">Klante</span></div>`;
  const exports=[
    {label:'Produkte',sub:`${products.length} produkte met pryse`,fn:()=>dl(toCSV(['ID','Naam','Kategorie','Prys','Prys/ton','Eenheid','Beskrywing','Gebruik'],products.map(p=>[p.id,p.name,p.category,p.price,p.pricePerTon||'',p.unit,p.description||'',p.useCase||''])),`LOBOL_Produkte_${date}.csv`)},
    {label:'Fabrieksvoorraad',sub:`${factoryStock.length} items`,fn:()=>dl(toCSV(['Naam','Hoeveelheid','Min Vlak','Eenheid','Status','Vervaldatum','Prys','Waarde','Notas'],factoryStock.map(i=>[i.name,i.qty,i.minQty||0,i.unit,i.status,i.expiryDate||'',i.price,(i.qty||0)*(i.price||0),i.notes||''])),`LOBOL_Voorraad_${date}.csv`)},
    {label:'Verkope',sub:`${sales.length} bestellings`,fn:()=>{ const rows=[]; sales.forEach(s=>(s.items||[{name:'',qty:'',price:'',total:s.total}]).forEach(i=>rows.push([s.customerName,s.date,s.status,i.name,i.qty,i.price,i.total,s.notes||'']))); dl(toCSV(['Klant','Datum','Status','Produk','Hoeveelheid','Prys','Totaal','Notas'],rows),`LOBOL_Verkope_${date}.csv`); }},
    {label:'Vragmotor Laailyste',sub:`${truckCounts.length} vragmotors`,fn:()=>{ const rows=[]; truckCounts.forEach(t=>t.items.forEach(i=>rows.push([t.name,t.date,i.name,i.qty,i.price,i.total,t.delivered?'Afgelewer':'Aktief']))); dl(toCSV(['Vragmotor','Datum','Produk','Sakke','Prys','Totaal','Status'],rows),`LOBOL_Vragmotors_${date}.csv`); }},
    {label:'Klante',sub:`${customers.length} klante`,fn:()=>dl(toCSV(['Naam','Plaas','Telefoon','Area','Tipe','Eie Geel','Notas'],customers.map(c=>[c.name,c.farm||'',c.phone||'',c.area||'',c.type||'',c.eieGeel?'Ja':'Nee',c.notes||''])),`LOBOL_Klante_${date}.csv`)},
  ];
  if(priceHistory.length) exports.push({label:'Prysgeskiedenis',sub:`${priceHistory.length} veranderings`,fn:()=>dl(toCSV(['Produk','Ou Prys','Nuwe Prys','Datum','Tyd'],priceHistory.map(h=>[h.productName,h.oldPrice,h.newPrice,h.date,h.time||''])),`LOBOL_Prysgeskiedenis_${date}.csv`)});
  document.getElementById('export-list').innerHTML=exports.map((e,i)=>`<button class="export-btn" onclick="window._exports[${i}]()"><div class="export-btn-icon">📊</div><div><div class="export-btn-label">${e.label}</div><div class="export-btn-sub">${e.sub}</div></div><span style="color:var(--text3)">⬇</span></button>`).join('');
  window._exports=exports.map(e=>e.fn);
}
function exportFullBackup(){
  const data={exportDate:new Date().toISOString(),version:'3.0',products,duties,reminders,factoryStock,truckCounts,customers,sales,deliveries,notes,workers,priceHistory};
  dl(JSON.stringify(data,null,2),`LOBOL_Rugsteun_${new Date().toLocaleDateString('af-ZA').replace(/\//g,'-')}.json`,'application/json');
}
function importBackup(e){
  const file=e.target.files?.[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data.version||!data.products) throw new Error('Ongeldige lêer');
      if(data.products) { products=data.products; save('v3_products',products); }
      if(data.factoryStock) { factoryStock=data.factoryStock; save('v3_stock',factoryStock); }
      if(data.sales) { sales=data.sales; save('v3_sales',sales); }
      if(data.customers) { customers=data.customers; save('v3_customers',customers); }
      if(data.duties) { duties=data.duties; save('v3_duties',duties); }
      if(data.notes) { notes=data.notes; save('v3_notes',notes); }
      if(data.workers) { workers=data.workers; save('v3_workers',workers); }
      if(data.priceHistory) { priceHistory=data.priceHistory; save('v3_priceHistory',priceHistory); }
      document.getElementById('import-msg').innerHTML='<div class="import-msg import-ok">✅ Rugsteun suksesvol herstel!</div>';
      renderExport();
    }catch(err){
      document.getElementById('import-msg').innerHTML=`<div class="import-msg import-err">❌ Fout: ${err.message}</div>`;
    }
  };
  reader.readAsText(file); e.target.value='';
}

// ═══════════════════════════════════════════════════════════════
// INIT — app bootstrap is centralized in index.html (runs once
// after all modules load). Do not initialize here to avoid
// duplicate timers and double rendering.
// ═══════════════════════════════════════════════════════════════