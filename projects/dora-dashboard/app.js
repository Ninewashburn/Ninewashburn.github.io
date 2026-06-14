/* DATA */
const TEAMS = [
  { id: 'paris',   name: 'DOTI-Paris',   region: 'EMEA',     color: 'var(--c-paris)',   freq: 45.6, lead: 0.7,   cfr: 2.6,  ttr: 49,   tiers: { freq: 'ELITE',  lead: 'ELITE',  cfr: 'ELITE',  ttr: 'ELITE'  } },
  { id: 'chennai', name: 'DOTI-Chennai', region: 'APAC',     color: 'var(--c-chennai)', freq: 4.8,  lead: 16.8,  cfr: 7.6,  ttr: 328,  tiers: { freq: 'MEDIUM', lead: 'HIGH',   cfr: 'HIGH',   ttr: 'HIGH'   } },
  { id: 'tokyo',   name: 'DOTI-Tokyo',   region: 'APAC',     color: 'var(--c-tokyo)',   freq: 3.0,  lead: 97.8,  cfr: 11.7, ttr: 4928, tiers: { freq: 'MEDIUM', lead: 'MEDIUM', cfr: 'MEDIUM', ttr: 'MEDIUM' } },
  { id: 'atlanta', name: 'DOTI-Atlanta', region: 'AMERICAS', color: 'var(--c-atlanta)', freq: 0.5,  lead: 652.7, cfr: 20.1, ttr: 4479, tiers: { freq: 'LOW',    lead: 'LOW',    cfr: 'LOW',    ttr: 'MEDIUM' } }
];
const METRICS = [
  { key: 'freq', max: 50,   elite: 30, unit: 'dépl/j',  unitEn: 'depl/d' },
  { key: 'lead', max: 700,  elite: 24, unit: 'heures',  unitEn: 'hours'  },
  { key: 'cfr',  max: 25,   elite: 5,  unit: '%',       unitEn: '%'      },
  { key: 'ttr',  max: 5000, elite: 60, unit: 'min',     unitEn: 'min'    }
];

/* I18N */
const I18N = {
  fr: {
    demoLabel: 'DÉMO INTERACTIVE', demoSub: 'données simulées · le projet réel tourne sur Angular 21 + FastAPI', backPortfolio: '← Portfolio',
    perfOps: 'Performance Ops', regionsTeams: 'Régions & Équipes', health: 'Global Service Health',
    title: 'Tableau de bord DORA', subtitle: 'Operational Integrity - Performance logicielle · Multi-régions',
    updated: 'Actualisé il y a', refresh: 'ACTUALISER', measured: 'Mesuré le',
    compare: 'Comparaison des équipes', compareSub: 'Performance relative par métrique DORA',
    overview: "Vue d'ensemble", thTeam: 'Équipe', thRegion: 'Région', thFreq: 'Fréq. déploiement', thLead: 'Délai', thMeasured: 'Mesuré',
    mFreq: 'Fréquence de déploiement', mLead: 'Délai de livraison', mCfr: "Taux d'échec des changements", mTtr: 'Temps de restauration',
    dFreq: 'Fréquence de déploiement en production', dLead: 'Temps entre le commit et le déploiement en production',
    dCfr: "Pourcentage de changements causant des incidents", dTtr: 'Temps de rétablissement après un incident',
    cFreq: 'Fréquence de déploiement (par jour)', cLead: 'Délai de livraison (heures)', cCfr: "Taux d'échec (%)", cTtr: 'Temps de restauration (min)'
  },
  en: {
    demoLabel: 'INTERACTIVE DEMO', demoSub: 'simulated data · real project runs on Angular 21 + FastAPI', backPortfolio: '← Portfolio',
    perfOps: 'Performance Ops', regionsTeams: 'Regions & Teams', health: 'Global Service Health',
    title: 'DORA Dashboard', subtitle: 'Operational Integrity - Software performance · Multi-region',
    updated: 'Updated', refresh: 'REFRESH', measured: 'Measured on',
    compare: 'Team comparison', compareSub: 'Relative performance per DORA metric',
    overview: 'Overview', thTeam: 'Team', thRegion: 'Region', thFreq: 'Deploy frequency', thLead: 'Lead time', thMeasured: 'Measured',
    mFreq: 'Deployment frequency', mLead: 'Lead time for changes', mCfr: 'Change failure rate', mTtr: 'Time to restore',
    dFreq: 'Production deployment frequency', dLead: 'Time from commit to production deployment',
    dCfr: 'Percentage of changes causing incidents', dTtr: 'Recovery time after an incident',
    cFreq: 'Deploy frequency (per day)', cLead: 'Lead time (hours)', cCfr: 'Failure rate (%)', cTtr: 'Time to restore (min)'
  }
};
let lang = 'fr', selected = 'paris', ago = 0;
const t = k => I18N[lang][k] || k;
const fmt = (v, d = 1) => v.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: 0, maximumFractionDigits: d });

