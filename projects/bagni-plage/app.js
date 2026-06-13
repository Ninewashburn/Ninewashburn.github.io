/* ═══ Bagni Plage - Démo standalone · état en mémoire ═══ */

const BEACHES = { med:'Bagni Plage Méditerranée', pin:'Bagni Pinède', rou:'Bagni Roussillon' };
const ROWS = [['F1',45],['F2',40],['F3',35],['F4',30],['F5',25],['F6',22],['F7',19],['F8',15]];
const SPOTS = 36;
const EQUIP = [
  {id:'transat', label:'Transats supplémentaires (×2)', p:8},
  {id:'casier',  label:'Casier sécurisé',               p:5},
  {id:'boisson', label:'Avantage boisson (bar de plage)',p:4}
];
const STEPS = ['Dates','Parasol','Équipement','Paiement'];

function seedDash(){ return {
  pending:[
    {n:'Adrien Delmas', d:'12 mai – 13 mai 2026', s:'18F1', a:90},
    {n:'Elena Rinaldi', d:'12 mai – 14 mai 2026', s:'16F2', a:160},
    {n:'Olivia Bennett',d:'12 mai – 13 mai 2026', s:'17F1', a:90},
    {n:'Sofia Bellini', d:'14 mai – 21 mai 2026', s:'11F6', a:154},
    {n:'Gabriel Roux',  d:'14 mai – 15 mai 2026', s:'16F1', a:90},
    {n:'Matteo Conti',  d:'14 mai – 15 mai 2026', s:'17F1', a:90}
  ],
  recent:[
    {n:'Charlotte Meyer', s:'10F1', a:90,  st:'att'},
    {n:'Camille Laurent', s:'13F1', a:106, st:'val'},
    {n:'Isabelle Vidal',  s:'22F2', a:414, st:'val'},
    {n:'Claire Moreau',   s:'14F5', a:264, st:'val'},
    {n:'Diane Beaulieu',  s:'7F6',  a:240, st:'att'},
    {n:'Lucia Marini',    s:'17F1', a:392, st:'val'}
  ],
  clients:23
};}

let state = { booking:{ beach:'med', from:null, to:null, sel:null, equip:[] }, dash: seedDash() };

const $ = id => document.getElementById(id);
const eur = n => n.toLocaleString('fr-FR')+' €';
const occupied = (r,n) => (((r+1)*37+n)*2654435761>>>0)%9===0;
const days = () => {
  const f=new Date($('b-from').value), t=new Date($('b-to').value);
  return Math.max(1, Math.round((t-f)/864e5));
};
const perDay = () => {
  const b=state.booking; if(!b.sel) return 0;
  return b.sel.price + b.equip.reduce((s,id)=>s+EQUIP.find(e=>e.id===id).p,0);
};
const total = () => perDay()*days();

/* ── Navigation ── */
function show(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  $('view-'+view).classList.add('active');
  document.querySelectorAll('nav.main button').forEach(b=>b.classList.toggle('on', b.dataset.view===view));
  if(view==='dash') renderDash();
  window.scrollTo({top:0});
}
function startBooking(beach){
  state.booking = { beach, from:null, to:null, sel:null, equip:[] };
  $('b-beach').value = beach;
  const today=new Date(), tmr=new Date(Date.now()+864e5);
  $('b-from').value = today.toISOString().slice(0,10);
  $('b-to').value = tmr.toISOString().slice(0,10);
  show('book'); goStep(1);
}

