function B(){}function J(t,n){for(const e in n)t[e]=n[e];return t}function q(t){return t()}function k(){return Object.create(null)}function p(t){t.forEach(q)}function K(t){return typeof t=="function"}function ft(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function Q(t){return Object.keys(t).length===0}function at(t,n,e,i){if(t){const r=O(t,n,e,i);return t[0](r)}}function O(t,n,e,i){return t[1]&&i?J(e.ctx.slice(),t[1](i(n))):e.ctx}function _t(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(n.dirty.length,r.length);for(let s=0;s<c;s+=1)u[s]=n.dirty[s]|r[s];return u}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,u){if(r){const c=O(n,e,i,u);t.p(c,r)}}function ht(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function mt(t){return t==null?"":t}let $=!1;function R(){$=!0}function W(){$=!1}function U(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<n.length;o++){const a=n[o];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const o=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=o?r+1:U(1,r,y=>n[e[y]].claim_order,o))-1;i[l]=e[a]+1;const f=a+1;e[f]=l,r=Math.max(f,r)}const u=[],c=[];let s=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(u.push(n[l-1]);s>=l;s--)c.push(n[s]);s--}for(;s>=0;s--)c.push(n[s]);u.reverse(),c.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<c.length;l++){for(;o<u.length&&c[l].claim_order>=u[o].claim_order;)o++;const a=o<u.length?u[o]:null;t.insertBefore(c[l],a)}}function X(t,n){if($){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function Y(t,n,e){t.insertBefore(n,e||null)}function Z(t,n,e){$&&!e?X(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function w(t){t.parentNode.removeChild(t)}function pt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function P(t){return document.createElement(t)}function tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function yt(){return v(" ")}function gt(){return v("")}function xt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function bt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function nt(t){return Array.from(t.childNodes)}function D(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function G(t,n,e,i,r=!1){D(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(n(s)){const l=e(s);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function et(t,n,e,i){return G(t,r=>r.nodeName===n,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];e[s.name]||u.push(s.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(n))}function wt(t,n,e){return et(t,n,e,P)}function it(t,n){return G(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>v(n),!0)}function $t(t){return it(t," ")}function M(t,n,e){for(let i=e;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===n)return i}return t.length}function Et(t,n){const e=M(t,"HTML_TAG_START",0),i=M(t,"HTML_TAG_END",e);if(e===i)return new C(void 0,n);D(t);const r=t.splice(e,i-e+1);w(r[0]),w(r[r.length-1]);const u=r.slice(1,r.length-1);for(const c of u)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new C(u,n)}function At(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Nt(t,n){t.value=n==null?"":n}function vt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Tt(t,n=document.body){return Array.from(n.querySelectorAll(t))}class rt{constructor(n=!1){this.is_svg=!1,this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=tt(e.nodeName):this.e=P(e.nodeName),this.t=e,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)Y(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(w)}}class C extends rt{constructor(n,e=!1){super(e),this.e=this.n=null,this.l=n}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let e=0;e<this.n.length;e+=1)Z(this.t,this.n[e],n)}}let m;function h(t){m=t}function T(){if(!m)throw new Error("Function called outside component initialization");return m}function St(t){T().$$.on_mount.push(t)}function jt(t){T().$$.after_update.push(t)}function kt(t,n){return T().$$.context.set(t,n),n}const d=[],H=[],x=[],L=[],z=Promise.resolve();let A=!1;function F(){A||(A=!0,z.then(I))}function Mt(){return F(),z}function N(t){x.push(t)}const E=new Set;let g=0;function I(){const t=m;do{for(;g<d.length;){const n=d[g];g++,h(n),lt(n.$$)}for(h(null),d.length=0,g=0;H.length;)H.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];E.has(e)||(E.add(e),e())}x.length=0}while(d.length);for(;L.length;)L.pop()();A=!1,E.clear(),h(t)}function lt(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const b=new Set;let _;function Ct(){_={r:0,c:[],p:_}}function Ht(){_.r||p(_.c),_=_.p}function ct(t,n){t&&t.i&&(b.delete(t),t.i(n))}function Lt(t,n,e,i){if(t&&t.o){if(b.has(t))return;b.add(t),_.c.push(()=>{b.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Bt(t,n){const e={},i={},r={$$scope:1};let u=t.length;for(;u--;){const c=t[u],s=n[u];if(s){for(const l in c)l in s||(i[l]=1);for(const l in s)r[l]||(e[l]=s[l],r[l]=1);t[u]=s}else for(const l in c)r[l]=1}for(const c in i)c in e||(e[c]=void 0);return e}function qt(t){return typeof t=="object"&&t!==null?t:{}}function Ot(t){t&&t.c()}function Pt(t,n){t&&t.l(n)}function st(t,n,e,i){const{fragment:r,on_mount:u,on_destroy:c,after_update:s}=t.$$;r&&r.m(n,e),i||N(()=>{const l=u.map(q).filter(K);c?c.push(...l):p(l),t.$$.on_mount=[]}),s.forEach(N)}function ot(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(d.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Dt(t,n,e,i,r,u,c,s=[-1]){const l=m;h(t);const o=t.$$={fragment:null,ctx:null,props:u,update:B,not_equal:r,bound:k(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(l?l.$$.context:[])),callbacks:k(),dirty:s,skip_bound:!1,root:n.target||l.$$.root};c&&c(o.root);let a=!1;if(o.ctx=e?e(t,n.props||{},(f,y,...S)=>{const j=S.length?S[0]:y;return o.ctx&&r(o.ctx[f],o.ctx[f]=j)&&(!o.skip_bound&&o.bound[f]&&o.bound[f](j),a&&ut(t,f)),y}):[],o.update(),a=!0,p(o.before_update),o.fragment=i?i(o.ctx):!1,n.target){if(n.hydrate){R();const f=nt(n.target);o.fragment&&o.fragment.l(f),f.forEach(w)}else o.fragment&&o.fragment.c();n.intro&&ct(t.$$.fragment),st(t,n.target,n.anchor,n.customElement),W(),I()}h(l)}class Gt{$destroy(){ot(this,1),this.$destroy=B}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!Q(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{Bt as A,qt as B,ot as C,J as D,Mt as E,at as F,Tt as G,X as H,dt as I,ht as J,_t as K,C as L,Et as M,pt as N,Nt as O,xt as P,mt as Q,Gt as S,yt as a,Z as b,$t as c,Ht as d,gt as e,ct as f,Ct as g,w as h,Dt as i,kt as j,jt as k,P as l,wt as m,B as n,St as o,nt as p,bt as q,vt as r,ft as s,Lt as t,v as u,it as v,At as w,Ot as x,Pt as y,st as z};