/* RENDER */
function renderSidebar() {
  document.getElementById('team-list').innerHTML = TEAMS.map(tm =>
    `<button class="team-btn ${tm.id === selected ? 'active' : ''}" onclick="selectTeam('${tm.id}')">
    ${tm.name}<small>${tm.region}</small></button>`).join('');
}
function renderKpis() {
  const tm = TEAMS.find(x => x.id === selected);
  const defs = [
    { k: 'freq', title: t('mFreq'), desc: t('dFreq'), val: fmt(tm.freq), unit: lang === 'fr' ? 'dépl/j' : 'depl/d' },
    { k: 'lead', title: t('mLead'), desc: t('dLead'), val: fmt(tm.lead), unit: lang === 'fr' ? 'heures' : 'hours' },
    { k: 'cfr',  title: t('mCfr'),  desc: t('dCfr'),  val: fmt(tm.cfr),  unit: '%' },
    { k: 'ttr',  title: t('mTtr'),  desc: t('dTtr'),  val: fmt(tm.ttr, 0), unit: 'min' }
  ];
  document.getElementById('kpis').innerHTML = defs.map(d =>
    `<div class="kpi"><div class="kpi-top"><h3>${d.title}</h3><span class="tier ${tm.tiers[d.k]}">${tm.tiers[d.k]}</span></div>
   <div class="kpi-val">${d.val}<small>${d.unit}</small></div>
   <div class="kpi-desc">${d.desc}</div></div>`).join('');
  document.getElementById('crumb-region').textContent = tm.region;
  document.getElementById('crumb-team').textContent = tm.name;
  const full = Object.values(tm.tiers).every(x => x === 'ELITE');
  document.getElementById('head-elite').classList.toggle('show', full);
  document.getElementById('side-elite').classList.toggle('show', full);
}
function renderCharts() {
  const titles = { freq: t('cFreq'), lead: t('cLead'), cfr: t('cCfr'), ttr: t('cTtr') };
  document.getElementById('charts').innerHTML = METRICS.map(m => {
    const rows = TEAMS.map(tm => {
      const pct = Math.max(1.2, Math.min(100, tm[m.key] / m.max * 100));
      return `<div class="brow"><span class="bl">${tm.name}</span>
      <div class="btrack"><div class="bfill" style="width:0%;background:${tm.color}" data-w="${pct}"></div></div></div>`;
    }).join('');
    const elPct = m.elite / m.max * 100;
    const ticks = [0, .25, .5, .75, 1].map(f => fmt(m.max * f, 0)).map(v => `<span>${v}</span>`).join('');
    return `<div class="chart"><h4>${titles[m.key]}</h4>
    <div class="bars-wrap"><div class="eline" style="left:calc(88px + .6rem + ${elPct}% * ((100% - 88px - .6rem)/100%))"><span>ELITE</span></div>
    <div class="bars">${rows}</div></div>
    <div class="axis"><span></span><div class="ticks">${ticks}</div></div></div>`;
  }).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.bfill').forEach(b => b.style.width = b.dataset.w + '%');
  }));
}
function renderTable() {
  document.getElementById('tbody').innerHTML = TEAMS.map(tm =>
    `<tr class="${tm.id === selected ? 'sel' : ''}" onclick="selectTeam('${tm.id}')">
    <td><b>${tm.name}</b></td><td>${tm.region}</td>
    <td>${fmt(tm.freq)}/j<span class="tier ${tm.tiers.freq}">${tm.tiers.freq}</span></td>
    <td>${fmt(tm.lead)}h<span class="tier ${tm.tiers.lead}">${tm.tiers.lead}</span></td>
    <td>${fmt(tm.cfr)}%<span class="tier ${tm.tiers.cfr}">${tm.tiers.cfr}</span></td>
    <td>${fmt(tm.ttr, 0)}min<span class="tier ${tm.tiers.ttr}">${tm.tiers.ttr}</span></td>
    <td>25/05/2026 00:08 (UTC+2)</td></tr>`).join('');
}
function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.documentElement.lang = lang;
}
function renderAll() { renderSidebar(); renderKpis(); renderCharts(); renderTable(); renderI18n(); }

