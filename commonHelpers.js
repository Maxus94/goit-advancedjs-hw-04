import{S as g,i as n,a as h}from"./assets/vendor-aa7a424a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y=document.querySelector(".search-form"),b=document.querySelector('input[name="searchQuery"]'),l=document.querySelector(".gallery"),c=document.querySelector(".load-more");let d=1,u=new g(".gallery a",{captionsData:"alt",captionDelay:50});y.addEventListener("submit",w);c.addEventListener("click",L);async function L(){d+=1;try{const r=await f(d);(d+1)*40>=r.data.totalHits&&c.classList.add("hidden"),l.insertAdjacentHTML("beforeend",m(r.data.hits)),u.refresh()}catch{n.show({title:"Error",message:"Something goes wrong, please try reload page.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"})}}async function w(r){r.preventDefault(),n.destroy(),l.innerHTML="",c.classList.add("hidden");try{const o=await f();Array.from(o.data.hits).length===0?n.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"}):Array.from(o.data.hits).length<40?(l.insertAdjacentHTML("beforeend",m(o.data.hits)),u.refresh()):(c.classList.remove("hidden"),l.insertAdjacentHTML("beforeend",m(o.data.hits)),u.refresh())}catch{n.show({message:"Something goes wrong, please try reload page.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"})}}async function f(r=1){const o={params:{key:"40858721-2ab2962236a746e97c71283b6",q:b.value,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}};return await h.get("https://pixabay.com/api/",o)}function m(r){return r.map(({webformatURL:o,tags:a,likes:i,views:e,comments:t,downloads:s,largeImageURL:p})=>`<div class="photo-card">
        <a class="gallery__link" href="${p}">
      <img class="item-image" src="${o}" alt="${a}" width="400" height="240" loading="lazy" />
      </a>
      <div class="info"><p class="info-item"><b>Likes</b><br>${i}</p>
      <p class="info-item"><b>Views</b><br>${e}</p>
      <p class="info-item"><b>Comments</b><br>${t}</p>
      <p class="info-item"><b>Downloads</b><br>${s}</p></div></div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
