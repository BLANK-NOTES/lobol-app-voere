// ═══════════════════════════════════════════════════════════════
// DATA & STORAGE
// ═══════════════════════════════════════════════════════════════
const STORE = {
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))}
};

// ── DEFAULT PRODUCTS ────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  // ── SUIWEL KONSENTRATE
  {id:45,name:"HPK 255 HE (Somer)",category:"Suiwel",price:362,pricePerTon:7239.89,unit:"50kg sak",description:"Hoë energie suiwelkonsentraat vir somer.",useCase:"Melkbeeste – Somer Konsentraat"},
  {id:46,name:"HPK 335",category:"Suiwel",price:384,pricePerTon:7680.40,unit:"50kg sak",description:"Suiwelkonsentraat HPK 335.",useCase:"Melkbeeste – Konsentraat"},
  {id:47,name:"HPK 460",category:"Suiwel",price:624,pricePerTon:12479.04,unit:"50kg sak",description:"Premium HPK suiwelkonsentraat.",useCase:"Melkbeeste – Premium Konsentraat"},
  {id:48,name:"Voerecht 17%",category:"Suiwel",price:302,pricePerTon:6040.01,unit:"50kg sak",description:"17% proteïen suiwelmeel.",useCase:"Melkbeeste – Suiwelmeel 17%"},
  {id:49,name:"Friesland 19%",category:"Suiwel",price:322,pricePerTon:6439.58,unit:"50kg sak",description:"19% proteïen vir lakterende melkbeeste.",useCase:"Melkbeeste – Suiwelmeel 19%"},
  {id:50,name:"Milkbooster 21% (Kuilvoer)",category:"Suiwel",price:332,pricePerTon:6640.57,unit:"50kg sak",description:"21% proteïen saam met kuilvoer.",useCase:"Melkbeeste – Kuilvoer Aanvulling"},
  {id:51,name:"Suiwel 13% HE (NATAL) NPN Vry",category:"Suiwel",price:297,pricePerTon:5940.41,unit:"50kg sak",description:"13% HE somer suiwelmeel. NPN Vry.",useCase:"Melkbeeste – Somer NATAL"},
  {id:52,name:"Suiwel 15% HE (NATAL) NPN Vry",category:"Suiwel",price:307,pricePerTon:6139.45,unit:"50kg sak",description:"15% HE somer suiwelmeel. NPN Vry.",useCase:"Melkbeeste – Somer NATAL"},
  {id:53,name:"Suiwel 17% HE (NATAL) NPN Vry",category:"Suiwel",price:320,pricePerTon:6399.46,unit:"50kg sak",description:"17% HE somer suiwelmeel. NPN Vry.",useCase:"Melkbeeste – Somer NATAL"},
  {id:54,name:"Fries Volvoer (40kg)",category:"Suiwel",price:251,pricePerTon:6274.56,unit:"40kg sak",description:"Volvoer vir Friese melkkoeie.",useCase:"Melkbeeste – Friese Volvoer"},
  {id:55,name:"Jersey Volvoer (40kg)",category:"Suiwel",price:266,pricePerTon:6651.07,unit:"40kg sak",description:"Volvoer vir Jersey melkkoeie.",useCase:"Melkbeeste – Jersey Volvoer"},
  {id:56,name:"Dry Cow A/C",category:"Suiwel",price:260,pricePerTon:5119.06,unit:"50kg sak",description:"Rantsoen vir droë koeie.",useCase:"Melkbeeste – Droë Koei"},
  {id:57,name:"Dry Cow (Monensin)",category:"Suiwel",price:270,pricePerTon:5399.15,unit:"50kg sak",description:"Droë koei rantsoen met Monensin.",useCase:"Melkbeeste – Droë Koei Monensin"},
  {id:58,name:"Kalfmeel 18E",category:"Suiwel",price:356,pricePerTon:7119.06,unit:"50kg sak",description:"Kalfaangvangsmeel 18E vir verskalwers.",useCase:"Verskalwers – Dag 4 tot Speen"},
  {id:59,name:"Kalfgroeimeel 16E",category:"Suiwel",price:325,pricePerTon:6499.48,unit:"50kg sak",description:"Kalfgroeimeel 16E na speen.",useCase:"Verskalwers – Speen tot 3 Maande"},
  {id:60,name:"HPK Kalfmeel 18E",category:"Suiwel",price:423,pricePerTon:8460.45,unit:"50kg sak",description:"HPK kalfaangvangsmeel 18E.",useCase:"Verskalwers – HPK Dag 4 tot Speen"},
  {id:61,name:"HPK Kalfgroei 16E",category:"Suiwel",price:373,pricePerTon:7459.80,unit:"50kg sak",description:"HPK kalfgroeimeel 16E.",useCase:"Verskalwers – HPK Speen tot 3 Maande"},
  {id:62,name:"Bulkalf (0-100)kg SFM",category:"Suiwel",price:360,pricePerTon:7200.55,unit:"50kg sak",description:"Aanvangsmeel vir bulkalwers 0-100kg.",useCase:"Bulkalwers – 0 tot 100kg"},
  {id:63,name:"Bulkalf (100-220)kg",category:"Suiwel",price:326,pricePerTon:6519.33,unit:"50kg sak",description:"Groeimeel vir bulkalwers 100-220kg.",useCase:"Bulkalwers – 100 tot 220kg"},
  {id:64,name:"HPK Bulkalf (0-100)kg",category:"Suiwel",price:435,pricePerTon:8699.59,unit:"50kg sak",description:"HPK aanvangsmeel vir bulkalwers 0-100kg.",useCase:"Bulkalwers – HPK 0 tot 100kg"},
  {id:65,name:"HPK Bulkalf (100-220)kg",category:"Suiwel",price:375,pricePerTon:7500.69,unit:"50kg sak",description:"HPK groeimeel vir bulkalwers 100-220kg.",useCase:"Bulkalwers – HPK 100 tot 220kg"},
  // ── PLUIMVeE
  {id:66,name:"Layers Early 95",category:"Pluimvee",price:337,pricePerTon:6740.86,unit:"50kg sak",description:"Lêhen voer vir vroeë lêfase.",useCase:"Lêhenne – Vroeg"},
  {id:67,name:"Layers Mid 105",category:"Pluimvee",price:305,pricePerTon:6099.72,unit:"50kg sak",description:"Lêhen voer vir middelfase.",useCase:"Lêhenne – Middel"},
  {id:68,name:"Layers Late 110",category:"Pluimvee",price:302,pricePerTon:6039.94,unit:"50kg sak",description:"Lêhen voer vir laat lêfase.",useCase:"Lêhenne – Laat"},
  {id:69,name:"HPK Layers 105 (Larv) A-H Stress",category:"Pluimvee",price:368,pricePerTon:7359.45,unit:"50kg sak",description:"HPK lêhen voer. Hittestres formule.",useCase:"Lêhenne – HPK Hittestres"},
  // ── VARKE
  {id:70,name:"Varkkruip HAMLET W",category:"Varke",price:632,pricePerTon:12639.95,unit:"50kg sak",description:"Varkkruipvoer HAMLET. Lean meat grower.",useCase:"Varke – Kruipvoeding"},
  {id:71,name:"Speenvark",category:"Varke",price:445,pricePerTon:8899.14,unit:"50kg sak",description:"Speenvark voer.",useCase:"Varke – Speen"},
  {id:72,name:"Varkgroei",category:"Varke",price:316,pricePerTon:6320.43,unit:"50kg sak",description:"Varkgroeivoer.",useCase:"Varke – Groei"},
  {id:73,name:"Lakterende Sog",category:"Varke",price:341,pricePerTon:6820.58,unit:"50kg sak",description:"Voer vir lakterende sogte.",useCase:"Varke – Lakterende Sog"},
  {id:74,name:"Beer & Sog",category:"Varke",price:282,pricePerTon:5639.62,unit:"50kg sak",description:"Onderhoudvoer vir bere en sogte.",useCase:"Varke – Beer & Sog"},
  {id:75,name:"Gilt Grower",category:"Varke",price:321,pricePerTon:6419.97,unit:"50kg sak",description:"Groeivoer vir jong sogte.",useCase:"Varke – Gilt Grower"},
  {id:76,name:"HPK Varkkruip HAMLET W",category:"Varke",price:892,pricePerTon:17840.12,unit:"50kg sak",description:"HPK varkkruipvoer HAMLET.",useCase:"Varke – HPK Kruipvoeding"},
  {id:77,name:"HPK Speenvark",category:"Varke",price:584,pricePerTon:11679.19,unit:"50kg sak",description:"HPK speenvark voer.",useCase:"Varke – HPK Speen"},
  {id:78,name:"HPK Varkgroei",category:"Varke",price:384,pricePerTon:7680.85,unit:"50kg sak",description:"HPK varkgroeivoer.",useCase:"Varke – HPK Groei"},
  {id:79,name:"HPK Lakterende Sog",category:"Varke",price:436,pricePerTon:8719.16,unit:"50kg sak",description:"HPK voer vir lakterende sogte.",useCase:"Varke – HPK Lakterende Sog"},
  {id:80,name:"HPK Beer & Sog",category:"Varke",price:296,pricePerTon:5920.31,unit:"50kg sak",description:"HPK onderhoudvoer vir bere en sogte.",useCase:"Varke – HPK Beer & Sog"},
  {id:81,name:"HPK Gilt Grower",category:"Varke",price:391,pricePerTon:7819.86,unit:"50kg sak",description:"HPK groeivoer vir jong sogte.",useCase:"Varke – HPK Gilt Grower"},
  // ── PERDE
  {id:82,name:"Horse Power",category:"Perde",price:288,pricePerTon:5760.14,unit:"50kg sak",description:"Algemene perdevoer.",useCase:"Perde – Onderhoud"},
  {id:83,name:"Ryperdmeel 12%",category:"Perde",price:272,pricePerTon:5440.02,unit:"50kg sak",description:"Ryperd meel 12% proteïen.",useCase:"Perde – Rydissipline 12%"},
  {id:84,name:"Ryperdmeel 14%",category:"Perde",price:273,pricePerTon:5460.99,unit:"50kg sak",description:"Ryperd meel 14% proteïen.",useCase:"Perde – Rydissipline 14%"},
  {id:85,name:"Perdelek",category:"Perde",price:313,pricePerTon:6260.69,unit:"50kg sak",description:"Minerale lek vir perde.",useCase:"Perde – Minerale Lek"},
  {id:86,name:"Vullens",category:"Perde",price:285,pricePerTon:5699.24,unit:"50kg sak",description:"Voer vir jong perde (vullens).",useCase:"Perde – Vullens"},
  {id:87,name:"Ryperd 13% (Maize Free)",category:"Perde",price:284,pricePerTon:5680.39,unit:"50kg sak",description:"Mielievrye ryperd meel 13%.",useCase:"Perde – Mielievrye Rantsoen"},
  {id:88,name:"FATSUP (25kg)",category:"Perde",price:335,pricePerTon:13400.06,unit:"25kg sak",description:"Vet supplement vir perde.",useCase:"Perde – Vet Aanvulling"},
  // ── ANDER
  {id:89,name:"Volstruis Groei",category:"Ander",price:298,pricePerTon:5960.91,unit:"50kg sak",description:"Groeivoer vir volstruise.",useCase:"Volstruise – Groei"},
  {id:90,name:"Volstruis Broei",category:"Ander",price:314,pricePerTon:6279.64,unit:"50kg sak",description:"Broeivoer vir volstruise.",useCase:"Volstruise – Broei"},
  {id:91,name:"Wildslek",category:"Ander",price:296,pricePerTon:5920.61,unit:"50kg sak",description:"Minerale lek vir wild.",useCase:"Wild – Onderhoud Lek"},
  {id:92,name:"Eland 125 (Wild Volvoer)",category:"Ander",price:314,pricePerTon:6280.83,unit:"50kg sak",description:"Volvoer vir eland en wild.",useCase:"Wild – Eland Volvoer"},
  {id:93,name:"Melkbokke (Saanen) 3L",category:"Ander",price:316,pricePerTon:6319.53,unit:"50kg sak",description:"Voer vir Saanen melkbokke.",useCase:"Melkbokke – Saanen 3L"},
  {id:94,name:"Melassemeel LOBOL (40kg)",category:"Ander",price:160,pricePerTon:4000.58,unit:"40kg sak",description:"Melassemeel aanvulling.",useCase:"Algemeen – Melasse Aanvulling"},
  // ── LEKKE BEESTE HERFS
  {id:95,name:"KV 350 Prod Lick (Compressed Low Intake)",category:"Fos/Prot-lekke (Herfs)",price:334,pricePerTon:6679.78,unit:"50kg sak",description:"Geperste produksielek. Lae inname. Herfs.",useCase:"Beeste – Herfs Produksielek"},
  {id:96,name:"KOJO 20 RPM Prod Lick (Late Summer)",category:"Fos/Prot-lekke (Herfs)",price:305,pricePerTon:6099.92,unit:"50kg sak",description:"20 RPM laat somer produksielek.",useCase:"Beeste – Laat Somer Herfs"},
  {id:97,name:"HPK KOJO 20 RPM (Late Summer)",category:"Fos/Prot-lekke (Herfs)",price:415,pricePerTon:8300.41,unit:"50kg sak",description:"HPK weergawe KOJO 20 RPM laat somer.",useCase:"Beeste – HPK Laat Somer Herfs"},
  // ── LEKKE BEESTE/SKAPE UITGEBREI
  {id:98,name:"LOBOL 3:2 (Bees/Skaap) Onderhoudslek Herfs/Winter",category:"Lekke vir Beeste",price:282,pricePerTon:5639.60,unit:"50kg sak",description:"3:2 onderhoudlek vir beeste en skape.",useCase:"Beeste/Skape – Herfs/Winter Onderhoud"},
  {id:99,name:"LOBOL 515 (Super Konsentraat)",category:"Lekke vir Beeste",price:367,pricePerTon:7340.43,unit:"50kg sak",description:"LOBOL 515 super konsentraat lek.",useCase:"Beeste/Skape – Super Konsentraat"},
  {id:100,name:"LOBOMAX (Groei op Raaigras)",category:"Lekke vir Beeste",price:282,pricePerTon:5640.61,unit:"50kg sak",description:"Groeilek vir beeste op raaigras.",useCase:"Beeste – Raaigras Groei"},
  {id:101,name:"LOBOMAX + 50% Geelmeel (Vetmes op Raaigras)",category:"Lekke vir Beeste",price:269,pricePerTon:5380.31,unit:"50kg sak",description:"Vetmeslek saam met geelmeel op raaigras.",useCase:"Beeste – Raaigras Vetmesting"},
  {id:102,name:"LOBOMILK (Melkproduksie op Raaigras)",category:"Suiwel",price:325,pricePerTon:6499.18,unit:"50kg sak",description:"Melkproduksielek vir koeie op raaigras.",useCase:"Melkbeeste – Raaigras Melkproduksie"},
  {id:103,name:"LOBOL 101 Onderhoudslek (Somer)",category:"Lekke vir Skape",price:274,pricePerTon:5479.00,unit:"50kg sak",description:"Skaap onderhoudslek vir somer.",useCase:"Skape – Somer Onderhoud"},
  {id:104,name:"LOBOL 211 Onderhoudslek (Herfs/Winter)",category:"Lekke vir Skape",price:296,pricePerTon:5919.94,unit:"50kg sak",description:"Skaap onderhoudslek vir herfs en winter.",useCase:"Skape – Herfs Winter Onderhoud"},
  {id:105,name:"SWS Produksielek (Herfs)",category:"Lekke vir Skape",price:322,pricePerTon:6440.16,unit:"50kg sak",description:"Skaap produksielek vir herfs.",useCase:"Skape – Herfs Produksie"},
  {id:106,name:"HPK BB Four All",category:"Lekke vir Skape",price:460,pricePerTon:9200.58,unit:"50kg sak",description:"HPK premium skaap lek. Alle seisoene.",useCase:"Skape – HPK Alle Seisoene"},
  {id:107,name:"SOJALANDLEK (Bees/Skaap)",category:"Lekke vir Beeste",price:262,pricePerTon:5239.85,unit:"50kg sak",description:"Sojaland lek vir beeste en skape.",useCase:"Beeste/Skape – Sojaland"},
  {id:108,name:"MIELIELANDLEK (Bees/Skaap) STR",category:"Lekke vir Beeste",price:336,pricePerTon:6720.38,unit:"50kg sak",description:"Mielieland lek vir beeste en skape.",useCase:"Beeste/Skape – Mielieland"},
  {id:109,name:"Ufag 035 (Ovis Aries) Speen - 9 Maande",category:"Lekke vir Skape",price:365,pricePerTon:7299.64,unit:"50kg sak",description:"Stoetskaap lammers speen tot 9 maande.",useCase:"Stoetskape – Speen tot 9 Maande"},
  {id:110,name:"Ufag 065 (Ovis Aries) 10 Maande - Volwasse",category:"Lekke vir Skape",price:347,pricePerTon:6940.21,unit:"50kg sak",description:"Stoetskape 10 maande tot volwasse.",useCase:"Stoetskape – 10 Maande tot Volwasse"},
  // ── BULLE UITGEBREI
  {id:111,name:"HPK ROM ZB RPM",category:"Lekke vir Bulle (Crash Course)",price:351,pricePerTon:7019.55,unit:"50kg sak",description:"HPK weergawe van ROM ZB RPM kragvoer vir bulle.",useCase:"Bulle – HPK Veiling Voorbereiding"},
  // ── VOERKRAAL UITGEBREI
  {id:112,name:"LOBOL 80:20",category:"Voerkraal",price:268,pricePerTon:5359.41,unit:"50kg sak",description:"LOBOL 80:20 voerkraal konsentraat.",useCase:"Beesvoerkraal – 80:20 Meng"},
  {id:113,name:"LOBOL 300 (HPK)",category:"Voerkraal",price:297,pricePerTon:5939.44,unit:"50kg sak",description:"HPK weergawe van LOBOL 300.",useCase:"Beesvoerkraal – HPK Afronding"},
  {id:114,name:"HPK Silage 375 (Bees Voerkraal)",category:"Voerkraal",price:463,pricePerTon:9259.25,unit:"50kg sak",description:"HPK kuilvoer vetmes konsentraat.",useCase:"Beesvoerkraal – HPK Kuilvoer Vetmes"},
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
  {id:11,title:"Gereedskap skoonmaak",category:"Skoonmaak",priority:"low",notes:"Was en bêre alle gereedskap netjies na gebruik"},
  {id:12,title:"Grondpad hark en skoonmaak",category:"Skoonmaak",priority:"low",notes:"Hark en vee die grondpad skoon – hou toegang netjies"},
  {id:13,title:"Vragmotor diesel kontrole – oggend",category:"Instandhouding",priority:"high",notes:"Kontroleer diesel vlakke op alle vragmotors voor eerste rit van die dag"},
  {id:14,title:"Vragmotor bande kontrole – oggend",category:"Instandhouding",priority:"high",notes:"Kyk alle bande vir lug en skade voor vertrek – oggend roetine"},
  {id:15,title:"Reën kontrole – vandag",category:"Veiligheid",priority:"high",notes:"Kontroleer weersvoorspelling vir vandag – bedek laaie indien nodig"},
  {id:16,title:"Reën kontrole – môre",category:"Veiligheid",priority:"medium",notes:"Kyk weersvoorspelling vir môre – beplan laai skedule dienooreenkomstig"},
  {id:17,title:"Papiere en rommel optel",category:"Skoonmaak",priority:"low",notes:"Loop deur hele fabriek en werf – tel alle papiere en rommel op"},
  {id:18,title:"Vervaldatum kontrole op alle sakke (weekliks)",category:"Voorraad",priority:"high",notes:"Weekliks: loop deur alle sakke en merk enige wat verval het of binnekort verval – Vrydag"},
  {id:19,title:"Volledige fabrieksvoorraad kontrole (weekliks)",category:"Voorraad",priority:"high",notes:"Weekliks: volledige fisiese telling van alle voorraad in die fabriek – Vrydag"},
  {id:20,title:"Pallette van modder skoonmaak",category:"Skoonmaak",priority:"medium",notes:"Spuit en skrop pallette skoon – verwyder alle modder en vuil"},
  {id:21,title:"Hooi bale kontrole – 7 per keer",category:"Voorraad",priority:"medium",notes:"Kontroleer of teffhooi bale ingebring word – 7 bale per slag soos beplan"},
  {id:22,title:"Teffhooi bale kontrole",category:"Voorraad",priority:"medium",notes:"Kontroleer beskikbaarheid van teffhooi bale – rapporteer lae voorraad dadelik"},
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
let infoExpanded = {};

