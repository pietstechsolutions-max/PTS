/* Piets home — "Piet's Brain" (Oct 15 2026). ONE plain module: Three.js 0.186.1 +
   GSAP 3.15 ScrollTrigger + Lenis 1.3.26 bundled in, plus the page logic.
   Built from /scripts/brain-src/brain-home.src.js with esbuild (see README there).
   Performance: pixel ratio capped at 1.75 (1.5 on small screens), nothing renders in a hidden
   tab or while the brain is faded out, half rate while it is only background, reduced motion =
   one static frame, no WebGL = glow fallback, JS off = the page is complete without this file.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake. */
import { WebGLRenderer, Scene, PerspectiveCamera, Color, BufferGeometry, Float32BufferAttribute, ShaderMaterial, AdditiveBlending, Group, Points, LineSegments, LineBasicMaterial, EdgesGeometry, BoxGeometry, CanvasTexture, Sprite, SpriteMaterial, Vector3, CatmullRomCurve3, Mesh, TubeGeometry, Vector2, Raycaster, Sphere, MathUtils, Clock } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
const THREE = { WebGLRenderer, Scene, PerspectiveCamera, Color, BufferGeometry, Float32BufferAttribute, ShaderMaterial, AdditiveBlending, Group, Points, LineSegments, LineBasicMaterial, EdgesGeometry, BoxGeometry, CanvasTexture, Sprite, SpriteMaterial, Vector3, CatmullRomCurve3, Mesh, TubeGeometry, Vector2, Raycaster, Sphere, MathUtils, Clock };
window.gsap = gsap; window.ScrollTrigger = ScrollTrigger; window.Lenis = Lenis;

