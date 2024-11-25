"use strict";exports.id=593,exports.ids=[593],exports.modules={187:(e,t,n)=>{n.d(t,{db:()=>c});var r=n(324),a=n(58),l=n(668),o=(0,r.initializeApp)({apiKey:"AIzaSyCM6ypNJWsTPF33wsr6n1gAGqDx0haEoSQ",authDomain:"oyebanjivictor-f4d86.firebaseapp.com",projectId:"oyebanjivictor-f4d86",storageBucket:"oyebanjivictor-f4d86.appspot.com",messagingSenderId:"388301069645",appId:"1:388301069645:web:8538f8df560b433db3ab04",measurementId:"G-ZCJNPC70E1"}),c=(0,a.getFirestore)(o);(0,l.getStorage)(),(0,l.getStorage)(o)},593:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var r=n(689),a=n.n(r),l=n(213),o=n(72),c=n(197),i=n(466),m=n(602),s=n(58),d=n(187),u=n(146),p=n(692),f=n(915),y=n(638);function g(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||h(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){c=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw a}}return l}}(e,t)||h(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const b=function(){var e=document.body,t=E((0,r.useState)("All"),2),n=t[0],h=t[1],v=function(e){Array.from(document.querySelectorAll(".aCategories p")).map((function(e){return e.classList.remove("selectedCat")})),e.target.classList.add("selectedCat"),h(e.target.innerHTML)},b=E((0,r.useState)(10),2),w=b[0],S=b[1],A=E((0,r.useState)(10),2),C=A[0],I=A[1],N=E((0,r.useState)(10),2),x=N[0],j=N[1],k=E(a().useState(!1),2),T=k[0],D=k[1],F=E((0,r.useState)([]),2),O=F[0],M=F[1],L=E((0,r.useState)([]),2),B=L[0],V=L[1],R=E((0,r.useState)([]),2),U=R[0],Z=R[1],G=E((0,r.useState)([]),2),H=G[0],q=G[1],z=(0,s.doc)(d.db,"articles","articleAbout");(0,r.useEffect)((function(){var e=(0,s.query)((0,s.collection)(d.db,"articles"),(0,s.where)("posted","==",!0),(0,s.orderBy)("postedDate","desc"));(0,s.onSnapshot)(e,(function(e){V(e.docs.map((function(e){return{id:e.id,data:e.data()}}))),M(e.docs.map((function(e){return{id:e.id,data:e.data()}})))}));var t=(0,s.query)((0,s.collection)(d.db,"articles"),(0,s.where)("posted","==",!0),(0,s.where)("featured","==",!0),(0,s.orderBy)("postedDate","desc"));(0,s.onSnapshot)(t,(function(e){Z(e.docs.map((function(e){return{id:e.id,data:e.data()}})))})),(0,s.onSnapshot)(z,(function(e){q(e.data())}))}),[]),(0,r.useEffect)((function(){B&&("All"===n?(S(C),M((function(){return g(B)}))):"Featured"===n&&(S(x),M((function(){return g(U)}))))}),[n]);var K=E((0,r.useState)(""),2),P=K[0],Y=K[1];return a().createElement("div",{className:"articleCont",onLoad:function(){e.style.backgroundColor="#f5f6fa"}},a().createElement(y.Helmet,{prioritizeSeoTags:!0,encodeSpecialCharacters:!0},a().createElement("html",{lang:"en"}),a().createElement("body",{"data-new-gr-c-s-check-loaded":"14.1078.0","data-gr-ext-installed":!0}),a().createElement("meta",{charset:"utf-8"}),a().createElement("link",{rel:"icon",href:"/favicon.ico"}),a().createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),a().createElement("meta",{name:"theme-color",content:"#4E5E72"}),a().createElement("link",{rel:"manifest",href:"/manifest.json"}),a().createElement("link",{rel:"apple-touch-icon",href:"/apple-touch-icon.png"}),a().createElement("link",{rel:"canonical",href:"https://article.victoroyebanji.com/"}),a().createElement("link",{rel:"preconnect",href:"https://oyebanjivictor-f4d86.firebaseapp.com",crossorigin:!0}),a().createElement("link",{rel:"dns-prefetch",href:"https://oyebanjivictor-f4d86.firebaseapp.com"}),a().createElement("link",{rel:"preconnect",href:"https://firebase.googleapis.com",crossorigin:!0}),a().createElement("link",{rel:"dns-prefetch",href:"https://firebase.googleapis.com"}),a().createElement("link",{rel:"preconnect",href:"https://apis.google.com",crossorigin:!0}),a().createElement("link",{rel:"dns-prefetch",href:"https://apis.google.com"}),a().createElement("title",null,"Articles | Victor Oyebanji"),a().createElement("meta",{name:"title",content:"Articles | Victor Oyebanji"}),a().createElement("meta",{name:"description",content:H.pageDescription}),a().createElement("meta",{property:"og:type",content:"website"}),a().createElement("meta",{property:"og:url",content:window.location.href}),a().createElement("meta",{property:"og:title",content:"Articles | Victor Oyebanji"}),a().createElement("meta",{property:"og:description",content:H.pageDescription}),a().createElement("meta",{property:"og:image",content:"".concat(window.location.href,"img/articleMeta.png")}),a().createElement("meta",{property:"twitter:card",content:"summary_large_image"}),a().createElement("meta",{property:"twitter:url",content:window.location.href}),a().createElement("meta",{property:"twitter:title",content:"Articles | Victor Oyebanji"}),a().createElement("meta",{property:"twitter:description",content:H.pageDescription}),a().createElement("meta",{property:"twitter:image",content:"".concat(window.location.href,"img/articleMeta.png")}),a().createElement("meta",{property:"og:site_name",content:"Victor Oyebanji"}),a().createElement("meta",{name:"twitter:image:alt",content:"Articles"}),a().createElement("meta",{name:"keywords",content:H.pageKeywords}),a().createElement("meta",{name:"author",content:"Victor Oyebanji"}),a().createElement("meta",{name:"robots",content:"index,follow,archive"}),a().createElement("style",{type:"text/css"},"\n        body {\n            background-color: #f5f6fa;\n        }\n    ")),a().createElement("div",{className:"articles"},a().createElement(l.Z,null),a().createElement("div",{className:"artiHeadStrip"},a().createElement("h1",null,"ARTICLE"),a().createElement("div",{className:"aCategories"},a().createElement("p",{onClick:v,className:"selectedCat",style:{cursor:"pointer"}},"All"),a().createElement("p",{onClick:v,style:{cursor:"pointer"}},"Featured"))),a().createElement("div",{className:"searchInput"},a().createElement(p.Input,{onChange:function(e){return Y(e.target.value.toUpperCase())},placeholder:"article search",onKeyUp:function(){var e,t=document.getElementsByClassName("artiFGrid"),n=document.getElementsByClassName("artiInfo");for(e=0;e<n.length;e++){var r=n[e].getElementsByTagName("h2")[0];(r.textContent||r.innerText).toUpperCase().indexOf(P)>-1?t[e].style.display="":t[e].style.display="none"}},id:"input-with-icon-adornment",startAdornment:a().createElement(p.InputAdornment,{position:"start"},a().createElement(f.FindInPage,null))})),a().createElement("div",{className:"artiShoCont"},a().createElement("div",{className:"allArti"},O.slice(0,w).map((function(e){var t,n,r,l,o;return a().createElement("div",{className:"artiFGrid"},a().createElement("div",{className:"artiImg",style:{backgroundImage:"url(".concat(null==e||null===(t=e.data)||void 0===t?void 0:t.articleHeaderImg,")")}},(null==e||null===(n=e.data)||void 0===n?void 0:n.featured)&&a().createElement("p",{className:"featured"},"Featured")),a().createElement("div",{className:"artiInfo"},a().createElement("h2",null,null==e||null===(r=e.data)||void 0===r?void 0:r.title),a().createElement("p",null,null==e||null===(l=e.data)||void 0===l?void 0:l.articleDescription),a().createElement("p",null,(0,u.format)(new Date(null==e||null===(o=e.data)||void 0===o?void 0:o.postedDate.toDate()),"MMM dd yyyy")),a().createElement("p",null,a().createElement("a",{href:"/posts/".concat(null==e?void 0:e.id)},"Read Article",a().createElement(c.FontAwesomeIcon,{icon:i.faArrowRight})))))}))),a().createElement("div",null,O.length>w&&a().createElement(o.LoadingButton,{className:"loadMore",size:"small",onClick:function(){D(!0),setTimeout((function(){return D(!1)}),1e3),O.length>w&&(S(w+8),"All"===n?I(w+8):"Featured"===n&&j(w+8))},loading:T,loadingIndicator:"Loading",variant:"contained"},"Load more"))),a().createElement(m.Z,null)))}},602:(e,t,n)=>{n.d(t,{Z:()=>m});var r=n(689),a=n.n(r),l=n(692),o=n(58),c=n(187);function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const m=function(){var e,t,n=(e=(0,r.useState)({}),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){c=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=n[0],s=n[1],d=(0,o.doc)(c.db,"contact","contactInfo");(0,r.useEffect)((function(){(0,o.onSnapshot)(d,(function(e){s(e.data())}))}),[]);var u=function(){return a().createElement("div",null,a().createElement(l.Typography,{variant:"body2",color:"text.secondary"},"Copyright © ",a().createElement(l.Link,{color:"inherit",href:"https://wa.me/message/SRZOYIUCMQYVO1"},"Aplus Designs")," ",(new Date).getFullYear(),"."))};return a().createElement("div",{className:"aFooterCont"},a().createElement("div",{className:"aFooter"},a().createElement("div",{className:"logoSection",style:{display:"flex",height:"100%",alignItems:"center"}},a().createElement("div",{style:{width:"25px",marginRight:"3px"}},a().createElement("a",{href:"/"},a().createElement("img",{src:"/img/logo.png",width:"100%",alt:"logo"}))),a().createElement("div",{style:{width:"150px"}},a().createElement("a",{href:"/"},a().createElement("img",{src:"/img/logoText.png",width:"100%",alt:"logoText"})))),a().createElement("ul",null,a().createElement("li",{id:"footContact"},"Contact"),a().createElement("li",null,a().createElement("span",{style:{display:"block"}},a().createElement("a",{href:"mailto:".concat(m.email)},m.email)),a().createElement("span",{style:{display:"block"}},m.phoneNumber)))),a().createElement("div",{className:"lineSeparator"}),a().createElement(u,null))}},213:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(689),a=n.n(r);const l=function(){return a().createElement("div",{className:"articleNav"},a().createElement("div",{className:"aNavIcon"},a().createElement("div",{className:"small logoSection",style:{display:"flex",height:"100%",alignItems:"center",flexGrow:1}},a().createElement("div",{style:{width:"25px",marginRight:"3px"}},a().createElement("a",{href:"/"},a().createElement("img",{src:"/img/logo.png",width:"100%",alt:"logo"}))),a().createElement("div",{style:{width:"150px"}},a().createElement("a",{href:"/"},a().createElement("img",{src:"/img/logoText.png",width:"100%",alt:"logoText"}))))),a().createElement("div",{className:"aNavLiCont"},a().createElement("ul",null,a().createElement("li",null,a().createElement("a",{href:"https://victoroyebanji.com"},"Home")),a().createElement("li",null,a().createElement("a",{style:{color:"rgb(84, 87, 182)"},href:"/"},"Article")),a().createElement("li",null,a().createElement("a",{href:"https://victoroyebanji.com/contact"},"Contact")))))}}};