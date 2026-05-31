// ═══════════════════════════════════════════════════════════════
// DIEREGESONDHEID – Animal Health Records & Info
// ═══════════════════════════════════════════════════════════════
let healthRecords = STORE.get('v3_healthRecords', []);
let healthFilter = 'Alle';
const HEALTH_TYPES = ['Alle','Entstof','Doseer','Behandeling','Operasie','Inspeksie','Ander'];
const HEALTH_SPECIES = ['Alle','Beeste','Skape','Bokke','Perd','Ander'];
let healthSpeciesFilter = 'Alle';

function saveHealthRecords(){ save('v3_healthRecords', healthRecords); }

/* ─── RENDER ─── */
function renderDieregesondheid(){
  const tab = window._healthTab || 'rekords';
  document.getElementById('health-tab-row').innerHTML = `
    <button class="tab-btn${tab==='rekords'?' active':''}" onclick="setHealthTab('rekords')">📋 Rekords</button>
    <button class="tab-btn${tab==='info'?' active':''}" onclick="setHealthTab('info')">💊 Inligting</button>`;

  if(tab === 'rekords') renderHealthRecords();
  else renderHealthInfo();
}

function setHealthTab(t){ window._healthTab=t; renderDieregesondheid(); }

/* ─── HEALTH RECORDS ─── */
function renderHealthRecords(){
  document.getElementById('health-records-content').style.display='';
  document.getElementById('health-info-content').style.display='none';

  document.getElementById('health-type-chips').innerHTML = HEALTH_TYPES.map(t=>
    `<button class="chip${healthFilter===t?' active':''}" onclick="setHealthFilter('${t}')">${t}</button>`).join('');
  document.getElementById('health-species-chips').innerHTML = HEALTH_SPECIES.map(s=>
    `<button class="chip${healthSpeciesFilter===s?' active':''}" onclick="setHealthSpeciesFilter('${s}')">${s}</button>`).join('');

  const search = (document.getElementById('health-search')?.value||'').toLowerCase();
  let filtered = healthRecords.filter(r=>{
    const tm = healthFilter==='Alle'||r.type===healthFilter;
    const sm = healthSpeciesFilter==='Alle'||r.species===healthSpeciesFilter;
    const srch = (r.animal||'').toLowerCase().includes(search)||(r.treatment||'').toLowerCase().includes(search)||(r.notes||'').toLowerCase().includes(search);
    return tm&&sm&&srch;
  }).sort((a,b)=>new Date(b.date||0)-new Date(a.date||0));

  const el = document.getElementById('health-records-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen gesondheidsrekords nie. Tik + om \'n rekord by te voeg.</div>'; return; }

  const typeColors = {'Entstof':'badge-green','Doseer':'badge-blue','Behandeling':'badge-orange','Operasie':'badge-red','Inspeksie':'badge-dim','Ander':'badge-dim'};

  el.innerHTML = filtered.map(r=>`<div class="card" style="margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
          <span class="badge ${typeColors[r.type]||'badge-dim'}">${r.type||'–'}</span>
          <span class="badge badge-dim">${r.species||'–'}</span>
          <span style="font-size:11px;color:var(--text3)">${r.date||''}</span>
        </div>
        <div style="font-weight:700;font-size:15px">${escH(r.animal||'Onbekend')}</div>
        <div style="font-size:13px;color:var(--text2);margin-top:4px">${escH(r.treatment||'')}</div>
        ${r.vet?`<div style="font-size:12px;color:var(--text3);margin-top:2px">🩺 ${escH(r.vet)}</div>`:''}
        ${r.nextDate?`<div style="font-size:12px;color:var(--orange);margin-top:4px;font-weight:600">⏰ Volgende: ${r.nextDate}</div>`:''}
        ${r.notes?`<div class="detail-notes" style="margin-top:6px">${escH(r.notes)}</div>`:''}
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
        <button class="icon-btn sm" onclick="editHealthRecord(${r.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteHealthRecord(${r.id})">🗑</button>
      </div>
    </div>
  </div>`).join('');
}

function setHealthFilter(f){ healthFilter=f; renderDieregesondheid(); }
function setHealthSpeciesFilter(f){ healthSpeciesFilter=f; renderDieregesondheid(); }

function addHealthRecord(){
  const animal = document.getElementById('hr-animal').value.trim(); if(!animal) return;
  healthRecords.unshift({
    id: uid(),
    animal,
    species: document.getElementById('hr-species').value,
    type: document.getElementById('hr-type').value,
    treatment: document.getElementById('hr-treatment').value,
    vet: document.getElementById('hr-vet').value,
    date: document.getElementById('hr-date').value||new Date().toLocaleDateString('af-ZA'),
    nextDate: document.getElementById('hr-next').value,
    notes: document.getElementById('hr-notes').value,
    createdAt: new Date().toISOString()
  });
  saveHealthRecords();
  ['hr-animal','hr-treatment','hr-vet','hr-next','hr-notes'].forEach(x=>document.getElementById(x)&&(document.getElementById(x).value=''));
  closeModal('health-add-modal');
  renderDieregesondheid();
}

