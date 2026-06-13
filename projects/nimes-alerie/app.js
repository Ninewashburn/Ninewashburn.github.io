/* ═══ Protocole X-Invaders - Space Invaders canvas · démo jouable ═══ */
const cv = document.getElementById('cv'), cx = cv.getContext('2d');
const W = cv.width, H = cv.height;
const $ = id => document.getElementById(id);

/* sprites (pixel maps) */
const ALIEN_A = ["00100000100","00010001000","00111111100","01101110110","11111111111","10111111101","10100000101","00011011000"];
const ALIEN_B = ["00100000100","10010001001","10111111101","11101110111","11111111111","01111111110","00100000100","01000000010"];
const SHIP    = ["0000001000000","0000011100000","0000011100000","0111111111110","1111111111111","1111111111111","1111111111111"];
function drawSprite(map, x, y, scale, color){
  cx.fillStyle = color;
  for(let r=0;r<map.length;r++) for(let c=0;c<map[r].length;c++)
    if(map[r][c]==='1') cx.fillRect(x+c*scale, y+r*scale, scale, scale);
}

/* state */
const COLS=11, ROWS=5, CELL=36, AW=22, AH=16, PW=26, PH=14;
let mode='idle', score=0, gain=0, wave=1, lives=3;
let player, bullets, abullets, aliens, dir, stepMs, stepAcc, animFrame, fireAcc, fireEvery, msgUntil=0, msg='';
let keys={l:false,r:false}, last=0;

function deploy(){
  aliens=[];
  for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++)
    aliens.push({ x: 38+c*CELL, y: 70+r*38, row:r, alive:true });
  dir=1; stepAcc=0; animFrame=0;
  stepMs = Math.max(90, 460 - (wave-1)*40);
  fireAcc=0; fireEvery = Math.max(450, 950 - (wave-1)*90);
}
function resetGame(){
  score=0; gain=0; wave=1; lives=3;
  player={x:W/2-PW/2}; bullets=[]; abullets=[];
  deploy(); updHud();
}

/* audio */
let actx=null;
function beep(f,d,type,vol){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(), g=actx.createGain();
    o.type=type||'square'; o.frequency.value=f;
    g.gain.value=vol||0.035; o.connect(g); g.connect(actx.destination);
    o.start(); o.frequency.exponentialRampToValueAtTime(Math.max(40,f/2), actx.currentTime+d/1000);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+d/1000);
    o.stop(actx.currentTime+d/1000+0.02);
  }catch(e){}
}

/* HUD DOM */
function updHud(){
  $('score').textContent = String(score).padStart(9,'0');
  $('gain').textContent = '+'+gain+' PTS_GAIN';
  $('wave').textContent = String(wave).padStart(2,'0');
  $('units').textContent = lives>0 ? Array(lives).fill('▲').join(' ') : '-';
}

/* game actions */
function shoot(){
  if(mode!=='play') return;
  if(bullets.length>=1) return;
  bullets.push({ x: player.x+PW/2-1, y: H-58 });
  beep(880,70);
}
function alienShoot(){
  const alive = aliens.filter(a=>a.alive);
  if(!alive.length) return;
  const cols={};
  alive.forEach(a=>{ const k=Math.round(a.x); if(!cols[k]||a.y>cols[k].y) cols[k]=a; });
  const arr=Object.values(cols), a=arr[Math.floor(Math.random()*arr.length)];
  abullets.push({ x:a.x+AW/2, y:a.y+AH });
}
function hitScore(row){ return row===0?30:(row<3?20:10); }

/* update */
function update(dt){
  if(mode!=='play') return;

  if(keys.l) player.x = Math.max(8, player.x-0.28*dt);
  if(keys.r) player.x = Math.min(W-PW-8, player.x+0.28*dt);

  bullets.forEach(b=>b.y-=0.5*dt);
  bullets = bullets.filter(b=>b.y>30);
  abullets.forEach(b=>b.y+=0.22*dt);
  abullets = abullets.filter(b=>b.y<H-20);

  stepAcc+=dt;
  if(stepAcc>=stepMs){
    stepAcc=0; animFrame^=1;
    const alive=aliens.filter(a=>a.alive);
    const minX=Math.min(...alive.map(a=>a.x)), maxX=Math.max(...alive.map(a=>a.x));
    if((dir>0 && maxX+AW>W-16) || (dir<0 && minX<16)){
      dir*=-1; alive.forEach(a=>a.y+=16);
    } else alive.forEach(a=>a.x+=dir*9);
    stepMs = Math.max(70, (460-(wave-1)*40) * (alive.length/55) + 60);
    if(alive.some(a=>a.y+AH >= H-70)){ gameOver(); return; }
  }

  fireAcc+=dt;
  if(fireAcc>=fireEvery){ fireAcc=0; alienShoot(); }

  /* collisions: player bullets vs aliens */
  bullets.forEach(b=>{
    aliens.forEach(a=>{
      if(a.alive && b.y>0 && b.x>a.x-2 && b.x<a.x+AW+2 && b.y>a.y && b.y<a.y+AH){
        a.alive=false; b.y=-99;
        gain=hitScore(a.row); score+=gain; updHud(); beep(220,90);
      }
    });
  });
  /* alien bullets vs player */
  const py=H-52;
  abullets.forEach(b=>{
    if(b.x>player.x && b.x<player.x+PW && b.y>py && b.y<py+PH){
      b.y=H+99; lives--; updHud(); beep(110,260,'sawtooth',0.05);
      if(lives<=0){ gameOver(); }
      else { msg='UNITÉ TOUCHÉE - RÉGÉNÉRATION'; msgUntil=performance.now()+1100; }
    }
  });

  if(aliens.every(a=>!a.alive)){
    wave++; updHud();
    msg='WAVE CLEARED // DEPLOY_NEXT'; msgUntil=performance.now()+1300;
    deploy();
  }
}
function gameOver(){ mode='over'; beep(70,500,'sawtooth',0.06); }

