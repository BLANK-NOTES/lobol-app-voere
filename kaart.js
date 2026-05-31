// ═══════════════════════════════════════════════════════════════
// AMERSFOORT KAART — offline radius map (50 / 150 / 250 km)
// Drawn from coordinates (no internet tiles), so it works offline.
// Distances & directions are computed from Amersfoort, Mpumalanga.
// ═══════════════════════════════════════════════════════════════

const AMF = { lat: -27.0167, lon: 29.8667, name: 'Amersfoort' };

// Real coordinates; km + direction are computed, not hard-coded.
const MAP_TOWNS = [
  { name: 'Amersfoort',              lat: -27.0167, lon: 29.8667, prov: 'MP', note: 'LOBOL Fabriek' },
  { name: 'Volksrust',               lat: -27.3667, lon: 29.8833, prov: 'MP', note: '' },
  { name: 'Wakkerstroom',            lat: -27.3500, lon: 30.1500, prov: 'MP', note: '' },
  { name: 'Perdekop',                lat: -27.1833, lon: 29.6333, prov: 'MP', note: '' },
  { name: 'Ermelo',                  lat: -26.5167, lon: 29.9833, prov: 'MP', note: '' },
  { name: 'Standerton',              lat: -26.9333, lon: 29.2333, prov: 'MP', note: '' },
  { name: 'Morgenzon',               lat: -26.7333, lon: 29.6333, prov: 'MP', note: '' },
  { name: 'Newcastle',               lat: -27.7500, lon: 29.9333, prov: 'KZN', note: '' },
  { name: 'Memel',                   lat: -27.6833, lon: 29.5667, prov: 'FS', note: '' },
  { name: 'Vrede',                   lat: -27.4333, lon: 29.1667, prov: 'FS', note: '' },
  { name: 'Piet Retief',             lat: -27.0000, lon: 30.8167, prov: 'MP', note: '' },
  { name: 'Carolina',                lat: -26.0667, lon: 30.1167, prov: 'MP', note: '' },
  { name: 'Bethal',                  lat: -26.4500, lon: 29.4667, prov: 'MP', note: '' },
  { name: 'Secunda',                 lat: -26.5167, lon: 29.1667, prov: 'MP', note: 'Sasol' },
  { name: 'Vryheid',                 lat: -27.7667, lon: 30.7833, prov: 'KZN', note: '' },
  { name: 'Utrecht',                 lat: -27.6500, lon: 30.3333, prov: 'KZN', note: '' },
  { name: 'Dundee',                  lat: -28.1667, lon: 30.2333, prov: 'KZN', note: '' },
  { name: 'Ladysmith',               lat: -28.5500, lon: 29.7833, prov: 'KZN', note: '' },
  { name: 'Harrismith',              lat: -28.2833, lon: 29.1333, prov: 'FS', note: '' },
  { name: 'Bethlehem',               lat: -28.2333, lon: 28.3000, prov: 'FS', note: '' },
  { name: 'Middelburg (MP)',         lat: -25.7667, lon: 29.4667, prov: 'MP', note: '' },
  { name: 'Witbank / eMalahleni',    lat: -25.8833, lon: 29.2333, prov: 'MP', note: '' },
  { name: 'Belfast / eMakhazeni',    lat: -25.6833, lon: 30.0333, prov: 'MP', note: '' },
  { name: 'Johannesburg',            lat: -26.2041, lon: 28.0473, prov: 'GP', note: 'Grootste stad' },
  { name: 'Pretoria / Tshwane',      lat: -25.7461, lon: 28.1881, prov: 'GP', note: '' },
  { name: 'Nelspruit / Mbombela',    lat: -25.4667, lon: 30.9833, prov: 'MP', note: 'Hoofstad MP' },
  { name: 'Vereeniging',             lat: -26.6731, lon: 27.9261, prov: 'GP', note: '' },
  { name: 'Pongola',                 lat: -27.3833, lon: 31.6167, prov: 'KZN', note: '' },
  { name: 'Barberton',               lat: -25.7833, lon: 31.0500, prov: 'MP', note: '' },
  { name: 'Lydenburg / Mashishing',  lat: -25.1000, lon: 30.4500, prov: 'MP', note: '' },
];

const PROV_COLORS = {
  MP: 'var(--accent)', GP: 'var(--blue)', KZN: 'var(--orange)',
  LP: '#9b59b6', FS: '#e67e22', NW: '#1abc9c',
};

const RING_RADII = [50, 150, 250];     // km
let kaartZoom = 250;                    // current outer radius in km

function toRad(d) { return d * Math.PI / 180; }
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function bearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin(toRad(lon2-lon1)) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1))*Math.sin(toRad(lat2)) - Math.sin(toRad(lat1))*Math.cos(toRad(lat2))*Math.cos(toRad(lon2-lon1));
  return (Math.atan2(y, x) * 180/Math.PI + 360) % 360;
}
function compass(b) {
  return ['N','NO','O','SO','S','SW','W','NW'][Math.round(b/45) % 8];
}

// Pre-compute distance / direction / offset (km east, km north) once.
const MAP_DATA = MAP_TOWNS.map(t => {
  const km = Math.round(haversine(AMF.lat, AMF.lon, t.lat, t.lon));
  const dx = (t.lon - AMF.lon) * 111.32 * Math.cos(toRad(AMF.lat)); // km east
  const dy = (t.lat - AMF.lat) * 110.57;                            // km north
  return { ...t, km, dir: km === 0 ? '' : compass(bearing(AMF.lat, AMF.lon, t.lat, t.lon)), dx, dy };
}).sort((a, b) => a.km - b.km);

