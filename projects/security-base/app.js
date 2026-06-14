/* ═══ SecuriBase - Démo standalone · données fictives en mémoire ═══ */

const DOMAINES = ['Biens & personnes', 'Production', 'Sécurité SI'];
const PUBLICS = ['Usagers', 'Personnels', 'Partenaires'];
const SITES = ['Clermont-Fd', 'Aurillac', 'Le Puy', 'Moulins', 'Centre Nord', 'Centre Sud'];
const GRAVS = ['Faible', 'Moyen', 'Grave', 'Très grave'];
const STATUTS = ['En cours', 'En attente de validation', 'Cloturé'];

const TEMPLATES = {
  'coupure': {
    nom: 'Coupure de courant (3 actions)', objet: 'Coupure de courant',
    actions: ['Réarmer le WIFI', 'Réarmer les barrières', 'Vérifier les ordinateurs'],
    notif: ['equipe@electrique.demo']
  }
};

const ROLES = {
  admin: { name: 'Renaud MEYNADIER', label: 'Administrateur', p: { add: 1, edit: 1, del: 1, validate: 1, archive: 1, diff: 1, gest: 1 } },
  resp: { name: 'Jean MARTIN', label: 'Responsable', p: { add: 1, edit: 1, del: 1, validate: 1, archive: 1 } },
  tech: { name: 'Marie DUBOIS', label: 'Technicien', p: { add: 1, edit: 1 } },
  consult: { name: 'Pierre BERNARD', label: 'Consultant', p: {} }
};

const COLS = [
  { k: 'id', l: 'ID' }, { k: 'objet', l: 'OBJET' }, { k: 'domaines', l: 'DOMAINE' }, { k: 'gravite', l: 'GRAVITÉ' },
  { k: 'statut', l: 'STATUT' }, { k: 'dateOpen', l: 'DATE OUVERTURE' }, { k: 'dateClose', l: 'DATE CLÔTURE' },
  { k: 'afaire', l: 'À FAIRE' }, { k: 'sites', l: 'SITE IMPACTÉ' }, { k: 'national', l: 'NATIONAL' },
  { k: 'redacteur', l: 'RÉDACTEUR' }, { k: 'ticket', l: 'N° TICKET', hide: true }, { k: 'intervenant', l: 'INTERVENANT', hide: true }
];

function I(o) {
  return Object.assign({
    domaines: [], sites: [], publics: PUBLICS.slice(), afaire: false, national: false,
    dateClose: null, intervenant: '-', desc: 'Description de l\'incident (démo).',
    actionsTodo: [], actionsDone: [], indispo: null, notifAuto: [], notifMan: [], deleted: false,
    log: [{ d: o.dateOpen, u: 'Système', a: 'Création de l\'incident' }]
  }, o);
}

