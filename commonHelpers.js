import{i,S as g,a as h}from"./assets/vendor-951421c8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();i.settings({position:"topRight",timeout:5e3,resetOnHover:!0,transitionIn:"flipInX",transitionOut:"flipOutX"});const b=new g(".gallery a",{captionsData:"alt",captionDelay:250}),v="41671607-e33db59ab0332d081087354c8",x="https://pixabay.com/api/?",r={key:v,orientation:"horizontal",image_type:"photo",safesearch:!0,per_page:40,page:1,q:""},d=document.querySelector(".search-form"),f=document.querySelector("div[data-loader='search']"),p=document.querySelector(".gallery"),c=document.querySelector("button[data-pagination]"),m=document.querySelector("div[data-loader='pagination']"),u=document.querySelector("button[data-goup]");d.addEventListener("submit",L);c.addEventListener("click",S);u.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));function L(s){s.preventDefault();const t=d.elements.searchStr.value.trim();if(d.reset(),!t){i.error({message:"Search field cannot be empty!"});return}p.innerHTML="",f.style.display="block",c.style.display="none",u.style.display="none",r.q=t,r.page=1,y(r)}function S(){m.style.display="block",y(r)}async function y(s){try{const t=await h.get(x,{params:s}).then(({data:n})=>n);if(t.hits.length==0){i.warning({message:"Sorry, there are no images matching<br> your search query.Please try again!"});return}q(t.hits),w(t.totalHits)}catch(t){i.error({message:`Api request error: ${t}`})}finally{f.style.display="none",m.style.display="none"}}function w(s){if(s<=r.per_page*r.page?(c.style.display="none",u.style.display="block",i.warning({message:"We're sorry, but you've reached the end of search results."})):(r.page+=1,c.style.display="block"),r.page>2){const t=p.children[0].getBoundingClientRect().height;window.scrollBy({left:0,top:t*2+12,behavior:"smooth"})}}function q(s){p.insertAdjacentHTML("beforeend",s.map(k).join("")),b.refresh()}const k=({largeImageURL:s,webformatURL:t,tags:n,likes:l,views:e,comments:o,downloads:a})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <div class="item-wrap">
          <div class="image-wrap">
            <img class="gallery-image" src="${t}" alt="${n}" />
          </div>
          <ul class="metabox-list">
            <li class="mbox-info">
              <p class="mbox-info-title">Likes</p>
              <span class="mbox-info-descr">${l}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Views</p>
              <span class="mbox-info-descr">${e}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Comments</p>
              <span class="mbox-info-descr">${o}</span>
            </li>
            <li class="mbox-info">
              <p class="mbox-info-title">Downloads</p>
              <span class="mbox-info-descr">${a}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>`;
//# sourceMappingURL=commonHelpers.js.map