/* draw */
function draw(){
  cx.fillStyle='#000'; cx.fillRect(0,0,W,H);
  cx.textAlign='left'; cx.font='10px "JetBrains Mono",monospace';
  cx.fillStyle='#34D058'; cx.fillText('REC [●] SIMULATION_IN_PROGRESS', 14, 22);
  cx.textAlign='center'; cx.font='16px "JetBrains Mono",monospace'; cx.fillStyle='#fff';
  cx.fillText('SCORE: '+score, W/2, 24);

  if(mode==='idle' || mode==='over'){
    cx.font='italic 800 26px Archivo,sans-serif'; cx.fillStyle='#fff';
    cx.fillText(mode==='idle'?'PROTOCOLE X-INVADERS':'SIMULATION TERMINÉE', W/2, H/2-46);
    if(mode==='over'){ cx.font='14px "JetBrains Mono",monospace'; cx.fillStyle='#D946EF';
      cx.fillText('SCORE FINAL : '+score, W/2, H/2-14); }
    if(Math.floor(performance.now()/500)%2===0){
      cx.font='12px "JetBrains Mono",monospace'; cx.fillStyle='#38BDF8';
      cx.fillText(mode==='idle'?'ENTER ▸ INITIATE':'ENTER ▸ REINITIATE', W/2, H/2+26);
    }
  } else {
    aliens.forEach(a=>{ if(a.alive) drawSprite(animFrame?ALIEN_B:ALIEN_A, a.x, a.y, 2, '#E6ECF8'); });
    drawSprite(SHIP, player.x, H-52, 2, '#2BFF3F');
    cx.fillStyle='#7CFFA0'; bullets.forEach(b=>cx.fillRect(b.x,b.y,2,9));
    cx.fillStyle='#D946EF'; abullets.forEach(b=>cx.fillRect(b.x,b.y,3,9));
  }

  /* baseline + lives */
  cx.fillStyle='#34D058'; cx.fillRect(10,H-26,W-20,2);
  cx.textAlign='left'; cx.font='13px "JetBrains Mono",monospace'; cx.fillStyle='#fff';
  cx.fillText(lives+' ×', 14, H-8);
  drawSprite(SHIP, 50, H-19, 1, '#2BFF3F');
  cx.textAlign='right'; cx.font='8px "JetBrains Mono",monospace'; cx.fillStyle='#1E6B33';
  cx.fillText('RADAR_SYNC: HIGH_FIDELITY', W-12, H-10);

  if(msg && performance.now()<msgUntil){
    cx.textAlign='center'; cx.font='13px "JetBrains Mono",monospace'; cx.fillStyle='#38BDF8';
    cx.fillText(msg, W/2, 48);
  }
}

/* loop */
function loop(t){
  const dt = Math.min(40, t-last); last=t;
  update(dt); draw();
  requestAnimationFrame(loop);
}

/* controls */
function start(){
  if(mode==='play') return;
  resetGame(); mode='play'; beep(440,120); beep(660,120);
}
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){ keys.l=true; e.preventDefault(); }
  if(e.key==='ArrowRight'){ keys.r=true; e.preventDefault(); }
  if(e.key==='x'||e.key==='X'){ shoot(); e.preventDefault(); }
  if(e.key==='Enter'){ start(); }
});
document.addEventListener('keyup',e=>{
  if(e.key==='ArrowLeft') keys.l=false;
  if(e.key==='ArrowRight') keys.r=false;
});
$('btn-init').addEventListener('click', start);
[['m-left','l'],['m-right','r']].forEach(([id,k])=>{
  const el=$(id);
  el.addEventListener('pointerdown',()=>keys[k]=true);
  el.addEventListener('pointerup',()=>keys[k]=false);
  el.addEventListener('pointerleave',()=>keys[k]=false);
});
$('m-fire').addEventListener('pointerdown',()=>{ if(mode!=='play') start(); else shoot(); });

resetGame();
requestAnimationFrame(t=>{ last=t; requestAnimationFrame(loop); });