function buildRadiusSVG(maxKm) {
  const VB = 360, C = VB / 2, R = 168;          // px
  const scale = R / maxKm;                       // px per km
  const rings = RING_RADII.filter(r => r <= maxKm);
  const ringSvg = rings.map(r => {
    const rr = r * scale;
    return `<circle cx="${C}" cy="${C}" r="${rr}" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 4"/>
      <text x="${C}" y="${C - rr + 12}" text-anchor="middle" font-size="10" fill="var(--text3)" font-family="DM Sans,sans-serif">${r}km</text>`;
  }).join('');
  // cross-hairs (N/E/S/W)
  const axes = `<line x1="${C}" y1="${C-R}" x2="${C}" y2="${C+R}" stroke="var(--border)" stroke-width="1" opacity=".4"/>
    <line x1="${C-R}" y1="${C}" x2="${C+R}" y2="${C}" stroke="var(--border)" stroke-width="1" opacity=".4"/>
    <text x="${C}" y="${C-R-3}" text-anchor="middle" font-size="11" fill="var(--text3)">N</text>`;
  const dots = MAP_DATA.filter(t => t.km > 0 && t.km <= maxKm).map(t => {
    const x = C + t.dx * scale, y = C - t.dy * scale;
    const col = PROV_COLORS[t.prov] || 'var(--text3)';
    const short = t.name.split(' ')[0].split('/')[0];
    return `<g class="map-dot" onclick="openTownMap(${t.lat},${t.lon},'${t.name.replace(/'/g,'')}')" style="cursor:pointer">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${col}"/>
      <text x="${(x+6).toFixed(1)}" y="${(y+3).toFixed(1)}" font-size="9" fill="var(--text2)" font-family="DM Sans,sans-serif">${short}</text>
    </g>`;
  }).join('');
  const center = `<circle cx="${C}" cy="${C}" r="6" fill="var(--accent)" stroke="var(--bg)" stroke-width="2"/>
    <text x="${C}" y="${C+20}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)" font-family="DM Sans,sans-serif">Amersfoort</text>`;
  return `<svg viewBox="0 0 ${VB} ${VB}" width="100%" style="display:block;background:var(--bg2)" xmlns="http://www.w3.org/2000/svg">
    ${ringSvg}${axes}${dots}${center}
  </svg>`;
}

function renderKaart() {
  // Offline radius map drawn into the map container (replaces the old iframe)
  const cont = document.getElementById('map-container');
  if (cont) {
    cont.style.height = 'auto';
    cont.innerHTML = buildRadiusSVG(kaartZoom);
  }

  // Zoom buttons (50 / 150 / 250 km)
  const zoomEl = document.getElementById('map-zoom-btns');
  if (zoomEl) {
    zoomEl.innerHTML = RING_RADII.map(r =>
      `<button class="chip${kaartZoom === r ? ' active' : ''}" onclick="setKaartZoom(${r})">${r}km radius</button>`
    ).join('');
  }

  // Town chips (within current radius)
  const townsEl = document.getElementById('map-towns');
  if (townsEl) {
    townsEl.innerHTML = MAP_DATA.filter(t => t.km <= kaartZoom).map(t =>
      `<button class="chip" onclick="openTownMap(${t.lat},${t.lon},'${t.name.replace(/'/g,'')}')"
        style="${t.km === 0 ? 'background:var(--accent);color:#0f1f0f;font-weight:700' : ''}">
        ${t.name} ${t.km > 0 ? `<span style="opacity:.7;font-size:10px">${t.km}km</span>` : '📍'}
      </button>`
    ).join('');
  }

  // Distance cards grouped by ring
  const distEl = document.getElementById('map-distances');
  if (!distEl) return;
  const groups = [
    { label: '📍 Binne 50km',     min: 0,   max: 50 },
    { label: '🚛 50–150km',       min: 51,  max: 150 },
    { label: '🗺️ 150–250km',      min: 151, max: 250 },
    { label: '✈️ Verder as 250km', min: 251, max: 99999 },
  ];
  distEl.innerHTML = groups.map(g => {
    const towns = MAP_DATA.filter(t => t.km >= g.min && t.km <= g.max);
    if (!towns.length) return '';
    return `<div style="margin-bottom:12px">
      <div class="section-title" style="margin-top:8px">${g.label}</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${towns.map(t => `
          <div style="display:flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;cursor:pointer"
            onclick="openTownMap(${t.lat},${t.lon},'${t.name.replace(/'/g,'')}')">
            <div style="width:42px;height:42px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${PROV_COLORS[t.prov] || 'var(--text3)'};flex-shrink:0">${t.prov}</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:14px">${t.name}${t.note ? ` <span style="font-size:11px;color:var(--text3);font-weight:400">– ${t.note}</span>` : ''}</div>
              <div style="font-size:12px;color:var(--text3)">${t.km === 0 ? '📍 LOBOL Fabriek' : t.dir ? `${t.dir} van Amersfoort` : ''}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              ${t.km > 0 ? `<div style="font-size:18px;font-weight:800;font-family:'Syne',sans-serif;color:var(--accent)">${t.km}</div>
              <div style="font-size:10px;color:var(--text3)">km</div>` : '<div style="font-size:20px">📍</div>'}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function setKaartZoom(z) { kaartZoom = z; renderKaart(); }

function openTownMap(lat, lon, name) {
  // Opening Google Maps needs internet; the radius map above is offline.
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
}