/* ── Wizard ── */
function renderSteps(cur){
  $('wz-steps').innerHTML = STEPS.map((s,i)=>{
    const n=i+1, cls = n<cur?'done':(n===cur?'on':'');
    return `<div class="wz-step ${cls}"><span class="n">${n<cur?'✓':n}</span>${s}</div>${n<4?'<div class="wz-line"></div>':''}`;
  }).join('');
}
function goStep(n){
  if(n>=2){
    state.booking.beach = $('b-beach').value;
    if(!$('b-from').value || !$('b-to').value || days()<1){ toast('⚠ Sélectionnez des dates valides'); return; }
  }
  if(n>=3 && !state.booking.sel){ toast('⚠ Sélectionnez un emplacement sur le plan'); return; }
  [1,2,3,4,5].forEach(i=>$('st'+i).style.display = i===n?'':'none');
  renderSteps(Math.min(n,4));
  if(n===2) renderGrid();
  if(n===3) renderEquip();
  if(n===4) renderPay();
}

function renderGrid(){
  let avail=0;
  $('grid').innerHTML = ROWS.map((row,r)=>{
    const spots = Array.from({length:SPOTS},(_,k)=>{
      const num=k+1, occ=occupied(r,num);
      if(!occ) avail++;
      const isSel = state.booking.sel && state.booking.sel.row===row[0] && state.booking.sel.n===num;
      return `<button class="spot ${occ?'occ':''} ${isSel?'sel':''}" ${occ?'disabled':''}
        onclick="selectSpot(${r},${num})" title="${num}${row[0]} · ${row[1]} €/j">${num}</button>`;
    }).join('');
    return `<div class="grow"><div class="lbl"><b>${row[0]}</b><small>${row[1]} €/J</small></div><div class="spots">${spots}</div></div>`;
  }).join('');
  $('avail-count').textContent = avail;
  updateRecap();
}
function selectSpot(r,n){
  state.booking.sel = { row:ROWS[r][0], rowNum:r+1, n, price:ROWS[r][1] };
  renderGrid();
}
function updateRecap(){
  const s=state.booking.sel;
  $('r-beach').textContent = BEACHES[state.booking.beach];
  $('r-row').textContent = s? s.rowNum : '-';
  $('r-spot').textContent = s? s.n : '-';
  $('r-price').textContent = s? s.price+' €' : '-';
  $('btn-equip').disabled = !s;
  const sb=$('statusbar');
  if(s){ sb.classList.add('show'); sb.innerHTML = `🕐 <b>${s.n}${s.row}</b> sélectionné · ${s.price} €/jour`; }
  else sb.classList.remove('show');
}

