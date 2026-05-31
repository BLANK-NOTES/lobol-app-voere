// ═══════════════════════════════════════════════════════════════
// DATA & STORAGE
// ═══════════════════════════════════════════════════════════════
const STORE = {
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))}
};

// ── DEFAULT PRODUCTS ────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {id:1,name:"Somer 6 (P6 Foslek) COX REËNBESTAND",category:"Fosfaatlekke (Somer)",price:322,pricePerTon:8049.66,unit:"50kg sak",description:"Bedoel vir piek somer waar weiding nog sag, blaarryk en lowergroen is. Inname: ± 130 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Piek Somer (Nov–Des)"},
  {id:2,name:"P12 Fosfaatlek (Somerfos 12)",category:"Fosfaatlekke (Somer)",price:585,pricePerTon:11700.30,unit:"50kg sak",description:"Fosfaat/proteïenlek vir somer. Stimuleer rumenflora. Inname: ± 170 g/kop/dag.",useCase:"Vervangingsverse – Groeifase Somer (Nov–Des)"},
  {id:3,name:"P12 Fosfaatlek (Somerlek 12) COX REËNBESTAND",category:"Fosfaatlekke (Somer)",price:606,pricePerTon:12120.45,unit:"50kg sak",description:"Reënbestande weergawe van Somerlek 12. Hoog bio-beskikbare fosfaat. Ondersteun vrugbaarheid + groei.",useCase:"Vervangingsverse – Groeifase Somer (Nov–Des)"},
  {id:4,name:"Somerfos 150 COX REËNBESTAND",category:"Fos/Prot-lekke (Herfs)",price:396,pricePerTon:7920.95,unit:"50kg sak",description:"15% proteïen. Vir groen weiding in pypstadium wanneer saad begin stoot. Inname: ± 200 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Jan–Feb"},
  {id:5,name:"NPN Fos",category:"Fos/Prot-lekke (Herfs)",price:378,pricePerTon:7560.96,unit:"50kg sak",description:"27% proteïen. Weiding in saad met herfskleur. Oorgangslek – bou kondisie voor winter. Inname: ± 220 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mrt–Apr"},
  {id:6,name:"Boost Lick SOMER (Crash Course)",category:"Lekke vir Bulle (Crash Course)",price:320,pricePerTon:6400.80,unit:"50kg sak",description:"20% proteïen. Hoë energie + vette + deurvloei proteïen. Ligte kalwers 130–180 kg. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers & Ossies – Groenveld/Somer"},
  {id:7,name:"HPK Crash Course Somer",category:"Lekke vir Bulle (Crash Course)",price:401,pricePerTon:8020.46,unit:"50kg sak",description:"Hoë prestasie weergawe. 20% proteïen. Piek somer blaarryke weiding. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers & Ossies – Groenveld/Somer (HPK)"},
  {id:8,name:"Crash Course (100–250 kg) BOOSTER",category:"Lekke vir Bulle (Crash Course)",price:368,pricePerTon:7360.07,unit:"50kg sak",description:"22% proteïen. Winter/hooi lek vir kalwers 130–200 kg. Energie + vette + vismeel proteïen. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers – Hooi/Winter | 100–250 kg"},
  {id:9,name:"HPK Crash Course (100–250 kg)",category:"Lekke vir Bulle (Crash Course)",price:456,pricePerTon:9119.80,unit:"50kg sak",description:"HPK weergawe. 22% proteïen. Hoë kwaliteit proteïen vir maksimum spiergroei.",useCase:"Spekulasie Kalwers – Hooi/Winter | 100–250 kg (HPK)"},
  {id:10,name:"Crash Course (250–500 kg) BOOSTER",category:"Lekke vir Bulle (Crash Course)",price:315,pricePerTon:6299.81,unit:"50kg sak",description:"22% proteïen. Swaarder kalwers 200 kg+. Hoë beskikbare proteïen + energie vir maksimum spiergroei. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Kalwers – Hooi/Winter | 250–500 kg"},
  {id:11,name:"HPK Crash Course (250–500 kg)",category:"Lekke vir Bulle (Crash Course)",price:422,pricePerTon:8439.07,unit:"50kg sak",description:"HPK weergawe vir swaarder kalwers 250–500 kg. Maksimum spiergroei.",useCase:"Spekulasie Kalwers – Hooi/Winter | 250–500 kg (HPK)"},
  {id:12,name:"SOS Lek – Speenverse SOETVELD (7 mnd oud)",category:"Lekke vir Verse",price:308,pricePerTon:6160.78,unit:"50kg sak",description:"Vir speenverse (7 maande oud) op soetveld. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Fase 1 speenperiode (Soetveld)"},
  {id:13,name:"Bovi SOS – Speenverse SUURVELD (7 mnd oud)",category:"Lekke vir Verse",price:324,pricePerTon:6480.86,unit:"50kg sak",description:"Suurveld weergawe van SOS Lek. Speenverse 7 maande oud. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Fase 1 speenperiode (Suurveld)"},
  {id:14,name:"SS Lek – Ouer Verse (13–18 mnd oud)",category:"Lekke vir Verse",price:332,pricePerTon:6640.40,unit:"50kg sak",description:"26% proteïen. Konstante groei sonder vetwording. Teiken: 330 kg @ 16 maande. Inname: ± 680 g/kop/dag.",useCase:"Vervangingsverse – Groeifase Hooi/Winter"},
  {id:15,name:"HPK SS Lek",category:"Lekke vir Verse",price:431,pricePerTon:8620.93,unit:"50kg sak",description:"HPK weergawe van SS Lek. 26% proteïen. Uierontwikkeling gestimuleer.",useCase:"Vervangingsverse – Groeifase (HPK)"},
  {id:16,name:"Energielek (Groenweiding) Beeste/Skape",category:"Lekke vir Beeste",price:284,pricePerTon:5680.46,unit:"50kg sak",description:"15% proteïen. Jong groen weiding. Diere 180 kg+ in piek somer. Let op: swak weiding = verhoogde inname. Inname: ± 550 g/100 kg LG.",useCase:"Spekulasie Ossies/Skape – Somer Groenweiding"},
  {id:17,name:"HPK Energielek",category:"Lekke vir Beeste",price:358,pricePerTon:7159.58,unit:"50kg sak",description:"HPK weergawe van Energielek vir beeste en skape op groen weiding.",useCase:"Spekulasie Ossies/Skape – Somer Groenweiding (HPK)"},
  {id:18,name:"4x4 Winter Onderhoudslek (Soetveld)",category:"Lekke vir Beeste",price:285,pricePerTon:5700.70,unit:"50kg sak",description:"38% proteïen. Winterweiding, hooi of droogte. Verseker maks bakteriese massa in rumen. Inname: ± 500 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Soetveld)"},
  {id:19,name:"HPK 4x4",category:"Lekke vir Beeste",price:396,pricePerTon:7919.87,unit:"50kg sak",description:"HPK weergawe van 4x4 Winter Onderhoudslek. 38% proteïen.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Soetveld HPK)"},
  {id:20,name:"BURGERS 430 WR – Winter Onderhoudslek (Suurveld)",category:"Lekke vir Beeste",price:307,pricePerTon:6139.16,unit:"50kg sak",description:"43% proteïen. Suurveld onderhoudslek vir winter/droogte/hooi. Inname: ± 500 g/kop/dag.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Suurveld)"},
  {id:21,name:"HPK 430 WR",category:"Lekke vir Beeste",price:438,pricePerTon:8759.39,unit:"50kg sak",description:"HPK weergawe van BURGERS 430 WR. 43% proteïen suurveld winterlek.",useCase:"Droë/Dragtige Beeste – Mei–Jul (Suurveld HPK)"},
  {id:22,name:"Beesprodlek Somer (25 RPM)",category:"Lekke vir Beeste",price:308,pricePerTon:6159.81,unit:"50kg sak",description:"20% proteïen. Optimale melkgehalte + energie. Bevorder herkonsepsie. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Somer"},
  {id:23,name:"Beesprodlek Winter (15 RPM)",category:"Lekke vir Beeste",price:287,pricePerTon:5740.48,unit:"50kg sak",description:"26% proteïen. Laat winter lek. Verbeter melkgehalte. Gebruik by matige koue of oesreste. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Laat Winter"},
  {id:24,name:"Beesprodlek Winter (50 RPM)",category:"Lekke vir Beeste",price:314,pricePerTon:6279.19,unit:"50kg sak",description:"26% proteïen. Beste aminosuur-profiel. Hoë vette vir melkkwaliteit. Gebruik tydens koue front. Inname: ± 1200 g/kop/dag.",useCase:"Lakterende Koeie – Middel/Laat Winter"},
  {id:25,name:"HPK 25 RPM (Somer)",category:"Lekke vir Beeste",price:425,pricePerTon:8500.56,unit:"50kg sak",description:"HPK weergawe van 25 RPM Somer Beesprodlek.",useCase:"Lakterende Koeie – Somer (HPK)"},
  {id:26,name:"HPK 15 RPM (Winter)",category:"Lekke vir Beeste",price:379,pricePerTon:7580.96,unit:"50kg sak",description:"HPK weergawe van 15 RPM Winter Beesprodlek.",useCase:"Lakterende Koeie – Laat Winter (HPK)"},
  {id:27,name:"HPK 50 RPM (Winter)",category:"Lekke vir Beeste",price:432,pricePerTon:8640.19,unit:"50kg sak",description:"HPK weergawe van 50 RPM Winter Beesprodlek. Koue front & middel winter.",useCase:"Lakterende Koeie – Middel/Laat Winter (HPK)"},
  // ── SKAAP PRODUKTE ────────────────────────────────────────────
  {id:28,name:"Groenveld Somerproduksielek 23%",category:"Lekke vir Skape",price:298,pricePerTon:5960,unit:"50kg sak",description:"23% proteïen. Geformuleer vir hoë % netto energie. Natuurlike proteïen = 59% – verseker spiergroei en hoë wolopbrengs op groenweiding. Dien as prikkelvoeding tydens dekseisoen. Inname: ± 230–280 g/kop/dag (produksie); ± 300 g/kop/dag (ooi 30 dae voor lam); ± 350 g/kop/dag (ooi met lam).",useCase:"Intensiewe Skaapboerdery – Somer | Ooi 30 dae voor lam & Ooi met lam | Wolskape | Vervangingsooie"},
  {id:29,name:"Super ME Winterproduksielek 26%",category:"Lekke vir Skape",price:312,pricePerTon:6240,unit:"50kg sak",description:"26% proteïen. Natuurlike proteïen = 47%. Rumen-beskermde vette verseker uitstekende melkvloei en vrugbaarheid. Verseker melkproduksie piek tussen week 3–4 sonder om wolproduksie te benadeel. Dien as prikkelvoeding. Inname: ± 370 g/kop/dag (voor lam); ± 420 g/kop/dag (met lam); ± 280–380 g/kop/dag (algemeen).",useCase:"Intensiewe Skaapboerdery – Winter | Ooi voor & met lam | Wolskape"},
  {id:30,name:"LOBOL 2:1:1 Winteronderhoudslek 28%",category:"Lekke vir Skape",price:265,pricePerTon:5300,unit:"50kg sak",description:"28% proteïen. 33% van totale proteïen is natuurlike proteïen met hoë deurvloei waarde. Bevat deurvloei proteïen met swaeldraende aminosure, vette, energie, swael en koper. Geformuleer vir droë veld gedurende eerste 4 maande van dragtigheid. Inname: ± 100–150 g/kop/dag.",useCase:"Ekstensiewe Skaapboerdery – Winter | Eerste 4 maande dragtigheid | Wolskape onderhoud"},
  {id:31,name:"Somer 6 Fosfaatlek 6% Fos (Skape)",category:"Lekke vir Skape",price:195,pricePerTon:3900,unit:"50kg sak",description:"6% Fosfaat / Minerale Supplement. Noodsaaklik vir vitamien- en mineraalaanvulling op groenweiding. Tydperk: Eerste 4 maande van dragtigheid. Inname: ± 25 g/kop/dag.",useCase:"Ekstensiewe Skaapboerdery – Somer | Eerste 4 maande dragtigheid"},
  {id:32,name:"Lamkruip 17%",category:"Lekke vir Skape",price:345,pricePerTon:6900,unit:"25kg sak",description:"17% proteïen. Spesialisvoer vir lammers dag 15–60. Op dag 15 word lamkruip vir ooi en lam gevoer – ooi leer lam om te vreet. Sodra lam vreet, gee net lam toegang. Vergemaklik oorgang van melkfase na vaste voeding. Vrywillige inname: ± 1.3% van lam se lewende gewig.",useCase:"Intensiewe Skaapboerdery – Lam Dag 15–60 (Somer & Winter)"},
  {id:33,name:"GF Lammervolvoer 16%",category:"Lekke vir Skape",price:358,pricePerTon:7160,unit:"50kg sak",description:"16% proteïen. Spesialisvoer vir lammers dag 60–110. Bevat sintetiese aminosure en ingevoerde vette spesifiek vir enkelmaagdiere. Lammers behoort ± 43 kg te weeg teen dag 60. Vrywillige inname: 2.8% van lewende gewig (by moeder); 4.3% (gespeen). NB: Spuit lammers teen koksidiose en doseer teen melkwurm elke 20 dae.",useCase:"Intensiewe Skaapboerdery – Lam Dag 60–110 (Somer & Winter)"},
  {id:34,name:"Skaapvolvoer",category:"Lekke vir Skape",price:285,pricePerTon:5700,unit:"50kg sak",description:"Volvoer vir ramme tussen dekkings (periode 6 weke of minder). Voeding: Winter: 2.5% van lewende gewig/dag; Somer: 2.0% van lewende gewig/dag.",useCase:"Ekstensiewe Skaapboerdery – Ram voorbereiding (kort periode voor dekking)"},
  {id:35,name:"Ramvolvoer",category:"Lekke vir Skape",price:295,pricePerTon:5900,unit:"50kg sak",description:"Volvoer vir ramme wat vir eerste keer gebruik word of langer voorbereidingsperiode het. Groei ramme uit tot met dekking. Voeding: Winter: 2.0% van lewende gewig/dag; Somer: 1.5% van lewende gewig/dag. NB: Ramme moet gereeld geoefen word. Moenie ramme onnodige hanteer binne 30 dae voor dekking nie.",useCase:"Ekstensiewe Skaapboerdery – Ram voorbereiding (langer periode voor dekking)"},
];

