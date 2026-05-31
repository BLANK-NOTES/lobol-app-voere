// ═══════════════════════════════════════════════════════════════
// weather.js  —  Weather widget (Open-Meteo) + farming alerts
//
// Renders into #weather-widget on the dashboard. Styles live in
// weather.css. renderDashboard() (dashboard.js) calls loadWeather().
// State and helpers below were extracted from dashboard.js so this
// file matches the one-feature-per-file layout (cf. weather.css).
// ═══════════════════════════════════════════════════════════════

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