(function(){
  "use strict";
  var root=document.documentElement;
  var reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine=matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("bh-motion"); if(reduced) root.classList.add("reduced");
  var PB=window.PB={p:0,u:reduced?1:0,fade:1,frames:0,frameMs:0,fps:0,reduced:reduced,neurons:0,links:0,gl:null};
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var hasG=true;
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};

  /* ---- service count derived from the page ---- */
  var nodeCount=$$(".node-card").length+$$(".mini").length;
  $$("[data-count-systems]").forEach(function(el){el.textContent=nodeCount});

  /* ---- Lenis + ScrollTrigger ---- */
  var lenis=null;
  if(hasG){gsap.registerPlugin(ScrollTrigger)}
  if(hasG&&!reduced){
    lenis=new Lenis({lerp:.1,smoothWheel:true});
    lenis.on("scroll",ScrollTrigger.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000)});
    gsap.ticker.lagSmoothing(0);
  }
  document.addEventListener("click",function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute("href");if(id.length<2)return;var t=document.querySelector(id);if(!t)return;
    e.preventDefault();var off=-96;
    if(lenis)lenis.scrollTo(t,{offset:off,duration:1.4});else window.scrollTo({top:t.getBoundingClientRect().top+scrollY+off,behavior:reduced?"auto":"smooth"});
  });

  /* ---- uncoil progress (camera + cables) ---- */
  var caps=$$(".step-cap"), uPct=$("#uPct"), uMeter=$("#uMeter");
  function setCaps(u){var i=Math.min(caps.length-1,Math.floor(u*caps.length));caps.forEach(function(c,k){c.classList.toggle("on",k===i)});
    uPct.textContent=Math.round(u*100)+"%";uMeter.style.setProperty("--u",u.toFixed(3))}
  if(hasG&&!reduced){
    setCaps(0);
    ScrollTrigger.create({trigger:".hero",start:"top top",endTrigger:"#uncoil",end:"bottom bottom",scrub:true,
      onUpdate:function(s){PB.p=s.progress;PB.u=clamp((s.progress-.08)/.8,0,1);setCaps(PB.u)}});
    gsap.from(".hero-copy>*",{y:28,opacity:0,duration:.9,ease:"expo.out",stagger:.08,delay:.15,clearProps:"all"});
  }else{caps.forEach(function(c){c.classList.add("on")});PB.u=1;uPct.textContent="100%";PB.fade=.9}

  /* ---- node cards: wires, plug-in, tilt, glow ---- */
  var board=$("#board"), wbg=$("#wbg"), wfg=$("#wfg"), cards=$$(".node-card"), minis=$$(".mini");
  var NS="http://www.w3.org/2000/svg", wireEls=[], linked=new Set();
  function mk(d,cls,g){var p=document.createElementNS(NS,"path");p.setAttribute("d",d);p.setAttribute("class",cls);g.appendChild(p);return p}
  function markLive(el){if(el.classList.contains("live"))return;el.classList.add("live");var s=el.querySelector("[data-state]");if(s)s.textContent="Linked · powered by Piet's brain";
    linked.add(el.getAttribute("data-node")||el.querySelector("h4").textContent);
    if(!fine&&el.classList.contains("node-card")){el.classList.add("hover");setTimeout(function(){el.classList.remove("hover")},1600)}$("#mNodes").textContent=linked.size+"/"+nodeCount}
  function layoutWires(){
    wbg.innerHTML="";wfg.innerHTML="";wireEls=[];
    var br=board.getBoundingClientRect(), W=br.width, narrow=innerWidth<=860;
    var sx=narrow?12:W/2, pts=cards.map(function(c){var p=c.querySelector(".port").getBoundingClientRect();return{x:p.left+p.width/2-br.left,y:p.top+p.height/2-br.top}});
    var mr=$(".minis").getBoundingClientRect(), busY=mr.top-br.top-(narrow?44:30);
    var spine="M"+sx+" -40 V"+busY;
    wireEls.push({bg:mk(spine,"bg",wbg),fg:mk(spine,"fg",wfg),kind:"spine"});
    pts.forEach(function(p,i){var dir=p.x>sx?1:-1, mid=sx+dir*Math.min(28,Math.abs(p.x-sx)/2);
      var d="M"+sx+" "+(p.y-26)+" C"+sx+" "+(p.y-6)+" "+mid+" "+p.y+" "+(mid+dir*10)+" "+p.y+" H"+p.x;
      wireEls.push({bg:mk(d,"bg",wbg),fg:mk(d,i%3===1?"fg or":"fg",wfg),kind:"branch",card:cards[i]})});
    if(narrow){
      var mr2=minis.map(function(m){var r=m.getBoundingClientRect();return{x:r.left-br.left-2,y:r.top-br.top+30}});
      var last=mr2[mr2.length-1].y, bus2="M"+sx+" "+busY+" V"+last;
      wireEls.push({bg:mk(bus2,"bg",wbg),fg:mk(bus2,"fg",wfg),kind:"bus"});
      mr2.forEach(function(m,i){var d="M"+sx+" "+m.y+" H"+m.x;wireEls.push({bg:mk(d,"bg",wbg),fg:mk(d,"fg",wfg),kind:"stub",card:minis[i]})});
    }else{
    var mrs=minis.map(function(m){var r=m.getBoundingClientRect();return{x:r.left+r.width/2-br.left,y:r.top-br.top-9}});
    var xs=mrs.map(function(m){return m.x}), x0=Math.min.apply(null,xs.concat(sx)), x1=Math.max.apply(null,xs.concat(sx));
    var bus="M"+x0+" "+busY+" H"+x1;
    wireEls.push({bg:mk(bus,"bg",wbg),fg:mk(bus,"fg",wfg),kind:"bus"});
    mrs.forEach(function(m,i){var d="M"+m.x+" "+busY+" V"+(m.y-1);wireEls.push({bg:mk(d,"bg",wbg),fg:mk(d,"fg",wfg),kind:"stub",card:minis[i]})});
    }
    wireEls.forEach(function(w){var L=w.fg.getTotalLength()||1;w.len=L;w.fg.style.strokeDasharray=L+" "+L;w.fg.style.strokeDashoffset=(w.card&&w.card.classList.contains("live"))?0:L});
    bindWires();
  }
  var wireST=[];
  function bindWires(){
    wireST.forEach(function(s){s.kill()});wireST=[];
    if(!hasG||reduced){wireEls.forEach(function(w){w.fg.style.strokeDashoffset=0});cards.concat(minis).forEach(markLive);return}
    var spine=wireEls[0];
    wireST.push(ScrollTrigger.create({trigger:board,start:"top 75%",end:"bottom 60%",scrub:true,onUpdate:function(s){spine.fg.style.strokeDashoffset=spine.len*(1-s.progress)}}));
    wireEls.forEach(function(w){
      if(w.kind==="branch"){wireST.push(ScrollTrigger.create({trigger:w.card,start:"top 70%",once:true,onEnter:function(){gsap.to(w.fg,{strokeDashoffset:0,duration:.7,ease:"power2.out",onComplete:function(){markLive(w.card)}})}}))}
    });
    var bus=wireEls.filter(function(w){return w.kind==="bus"})[0], stubs=wireEls.filter(function(w){return w.kind==="stub"});
    wireST.push(ScrollTrigger.create({trigger:".minis",start:"top 78%",once:true,onEnter:function(){
      var tl=gsap.timeline();tl.to(bus.fg,{strokeDashoffset:0,duration:.8,ease:"power2.inOut"});
      stubs.forEach(function(s,i){tl.to(s.fg,{strokeDashoffset:0,duration:.35,ease:"power2.out",onComplete:function(){markLive(s.card)}},.5+i*.09)});
    }}));
  }
  var rT;function relayout(){clearTimeout(rT);rT=setTimeout(function(){layoutWires();if(hasG)ScrollTrigger.refresh()},120)}
  addEventListener("resize",relayout);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(relayout);

  if(fine&&hasG&&!reduced){
    cards.forEach(function(c){
      gsap.set(c,{transformPerspective:1000});
      var rx=gsap.quickTo(c,"rotationX",{duration:.5,ease:"power3"}), ry=gsap.quickTo(c,"rotationY",{duration:.5,ease:"power3"});
      c.addEventListener("pointerenter",function(){c.classList.add("hover")});
      c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        ry((x-.5)*9);rx(-(y-.5)*7);c.style.setProperty("--mx",(x*100)+"%");c.style.setProperty("--my",(y*100)+"%")});
      c.addEventListener("pointerleave",function(){rx(0);ry(0);c.classList.remove("hover")});
    });
  }else{cards.forEach(function(c){c.addEventListener("focusin",function(){c.classList.add("hover")});c.addEventListener("focusout",function(){c.classList.remove("hover")})})}

  /* pause card animations off screen */
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("paused",!e.isIntersecting);e.target._on=e.isIntersecting})},{rootMargin:"80px"});
    $$(".viz").forEach(function(v){io.observe(v)});
  }

  /* camera clock */
  var clk=$("[data-clock]");function tick(){var d=new Date();clk.textContent=d.toTimeString().slice(0,8)}tick();setInterval(tick,1000);

  /* fiber strands */
  (function(){var g=$("#strands"),cols=["#00E1FF","#00E1FF","#1E8BFF","#1E8BFF","#FF8A2B","#FF8A2B","#7B5CFF"],h="";
    cols.forEach(function(c,i){var y0=34+i*19,y1=66+i*8;var d="M10 "+y0+" C120 "+y0+" 150 "+y1+" 262 "+y1;
      h+='<path class="strand" d="'+d+'" stroke="'+c+'"/><path class="flow" d="'+d+'" stroke="'+c+'" style="animation-delay:-'+(i*.23).toFixed(2)+'s"/>'});g.innerHTML=h})();

  /* VoIP: call waveform (follows the pointer), timer, auto-attendant */
  (function(){var eq=$("#eq"),N=30,bars=[],gain=.35,target=.35,px=.5;
    for(var i=0;i<N;i++){var s=document.createElement("span");eq.appendChild(s);bars.push(s)}
    var card=eq.closest(".node-card"),viz=eq.closest(".viz"),secs=0,step=-1,lis=$$("#ivr li"),route=$("#route");
    var routes=["Routing to the service desk…","Routing to billing…","Ringing your mobile app…"];
    card.addEventListener("pointermove",function(e){var r=eq.getBoundingClientRect();px=clamp((e.clientX-r.left)/r.width,0,1);target=1});
    card.addEventListener("pointerleave",function(){target=.35});
    setInterval(function(){if(!card.classList.contains("live")||viz._on===false)return;secs++;$("#callT").textContent=String(Math.floor(secs/60)).padStart(2,"0")+":"+String(secs%60).padStart(2,"0");
      if(secs%2===0){step=(step+1)%3;lis.forEach(function(l,k){l.classList.toggle("on",k===step)});route.textContent=routes[step]}},1000);
    function frame(t){requestAnimationFrame(frame);if(viz._on===false)return;if(!card.classList.contains("live")){bars.forEach(function(b){b.style.transform="scaleY(.06)"});return}
      gain+=(target-gain)*.08;var tt=t/1000;
      for(var i=0;i<N;i++){var f=i/(N-1);var env=Math.sin(f*Math.PI);
        var v=env*(.5+.3*Math.sin(tt*7.1+i*.8)+.2*Math.sin(tt*13.3+i*2.1))*(.6+.4*Math.abs(Math.sin(tt*1.7)));
        var near=Math.exp(-Math.pow((f-px)*4,2))*(target>.5?.5:0);
        v=clamp(v*gain+near*gain,.04,1);bars[i].style.transform="scaleY("+(reduced?.5*env:v).toFixed(3)+")"}}
    requestAnimationFrame(frame)})();

  /* access control */
  (function(){var card=$("#acc").closest(".node-card"),msg=$("#accMsg"),btn=$("#accBtn"),t;
    function grant(on){card.classList.toggle("granted",on);btn.setAttribute("aria-pressed",on);msg.textContent=on?"ACCESS GRANTED":"PRESENT FOB";btn.textContent=on?"Door unlocked":"Present fob"}
    if(fine){card.addEventListener("pointerenter",function(){t=setTimeout(function(){grant(true)},250)});card.addEventListener("pointerleave",function(){clearTimeout(t);grant(false)})}
    btn.addEventListener("click",function(){grant(!card.classList.contains("granted"))})})();

  /* POS register -> kitchen printer */
  (function(){var order={},cnt=$("#posCount"),ch=$("#posCharge"),tk=$("#ticket"),wrap=tk.closest(".ticket");
    function render(){var k=Object.keys(order),n=k.reduce(function(a,x){return a+order[x]},0);
      cnt.textContent="Order: "+n+(n===1?" item":" items");
      tk.innerHTML=k.length?k.map(function(x){return "<li><span>"+x+"</span><span>x"+order[x]+"</span></li>"}).join(""):'<li class="empty">Waiting for an order</li>';return n}
    $$("[data-item]").forEach(function(b){b.addEventListener("click",function(){if(wrap.classList.contains("paid")){order={};wrap.classList.remove("paid")}
      order[b.textContent]=(order[b.textContent]||0)+1;ch.classList.remove("ok");ch.textContent="Charge";render()})});
    ch.addEventListener("click",function(){var n=Object.keys(order).length;if(!n){cnt.textContent="Add an item first";return}
      ch.classList.add("ok");ch.textContent="Approved";wrap.classList.add("paid");cnt.textContent="Paid · sent to kitchen"})})();

  /* magnetic buttons */
  if(fine&&hasG&&!reduced){$$(".mag").forEach(function(b){var qx=gsap.quickTo(b,"x",{duration:.4,ease:"power3"}),qy=gsap.quickTo(b,"y",{duration:.4,ease:"power3"});
    b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.28);qy((e.clientY-r.top-r.height/2)*.35)});
    b.addEventListener("pointerleave",function(){qx(0);qy(0)})})}

  /* ---- diagnostics terminal + live meters ---- */
  var pxTotal=0,lastY=scrollY;addEventListener("scroll",function(){pxTotal+=Math.abs(scrollY-lastY);lastY=scrollY},{passive:true});
  var term=$("#termOut"),why=$("#why"),termOn=false,ti=0,lines=[];
  var names=cards.map(function(c){return c.getAttribute("data-node")}).concat(minis.map(function(m){return m.querySelector("h4").textContent}));
  function slug(s){return s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}
  function push(html){lines.push(html);if(lines.length>11)lines.shift();term.innerHTML=lines.join("\n")}
  function step(){
    if(!termOn)return;
    if(ti===0){push('<span class="dimc">&gt; PINGING piets_brain …</span>')}
    else if(ti===1){push(PB.gl===false?'reply  <span class="orc">3D view off on this device</span> · page OK':'reply  frame '+(PB.frameMs?PB.frameMs.toFixed(1):'—')+' ms · '+PB.neurons.toLocaleString()+' neurons')}
    else{var nm=names[(ti-2)%names.length];var ok=linked.has(nm);push('&gt; node '+slug(nm).padEnd(22,".")+' '+(ok?'<span class="okc">linked</span>':'<span class="dimc">waiting</span>'))}
    ti=(ti+1)%(names.length+2);
  }
  setInterval(step,700);
  if("IntersectionObserver" in window){new IntersectionObserver(function(es){termOn=es[0].isIntersecting;if(termOn&&!lines.length){term.innerHTML="";}},{threshold:.2}).observe(why)}else termOn=true;
  setInterval(function(){$("#mFrames").textContent=PB.frames.toLocaleString();$("#mPx").textContent=Math.round(pxTotal).toLocaleString();
    if(PB.neurons){$("#hudN").textContent=PB.neurons.toLocaleString();$("#hudL").textContent=PB.links.toLocaleString();$("#hudF").textContent=PB.fps?Math.round(PB.fps):"—"}},500);


  /* ---- brain opacity follows the story: full in the hero, background behind the
     services, off for the long middle of the page, back for the planner ---- */
  function computeFade(){
    var vh=innerHeight, f=1;
    var sys=$("#services"), why=$("#why"), plan=$("#plan-section");
    if(sys){var a=clamp((vh-sys.getBoundingClientRect().top)/(vh*.85),0,1); f=1-.84*a;}
    if(why){var b=clamp((vh*.6-why.getBoundingClientRect().bottom)/(vh*.6),0,1); f=f*(1-b);}
    if(plan){var r=plan.getBoundingClientRect(), c=clamp((vh*.85-r.top)/(vh*.6),0,1), d=clamp((vh*.6-r.bottom)/(vh*.6),0,1); f=Math.max(f,.3*c*(1-d));}
    if(reduced) f=Math.min(f,.9);
    PB.fade=f;
  }
  var fq=false; addEventListener("scroll",function(){if(!fq){fq=true;requestAnimationFrame(function(){fq=false;computeFade()})}},{passive:true});
  addEventListener("resize",computeFade); computeFade();
  layoutWires();
})();

