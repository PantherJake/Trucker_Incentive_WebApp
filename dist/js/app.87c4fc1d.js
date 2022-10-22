(function(){var e={1766:function(e,n,t){var r={"./amplify-amazon-button_5.entry.js":[7130,458,130],"./amplify-auth-container.entry.js":[6808,808],"./amplify-auth-fields_9.entry.js":[1031,31],"./amplify-authenticator.entry.js":[6285,458,285],"./amplify-button_3.entry.js":[6949,949],"./amplify-chatbot.entry.js":[1654,654],"./amplify-checkbox.entry.js":[5675,675],"./amplify-confirm-sign-in_7.entry.js":[6124,458,124],"./amplify-container.entry.js":[6380,380],"./amplify-federated-buttons_2.entry.js":[3063,458,63],"./amplify-federated-sign-in.entry.js":[1308,308],"./amplify-form-field_4.entry.js":[9848,458,848],"./amplify-greetings.entry.js":[2753,458,753],"./amplify-icon-button.entry.js":[1280,435],"./amplify-icon.entry.js":[1078,78],"./amplify-link.entry.js":[1550,550],"./amplify-nav_2.entry.js":[7361,458,361],"./amplify-photo-picker.entry.js":[2217,217],"./amplify-picker.entry.js":[5188,188],"./amplify-radio-button_3.entry.js":[3973,458,973],"./amplify-s3-album.entry.js":[778,778],"./amplify-s3-image-picker.entry.js":[602,602],"./amplify-s3-image.entry.js":[3286,286],"./amplify-s3-text-picker.entry.js":[7288,288],"./amplify-s3-text.entry.js":[3722,722],"./amplify-select-mfa-type.entry.js":[1724,724],"./amplify-sign-in-button.entry.js":[280,280],"./amplify-tooltip.entry.js":[289,289]};function o(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],o=n[0];return Promise.all(n.slice(1).map(t.e)).then((function(){return t(o)}))}o.keys=function(){return Object.keys(r)},o.id=1766,e.exports=o},1594:function(e,n,t){"use strict";var r=t(9242),o=t(3396);function a(e,n,t,r,a,i){const c=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(c)])}var i={name:"App"},c=t(89);const f=(0,c.Z)(i,[["render",a]]);var u=f,s=t(3282),d=t(4082);const l={aws_project_region:"us-east-1",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_ARYFQff63",aws_user_pools_web_client_id:"7k6j1ic1uatb97m22ffjqqksfj",oauth:{},aws_cognito_username_attributes:[],aws_cognito_social_providers:[],aws_cognito_signup_attributes:["GIVEN_NAME","FAMILY_NAME","MIDDLE_NAME","PHONE_NUMBER"],aws_cognito_mfa_configuration:"OFF",aws_cognito_mfa_types:[],aws_cognito_password_protection_settings:{passwordPolicyMinLength:8,passwordPolicyCharacters:["REQUIRES_LOWERCASE","REQUIRES_UPPERCASE","REQUIRES_NUMBERS","REQUIRES_SYMBOLS"]},aws_cognito_verification_mechanisms:["EMAIL"]};var p=l,m=t(9913);(0,m.m)().then((()=>{(0,m.q)(window)})),d["default"].configure(p),(0,r.ri)(u).use(s.Z).mount("#app")},3282:function(e,n,t){"use strict";t.d(n,{Z:function(){return g}});var r=t(3396),o=t.p+"img/appLogo.8510f400.png";const a=(0,r._)("head",null,[(0,r._)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r._)("title",null," Home Page ")],-1),i=(0,r._)("img",{src:o,alt:""},null,-1),c=(0,r._)("button",null," Log In ",-1),f=(0,r._)("button",null," Apply Now ",-1);function u(e,n){const t=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("html",null,[a,(0,r._)("body",null,[i,(0,r.Wm)(t,{to:{name:"LogInPage"}},{default:(0,r.w5)((()=>[c])),_:1}),(0,r.Wm)(t,{to:{name:"ApplicationPage"}},{default:(0,r.w5)((()=>[f])),_:1})])])}var s=t(89);const d={},l=(0,s.Z)(d,[["render",u]]);var p=l,m=t(2483),h=t(6367);const b=[{path:"/",name:"Home",component:p},{path:"/login",name:"LogInPage",component:()=>t.e(752).then(t.bind(t,6752))},{path:"/apply",name:"ApplicationPage",component:()=>t.e(763).then(t.bind(t,1763))},{path:"/profile",name:"ProfilePage",component:()=>t.e(13).then(t.bind(t,2013)),meta:{requiresAuth:!0}},{path:"/cart",name:"CartPage",component:()=>t.e(479).then(t.bind(t,1479)),meta:{requiresAuth:!0}},{path:"/driverdashboard",name:"DriverDashboardPage",component:()=>t.e(247).then(t.bind(t,6843)),meta:{requiresAuth:!0}},{path:"/sponsordashboard",name:"SponsorDashboardPage",component:()=>t.e(394).then(t.bind(t,5394))},{path:"/admindashboard",name:"AdminDashboardPage",component:()=>t.e(328).then(t.bind(t,2328))},{path:"/driverdashboard/points",name:"DriverPointsPage",component:()=>t.e(344).then(t.bind(t,344))},{path:"/driverdashboard/catalog",name:"DriverCatalogPage",component:()=>t.e(73).then(t.bind(t,4073))},{path:"/sponsordashboard/points",name:"SponsorPointsPage",component:()=>t.e(561).then(t.bind(t,3561))},{path:"/sponsordashboard/catalog",name:"SponsorCatalogPage",component:()=>t.e(933).then(t.bind(t,3933))},{path:"/sponsordashboard/drivers",name:"SponsorDriversPage",component:()=>t.e(316).then(t.bind(t,3316))},{path:"/admindashboard/catalog",name:"AdminCatalogPage",component:()=>t.e(473).then(t.bind(t,4473))},{path:"/admindashboard/drivers",name:"AdminDriversPage",component:()=>t.e(765).then(t.bind(t,5765))}],y=(0,m.p7)({history:(0,m.PO)(),routes:b});y.beforeResolve((async(e,n,t)=>{if(e.matched.some((e=>e.meta.requiresAuth)))try{await h.g.currentAuthenticatedUser(),t()}catch(r){console.log("User not authenticated"),t({path:"/",query:{redirect:e.fullPath}})}t()}));var g=y},6249:function(){},2480:function(){}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,a){if(!r){var i=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],a=e[s][2];for(var c=!0,f=0;f<r.length;f++)(!1&a||i>=a)&&Object.keys(t.O).every((function(e){return t.O[e](r[f])}))?r.splice(f--,1):(c=!1,a<i&&(i=a));if(c){e.splice(s--,1);var u=o();void 0!==u&&(n=u)}}return n}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[r,o,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){var e,n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};t.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var a=Object.create(null);t.r(a);var i={};e=e||[null,n({}),n([]),n(n)];for(var c=2&o&&r;"object"==typeof c&&!~e.indexOf(c);c=n(c))Object.getOwnPropertyNames(c).forEach((function(e){i[e]=function(){return r[e]}}));return i["default"]=function(){return r},t.d(a,i),a}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+({214:"polyfills-core-js",748:"polyfills-dom",843:"polyfills-css-shim"}[e]||e)+"."+{13:"448fe6e7",31:"54ba92e0",63:"af4714ba",73:"40d91c2b",78:"b3210eab",124:"fa286871",130:"0b8a4965",188:"7f298c81",214:"bd7f469f",217:"e3fd5923",247:"6e1ff7ba",280:"f49dde2a",285:"a58b9239",286:"9e3cecb3",288:"de9932cb",289:"e338f10b",308:"94ac9edd",316:"f793f65c",328:"5739a6b6",344:"a04c75e7",361:"2fdd26cf",380:"255b860e",394:"315f1cae",435:"b063be66",458:"70c08f3c",473:"d0312d01",479:"452c2dff",550:"22e46aba",561:"c34662eb",602:"782bdc9e",654:"65b68458",675:"9f195de3",722:"f78d5cd8",724:"7370bf30",748:"6f7d8db4",752:"2627f5e6",753:"1a96f21f",763:"0633b437",765:"99f22f77",778:"91680452",808:"c9d5bb4b",843:"809e33fe",848:"725c7baf",861:"a331ce2e",933:"9126f785",949:"774d6694",973:"ea8cf1d0"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{13:"6304ca9d",73:"8a0906cf",247:"5798993d",316:"2c0a1f2f",328:"2c0a1f2f",344:"627ab1de",394:"da30a6db",473:"2c0a1f2f",479:"6304ca9d",561:"fd35233a",752:"ca05af35",763:"e5bcdf6b",765:"2c0a1f2f",933:"2c0a1f2f"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="truck-incentive-program:";t.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var c,f;if(void 0!==a)for(var u=document.getElementsByTagName("script"),s=0;s<u.length;s++){var d=u[s];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==n+a){c=d;break}}c||(f=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,t.nc&&c.setAttribute("nonce",t.nc),c.setAttribute("data-webpack",n+a),c.src=r),e[r]=[o];var l=function(n,t){c.onerror=c.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),f&&document.head.appendChild(c)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){t.p="/"}(),function(){var e=function(e,n,t,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)t();else{var i=a&&("load"===a.type?"missing":a.type),c=a&&a.target&&a.target.href||n,f=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");f.code="CSS_CHUNK_LOAD_FAILED",f.type=i,f.request=c,o.parentNode.removeChild(o),r(f)}};return o.onerror=o.onload=a,o.href=n,document.head.appendChild(o),o},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===n))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===n)return o}},r=function(r){return new Promise((function(o,a){var i=t.miniCssF(r),c=t.p+i;if(n(i,c))return o();e(r,c,o,a)}))},o={143:0};t.f.miniCss=function(e,n){var t={13:1,73:1,247:1,316:1,328:1,344:1,394:1,473:1,479:1,561:1,752:1,763:1,765:1,933:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}(),function(){var e={143:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=a);var i=t.p+t.u(n),c=new Error,f=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;c.message="Loading chunk "+n+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,o[1](c)}};t.l(i,f,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,a,i=r[0],c=r[1],f=r[2],u=0;if(i.some((function(n){return 0!==e[n]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(f)var s=f(t)}for(n&&n(r);u<i.length;u++)a=i[u],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(s)},r=self["webpackChunktruck_incentive_program"]=self["webpackChunktruck_incentive_program"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(1594)}));r=t.O(r)})();
//# sourceMappingURL=app.87c4fc1d.js.map