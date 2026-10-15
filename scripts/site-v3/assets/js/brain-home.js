/* Piets home "Piet's Brain" module (Oct 15 2026): Three.js 0.186.1 (MIT) + GSAP 3.15 ScrollTrigger + Lenis 1.3.26 (MIT) + page logic, bundled with esbuild. Source: scripts/brain-src/brain-home.src.js. Piets Technology Solutions Inc 631-871-5957. Much of this was prepared with AI; tell the owner about any mistake. */
var c_=Object.defineProperty;var h_=(r,t,e)=>t in r?c_(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Wt=(r,t,e)=>h_(r,typeof t!="symbol"?t+"":t,e);var Yp=0,Qu=1,qp=2;var Ta=1,Zp=2,co=3,Br=0,On=1,Zi=2,Ji=0,ho=1,Ea=2,ju=3,tf=4,Jp=5;var ls=100,$p=101,Kp=102,Qp=103,jp=104,tm=200,em=201,nm=202,im=203,ef=204,nf=205,rm=206,sm=207,om=208,am=209,lm=210,cm=211,hm=212,um=213,fm=214,Zl=0,Jl=1,$l=2,to=3,Kl=4,Ql=5,jl=6,tc=7,rf=0,dm=1,pm=2,Li=0,sf=1,of=2,af=3,lf=4,cf=5,hf=6,uf=7;var ff=300,zr=301,cs=302,Oc=303,Bc=304,Aa=306,ec=1e3,Gi=1001,nc=1002,fn=1003,mm=1004;var Ca=1005;var mn=1006,zc=1007;var kr=1008;var oi=1009,df=1010,pf=1011,uo=1012,kc=1013,Di=1014,Ni=1015,Ui=1016,Vc=1017,Gc=1018,fo=1020,mf=35902,gf=35899,_f=1021,xf=1022,vi=1023,Hi=1026,Vr=1027,vf=1028,Hc=1029,Gr=1030,Wc=1031;var Xc=1033,Ra=33776,Pa=33777,Ia=33778,La=33779,Yc=35840,qc=35841,Zc=35842,Jc=35843,$c=36196,Kc=37492,Qc=37496,jc=37488,th=37489,Da=37490,eh=37491,nh=37808,ih=37809,rh=37810,sh=37811,oh=37812,ah=37813,lh=37814,ch=37815,hh=37816,uh=37817,fh=37818,dh=37819,ph=37820,mh=37821,gh=36492,_h=36494,xh=36495,vh=36283,yh=36284,Na=36285,Sh=36286;var $o=2300,ic=2301,Yl=2302,Wu=2303,Xu=2400,Yu=2401,qu=2402;var gm=3200;var yf=0,_m=1,fr="",ii="srgb",Ko="srgb-linear",Qo="linear",Te="srgb";var ql=7680;var xm=519,vm=512,ym=513,Sm=514,Mh=515,Mm=516,bm=517,bh=518,wm=519,Sf=35044;var Mf="300 es",Ii=2e3,jo=2001;function u_(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function f_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ta(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Tm(){let r=ta("canvas");return r.style.display="block",r}var dp={},eo=null;function ea(...r){let t="THREE."+r.shift();eo?eo("log",t,...r):console.log(t,...r)}function Em(r){let t=r[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=r[1];e&&e.isStackTrace?r[0]+=" "+e.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Kt(...r){r=Em(r);let t="THREE."+r.shift();if(eo)eo("warn",t,...r);else{let e=r[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...r)}}function jt(...r){r=Em(r);let t="THREE."+r.shift();if(eo)eo("error",t,...r);else{let e=r[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...r)}}function os(...r){let t=r.join(" ");t in dp||(dp[t]=!0,Kt(...r))}function Am(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var Cm={[Zl]:Jl,[$l]:jl,[Kl]:tc,[to]:Ql,[Jl]:Zl,[jl]:$l,[tc]:Kl,[Ql]:to},Wi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pp=1234567,Qs=Math.PI/180,no=180/Math.PI;function hr(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[r&255]+Sn[r>>8&255]+Sn[r>>16&255]+Sn[r>>24&255]+"-"+Sn[t&255]+Sn[t>>8&255]+"-"+Sn[t>>16&15|64]+Sn[t>>24&255]+"-"+Sn[e&63|128]+Sn[e>>8&255]+"-"+Sn[e>>16&255]+Sn[e>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}function fe(r,t,e){return Math.max(t,Math.min(e,r))}function bf(r,t){return(r%t+t)%t}function d_(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function p_(r,t,e){return r!==t?(e-r)/(t-r):0}function qo(r,t,e){return(1-e)*r+e*t}function m_(r,t,e,n){return qo(r,t,1-Math.exp(-e*n))}function g_(r,t=1){return t-Math.abs(bf(r,t*2)-t)}function __(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function x_(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function v_(r,t){return r+Math.floor(Math.random()*(t-r+1))}function y_(r,t){return r+Math.random()*(t-r)}function S_(r){return r*(.5-Math.random())}function M_(r){r!==void 0&&(pp=r);let t=pp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function b_(r){return r*Qs}function w_(r){return r*no}function T_(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function E_(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function A_(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function C_(r,t,e,n,i){let s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),d=s((t-n)/2),u=o((t-n)/2),f=s((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*d,l*u,a*c);break;case"YZY":r.set(l*u,a*h,l*d,a*c);break;case"ZXZ":r.set(l*d,l*u,a*h,a*c);break;case"XZX":r.set(a*h,l*p,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*p,a*c);break;case"ZYZ":r.set(l*p,l*f,a*h,a*c);break;default:Kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ae(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var wf={DEG2RAD:Qs,RAD2DEG:no,generateUUID:hr,clamp:fe,euclideanModulo:bf,mapLinear:d_,inverseLerp:p_,lerp:qo,damp:m_,pingpong:g_,smoothstep:__,smootherstep:x_,randInt:v_,randFloat:y_,randFloatSpread:S_,seededRandom:M_,degToRad:b_,radToDeg:w_,isPowerOfTwo:T_,ceilPowerOfTwo:E_,floorPowerOfTwo:A_,setQuaternionFromProperEuler:C_,normalize:Ae,denormalize:Pi},Pf=class Pf{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Pf.prototype.isVector2=!0;var qt=Pf,Xi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=s[o+0],f=s[o+1],p=s[o+2],_=s[o+3];if(d!==_||l!==u||c!==f||h!==p){let m=l*u+c*f+h*p+d*_;m<0&&(u=-u,f=-f,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){let M=Math.acos(m),A=Math.sin(M);g=Math.sin(g*M)/A,a=Math.sin(a*M)/A,l=l*g+u*a,c=c*g+f*a,h=h*g+p*a,d=d*g+_*a}else{l=l*g+u*a,c=c*g+f*a,h=h*g+p*a,d=d*g+_*a;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[o],u=s[o+1],f=s[o+2],p=s[o+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),f=l(i/2),p=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+s*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},If=class If{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(mp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(mp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xu.copy(this).projectOnVector(t),this.sub(xu)}reflect(t){return this.sub(xu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};If.prototype.isVector3=!0;var k=If,xu=new k,mp=new Xi,Lf=class Lf{constructor(t,e,n,i,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],m=i[3],g=i[6],M=i[1],A=i[4],v=i[7],S=i[2],b=i[5],E=i[8];return s[0]=o*_+a*M+l*S,s[3]=o*m+a*A+l*b,s[6]=o*g+a*v+l*E,s[1]=c*_+h*M+d*S,s[4]=c*m+h*A+d*b,s[7]=c*g+h*v+d*E,s[2]=u*_+f*M+p*S,s[5]=u*m+f*A+p*b,s[8]=u*g+f*v+p*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*s,f=c*s-o*l,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vu.makeScale(t,e)),this}rotate(t){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vu.makeRotation(-t)),this}translate(t,e){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Lf.prototype.isMatrix3=!0;var ie=Lf,vu=new ie,gp=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_p=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function R_(){let r={enabled:!0,workingColorSpace:Ko,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Te&&(i.r=ur(i.r),i.g=ur(i.g),i.b=ur(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Te&&(i.r=js(i.r),i.g=js(i.g),i.b=js(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fr?Qo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Ko]:{primaries:t,whitePoint:n,transfer:Qo,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ii},outputColorSpaceConfig:{drawingBufferColorSpace:ii}},[ii]:{primaries:t,whitePoint:n,transfer:Te,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ii}}}),r}var _e=R_();function ur(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function js(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var Us,rc=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Us===void 0&&(Us=ta("canvas")),Us.width=t.width,Us.height=t.height;let i=Us.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Us}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ta("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ur(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ur(e[n]/255)*255):e[n]=ur(e[n]);return{data:e,width:t.width,height:t.height}}else return Kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},P_=0,io=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=hr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(yu(i[o].image)):s.push(yu(i[o]))}else s=yu(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function yu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?rc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Kt("Texture: Unable to serialize Texture."),{})}var I_=0,Su=new k,Nn=class r extends Wi{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=Gi,i=Gi,s=mn,o=kr,a=vi,l=oi,c=r.DEFAULT_ANISOTROPY,h=fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:I_++}),this.uuid=hr(),this.name="",this.source=new io(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Su).x}get height(){return this.source.getSize(Su).y}get depth(){return this.source.getSize(Su).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ff)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ec:t.x=t.x-Math.floor(t.x);break;case Gi:t.x=t.x<0?0:1;break;case nc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ec:t.y=t.y-Math.floor(t.y);break;case Gi:t.y=t.y<0?0:1;break;case nc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Nn.DEFAULT_IMAGE=null;Nn.DEFAULT_MAPPING=ff;Nn.DEFAULT_ANISOTROPY=1;var Df=class Df{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(c+1)/2,v=(f+1)/2,S=(g+1)/2,b=(h+u)/4,E=(d+_)/4,y=(p+m)/4;return A>v&&A>S?A<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(A),i=b/n,s=E/n):v>S?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=y/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=E/s,i=y/s),this.set(n,i,s,e),this}let M=Math.sqrt((m-p)*(m-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this.w=fe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this.w=fe(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Df.prototype.isVector4=!0;var Be=Df,sc=class extends Wi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Be(0,0,t,e),this.scissorTest=!1,this.viewport=new Be(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},s=new Nn(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new io(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends sc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},na=class extends Nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var oc=class extends Nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Fc=class Fc{constructor(t,e,n,i,s,o,a,l,c,h,d,u,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,d,u,f,p,_,m)}set(t,e,n,i,s,o,a,l,c,h,d,u,f,p,_,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=s,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fc().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Fs.setFromMatrixColumn(t,0).length(),s=1/Fs.setFromMatrixColumn(t,1).length(),o=1/Fs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u+_*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(L_,t,D_)}lookAt(t,e,n){let i=this.elements;return ei.subVectors(t,e),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),Er.crossVectors(n,ei),Er.lengthSq()===0&&(Math.abs(n.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),Er.crossVectors(n,ei)),Er.normalize(),_l.crossVectors(ei,Er),i[0]=Er.x,i[4]=_l.x,i[8]=ei.x,i[1]=Er.y,i[5]=_l.y,i[9]=ei.y,i[2]=Er.z,i[6]=_l.z,i[10]=ei.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],m=n[10],g=n[14],M=n[3],A=n[7],v=n[11],S=n[15],b=i[0],E=i[4],y=i[8],T=i[12],P=i[1],D=i[5],L=i[9],W=i[13],I=i[2],G=i[6],J=i[10],H=i[14],et=i[3],Y=i[7],R=i[11],j=i[15];return s[0]=o*b+a*P+l*I+c*et,s[4]=o*E+a*D+l*G+c*Y,s[8]=o*y+a*L+l*J+c*R,s[12]=o*T+a*W+l*H+c*j,s[1]=h*b+d*P+u*I+f*et,s[5]=h*E+d*D+u*G+f*Y,s[9]=h*y+d*L+u*J+f*R,s[13]=h*T+d*W+u*H+f*j,s[2]=p*b+_*P+m*I+g*et,s[6]=p*E+_*D+m*G+g*Y,s[10]=p*y+_*L+m*J+g*R,s[14]=p*T+_*W+m*H+g*j,s[3]=M*b+A*P+v*I+S*et,s[7]=M*E+A*D+v*G+S*Y,s[11]=M*y+A*L+v*J+S*R,s[15]=M*T+A*W+v*H+S*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],_=t[7],m=t[11],g=t[15],M=l*f-c*u,A=a*f-c*d,v=a*u-l*d,S=o*f-c*h,b=o*u-l*h,E=o*d-a*h;return e*(_*M-m*A+g*v)-n*(p*M-m*S+g*b)+i*(p*A-_*S+g*E)-s*(p*v-_*b+m*E)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(s*h-a*l)+i*(s*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],_=t[13],m=t[14],g=t[15],M=e*a-n*o,A=e*l-i*o,v=e*c-s*o,S=n*l-i*a,b=n*c-s*a,E=i*c-s*l,y=h*_-d*p,T=h*m-u*p,P=h*g-f*p,D=d*m-u*_,L=d*g-f*_,W=u*g-f*m,I=M*W-A*L+v*D+S*P-b*T+E*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return t[0]=(a*W-l*L+c*D)*G,t[1]=(i*L-n*W-s*D)*G,t[2]=(_*E-m*b+g*S)*G,t[3]=(u*b-d*E-f*S)*G,t[4]=(l*P-o*W-c*T)*G,t[5]=(e*W-i*P+s*T)*G,t[6]=(m*v-p*E-g*A)*G,t[7]=(h*E-u*v+f*A)*G,t[8]=(o*L-a*P+c*y)*G,t[9]=(n*P-e*L-s*y)*G,t[10]=(p*b-_*v+g*M)*G,t[11]=(d*v-h*b-f*M)*G,t[12]=(a*T-o*D-l*y)*G,t[13]=(e*D-n*T+i*y)*G,t[14]=(_*A-p*S-m*M)*G,t[15]=(h*S-d*A+u*M)*G,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,d=a+a,u=s*c,f=s*h,p=s*d,_=o*h,m=o*d,g=a*d,M=l*c,A=l*h,v=l*d,S=n.x,b=n.y,E=n.z;return i[0]=(1-(_+g))*S,i[1]=(f+v)*S,i[2]=(p-A)*S,i[3]=0,i[4]=(f-v)*b,i[5]=(1-(u+g))*b,i[6]=(m+M)*b,i[7]=0,i[8]=(p+A)*E,i[9]=(m-M)*E,i[10]=(1-(u+_))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let o=Fs.set(i[0],i[1],i[2]).length(),a=Fs.set(i[4],i[5],i[6]).length(),l=Fs.set(i[8],i[9],i[10]).length();s<0&&(o=-o),Ei.copy(this);let c=1/o,h=1/a,d=1/l;return Ei.elements[0]*=c,Ei.elements[1]*=c,Ei.elements[2]*=c,Ei.elements[4]*=h,Ei.elements[5]*=h,Ei.elements[6]*=h,Ei.elements[8]*=d,Ei.elements[9]*=d,Ei.elements[10]*=d,e.setFromRotationMatrix(Ei),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,s,o,a=Ii,l=!1){let c=this.elements,h=2*s/(e-t),d=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),p,_;if(l)p=s/(o-s),_=o*s/(o-s);else if(a===Ii)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===jo)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Ii,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-s),_=o/(o-s);else if(a===Ii)p=-2/(o-s),_=-(o+s)/(o-s);else if(a===jo)p=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Fc.prototype.isMatrix4=!0;var Ne=Fc,Fs=new k,Ei=new Ne,L_=new k(0,0,0),D_=new k(1,1,1),Er=new k,_l=new k,ei=new k,xp=new Ne,vp=new Xi,Ir=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-fe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vp.setFromEuler(this),this.setFromQuaternion(vp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ir.DEFAULT_ORDER="XYZ";var ro=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},N_=0,yp=new k,Os=new Xi,rr=new Ne,xl=new k,zo=new k,U_=new k,F_=new Xi,Sp=new k(1,0,0),Mp=new k(0,1,0),bp=new k(0,0,1),wp={type:"added"},O_={type:"removed"},Bs={type:"childadded",child:null},Mu={type:"childremoved",child:null},Un=class r extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new k,e=new Ir,n=new Xi,i=new k(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ne},normalMatrix:{value:new ie}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.multiply(Os),this}rotateOnWorldAxis(t,e){return Os.setFromAxisAngle(t,e),this.quaternion.premultiply(Os),this}rotateX(t){return this.rotateOnAxis(Sp,t)}rotateY(t){return this.rotateOnAxis(Mp,t)}rotateZ(t){return this.rotateOnAxis(bp,t)}translateOnAxis(t,e){return yp.copy(t).applyQuaternion(this.quaternion),this.position.add(yp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sp,t)}translateY(t){return this.translateOnAxis(Mp,t)}translateZ(t){return this.translateOnAxis(bp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rr.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xl.copy(t):xl.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rr.lookAt(zo,xl,this.up):rr.lookAt(xl,zo,this.up),this.quaternion.setFromRotationMatrix(rr),i&&(rr.extractRotation(i.matrixWorld),Os.setFromRotationMatrix(rr),this.quaternion.premultiply(Os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wp),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(O_),Mu.child=t,this.dispatchEvent(Mu),Mu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rr.multiply(t.parent.matrixWorld)),t.applyMatrix4(rr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wp),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,t,U_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,F_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Un.DEFAULT_UP=new k(0,1,0);Un.DEFAULT_MATRIX_AUTO_UPDATE=!0;Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cr=class extends Un{constructor(){super(),this.isGroup=!0,this.type="Group"}},B_={type:"move"},so=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(B_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new cr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ar={h:0,s:0,l:0},vl={h:0,s:0,l:0};function bu(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var de=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ii){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=_e.workingColorSpace){return this.r=t,this.g=e,this.b=n,_e.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=_e.workingColorSpace){if(t=bf(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=bu(o,s,t+1/3),this.g=bu(o,s,t),this.b=bu(o,s,t-1/3)}return _e.colorSpaceToWorking(this,i),this}setStyle(t,e=ii){function n(s){s!==void 0&&parseFloat(s)<1&&Kt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Kt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);Kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ii){let n=Rm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ur(t.r),this.g=ur(t.g),this.b=ur(t.b),this}copyLinearToSRGB(t){return this.r=js(t.r),this.g=js(t.g),this.b=js(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ii){return _e.workingToColorSpace(Mn.copy(this),t),Math.round(fe(Mn.r*255,0,255))*65536+Math.round(fe(Mn.g*255,0,255))*256+Math.round(fe(Mn.b*255,0,255))}getHexString(t=ii){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.workingToColorSpace(Mn.copy(this),e);let n=Mn.r,i=Mn.g,s=Mn.b,o=Math.max(n,i,s),a=Math.min(n,i,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=_e.workingColorSpace){return _e.workingToColorSpace(Mn.copy(this),e),t.r=Mn.r,t.g=Mn.g,t.b=Mn.b,t}getStyle(t=ii){_e.workingToColorSpace(Mn.copy(this),t);let e=Mn.r,n=Mn.g,i=Mn.b;return t!==ii?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ar),this.setHSL(Ar.h+t,Ar.s+e,Ar.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ar),t.getHSL(vl);let n=qo(Ar.h,vl.h,e),i=qo(Ar.s,vl.s,e),s=qo(Ar.l,vl.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new de;de.NAMES=Rm;var ia=class extends Un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ir,this.environmentIntensity=1,this.environmentRotation=new Ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ai=new k,sr=new k,wu=new k,or=new k,zs=new k,ks=new k,Tp=new k,Tu=new k,Eu=new k,Au=new k,Cu=new Be,Ru=new Be,Pu=new Be,Vi=class r{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ai.subVectors(t,e),i.cross(Ai);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ai.subVectors(i,e),sr.subVectors(n,e),wu.subVectors(t,e);let o=Ai.dot(Ai),a=Ai.dot(sr),l=Ai.dot(wu),c=sr.dot(sr),h=sr.dot(wu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,or)===null?!1:or.x>=0&&or.y>=0&&or.x+or.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,or)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,or.x),l.addScaledVector(o,or.y),l.addScaledVector(a,or.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return Cu.setScalar(0),Ru.setScalar(0),Pu.setScalar(0),Cu.fromBufferAttribute(t,e),Ru.fromBufferAttribute(t,n),Pu.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Cu,s.x),o.addScaledVector(Ru,s.y),o.addScaledVector(Pu,s.z),o}static isFrontFacing(t,e,n,i){return Ai.subVectors(n,e),sr.subVectors(t,e),Ai.cross(sr).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ai.subVectors(this.c,this.b),sr.subVectors(this.a,this.b),Ai.cross(sr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;zs.subVectors(i,n),ks.subVectors(s,n),Tu.subVectors(t,n);let l=zs.dot(Tu),c=ks.dot(Tu);if(l<=0&&c<=0)return e.copy(n);Eu.subVectors(t,i);let h=zs.dot(Eu),d=ks.dot(Eu);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(zs,o);Au.subVectors(t,s);let f=zs.dot(Au),p=ks.dot(Au);if(p>=0&&f<=p)return e.copy(s);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(ks,a);let m=h*p-f*d;if(m<=0&&d-h>=0&&f-p>=0)return Tp.subVectors(s,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(Tp,a);let g=1/(m+_+u);return o=_*g,a=u*g,e.copy(n).addScaledVector(zs,o).addScaledVector(ks,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Lr=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ci):Ci.fromBufferAttribute(s,o),Ci.applyMatrix4(t.matrixWorld),this.expandByPoint(Ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yl.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yl.copy(n.boundingBox)),yl.applyMatrix4(t.matrixWorld),this.union(yl)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ci),Ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ko),Sl.subVectors(this.max,ko),Vs.subVectors(t.a,ko),Gs.subVectors(t.b,ko),Hs.subVectors(t.c,ko),Cr.subVectors(Gs,Vs),Rr.subVectors(Hs,Gs),ns.subVectors(Vs,Hs);let e=[0,-Cr.z,Cr.y,0,-Rr.z,Rr.y,0,-ns.z,ns.y,Cr.z,0,-Cr.x,Rr.z,0,-Rr.x,ns.z,0,-ns.x,-Cr.y,Cr.x,0,-Rr.y,Rr.x,0,-ns.y,ns.x,0];return!Iu(e,Vs,Gs,Hs,Sl)||(e=[1,0,0,0,1,0,0,0,1],!Iu(e,Vs,Gs,Hs,Sl))?!1:(Ml.crossVectors(Cr,Rr),e=[Ml.x,Ml.y,Ml.z],Iu(e,Vs,Gs,Hs,Sl))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ar[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ar[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ar[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ar[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ar[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ar[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ar[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ar[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ar),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ar=[new k,new k,new k,new k,new k,new k,new k,new k],Ci=new k,yl=new Lr,Vs=new k,Gs=new k,Hs=new k,Cr=new k,Rr=new k,ns=new k,ko=new k,Sl=new k,Ml=new k,is=new k;function Iu(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){is.fromArray(r,s);let a=i.x*Math.abs(is.x)+i.y*Math.abs(is.y)+i.z*Math.abs(is.z),l=t.dot(is),c=e.dot(is),h=n.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var je=new k,bl=new qt,z_=0,ri=class extends Wi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:z_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sf,this.updateRanges=[],this.gpuType=Ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)bl.fromBufferAttribute(this,e),bl.applyMatrix3(t),this.setXY(e,bl.x,bl.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix3(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array),s=Ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ra=class extends ri{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var sa=class extends ri{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var tn=class extends ri{constructor(t,e,n){super(new Float32Array(t),e,n)}},k_=new Lr,Vo=new k,Lu=new k,Yi=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):k_.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vo.subVectors(t,this.center);let e=Vo.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Vo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vo.copy(t.center).add(Lu)),this.expandByPoint(Vo.copy(t.center).sub(Lu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},V_=0,_i=new Ne,Du=new Un,Ws=new k,ni=new Lr,Go=new Lr,un=new k,gn=class r extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(u_(t)?sa:ra)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new ie().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _i.makeRotationFromQuaternion(t),this.applyMatrix4(_i),this}rotateX(t){return _i.makeRotationX(t),this.applyMatrix4(_i),this}rotateY(t){return _i.makeRotationY(t),this.applyMatrix4(_i),this}rotateZ(t){return _i.makeRotationZ(t),this.applyMatrix4(_i),this}translate(t,e,n){return _i.makeTranslation(t,e,n),this.applyMatrix4(_i),this}scale(t,e,n){return _i.makeScale(t,e,n),this.applyMatrix4(_i),this}lookAt(t){return Du.lookAt(t),Du.updateMatrix(),this.applyMatrix4(Du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tn(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&Kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Lr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let n=this.boundingSphere.center;if(ni.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Go.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(ni.min,Go.min),ni.expandByPoint(un),un.addVectors(ni.max,Go.max),ni.expandByPoint(un)):(ni.expandByPoint(Go.min),ni.expandByPoint(Go.max))}ni.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)un.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(un));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)un.fromBufferAttribute(a,c),l&&(Ws.fromBufferAttribute(t,c),un.add(Ws)),i=Math.max(i,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ri(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let y=0;y<n.count;y++)a[y]=new k,l[y]=new k;let c=new k,h=new k,d=new k,u=new qt,f=new qt,p=new qt,_=new k,m=new k;function g(y,T,P){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,T),p.fromBufferAttribute(s,P),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(D),a[y].add(_),a[T].add(_),a[P].add(_),l[y].add(m),l[T].add(m),l[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let y=0,T=M.length;y<T;++y){let P=M[y],D=P.start,L=P.count;for(let W=D,I=D+L;W<I;W+=3)g(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let A=new k,v=new k,S=new k,b=new k;function E(y){S.fromBufferAttribute(i,y),b.copy(S);let T=a[y];A.copy(T),A.sub(S.multiplyScalar(S.dot(T))).normalize(),v.crossVectors(b,T);let D=v.dot(l[y])<0?-1:1;o.setXYZW(y,A.x,A.y,A.z,D)}for(let y=0,T=M.length;y<T;++y){let P=M[y],D=P.start,L=P.count;for(let W=D,I=D+L;W<I;W+=3)E(t.getX(W+0)),E(t.getX(W+1)),E(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ri(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new k,s=new k,o=new k,a=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){let p=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)un.fromBufferAttribute(t,e),un.normalize(),t.setXYZ(e,un.x,un.y,un.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let g=0;g<h;g++)u[p++]=c[f++]}return new ri(u,h,d)}if(this.index===null)return Kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ac=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sf,this.updateRanges=[],this.version=0,this.uuid=hr()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}},Dn=new k,oa=class r{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyMatrix4(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyNormalMatrix(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.transformDirection(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pi(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array),s=Ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new ri(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Nu=new k,G_=new k,H_=new ie,Ri=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Nu.subVectors(n,e).cross(G_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(Nu),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||H_.getNormalMatrix(t),i=this.coplanarPoint(Nu).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},W_=0,qi=class extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=hr(),this.name="",this.type="Material",this.blending=ho,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ef,this.blendDst=nf,this.blendEquation=ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=to,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ql,this.stencilZFail=ql,this.stencilZPass=ql,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Kt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new de().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ri().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new qt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},oo=class extends qi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Xs,Ho=new k,Ys=new k,qs=new k,Zs=new qt,Wo=new qt,Pm=new Ne,wl=new k,Xo=new k,Tl=new k,Ep=new qt,Uu=new qt,Ap=new qt,aa=class extends Un{constructor(t=new oo){if(super(),this.isSprite=!0,this.type="Sprite",Xs===void 0){Xs=new gn;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ac(e,5);Xs.setIndex([0,1,2,0,2,3]),Xs.setAttribute("position",new oa(n,3,0,!1)),Xs.setAttribute("uv",new oa(n,2,3,!1))}this.geometry=Xs,this.material=t,this.center=new qt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&jt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),Pm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),qs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-qs.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let o=this.center;El(wl.set(-.5,-.5,0),qs,o,Ys,i,s),El(Xo.set(.5,-.5,0),qs,o,Ys,i,s),El(Tl.set(.5,.5,0),qs,o,Ys,i,s),Ep.set(0,0),Uu.set(1,0),Ap.set(1,1);let a=t.ray.intersectTriangle(wl,Xo,Tl,!1,Ho);if(a===null&&(El(Xo.set(-.5,.5,0),qs,o,Ys,i,s),Uu.set(0,1),a=t.ray.intersectTriangle(wl,Tl,Xo,!1,Ho),a===null))return;let l=t.ray.origin.distanceTo(Ho);l<t.near||l>t.far||e.push({distance:l,point:Ho.clone(),uv:Vi.getInterpolation(Ho,wl,Xo,Tl,Ep,Uu,Ap,new qt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function El(r,t,e,n,i,s){Zs.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Wo.x=s*Zs.x-i*Zs.y,Wo.y=i*Zs.x+s*Zs.y):Wo.copy(Zs),r.copy(t),r.x+=Wo.x,r.y+=Wo.y,r.applyMatrix4(Pm)}var lr=new k,Fu=new k,Al=new k,Cl=new k,as=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,lr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=lr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(lr.copy(this.origin).addScaledVector(this.direction,e),lr.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fu.copy(t).add(e).multiplyScalar(.5),Al.copy(e).sub(t).normalize(),Cl.copy(this.origin).sub(Fu);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Al),a=Cl.dot(this.direction),l=-Cl.dot(Al),c=Cl.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=s*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Fu).addScaledVector(Al,u),f}intersectSphere(t,e){if(t.radius<0)return null;lr.subVectors(t.center,this.origin);let n=lr.dot(this.direction),i=lr.dot(lr)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,lr)!==null}intersectTriangle(t,e,n,i,s){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,p=e.x-o.x,_=e.y-o.y,m=e.z-o.z,g=n.x-o.x,M=n.y-o.y,A=n.z-o.z,v=Math.abs(l),S=Math.abs(c),b=Math.abs(h),E,y,T,P,D,L,W,I,G,J,H,et;if(v>=S&&v>=b?(T=l,L=d,G=p,et=g,l>=0?(E=c,y=h,P=u,D=f,W=_,I=m,J=M,H=A):(E=h,y=c,P=f,D=u,W=m,I=_,J=A,H=M)):S>=b?(T=c,L=u,G=_,et=M,c>=0?(E=h,y=l,P=f,D=d,W=m,I=p,J=A,H=g):(E=l,y=h,P=d,D=f,W=p,I=m,J=g,H=A)):(T=h,L=f,G=m,et=A,h>=0?(E=l,y=c,P=d,D=u,W=p,I=_,J=g,H=M):(E=c,y=l,P=u,D=d,W=_,I=p,J=M,H=g)),T===0)return null;let Y=E/T,R=y/T,j=1/T,At=P-Y*L,Rt=D-R*L,Jt=W-Y*G,Ht=I-R*G,Qt=J-Y*et,K=H-R*et,nt=Qt*Ht-K*Jt,O=At*K-Rt*Qt,ut=Jt*Rt-Ht*At;if(i){if(nt<0||O<0||ut<0)return null}else if((nt<0||O<0||ut<0)&&(nt>0||O>0||ut>0))return null;let at=nt+O+ut;if(at===0)return null;let lt=j*(nt*L+O*G+ut*et);return(at>0?lt<0:lt>0)?null:this.at(lt/at,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},la=class extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ir,this.combine=rf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Cp=new Ne,rs=new as,Rl=new Yi,Rp=new k,Pl=new k,Il=new k,Ll=new k,Ou=new k,Dl=new k,Pp=new k,Nl=new k,qn=class extends Un{constructor(t=new gn,e=new la){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Dl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],d=s[l];h!==0&&(Ou.fromBufferAttribute(d,t),o?Dl.addScaledVector(Ou,h):Dl.addScaledVector(Ou.sub(e),h))}e.add(Dl)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rl.copy(n.boundingSphere),Rl.applyMatrix4(s),rs.copy(t.ray).recast(t.near),!(Rl.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Rl,Rp)===null||rs.origin.distanceToSquared(Rp)>(t.far-t.near)**2))&&(Cp.copy(s).invert(),rs.copy(t.ray).applyMatrix4(Cp),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,rs)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],M=Math.max(m.start,f.start),A=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,S=A;v<S;v+=3){let b=a.getX(v),E=a.getX(v+1),y=a.getX(v+2);i=Ul(this,g,t,n,c,h,d,b,E,y),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let M=a.getX(m),A=a.getX(m+1),v=a.getX(m+2);i=Ul(this,o,t,n,c,h,d,M,A,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],M=Math.max(m.start,f.start),A=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,S=A;v<S;v+=3){let b=v,E=v+1,y=v+2;i=Ul(this,g,t,n,c,h,d,b,E,y),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let M=m,A=m+1,v=m+2;i=Ul(this,o,t,n,c,h,d,M,A,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function X_(r,t,e,n,i,s,o,a){let l;if(t.side===On?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Br,a),l===null)return null;Nl.copy(a),Nl.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Nl);return c<e.near||c>e.far?null:{distance:c,point:Nl.clone(),object:r}}function Ul(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Pl),r.getVertexPosition(l,Il),r.getVertexPosition(c,Ll);let h=X_(r,t,e,n,Pl,Il,Ll,Pp);if(h){let d=new k;Vi.getBarycoord(Pp,Pl,Il,Ll,d),i&&(h.uv=Vi.getInterpolatedAttribute(i,a,l,c,d,new qt)),s&&(h.uv1=Vi.getInterpolatedAttribute(s,a,l,c,d,new qt)),o&&(h.normal=Vi.getInterpolatedAttribute(o,a,l,c,d,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new k,materialIndex:0};Vi.getNormal(Pl,Il,Ll,u.normal),h.face=u,h.barycoord=d}return h}var lc=class extends Nn{constructor(t=null,e=1,n=1,i,s,o,a,l,c=fn,h=fn,d,u){super(null,o,a,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ss=new Yi,Y_=new qt(.5,.5),Fl=new k,ca=class{constructor(t=new Ri,e=new Ri,n=new Ri,i=new Ri,s=new Ri,o=new Ri){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ii,n=!1){let i=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],p=s[8],_=s[9],m=s[10],g=s[11],M=s[12],A=s[13],v=s[14],S=s[15];if(i[0].setComponents(c-o,f-h,g-p,S-M).normalize(),i[1].setComponents(c+o,f+h,g+p,S+M).normalize(),i[2].setComponents(c+a,f+d,g+_,S+A).normalize(),i[3].setComponents(c-a,f-d,g-_,S-A).normalize(),n)i[4].setComponents(l,u,m,v).normalize(),i[5].setComponents(c-l,f-u,g-m,S-v).normalize();else if(i[4].setComponents(c-l,f-u,g-m,S-v).normalize(),e===Ii)i[5].setComponents(c+l,f+u,g+m,S+v).normalize();else if(e===jo)i[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(t){ss.center.set(0,0,0);let e=Y_.distanceTo(t.center);return ss.radius=.7071067811865476+e,ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Fl.x=i.normal.x>0?t.max.x:t.min.x,Fl.y=i.normal.y>0?t.max.y:t.min.y,Fl.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Fl)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ao=class extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},cc=new k,hc=new k,Ip=new Ne,Yo=new as,Ol=new Yi,Bu=new k,Lp=new k,uc=class extends Un{constructor(t=new gn,e=new ao){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)cc.fromBufferAttribute(e,i-1),hc.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=cc.distanceTo(hc);t.setAttribute("lineDistance",new tn(n,1))}else Kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ol.copy(n.boundingSphere),Ol.applyMatrix4(i),Ol.radius+=s,t.ray.intersectsSphere(Ol)===!1)return;Ip.copy(i).invert(),Yo.copy(t.ray).applyMatrix4(Ip);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=c){let g=h.getX(_),M=h.getX(_+1),A=Bl(this,t,Yo,l,g,M,_);A&&e.push(A)}if(this.isLineLoop){let _=h.getX(p-1),m=h.getX(f),g=Bl(this,t,Yo,l,_,m,p-1);g&&e.push(g)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=c){let g=Bl(this,t,Yo,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=Bl(this,t,Yo,l,p-1,f,p-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Bl(r,t,e,n,i,s,o){let a=r.geometry.attributes.position;if(cc.fromBufferAttribute(a,i),hc.fromBufferAttribute(a,s),e.distanceSqToSegment(cc,hc,Bu,Lp)>n)return;Bu.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(Bu);if(!(c<t.near||c>t.far))return{distance:c,point:Lp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}var Dp=new k,Np=new k,ha=class extends uc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Dp.fromBufferAttribute(e,i),Np.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dp.distanceTo(Np);t.setAttribute("lineDistance",new tn(n,1))}else Kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var fc=class extends qi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Up=new Ne,Zu=new as,zl=new Yi,kl=new k,ua=class extends Un{constructor(t=new gn,e=new fc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zl.copy(n.boundingSphere),zl.applyMatrix4(i),zl.radius+=s,t.ray.intersectsSphere(zl)===!1)return;Up.copy(i).invert(),Zu.copy(t.ray).applyMatrix4(Up);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,_=f;p<_;p++){let m=c.getX(p);kl.fromBufferAttribute(d,m),Fp(kl,m,l,i,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,_=f;p<_;p++)kl.fromBufferAttribute(d,p),Fp(kl,p,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Fp(r,t,e,n,i,s,o){let a=Zu.distanceSqToPoint(r);if(a<e){let l=new k;Zu.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var fa=class extends Nn{constructor(t=[],e=zr,n,i,s,o,a,l,c,h){super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},da=class extends Nn{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Dr=class extends Nn{constructor(t,e,n=Di,i,s,o,a=fn,l=fn,c,h=Hi,d=1){if(h!==Hi&&h!==Vr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new io(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},dc=class extends Dr{constructor(t,e=Di,n=zr,i,s,o=fn,a=fn,l,c=Hi){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},pa=class extends Nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Nr=class r extends gn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(h,3)),this.setAttribute("uv",new tn(d,2));function p(_,m,g,M,A,v,S,b,E,y,T){let P=v/E,D=S/y,L=v/2,W=S/2,I=b/2,G=E+1,J=y+1,H=0,et=0,Y=new k;for(let R=0;R<J;R++){let j=R*D-W;for(let At=0;At<G;At++){let Rt=At*P-L;Y[_]=Rt*M,Y[m]=j*A,Y[g]=I,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[g]=b>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(At/E),d.push(1-R/y),H+=1}}for(let R=0;R<y;R++)for(let j=0;j<E;j++){let At=u+j+G*R,Rt=u+j+G*(R+1),Jt=u+(j+1)+G*(R+1),Ht=u+(j+1)+G*R;l.push(At,Rt,Ht),l.push(Rt,Jt,Ht),et+=6}a.addGroup(f,et,T),f+=et,u+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Vl=new k,Gl=new k,zu=new k,Hl=new Vi,ma=class extends gn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),s=Math.cos(Qs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:m,c:g}=Hl;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),g.fromBufferAttribute(a,c[2]),Hl.getNormal(zu),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,d[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let A=(M+1)%3,v=d[M],S=d[A],b=Hl[h[M]],E=Hl[h[A]],y=`${v}_${S}`,T=`${S}_${v}`;T in u&&u[T]?(zu.dot(u[T].normal)<=s&&(f.push(b.x,b.y,b.z),f.push(E.x,E.y,E.z)),u[T]=null):y in u||(u[y]={index0:c[M],index1:c[A],normal:zu.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:m}=u[p];Vl.fromBufferAttribute(a,_),Gl.fromBufferAttribute(a,m),f.push(Vl.x,Vl.y,Vl.z),f.push(Gl.x,Gl.y,Gl.z)}this.setAttribute("position",new tn(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},xi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,s=n.length,o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new qt:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new k,i=[],s=[],o=[],a=new k,l=new Ne;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new k)}s[0]=new k,o[0]=new k;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(fe(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(fe(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ga=class extends xi{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new qt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);let a=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},pc=class extends ga{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Tf(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,d){let u=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(s){let o=s*s,a=o*s;return r+t*s+e*o+n*a}}}var Op=new k,Bp=new k,ku=new Tf,Vu=new Tf,Gu=new Tf,lo=class extends xi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new k){let n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Bp.subVectors(i[0],i[1]).add(i[0]),c=Bp);let d=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Op.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Op),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),ku.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,m),Vu.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,m),Gu.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(ku.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Vu.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Gu.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ku.calc(l),Vu.calc(l),Gu.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new k().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function zp(r,t,e,n,i){let s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function q_(r,t){let e=1-r;return e*e*t}function Z_(r,t){return 2*(1-r)*r*t}function J_(r,t){return r*r*t}function Zo(r,t,e,n){return q_(r,t)+Z_(r,e)+J_(r,n)}function $_(r,t){let e=1-r;return e*e*e*t}function K_(r,t){let e=1-r;return 3*e*e*r*t}function Q_(r,t){return 3*(1-r)*r*r*t}function j_(r,t){return r*r*r*t}function Jo(r,t,e,n,i){return $_(r,t)+K_(r,e)+Q_(r,n)+j_(r,i)}var mc=class extends xi{constructor(t=new qt,e=new qt,n=new qt,i=new qt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new qt){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Jo(t,i.x,s.x,o.x,a.x),Jo(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},gc=class extends xi{constructor(t=new k,e=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new k){let n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Jo(t,i.x,s.x,o.x,a.x),Jo(t,i.y,s.y,o.y,a.y),Jo(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},_c=class extends xi{constructor(t=new qt,e=new qt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new qt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new qt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xc=class extends xi{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vc=class extends xi{constructor(t=new qt,e=new qt,n=new qt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new qt){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Zo(t,i.x,s.x,o.x),Zo(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_a=class extends xi{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){let n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Zo(t,i.x,s.x,o.x),Zo(t,i.y,s.y,o.y),Zo(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yc=class extends xi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new qt){let n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(zp(a,l.x,c.x,h.x,d.x),zp(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new qt().fromArray(i))}return this}},tx=Object.freeze({__proto__:null,ArcCurve:pc,CatmullRomCurve3:lo,CubicBezierCurve:mc,CubicBezierCurve3:gc,EllipseCurve:ga,LineCurve:_c,LineCurve3:xc,QuadraticBezierCurve:vc,QuadraticBezierCurve3:_a,SplineCurve:yc});var xa=class r extends gn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let M=g*u-o;for(let A=0;A<c;A++){let v=A*d-s;p.push(v,-M,0),_.push(0,0,1),m.push(A/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<a;M++){let A=M+c*g,v=M+c*(g+1),S=M+1+c*(g+1),b=M+1+c*g;f.push(A,v,b),f.push(v,S,b)}this.setIndex(f),this.setAttribute("position",new tn(p,3)),this.setAttribute("normal",new tn(_,3)),this.setAttribute("uv",new tn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};var va=class r extends gn{constructor(t=new _a(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};let o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new k,l=new k,c=new qt,h=new k,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new tn(d,3)),this.setAttribute("normal",new tn(u,3)),this.setAttribute("uv",new tn(f,2));function _(){for(let A=0;A<e;A++)m(A);m(s===!1?e:0),M(),g()}function m(A){h=t.getPointAt(A/e,h);let v=o.normals[A],S=o.binormals[A];for(let b=0;b<=i;b++){let E=b/i*Math.PI*2,y=Math.sin(E),T=-Math.cos(E);l.x=T*v.x+y*S.x,l.y=T*v.y+y*S.y,l.z=T*v.z+y*S.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function g(){for(let A=1;A<=e;A++)for(let v=1;v<=i;v++){let S=(i+1)*(A-1)+(v-1),b=(i+1)*A+(v-1),E=(i+1)*A+v,y=(i+1)*(A-1)+v;p.push(S,b,y),p.push(b,E,y)}}function M(){for(let A=0;A<=e;A++)for(let v=0;v<=i;v++)c.x=A/e,c.y=v/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new r(new tx[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function hs(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];if(kp(i))i.isRenderTargetTexture?(Kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(kp(i[0])){let s=[];for(let o=0,a=i.length;o<a;o++)s[o]=i[o].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function wn(r){let t={};for(let e=0;e<r.length;e++){let n=hs(r[e]);for(let i in n)t[i]=n[i]}return t}function kp(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function ex(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Ef(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}var Im={clone:hs,merge:wn},nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fn=class extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nx,this.fragmentShader=ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=ex(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new de().setHex(i.value);break;case"v2":this.uniforms[n].value=new qt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new k().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Be().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ie().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ne().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Sc=class extends Fn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Mc=class extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bc=class extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Js(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function Hu(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Ur=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},wc=class extends Ur{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xu,endingEnd:Xu}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Yu:s=t,a=2*e-n;break;case qu:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Yu:o=t,l=2*n-e;break;case qu:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),_=p*p,m=_*p,g=-u*m+2*u*_-u*p,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*p+1,A=(-1-f)*m+(1.5+f)*_+.5*p,v=f*m-f*_;for(let S=0;S!==a;++S)s[S]=g*o[h+S]+M*o[c+S]+A*o[l+S]+v*o[d+S];return s}},Tc=class extends Ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)s[u]=o[c+u]*d+o[l+u]*h;return s}},Ec=class extends Ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ac=class extends Ur{interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-e)/(i-e),_=1-p;for(let m=0;m!==a;++m)s[m]=o[c+m]*_+o[l+m]*p;return s}let u=a*2,f=t-1;for(let p=0;p!==a;++p){let _=o[c+p],m=o[l+p],g=f*u+p*2,M=d[g],A=d[g+1],v=t*u+p*2,S=h[v],b=h[v+1],E=sx(n,e,M,S,i);s[p]=Lm(E,_,A,b,m)}return s}};function Lm(r,t,e,n,i){let s=1-r;return s*s*s*t+3*s*s*r*e+3*s*r*r*n+r*r*r*i}function rx(r,t,e,n,i){let s=1-r;return 3*s*s*(e-t)+6*s*r*(n-e)+3*r*r*(i-n)}function sx(r,t,e,n,i){let s=(r-t)/(i-t);for(let o=0;o<8;o++){let a=Lm(s,t,e,n,i)-r;if(Math.abs(a)<1e-10)break;let l=rx(s,t,e,n,i);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-a/l))}return s}var si=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Js(e,this.TimeBufferType),this.values=Js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Js(t.times,Array),values:Js(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Hu(t.settings)&&(n.settings={inTangents:Js(t.settings.inTangents,Array),outTangents:Js(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ec(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Tc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new wc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ac(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case $o:e=this.InterpolantFactoryMethodDiscrete;break;case ic:e=this.InterpolantFactoryMethodLinear;break;case Yl:e=this.InterpolantFactoryMethodSmooth;break;case Wu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Kt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $o;case this.InterpolantFactoryMethodLinear:return ic;case this.InterpolantFactoryMethodSmooth:return Yl;case this.InterpolantFactoryMethodBezier:return Wu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Hu(this.settings)&&(Vp(this.settings.inTangents,t),Vp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(jt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){jt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){jt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&f_(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){jt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yl,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=e[d+p];if(_!==e[u+p]||_!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Hu(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Vp(r,t){for(let e=0,n=r.length;e!==n;e+=2)r[e]*=t}si.prototype.ValueTypeName="";si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=ic;var Fr=class extends si{constructor(t,e,n){super(t,e,n)}};Fr.prototype.ValueTypeName="bool";Fr.prototype.ValueBufferType=Array;Fr.prototype.DefaultInterpolation=$o;Fr.prototype.InterpolantFactoryMethodLinear=void 0;Fr.prototype.InterpolantFactoryMethodSmooth=void 0;var Cc=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Cc.prototype.ValueTypeName="color";var Rc=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Rc.prototype.ValueTypeName="number";var Pc=class extends Ur{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Xi.slerpFlat(s,0,o,c-a,o,c,l);return s}},ya=class extends si{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Pc(this.times,this.values,this.getValueSize(),t)}};ya.prototype.ValueTypeName="quaternion";ya.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends si{constructor(t,e,n){super(t,e,n)}};Or.prototype.ValueTypeName="string";Or.prototype.ValueBufferType=Array;Or.prototype.DefaultInterpolation=$o;Or.prototype.InterpolantFactoryMethodLinear=void 0;Or.prototype.InterpolantFactoryMethodSmooth=void 0;var Ic=class extends si{constructor(t,e,n,i){super(t,e,n,i)}};Ic.prototype.ValueTypeName="vector";var Lc=class{constructor(t,e,n){let i=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Dm=new Lc,Dc=class{constructor(t){this.manager=t!==void 0?t:Dm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Dc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Wl=new k,Xl=new Xi,ki=new k,Sa=class extends Un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Wl,Xl,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wl,Xl,ki.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Wl,Xl,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wl,Xl,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Pr=new k,Gp=new qt,Hp=new qt,bn=class extends Sa{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=no*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return no*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pr.x,Pr.y).multiplyScalar(-t/Pr.z),Pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pr.x,Pr.y).multiplyScalar(-t/Pr.z)}getViewSize(t,e){return this.getViewBounds(t,Gp,Hp),e.subVectors(Hp,Gp)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Qs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ma=class extends Sa{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var $s=-90,Ks=1,Nc=class extends Un{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new bn($s,Ks,t,e);i.layers=this.layers,this.add(i);let s=new bn($s,Ks,t,e);s.layers=this.layers,this.add(s);let o=new bn($s,Ks,t,e);o.layers=this.layers,this.add(o);let a=new bn($s,Ks,t,e);a.layers=this.layers,this.add(a);let l=new bn($s,Ks,t,e);l.layers=this.layers,this.add(l);let c=new bn($s,Ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Uc=class extends bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Af="\\[\\]\\.:\\/",ox=new RegExp("["+Af+"]","g"),Cf="[^"+Af+"]",ax="[^"+Af.replace("\\.","")+"]",lx=/((?:WC+[\/:])*)/.source.replace("WC",Cf),cx=/(WCOD+)?/.source.replace("WCOD",ax),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cf),ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cf),fx=new RegExp("^"+lx+cx+hx+ux+"$"),dx=["material","materials","bones","map"],Ju=class{constructor(t,e,n){let i=n||Fe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Fe=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(ox,"")}static parseTrackName(t){let e=fx.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);dx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Fe.Composite=Ju;Fe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Fe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Fe.prototype.GetterByBindingType=[Fe.prototype._getValue_direct,Fe.prototype._getValue_array,Fe.prototype._getValue_arrayElement,Fe.prototype._getValue_toArray];Fe.prototype.SetterByBindingTypeAndVersioning=[[Fe.prototype._setValue_direct,Fe.prototype._setValue_direct_setNeedsUpdate,Fe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_array,Fe.prototype._setValue_array_setNeedsUpdate,Fe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_arrayElement,Fe.prototype._setValue_arrayElement_setNeedsUpdate,Fe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Fe.prototype._setValue_fromArray,Fe.prototype._setValue_fromArray_setNeedsUpdate,Fe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xw=new Float32Array(1);var Wp=new Ne,ba=class{constructor(t,e,n=0,i=1/0){this.ray=new as(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ro,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):jt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wp.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wp),this}intersectObject(t,e=!0,n=[]){return $u(t,this,n,e),n.sort(Xp),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)$u(t[i],this,n,e);return n.sort(Xp),n}};function Xp(r,t){return r.distance-t.distance}function $u(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)$u(s[o],t,e,!0)}}var wa=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Kt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var Nf=class Nf{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}};Nf.prototype.isMatrix2=!0;var Ku=Nf;function Rf(r,t,e,n){let i=px(n);switch(e){case _f:return r*t;case vf:return r*t/i.components*i.byteLength;case Hc:return r*t/i.components*i.byteLength;case Gr:return r*t*2/i.components*i.byteLength;case Wc:return r*t*2/i.components*i.byteLength;case xf:return r*t*3/i.components*i.byteLength;case vi:return r*t*4/i.components*i.byteLength;case Xc:return r*t*4/i.components*i.byteLength;case Ra:case Pa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ia:case La:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case qc:case Jc:return Math.max(r,16)*Math.max(t,8)/4;case Yc:case Zc:return Math.max(r,8)*Math.max(t,8)/2;case $c:case Kc:case jc:case th:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Qc:case Da:case eh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case nh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ih:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case rh:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case sh:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case oh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ah:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case lh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ch:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case hh:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case uh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case fh:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case dh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ph:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case mh:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case gh:case _h:case xh:return Math.ceil(r/4)*Math.ceil(t/4)*16;case vh:case yh:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Na:case Sh:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function px(r){switch(r){case oi:case df:return{byteLength:1,components:1};case uo:case pf:case Ui:return{byteLength:2,components:1};case Vc:case Gc:return{byteLength:2,components:4};case Di:case kc:case Ni:return{byteLength:4,components:1};case mf:case gf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function eg(){let r=null,t=!1,e=null,n=null;function i(s,o){n=r.requestAnimationFrame(i),e(s,o)}return{start:function(){t!==!0&&e!==null&&r!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function gx(r){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var _x=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ax=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Px=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ix=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,kx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ev=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ov=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,cv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,hv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_v=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,yv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ev=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Av=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ov=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,kv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Vv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$v=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ty=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ey=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ny=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,iy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ry=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,oy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ay=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ly=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,my=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_y=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,My=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,by=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ty=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ey=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ry=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ny=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,By=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ky=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Gy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$y=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,le={alphahash_fragment:_x,alphahash_pars_fragment:xx,alphamap_fragment:vx,alphamap_pars_fragment:yx,alphatest_fragment:Sx,alphatest_pars_fragment:Mx,aomap_fragment:bx,aomap_pars_fragment:wx,batching_pars_vertex:Tx,batching_vertex:Ex,begin_vertex:Ax,beginnormal_vertex:Cx,bsdfs:Rx,iridescence_fragment:Px,bumpmap_pars_fragment:Ix,clipping_planes_fragment:Lx,clipping_planes_pars_fragment:Dx,clipping_planes_pars_vertex:Nx,clipping_planes_vertex:Ux,color_fragment:Fx,color_pars_fragment:Ox,color_pars_vertex:Bx,color_vertex:zx,common:kx,cube_uv_reflection_fragment:Vx,defaultnormal_vertex:Gx,displacementmap_pars_vertex:Hx,displacementmap_vertex:Wx,emissivemap_fragment:Xx,emissivemap_pars_fragment:Yx,colorspace_fragment:qx,colorspace_pars_fragment:Zx,envmap_fragment:Jx,envmap_common_pars_fragment:$x,envmap_pars_fragment:Kx,envmap_pars_vertex:Qx,envmap_physical_pars_fragment:cv,envmap_vertex:jx,fog_vertex:tv,fog_pars_vertex:ev,fog_fragment:nv,fog_pars_fragment:iv,gradientmap_pars_fragment:rv,lightmap_pars_fragment:sv,lights_lambert_fragment:ov,lights_lambert_pars_fragment:av,lights_pars_begin:lv,lights_toon_fragment:hv,lights_toon_pars_fragment:uv,lights_phong_fragment:fv,lights_phong_pars_fragment:dv,lights_physical_fragment:pv,lights_physical_pars_fragment:mv,lights_fragment_begin:gv,lights_fragment_maps:_v,lights_fragment_end:xv,lightprobes_pars_fragment:vv,logdepthbuf_fragment:yv,logdepthbuf_pars_fragment:Sv,logdepthbuf_pars_vertex:Mv,logdepthbuf_vertex:bv,map_fragment:wv,map_pars_fragment:Tv,map_particle_fragment:Ev,map_particle_pars_fragment:Av,metalnessmap_fragment:Cv,metalnessmap_pars_fragment:Rv,morphinstance_vertex:Pv,morphcolor_vertex:Iv,morphnormal_vertex:Lv,morphtarget_pars_vertex:Dv,morphtarget_vertex:Nv,normal_fragment_begin:Uv,normal_fragment_maps:Fv,normal_pars_fragment:Ov,normal_pars_vertex:Bv,normal_vertex:zv,normalmap_pars_fragment:kv,clearcoat_normal_fragment_begin:Vv,clearcoat_normal_fragment_maps:Gv,clearcoat_pars_fragment:Hv,iridescence_pars_fragment:Wv,opaque_fragment:Xv,packing:Yv,premultiplied_alpha_fragment:qv,project_vertex:Zv,dithering_fragment:Jv,dithering_pars_fragment:$v,roughnessmap_fragment:Kv,roughnessmap_pars_fragment:Qv,shadowmap_pars_fragment:jv,shadowmap_pars_vertex:ty,shadowmap_vertex:ey,shadowmask_pars_fragment:ny,skinbase_vertex:iy,skinning_pars_vertex:ry,skinning_vertex:sy,skinnormal_vertex:oy,specularmap_fragment:ay,specularmap_pars_fragment:ly,tonemapping_fragment:cy,tonemapping_pars_fragment:hy,transmission_fragment:uy,transmission_pars_fragment:fy,uv_pars_fragment:dy,uv_pars_vertex:py,uv_vertex:my,worldpos_vertex:gy,background_vert:_y,background_frag:xy,backgroundCube_vert:vy,backgroundCube_frag:yy,cube_vert:Sy,cube_frag:My,depth_vert:by,depth_frag:wy,distance_vert:Ty,distance_frag:Ey,equirect_vert:Ay,equirect_frag:Cy,linedashed_vert:Ry,linedashed_frag:Py,meshbasic_vert:Iy,meshbasic_frag:Ly,meshlambert_vert:Dy,meshlambert_frag:Ny,meshmatcap_vert:Uy,meshmatcap_frag:Fy,meshnormal_vert:Oy,meshnormal_frag:By,meshphong_vert:zy,meshphong_frag:ky,meshphysical_vert:Vy,meshphysical_frag:Gy,meshtoon_vert:Hy,meshtoon_frag:Wy,points_vert:Xy,points_frag:Yy,shadow_vert:qy,shadow_frag:Zy,sprite_vert:Jy,sprite_frag:$y},Lt={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},Ki={basic:{uniforms:wn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:wn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new de(0)},envMapIntensity:{value:1}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:wn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:wn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:wn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new de(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:wn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:wn([Lt.points,Lt.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:wn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:wn([Lt.common,Lt.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:wn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:wn([Lt.sprite,Lt.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distance:{uniforms:wn([Lt.common,Lt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distance_vert,fragmentShader:le.distance_frag},shadow:{uniforms:wn([Lt.lights,Lt.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};Ki.physical={uniforms:wn([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};var wh={r:0,b:0,g:0},Ky=new Ne,ng=new ie;ng.set(-1,0,0,0,1,0,0,0,1);function Qy(r,t,e,n,i,s){let o=new de(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let v=M.backgroundBlurriness>0;A=t.get(A,v)}return A}function p(M){let A=!1,v=f(M);v===null?m(o,a):v&&v.isColor&&(m(v,1),A=!0);let S=r.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(r.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function _(M,A){let v=f(A);v&&(v.isCubeTexture||v.mapping===Aa)?(c===void 0&&(c=new qn(new Nr(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:hs(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ky.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ng),c.material.toneMapped=_e.getTransfer(v.colorSpace)!==Te,(h!==v||d!==v.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new qn(new xa(2,2),new Fn({name:"BackgroundMaterial",uniforms:hs(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=_e.getTransfer(v.colorSpace)!==Te,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,A){M.getRGB(wh,Ef(r)),e.buffers.color.setClear(wh.r,wh.g,wh.b,A,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,A=1){o.set(M),a=A,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:p,addToRenderList:_,dispose:g}}function jy(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,o=!1;function a(D,L,W,I,G){let J=!1,H=d(D,I,W,L);s!==H&&(s=H,c(s.object)),J=f(D,I,W,G),J&&p(D,I,W,G),G!==null&&t.update(G,r.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,v(D,L,W,I),G!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return r.createVertexArray()}function c(D){return r.bindVertexArray(D)}function h(D){return r.deleteVertexArray(D)}function d(D,L,W,I){let G=I.wireframe===!0,J=n[L.id];J===void 0&&(J={},n[L.id]=J);let H=D.isInstancedMesh===!0?D.id:0,et=J[H];et===void 0&&(et={},J[H]=et);let Y=et[W.id];Y===void 0&&(Y={},et[W.id]=Y);let R=Y[G];return R===void 0&&(R=u(l()),Y[G]=R),R}function u(D){let L=[],W=[],I=[];for(let G=0;G<e;G++)L[G]=0,W[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:I,object:D,attributes:{},index:null}}function f(D,L,W,I){let G=s.attributes,J=L.attributes,H=0,et=W.getAttributes();for(let Y in et)if(et[Y].location>=0){let j=G[Y],At=J[Y];if(At===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(At=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(At=D.instanceColor)),j===void 0||j.attribute!==At||At&&j.data!==At.data)return!0;H++}return s.attributesNum!==H||s.index!==I}function p(D,L,W,I){let G={},J=L.attributes,H=0,et=W.getAttributes();for(let Y in et)if(et[Y].location>=0){let j=J[Y];j===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(j=D.instanceColor));let At={};At.attribute=j,j&&j.data&&(At.data=j.data),G[Y]=At,H++}s.attributes=G,s.attributesNum=H,s.index=I}function _(){let D=s.newAttributes;for(let L=0,W=D.length;L<W;L++)D[L]=0}function m(D){g(D,0)}function g(D,L){let W=s.newAttributes,I=s.enabledAttributes,G=s.attributeDivisors;W[D]=1,I[D]===0&&(r.enableVertexAttribArray(D),I[D]=1),G[D]!==L&&(r.vertexAttribDivisor(D,L),G[D]=L)}function M(){let D=s.newAttributes,L=s.enabledAttributes;for(let W=0,I=L.length;W<I;W++)L[W]!==D[W]&&(r.disableVertexAttribArray(W),L[W]=0)}function A(D,L,W,I,G,J,H){H===!0?r.vertexAttribIPointer(D,L,W,G,J):r.vertexAttribPointer(D,L,W,I,G,J)}function v(D,L,W,I){_();let G=I.attributes,J=W.getAttributes(),H=L.defaultAttributeValues;for(let et in J){let Y=J[et];if(Y.location>=0){let R=G[et];if(R===void 0&&(et==="instanceMatrix"&&D.instanceMatrix&&(R=D.instanceMatrix),et==="instanceColor"&&D.instanceColor&&(R=D.instanceColor)),R!==void 0){let j=R.normalized,At=R.itemSize,Rt=t.get(R);if(Rt===void 0)continue;let Jt=Rt.buffer,Ht=Rt.type,Qt=Rt.bytesPerElement,K=Ht===r.INT||Ht===r.UNSIGNED_INT||R.gpuType===kc;if(R.isInterleavedBufferAttribute){let nt=R.data,O=nt.stride,ut=R.offset;if(nt.isInstancedInterleavedBuffer){for(let at=0;at<Y.locationSize;at++)g(Y.location+at,nt.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let at=0;at<Y.locationSize;at++)m(Y.location+at);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let at=0;at<Y.locationSize;at++)A(Y.location+at,At/Y.locationSize,Ht,j,O*Qt,(ut+At/Y.locationSize*at)*Qt,K)}else{if(R.isInstancedBufferAttribute){for(let nt=0;nt<Y.locationSize;nt++)g(Y.location+nt,R.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let nt=0;nt<Y.locationSize;nt++)m(Y.location+nt);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let nt=0;nt<Y.locationSize;nt++)A(Y.location+nt,At/Y.locationSize,Ht,j,At*Qt,At/Y.locationSize*nt*Qt,K)}}else if(H!==void 0){let j=H[et];if(j!==void 0)switch(j.length){case 2:r.vertexAttrib2fv(Y.location,j);break;case 3:r.vertexAttrib3fv(Y.location,j);break;case 4:r.vertexAttrib4fv(Y.location,j);break;default:r.vertexAttrib1fv(Y.location,j)}}}}M()}function S(){T();for(let D in n){let L=n[D];for(let W in L){let I=L[W];for(let G in I){let J=I[G];for(let H in J)h(J[H].object),delete J[H];delete I[G]}}delete n[D]}}function b(D){if(n[D.id]===void 0)return;let L=n[D.id];for(let W in L){let I=L[W];for(let G in I){let J=I[G];for(let H in J)h(J[H].object),delete J[H];delete I[G]}}delete n[D.id]}function E(D){for(let L in n){let W=n[L];for(let I in W){let G=W[I];if(G[D.id]===void 0)continue;let J=G[D.id];for(let H in J)h(J[H].object),delete J[H];delete G[D.id]}}}function y(D){for(let L in n){let W=n[L],I=D.isInstancedMesh===!0?D.id:0,G=W[I];if(G!==void 0){for(let J in G){let H=G[J];for(let et in H)h(H[et].object),delete H[et];delete G[J]}delete W[I],Object.keys(W).length===0&&delete n[L]}}}function T(){P(),o=!0,s!==i&&(s=i,c(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:T,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function tS(r,t,e){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(r.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function eS(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==vi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let y=E===Ui&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==oi&&E!==Ni&&!y&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),A=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=r.getParameter(r.MAX_SAMPLES),b=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:v,maxSamples:S,samples:b}}function nS(r){let t=this,e=null,n=0,i=!1,s=!1,o=new Ri,a=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,g=r.get(d);if(!i||p===null||p.length===0||s&&!m)s?h(null):c();else{let M=s?0:n,A=M*4,v=g.clippingState||null;l.value=v,v=h(p,u,A,f);for(let S=0;S!==A;++S)v[S]=e[S];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,p!==!0||m===null){let g=f+_*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let A=0,v=f;A!==_;++A,v+=4)o.copy(d[A]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var mo=4,iS=6,rS=20,sS=256,Ua=new Ma,Nm=new de,Uf=null,Ff=0,Of=0,Bf=!1,oS=new k,us=new k,Eh=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,s={}){let{size:o=256,position:a=oS}=s;Uf=this._renderer.getRenderTarget(),Ff=this._renderer.getActiveCubeFace(),Of=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Om(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Uf,Ff,Of),this._renderer.xr.enabled=Bf,t.scissorTest=!1,po(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zr||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Uf=this._renderer.getRenderTarget(),Ff=this._renderer.getActiveCubeFace(),Of=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Ui,format:vi,colorSpace:Ko,depthBuffer:!1},i=Um(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Um(t,e,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=aS(s)),this._blurMaterial=cS(s,t,e),this._ggxMaterial=lS(s,t,e)}return i}_compileMaterial(t){let e=new qn(new gn,t);this._renderer.compile(e,Ua)}_sceneToCubeUV(t,e,n,i,s){let l=new bn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Nm),d.toneMapping=Li,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qn(new Nr,new la({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,g=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,g=!0):(m.color.copy(Nm),g=!0);for(let A=0;A<6;A++){let v=A%3;v===0?(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[A],s.y,s.z)):v===1?(l.up.set(0,0,c[A]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[A],s.z)):(l.up.set(0,c[A],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[A]));let S=this._cubeSize;po(i,v*S,A>2?S:0,S,S),d.setRenderTarget(i),g&&d.render(_,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===zr||t.mapping===cs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Om()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fm());let s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;po(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ua)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],m=3*_*(n>p-mo?n-p+mo:0),g=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=p-e,po(s,m,g,3*_,2*_),i.setRenderTarget(s),i.render(a,Ua),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,po(t,m,g,3*_,2*_),i.setRenderTarget(t),i.render(a,Ua)}_blur(t,e,n,i){let s=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,o),this._blurPass(s,t,n,n,o)}_blurPass(t,e,n,i,s){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-mo?i-this._lodMax+mo:0),u=4*(this._cubeSize-h);po(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,Ua)}};function aS(r){let t=[],e=[],n=r,i=r-mo+1+iS;for(let s=0;s<i;s++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let g=0;g<d;g++){let M=g%3*2/3-1,A=g>2?0:-1,v=[M,A,0,M+2/3,A,0,M+2/3,A+1,0,M,A,0,M+2/3,A+1,0,M,A+1,0];p.set(v,f*u*g);for(let S=0;S<u;S++){let b=h[S*2]*2-1,E=h[S*2+1]*2-1;g===0?us.set(1,E,b):g===1?us.set(-b,1,-E):g===2?us.set(-b,E,1):g===3?us.set(-1,E,-b):g===4?us.set(-b,-1,E):us.set(b,E,-1),us.toArray(_,(g*u+S)*f)}}let m=new gn;m.setAttribute("position",new ri(p,f)),m.setAttribute("outputDirection",new ri(_,f)),e.push(new qn(m,null)),n>mo&&n--}return{lodMeshes:e,sizeLods:t}}function Um(r,t,e){let n=new Yn(r,t,e);return n.texture.mapping=Aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function po(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function lS(r,t,e){return new Fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function cS(r,t,e){return new Fn({name:"SphericalGaussianBlur",defines:{SAMPLES:rS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Rh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Fm(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Om(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Rh(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ah=class extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new fa(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Nr(5,5,5),s=new Fn({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:On,blending:Ji});s.uniforms.tEquirect.value=e;let o=new qn(i,s),a=e.minFilter;return e.minFilter===kr&&(e.minFilter=mn),new Nc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}};function hS(r){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===Oc||f===Bc)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new Ah(p.height);return _.fromEquirectangularTexture(r,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===Oc||f===Bc,_=f===zr||f===cs;if(p||_){let m=e.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Eh(r)),m=p?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return p&&M&&M.height>0||_&&M&&l(M)?(n===null&&(n=new Eh(r)),m=p?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,f){return f===Oc?u.mapping=zr:f===Bc&&(u.mapping=cs),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function uS(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=r.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&os("WebGLRenderer: "+n+" extension not supported."),i}}}function fS(r,t,e,n){let i={},s=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];let f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],r.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let M=f.array;_=f.version;for(let A=0,v=M.length;A<v;A+=3){let S=M[A+0],b=M[A+1],E=M[A+2];u.push(S,b,b,E,E,S)}}else{let M=p.array;_=p.version;for(let A=0,v=M.length/3-1;A<v;A+=3){let S=A+0,b=A+1,E=A+2;u.push(S,b,b,E,E,S)}}let m=new(p.count>=65535?sa:ra)(u,1);m.version=_;let g=s.get(d);g&&t.remove(g),s.set(d,m)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function dS(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,u){r.drawElements(n,u,s,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(r.drawElementsInstanced(n,u,s,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let _=0;for(let m=0;m<f;m++)_+=u[m];e.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function pS(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:jt("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function mS(r,t,e){let n=new WeakMap,i=new Be;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let T=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],A=0;f===!0&&(A=1),p===!0&&(A=2),_===!0&&(A=3);let v=a.attributes.position.count*A,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let b=new Float32Array(v*S*4*d),E=new na(b,v,S,d);E.type=Ni,E.needsUpdate=!0;let y=A*4;for(let P=0;P<d;P++){let D=m[P],L=g[P],W=M[P],I=v*S*4*P;for(let G=0;G<D.count;G++){let J=G*y;f===!0&&(i.fromBufferAttribute(D,G),b[I+J+0]=i.x,b[I+J+1]=i.y,b[I+J+2]=i.z,b[I+J+3]=0),p===!0&&(i.fromBufferAttribute(L,G),b[I+J+4]=i.x,b[I+J+5]=i.y,b[I+J+6]=i.z,b[I+J+7]=0),_===!0&&(i.fromBufferAttribute(W,G),b[I+J+8]=i.x,b[I+J+9]=i.y,b[I+J+10]=i.z,b[I+J+11]=W.itemSize===4?i.w:1)}}u={count:d,texture:E,size:new qt(v,S)},n.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",p),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function gS(r,t,e,n,i){let s=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function a(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var _S={[sf]:"LINEAR_TONE_MAPPING",[of]:"REINHARD_TONE_MAPPING",[af]:"CINEON_TONE_MAPPING",[lf]:"ACES_FILMIC_TONE_MAPPING",[hf]:"AGX_TONE_MAPPING",[uf]:"NEUTRAL_TONE_MAPPING",[cf]:"CUSTOM_TONE_MAPPING"};function xS(r,t,e,n,i,s){let o=new Yn(t,e,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new gn;c.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new tn([0,2,0,0,2,0],2));let h=new Sc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new qn(c,h),u=new Ma(-1,1,1,-1,0,1),f=null,p=null,_=!1,m,g=null,M=[],A=!1;this.setSize=function(v,S){o.setSize(v,S),a!==null&&a.setSize(v,S),l!==null&&l.setSize(v,S);for(let b=0;b<M.length;b++){let E=M[b];E.setSize&&E.setSize(v,S)}},this.setEffects=function(v){M=v,A=M.length>0&&M[0].isRenderPass===!0;let S=o.width,b=o.height;M.length>0&&a===null&&(a=new Yn(S,b,{type:Ui,depthBuffer:!1,stencilBuffer:!1}),l=new Yn(S,b,{type:Ui,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<M.length;E++){let y=M[E];y.setSize&&y.setSize(S,b)}},this.begin=function(v,S){if(_||v.toneMapping===Li&&M.length===0)return!1;if(g=S,S!==null){let b=S.width,E=S.height;(o.width!==b||o.height!==E)&&this.setSize(b,E)}return A===!1&&v.setRenderTarget(o),m=v.toneMapping,v.toneMapping=Li,!0},this.hasRenderPass=function(){return A},this.end=function(v,S){v.toneMapping=m,_=!0;let b=o,E=a;for(let y=0;y<M.length;y++){let T=M[y];T.enabled!==!1&&(T.render(v,E,b,S),T.needsSwap!==!1&&(b=E,E=E===a?l:a))}if(f!==v.outputColorSpace||p!==v.toneMapping){f=v.outputColorSpace,p=v.toneMapping,h.defines={},_e.getTransfer(f)===Te&&(h.defines.SRGB_TRANSFER="");let y=_S[p];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,v.setRenderTarget(g),v.render(d,u),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var ig=new Nn,Vf=new Dr(1,1),rg=new na,sg=new oc,og=new fa,Bm=[],zm=[],km=new Float32Array(16),Vm=new Float32Array(9),Gm=new Float32Array(4);function _o(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Bm[i];if(s===void 0&&(s=new Float32Array(i),Bm[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function sn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function on(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ph(r,t){let e=zm[t];e===void 0&&(e=new Int32Array(t),zm[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function vS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function yS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;r.uniform2fv(this.addr,t),on(e,t)}}function SS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(sn(e,t))return;r.uniform3fv(this.addr,t),on(e,t)}}function MS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;r.uniform4fv(this.addr,t),on(e,t)}}function bS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;Gm.set(n),r.uniformMatrix2fv(this.addr,!1,Gm),on(e,n)}}function wS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;Vm.set(n),r.uniformMatrix3fv(this.addr,!1,Vm),on(e,n)}}function TS(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;km.set(n),r.uniformMatrix4fv(this.addr,!1,km),on(e,n)}}function ES(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function AS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;r.uniform2iv(this.addr,t),on(e,t)}}function CS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;r.uniform3iv(this.addr,t),on(e,t)}}function RS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;r.uniform4iv(this.addr,t),on(e,t)}}function PS(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function IS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;r.uniform2uiv(this.addr,t),on(e,t)}}function LS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;r.uniform3uiv(this.addr,t),on(e,t)}}function DS(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;r.uniform4uiv(this.addr,t),on(e,t)}}function NS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Vf.compareFunction=e.isReversedDepthBuffer()?bh:Mh,s=Vf):s=ig,e.setTexture2D(t||s,i)}function US(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||sg,i)}function FS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||og,i)}function OS(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||rg,i)}function BS(r){switch(r){case 5126:return vS;case 35664:return yS;case 35665:return SS;case 35666:return MS;case 35674:return bS;case 35675:return wS;case 35676:return TS;case 5124:case 35670:return ES;case 35667:case 35671:return AS;case 35668:case 35672:return CS;case 35669:case 35673:return RS;case 5125:return PS;case 36294:return IS;case 36295:return LS;case 36296:return DS;case 35678:case 36198:case 36298:case 36306:case 35682:return NS;case 35679:case 36299:case 36307:return US;case 35680:case 36300:case 36308:case 36293:return FS;case 36289:case 36303:case 36311:case 36292:return OS}}function zS(r,t){r.uniform1fv(this.addr,t)}function kS(r,t){let e=_o(t,this.size,2);r.uniform2fv(this.addr,e)}function VS(r,t){let e=_o(t,this.size,3);r.uniform3fv(this.addr,e)}function GS(r,t){let e=_o(t,this.size,4);r.uniform4fv(this.addr,e)}function HS(r,t){let e=_o(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function WS(r,t){let e=_o(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function XS(r,t){let e=_o(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function YS(r,t){r.uniform1iv(this.addr,t)}function qS(r,t){r.uniform2iv(this.addr,t)}function ZS(r,t){r.uniform3iv(this.addr,t)}function JS(r,t){r.uniform4iv(this.addr,t)}function $S(r,t){r.uniform1uiv(this.addr,t)}function KS(r,t){r.uniform2uiv(this.addr,t)}function QS(r,t){r.uniform3uiv(this.addr,t)}function jS(r,t){r.uniform4uiv(this.addr,t)}function tM(r,t,e){let n=this.cache,i=t.length,s=Ph(e,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));let o;this.type===r.SAMPLER_2D_SHADOW?o=Vf:o=ig;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,s[a])}function eM(r,t,e){let n=this.cache,i=t.length,s=Ph(e,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||sg,s[o])}function nM(r,t,e){let n=this.cache,i=t.length,s=Ph(e,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||og,s[o])}function iM(r,t,e){let n=this.cache,i=t.length,s=Ph(e,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||rg,s[o])}function rM(r){switch(r){case 5126:return zS;case 35664:return kS;case 35665:return VS;case 35666:return GS;case 35674:return HS;case 35675:return WS;case 35676:return XS;case 5124:case 35670:return YS;case 35667:case 35671:return qS;case 35668:case 35672:return ZS;case 35669:case 35673:return JS;case 5125:return $S;case 36294:return KS;case 36295:return QS;case 36296:return jS;case 35678:case 36198:case 36298:case 36306:case 35682:return tM;case 35679:case 36299:case 36307:return eM;case 35680:case 36300:case 36308:case 36293:return nM;case 36289:case 36303:case 36311:case 36292:return iM}}var Gf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=BS(e.type)}},Hf=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rM(e.type)}},Wf=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},zf=/(\w+)(\])?(\[|\.)?/g;function Hm(r,t){r.seq.push(t),r.map[t.id]=t}function sM(r,t,e){let n=r.name,i=n.length;for(zf.lastIndex=0;;){let s=zf.exec(n),o=zf.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Hm(e,c===void 0?new Gf(a,r,t):new Hf(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new Wf(a),Hm(e,d)),e=d}}}var go=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);sM(a,l,this)}let i=[],s=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):s.push(o);i.length>0&&(this.seq=i.concat(s))}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Wm(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var oM=37297,aM=0;function lM(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Xm=new ie;function cM(r){_e._getMatrix(Xm,_e.workingColorSpace,r);let t=`mat3( ${Xm.elements.map(e=>e.toFixed(4))} )`;switch(_e.getTransfer(r)){case Qo:return[t,"LinearTransferOETF"];case Te:return[t,"sRGBTransferOETF"];default:return Kt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Ym(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+lM(r.getShaderSource(t),a)}else return s}function hM(r,t){let e=cM(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var uM={[sf]:"Linear",[of]:"Reinhard",[af]:"Cineon",[lf]:"ACESFilmic",[hf]:"AgX",[uf]:"Neutral",[cf]:"Custom"};function fM(r,t){let e=uM[t];return e===void 0?(Kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Th=new k;function dM(){_e.getLuminanceCoefficients(Th);let r=Th.x.toFixed(4),t=Th.y.toFixed(4),e=Th.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oa).join(`
`)}function mM(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function gM(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Oa(r){return r!==""}function qm(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zm(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _M=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xf(r){return r.replace(_M,vM)}var xM=new Map;function vM(r,t){let e=le[t];if(e===void 0){let n=xM.get(t);if(n!==void 0)e=le[n],Kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Xf(e)}var yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jm(r){return r.replace(yM,SM)}function SM(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function $m(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var MM={[Ta]:"SHADOWMAP_TYPE_PCF",[co]:"SHADOWMAP_TYPE_VSM"};function bM(r){return MM[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var wM={[zr]:"ENVMAP_TYPE_CUBE",[cs]:"ENVMAP_TYPE_CUBE",[Aa]:"ENVMAP_TYPE_CUBE_UV"};function TM(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":wM[r.envMapMode]||"ENVMAP_TYPE_CUBE"}var EM={[cs]:"ENVMAP_MODE_REFRACTION"};function AM(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":EM[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var CM={[rf]:"ENVMAP_BLENDING_MULTIPLY",[dm]:"ENVMAP_BLENDING_MIX",[pm]:"ENVMAP_BLENDING_ADD"};function RM(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":CM[r.combine]||"ENVMAP_BLENDING_NONE"}function PM(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function IM(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=bM(e),c=TM(e),h=AM(e),d=RM(e),u=PM(e),f=pM(e),p=mM(s),_=i.createProgram(),m,g,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Oa).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Oa).join(`
`),g.length>0&&(g+=`
`)):(m=[$m(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oa).join(`
`),g=[$m(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Li?"#define TONE_MAPPING":"",e.toneMapping!==Li?le.tonemapping_pars_fragment:"",e.toneMapping!==Li?fM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,hM("linearToOutputTexel",e.outputColorSpace),dM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Oa).join(`
`)),o=Xf(o),o=qm(o,e),o=Zm(o,e),a=Xf(a),a=qm(a,e),a=Zm(a,e),o=Jm(o),a=Jm(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===Mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let A=M+m+o,v=M+g+a,S=Wm(i,i.VERTEX_SHADER,A),b=Wm(i,i.FRAGMENT_SHADER,v);i.attachShader(_,S),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(D){if(r.debug.checkShaderErrors){let L=i.getProgramInfoLog(_)||"",W=i.getShaderInfoLog(S)||"",I=i.getShaderInfoLog(b)||"",G=L.trim(),J=W.trim(),H=I.trim(),et=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(et=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,S,b);else{let R=Ym(i,S,"vertex"),j=Ym(i,b,"fragment");jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+R+`
`+j)}else G!==""?Kt("WebGLProgram: Program Info Log:",G):(J===""||H==="")&&(Y=!1);Y&&(D.diagnostics={runnable:et,programLog:G,vertexShader:{log:J,prefix:m},fragmentShader:{log:H,prefix:g}})}i.deleteShader(S),i.deleteShader(b),y=new go(i,_),T=gM(i,_)}let y;this.getUniforms=function(){return y===void 0&&E(this),y};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(_,oM)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=aM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=b,this}var LM=0,Yf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new qf(t),e.set(t,n)),n}},qf=class{constructor(t){this.id=LM++,this.code=t,this.usedTimes=0}};function DM(r){return r===Gr||r===Da||r===Na}function NM(r,t,e,n,i,s){let o=new ro,a=new Yf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,T,P,D,L,W){let I=D.fog,G=L.geometry,J=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,et=t.get(y.envMap||J,H),Y=et&&et.mapping===Aa?et.image.height:null,R=f[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Kt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let j=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,At=j!==void 0?j.length:0,Rt=0;G.morphAttributes.position!==void 0&&(Rt=1),G.morphAttributes.normal!==void 0&&(Rt=2),G.morphAttributes.color!==void 0&&(Rt=3);let Jt,Ht,Qt,K;if(R){let Gt=Ki[R];Jt=Gt.vertexShader,Ht=Gt.fragmentShader}else{Jt=y.vertexShader,Ht=y.fragmentShader;let Gt=a.getVertexShaderStage(y),z=a.getFragmentShaderStage(y);a.update(y,Gt,z),Qt=Gt.id,K=z.id}let nt=r.getRenderTarget(),O=r.state.buffers.depth.getReversed(),ut=L.isInstancedMesh===!0,at=L.isBatchedMesh===!0,lt=!!y.map,_t=!!y.matcap,Tt=!!et,Pt=!!y.aoMap,Xt=!!y.lightMap,V=!!y.bumpMap&&y.wireframe===!1,te=!!y.normalMap,ce=!!y.displacementMap,xe=!!y.emissiveMap,$t=!!y.metalnessMap,me=!!y.roughnessMap,N=y.anisotropy>0,ye=y.clearcoat>0,bt=y.dispersion>0,C=y.retroreflectivity>0,x=y.iridescence>0,B=y.sheen>0,X=y.transmission>0,Q=N&&!!y.anisotropyMap,gt=ye&&!!y.clearcoatMap,ft=ye&&!!y.clearcoatNormalMap,it=ye&&!!y.clearcoatRoughnessMap,ot=x&&!!y.iridescenceMap,Mt=x&&!!y.iridescenceThicknessMap,Nt=B&&!!y.sheenColorMap,St=B&&!!y.sheenRoughnessMap,vt=!!y.specularMap,mt=!!y.specularColorMap,Bt=!!y.specularIntensityMap,Zt=X&&!!y.transmissionMap,U=X&&!!y.thicknessMap,xt=!!y.gradientMap,st=!!y.alphaMap,yt=y.alphaTest>0,wt=!!y.alphaHash,ct=!!y.extensions,dt=Li;y.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(dt=r.toneMapping);let ht={shaderID:R,shaderType:y.type,shaderName:y.name,vertexShader:Jt,fragmentShader:Ht,defines:y.defines,customVertexShaderID:Qt,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:at,batchingColor:at&&L._colorsTexture!==null,instancing:ut,instancingColor:ut&&L.instanceColor!==null,instancingMorph:ut&&L.morphTexture!==null,outputColorSpace:nt===null?r.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:_e.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:lt,matcap:_t,envMap:Tt,envMapMode:Tt&&et.mapping,envMapCubeUVHeight:Y,aoMap:Pt,lightMap:Xt,bumpMap:V,normalMap:te,displacementMap:ce,emissiveMap:xe,normalMapObjectSpace:te&&y.normalMapType===_m,normalMapTangentSpace:te&&y.normalMapType===yf,packedNormalMap:te&&y.normalMapType===yf&&DM(y.normalMap.format),metalnessMap:$t,roughnessMap:me,anisotropy:N,anisotropyMap:Q,clearcoat:ye,clearcoatMap:gt,clearcoatNormalMap:ft,clearcoatRoughnessMap:it,dispersion:bt,retroreflection:C,iridescence:x,iridescenceMap:ot,iridescenceThicknessMap:Mt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:St,specularMap:vt,specularColorMap:mt,specularIntensityMap:Bt,transmission:X,transmissionMap:Zt,thicknessMap:U,gradientMap:xt,opaque:y.transparent===!1&&y.blending===ho&&y.alphaToCoverage===!1,alphaMap:st,alphaTest:yt,alphaHash:wt,combine:y.combine,mapUv:lt&&p(y.map.channel),aoMapUv:Pt&&p(y.aoMap.channel),lightMapUv:Xt&&p(y.lightMap.channel),bumpMapUv:V&&p(y.bumpMap.channel),normalMapUv:te&&p(y.normalMap.channel),displacementMapUv:ce&&p(y.displacementMap.channel),emissiveMapUv:xe&&p(y.emissiveMap.channel),metalnessMapUv:$t&&p(y.metalnessMap.channel),roughnessMapUv:me&&p(y.roughnessMap.channel),anisotropyMapUv:Q&&p(y.anisotropyMap.channel),clearcoatMapUv:gt&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ft&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ot&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:Mt&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:St&&p(y.sheenRoughnessMap.channel),specularMapUv:vt&&p(y.specularMap.channel),specularColorMapUv:mt&&p(y.specularColorMap.channel),specularIntensityMapUv:Bt&&p(y.specularIntensityMap.channel),transmissionMapUv:Zt&&p(y.transmissionMap.channel),thicknessMapUv:U&&p(y.thicknessMap.channel),alphaMapUv:st&&p(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(te||N),vertexNormals:!!G.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!G.attributes.uv&&(lt||st),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||G.attributes.normal===void 0&&te===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:O,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Rt,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:dt,decodeVideoTexture:lt&&y.map.isVideoTexture===!0&&_e.getTransfer(y.map.colorSpace)===Te,decodeVideoTextureEmissive:xe&&y.emissiveMap.isVideoTexture===!0&&_e.getTransfer(y.emissiveMap.colorSpace)===Te,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Zi,flipSided:y.side===On,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ct&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&y.extensions.multiDraw===!0||at)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ht.vertexUv1s=l.has(1),ht.vertexUv2s=l.has(2),ht.vertexUv3s=l.has(3),l.clear(),ht}function m(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let P in y.defines)T.push(P),T.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(g(T,y),M(T,y),T.push(r.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function g(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function M(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.retroreflection&&o.enable(24),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function A(y){let T=f[y.type],P;if(T){let D=Ki[T];P=Im.clone(D.uniforms)}else P=y.uniforms;return P}function v(y,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new IM(r,T,y,i),c.push(P),h.set(T,P)),P}function S(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function b(y){a.remove(y)}function E(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:A,acquireProgram:v,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:E}}function UM(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function FM(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.materialVariant!==t.materialVariant?r.materialVariant-t.materialVariant:r.z!==t.z?r.z-t.z:r.id-t.id}function Km(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Qm(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,m,g){let M=r[t];return M===void 0?(M={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:g},r[t]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=p,M.materialVariant=o(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=g),t++,M}function l(u,f,p,_,m,g,M){M.reversedDepth===!0&&(m=-m);let A=a(u,f,p,_,m,g);p.transmission>0?n.push(A):p.transparent===!0?i.push(A):e.push(A)}function c(u,f,p,_,m,g){let M=a(u,f,p,_,m,g);p.transmission>0?n.unshift(M):p.transparent===!0?i.unshift(M):e.unshift(M)}function h(u,f){e.length>1&&e.sort(u||FM),n.length>1&&n.sort(f||Km),i.length>1&&i.sort(f||Km)}function d(){for(let u=t,f=r.length;u<f;u++){let p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:h}}function OM(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new Qm,r.set(n,[o])):i>=s.length?(o=new Qm,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function BM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new de};break;case"SpotLight":e={position:new k,direction:new k,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new de,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new de,groundColor:new de};break;case"RectAreaLight":e={color:new de,position:new k,halfWidth:new k,halfHeight:new k};break}return r[t.id]=e,e}}}function zM(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var kM=0;function VM(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function GM(r){let t=new BM,e=zM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);let i=new k,s=new Ne,o=new Ne;function a(c){let h=0,d=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,M=0,A=0,v=0,S=0,b=0,E=0,y=0,T=0,P=0;c.sort(VM);for(let L=0,W=c.length;L<W;L++){let I=c[L],G=I.color,J=I.intensity,H=I.distance,et=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Gr?et=I.shadow.map.texture:et=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*J,d+=G.g*J,u+=G.b*J;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],J);P++}else if(I.isSunLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let R=I.shadow,j=e.get(I);j.shadowIntensity=R.intensity,j.shadowBias=R.bias,j.shadowNormalBias=R.normalBias,j.shadowRadius=R.radius,j.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),n.sunShadow[p]=j,n.sunShadowMap[p]=et;let At=R.getViewportCount();for(let Rt=0;Rt<At;Rt++)n.sunShadowMatrix[_+Rt]=R.getMatrix(Rt),n.sunShadowCascade[_+Rt]=R._cascadeData[Rt];_+=At,p++}n.sun[f]=Y,f++}else if(I.isDirectionalLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let R=I.shadow,j=e.get(I);j.shadowIntensity=R.intensity,j.shadowBias=R.bias,j.shadowNormalBias=R.normalBias,j.shadowRadius=R.radius,j.shadowMapSize=R.mapSize,n.directionalShadow[m]=j,n.directionalShadowMap[m]=et,n.directionalShadowMatrix[m]=I.shadow.matrix,S++}n.directional[m]=Y,m++}else if(I.isSpotLight){let Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(G).multiplyScalar(J),Y.distance=H,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[M]=Y;let R=I.shadow;if(I.map&&(n.spotLightMap[y]=I.map,y++,R.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[M]=R.matrix,I.castShadow){let j=e.get(I);j.shadowIntensity=R.intensity,j.shadowBias=R.bias,j.shadowNormalBias=R.normalBias,j.shadowRadius=R.radius,j.shadowMapSize=R.mapSize,n.spotShadow[M]=j,n.spotShadowMap[M]=et,E++}M++}else if(I.isRectAreaLight){let Y=t.get(I);Y.color.copy(G).multiplyScalar(J),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[A]=Y,A++}else if(I.isPointLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){let R=I.shadow,j=e.get(I);j.shadowIntensity=R.intensity,j.shadowBias=R.bias,j.shadowNormalBias=R.normalBias,j.shadowRadius=R.radius,j.shadowMapSize=R.mapSize,j.shadowCameraNear=R.camera.near,j.shadowCameraFar=R.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=et,n.pointShadowMatrix[g]=I.shadow.matrix,b++}n.point[g]=Y,g++}else if(I.isHemisphereLight){let Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(J),Y.groundColor.copy(I.groundColor).multiplyScalar(J),n.hemi[v]=Y,v++}}A>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let D=n.hash;(D.sunLength!==f||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==M||D.rectAreaLength!==A||D.hemiLength!==v||D.numSunShadows!==p||D.numDirectionalShadows!==S||D.numPointShadows!==b||D.numSpotShadows!==E||D.numSpotMaps!==y||D.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=A,n.point.length=g,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,D.sunLength=f,D.directionalLength=m,D.pointLength=g,D.spotLength=M,D.rectAreaLength=A,D.hemiLength=v,D.numSunShadows=p,D.numDirectionalShadows=S,D.numPointShadows=b,D.numSpotShadows=E,D.numSpotMaps=y,D.numLightProbes=P,n.version=kM++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let M=0,A=c.length;M<A;M++){let v=c[M];if(v.isSunLight){let S=n.sun[d];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),u++}else if(v.isSpotLight){let S=n.spot[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let S=n.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function jm(r){let t=new GM(r),e=[],n=[],i=[];function s(u){d.camera=u,e.length=0,n.length=0,i.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){i.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function HM(r){let t=new WeakMap;function e(i,s=0){let o=t.get(i),a;return o===void 0?(a=new jm(r),t.set(i,[a])):s>=o.length?(a=new jm(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var WM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,YM=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],qM=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],tg=new Ne,Fa=new k,kf=new k;function ZM(r,t,e){let n=new ca,i=new qt,s=new qt,o=new Be,a=new Mc,l=new bc,c={},h=e.maxTextureSize,d={[Br]:On,[On]:Br,[Zi]:Zi},u=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:WM,fragmentShader:XM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new gn;p.setAttribute("position",new ri(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new qn(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ta;let g=this.type;this.render=function(b,E,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Zp&&(Kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ta);let T=r.getRenderTarget(),P=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Ji),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let W=g!==this.type;W&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=b.length;I<G;I++){let J=b[I],H=J.shadow;if(H===void 0){Kt("WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let et=H.getFrameExtents();i.multiply(et),s.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/et.x),i.x=s.x*et.x,H.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/et.y),i.y=s.y*et.y,H.mapSize.y=s.y));let Y=r.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Y,H.map===null||W===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===co){if(J.isPointLight){Kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Yn(i.x,i.y,{format:Gr,type:Ui,minFilter:mn,magFilter:mn,generateMipmaps:!1}),H.map.texture.name=J.name+".shadowMap",H.map.depthTexture=new Dr(i.x,i.y,Ni),H.map.depthTexture.name=J.name+".shadowMapDepth",H.map.depthTexture.format=Hi,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=fn,H.map.depthTexture.magFilter=fn}else J.isPointLight?(H.map=new Ah(i.x),H.map.depthTexture=new dc(i.x,Di)):(H.map=new Yn(i.x,i.y),H.map.depthTexture=new Dr(i.x,i.y,Di)),H.map.depthTexture.name=J.name+".shadowMap",H.map.depthTexture.format=Hi,this.type===Ta?(H.map.depthTexture.compareFunction=Y?bh:Mh,H.map.depthTexture.minFilter=mn,H.map.depthTexture.magFilter=mn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=fn,H.map.depthTexture.magFilter=fn);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==i.x||H.map.height!==i.y)&&H.map.setSize(i.x,i.y);let R=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();J.isPointLight!==!0&&H.updateMatrices(J,y);for(let j=0;j<R;j++){let At=H.getCamera(j);if(J.isPointLight){let Rt=H.camera,Jt=H.matrix,Ht=J.distance||Rt.far;Ht!==Rt.far&&(Rt.far=Ht,Rt.updateProjectionMatrix()),Fa.setFromMatrixPosition(J.matrixWorld),Rt.position.copy(Fa),kf.copy(Rt.position),kf.add(YM[j]),Rt.up.copy(qM[j]),Rt.lookAt(kf),Rt.updateMatrixWorld(),Jt.makeTranslation(-Fa.x,-Fa.y,-Fa.z),tg.multiplyMatrices(Rt.projectionMatrix,Rt.matrixWorldInverse),H._frustum.setFromProjectionMatrix(tg,Rt.coordinateSystem,Rt.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)r.setRenderTarget(H.map,j),r.clear();else{j===0&&(r.setRenderTarget(H.map),r.clear());let Rt=H.getViewport(j);o.set(s.x*Rt.x,s.y*Rt.y,s.x*Rt.z,s.y*Rt.w),L.viewport(o)}n=H.getFrustum(j),v(E,y,At,J,this.type)}H.isPointLightShadow!==!0&&this.type===co&&M(H,y),H.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(T,P,D)};function M(b,E){let y=t.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new Yn(i.x,i.y,{format:Gr,type:Ui}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(E,null,y,u,_,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(E,null,y,f,_,null)}function A(b,E,y,T){let P=null,D=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)P=D;else if(P=y.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let L=P.uuid,W=E.uuid,I=c[L];I===void 0&&(I={},c[L]=I);let G=I[W];G===void 0&&(G=P.clone(),I[W]=G,E.addEventListener("dispose",S)),P=G}if(P.visible=E.visible,P.wireframe=E.wireframe,T===co?P.side=E.shadowSide!==null?E.shadowSide:E.side:P.side=E.shadowSide!==null?E.shadowSide:d[E.side],P.alphaMap=E.alphaMap,P.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,P.map=E.map,P.clipShadows=E.clipShadows,P.clippingPlanes=E.clippingPlanes,P.clipIntersection=E.clipIntersection,P.displacementMap=E.displacementMap,P.displacementScale=E.displacementScale,P.displacementBias=E.displacementBias,P.wireframeLinewidth=E.wireframeLinewidth,P.linewidth=E.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let L=r.properties.get(P);L.light=y}return P}function v(b,E,y,T,P){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===co)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);let W=t.update(b),I=b.material;if(Array.isArray(I)){let G=W.groups;for(let J=0,H=G.length;J<H;J++){let et=G[J],Y=I[et.materialIndex];if(Y&&Y.visible){let R=A(b,Y,T,P);b.onBeforeShadow(r,b,E,y,W,R,et),r.renderBufferDirect(y,null,W,R,b,et),b.onAfterShadow(r,b,E,y,W,R,et)}}}else if(I.visible){let G=A(b,I,T,P);b.onBeforeShadow(r,b,E,y,W,G,null),r.renderBufferDirect(y,null,W,G,b,null),b.onAfterShadow(r,b,E,y,W,G,null)}}let L=b.children;for(let W=0,I=L.length;W<I;W++)v(L[W],E,y,T,P)}function S(b){b.target.removeEventListener("dispose",S);for(let y in c){let T=c[y],P=b.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function JM(r,t){function e(){let U=!1,xt=new Be,st=null,yt=new Be(0,0,0,0);return{setMask:function(wt){st!==wt&&!U&&(r.colorMask(wt,wt,wt,wt),st=wt)},setLocked:function(wt){U=wt},setClear:function(wt,ct,dt,ht,Gt){Gt===!0&&(wt*=ht,ct*=ht,dt*=ht),xt.set(wt,ct,dt,ht),yt.equals(xt)===!1&&(r.clearColor(wt,ct,dt,ht),yt.copy(xt))},reset:function(){U=!1,st=null,yt.set(-1,0,0,0)}}}function n(){let U=!1,xt=!1,st=null,yt=null,wt=null;return{setReversed:function(ct){if(xt!==ct){let dt=t.get("EXT_clip_control");ct?dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.ZERO_TO_ONE_EXT):dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.NEGATIVE_ONE_TO_ONE_EXT),xt=ct;let ht=wt;wt=null,this.setClear(ht)}},getReversed:function(){return xt},setTest:function(ct){ct?nt(r.DEPTH_TEST):O(r.DEPTH_TEST)},setMask:function(ct){st!==ct&&!U&&(r.depthMask(ct),st=ct)},setFunc:function(ct){if(xt&&(ct=Cm[ct]),yt!==ct){switch(ct){case Zl:r.depthFunc(r.NEVER);break;case Jl:r.depthFunc(r.ALWAYS);break;case $l:r.depthFunc(r.LESS);break;case to:r.depthFunc(r.LEQUAL);break;case Kl:r.depthFunc(r.EQUAL);break;case Ql:r.depthFunc(r.GEQUAL);break;case jl:r.depthFunc(r.GREATER);break;case tc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}yt=ct}},setLocked:function(ct){U=ct},setClear:function(ct){wt!==ct&&(wt=ct,xt&&(ct=1-ct),r.clearDepth(ct))},reset:function(){U=!1,st=null,yt=null,wt=null,xt=!1}}}function i(){let U=!1,xt=null,st=null,yt=null,wt=null,ct=null,dt=null,ht=null,Gt=null;return{setTest:function(z){U||(z?nt(r.STENCIL_TEST):O(r.STENCIL_TEST))},setMask:function(z){xt!==z&&!U&&(r.stencilMask(z),xt=z)},setFunc:function(z,tt,rt){(st!==z||yt!==tt||wt!==rt)&&(r.stencilFunc(z,tt,rt),st=z,yt=tt,wt=rt)},setOp:function(z,tt,rt){(ct!==z||dt!==tt||ht!==rt)&&(r.stencilOp(z,tt,rt),ct=z,dt=tt,ht=rt)},setLocked:function(z){U=z},setClear:function(z){Gt!==z&&(r.clearStencil(z),Gt=z)},reset:function(){U=!1,xt=null,st=null,yt=null,wt=null,ct=null,dt=null,ht=null,Gt=null}}}let s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,m=!1,g=null,M=null,A=null,v=null,S=null,b=null,E=null,y=new de(0,0,0),T=0,P=!1,D=null,L=null,W=null,I=null,G=null,J=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,et=0,Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(Y)[1]),H=et>=1):Y.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),H=et>=2);let R=null,j={},At=r.getParameter(r.SCISSOR_BOX),Rt=r.getParameter(r.VIEWPORT),Jt=new Be().fromArray(At),Ht=new Be().fromArray(Rt);function Qt(U,xt,st,yt){let wt=new Uint8Array(4),ct=r.createTexture();r.bindTexture(U,ct),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let dt=0;dt<st;dt++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(xt,0,r.RGBA,1,1,yt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(xt+dt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return ct}let K={};K[r.TEXTURE_2D]=Qt(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=Qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=Qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=Qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(r.DEPTH_TEST),o.setFunc(to),V(!1),te(Qu),nt(r.CULL_FACE),Pt(Ji);function nt(U){h[U]!==!0&&(r.enable(U),h[U]=!0)}function O(U){h[U]!==!1&&(r.disable(U),h[U]=!1)}function ut(U,xt){return u[U]!==xt?(r.bindFramebuffer(U,xt),u[U]=xt,U===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=xt),U===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=xt),!0):!1}function at(U,xt){let st=p,yt=!1;if(U){st=f.get(xt),st===void 0&&(st=[],f.set(xt,st));let wt=U.textures;if(st.length!==wt.length||st[0]!==r.COLOR_ATTACHMENT0){for(let ct=0,dt=wt.length;ct<dt;ct++)st[ct]=r.COLOR_ATTACHMENT0+ct;st.length=wt.length,yt=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,yt=!0);yt&&r.drawBuffers(st)}function lt(U){return _!==U?(r.useProgram(U),_=U,!0):!1}let _t={[ls]:r.FUNC_ADD,[$p]:r.FUNC_SUBTRACT,[Kp]:r.FUNC_REVERSE_SUBTRACT};_t[Qp]=r.MIN,_t[jp]=r.MAX;let Tt={[tm]:r.ZERO,[em]:r.ONE,[nm]:r.SRC_COLOR,[ef]:r.SRC_ALPHA,[lm]:r.SRC_ALPHA_SATURATE,[om]:r.DST_COLOR,[rm]:r.DST_ALPHA,[im]:r.ONE_MINUS_SRC_COLOR,[nf]:r.ONE_MINUS_SRC_ALPHA,[am]:r.ONE_MINUS_DST_COLOR,[sm]:r.ONE_MINUS_DST_ALPHA,[cm]:r.CONSTANT_COLOR,[hm]:r.ONE_MINUS_CONSTANT_COLOR,[um]:r.CONSTANT_ALPHA,[fm]:r.ONE_MINUS_CONSTANT_ALPHA};function Pt(U,xt,st,yt,wt,ct,dt,ht,Gt,z){if(U===Ji){m===!0&&(O(r.BLEND),m=!1);return}if(m===!1&&(nt(r.BLEND),m=!0),U!==Jp){if(U!==g||z!==P){if((M!==ls||S!==ls)&&(r.blendEquation(r.FUNC_ADD),M=ls,S=ls),z)switch(U){case ho:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ea:r.blendFunc(r.ONE,r.ONE);break;case ju:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tf:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:jt("WebGLState: Invalid blending: ",U);break}else switch(U){case ho:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ea:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ju:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tf:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",U);break}A=null,v=null,b=null,E=null,y.set(0,0,0),T=0,g=U,P=z}return}wt=wt||xt,ct=ct||st,dt=dt||yt,(xt!==M||wt!==S)&&(r.blendEquationSeparate(_t[xt],_t[wt]),M=xt,S=wt),(st!==A||yt!==v||ct!==b||dt!==E)&&(r.blendFuncSeparate(Tt[st],Tt[yt],Tt[ct],Tt[dt]),A=st,v=yt,b=ct,E=dt),(ht.equals(y)===!1||Gt!==T)&&(r.blendColor(ht.r,ht.g,ht.b,Gt),y.copy(ht),T=Gt),g=U,P=!1}function Xt(U,xt){U.side===Zi?O(r.CULL_FACE):nt(r.CULL_FACE);let st=U.side===On;xt&&(st=!st),V(st),U.blending===ho&&U.transparent===!1?Pt(Ji):Pt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);let yt=U.stencilWrite;a.setTest(yt),yt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),xe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(r.SAMPLE_ALPHA_TO_COVERAGE):O(r.SAMPLE_ALPHA_TO_COVERAGE)}function V(U){D!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),D=U)}function te(U){U!==Yp?(nt(r.CULL_FACE),U!==L&&(U===Qu?r.cullFace(r.BACK):U===qp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):O(r.CULL_FACE),L=U}function ce(U){U!==W&&(H&&r.lineWidth(U),W=U)}function xe(U,xt,st){U?(nt(r.POLYGON_OFFSET_FILL),(I!==xt||G!==st)&&(I=xt,G=st,o.getReversed()&&(xt=-xt),r.polygonOffset(xt,st))):O(r.POLYGON_OFFSET_FILL)}function $t(U){U?nt(r.SCISSOR_TEST):O(r.SCISSOR_TEST)}function me(U){U===void 0&&(U=r.TEXTURE0+J-1),R!==U&&(r.activeTexture(U),R=U)}function N(U,xt,st){st===void 0&&(R===null?st=r.TEXTURE0+J-1:st=R);let yt=j[st];yt===void 0&&(yt={type:void 0,texture:void 0},j[st]=yt),(yt.type!==U||yt.texture!==xt)&&(R!==st&&(r.activeTexture(st),R=st),r.bindTexture(U,xt||K[U]),yt.type=U,yt.texture=xt)}function ye(){let U=j[R];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function bt(){try{r.compressedTexImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function C(){try{r.compressedTexImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function x(){try{r.texSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function B(){try{r.texSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function X(){try{r.compressedTexSubImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function Q(){try{r.compressedTexSubImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function gt(){try{r.texStorage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function ft(){try{r.texStorage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function it(){try{r.texImage2D(...arguments)}catch(U){jt("WebGLState:",U)}}function ot(){try{r.texImage3D(...arguments)}catch(U){jt("WebGLState:",U)}}function Mt(U){return d[U]!==void 0?d[U]:r.getParameter(U)}function Nt(U,xt){d[U]!==xt&&(r.pixelStorei(U,xt),d[U]=xt)}function St(U){Jt.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),Jt.copy(U))}function vt(U){Ht.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),Ht.copy(U))}function mt(U,xt){let st=c.get(xt);st===void 0&&(st=new WeakMap,c.set(xt,st));let yt=st.get(U);yt===void 0&&(yt=r.getUniformBlockIndex(xt,U.name),st.set(U,yt))}function Bt(U,xt){let yt=c.get(xt).get(U);l.get(xt)!==yt&&(r.uniformBlockBinding(xt,yt,U.__bindingPointIndex),l.set(xt,yt))}function Zt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},R=null,j={},u={},f=new WeakMap,p=[],_=null,m=!1,g=null,M=null,A=null,v=null,S=null,b=null,E=null,y=new de(0,0,0),T=0,P=!1,D=null,L=null,W=null,I=null,G=null,Jt.set(0,0,r.canvas.width,r.canvas.height),Ht.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:nt,disable:O,bindFramebuffer:ut,drawBuffers:at,useProgram:lt,setBlending:Pt,setMaterial:Xt,setFlipSided:V,setCullFace:te,setLineWidth:ce,setPolygonOffset:xe,setScissorTest:$t,activeTexture:me,bindTexture:N,unbindTexture:ye,compressedTexImage2D:bt,compressedTexImage3D:C,texImage2D:it,texImage3D:ot,pixelStorei:Nt,getParameter:Mt,updateUBOMapping:mt,uniformBlockBinding:Bt,texStorage2D:gt,texStorage3D:ft,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:X,compressedTexSubImage3D:Q,scissor:St,viewport:vt,reset:Zt}}function $M(r,t,e,n,i,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,x){return p?new OffscreenCanvas(C,x):ta("canvas")}function m(C,x,B){let X=1,Q=bt(C);if((Q.width>B||Q.height>B)&&(X=B/Math.max(Q.width,Q.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let gt=Math.floor(X*Q.width),ft=Math.floor(X*Q.height);u===void 0&&(u=_(gt,ft));let it=x?_(gt,ft):u;return it.width=gt,it.height=ft,it.getContext("2d").drawImage(C,0,0,gt,ft),Kt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+gt+"x"+ft+")."),it}else return"data"in C&&Kt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function g(C){return C.generateMipmaps}function M(C){r.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(C,x,B,X,Q,gt=!1){if(C!==null){if(r[C]!==void 0)return r[C];Kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ft;X&&(ft=t.get("EXT_texture_norm16"),ft||Kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=x;if(x===r.RED&&(B===r.FLOAT&&(it=r.R32F),B===r.HALF_FLOAT&&(it=r.R16F),B===r.UNSIGNED_BYTE&&(it=r.R8),B===r.UNSIGNED_SHORT&&ft&&(it=ft.R16_EXT),B===r.SHORT&&ft&&(it=ft.R16_SNORM_EXT)),x===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(it=r.R8UI),B===r.UNSIGNED_SHORT&&(it=r.R16UI),B===r.UNSIGNED_INT&&(it=r.R32UI),B===r.BYTE&&(it=r.R8I),B===r.SHORT&&(it=r.R16I),B===r.INT&&(it=r.R32I)),x===r.RG&&(B===r.FLOAT&&(it=r.RG32F),B===r.HALF_FLOAT&&(it=r.RG16F),B===r.UNSIGNED_BYTE&&(it=r.RG8),B===r.UNSIGNED_SHORT&&ft&&(it=ft.RG16_EXT),B===r.SHORT&&ft&&(it=ft.RG16_SNORM_EXT)),x===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(it=r.RG8UI),B===r.UNSIGNED_SHORT&&(it=r.RG16UI),B===r.UNSIGNED_INT&&(it=r.RG32UI),B===r.BYTE&&(it=r.RG8I),B===r.SHORT&&(it=r.RG16I),B===r.INT&&(it=r.RG32I)),x===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(it=r.RGB8UI),B===r.UNSIGNED_SHORT&&(it=r.RGB16UI),B===r.UNSIGNED_INT&&(it=r.RGB32UI),B===r.BYTE&&(it=r.RGB8I),B===r.SHORT&&(it=r.RGB16I),B===r.INT&&(it=r.RGB32I)),x===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(it=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(it=r.RGBA16UI),B===r.UNSIGNED_INT&&(it=r.RGBA32UI),B===r.BYTE&&(it=r.RGBA8I),B===r.SHORT&&(it=r.RGBA16I),B===r.INT&&(it=r.RGBA32I)),x===r.RGB&&(B===r.UNSIGNED_SHORT&&ft&&(it=ft.RGB16_EXT),B===r.SHORT&&ft&&(it=ft.RGB16_SNORM_EXT),B===r.UNSIGNED_INT_5_9_9_9_REV&&(it=r.RGB9_E5),B===r.UNSIGNED_INT_10F_11F_11F_REV&&(it=r.R11F_G11F_B10F)),x===r.RGBA){let ot=gt?Qo:_e.getTransfer(Q);B===r.FLOAT&&(it=r.RGBA32F),B===r.HALF_FLOAT&&(it=r.RGBA16F),B===r.UNSIGNED_BYTE&&(it=ot===Te?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT&&ft&&(it=ft.RGBA16_EXT),B===r.SHORT&&ft&&(it=ft.RGBA16_SNORM_EXT),B===r.UNSIGNED_SHORT_4_4_4_4&&(it=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(it=r.RGB5_A1)}return(it===r.R16F||it===r.R32F||it===r.RG16F||it===r.RG32F||it===r.RGBA16F||it===r.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function S(C,x){let B;return C?x===null||x===Di||x===fo?B=r.DEPTH24_STENCIL8:x===Ni?B=r.DEPTH32F_STENCIL8:x===uo&&(B=r.DEPTH24_STENCIL8,Kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Di||x===fo?B=r.DEPTH_COMPONENT24:x===Ni?B=r.DEPTH_COMPONENT32F:x===uo&&(B=r.DEPTH_COMPONENT16),B}function b(C,x){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==fn&&C.minFilter!==mn?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function E(C){let x=C.target;x.removeEventListener("dispose",E),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function y(C){let x=C.target;x.removeEventListener("dispose",y),D(x)}function T(C){let x=n.get(C);if(x.__webglInit===void 0)return;let B=C.source,X=f.get(B);if(X){let Q=X[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(C),Object.keys(X).length===0&&f.delete(B)}n.remove(C)}function P(C){let x=n.get(C);r.deleteTexture(x.__webglTexture);let B=C.source,X=f.get(B);delete X[x.__cacheKey],o.memory.textures--}function D(C){let x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let Q=0;Q<x.__webglFramebuffer[X].length;Q++)r.deleteFramebuffer(x.__webglFramebuffer[X][Q]);else r.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)r.deleteFramebuffer(x.__webglFramebuffer[X]);else r.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&r.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&r.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&r.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let B=C.textures;for(let X=0,Q=B.length;X<Q;X++){let gt=n.get(B[X]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),o.memory.textures--),n.remove(B[X])}n.remove(C)}let L=0;function W(){L=0}function I(){return L}function G(C){L=C}function J(){let C=L;return C>=i.maxTextures&&Kt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),L+=1,C}function H(C){let x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function et(C,x){let B=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){let X=C.image;if(X===null)Kt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Kt("WebGLRenderer: Texture marked for update but image is incomplete");else{O(B,C,x);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+x)}function Y(C,x){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){O(B,C,x);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+x)}function R(C,x){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){O(B,C,x);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+x)}function j(C,x){let B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){ut(B,C,x);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+x)}let At={[ec]:r.REPEAT,[Gi]:r.CLAMP_TO_EDGE,[nc]:r.MIRRORED_REPEAT},Rt={[fn]:r.NEAREST,[mm]:r.NEAREST_MIPMAP_NEAREST,[Ca]:r.NEAREST_MIPMAP_LINEAR,[mn]:r.LINEAR,[zc]:r.LINEAR_MIPMAP_NEAREST,[kr]:r.LINEAR_MIPMAP_LINEAR},Jt={[vm]:r.NEVER,[wm]:r.ALWAYS,[ym]:r.LESS,[Mh]:r.LEQUAL,[Sm]:r.EQUAL,[bh]:r.GEQUAL,[Mm]:r.GREATER,[bm]:r.NOTEQUAL};function Ht(C,x){if(x.type===Ni&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===mn||x.magFilter===zc||x.magFilter===Ca||x.magFilter===kr||x.minFilter===mn||x.minFilter===zc||x.minFilter===Ca||x.minFilter===kr)&&Kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,At[x.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,At[x.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,At[x.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,Rt[x.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,Rt[x.minFilter]),x.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,Jt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===fn||x.minFilter!==Ca&&x.minFilter!==kr||x.type===Ni&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Qt(C,x){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",E));let X=x.source,Q=f.get(X);Q===void 0&&(Q={},f.set(X,Q));let gt=H(x);if(gt!==C.__cacheKey){Q[gt]===void 0&&(Q[gt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[gt].usedTimes++;let ft=Q[C.__cacheKey];ft!==void 0&&(Q[C.__cacheKey].usedTimes--,ft.usedTimes===0&&P(x)),C.__cacheKey=gt,C.__webglTexture=Q[gt].texture}return B}function K(C,x,B){return Math.floor(Math.floor(C/B)/x)}function nt(C,x,B,X){let gt=C.updateRanges;if(gt.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,x.width,x.height,B,X,x.data);else{gt.sort((Nt,St)=>Nt.start-St.start);let ft=0;for(let Nt=1;Nt<gt.length;Nt++){let St=gt[ft],vt=gt[Nt],mt=St.start+St.count,Bt=K(vt.start,x.width,4),Zt=K(St.start,x.width,4);vt.start<=mt+1&&Bt===Zt&&K(vt.start+vt.count-1,x.width,4)===Bt?St.count=Math.max(St.count,vt.start+vt.count-St.start):(++ft,gt[ft]=vt)}gt.length=ft+1;let it=e.getParameter(r.UNPACK_ROW_LENGTH),ot=e.getParameter(r.UNPACK_SKIP_PIXELS),Mt=e.getParameter(r.UNPACK_SKIP_ROWS);e.pixelStorei(r.UNPACK_ROW_LENGTH,x.width);for(let Nt=0,St=gt.length;Nt<St;Nt++){let vt=gt[Nt],mt=Math.floor(vt.start/4),Bt=Math.ceil(vt.count/4),Zt=mt%x.width,U=Math.floor(mt/x.width),xt=Bt,st=1;e.pixelStorei(r.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(r.UNPACK_SKIP_ROWS,U),e.texSubImage2D(r.TEXTURE_2D,0,Zt,U,xt,st,B,X,x.data)}C.clearUpdateRanges(),e.pixelStorei(r.UNPACK_ROW_LENGTH,it),e.pixelStorei(r.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(r.UNPACK_SKIP_ROWS,Mt)}}function O(C,x,B){let X=r.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=r.TEXTURE_3D);let Q=Qt(C,x),gt=x.source;e.bindTexture(X,C.__webglTexture,r.TEXTURE0+B);let ft=n.get(gt);if(gt.version!==ft.__version||Q===!0){if(e.activeTexture(r.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let st=_e.getPrimaries(_e.workingColorSpace),yt=x.colorSpace===fr?null:_e.getPrimaries(x.colorSpace),wt=x.colorSpace===fr||st===yt?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment);let ot=m(x.image,!1,i.maxTextureSize);ot=ye(x,ot);let Mt=s.convert(x.format,x.colorSpace),Nt=s.convert(x.type),St=v(x.internalFormat,Mt,Nt,x.normalized,x.colorSpace,x.isVideoTexture);Ht(X,x);let vt,mt=x.mipmaps,Bt=x.isVideoTexture!==!0,Zt=ft.__version===void 0||Q===!0,U=gt.dataReady,xt=b(x,ot);if(x.isDepthTexture)St=S(x.format===Vr,x.type),Zt&&(Bt?e.texStorage2D(r.TEXTURE_2D,1,St,ot.width,ot.height):e.texImage2D(r.TEXTURE_2D,0,St,ot.width,ot.height,0,Mt,Nt,null));else if(x.isDataTexture)if(mt.length>0){Bt&&Zt&&e.texStorage2D(r.TEXTURE_2D,xt,St,mt[0].width,mt[0].height);for(let st=0,yt=mt.length;st<yt;st++)vt=mt[st],Bt?U&&e.texSubImage2D(r.TEXTURE_2D,st,0,0,vt.width,vt.height,Mt,Nt,vt.data):e.texImage2D(r.TEXTURE_2D,st,St,vt.width,vt.height,0,Mt,Nt,vt.data);x.generateMipmaps=!1}else Bt?(Zt&&e.texStorage2D(r.TEXTURE_2D,xt,St,ot.width,ot.height),U&&nt(x,ot,Mt,Nt)):e.texImage2D(r.TEXTURE_2D,0,St,ot.width,ot.height,0,Mt,Nt,ot.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&Zt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,xt,St,mt[0].width,mt[0].height,ot.depth);for(let st=0,yt=mt.length;st<yt;st++)if(vt=mt[st],x.format!==vi)if(Mt!==null)if(Bt){if(U)if(x.layerUpdates.size>0){let wt=Rf(vt.width,vt.height,x.format,x.type);for(let ct of x.layerUpdates){let dt=vt.data.subarray(ct*wt/vt.data.BYTES_PER_ELEMENT,(ct+1)*wt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,st,0,0,ct,vt.width,vt.height,1,Mt,dt)}}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,st,0,0,0,vt.width,vt.height,ot.depth,Mt,vt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,st,St,vt.width,vt.height,ot.depth,0,vt.data,0,0);else Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?U&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,st,0,0,0,vt.width,vt.height,ot.depth,Mt,Nt,vt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,st,St,vt.width,vt.height,ot.depth,0,Mt,Nt,vt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Bt&&Zt&&e.texStorage2D(r.TEXTURE_2D,xt,St,mt[0].width,mt[0].height);for(let st=0,yt=mt.length;st<yt;st++)vt=mt[st],x.format!==vi?Mt!==null?Bt?U&&e.compressedTexSubImage2D(r.TEXTURE_2D,st,0,0,vt.width,vt.height,Mt,vt.data):e.compressedTexImage2D(r.TEXTURE_2D,st,St,vt.width,vt.height,0,vt.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?U&&e.texSubImage2D(r.TEXTURE_2D,st,0,0,vt.width,vt.height,Mt,Nt,vt.data):e.texImage2D(r.TEXTURE_2D,st,St,vt.width,vt.height,0,Mt,Nt,vt.data)}else if(x.isDataArrayTexture)if(Bt){if(Zt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,xt,St,ot.width,ot.height,ot.depth),U)if(x.layerUpdates.size>0){let st=Rf(ot.width,ot.height,x.format,x.type);for(let yt of x.layerUpdates){let wt=ot.data.subarray(yt*st/ot.data.BYTES_PER_ELEMENT,(yt+1)*st/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,yt,ot.width,ot.height,1,Mt,Nt,wt)}x.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,Mt,Nt,ot.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,St,ot.width,ot.height,ot.depth,0,Mt,Nt,ot.data);else if(x.isData3DTexture)Bt?(Zt&&e.texStorage3D(r.TEXTURE_3D,xt,St,ot.width,ot.height,ot.depth),U&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,Mt,Nt,ot.data)):e.texImage3D(r.TEXTURE_3D,0,St,ot.width,ot.height,ot.depth,0,Mt,Nt,ot.data);else if(x.isFramebufferTexture){if(Zt)if(Bt)e.texStorage2D(r.TEXTURE_2D,xt,St,ot.width,ot.height);else{let st=ot.width,yt=ot.height;for(let wt=0;wt<xt;wt++)e.texImage2D(r.TEXTURE_2D,wt,St,st,yt,0,Mt,Nt,null),st>>=1,yt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in r){let st=r.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),ot.parentNode!==st){st.appendChild(ot),d.add(x),st.onpaint=yt=>{let wt=yt.changedElements;for(let ct of d)wt.includes(ct.image)&&(ct.needsUpdate=!0)},st.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,ot);else{let wt=r.RGBA,ct=r.RGBA,dt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,wt,ct,dt,ot)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(mt.length>0){if(Bt&&Zt){let st=bt(mt[0]);e.texStorage2D(r.TEXTURE_2D,xt,St,st.width,st.height)}for(let st=0,yt=mt.length;st<yt;st++)vt=mt[st],Bt?U&&e.texSubImage2D(r.TEXTURE_2D,st,0,0,Mt,Nt,vt):e.texImage2D(r.TEXTURE_2D,st,St,Mt,Nt,vt);x.generateMipmaps=!1}else if(Bt){if(Zt){let st=bt(ot);e.texStorage2D(r.TEXTURE_2D,xt,St,st.width,st.height)}U&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Mt,Nt,ot)}else e.texImage2D(r.TEXTURE_2D,0,St,Mt,Nt,ot);g(x)&&M(X),ft.__version=gt.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function ut(C,x,B){if(x.image.length!==6)return;let X=Qt(C,x),Q=x.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+B);let gt=n.get(Q);if(Q.version!==gt.__version||X===!0){e.activeTexture(r.TEXTURE0+B);let ft=_e.getPrimaries(_e.workingColorSpace),it=x.colorSpace===fr?null:_e.getPrimaries(x.colorSpace),ot=x.colorSpace===fr||ft===it?r.NONE:r.BROWSER_DEFAULT_WEBGL;e.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(r.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);let Mt=x.isCompressedTexture||x.image[0].isCompressedTexture,Nt=x.image[0]&&x.image[0].isDataTexture,St=[];for(let ct=0;ct<6;ct++)!Mt&&!Nt?St[ct]=m(x.image[ct],!0,i.maxCubemapSize):St[ct]=Nt?x.image[ct].image:x.image[ct],St[ct]=ye(x,St[ct]);let vt=St[0],mt=s.convert(x.format,x.colorSpace),Bt=s.convert(x.type),Zt=v(x.internalFormat,mt,Bt,x.normalized,x.colorSpace),U=x.isVideoTexture!==!0,xt=gt.__version===void 0||X===!0,st=Q.dataReady,yt=b(x,vt);Ht(r.TEXTURE_CUBE_MAP,x);let wt;if(Mt){U&&xt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Zt,vt.width,vt.height);for(let ct=0;ct<6;ct++){wt=St[ct].mipmaps;for(let dt=0;dt<wt.length;dt++){let ht=wt[dt];x.format!==vi?mt!==null?U?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt,0,0,ht.width,ht.height,mt,ht.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt,Zt,ht.width,ht.height,0,ht.data):Kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt,0,0,ht.width,ht.height,mt,Bt,ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt,Zt,ht.width,ht.height,0,mt,Bt,ht.data)}}}else{if(wt=x.mipmaps,U&&xt){wt.length>0&&yt++;let ct=bt(St[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,Zt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(Nt){U?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,St[ct].width,St[ct].height,mt,Bt,St[ct].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Zt,St[ct].width,St[ct].height,0,mt,Bt,St[ct].data);for(let dt=0;dt<wt.length;dt++){let Gt=wt[dt].image[ct].image;U?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt+1,0,0,Gt.width,Gt.height,mt,Bt,Gt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt+1,Zt,Gt.width,Gt.height,0,mt,Bt,Gt.data)}}else{U?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,mt,Bt,St[ct]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Zt,mt,Bt,St[ct]);for(let dt=0;dt<wt.length;dt++){let ht=wt[dt];U?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt+1,0,0,mt,Bt,ht.image[ct]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt+1,Zt,mt,Bt,ht.image[ct])}}}g(x)&&M(r.TEXTURE_CUBE_MAP),gt.__version=Q.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function at(C,x,B,X,Q,gt){let ft=s.convert(B.format,B.colorSpace),it=s.convert(B.type),ot=v(B.internalFormat,ft,it,B.normalized,B.colorSpace),Mt=n.get(x),Nt=n.get(B);if(Nt.__renderTarget=x,!Mt.__hasExternalTextures){let St=Math.max(1,x.width>>gt),vt=Math.max(1,x.height>>gt);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?e.texImage3D(Q,gt,ot,St,vt,x.depth,0,ft,it,null):e.texImage2D(Q,gt,ot,St,vt,0,ft,it,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),me(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,Q,Nt.__webglTexture,0,$t(x)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,Q,Nt.__webglTexture,gt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function lt(C,x,B){if(r.bindRenderbuffer(r.RENDERBUFFER,C),x.depthBuffer){let X=x.depthTexture,Q=X&&X.isDepthTexture?X.type:null,gt=S(x.stencilBuffer,Q),ft=x.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;me(x)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$t(x),gt,x.width,x.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,$t(x),gt,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,gt,x.width,x.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ft,r.RENDERBUFFER,C)}else{let X=x.textures;for(let Q=0;Q<X.length;Q++){let gt=X[Q],ft=s.convert(gt.format,gt.colorSpace),it=s.convert(gt.type),ot=v(gt.internalFormat,ft,it,gt.normalized,gt.colorSpace);me(x)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$t(x),ot,x.width,x.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,$t(x),ot,x.width,x.height):r.renderbufferStorage(r.RENDERBUFFER,ot,x.width,x.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function _t(C,x,B){let X=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(x.depthTexture);if(Q.__renderTarget=x,(!Q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,x.depthTexture.addEventListener("dispose",E)),Q.__webglTexture===void 0){Q.__webglTexture=r.createTexture(),e.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,x.depthTexture);let Mt=s.convert(x.depthTexture.format),Nt=s.convert(x.depthTexture.type),St;x.depthTexture.format===Hi?St=r.DEPTH_COMPONENT24:x.depthTexture.format===Vr&&(St=r.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,St,x.width,x.height,0,Mt,Nt,null)}}else et(x.depthTexture,0);let gt=Q.__webglTexture,ft=$t(x),it=X?r.TEXTURE_CUBE_MAP_POSITIVE_X+B:r.TEXTURE_2D,ot=x.depthTexture.format===Vr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(x.depthTexture.format===Hi)me(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ot,it,gt,0,ft):r.framebufferTexture2D(r.FRAMEBUFFER,ot,it,gt,0);else if(x.depthTexture.format===Vr)me(x)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ot,it,gt,0,ft):r.framebufferTexture2D(r.FRAMEBUFFER,ot,it,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Tt(C){let x=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",Q)};X.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=X}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let X=0;X<6;X++)_t(x.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?_t(x.__webglFramebuffer[0],C,0):_t(x.__webglFramebuffer,C,0)}else if(B){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=r.createRenderbuffer(),lt(x.__webglDepthbuffer[X],C,!1);else{let Q=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=x.__webglDepthbuffer[X];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,gt)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=r.createRenderbuffer(),lt(x.__webglDepthbuffer,C,!1);else{let Q=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=x.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,gt)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(C,x,B){let X=n.get(C);x!==void 0&&at(X.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Tt(C)}function Xt(C){let x=C.texture,B=n.get(C),X=n.get(x);C.addEventListener("dispose",y);let Q=C.textures,gt=C.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=x.version,o.memory.textures++),gt){B.__webglFramebuffer=[];for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[it]=[];for(let ot=0;ot<x.mipmaps.length;ot++)B.__webglFramebuffer[it][ot]=r.createFramebuffer()}else B.__webglFramebuffer[it]=r.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let it=0;it<x.mipmaps.length;it++)B.__webglFramebuffer[it]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ft)for(let it=0,ot=Q.length;it<ot;it++){let Mt=n.get(Q[it]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=r.createTexture(),o.memory.textures++)}if(C.samples>0&&me(C)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let it=0;it<Q.length;it++){let ot=Q[it];B.__webglColorRenderbuffer[it]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[it]);let Mt=s.convert(ot.format,ot.colorSpace),Nt=s.convert(ot.type),St=v(ot.internalFormat,Mt,Nt,ot.normalized,ot.colorSpace,C.isXRRenderTarget===!0),vt=$t(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,vt,St,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+it,r.RENDERBUFFER,B.__webglColorRenderbuffer[it])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),lt(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,x);for(let it=0;it<6;it++)if(x.mipmaps&&x.mipmaps.length>0)for(let ot=0;ot<x.mipmaps.length;ot++)at(B.__webglFramebuffer[it][ot],C,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+it,ot);else at(B.__webglFramebuffer[it],C,x,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);g(x)&&M(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let it=0,ot=Q.length;it<ot;it++){let Mt=Q[it],Nt=n.get(Mt),St=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(St=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(St,Nt.__webglTexture),Ht(St,Mt),at(B.__webglFramebuffer,C,Mt,r.COLOR_ATTACHMENT0+it,St,0),g(Mt)&&M(St)}e.unbindTexture()}else{let it=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(it=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(it,X.__webglTexture),Ht(it,x),x.mipmaps&&x.mipmaps.length>0)for(let ot=0;ot<x.mipmaps.length;ot++)at(B.__webglFramebuffer[ot],C,x,r.COLOR_ATTACHMENT0,it,ot);else at(B.__webglFramebuffer,C,x,r.COLOR_ATTACHMENT0,it,0);g(x)&&M(it),e.unbindTexture()}C.depthBuffer&&Tt(C)}function V(C){let x=C.textures;for(let B=0,X=x.length;B<X;B++){let Q=x[B];if(g(Q)){let gt=A(C),ft=n.get(Q).__webglTexture;e.bindTexture(gt,ft),M(gt),e.unbindTexture()}}}let te=[],ce=[];function xe(C){if(C.samples>0){if(me(C)===!1){let x=C.textures,B=C.width,X=C.height,Q=r.COLOR_BUFFER_BIT,gt=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ft=n.get(C),it=x.length>1;if(it)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer);let ot=C.texture.mipmaps;ot&&ot.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),it){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ft.__webglColorRenderbuffer[Mt]);let Nt=n.get(x[Mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Nt,0)}r.blitFramebuffer(0,0,B,X,0,0,B,X,Q,r.NEAREST),l===!0&&(te.length=0,ce.length=0,te.push(r.COLOR_ATTACHMENT0+Mt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(te.push(gt),ce.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ce)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,te))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),it)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.RENDERBUFFER,ft.__webglColorRenderbuffer[Mt]);let Nt=n.get(x[Mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Mt,r.TEXTURE_2D,Nt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let x=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[x])}}}function $t(C){return Math.min(i.maxSamples,C.samples)}function me(C){let x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(C){let x=o.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function ye(C,x){let B=C.colorSpace,X=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==Ko&&B!==fr&&(_e.getTransfer(B)===Te?(X!==vi||Q!==oi)&&Kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",B)),x}function bt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=W,this.getTextureUnits=I,this.setTextureUnits=G,this.setTexture2D=et,this.setTexture2DArray=Y,this.setTexture3D=R,this.setTextureCube=j,this.rebindTextures=Pt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=me,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function KM(r,t){function e(n,i=fr){let s,o=_e.getTransfer(i);if(n===oi)return r.UNSIGNED_BYTE;if(n===Vc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Gc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===mf)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===gf)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===df)return r.BYTE;if(n===pf)return r.SHORT;if(n===uo)return r.UNSIGNED_SHORT;if(n===kc)return r.INT;if(n===Di)return r.UNSIGNED_INT;if(n===Ni)return r.FLOAT;if(n===Ui)return r.HALF_FLOAT;if(n===_f)return r.ALPHA;if(n===xf)return r.RGB;if(n===vi)return r.RGBA;if(n===Hi)return r.DEPTH_COMPONENT;if(n===Vr)return r.DEPTH_STENCIL;if(n===vf)return r.RED;if(n===Hc)return r.RED_INTEGER;if(n===Gr)return r.RG;if(n===Wc)return r.RG_INTEGER;if(n===Xc)return r.RGBA_INTEGER;if(n===Ra||n===Pa||n===Ia||n===La)if(o===Te)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ra)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ia)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===La)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ra)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ia)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===La)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yc||n===qc||n===Zc||n===Jc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Yc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$c||n===Kc||n===Qc||n===jc||n===th||n===Da||n===eh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===$c||n===Kc)return o===Te?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Qc)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===jc)return s.COMPRESSED_R11_EAC;if(n===th)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Da)return s.COMPRESSED_RG11_EAC;if(n===eh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===nh||n===ih||n===rh||n===sh||n===oh||n===ah||n===lh||n===ch||n===hh||n===uh||n===fh||n===dh||n===ph||n===mh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===nh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ih)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===rh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ah)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ch)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===dh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ph)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===mh)return o===Te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gh||n===_h||n===xh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===gh)return o===Te?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_h)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vh||n===yh||n===Na||n===Sh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===vh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===yh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Na)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fo?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var QM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Zf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new pa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Fn({vertexShader:QM,fragmentShader:jM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qn(new xa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Jf=class extends Wi{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",m=new Zf,g={},M=e.getContextAttributes(),A=null,v=null,S=[],b=[],E=new qt,y=null,T=null,P=new bn;P.viewport=new Be;let D=new bn;D.viewport=new Be;let L=[P,D],W=new Uc,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=S[K];return nt===void 0&&(nt=new so,S[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=S[K];return nt===void 0&&(nt=new so,S[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=S[K];return nt===void 0&&(nt=new so,S[K]=nt),nt.getHandSpace()};function J(K){let nt=b.indexOf(K.inputSource);if(nt===-1)return;let O=S[nt];O!==void 0&&(O.update(K.inputSource,K.frame,c||o),O.dispatchEvent({type:K.type,data:K.inputSource}))}function H(){i.removeEventListener("select",J),i.removeEventListener("selectstart",J),i.removeEventListener("selectend",J),i.removeEventListener("squeeze",J),i.removeEventListener("squeezestart",J),i.removeEventListener("squeezeend",J),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",et);for(let K=0;K<S.length;K++){let nt=b[K];nt!==null&&(b[K]=null,S[K].disconnect(nt))}I=null,G=null,m.reset();for(let K in g)delete g[K];if(t.setRenderTarget(A),f=null,u=null,d=null,i=null,v=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(E.width,E.height,!1),T!==null){let K=T.camera;K.fov=T.fov,K.zoom=T.zoom,K.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&Kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(A=t.getRenderTarget(),i.addEventListener("select",J),i.addEventListener("selectstart",J),i.addEventListener("selectend",J),i.addEventListener("squeeze",J),i.addEventListener("squeezestart",J),i.addEventListener("squeezeend",J),i.addEventListener("end",H),i.addEventListener("inputsourceschange",et),M.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let O=null,ut=null,at=null;M.depth&&(at=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,O=M.stencil?Vr:Hi,ut=M.stencil?fo:Di);let lt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(lt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Yn(u.textureWidth,u.textureHeight,{format:vi,type:oi,depthTexture:new Dr(u.textureWidth,u.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let O={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,O),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Yn(f.framebufferWidth,f.framebufferHeight,{format:vi,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Qt.setContext(i),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function et(K){for(let nt=0;nt<K.removed.length;nt++){let O=K.removed[nt],ut=b.indexOf(O);ut>=0&&(b[ut]=null,S[ut].disconnect(O))}for(let nt=0;nt<K.added.length;nt++){let O=K.added[nt],ut=b.indexOf(O);if(ut===-1){for(let lt=0;lt<S.length;lt++)if(lt>=b.length){b.push(O),ut=lt;break}else if(b[lt]===null){b[lt]=O,ut=lt;break}if(ut===-1)break}let at=S[ut];at&&at.connect(O)}}let Y=new k,R=new k;function j(K,nt,O){Y.setFromMatrixPosition(nt.matrixWorld),R.setFromMatrixPosition(O.matrixWorld);let ut=Y.distanceTo(R),at=nt.projectionMatrix.elements,lt=O.projectionMatrix.elements,_t=at[14]/(at[10]-1),Tt=at[14]/(at[10]+1),Pt=(at[9]+1)/at[5],Xt=(at[9]-1)/at[5],V=(at[8]-1)/at[0],te=(lt[8]+1)/lt[0],ce=_t*V,xe=_t*te,$t=ut/(-V+te),me=$t*-V;if(nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(me),K.translateZ($t),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),at[10]===-1)K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let N=_t+$t,ye=Tt+$t,bt=ce-me,C=xe+(ut-me),x=Pt*Tt/ye*N,B=Xt*Tt/ye*N;K.projectionMatrix.makePerspective(bt,C,x,B,N,ye),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function At(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let nt=K.near,O=K.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(O=m.depthFar)),W.near=D.near=P.near=nt,W.far=D.far=P.far=O,(I!==W.near||G!==W.far)&&(i.updateRenderState({depthNear:W.near,depthFar:W.far}),I=W.near,G=W.far),W.layers.mask=K.layers.mask|6,P.layers.mask=W.layers.mask&-5,D.layers.mask=W.layers.mask&-3;let ut=K.parent,at=W.cameras;At(W,ut);for(let lt=0;lt<at.length;lt++)At(at[lt],ut);at.length===2?j(W,P,D):W.projectionMatrix.copy(P.projectionMatrix),T===null&&K.isPerspectiveCamera&&(T={camera:K,fov:K.fov,zoom:K.zoom}),Rt(K,W,ut)};function Rt(K,nt,O){O===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(O.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=no*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(K){return g[K]};let Jt=null;function Ht(K,nt){if(h=nt.getViewerPose(c||o),p=nt,h!==null){let O=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let ut=!1;O.length!==W.cameras.length&&(W.cameras.length=0,ut=!0);for(let Tt=0;Tt<O.length;Tt++){let Pt=O[Tt],Xt=null;if(f!==null)Xt=f.getViewport(Pt);else{let te=d.getViewSubImage(u,Pt);Xt=te.viewport,Tt===0&&(t.setRenderTargetTextures(v,te.colorTexture,te.depthStencilTexture),t.setRenderTarget(v))}let V=L[Tt];V===void 0&&(V=new bn,V.layers.enable(Tt),V.viewport=new Be,L[Tt]=V),V.matrix.fromArray(Pt.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(Pt.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Tt===0&&(W.matrix.copy(V.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),ut===!0&&W.cameras.push(V)}let at=i.enabledFeatures;if(at&&at.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Tt=d.getDepthInformation(O[0]);Tt&&Tt.isValid&&Tt.texture&&m.init(Tt,i.renderState)}if(at&&at.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Tt=0;Tt<O.length;Tt++){let Pt=O[Tt].camera;if(Pt){let Xt=g[Pt];Xt||(Xt=new pa,g[Pt]=Xt);let V=d.getCameraImage(Pt);Xt.sourceTexture=V}}}}for(let O=0;O<S.length;O++){let ut=b[O],at=S[O];ut!==null&&at!==void 0&&at.update(ut,nt,c||o)}Jt&&Jt(K,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),p=null}let Qt=new eg;Qt.setAnimationLoop(Ht),this.setAnimationLoop=function(K){Jt=K},this.dispose=function(){}}},tb=new Ne,ag=new ie;ag.set(-1,0,0,0,1,0,0,0,1);function eb(r,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Ef(r)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,M,A,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),d(m,g)):g.isMeshPhongMaterial?(s(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),u(m,g),g.isMeshPhysicalMaterial&&f(m,g,v)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),_(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,M,A):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===On&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===On&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let M=t.get(g),A=M.envMap,v=M.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(tb.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ag),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,M,A){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=A*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,M){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===On&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let M=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function nb(r,t,e,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let b=S.program;n.uniformBlockBinding(v,b)}function c(v,S){let b=i[v.id];b===void 0&&(m(v),b=h(v),i[v.id]=b,v.addEventListener("dispose",M));let E=S.program;n.updateUBOMapping(v,E);let y=t.render.frame;s[v.id]!==y&&(u(v),s[v.id]=y)}function h(v){let S=d();v.__bindingPointIndex=S;let b=r.createBuffer(),E=v.__size,y=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,E,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,b),b}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let S=i[v.id],b=v.uniforms,E=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let y=0,T=b.length;y<T;y++){let P=b[y];if(Array.isArray(P))for(let D=0,L=P.length;D<L;D++)f(P[D],y,D,E);else f(P,y,0,E)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,S,b,E){if(_(v,S,b,E)===!0){let y=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let D=0;D<T.length;D++){let L=T[D],W=g(L);p(L,v.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(T,v.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,y,v.__data)}}function p(v,S,b){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,b)}function _(v,S,b,E){let y=v.value,T=S+"_"+b;if(E[T]===void 0)return typeof y=="number"||typeof y=="boolean"?E[T]=y:ArrayBuffer.isView(y)?E[T]=y.slice():E[T]=y.clone(),!0;{let P=E[T];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return E[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function m(v){let S=v.uniforms,b=0,E=16;for(let T=0,P=S.length;T<P;T++){let D=Array.isArray(S[T])?S[T]:[S[T]];for(let L=0,W=D.length;L<W;L++){let I=D[L],G=Array.isArray(I.value)?I.value:[I.value];for(let J=0,H=G.length;J<H;J++){let et=G[J],Y=g(et),R=b%E,j=R%Y.boundary,At=R+j;b+=j,At!==0&&E-At<Y.storage&&(b+=E-At),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=Y.storage}}}let y=b%E;return y>0&&(b+=E-y),v.__size=b,v.__cache={},this}function g(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?Kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Kt("WebGLRenderer: Unsupported uniform value type.",v),S}function M(v){let S=v.target;S.removeEventListener("dispose",M);let b=o.indexOf(S.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function A(){for(let v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:A}}var ib=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$i=null;function rb(){return $i===null&&($i=new lc(ib,16,16,Gr,Ui),$i.name="DFG_LUT",$i.minFilter=mn,$i.magFilter=mn,$i.wrapS=Gi,$i.wrapT=Gi,$i.generateMipmaps=!1,$i.needsUpdate=!0),$i}var Ch=class{constructor(t={}){let{canvas:e=Tm(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=oi}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,m=new Set([Xc,Wc,Hc]),g=new Set([oi,Di,uo,fo,Vc,Gc]),M=new Uint32Array(4),A=new Int32Array(4),v=new k,S=null,b=null,E=[],y=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,D=!1,L=null,W=null,I=null,G=null;this._outputColorSpace=ii;let J=0,H=0,et=null,Y=-1,R=null,j=new Be,At=new Be,Rt=null,Jt=new de(0),Ht=0,Qt=e.width,K=e.height,nt=1,O=null,ut=null,at=new Be(0,0,Qt,K),lt=new Be(0,0,Qt,K),_t=!1,Tt=new ca,Pt=!1,Xt=!1,V=new Ne,te=new k,ce=new Be,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$t=!1;function me(){return et===null?nt:1}let N=n;function ye(w,F){return e.getContext(w,F)}let bt,C,x,B,X,Q,gt,ft,it,ot,Mt,Nt,St,vt,mt,Bt,Zt,U,xt,st,yt,wt,ct;try{let w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Gt,!1),e.addEventListener("webglcontextrestored",z,!1),e.addEventListener("webglcontextcreationerror",tt,!1),N===null){let F="webgl2";if(N=ye(F,w),N===null)throw ye(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}dt()}catch(w){throw e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",z,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),jt("WebGLRenderer: "+w.message),w}function dt(){bt=new uS(N),bt.init(),yt=new KM(N,bt),C=new eS(N,bt,t,yt),x=new JM(N,bt),C.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),W=N.createFramebuffer(),I=N.createFramebuffer(),G=N.createFramebuffer(),B=new pS(N),X=new UM,Q=new $M(N,bt,x,X,C,yt,B),gt=new hS(P),ft=new gx(N),wt=new jy(N,ft),it=new fS(N,ft,B,wt),ot=new gS(N,it,ft,wt,B),U=new mS(N,C,Q),mt=new nS(X),Mt=new NM(P,gt,bt,C,wt,mt),Nt=new eb(P,X),St=new OM,vt=new HM(bt),Zt=new Qy(P,gt,x,ot,p,l),Bt=new ZM(P,ot,C),ct=new nb(N,B,C,x),xt=new tS(N,bt,B),st=new dS(N,bt,B),B.programs=Mt.programs,P.capabilities=C,P.extensions=bt,P.properties=X,P.renderLists=St,P.shadowMap=Bt,P.state=x,P.info=B}_!==oi&&(T=new xS(_,e.width,e.height,a,i,s));let ht=new Jf(P,N);this.xr=ht,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let w=bt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=bt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(w){w!==void 0&&(nt=w,this.setSize(Qt,K,!1))},this.getSize=function(w){return w.set(Qt,K)},this.setSize=function(w,F,$=!0){if(ht.isPresenting){Kt("WebGLRenderer: Can't change size while VR device is presenting.");return}Qt=w,K=F,e.width=Math.floor(w*nt),e.height=Math.floor(F*nt),$===!0&&(e.style.width=w+"px",e.style.height=F+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(Qt*nt,K*nt).floor()},this.setDrawingBufferSize=function(w,F,$){Qt=w,K=F,nt=$,e.width=Math.floor(w*$),e.height=Math.floor(F*$),this.setViewport(0,0,w,F)},this.setEffects=function(w){if(_===oi){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let F=0;F<w.length;F++)if(w[F].isOutputPass===!0){Kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(j)},this.getViewport=function(w){return w.copy(at)},this.setViewport=function(w,F,$,q){w.isVector4?at.set(w.x,w.y,w.z,w.w):at.set(w,F,$,q),x.viewport(j.copy(at).multiplyScalar(nt).round())},this.getScissor=function(w){return w.copy(lt)},this.setScissor=function(w,F,$,q){w.isVector4?lt.set(w.x,w.y,w.z,w.w):lt.set(w,F,$,q),x.scissor(At.copy(lt).multiplyScalar(nt).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(w){x.setScissorTest(_t=w)},this.setOpaqueSort=function(w){O=w},this.setTransparentSort=function(w){ut=w},this.getClearColor=function(w){return w.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,$=!0){let q=0;if(w){let Z=!1;if(et!==null){let Et=et.texture.format;Z=m.has(Et)}if(Z){let Et=et.texture.type,Ft=g.has(Et),Dt=Zt.getClearColor(),kt=Zt.getClearAlpha(),Yt=Dt.r,ae=Dt.g,ge=Dt.b;Ft?(M[0]=Yt,M[1]=ae,M[2]=ge,M[3]=kt,N.clearBufferuiv(N.COLOR,0,M)):(A[0]=Yt,A[1]=ae,A[2]=ge,A[3]=kt,N.clearBufferiv(N.COLOR,0,A))}else q|=N.COLOR_BUFFER_BIT}F&&(q|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(q|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&N.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),L=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Gt,!1),e.removeEventListener("webglcontextrestored",z,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),Zt.dispose(),St.dispose(),vt.dispose(),X.dispose(),gt.dispose(),ot.dispose(),wt.dispose(),ct.dispose(),Mt.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",se),ht.removeEventListener("sessionend",oe),ee.stop()};function Gt(w){w.preventDefault(),ea("WebGLRenderer: Context Lost."),D=!0}function z(){ea("WebGLRenderer: Context Restored."),D=!1;let w=B.autoReset,F=Bt.enabled,$=Bt.autoUpdate,q=Bt.needsUpdate,Z=Bt.type;dt(),B.autoReset=w,Bt.enabled=F,Bt.autoUpdate=$,Bt.needsUpdate=q,Bt.type=Z}function tt(w){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function rt(w){let F=w.target;F.removeEventListener("dispose",rt),pt(F)}function pt(w){zt(w),X.remove(w)}function zt(w){let F=X.get(w).programs;F!==void 0&&(F.forEach(function($){Mt.releaseProgram($)}),w.isShaderMaterial&&Mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,$,q,Z,Et){F===null&&(F=xe);let Ft=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Dt=hn(w,F,$,q,Z);x.setMaterial(q,Ft);let kt=$.index,Yt=1;if(q.wireframe===!0){if(kt=it.getWireframeAttribute($),kt===void 0)return;Yt=2}let ae=$.drawRange,ge=$.attributes.position,Vt=ae.start*Yt,we=(ae.start+ae.count)*Yt;Et!==null&&(Vt=Math.max(Vt,Et.start*Yt),we=Math.min(we,(Et.start+Et.count)*Yt)),kt!==null?(Vt=Math.max(Vt,0),we=Math.min(we,kt.count)):ge!=null&&(Vt=Math.max(Vt,0),we=Math.min(we,ge.count));let Qe=we-Vt;if(Qe<0||Qe===1/0)return;wt.setup(Z,q,Dt,$,kt);let Ue,Pe=xt;if(kt!==null&&(Ue=ft.get(kt),Pe=st,Pe.setIndex(Ue)),Z.isMesh)q.wireframe===!0?(x.setLineWidth(q.wireframeLinewidth*me()),Pe.setMode(N.LINES)):Pe.setMode(N.TRIANGLES);else if(Z.isLine){let yn=q.linewidth;yn===void 0&&(yn=1),x.setLineWidth(yn*me()),Z.isLineSegments?Pe.setMode(N.LINES):Z.isLineLoop?Pe.setMode(N.LINE_LOOP):Pe.setMode(N.LINE_STRIP)}else Z.isPoints?Pe.setMode(N.POINTS):Z.isSprite&&Pe.setMode(N.TRIANGLES);if(Z.isBatchedMesh)if(bt.get("WEBGL_multi_draw"))Pe.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let yn=Z._multiDrawStarts,Ut=Z._multiDrawCounts,Ln=Z._multiDrawCount,Se=kt?ft.get(kt).bytesPerElement:1,gi=X.get(q).currentProgram.getUniforms();for(let zi=0;zi<Ln;zi++)gi.setValue(N,"_gl_DrawID",zi),Pe.render(yn[zi]/Se,Ut[zi])}else if(Z.isInstancedMesh)Pe.renderInstances(Vt,Qe,Z.count);else if($.isInstancedBufferGeometry){let yn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ut=Math.min($.instanceCount,yn);Pe.renderInstances(Vt,Qe,Ut)}else Pe.render(Vt,Qe)};function It(w,F,$,q){L!==null&&w.isNodeMaterial&&L.setObject(q,w),Pt===!0&&mt.setState(w,$,!1),w.transparent===!0&&w.side===Zi&&w.forceSinglePass===!1?(w.side=On,w.needsUpdate=!0,Ge(w,F,q),w.side=Br,w.needsUpdate=!0,Ge(w,F,q),w.side=Zi):Ge(w,F,q)}this.compile=function(w,F,$=null){$===null&&($=w),L!==null&&L.renderStart(w,F,$),b=vt.get($),b.init(F),y.push(b),$.traverseVisible(function(Z){Z.isLight&&Z.layers.test(F.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),w!==$&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(F.layers)&&(b.pushLight(Z),Z.castShadow&&b.pushShadow(Z))}),b.setupLights(),L!==null&&L.updateLights(b.state.lightsArray),Xt=this.localClippingEnabled,Pt=mt.init(this.clippingPlanes,Xt),Pt===!0&&mt.setGlobalState(this.clippingPlanes,F),L!==null&&Bt.render(b.state.shadowsArray,$,F);let q=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Et=Z.material;if(Et)if(Array.isArray(Et))for(let Ft=0;Ft<Et.length;Ft++){let Dt=Et[Ft];It(Dt,$,F,Z),q.add(Dt)}else It(Et,$,F,Z),q.add(Et)}),b=y.pop(),L!==null&&L.renderEnd(),q},this.compileAsync=function(w,F,$=null){let q=this.compile(w,F,$);return new Promise(Z=>{function Et(){if(q.forEach(function(Ft){let kt=X.get(Ft).currentProgram;(kt===void 0||kt.isReady())&&q.delete(Ft)}),q.size===0){Z(w);return}setTimeout(Et,10)}bt.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let ne=null;function be(w){ne&&ne(w)}function se(){ee.stop()}function oe(){ee.start()}let ee=new eg;ee.setAnimationLoop(be),typeof self<"u"&&ee.setContext(self),this.setAnimationLoop=function(w){ne=w,ht.setAnimationLoop(w),w===null?ee.stop():ee.start()},ht.addEventListener("sessionstart",se),ht.addEventListener("sessionend",oe),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;L!==null&&L.renderStart(w,F);let $=ht.enabled===!0&&ht.isPresenting===!0,q=T!==null&&(et===null||$)&&T.begin(P,et);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(F),F=ht.getCamera()),w.isScene===!0&&w.onBeforeRender(P,w,F,et),b=vt.get(w,y.length),b.init(F),b.state.textureUnits=Q.getTextureUnits(),y.push(b),V.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Tt.setFromProjectionMatrix(V,Ii,F.reversedDepth),Xt=this.localClippingEnabled,Pt=mt.init(this.clippingPlanes,Xt),S=St.get(w,E.length),S.init(),E.push(S),ht.enabled===!0&&ht.isPresenting===!0){let Ft=P.xr.getDepthSensingMesh();Ft!==null&&$e(Ft,F,-1/0,P.sortObjects)}$e(w,F,0,P.sortObjects),S.finish(),L!==null&&L.updateLights(b.state.lightsArray),P.sortObjects===!0&&S.sort(O,ut),$t=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,$t&&Zt.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pt===!0&&mt.beginShadows();let Z=b.state.shadowsArray;if(Bt.render(Z,w,F),Pt===!0&&mt.endShadows(),(q&&T.hasRenderPass())===!1){let Ft=S.opaque,Dt=S.transmissive;if(b.setupLights(),F.isArrayCamera){let kt=F.cameras;if(Dt.length>0)for(let Yt=0,ae=kt.length;Yt<ae;Yt++){let ge=kt[Yt];Ye(Ft,Dt,w,ge)}$t&&Zt.render(w);for(let Yt=0,ae=kt.length;Yt<ae;Yt++){let ge=kt[Yt];Me(S,w,ge,ge.viewport)}}else Dt.length>0&&Ye(Ft,Dt,w,F),$t&&Zt.render(w),Me(S,w,F)}et!==null&&H===0&&(Q.updateMultisampleRenderTarget(et),Q.updateRenderTargetMipmap(et)),q&&T.end(P),w.isScene===!0&&w.onAfterRender(P,w,F),wt.resetDefaultState(),Y=-1,R=null,y.pop(),y.length>0?(b=y[y.length-1],Q.setTextureUnits(b.state.textureUnits),Pt===!0&&mt.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?S=E[E.length-1]:S=null,L!==null&&L.renderEnd()};function $e(w,F,$,q){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLightProbeGrid)b.pushLightProbeGrid(w);else if(w.isLight)b.pushLight(w),w.castShadow&&b.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Tt)){q&&ce.setFromMatrixPosition(w.matrixWorld).applyMatrix4(V);let Ft=ot.update(w),Dt=w.material;Dt.visible&&S.push(w,Ft,Dt,$,ce.z,null,F)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Tt))){let Ft=ot.update(w),Dt=w.material;if(q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ce.copy(w.boundingSphere.center)):(Ft.boundingSphere===null&&Ft.computeBoundingSphere(),ce.copy(Ft.boundingSphere.center)),ce.applyMatrix4(w.matrixWorld).applyMatrix4(V)),Array.isArray(Dt)){let kt=Ft.groups;for(let Yt=0,ae=kt.length;Yt<ae;Yt++){let ge=kt[Yt],Vt=Dt[ge.materialIndex];Vt&&Vt.visible&&S.push(w,Ft,Vt,$,ce.z,ge,F)}}else Dt.visible&&S.push(w,Ft,Dt,$,ce.z,null,F)}}let Et=w.children;for(let Ft=0,Dt=Et.length;Ft<Dt;Ft++)$e(Et[Ft],F,$,q)}function Me(w,F,$,q){let{opaque:Z,transmissive:Et,transparent:Ft}=w;b.setupLightsView($),Pt===!0&&mt.setGlobalState(P.clippingPlanes,$),q&&x.viewport(j.copy(q)),Z.length>0&&cn(Z,F,$),Et.length>0&&cn(Et,F,$),Ft.length>0&&cn(Ft,F,$),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ye(w,F,$,q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[q.id]===void 0){let Vt=bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[q.id]=new Yn(1,1,{generateMipmaps:!0,type:Vt?Ui:oi,minFilter:kr,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_e.workingColorSpace})}let Et=b.state.transmissionRenderTarget[q.id],Ft=q.viewport||j;Et.setSize(Ft.z*P.transmissionResolutionScale,Ft.w*P.transmissionResolutionScale);let Dt=P.getRenderTarget(),kt=P.getActiveCubeFace(),Yt=P.getActiveMipmapLevel();P.setRenderTarget(Et),P.getClearColor(Jt),Ht=P.getClearAlpha(),Ht<1&&P.setClearColor(16777215,.5),P.clear(),$t&&Zt.render($);let ae=P.toneMapping;P.toneMapping=Li;let ge=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),b.setupLightsView(q),Pt===!0&&mt.setGlobalState(P.clippingPlanes,q),cn(w,$,q),Q.updateMultisampleRenderTarget(Et),Q.updateRenderTargetMipmap(Et),bt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let we=0,Qe=F.length;we<Qe;we++){let Ue=F[we],{object:Pe,geometry:yn,material:Ut,group:Ln}=Ue;if(Ut.side===Zi&&Pe.layers.test(q.layers)){let Se=Ut.side;Ut.side=On,Ut.needsUpdate=!0,Ke(Pe,$,q,yn,Ut,Ln),Ut.side=Se,Ut.needsUpdate=!0,Vt=!0}}Vt===!0&&(Q.updateMultisampleRenderTarget(Et),Q.updateRenderTargetMipmap(Et))}P.setRenderTarget(Dt,kt,Yt),P.setClearColor(Jt,Ht),ge!==void 0&&(q.viewport=ge),P.toneMapping=ae}function cn(w,F,$){let q=F.isScene===!0?F.overrideMaterial:null;for(let Z=0,Et=w.length;Z<Et;Z++){let Ft=w[Z],{object:Dt,geometry:kt,group:Yt}=Ft,ae=Ft.material;ae.allowOverride===!0&&q!==null&&(ae=q),Dt.layers.test($.layers)&&Ke(Dt,F,$,kt,ae,Yt)}}function Ke(w,F,$,q,Z,Et){L!==null&&Z.isNodeMaterial&&L.setObject(w,Z),w.onBeforeRender(P,F,$,q,Z,Et),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(P,F,$,q,w,Et),Z.transparent===!0&&Z.side===Zi&&Z.forceSinglePass===!1?(Z.side=On,Z.needsUpdate=!0,P.renderBufferDirect($,F,q,Z,w,Et),Z.side=Br,Z.needsUpdate=!0,P.renderBufferDirect($,F,q,Z,w,Et),Z.side=Zi):P.renderBufferDirect($,F,q,Z,w,Et),w.onAfterRender(P,F,$,q,Z,Et)}function Ge(w,F,$){F.isScene!==!0&&(F=xe);let q=X.get(w),Z=b.state.lights,Et=b.state.shadowsArray,Ft=Z.state.version,Dt=Mt.getParameters(w,Z.state,Et,F,$,b.state.lightProbeGridArray),kt=Mt.getProgramCacheKey(Dt),Yt=q.programs;q.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?F.environment:null,q.fog=F.fog;let ae=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;q.envMap=gt.get(w.envMap||q.environment,ae),q.envMapRotation=q.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Yt===void 0&&(w.addEventListener("dispose",rt),Yt=new Map,q.programs=Yt);let ge=Yt.get(kt);if(ge!==void 0){if(q.currentProgram===ge&&q.lightsStateVersion===Ft)return Bi(w,Dt),ge}else Dt.uniforms=Mt.getUniforms(w),L!==null&&w.isNodeMaterial&&L.build(w,$,Dt),w.onBeforeCompile(Dt,P),ge=Mt.acquireProgram(Dt,kt),Yt.set(kt,ge),q.uniforms=Dt.uniforms;let Vt=q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Vt.clippingPlanes=mt.uniform),Bi(w,Dt),q.needsLights=mi(w),q.lightsStateVersion=Ft,q.needsLights&&(Vt.ambientLightColor.value=Z.state.ambient,Vt.lightProbe.value=Z.state.probe,Vt.sunLights.value=Z.state.sun,Vt.sunLightShadows.value=Z.state.sunShadow,Vt.directionalLights.value=Z.state.directional,Vt.directionalLightShadows.value=Z.state.directionalShadow,Vt.spotLights.value=Z.state.spot,Vt.spotLightShadows.value=Z.state.spotShadow,Vt.rectAreaLights.value=Z.state.rectArea,Vt.ltc_1.value=Z.state.rectAreaLTC1,Vt.ltc_2.value=Z.state.rectAreaLTC2,Vt.pointLights.value=Z.state.point,Vt.pointLightShadows.value=Z.state.pointShadow,Vt.hemisphereLights.value=Z.state.hemi,Vt.sunShadowMatrix.value=Z.state.sunShadowMatrix,Vt.sunShadowCascade.value=Z.state.sunShadowCascade,Vt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Vt.spotLightMatrix.value=Z.state.spotLightMatrix,Vt.spotLightMap.value=Z.state.spotLightMap,Vt.pointShadowMatrix.value=Z.state.pointShadowMatrix),q.lightProbeGrid=b.state.lightProbeGridArray.length>0,q.currentProgram=ge,q.uniformsList=null,ge}function rn(w){if(w.uniformsList===null){let F=w.currentProgram.getUniforms();w.uniformsList=go.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Bi(w,F){let $=X.get(w);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Is(w,F){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let $=0,q=w.length;$<q;$++){let Z=w[$];if(Z.texture!==null&&Z.boundingBox.containsPoint(v))return Z}return null}function hn(w,F,$,q,Z){F.isScene!==!0&&(F=xe),Q.resetTextureUnits();let Et=F.fog,Ft=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?F.environment:null,Dt=et===null?P.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:_e.workingColorSpace,kt=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Yt=gt.get(q.envMap||Ft,kt),ae=q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ge=!!$.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Vt=!!$.morphAttributes.position,we=!!$.morphAttributes.normal,Qe=!!$.morphAttributes.color,Ue=Li;q.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ue=P.toneMapping);let Pe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,yn=Pe!==void 0?Pe.length:0,Ut=X.get(q),Ln=b.state.lights;if(Pt===!0&&(Xt===!0||w!==R)){let De=w===R&&q.id===Y;mt.setState(q,w,De)}let Se=!1;q.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Ln.state.version||Ut.outputColorSpace!==Dt||Z.isBatchedMesh&&Ut.batching===!1||!Z.isBatchedMesh&&Ut.batching===!0||Z.isBatchedMesh&&Ut.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Ut.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Ut.instancing===!1||!Z.isInstancedMesh&&Ut.instancing===!0||Z.isSkinnedMesh&&Ut.skinning===!1||!Z.isSkinnedMesh&&Ut.skinning===!0||Z.isInstancedMesh&&Ut.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ut.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ut.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ut.instancingMorph===!1&&Z.morphTexture!==null||Ut.envMap!==Yt||q.fog===!0&&Ut.fog!==Et||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==mt.numPlanes||Ut.numIntersection!==mt.numIntersection)||Ut.vertexAlphas!==ae||Ut.vertexTangents!==ge||Ut.morphTargets!==Vt||Ut.morphNormals!==we||Ut.morphColors!==Qe||Ut.toneMapping!==Ue||Ut.morphTargetsCount!==yn||!!Ut.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Se=!0):(Se=!0,Ut.__version=q.version);let gi=Ut.currentProgram;Se===!0&&(gi=Ge(q,F,Z),L&&q.isNodeMaterial&&L.onUpdateProgram(q,gi,Ut));let zi=!1,br=!1,Ds=!1,Re=gi.getUniforms(),Ze=Ut.uniforms;if(x.useProgram(gi.program)&&(zi=!0,br=!0,Ds=!0),q.id!==Y&&(Y=q.id,br=!0),Ut.needsLights){let De=Is(b.state.lightProbeGridArray,Z);Ut.lightProbeGrid!==De&&(Ut.lightProbeGrid=De,br=!0)}if(zi||R!==w){x.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Re.setValue(N,"projectionMatrix",w.projectionMatrix),Re.setValue(N,"viewMatrix",w.matrixWorldInverse);let Tr=Re.map.cameraPosition;Tr!==void 0&&Tr.setValue(N,te.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&Re.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Re.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),R!==w&&(R=w,br=!0,Ds=!0)}if(Ut.needsLights&&(Ln.state.sunShadowMap.length>0&&Re.setValue(N,"sunShadowMap",Ln.state.sunShadowMap,Q),Ln.state.directionalShadowMap.length>0&&Re.setValue(N,"directionalShadowMap",Ln.state.directionalShadowMap,Q),Ln.state.spotShadowMap.length>0&&Re.setValue(N,"spotShadowMap",Ln.state.spotShadowMap,Q),Ln.state.pointShadowMap.length>0&&Re.setValue(N,"pointShadowMap",Ln.state.pointShadowMap,Q)),Z.isSkinnedMesh){Re.setOptional(N,Z,"bindMatrix"),Re.setOptional(N,Z,"bindMatrixInverse");let De=Z.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),Re.setValue(N,"boneTexture",De.boneTexture,Q))}Z.isBatchedMesh&&(Re.setOptional(N,Z,"batchingTexture"),Re.setValue(N,"batchingTexture",Z._matricesTexture,Q),Re.setOptional(N,Z,"batchingIdTexture"),Re.setValue(N,"batchingIdTexture",Z._indirectTexture,Q),Re.setOptional(N,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Re.setValue(N,"batchingColorTexture",Z._colorsTexture,Q));let wr=$.morphAttributes;if((wr.position!==void 0||wr.normal!==void 0||wr.color!==void 0)&&U.update(Z,$,gi),(br||Ut.receiveShadow!==Z.receiveShadow)&&(Ut.receiveShadow=Z.receiveShadow,Re.setValue(N,"receiveShadow",Z.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&F.environment!==null&&(Ze.envMapIntensity.value=F.environmentIntensity),Ze.dfgLUT!==void 0&&(Ze.dfgLUT.value=rb()),br){if(Re.setValue(N,"toneMappingExposure",P.toneMappingExposure),Ut.needsLights&&qe(Ze,Ds),Et&&q.fog===!0&&Nt.refreshFogUniforms(Ze,Et),Nt.refreshMaterialUniforms(Ze,q,nt,K,b.state.transmissionRenderTarget[w.id]),Ut.needsLights&&Ut.lightProbeGrid){let De=Ut.lightProbeGrid;Ze.probesSH.value=De.texture,Ze.probesMin.value.copy(De.boundingBox.min),Ze.probesMax.value.copy(De.boundingBox.max),Ze.probesResolution.value.copy(De.resolution)}go.upload(N,rn(Ut),Ze,Q)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(go.upload(N,rn(Ut),Ze,Q),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Re.setValue(N,"center",Z.center),Re.setValue(N,"modelViewMatrix",Z.modelViewMatrix),Re.setValue(N,"normalMatrix",Z.normalMatrix),Re.setValue(N,"modelMatrix",Z.matrixWorld),q.uniformsGroups!==void 0){let De=q.uniformsGroups;for(let Tr=0,Ns=De.length;Tr<Ns;Tr++){let fp=De[Tr];ct.update(fp,gi),ct.bind(fp,gi)}}return gi}function qe(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.sunLights.needsUpdate=F,w.sunLightShadows.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function mi(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(w,F,$){let q=X.get(w);q.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),X.get(w.texture).__webglTexture=F,X.get(w.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:$,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){let $=X.get(w);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,$=0){et=w,J=F,H=$;let q=null,Z=!1,Et=!1;if(w){let Dt=X.get(w);if(Dt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,Dt.__webglFramebuffer),j.copy(w.viewport),At.copy(w.scissor),Rt=w.scissorTest,x.viewport(j),x.scissor(At),x.setScissorTest(Rt),Y=-1;return}else if(Dt.__webglFramebuffer===void 0)Q.setupRenderTarget(w);else if(Dt.__hasExternalTextures)Q.rebindTextures(w,X.get(w.texture).__webglTexture,X.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let ae=w.depthTexture;if(Dt.__boundDepthTexture!==ae){if(ae!==null&&X.has(ae)&&(w.width!==ae.image.width||w.height!==ae.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(w)}}let kt=w.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Et=!0);let Yt=X.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Yt[F])?q=Yt[F][$]:q=Yt[F],Z=!0):w.samples>0&&Q.useMultisampledRTT(w)===!1?q=X.get(w).__webglMultisampledFramebuffer:Array.isArray(Yt)?q=Yt[$]:q=Yt,j.copy(w.viewport),At.copy(w.scissor),Rt=w.scissorTest}else j.copy(at).multiplyScalar(nt).floor(),At.copy(lt).multiplyScalar(nt).floor(),Rt=_t;if($!==0&&(q=W),x.bindFramebuffer(N.FRAMEBUFFER,q)&&x.drawBuffers(w,q),x.viewport(j),x.scissor(At),x.setScissorTest(Rt),Z){let Dt=X.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,Dt.__webglTexture,$)}else if(Et){let Dt=F;for(let kt=0;kt<w.textures.length;kt++){let Yt=X.get(w.textures[kt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+kt,Yt.__webglTexture,$,Dt)}}else if(w!==null&&$!==0){let Dt=X.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Dt.__webglTexture,$)}Y=-1};function Ls(w){let F=X.get(w);return(F.__readFormat!==w.format||F.__readType!==w.type)&&(F.__readFormat=w.format,F.__readType=w.type,F.__formatReadable=C.textureFormatReadable(w.format),F.__typeReadable=C.textureTypeReadable(w.type)),F}this.readRenderTargetPixels=function(w,F,$,q,Z,Et,Ft,Dt=0){if(!(w&&w.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ft!==void 0&&(kt=kt[Ft]),kt){x.bindFramebuffer(N.FRAMEBUFFER,kt);try{let Yt=w.textures[Dt],ae=Yt.format,ge=Yt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Dt);let Vt=Ls(Yt);if(Vt.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Vt.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-q&&$>=0&&$<=w.height-Z&&N.readPixels(F,$,q,Z,yt.convert(ae),yt.convert(ge),Et)}finally{let Yt=et!==null?X.get(et).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Yt)}}},this.readRenderTargetPixelsAsync=async function(w,F,$,q,Z,Et,Ft,Dt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=X.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ft!==void 0&&(kt=kt[Ft]),kt)if(F>=0&&F<=w.width-q&&$>=0&&$<=w.height-Z){x.bindFramebuffer(N.FRAMEBUFFER,kt);let Yt=w.textures[Dt],ae=Yt.format,ge=Yt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Dt);let Vt=Ls(Yt);if(Vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let we=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,we),N.bufferData(N.PIXEL_PACK_BUFFER,Et.byteLength,N.STREAM_READ),N.readPixels(F,$,q,Z,yt.convert(ae),yt.convert(ge),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Qe=et!==null?X.get(et).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Qe);let Ue=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Am(N,Ue,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,we),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Et),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(we),N.deleteSync(Ue),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,$=0){let q=Math.pow(2,-$),Z=Math.floor(w.image.width*q),Et=Math.floor(w.image.height*q),Ft=F!==null?F.x:0,Dt=F!==null?F.y:0;Q.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,Ft,Dt,Z,Et),x.unbindTexture()},this.copyTextureToTexture=function(w,F,$=null,q=null,Z=0,Et=0){let Ft,Dt,kt,Yt,ae,ge,Vt,we,Qe,Ue=w.isCompressedTexture?w.mipmaps[Et]:w.image;if($!==null)Ft=$.max.x-$.min.x,Dt=$.max.y-$.min.y,kt=$.isBox3?$.max.z-$.min.z:1,Yt=$.min.x,ae=$.min.y,ge=$.isBox3?$.min.z:0;else{let Ze=Math.pow(2,-Z);Ft=Math.floor(Ue.width*Ze),Dt=Math.floor(Ue.height*Ze),w.isDataArrayTexture?kt=Ue.depth:w.isData3DTexture?kt=Math.floor(Ue.depth*Ze):kt=1,Yt=0,ae=0,ge=0}q!==null?(Vt=q.x,we=q.y,Qe=q.z):(Vt=0,we=0,Qe=0);let Pe=yt.convert(F.format),yn=yt.convert(F.type),Ut;F.isData3DTexture?(Q.setTexture3D(F,0),Ut=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),Ut=N.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),Ut=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);let Ln=x.getParameter(N.UNPACK_ROW_LENGTH),Se=x.getParameter(N.UNPACK_IMAGE_HEIGHT),gi=x.getParameter(N.UNPACK_SKIP_PIXELS),zi=x.getParameter(N.UNPACK_SKIP_ROWS),br=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,Ue.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ue.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Yt),x.pixelStorei(N.UNPACK_SKIP_ROWS,ae),x.pixelStorei(N.UNPACK_SKIP_IMAGES,ge);let Ds=w.isDataArrayTexture||w.isData3DTexture,Re=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){let Ze=X.get(w),wr=X.get(F),De=X.get(Ze.__renderTarget),Tr=X.get(wr.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,De.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,Tr.__webglFramebuffer);for(let Ns=0;Ns<kt;Ns++)Ds&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(w).__webglTexture,Z,ge+Ns),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(F).__webglTexture,Et,Qe+Ns)),N.blitFramebuffer(Yt,ae,Ft,Dt,Vt,we,Ft,Dt,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||X.has(w)){let Ze=X.get(w),wr=X.get(F);x.bindFramebuffer(N.READ_FRAMEBUFFER,I),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,G);for(let De=0;De<kt;De++)Ds?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ze.__webglTexture,Z,ge+De):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ze.__webglTexture,Z),Re?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,wr.__webglTexture,Et,Qe+De):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,wr.__webglTexture,Et),Z!==0?N.blitFramebuffer(Yt,ae,Ft,Dt,Vt,we,Ft,Dt,N.COLOR_BUFFER_BIT,N.NEAREST):Re?N.copyTexSubImage3D(Ut,Et,Vt,we,Qe+De,Yt,ae,Ft,Dt):N.copyTexSubImage2D(Ut,Et,Vt,we,Yt,ae,Ft,Dt);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Re?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Ut,Et,Vt,we,Qe,Ft,Dt,kt,Pe,yn,Ue.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(Ut,Et,Vt,we,Qe,Ft,Dt,kt,Pe,Ue.data):N.texSubImage3D(Ut,Et,Vt,we,Qe,Ft,Dt,kt,Pe,yn,Ue):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Et,Vt,we,Ft,Dt,Pe,yn,Ue.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Et,Vt,we,Ue.width,Ue.height,Pe,Ue.data):N.texSubImage2D(N.TEXTURE_2D,Et,Vt,we,Ft,Dt,Pe,yn,Ue);x.pixelStorei(N.UNPACK_ROW_LENGTH,Ln),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Se),x.pixelStorei(N.UNPACK_SKIP_PIXELS,gi),x.pixelStorei(N.UNPACK_SKIP_ROWS,zi),x.pixelStorei(N.UNPACK_SKIP_IMAGES,br),Et===0&&F.generateMipmaps&&N.generateMipmap(Ut),x.unbindTexture()},this.initRenderTarget=function(w){X.get(w).__webglFramebuffer===void 0&&Q.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Q.setTextureCube(w,0):w.isData3DTexture?Q.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Q.setTexture2DArray(w,0):Q.setTexture2D(w,0),x.unbindTexture()},this.resetState=function(){J=0,H=0,et=null,x.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=_e._getDrawingBufferColorSpace(t),e.unpackColorSpace=_e._getUnpackColorSpace()}};function dr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function gg(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}var Kn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ha={duration:.5,overwrite:!1,delay:0},dd,_n,Oe,Si=1e8,Le=1/Si,id=Math.PI*2,sb=id/4,ob=0,_g=Math.sqrt,ab=Math.cos,lb=Math.sin,an=function(t){return typeof t=="string"},He=function(t){return typeof t=="function"},mr=function(t){return typeof t=="number"},kh=function(t){return typeof t>"u"},tr=function(t){return typeof t=="object"},$n=function(t){return t!==!1},pd=function(){return typeof window<"u"},Ih=function(t){return He(t)||an(t)},xg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},En=Array.isArray,cb=/random\([^)]+\)/g,hb=/,\s*/g,lg=/(?:-?\.?\d|\.)+/gi,md=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ms=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,$f=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,gd=/[+-]=-?[.\d]+/,ub=/[^,'"\[\]\s]+/gi,fb=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ke,Qi,rd,_d,li={},Uh={},vg,yg=function(t){return(Uh=vo(t,li))&&An},Vh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Wa=function(t,e){return!e&&console.warn(t)},Sg=function(t,e){return t&&(li[t]=e)&&Uh&&(Uh[t]=e)||li},Xa=function(){return 0},db={suppressEvents:!0,isStart:!0,kill:!1},Lh={suppressEvents:!0,kill:!1},pb={suppressEvents:!0},xd={},Wr=[],sd={},Mg,Zn={},Kf={},cg=30,Dh=[],vd="",yd=function(t){var e=t[0],n,i;if(tr(e)||He(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Dh.length;i--&&!Dh[i].targetTest(e););n=Dh[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new wd(t[i],n)))||t.splice(i,1);return t},Xr=function(t){return t._gsap||yd(Mi(t))[0]._gsap},Sd=function(t,e,n){return(n=t[e])&&He(n)?t[e]():kh(n)&&t.getAttribute&&t.getAttribute(e)||n},Bn=function(t,e){return(t=t.split(",")).forEach(e)||t},We=function(t){return Math.round(t*1e5)/1e5||0},ze=function(t){return Math.round(t*1e7)/1e7||0},gs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},mb=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Fh=function(){var t=Wr.length,e=Wr.slice(0),n,i;for(sd={},Wr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Md=function(t){return!!(t._initted||t._startAt||t.add)},bg=function(t,e,n,i){Wr.length&&!_n&&Fh(),t.render(e,n,i||!!(_n&&e<0&&Md(t))),Wr.length&&!_n&&Fh()},wg=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(ub).length<2?e:an(t)?t.trim():t},Tg=function(t){return t},ci=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},gb=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},vo=function(t,e){for(var n in e)t[n]=e[n];return t},hg=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=tr(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},Oh=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},ka=function(t){var e=t.parent||ke,n=t.keyframes?gb(En(t.keyframes)):ci;if($n(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},_b=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Eg=function(t,e,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Gh=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},Yr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},fs=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},xb=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},od=function(t,e,n,i){return t._startAt&&(_n?t._startAt.revert(Lh):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},vb=function r(t){return!t||t._ts&&r(t.parent)},ug=function(t){return t._repeat?yo(t._tTime,t=t.duration()+t._rDelay)*t:0},yo=function(t,e){var n=Math.floor(t=ze(t/e));return t&&n===t?n-1:n},Bh=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Hh=function(t){return t._end=ze(t._start+(t._tDur/Math.abs(t._ts||t._rts||Le)||0))},Wh=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=ze(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Hh(t),n._dirty||fs(n,t)),t},Ag=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Bh(t.rawTime(),e),(!e._dur||Za(0,e.totalDuration(),n)-e._tTime>Le)&&e.render(n,!0)),fs(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Le}},ji=function(t,e,n,i){return e.parent&&Yr(e),e._start=ze((mr(n)?n:n||t!==ke?yi(t,n,e):t._time)+e._delay),e._end=ze(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Eg(t,e,"_first","_last",t._sort?"_start":0),ad(e)||(t._recent=e),i||Ag(t,e),t._ts<0&&Wh(t,t._tTime),t},Cg=function(t,e){return(li.ScrollTrigger||Vh("scrollTrigger",e))&&li.ScrollTrigger.create(e,t)},Rg=function(t,e,n,i,s){if(Ad(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!_n&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Mg!==Jn.frame)return Wr.push(t),t._lazy=[s,i],1},yb=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},ad=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Sb=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&yb(t)&&!(!t._initted&&ad(t))||(t._ts<0||t._dp._ts<0)&&!ad(t))?0:1,a=t._rDelay,l=0,c,h,d;if(a&&t._repeat&&(l=Za(0,t._tDur,e),h=yo(l,a),t._yoyo&&h&1&&(o=1-o),h!==yo(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||_n||i||t._zTime===Le||!e&&t._zTime){if(!t._initted&&Rg(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?Le:0),n||(n=e&&!d),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&od(t,e,n,!0),t._onUpdate&&!n&&ai(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&ai(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Yr(t,1),!n&&!_n&&(ai(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Mb=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},So=function(t,e,n,i){var s=t._repeat,o=ze(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:ze(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Wh(t,t._tTime=t._tDur*a),t.parent&&Hh(t),n||fs(t.parent,t),t},fg=function(t){return t instanceof Tn?fs(t):So(t,t._dur)},bb={_start:0,endTime:Xa,totalDuration:Xa},yi=function r(t,e,n){var i=t.labels,s=t._recent||bb,o=t.duration()>=Si?s.endTime(!1):t._dur,a,l,c;return an(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(En(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Va=function(t,e,n){var i=mr(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;o.immediateRender=$n(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new Je(e[0],o,e[s+1])},qr=function(t,e){return t||t===0?e(t):e},Za=function(t,e,n){return n<t?t:n>e?e:n},xn=function(t,e){return!an(t)||!(e=fb.exec(t))?"":e[1]},wb=function(t,e,n){return qr(n,function(i){return Za(t,e,i)})},ld=[].slice,Pg=function(t,e){return t&&tr(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&tr(t[0]))&&!t.nodeType&&t!==Qi},Tb=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return an(i)&&!e||Pg(i,1)?(s=n).push.apply(s,Mi(i)):n.push(i)})||n},Mi=function(t,e,n){return Oe&&!e&&Oe.selector?Oe.selector(t):an(t)&&!n&&(rd||!Mo())?ld.call((e||_d).querySelectorAll(t),0):En(t)?Tb(t,n):Pg(t)?ld.call(t,0):t?[t]:[]},cd=function(t){return t=Mi(t)[0]||Wa("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Mi(e,n.querySelectorAll?n:n===t?Wa("Invalid scope")||_d.createElement("div"):t)}},Ig=function(t){return t.sort(function(){return .5-Math.random()})},Lg=function(t){if(He(t))return t;var e=tr(t)?t:{each:t},n=ds(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,d=i;return an(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],d=i[1]),function(u,f,p){var _=(p||e).length,m=o[_],g,M,A,v,S,b,E,y,T;if(!m){if(T=e.grid==="auto"?0:(e.grid||[1,Si])[1],!T){for(E=-Si;E<(E=p[T++].getBoundingClientRect().left)&&T<_;);T<_&&T--}for(m=o[_]=[],g=l?Math.min(T,_)*h-.5:i%T,M=T===Si?0:l?_*d/T-.5:i/T|0,E=0,y=Si,b=0;b<_;b++)A=b%T-g,v=M-(b/T|0),m[b]=S=c?Math.abs(c==="y"?v:A):_g(A*A+v*v),S>E&&(E=S),S<y&&(y=S);i==="random"&&Ig(m),m.max=E-y,m.min=y,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(T>_?_-1:c?c==="y"?_/T:T:Math.max(T,_/T))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=xn(e.amount||e.each)||0,n=n&&_<0?Bb(n):n}return _=(m[u]-m.min)/m.max||0,ze(m.b+(n?n(_):_)*m.v)+m.u}},hd=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=ze(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(mr(n)?0:xn(n))}},Dg=function(t,e){var n=En(t),i,s;return!n&&tr(t)&&(i=n=t.radius||Si,t.values?(t=Mi(t.values),(s=!mr(t[0]))&&(i*=i)):t=hd(t.increment)),qr(e,n?He(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Si,h=0,d=t.length,u,f;d--;)s?(u=t[d].x-a,f=t[d].y-l,u=u*u+f*f):u=Math.abs(t[d]-a),u<c&&(c=u,h=d);return h=!i||c<=i?t[h]:o,s||h===o||mr(o)?h:h+xn(o)}:hd(t))},Ng=function(t,e,n,i){return qr(En(t)?!e:n===!0?!!(n=0):!i,function(){return En(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},Eb=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},Ab=function(t,e){return function(n){return t(parseFloat(n))+(e||xn(n))}},Cb=function(t,e,n){return Fg(t,e,0,1,n)},Ug=function(t,e,n){return qr(n,function(i){return t[~~e(i)]})},Rb=function r(t,e,n){var i=e-t;return En(t)?Ug(t,r(0,t.length),e):qr(n,function(s){return(i+(s-t)%i)%i+t})},Pb=function r(t,e,n){var i=e-t,s=i*2;return En(t)?Ug(t,r(0,t.length-1),e):qr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},bo=function(t){return t.replace(cb,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(hb);return Ng(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Fg=function(t,e,n,i,s){var o=e-t,a=i-n;return qr(s,function(l){return n+((l-t)/o*a||0)})},Ib=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var o=an(t),a={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(En(t)&&!En(e)){for(h=[],d=t.length,u=d-2,c=1;c<d;c++)h.push(r(t[c-1],t[c]));d--,s=function(p){p*=d;var _=Math.min(u,~~p);return h[_](p-_)},n=e}else i||(t=vo(En(t)?[]:{},t));if(!h){for(l in e)Td.call(a,t,l,"get",e[l]);s=function(p){return Pd(p,a)||(o?t.p:t)}}}return qr(n,s)},dg=function(t,e,n){var i=t.labels,s=Si,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ai=function(t,e,n){var i=t.vars,s=i[e],o=Oe,a=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&Wr.length&&Fh(),a&&(Oe=a),h=l?s.apply(c,l):s.call(c),Oe=o,h},Ba=function(t){return Yr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!_n),t.progress()<1&&ai(t,"onInterrupt"),t},xo,Og=[],Bg=function(t){if(t)if(t=!t.name&&t.default||t,pd()||t.headless){var e=t.name,n=He(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Xa,render:Pd,add:Td,kill:Zb,modifier:qb,rawVars:0},o={targetTest:0,get:0,getSetter:Xh,aliases:{},register:0};if(Mo(),t!==i){if(Zn[e])return;ci(i,ci(Oh(t,s),o)),vo(i.prototype,vo(s,Oh(t,o))),Zn[i.prop=e]=i,t.targetTest&&(Dh.push(i),xd[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Sg(e,i),t.register&&t.register(An,i,zn)}else Og.push(t)},Ie=255,za={aqua:[0,Ie,Ie],lime:[0,Ie,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ie],navy:[0,0,128],white:[Ie,Ie,Ie],olive:[128,128,0],yellow:[Ie,Ie,0],orange:[Ie,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ie,0,0],pink:[Ie,192,203],cyan:[0,Ie,Ie],transparent:[Ie,Ie,Ie,0]},Qf=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Ie+.5|0},zg=function(t,e,n){var i=t?mr(t)?[t>>16,t>>8&Ie,t&Ie]:0:za.black,s,o,a,l,c,h,d,u,f,p;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),za[t])i=za[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Ie,i&Ie,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Ie,t&Ie]}else if(t.substr(0,3)==="hsl"){if(i=p=t.match(lg),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=Qf(l+1/3,s,o),i[1]=Qf(l,s,o),i[2]=Qf(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(md),n&&i.length<4&&(i[3]=1),i}else i=t.match(lg)||za.transparent;i=i.map(Number)}return e&&!p&&(s=i[0]/Ie,o=i[1]/Ie,a=i[2]/Ie,d=Math.max(s,o,a),u=Math.min(s,o,a),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===s?(o-a)/f+(o<a?6:0):d===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},kg=function(t){var e=[],n=[],i=-1;return t.split(pr).forEach(function(s){var o=s.match(ms)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},pg=function(t,e,n){var i="",s=(t+i).match(pr),o=e?"hsla(":"rgba(",a=0,l,c,h,d;if(!s)return t;if(s=s.map(function(u){return(u=zg(u,e,1))&&o+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=kg(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(pr,"1").split(ms),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(pr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},pr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in za)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),Lb=/hsl[a]?\(/,bd=function(t){var e=t.join(" "),n;if(pr.lastIndex=0,pr.test(e))return n=Lb.test(e),t[1]=pg(t[1],n),t[0]=pg(t[0],n,kg(t[1])),!0},Ya,Jn=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,h,d,u,f,p=function _(m){var g=r()-i,M=m===!0,A,v,S,b;if((g>t||g<0)&&(n+=g-e),i+=g,S=i-n,A=S-o,(A>0||M)&&(b=++d.frame,u=S-d.time*1e3,d.time=S=S/1e3,o+=A+(A>=s?4:s-A),v=1),M||(l=c(_)),v)for(f=0;f<a.length;f++)a[f](S,u,b,m)};return d={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return u/(1e3/(m||60))},wake:function(){vg&&(!rd&&pd()&&(Qi=rd=window,_d=Qi.document||{},li.gsap=An,(Qi.gsapVersions||(Qi.gsapVersions=[])).push(An.version),yg(Uh||Qi.GreenSockGlobals||!Qi.gsap&&Qi||{}),Og.forEach(Bg)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Ya=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Ya=0,c=Xa},lagSmoothing:function(m,g){t=m||1/0,e=Math.min(g||33,t)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,g,M){var A=g?function(v,S,b,E){m(v,S,b,E),d.remove(A)}:m;return d.remove(m),a[M?"unshift":"push"](A),Mo(),A},remove:function(m,g){~(g=a.indexOf(m))&&a.splice(g,1)&&f>=g&&f--},_listeners:a},d})(),Mo=function(){return!Ya&&Jn.wake()},ve={},Db=/^[\d.\-M][\d.\-,\s]/,Nb=/["']/g,Ub=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(Nb,"").trim():+c,i=l.substr(a+1).trim();return e},Fb=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Ob=function(t){var e=(t+"").split("("),n=ve[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Ub(e[1])]:Fb(t).split(",").map(wg)):ve._CE&&Db.test(t)?ve._CE("",t):n},Bb=function(t){return function(e){return 1-t(1-e)}},ds=function(t,e){return t&&(He(t)?t:ve[t]||Ob(t))||e},_s=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return Bn(t,function(a){ve[a]=li[a]=s,ve[o=a.toLowerCase()]=n;for(var l in s)ve[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ve[a+"."+l]=s[l]}),s},Vg=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},jf=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/id*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*lb((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Vg(a);return s=id/s,l.config=function(c,h){return r(t,c,h)},l},td=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Vg(n);return i.config=function(s){return r(t,s)},i};Bn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;_s(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ve.Linear.easeNone=ve.none=ve.Linear.easeIn;_s("Elastic",jf("in"),jf("out"),jf());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};_s("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);_s("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});_s("Circ",function(r){return-(_g(1-r*r)-1)});_s("Sine",function(r){return r===1?1:-ab(r*sb)+1});_s("Back",td("in"),td("out"),td());ve.SteppedEase=ve.steps=li.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-Le;return function(a){return((i*Za(0,o,a)|0)+s)*n}}};Ha.ease=ve["quad.out"];Bn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return vd+=r+","+r+"Params,"});var wd=function(t,e){this.id=ob++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Sd,this.set=e?e.getSetter:Xh},qa=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,So(this,+e.duration,1,1),this.data=e.data,Oe&&(this._ctx=Oe,Oe.data.push(this)),Ya||Jn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,So(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Mo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Wh(this,n),!s._dp||s.parent||Ag(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ji(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Le||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),bg(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+ug(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+ug(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?yo(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-Le?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Bh(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Le?0:this._rts,this.totalTime(Za(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),Hh(this),xb(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Mo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Le&&(this._tTime-=Le)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=ze(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ji(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Bh(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=pb);var i=_n;return _n=n,Md(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),_n=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,fg(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,fg(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(yi(this,n),$n(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,$n(i)),this._dur||(this._zTime=-Le),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Le:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Le,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Le)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=He(n)?n:Tg,l=function(){var h=i.then;i.then=null,s&&s(),He(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Ba(this)},r})();ci(qa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Le,_prom:0,_ps:!1,_rts:1});var Tn=(function(r){gg(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),ke&&ji(n.parent||ke,dr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Cg(dr(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return Va(0,arguments,this),this},e.from=function(i,s,o){return Va(1,arguments,this),this},e.fromTo=function(i,s,o,a){return Va(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,ka(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Je(i,s,yi(this,o),1),this},e.call=function(i,s,o){return ji(this,Je.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new Je(i,o,yi(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,h){return o.runBackwards=1,ka(o).immediateRender=$n(o.immediateRender),this.staggerTo(i,s,o,a,l,c,h)},e.staggerFromTo=function(i,s,o,a,l,c,h,d){return a.startAt=o,ka(a).immediateRender=$n(a.immediateRender),this.staggerTo(i,s,a,l,c,h,d)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:ze(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,p,_,m,g,M,A,v,S,b,E;if(this!==ke&&h>l&&i>=0&&(h=l),h!==this._tTime||o||d){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),u=h,v=this._start,A=this._ts,g=!A,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(u=ze(h%m),h===l?(_=this._repeat,u=c):(S=ze(h/m),_=~~S,_&&_===S&&(u=c,_--),u>c&&(u=c)),S=yo(this._tTime,m),!a&&this._tTime&&S!==_&&this._tTime-S*m-this._dur<=0&&(S=_),b&&_&1&&(u=c-u,E=1),_!==S&&!this._lock){var y=b&&S&1,T=y===(b&&_&1);if(_<S&&(y=!y),a=y?0:h%c?c:h,this._lock=1,this.render(a||(E?0:ze(_*m)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&ai(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,S=_),a&&a!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,T&&(this._lock=2,a=y?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=Mb(this,ze(a),ze(u)),M&&(h-=u-(u=M._start))),this._tTime=h,this._time=u,this._act=!!A,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!s&&!S&&(ai(this,"onStart"),this._tTime!==h))return this;if(u>=a&&i>=0)for(f=this._first;f;){if(p=f._next,(f._act||u>=f._start)&&f._ts&&M!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,s,o),u!==this._time||!this._ts&&!g){M=0,p&&(h+=this._zTime=-Le);break}}f=p}else{f=this._last;for(var P=i<0?i:u;f;){if(p=f._prev,(f._act||P<=f._end)&&f._ts&&M!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(P-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(P-f._start)*f._ts,s,o||_n&&Md(f)),u!==this._time||!this._ts&&!g){M=0,p&&(h+=this._zTime=P?-Le:Le);break}}f=p}}if(M&&!s&&(this.pause(),M.render(u>=a?0:-Le)._zTime=u>=a?1:-1,this._ts))return this._start=v,Hh(this),this.render(i,s,o);this._onUpdate&&!s&&ai(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(v===this._start||Math.abs(A)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Yr(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(ai(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(mr(s)||(s=yi(this,s,i)),!(i instanceof qa)){if(En(i))return i.forEach(function(a){return o.add(a,s)}),this;if(an(i))return this.addLabel(i,s);if(He(i))i=Je.delayedCall(0,i);else return this}return this!==i?ji(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Si);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Je?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return an(i)?this.removeLabel(i):He(i)?this.killTweensOf(i):(i.parent===this&&Gh(this,i),i===this._recent&&(this._recent=this._last),fs(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ze(Jn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=yi(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=Je.delayedCall(0,s||Xa,o);return a.data="isPause",this._hasPause=1,ji(this,a,yi(this,i))},e.removePause=function(i){var s=this._first;for(i=yi(this,i);s;)s._start===i&&s.data==="isPause"&&Yr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Hr!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=Mi(i),l=this._first,c=mr(s),h;l;)l instanceof Je?mb(l._targets,a)&&(c?(!Hr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=yi(o,i),l=s,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,p=Je.to(o,ci({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Le,onStart:function(){if(o.pause(),!f){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==m&&So(p,m,0,1).render(p._time,!0,!0),f=1}h&&h.apply(p,d||[])}},s));return u?p.render(0):p},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,ci({startAt:{time:yi(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),dg(this,yi(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),dg(this,yi(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Le)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=ze(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return fs(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),fs(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Si,c,h,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ji(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=ze(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;So(o,o===ke&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(ke._ts&&(bg(ke,Bh(i,ke)),Mg=Jn.frame),Jn.frame>=cg){cg+=Kn.autoSleep||120;var s=ke._first;if((!s||!s._ts)&&Kn.autoSleep&&Jn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Jn.sleep()}}},t})(qa);ci(Tn.prototype,{_lock:0,_hasPause:0,_forcing:0});var zb=function(t,e,n,i,s,o,a){var l=new zn(this._pt,t,e,0,1,Rd,null,s),c=0,h=0,d,u,f,p,_,m,g,M;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=bo(i)),o&&(M=[n,i],o(M,t,e),n=M[0],i=M[1]),u=n.match($f)||[];d=$f.exec(i);)p=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),p!==u[h++]&&(m=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:m,c:p.charAt(1)==="="?gs(m,p)-m:parseFloat(p)-m,m:f&&f<4?Math.round:0},c=$f.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(gd.test(i)||g)&&(l.e=0),this._pt=l,l},Td=function(t,e,n,i,s,o,a,l,c,h){He(i)&&(i=i(s||0,t,o));var d=t[e],u=n!=="get"?n:He(d)?c?t[e.indexOf("set")||!He(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=He(d)?c?Wb:Wg:Cd,p;if(an(i)&&(~i.indexOf("random(")&&(i=bo(i)),i.charAt(1)==="="&&(p=gs(u,i)+(xn(u)||0),(p||p===0)&&(i=p))),!h||u!==i||ud)return!isNaN(u*i)&&i!==""?(p=new zn(this._pt,t,e,+u||0,i-(u||0),typeof d=="boolean"?Yb:Xg,0,f),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!d&&!(e in t)&&Vh(e,i),zb.call(this,t,e,u,i,f,l||Kn.stringFilter,c))},kb=function(t,e,n,i,s){if(He(t)&&(t=Ga(t,s,e,n,i)),!tr(t)||t.style&&t.nodeType||En(t)||xg(t))return an(t)?Ga(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Ga(t[a],s,e,n,i);return o},Ed=function(t,e,n,i,s,o){var a,l,c,h;if(Zn[t]&&(a=new Zn[t]).init(s,a.rawVars?e[t]:kb(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new zn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==xo))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},Hr,ud,Ad=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,p=t._dur,_=t._startAt,m=t._targets,g=t.parent,M=g&&g.data==="nested"?g.vars.targets:m,A=t._overwrite==="auto"&&!dd,v=t.timeline,S=i.easeReverse||d,b,E,y,T,P,D,L,W,I,G,J,H,et;if(v&&(!u||!s)&&(s="none"),t._ease=ds(s,Ha.ease),t._rEase=S&&(ds(S)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||u&&!i.stagger){if(W=m[0]?Xr(m[0]).harness:0,H=W&&i[W.prop],b=Oh(i,xd),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!f?_.render(-1,!0):_.revert(h&&p?Lh:db),_._lazy=0),o){if(Yr(t._startAt=Je.set(m,ci({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return ai(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n||!a&&!f)&&t._startAt.revert(Lh),a&&p&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&p&&!_){if(e&&(a=!1),y=ci({overwrite:!1,data:"isFromStart",lazy:a&&!_&&$n(l),immediateRender:a,stagger:0,parent:g},b),H&&(y[W.prop]=H),Yr(t._startAt=Je.set(m,y)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n?t._startAt.revert(Lh):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,Le,Le);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&$n(l)||l&&!p,E=0;E<m.length;E++){if(P=m[E],L=P._gsap||yd(m)[E]._gsap,t._ptLookup[E]=G={},sd[L.id]&&Wr.length&&Fh(),J=M===m?E:M.indexOf(P),W&&(I=new W).init(P,H||b,t,J,M)!==!1&&(t._pt=T=new zn(t._pt,P,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(Y){G[Y]=T}),I.priority&&(D=1)),!W||H)for(y in b)Zn[y]&&(I=Ed(y,b,t,J,P,M))?I.priority&&(D=1):G[y]=T=Td.call(t,P,y,"get",b[y],J,M,0,i.stringFilter);t._op&&t._op[E]&&t.kill(P,t._op[E]),A&&t._pt&&(Hr=t,ke.killTweensOf(P,G,t.globalTime(e)),et=!t.parent,Hr=0),t._pt&&l&&(sd[L.id]=1)}D&&Id(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!et,u&&e<=0&&v.render(Si,!0,!0)},Vb=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,u,f;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,f=t._targets.length;f--;){if(h=u[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return ud=1,t.vars[e]="+=0",Ad(t,a),ud=0,l?Wa(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,d.e&&(d.e=We(n)+xn(d.e)),d.b&&(d.b=h.s+xn(d.b))},Gb=function(t,e){var n=t[0]?Xr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=vo({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},Hb=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(En(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Ga=function(t,e,n,i,s){return He(t)?t.call(e,n,i,s):an(t)&&~t.indexOf("random(")?bo(t):t},Gg=vd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Hg={};Bn(Gg+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Hg[r]=1});var Je=(function(r){gg(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:ka(i))||this;var l=a.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,p=l.keyframes,_=l.defaults,m=l.scrollTrigger,g=i.parent||ke,M=(En(n)||xg(n)?mr(n[0]):"length"in i)?[n]:Mi(n),A,v,S,b,E,y,T,P;if(a._targets=M.length?yd(M):Wa("GSAP target "+n+" not found. https://gsap.com",!Kn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,p||u||Ih(c)||Ih(h)){i=a.vars;var D=i.easeReverse||i.yoyoEase;if(A=a.timeline=new Tn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:M}),A.kill(),A.parent=A._dp=dr(a),A._start=0,u||Ih(c)||Ih(h)){if(b=M.length,T=u&&Lg(u),tr(u))for(E in u)~Gg.indexOf(E)&&(P||(P={}),P[E]=u[E]);for(v=0;v<b;v++)S=Oh(i,Hg),S.stagger=0,D&&(S.easeReverse=D),P&&vo(S,P),y=M[v],S.duration=+Ga(c,dr(a),v,y,M),S.delay=(+Ga(h,dr(a),v,y,M)||0)-a._delay,!u&&b===1&&S.delay&&(a._delay=h=S.delay,a._start+=h,S.delay=0),A.to(y,S,T?T(v,y,M):0),A._ease=ve.none;A.duration()?c=h=0:a.timeline=0}else if(p){ka(ci(A.vars.defaults,{ease:"none"})),A._ease=ds(p.ease||i.ease||"none");var L=0,W,I,G;if(En(p))p.forEach(function(J){return A.to(M,J,">")}),A.duration();else{S={};for(E in p)E==="ease"||E==="easeEach"||Hb(E,p[E],S,p.easeEach);for(E in S)for(W=S[E].sort(function(J,H){return J.t-H.t}),L=0,v=0;v<W.length;v++)I=W[v],G={ease:I.e,duration:(I.t-(v?W[v-1].t:0))/100*c},G[E]=I.v,A.to(M,G,L),L+=G.duration;A.duration()<c&&A.to({},{duration:c-A.duration()})}}c||a.duration(c=A.duration())}else a.timeline=0;return f===!0&&!dd&&(Hr=dr(a),ke.killTweensOf(M),Hr=0),ji(g,dr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!p&&a._start===ze(g._time)&&$n(d)&&vb(dr(a))&&g.data!=="nested")&&(a._tTime=-Le,a.render(Math.max(0,-h)||0)),m&&Cg(dr(a),m),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-Le&&!h?l:i<Le?0:i,u,f,p,_,m,g,M,A;if(!c)Sb(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,A=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,o);if(u=ze(d%_),d===l?(p=this._repeat,u=c):(m=ze(d/_),p=~~m,p&&p===m?(u=c,p--):u>c&&(u=c)),g=this._yoyo&&p&1,g&&(u=c-u),m=yo(this._tTime,_),u===a&&!o&&this._initted&&p===m)return this._tTime=d,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=o=1,this.render(ze(_*p),!0).invalidate()._lock=0)}if(!this._initted){if(Rg(this,h?i:u,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var v=u<a;if(v!==this._inv){var S=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=S?(v?-1:1)/S:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(u/c);if(this._from&&(this.ratio=M=1-M),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!s&&!m&&(ai(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(M,f.d),f=f._next;A&&A.render(i<0?i:A._dur*A._ease(u/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&od(this,i,s,o),ai(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!s&&this.parent&&ai(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&od(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Yr(this,1),!s&&!(h&&!a)&&(d||a||g)&&(ai(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){Ya||Jn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Ad(this,c),h=this._ease(c/this._dur),Vb(this,i,s,o,a,h,c,l)?this.resetTo(i,s,o,a,1):(Wh(this,0),this.parent||Eg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ba(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Hr&&Hr.vars.overwrite!==!0)._first||Ba(this),this.parent&&o!==this.timeline.totalDuration()&&So(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Mi(i):a,c=this._ptLookup,h=this._pt,d,u,f,p,_,m,g;if((!s||s==="all")&&_b(a,l))return s==="all"&&(this._pt=0),Ba(this);for(d=this._op=this._op||[],s!=="all"&&(an(s)&&(_={},Bn(s,function(M){return _[M]=1}),s=_),s=Gb(a,s)),g=a.length;g--;)if(~l.indexOf(a[g])){u=c[g],s==="all"?(d[g]=s,p=u,f={}):(f=d[g]=d[g]||{},p=s);for(_ in p)m=u&&u[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Gh(this,m,"_pt"),delete u[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Ba(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Va(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Va(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return ke.killTweensOf(i,s,o)},t})(qa);ci(Je.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Bn("staggerTo,staggerFrom,staggerFromTo",function(r){Je[r]=function(){var t=new Tn,e=ld.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Cd=function(t,e,n){return t[e]=n},Wg=function(t,e,n){return t[e](n)},Wb=function(t,e,n,i){return t[e](i.fp,n)},Xb=function(t,e,n){return t.setAttribute(e,n)},Xh=function(t,e){return He(t[e])?Wg:kh(t[e])&&t.setAttribute?Xb:Cd},Xg=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Yb=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Rd=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Pd=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},qb=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},Zb=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Gh(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Jb=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Id=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},zn=(function(){function r(e,n,i,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Xg,this.d=l||this,this.set=c||Cd,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Jb,this.m=n,this.mt=s,this.tween=i},r})();Bn(vd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return xd[r]=1});li.TweenMax=li.TweenLite=Je;li.TimelineLite=li.TimelineMax=Tn;ke=new Tn({sortChildren:!1,defaults:Ha,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Kn.stringFilter=bd;var ps=[],Nh={},$b=[],mg=0,Kb=0,ed=function(t){return(Nh[t]||$b).map(function(e){return e()})},fd=function(){var t=Date.now(),e=[];t-mg>2&&(ed("matchMediaInit"),ps.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Qi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),ed("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),mg=t,ed("matchMedia"))},Yg=(function(){function r(e,n){this.selector=n&&cd(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Kb++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){He(n)&&(s=i,i=n,n=He);var o=this,a=function(){var c=Oe,h=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=cd(s)),Oe=o,d=i.apply(o,arguments),He(d)&&o._r.push(d),Oe=c,o.selector=h,o.isReverted=!1,d};return o.last=a,n===He?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Oe;Oe=null,n(this),Oe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Je&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Tn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Je)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=ps.length;o--;)ps[o].id===this.id&&ps.splice(o,1)},t.revert=function(n){this.kill(n||{})},r})(),Qb=(function(){function r(e){this.contexts=[],this.scope=e,Oe&&Oe.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){tr(n)||(n={matches:n});var o=new Yg(0,s||this.scope),a=o.conditions={},l,c,h;Oe&&!o.selector&&(o.selector=Oe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=Qi.matchMedia(n[c]),l&&(ps.indexOf(o)<0&&ps.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(fd):l.addEventListener("change",fd)));return h&&i(o,function(d){return o.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),zh={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Bg(i)})},timeline:function(t){return new Tn(t)},getTweensOf:function(t,e){return ke.getTweensOf(t,e)},getProperty:function(t,e,n,i){an(t)&&(t=Mi(t)[0]);var s=Xr(t||{}).get,o=n?Tg:wg;return n==="native"&&(n=""),t&&(e?o((Zn[e]&&Zn[e].get||s)(t,e,n,i)):function(a,l,c){return o((Zn[a]&&Zn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Mi(t),t.length>1){var i=t.map(function(h){return An.quickSetter(h,e,n)}),s=i.length;return function(h){for(var d=s;d--;)i[d](h)}}t=t[0]||{};var o=Zn[e],a=Xr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var d=new o;xo._pt=0,d.init(t,n?h+n:h,xo,0,[t]),d.render(1,d),xo._pt&&Pd(1,xo)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,s=An.to(t,ci((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return ke.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ds(t.ease,Ha.ease)),hg(Ha,t||{})},config:function(t){return hg(Kn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Zn[a]&&!li[a]&&Wa(e+" effect requires "+a+" plugin.")}),Kf[e]=function(a,l,c){return n(Mi(a),ci(l||{},s),c)},o&&(Tn.prototype[e]=function(a,l,c){return this.add(Kf[e](a,tr(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ve[t]=ds(e)},parseEase:function(t,e){return arguments.length?ds(t,e):ve},getById:function(t){return ke.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Tn(t),i,s;for(n.smoothChildTiming=$n(t.smoothChildTiming),ke.remove(n),n._dp=0,n._time=n._tTime=ke._time,i=ke._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Je&&i.vars.onComplete===i._targets[0]))&&ji(n,i,i._start-i._delay),i=s;return ji(ke,n,0),n},context:function(t,e){return t?new Yg(t,e):Oe},matchMedia:function(t){return new Qb(t)},matchMediaRefresh:function(){return ps.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||fd()},addEventListener:function(t,e){var n=Nh[t]||(Nh[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Nh[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:Rb,wrapYoyo:Pb,distribute:Lg,random:Ng,snap:Dg,normalize:Cb,getUnit:xn,clamp:wb,splitColor:zg,toArray:Mi,selector:cd,mapRange:Fg,pipe:Eb,unitize:Ab,interpolate:Ib,shuffle:Ig},install:yg,effects:Kf,ticker:Jn,updateRoot:Tn.updateRoot,plugins:Zn,globalTimeline:ke,core:{PropTween:zn,globals:Sg,Tween:Je,Timeline:Tn,Animation:qa,getCache:Xr,_removeLinkedListItem:Gh,reverting:function(){return _n},context:function(t){return t&&Oe&&(Oe.data.push(t),t._ctx=Oe),Oe},suppressOverwrites:function(t){return dd=t}}};Bn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return zh[r]=Je[r]});Jn.add(Tn.updateRoot);xo=zh.to({},{duration:0});var jb=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},t1=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=jb(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},nd=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(an(s)&&(l={},Bn(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}t1(a,s)}}}},An=zh.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)_n?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},nd("roundProps",hd),nd("modifiers"),nd("snap",Dg))||zh;Je.version=Tn.version=An.version="3.15.0";vg=1;pd()&&Mo();var e1=ve.Power0,n1=ve.Power1,i1=ve.Power2,r1=ve.Power3,s1=ve.Power4,o1=ve.Linear,a1=ve.Quad,l1=ve.Cubic,c1=ve.Quart,h1=ve.Quint,u1=ve.Strong,f1=ve.Elastic,d1=ve.Back,p1=ve.SteppedEase,m1=ve.Bounce,g1=ve.Sine,_1=ve.Expo,x1=ve.Circ;var qg,Zr,To,Od,Ss,v1,Zg,Bd,y1=function(){return typeof window<"u"},_r={},ys=180/Math.PI,Eo=Math.PI/180,wo=Math.atan2,Jg=1e8,zd=/([A-Z])/g,S1=/(left|right|width|margin|padding|x)/i,M1=/[\s,\(]\S/,er={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Dd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},b1=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},w1=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},T1=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},E1=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},i0=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},r0=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},A1=function(t,e,n){return t.style[e]=n},C1=function(t,e,n){return t.style.setProperty(e,n)},R1=function(t,e,n){return t._gsap[e]=n},P1=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},I1=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},L1=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Ve="transform",Qn=Ve+"Origin",D1=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in _r&&s){if(this.tfm=this.tfm||{},t!=="transform")t=er[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=gr(i,a)}):this.tfm[t]=o.x?o[t]:gr(i,t),t===Qn&&(this.tfm.zOrigin=o.zOrigin);else return er.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Ve)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Qn,e,"")),t=Ve}(s||e)&&this.props.push(t,e,s[t])},s0=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},N1=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(zd,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Bd(),(!s||!s.isStart)&&!n[Ve]&&(s0(n),i.zOrigin&&n[Qn]&&(n[Qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},o0=function(t,e){var n={target:t,props:[],revert:N1,save:D1};return t._gsap||An.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},a0,Nd=function(t,e){var n=Zr.createElementNS?Zr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Zr.createElement(t);return n&&n.style?n:Zr.createElement(t)},hi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(zd,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ao(e)||e,1)||""},$g="O,Moz,ms,Ms,Webkit".split(","),Ao=function(t,e,n){var i=e||Ss,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!($g[o]+t in s););return o<0?null:(o===3?"ms":o>=0?$g[o]:"")+t},Ud=function(){y1()&&window.document&&(qg=window,Zr=qg.document,To=Zr.documentElement,Ss=Nd("div")||{style:{}},v1=Nd("div"),Ve=Ao(Ve),Qn=Ve+"Origin",Ss.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",a0=!!Ao("perspective"),Bd=An.core.reverting,Od=1)},Kg=function(t){var e=t.ownerSVGElement,n=Nd("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),To.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),To.removeChild(n),s},Qg=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},l0=function(t){var e,n;try{e=t.getBBox()}catch{e=Kg(t),n=1}return e&&(e.width||e.height)||n||(e=Kg(t)),e&&!e.width&&!e.x&&!e.y?{x:+Qg(t,["x","cx","x1"])||0,y:+Qg(t,["y","cy","y1"])||0,width:0,height:0}:e},c0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&l0(t))},$r=function(t,e){if(e){var n=t.style,i;e in _r&&e!==Qn&&(e=Ve),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(zd,"-$1").toLowerCase())):n.removeAttribute(e)}},Jr=function(t,e,n,i,s,o){var a=new zn(t._pt,e,n,0,1,o?r0:i0);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},jg={deg:1,rad:1,turn:1},U1={grid:1,flex:1},Kr=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Ss.style,l=S1.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",p,_,m,g;if(i===o||!s||jg[i]||jg[o])return s;if(o!=="px"&&!u&&(s=r(t,e,n,"px")),g=t.getCTM&&c0(t),(f||o==="%")&&(_r[e]||~e.indexOf("adius")))return p=g?t.getBBox()[l?"width":"height"]:t[h],We(f?s/p*d:s/100*p);if(a[l?"width":"height"]=d+(u?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Zr||!_.appendChild)&&(_=Zr.body),m=_._gsap,m&&f&&m.width&&l&&m.time===Jn.time&&!m.uncache)return We(s/m.width*d);if(f&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=d+i,p=t[h],M?t.style[e]=M:$r(t,e)}else(f||o==="%")&&!U1[hi(_,"display")]&&(a.position=hi(t,"position")),_===t&&(a.position="static"),_.appendChild(Ss),p=Ss[h],_.removeChild(Ss),a.position="absolute";return l&&f&&(m=Xr(_),m.time=Jn.time,m.width=_[h]),We(u?p*s/d:p&&s?d/p*s:0)},gr=function(t,e,n,i){var s;return Od||Ud(),e in er&&e!=="transform"&&(e=er[e],~e.indexOf(",")&&(e=e.split(",")[0])),_r[e]&&e!=="transform"?(s=Ka(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:qh(hi(t,Qn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Yh[e]&&Yh[e](t,e,n)||hi(t,e)||Sd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Kr(t,e,s,n)+n:s},F1=function(t,e,n,i){if(!n||n==="none"){var s=Ao(e,t,1),o=s&&hi(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=hi(t,"borderTopColor"))}var a=new zn(this._pt,t.style,e,0,1,Rd),l=0,c=0,h,d,u,f,p,_,m,g,M,A,v,S;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=hi(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=hi(t,e)||i,_?t.style[e]=_:$r(t,e)),h=[n,i],bd(h),n=h[0],i=h[1],u=n.match(ms)||[],S=i.match(ms)||[],S.length){for(;d=ms.exec(i);)m=d[0],M=i.substring(l,d.index),p?p=(p+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(p=1),m!==(_=u[c++]||"")&&(f=parseFloat(_)||0,v=_.substr((f+"").length),m.charAt(1)==="="&&(m=gs(f,m)+v),g=parseFloat(m),A=m.substr((g+"").length),l=ms.lastIndex-A.length,A||(A=A||Kn.units[e]||v,l===i.length&&(i+=A,a.e+=A)),v!==A&&(f=Kr(t,e,_,A)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:f,c:g-f,m:p&&p<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?r0:i0;return gd.test(i)&&(a.e=0),this._pt=a,a},t0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},O1=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=t0[n]||n,e[1]=t0[i]||i,e.join(" ")},B1=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],_r[a]&&(l=1,a=a==="transformOrigin"?Qn:Ve),$r(n,a);l&&($r(n,Ve),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ka(n,1),o.uncache=1,s0(i)))}},Yh={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new zn(t._pt,e,n,0,0,B1);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},$a=[1,0,0,1,0,0],h0={},u0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},e0=function(t){var e=hi(t,Ve);return u0(e)?$a:e.substr(7).match(md).map(We)},kd=function(t,e){var n=t._gsap||Xr(t),i=t.style,s=e0(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?$a:s):(s===$a&&!t.offsetParent&&t!==To&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,To.appendChild(t)),s=e0(t),l?i.display=l:$r(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):To.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Fd=function(t,e,n,i,s,o){var a=t._gsap,l=s||kd(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,d=a.xOffset||0,u=a.yOffset||0,f=l[0],p=l[1],_=l[2],m=l[3],g=l[4],M=l[5],A=e.split(" "),v=parseFloat(A[0])||0,S=parseFloat(A[1])||0,b,E,y,T;n?l!==$a&&(E=f*m-p*_)&&(y=v*(m/E)+S*(-_/E)+(_*M-m*g)/E,T=v*(-p/E)+S*(f/E)-(f*M-p*g)/E,v=y,S=T):(b=l0(t),v=b.x+(~A[0].indexOf("%")?v/100*b.width:v),S=b.y+(~(A[1]||A[0]).indexOf("%")?S/100*b.height:S)),i||i!==!1&&a.smooth?(g=v-c,M=S-h,a.xOffset=d+(g*f+M*_)-g,a.yOffset=u+(g*p+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=S,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Qn]="0px 0px",o&&(Jr(o,a,"xOrigin",c,v),Jr(o,a,"yOrigin",h,S),Jr(o,a,"xOffset",d,a.xOffset),Jr(o,a,"yOffset",u,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+S)},Ka=function(t,e){var n=t._gsap||new wd(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=hi(t,Qn)||"0",h,d,u,f,p,_,m,g,M,A,v,S,b,E,y,T,P,D,L,W,I,G,J,H,et,Y,R,j,At,Rt,Jt,Ht;return h=d=u=_=m=g=M=A=v=0,f=p=1,n.svg=!!(t.getCTM&&c0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ve]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ve]!=="none"?l[Ve]:"")),i.scale=i.rotate=i.translate="none"),E=kd(t,n.svg),n.svg&&(n.uncache?(et=t.getBBox(),c=n.xOrigin-et.x+"px "+(n.yOrigin-et.y)+"px",H=""):H=!e&&t.getAttribute("data-svg-origin"),Fd(t,H||c,!!H||n.originIsAbsolute,n.smooth!==!1,E)),S=n.xOrigin||0,b=n.yOrigin||0,E!==$a&&(D=E[0],L=E[1],W=E[2],I=E[3],h=G=E[4],d=J=E[5],E.length===6?(f=Math.sqrt(D*D+L*L),p=Math.sqrt(I*I+W*W),_=D||L?wo(L,D)*ys:0,M=W||I?wo(W,I)*ys+_:0,M&&(p*=Math.abs(Math.cos(M*Eo))),n.svg&&(h-=S-(S*D+b*W),d-=b-(S*L+b*I))):(Ht=E[6],Rt=E[7],R=E[8],j=E[9],At=E[10],Jt=E[11],h=E[12],d=E[13],u=E[14],y=wo(Ht,At),m=y*ys,y&&(T=Math.cos(-y),P=Math.sin(-y),H=G*T+R*P,et=J*T+j*P,Y=Ht*T+At*P,R=G*-P+R*T,j=J*-P+j*T,At=Ht*-P+At*T,Jt=Rt*-P+Jt*T,G=H,J=et,Ht=Y),y=wo(-W,At),g=y*ys,y&&(T=Math.cos(-y),P=Math.sin(-y),H=D*T-R*P,et=L*T-j*P,Y=W*T-At*P,Jt=I*P+Jt*T,D=H,L=et,W=Y),y=wo(L,D),_=y*ys,y&&(T=Math.cos(y),P=Math.sin(y),H=D*T+L*P,et=G*T+J*P,L=L*T-D*P,J=J*T-G*P,D=H,G=et),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,g=180-g),f=We(Math.sqrt(D*D+L*L+W*W)),p=We(Math.sqrt(J*J+Ht*Ht)),y=wo(G,J),M=Math.abs(y)>2e-4?y*ys:0,v=Jt?1/(Jt<0?-Jt:Jt):0),n.svg&&(H=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!u0(hi(t,Ve)),H&&t.setAttribute("transform",H))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(f*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=u+o,n.scaleX=We(f),n.scaleY=We(p),n.rotation=We(_)+a,n.rotationX=We(m)+a,n.rotationY=We(g)+a,n.skewX=M+a,n.skewY=A+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Qn]=qh(c)),n.xOffset=n.yOffset=0,n.force3D=Kn.force3D,n.renderTransform=n.svg?k1:a0?f0:z1,n.uncache=0,n},qh=function(t){return(t=t.split(" "))[0]+" "+t[1]},Ld=function(t,e,n){var i=xn(e);return We(parseFloat(e)+parseFloat(Kr(t,"x",n+"px",i)))+i},z1=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,f0(t,e)},xs="0deg",Ja="0px",vs=") ",f0=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,p=n.scaleX,_=n.scaleY,m=n.transformPerspective,g=n.force3D,M=n.target,A=n.zOrigin,v="",S=g==="auto"&&t&&t!==1||g===!0;if(A&&(d!==xs||h!==xs)){var b=parseFloat(h)*Eo,E=Math.sin(b),y=Math.cos(b),T;b=parseFloat(d)*Eo,T=Math.cos(b),o=Ld(M,o,E*T*-A),a=Ld(M,a,-Math.sin(b)*-A),l=Ld(M,l,y*T*-A+A)}m!==Ja&&(v+="perspective("+m+vs),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(S||o!==Ja||a!==Ja||l!==Ja)&&(v+=l!==Ja||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+vs),c!==xs&&(v+="rotate("+c+vs),h!==xs&&(v+="rotateY("+h+vs),d!==xs&&(v+="rotateX("+d+vs),(u!==xs||f!==xs)&&(v+="skew("+u+", "+f+vs),(p!==1||_!==1)&&(v+="scale("+p+", "+_+vs),M.style[Ve]=v||"translate(0, 0)"},k1=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,p=n.xOrigin,_=n.yOrigin,m=n.xOffset,g=n.yOffset,M=n.forceCSS,A=parseFloat(o),v=parseFloat(a),S,b,E,y,T;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Eo,c*=Eo,S=Math.cos(l)*d,b=Math.sin(l)*d,E=Math.sin(l-c)*-u,y=Math.cos(l-c)*u,c&&(h*=Eo,T=Math.tan(c-h),T=Math.sqrt(1+T*T),E*=T,y*=T,h&&(T=Math.tan(h),T=Math.sqrt(1+T*T),S*=T,b*=T)),S=We(S),b=We(b),E=We(E),y=We(y)):(S=d,y=u,b=E=0),(A&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(A=Kr(f,"x",o,"px"),v=Kr(f,"y",a,"px")),(p||_||m||g)&&(A=We(A+p-(p*S+_*E)+m),v=We(v+_-(p*b+_*y)+g)),(i||s)&&(T=f.getBBox(),A=We(A+i/100*T.width),v=We(v+s/100*T.height)),T="matrix("+S+","+b+","+E+","+y+","+A+","+v+")",f.setAttribute("transform",T),M&&(f.style[Ve]=T)},V1=function(t,e,n,i,s){var o=360,a=an(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ys:1),c=l-i,h=i+c+"deg",d,u;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Jg)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Jg)%o-~~(c/o)*o)),t._pt=u=new zn(t._pt,e,n,i,c,b1),u.e=h,u.u="deg",t._props.push(n),u},n0=function(t,e){for(var n in e)t[n]=e[n];return t},G1=function(t,e,n){var i=n0({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,d,u,f,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ve]=e,a=Ka(n,1),$r(n,Ve),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ve],o[Ve]=e,a=Ka(n,1),o[Ve]=c);for(l in _r)c=i[l],h=a[l],c!==h&&s.indexOf(l)<0&&(f=xn(c),p=xn(h),d=f!==p?Kr(n,l,c,p):parseFloat(c),u=parseFloat(h),t._pt=new zn(t._pt,a,l,d,u-d,Dd),t._pt.u=p||0,t._props.push(l));n0(a,i)};Bn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});Yh[t>1?"border"+r:r]=function(a,l,c,h,d){var u,f;if(arguments.length<4)return u=o.map(function(p){return gr(a,p,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},o.forEach(function(p,_){return f[p]=u[_]=u[_]||u[(_-1)/2|0]}),a.init(l,f,d)}});var Vd={name:"css",register:Ud,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,d,u,f,p,_,m,g,M,A,v,S,b,E,y,T;Od||Ud(),this.styles=this.styles||o0(t),y=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(Zn[_]&&Ed(_,e,n,i,t,s)))){if(f=typeof h,p=Yh[_],f==="function"&&(h=h.call(n,i,t,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=bo(h)),p)p(this,t,_,h,n)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",pr.lastIndex=0,pr.test(c)||(m=xn(c),g=xn(h),g?m!==g&&(c=Kr(t,_,c,g)+g):m&&(h+=m)),this.add(a,"setProperty",c,h,i,s,0,0,_),o.push(_),y.push(_,0,a[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],an(c)&&~c.indexOf("random(")&&(c=bo(c)),xn(c+"")||c==="auto"||(c+=Kn.units[_]||xn(gr(t,_))||""),(c+"").charAt(1)==="="&&(c=gr(t,_))):c=gr(t,_),u=parseFloat(c),M=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),M&&(h=h.substr(2)),d=parseFloat(h),_ in er&&(_==="autoAlpha"&&(u===1&&gr(t,"visibility")==="hidden"&&d&&(u=0),y.push("visibility",0,a.visibility),Jr(this,a,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=er[_],~_.indexOf(",")&&(_=_.split(",")[0]))),A=_ in _r,A){if(this.styles.save(_),T=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=hi(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var P=t.style.perspective;t.style.perspective=h,h=hi(t,"perspective"),P?t.style.perspective=P:$r(t,"perspective")}d=parseFloat(h)}if(v||(S=t._gsap,S.renderTransform&&!e.parseTransform||Ka(t,e.parseTransform),b=e.smoothOrigin!==!1&&S.smooth,v=this._pt=new zn(this._pt,a,Ve,0,1,S.renderTransform,S,0,-1),v.dep=1),_==="scale")this._pt=new zn(this._pt,S,"scaleY",S.scaleY,(M?gs(S.scaleY,M+d):d)-S.scaleY||0,Dd),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){y.push(Qn,0,a[Qn]),h=O1(h),S.svg?Fd(t,h,0,b,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==S.zOrigin&&Jr(this,S,"zOrigin",S.zOrigin,g),Jr(this,a,_,qh(c),qh(h)));continue}else if(_==="svgOrigin"){Fd(t,h,1,b,0,this);continue}else if(_ in h0){V1(this,S,_,u,M?gs(u,M+h):h);continue}else if(_==="smoothOrigin"){Jr(this,S,"smooth",S.smooth,h);continue}else if(_==="force3D"){S[_]=h;continue}else if(_==="transform"){G1(this,h,t);continue}}else _ in a||(_=Ao(_)||_);if(A||(d||d===0)&&(u||u===0)&&!M1.test(h)&&_ in a)m=(c+"").substr((u+"").length),d||(d=0),g=xn(h)||(_ in Kn.units?Kn.units[_]:m),m!==g&&(u=Kr(t,_,c,g)),this._pt=new zn(this._pt,A?S:a,_,u,(M?gs(u,M+d):d)-u,!A&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?E1:Dd),this._pt.u=g||0,A&&T!==h?(this._pt.b=c,this._pt.e=T,this._pt.r=T1):m!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=w1);else if(_ in a)F1.call(this,t,_,c,M?M+h:h);else if(_ in t)this.add(t,_,c||t[_],M?M+h:h,i,s);else if(_!=="parseTransform"){Vh(_,h);continue}A||(_ in a?y.push(_,0,a[_]):typeof t[_]=="function"?y.push(_,2,t[_]()):y.push(_,1,c||t[_])),o.push(_)}}E&&Id(this)},render:function(t,e){if(e.tween._time||!Bd())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:gr,aliases:er,getSetter:function(t,e,n){var i=er[e];return i&&i.indexOf(",")<0&&(e=i),e in _r&&e!==Qn&&(t._gsap.x||gr(t,"x"))?n&&Zg===n?e==="scale"?P1:R1:(Zg=n||{})&&(e==="scale"?I1:L1):t.style&&!kh(t.style[e])?A1:~e.indexOf("-")?C1:Xh(t,e)},core:{_removeProperty:$r,_getMatrix:kd}};An.utils.checkPrefix=Ao;An.core.getStyleSaver=o0;(function(r,t,e,n){var i=Bn(r+","+t+","+e,function(s){_r[s]=1});Bn(t,function(s){Kn.units[s]="deg",h0[s]=1}),er[i[13]]=r+","+t,Bn(n,function(s){var o=s.split(":");er[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Bn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Kn.units[r]="px"});An.registerPlugin(Vd);var jn=An.registerPlugin(Vd)||An,XA=jn.core.Tween;function d0(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function H1(r,t,e){return t&&d0(r.prototype,t),e&&d0(r,e),r}var vn,$h,W1,ui,Qr,jr,Ro,m0,Ms,Po,g0,xr,Fi,_0,x0=function(){return vn||typeof window<"u"&&(vn=window.gsap)&&vn.registerPlugin&&vn},v0=1,Co=[],he=[],Oi=[],ja=Date.now,Gd=function(t,e){return e},X1=function(){var t=Po.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,he),i.push.apply(i,Oi),he=n,Oi=i,Gd=function(o,a){return e[o](a)}},yr=function(t,e){return~Oi.indexOf(t)&&Oi[Oi.indexOf(t)+1][e]},tl=function(t){return!!~g0.indexOf(t)},Vn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},kn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Zh="scrollLeft",Jh="scrollTop",Hd=function(){return xr&&xr.isPressed||he.cache++},Kh=function(t,e){var n=function i(s){if(s||s===0){v0&&(ui.history.scrollRestoration="manual");var o=xr&&xr.isPressed;s=i.v=Math.round(s)||(xr&&xr.iOS?1:0),t(s),i.cacheID=he.cache,o&&Gd("ss",s)}else(e||he.cache!==i.cacheID||Gd("ref"))&&(i.cacheID=he.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},Cn={s:Zh,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Kh(function(r){return arguments.length?ui.scrollTo(r,en.sc()):ui.pageXOffset||Qr[Zh]||jr[Zh]||Ro[Zh]||0})},en={s:Jh,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Cn,sc:Kh(function(r){return arguments.length?ui.scrollTo(Cn.sc(),r):ui.pageYOffset||Qr[Jh]||jr[Jh]||Ro[Jh]||0})},Gn=function(t,e){return(e&&e._ctx&&e._ctx.selector||vn.utils.toArray)(t)[0]||(typeof t=="string"&&vn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Y1=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},vr=function(t,e){var n=e.s,i=e.sc;tl(t)&&(t=Qr.scrollingElement||jr);var s=he.indexOf(t),o=i===en.sc?1:2;!~s&&(s=he.push(t)-1),he[s+o]||Vn(t,"scroll",Hd);var a=he[s+o],l=a||(he[s+o]=Kh(yr(t,n),!0)||(tl(t)?i:Kh(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=vn.getProperty(t,"scrollBehavior")==="smooth"),l},Qh=function(t,e,n){var i=t,s=t,o=ja(),a=o,l=e||50,c=Math.max(500,l*3),h=function(p,_){var m=ja();_||m-o>l?(s=i,i=p,a=o,o=m):n?i+=p:i=s+(p-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},u=function(p){var _=a,m=s,g=ja();return(p||p===0)&&p!==i&&h(p),o===a||g-a>c?0:(i+(n?m:-m))/((n?g:o)-_)*1e3};return{update:h,reset:d,getVelocity:u}},Qa=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},p0=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},y0=function(){Po=vn.core.globals().ScrollTrigger,Po&&Po.core&&X1()},S0=function(t){return vn=t||x0(),!$h&&vn&&typeof document<"u"&&document.body&&(ui=window,Qr=document,jr=Qr.documentElement,Ro=Qr.body,g0=[ui,Qr,jr,Ro],W1=vn.utils.clamp,_0=vn.core.context||function(){},Ms="onpointerenter"in Ro?"pointer":"mouse",m0=Xe.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Fi=Xe.eventTypes=("ontouchstart"in jr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in jr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return v0=0},500),$h=1),Po||y0(),$h};Cn.op=en;he.cache=0;var Xe=(function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){$h||S0(vn)||console.warn("Please gsap.registerPlugin(Observer)"),Po||y0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,u=n.onStopDelay,f=n.ignore,p=n.wheelSpeed,_=n.event,m=n.onDragStart,g=n.onDragEnd,M=n.onDrag,A=n.onPress,v=n.onRelease,S=n.onRight,b=n.onLeft,E=n.onUp,y=n.onDown,T=n.onChangeX,P=n.onChangeY,D=n.onChange,L=n.onToggleX,W=n.onToggleY,I=n.onHover,G=n.onHoverEnd,J=n.onMove,H=n.ignoreCheck,et=n.isNormalizer,Y=n.onGestureStart,R=n.onGestureEnd,j=n.onWheel,At=n.onEnable,Rt=n.onDisable,Jt=n.onClick,Ht=n.scrollSpeed,Qt=n.capture,K=n.allowClicks,nt=n.lockAxis,O=n.onLockAxis;this.target=a=Gn(a)||jr,this.vars=n,f&&(f=vn.utils.toArray(f)),i=i||1e-9,s=s||0,p=p||1,Ht=Ht||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(Ro).lineHeight)||22);var ut,at,lt,_t,Tt,Pt,Xt,V=this,te=0,ce=0,xe=n.passive||!h&&n.passive!==!1,$t=vr(a,Cn),me=vr(a,en),N=$t(),ye=me(),bt=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Fi[0]==="pointerdown",C=tl(a),x=a.ownerDocument||Qr,B=[0,0,0],X=[0,0,0],Q=0,gt=function(){return Q=ja()},ft=function(ht,Gt){return(V.event=ht)&&f&&Y1(ht.target,f)||Gt&&bt&&ht.pointerType!=="touch"||H&&H(ht,Gt)},it=function(){V._vx.reset(),V._vy.reset(),at.pause(),d&&d(V)},ot=function(){var ht=V.deltaX=p0(B),Gt=V.deltaY=p0(X),z=Math.abs(ht)>=i,tt=Math.abs(Gt)>=i;D&&(z||tt)&&D(V,ht,Gt,B,X),z&&(S&&V.deltaX>0&&S(V),b&&V.deltaX<0&&b(V),T&&T(V),L&&V.deltaX<0!=te<0&&L(V),te=V.deltaX,B[0]=B[1]=B[2]=0),tt&&(y&&V.deltaY>0&&y(V),E&&V.deltaY<0&&E(V),P&&P(V),W&&V.deltaY<0!=ce<0&&W(V),ce=V.deltaY,X[0]=X[1]=X[2]=0),(_t||lt)&&(J&&J(V),lt&&(m&&lt===1&&m(V),M&&M(V),lt=0),_t=!1),Pt&&!(Pt=!1)&&O&&O(V),Tt&&(j(V),Tt=!1),ut=0},Mt=function(ht,Gt,z){B[z]+=ht,X[z]+=Gt,V._vx.update(ht),V._vy.update(Gt),c?ut||(ut=requestAnimationFrame(ot)):ot()},Nt=function(ht,Gt){nt&&!Xt&&(V.axis=Xt=Math.abs(ht)>Math.abs(Gt)?"x":"y",Pt=!0),Xt!=="y"&&(B[2]+=ht,V._vx.update(ht,!0)),Xt!=="x"&&(X[2]+=Gt,V._vy.update(Gt,!0)),c?ut||(ut=requestAnimationFrame(ot)):ot()},St=function(ht){if(!ft(ht,1)){ht=Qa(ht,h);var Gt=ht.clientX,z=ht.clientY,tt=Gt-V.x,rt=z-V.y,pt=V.isDragging;V.x=Gt,V.y=z,(pt||(tt||rt)&&(Math.abs(V.startX-Gt)>=s||Math.abs(V.startY-z)>=s))&&(lt||(lt=pt?2:1),pt||(V.isDragging=!0),Nt(tt,rt))}},vt=V.onPress=function(dt){ft(dt,1)||dt&&dt.button||(V.axis=Xt=null,at.pause(),V.isPressed=!0,dt=Qa(dt),te=ce=0,V.startX=V.x=dt.clientX,V.startY=V.y=dt.clientY,V._vx.reset(),V._vy.reset(),Vn(et?a:x,Fi[1],St,xe,!0),V.deltaX=V.deltaY=0,A&&A(V))},mt=V.onRelease=function(dt){if(!ft(dt,1)){kn(et?a:x,Fi[1],St,!0);var ht=!isNaN(V.y-V.startY),Gt=V.isDragging,z=Gt&&(Math.abs(V.x-V.startX)>3||Math.abs(V.y-V.startY)>3),tt=Qa(dt);!z&&ht&&(V._vx.reset(),V._vy.reset(),h&&K&&vn.delayedCall(.08,function(){if(ja()-Q>300&&!dt.defaultPrevented){if(dt.target.click)dt.target.click();else if(x.createEvent){var rt=x.createEvent("MouseEvents");rt.initMouseEvent("click",!0,!0,ui,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),dt.target.dispatchEvent(rt)}}})),V.isDragging=V.isGesturing=V.isPressed=!1,d&&Gt&&!et&&at.restart(!0),lt&&ot(),g&&Gt&&g(V),v&&v(V,z)}},Bt=function(ht){return ht.touches&&ht.touches.length>1&&(V.isGesturing=!0)&&Y(ht,V.isDragging)},Zt=function(){return(V.isGesturing=!1)||R(V)},U=function(ht){if(!ft(ht)){var Gt=$t(),z=me();Mt((Gt-N)*Ht,(z-ye)*Ht,1),N=Gt,ye=z,d&&at.restart(!0)}},xt=function(ht){if(!ft(ht)){ht=Qa(ht,h),j&&(Tt=!0);var Gt=(ht.deltaMode===1?l:ht.deltaMode===2?ui.innerHeight:1)*p;Mt(ht.deltaX*Gt,ht.deltaY*Gt,0),d&&!et&&at.restart(!0)}},st=function(ht){if(!ft(ht)){var Gt=ht.clientX,z=ht.clientY,tt=Gt-V.x,rt=z-V.y;V.x=Gt,V.y=z,_t=!0,d&&at.restart(!0),(tt||rt)&&Nt(tt,rt)}},yt=function(ht){V.event=ht,I(V)},wt=function(ht){V.event=ht,G(V)},ct=function(ht){return ft(ht)||Qa(ht,h)&&Jt(V)};at=V._dc=vn.delayedCall(u||.25,it).pause(),V.deltaX=V.deltaY=0,V._vx=Qh(0,50,!0),V._vy=Qh(0,50,!0),V.scrollX=$t,V.scrollY=me,V.isDragging=V.isGesturing=V.isPressed=!1,_0(this),V.enable=function(dt){return V.isEnabled||(Vn(C?x:a,"scroll",Hd),o.indexOf("scroll")>=0&&Vn(C?x:a,"scroll",U,xe,Qt),o.indexOf("wheel")>=0&&Vn(a,"wheel",xt,xe,Qt),(o.indexOf("touch")>=0&&m0||o.indexOf("pointer")>=0)&&(Vn(a,Fi[0],vt,xe,Qt),Vn(x,Fi[2],mt),Vn(x,Fi[3],mt),K&&Vn(a,"click",gt,!0,!0),Jt&&Vn(a,"click",ct),Y&&Vn(x,"gesturestart",Bt),R&&Vn(x,"gestureend",Zt),I&&Vn(a,Ms+"enter",yt),G&&Vn(a,Ms+"leave",wt),J&&Vn(a,Ms+"move",st)),V.isEnabled=!0,V.isDragging=V.isGesturing=V.isPressed=_t=lt=!1,V._vx.reset(),V._vy.reset(),N=$t(),ye=me(),dt&&dt.type&&vt(dt),At&&At(V)),V},V.disable=function(){V.isEnabled&&(Co.filter(function(dt){return dt!==V&&tl(dt.target)}).length||kn(C?x:a,"scroll",Hd),V.isPressed&&(V._vx.reset(),V._vy.reset(),kn(et?a:x,Fi[1],St,!0)),kn(C?x:a,"scroll",U,Qt),kn(a,"wheel",xt,Qt),kn(a,Fi[0],vt,Qt),kn(x,Fi[2],mt),kn(x,Fi[3],mt),kn(a,"click",gt,!0),kn(a,"click",ct),kn(x,"gesturestart",Bt),kn(x,"gestureend",Zt),kn(a,Ms+"enter",yt),kn(a,Ms+"leave",wt),kn(a,Ms+"move",st),V.isEnabled=V.isPressed=V.isDragging=!1,Rt&&Rt(V))},V.kill=V.revert=function(){V.disable();var dt=Co.indexOf(V);dt>=0&&Co.splice(dt,1),xr===V&&(xr=0)},Co.push(V),et&&tl(a)&&(xr=V),V.enable(_)},H1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Xe.version="3.15.0";Xe.create=function(r){return new Xe(r)};Xe.register=S0;Xe.getAll=function(){return Co.slice()};Xe.getById=function(r){return Co.filter(function(t){return t.vars.id===r})[0]};x0()&&vn.registerPlugin(Xe);var Ot,No,pe,Ce,pi,Ee,ip,pu,pl,al,nl,jh,Rn,_u,$d,Wn,M0,b0,Uo,z0,Wd,k0,Hn,Kd,V0,G0,ts,Qd,rp,Fo,sp,ll,jd,Xd,tu=1,Pn=Date.now,Yd=Pn(),Ti=0,il=0,w0=function(t,e,n){var i=di(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},T0=function(t,e){return e&&(!di(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},q1=function r(){return il&&requestAnimationFrame(r)},E0=function(){return _u=1},A0=function(){return _u=0},nr=function(t){return t},rl=function(t){return Math.round(t*1e5)/1e5||0},H0=function(){return typeof window<"u"},W0=function(){return Ot||H0()&&(Ot=window.gsap)&&Ot.registerPlugin&&Ot},Cs=function(t){return!!~ip.indexOf(t)},X0=function(t){return(t==="Height"?sp:pe["inner"+t])||pi["client"+t]||Ee["client"+t]},Y0=function(t){return yr(t,"getBoundingClientRect")||(Cs(t)?function(){return du.width=pe.innerWidth,du.height=sp,du}:function(){return Sr(t)})},Z1=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=yr(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?X0(s):t["client"+s])||0}},J1=function(t,e){return!e||~Oi.indexOf(t)?Y0(t):function(){return du}},ir=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=yr(t,n))?o()-Y0(t)()[s]:Cs(t)?(pi[n]||Ee[n])-X0(i):t[n]-t["offset"+i])},eu=function(t,e){for(var n=0;n<Uo.length;n+=3)(!e||~e.indexOf(Uo[n+1]))&&t(Uo[n],Uo[n+1],Uo[n+2])},di=function(t){return typeof t=="string"},In=function(t){return typeof t=="function"},sl=function(t){return typeof t=="number"},bs=function(t){return typeof t=="object"},el=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Io=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},Lo=Math.abs,q0="left",Z0="top",op="right",ap="bottom",Ts="width",Es="height",cl="Right",hl="Left",ul="Top",fl="Bottom",nn="padding",bi="margin",Bo="Width",lp="Height",ln="px",wi=function(t){return pe.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},$1=function(t){var e=wi(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},C0=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Sr=function(t,e){var n=e&&wi(t)[$d]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ot.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},mu=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},J0=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},K1=function(t){return function(e){return Ot.utils.snap(J0(t),e)}},cp=function(t){var e=Ot.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},Q1=function(t){return function(e,n){return cp(J0(t))(e,n.direction)}},nu=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},pn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},dn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},iu=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},R0={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ru={toggleActions:"play",anticipatePin:0},gu={top:0,left:0,center:.5,bottom:1,right:1},cu=function(t,e){if(di(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in gu?gu[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},su=function(t,e,n,i,s,o,a,l){var c=s.startColor,h=s.endColor,d=s.fontSize,u=s.indent,f=s.fontWeight,p=Ce.createElement("div"),_=Cs(n)||yr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,g=_?Ee:n.tagName==="IFRAME"?n.contentDocument.body:n,M=t.indexOf("start")!==-1,A=M?c:h,v="border-color:"+A+";font-size:"+d+";color:"+A+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===en?op:ap)+":"+(o+parseFloat(u))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=M,p.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),p.style.cssText=v,p.innerText=e||e===0?t+"-"+e:t,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p["offset"+i.op.d2],hu(p,0,i,M),p},hu=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Bo]=1,s["border"+a+Bo]=0,s[n.p]=e+"px",Ot.set(t,s)},ue=[],tp={},ml,P0=function(){return Pn()-Ti>34&&(ml||(ml=requestAnimationFrame(Mr)))},Do=function(){(!Hn||!Hn.isPressed||Hn.startX>Ee.clientWidth)&&(he.cache++,Hn?ml||(ml=requestAnimationFrame(Mr)):Mr(),Ti||Ps("scrollStart"),Ti=Pn())},qd=function(){G0=pe.innerWidth,V0=pe.innerHeight},ol=function(t){he.cache++,(t===!0||!Rn&&!k0&&!Ce.fullscreenElement&&!Ce.webkitFullscreenElement&&(!Kd||G0!==pe.innerWidth||Math.abs(pe.innerHeight-V0)>pe.innerHeight*.25))&&pu.restart(!0)},Rs={},j1=[],$0=function r(){return dn(re,"scrollEnd",r)||ws(!0)},Ps=function(t){return Rs[t]&&Rs[t].map(function(e){return e()})||j1},fi=[],K0=function(t){for(var e=0;e<fi.length;e+=5)(!t||fi[e+4]&&fi[e+4].query===t)&&(fi[e].style.cssText=fi[e+1],fi[e].getBBox&&fi[e].setAttribute("transform",fi[e+2]||""),fi[e+3].uncache=1)},Q0=function(){return he.forEach(function(t){return In(t)&&++t.cacheID&&(t.rec=t())})},hp=function(t,e){var n;for(Wn=0;Wn<ue.length;Wn++)n=ue[Wn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));ll=!0,e&&K0(e),e||Ps("revert")},j0=function(t,e){he.cache++,(e||!Xn)&&he.forEach(function(n){return In(n)&&n.cacheID++&&(n.rec=0)}),di(t)&&(pe.history.scrollRestoration=rp=t)},Xn,As=0,I0,tw=function(){if(I0!==As){var t=I0=As;requestAnimationFrame(function(){return t===As&&ws(!0)})}},t_=function(){Ee.appendChild(Fo),sp=!Hn&&Fo.offsetHeight||pe.innerHeight,Ee.removeChild(Fo)},L0=function(t){return pl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},ws=function(t,e){if(pi=Ce.documentElement,Ee=Ce.body,ip=[pe,Ce,pi,Ee],Ti&&!t&&!ll){pn(re,"scrollEnd",$0);return}t_(),Xn=re.isRefreshing=!0,ll||Q0();var n=Ps("refreshInit");z0&&re.sort(),e||hp(),he.forEach(function(i){In(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ue.slice(0).forEach(function(i){return i.refresh()}),ll=!1,ue.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),jd=1,L0(!0),ue.forEach(function(i){var s=ir(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),L0(!1),jd=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),he.forEach(function(i){In(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),j0(rp,1),pu.pause(),As++,Xn=2,Mr(2),ue.forEach(function(i){return In(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Xn=re.isRefreshing=!1,Ps("refresh")},ep=0,uu=1,dl,Mr=function(t){if(t===2||!Xn&&!ll){re.isUpdating=!0,dl&&dl.update(0);var e=ue.length,n=Pn(),i=n-Yd>=50,s=e&&ue[0].scroll();if(uu=ep>s?-1:1,Xn||(ep=s),i&&(Ti&&!_u&&n-Ti>200&&(Ti=0,Ps("scrollEnd")),nl=Yd,Yd=n),uu<0){for(Wn=e;Wn-- >0;)ue[Wn]&&ue[Wn].update(0,i);uu=1}else for(Wn=0;Wn<e;Wn++)ue[Wn]&&ue[Wn].update(0,i);re.isUpdating=!1}ml=0},np=[q0,Z0,ap,op,bi+fl,bi+cl,bi+ul,bi+hl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],fu=np.concat([Ts,Es,"boxSizing","max"+Bo,"max"+lp,"position",bi,nn,nn+ul,nn+cl,nn+fl,nn+hl]),ew=function(t,e,n){Oo(n);var i=t._gsap;if(i.spacerIsNative)Oo(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Zd=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=np.length,o=e.style,a=t.style,l;s--;)l=np[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[ap]=a[op]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ts]=mu(t,Cn)+ln,o[Es]=mu(t,en)+ln,o[nn]=a[bi]=a[Z0]=a[q0]="0",Oo(i),a[Ts]=a["max"+Bo]=n[Ts],a[Es]=a["max"+lp]=n[Es],a[nn]=n[nn],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},nw=/([A-Z])/g,Oo=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||Ot.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(nw,"-$1").toLowerCase())}},ou=function(t){for(var e=fu.length,n=t.style,i=[],s=0;s<e;s++)i.push(fu[s],n[fu[s]]);return i.t=t,i},iw=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},du={left:0,top:0},D0=function(t,e,n,i,s,o,a,l,c,h,d,u,f,p){In(t)&&(t=t(l)),di(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?cu("0"+t.substr(3),n):0));var _=f?f.time():0,m,g,M;if(f&&f.seek(0),isNaN(t)||(t=+t),sl(t))f&&(t=Ot.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,u,t)),a&&hu(a,n,i,!0);else{In(e)&&(e=e(l));var A=(t||"0").split(" "),v,S,b,E;M=Gn(e,l)||Ee,v=Sr(M)||{},(!v||!v.left&&!v.top)&&wi(M).display==="none"&&(E=M.style.display,M.style.display="block",v=Sr(M),E?M.style.display=E:M.style.removeProperty("display")),S=cu(A[0],v[i.d]),b=cu(A[1]||"0",n),t=v[i.p]-c[i.p]-h+S+s-b,a&&hu(a,b,i,n-b<20||a._isStart&&b>20),n-=n-b}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var y=t+n,T=o._isStart;m="scroll"+i.d2,hu(o,y,i,T&&y>20||!T&&(d?Math.max(Ee[m],pi[m]):o.parentNode[m])<=y+1),d&&(c=Sr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+ln))}return f&&M&&(m=Sr(M),f.seek(u),g=Sr(M),f._caScrollDist=m[i.p]-g[i.p],t=t/f._caScrollDist*u),f&&f.seek(_),f?t:Math.round(t)},rw=/(webkit|moz|length|cssText|inset)/i,N0=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===Ee){t._stOrig=s.cssText,a=wi(t);for(o in a)!+o&&!rw.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;Ot.core.getCache(t).uncache=1,e.appendChild(t)}},e_=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},au=function(t,e,n){var i={};i[e.p]="+="+n,Ot.set(t,i)},U0=function(t,e){var n=vr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,h,d){var u=o.tween,f=l.onComplete,p={};c=c||n();var _=e_(n,c,function(){u.kill(),o.tween=0});return d=h&&d||0,h=h||a-c,u&&u.kill(),l[i]=a,l.inherit=!1,l.modifiers=p,p[i]=function(){return _(c+h*u.ratio+d*u.ratio*u.ratio)},l.onUpdate=function(){he.cache++,o.tween&&Mr()},l.onComplete=function(){o.tween=0,f&&f.call(u)},u=o.tween=Ot.to(t,l),u};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},pn(t,"wheel",n.wheelHandler),re.isTouch&&pn(t,"touchmove",n.wheelHandler),s},re=(function(){function r(e,n){No||r.register(Ot)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Qd(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!il){this.update=this.refresh=this.kill=nr;return}n=C0(di(n)||sl(n)||n.nodeType?{trigger:n}:n,ru);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,d=s.scrub,u=s.trigger,f=s.pin,p=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,g=s.onScrubComplete,M=s.onSnapComplete,A=s.once,v=s.snap,S=s.pinReparent,b=s.pinSpacer,E=s.containerAnimation,y=s.fastScrollEnd,T=s.preventOverlaps,P=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Cn:en,D=!d&&d!==0,L=Gn(n.scroller||pe),W=Ot.core.getCache(L),I=Cs(L),G=("pinType"in n?n.pinType:yr(L,"pinType")||I&&"fixed")==="fixed",J=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],H=D&&n.toggleActions.split(" "),et="markers"in n?n.markers:ru.markers,Y=I?0:parseFloat(wi(L)["border"+P.p2+Bo])||0,R=this,j=n.onRefreshInit&&function(){return n.onRefreshInit(R)},At=Z1(L,I,P),Rt=J1(L,I),Jt=0,Ht=0,Qt=0,K=vr(L,P),nt,O,ut,at,lt,_t,Tt,Pt,Xt,V,te,ce,xe,$t,me,N,ye,bt,C,x,B,X,Q,gt,ft,it,ot,Mt,Nt,St,vt,mt,Bt,Zt,U,xt,st,yt,wt;if(R._startClamp=R._endClamp=!1,R._dir=P,m*=45,R.scroller=L,R.scroll=E?E.time.bind(E):K,at=K(),R.vars=n,i=i||n.animation,"refreshPriority"in n&&(z0=1,n.refreshPriority===-9999&&(dl=R)),W.tweenScroll=W.tweenScroll||{top:U0(L,en),left:U0(L,Cn)},R.tweenTo=nt=W.tweenScroll[P.p],R.scrubDuration=function(z){Bt=sl(z)&&z,Bt?mt?mt.duration(z):mt=Ot.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Bt,paused:!0,onComplete:function(){return g&&g(R)}}):(mt&&mt.progress(1).kill(),mt=0)},i&&(i.vars.lazy=!1,i._initted&&!R.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),R.animation=i.pause(),i.scrollTrigger=R,R.scrubDuration(d),St=0,l||(l=i.vars.id)),v&&((!bs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Ee.style&&Ot.set(I?[Ee,pi]:L,{scrollBehavior:"auto"}),he.forEach(function(z){return In(z)&&z.target===(I?Ce.scrollingElement||pi:L)&&(z.smooth=!1)}),ut=In(v.snapTo)?v.snapTo:v.snapTo==="labels"?K1(i):v.snapTo==="labelsDirectional"?Q1(i):v.directional!==!1?function(z,tt){return cp(v.snapTo)(z,Pn()-Ht<500?0:tt.direction)}:Ot.utils.snap(v.snapTo),Zt=v.duration||{min:.1,max:2},Zt=bs(Zt)?al(Zt.min,Zt.max):al(Zt,Zt),U=Ot.delayedCall(v.delay||Bt/2||.1,function(){var z=K(),tt=Pn()-Ht<500,rt=nt.tween;if((tt||Math.abs(R.getVelocity())<10)&&!rt&&!_u&&Jt!==z){var pt=(z-_t)/$t,zt=i&&!D?i.totalProgress():pt,It=tt?0:(zt-vt)/(Pn()-nl)*1e3||0,ne=Ot.utils.clamp(-pt,1-pt,Lo(It/2)*It/.185),be=pt+(v.inertia===!1?0:ne),se,oe,ee=v,$e=ee.onStart,Me=ee.onInterrupt,Ye=ee.onComplete;if(se=ut(be,R),sl(se)||(se=be),oe=Math.max(0,Math.round(_t+se*$t)),z<=Tt&&z>=_t&&oe!==z){if(rt&&!rt._initted&&rt.data<=Lo(oe-z))return;v.inertia===!1&&(ne=se-pt),nt(oe,{duration:Zt(Lo(Math.max(Lo(be-zt),Lo(se-zt))*.185/It/.05||0)),ease:v.ease||"power3",data:Lo(oe-z),onInterrupt:function(){return U.restart(!0)&&Me&&Io(R,Me)},onComplete:function(){R.update(),Jt=K(),i&&!D&&(mt?mt.resetTo("totalProgress",se,i._tTime/i._tDur):i.progress(se)),St=vt=i&&!D?i.totalProgress():R.progress,M&&M(R),Ye&&Io(R,Ye)}},z,ne*$t,oe-z-ne*$t),$e&&Io(R,$e,nt.tween)}}else R.isActive&&Jt!==z&&U.restart(!0)}).pause()),l&&(tp[l]=R),u=R.trigger=Gn(u||f!==!0&&f),wt=u&&u._gsap&&u._gsap.stRevert,wt&&(wt=wt(R)),f=f===!0?u:Gn(f),di(a)&&(a={targets:u,className:a}),f&&(p===!1||p===bi||(p=!p&&f.parentNode&&f.parentNode.style&&wi(f.parentNode).display==="flex"?!1:nn),R.pin=f,O=Ot.core.getCache(f),O.spacer?me=O.pinState:(b&&(b=Gn(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),O.spacerIsNative=!!b,b&&(O.spacerState=ou(b))),O.spacer=bt=b||Ce.createElement("div"),bt.classList.add("pin-spacer"),l&&bt.classList.add("pin-spacer-"+l),O.pinState=me=ou(f)),n.force3D!==!1&&Ot.set(f,{force3D:!0}),R.spacer=bt=O.spacer,Nt=wi(f),gt=Nt[p+P.os2],x=Ot.getProperty(f),B=Ot.quickSetter(f,P.a,ln),Zd(f,bt,Nt),ye=ou(f)),et){ce=bs(et)?C0(et,R0):R0,V=su("scroller-start",l,L,P,ce,0),te=su("scroller-end",l,L,P,ce,0,V),C=V["offset"+P.op.d2];var ct=Gn(yr(L,"content")||L);Pt=this.markerStart=su("start",l,ct,P,ce,C,0,E),Xt=this.markerEnd=su("end",l,ct,P,ce,C,0,E),E&&(yt=Ot.quickSetter([Pt,Xt],P.a,ln)),!G&&!(Oi.length&&yr(L,"fixedMarkers")===!0)&&($1(I?Ee:L),Ot.set([V,te],{force3D:!0}),it=Ot.quickSetter(V,P.a,ln),Mt=Ot.quickSetter(te,P.a,ln))}if(E){var dt=E.vars.onUpdate,ht=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){R.update(0,0,1),dt&&dt.apply(E,ht||[])})}if(R.previous=function(){return ue[ue.indexOf(R)-1]},R.next=function(){return ue[ue.indexOf(R)+1]},R.revert=function(z,tt){if(!tt)return R.kill(!0);var rt=z!==!1||!R.enabled,pt=Rn;rt!==R.isReverted&&(rt&&(xt=Math.max(K(),R.scroll.rec||0),Qt=R.progress,st=i&&i.progress()),Pt&&[Pt,Xt,V,te].forEach(function(zt){return zt.style.display=rt?"none":"block"}),rt&&(Rn=R,R.update(rt)),f&&(!S||!R.isActive)&&(rt?ew(f,bt,me):Zd(f,bt,wi(f),ft)),rt||R.update(rt),Rn=pt,R.isReverted=rt)},R.refresh=function(z,tt,rt,pt){if(!((Rn||!R.enabled)&&!tt)){if(f&&z&&Ti){pn(r,"scrollEnd",$0);return}!Xn&&j&&j(R),Rn=R,nt.tween&&!rt&&(nt.tween.kill(),nt.tween=0),mt&&mt.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Et){return Et.vars.immediateRender&&Et.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var zt=At(),It=Rt(),ne=E?E.duration():ir(L,P),be=$t<=.01||!$t,se=0,oe=pt||0,ee=bs(rt)?rt.end:n.end,$e=n.endTrigger||u,Me=bs(rt)?rt.start:n.start||(n.start===0||!u?0:f?"0 0":"0 100%"),Ye=R.pinnedContainer=n.pinnedContainer&&Gn(n.pinnedContainer,R),cn=u&&Math.max(0,ue.indexOf(R))||0,Ke=cn,Ge,rn,Bi,Is,hn,qe,mi,Ls,w,F,$,q,Z;for(et&&bs(rt)&&(q=Ot.getProperty(V,P.p),Z=Ot.getProperty(te,P.p));Ke-- >0;)qe=ue[Ke],qe.end||qe.refresh(0,1)||(Rn=R),mi=qe.pin,mi&&(mi===u||mi===f||mi===Ye)&&!qe.isReverted&&(F||(F=[]),F.unshift(qe),qe.revert(!0,!0)),qe!==ue[Ke]&&(cn--,Ke--);for(In(Me)&&(Me=Me(R)),Me=w0(Me,"start",R),_t=D0(Me,u,zt,P,K(),Pt,V,R,It,Y,G,ne,E,R._startClamp&&"_startClamp")||(f?-.001:0),In(ee)&&(ee=ee(R)),di(ee)&&!ee.indexOf("+=")&&(~ee.indexOf(" ")?ee=(di(Me)?Me.split(" ")[0]:"")+ee:(se=cu(ee.substr(2),zt),ee=di(Me)?Me:(E?Ot.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,_t):_t)+se,$e=u)),ee=w0(ee,"end",R),Tt=Math.max(_t,D0(ee||($e?"100% 0":ne),$e,zt,P,K()+se,Xt,te,R,It,Y,G,ne,E,R._endClamp&&"_endClamp"))||-.001,se=0,Ke=cn;Ke--;)qe=ue[Ke]||{},mi=qe.pin,mi&&qe.start-qe._pinPush<=_t&&!E&&qe.end>0&&(Ge=qe.end-(R._startClamp?Math.max(0,qe.start):qe.start),(mi===u&&qe.start-qe._pinPush<_t||mi===Ye)&&isNaN(Me)&&(se+=Ge*(1-qe.progress)),mi===f&&(oe+=Ge));if(_t+=se,Tt+=se,R._startClamp&&(R._startClamp+=se),R._endClamp&&!Xn&&(R._endClamp=Tt||-.001,Tt=Math.min(Tt,ir(L,P))),$t=Tt-_t||(_t-=.01)&&.001,be&&(Qt=Ot.utils.clamp(0,1,Ot.utils.normalize(_t,Tt,xt))),R._pinPush=oe,Pt&&se&&(Ge={},Ge[P.a]="+="+se,Ye&&(Ge[P.p]="-="+K()),Ot.set([Pt,Xt],Ge)),f&&!(jd&&R.end>=ir(L,P)))Ge=wi(f),Is=P===en,Bi=K(),X=parseFloat(x(P.a))+oe,!ne&&Tt>1&&($=(I?Ce.scrollingElement||pi:L).style,$={style:$,value:$["overflow"+P.a.toUpperCase()]},I&&wi(Ee)["overflow"+P.a.toUpperCase()]!=="scroll"&&($.style["overflow"+P.a.toUpperCase()]="scroll")),Zd(f,bt,Ge),ye=ou(f),rn=Sr(f,!0),Ls=G&&vr(L,Is?Cn:en)(),p?(ft=[p+P.os2,$t+oe+ln],ft.t=bt,Ke=p===nn?mu(f,P)+$t+oe:0,Ke&&(ft.push(P.d,Ke+ln),bt.style.flexBasis!=="auto"&&(bt.style.flexBasis=Ke+ln)),Oo(ft),Ye&&ue.forEach(function(Et){Et.pin===Ye&&Et.vars.pinSpacing!==!1&&(Et._subPinOffset=!0)}),G&&K(xt)):(Ke=mu(f,P),Ke&&bt.style.flexBasis!=="auto"&&(bt.style.flexBasis=Ke+ln)),G&&(hn={top:rn.top+(Is?Bi-_t:Ls)+ln,left:rn.left+(Is?Ls:Bi-_t)+ln,boxSizing:"border-box",position:"fixed"},hn[Ts]=hn["max"+Bo]=Math.ceil(rn.width)+ln,hn[Es]=hn["max"+lp]=Math.ceil(rn.height)+ln,hn[bi]=hn[bi+ul]=hn[bi+cl]=hn[bi+fl]=hn[bi+hl]="0",hn[nn]=Ge[nn],hn[nn+ul]=Ge[nn+ul],hn[nn+cl]=Ge[nn+cl],hn[nn+fl]=Ge[nn+fl],hn[nn+hl]=Ge[nn+hl],N=iw(me,hn,S),Xn&&K(0)),i?(w=i._initted,Wd(1),i.render(i.duration(),!0,!0),Q=x(P.a)-X+$t+oe,ot=Math.abs($t-Q)>1,G&&ot&&N.splice(N.length-2,2),i.render(0,!0,!0),w||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Wd(0)):Q=$t,$&&($.value?$.style["overflow"+P.a.toUpperCase()]=$.value:$.style.removeProperty("overflow-"+P.a));else if(u&&K()&&!E)for(rn=u.parentNode;rn&&rn!==Ee;)rn._pinOffset&&(_t-=rn._pinOffset,Tt-=rn._pinOffset),rn=rn.parentNode;F&&F.forEach(function(Et){return Et.revert(!1,!0)}),R.start=_t,R.end=Tt,at=lt=Xn?xt:K(),!E&&!Xn&&(at<xt&&K(xt),R.scroll.rec=0),R.revert(!1,!0),Ht=Pn(),U&&(Jt=-1,U.restart(!0)),Rn=0,i&&D&&(i._initted||st)&&i.progress()!==st&&i.progress(st||0,!0).render(i.time(),!0,!0),(be||Qt!==R.progress||E||_||i&&!i._initted)&&(i&&!D&&(i._initted||Qt||i.vars.immediateRender!==!1)&&i.totalProgress(E&&_t<-.001&&!Qt?Ot.utils.normalize(_t,Tt,0):Qt,!0),R.progress=be||(at-_t)/$t===Qt?0:Qt),f&&p&&(bt._pinOffset=Math.round(R.progress*Q)),mt&&mt.invalidate(),isNaN(q)||(q-=Ot.getProperty(V,P.p),Z-=Ot.getProperty(te,P.p),au(V,P,q),au(Pt,P,q-(pt||0)),au(te,P,Z),au(Xt,P,Z-(pt||0))),be&&!Xn&&R.update(),h&&!Xn&&!xe&&(xe=!0,h(R),xe=!1)}},R.getVelocity=function(){return(K()-lt)/(Pn()-nl)*1e3||0},R.endAnimation=function(){el(R.callbackAnimation),i&&(mt?mt.progress(1):i.paused()?D||el(i,R.direction<0,1):el(i,i.reversed()))},R.labelToScroll=function(z){return i&&i.labels&&(_t||R.refresh()||_t)+i.labels[z]/i.duration()*$t||0},R.getTrailing=function(z){var tt=ue.indexOf(R),rt=R.direction>0?ue.slice(0,tt).reverse():ue.slice(tt+1);return(di(z)?rt.filter(function(pt){return pt.vars.preventOverlaps===z}):rt).filter(function(pt){return R.direction>0?pt.end<=_t:pt.start>=Tt})},R.update=function(z,tt,rt){if(!(E&&!rt&&!z)){var pt=Xn===!0?xt:R.scroll(),zt=z?0:(pt-_t)/$t,It=zt<0?0:zt>1?1:zt||0,ne=R.progress,be,se,oe,ee,$e,Me,Ye,cn;if(tt&&(lt=at,at=E?K():pt,v&&(vt=St,St=i&&!D?i.totalProgress():It)),m&&f&&!Rn&&!tu&&Ti&&(!It&&_t<pt+(pt-lt)/(Pn()-nl)*m?It=1e-4:It===1&&Tt>pt+(pt-lt)/(Pn()-nl)*m&&(It=.9999)),It!==ne&&R.enabled){if(be=R.isActive=!!It&&It<1,se=!!ne&&ne<1,Me=be!==se,$e=Me||!!It!=!!ne,R.direction=It>ne?1:-1,R.progress=It,$e&&!Rn&&(oe=It&&!ne?0:It===1?1:ne===1?2:3,D&&(ee=!Me&&H[oe+1]!=="none"&&H[oe+1]||H[oe],cn=i&&(ee==="complete"||ee==="reset"||ee in i))),T&&(Me||cn)&&(cn||d||!i)&&(In(T)?T(R):R.getTrailing(T).forEach(function(Bi){return Bi.endAnimation()})),D||(mt&&!Rn&&!tu?(mt._dp._time-mt._start!==mt._time&&mt.render(mt._dp._time-mt._start),mt.resetTo?mt.resetTo("totalProgress",It,i._tTime/i._tDur):(mt.vars.totalProgress=It,mt.invalidate().restart())):i&&i.totalProgress(It,!!(Rn&&(Ht||z)))),f){if(z&&p&&(bt.style[p+P.os2]=gt),!G)B(rl(X+Q*It));else if($e){if(Ye=!z&&It>ne&&Tt+1>pt&&pt+1>=ir(L,P),S)if(!z&&(be||Ye)){var Ke=Sr(f,!0),Ge=pt-_t;N0(f,Ee,Ke.top+(P===en?Ge:0)+ln,Ke.left+(P===en?0:Ge)+ln)}else N0(f,bt);Oo(be||Ye?N:ye),ot&&It<1&&be||B(X+(It===1&&!Ye?Q:0))}}v&&!nt.tween&&!Rn&&!tu&&U.restart(!0),a&&(Me||A&&It&&(It<1||!Xd))&&pl(a.targets).forEach(function(Bi){return Bi.classList[be||A?"add":"remove"](a.className)}),o&&!D&&!z&&o(R),$e&&!Rn?(D&&(cn&&(ee==="complete"?i.pause().totalProgress(1):ee==="reset"?i.restart(!0).pause():ee==="restart"?i.restart(!0):i[ee]()),o&&o(R)),(Me||!Xd)&&(c&&Me&&Io(R,c),J[oe]&&Io(R,J[oe]),A&&(It===1?R.kill(!1,1):J[oe]=0),Me||(oe=It===1?1:3,J[oe]&&Io(R,J[oe]))),y&&!be&&Math.abs(R.getVelocity())>(sl(y)?y:2500)&&(el(R.callbackAnimation),mt?mt.progress(1):el(i,ee==="reverse"?1:!It,1))):D&&o&&!Rn&&o(R)}if(Mt){var rn=E?pt/E.duration()*(E._caScrollDist||0):pt;it(rn+(V._isFlipped?1:0)),Mt(rn)}yt&&yt(-pt/E.duration()*(E._caScrollDist||0))}},R.enable=function(z,tt){R.enabled||(R.enabled=!0,pn(L,"resize",ol),I||pn(L,"scroll",Do),j&&pn(r,"refreshInit",j),z!==!1&&(R.progress=Qt=0,at=lt=Jt=K()),tt!==!1&&R.refresh())},R.getTween=function(z){return z&&nt?nt.tween:mt},R.setPositions=function(z,tt,rt,pt){if(E){var zt=E.scrollTrigger,It=E.duration(),ne=zt.end-zt.start;z=zt.start+ne*z/It,tt=zt.start+ne*tt/It}R.refresh(!1,!1,{start:T0(z,rt&&!!R._startClamp),end:T0(tt,rt&&!!R._endClamp)},pt),R.update()},R.adjustPinSpacing=function(z){if(ft&&z){var tt=ft.indexOf(P.d)+1;ft[tt]=parseFloat(ft[tt])+z+ln,ft[1]=parseFloat(ft[1])+z+ln,Oo(ft)}},R.disable=function(z,tt){if(z!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,tt||mt&&mt.pause(),xt=0,O&&(O.uncache=1),j&&dn(r,"refreshInit",j),U&&(U.pause(),nt.tween&&nt.tween.kill()&&(nt.tween=0)),!I)){for(var rt=ue.length;rt--;)if(ue[rt].scroller===L&&ue[rt]!==R)return;dn(L,"resize",ol),I||dn(L,"scroll",Do)}},R.kill=function(z,tt){R.disable(z,tt),mt&&!tt&&mt.kill(),l&&delete tp[l];var rt=ue.indexOf(R);rt>=0&&ue.splice(rt,1),rt===Wn&&uu>0&&Wn--,rt=0,ue.forEach(function(pt){return pt.scroller===R.scroller&&(rt=1)}),rt||Xn||(R.scroll.rec=0),i&&(i.scrollTrigger=null,z&&i.revert({kill:!1}),tt||i.kill()),Pt&&[Pt,Xt,V,te].forEach(function(pt){return pt.parentNode&&pt.parentNode.removeChild(pt)}),dl===R&&(dl=0),f&&(O&&(O.uncache=1),rt=0,ue.forEach(function(pt){return pt.pin===f&&rt++}),rt||(O.spacer=0)),n.onKill&&n.onKill(R)},ue.push(R),R.enable(!1,!1),wt&&wt(R),i&&i.add&&!$t){var Gt=R.update;R.update=function(){R.update=Gt,he.cache++,_t||Tt||R.refresh()},Ot.delayedCall(.01,R.update),$t=.01,_t=Tt=0}else R.refresh();f&&tw()},r.register=function(n){return No||(Ot=n||W0(),H0()&&window.document&&r.enable(),No=il),No},r.defaults=function(n){if(n)for(var i in n)ru[i]=n[i];return ru},r.disable=function(n,i){il=0,ue.forEach(function(o){return o[i?"kill":"disable"](n)}),dn(pe,"wheel",Do),dn(Ce,"scroll",Do),clearInterval(jh),dn(Ce,"touchcancel",nr),dn(Ee,"touchstart",nr),nu(dn,Ce,"pointerdown,touchstart,mousedown",E0),nu(dn,Ce,"pointerup,touchend,mouseup",A0),pu.kill(),eu(dn);for(var s=0;s<he.length;s+=3)iu(dn,he[s],he[s+1]),iu(dn,he[s],he[s+2])},r.enable=function(){if(pe=window,Ce=document,pi=Ce.documentElement,Ee=Ce.body,Ot){if(pl=Ot.utils.toArray,al=Ot.utils.clamp,Qd=Ot.core.context||nr,Wd=Ot.core.suppressOverwrites||nr,rp=pe.history.scrollRestoration||"auto",ep=pe.pageYOffset||0,Ot.core.globals("ScrollTrigger",r),Ee){il=1,Fo=document.createElement("div"),Fo.style.height="100vh",Fo.style.position="absolute",t_(),q1(),Xe.register(Ot),r.isTouch=Xe.isTouch,ts=Xe.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Kd=Xe.isTouch===1,pn(pe,"wheel",Do),ip=[pe,Ce,pi,Ee],Ot.matchMedia?(r.matchMedia=function(h){var d=Ot.matchMedia(),u;for(u in h)d.add(u,h[u]);return d},Ot.addEventListener("matchMediaInit",function(){Q0(),hp()}),Ot.addEventListener("matchMediaRevert",function(){return K0()}),Ot.addEventListener("matchMedia",function(){ws(0,1),Ps("matchMedia")}),Ot.matchMedia().add("(orientation: portrait)",function(){return qd(),qd})):console.warn("Requires GSAP 3.11.0 or later"),qd(),pn(Ce,"scroll",Do);var n=Ee.hasAttribute("style"),i=Ee.style,s=i.borderTopStyle,o=Ot.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Sr(Ee),en.m=Math.round(a.top+en.sc())||0,Cn.m=Math.round(a.left+Cn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Ee.setAttribute("style",""),Ee.removeAttribute("style")),jh=setInterval(P0,250),Ot.delayedCall(.5,function(){return tu=0}),pn(Ce,"touchcancel",nr),pn(Ee,"touchstart",nr),nu(pn,Ce,"pointerdown,touchstart,mousedown",E0),nu(pn,Ce,"pointerup,touchend,mouseup",A0),$d=Ot.utils.checkPrefix("transform"),fu.push($d),No=Pn(),pu=Ot.delayedCall(.2,ws).pause(),Uo=[Ce,"visibilitychange",function(){var h=pe.innerWidth,d=pe.innerHeight;Ce.hidden?(M0=h,b0=d):(M0!==h||b0!==d)&&ol()},Ce,"DOMContentLoaded",ws,pe,"load",ws,pe,"resize",ol],eu(pn),ue.forEach(function(h){return h.enable(0,1)}),l=0;l<he.length;l+=3)iu(dn,he[l],he[l+1]),iu(dn,he[l],he[l+2])}else if(Ce){var c=function h(){r.enable(),Ce.removeEventListener("DOMContentLoaded",h)};Ce.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Xd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(jh)||(jh=i)&&setInterval(P0,i),"ignoreMobileResize"in n&&(Kd=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(eu(dn)||eu(pn,n.autoRefreshEvents||"none"),k0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Gn(n),o=he.indexOf(s),a=Cs(s);~o&&he.splice(o,a?6:2),i&&(a?Oi.unshift(pe,i,Ee,i,pi,i):Oi.unshift(s,i))},r.clearMatchMedia=function(n){ue.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(di(n)?Gn(n):n).getBoundingClientRect(),a=o[s?Ts:Es]*i||0;return s?o.right-a>0&&o.left+a<pe.innerWidth:o.bottom-a>0&&o.top+a<pe.innerHeight},r.positionInViewport=function(n,i,s){di(n)&&(n=Gn(n));var o=n.getBoundingClientRect(),a=o[s?Ts:Es],l=i==null?a/2:i in gu?gu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/pe.innerWidth:(o.top+l)/pe.innerHeight},r.killAll=function(n){if(ue.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Rs.killAll||[];Rs={},i.forEach(function(s){return s()})}},r})();re.version="3.15.0";re.saveStyles=function(r){return r?pl(r).forEach(function(t){if(t&&t.style){var e=fi.indexOf(t);e>=0&&fi.splice(e,5),fi.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Ot.core.getCache(t),Qd())}}):fi};re.revert=function(r,t){return hp(!r,t)};re.create=function(r,t){return new re(r,t)};re.refresh=function(r){return r?ol(!0):(No||re.register())&&ws(!0)};re.update=function(r){return++he.cache&&Mr(r===!0?2:0)};re.clearScrollMemory=j0;re.maxScroll=function(r,t){return ir(r,t?Cn:en)};re.getScrollFunc=function(r,t){return vr(Gn(r),t?Cn:en)};re.getById=function(r){return tp[r]};re.getAll=function(){return ue.filter(function(r){return r.vars.id!=="ScrollSmoother"})};re.isScrolling=function(){return!!Ti};re.snapDirectional=cp;re.addEventListener=function(r,t){var e=Rs[r]||(Rs[r]=[]);~e.indexOf(t)||e.push(t)};re.removeEventListener=function(r,t){var e=Rs[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};re.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,h){var d=[],u=[],f=Ot.delayedCall(i,function(){h(d,u),d=[],u=[]}).pause();return function(p){d.length||f.restart(!0),d.push(p.trigger),u.push(p),s<=d.length&&f.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&In(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return In(s)&&(s=s(),pn(re,"refresh",function(){return s=t.batchMax()})),pl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(re.create(c))}),e};var F0=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Jd=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Xe.isTouch?" pinch-zoom":""):"none",t===pi&&r(Ee,e)},lu={auto:1,scroll:1},sw=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Ot.core.getCache(s),a=Pn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Ee&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(lu[(l=wi(s)).overflowY]||lu[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Cs(s)&&(lu[(l=wi(s)).overflowY]||lu[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},n_=function(t,e,n,i){return Xe.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&sw,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&pn(Ce,Xe.eventTypes[0],B0,!1,!0)},onDisable:function(){return dn(Ce,Xe.eventTypes[0],B0,!0)}})},ow=/(input|label|select|textarea)/i,O0,B0=function(t){var e=ow.test(t.target.tagName);(e||O0)&&(t._gsapAllow=!0,O0=e)},aw=function(t){bs(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Gn(t.target)||pi,h=Ot.core.globals().ScrollSmoother,d=h&&h.get(),u=ts&&(t.content&&Gn(t.content)||d&&t.content!==!1&&!d.smooth()&&d.content()),f=vr(c,en),p=vr(c,Cn),_=1,m=(Xe.isTouch&&pe.visualViewport?pe.visualViewport.scale*pe.visualViewport.width:pe.outerWidth)/pe.innerWidth,g=0,M=In(i)?function(){return i(a)}:function(){return i||2.8},A,v,S=n_(c,t.type,!0,s),b=function(){return v=!1},E=nr,y=nr,T=function(){l=ir(c,en),y=al(ts?1:0,l),n&&(E=al(0,ir(c,Cn))),A=As},P=function(){u._gsap.y=rl(parseFloat(u._gsap.y)+f.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},D=function(){if(v){requestAnimationFrame(b);var et=rl(a.deltaY/2),Y=y(f.v-et);if(u&&Y!==f.v+f.offset){f.offset=Y-f.v;var R=rl((parseFloat(u&&u._gsap.y)||0)-f.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",u._gsap.y=R+"px",f.cacheID=he.cache,Mr()}return!0}f.offset&&P(),v=!0},L,W,I,G,J=function(){T(),L.isActive()&&L.vars.scrollY>l&&(f()>l?L.progress(1)&&f(l):L.resetTo("scrollY",l))};return u&&Ot.set(u,{y:"+=0"}),t.ignoreCheck=function(H){return ts&&H.type==="touchmove"&&D(H)||_>1.05&&H.type!=="touchstart"||a.isGesturing||H.touches&&H.touches.length>1},t.onPress=function(){v=!1;var H=_;_=rl((pe.visualViewport&&pe.visualViewport.scale||1)/m),L.pause(),H!==_&&Jd(c,_>1.01?!0:n?!1:"x"),W=p(),I=f(),T(),A=As},t.onRelease=t.onGestureStart=function(H,et){if(f.offset&&P(),!et)G.restart(!0);else{he.cache++;var Y=M(),R,j;n&&(R=p(),j=R+Y*.05*-H.velocityX/.227,Y*=F0(p,R,j,ir(c,Cn)),L.vars.scrollX=E(j)),R=f(),j=R+Y*.05*-H.velocityY/.227,Y*=F0(f,R,j,ir(c,en)),L.vars.scrollY=y(j),L.invalidate().duration(Y).play(.01),(ts&&L.vars.scrollY>=l||R>=l-1)&&Ot.to({},{onUpdate:J,duration:Y})}o&&o(H)},t.onWheel=function(){L._ts&&L.pause(),Pn()-g>1e3&&(A=0,g=Pn())},t.onChange=function(H,et,Y,R,j){if(As!==A&&T(),et&&n&&p(E(R[2]===et?W+(H.startX-H.x):p()+et-R[1])),Y){f.offset&&P();var At=j[2]===Y,Rt=At?I+H.startY-H.y:f()+Y-j[1],Jt=y(Rt);At&&Rt!==Jt&&(I+=Jt-Rt),f(Jt)}(Y||et)&&Mr()},t.onEnable=function(){Jd(c,n?!1:"x"),re.addEventListener("refresh",J),pn(pe,"resize",J),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=p.smooth=!1),S.enable()},t.onDisable=function(){Jd(c,!0),dn(pe,"resize",J),re.removeEventListener("refresh",J),S.kill()},t.lockAxis=t.lockAxis!==!1,a=new Xe(t),a.iOS=ts,ts&&!f()&&f(1),ts&&Ot.ticker.add(nr),G=a._dc,L=Ot.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:e_(f,f(),function(){return L.pause()})},onUpdate:Mr,onComplete:G.vars.onComplete}),a};re.sort=function(r){if(In(r))return ue.sort(r);var t=pe.pageYOffset||0;return re.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+pe.innerHeight}),ue.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};re.observe=function(r){return new Xe(r)};re.normalizeScroll=function(r){if(typeof r>"u")return Hn;if(r===!0&&Hn)return Hn.enable();if(r===!1){Hn&&Hn.kill(),Hn=r;return}var t=r instanceof Xe?r:aw(r);return Hn&&Hn.target===t.target&&Hn.kill(),Cs(t.target)&&(Hn=t),t};re.core={_getVelocityProp:Qh,_inputObserver:n_,_scrollers:he,_proxies:Oi,bridge:{ss:function(){Ti||Ps("scrollStart"),Ti=Pn()},ref:function(){return Rn}}};W0()&&Ot.registerPlugin(re);var i_="1.3.26";function o_(r,t,e){return Math.max(r,Math.min(t,e))}function lw(r,t,e){return(1-e)*r+e*t}function cw(r,t,e,n){return lw(r,t,1-Math.exp(-e*n))}function hw(r,t){return(r%t+t)%t}var uw=class{constructor(){Wt(this,"isRunning",!1);Wt(this,"value",0);Wt(this,"from",0);Wt(this,"to",0);Wt(this,"currentTime",0);Wt(this,"lerp");Wt(this,"duration");Wt(this,"easing");Wt(this,"onUpdate")}advance(r){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;let e=o_(0,this.currentTime/this.duration,1);t=e>=1;let n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=cw(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=o}};function fw(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,n)},t)}}var dw=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){Wt(this,"width",0);Wt(this,"height",0);Wt(this,"scrollHeight",0);Wt(this,"scrollWidth",0);Wt(this,"debouncedResize");Wt(this,"wrapperResizeObserver");Wt(this,"contentResizeObserver");Wt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Wt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Wt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=fw(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},a_=class{constructor(){Wt(this,"events",{})}emit(r,...t){let e=this.events[r]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{this.events[r]=this.events[r]?.filter(e=>t!==e)}}off(r,t){this.events[r]=this.events[r]?.filter(e=>t!==e)}destroy(){this.events={}}},pw=100/6,es={passive:!1};function r_(r,t){return r===1?pw:r===2?t:1}var mw=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){Wt(this,"touchStart",{x:0,y:0});Wt(this,"lastDelta",{x:0,y:0});Wt(this,"window",{width:0,height:0});Wt(this,"emitter",new a_);Wt(this,"onTouchStart",r=>{let{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Wt(this,"onTouchMove",r=>{let{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Wt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Wt(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r,i=r_(n,this.window.width),s=r_(n,this.window.height);t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});Wt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,es),this.element.addEventListener("touchstart",this.onTouchStart,es),this.element.addEventListener("touchmove",this.onTouchMove,es),this.element.addEventListener("touchend",this.onTouchEnd,es)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,es),this.element.removeEventListener("touchstart",this.onTouchStart,es),this.element.removeEventListener("touchmove",this.onTouchMove,es),this.element.removeEventListener("touchend",this.onTouchEnd,es)}},s_=r=>Math.min(1,1.001-2**(-10*r)),up=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:u=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:p=1,autoResize:_=!0,prevent:m,virtualScroll:g,overscroll:M=!0,autoRaf:A=!1,anchors:v=!1,autoToggle:S=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:E=!1,naiveDimensions:y=E,stopInertiaOnNavigate:T=!1,respectReducedMotion:P=!0}={}){Wt(this,"_isScrolling",!1);Wt(this,"_isStopped",!1);Wt(this,"_isLocked",!1);Wt(this,"_preventNextNativeScrollEvent",!1);Wt(this,"_resetVelocityTimeout",null);Wt(this,"_rafId",null);Wt(this,"_isDraggingSelection",!1);Wt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Wt(this,"isTouching");Wt(this,"isIos");Wt(this,"time",0);Wt(this,"userData",{});Wt(this,"lastVelocity",0);Wt(this,"velocity",0);Wt(this,"direction",0);Wt(this,"options");Wt(this,"targetScroll");Wt(this,"animatedScroll");Wt(this,"animate",new uw);Wt(this,"emitter",new a_);Wt(this,"dimensions");Wt(this,"virtualScroll");Wt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Wt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Wt(this,"onTransitionEnd",r=>{r.propertyName?.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Wt(this,"onClick",r=>{let t=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){let n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){let i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Wt(this,"onPointerDown",r=>{r.button===1&&this.reset()});Wt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;let{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;let i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";let o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(p=>p instanceof HTMLElement&&(typeof c=="function"&&c?.(p)||p.hasAttribute?.("data-lenis-prevent")||h==="vertical"&&p.hasAttribute?.("data-lenis-prevent-vertical")||h==="horizontal"&&p.hasAttribute?.("data-lenis-prevent-horizontal")||i&&p.hasAttribute?.("data-lenis-prevent-touch")||s&&p.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();let u=i&&this.options.syncTouch,f=i&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Wt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Wt(this,"raf",r=>{let t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=i_,window.lenis||(window.lenis={}),window.lenis.version=i_,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=s_:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:d,touchMultiplier:f,wheelMultiplier:p,autoResize:_,prevent:m,virtualScroll:g,overscroll:M,autoRaf:A,anchors:v,autoToggle:S,allowNestedScroll:b,naiveDimensions:y,stopInertiaOnNavigate:T,respectReducedMotion:P},this.dimensions=new dw(r,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new mw(e,{touchMultiplier:f,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){let r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;let n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;let i=n[0],s=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-s.right,e.clientY-s.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?e=!0:(s=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let u=r,f=t;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let p=null;if(typeof u=="string"?(p=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),p||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&u?.nodeType&&(p=u),p){if(this.options.wrapper!==window){let v=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?v.left:v.top}let _=p.getBoundingClientRect(),m=getComputedStyle(p),g=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),M=getComputedStyle(this.rootElement),A=this.isHorizontal?Number.parseFloat(M.scrollPaddingLeft):Number.parseFloat(M.scrollPaddingTop);u=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(g)?0:g)-(Number.isNaN(A)?0:A)}}if(typeof u=="number"){if(u+=f,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;let p=u-this.animatedScroll;p>this.limit/2?u-=this.limit:p<-this.limit/2&&(u+=this.limit)}}else u=o_(0,u,this.limit);if(u===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof o=="number"&&typeof a!="function"?a=s_:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,u,{duration:o,easing:a,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(p,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),i&&(this.targetScroll=p),_||this.emit(),_&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){let n=Date.now();r._lenis||(r._lenis={});let i=r._lenis,s,o,a,l,c,h,d,u,f,p;if(n-(i.time??0)>2e3){i.time=Date.now();let b=window.getComputedStyle(r);if(i.computedStyle=b,s=["auto","overlay","scroll"].includes(b.overflowX),o=["auto","overlay","scroll"].includes(b.overflowY),c=["auto"].includes(b.overscrollBehaviorX),h=["auto"].includes(b.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;d=r.scrollWidth,u=r.scrollHeight,f=r.clientWidth,p=r.clientHeight,a=d>f,l=u>p,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=u,i.clientWidth=f,i.clientHeight=p,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,u=i.scrollHeight,f=i.clientWidth,p=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;let _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical",m,g,M,A,v,S;if(_==="horizontal")m=Math.round(r.scrollLeft),g=d-f,M=t,A=s,v=a,S=c;else if(_==="vertical")m=Math.round(r.scrollTop),g=u-p,M=e,A=o,v=l,S=h;else return!1;return!S&&(m>=g||m<=0)?!0:(M>0?m<g:m>0)&&A&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?hw(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(let r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};var Ct={WebGLRenderer:Ch,Scene:ia,PerspectiveCamera:bn,Color:de,BufferGeometry:gn,Float32BufferAttribute:tn,ShaderMaterial:Fn,AdditiveBlending:Ea,Group:cr,Points:ua,LineSegments:ha,LineBasicMaterial:ao,EdgesGeometry:ma,BoxGeometry:Nr,CanvasTexture:da,Sprite:aa,SpriteMaterial:oo,Vector3:k,CatmullRomCurve3:lo,Mesh:qn,TubeGeometry:va,Vector2:qt,Raycaster:ba,Sphere:Yi,MathUtils:wf,Clock:wa};window.gsap=jn;window.ScrollTrigger=re;window.Lenis=up;(function(){"use strict";var r=document.documentElement,t=matchMedia("(prefers-reduced-motion: reduce)").matches,e=matchMedia("(hover: hover) and (pointer: fine)").matches;r.classList.add("bh-motion"),t&&r.classList.add("reduced");var n=window.PB={p:0,u:t?1:0,fade:1,frames:0,frameMs:0,fps:0,reduced:t,neurons:0,links:0,gl:null},i=function(O,ut){return(ut||document).querySelector(O)},s=function(O,ut){return Array.prototype.slice.call((ut||document).querySelectorAll(O))},o=!0,a=function(O,ut,at){return Math.max(ut,Math.min(at,O))},l=s(".node-card").length+s(".mini").length;s("[data-count-systems]").forEach(function(O){O.textContent=l});var c=null;o&&jn.registerPlugin(re),o&&!t&&(c=new up({lerp:.1,smoothWheel:!0}),c.on("scroll",re.update),jn.ticker.add(function(O){c.raf(O*1e3)}),jn.ticker.lagSmoothing(0)),document.addEventListener("click",function(O){var ut=O.target.closest('a[href^="#"]');if(ut){var at=ut.getAttribute("href");if(!(at.length<2)){var lt=document.querySelector(at);if(lt){O.preventDefault();var _t=-96;c?c.scrollTo(lt,{offset:_t,duration:1.4}):window.scrollTo({top:lt.getBoundingClientRect().top+scrollY+_t,behavior:t?"auto":"smooth"})}}}});var h=s(".step-cap"),d=i("#uPct"),u=i("#uMeter");function f(O){var ut=Math.min(h.length-1,Math.floor(O*h.length));h.forEach(function(at,lt){at.classList.toggle("on",lt===ut)}),d.textContent=Math.round(O*100)+"%",u.style.setProperty("--u",O.toFixed(3))}o&&!t?(f(0),re.create({trigger:".hero",start:"top top",endTrigger:"#uncoil",end:"bottom bottom",scrub:!0,onUpdate:function(O){n.p=O.progress,n.u=a((O.progress-.08)/.8,0,1),f(n.u)}}),jn.from(".hero-copy>*",{y:28,opacity:0,duration:.9,ease:"expo.out",stagger:.08,delay:.15,clearProps:"all"})):(h.forEach(function(O){O.classList.add("on")}),n.u=1,d.textContent="100%",n.fade=.9);var p=i("#board"),_=i("#wbg"),m=i("#wfg"),g=s(".node-card"),M=s(".mini"),A="http://www.w3.org/2000/svg",v=[],S=new Set;function b(O,ut,at){var lt=document.createElementNS(A,"path");return lt.setAttribute("d",O),lt.setAttribute("class",ut),at.appendChild(lt),lt}function E(O){if(!O.classList.contains("live")){O.classList.add("live");var ut=O.querySelector("[data-state]");ut&&(ut.textContent="Linked \xB7 powered by Piet's brain"),S.add(O.getAttribute("data-node")||O.querySelector("h4").textContent),!e&&O.classList.contains("node-card")&&(O.classList.add("hover"),setTimeout(function(){O.classList.remove("hover")},1600)),i("#mNodes").textContent=S.size+"/"+l}}function y(){_.innerHTML="",m.innerHTML="",v=[];var O=p.getBoundingClientRect(),ut=O.width,at=innerWidth<=860,lt=at?12:ut/2,_t=g.map(function(bt){var C=bt.querySelector(".port").getBoundingClientRect();return{x:C.left+C.width/2-O.left,y:C.top+C.height/2-O.top}}),Tt=i(".minis").getBoundingClientRect(),Pt=Tt.top-O.top-(at?44:30),Xt="M"+lt+" -40 V"+Pt;if(v.push({bg:b(Xt,"bg",_),fg:b(Xt,"fg",m),kind:"spine"}),_t.forEach(function(bt,C){var x=bt.x>lt?1:-1,B=lt+x*Math.min(28,Math.abs(bt.x-lt)/2),X="M"+lt+" "+(bt.y-26)+" C"+lt+" "+(bt.y-6)+" "+B+" "+bt.y+" "+(B+x*10)+" "+bt.y+" H"+bt.x;v.push({bg:b(X,"bg",_),fg:b(X,C%3===1?"fg or":"fg",m),kind:"branch",card:g[C]})}),at){var V=M.map(function(bt){var C=bt.getBoundingClientRect();return{x:C.left-O.left-2,y:C.top-O.top+30}}),te=V[V.length-1].y,ce="M"+lt+" "+Pt+" V"+te;v.push({bg:b(ce,"bg",_),fg:b(ce,"fg",m),kind:"bus"}),V.forEach(function(bt,C){var x="M"+lt+" "+bt.y+" H"+bt.x;v.push({bg:b(x,"bg",_),fg:b(x,"fg",m),kind:"stub",card:M[C]})})}else{var xe=M.map(function(bt){var C=bt.getBoundingClientRect();return{x:C.left+C.width/2-O.left,y:C.top-O.top-9}}),$t=xe.map(function(bt){return bt.x}),me=Math.min.apply(null,$t.concat(lt)),N=Math.max.apply(null,$t.concat(lt)),ye="M"+me+" "+Pt+" H"+N;v.push({bg:b(ye,"bg",_),fg:b(ye,"fg",m),kind:"bus"}),xe.forEach(function(bt,C){var x="M"+bt.x+" "+Pt+" V"+(bt.y-1);v.push({bg:b(x,"bg",_),fg:b(x,"fg",m),kind:"stub",card:M[C]})})}v.forEach(function(bt){var C=bt.fg.getTotalLength()||1;bt.len=C,bt.fg.style.strokeDasharray=C+" "+C,bt.fg.style.strokeDashoffset=bt.card&&bt.card.classList.contains("live")?0:C}),P()}var T=[];function P(){if(T.forEach(function(lt){lt.kill()}),T=[],!o||t){v.forEach(function(lt){lt.fg.style.strokeDashoffset=0}),g.concat(M).forEach(E);return}var O=v[0];T.push(re.create({trigger:p,start:"top 75%",end:"bottom 60%",scrub:!0,onUpdate:function(lt){O.fg.style.strokeDashoffset=O.len*(1-lt.progress)}})),v.forEach(function(lt){lt.kind==="branch"&&T.push(re.create({trigger:lt.card,start:"top 70%",once:!0,onEnter:function(){jn.to(lt.fg,{strokeDashoffset:0,duration:.7,ease:"power2.out",onComplete:function(){E(lt.card)}})}}))});var ut=v.filter(function(lt){return lt.kind==="bus"})[0],at=v.filter(function(lt){return lt.kind==="stub"});T.push(re.create({trigger:".minis",start:"top 78%",once:!0,onEnter:function(){var lt=jn.timeline();lt.to(ut.fg,{strokeDashoffset:0,duration:.8,ease:"power2.inOut"}),at.forEach(function(_t,Tt){lt.to(_t.fg,{strokeDashoffset:0,duration:.35,ease:"power2.out",onComplete:function(){E(_t.card)}},.5+Tt*.09)})}}))}var D;function L(){clearTimeout(D),D=setTimeout(function(){y(),o&&re.refresh()},120)}if(addEventListener("resize",L),document.fonts&&document.fonts.ready&&document.fonts.ready.then(L),e&&o&&!t?g.forEach(function(O){jn.set(O,{transformPerspective:1e3});var ut=jn.quickTo(O,"rotationX",{duration:.5,ease:"power3"}),at=jn.quickTo(O,"rotationY",{duration:.5,ease:"power3"});O.addEventListener("pointerenter",function(){O.classList.add("hover")}),O.addEventListener("pointermove",function(lt){var _t=O.getBoundingClientRect(),Tt=(lt.clientX-_t.left)/_t.width,Pt=(lt.clientY-_t.top)/_t.height;at((Tt-.5)*9),ut(-(Pt-.5)*7),O.style.setProperty("--mx",Tt*100+"%"),O.style.setProperty("--my",Pt*100+"%")}),O.addEventListener("pointerleave",function(){ut(0),at(0),O.classList.remove("hover")})}):g.forEach(function(O){O.addEventListener("focusin",function(){O.classList.add("hover")}),O.addEventListener("focusout",function(){O.classList.remove("hover")})}),"IntersectionObserver"in window){var W=new IntersectionObserver(function(O){O.forEach(function(ut){ut.target.classList.toggle("paused",!ut.isIntersecting),ut.target._on=ut.isIntersecting})},{rootMargin:"80px"});s(".viz").forEach(function(O){W.observe(O)})}var I=i("[data-clock]");function G(){var O=new Date;I.textContent=O.toTimeString().slice(0,8)}G(),setInterval(G,1e3),(function(){var O=i("#strands"),ut=["#00E1FF","#00E1FF","#1E8BFF","#1E8BFF","#FF8A2B","#FF8A2B","#7B5CFF"],at="";ut.forEach(function(lt,_t){var Tt=34+_t*19,Pt=66+_t*8,Xt="M10 "+Tt+" C120 "+Tt+" 150 "+Pt+" 262 "+Pt;at+='<path class="strand" d="'+Xt+'" stroke="'+lt+'"/><path class="flow" d="'+Xt+'" stroke="'+lt+'" style="animation-delay:-'+(_t*.23).toFixed(2)+'s"/>'}),O.innerHTML=at})(),(function(){for(var O=i("#eq"),ut=30,at=[],lt=.35,_t=.35,Tt=.5,Pt=0;Pt<ut;Pt++){var Xt=document.createElement("span");O.appendChild(Xt),at.push(Xt)}var V=O.closest(".node-card"),te=O.closest(".viz"),ce=0,xe=-1,$t=s("#ivr li"),me=i("#route"),N=["Routing to the service desk\u2026","Routing to billing\u2026","Ringing your mobile app\u2026"];V.addEventListener("pointermove",function(bt){var C=O.getBoundingClientRect();Tt=a((bt.clientX-C.left)/C.width,0,1),_t=1}),V.addEventListener("pointerleave",function(){_t=.35}),setInterval(function(){!V.classList.contains("live")||te._on===!1||(ce++,i("#callT").textContent=String(Math.floor(ce/60)).padStart(2,"0")+":"+String(ce%60).padStart(2,"0"),ce%2===0&&(xe=(xe+1)%3,$t.forEach(function(bt,C){bt.classList.toggle("on",C===xe)}),me.textContent=N[xe]))},1e3);function ye(bt){if(requestAnimationFrame(ye),te._on!==!1){if(!V.classList.contains("live")){at.forEach(function(ft){ft.style.transform="scaleY(.06)"});return}lt+=(_t-lt)*.08;for(var C=bt/1e3,x=0;x<ut;x++){var B=x/(ut-1),X=Math.sin(B*Math.PI),Q=X*(.5+.3*Math.sin(C*7.1+x*.8)+.2*Math.sin(C*13.3+x*2.1))*(.6+.4*Math.abs(Math.sin(C*1.7))),gt=Math.exp(-Math.pow((B-Tt)*4,2))*(_t>.5?.5:0);Q=a(Q*lt+gt*lt,.04,1),at[x].style.transform="scaleY("+(t?.5*X:Q).toFixed(3)+")"}}}requestAnimationFrame(ye)})(),(function(){var O=i("#acc").closest(".node-card"),ut=i("#accMsg"),at=i("#accBtn"),lt;function _t(Tt){O.classList.toggle("granted",Tt),at.setAttribute("aria-pressed",Tt),ut.textContent=Tt?"ACCESS GRANTED":"PRESENT FOB",at.textContent=Tt?"Door unlocked":"Present fob"}e&&(O.addEventListener("pointerenter",function(){lt=setTimeout(function(){_t(!0)},250)}),O.addEventListener("pointerleave",function(){clearTimeout(lt),_t(!1)})),at.addEventListener("click",function(){_t(!O.classList.contains("granted"))})})(),(function(){var O={},ut=i("#posCount"),at=i("#posCharge"),lt=i("#ticket"),_t=lt.closest(".ticket");function Tt(){var Pt=Object.keys(O),Xt=Pt.reduce(function(V,te){return V+O[te]},0);return ut.textContent="Order: "+Xt+(Xt===1?" item":" items"),lt.innerHTML=Pt.length?Pt.map(function(V){return"<li><span>"+V+"</span><span>x"+O[V]+"</span></li>"}).join(""):'<li class="empty">Waiting for an order</li>',Xt}s("[data-item]").forEach(function(Pt){Pt.addEventListener("click",function(){_t.classList.contains("paid")&&(O={},_t.classList.remove("paid")),O[Pt.textContent]=(O[Pt.textContent]||0)+1,at.classList.remove("ok"),at.textContent="Charge",Tt()})}),at.addEventListener("click",function(){var Pt=Object.keys(O).length;if(!Pt){ut.textContent="Add an item first";return}at.classList.add("ok"),at.textContent="Approved",_t.classList.add("paid"),ut.textContent="Paid \xB7 sent to kitchen"})})(),e&&o&&!t&&s(".mag").forEach(function(O){var ut=jn.quickTo(O,"x",{duration:.4,ease:"power3"}),at=jn.quickTo(O,"y",{duration:.4,ease:"power3"});O.addEventListener("pointermove",function(lt){var _t=O.getBoundingClientRect();ut((lt.clientX-_t.left-_t.width/2)*.28),at((lt.clientY-_t.top-_t.height/2)*.35)}),O.addEventListener("pointerleave",function(){ut(0),at(0)})});var J=0,H=scrollY;addEventListener("scroll",function(){J+=Math.abs(scrollY-H),H=scrollY},{passive:!0});var et=i("#termOut"),Y=i("#why"),R=!1,j=0,At=[],Rt=g.map(function(O){return O.getAttribute("data-node")}).concat(M.map(function(O){return O.querySelector("h4").textContent}));function Jt(O){return O.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}function Ht(O){At.push(O),At.length>11&&At.shift(),et.innerHTML=At.join(`
`)}function Qt(){if(R){if(j===0)Ht('<span class="dimc">&gt; PINGING piets_brain \u2026</span>');else if(j===1)Ht(n.gl===!1?'reply  <span class="orc">3D view off on this device</span> \xB7 page OK':"reply  frame "+(n.frameMs?n.frameMs.toFixed(1):"\u2014")+" ms \xB7 "+n.neurons.toLocaleString()+" neurons");else{var O=Rt[(j-2)%Rt.length],ut=S.has(O);Ht("&gt; node "+Jt(O).padEnd(22,".")+" "+(ut?'<span class="okc">linked</span>':'<span class="dimc">waiting</span>'))}j=(j+1)%(Rt.length+2)}}setInterval(Qt,700),"IntersectionObserver"in window?new IntersectionObserver(function(O){R=O[0].isIntersecting,R&&!At.length&&(et.innerHTML="")},{threshold:.2}).observe(Y):R=!0,setInterval(function(){i("#mFrames").textContent=n.frames.toLocaleString(),i("#mPx").textContent=Math.round(J).toLocaleString(),n.neurons&&(i("#hudN").textContent=n.neurons.toLocaleString(),i("#hudL").textContent=n.links.toLocaleString(),i("#hudF").textContent=n.fps?Math.round(n.fps):"\u2014")},500);function K(){var O=innerHeight,ut=1,at=i("#services"),lt=i("#why"),_t=i("#plan-section");if(at){var Tt=a((O-at.getBoundingClientRect().top)/(O*.85),0,1);ut=1-.84*Tt}if(lt){var Pt=a((O*.6-lt.getBoundingClientRect().bottom)/(O*.6),0,1);ut=ut*(1-Pt)}if(_t){var Xt=_t.getBoundingClientRect(),V=a((O*.85-Xt.top)/(O*.6),0,1),te=a((O*.6-Xt.bottom)/(O*.6),0,1);ut=Math.max(ut,.3*V*(1-te))}t&&(ut=Math.min(ut,.9)),n.fade=ut}var nt=!1;addEventListener("scroll",function(){nt||(nt=!0,requestAnimationFrame(function(){nt=!1,K()}))},{passive:!0}),addEventListener("resize",K),K(),y()})();var ti=window.PB,gl=document.getElementById("brain");function l_(){ti.gl=!1,document.documentElement.classList.add("no-gl"),gl&&(gl.style.display="none")}if(!gl)l_();else try{let r=document.createElement("canvas");if(!(r.getContext("webgl2")||r.getContext("webgl")))throw new Error("no webgl");gw(),document.documentElement.classList.add("gl-on")}catch(r){console.warn("3D view unavailable:",r&&r.message),l_()}function gw(){let r=ti.reduced,t=new Ct.WebGLRenderer({canvas:gl,antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setClearColor(0,0);let e=new Ct.Scene,n=new Ct.PerspectiveCamera(45,1,.1,100),i=Math.min(innerWidth,innerHeight)<700;ti.gl=!0;let s=20261015,o=()=>(s=s*16807%2147483647)/2147483647,a=new Uint8Array(512);{let z=[...Array(256).keys()];for(let tt=255;tt>0;tt--){let rt=Math.floor(o()*(tt+1));[z[tt],z[rt]]=[z[rt],z[tt]]}for(let tt=0;tt<512;tt++)a[tt]=z[tt&255]}let l=z=>z*z*z*(z*(z*6-15)+10),c=(z,tt,rt)=>z+(tt-z)*rt,h=(z,tt,rt,pt)=>{let zt=z<8?tt:rt,It=z<4?rt:z===12||z===14?tt:pt;return(z&1?-zt:zt)+(z&2?-It:It)};function d(z,tt,rt){let pt=Math.floor(z)&255,zt=Math.floor(tt)&255,It=Math.floor(rt)&255;z-=Math.floor(z),tt-=Math.floor(tt),rt-=Math.floor(rt);let ne=l(z),be=l(tt),se=l(rt),oe=a[pt]+zt,ee=a[oe]+It,$e=a[oe+1]+It,Me=a[pt+1]+zt,Ye=a[Me]+It,cn=a[Me+1]+It;return c(c(c(h(a[ee]&15,z,tt,rt),h(a[Ye]&15,z-1,tt,rt),ne),c(h(a[$e]&15,z,tt-1,rt),h(a[cn]&15,z-1,tt-1,rt),ne),be),c(c(h(a[ee+1]&15,z,tt,rt-1),h(a[Ye+1]&15,z-1,tt,rt-1),ne),c(h(a[$e+1]&15,z,tt-1,rt-1),h(a[cn+1]&15,z-1,tt-1,rt-1),ne),be),se)}function u(){let z,tt,rt,pt;do z=o()*2-1,tt=o()*2-1,rt=o()*2-1,pt=z*z+tt*tt+rt*rt;while(pt>1||pt<1e-4);return pt=Math.sqrt(pt),[z/pt,tt/pt,rt/pt]}function f(){for(let z=0;z<40;z++){let tt=u(),rt=tt[0]>=0?1:-1,pt=tt[0]*.9+rt*.075,zt=tt[1]*.8,It=tt[2]*1.16;zt<-.22&&(zt=-.22+(zt+.22)*.5);let ne=Math.exp(-((zt+.22)**2)/.05)*Math.exp(-((It-.2)**2)/.22);pt+=rt*.12*ne*Math.abs(tt[0]),zt-=.1*ne*Math.abs(tt[0]),It>0&&zt>0&&(zt+=.07*It);let be=d(pt*3.3+7,zt*3.3,It*3.3),se=1-Math.abs(be);if(o()>.28+.72*se*se)continue;let oe=1+.09*(se*se-.5),ee=Math.exp(-(pt*pt)/.006)*Math.max(0,zt)*.18;return[pt*oe,zt*oe-ee,It*oe,se]}return[0,0,0,0]}let p=i?.5:1,_=Math.round(15e3*p),m=Math.round(3200*p),g=Math.round(1300*p),M=Math.round(500*p),A=Math.round(2600*p),v={cyan:new Ct.Color("#00E1FF"),blue:new Ct.Color("#1E8BFF"),purple:new Ct.Color("#7B5CFF"),orange:new Ct.Color("#FF8A2B"),white:new Ct.Color("#CFF8FF")},S=[],b=[],E=[],y=[],T=(z,tt,rt,pt,zt)=>{S.push(z,tt,rt),b.push(pt.r,pt.g,pt.b),E.push(zt)};for(let z=0;z<_;z++){let[tt,rt,pt,zt]=f();y.push([tt,rt,pt]);let It=v.blue.clone().lerp(v.cyan,Math.min(1,zt*1.1)).lerp(v.purple,Math.max(0,-rt-.05)*.9);o()<.04&&It.copy(v.white),T(tt,rt,pt,It,o())}for(let z=0;z<m;z++){let[tt,rt,pt]=f(),zt=.2+.72*Math.pow(o(),.7),It=v.blue.clone().lerp(v.purple,o()*.6);T(tt*zt,rt*zt,pt*zt,It,o())}for(let z=0;z<g;z++){let tt=u(),rt=tt[0]*.52,pt=tt[1]*.26-.42,zt=tt[2]*.34-.78,It=Math.abs(Math.sin(pt*58));if(o()>.35+.65*It){z--;continue}T(rt,pt,zt,v.purple.clone().lerp(v.cyan,.35*o()),o())}for(let z=0;z<M;z++){let tt=o(),rt=o()*Math.PI*2,pt=(.14-.05*tt)*Math.sqrt(o());T(Math.cos(rt)*pt,-.38-tt*.62,-.22-tt*.12+Math.sin(rt)*pt,v.cyan.clone().lerp(v.blue,tt),o())}let P=[],D=[],L=[],W=Math.round(2600*p);for(let z=0;z<W;z++){let tt=y[Math.floor(o()*y.length)],rt=null,pt=1e9;for(let It=0;It<40;It++){let ne=y[Math.floor(o()*y.length)],be=(tt[0]-ne[0])**2+(tt[1]-ne[1])**2+(tt[2]-ne[2])**2;be>.004&&be<pt&&(pt=be,rt=ne)}if(!rt||pt>.16)continue;let zt=o();P.push(...tt,...rt),D.push(0,1),L.push(zt,zt)}ti.neurons=S.length/3,ti.links=P.length/6;let I=`
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
  vec3 breathe(vec3 p,float t){ return p*(1.0+0.022*sin(t*1.25+p.y*2.2+p.z*1.3)); }`,G=I+`
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
  }`,J=`
  uniform float uAlpha;
  varying vec3 vCol; varying float vGlow;
  void main(){
    vec2 c=gl_PointCoord-0.5; float d=length(c); if(d>0.5) discard;
    float a=smoothstep(0.5,0.0,d); a*=a;
    gl_FragColor=vec4(vCol*vGlow, a*uAlpha);
  }`,H=Math.min(devicePixelRatio||1,i?1.5:1.75);function et(z){return new Ct.ShaderMaterial({uniforms:{uTime:{value:0},uPix:{value:H},uSize:{value:i?14:13},uMouse:{value:new Ct.Vector3(9,9,9)},uMouseAmt:{value:0},uUncoil:{value:r?1:0},uTrav:{value:z?1:0},uAlpha:{value:.85}},vertexShader:G,fragmentShader:J,transparent:!0,depthWrite:!1,blending:Ct.AdditiveBlending})}let Y=new Ct.Group;e.add(Y);let R=new Ct.Group;Y.add(R),R.rotation.set(.12,-.7,0);let j=new Ct.BufferGeometry;j.setAttribute("position",new Ct.Float32BufferAttribute(S,3)),j.setAttribute("color",new Ct.Float32BufferAttribute(b,3)),j.setAttribute("aSeed",new Ct.Float32BufferAttribute(E,1)),j.setAttribute("aTarget",new Ct.Float32BufferAttribute(new Float32Array(S.length),3)),j.setAttribute("aT",new Ct.Float32BufferAttribute(new Float32Array(E.length),1));let At=et(!1);R.add(new Ct.Points(j,At));let Rt=new Ct.BufferGeometry;Rt.setAttribute("position",new Ct.Float32BufferAttribute(P,3)),Rt.setAttribute("aLT",new Ct.Float32BufferAttribute(D,1)),Rt.setAttribute("aPh",new Ct.Float32BufferAttribute(L,1));let Jt=new Ct.ShaderMaterial({uniforms:{uTime:{value:0}},vertexShader:I+`uniform float uTime; attribute float aLT; attribute float aPh; varying float vLT; varying float vPh;
      void main(){ vLT=aLT; vPh=aPh; gl_Position=projectionMatrix*modelViewMatrix*vec4(breathe(position,uTime),1.0); }`,fragmentShader:`uniform float uTime; varying float vLT; varying float vPh;
      void main(){ float tr=fract(uTime*0.45+vPh*7.0); float b=smoothstep(0.18,0.0,abs(vLT-tr));
        gl_FragColor=vec4(mix(vec3(0.12,0.55,1.0),vec3(0.75,0.98,1.0),b), 0.05+b*0.5); }`,transparent:!0,depthWrite:!1,blending:Ct.AdditiveBlending});R.add(new Ct.LineSegments(Rt,Jt));let Ht=new Ct.Group;R.add(Ht);let Qt=new Ct.LineBasicMaterial({color:57855,transparent:!0,opacity:.16,blending:Ct.AdditiveBlending,depthWrite:!1}),K=[],nt=[];for(let z=0;z<5;z++){let tt=-.22+z*.11,rt=.7-Math.abs(z-2)*.1,pt=new Ct.LineSegments(new Ct.EdgesGeometry(new Ct.BoxGeometry(rt,.05,.46)),Qt);pt.position.y=tt,Ht.add(pt);for(let zt=0;zt<6;zt++)K.push(-rt/2+.07+zt*.045,tt,.235),nt.push(o())}let O=new Ct.BufferGeometry;O.setAttribute("position",new Ct.Float32BufferAttribute(K,3)),O.setAttribute("aSeed",new Ct.Float32BufferAttribute(nt,1));let ut=new Ct.ShaderMaterial({uniforms:{uTime:{value:0},uPix:{value:H}},vertexShader:`uniform float uTime,uPix; attribute float aSeed; varying float vOn; varying float vS;
      void main(){ vS=aSeed; vOn=step(0.45,fract(sin(floor(uTime*3.0+aSeed*10.0)*12.9898+aSeed*78.233)*43758.5453));
        vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=16.0*uPix/max(0.5,-mv.z); gl_Position=projectionMatrix*mv; }`,fragmentShader:`varying float vOn; varying float vS; void main(){ float d=length(gl_PointCoord-0.5); if(d>0.5)discard;
      vec3 c = vS>0.82 ? vec3(1.0,0.54,0.17) : vec3(0.22,0.95,0.63); gl_FragColor=vec4(c*(0.35+vOn*1.4), smoothstep(0.5,0.1,d)); }`,transparent:!0,depthWrite:!1,blending:Ct.AdditiveBlending});Ht.add(new Ct.Points(O,ut));let at=document.createElement("canvas");at.width=at.height=128;let lt=at.getContext("2d"),_t=lt.createRadialGradient(64,64,0,64,64,64);_t.addColorStop(0,"rgba(80,200,255,0.55)"),_t.addColorStop(.35,"rgba(30,120,255,0.22)"),_t.addColorStop(1,"rgba(0,0,0,0)"),lt.fillStyle=_t,lt.fillRect(0,0,128,128);let Tt=new Ct.Sprite(new Ct.SpriteMaterial({map:new Ct.CanvasTexture(at),transparent:!0,depthWrite:!1,blending:Ct.AdditiveBlending,opacity:.55}));Tt.scale.set(4.2,3.6,1),Y.add(Tt);let Pt=new Ct.Vector3(0,-1,-.32),Xt=[{c:"#00E1FF",r:.02,end:[-6.8,-9.6,1.2],turn:0,ph:0},{c:"#00E1FF",r:.016,end:[6.9,-9.2,1],turn:1.4,ph:1.7},{c:"#00E1FF",r:.014,end:[.15,-11.5,.4],turn:2.6,ph:3.1},{c:"#1E8BFF",r:.022,end:[-4.2,-11,.8],turn:.7,ph:.9},{c:"#1E8BFF",r:.02,end:[4.4,-11.2,.9],turn:2,ph:2.4},{c:"#FF8A2B",r:.011,end:[-8.2,-7.4,.6],turn:3.3,ph:4.2,sata:!0},{c:"#FF8A2B",r:.011,end:[8.4,-7,.7],turn:4.4,ph:5,sata:!0},{c:"#7B5CFF",r:.015,end:[-2,-12,.3],turn:5.1,ph:.4},{c:"#7B5CFF",r:.015,end:[2.3,-12.2,.3],turn:5.8,ph:2.9}],V="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",te=`uniform vec3 uColor; uniform float uProg,uTime,uPhase; varying vec2 vUv;
    void main(){ if(vUv.x>uProg) discard;
      float head=smoothstep(0.035,0.0,uProg-vUv.x);
      float pulse=smoothstep(0.93,1.0,sin(vUv.x*42.0-uTime*4.0+uPhase));
      float fadeOut=smoothstep(1.0,0.82,vUv.x);
      float a=(0.42+pulse*0.5+head*0.9)*mix(0.6,1.0,fadeOut);
      gl_FragColor=vec4(uColor*(1.0+pulse*1.2+head*2.5), a); }`,ce=[],xe=[];Xt.forEach((z,tt)=>{let rt=[Pt.clone()];for(let se=1;se<=7;se++){let oe=z.turn+se*1.05,ee=.16+se*.035;rt.push(new Ct.Vector3(Math.cos(oe)*ee,-1-se*.11,-.32+Math.sin(oe)*ee))}let pt=new Ct.Vector3(...z.end),zt=new Ct.Vector3(pt.x*.32,-2.6+(pt.y+2.6)*.25,.35+pt.z*.4),It=new Ct.Vector3(pt.x*.72,-2.6+(pt.y+2.6)*.62,.5+pt.z*.7);rt.push(zt,It,pt);let ne=new Ct.CatmullRomCurve3(rt,!1,"centripetal");xe.push(ne);let be=se=>{let oe=new Ct.ShaderMaterial({uniforms:{uColor:{value:new Ct.Color(z.c)},uProg:{value:r?1:0},uTime:{value:0},uPhase:{value:z.ph}},vertexShader:V,fragmentShader:te,transparent:!0,depthWrite:!1,blending:Ct.AdditiveBlending}),ee=new Ct.Mesh(new Ct.TubeGeometry(se,i?140:260,z.r,6,!1),oe);Y.add(ee),ce.push({mesh:ee,m:oe,i:tt})};if(be(ne),z.sata){let se=ne.getPoints(80).map((oe,ee,$e)=>{let Me=ne.getTangent(ee/($e.length-1)),Ye=new Ct.Vector3(-Me.y,Me.x,0).normalize().multiplyScalar(.045);return oe.clone().add(Ye)});be(new Ct.CatmullRomCurve3(se,!1,"centripetal"))}});let $t=[],me=[],N=[],ye=[],bt=[];for(let z=0;z<A;z++){let tt=y[Math.floor(o()*y.length)],rt=.35+.4*o();$t.push(tt[0]*rt*.6,tt[1]*rt*.6-.55,tt[2]*rt*.6-.2);let pt=Math.floor(o()*xe.length),zt=Math.pow(o(),.85),It=xe[pt].getPointAt(zt);bt.push(It.x+(o()-.5)*.05,It.y+(o()-.5)*.05,It.z+(o()-.5)*.05);let ne=new Ct.Color(Xt[pt].c).lerp(v.white,.25*o());me.push(ne.r,ne.g,ne.b),N.push(o()),ye.push(zt)}let C=new Ct.BufferGeometry;C.setAttribute("position",new Ct.Float32BufferAttribute($t,3)),C.setAttribute("color",new Ct.Float32BufferAttribute(me,3)),C.setAttribute("aSeed",new Ct.Float32BufferAttribute(N,1)),C.setAttribute("aTarget",new Ct.Float32BufferAttribute(bt,3)),C.setAttribute("aT",new Ct.Float32BufferAttribute(ye,1));let x=et(!0);x.uniforms.uSize.value*=1.1,Y.add(new Ct.Points(C,x));let B=(z,tt,rt)=>new Ct.Vector3(z,tt,rt),X=new Ct.CatmullRomCurve3([B(0,.15,5.4),B(.55,-.35,6.2),B(.25,-2.8,7),B(0,-6.3,7.6)]),Q=new Ct.CatmullRomCurve3([B(0,0,0),B(0,-.45,0),B(0,-3.2,0),B(0,-7.4,0)]),gt=new Ct.Vector3,ft=new Ct.Vector3,it=new Ct.Vector2(9,9),ot=new Ct.Raycaster,Mt=new Ct.Sphere(new Ct.Vector3,1.35),Nt=new Ct.Vector3,St=!1;addEventListener("pointermove",z=>{it.set(z.clientX/innerWidth*2-1,-(z.clientY/innerHeight)*2+1),St=!0},{passive:!0}),document.addEventListener("pointerleave",()=>{St=!1});let vt=1,mt=1,Bt=!0;function Zt(){let z=innerWidth,tt=innerHeight;t.setPixelRatio(H),t.setSize(z,tt,!1),vt=z/tt,n.aspect=vt,n.updateProjectionMatrix(),Bt=vt>1.15&&z>760;let rt=Math.tan(Ct.MathUtils.degToRad(22.5))*vt;mt=Bt?Math.max(1,1.32/(rt*5.4)):Math.max(1.12,1.38/(rt*5.4)),r&&ht(0)}addEventListener("resize",Zt);let U=new Ct.Clock,xt=0,st=0,yt=0,wt=0,ct=performance.now(),dt=0;function ht(z){let tt=ti.p,rt=ti.u,pt=Ct.MathUtils.smoothstep(tt,0,.32);Y.position.x=Bt?1.45*(1-pt):0,Y.position.y=Bt?0:.95*(1-pt),R.rotation.y+=z*.09*(1-.65*rt),R.rotation.x=.12+Math.sin(xt*.3)*.05,X.getPoint(Math.min(tt,.999),gt),Q.getPoint(Math.min(tt,.999),ft),n.position.set(gt.x*mt,gt.y,gt.z*mt),n.lookAt(ft);let zt=0;St&&!r&&tt<.5&&(ot.setFromCamera(it,n),Mt.center.copy(Y.position).add(new Ct.Vector3(0,0,0)),ot.ray.intersectSphere(Mt,Nt)&&(R.worldToLocal(At.uniforms.uMouse.value.copy(Nt)),zt=1)),st+=(zt-st)*Math.min(1,z*5),At.uniforms.uMouseAmt.value=st;for(let It of[At,x])It.uniforms.uTime.value=xt,It.uniforms.uUncoil.value=rt;Jt.uniforms.uTime.value=xt,ut.uniforms.uTime.value=xt,ce.forEach(It=>{It.m.uniforms.uTime.value=xt,It.m.uniforms.uProg.value=Math.min(1,Math.max(0,rt*1.25-It.i*.025))}),Tt.material.opacity=.55*(1-.5*rt),t.render(e,n),ti.frames++}function Gt(z){requestAnimationFrame(Gt);let tt=ti.fade;if(gl.style.opacity=tt.toFixed(3),document.hidden||tt<.02){ct=z;return}if(tt<.3&&(dt=(dt+1)%2))return;let rt=Math.min(.05,(z-ct)/1e3);ct=z,xt+=rt;let pt=performance.now();ht(rt),yt+=rt,wt++,yt>.5&&(ti.fps=wt/yt,ti.frameMs=1e3*yt/wt,yt=0,wt=0)}Zt(),r?(ti.p=0,ti.u=1,ht(0),ti.fps=0):requestAnimationFrame(Gt)}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.0
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