/* ================= the 3D brain ================= */
const PB = window.PB;
const canvas = document.getElementById("brain");
function fail(){ PB.gl=false; document.documentElement.classList.add("no-gl"); if(canvas) canvas.style.display="none"; }
if (!canvas) { fail(); }
else {
  try { const probe=document.createElement("canvas"); if(!(probe.getContext("webgl2")||probe.getContext("webgl"))) throw new Error("no webgl"); start(); document.documentElement.classList.add("gl-on"); }
  catch (e) { console.warn("3D view unavailable:", e && e.message); fail(); }
}
function start(){
  const reduced = PB.reduced;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:"high-performance" });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const small = Math.min(innerWidth, innerHeight) < 700;
  PB.gl = true;

  /* ---------- seeded random + Perlin for the brain shape ---------- */
  let seed = 20261015; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const P = new Uint8Array(512); { const p=[...Array(256).keys()]; for(let i=255;i>0;i--){const j=Math.floor(rnd()*(i+1));[p[i],p[j]]=[p[j],p[i]];} for(let i=0;i<512;i++)P[i]=p[i&255]; }
  const fade=t=>t*t*t*(t*(t*6-15)+10), lerp=(a,b,t)=>a+(b-a)*t;
  const grad=(h,x,y,z)=>{const u=h<8?x:y,v=h<4?y:(h===12||h===14?x:z);return((h&1)?-u:u)+((h&2)?-v:v)};
  function perlin(x,y,z){let X=Math.floor(x)&255,Y=Math.floor(y)&255,Z=Math.floor(z)&255;x-=Math.floor(x);y-=Math.floor(y);z-=Math.floor(z);
    const u=fade(x),v=fade(y),w=fade(z),A=P[X]+Y,AA=P[A]+Z,AB=P[A+1]+Z,B=P[X+1]+Y,BA=P[B]+Z,BB=P[B+1]+Z;
    return lerp(lerp(lerp(grad(P[AA]&15,x,y,z),grad(P[BA]&15,x-1,y,z),u),lerp(grad(P[AB]&15,x,y-1,z),grad(P[BB]&15,x-1,y-1,z),u),v),
                lerp(lerp(grad(P[AA+1]&15,x,y,z-1),grad(P[BA+1]&15,x-1,y,z-1),u),lerp(grad(P[AB+1]&15,x,y-1,z-1),grad(P[BB+1]&15,x-1,y-1,z-1),u),v),w)}
  function unit(){let x,y,z,d;do{x=rnd()*2-1;y=rnd()*2-1;z=rnd()*2-1;d=x*x+y*y+z*z}while(d>1||d<1e-4);d=Math.sqrt(d);return[x/d,y/d,z/d]}

  /* cerebrum: two hemispheres, flattened base, temporal lobes, ridged gyri */
  function cortex(){
    for(let tries=0;tries<40;tries++){
      const u=unit(); const s=u[0]>=0?1:-1;
      let x=u[0]*0.9+s*0.075, y=u[1]*0.8, z=u[2]*1.16;
      if(y<-0.22) y=-0.22+(y+0.22)*0.5;
      const tl=Math.exp(-((y+0.22)**2)/0.05)*Math.exp(-((z-0.2)**2)/0.22);
      x+=s*0.12*tl*Math.abs(u[0]); y-=0.1*tl*Math.abs(u[0]);
      if(z>0&&y>0) y+=0.07*z;
      const n=perlin(x*3.3+7,y*3.3,z*3.3), ridge=1-Math.abs(n);
      if(rnd()>0.28+0.72*ridge*ridge) continue;
      const sc=1+0.09*(ridge*ridge-0.5);
      // longitudinal fissure: pull the top midline in
      const fiss=Math.exp(-(x*x)/0.006)*Math.max(0,y)*0.18;
      return [x*sc, y*sc-fiss, z*sc, ridge];
    }
    return [0,0,0,0];
  }

  const NS = small ? 0.5 : 1;
  const nCortex=Math.round(15000*NS), nInner=Math.round(3200*NS), nCereb=Math.round(1300*NS), nStem=Math.round(500*NS), nTrav=Math.round(2600*NS);

  /* colors */
  const C = { cyan:new THREE.Color("#00E1FF"), blue:new THREE.Color("#1E8BFF"), purple:new THREE.Color("#7B5CFF"), orange:new THREE.Color("#FF8A2B"), white:new THREE.Color("#CFF8FF") };

  const pos=[], col=[], sd=[], surf=[];
  const push=(x,y,z,c,s)=>{pos.push(x,y,z);col.push(c.r,c.g,c.b);sd.push(s)};
  for(let i=0;i<nCortex;i++){const [x,y,z,r]=cortex();surf.push([x,y,z]);
    const c=C.blue.clone().lerp(C.cyan,Math.min(1,r*1.1)).lerp(C.purple,Math.max(0,-y-0.05)*0.9); if(rnd()<0.04)c.copy(C.white); push(x,y,z,c,rnd())}
  for(let i=0;i<nInner;i++){const [x,y,z]=cortex();const k=0.2+0.72*Math.pow(rnd(),0.7);const c=C.blue.clone().lerp(C.purple,rnd()*0.6);push(x*k,y*k,z*k,c,rnd())}
  for(let i=0;i<nCereb;i++){const u=unit();let x=u[0]*0.52,y=u[1]*0.26-0.42,z=u[2]*0.34-0.78; const band=Math.abs(Math.sin(y*58));if(rnd()>0.35+0.65*band){i--;continue}
    push(x,y,z,C.purple.clone().lerp(C.cyan,0.35*rnd()),rnd())}
  for(let i=0;i<nStem;i++){const t=rnd();const a=rnd()*Math.PI*2,r=(0.14-0.05*t)*Math.sqrt(rnd());push(Math.cos(a)*r,-0.38-t*0.62,-0.22-t*0.12+Math.sin(a)*r,C.cyan.clone().lerp(C.blue,t),rnd())}

  /* neural links between nearby cortex points */
  const linkPos=[], linkT=[], linkPh=[]; const nLinks=Math.round(2600*NS);
  for(let i=0;i<nLinks;i++){const a=surf[Math.floor(rnd()*surf.length)];let best=null,bd=1e9;
    for(let k=0;k<40;k++){const b=surf[Math.floor(rnd()*surf.length)];const d=(a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2;if(d>0.004&&d<bd){bd=d;best=b}}
    if(!best||bd>0.16)continue;const ph=rnd();linkPos.push(...a,...best);linkT.push(0,1);linkPh.push(ph,ph)}
  PB.neurons = pos.length/3; PB.links = linkPos.length/6;

  /* ---------- shaders ---------- */
  const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
  vec3 breathe(vec3 p,float t){ return p*(1.0+0.022*sin(t*1.25+p.y*2.2+p.z*1.3)); }`;

  const pointVS = NOISE + `
  uniform float uTime,uPix,uSize,uMouseAmt,uUncoil,uTrav;
  uniform vec3 uMouse;
  attribute vec3 color; attribute float aSeed; attribute vec3 aTarget; attribute float aT;
  varying vec3 vCol; varying float vGlow;
  void main(){
    vec3 p = breathe(position,uTime);
    float f = 0.0;
    if(uMouseAmt>0.001){
      vec3 d = p-uMouse; float dist=length(d);
      f = uMouseAmt*exp(-dist*dist*4.0);
      if(f>0.002){
        p += normalize(d+1e-4)*f*0.16;
        p += vec3(snoise(p*5.0+uTime*1.3),snoise(p*5.0+17.0+uTime*1.3),snoise(p*5.0+31.0+uTime*1.3))*f*0.09;
      }
    }
    float k = 0.0;
    if(uTrav>0.5){
      k = clamp((uUncoil*1.3 - aT*0.95)/0.32,0.0,1.0); k=k*k*(3.0-2.0*k);
      vec3 flow = aTarget + vec3(snoise(aTarget*3.0+uTime*0.6),snoise(aTarget*3.0+9.0+uTime*0.6),0.0)*0.025;
      p = mix(p, flow, k);
    }
    float wave = 0.5+0.5*sin(uTime*2.1 - length(position)*5.5 + aSeed*6.2831);
    float fire = smoothstep(0.965,1.0,sin(uTime*0.75 + aSeed*61.0));
    float flick = 0.15*snoise(position*2.2+uTime*0.35);
    vGlow = 0.45 + 0.5*wave + fire*1.6 + f*2.2 + flick + k*0.4;
    vCol = color;
    vec4 mv = modelViewMatrix*vec4(p,1.0);
    gl_PointSize = uSize*uPix*(0.65+0.5*fract(aSeed*7.13)+fire*0.9+k*0.3)/max(0.5,-mv.z);
    gl_Position = projectionMatrix*mv;
  }`;
  const pointFS = `
  uniform float uAlpha;
  varying vec3 vCol; varying float vGlow;
  void main(){
    vec2 c=gl_PointCoord-0.5; float d=length(c); if(d>0.5) discard;
    float a=smoothstep(0.5,0.0,d); a*=a;
    gl_FragColor=vec4(vCol*vGlow, a*uAlpha);
  }`;

  const pix = Math.min(devicePixelRatio||1, small?1.5:1.75);
  function pointMat(trav){
    return new THREE.ShaderMaterial({
      uniforms:{uTime:{value:0},uPix:{value:pix},uSize:{value:small?14:13},uMouse:{value:new THREE.Vector3(9,9,9)},uMouseAmt:{value:0},uUncoil:{value:reduced?1:0},uTrav:{value:trav?1:0},uAlpha:{value:0.85}},
      vertexShader:pointVS, fragmentShader:pointFS, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending });
  }

  /* ---------- scene graph ---------- */
  const rig = new THREE.Group(); scene.add(rig);           // positions the brain (no spin)
  const spin = new THREE.Group(); rig.add(spin);           // slow rotation
  spin.rotation.set(0.12,-0.7,0);

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col,3));
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(sd,1));
  g.setAttribute("aTarget", new THREE.Float32BufferAttribute(new Float32Array(pos.length),3));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(new Float32Array(sd.length),1));
  const brainMat = pointMat(false);
  spin.add(new THREE.Points(g, brainMat));

  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.Float32BufferAttribute(linkPos,3));
  lg.setAttribute("aLT", new THREE.Float32BufferAttribute(linkT,1));
  lg.setAttribute("aPh", new THREE.Float32BufferAttribute(linkPh,1));
  const linkMat = new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader: NOISE + `uniform float uTime; attribute float aLT; attribute float aPh; varying float vLT; varying float vPh;
      void main(){ vLT=aLT; vPh=aPh; gl_Position=projectionMatrix*modelViewMatrix*vec4(breathe(position,uTime),1.0); }`,
    fragmentShader:`uniform float uTime; varying float vLT; varying float vPh;
      void main(){ float tr=fract(uTime*0.45+vPh*7.0); float b=smoothstep(0.18,0.0,abs(vLT-tr));
        gl_FragColor=vec4(mix(vec3(0.12,0.55,1.0),vec3(0.75,0.98,1.0),b), 0.05+b*0.5); }`,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending });
  spin.add(new THREE.LineSegments(lg, linkMat));

  /* server-like hardware core: stacked rack blades with status LEDs */
  const core = new THREE.Group(); spin.add(core);
  const edgeMat = new THREE.LineBasicMaterial({ color:0x00E1FF, transparent:true, opacity:0.16, blending:THREE.AdditiveBlending, depthWrite:false });
  const ledPos=[], ledSeed=[];
  for(let i=0;i<5;i++){
    const y=-0.22+i*0.11, w=0.7-Math.abs(i-2)*0.1;
    const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w,0.05,0.46)), edgeMat); e.position.y=y; core.add(e);
    for(let k=0;k<6;k++){ledPos.push(-w/2+0.07+k*0.045,y,0.235);ledSeed.push(rnd())}
  }
  const ledG=new THREE.BufferGeometry(); ledG.setAttribute("position",new THREE.Float32BufferAttribute(ledPos,3)); ledG.setAttribute("aSeed",new THREE.Float32BufferAttribute(ledSeed,1));
  const ledMat=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uPix:{value:pix}},
    vertexShader:`uniform float uTime,uPix; attribute float aSeed; varying float vOn; varying float vS;
      void main(){ vS=aSeed; vOn=step(0.45,fract(sin(floor(uTime*3.0+aSeed*10.0)*12.9898+aSeed*78.233)*43758.5453));
        vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=16.0*uPix/max(0.5,-mv.z); gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`varying float vOn; varying float vS; void main(){ float d=length(gl_PointCoord-0.5); if(d>0.5)discard;
      vec3 c = vS>0.82 ? vec3(1.0,0.54,0.17) : vec3(0.22,0.95,0.63); gl_FragColor=vec4(c*(0.35+vOn*1.4), smoothstep(0.5,0.1,d)); }`,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending});
  core.add(new THREE.Points(ledG, ledMat));

  /* soft luminous volume behind everything */
  const gc=document.createElement("canvas"); gc.width=gc.height=128; const gx=gc.getContext("2d");
  const rg=gx.createRadialGradient(64,64,0,64,64,64); rg.addColorStop(0,"rgba(80,200,255,0.55)"); rg.addColorStop(0.35,"rgba(30,120,255,0.22)"); rg.addColorStop(1,"rgba(0,0,0,0)");
  gx.fillStyle=rg; gx.fillRect(0,0,128,128);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(gc),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0.55}));
  glow.scale.set(4.2,3.6,1); rig.add(glow);

  /* ---------- cables: coiled at the stem, uncoiling down and out ---------- */
  const O=new THREE.Vector3(0,-1.0,-0.32);
  const cableDefs=[
    {c:"#00E1FF",r:0.020,end:[-6.8,-9.6,1.2],turn:0.0, ph:0.0},
    {c:"#00E1FF",r:0.016,end:[ 6.9,-9.2,1.0],turn:1.4, ph:1.7},
    {c:"#00E1FF",r:0.014,end:[ 0.15,-11.5,0.4],turn:2.6,ph:3.1},
    {c:"#1E8BFF",r:0.022,end:[-4.2,-11.0,0.8],turn:0.7, ph:0.9},
    {c:"#1E8BFF",r:0.020,end:[ 4.4,-11.2,0.9],turn:2.0, ph:2.4},
    {c:"#FF8A2B",r:0.011,end:[-8.2,-7.4,0.6],turn:3.3, ph:4.2, sata:true},
    {c:"#FF8A2B",r:0.011,end:[ 8.4,-7.0,0.7],turn:4.4, ph:5.0, sata:true},
    {c:"#7B5CFF",r:0.015,end:[-2.0,-12.0,0.3],turn:5.1, ph:0.4},
    {c:"#7B5CFF",r:0.015,end:[ 2.3,-12.2,0.3],turn:5.8, ph:2.9},
  ];
  const tubeVS=`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
  const tubeFS=`uniform vec3 uColor; uniform float uProg,uTime,uPhase; varying vec2 vUv;
    void main(){ if(vUv.x>uProg) discard;
      float head=smoothstep(0.035,0.0,uProg-vUv.x);
      float pulse=smoothstep(0.93,1.0,sin(vUv.x*42.0-uTime*4.0+uPhase));
      float fadeOut=smoothstep(1.0,0.82,vUv.x);
      float a=(0.42+pulse*0.5+head*0.9)*mix(0.6,1.0,fadeOut);
      gl_FragColor=vec4(uColor*(1.0+pulse*1.2+head*2.5), a); }`;
  const cables=[], curves=[];
  cableDefs.forEach((d,i)=>{
    const pts=[O.clone()];
    // tight coil around the stem first (this is what "uncoils")
    for(let k=1;k<=7;k++){const a=d.turn+k*1.05, r=0.16+k*0.035; pts.push(new THREE.Vector3(Math.cos(a)*r, -1.0-k*0.11, -0.32+Math.sin(a)*r))}
    const e=new THREE.Vector3(...d.end);
    const mid=new THREE.Vector3(e.x*0.32, -2.6+(e.y+2.6)*0.25, 0.35+e.z*0.4);
    const mid2=new THREE.Vector3(e.x*0.72, -2.6+(e.y+2.6)*0.62, 0.5+e.z*0.7);
    pts.push(mid,mid2,e);
    const curve=new THREE.CatmullRomCurve3(pts,false,"centripetal");
    curves.push(curve);
    const mkTube=(cv)=>{const m=new THREE.ShaderMaterial({uniforms:{uColor:{value:new THREE.Color(d.c)},uProg:{value:reduced?1:0},uTime:{value:0},uPhase:{value:d.ph}},
      vertexShader:tubeVS,fragmentShader:tubeFS,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
      const mesh=new THREE.Mesh(new THREE.TubeGeometry(cv, small?140:260, d.r, 6, false), m); rig.add(mesh); cables.push({mesh,m,i});};
    mkTube(curve);
    if(d.sata){ // SATA reads as a flat twin lead: add a parallel conductor
      const off=curve.getPoints(80).map((p,k,arr)=>{const t=curve.getTangent(k/(arr.length-1));const n=new THREE.Vector3(-t.y,t.x,0).normalize().multiplyScalar(0.045);return p.clone().add(n)});
      mkTube(new THREE.CatmullRomCurve3(off,false,"centripetal"));
    }
  });

  /* travellers: particles that stream out of the brain and ride the cables */
  const tp=[], tc=[], ts=[], tt=[], tg=[];
  for(let i=0;i<nTrav;i++){
    const a=surf[Math.floor(rnd()*surf.length)]; const k=0.35+0.4*rnd();
    tp.push(a[0]*k*0.6, a[1]*k*0.6-0.55, a[2]*k*0.6-0.2);
    const ci=Math.floor(rnd()*curves.length), t=Math.pow(rnd(),0.85), p=curves[ci].getPointAt(t);
    tg.push(p.x+(rnd()-0.5)*0.05, p.y+(rnd()-0.5)*0.05, p.z+(rnd()-0.5)*0.05);
    const c=new THREE.Color(cableDefs[ci].c).lerp(C.white,0.25*rnd()); tc.push(c.r,c.g,c.b); ts.push(rnd()); tt.push(t);
  }
  const trg=new THREE.BufferGeometry();
  trg.setAttribute("position",new THREE.Float32BufferAttribute(tp,3));
  trg.setAttribute("color",new THREE.Float32BufferAttribute(tc,3));
  trg.setAttribute("aSeed",new THREE.Float32BufferAttribute(ts,1));
  trg.setAttribute("aTarget",new THREE.Float32BufferAttribute(tg,3));
  trg.setAttribute("aT",new THREE.Float32BufferAttribute(tt,1));
  const travMat=pointMat(true); travMat.uniforms.uSize.value*=1.1;
  rig.add(new THREE.Points(trg, travMat));

  /* ---------- camera path tied to scroll ---------- */
  const V=(x,y,z)=>new THREE.Vector3(x,y,z);
  const camPath=new THREE.CatmullRomCurve3([V(0,0.15,5.4),V(0.55,-0.35,6.2),V(0.25,-2.8,7.0),V(0,-6.3,7.6)]);
  const lookPath=new THREE.CatmullRomCurve3([V(0,0,0),V(0,-0.45,0),V(0,-3.2,0),V(0,-7.4,0)]);
  const tmpP=new THREE.Vector3(), tmpL=new THREE.Vector3();

  /* ---------- pointer → turbulence in brain space ---------- */
  const ndc=new THREE.Vector2(9,9), ray=new THREE.Raycaster(), sph=new THREE.Sphere(new THREE.Vector3(),1.35), hit=new THREE.Vector3();
  let pointerIn=false;
  addEventListener("pointermove",e=>{ndc.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);pointerIn=true},{passive:true});
  document.addEventListener("pointerleave",()=>{pointerIn=false});

  /* ---------- sizing ---------- */
  let aspect=1, distMul=1, wide=true;
  function resize(){
    const w=innerWidth,h=innerHeight; renderer.setPixelRatio(pix); renderer.setSize(w,h,false);
    aspect=w/h; camera.aspect=aspect; camera.updateProjectionMatrix();
    wide=aspect>1.15 && w>760;
    const halfW=Math.tan(THREE.MathUtils.degToRad(22.5))*aspect;      // visible half-width per unit distance
    distMul=wide?Math.max(1,1.32/(halfW*5.4)):Math.max(1.12,1.38/(halfW*5.4));                                // keep the brain inside narrow screens
    if(reduced) draw(0);
  }
  addEventListener("resize",resize);

  /* ---------- frame ---------- */
  const clock=new THREE.Clock(); let t=0, mouseAmt=0, fpsAcc=0, fpsN=0, last=performance.now(), skip=0;
  function draw(dt){
    const p=PB.p, u=PB.u;
    const sm=THREE.MathUtils.smoothstep(p,0,0.32);
    rig.position.x = wide ? 1.45*(1-sm) : 0;
    rig.position.y = wide ? 0 : 0.95*(1-sm);
    spin.rotation.y += dt*0.09*(1-0.65*u);
    spin.rotation.x = 0.12+Math.sin(t*0.3)*0.05;
    camPath.getPoint(Math.min(p,0.999),tmpP); lookPath.getPoint(Math.min(p,0.999),tmpL);
    camera.position.set(tmpP.x*distMul, tmpP.y, tmpP.z*distMul);
    camera.lookAt(tmpL);
    // pointer turbulence
    let target=0;
    if(pointerIn && !reduced && p<0.5){
      ray.setFromCamera(ndc,camera); sph.center.copy(rig.position).add(new THREE.Vector3(0,0,0));
      if(ray.ray.intersectSphere(sph,hit)){ spin.worldToLocal(brainMat.uniforms.uMouse.value.copy(hit)); target=1; }
    }
    mouseAmt += (target-mouseAmt)*Math.min(1,dt*5);
    brainMat.uniforms.uMouseAmt.value=mouseAmt;
    for(const m of [brainMat,travMat]){m.uniforms.uTime.value=t;m.uniforms.uUncoil.value=u}
    linkMat.uniforms.uTime.value=t; ledMat.uniforms.uTime.value=t;
    cables.forEach(c=>{c.m.uniforms.uTime.value=t; c.m.uniforms.uProg.value=Math.min(1,Math.max(0,u*1.25-c.i*0.025))});
    glow.material.opacity=0.55*(1-0.5*u);
    renderer.render(scene,camera);
    PB.frames++;
  }
  function loop(now){
    requestAnimationFrame(loop);
    const fade=PB.fade; canvas.style.opacity=fade.toFixed(3);
    if(document.hidden || fade<0.02) { last=now; return; }
    if(fade<0.3 && (skip=(skip+1)%2)) return;           // half rate while it is only background
    const dt=Math.min(0.05,(now-last)/1000); last=now; t+=dt;
    const t0=performance.now(); draw(dt);
    fpsAcc+=dt; fpsN++; if(fpsAcc>0.5){PB.fps=fpsN/fpsAcc; PB.frameMs=1000*fpsAcc/fpsN; fpsAcc=0; fpsN=0;}
  }
  resize();
  if(reduced){ PB.p=0; PB.u=1; draw(0); PB.fps=0; }
  else requestAnimationFrame(loop);
}