function editHealthRecord(id){
  const r = healthRecords.find(x=>x.id===id); if(!r) return;
  const animal = prompt('Dier/Groep naam:', r.animal||''); if(animal===null) return;
  const treatment = prompt('Behandeling / Produk:', r.treatment||''); if(treatment===null) return;
  const notes = prompt('Notas:', r.notes||''); if(notes===null) return;
  const nextDate = prompt('Volgende datum (JJJJ-MM-DD):', r.nextDate||''); if(nextDate===null) return;
  Object.assign(r,{animal,treatment,notes,nextDate});
  saveHealthRecords(); renderDieregesondheid();
}

function deleteHealthRecord(id){
  if(!confirm('Verwyder hierdie gesondheidsrekord?')) return;
  healthRecords = healthRecords.filter(r=>r.id!==id);
  saveHealthRecords(); renderDieregesondheid();
}

/* ─── HEALTH INFO ─── */
function renderHealthInfo(){
  document.getElementById('health-records-content').style.display='none';
  document.getElementById('health-info-content').style.display='';

  document.getElementById('health-info-content').innerHTML = `
    <div class="section-title">💊 Algemene Siektegidse</div>

    ${[
      {title:'🐂 Beeste – Maagprobleme & Behandeling', items:[
        'Salmonella / Bloedige Diarree: Advocin + Vitamin B-kompleks',
        'Dikmelkagtig / Wit Diarree (kalwers): Clamoxil + BiosolM',
        'Koksidiose: Sulfamiddel 3 dae lank',
        'Waterige Diarree: BiosolM + Phosamine',
        'Lintwurm: Lintex elke 14 dae',
        'Respiratories: Nuflor / Mycotil 300',
        'Bloednier: Penicillin + Multivit',
        'Galsiekte: Imizol injeksie (slegs veearts)',
        'Mond-en-Klou-seer: Noem aan provinsiale veearts – aanmeldbare siekte',
      ]},
      {title:'🐑 Skape – Siekte & Behandeling', items:[
        'Koksidiose by lammers: Spuit teen koksidiose + Sulfamiddel',
        'Melkwurm: Doseer elke 20 dae – Closantel of Levamisol',
        'Lintwurm: Lintex / Albendazool elke 14 dae',
        'Bloedluis: Dipsing / Cypermethrin spuit',
        'Pasteurella (Styfsiekte): Tetrasyklin + Penicillin',
        'Enteortoksemie (Pulpnier): Entstof verpligtend – Covexin',
        'Skaaptepsiekte: Dipping + Doramectin',
        'Vrot-hoewe: Kopertjie koperoplossing voetbad',
      ]},
      {title:'🏥 Entstof Skedule – Beeste', items:[
        'Rooiwater (Anthrax): Jaarliks – Junie tot Augustus aanbeveel',
        'Lumpy Skin: Jaarliks – voor reënseisoen',
        'Mond-en-Klou-seer: Halfjaarliks – Junie & Desember',
        'Brucella: Eenmalig – verse 3–8 maande (slegs veearts)',
        'BVD (Bees Virus Diarree): Jaarliks',
        'Pasteurella: Halfjaarliks',
      ]},
      {title:'🏥 Entstof Skedule – Skape', items:[
        'Pulpnier / Styfsiekte (Covexin): Jaarliks – 4–6 weke voor lam',
        'Bloutong: Jaarliks – voor vektortyd (Oktober aanbeveel)',
        'Scrapie: Verplig in sekere streke – navraag by veearts',
        'Sheep pox: Sien provinsiaal vereiste',
      ]},
      {title:'⚠️ Noodtekens – Bel Veearts Dadelik', items:[
        'Dier lê en kan nie opstaan nie',
        'Hoog koors (bokant 40°C by beeste, 40.5°C by skape)',
        'Geswelde keel of nek',
        'Bloedige uitvloei sonder bekende oorsaak',
        'Krampagtige bewegings of verlies van bewussyn',
        'Skielike massa-sterfte in kudde of trop',
        'Enige aanmeldbare siekte vermoede (MKS, Miltvuur, ens.)',
      ]},
    ].map(section=>`
      <div class="card" style="margin-bottom:10px">
        <div style="font-weight:700;font-size:14px;margin-bottom:8px">${section.title}</div>
        <ul style="padding-left:16px;display:flex;flex-direction:column;gap:5px">
          ${section.items.map(i=>`<li style="font-size:13px;color:var(--text2)">${i}</li>`).join('')}
        </ul>
      </div>`).join('')}

    <div class="card" style="border-color:var(--orange);background:var(--odim);margin-bottom:10px">
      <div style="font-weight:700;color:var(--orange);margin-bottom:4px">⚠️ Vrywaring</div>
      <div style="font-size:13px;color:var(--text2)">Hierdie inligting is slegs as algemene riglyn bedoel. Raadpleeg altyd 'n geregistreerde veearts vir diagnose en behandeling. Dosisse en behandelings kan verskil na gelang van massa, ras, ouderdom en toestand.</div>
    </div>`;
}