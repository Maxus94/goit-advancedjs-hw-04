import{S as p,i as r,a as h}from"./assets/vendor-aa7a424a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const y=document.querySelector(".search-form"),b=document.querySelector('input[name="searchQuery"]'),l=document.querySelector(".gallery"),c=document.querySelector(".load-more");let d=1,m=new p(".gallery a",{captionsData:"alt",captionDelay:50});y.addEventListener("submit",L);c.addEventListener("click",w);async function w(){d+=1,r.destroy();try{const s=await g(d);(d+1)*40>=s.data.totalHits&&c.classList.add("hidden"),l.insertAdjacentHTML("beforeend",u(s.data.hits)),m.refresh()}catch{r.show({title:"Error",message:"Something goes wrong, please try reload page.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"})}}async function L(s){s.preventDefault(),r.destroy(),l.innerHTML="",c.classList.add("hidden");try{const t=await g();Array.from(t.data.hits).length===0?r.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"}):Array.from(t.data.hits).length<40?(l.insertAdjacentHTML("beforeend",u(t.data.hits)),m.refresh(),r.show({message:`Hooray! We found ${t.data.totalHits} images.`,close:!1,backgroundColor:"green",messageColor:"white",messageSize:20,timeout:5e3,position:"topCenter"})):(c.classList.remove("hidden"),l.insertAdjacentHTML("beforeend",u(t.data.hits)),m.refresh(),r.show({message:`Hooray! We found ${t.data.totalHits} images.`,close:!1,backgroundColor:"green",messageColor:"white",messageSize:20,timeout:5e3,position:"topCenter"}))}catch{r.show({message:"Something goes wrong, please try reload page.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topCenter"})}}async function g(s=1){const t={params:{key:"40858721-2ab2962236a746e97c71283b6",q:b.value,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:40}};return await h.get("https://pixabay.com/api/",t)}function u(s){return s.map(({webformatURL:t,tags:i,likes:n,views:e,comments:o,downloads:a,largeImageURL:f})=>`<div class="photo-card">
        <a class="gallery__link" href="${f}">
      <img class="item-image" src="${t}" alt="${i}" width="400" height="240" loading="lazy" />
      </a>
      <div class="info"><p class="info-item"><b>Likes</b><br>${n}</p>
      <p class="info-item"><b>Views</b><br>${e}</p>
      <p class="info-item"><b>Comments</b><br>${o}</p>
      <p class="info-item"><b>Downloads</b><br>${a}</p></div></div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map