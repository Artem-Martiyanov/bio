(self.webpackChunkbio=self.webpackChunkbio||[]).push([[179],{267:()=>{const e=document.querySelector('[data-parallax="wrapper"]'),t=document.querySelectorAll('[data-parallax="layer"]'),s=s=>{const i=e.getBoundingClientRect().left,n=e.getBoundingClientRect().top,o=s.clientX-i-.5*e.offsetWidth,a=s.clientY-n-.5*e.offsetHeight;t.forEach((e=>{const t=e.dataset.speed,s=-(o*t).toFixed(2),i=-(a*t).toFixed(2);e.setAttribute("style",`transform: translate(${s}px, ${i}px);`)}))},i=()=>{t.forEach((e=>{e.removeAttribute("style"),e.style="transition: transform 0.3s linear;"}))};e&&t&&(e.addEventListener("pointermove",s),e.addEventListener("pointerout",i))},692:(e,t,s)=>{"use strict";var i={};s.r(i),s.d(i,{reviews:()=>v,works:()=>g});const n=(e,t)=>Math.random()*(t-e)+e,o=(e,t)=>{const s=document.createElement(e);return s.classList.add(t),s};class a{constructor(e,t){this.WIDTH=e,this.HEIGHT=t,this.wrapper=o("div","canvas__wrapper"),this.canvas=this.#e(e,t),this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d")}#e=(e,t)=>{const s=o("canvas","canvas");return s.width=e,s.height=t,s.style=`width: ${e}px; height: ${t}px;`,s.ondragstart=()=>!1,s};clear(){this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)}render({position:e,body:t}){t.forEach((t=>{const s=+e.x+ +t.offset.x||0,i=+e.y+ +t.offset.y||0;this.ctx.beginPath(),this.ctx.moveTo(s,i),t.figure.forEach((([e,t])=>{this.ctx.lineTo(s+e,i+t)})),t.isClose&&this.ctx.closePath(),t.color?(t.color.fill&&(this.ctx.fillStyle=t.color.fill,this.ctx.fill()),t.color.stroke&&(this.ctx.strokeStyle=t.color.stroke,this.ctx.stroke())):(this.ctx.fillStyle=this.ctx.strokeStyle="black",this.ctx.fill(),this.ctx.stroke())}))}destroy(){this.wrapper.parentNode.removeChild(this.wrapper)}}class r{constructor(e,t){this.model={position:t,body:[]}}direction=1;setPosition(e,t){this.model.body.forEach((s=>{this.model.position.x=s.offset.x+e,this.model.position.y=s.offset.y+t}))}isInclude(e,t){let s=!1;const i=this.model.body[0].figure;let n=i.length-1;for(let o=0;o<i.length;o++){let a=i[n][0]+this.model.position.x,r=i[n][1]+this.model.position.y,l=i[o][0]+this.model.position.x,c=i[o][1]+this.model.position.y;(c<=t&&t<r||r<=t&&t<c)&&e>(a-l)*(t-c)/(r-c)+l&&(s=!s),n=o}return s}}class l extends r{constructor(e,t,s){super(),this.model={position:s,body:[{figure:[[0,0],[e,0],[e,e],[0,e]],offset:{x:0,y:0},color:{fill:t[0]?.fill||null,stroke:t[0]?.stroke||null},isClose:!0},{figure:[[0,0],[.25*e,.25*e],[.25*e,1.25*e],[0,e]],offset:{x:e,y:0},color:{fill:t[1]?.fill||null,stroke:t[1]?.stroke||null},isClose:!1},{figure:[[0,0],[e,0],[1.25*e,.25*e],[.25*e,.25*e]],offset:{x:0,y:e},color:{fill:t[2]?.fill||null,stroke:t[2]?.stroke||null},isClose:!1}]}}}class c extends r{constructor(e,t,s){super(),this.model={position:s,body:[{figure:[[0,0],[.35*e,-.75*e],[1.35*e,-.75*e],[.7*e+e,0],[1.35*e,.75*e],[.35*e,.75*e]],offset:{x:0,y:0},color:{fill:t[0]?.fill||null,stroke:t[0]?.stroke||null},isClose:!0},{figure:[[0,0],[.7*e,1.5*e],[.35*e,2.2*e],[-.35*e,.75*e]],offset:{x:1.7*e,y:0},color:{fill:t[1]?.fill||null,stroke:t[1]?.stroke||null},isClose:!1},{figure:[[0,0],[e,0],[1.7*e,1.45*e],[.7*e,1.45*e]],offset:{x:.35*e,y:.75*e},color:{fill:t[2]?.fill||null,stroke:t[2]?.stroke||null},isClose:!1}]}}}class h{constructor(e="cube",t,s,i){this.parent=document.querySelector("[data-background]"),this.parent&&(this.parentWidth=this.parent.clientWidth,this.parentHeight=this.parent.clientHeight,this.facetSize=t,this.countCellsX=Math.ceil(this.parentWidth/this.facetSize)+1,this.countCellsY=Math.ceil(this.parentHeight/this.facetSize)+2,this.canvasWidth=this.countCellsX*this.facetSize,this.canvasHeight=this.countCellsY*this.facetSize,this.canvas=new a(this.canvasWidth,this.canvasHeight),this.cellColors=s,this.speed=i/100,this.mode=e,this.cells=this.#t(),requestAnimationFrame(this.#s.bind(this)),document.addEventListener("pointermove",this.#i.bind(this)),this.parent.style.overflow="hidden",this.parent.insertAdjacentElement("afterbegin",this.canvas.wrapper))}#i(e){"cube"===this.mode?(this.mouseX=Math.floor(e.x/this.facetSize),this.mouseY=Math.floor(e.y/this.facetSize)):(this.mouseX=Math.floor(e.x),this.mouseY=Math.floor(e.y))}#t(){const e=[];if("cube"===this.mode)for(let t=0;t<this.canvasHeight;t+=this.facetSize){const s=[];for(let e=0;e<this.canvasWidth;e+=this.facetSize){const i=n(-1,.15*this.facetSize).toFixed(2),o={x:e-i,y:t-i};s.push(new l(this.facetSize,this.cellColors,o))}e.push(s)}if("hex"===this.mode)for(let t=0;t<this.canvasHeight;t+=1.5*this.facetSize){const s=[];for(let e=0;e<this.canvasWidth;e+=1.35*this.facetSize){const i=n(-1,.15*this.facetSize).toFixed(2);let o=0;o=e/(1.35*this.facetSize)%2==0?t+.75*this.facetSize:t;const a={x:e-i,y:o-i};s.push(new c(this.facetSize,this.cellColors,a))}e.push(s)}return e}#n(){this.cells.forEach(((e,t)=>{e.forEach(((e,s)=>{let i=this.speed*e.direction,o=0,a=1;"hex"===this.mode&&(a=1.35),o=e.model.position.x-s*this.facetSize*a,o<-1*n(.1*this.facetSize,.15*this.facetSize)?e.direction=-1:o>0&&(e.direction=1),e.hovered="cube"===this.mode?s===this.mouseX&&t===this.mouseY:e.isInclude(this.mouseX,this.mouseY),e?.hovered&&o<.1*this.facetSize&&(e.model.position.x+=4,e.model.position.y+=4),e?.hovered||(e.model.position.y-=i,e.model.position.x-=i)}))}))}#s(){this.canvas.clear(),this.#n(),this.cells.forEach((e=>{e.forEach((e=>{this.canvas.render(e.model)}))})),requestAnimationFrame(this.#s.bind(this))}destroy(){document.removeEventListener("pointermove",this.#i),this.canvas.destroy()}}const d=(e,t)=>Math.round(e-.5+Math.random()*(t-e+1)),u=(e,t,s)=>{const i=`\n    border-radius: 50%;\n    width: ${e}vmax;\n    height: ${e}vmax;\n    border: 3px solid ${t};\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 1000;\n    box-shadow: ${s} 0 0 150px 10px ${t};\n  `,n=document.createElement("div");n.style=i,document.body.insertAdjacentElement("afterbegin",n)};class m{constructor(e,t,s,i,n,o){this.parent=document.querySelector("[data-particle-effect]"),this.minRadius=i,this.maxRadius=n,this.parent&&("setting"===o?(u(2*i,"red",""),u(2*n,"blue","inset")):(this.particle=((e,t,s)=>{if(e<=t)throw new Error(`sizeDispersion: ${t} should not be more than size: ${e}`);const i=document.createElement("div"),n=d(-2,2);return i.classList.add("particle"),i.style.width=e+n+"px",i.style.height=e+n+"px",i.style.background=s,i})(e,t,s),this.parent.insertAdjacentElement("afterbegin",this.particle),window.setTimeout((()=>this.#o()),0),this.particle.addEventListener("transitionend",this.#a)))}#o(){const e=d(this.minRadius,this.maxRadius),t=d(0,360);this.particle.style.transform=`rotateZ(${t}deg) translateX(${e}vmax)`,this.particle.style.opacity="0"}#a(e){e.target.parentNode&&e.target.parentNode.removeChild(e.target)}}class p{constructor(e,t,s,i=100,n,o,a){this.prevFramesTime=null,this.spawnDelay=i,this.settings=[e,t,s,n,o,a],"setting"===a?new m(...this.settings):window.requestAnimationFrame(this.#r.bind(this))}#r(e){this.prevFramesTime||(this.prevFramesTime=e),e-this.prevFramesTime>=this.spawnDelay&&(new m(...this.settings),this.prevFramesTime=e),window.requestAnimationFrame(this.#r.bind(this))}}const f=class{constructor(e,t){this.store=e,this.name=t,this.url=(e="")=>`https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/${this.name}/${e}.json`}initState(){return{}}getState(){return this.store.getState()[this.name]}setState(e){this.store.setState({...this.store.getState(),[this.name]:e})}async load(e=""){const t={method:"GET",headers:{"Content-Type":"application/json"}};try{const s=await fetch(this.url(e),t),i=await s.json();return""===e?this.setState(i):this.setState({...this.getState(),[e]:i}),i}catch(e){console.error(`Error. Method "load": ${e.message}`),console.table(this)}}async upload(e){const t={method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}};try{const s=await fetch(this.url(),t),i=await s.json();return this.setState({...this.getState(),[i.name]:e}),i.name}catch(t){console.error(`Error. Method "upload": ${t.message}`),console.table(this),console.log(e)}}async update(e){const t={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};this.setState({...this.getState(),...e});try{return await fetch(this.url(),t)}catch(t){console.error(`Error. Method "update": ${t.message}`),console.table(this),console.log(e)}}async remove(e){const t={method:"DELETE",headers:{"Content-Type":"application/json"}};try{await fetch("https://portfolio-ee6bc-default-rtdb.europe-west1.firebasedatabase.app/trash.json",{method:"POST",body:JSON.stringify(this.getState()[e])})}catch(t){console.error(`Error. Method "post": ${t.message}`),console.table(this),console.log(e)}delete this.getState()[e];try{return await fetch(this.url(e),t)}catch(t){console.error(`Error. Method "delete": ${t.message}`),console.table(this),console.log(e)}}};const g=class extends f{initState(){return{}}getList(){const e=this.getState();return Object.keys(e).map((t=>({...e[t],id:t})))}async iterateView(e){let t=this.getList().find((t=>t.deployLink===e));const s=this.getState(),i={[t.id]:{...s[t.id],view:++t.view}};await this.update(i)}};const v=class extends f{initState(){return{}}getList(){const e=this.getState();return e?Object.keys(e).map((t=>({...e[t],id:t}))):[]}};const w=new class{constructor(e={}){this.state=e,this.actions={};for(const e of Object.keys(i))this.actions[e]=new i[e](this,e),this.state[e]=this.actions[e].initState()}getState(){return this.state}setState(e){this.state=e}},y={el:document.querySelector(".burger"),nav:document.querySelector(".nav"),toggle:function(){this.el.classList.toggle("burger--active"),this.nav.classList.toggle("nav--toggle")}},S={el:document.querySelector(".intro-page__dialog"),show:function(){this.el.classList.add("intro-page__dialog--down")}},b={el:document.querySelector(".works-page__electrician"),show:function(){this.el.classList.add("works-page__electrician--shown")},reset:function(){this.el.classList.remove("works-page__electrician--shown")}},k={el:document.querySelector('[data-type="lamp-switcher"]'),disable:function(){this.el.disabled=!0},enable:function(){this.el.disabled=!1}},_={el:document.querySelector(".lamp"),change:function(e=(()=>{})){this.el.classList.add("lamp--change"),this.el.addEventListener("animationend",(t=>{"lamp-change"===t.animationName&&(this.el.classList.remove("lamp--change"),e())}))},toggle:function(){this.el.classList.toggle("lamp--toggle")}};const x=(e,t)=>Math.random()*(t-e)+e,L={el:document.querySelector(".works"),render:function(){this.el&&w.actions.works.getList().map((e=>{this.el.appendChild((e=>{const t=document.createElement("li");return t.classList.add("works__item"),t.innerHTML=`\n        <div class="works__content">\n          <picture>\n            <source srcset="${(e=>{const t=e.split(".");return t.pop(),t.push(".webp"),t.join("")})(e?.image)}">\n            <img class="works__image" src="${e?.image}" alt="${e?.title}.">\n          </picture>\n          <div class="works__inner">\n            <h2 class="works__title"><span>&#60; </span>${e?.title}<span> &#62;</span></h2>\n            <p class="works__description">${e?.description}</p>\n            <footer class="works__links">\n              <a class="works__link" href="${e?.deployLink}" target="_blank" title="Опубликованная версия.">\n                <span class="visually-hidden">Опубликованная версия.</span>\n                <svg width="40" height="40">\n                  <use href="./images/stack.svg#out-link"></use>\n                </svg>\n              </a>\n              <a class="works__link" href="${e?.ghLink}" target="_blank" title="Проект на Гитхаб.">\n                <span class="visually-hidden">Проект на гитхаб.</span>\n                <svg width="40" height="40">\n                  <use href="./images/stack.svg#github"></use>\n                </svg>\n              </a>\n              <span class="works__view" title="Количество просмотров.">\n                <span class="visually-hidden">Количество просмотров.</span>\n                <span class="works__counter">${e?.view}</span>\n              </span>\n            </footer>\n          </div>\n        </div>\n  `,t})(e))}))},iterateView:function(e){const t=e.querySelector(".works__counter");t.innerText=Number(t.innerText)+1}},E=s.p+"audio/meow.mp3",$=new Audio(E),C={el:document.querySelector(".cat"),tail:document.querySelector(".cat__touch-box"),claws:document.querySelector(".claws"),init:function(){localStorage.getItem("clawOffset")&&(this.claws.style.transform=`translateX(${localStorage.getItem("clawOffset")}px)`)},onload:function(){this.el.classList.remove("cat--init")},ready:function(){this.el.classList.remove("cat--slow","cat--animated")},goBack:function(){$.volume=.2,$.play(),this.el.classList.add("cat--slow","cat--animated"),this.el.style.transform="translateX(0)"},move:function(e){this.el.style.transform=`translateX(${e}px)`},moveClaws:function(e){this.claws.style.transform=`translateX(${e}px)`},fixClawsPath:function(){localStorage.removeItem("clawOffset"),this.claws.style.transform="translateX(0)"}},T=e=>{const t=document.createElement("li");var s;return t.classList.add("reviews__item"),t.innerHTML=`\n        <header class="reviews__header">\n          <h2 class="reviews__title">${e?.userName}</h2>\n          ${e.userCompany&&`<p class="reviews__company">${e?.userCompany}</p>`}\n          ${s=e.id,localStorage.getItem("reviewsId")&&localStorage.getItem("reviewsId").split(",").includes(s)?`\n          <button class="reviews__remove" type="button" title="Удалить." data-type="delete-review" data-id="${e.id}">\n            <span class="visually-hidden">Удалить отзыв.</span>\n          </button>\n          `:""}\n        </header>\n        <p class="reviews__content">${e?.content}</p>\n        <footer class="reviews__footer">\n        ${(e.userTelegram||e.userVkontakte)&&`\n          <ul class="reviews__social">\n            ${e.userTelegram&&`\n            <li class="reviews__social-item" title="Телеграм комментатора.">\n              <a class="reviews__social-link reviews__social-link--telegram" href="${e.userTelegram}" target="_blank">\n                <span class="visually-hidden">Телеграм комментатора.</span>\n              </a>\n            </li>\n            `}\n            ${e.userVkontakte&&`\n            <li class="reviews__social-item" title="Вконтакте комментатора.">\n              <a class="reviews__social-link reviews__social-link--vkontakte" href="${e.userVkontakte}" target="_blank">\n                <span class="visually-hidden">Вконтакте комментатора.</span>\n              </a>\n            </li>\n            `}\n          </ul>\n          `}\n          <b class="reviews__rating">${e.rating}\n            <span class="reviews__rating-max"> / 10</span>\n          </b>\n          <span class="reviews__date">\n          ${e.date}\n          </span>\n        </footer>\n  `,t},q={el:document.querySelector(".reviews__list"),render:function(){const e=w.actions.reviews.getList();if(this.el.innerHTML="",e.length>0)e.map((e=>{let t=new Date(e.date).toLocaleString().split(",").reverse();t.splice(1,0," - "),t=t.join(""),e.date=t,this.el.appendChild(T(e))}));else{const e=document.createElement("h2");e.classList.add("reviews__empty"),e.innerText="Пока нет ни одного отзыва :(",this.el.appendChild(e)}}},I={el:document.querySelector(".popup"),show:function(){this.el.classList.add("popup--show"),this.el.onanimationend=()=>this.el.classList.remove("popup--show")}},z={el:document.forms.review,listen:function(e){const t=this.el.elements;this.el.addEventListener("input",(()=>{const e=Object.fromEntries(new FormData(this.el).entries());this.validate(t),this.loadToStorage(e)})),this.el.addEventListener("submit",(t=>{t.preventDefault();const s=new FormData(this.el),i=Object.fromEntries(s.entries());for(let e in i)i[e]=i[e].trim(),this.el.elements[e].value="";this.clearStorage(),I.show(),i.date=new Date(Date.now()).toString(),this.validate(this.el.elements),e(i)}))},onLoad:function(){const e=this.checkStorage();for(let t in e)this.el.elements[t].value=e[t];this.validate(this.el.elements)},validate:function(e){const t=this.el.querySelector("button[type=submit]"),s=(e,t)=>""===e.value.trim()||e.value.includes(t)?(e.parentNode.classList.remove("textfield--invalid"),!0):(e.parentNode.classList.add("textfield--invalid"),!1),i=(e,t)=>""!==e.value.trim()?(e.parentNode.classList.remove(t),!0):(e.parentNode.classList.add(t),!1),n=s(e.userTelegram,"https://t.me/"),o=s(e.userVkontakte,"https://vk.com/"),a=i(e.userName,"textfield--invalid"),r=i(e.content,"textarea--invalid"),l=(c=e.rating,h=0,d=10,""!==c.value.trim()&&Number(c.value)>=h&&Number(c.value)<=d?(c.parentNode.classList.remove("textfield--invalid"),!0):(c.parentNode.classList.add("textfield--invalid"),!1));var c,h,d;t.disabled=!(a&&r&&l&&n&&o)},checkStorage:function(){const e=localStorage.getItem("lastFormData");return e?JSON.parse(e):null},loadToStorage:function(e){localStorage.setItem("lastFormData",JSON.stringify(e))},clearStorage:function(){localStorage.removeItem("lastFormData")}};let H=0;const N=e=>{const t=e.target.dataset.type;if("morpheus"===t&&S.show(),("burger"===t||"nav"===t||e.target.closest('[data-type="burger"]'))&&y.toggle(),"switcher-control"===t&&(_.toggle(),H>=1&&b.show(),H>4&&(k.disable(),_.change((()=>{k.enable(),b.reset(),H=0}))),H++),e.target.closest(".works__link")){const t=e.target.closest(".works__inner"),s=t.querySelector(".works__link").getAttribute("href");"viewed"!==localStorage.getItem(s)&&w.actions.works.iterateView(s).then((()=>{localStorage.setItem(s,"viewed"),L.iterateView(t)}))}if("cat-tail"===t){document.ondragstart=()=>!1;const t=()=>{document.removeEventListener("pointermove",s),document.removeEventListener("pointerup",t),C.goBack()};document.addEventListener("pointerup",t);const s=t=>{const s=t.clientX-e.clientX;let i=s>2.5*C.el.clientWidth;if(document.documentElement.clientWidth<500&&(i=s>1.5*C.el.clientWidth),!i){const e=Number(localStorage.getItem("clawOffset"))??null;let t=.36*C.el.clientWidth,i=.5;document.documentElement.clientWidth<500&&(i=1,t=-.35*C.el.clientWidth);const n=(s-C.el.clientWidth-t)*i;(!e||e<n)&&(C.moveClaws(n),localStorage.setItem("clawOffset",n.toString())),C.move(s*i)}};C.ready(),document.addEventListener("pointermove",s)}if("fix-claws"===t&&C.fixClawsPath(),"delete-review"===t){const t=e.target.dataset.id;w.actions.reviews.remove(t).then((()=>q.render()))}};const W={el:document.querySelector(".header"),darken:function(){this.el&&this.el.classList.add("header--scrolled")},lighten:function(){this.el&&this.el.classList.remove("header--scrolled")}},F=()=>{window.scrollY>5?W.darken():W.lighten()};s(267);const j=350,M=document.querySelector('[data-bg="space"]');if(M){const e=(e,t)=>{const s=document.createElement("canvas");return s.width=e,s.height=t,s.style=`width: ${e}px; height: ${t}px; z-index: -50;`,s.ondragstart=()=>!1,M.appendChild(s),s.getContext("2d")},t=(e,t,s,i,n)=>{r.beginPath(),r.arc(e,t,s,0,2*Math.PI,!0),r.fillStyle=i+n,r.fill()},s=e=>{let t=[];for(;e>=0;){const s={radius:x(.1,2.2),opacity:x(.3,.5)+")",color:`rgba(${x(200,255)}, ${x(200,255)}, ${x(210,255)}, `,position:{x:x(0,M.clientWidth),y:x(0,M.clientHeight)}};t.push(s),e--}return t},i=e=>{o||(o=e),e-o>=a&&(r.clearRect(0,0,M.clientWidth,M.clientHeight),n.forEach((e=>{t(e.position.x,e.position.y,e.radius,e.color,e.opacity),e.opacity=x(.3,.5)+")"})),o=e),window.requestAnimationFrame(i)},n=s(j);let o=null;const a=15,r=e(M.clientWidth,M.clientHeight);window.requestAnimationFrame(i)}const D=document.querySelector(".about-page__age");if(D){let e=(e=>{const[t,s,i]=new Date(Date.now()).toLocaleDateString().split(".");let n=+i-e.year;return(+s<e.month||+s===e.month&&+t<e.day)&&n--,n})({day:13,month:5,year:1999});e=e+" "+function(e,t={},s="ru-RU"){return t[new Intl.PluralRules(s).select(e)]||""}(e,{one:"год",few:"года",many:"лет"}),D.innerText=e}const A={render:async function(){L.el&&w.actions.works.load().then((()=>{L.render()})),q.el&&(w.actions.reviews.load().then((()=>q.render())),z.listen((e=>{w.actions.reviews.upload(e).then((e=>((e=>{const t=localStorage.getItem("reviewsId");if(t){const s=t.split(",");s.push(e),localStorage.setItem("reviewsId",s.join(","))}else localStorage.setItem("reviewsId",e)})(e),w.actions.reviews.load(e)))).then((()=>q.render()))}))),C.el&&C.init()}},O=e=>{C.el&&C.onload(),z.el&&z.onLoad()};new h("cube",window.innerWidth>=768?80:50,[{fill:"#175b39",stroke:"#2fa86b"},{fill:"#43f59c"},{fill:"#0d3321"}],5),new p(15,10,"#43f59c",250,20,50,""),document.addEventListener("pointerdown",N),window.onload=F,document.addEventListener("scroll",F),window.addEventListener("load",O),A.render()}},e=>{var t;t=692,e(e.s=t)}]);