function save(k,v){ STORE.set(k,v); }
function saveAll(){
  save('v3_products',products);save('v3_duties',duties);save('v3_reminders',reminders);
  save('v3_stock',factoryStock);save('v3_trucks',truckCounts);save('v3_customers',customers);
  save('v3_sales',sales);save('v3_deliveries',deliveries);save('v3_notes',notes);
  save('v3_workers',workers);save('v3_priceHistory',priceHistory);save('v3_eieGeel',eieGeelActive);
  save('v3_assignments',assignments);save('v3_dutyDone',dutyDone);
  save('v3_drivers',drivers);save('v3_fleet',fleet);
  save('v3_workerGroups',workerGroups);save('v3_truckHistory',truckHistory);
  save('v3_health',healthRecords);save('v3_studyNotes',studyNotes);
}
function getDiscounted(p,force){ const on=force!==undefined?force:eieGeelActive; return on?Math.max(0,p.price-48):p.price; }
function escH(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function uid(){ return Date.now()+Math.floor(Math.random()*1000); }
// toggleExpand() lives in products.js and toggleInfoSection() in inligting.js
// (the inligting version re-renders). Duplicate copies were removed from here.

// Reset duty done list daily
function checkDutyReset(){
  const today = new Date().toDateString();
  if(dutyDoneDate !== today){ dutyDone=[]; dutyDoneDate=today; save('v3_dutyDone',dutyDone); save('v3_dutyDoneDate',dutyDoneDate); }
}