function seed() {
  return [
    I({ id: 32, objet: 'Coupure de courant', domaines: DOMAINES.slice(), gravite: 'Moyen', statut: 'En cours', dateOpen: '2026-05-29T12:02', afaire: true, sites: SITES.slice(0, 6), national: true, redacteur: 'Renaud MEYNADIER', intervenant: 'Renaud MEYNADIER', ticket: 'SB-107-48', actionsTodo: ['Réarmer le WIFI', 'Réarmer les barrières'], actionsDone: ['Vérifier les ordinateurs'], indispo: { j: 1, h: 4, m: 21, ctx: 'Coupure secteur bâtiment A' }, notifAuto: ['equipe@electrique.demo'], notifMan: ['test@manuel.demo'] }),
    I({ id: 31, objet: 'Incident manuel', domaines: DOMAINES.slice(), gravite: 'Grave', statut: 'En attente de validation', dateOpen: '2026-05-29T10:30', afaire: true, sites: SITES.slice(0, 6), redacteur: 'Renaud MEYNADIER', ticket: 'SB-107-31' }),
    I({ id: 3, objet: 'Problème connexion Wi-Fi', domaines: ['Sécurité SI'], gravite: 'Moyen', statut: 'Cloturé', dateOpen: '2026-05-26T10:24', dateClose: '2026-05-28T10:24', sites: ['Moulins', 'Centre Nord', 'Centre Sud'], redacteur: 'Marie DUBOIS', ticket: 'SB-644-305', actionsDone: ['Redémarrage des bornes'] }),
    I({ id: 5, objet: 'Coupure électrique générale', domaines: DOMAINES.slice(), gravite: 'Très grave', statut: 'Cloturé', dateOpen: '2026-05-24T11:24', dateClose: '2026-05-26T10:24', sites: ['Clermont-Fd', 'Aurillac', 'Le Puy'], national: true, redacteur: 'Système Administrateur', ticket: 'SB-512-09', indispo: { j: 0, h: 6, m: 30, ctx: 'Incident électrique régional' } }),
    I({ id: 1, objet: 'Panne serveur critique', domaines: ['Sécurité SI', 'Production'], gravite: 'Très grave', statut: 'En cours', dateOpen: '2026-05-07T22:51', afaire: true, sites: ['Aurillac'], redacteur: 'Système Administrateur', ticket: 'SB-001-77', actionsTodo: ['Basculer sur le serveur de secours', 'Analyser les logs'] }),
    I({ id: 24, objet: 'Lenteurs généralisées', domaines: ['Sécurité SI'], gravite: 'Moyen', statut: 'En cours', dateOpen: '2026-05-06T03:59', afaire: true, sites: ['Centre Nord', 'Le Puy'], redacteur: 'Système Administrateur', ticket: 'SB-204-12' }),
    I({ id: 9, objet: 'Accès réseau interrompu', domaines: ['Sécurité SI', 'Production'], gravite: 'Grave', statut: 'En cours', dateOpen: '2026-04-04T10:25', afaire: true, national: true, redacteur: 'Julien DUMAS', ticket: 'SB-090-41' }),
    I({ id: 19, objet: 'Attaque par hameçonnage détectée', domaines: ['Sécurité SI'], gravite: 'Grave', statut: 'En cours', dateOpen: '2026-03-25T02:17', afaire: true, national: true, redacteur: 'Anouk LECLERCQ', ticket: 'SB-190-66', actionsTodo: ['Bloquer le domaine émetteur', 'Alerter les utilisateurs ciblés'] }),
    I({ id: 20, objet: 'Panne serveur critique', domaines: ['Biens & personnes'], gravite: 'Grave', statut: 'En attente de validation', dateOpen: '2026-03-18T11:43', afaire: true, sites: ['Centre Nord', 'Centre Sud'], redacteur: 'Anouk LECLERCQ', ticket: 'SB-200-18' }),
    I({ id: 8, objet: 'Panne serveur critique', domaines: ['Sécurité SI', 'Production'], gravite: 'Très grave', statut: 'Cloturé', dateOpen: '2026-03-07T15:43', dateClose: '2026-03-14T14:24', national: true, redacteur: 'Anouk LECLERCQ', ticket: 'SB-080-55' }),
    I({ id: 22, objet: 'Mise à jour logicielle échouée', domaines: ['Sécurité SI', 'Biens & personnes'], gravite: 'Moyen', statut: 'Cloturé', dateOpen: '2026-03-02T18:15', dateClose: '2026-03-25T02:35', sites: ['Le Puy'], redacteur: 'Pierre BERNARD', ticket: 'SB-220-31' }),
    I({ id: 4, objet: 'Demande changement mot de passe', domaines: ['Sécurité SI'], gravite: 'Faible', statut: 'Archivé', dateOpen: '2026-02-19T11:24', dateClose: '2026-02-21T11:24', sites: ['Moulins', 'Aurillac', 'Clermont-Fd'], redacteur: 'Pierre BERNARD', ticket: 'SB-040-02' }),
    I({ id: 26, objet: 'Accès réseau interrompu', domaines: ['Production', 'Biens & personnes'], gravite: 'Très grave', statut: 'Archivé', dateOpen: '2026-02-16T02:35', dateClose: '2026-02-19T02:06', sites: ['Aurillac', 'Moulins', 'Le Puy'], redacteur: 'Pierre BERNARD', ticket: 'SB-260-90' }),
    I({ id: 15, objet: 'Défaillance système de sauvegarde', domaines: ['Sécurité SI'], gravite: 'Moyen', statut: 'Archivé', dateOpen: '2026-02-13T22:53', dateClose: '2026-02-17T09:35', national: true, redacteur: 'Jean MARTIN', ticket: 'SB-150-44' }),
    I({ id: 23, objet: 'Accès réseau interrompu', domaines: ['Biens & personnes', 'Production'], gravite: 'Très grave', statut: 'Archivé', dateOpen: '2026-01-21T16:36', dateClose: '2026-02-05T12:25', sites: ['Moulins', 'Centre Nord', 'Aurillac'], redacteur: 'Frédéric RENAUD', ticket: 'SB-230-71' }),
    I({ id: 6, objet: 'Attaque par hameçonnage détectée', domaines: ['Biens & personnes'], gravite: 'Faible', statut: 'Archivé', dateOpen: '2026-01-02T14:24', dateClose: '2026-02-09T07:03', sites: ['Centre Sud'], redacteur: 'Jean MARTIN', ticket: 'SB-060-13' }),
    I({ id: 25, objet: 'Mise à jour logicielle échouée', domaines: ['Sécurité SI', 'Production'], gravite: 'Grave', statut: 'Archivé', dateOpen: '2025-12-08T01:16', dateClose: '2025-12-16T04:47', sites: ['Moulins', 'Centre Nord'], redacteur: 'Frédéric RENAUD', ticket: 'SB-250-28' }),
    I({ id: 14, objet: 'Badge d\'accès défectueux', domaines: ['Biens & personnes'], gravite: 'Faible', statut: 'Cloturé', dateOpen: '2026-04-12T09:10', dateClose: '2026-04-12T16:40', sites: ['Clermont-Fd'], redacteur: 'Marie DUBOIS', ticket: 'SB-140-03', deleted: true })
  ];
}

const DIFF_LISTS = {
  validateurs: ['chef.service@demo.fr', 'responsable.securite@demo.fr', 'validateur.incident@demo.fr'],
  perso: { nom: 'Equipe éléctrique', emails: ['equipe@electrique.demo'] },
  metier: { nom: 'Alerte Générale - Très Grave', gravite: 'Très grave', emails: ['direction@demo.fr', 'cossi@demo.fr'] }
};

let state = {
  data: seed(), view: 'main', role: 'admin', search: '',
  cols: new Set(COLS.filter(c => !c.hide).map(c => c.k)),
  adv: {}, advOpen: false, page: 1, per: 10, sort: { k: 'dateOpen', d: -1 }
};

const $ = id => document.getElementById(id);
const perm = () => ROLES[state.role].p;
const esc = s => String(s ?? '').replace(/</g, '&lt;');
const fmtD = iso => iso ? iso.slice(0, 10).split('-').reverse().join('/') : '-';
const fmtDT = iso => iso ? fmtD(iso) + ' ' + iso.slice(11, 16) : '-';
const nowIso = () => new Date().toISOString().slice(0, 16);
const gravCls = g => ({ 'Faible': 'faible', 'Moyen': 'moyen', 'Grave': 'grave', 'Très grave': 'tgrave' })[g];
const statCls = s => ({ 'En cours': 'enc', 'En attente de validation': 'att', 'Cloturé': 'clo', 'Archivé': 'arc' })[s];

/* ── Filtering / sorting ── */
function filtered() {
  let arr = state.data.filter(i => !i.deleted);
  arr = state.view === 'archives' ? arr.filter(i => i.statut === 'Archivé') : arr.filter(i => i.statut !== 'Archivé');
  const q = state.search.trim().toLowerCase();
  if (q) arr = arr.filter(i => (i.objet + ' ' + i.redacteur + ' #' + i.id).toLowerCase().includes(q));
  const a = state.adv;
  if (a.id) arr = arr.filter(i => String(i.id).includes(a.id));
  if (a.objet) arr = arr.filter(i => i.objet.toLowerCase().includes(a.objet.toLowerCase()));
  if (a.dom) arr = arr.filter(i => i.domaines.includes(a.dom));
  if (a.grav) arr = arr.filter(i => i.gravite === a.grav);
  if (a.statut) arr = arr.filter(i => i.statut === a.statut);
  if (a.site) arr = arr.filter(i => i.sites.includes(a.site));
  if (a.red) arr = arr.filter(i => i.redacteur.toLowerCase().includes(a.red.toLowerCase()));
  if (a.from) arr = arr.filter(i => i.dateOpen.slice(0, 10) >= a.from);
  if (a.to) arr = arr.filter(i => i.dateOpen.slice(0, 10) <= a.to);
  const { k, d } = state.sort;
  arr.sort((x, y) => {
    let vx = x[k], vy = y[k];
    if (Array.isArray(vx)) { vx = vx.join(); vy = vy.join(); }
    if (vx === null) vx = ''; if (vy === null) vy = '';
    return (vx > vy ? 1 : vx < vy ? -1 : 0) * d;
  });
  return arr;
}