/* ACTIONS */
function selectTeam(id) { selected = id; renderAll(); }
document.getElementById('lang-sel').addEventListener('change', e => { lang = e.target.value; renderAll(); });
document.getElementById('theme-btn').addEventListener('click', () => {
  const r = document.documentElement;
  const next = r.dataset.theme === 'dark' ? 'light' : 'dark';
  r.dataset.theme = next;
  document.getElementById('theme-btn').textContent = next === 'dark' ? '☀' : '☾';
});
/* léger jitter des 4 métriques pour simuler un flux temps réel */
function nudge() {
  const j = v => v * (0.98 + Math.random() * 0.04);
  TEAMS.forEach(tm => {
    tm.freq = +j(tm.freq).toFixed(1);
    tm.lead = +j(tm.lead).toFixed(1);
    tm.cfr  = +j(tm.cfr).toFixed(1);
    tm.ttr  = Math.round(j(tm.ttr));
  });
  ago = 0;
}

/* refresh manuel : reconstruit tout (barres animées depuis 0) */
document.getElementById('refresh-btn').addEventListener('click', () => { nudge(); renderAll(); });

/* tick live : met à jour les valeurs en place → dérive fluide via la transition CSS */
function liveTick() {
  nudge();
  document.getElementById('ago').textContent = '0';
  renderKpis();
  renderTable();
  const bars = document.querySelectorAll('#charts .bfill');
  let i = 0;
  METRICS.forEach(m => TEAMS.forEach(tm => {
    const b = bars[i++];
    if (b) b.style.width = Math.max(1.2, Math.min(100, tm[m.key] / m.max * 100)) + '%';
  }));
}

/* Flux temps réel : les métriques bougent en continu (avec garde-fous a11y) */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const liveBtn = document.getElementById('live-btn');
let liveTimer = null;
function setLive(on) {
  clearInterval(liveTimer);
  liveTimer = on ? setInterval(() => { if (!document.hidden) liveTick(); }, 3500) : null;
  liveBtn.classList.toggle('on', !!liveTimer);
  liveBtn.setAttribute('aria-pressed', String(!!liveTimer));
}
liveBtn.addEventListener('click', () => setLive(!liveTimer));
reduceMotion.addEventListener('change', e => { if (e.matches) setLive(false); });
// auto-démarrage, sauf si l'utilisateur préfère réduire les animations
setLive(!reduceMotion.matches);
document.getElementById('csv-btn').addEventListener('click', () => {
  const head = 'team;region;deploy_freq_per_day;lead_time_h;cfr_pct;ttr_min';
  const rows = TEAMS.map(tm => [tm.name, tm.region, tm.freq, tm.lead, tm.cfr, tm.ttr].join(';'));
  const blob = new Blob([head + '\n' + rows.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'dora-metrics.csv'; a.click();
});

/* CLOCKS & TIMER */
function clocks() {
  const f = tz => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date());
  document.getElementById('tz-paris').textContent   = f('Europe/Paris');
  document.getElementById('tz-tokyo').textContent   = f('Asia/Tokyo');
  document.getElementById('tz-chennai').textContent = f('Asia/Kolkata');
  document.getElementById('tz-atlanta').textContent = f('America/New_York');
}
setInterval(clocks, 1000); clocks();
setInterval(() => { ago++; document.getElementById('ago').textContent = ago; }, 1000);

renderAll();
