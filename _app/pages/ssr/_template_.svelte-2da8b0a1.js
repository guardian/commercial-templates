import{S as R,i as T,s as W,w as S,k as g,e as D,t as P,x as j,m as b,c as E,a as G,h as q,d as u,y as k,g as h,G as B,j as H,q as v,o as $,B as C}from"../../chunks/vendor-0b5888dd.js";import{b as U}from"../../chunks/paths-4b3c6e7e.js";import{W as d,P as z,C as A}from"../../chunks/Previews-27e506bd.js";function F(a){let n,m,f,r,i,l,t,_,o,p;return n=new d({}),t=new z({props:{template:a[0],html:a[1],css:a[2],props:a[3]}}),o=new A({props:{html:a[1],css:a[2]}}),{c(){S(n.$$.fragment),m=g(),f=D("h1"),r=P("SSR Static Template: "),i=P(a[0]),l=g(),S(t.$$.fragment),_=g(),S(o.$$.fragment)},l(e){j(n.$$.fragment,e),m=b(e),f=E(e,"H1",{});var s=G(f);r=q(s,"SSR Static Template: "),i=q(s,a[0]),s.forEach(u),l=b(e),j(t.$$.fragment,e),_=b(e),j(o.$$.fragment,e)},m(e,s){k(n,e,s),h(e,m,s),h(e,f,s),B(f,r),B(f,i),h(e,l,s),k(t,e,s),h(e,_,s),k(o,e,s),p=!0},p(e,[s]){(!p||s&1)&&H(i,e[0]);const c={};s&1&&(c.template=e[0]),s&2&&(c.html=e[1]),s&4&&(c.css=e[2]),s&8&&(c.props=e[3]),t.$set(c);const w={};s&2&&(w.html=e[1]),s&4&&(w.css=e[2]),o.$set(w)},i(e){p||(v(n.$$.fragment,e),v(t.$$.fragment,e),v(o.$$.fragment,e),p=!0)},o(e){$(n.$$.fragment,e),$(t.$$.fragment,e),$(o.$$.fragment,e),p=!1},d(e){C(n,e),e&&u(m),e&&u(f),e&&u(l),C(t,e),e&&u(_),C(o,e)}}}const M=async({params:a,fetch:n})=>{const{template:m}=a,f=`${U}/ssr/${m}.json`,{html:r,css:i,props:l}=await n(f).then(t=>t.json());return{props:{template:m,html:r,css:i,props:l}}};function I(a,n,m){let{template:f}=n,{html:r}=n,{css:i}=n,{props:l}=n;return a.$$set=t=>{"template"in t&&m(0,f=t.template),"html"in t&&m(1,r=t.html),"css"in t&&m(2,i=t.css),"props"in t&&m(3,l=t.props)},[f,r,i,l]}class N extends R{constructor(n){super();T(this,n,I,F,W,{template:0,html:1,css:2,props:3})}}export{N as default,M as load};