/* ── Render ── */
function renderAll() { renderPersona(); renderToolbar(); renderCounters(); renderTable(); }

function renderPersona() {
  const r = ROLES[state.role];
  $('persona').textContent = r.name + ' - ' + r.label;
}
function renderToolbar() {
  const p = perm();
  $('btn-add').style.display = p.add ? '' : 'none';
  $('btn-trash').style.display = p.del ? '' : 'none';
  $('btn-diff').style.display = p.diff ? '' : 'none';
  $('btn-gest').style.display = p.gest ? '' : 'none';
}
const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)');
function countTo(el, target) {
  const from = parseInt(el.textContent, 10) || 0;
  if (prefersReduce.matches || from === target) { el.textContent = target; return; }
  const dur = 500, t0 = performance.now();
  function tick(t) {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))); // easeOutCubic
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
function renderCounters() {
  const act = state.data.filter(i => !i.deleted && i.statut !== 'Archivé');
  countTo($('count-total'), act.length);
  countTo($('count-enc'), act.filter(i => i.statut === 'En cours').length);
  countTo($('count-clo'), act.filter(i => i.statut === 'Cloturé').length);
  countTo($('count-att'), act.filter(i => i.statut === 'En attente de validation').length);
}

function renderTable() {
  const vis = COLS.filter(c => state.cols.has(c.k));
  $('thead').innerHTML = '<tr>' + vis.map(c =>
    `<th onclick="setSort('${c.k}')">${c.l} ${state.sort.k === c.k ? '<span class=arr>' + (state.sort.d > 0 ? '↑' : '↓') + '</span>' : ''}</th>`
  ).join('') + '<th>ACTIONS</th></tr>';

  const arr = filtered();
  const start = (state.page - 1) * state.per;
  const page = arr.slice(start, start + state.per);
  const p = perm();

  $('tbody').innerHTML = page.map(i => {
    const cells = vis.map(c => {
      switch (c.k) {
        case 'id': return `<td><b>#${i.id}</b></td>`;
        case 'objet': return `<td>${esc(i.objet)}</td>`;
        case 'domaines': return `<td><div class="chips">${i.domaines.map(d => `<span class="chip-d">${d}</span>`).join('')}</div></td>`;
        case 'gravite': return `<td><span class="grav ${gravCls(i.gravite)}">${i.gravite}</span></td>`;
        case 'statut': return `<td><span class="statut ${statCls(i.statut)}">${i.statut.replace(' de validation', '<br>de validation')}</span></td>`;
        case 'dateOpen': return `<td>${fmtD(i.dateOpen)}<br><small style="color:var(--muted)">${i.dateOpen.slice(11, 16)}</small></td>`;
        case 'dateClose': return `<td>${i.dateClose ? fmtD(i.dateClose) : '-'}</td>`;
        case 'afaire': return `<td class="${i.afaire ? 'afaire-oui' : 'afaire-non'}">${i.afaire ? 'Oui' : 'Non'}</td>`;
        case 'sites': return `<td><div class="chips">${i.sites.slice(0, 4).map(s => `<span class="chip-s">${s}</span>`).join('')}${i.sites.length > 4 ? `<span class="chip-s">+${i.sites.length - 4}</span>` : ''}</div></td>`;
        case 'national': return `<td>${i.national ? '<span class="nat">Oui</span>' : '-'}</td>`;
        case 'redacteur': return `<td>${esc(i.redacteur)}</td>`;
        case 'ticket': return `<td><code>${i.ticket}</code></td>`;
        case 'intervenant': return `<td>${esc(i.intervenant)}</td>`;
      }
    }).join('');
    let acts = '';
    if (i.statut === 'En attente de validation' && p.validate)
      acts += `<button class="act-btn" title="Valider" onclick="event.stopPropagation();validate(${i.id})">✅</button>`;
    if (p.edit) acts += `<button class="act-btn" title="Modifier" onclick="event.stopPropagation();openForm(${i.id})">✏️</button>`;
    if (i.statut === 'Cloturé' && state.view === 'main' && p.archive)
      acts += `<button class="act-btn" title="Archiver" onclick="event.stopPropagation();archive(${i.id})">📥</button>`;
    if (i.statut === 'Archivé' && p.archive)
      acts += `<button class="act-btn" title="Désarchiver" onclick="event.stopPropagation();unarchive(${i.id})">↩️</button>`;
    if (p.del) acts += `<button class="act-btn" title="Supprimer" onclick="event.stopPropagation();trash(${i.id})">🗑️</button>`;
    return `<tr onclick="openDetail(${i.id})">${cells}<td style="white-space:nowrap">${acts || '-'}</td></tr>`;
  }).join('') || `<tr><td colspan="${vis.length + 1}" style="text-align:center;padding:2rem;color:var(--muted)">Aucun incident ne correspond aux critères</td></tr>`;

  $('pag-info').textContent = arr.length ? `${start + 1}-${Math.min(start + state.per, arr.length)} sur ${arr.length}` : '0';
  const nb = Math.max(1, Math.ceil(arr.length / state.per));
  if (state.page > nb) state.page = nb;
  let ph = `<button ${state.page === 1 ? 'disabled' : ''} onclick="state.page--;renderTable()">← Précédent</button>`;
  for (let n = 1; n <= nb; n++) ph += `<button class="${n === state.page ? 'cur' : ''}" onclick="state.page=${n};renderTable()">${n}</button>`;
  ph += `<button ${state.page === nb ? 'disabled' : ''} onclick="state.page++;renderTable()">Suivant →</button>`;
  $('pages').innerHTML = ph;
}

