import{S as W,i as D,s as E,w as k,k as b,e as O,t as q,O as U,x as H,m as j,c as d,a as z,h as B,d as u,P as A,y as P,g as w,H as R,j as F,q as v,o as C,B as T}from"../../chunks/vendor-769b7e84.js";import{b as G}from"../../chunks/paths-4b3c6e7e.js";import{W as I,P as J,C as K}from"../../chunks/Previews-efc5bddb.js";function L(a){let n,m,i,o,l,r,f,s,p,S,c,_;return n=new I({}),p=new J({props:{template:a[0],html:a[1],css:a[2],props:a[3]}}),c=new K({props:{html:a[1],css:a[2]}}),{c(){k(n.$$.fragment),m=b(),i=O("h1"),o=q("SSR Static Template: "),l=q(a[0]),r=b(),f=new U,s=b(),k(p.$$.fragment),S=b(),k(c.$$.fragment),this.h()},l(e){H(n.$$.fragment,e),m=j(e),i=d(e,"H1",{});var t=z(i);o=B(t,"SSR Static Template: "),l=B(t,a[0]),t.forEach(u),r=j(e),f=A(e),s=j(e),H(p.$$.fragment,e),S=j(e),H(c.$$.fragment,e),this.h()},h(){f.a=s},m(e,t){P(n,e,t),w(e,m,t),w(e,i,t),R(i,o),R(i,l),w(e,r,t),f.m(a[4],e,t),w(e,s,t),P(p,e,t),w(e,S,t),P(c,e,t),_=!0},p(e,[t]){(!_||t&1)&&F(l,e[0]),(!_||t&16)&&f.p(e[4]);const h={};t&1&&(h.template=e[0]),t&2&&(h.html=e[1]),t&4&&(h.css=e[2]),t&8&&(h.props=e[3]),p.$set(h);const g={};t&2&&(g.html=e[1]),t&4&&(g.css=e[2]),c.$set(g)},i(e){_||(v(n.$$.fragment,e),v(p.$$.fragment,e),v(c.$$.fragment,e),_=!0)},o(e){C(n.$$.fragment,e),C(p.$$.fragment,e),C(c.$$.fragment,e),_=!1},d(e){T(n,e),e&&u(m),e&&u(i),e&&u(r),e&&f.d(),e&&u(s),T(p,e),e&&u(S),T(c,e)}}}const X=async({params:a,fetch:n})=>{const{template:m}=a,i=`${G}/ssr/${m}.json`,{html:o,css:l,props:r,description:f}=await n(i).then(s=>s.json());return{props:{template:m,html:o,css:l,props:r,description:f}}};function M(a,n,m){let{template:i}=n,{html:o}=n,{css:l}=n,{props:r}=n,{description:f}=n;return a.$$set=s=>{"template"in s&&m(0,i=s.template),"html"in s&&m(1,o=s.html),"css"in s&&m(2,l=s.css),"props"in s&&m(3,r=s.props),"description"in s&&m(4,f=s.description)},[i,o,l,r,f]}class Y extends W{constructor(n){super();D(this,n,M,L,E,{template:0,html:1,css:2,props:3,description:4})}}export{Y as default,X as load};