function renderEquip(){
  $('equip-list').innerHTML = EQUIP.map(e=>`
    <label class="eq"><input type="checkbox" ${state.booking.equip.includes(e.id)?'checked':''}
      onchange="toggleEquip('${e.id}',this.checked)">
      <span class="nm">${e.label}</span><span class="pr">+${e.p} €/j</span></label>`).join('');
  renderSum('sum3');
}
function toggleEquip(id,on){
  const arr=state.booking.equip, ix=arr.indexOf(id);
  if(on&&ix<0)arr.push(id); if(!on&&ix>=0)arr.splice(ix,1);
  renderSum('sum3');
}
function sumHtml(){
  const b=state.booking, s=b.sel, d=days();
  const lines = [
    ['Plage', BEACHES[b.beach]],
    ['Emplacement', `${s.n}${s.row} - file ${s.rowNum}`],
    ['Dates', `${$('b-from').value.split('-').reverse().join('/')} → ${$('b-to').value.split('-').reverse().join('/')} (${d} jour${d>1?'s':''})`],
    ['Parasol', s.price+' €/j']
  ];
  b.equip.forEach(id=>{ const e=EQUIP.find(x=>x.id===id); lines.push([e.label, '+'+e.p+' €/j']); });
  return lines.map(l=>`<div class="sum-row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')
    + `<div class="sum-row"><span>Total / jour</span><b>${eur(perDay())}</b></div>`
    + `<div class="sum-row tot"><span>Total séjour</span><span>${eur(total())}</span></div>`;
}
function renderSum(id){ $(id).innerHTML = sumHtml(); }
function renderPay(){ renderSum('sum4'); $('pay-state').textContent=''; $('btn-pay').disabled=false; }

function pay(){
  $('btn-pay').disabled = true;
  $('pay-state').textContent = '⏳ Connexion à PayPal Sandbox…';
  setTimeout(()=>{
    $('pay-state').textContent = '';
    const b=state.booking, ref='BP-2026-'+Math.floor(1000+Math.random()*9000);
    state.dash.pending.unshift({ n:'Vous (démo)', d:`${$('b-from').value.split('-').reverse().join('/')} – ${$('b-to').value.split('-').reverse().join('/')}`,
      s:`${b.sel.n}${b.sel.row}`, a: total() });
    state.dash.clients++;
    renderQr(); $('ref').textContent = 'Réf. '+ref;
    renderSum('sum5');
    goStep(5); renderSteps(5);
    toast('✓ Réservation envoyée - visible dans le dashboard','ok');
  }, 1200);
}
function renderQr(){
  let h='';
  for(let i=0;i<169;i++){
    const r=(i*2654435761>>>0)%5;
    h+=`<i class="${r<2?'':'w'}"></i>`;
  }
  $('qr').innerHTML = h + '<div class="bp"><span>BP</span></div>';
}

/* ── Dashboard ── */
const initials = n => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
function renderDash(){
  const d=state.dash;
  const att = d.pending.length + d.recent.filter(x=>x.st==='att').length;
  const val = d.recent.filter(x=>x.st==='val').length;
  const ca  = d.recent.filter(x=>x.st==='val').reduce((s,x)=>s+x.a,0);
  $('kpi-att').textContent = att;
  $('kpi-val').textContent = val;
  $('kpi-occ').textContent = Math.max(1,Math.round(val/288*100))+'%';
  $('kpi-ca').textContent = eur(ca);
  $('kpi-cli').textContent = d.clients+' clients enregistrés';
  $('nav-bdg').textContent = att;

  $('list-pending').innerHTML = d.pending.map((p,i)=>`
    <div class="ditem">
      <div class="avatar">${initials(p.n)}</div>
      <div class="nm"><b>${p.n}</b><small>${p.d}</small></div>
      <span class="spot-id">${p.s}</span>
      <span class="amt">${eur(p.a)}</span>
      <button class="act-ok" title="Valider" onclick="valider(${i})">✓</button>
      <button class="act-no" title="Refuser" onclick="refuser(${i})">✕</button>
    </div>`).join('') || '<div class="empty">Aucune demande en attente 🎉</div>';

  $('list-recent').innerHTML = d.recent.map(r=>`
    <div class="ditem">
      <span class="bdg-st ${r.st}">${r.st==='val'?'Validée':'En attente'}</span>
      <div class="nm"><b>${r.n}</b><small>${r.s}</small></div>
      <span class="amt">${eur(r.a)}</span>
    </div>`).join('');
}
function valider(i){
  const p = state.dash.pending.splice(i,1)[0];
  state.dash.recent.unshift({ n:p.n, s:p.s, a:p.a, st:'val' });
  toast(`✓ Réservation de ${p.n} validée - ${eur(p.a)} ajoutés au CA`,'ok');
  renderDash();
}
function refuser(i){
  const p = state.dash.pending.splice(i,1)[0];
  toast(`✕ Demande de ${p.n} refusée`);
  renderDash();
}

/* ── Global ── */
function toast(msg, cls){
  const t=document.createElement('div'); t.className='toast '+(cls||''); t.textContent=msg;
  $('toasts').appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(()=>t.remove(),400)},3500);
}
$('theme-btn').addEventListener('click',()=>{
  const r=document.documentElement;
  r.dataset.theme = r.dataset.theme==='light'?'dark':'light';
  $('theme-btn').textContent = r.dataset.theme==='light'?'☾':'☀';
});
$('reset-btn').addEventListener('click',()=>{
  state.dash = seedDash();
  state.booking = { beach:'med', from:null, to:null, sel:null, equip:[] };
  renderDash(); show('home'); toast('⟲ Démo réinitialisée','ok');
});

renderSteps(1); renderDash();