function setSort(k) {
  if (state.sort.k === k) state.sort.d *= -1; else state.sort = { k, d: 1 };
  renderTable();
}

/* ── Actions ── */
function logIt(i, a) { i.log.push({ d: nowIso(), u: ROLES[state.role].name, a }); }
function find(id) { return state.data.find(x => x.id === id); }

function validate(id) {
  const i = find(id); i.statut = 'En cours'; logIt(i, 'Validation de l\'incident');
  toast('✅ Incident #' + id + ' validé', 'ok'); renderAll();
}
function archive(id) {
  const i = find(id); i.statut = 'Archivé'; logIt(i, 'Archivage');
  toast('📥 Incident #' + id + ' archivé', 'ok'); renderAll();
}
function unarchive(id) {
  const i = find(id); i.statut = 'Cloturé'; logIt(i, 'Désarchivage');
  toast('↩ Incident #' + id + ' désarchivé', 'ok'); renderAll();
}
function trash(id) {
  const i = find(id); i.deleted = true; i.deletedAt = nowIso(); logIt(i, 'Mise en corbeille');
  toast('🗑 Incident #' + id + ' déplacé vers la corbeille', 'warn'); renderAll();
}

function toggleArchives() {
  state.view = state.view === 'main' ? 'archives' : 'main'; state.page = 1;
  $('btn-arch').classList.toggle('active', state.view === 'archives');
  $('btn-arch').innerHTML = state.view === 'archives' ? '↩ Quitter archives' : '🗂 Voir archives';
  $('filters-banner').style.display = state.view === 'archives' ? 'flex' : 'none';
  renderTable();
}
function toggleAdv() { state.advOpen = !state.advOpen; $('adv-panel').classList.toggle('open', state.advOpen); }
function advChange() {
  state.adv = {
    id: $('f-id').value, objet: $('f-objet').value, dom: $('f-dom').value, grav: $('f-grav').value,
    statut: $('f-statut').value, site: $('f-site').value, red: $('f-red').value, from: $('f-from').value, to: $('f-to').value
  };
  state.page = 1; renderTable();
}
function advReset() {
  ['f-id', 'f-objet', 'f-dom', 'f-grav', 'f-statut', 'f-site', 'f-red', 'f-from', 'f-to'].forEach(id => $(id).value = '');
  state.adv = {}; state.page = 1; renderTable();
}

/* ── Modal helpers ── */
function openModal(html, wide) {
  $('modal').className = 'modal' + (wide ? ' wide' : '');
  $('modal').innerHTML = '<button class="close" onclick="closeModal()">✕</button>' + html;
  $('overlay').classList.add('open');
}
function closeModal() { $('overlay').classList.remove('open'); }

/* ── Toast ── */
function toast(msg, cls) {
  const t = document.createElement('div'); t.className = 'toast ' + (cls || ''); t.textContent = msg;
  $('toasts').appendChild(t); setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; setTimeout(() => t.remove(), 400) }, 3500);
}