const DEFAULT_DUTIES = [
  {id:1,title:"Vloer skoonmaak",category:"Skoonmaak",priority:"medium",notes:"Vee en was alle areas wanneer nie besig nie"},
  {id:2,title:"Tel & verifieer voorraad",category:"Voorraad",priority:"high",notes:"Volledige fisiese telling, dateer stelsel op"},
  {id:3,title:"Kontroleer verouderde voorraad",category:"Voorraad",priority:"high",notes:"Trek enige verouderde sakke, kwarantyn area"},
  {id:4,title:"Kontroleer lae voorraadartikels",category:"Voorraad",priority:"high",notes:"Merk enigiets onder minimum vlakke"},
  {id:5,title:"Masjinerie skoonmaak",category:"Skoonmaak",priority:"medium",notes:"Reinig alle meng- en verpakkingstoerusting"},
  {id:6,title:"Organiseer pakhuisrakke",category:"Skoonmaak",priority:"low",notes:"Stapel sakke netjies, eerste in eerste uit"},
  {id:7,title:"Kontroleer vragmotor bande & olie",category:"Instandhouding",priority:"medium",notes:"Voor elke rit – kyk bande, olie, water"},
  {id:8,title:"Vervaldatum kontrole op alle sakke",category:"Voorraad",priority:"high",notes:"Merk enige sakke nader as 30 dae aan verval"},
  {id:9,title:"Veiligheidsrondgang doen",category:"Veiligheid",priority:"medium",notes:"Kontroleer brandblussers, eerste hulp kis, nooduitgange"},
  {id:10,title:"Klante oproepe / opvolg",category:"Admin",priority:"medium",notes:"Skakel klante wat bestellings geplaas het maar nie afgehaal het nie"},
];
const DEFAULT_REMINDERS = [
  {id:1,title:"Bedek vragmotors met seildoek",time:"18:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],notes:"Alle vragmotors moet bedek wees voor donker",active:true},
  {id:2,title:"Oggend vragmotor inspeksie",time:"06:30",days:["Mon","Tue","Wed","Thu","Fri","Sat"],notes:"Verwyder seildoeke, kontroleer vragmotor toestande voor laai",active:true},
  {id:3,title:"Weeklikse voorraadverslag",time:"17:00",days:["Fri"],notes:"Weeklikse voorraad rekonsiliasie",active:true},
  {id:4,title:"Middagete breek – werknemers",time:"13:00",days:["Mon","Tue","Wed","Thu","Fri"],notes:"Verseker alle werknemers neem middagete",active:true},
  {id:5,title:"Sluit fabriek",time:"17:30",days:["Mon","Tue","Wed","Thu","Fri","Sat"],notes:"Kontroleer alle deure, hekke, beligting voor jy sluit",active:true},
];
const DEFAULT_CUSTOMERS = [
  {id:1,name:"Jan Botha",farm:"Botha se Plaas",phone:"082 111 2233",area:"Ermelo",type:"Beeste",notes:"Gereelde klant – verkies 50 RPM en SS Lek",eieGeel:false},
  {id:2,name:"Piet van der Merwe",farm:"Van der Merwe Plaas",phone:"083 444 5566",area:"Carolina",type:"Beeste & Skape",notes:"Groot spekulasie operasie",eieGeel:true},
  {id:3,name:"Maria Nkosi",farm:"Nkosi Boerdery",phone:"076 789 0011",area:"Badplaas",type:"Pluimvee",notes:"Bestel maandeliks",eieGeel:false},
];
const DEFAULT_WORKERS = [
  {id:1,name:"Sipho Dlamini",role:"Pakhuiswerker",phone:"071 123 4567",active:true,notes:""},
  {id:2,name:"Thabo Nkosi",role:"Pakhuiswerker",phone:"082 234 5678",active:true,notes:""},
  {id:3,name:"Maria Mokoena",role:"Vloer Toesighouer",phone:"073 345 6789",active:true,notes:""},
];

const DEFAULT_DRIVERS = [
  {id:1,name:"Hendrick",phone:"",licenseCode:"EC",notes:"",active:true},
  {id:2,name:"William",phone:"",licenseCode:"EC",notes:"",active:true},
  {id:3,name:"2boy",phone:"",licenseCode:"C",notes:"",active:true},
];

// Fleet: registered trucks with capacity settings
const DEFAULT_FLEET = [
  {id:1,name:"Vragmotor 1",emoji:"🚛",truckCapacity:600,hasTrailer:false,trailerCapacity:0,notes:""},
  {id:2,name:"Vragmotor 2",emoji:"🚛",truckCapacity:400,hasTrailer:true,trailerCapacity:200,notes:""},
];

// ── STATE ───────────────────────────────────────────────────────
let products = STORE.get('v3_products', DEFAULT_PRODUCTS);
let duties = STORE.get('v3_duties', DEFAULT_DUTIES);
let reminders = STORE.get('v3_reminders', DEFAULT_REMINDERS);
let factoryStock = STORE.get('v3_stock', []);
let truckCounts = STORE.get('v3_trucks', []);
let customers = STORE.get('v3_customers', DEFAULT_CUSTOMERS);
let sales = STORE.get('v3_sales', []);
let deliveries = STORE.get('v3_deliveries', []);
let notes = STORE.get('v3_notes', [{id:1,type:'Algemeen',title:'Welkom by LOBOL!',body:'Gebruik hierdie blad vir vinnige notas en herinneringe.',pinned:true,color:'green',createdAt:new Date().toLocaleDateString('af-ZA')}]);
let workers = STORE.get('v3_workers', DEFAULT_WORKERS);
let drivers = STORE.get('v3_drivers', DEFAULT_DRIVERS);
let fleet = STORE.get('v3_fleet', DEFAULT_FLEET);
let priceHistory = STORE.get('v3_priceHistory', []);
let eieGeelActive = STORE.get('v3_eieGeel', false);
let assignments = STORE.get('v3_assignments', {});
let workerGroups = STORE.get('v3_workerGroups', []);
let truckHistory = STORE.get('v3_truckHistory', []);
let healthRecords = STORE.get('v3_health', []);
let studyNotes = STORE.get('v3_studyNotes', []);
let dutyDone = STORE.get('v3_dutyDone', []);
let dutyDoneDate = STORE.get('v3_dutyDoneDate', '');
let calcItems = [];
let currentTruckId = null;
let newSaleItems = [];
let newCustEieGeel = false;
let notePinned = false;
let noteColor = 'default';
let newDelivStops = [];
let cmpSelected = [];
let prodCatFilter = 'Alle';
let stockFilter = 'Alle';
let dutyFilter = 'Alle';
let delivFilter = 'Alle';
let noteTypeFilter = 'Alle';
let expandedItems = {};

// Reset duty done list daily
function checkDutyReset(){
  const today = new Date().toDateString();
  if(dutyDoneDate !== today){ dutyDone=[]; dutyDoneDate=today; save('v3_dutyDone',dutyDone); save('v3_dutyDoneDate',dutyDoneDate); }
}

function save(k,v){ STORE.set(k,v); }
function saveAll(){
  save('v3_products',products); save('v3_duties',duties); save('v3_reminders',reminders);
  save('v3_stock',factoryStock); save('v3_trucks',truckCounts); save('v3_customers',customers);
  save('v3_sales',sales); save('v3_deliveries',deliveries); save('v3_notes',notes);
  save('v3_workers',workers); save('v3_priceHistory',priceHistory); save('v3_eieGeel',eieGeelActive);
  save('v3_assignments',assignments); save('v3_dutyDone',dutyDone);
  save('v3_drivers',drivers); save('v3_fleet',fleet);
}

function getDiscounted(p, force){
  const on = force!==undefined ? force : eieGeelActive;
  return on ? Math.max(0, p.price - 48) : p.price;
}

function escH(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function uid(){ return Date.now() + Math.floor(Math.random()*1000); }

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════
const PAGES = [
  {id:'dashboard',label:'Dashboard',icon:'🏠'},
  {id:'products',label:'Produkte',icon:'📦'},
  {id:'truck',label:'Vragmotor Tel',icon:'🚛'},
  {id:'compare',label:'Vergelyking',icon:'📊'},
  {id:'stock',label:'Fabrieksvoorraad',icon:'🏭'},
  {id:'duties',label:'Pligte',icon:'📋'},
  {id:'reminders',label:'Herinneringe',icon:'🔔'},
  {id:'customers',label:'Klante',icon:'👥'},
  {id:'sales',label:'Verkope',icon:'🛒'},
  {id:'deliveries',label:'Aflewerings',icon:'🗺️'},
  {id:'notes',label:'Notas',icon:'📝'},
  {id:'workers',label:'Werknemers',icon:'👷'},
  {id:'calc',label:'Berekenaar',icon:'🧮'},
  {id:'beesbestuur',label:'Beesbestuur Gids',icon:'📖'},
  {id:'export',label:'Uitvoer & Rugsteun',icon:'💾'},
  {id:'inligting',label:'Inligting & Gidse',icon:'📚'},
];
const PRIMARY = PAGES.slice(0,5);
let currentPage = 'dashboard';

function buildNav(){
  // Sidebar
  document.getElementById('sidebar-links').innerHTML = PAGES.map(p=>`
    <div class="nav-link${p.id===currentPage?' active':''}" onclick="navTo('${p.id}')">
      <span>${p.icon}</span><span>${p.label}</span>
    </div>`).join('');
  // Mobile bottom
  document.getElementById('mob-nav-inner').innerHTML = PRIMARY.map(p=>`
    <button class="mob-nav-item${p.id===currentPage?' active':''}" onclick="navTo('${p.id}')">
      <span style="font-size:20px">${p.icon}</span>${p.label}
    </button>`).join('') +
    `<button class="mob-nav-item" onclick="openMobileMenu()"><span style="font-size:20px">☰</span>Meer</button>`;
  // Mobile menu grid
  document.getElementById('mob-menu-grid').innerHTML = PAGES.map(p=>`
    <button class="mob-grid-item${p.id===currentPage?' active':''}" onclick="navTo('${p.id}');closeMobileMenu()">
      <div class="mob-grid-icon">${p.icon}</div><span>${p.label}</span>
    </button>`).join('');
}

function navTo(id){
  currentPage=id;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+id);
  if(pg) pg.classList.add('active');
  buildNav();
  renderPage(id);
  window.scrollTo(0,0);
}

function renderPage(id){
  if(id==='dashboard') renderDashboard();
  else if(id==='products') renderProducts();
  else if(id==='truck') renderTrucks();
  else if(id==='compare') renderCompare();
  else if(id==='stock') renderStock();
  else if(id==='duties') renderDuties();
  else if(id==='reminders') renderReminders();
  else if(id==='customers') renderCustomers();
  else if(id==='sales') renderSales();
  else if(id==='deliveries') renderDeliveries();
  else if(id==='notes') renderNotes();
  else if(id==='workers') renderWorkers();
  else if(id==='calc') renderCalc();
  else if(id==='beesbestuur') renderCattleGuides();
  else if(id==='export') renderExport();
  else if(id==='inligting') renderInligting();
}

function openMobileMenu(){ document.getElementById('mobile-menu').classList.add('open'); }
function closeMobileMenu(){ document.getElementById('mobile-menu').classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════════
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════
function toggleTheme(){
  const t = document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',t);
  STORE.set('v3_theme',t);
}
function initTheme(){
  const t=STORE.get('v3_theme','dark');
  document.documentElement.setAttribute('data-theme',t);
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════
function wmoInfo(c){
  if(c===0) return{label:'Sonnig',e:'☀️'};
  if(c<=3) return{label:'Bewolk',e:'⛅'};
  if(c<=48) return{label:'Mis',e:'🌫️'};
  if(c<=67) return{label:'Reën',e:'🌧️'};
  if(c<=77) return{label:'Sneeu',e:'❄️'};
  if(c<=82) return{label:'Buie',e:'🌦️'};
  return{label:'Storms',e:'⛈️'};
}

function wmoInfo(c){
  if(c===0) return{label:'Helder Sonnig',e:'☀️'};
  if(c===1) return{label:'Hoofsaaklik Sonnig',e:'🌤️'};
  if(c===2) return{label:'Gedeeltelik Bewolk',e:'⛅'};
  if(c===3) return{label:'Bewolkte Lug',e:'☁️'};
  if(c<=48) return{label:'Mis / Newel',e:'🌫️'};
  if(c<=55) return{label:'Motregen',e:'🌦️'};
  if(c<=65) return{label:'Reën',e:'🌧️'};
  if(c<=67) return{label:'Yserige Reën',e:'🌨️'};
  if(c<=77) return{label:'Sneeu',e:'❄️'};
  if(c<=82) return{label:'Buie',e:'🌦️'};
  if(c<=86) return{label:'Sneeubuie',e:'🌨️'};
  if(c===95) return{label:'Donderstorm',e:'⛈️'};
  return{label:'Swaar Storms',e:'🌩️'};
}

function windDir(deg){
  const dirs=['N','NO','O','SO','S','SW','W','NW'];
  return dirs[Math.round(deg/45)%8];
}

function uvLevel(uv){
  if(uv<=2) return{l:'Laag',c:'var(--accent)'};
  if(uv<=5) return{l:'Matig',c:'var(--orange)'};
  if(uv<=7) return{l:'Hoog',c:'var(--orange)'};
  if(uv<=10) return{l:'Baie Hoog',c:'var(--red)'};
  return{l:'Uiterste',c:'var(--red)'};
}

// Farming-specific weather alerts based on conditions
function getFarmAlerts(cur, daily){
  const alerts=[];
  const minTemp = daily ? daily.temperature_2m_min[0] : null;
  const maxTemp = daily ? daily.temperature_2m_max[0] : null;
  const rain = daily ? daily.precipitation_sum[0] : 0;
  const wind = cur.wind_speed_10m;

  if(minTemp !== null && minTemp <= 4)
    alerts.push({type:'frost',icon:'🧊',msg:`Ryp risiko vannag (min ${Math.round(minTemp)}°C) – beskerm lammers & jong diere`});
  if(maxTemp !== null && maxTemp >= 36)
    alerts.push({type:'heat',icon:'🌡️',msg:`Hittestres risiko (${Math.round(maxTemp)}°C) – verseker genoeg water en skaduwee`});
  if(rain > 15)
    alerts.push({type:'rain',icon:'🌧️',msg:`Swaar reën verwag (${rain.toFixed(0)}mm) – bedek vragmotors met seildoek`});
  else if(rain > 2)
    alerts.push({type:'rain',icon:'💧',msg:`Lig reën (${rain.toFixed(1)}mm) – goeie vir weiding`});
  if(wind >= 50)
    alerts.push({type:'wind',icon:'💨',msg:`Sterk wind (${Math.round(wind)} km/h) – verseker sakke is vas gestapel`});
  if(alerts.length === 0)
    alerts.push({type:'good',icon:'✅',msg:'Goeie toestande vir veldwerk en vragmotorroetes'});
  return alerts;
}

let weatherCache = null;
let weatherCacheTime = 0;
let weatherLat = -26.5;
let weatherLon = 29.98;
let weatherLocName = 'Ermelo omgewing';

function detectLocation(){
  if(!navigator.geolocation){ alert('Ligging nie beskikbaar op hierdie toestel nie'); return; }
  const el=document.getElementById('weather-widget');
  if(el) el.innerHTML='<div class="weather-loading">📍 Opspoor jou ligging...</div>';
  navigator.geolocation.getCurrentPosition(
    pos => {
      weatherLat = pos.coords.latitude;
      weatherLon = pos.coords.longitude;
      // Reverse geocode using Open-Meteo does not provide names, so we use a free API
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${weatherLat}&lon=${weatherLon}&format=json`)
        .then(r=>r.json())
        .then(d=>{
          weatherLocName = d.address?.town || d.address?.city || d.address?.village || d.address?.county || 'Jou ligging';
          weatherCache=null; // invalidate cache
          loadWeather();
        })
        .catch(()=>{ weatherLocName='Jou ligging'; weatherCache=null; loadWeather(); });
    },
    err => { el.innerHTML='<div class="weather-loading">⚠️ Ligging nie beskikbaar nie</div>'; }
  );
}

async function loadWeather(){
  const el=document.getElementById('weather-widget');
  if(!el) return;

  // Cache for 15 minutes
  const now=Date.now();
  if(weatherCache && (now-weatherCacheTime)<15*60*1000){
    renderWeather(weatherCache);
    return;
  }

  el.innerHTML='<div class="weather-loading">🌤️ Laai weer...</div>';
  try{
    const url=`https://api.open-meteo.com/v1/forecast?` +
      `latitude=${weatherLat}&longitude=${weatherLon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,surface_pressure,uv_index` +
      `&hourly=temperature_2m,weather_code,precipitation_probability,wind_speed_10m` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,sunrise,sunset,uv_index_max,wind_speed_10m_max,precipitation_probability_max` +
      `&timezone=Africa%2FJohannesburg&forecast_days=7`;
    const r=await fetch(url);
    const d=await r.json();
    weatherCache=d;
    weatherCacheTime=now;
    renderWeather(d);
  }catch(err){
    el.innerHTML='<div class="weather-card"><div class="weather-loading">⚠️ Weer nie beskikbaar nie – kontroleer internet verbinding</div></div>';
  }
}

function renderWeather(d){
  const el=document.getElementById('weather-widget');
  if(!el) return;
  const cur=d.current;
  const dd=d.daily;
  const hh=d.hourly;
  const DAYS=['Sondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrydag','Saterdag'];

  const {label,e}=wmoInfo(cur.weather_code);
  const uv=uvLevel(cur.uv_index||0);
  const alerts=getFarmAlerts(cur, dd);

  // Sunrise / sunset format
  const fmtTime=t=>{ if(!t) return '--'; const d=new Date(t); return d.toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'}); };

  // 7-day forecast
  const fc7=[0,1,2,3,4,5,6].map(i=>{
    if(!dd||!dd.time[i]) return '';
    const dt=new Date(dd.time[i]);
    const {e:de}=wmoInfo(dd.weather_code[i]);
    const rain=dd.precipitation_sum[i];
    const prob=dd.precipitation_probability_max?dd.precipitation_probability_max[i]:0;
    const uvm=dd.uv_index_max?dd.uv_index_max[i]:0;
    const {l:uvl,c:uvc}=uvLevel(uvm);
    return `<div class="wday${i===0?' wday-today':''}">
      <div class="wday-name">${i===0?'Van-dag':DAYS[dt.getDay()].slice(0,3)}</div>
      <div class="wday-emoji">${de}</div>
      <div class="wday-range"><span class="wmax">${Math.round(dd.temperature_2m_max[i])}°</span><span class="wmin">${Math.round(dd.temperature_2m_min[i])}°</span></div>
      ${rain>0.1?`<div class="wday-rain">💧${rain.toFixed(0)}mm ${prob>0?prob+'%':''}</div>`:''}
      <div class="wday-uv" style="color:${uvc}">UV:${Math.round(uvm)}</div>
    </div>`;
  }).join('');

  // Hourly forecast (next 12 hours)
  const nowHour=new Date().getHours();
  let hourlyHTML='';
  if(hh&&hh.time){
    let count=0;
    for(let i=0;i<hh.time.length&&count<12;i++){
      const t=new Date(hh.time[i]);
      if(t<new Date()) continue;
      const {e:he}=wmoInfo(hh.weather_code[i]);
      const prob=hh.precipitation_probability?hh.precipitation_probability[i]:0;
      const isNow=t.getHours()===nowHour;
      hourlyHTML+=`<div class="whour${isNow?' now':''}">
        <div class="whour-time">${t.getHours()}:00</div>
        <div class="whour-emoji">${he}</div>
        <div class="whour-temp">${Math.round(hh.temperature_2m[i])}°</div>
        ${prob>20?`<div class="whour-rain">${prob}%</div>`:''}
      </div>`;
      count++;
    }
  }

  // Alerts HTML
  const alertsHTML=alerts.map(a=>`<div class="walert ${a.type}">${a.icon} ${a.msg}</div>`).join('');

  el.innerHTML=`<div class="weather-card">
    <div class="weather-header">
      <div>
        <div class="weather-loc-row">📍 ${weatherLocName} <button class="weather-loc-btn" onclick="detectLocation()">📡 GPS</button></div>
        <div class="weather-temp-main">${Math.round(cur.temperature_2m)}°</div>
        <div class="weather-feels">Voel soos ${Math.round(cur.apparent_temperature||cur.temperature_2m)}°C</div>
        <div class="weather-cond">${label}</div>
      </div>
      <div class="weather-emoji-big">${e}</div>
    </div>
    <div class="weather-stats-row">
      <div class="wstat"><span class="wstat-val">💧 ${cur.relative_humidity_2m}%</span><span class="wstat-lbl">Humiditeit</span></div>
      <div class="wstat"><span class="wstat-val">💨 ${Math.round(cur.wind_speed_10m)} km/h</span><span class="wstat-lbl">Wind ${windDir(cur.wind_direction_10m||0)}</span></div>
      <div class="wstat"><span class="wstat-val" style="color:${uv.c}">☀️ UV ${Math.round(cur.uv_index||0)}</span><span class="wstat-lbl">${uv.l}</span></div>
      <div class="wstat"><span class="wstat-val">🌡️ ${Math.round(cur.surface_pressure||1013)} hPa</span><span class="wstat-lbl">Lugdruk</span></div>
    </div>
    ${hourlyHTML?`<div class="weather-hourly">${hourlyHTML}</div>`:''}
    <div class="weather-fc">${fc7}</div>
    ${alertsHTML?`<div class="weather-alerts">${alertsHTML}</div>`:''}
    <div class="weather-footer">
      <div class="weather-sun">🌅 ${fmtTime(dd?.sunrise?.[0])} &nbsp; 🌇 ${fmtTime(dd?.sunset?.[0])}</div>
      <div class="weather-updated">Opgedateer ${new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'})}</div>
    </div>
  </div>`;
}

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

// ═══════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════
const PROD_CATS=['Alle','Fosfaatlekke (Somer)','Fos/Prot-lekke (Herfs)','Lekke vir Bulle (Crash Course)','Lekke vir Verse','Lekke vir Beeste','Lekke vir Skape'];
const GUIDE_DATA=[
  {id:'spekulasie',title:'Spekulasie Kalwers & Ossies',icon:'🐂',sections:[
    {heading:'GROENVELD / SOMER',items:[
      {product:'Crash Course Somer – 20% proteïen',details:['Hoë vlakke energie + vette','Deurvloei proteïen','Piek somer: blaarryke weiding (geen saad/stingels)','Ligte kalwers: 130–180 kg','Inname: ± 550 g / 100 kg lewende gewig']},
      {product:'LOBOL Energielek – 15% proteïen',details:['Hoë netto energie + vette','Jong groen weiding','Diere: 180 kg+ piek somer','⚠️ Weiding swak → inname verhoog drasties','Inname: ± 550 g / 100 kg lewende gewig']},
    ],note:'Beide groenveldlekke geformuleer vir maksimum groei in kort periodes.'},
    {heading:'HOOI / WINTER',items:[
      {product:'Crash Course 100–250 kg – 22% proteïen',details:['Energie + vette + vismeel proteïen','Saam met hooi of spaarweiding','Diere: 130–200 kg','Inname: ± 550 g / 100 kg lewende gewig']},
      {product:'Crash Course 250–500 kg – 22% proteïen',details:['Hoë beskikbare proteïen + energie','Maksimum spiergroei','Diere: 200 kg+','Inname: ± 550 g / 100 kg lewende gewig']},
    ],note:'"Crash Course" = produksielek soortgelyk aan kragvoer. Minder koste en laer inname as kragvoer.'},
  ]},
  {id:'verse',title:'Uitgroei van Vervangingsverse',icon:'🐄',sections:[
    {heading:'FASE 1: Koei met Kalf (Somer)',subheading:'Jan–Mrt',items:[{product:'25 RPM Somerproduksielek – 20% proteïen',details:['Verbeter melkproduksie drasties','Versies begin vinniger groei wanneer saam lek vreet','Inname: ± 850–1100 g/kop/dag']}]},
    {heading:'FASE 1: Koei met Kalf (Winter)',subheading:'Apr–Okt',items:[{product:'50 RPM Winterproduksielek – 26% proteïen',details:['Verbeter melk: proteïen + vet verhoog','Vinniger versontwikkeling','Vroeër dekking moontlik','Inname: ± 1000–1400 g/kop/dag','Kalwers begin lek vreet: ± 2.5 maande']}]},
    {heading:'FASE 2: Groeifase (Somer)',subheading:'Nov–Des',items:[{product:'Somerfos / P12 Fosfaatlek – 15% proteïen',details:['Stimuleer rumenflora vir groei','Hoog bio-beskikbare fosfaat','Ondersteun vrugbaarheid + groei','Inname: ± 170 g/kop/dag']}]},
    {heading:'FASE 2: Groeifase (Winter)',subheading:'Jan–Okt',items:[{product:'SS Lek – 26% proteïen',details:['Konstante groei sonder vetwording','Werk deur herfs en winter','Teiken: 330 kg @ 16 maande','Inname: ± 680 g/kop/dag','✅ Uierontwikkeling gestimuleer']}]},
  ]},
  {id:'lakterende',title:'Lakterende Koeie',icon:'🍼',sections:[
    {heading:'GROENVELD / SOMER',items:[{product:'25 RPM Somerproduksielek – 20% proteïen',details:['Optimale melkgehalte + energie','Swaarder speenkalwers','Verbeter kondisiepunt','Bevorder herkonsepsie (ovulasie + embrio oorlewing)','Inname: ± 1200 g/kop/dag']}]},
    {heading:'HOOI / WINTER',items:[
      {product:'15 RPM Winterproduksielek – 26% proteïen',details:['Verbeter melkgehalte en speengewigte','Gebruik by matige koue of oesreste','Inname: ± 1200 g/kop/dag']},
      {product:'50 RPM Winterproduksielek – 26% proteïen',details:['Beste aminosuur-profiel proteïenbron','Beter spiergroei + melkkwaliteit','Verbeter kalfinterval','Gebruik tydens koue front / middel-laat winter','Inname: ± 1200 g/kop/dag']},
    ]},
  ]},

  // ── SKAAP GIDSE ────────────────────────────────────────────
  {id:'skaap_intensief',title:'Intensiewe Skaapboerdery (Vleis)',icon:'🐑',sections:[
    {heading:'GROENVELD / SOMER – Ooi 30 Dae Voor Lam',subheading:'Dag 119–147: 60% van fetus se ontwikkeling',items:[{product:'Groenveld Somerproduksielek 23%',details:['60% van fetale ontwikkeling vind plaas in laaste 28 dae','Meerlinge ontwikkel lewenskragtig met korrekte voeding','Inname: ± 300 g/kop/dag']}]},
    {heading:'GROENVELD / SOMER – Ooi met Lam',subheading:'75% van melk geproduseer in eerste 8 weke',items:[{product:'Groenveld Somerproduksielek 23%',details:['Ooi se melk het vetinhoud van tot 8%','Lek verseker dat melkpotensiaal bereik word','Inname: ± 350 g/kop/dag']}]},
    {heading:'HOOI / WINTER – Ooi 30 Dae Voor Lam',subheading:'Aminosuur-profiel stimuleer fetale groei',items:[{product:'Super ME Winterproduksielek 26%',details:['Aminosuur-profiel stimuleer fetale groei by laat dragtige diere','Inname: ± 370 g/kop/dag']}]},
    {heading:'HOOI / WINTER – Ooi met Lam',subheading:'Melkproduksie piek week 3–4',items:[{product:'Super ME Winterproduksielek 26%',details:['Melkproduksie piek tussen week 3–4','Benadeel wolproduksie nie','Inname: ± 420 g/kop/dag']}]},
    {heading:'SPESIALISVOER – Lam Dag 15–60 (Somer & Winter)',items:[{product:'Lamkruip 17%',details:['Op dag 15: voer vir ooi én lam saam – ooi leer lam om te vreet','Sodra lam vreet: gee net lam toegang','Vergemaklik oorgang van melk na vaste voeding','Vrywillige inname: ± 1.3% van lam se lewende gewig']}]},
    {heading:'SPESIALISVOER – Lam Dag 60–110 (Somer & Winter)',items:[{product:'GF Lammervolvoer 16%',details:['Lammers behoort ± 43 kg te weeg teen dag 60','Bevat sintetiese aminosure + ingevoerde vette – spesifiek vir enkelmaagdiere','Inname by moeder: 2.8% van lewende gewig','Inname gespeen: 4.3% van lewende gewig','⚠️ Spuit lammers teen koksidiose & doseer teen melkwurm elke 20 dae','Voorsien ad-lib goeie kwaliteit teffhooi by alle stadiums']}]},
  ]},
  {id:'skaap_ekstensief',title:'Ekstensiewe Skaapboerdery',icon:'🌾',sections:[
    {heading:'RAM VOORBEREIDING – Kort Periode (≤6 weke voor dekking)',items:[{product:'Skaapvolvoer',details:['Voer waar periode van 6 weke of minder beskikbaar is voor dekking','Winter: 2.5% van lewende gewig/dag','Somer: 2.0% van lewende gewig/dag','⚠️ Ramme moet gereeld geoefen word – vrugbaarheid en skrotum omtrek is kritiek']}]},
    {heading:'RAM VOORBEREIDING – Langer Periode / Jong Ramme',items:[{product:'Ramvolvoer',details:['Vir jonger ramme wat vir eerste keer gebruik word','Groei ramme uit tot met dekking','Winter: 2.0% van lewende gewig/dag','Somer: 1.5% van lewende gewig/dag','⚠️ Moenie ramme onnodige hanteer (dip, skeer, inent) binne 30 dae voor dekking nie']}]},
    {heading:'SOMER – Eerste 4 Maande Dragtigheid',items:[{product:'Somer 6 Fosfaatlek 6%',details:['Fosfaat + Minerale supplement','Noodsaaklik vir vitamien- en mineraalaanvulling op groenweiding','Tydperk: Eerste 4 maande van dragtigheid','Inname: ± 25 g/kop/dag']}]},
    {heading:'SOMER – Produksie & Prikkelvoeding',items:[{product:'Groenveld Somerproduksielek 23%',details:['Proteïen/Energie/Minerale supplement','Langketting drasties verbeter','Natuurlike proteïen = 59% – verseker spiergroei en hoë wolopbrengs','Tydperk: 1 maand voor lam tot 2 weke na speen','Dien as prikkelvoeding tydens dekseisoen','Reg keuse vir uitgroei van vervangings ooities','Inname: ± 230–280 g/kop/dag']}]},
    {heading:'WINTER – Eerste 4 Maande Dragtigheid',items:[{product:'LOBOL 2:1:1 Winteronderhoudslek 28%',details:['Proteïen/Minerale supplement','33% van proteïen is natuurlike deurvloei proteïen','Geformuleer vir droë veld gedurende eerste 4 maande dragtigheid','Inname: ± 100–150 g/kop/dag']}]},
    {heading:'WINTER – Produksie & Prikkelvoeding',items:[{product:'Super ME Winterproduksielek 26%',details:['Proteïen/Energie/Minerale supplement','Natuurlike proteïen = 47% + rumen-beskermde vette','Uitstekende melkvloei en vrugbaarheid','Tydperk: 1 maand voor lam tot 2 weke na speen','Dien as prikkelvoeding','Inname: ± 280–380 g/kop/dag']}]},
  ],note:'Produkprys het verbasend minder invloed op wins as wat die boer mag dink. Meet winsgewendheid teen tyd, ouderdom, inname en prestasie.'},
  {id:'skaap_wol',title:'Wolskape & Vervangingsooie',icon:'🧶',sections:[
    {heading:'WOLPRODUKSIE – Sleutel Beginsels',items:[{product:'Groenveld Somerproduksielek 23% (Somer) / Super ME 26% (Winter)',details:['Energie en proteïen is primêr verantwoordelik vir goeie wolproduksie','Wol word gevorm uit hoofsaaklik DNA en proteïen sintese','Deurvloei proteïen ryk aan swaeldraende aminosure is kritiek','Koper: deel van koënsiem wat wolkwaliteit verseker (treksterkte, kleursorpsie, elastisiteit)','Swael: saam met NPN sorg vir optimum produksie van swaeldraende mikrobes','Vitamiene: Biotin, Riboflavin, Foliën- en Pantoteensuur nodig vir wolgroei','Wolproduksie verminder tot 28% sonder korrekte byvoeding tydens dragtigheid/laktasie']}]},
    {heading:'WOLGROEI SIKLUS',items:[{product:'LOBOL 2:1:1 (onderhoud) / Produksielek (produksie)',details:['Goeie wolgroei kom voor net na skeer – skape vreet meer om koue te kompenseer','Voeding het meer direkte invloed op vesel dikte as op vesellengte','Egalige voeding is nodig vir goeie treksterkte van wolvesel','Hoë voedingspeile = dikker vesels met groter kartels','Verlies by ooie met meerlinge groter as by enkellinge','Verlies by lakterende diere groter as by dragtige diere']}]},
    {heading:'VERVANGINGSOOIE – Kritieke Eerste 5 Maande',items:[{product:'Groenveld Somerproduksielek 23% / Lamkruip / GF Lammervolvoer',details:['Potensialiteit van vervangingsooi begin as ongebore fetus','Sonder supplement: 15% minder primêre wol follikels by geboorte','Te min voeding: laer geboortegewig + hoër mortaliteit + swakker wolopbrengs','Gedurende lam se eerste maand: 75% van wol follikels bereik volwassenheid','Lammers kan op 90 dae ouderdom 50% van hul volwasse gewig bereik','Voedingstekort eerste 5 maande = blywende skade aan wolpotensiaal','Na 5 maande: voedingstekort = slegs tydelike verlaging (potensiaal bly behooue)','Kruipvoeding by ooie met tweelinge is ekonomies regverdigbaar']}]},
  ]},
  {id:'droe',title:'Droë / Dragtige Beeste (Volwasse Diere)',icon:'🌿',sections:[
    {heading:'SOMER',items:[
      {product:'Somer 6 P6 Foslek (Nov–Des)',details:['Piek somer: weiding sag, blaarryk, lowergroen','Inname: ± 130 g/kop/dag']},
      {product:'Somerfos 15% (Jan–Feb)',details:['Weiding groen maar in pypstadium','Herfskleur nog afwesig','Inname: ± 200 g/kop/dag']},
      {product:'NPN Fos 27% (Mrt–Apr)',details:['Weiding in saad met herfskleur','Ook vir ontydige droogte','Oorgangslek – bou kondisie voor winter','Inname: ± 220 g/kop/dag']},
    ]},
    {heading:'WINTER',items:[
      {product:'15 RPM Winterproduksielek (Laat Winter)',details:['Keer verlengde interkalfperiode','Inname: ± 1200 g/kop/dag']},
      {product:'4x4 Onderhoud 38% / 430WR Suurveld 43% (Mei–Jul)',details:['Vir winterweiding, hooi of droogte','Maksimum bakteriese massa in rumen','Ondersteun oorwintering','Inname: ± 500 g/kop/dag']},
    ]},
  ]},
  // SUIWEL / MELKBEES GIDSE
  {id:'suiwel1',title:'305 Dae Laktasie Siklus – Suiwelkoei',icon:'🥛',sections:[
    {heading:'A. DROË KOEIE (Belangrikste Groep)',items:[{product:'Droë Periode Bestuur',details:['Rusperiode volwasse: 40 dae min / 60 dae maks','Eerste laktasie: 80 dae rus','Kondisiepunt by opdroog: 3.5 – BEHOU tot kalwing','Fetale groei in droë periode = 65% – moenie buik met kondisie verwar nie','Elke 1kg vet verloor = 33 liter melk MINDER oor laktasie','Ketose-tekens: produksiefluktuasie; haarkleed op rug staan regop','Anioniese soute: 21 dae voor kalwing – staak sodra melkproduksie begin']}]},
    {heading:'B. TOP GROEP & VERSE GROEP',items:[{product:'Produksie Bestuur',details:['Inname = produksie','Bottervet: 50% asetat uit vesel + 50% vette in rantsoen','Energie = beperkende faktor','Hooilengte: NIE korter as 70mm nie','Speeksel (koeksoda) + herkou hou rumen PH 6–6.8','70% van totale NDF = hooi/grasse | NDF 25–35% | ADF 19–22%','Meer as 35% koeie moet te enige tyd herkou','Koeie piek week 7–10 na kalwing','1kg melk hoër piek = ±200 liter MEER oor laktasie','Volwasse koeie vreet ±4% van lewende gewig in top produksie']}]},
    {heading:'C. MIDDEL GROEP (120–240 dae)',items:[{product:'Middel Laktasie Bestuur',details:['Produksie val ±9%/maand','Temperature bo 24°C onderdruk inname – voer in die NAG','Elke 1L melk = ±4L water benodig','Kuilvoer PH onder 4 – middagvoeding apart van oggendvoeding','Voer 20 ure/dag beskikbaar | Kripspasie 70cm/bees']}]},
    {heading:'D. REGMAAK GROEP & E. VARS IN MELK',items:[{product:'Regmaak / Vars Koeie',details:['Regmaak: Forseer verminderde melkproduksie – skuif na hierdie groep op dag 240','Kondisiepunt 3.5 teen einde van siklus','Vars: Propionsuur bevorder maagpapille groei – vergroot absorpsie','Beperk liggaamsreserwe mobilisasie = langer produksieplato']}],note:'Kondisiepuntsiklus: Kalwing(3.5) → Top Groep(2.9) → Middel Groep(3.2) → Regmaak(3.5) → Droë Periode(3.5)'},
  ]},
  {id:'suiwel2',title:'Grootmaak van Verskalwers (Melkras)',icon:'🐮',sections:[
    {heading:'A. GEBOORTE TOT SPEEN (2 maande) – Kolostrum KRITIEK',items:[{product:'Kalfaangvangsmeel 18E + Kolostrum',details:['EERSTE 2L kolostrum BINNE 6 UUR na geboorte','Kolostrum kan gevries word – verhit tot 39°C','Ontsmet naelstring met jodium','Dag 4–10: 4x1L melk/dag | 18E ad-lib | Geen hooi','Dag 25–50: Verminder melk tot 5% van geboortegewig – stimuleer meelinname','Dag 51–60: Net soggens 2.5% melk | 18E ad-lib','Speen as kalf 2–2.2% LG in meel vreet (koue streke: 3.5%)','Gebruik fopspeen – NOOIT eerste maand uit emmer nie','Suurmelk is goeie remedie teen diarree (verlaag PH dermkanaal)']}]},
    {heading:'B. SPEEN TOT 3 MAANDE (±90kg)',items:[{product:'Kalfgroeimeel 16E (ad-lib)',details:['Vervang 18E met Kalfgroeimeel 16E ad-lib','Lusernhooi of goeie tefhooi ad-lib','Sodra versie herkou = rumen funksioneel (2–4 maande)','Meet borsomtrek en ribspronge vir produksiepotensiaal']}]},
    {heading:'C–D. 3 TOT 12 MAANDE (155–215kg)',items:[{product:'Kalfgroeimeel 16E → Suiwelmeel 15%',details:['3–6mnd: Kalfgroeimeel 16E beperk tot 4kg/dag + Somer 6 ad-lib','6–12mnd: Suiwelmeel 15% prot – 3kg/dag + Somer 6 ad-lib','Skakel na hawerweiding','Sou bronstig raak: MOENIE insemineer nie']}]},
    {heading:'E–H. 12 MAANDE TOT KALWING (340–480kg)',items:[{product:'Voerecht 17% → Suiwelmeel Laktasie',details:['12–16mnd: Voerecht 17% – 2.5kg/dag + Somer 6 ad-lib','Dekgewig 340kg – ideale kalwingstyd 24 maande','16mnd–3mnd voor kalf: Voerecht 17% 2kg + 1kg geelmeel + tefhooi ad-lib','Laaste 3mnd: Voerecht 17% 2.5kg/dag + goeie tefhooi','Laaste 2–3 weke: Suiwelmeel + kuilvoer 4kg/dag','Laat verse gereeld deur melkstal loop vir aanpassing']}],note:'Kondisiepuntdoelwitte – 3mnd:2.2 | 6mnd:2.3 | 9mnd:2.4 | 12mnd:2.8 | 15mnd:2.9 | 18mnd:3.2 | 21mnd:3.4 | 24mnd:3.5'},
  ]},
  {id:'suiwel3',title:'Grootmaak van Bulkalwers (Melkras)',icon:'🐂',sections:[
    {heading:'A. GEBOORTE TOT 130kg (Speen dag 52)',items:[{product:'Bulkalf 0-100 Aanvangsmeel',details:['Eerste 2L kolostrum BINNE 4 UUR','Dag 1–3: Kolostrum by moeder','Dag 4–10: 4x1L melk | Bulkalf 0-100 begin | Geen hooi | Voeromset 2.2:1','Dag 11–31: 3x1L melk | Bulkalf 0-100 ad-lib | Voeromset 2.4:1','Dag 31–45: 2x1L melk | Bulkalf 0-100 ad-lib','Dag 46–52: 1x1L melk soggens | Bulkalf 0-100 ad-lib + hooi','Speen dag 52 – Teikengewig: 78kg min','Fopspeen verpligs – NOOIT emmer eerste maand nie','Siek kalf in eerste 2 maande = ±80kg ligter op 6 maande']}]},
    {heading:'B. 130kg TOT 250kg',items:[{product:'Bulkalf 100-220 (ad-lib) + Hooi',details:['Bulkalf 100-220 ad-lib + hooi','Aanpassingsperiode: 50% oud + 50% nuut eerste week','Ruimte: 8m²/kop','Voeromset: ±4.2:1','Groenweiding: Crash Course Somer | Droë weiding: Crash Course 100–250','Teikengroei: 1.2–1.6kg/dag']}]},
    {heading:'C. NA 250kg (Voerkraal / Afrond)',items:[{product:'Semi-Volvoer Rom Rev F3 (melkras) / F2 (vleisras)',details:['Minimum 1.8kg/dag voor afrond','Na aanpassing: voerkrippe ALTYD vol','Leefspasie: 10m²/dier | Voeromset: ±5.8','Teikengewig 6 maande: ±330kg – vetgradering 2','NA 250kg NIE op veldweiding nie']}],note:'Maagwerkings: Salmonella=Advocin+VitB | Dikmelkagtig=Clamoxil+BiosolM | Koksidiose=Sulfamiddel 3dae | Waterig=BiosolM+Phosamine | Lintwurm=Lintex elke 14dae | Respiratories=Nuflor/Mycotil300'},
  ]},
];

function switchProdTab(t){
  ['products','guides'].forEach(x=>{
    document.getElementById('prod-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  if(t==='guides') renderGuides();
}

function renderProducts(){
  // Eie Geel banner
  const banner=document.getElementById('eie-banner');
  if(banner){ banner.className='eie-banner'+(eieGeelActive?' on':''); document.getElementById('eie-toggle').className='toggle-pill'+(eieGeelActive?' on':''); }
  // Cats
  const catsEl=document.getElementById('prod-cats');
  catsEl.innerHTML=PROD_CATS.map(c=>`<button class="chip${prodCatFilter===c?' active':''}" onclick="setProdCat('${c}')">${c}</button>`).join('');
  document.getElementById('prod-count').textContent=products.length;
  // List
  const search=(document.getElementById('prod-search')?.value||'').toLowerCase();
  const filtered=products.filter(p=>{
    const catOk=prodCatFilter==='Alle'||p.category===prodCatFilter;
    const srchOk=p.name.toLowerCase().includes(search)||(p.description||'').toLowerCase().includes(search)||(p.useCase||'').toLowerCase().includes(search);
    return catOk&&srchOk;
  });
  const el=document.getElementById('prod-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen produkte gevind nie</div>'; return; }
  el.innerHTML=filtered.map(p=>{
    const disp=getDiscounted(p);
    const open=expandedItems['prod_'+p.id];
    return `<div class="prod-card">
      <div class="prod-row" onclick="toggleExpand('prod_${p.id}');renderProducts()">
        <div style="flex:1"><div class="prod-name">${escH(p.name)}</div><div class="prod-cat">${escH(p.category)}</div></div>
        <div class="prod-right">
          ${eieGeelActive&&disp!==p.price?`<div class="prod-old">R${p.price.toFixed(2)}</div>`:''}
          <div class="prod-price">R${disp.toFixed(2)}</div>
          ${p.pricePerTon?`<div class="prod-unit">R${Number(p.pricePerTon).toFixed(2)}/ton</div>`:''}
          <div class="prod-unit">${escH(p.unit)}</div>
          <span>${open?'▲':'▼'}</span>
        </div>
      </div>
      ${open?`<div class="prod-detail">
        ${p.useCase?`<div class="use-case-tag">🏷 ${escH(p.useCase)}</div>`:''}
        <div class="prod-desc">${escH(p.description||'Geen beskrywing')}</div>
        <button class="btn btn-secondary btn-sm" onclick="openEditProd(${p.id})">✏ Wysig</button>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate add modal cats
  const pacat=document.getElementById('pa-cat');
  if(pacat&&!pacat.options.length) PROD_CATS.slice(1).forEach(c=>{ const o=document.createElement('option'); o.value=o.textContent=c; pacat.appendChild(o); });
}
function setProdCat(c){ prodCatFilter=c; renderProducts(); }
function toggleEieGeel(){
  eieGeelActive=!eieGeelActive; save('v3_eieGeel',eieGeelActive);
  renderProducts();
}
function addProduct(){
  const name=document.getElementById('pa-name').value.trim();
  if(!name) return;
  const p={id:uid(),name,category:document.getElementById('pa-cat').value,price:parseFloat(document.getElementById('pa-price').value)||0,pricePerTon:parseFloat(document.getElementById('pa-perton').value)||0,unit:document.getElementById('pa-unit').value,description:document.getElementById('pa-desc').value,useCase:document.getElementById('pa-use').value};
  products.push(p); save('v3_products',products);
  closeModal('prod-add-modal');
  document.getElementById('pa-name').value='';
  renderProducts();
}
function openEditProd(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  const name=prompt('Naam:',p.name); if(name===null) return;
  const priceStr=prompt('Prys per sak (R):',p.price); if(priceStr===null) return;
  const newPrice=parseFloat(priceStr)||0;
  if(newPrice!==p.price){ priceHistory.unshift({id:uid(),productId:p.id,productName:p.name,oldPrice:p.price,newPrice,date:new Date().toLocaleDateString('af-ZA'),time:new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'})}); save('v3_priceHistory',priceHistory); }
  const desc=prompt('Beskrywing:',p.description||''); if(desc===null) return;
  const useCase=prompt('Gebruik geval:',p.useCase||''); if(useCase===null) return;
  Object.assign(p,{name,price:newPrice,description:desc,useCase});
  save('v3_products',products); renderProducts();
}
function renderGuides(){
  document.getElementById('guides-list').innerHTML=GUIDE_DATA.map(g=>`
    <div class="guide-card" id="guide-${g.id}">
      <button class="guide-header" onclick="toggleExpand('guide_${g.id}');renderGuides()">
        <span class="guide-icon">${g.icon}</span>
        <span class="guide-title">${g.title}</span>
        <span>${expandedItems['guide_'+g.id]?'▲':'▼'}</span>
      </button>
      ${expandedItems['guide_'+g.id]?`<div class="guide-body">${g.sections.map(s=>renderGuideSection(g.id,s)).join('')}</div>`:''}
    </div>`).join('');
}
function renderGuideSection(gid,s){
  const key=`gsec_${gid}_${s.heading}`;
  return `<div class="gsec">
    <button class="gsec-btn" onclick="toggleExpand('${key}');renderGuides()">
      <div><div class="gsec-head">${s.heading}</div>${s.subheading?`<div class="gsec-sub">${s.subheading}</div>`:''}</div>
      <span>${expandedItems[key]?'▲':'▼'}</span>
    </button>
    ${expandedItems[key]?`<div class="gsec-body">${s.items.map(item=>`<div class="gitem"><div class="gitem-prod">${item.product}</div><ul class="gitem-list">${item.details.map(d=>`<li>${d}</li>`).join('')}</ul></div>`).join('')}${s.note?`<div class="guide-note">💡 ${s.note}</div>`:''}</div>`:''}
  </div>`;
}
function toggleExpand(k){ expandedItems[k]=!expandedItems[k]; }

// ═══════════════════════════════════════════════════════════════
// TRUCK COUNT
// ═══════════════════════════════════════════════════════════════
function renderTrucks(){
  const el=document.getElementById('truck-list');
  if(!truckCounts.length){ el.innerHTML='<div class="empty">Geen vragmotor tellings nie. Tik + om te begin.</div>'; return; }
  el.innerHTML=truckCounts.map(t=>{
    const bags=t.items.reduce((s,i)=>s+i.qty,0);
    const val=t.items.reduce((s,i)=>s+i.total,0);
    return `<div class="truck-card" onclick="openTruckDetail(${t.id})">
      <div class="truck-icon">🚛</div>
      <div class="truck-info">
        <span class="truck-name">${escH(t.name)}</span>
        <span class="truck-meta">${t.date} · ${t.items.length} produkte · ${bags} sakke</span>
        <span class="truck-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span>
      </div>
      ${t.delivered?'<span class="badge badge-green">Afgelewer</span>':''}
      <button class="icon-btn red sm" onclick="event.stopPropagation();deleteTruck(${t.id})">🗑</button>
    </div>`;
  }).join('');
}
function addTruck(){
  const name=document.getElementById('ta-name').value.trim(); if(!name) return;
  const t={id:uid(),name,date:new Date().toLocaleDateString('af-ZA'),items:[],delivered:false};
  truckCounts.unshift(t); save('v3_trucks',truckCounts);
  document.getElementById('ta-name').value='';
  closeModal('truck-add-modal');
  openTruckDetail(t.id);
}
function deleteTruck(id){ if(!confirm('Verwyder hierdie vragmotor telling?')) return; truckCounts=truckCounts.filter(t=>t.id!==id); save('v3_trucks',truckCounts); renderTrucks(); }
function openTruckDetail(id){
  currentTruckId=id;
  const t=truckCounts.find(x=>x.id===id); if(!t) return;
  document.getElementById('truck-list-view').style.display='none';
  document.getElementById('truck-detail-view').style.display='';
  document.getElementById('truck-detail-name').textContent=t.name;
  const notice=document.getElementById('eie-notice-truck');
  if(notice) notice.innerHTML=eieGeelActive?'<div class="eie-notice" style="margin-bottom:10px">🌽 Eie Geel afslag toegepas</div>':'';
  renderTruckDetail();
}
function closeTruckDetail(){ currentTruckId=null; document.getElementById('truck-list-view').style.display=''; document.getElementById('truck-detail-view').style.display='none'; renderTrucks(); }
function renderTruckDetail(){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const bags=t.items.reduce((s,i)=>s+i.qty,0);
  const val=t.items.reduce((s,i)=>s+i.total,0);
  document.getElementById('truck-summary').innerHTML=`
    <div class="sum-item"><div class="sum-label">Totaal Sakke</div><span class="sum-val" style="color:var(--accent)">${bags}</span></div>
    <div class="sum-item"><div class="sum-label">Totale Waarde</div><span class="sum-val">R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="sum-item"><div class="sum-label">Datum</div><span class="sum-val" style="font-size:14px">${t.date}</span></div>`;
  const el=document.getElementById('truck-items');
  if(!t.items.length){ el.innerHTML='<div class="empty">Geen items nie – tik "Voeg Produk By"</div>'; return; }
  el.innerHTML=t.items.map(item=>`<div class="count-row">
    <div class="count-info"><span class="count-name">${escH(item.name)}</span><span class="count-sub">${item.unit} · R${item.price.toFixed(2)} elk · R${item.total.toFixed(2)}</span></div>
    <div class="count-controls">
      <button class="qty-btn" onclick="updateTruckQty(${item.productId},-1)">−</button>
      <input type="number" class="qty-input" value="${item.qty}" min="0" onchange="setTruckQty(${item.productId},this.value)"/>
      <button class="qty-btn" onclick="updateTruckQty(${item.productId},1)">+</button>
      <button class="icon-btn red sm" onclick="removeTruckItem(${item.productId})">🗑</button>
    </div>
  </div>`).join('');
}
function renderTruckPicker(){
  const search=(document.getElementById('ti-search')?.value||'').toLowerCase();
  const filtered=products.filter(p=>p.name.toLowerCase().includes(search)||p.category.toLowerCase().includes(search)).slice(0,40);
  document.getElementById('ti-picker').innerHTML=filtered.map(p=>`
    <button class="picker-item" onclick="addTruckItem(${p.id})">
      <span class="picker-name">${escH(p.name)}</span>
      <span class="picker-sub">${p.category} · R${getDiscounted(p).toFixed(2)}</span>
    </button>`).join('');
}
function addTruckItem(prodId){
  const p=products.find(x=>x.id===prodId); if(!p||!currentTruckId) return;
  const price=getDiscounted(p);
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const ex=t.items.find(i=>i.productId===prodId);
  if(ex){ ex.qty++; ex.total=ex.qty*ex.price; }
  else t.items.push({productId:prodId,name:p.name,unit:p.unit,price,qty:1,total:price});
  save('v3_trucks',truckCounts); closeModal('truck-item-modal'); renderTruckDetail();
}
function updateTruckQty(prodId,delta){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const i=t.items.find(x=>x.productId===prodId); if(!i) return;
  i.qty=Math.max(0,i.qty+delta); i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}
function setTruckQty(prodId,val){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const i=t.items.find(x=>x.productId===prodId); if(!i) return;
  i.qty=parseInt(val)||0; i.total=i.qty*i.price;
  save('v3_trucks',truckCounts); renderTruckDetail();
}
function removeTruckItem(prodId){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  t.items=t.items.filter(i=>i.productId!==prodId);
  save('v3_trucks',truckCounts); renderTruckDetail();
}
function exportTruckList(){
  const t=truckCounts.find(x=>x.id===currentTruckId); if(!t) return;
  const bags=t.items.reduce((s,i)=>s+i.qty,0);
  const val=t.items.reduce((s,i)=>s+i.total,0);
  const lines=['LOBOL – Vragmotor Laailys',`Vragmotor: ${t.name}`,`Datum: ${t.date}`,'',
    ...t.items.map(i=>`${i.name} – ${i.qty} x R${i.price.toFixed(2)} = R${i.total.toFixed(2)}`),
    '',`Totaal Sakke: ${bags}`,`Totale Waarde: R${val.toLocaleString('af-ZA',{minimumFractionDigits:2})}`];
  dl(lines.join('\n'),`${t.name.replace(/\s/g,'_')}_laailys.txt`,'text/plain');
}

// ═══════════════════════════════════════════════════════════════
// TRUCK COMPARE
// ═══════════════════════════════════════════════════════════════
function renderCompare(){
  const sel=document.getElementById('cmp-truck-select');
  if(!truckCounts.length){ sel.innerHTML='<div class="empty">Geen vragmotor tellings nie.</div>'; document.getElementById('cmp-results').innerHTML=''; return; }
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
  if(!selected.length){ res.innerHTML='<div class="cmp-empty-hint" style="text-align:center;padding:40px;color:var(--text3)">🚛 Kies vragmotors hierbo om te vergelyk</div>'; return; }
  // Build product map
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

// ═══════════════════════════════════════════════════════════════
// FACTORY STOCK
// ═══════════════════════════════════════════════════════════════
const STOCK_STATUSES=['Alle','Goed','Lae Voorraad','Naby Verval','Verval'];
function renderStock(){
  const expired=factoryStock.filter(i=>['Verval','Expired'].includes(i.status)).length;
  const low=factoryStock.filter(i=>['Lae Voorraad','Low'].includes(i.status)).length;
  const near=factoryStock.filter(i=>['Naby Verval','Near Expiry'].includes(i.status)).length;
  const good=factoryStock.filter(i=>['Goed','Good'].includes(i.status)).length;
  document.getElementById('stock-stats').innerHTML=`
    <div class="stat-box"><span class="stat-val">${factoryStock.length}</span><span class="stat-lbl">Totaal</span></div>
    <div class="stat-box"><span class="stat-val red">${expired}</span><span class="stat-lbl">Verval</span></div>
    <div class="stat-box"><span class="stat-val orange">${near+low}</span><span class="stat-lbl">Aandag</span></div>
    <div class="stat-box"><span class="stat-val green">${good}</span><span class="stat-lbl">Goed</span></div>`;
  const totalVal=factoryStock.reduce((s,i)=>s+(i.qty||0)*(i.price||0),0);
  document.getElementById('stock-value-banner').innerHTML=totalVal>0?`<div class="stock-value-banner">Totale voorraadwaarde: <strong>R${totalVal.toLocaleString('af-ZA',{minimumFractionDigits:2})}</strong></div>`:'';
  document.getElementById('stock-chips').innerHTML=STOCK_STATUSES.map(s=>`<button class="chip${stockFilter===s?' active':''}${s==='Verval'?' danger':s==='Lae Voorraad'||s==='Naby Verval'?' warn':''}" onclick="setStockFilter('${s}')">${s}</button>`).join('');
  const search=(document.getElementById('stock-search')?.value||'').toLowerCase();
  const filtered=factoryStock.filter(i=>{
    const sm=stockFilter==='Alle'||i.status===stockFilter;
    return sm&&i.name.toLowerCase().includes(search);
  });
  const el=document.getElementById('stock-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen voorraad items nie. Tik + om by te voeg.</div>'; return; }
  el.innerHTML=filtered.map(i=>{
    const si=s=>['Verval','Expired'].includes(s)?'red':['Naby Verval','Near Expiry','Lae Voorraad','Low'].includes(s)?'orange':'green';
    const minWarn=i.minQty&&i.qty<=i.minQty?`<span style="color:var(--orange);font-weight:700">⚠️ Onder minimum (${i.minQty})</span>`:'';
    return `<div class="stock-card${['Verval','Expired'].includes(i.status)?' expired':''}">
      <div class="stock-top">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="color:var(--${si(i.status)})">${['Verval','Expired'].includes(i.status)?'🔴':['Naby Verval','Lae Voorraad','Near Expiry','Low'].includes(i.status)?'🟠':'🟢'}</span>
          <span class="stock-name">${escH(i.name)}</span>
        </div>
        <span class="badge badge-${si(i.status)==='red'?'red':si(i.status)==='orange'?'orange':'green'}">${i.status}</span>
      </div>
      <div class="stock-details">
        <span class="detail-item"><strong>${i.qty}</strong> ${i.unit}s</span>
        ${i.expiryDate?`<span class="detail-item">Verval: ${i.expiryDate}</span>`:''}
        <span class="detail-item">R${i.price}/eenheid</span>
        <span class="detail-item">Waarde: R${((i.qty||0)*(i.price||0)).toFixed(2)}</span>
        ${minWarn}
      </div>
      ${i.notes?`<div class="stock-notes">${escH(i.notes)}</div>`:''}
      <div class="stock-footer">
        <span class="stock-updated">Opgedateer ${i.updatedAt||''}</span>
        <div style="display:flex;gap:6px">
          <button class="icon-btn sm" onclick="editStockItem(${i.id})">✏</button>
          <button class="icon-btn red sm" onclick="deleteStockItem(${i.id})">🗑</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function setStockFilter(f){ stockFilter=f; renderStock(); }
function renderStockPicker(){
  const s=(document.getElementById('sa-prod-search')?.value||'').toLowerCase();
  const f=products.filter(p=>p.name.toLowerCase().includes(s)).slice(0,30);
  document.getElementById('sa-picker').innerHTML=f.map(p=>`<button class="picker-item" onclick="selectStockProd(${p.id},'${escH(p.name)}')">${escH(p.name)}<span style="font-size:12px;color:var(--text3)"> · ${p.unit}</span></button>`).join('');
}
function selectStockProd(id,name){
  document.getElementById('sa-prod-id').value=id;
  document.getElementById('sa-prod-search').value=name;
  document.getElementById('sa-picker').innerHTML='';
}
function addStockItem(){
  const prodId=parseInt(document.getElementById('sa-prod-id').value);
  if(!prodId){ alert('Kies eers \'n produk'); return; }
  const p=products.find(x=>x.id===prodId);
  if(!p) return;
  factoryStock.push({id:uid(),productId:prodId,name:p.name,unit:p.unit,price:p.price,qty:parseInt(document.getElementById('sa-qty').value)||0,minQty:parseInt(document.getElementById('sa-min').value)||0,status:document.getElementById('sa-status').value,expiryDate:document.getElementById('sa-expiry').value,notes:document.getElementById('sa-notes').value,updatedAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_stock',factoryStock);
  ['sa-prod-id','sa-qty','sa-min','sa-expiry','sa-notes'].forEach(x=>document.getElementById(x).value='');
  document.getElementById('sa-prod-search').value='';
  document.getElementById('sa-picker').innerHTML='';
  closeModal('stock-add-modal'); renderStock();
}
function editStockItem(id){
  const i=factoryStock.find(x=>x.id===id); if(!i) return;
  const qty=prompt('Hoeveelheid:',i.qty); if(qty===null) return;
  const min=prompt('Minimum vlak (waarskuwing):',i.minQty||0); if(min===null) return;
  const status=prompt('Status (Goed/Lae Voorraad/Naby Verval/Verval):',i.status); if(status===null) return;
  const notes=prompt('Notas:',i.notes||''); if(notes===null) return;
  Object.assign(i,{qty:parseInt(qty)||0,minQty:parseInt(min)||0,status,notes,updatedAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_stock',factoryStock); renderStock();
}
function deleteStockItem(id){ if(!confirm('Verwyder hierdie voorraad item?')) return; factoryStock=factoryStock.filter(i=>i.id!==id); save('v3_stock',factoryStock); renderStock(); }

// ═══════════════════════════════════════════════════════════════
// DUTIES
// ═══════════════════════════════════════════════════════════════
const DUTY_CATS=['Alle','Skoonmaak','Voorraad','Instandhouding','Veiligheid','Admin','Ander'];
const PRI_COLOR={'high':'red','medium':'orange','low':'green'};
const PRI_LABEL={'high':'Hoog','medium':'Medium','low':'Laag'};
function renderDuties(){
  checkDutyReset();
  document.getElementById('duties-prog-text').innerHTML=`📋 ${dutyDone.length} / ${duties.length} voltooi vandag`;
  document.getElementById('duties-prog-fill').style.width=duties.length?`${(dutyDone.length/duties.length)*100}%`:'0%';
  document.getElementById('duty-chips').innerHTML=DUTY_CATS.map(c=>`<button class="chip${dutyFilter===c?' active':''}" onclick="setDutyFilter('${c}')">${c}</button>`).join('');
  const filtered=[...duties].filter(d=>dutyFilter==='Alle'||d.category===dutyFilter).sort((a,b)=>({'high':0,'medium':1,'low':2}[a.priority]||1)-({'high':0,'medium':1,'low':2}[b.priority]||1));
  const el=document.getElementById('duty-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen take nie.</div>'; return; }
  el.innerHTML=filtered.map(d=>`<div class="duty-card${dutyDone.includes(d.id)?' done-card':''}">
    <div class="duty-top">
      <div class="check-box${dutyDone.includes(d.id)?' checked':''}" onclick="toggleDutyDone(${d.id})">${dutyDone.includes(d.id)?'✓':''}</div>
      <div class="duty-info">
        <span class="duty-title-text">${escH(d.title)}</span>
        <div class="duty-tags"><span class="tag">${d.category}</span><span class="tag ${PRI_COLOR[d.priority]||'orange'}">${PRI_LABEL[d.priority]||d.priority}</span></div>
      </div>
      <div class="duty-acts">
        <button class="icon-btn sm" onclick="editDuty(${d.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteDuty(${d.id})">🗑</button>
      </div>
    </div>
    ${d.notes?`<div class="duty-notes">${escH(d.notes)}</div>`:''}
  </div>`).join('');
}
function setDutyFilter(f){ dutyFilter=f; renderDuties(); }
function toggleDutyDone(id){ if(dutyDone.includes(id)) dutyDone=dutyDone.filter(x=>x!==id); else dutyDone.push(id); save('v3_dutyDone',dutyDone); renderDuties(); }
function addDuty(){
  const title=document.getElementById('da-title').value.trim(); if(!title) return;
  duties.push({id:uid(),title,category:document.getElementById('da-cat').value,priority:document.getElementById('da-pri').value,notes:document.getElementById('da-notes').value});
  save('v3_duties',duties); document.getElementById('da-title').value=''; document.getElementById('da-notes').value='';
  closeModal('duty-add-modal'); renderDuties();
}
function editDuty(id){
  const d=duties.find(x=>x.id===id); if(!d) return;
  const title=prompt('Taaknaam:',d.title); if(title===null) return;
  const notes=prompt('Notas:',d.notes||''); if(notes===null) return;
  Object.assign(d,{title,notes}); save('v3_duties',duties); renderDuties();
}
function deleteDuty(id){ if(!confirm('Verwyder hierdie taak?')) return; duties=duties.filter(d=>d.id!==id); save('v3_duties',duties); renderDuties(); }

// ═══════════════════════════════════════════════════════════════
// REMINDERS
// ═══════════════════════════════════════════════════════════════
const ENG_DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const AF_DAYS=['Maa','Din','Woe','Don','Vry','Sat','Son'];
let newRemDays=[...ENG_DAYS];
function timeToMin(t){ const[h,m]=t.split(':').map(Number); return h*60+m; }
function nowMin(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); }
function getRemStatus(r){
  if(!r.active) return 'off';
  const diff=timeToMin(r.time)-nowMin();
  if(diff>=0&&diff<=60) return 'soon';
  if(diff<0&&diff>=-30) return 'recent';
  return 'scheduled';
}
function renderReminders(){
  document.getElementById('rem-time').textContent=new Date().toLocaleTimeString('af-ZA',{hour:'2-digit',minute:'2-digit'});
  const el=document.getElementById('rem-list');
  if(!reminders.length){ el.innerHTML='<div class="empty">Geen herinneringe nie.</div>'; return; }
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

// ═══════════════════════════════════════════════════════════════
// CUSTOMERS
// ═══════════════════════════════════════════════════════════════
function renderCustomers(){
  document.getElementById('cust-count').textContent=customers.length;
  const search=(document.getElementById('cust-search')?.value||'').toLowerCase();
  const filtered=customers.filter(c=>c.name.toLowerCase().includes(search)||(c.farm||'').toLowerCase().includes(search)||(c.area||'').toLowerCase().includes(search));
  const el=document.getElementById('cust-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen klante gevind nie.</div>'; return; }
  el.innerHTML=filtered.map(c=>{
    const open=expandedItems['cust_'+c.id];
    return `<div class="cust-card">
      <div class="cust-top" onclick="toggleExpand('cust_${c.id}');renderCustomers()">
        <div class="cust-avatar">${c.name.charAt(0)}</div>
        <div class="cust-info">
          <div class="cust-name">${escH(c.name)} ${c.eieGeel?'<span class="eie-chip">🌽 Eie Geel</span>':''}</div>
          <div class="cust-farm">${escH(c.farm||'')}</div>
        </div>
        <span class="cust-type">${c.type||''}</span>
      </div>
      ${open?`<div class="cust-detail">
        ${c.phone?`<a href="tel:${c.phone}" class="detail-link">📞 ${escH(c.phone)}</a>`:''}
        ${c.area?`<div style="display:flex;align-items:center;gap:5px;font-size:13px;color:var(--text2)">📍 ${escH(c.area)}</div>`:''}
        ${c.notes?`<div class="detail-notes">${escH(c.notes)}</div>`:''}
        <div class="cust-detail-acts">
          <button class="btn btn-secondary btn-sm" onclick="editCustomer(${c.id})">✏ Wysig</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${c.id})">🗑 Verwyder</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
}
function toggleNewCustEieGeel(){ newCustEieGeel=!newCustEieGeel; document.getElementById('ca-eiegeel-toggle').className='toggle-pill'+(newCustEieGeel?' on':''); }
function addCustomer(){
  const name=document.getElementById('ca-name').value.trim(); if(!name) return;
  customers.push({id:uid(),name,farm:document.getElementById('ca-farm').value,phone:document.getElementById('ca-phone').value,area:document.getElementById('ca-area').value,type:document.getElementById('ca-type').value,notes:document.getElementById('ca-notes').value,eieGeel:newCustEieGeel});
  save('v3_customers',customers); newCustEieGeel=false;
  document.getElementById('ca-eiegeel-toggle').className='toggle-pill';
  ['ca-name','ca-farm','ca-phone','ca-area','ca-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('cust-add-modal'); renderCustomers();
}
function editCustomer(id){
  const c=customers.find(x=>x.id===id); if(!c) return;
  const name=prompt('Naam:',c.name); if(name===null) return;
  const phone=prompt('Tel:',c.phone||''); if(phone===null) return;
  const notes=prompt('Notas:',c.notes||''); if(notes===null) return;
  Object.assign(c,{name,phone,notes}); save('v3_customers',customers); renderCustomers();
}
function deleteCustomer(id){ if(!confirm('Verwyder hierdie klant?')) return; customers=customers.filter(c=>c.id!==id); save('v3_customers',customers); renderCustomers(); }

// ═══════════════════════════════════════════════════════════════
// SALES
// ═══════════════════════════════════════════════════════════════
function switchSalesTab(t){
  ['bestellings','prysgeskiedenis'].forEach(x=>{
    document.getElementById('sales-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  if(t==='prysgeskiedenis') renderPriceHistory();
}
function renderSales(){
  document.getElementById('sales-count').textContent=sales.length;
  const paid=sales.filter(s=>s.status==='Betaal').reduce((x,s)=>x+(s.total||0),0);
  const pend=sales.filter(s=>s.status==='Hangende').reduce((x,s)=>x+(s.total||0),0);
  document.getElementById('sales-sum').innerHTML=`
    <div class="sum-item"><div class="sum-label">Betaal</div><span class="sum-val" style="color:var(--accent)">R${paid.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="sum-item"><div class="sum-label">Hangende</div><span class="sum-val" style="color:var(--orange)">R${pend.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="sum-item"><div class="sum-label">Bestellings</div><span class="sum-val">${sales.length}</span></div>`;
  const search=(document.getElementById('sale-search')?.value||'').toLowerCase();
  const filtered=sales.filter(s=>s.customerName.toLowerCase().includes(search));
  const el=document.getElementById('sale-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen bestellings nie.</div>'; return; }
  el.innerHTML=filtered.map(s=>{
    const open=expandedItems['sale_'+s.id];
    const sc={'Betaal':'badge-green','Gekanselleer':'badge-red','Hangende':'badge-orange'};
    return `<div class="sale-card">
      <div class="sale-head" onclick="toggleExpand('sale_${s.id}');renderSales()">
        <div class="sale-info"><div class="sale-cust">${escH(s.customerName)} ${s.eieGeel?'🌽':''}</div><div class="sale-date">${s.date} · ${s.items?.length||0} produkte</div></div>
        <div class="sale-right"><div class="sale-amt">R${(s.total||0).toFixed(2)}</div><span class="badge ${sc[s.status]||'badge-dim'}">${s.status}</span><span>${open?'▲':'▼'}</span></div>
      </div>
      ${open?`<div class="sale-detail">
        ${s.items?.map(i=>`<div class="sale-detail-row"><span>${escH(i.name)}</span><span>${i.qty} × R${i.price?.toFixed(2)} = R${i.total?.toFixed(2)}</span></div>`).join('')||''}
        ${s.notes?`<div class="detail-notes">${escH(s.notes)}</div>`:''}
        <div class="sale-acts">
          <select class="status-sel" onchange="updateSaleStatus(${s.id},this.value)">
            ${['Hangende','Betaal','Gekanselleer'].map(o=>`<option${s.status===o?' selected':''}>${o}</option>`).join('')}
          </select>
          <button class="icon-btn red sm" onclick="deleteSale(${s.id})">🗑</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate sale customer list
  const slaCust=document.getElementById('sla-cust');
  if(slaCust){
    const cur=slaCust.value;
    slaCust.innerHTML='<option value="">-- Kies klant --</option>'+customers.map(c=>`<option value="${c.id}"${String(c.id)===cur?' selected':''}>${escH(c.name)}${c.eieGeel?' 🌽':''}</option>`).join('');
  }
}
function onSaleCustomerChange(){
  const id=parseInt(document.getElementById('sla-cust').value);
  const c=customers.find(x=>x.id===id);
  document.getElementById('sla-eie-notice').innerHTML=c?.eieGeel?'<div class="eie-notice">🌽 Eie Geel afslag toegepas: −R48/sak</div>':'';
}
function openSaleProdPicker(){ renderSalePicker(); openModal('sale-prod-modal'); }
function renderSalePicker(){
  const s=(document.getElementById('sp-search')?.value||'').toLowerCase();
  const custId=parseInt(document.getElementById('sla-cust').value);
  const cust=customers.find(c=>c.id===custId);
  const f=products.filter(p=>p.name.toLowerCase().includes(s)).slice(0,40);
  document.getElementById('sp-picker').innerHTML=f.map(p=>`<button class="picker-item" onclick="addSaleItem(${p.id})"><span class="picker-name">${escH(p.name)}</span><span class="picker-sub">R${getDiscounted(p,cust?.eieGeel).toFixed(2)} · ${p.unit}</span></button>`).join('');
}
function addSaleItem(prodId){
  const p=products.find(x=>x.id===prodId); if(!p) return;
  const custId=parseInt(document.getElementById('sla-cust').value);
  const cust=customers.find(c=>c.id===custId);
  const price=getDiscounted(p,cust?.eieGeel);
  const ex=newSaleItems.find(i=>i.productId===prodId);
  if(ex){ ex.qty++; ex.total=ex.qty*ex.price; }
  else newSaleItems.push({productId:prodId,name:p.name,unit:p.unit,price,qty:1,total:price});
  closeModal('sale-prod-modal'); renderSaleItems();
}
function renderSaleItems(){
  const total=newSaleItems.reduce((s,i)=>s+i.total,0);
  document.getElementById('sla-items').innerHTML=newSaleItems.map(i=>`
    <div class="sale-item-row">
      <span class="sale-item-name">${escH(i.name)}</span>
      <div class="sale-item-controls">
        <button class="qty-btn" onclick="updSaleItemQty(${i.productId},-1)">−</button>
        <input type="number" class="qty-input" value="${i.qty}" min="1" onchange="setSaleItemQty(${i.productId},this.value)"/>
        <button class="qty-btn" onclick="updSaleItemQty(${i.productId},1)">+</button>
        <span class="sale-item-total">R${i.total.toFixed(2)}</span>
        <button class="icon-btn red sm" onclick="remSaleItem(${i.productId})">✕</button>
      </div>
    </div>`).join('');
  const totEl=document.getElementById('sla-total');
  if(newSaleItems.length){ totEl.style.display=''; totEl.innerHTML=`<div class="sale-total-row">Totaal: <strong>R${total.toFixed(2)}</strong></div>`; }
  else totEl.style.display='none';
}
function updSaleItemQty(id,d){ const i=newSaleItems.find(x=>x.productId===id); if(i){ i.qty=Math.max(1,i.qty+d); i.total=i.qty*i.price; renderSaleItems(); } }
function setSaleItemQty(id,v){ const i=newSaleItems.find(x=>x.productId===id); if(i){ i.qty=parseInt(v)||1; i.total=i.qty*i.price; renderSaleItems(); } }
function remSaleItem(id){ newSaleItems=newSaleItems.filter(i=>i.productId!==id); renderSaleItems(); }
function saveSale(){
  const custId=parseInt(document.getElementById('sla-cust').value);
  if(!custId||!newSaleItems.length){ alert('Kies \'n klant en voeg produkte by'); return; }
  const cust=customers.find(c=>c.id===custId);
  sales.unshift({id:uid(),customerId:custId,customerName:cust?.name||'Onbekend',date:new Date().toISOString().slice(0,10),items:[...newSaleItems],total:newSaleItems.reduce((s,i)=>s+i.total,0),status:document.getElementById('sla-status').value,notes:document.getElementById('sla-notes').value,eieGeel:cust?.eieGeel||false});
  save('v3_sales',sales); newSaleItems=[];
  document.getElementById('sla-items').innerHTML=''; document.getElementById('sla-total').style.display='none'; document.getElementById('sla-notes').value='';
  closeModal('sale-add-modal'); renderSales();
}
function updateSaleStatus(id,st){ const s=sales.find(x=>x.id===id); if(s){ s.status=st; save('v3_sales',sales); renderSales(); } }
function deleteSale(id){ if(!confirm('Verwyder hierdie bestelling?')) return; sales=sales.filter(s=>s.id!==id); save('v3_sales',sales); renderSales(); }
function renderPriceHistory(){
  const el=document.getElementById('price-hist-list');
  if(!priceHistory.length){ el.innerHTML='<div class="empty">Geen prysgeskiedenis nie. Wysig \'n produk se prys om dit op te neem.</div>'; return; }
  el.innerHTML=priceHistory.map(h=>`<div class="price-hist-row"><div class="ph-name">${escH(h.productName)}</div><div class="ph-change"><span class="ph-old">R${h.oldPrice?.toFixed(2)}</span><span>→</span><span class="ph-new">R${h.newPrice?.toFixed(2)}</span></div><div class="ph-date">${h.date} ${h.time||''}</div></div>`).join('');
}

// ═══════════════════════════════════════════════════════════════
// DELIVERIES
// ═══════════════════════════════════════════════════════════════
const DELIV_STATUSES=['Alle','Beplan','Onderweg','Afgelewer','Gekanselleer'];
function renderDeliveries(){
  document.getElementById('deliv-chips').innerHTML=DELIV_STATUSES.map(s=>`<button class="chip${delivFilter===s?' active':''}" onclick="setDelivFilter('${s}')">${s}</button>`).join('');
  const filtered=deliveries.filter(d=>delivFilter==='Alle'||d.status===delivFilter);
  const el=document.getElementById('deliv-list');
  if(!filtered.length){ el.innerHTML='<div class="empty">Geen aflewerings nie.</div>'; return; }
  const sc={'Afgelewer':'badge-green','Onderweg':'badge-orange','Gekanselleer':'badge-red','Beplan':'badge-dim'};
  el.innerHTML=filtered.map(d=>{
    const done=(d.stops||[]).filter(s=>s.done).length;
    const total=(d.stops||[]).length;
    const open=expandedItems['deliv_'+d.id];
    return `<div class="deliv-card${d.status==='Onderweg'?' active-route':''}">
      <div class="deliv-head" onclick="toggleExpand('deliv_${d.id}');renderDeliveries()">
        <div class="deliv-icon">🚛</div>
        <div class="deliv-info">
          <div class="deliv-truck">${escH(d.truck)}</div>
          <div class="deliv-meta">${d.driver?d.driver+' · ':''}${d.date?d.date+' · ':''} ${done}/${total} stopsels</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <span class="badge ${sc[d.status]||'badge-dim'}">${d.status}</span>
          <span>${open?'▲':'▼'}</span>
        </div>
      </div>
      <div class="deliv-prog"><div class="deliv-prog-fill" style="width:${total?(done/total*100):0}%"></div></div>
      ${open?`<div class="deliv-detail">
        ${(d.stops||[]).map((s,idx)=>`<div class="deliv-stop${s.done?' done-stop':''}">
          <div class="check-box${s.done?' checked':''}" onclick="toggleDelivStop(${d.id},${s.id})">${s.done?'✓':''}</div>
          <div style="flex:1">
            <div class="stop-seq">Stop ${idx+1}</div>
            <div class="stop-name">${escH(s.customerName)}</div>
            ${s.address?`<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}" target="_blank" class="detail-link">🧭 Navigeer</a>`:''}
            ${s.notes?`<div class="stop-notes-sm">${escH(s.notes)}</div>`:''}
          </div>
        </div>`).join('')}
        ${d.notes?`<div class="detail-notes">${escH(d.notes)}</div>`:''}
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px">
          <select class="status-sel" onchange="updateDelivStatus(${d.id},this.value)">
            ${['Beplan','Onderweg','Afgelewer','Gekanselleer'].map(o=>`<option${d.status===o?' selected':''}>${o}</option>`).join('')}
          </select>
          <button class="icon-btn red sm" onclick="deleteDelivery(${d.id})">🗑</button>
        </div>
      </div>`:''}
    </div>`;
  }).join('');
  // Populate add modal
  const custSel=document.getElementById('dla-stop-cust');
  if(custSel){ custSel.innerHTML='<option value="">-- Kies klant --</option>'+customers.map(c=>`<option value="${c.id}">${escH(c.name)}</option>`).join(''); }
  const tList=document.getElementById('dla-truck-list');
  if(tList){ tList.innerHTML=[...new Set(truckCounts.map(t=>t.name))].map(n=>`<option value="${n}"/>`).join(''); }
  renderDelivStops();
}
function setDelivFilter(f){ delivFilter=f; renderDeliveries(); }
function addDelivStop(){
  const custId=parseInt(document.getElementById('dla-stop-cust').value); if(!custId) return;
  const cust=customers.find(c=>c.id===custId); if(!cust) return;
  newDelivStops.push({id:uid(),customerId:cust.id,customerName:cust.name,address:cust.farm?`${cust.farm}, ${cust.area||''}`:cust.area||'',notes:document.getElementById('dla-stop-notes').value,done:false});
  document.getElementById('dla-stop-notes').value=''; renderDelivStops();
}
function renderDelivStops(){
  const el=document.getElementById('dla-stops'); if(!el) return;
  el.innerHTML=newDelivStops.map((s,i)=>`<div class="stop-row">
    <div class="stop-num">${i+1}</div>
    <div style="flex:1"><div class="stop-name">${escH(s.customerName)}</div>${s.address?`<div style="font-size:12px;color:var(--text3)">${escH(s.address)}</div>`:''}</div>
    <div class="stop-ctrl">
      <button class="icon-btn sm" onclick="moveStop(${i},-1)" ${i===0?'disabled':''}>↑</button>
      <button class="icon-btn sm" onclick="moveStop(${i},1)" ${i===newDelivStops.length-1?'disabled':''}>↓</button>
      <button class="icon-btn red sm" onclick="removeStop(${i})">✕</button>
    </div>
  </div>`).join('');
}
function moveStop(i,d){ const j=i+d; if(j<0||j>=newDelivStops.length) return; [newDelivStops[i],newDelivStops[j]]=[newDelivStops[j],newDelivStops[i]]; renderDelivStops(); }
function removeStop(i){ newDelivStops.splice(i,1); renderDelivStops(); }
function saveDelivery(){
  const truck=document.getElementById('dla-truck').value.trim(); if(!truck||!newDelivStops.length){ alert('Voer vragmotor naam in en voeg stopsels by'); return; }
  deliveries.unshift({id:uid(),truck,driver:document.getElementById('dla-driver').value,date:document.getElementById('dla-date').value,stops:[...newDelivStops],notes:document.getElementById('dla-notes').value,status:'Beplan',createdAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_deliveries',deliveries); newDelivStops=[];
  ['dla-truck','dla-driver','dla-date','dla-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('deliv-add-modal'); renderDeliveries();
}
function toggleDelivStop(delivId,stopId){
  const d=deliveries.find(x=>x.id===delivId); if(!d) return;
  const s=d.stops.find(x=>x.id===stopId); if(!s) return;
  s.done=!s.done; save('v3_deliveries',deliveries); renderDeliveries();
}
function updateDelivStatus(id,st){ const d=deliveries.find(x=>x.id===id); if(d){ d.status=st; save('v3_deliveries',deliveries); renderDeliveries(); } }
function deleteDelivery(id){ if(!confirm('Verwyder hierdie aflewering?')) return; deliveries=deliveries.filter(d=>d.id!==id); save('v3_deliveries',deliveries); renderDeliveries(); }

// ═══════════════════════════════════════════════════════════════
// NOTES
// ═══════════════════════════════════════════════════════════════
const NOTE_TYPES=['Alle','Algemeen','Klant','Voorraad','Vragmotor','Dringend'];
const COLORS=['default','green','orange','blue','red'];
const COLOR_BG={'default':'var(--card)','green':'var(--adim)','orange':'var(--odim)','blue':'var(--bdim)','red':'var(--rdim)'};
const COLOR_BDR={'default':'var(--border)','green':'var(--accent)','orange':'var(--orange)','blue':'var(--blue)','red':'var(--red)'};
function renderNotes(){
  document.getElementById('notes-count').textContent=notes.length;
  document.getElementById('note-chips').innerHTML=NOTE_TYPES.map(t=>`<button class="chip${noteTypeFilter===t?' active':''}" onclick="setNoteFilter('${t}')">${t}</button>`).join('');
  const search=(document.getElementById('note-search')?.value||'').toLowerCase();
  let filtered=notes.filter(n=>{
    const tm=noteTypeFilter==='Alle'||n.type===noteTypeFilter;
    const sm=n.title?.toLowerCase().includes(search)||n.body?.toLowerCase().includes(search);
    return tm&&sm;
  }).sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0));
  const el=document.getElementById('notes-grid');
  if(!filtered.length){ el.innerHTML='<div class="empty" style="grid-column:1/-1">Geen notas nie.</div>'; return; }
  el.innerHTML=filtered.map(n=>`<div class="note-card note-${n.color||'default'}${n.pinned?' pinned':''}">
    <div class="note-top">
      <div class="note-meta">${n.pinned?'📌 ':''}<span class="note-type-tag">${n.type}</span></div>
      <div class="note-acts">
        <button class="icon-btn sm${n.pinned?' accent':''}" onclick="toggleNotePin2(${n.id})" title="Vaspen">📌</button>
        <button class="icon-btn sm" onclick="editNote(${n.id})">✏</button>
        <button class="icon-btn red sm" onclick="deleteNote(${n.id})">🗑</button>
      </div>
    </div>
    ${n.title?`<div class="note-title-text">${escH(n.title)}</div>`:''}
    <div class="note-body-text">${escH(n.body||'')}</div>
    <div class="note-date-text">${n.createdAt||''}</div>
  </div>`).join('');
  // Populate note customer select
  const naCust=document.getElementById('na-cust');
  if(naCust){ naCust.innerHTML='<option value="">-- Koppel aan klant (opsioneel) --</option>'+customers.map(c=>`<option value="${c.id}">${escH(c.name)}</option>`).join(''); }
  // Color picker
  const naColors=document.getElementById('na-colors');
  if(naColors) naColors.innerHTML=COLORS.map(c=>`<div class="cdot cdot-${c}${noteColor===c?' sel':''}" onclick="setNoteColor('${c}')"></div>`).join('');
}
function setNoteFilter(t){ noteTypeFilter=t; renderNotes(); }
function setNoteColor(c){ noteColor=c; renderNotes(); }
function toggleNotePin(){ notePinned=!notePinned; document.getElementById('na-pin-toggle').className='toggle-pill'+(notePinned?' on':''); }
function toggleNotePin2(id){ const n=notes.find(x=>x.id===id); if(n){ n.pinned=!n.pinned; save('v3_notes',notes); renderNotes(); } }
function addNote(){
  const body=document.getElementById('na-body').value.trim();
  const title=document.getElementById('na-title').value.trim();
  if(!title&&!body) return;
  const custId=parseInt(document.getElementById('na-cust').value);
  const cust=customers.find(c=>c.id===custId);
  notes.unshift({id:uid(),title,body,type:document.getElementById('na-type').value,color:noteColor,pinned:notePinned,customerName:cust?.name||'',createdAt:new Date().toLocaleDateString('af-ZA')});
  save('v3_notes',notes); noteColor='default'; notePinned=false;
  document.getElementById('na-pin-toggle').className='toggle-pill';
  ['na-title','na-body'].forEach(x=>document.getElementById(x).value='');
  closeModal('note-add-modal'); renderNotes();
}
function editNote(id){
  const n=notes.find(x=>x.id===id); if(!n) return;
  const title=prompt('Opskrif:',n.title||''); if(title===null) return;
  const body=prompt('Nota teks:',n.body||''); if(body===null) return;
  Object.assign(n,{title,body}); save('v3_notes',notes); renderNotes();
}
function deleteNote(id){ if(!confirm('Verwyder hierdie nota?')) return; notes=notes.filter(n=>n.id!==id); save('v3_notes',notes); renderNotes(); }

// ═══════════════════════════════════════════════════════════════
// WORKERS
// ═══════════════════════════════════════════════════════════════
function renderWorkers(){
  // Summary pills
  document.getElementById('workers-sum').innerHTML=workers.filter(w=>w.active).map(w=>{
    const asgn=assignments[w.id]||[];
    const done=(assignments['done_'+w.id]||[]).filter(d=>asgn.includes(d)).length;
    return `<div class="wpill"><div class="wpill-av">${w.name.charAt(0)}</div><div><div class="wpill-name">${w.name.split(' ')[0]}</div><div class="wpill-prog">${done}/${asgn.length} take</div></div></div>`;
  }).join('');
  const el=document.getElementById('worker-list');
  if(!workers.length){ el.innerHTML='<div class="empty">Geen werknemers nie.</div>'; return; }
  el.innerHTML=workers.map(w=>{
    const open=expandedItems['wk_'+w.id];
    const asgn=assignments[w.id]||[];
    const done=(assignments['done_'+w.id]||[]).filter(d=>asgn.includes(d)).length;
    return `<div class="worker-card${!w.active?' worker-inactive':''}">
      <div class="worker-head" onclick="toggleExpand('wk_${w.id}');renderWorkers()">
        <div class="wk-av">${w.name.split(' ').map(p=>p[0]).join('').slice(0,2)}</div>
        <div class="wk-info">
          <div class="wk-name">${escH(w.name)}</div>
          <div class="wk-role">${escH(w.role||'')}</div>
          <div class="wk-bar"><div class="wk-bar-fill" style="width:${asgn.length?(done/asgn.length*100):0}%"></div></div>
          <div class="wk-task-lbl">${done}/${asgn.length} take gedoen</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          ${!w.active?'<span class="badge badge-dim">Af</span>':''}
          <div style="display:flex;gap:6px">
            <button class="icon-btn sm" onclick="event.stopPropagation();editWorker(${w.id})">✏</button>
            <button class="icon-btn sm" onclick="event.stopPropagation();toggleWorkerActive(${w.id})">${w.active?'✕':'✓'}</button>
            <button class="icon-btn red sm" onclick="event.stopPropagation();deleteWorker(${w.id})">🗑</button>
          </div>
        </div>
      </div>
      ${open?`<div class="wk-detail">
        ${w.phone?`<a href="tel:${w.phone}" class="detail-link">📞 ${escH(w.phone)}</a>`:''}
        ${w.notes?`<div class="detail-notes">${escH(w.notes)}</div>`:''}
        <div class="wk-duties-title">Toegewysde Take Vandag</div>
        ${duties.length===0?'<div style="padding:12px 0;color:var(--text3)">Geen take beskikbaar nie</div>':''}
        ${duties.map(d=>{
          const isAsgn=asgn.includes(d.id);
          const isDone=(assignments['done_'+w.id]||[]).includes(d.id);
          return `<div class="wk-duty-row${isDone?' wk-duty-done-row':''}">
            <div class="small-check${isAsgn?' assigned':''}" onclick="toggleAssign(${w.id},${d.id})">${isAsgn?'✓':'+'}</div>
            <div class="wk-duty-info"><span class="wk-duty-name${!isAsgn?' dimmed':''}">${escH(d.title)}</span><span class="wk-duty-cat">${d.category}</span></div>
            ${isAsgn?`<button class="done-check${isDone?' done':''}" onclick="markDone(${w.id},${d.id})">${isDone?'✅':'⏰'}</button>`:''}
          </div>`;
        }).join('')}
      </div>`:''}
    </div>`;
  }).join('');
}
function toggleAssign(wid,did){
  const k=String(wid);
  const cur=assignments[k]||[];
  assignments[k]=cur.includes(did)?cur.filter(x=>x!==did):[...cur,did];
  save('v3_assignments',assignments); renderWorkers();
}
function markDone(wid,did){
  const k='done_'+wid;
  const cur=assignments[k]||[];
  assignments[k]=cur.includes(did)?cur.filter(x=>x!==did):[...cur,did];
  save('v3_assignments',assignments); renderWorkers();
}
function addWorker(){
  const name=document.getElementById('wa-name').value.trim(); if(!name) return;
  workers.push({id:uid(),name,role:document.getElementById('wa-role').value,phone:document.getElementById('wa-phone').value,notes:document.getElementById('wa-notes').value,active:true});
  save('v3_workers',workers);
  ['wa-name','wa-phone','wa-notes'].forEach(x=>document.getElementById(x).value='');
  closeModal('worker-add-modal'); renderWorkers();
}
function editWorker(id){
  const w=workers.find(x=>x.id===id); if(!w) return;
  const name=prompt('Naam:',w.name); if(name===null) return;
  const notes=prompt('Notas:',w.notes||''); if(notes===null) return;
  Object.assign(w,{name,notes}); save('v3_workers',workers); renderWorkers();
}
function deleteWorker(id){ if(!confirm('Verwyder hierdie werknemer?')) return; workers=workers.filter(w=>w.id!==id); save('v3_workers',workers); renderWorkers(); }
function toggleWorkerActive(id){ const w=workers.find(x=>x.id===id); if(w){ w.active=!w.active; save('v3_workers',workers); renderWorkers(); } }

// ═══════════════════════════════════════════════════════════════
// FEED CALCULATOR
// ═══════════════════════════════════════════════════════════════
const INTAKE_MAP={'Lekke vir Beeste':{mode:'fixed',g:1200},'Lekke vir Verse':{mode:'fixed',g:680},'Lekke vir Bulle (Crash Course)':{mode:'per100',g:550},'Fosfaatlekke (Somer)':{mode:'fixed',g:170},'Fos/Prot-lekke (Herfs)':{mode:'fixed',g:210},'Lekke vir Skape':{mode:'fixed',g:300}};
function getIntake(cat){ return INTAKE_MAP[cat]||{mode:'fixed',g:500}; }
function calcBags(prod,animals,weight,days){
  const intake=getIntake(prod.category);
  const gTotal=intake.mode==='per100'?(intake.g/100)*weight*animals*days:intake.g*animals*days;
  const bagKg=parseInt(prod.unit)||50;
  return{bags:gTotal/(bagKg*1000),gTotal,bagKg,intake};
}
function renderCalcPicker(){
  const s=(document.getElementById('cp-search')?.value||'').toLowerCase();
  document.getElementById('cp-picker').innerHTML=products.filter(p=>p.name.toLowerCase().includes(s)||p.category.toLowerCase().includes(s)).slice(0,40).map(p=>`<button class="picker-item" onclick="addCalcItem(${p.id})"><span class="picker-name">${escH(p.name)}</span><span class="picker-sub">${p.category} · R${getDiscounted(p).toFixed(2)}/${p.unit}</span></button>`).join('');
}
function addCalcItem(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  if(calcItems.find(i=>i.productId===id)){ closeModal('calc-pick-modal'); return; }
  calcItems.push({productId:id,name:p.name,category:p.category,unit:p.unit,price:getDiscounted(p)});
  closeModal('calc-pick-modal'); renderCalc();
}
function removeCalcItem(id){ calcItems=calcItems.filter(i=>i.productId!==id); renderCalc(); }
function renderCalc(){
  const animals=parseInt(document.getElementById('calc-animals')?.value)||100;
  const weight=parseInt(document.getElementById('calc-weight')?.value)||300;
  const days=parseInt(document.getElementById('calc-days')?.value)||30;
  const totalBags=calcItems.reduce((s,i)=>{ const{bags}=calcBags(i,animals,weight,days); return s+Math.ceil(bags); },0);
  const totalCost=calcItems.reduce((s,i)=>{ const{bags}=calcBags(i,animals,weight,days); return s+Math.ceil(bags)*i.price; },0);
  const costPerAnimalDay=animals>0&&days>0?totalCost/(animals*days):0;
  document.getElementById('calc-totals').innerHTML=`
    <div class="calc-total"><div class="calc-total-lbl">Totaal Sakke</div><span class="calc-total-val accent">${totalBags}</span></div>
    <div class="calc-total"><div class="calc-total-lbl">Totale Koste</div><span class="calc-total-val">R${totalCost.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="calc-total"><div class="calc-total-lbl">Koste/Dier/Dag</div><span class="calc-total-val">R${costPerAnimalDay.toFixed(2)}</span></div>`;
  const el=document.getElementById('calc-list');
  if(!calcItems.length){ el.innerHTML='<div class="empty">🧮 Voeg produkte by om die berekening te begin.</div>'; return; }
  el.innerHTML=calcItems.map(item=>{
    const{bags,bagKg,intake}=calcBags(item,animals,weight,days);
    const bagsR=Math.ceil(bags);
    const cost=bagsR*item.price;
    const gPerDay=intake.mode==='per100'?(intake.g/100)*weight:intake.g;
    const intakeDesc=intake.mode==='per100'?`${intake.g}g / 100kg LG / dag`:`${intake.g}g / kop / dag`;
    const open=expandedItems['calc_'+item.productId];
    return `<div class="calc-card">
      <div class="calc-head" onclick="toggleExpand('calc_${item.productId}');renderCalc()">
        <div style="flex:1"><div class="calc-prod-name">${escH(item.name)}</div><div class="calc-prod-cat">${escH(item.category)}</div></div>
        <div class="calc-result">
          <div class="calc-bags">${bagsR} <span>sakke</span></div>
          <div class="calc-cost">R${cost.toFixed(2)}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
          <span>${open?'▲':'▼'}</span>
          <button class="icon-btn red sm" onclick="event.stopPropagation();removeCalcItem(${item.productId})">🗑</button>
        </div>
      </div>
      ${open?`<div class="calc-detail">
        <div class="calc-intake-info">📊 Standaard inname: ${intakeDesc}</div>
        <div class="calc-breakdown">
          <span>${animals} diere</span><span>×</span>
          <span>${Math.round(gPerDay/1000*100)/100}kg/dag</span><span>×</span>
          <span>${days} dae</span><span>=</span>
          <span style="color:var(--accent);font-weight:700">${bagsR} sakke (${bagKg}kg)</span>
        </div>
        <div class="calc-price-line">R${item.price.toFixed(2)} × ${bagsR} sakke = <strong>R${cost.toFixed(2)}</strong></div>
      </div>`:''}
    </div>`;
  }).join('');
}
function exportCalc(){
  const animals=parseInt(document.getElementById('calc-animals')?.value)||100;
  const weight=parseInt(document.getElementById('calc-weight')?.value)||300;
  const days=parseInt(document.getElementById('calc-days')?.value)||30;
  const lines=['LOBOL – Voerberekening',`Datum: ${new Date().toLocaleDateString('af-ZA')}`,`Kudde: ${animals} diere × ${weight}kg × ${days} dae`,'',
    ...calcItems.map(i=>{ const{bags,bagKg}=calcBags(i,animals,weight,days); const br=Math.ceil(bags); return`${i.name} – ${br} sakke (${bagKg}kg) – R${(br*i.price).toFixed(2)}`; }),
    '',`Totaal: ${calcItems.reduce((s,i)=>s+Math.ceil(calcBags(i,animals,weight,days).bags),0)} sakke`,
    `Totale Koste: R${calcItems.reduce((s,i)=>s+Math.ceil(calcBags(i,animals,weight,days).bags)*i.price,0).toLocaleString('af-ZA',{minimumFractionDigits:2})}`];
  dl(lines.join('\n'),'voer_berekening.txt','text/plain');
}

// ═══════════════════════════════════════════════════════════════
// CATTLE GUIDES
// ═══════════════════════════════════════════════════════════════
const SEASONAL=[
  {months:'November – Desember',season:'Piek Somer 🌞',color:'#6fcf47',tasks:['Somer 6 (P6 Foslek) vir droë/dragtige beeste – 130g/kop/dag','Somerfos P12 vir vervangingsverse groeifase – 170g/kop/dag','25 RPM vir lakterende koeie – 1200g/kop/dag','Boost Lick Somer vir spekulasie kalwers (130–180kg) – 550g/100kg LG','Fosfaat stimuleer rumenflora vir maksimum groei op veld','Weiding blaarryk & sag – geen aanvullende proteïen nodig']},
  {months:'Januarie – Februarie',season:'Laat Somer / Vroeë Herfs 🌤️',color:'#e09a3c',tasks:['Somerfos 150 vir droë beeste (weiding pypstadium) – 200g/kop/dag','25 RPM vir koeie met kalwers (Fase 1) – 850–1100g/kop/dag','Crash Course Somer vir spekulasie ossies op groenweiding','Monitor weidingkwaliteit – as weiding verswak, verhoog inname dadelik','Begin dink aan winterstrategie vir Maart/April']},
  {months:'Maart – April',season:'Herfs / Oorgangsperiode 🍂',color:'#e09a3c',tasks:['NPN Fos oorgangslek (27% prot) – 220g/kop/dag – bou kondisie voor winter','50 RPM vir koeie met kalwers (Fase 1 winter) – 1000–1400g/kop/dag','Kalwers begin saam lek vreet ± 2.5 maande – verhoog lek vinnig','Diere moet kondisie opbou voor snerpende koue','Suurveldstreke: pas periodes aan – begin winterlek vroeër']},
  {months:'Mei – Julie',season:'Hoog Winter ❄️',color:'#5ca8e0',tasks:['4x4 Winteronderhoudslek (38% prot) Soetveld – 500g/kop/dag','BURGERS 430 WR (43% prot) Suurveld – 500g/kop/dag','50 RPM vir lakterende koeie tydens koue front – 1200g/kop/dag','Crash Course 250–500kg vir swaarder spekulasie kalwers','Verseker maks bakteriese massa in rumen','Kontroleer kondisiepunt gereeld']},
  {months:'Augustus – Oktober',season:'Laat Winter / Vroeë Lente 🌱',color:'#5ca8e0',tasks:['15 RPM Winterproduksielek (laat winter) – 1200g/kop/dag','SS Lek vir ouer verse (13–18 mnde) – 680g/kop/dag deur winter','Crash Course 100–250kg vir jonger spekulasie kalwers','15 RPM "oortuig" dier van volop somer – keer verlengde interkalfperiode','Begin voorberei vir somerseisoenstrategie teen Oktober']},
];
const BREEDS=[
  {name:'Nguni 🐂',tips:['Uitstekende aanpassingsvermoë – min aanvullende voeding nodig','Gebruik Somerfos en 25 RPM in somer vir optimale kalwers','In winter: 4x4 of 430WR is voldoende','Speengewig gemiddeld 150–180kg – dek verse vroeër (14–16 mnde)','Suurveld-tolerant: gebruik Bovi SOS en BURGERS 430 WR']},
  {name:'Brahman / Simbra 🐄',tips:['Hoë hitte toleransie maar gevoelig vir mineraaltekorte','Fosfaat kritiek – gebruik Somerfos P12 vir beste resultate','Vroeë dekking moontlik (14 mnde) met 50 RPM wintervoeding','Reageer uitstekend op Crash Course lekke vir spekulasie']},
  {name:'Bonsmara 🐂',tips:['Hoë produksiepotentiaal – verdien beter lek kwaliteit (HPK reeks)','25 RPM Somer + 50 RPM Winter vir optimale melkproduksie','Teiken speengewig: 200–230kg met regte lek program','Vervangingsverse: SS Lek + HPK SS Lek vir 330kg @ 16 mnde']},
  {name:'Drakensberger 🐄',tips:['Uitstekend in suurveldstreke – gebruik suurveld spesifieke lekke','Bovi SOS vir speenverse, BURGERS 430 WR vir winter','Goeie melkproduksie – 50 RPM gee beste resultate in winter']},
  {name:'Beefmaster 🐂',tips:['Swaarder rasse – gebruik 250–500kg Crash Course vir spekulasie','Hoë energie behoefte: LOBOL Energielek vir vetmesting op veld','Lakterende koeie produseer ryker melk met 50 RPM']},
];
const DOSAGE=[
  {title:'Lakterende Koeie',rows:[{p:'25 RPM (Somer)',i:'1200g/kop/dag',n:'Optimale melk + herkonsepsie'},{p:'15 RPM (Laat Winter)',i:'1200g/kop/dag',n:'Matige koue / oesreste'},{p:'50 RPM (Winter)',i:'1200g/kop/dag',n:'Koue front / middel winter'}]},
  {title:'Droë / Dragtige Beeste',rows:[{p:'Somer 6 P6 Foslek',i:'130g/kop/dag',n:'Piek somer (Nov–Des)'},{p:'Somerfos 150',i:'200g/kop/dag',n:'Pypstadium weiding (Jan–Feb)'},{p:'NPN Fos',i:'220g/kop/dag',n:'Herfs oorgangslek (Mrt–Apr)'},{p:'4x4 / 430WR',i:'500g/kop/dag',n:'Hoog winter (Mei–Jul)'},{p:'15 RPM',i:'1200g/kop/dag',n:'Laat winter onderhoud'}]},
  {title:'Spekulasie Kalwers & Ossies',rows:[{p:'Boost Lick Somer',i:'550g/100kg LG',n:'130–180kg op groenweiding'},{p:'LOBOL Energielek',i:'550g/100kg LG',n:'180kg+ piek somer'},{p:'Crash Course 100–250kg',i:'550g/100kg LG',n:'Winter / hooi'},{p:'Crash Course 250–500kg',i:'550g/100kg LG',n:'Winter / hooi'}]},
  {title:'Vervangingsverse',rows:[{p:'25 RPM (Fase 1 Somer)',i:'850–1100g/kop/dag',n:'Koei + kalf Jan–Mrt'},{p:'50 RPM (Fase 1 Winter)',i:'1000–1400g/kop/dag',n:'Koei + kalf Apr–Okt'},{p:'Somerfos P12 (Fase 2 Somer)',i:'170g/kop/dag',n:'Groeifase Nov–Des'},{p:'SS Lek (Fase 2 Winter)',i:'680g/kop/dag',n:'Groeifase Jan–Okt'}]},
  {title:'Intensiewe Skaapboerdery – Somer',rows:[{p:'Groenveld Somerproduksielek 23%',i:'300g/kop/dag',n:'Ooi 30 dae voor lam'},{p:'Groenveld Somerproduksielek 23%',i:'350g/kop/dag',n:'Ooi met lam (laktasie)'},{p:'Groenveld Somerproduksielek 23%',i:'230–280g/kop/dag',n:'Algemene produksie / prikkelvoeding'}]},
  {title:'Intensiewe Skaapboerdery – Winter',rows:[{p:'Super ME Winterproduksielek 26%',i:'370g/kop/dag',n:'Ooi 30 dae voor lam'},{p:'Super ME Winterproduksielek 26%',i:'420g/kop/dag',n:'Ooi met lam (laktasie)'},{p:'Super ME Winterproduksielek 26%',i:'280–380g/kop/dag',n:'Algemene produksie / prikkelvoeding'}]},
  {title:'Skaap Lammer Voeding',rows:[{p:'Lamkruip 17%',i:'1.3% van LG/dag',n:'Lam dag 15–60 (vrywillig)'},{p:'GF Lammervolvoer 16%',i:'2.8% van LG/dag',n:'Lam dag 60–110 by moeder'},{p:'GF Lammervolvoer 16%',i:'4.3% van LG/dag',n:'Lam dag 60–110 gespeen'}]},
  {title:'Ekstensiewe Skape & Ram Voorbereiding',rows:[{p:'Somer 6 Fosfaatlek 6%',i:'25g/kop/dag',n:'Eerste 4 maande dragtigheid (somer)'},{p:'LOBOL 2:1:1 Winteronderhoud 28%',i:'100–150g/kop/dag',n:'Eerste 4 maande dragtigheid (winter)'},{p:'Skaapvolvoer',i:'2.5% LG/dag (W) / 2.0% (S)',n:'Ram – kort periode voor dekking'},{p:'Ramvolvoer',i:'2.0% LG/dag (W) / 1.5% (S)',n:'Ram – jong / lang periode voor dekking'}]},
];
let guideTab='kalender';
function switchGuideTab(t){
  guideTab=t;
  ['kalender','ras','dosering'].forEach(x=>{
    document.getElementById('guide-'+x+'-tab').style.display=x===t?'':'none';
    document.getElementById('tab-'+x).className='tab-btn'+(x===t?' active':'');
  });
  renderCattleGuides();
}
function renderCattleGuides(){
  if(guideTab==='kalender'){
    const el=document.getElementById('guide-kalender-tab');
    el.innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Klik op enige maand om die aanbevole lekstrategie te sien.</p>`+
    SEASONAL.map((s,i)=>{
      const open=expandedItems['seas_'+i];
      return `<div class="guide-card" style="margin-bottom:8px;${open?'border-color:'+s.color:''}">
        <button class="guide-header" onclick="toggleExpand('seas_${i}');renderCattleGuides()">
          <span style="color:${s.color};font-size:14px">●</span>
          <span class="guide-title" style="font-size:14px">${s.months} — ${s.season}</span>
          <span>${open?'▲':'▼'}</span>
        </button>
        ${open?`<div class="guide-body"><ul class="gitem-list" style="padding:8px 4px">${s.tasks.map(t=>`<li style="margin-bottom:8px;color:var(--text2);font-size:13px">${t}</li>`).join('')}</ul></div>`:''}
      </div>`;
    }).join('')+`
    <div class="section-title" style="margin-top:16px">Jaarsiklus Oorsig</div>
    <div class="month-bar">${['Nov','Des','Jan','Feb','Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt'].map((m,i)=>{
      const col=i<2?'#6fcf47':i<4?'#e09a3c':i<6?'#e09a3c':i<9?'#5ca8e0':'#6fcf47';
      const phase=i<2?'Piek Somer':i<4?'Laat Somer':i<6?'Herfs':i<9?'Winter':'Lente';
      return `<div class="month-item" style="border-color:${col}"><div class="month-name">${m}</div><div class="month-phase" style="color:${col}">${phase}</div></div>`;
    }).join('')}</div>`;
  } else if(guideTab==='ras'){
    document.getElementById('guide-ras-tab').innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Spesifieke wenke vir gewilde rasse in Suid-Afrika.</p>`+
    BREEDS.map((b,i)=>{
      const open=expandedItems['breed_'+i];
      return `<div class="guide-card" style="margin-bottom:8px">
        <button class="guide-header" onclick="toggleExpand('breed_${i}');renderCattleGuides()">
          <span class="guide-title">${b.name}</span><span>${open?'▲':'▼'}</span>
        </button>
        ${open?`<div class="guide-body"><ul class="gitem-list" style="padding:8px 4px">${b.tips.map(t=>`<li style="margin-bottom:8px;color:var(--text2);font-size:13px">${t}</li>`).join('')}</ul></div>`:''}
      </div>`;
    }).join('');
  } else {
    document.getElementById('guide-dosering-tab').innerHTML=`<p style="font-size:13px;color:var(--text3);margin-bottom:14px">Aanbevole innamesyfers per produk en dierkategorie.</p>`+
    DOSAGE.map(table=>`<div class="dosage-section">
      <div class="dosage-title">${table.title}</div>
      <div class="dosage-wrap"><table class="dosage-table">
        <thead><tr><th>Produk</th><th>Inname</th><th>Notas</th></tr></thead>
        <tbody>${table.rows.map(r=>`<tr><td class="dos-prod">${r.p}</td><td class="dos-intake">${r.i}</td><td class="dos-notes">${r.n}</td></tr>`).join('')}</tbody>
      </table></div>
    </div>`).join('')+`<div class="guide-note" style="margin-top:16px">💡 LG = Lewende Gewig. Alle innamesyfers is riglyne — monitor werklike inname en pas aan vir jou plaas.</div>`;
  }
}

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
// INIT
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// INLIGTING & GIDSE
// ═══════════════════════════════════════════════════════════════
const INFO_CATS = [
  {id:'melkbeeste', label:'Melkbeeste', icon:'🐄'},
  {id:'skape',      label:'Skape',      icon:'🐑'},
  {id:'beeste',     label:'Beeste',     icon:'🐂'},
  {id:'vetmesting', label:'Vetmesting', icon:'🥩'},
  {id:'bulle',      label:'Bulle',      icon:'🐃'},
  {id:'lobol515',   label:'LOBOL 515',  icon:'⭐'},
  {id:'maatskappy', label:'Maatskappy', icon:'🏢'},
  {id:'krediet',    label:'Krediet Aansoek', icon:'📝'},
];

let activInfoCat = 'melkbeeste';
let infoExpanded = {};

const INFO_DATA = {
  melkbeeste: [
    {id:'laktasie',icon:'🥛',title:'305 Dae Laktasie Siklus',blocks:[
      {title:'A. Droë Koeie (Belangrikste Groep)',items:['Rusperiode: 40 dae (min) / 60 dae (maks) | Eerste laktasie: 80 dae','Kondisiepunt by opdroog: 3.5 – BEHOU tot kalwing','Fetale groei = 65% in droë periode – moenie buik met kondisie verwar','Elke 1kg vet verloor = 33 liter melk MINDER oor laktasie','Ketose-tekens: produksiefluktuasie | haarkleed op rug staan regop','Anioniese soute: 21 dae voor kalwing – staak sodra melk begin']},
      {title:'B. Top Groep & Verse Groep',items:['Inname = produksie','Hooilengte NIE korter as 70mm nie','Speeksel (koeksoda) + herkou hou rumen PH 6–6.8','NDF 25–35% | ADF 19–22% | 70% NDF van hooi/grasse','35%+ koeie moet te enige tyd herkou','Piek week 7–10 na kalwing','⭐ 1kg melk hoër piek = ±200 liter MEER oor laktasie','Volwasse koeie vreet ±4% van LG in top produksie']},
      {title:'C. Middel Groep (120–240 dae)',items:['Produksie val ±9%/maand','Temperature bo 24°C onderdruk inname – voer in die nag','1L melk = ±4L water benodig','Voer 20 ure/dag beskikbaar | Kripspasie 70cm/bees']},
      {title:'D. Regmaak Groep & E. Vars in Melk',items:['Regmaak: Skuif op dag 240 – forceer verminderde produksie','Kondisiepunt 3.5 teen einde van siklus','Vars: Propionsuur bevorder maagpapille groei','Beperk mobilisasie = langer produksieplato']},
    ],highlight:'Kondisiepuntsiklus: Kalwing(3.5) → Top Groep(2.9) → Middel(3.2) → Regmaak(3.5) → Droë Periode(3.5)'},
    {id:'verskalwers',icon:'🐮',title:'Grootmaak van Verskalwers',blocks:[
      {title:'Geboorte tot Speen (2 maande) – Kolostrum KRITIEK',items:['Eerste 2L kolostrum BINNE 6 UUR na geboorte – immuniteit oordrag','Kolostrum kan gevries word – verhit tot 39°C voor gebruik','Ontsmet naelstring met jodium | Plaas in droë hok (UV strale steriliseer)','Dag 4–10: 4x1L melk/dag | 18E ad-lib | GEEN HOOI','Dag 25–50: Verminder melk na 5% van geboortegewig – stimuleer meelinname','Dag 51–60: Soggens net 2.5% melk | 18E ad-lib','Speen as kalf 2–2.2% LG in meel vreet','⚠️ NOOIT eerste maand uit emmer – gebruik fopspeen altyd']},
      {title:'Speen tot 3 Maande (±90kg)',items:['Vervang 18E met Kalfgroeimeel 16E ad-lib','Lusernhooi of goeie tefhooi ad-lib','Sodra versie herkou = rumen is funksioneel','Meet borsomtrek + ribspronge vir produksiepotensiaal']},
      {title:'3 tot 6 Maande (±155kg)',items:['Kalfgroeimeel 16E beperk tot 4kg/dag','Weiding + Somer 6 Fosfaatlek ad-lib']},
      {title:'6 tot 12 Maande (±215kg)',items:['Suiwelmeel 15% prot – beperk 3kg/dag','Hawerweiding + Somer 6 ad-lib','Bronstig maar MOENIE insemineer nie']},
      {title:'12 tot 16 Maande (Dekgewig 340kg)',items:['Voerecht 17% – 2.5kg/dag + Somer 6 ad-lib','Waak teen oorvet kondisie','⚠️ Moenie voer totaal onttrek nie – opblaas risiko']},
      {title:'16 Maande tot Kalwing (340–480kg)',items:['Voerecht 17%: 2kg/dag + 1kg geelmeel + tefhooi','Laaste 3 maande: 2.5kg/dag + kuilvoer 4kg/dag','Laaste 2–3 weke: Suiwelmeel + laat gereeld deur melkstal stap']},
    ],
    table:{headers:['Ras','Geboortegewig','Dekgewig','Skofhoogte','Groei/dag','Gewig by kalwing'],rows:[['Holstein','40kg','310–360kg','120–130cm','0.60–0.70 kg/dag','480–510kg'],['Ayrshire','32kg','250–280kg','110–120cm','0.50–0.55 kg/dag','410–430kg'],['Jersey','25kg','205–230kg','100–110cm','0.40–0.45 kg/dag','330–350kg']]},
    warning:'Kondisiepuntdoelwitte: 3mnd=2.2 | 6mnd=2.3 | 9mnd=2.4 | 12mnd=2.8 | 15mnd=2.9 | 18mnd=3.2 | 21mnd=3.4 | 24mnd=3.5 | Ideale kalwingstyd = 24 maande'},
    {id:'bulkalwers_melk',icon:'🐂',title:'Grootmaak van Bulkalwers (Melkras)',blocks:[
      {title:'Geboorte tot 130kg (Speen dag 52)',items:['Eerste 2L kolostrum BINNE 4 UUR na geboorte','Dag 1–3: Kolostrum by moeder','Dag 4–10: 4x1L melk/dag | Bulkalf 0-100 begin | GEEN HOOI | Voeromset 2.2:1','Dag 11–31: 3x1L melk | Bulkalf 0-100 ad-lib | Voeromset 2.4:1','Dag 31–45: 2x1L melk | Bulkalf 0-100 ad-lib','Dag 46–52: 1x1L melk soggens | Bulkalf 0-100 ad-lib + hooi','Speen dag 52 – Teikengewig: 78kg min','⚠️ Siek kalf in eerste 2 maande = ±80kg ligter op 6 maande','Voorsorg: Dectomax 1cc | Enting Paratifus & Pasteurella | Vit A direk na geboorte']},
      {title:'130kg tot 250kg',items:['Bulkalf 100-220 ad-lib + hooi','Aanpassingsperiode: 50% oud + 50% nuut vir 1 week','Ruimte: 8m²/kop | Voeromset: ±4.2:1','Groenweiding: Crash Course Somer | Droë weiding: Crash Course 100–250','Teikengroei: 1.2–1.6kg/dag | Inname: 500g/dag per 100kg LG']},
      {title:'Na 250kg (Voerkraal)',items:['Minimum 1.8kg/dag voor afrond','Semi-volvoer Rom Rev F3 (melkras) / F2 (vleisras)','Voerkrippe ALTYD vol na aanpassing','Leefspasie 10m²/dier | Voeromset ±5.8','Teikengewig 6 maande: ±330kg – vetgradering 2','⚠️ NA 250kg NIE op veldweiding hou nie']},
    ],danger:'Maagwerkings: Salmonella=Advocin+VitB | Dikmelkagtig=Clamoxil+BiosolM | Koksidiose=Sulfamiddel 3dae | Waterig=BiosolM+Phosamine | Lintwurm=Lintex elke 14dae | Respiratories=Nuflor/Mycotil300'},
  ],
  skape: [
    {id:'intensief_skaap',icon:'🐑',title:'Intensiewe Skaapboerdery (Vleis)',blocks:[
      {title:'Ooi 30 Dae Voor Lam – Somer',items:['Groenveld Somerproduksielek 23%','60% van fetale groei in laaste 28 dae dragtigheid','Meerlinge ontwikkel lewenskragtig met korrekte voeding','Inname: ± 300 g/kop/dag']},
      {title:'Ooi met Lam – Somer',items:['Groenveld Somerproduksielek 23%','75% van ooi se melk geproduseer in eerste 8 weke laktasie','Ooi se melk vetinhoud: tot 8%','Inname: ± 350 g/kop/dag']},
      {title:'Ooi voor & met Lam – Winter',items:['Super ME Winterproduksielek 26%','Aminosuur-profiel stimuleer fetale groei','Melkproduksie piek week 3–4 sonder skade aan wolproduksie','Voor lam: ± 370 g/kop/dag | Met lam: ± 420 g/kop/dag']},
      {title:'Lam Dag 15–60 (Somer & Winter)',items:['Lamkruip 17%','Op dag 15: voer vir ooi én lam saam – ooi leer lam om te vreet','Sodra lam vreet: gee net lam toegang','Vrywillige inname: ± 1.3% van lam se lewende gewig','Voorsien ad-lib goeie kwaliteit tefhooi by alle stadiums']},
      {title:'Lam Dag 60–110 (Somer & Winter)',items:['GF Lammervolvoer 16%','Bevat sintetiese aminosure + ingevoerde vette – spesifiek vir enkelmaagdiere','Lammers behoort ± 43 kg te weeg teen dag 60','Inname by moeder: 2.8% LG | Gespeen: 4.3% LG','⚠️ Spuit teen koksidiose + doseer teen melkwurm elke 20 dae']},
    ]},
    {id:'ekstensief_skaap',icon:'🌾',title:'Ekstensiewe Skaapboerdery',blocks:[
      {title:'Supplement Strategie',items:['Somer 6 Fosfaatlek 6% – eerste 4 maande dragtigheid (25g/kop/dag)','Groenveld Somerproduksielek 23% – produksie & prikkelvoeding (230–280g/dag)','LOBOL 2:1:1 Winteronderhoudslek 28% – eerste 4 maande dragtigheid winter (100–150g/dag)','Super ME Winterproduksielek 26% – produksie & prikkelvoeding winter (280–380g/dag)']},
      {title:'Ram Voorbereiding',items:['Kort periode (≤6 weke): Skaapvolvoer – Winter 2.5% LG/dag | Somer 2.0% LG/dag','Langer periode / jong ramme: Ramvolvoer – Winter 2.0% LG/dag | Somer 1.5% LG/dag','⚠️ Ramme moet gereeld geoefen word – vrugbaarheid & skrotum omtrek is kritiek','⚠️ Moenie ramme hanteer (dip/skeer/inent) binne 30 dae voor dekking nie']},
    ]},
    {id:'wolskape',icon:'🧶',title:'Wolskape & Vervangingsooie',blocks:[
      {title:'Wolproduksie Beginsels',items:['Energie + proteïen primêr verantwoordelik vir goeie wolproduksie','Deurvloei proteïen ryk aan swaeldraende aminosure is kritiek','Koper: deel van koënsiem wat wolkwaliteit verseker (treksterkte, kleursorpsie, elastisiteit)','Swael: saam met NPN – optimum swaeldraende mikrobes','Wolproduksie kan tot 28% verminder sonder korrekte byvoeding tydens dragtigheid/laktasie','Voeding het meer direkte invloed op veseldikte as op vesellengte']},
      {title:'Vervangingsooie – Eerste 5 Maande Kritiek',items:['Sonder supplement: 15% minder primêre wol follikels by geboorte','Te min voeding = laer geboortegewig + hoër mortaliteit + swakker wolopbrengs','Lammers kan op 90 dae ouderdom 50% van volwasse gewig bereik','Voedingstekort eerste 5 maande = BLYWENDE skade aan wolpotensiaal','Na 5 maande: voedingstekort = slegs tydelike verlaging (potensiaal bly behooue)','Kruipvoeding by ooie met tweelinge is ekonomies regverdigbaar']},
    ]},
  ],
  beeste: [
    {id:'spekulasie_ossies',icon:'🐂',title:'Spekulasie Kalwers & Ossies',blocks:[
      {title:'Groenveld / Somer',items:['Crash Course Somer 20% – ligte kalwers 130–180kg – 550g/100kg LG','LOBOL Energielek 15% – 180kg+ in piek somer – 550g/100kg LG','⚠️ Swak weiding = inname verhoog drasties – hou dop']},
      {title:'Hooi / Winter',items:['Crash Course 100–250kg 22% – 130–200kg op hooi – 550g/100kg LG','Crash Course 250–500kg 22% – 200kg+ – maksimum spiergroei – 550g/100kg LG','"Crash Course" = produksielek soortgelyk aan kragvoer – minder koste, laer inname']},
    ]},
    {id:'vervangingsverse_bees',icon:'🐄',title:'Uitgroei van Vervangingsverse (Vleisras)',blocks:[
      {title:'Fase 1: Koei met Kalf – Somer (Jan–Mrt)',items:['25 RPM Somerproduksielek 20%','Verbeter melkproduksie drasties','Versies begin vinniger groei wanneer saam lek vreet','Inname: ± 850–1100 g/kop/dag']},
      {title:'Fase 1: Koei met Kalf – Winter (Apr–Okt)',items:['50 RPM Winterproduksielek 26%','Verbeter melk proteïen + vet | Vroeër dekking moontlik','Kalwers begin lek vreet ± 2.5 maande','Inname: ± 1000–1400 g/kop/dag']},
      {title:'Fase 2: Groeifase – Somer (Nov–Des)',items:['Somerfos / P12 Fosfaatlek 15% – stimuleer rumenflora – 170g/kop/dag','Teiken: 330kg @ 16 maande']},
      {title:'Fase 2: Groeifase – Winter (Jan–Okt)',items:['SS Lek 26% – konstante groei sonder vetwording – 680g/kop/dag','Uierontwikkeling word ook gestimuleer']},
    ]},
    {id:'droe_dragtig',icon:'🌿',title:'Droë / Dragtige Beeste (Volwasse)',blocks:[
      {title:'Somer Seisoene',items:['Nov–Des (Piek Somer): Somer 6 P6 Foslek – 130g/kop/dag','Jan–Feb (Pypstadium weiding): Somerfos 15% – 200g/kop/dag','Mrt–Apr (Herfs / Saadstadium): NPN Fos 27% – 220g/kop/dag – bou kondisie voor winter']},
      {title:'Winter',items:['Mei–Jul: 4x4 Onderhoud 38% (Soetveld) of BURGERS 430WR 43% (Suurveld) – 500g/kop/dag','Laat Winter: 15 RPM 26% – keer verlengde interkalfperiode – 1200g/kop/dag']},
    ]},
  ],
  vetmesting: [
    {id:'vetmesting_beeste',icon:'🥩',title:'Vetmesting van Beeste',blocks:[
      {title:'Crashkurs Groenweiding',items:['Crash Course Somer – 130–180kg op blaarryke groenweiding','Energielek – 180kg+ op groenweiding – 550g/100kg LG','HPK weergawes beskikbaar vir beter groei resultate']},
      {title:'Crashkurs Droogte / Hooi',items:['Crash Course 100–250kg – 130–200kg diere op hooi','Crash Course 250–500kg – 200kg+ diere op hooi of droë weiding','Inname 550g/100kg LG – teikengroei 1.2–1.6kg/dag']},
      {title:'Semi-Volvoer Voerkraal',items:['Rom Rev F2 (vleisraskalwers) of Rom Rev F3 (melkraskalwers)','Na aanpassing: voerkrippe altyd vol | Leefspasie 10m²/dier','Voeromset ±5.8 | Teikengewig 6 maande: ±330kg']},
    ]},
    {id:'vetmesting_skape',icon:'🐑',title:'Vetmesting van Skape',blocks:[
      {title:'Lammer Vetmesting',items:['GF Lammervolvoer 16% – dag 60–110 – 2.8% LG (by moeder) / 4.3% (gespeen)','Spuit teen koksidiose + doseer teen melkwurm elke 20 dae','Lammers behoort ±43kg te weeg teen dag 60']},
      {title:'Intensiewe Afrond',items:['Voer ad-lib met goeie kwaliteit tefhooi','Verseker genoeg water beskikbaar','Monitor inname en groei gereeld']},
    ]},
  ],
  bulle: [
    {id:'bulle_voorbereiding',icon:'🐃',title:'Bulle – Voorbereiding en Bestuur',blocks:[
      {title:'Ram Voorbereiding (Skape)',items:['Kort periode ≤6 weke voor dekking: Skaapvolvoer – Winter 2.5% LG/dag | Somer 2.0% LG/dag','Langer periode / eerste keer: Ramvolvoer – Winter 2.0% LG/dag | Somer 1.5% LG/dag','⚠️ Ramme gereeld oefen – vrugbaarheid + skrotum omtrek is KRITIEK','⚠️ Geen hanteer (dip/skeer/inent) 30 dae voor dekking nie']},
      {title:'Bul Voorbereiding (Beeste)',items:['Gebruik HPK lekke vir bulle in die dekseisoen','Kondisiepunt moet goed wees voor dekseisoen','Organiese vitamiene en minerale vir vrugbaarheid is ingesluit in LOBOL lekke','Monitor kondisiepunt deurlopend – magere bulle = swak vrugbaarheid']},
      {title:'Voeding Tydens Paring',items:['Groenveld Somerproduksielek 23% dien ook as prikkelvoeding tydens dekseisoen','Super ME Winterproduksielek 26% dien ook as prikkelvoeding','Verseker optimale voeding vir spermproduksie en vrugbaarheid']},
    ],warning:'Vrugbaarheid en skrotum omtrek is kritiek – kry \'n veekundige om bulle voor die dekseisoen te evalueer'},
  ],
  lobol515: [
    {id:'lobol515_info',icon:'⭐',title:'LOBOL 515 Produksieprogram',blocks:[
      {title:'Wat is LOBOL 515?',items:['LOBOL 515 is \'n spesialis produksieprogramme vir maksimale dierlike prestasie','Gebaseer op dekades van navorsing en praktykervaring in Suid-Afrikaanse toestande','Formuleer vir die spesifieke behoeftes van verskillende dierklasse en seisoene','HPK (Hoë Prestasie Kwaliteit) weergawes beskikbaar vir top resultate']},
      {title:'HPK vs Standaard Produkte',items:['Standaard produkte: geformuleer vir gemiddelde toestande en bekostigbaarheid','HPK produkte: optimale aminosuur-profiel, hoër vette, beste moontlike proteïenbronne','HPK aanbeveel vir: melkkoei afrond, vervangings ooities, hoë-waarde diere','HPK beskikbaar vir: 25/15/50 RPM, Energielek, 4x4, 430WR, SS Lek, Crash Course']},
      {title:'LOBOL Se Formuleringsbeginsel',items:['Elke produk geformuleer vir spesifieke dierklasse, seisoene en produksiedoelwitte','Inname riglyne gebaseer op navorsing – pas aan vir plaas toestande','Proteïenbronne gekies vir aminosuur-kwaliteit, nie net % proteïen nie','Energie deur vette in produksielekke – sinvolle manier om energie te verhoog','Fosfaat: slegs bio-beskikbare vorme gebruik']},
    ],highlight:'Kontak LOBOL se tegniese span vir \'n persoonlike rantsoenplan vir jou plaas'},
  ],
  maatskappy: [
    {id:'maatskappy_info',icon:'🏢',title:'Oor LOBOL',blocks:[
      {title:'Wie is LOBOL?',items:['LOBOL is \'n Suid-Afrikaanse diervoer vervaardigingsbedryf','Spesialiseer in lek- en aanvullingsprodukte vir beeste, skape, melkbeeste en ander diere','Produkte geformuleer deur kundiges met uitgebreide praktiese ervaring','Dek \'n wye reeks van seisoensgebonde produkte – Somer en Winter formuleerings']},
      {title:'Produk Reekse',items:['Lekke vir Beeste – RPM reeks, 4x4, BURGERS 430 WR','Lekke vir Bulle (Crash Course) – 100–250kg en 250–500kg','Lekke vir Verse – SOS, SS Lek reeks','Fosfaatlekke – P6, P12 Somerfos reeks','Lekke vir Skape – Groenveld, Super ME, LOBOL 2:1:1','Suiwel produkte – Voerecht, Kalfaangvangsmeel, Bulkalf reeks','HPK (Hoë Prestasie Kwaliteit) weergawes van alle hoofprodukte']},
      {title:'Kwaliteitsversekering',items:['Slegs beste bio-beskikbare fosfaat word gebruik','Aminosuur-profiel proteïene vir kwaliteit resultate','Produksamestelling geformuleer vir Suid-Afrikaanse toestande','Gereelde navorsing en produk-opdatering']},
    ],highlight:'Kontak ons tegniese span vir voedingsadvies en plaasbesoeke'},
  ],
  krediet: [],
};

function renderInfoAccordion(items, id){
  return items.map((item,i) => {
    const key = id+'_'+i;
    const open = infoExpanded[key];
    return `<div class="info-section">
      <div class="info-section-header" onclick="toggleInfoSection('${key}')">
        <div class="info-section-icon">${item.icon}</div>
        <div class="info-section-title">${item.title}</div>
        <span>${open?'▲':'▼'}</span>
      </div>
      ${open ? `<div class="info-section-body">
        ${item.blocks.map(b=>`
          <div class="info-block">
            <div class="info-block-title">${b.title}</div>
            <ul class="info-list">${b.items.map(li=>`<li>${li}</li>`).join('')}</ul>
          </div>`).join('')}
        ${item.table?`<div class="info-table-wrap"><table class="info-table"><thead><tr>${item.table.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${item.table.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
        ${item.highlight?`<div class="info-highlight">💡 ${item.highlight}</div>`:''}
        ${item.warning?`<div class="info-warning">⚠️ ${item.warning}</div>`:''}
        ${item.danger?`<div class="info-danger">🚨 ${item.danger}</div>`:''}
      </div>` : ''}
    </div>`;
  }).join('');
}

function renderKredietForm(){
  return `<div class="card krediet-form">
    <h3 style="margin-bottom:8px">📝 Krediet Aansoek – LOBOL</h3>
    <p style="font-size:13px;color:var(--text3);margin-bottom:12px">Vul die onderstaande in om \'n krediet aansoek voor te berei. Stoor en druk af vir indiening.</p>
    <div class="krediet-field"><label>Volle Naam / Besigheid Naam</label><input type="text" id="kred-naam" placeholder="Bv. Jan Botha Boerdery"/></div>
    <div class="krediet-field"><label>ID Nommer / Registrasie Nommer</label><input type="text" id="kred-id" placeholder=""/></div>
    <div class="krediet-field"><label>Telefoonnommer</label><input type="tel" id="kred-tel" placeholder="082 xxx xxxx"/></div>
    <div class="krediet-field"><label>E-pos Adres</label><input type="email" id="kred-email" placeholder="naam@plaas.co.za"/></div>
    <div class="krediet-field"><label>Plaas / Streek</label><input type="text" id="kred-plaas" placeholder="Bv. Ermelo, Mpumalanga"/></div>
    <div class="krediet-field"><label>Tipe Boerdery</label>
      <select id="kred-tipe"><option>Beeste</option><option>Skape</option><option>Melkbeeste</option><option>Pluimvee</option><option>Gemengde Boerdery</option><option>Ander</option></select>
    </div>
    <div class="krediet-field"><label>Maandelikse Aankope (geskatte bedrag)</label><input type="text" id="kred-bedrag" placeholder="Bv. R 5 000 / maand"/></div>
    <div class="krediet-field"><label>Kredietlimiet Aangevra</label><input type="text" id="kred-limiet" placeholder="Bv. R 20 000"/></div>
    <div class="krediet-field"><label>Bank Besonderhede (Bank / Rekening naam)</label><input type="text" id="kred-bank" placeholder="Bv. FNB – Jan Botha"/></div>
    <div class="krediet-field"><label>Handtekening / Datum</label><input type="text" id="kred-datum" placeholder="${new Date().toLocaleDateString('af-ZA')}"/></div>
    <div class="krediet-field"><label>Addisionele Notas</label><textarea rows="3" id="kred-notas" placeholder="Enige ander inligting..."></textarea></div>
    <div class="krediet-submit-row">
      <button class="btn btn-primary" onclick="printKrediet()">🖨️ Druk / Stoor as PDF</button>
      <button class="btn btn-secondary" onclick="saveKrediet()">💾 Stoor Aansoek</button>
    </div>
    <div id="kred-saved-msg"></div>
  </div>`;
}

function renderInligting(){
  // Category buttons
  document.getElementById('info-cats').innerHTML = INFO_CATS.map(c=>`
    <button class="info-cat-btn${activInfoCat===c.id?' active':''}" onclick="setInfoCat('${c.id}')">
      <div class="info-cat-icon">${c.icon}</div>
      <div class="info-cat-label">${c.label}</div>
    </button>`).join('');
  // Content
  const area = document.getElementById('info-content-area');
  if(activInfoCat === 'krediet'){
    area.innerHTML = renderKredietForm();
  } else if(activInfoCat === 'lobol515'){
    area.innerHTML = `<div style="text-align:center;margin-bottom:12px"><div class="lobol515-badge">⭐ LOBOL 515</div></div>` + renderInfoAccordion(INFO_DATA.lobol515, 'lobol515');
  } else {
    const items = INFO_DATA[activInfoCat] || [];
    area.innerHTML = items.length ? renderInfoAccordion(items, activInfoCat) : `<div class="empty">Inligting binnekort beskikbaar.</div>`;
  }
}

function setInfoCat(id){ activInfoCat=id; infoExpanded={}; renderInligting(); }
function toggleInfoSection(key){ infoExpanded[key]=!infoExpanded[key]; renderInligting(); }

function printKrediet(){
  const fields = ['kred-naam','kred-id','kred-tel','kred-email','kred-plaas','kred-tipe','kred-bedrag','kred-limiet','kred-bank','kred-datum','kred-notas'];
  const labels = ['Naam','ID Nommer','Telefoon','E-pos','Plaas/Streek','Tipe Boerdery','Maandelikse Aankope','Kredietlimiet','Bank','Datum','Notas'];
  const win = window.open('','_blank');
  win.document.write('<html><head><title>LOBOL Krediet Aansoek</title><style>body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;color:#000}h1{color:#2a6e00}table{width:100%;border-collapse:collapse}td{padding:8px;border-bottom:1px solid #ccc;vertical-align:top}td:first-child{font-weight:bold;width:40%}</style></head><body>');
  win.document.write('<h1>LOBOL – Krediet Aansoek</h1><p>Datum: '+new Date().toLocaleDateString('af-ZA')+'</p><table>');
  fields.forEach((f,i)=>{ win.document.write('<tr><td>'+labels[i]+'</td><td>'+(document.getElementById(f)?.value||'')+'</td></tr>'); });
  win.document.write('</table><br><br><p>Handtekening: _______________________</p></body></html>');
  win.document.close(); win.print();
}

function saveKrediet(){
  const data={};
  ['kred-naam','kred-id','kred-tel','kred-email','kred-plaas','kred-tipe','kred-bedrag','kred-limiet','kred-bank','kred-datum','kred-notas'].forEach(f=>{ data[f]=document.getElementById(f)?.value||''; });
  STORE.set('v3_krediet',data);
  document.getElementById('kred-saved-msg').innerHTML='<div class="import-ok" style="margin-top:8px;padding:8px;border-radius:8px;font-size:12px">✅ Aansoek gestoor!</div>';
}

initTheme();
checkDutyReset();
buildNav();
navTo('dashboard');
setInterval(()=>{ if(currentPage==='dashboard') renderDashboard(); if(currentPage==='reminders') renderReminders(); },60000);
setInterval(()=>{ if(currentPage==='dashboard'&&weatherCache){ weatherCacheTime=0; loadWeather(); } },15*60*1000);