/* ── Form (create / edit) ── */
let T = null;
function openForm(id) {
  const src = id ? find(id) : null;
  T = src ? JSON.parse(JSON.stringify(src)) :
    {
      id: null, objet: '', domaines: [], publics: PUBLICS.slice(), gravite: 'Moyen', statut: 'En cours',
      ticket: 'SB-' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(10 + Math.random() * 90),
      dateOpen: nowIso(), dateClose: null, afaire: true, sites: [], national: false, desc: '',
      actionsTodo: [], actionsDone: [], indispo: { j: 0, h: 0, m: 0, ctx: '' }, notifAuto: [], notifMan: [], deleted: false, log: []
    };
  if (!T.indispo) T.indispo = { j: 0, h: 0, m: 0, ctx: '' };
  openModal(`
    <h2>📝 ${id ? 'Modifier l\'incident #' + id : 'Rapport d\'incident'}</h2>
    <div class="m-sec">
      <h4>Modèle prédéfini</h4>
      <div class="f-grid">
        <div class="fld"><label>Objet prédéfini</label>
          <select id="t-tpl" onchange="applyTpl(this.value)">
            <option value="">Aucun modèle</option>
            <option value="coupure">${TEMPLATES.coupure.nom}</option>
          </select></div>
        <div id="tpl-msg"></div>
      </div>
    </div>
    <div class="m-sec"><h4>Informations de base</h4>
      <div class="f-grid">
        <div class="fld" style="grid-column:1/-1"><label>Objet *</label><input id="t-objet" value="${esc(T.objet)}" placeholder="Décrivez brièvement l'incident..." oninput="T.objet=this.value;prog()"></div>
        <div class="fld"><label>Gravité *</label><select id="t-grav" onchange="T.gravite=this.value">${GRAVS.map(g => `<option ${g === T.gravite ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
        <div class="fld"><label>Statut *</label><select id="t-statut" onchange="T.statut=this.value">${STATUTS.map(s => `<option ${s === T.statut ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
        <div class="fld"><label>N° Ticket</label><input value="${T.ticket}" disabled></div>
        <div class="fld"><label>Date de début</label><input type="datetime-local" value="${T.dateOpen}" onchange="T.dateOpen=this.value"></div>
      </div>
    </div>
    <div class="m-sec"><h4>Domaine(s) *</h4>
      <div class="checks">${DOMAINES.map(d => `<label class="check"><input type="checkbox" ${T.domaines.includes(d) ? 'checked' : ''} onchange="tgArr(T.domaines,'${d}',this.checked);prog()"> ${d}</label>`).join('')}</div>
    </div>
    <div class="m-sec"><h4>Site(s) impacté(s) - <label style="font-weight:400"><input type="checkbox" ${T.national ? 'checked' : ''} onchange="T.national=this.checked"> 📍 Impact national</label></h4>
      <div class="checks">${SITES.map(s => `<label class="check"><input type="checkbox" ${T.sites.includes(s) ? 'checked' : ''} onchange="tgArr(T.sites,'${s}',this.checked)"> ${s}</label>`).join('')}</div>
    </div>
    <div class="m-sec"><h4>Description *</h4>
      <textarea id="t-desc" rows="3" style="width:100%;border:1px solid var(--border);border-radius:8px;padding:.6rem;font-family:inherit;font-size:.82rem;background:var(--panel);color:var(--text)" oninput="T.desc=this.value;prog()">${esc(T.desc)}</textarea>
    </div>
    <div class="m-sec actions-2col">
      <div class="a-box todo"><h5>🕐 Actions à Mener</h5><div id="todo-list"></div>
        <input placeholder="Ajouter une action et appuyer sur Entrée..." onkeydown="if(event.key==='Enter'&&this.value.trim()){T.actionsTodo.push(this.value.trim());this.value='';drawActions()}"></div>
      <div class="a-box done"><h5>✅ Actions Menées</h5><div id="done-list"></div></div>
    </div>
    <div class="m-sec"><h4>⏱ Temps d'indisponibilité du service</h4>
      <div class="f-grid">
        <div class="fld"><label>Jours</label><input type="number" min="0" value="${T.indispo.j}" onchange="T.indispo.j=+this.value"></div>
        <div class="fld"><label>Heures</label><input type="number" min="0" value="${T.indispo.h}" onchange="T.indispo.h=+this.value"></div>
        <div class="fld"><label>Minutes</label><input type="number" min="0" value="${T.indispo.m}" onchange="T.indispo.m=+this.value"></div>
        <div class="fld" style="grid-column:1/-1"><label>Contexte (optionnel)</label><input value="${esc(T.indispo.ctx)}" onchange="T.indispo.ctx=this.value"></div>
      </div>
    </div>
    <div class="m-sec"><h4>📧 Personnes supplémentaires à notifier</h4>
      <div class="email-chips" id="email-chips"></div>
      <input id="t-email" placeholder="email@exemple.fr (Entrée pour ajouter)" style="width:100%;border:1px solid var(--border);border-radius:7px;padding:.45rem .6rem;font-size:.8rem;background:var(--panel);color:var(--text)"
        onkeydown="if(event.key==='Enter'&&this.value.includes('@')){T.notifMan.push(this.value.trim());this.value='';drawEmails()}">
    </div>
    <div class="progress-wrap"><div style="display:flex;justify-content:space-between;font-size:.74rem;margin-bottom:.3rem"><span>Progression du formulaire</span><b id="prog-pct">0%</b></div>
      <div class="progress-bar"><div id="prog-bar" style="width:0%"></div></div></div>
    <div class="m-actions">
      <button class="btn ghost" onclick="closeModal()">✕ Annuler</button>
      <button class="btn primary" onclick="saveForm()">${id ? '💾 Enregistrer les modifications' : '➕ Créer l\'incident'}</button>
    </div>`, true);
  drawActions(); drawEmails(); prog();
}
function tgArr(arr, v, on) { const ix = arr.indexOf(v); if (on && ix < 0) arr.push(v); if (!on && ix >= 0) arr.splice(ix, 1); }
function applyTpl(k) {
  if (!k) { $('tpl-msg').innerHTML = ''; return; }
  const t = TEMPLATES[k];
  T.objet = t.objet; $('t-objet').value = t.objet;
  T.actionsTodo = t.actions.slice(); T.notifAuto = t.notif.slice();
  $('tpl-msg').innerHTML = '<div class="tpl-ok">✓ Modèle appliqué - actions pré-remplies · destinataires : ' + t.notif.join(', ') + '</div>';
  drawActions(); prog();
}
function drawActions() {
  $('todo-list').innerHTML = T.actionsTodo.map((a, ix) =>
    `<div class="a-item"><button onclick="T.actionsTodo.splice(${ix},1);drawActions()" title="Retirer">✕</button> ${esc(a)}
     <button class="mv" title="Marquer comme menée" onclick="T.actionsDone.push(T.actionsTodo.splice(${ix},1)[0]);drawActions()">›</button></div>`).join('') || '<small style="color:var(--muted)">Aucune action</small>';
  $('done-list').innerHTML = T.actionsDone.map((a, ix) =>
    `<div class="a-item"><button class="mv" title="Repasser à mener" onclick="T.actionsTodo.push(T.actionsDone.splice(${ix},1)[0]);drawActions()">‹</button> ✓ ${esc(a)}
     <button style="margin-left:auto" onclick="T.actionsDone.splice(${ix},1);drawActions()">✕</button></div>`).join('') || '<small style="color:var(--muted)">Aucune action menée</small>';
}
function drawEmails() {
  $('email-chips').innerHTML =
    T.notifAuto.map(e => `<span class="echip">🔒 ${e}</span>`).join('') +
    T.notifMan.map((e, ix) => `<span class="echip green">${e} <button onclick="T.notifMan.splice(${ix},1);drawEmails()">✕</button></span>`).join('');
}
function prog() {
  let n = 0; if (T.objet.trim()) n++; if (T.domaines.length) n++; if (T.desc.trim()) n++; if (T.sites.length || T.national) n++;
  const pct = Math.round(n / 4 * 100);
  $('prog-pct').textContent = pct + '%'; $('prog-bar').style.width = pct + '%';
}
function saveForm() {
  if (!T.objet.trim() || !T.domaines.length) { toast('⚠ Objet et au moins un domaine requis', 'warn'); return; }
  if (T.statut === 'Cloturé' && !T.dateClose) T.dateClose = nowIso();
  if (T.id === null) {
    T.id = Math.max(...state.data.map(i => i.id)) + 1;
    T.redacteur = ROLES[state.role].name; T.intervenant = ROLES[state.role].name;
    T.log = [{ d: nowIso(), u: T.redacteur, a: 'Création de l\'incident' }];
    state.data.unshift(T);
    toast('➕ Incident #' + T.id + ' créé', 'ok');
    if (['Grave', 'Très grave'].includes(T.gravite))
      setTimeout(() => toast('✉ Notification envoyée aux validateurs (' + DIFF_LISTS.validateurs.length + ') + ' + (T.notifAuto.length + T.notifMan.length) + ' destinataire(s)', 'mail'), 400);
  } else {
    const ix = state.data.findIndex(i => i.id === T.id);
    T.log.push({ d: nowIso(), u: ROLES[state.role].name, a: 'Modification de l\'incident' });
    state.data[ix] = T;
    toast('💾 Incident #' + T.id + ' mis à jour', 'ok');
  }
  closeModal(); renderAll();
}

/* ── Detail ── */
function openDetail(id) {
  const i = find(id); const p = perm();
  const tot = i.notifAuto.length + i.notifMan.length;
  openModal(`
    <h2>Incident #${i.id} <span style="font-weight:400;font-size:.85rem;color:var(--muted)">- ${esc(i.objet)}</span></h2>
    <div style="display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap">
      ${p.edit ? `<button class="btn primary" onclick="closeModal();openForm(${i.id})">✏ Modifier</button>` : ''}
      <button class="btn red" onclick="exportPdfOne(${i.id})">📄 Export PDF</button>
    </div>
    <div class="tabs"><button class="on" onclick="dTab(this,'d-det')">📄 Détails de l'incident</button>
      <button onclick="dTab(this,'d-log')">🕐 Journal des modifications (${i.log.length})</button></div>
    <div id="d-det">
      <div class="d-grid" style="margin-bottom:1rem">
        <div><b>Statut</b><span class="statut ${statCls(i.statut)}">${i.statut}</span></div>
        <div><b>Gravité</b><span class="grav ${gravCls(i.gravite)}">${i.gravite}</span></div>
        <div><b>Date d'ouverture</b>${fmtDT(i.dateOpen)}</div>
        <div><b>Date de clôture</b>${fmtDT(i.dateClose)}</div>
        <div><b>Domaines</b>${i.domaines.join(', ') || '-'}</div>
        <div><b>Sites impactés</b>${i.sites.join(', ') || '-'} ${i.national ? '· <span class="nat">National</span>' : ''}</div>
        <div><b>N° Ticket</b><code>${i.ticket}</code></div>
        <div><b>Rédacteur</b>${esc(i.redacteur)}</div>
        <div><b>À faire</b>${i.afaire ? 'Oui' : 'Non'}</div>
      </div>
      <div class="m-sec"><h4>Description</h4><p style="font-size:.84rem">${esc(i.desc)}</p></div>
      <div class="m-sec actions-2col">
        <div class="a-box todo"><h5>🕐 Actions à Mener</h5>${i.actionsTodo.map(a => `<div class="a-item">• ${esc(a)}</div>`).join('') || '<small style="color:var(--muted)">Aucune</small>'}</div>
        <div class="a-box done"><h5>✅ Actions Menées</h5>${i.actionsDone.map(a => `<div class="a-item">✓ ${esc(a)}</div>`).join('') || '<small style="color:var(--muted)">Aucune</small>'}</div>
      </div>
      ${i.indispo && (i.indispo.j || i.indispo.h || i.indispo.m) ? `<div class="indispo m-sec">⏱ <b>Temps d'indisponibilité :</b> ${i.indispo.j} jour(s) ${i.indispo.h} heure(s) ${i.indispo.m} minute(s)${i.indispo.ctx ? ' - ' + esc(i.indispo.ctx) : ''}</div>` : ''}
      <div class="m-sec"><h4>📧 Destinataires des notifications - ${tot} total</h4>
        <div class="email-chips">
          ${i.notifAuto.map(e => `<span class="echip">🔒 ${e} <small>(via modèle)</small></span>`).join('')}
          ${i.notifMan.map(e => `<span class="echip green">${e} <small>(manuel)</small></span>`).join('')}
          ${tot === 0 ? '<small style="color:var(--muted)">Aucun destinataire personnalisé</small>' : ''}
        </div></div>
    </div>
    <div id="d-log" style="display:none">
      ${i.log.slice().reverse().map(l => `<div class="log-item"><span class="d">${fmtDT(l.d)}</span><b>${esc(l.u)}</b><span>${esc(l.a)}</span></div>`).join('')}
    </div>`, true);
}
function dTab(btn, id) {
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  $('d-det').style.display = id === 'd-det' ? '' : 'none';
  $('d-log').style.display = id === 'd-log' ? '' : 'none';
}

/* ── Corbeille ── */
function openTrash() {
  const del = state.data.filter(i => i.deleted);
  openModal(`
    <h2>🗑 Corbeille des Incidents <span style="font-size:.8rem;font-weight:400;color:var(--muted)">- ${del.length} incident(s) restaurables</span></h2>
    ${del.map(i => `
      <div class="dif-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
          <div><b>#${i.id} - ${esc(i.objet)}</b><br>
            <span class="grav ${gravCls(i.gravite)}" style="font-size:.65rem">${i.gravite}</span>
            <small style="color:var(--muted)"> · supprimé le ${fmtDT(i.deletedAt)} · créé le ${fmtDT(i.dateOpen)}</small></div>
          <div style="display:flex;gap:.5rem">
            <button class="btn green" onclick="restore(${i.id})">↩ Restaurer</button>
            <button class="btn red" onclick="killForever(${i.id})">🗑 Supprimer définitivement</button>
          </div>
        </div>
      </div>`).join('') || '<p style="color:var(--muted);font-size:.85rem">La corbeille est vide.</p>'}
    <p style="font-size:.74rem;color:#D97706;margin-top:.8rem">⚠ Les incidents peuvent être restaurés ou supprimés définitivement</p>`);
}
function restore(id) {
  const i = find(id); i.deleted = false; logIt(i, 'Restauration depuis la corbeille');
  toast('↩ Incident #' + id + ' restauré', 'ok'); openTrash(); renderAll();
}
function killForever(id) {
  state.data = state.data.filter(i => i.id !== id);
  toast('🗑 Incident #' + id + ' supprimé définitivement', 'warn'); openTrash(); renderAll();
}

/* ── Colonnes ── */
function openCols() {
  openModal(`
    <h2>🔧 Gestion des colonnes</h2>
    ${COLS.map(c => `<div style="display:flex;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid var(--border);font-size:.84rem">
      <span>${c.l}</span>
      <button class="btn ghost" style="padding:.2rem .8rem;font-size:.74rem;color:${state.cols.has(c.k) ? '#DC2626' : '#2563EB'}"
        onclick="toggleCol('${c.k}')">${state.cols.has(c.k) ? 'Masquer' : 'Afficher'}</button></div>`).join('')}
    <div class="m-actions"><button class="btn ghost" onclick="resetCols()">Réinitialiser par défaut</button></div>`);
}
function toggleCol(k) { state.cols.has(k) ? state.cols.delete(k) : state.cols.add(k); openCols(); renderTable(); }
function resetCols() { state.cols = new Set(COLS.filter(c => !c.hide).map(c => c.k)); openCols(); renderTable(); }

/* ── Exports ── */
function openExport(kind) {
  const arr = filtered(); const all = state.data.filter(i => !i.deleted);
  const y = all.filter(i => i.dateOpen.startsWith('2026'));
  openModal(`
    <h2>${kind === 'xlsx' ? '📊 Export Excel' : '📄 Export PDF'}</h2>
    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:.6rem .9rem;font-size:.8rem;margin-bottom:1rem">
      ℹ État actuel : <b>${all.length} incident(s)</b> total dans la base</div>
    <div class="m-sec"><h4>Période d'export</h4>
      <label class="check" style="margin-bottom:.4rem"><input type="radio" name="exp" value="cur" checked> Incidents actuellement affichés - ${arr.length} incident(s)</label>
      <label class="check" style="margin-bottom:.4rem"><input type="radio" name="exp" value="all"> Tous les incidents - ${all.length} incident(s) depuis le début</label>
      <label class="check"><input type="radio" name="exp" value="year"> Année en cours (2026) - ${y.length} incident(s)</label>
    </div>
    <div style="background:var(--bg);border-radius:8px;padding:.7rem .9rem;font-size:.78rem">
      <b>Résumé :</b> Format ${kind === 'xlsx' ? 'CSV (Excel)' : 'PDF'} · Période selon sélection</div>
    <div class="m-actions">
      <button class="btn ghost" onclick="closeModal()">Annuler</button>
      <button class="btn ${kind === 'xlsx' ? 'green' : 'red'}" onclick="doExport('${kind}')">${kind === 'xlsx' ? '📊 Exporter Excel' : '📄 Exporter PDF'}</button>
    </div>`);
}
function expSet() {
  const v = document.querySelector('input[name=exp]:checked').value;
  if (v === 'cur') return filtered();
  if (v === 'year') return state.data.filter(i => !i.deleted && i.dateOpen.startsWith('2026'));
  return state.data.filter(i => !i.deleted);
}
function doExport(kind) {
  const arr = expSet();
  if (kind === 'xlsx') {
    const head = 'id;objet;domaines;gravite;statut;date_ouverture;date_cloture;a_faire;sites;national;redacteur;ticket';
    const rows = arr.map(i => [i.id, '"' + i.objet + '"', '"' + i.domaines.join(', ') + '"', i.gravite, i.statut, fmtDT(i.dateOpen), fmtDT(i.dateClose), i.afaire ? 'Oui' : 'Non', '"' + i.sites.join(', ') + '"', i.national ? 'Oui' : 'Non', i.redacteur, i.ticket].join(';'));
    const blob = new Blob(['\ufeff' + head + '\n' + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'incidents-securibase.csv'; a.click();
    toast('📊 Export CSV de ' + arr.length + ' incident(s) téléchargé', 'ok');
  } else { printTable(arr); }
  closeModal();
}
function printTable(arr) {
  $('print-area').innerHTML = `<h1>SecuriBase - Export des incidents</h1>
    <p>Généré le ${fmtDT(nowIso())} · ${arr.length} incident(s) · Document démo, données fictives</p>
    <table><tr><th>ID</th><th>Objet</th><th>Gravité</th><th>Statut</th><th>Ouverture</th><th>Clôture</th><th>Sites</th><th>Rédacteur</th></tr>
    ${arr.map(i => `<tr><td>#${i.id}</td><td>${esc(i.objet)}</td><td>${i.gravite}</td><td>${i.statut}</td><td>${fmtDT(i.dateOpen)}</td><td>${fmtDT(i.dateClose)}</td><td>${i.sites.join(', ')}</td><td>${esc(i.redacteur)}</td></tr>`).join('')}
    </table>`;
  window.print();
}
function exportPdfOne(id) { printTable([find(id)]); }

/* ── Diffusion ── */
function openDiffusion() {
  openModal(`
    <h2>📧 Listes de Diffusion</h2>
    <div class="dif-card valid">
      <h5>🔒 Liste des Validateurs</h5>
      <p>Notifie les responsables lors de la création d'incidents graves ou très graves. Toujours active, non supprimable.</p>
      <div class="email-chips">${DIFF_LISTS.validateurs.map(e => `<span class="echip">${e}</span>`).join('')}</div>
    </div>
    <div class="dif-card">
      <h5>${DIFF_LISTS.perso.nom} <span class="echip" style="font-size:.65rem">👤 Personnalisée</span></h5>
      <div class="email-chips" id="dif-perso">${DIFF_LISTS.perso.emails.map(e => `<span class="echip green">${e}</span>`).join('')}</div>
      <input placeholder="email@demo.fr (Entrée pour ajouter)" style="width:100%;border:1px solid var(--border);border-radius:7px;padding:.4rem .6rem;font-size:.78rem;background:var(--panel);color:var(--text)"
        onkeydown="if(event.key==='Enter'&&this.value.includes('@')){DIFF_LISTS.perso.emails.push(this.value.trim());this.value='';openDiffusion()}">
    </div>
    <div class="dif-card">
      <h5>${DIFF_LISTS.metier.nom} <span class="echip" style="font-size:.65rem">🏢 Métier</span> <span class="grav tgrave" style="font-size:.62rem">${DIFF_LISTS.metier.gravite}</span></h5>
      <p>Déclenchée automatiquement pour les incidents de gravité « ${DIFF_LISTS.metier.gravite} ».</p>
      <div class="email-chips">${DIFF_LISTS.metier.emails.map(e => `<span class="echip green">${e}</span>`).join('')}</div>
    </div>
    <div class="m-actions"><button class="btn ghost" onclick="closeModal()">Fermer</button>
      <button class="btn primary" onclick="toast('💾 Listes sauvegardées (démo)','ok');closeModal()">Sauvegarder</button></div>`);
}

/* ── Gestion (admin) ── */
function openGestion() {
  const droits = [['Administrateur', 'Accès complet à toutes les fonctionnalités', 15, '#16A34A'],
  ['Responsable', 'Gestion des équipes et validation des processus', 13, '#16A34A'],
  ['Technicien', 'Réalisation des interventions techniques', 7, '#DC2626'],
  ['Animateur', 'Animation et suivi des projets', 4, '#DC2626'],
  ['Consultant', 'Accès en lecture seule aux données', 2, '#DC2626']];
  const metiers = ['DCF-DIR-ASSISTANTE', 'DG-APPUI-DIR', 'DGRM-POLE-BUREAUTIQUE', 'DICOM-CHARGE-COM', 'DID-ATTACHE-DIRECTION', 'DIFI-MSI-CHARGE-PROJETS', 'DNRTI-STATISTIQUES', 'DRH-POI'];
  const users = [['Système Administrateur', 'admin'], ['Jean Martin', 'responsable'], ['Marie Dubois', 'technicien'], ['Pierre Bernard', 'consultant'], ['Julien Dumas', 'girard.bertrand'], ['Anouk Leclercq', 'mfaure'], ['Frédéric Renaud', 'astrid.dossantos'], ['Raymond Lemonnier', 'juliette.vasseur']];
  openModal(`
    <h2>⚙ Administration <span style="font-size:.75rem;font-weight:400;color:var(--muted)">- lecture seule en démo</span></h2>
    <div class="tabs">
      <button class="on" onclick="gTab(this,'g-droits')">Droits</button>
      <button onclick="gTab(this,'g-metiers')">Métiers</button>
      <button onclick="gTab(this,'g-users')">Utilisateurs</button>
    </div>
    <div id="g-droits">
      ${droits.map(d => `<div class="role-card">
        <div class="info"><b>${d[0]}</b><small>${d[1]}</small></div>
        <div class="barw"><div class="bar"><div style="width:${Math.round(d[2] / 15 * 100)}%;background:${d[3]}"></div></div></div>
        <span class="pct" style="color:${d[3]}">${d[2]}/15 · ${Math.round(d[2] / 15 * 100)}%</span>
        <button class="btn ghost" style="font-size:.74rem;padding:.3rem .8rem" onclick="toast('🔒 Lecture seule en démo','warn')">✏ Modifier</button>
      </div>`).join('')}
    </div>
    <div id="g-metiers" style="display:none">
      <p style="font-size:.76rem;color:var(--muted);margin-bottom:.6rem">264 métiers référencés - échantillon de 8 :</p>
      <table class="tbl-mini"><tr><th>#</th><th>MÉTIER</th><th>CODE RÉGION</th><th>DROIT ASSOCIÉ</th></tr>
      ${metiers.map((m, ix) => `<tr><td>${255 + ix}</td><td>AC750-${m}-CB</td><td>AC750</td><td><span class="tag-aucun">Aucun</span></td></tr>`).join('')}</table>
    </div>
    <div id="g-users" style="display:none">
      <table class="tbl-mini"><tr><th>NOM</th><th>IDENTIFIANT</th><th>RÔLE</th></tr>
      ${users.map(u => `<tr><td>${u[0]}</td><td>${u[1]}</td><td><span class="tag-aucun">Consultant</span></td></tr>`).join('')}</table>
    </div>`, true);
}
function gTab(btn, id) {
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  ['g-droits', 'g-metiers', 'g-users'].forEach(x => $(x).style.display = x === id ? '' : 'none');
}

/* ── Dashboard ── */
function openDash() {
  const act = state.data.filter(i => !i.deleted && i.statut !== 'Archivé');
  const indispoH = state.data.filter(i => !i.deleted && i.indispo).reduce((s, i) => s + i.indispo.j * 24 + i.indispo.h + i.indispo.m / 60, 0);
  const byG = GRAVS.map(g => [g, act.filter(i => i.gravite === g).length]);
  const byS = [...STATUTS].map(s => [s, act.filter(i => i.statut === s).length]);
  const mx = Math.max(...byG.map(x => x[1]), ...byS.map(x => x[1]), 1);
  const gc = { 'Faible': '#3B82F6', 'Moyen': '#EAB308', 'Grave': '#F97316', 'Très grave': '#EF4444' };
  const sc = { 'En cours': '#B91C1C', 'En attente de validation': '#D97706', 'Cloturé': '#15803D' };
  openModal(`
    <h2>📈 Tableau de bord</h2>
    <div class="dash-cards">
      <div class="dash-card"><b>${act.length}</b><span>Incidents actifs</span></div>
      <div class="dash-card"><b style="color:#B91C1C">${act.filter(i => i.statut === 'En cours').length}</b><span>En cours</span></div>
      <div class="dash-card"><b style="color:#EF4444">${act.filter(i => i.gravite === 'Très grave').length}</b><span>Très graves</span></div>
      <div class="dash-card"><b>${indispoH.toFixed(0)}h</b><span>Indisponibilité cumulée</span></div>
    </div>
    <div class="m-sec"><h4>Répartition par gravité</h4>
      ${byG.map(x => `<div class="hbar"><span>${x[0]}</span><div class="t"><div style="width:${x[1] / mx * 100}%;background:${gc[x[0]]}"></div></div><b>${x[1]}</b></div>`).join('')}</div>
    <div class="m-sec"><h4>Répartition par statut</h4>
      ${byS.map(x => `<div class="hbar"><span style="font-size:.68rem">${x[0]}</span><div class="t"><div style="width:${x[1] / mx * 100}%;background:${sc[x[0]]}"></div></div><b>${x[1]}</b></div>`).join('')}</div>`);
}

/* ── Global controls ── */
$('role-sel').addEventListener('change', e => {
  state.role = e.target.value;
  toast('👤 Rôle : ' + ROLES[state.role].label + ' - les capacités s\'adaptent', 'ok');
  renderAll();
});
$('reset-btn').addEventListener('click', () => {
  state.data = seed(); state.page = 1; state.search = ''; $('search').value = '';
  advReset(); toast('⟲ Démo réinitialisée', 'ok'); renderAll();
});
$('theme-btn').addEventListener('click', () => {
  const r = document.documentElement;
  r.dataset.theme = r.dataset.theme === 'dark' ? '' : 'dark';
  $('theme-btn').textContent = r.dataset.theme === 'dark' ? '🌙' : '☀️';
});

renderAll();
