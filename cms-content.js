/* CMS content integration: loads published content prepared by build.js. */
(async()=>{
 const read=async(p)=>{try{const r=await fetch(p,{cache:'no-cache'});return r.ok?await r.json():null}catch{return null}};
 const str=x=>typeof x==='string'?x.trim():'';
 const assign=(selector,value)=>{const el=document.querySelector(selector);if(el&&str(value))el.textContent=str(value)};
 const photo=(selector,src)=>{let el=document.querySelector(selector);if(!el||!str(src))return;const url=str(src);if(!url.startsWith('/')&&!url.startsWith('https://'))return;el.style.backgroundImage=`url(${JSON.stringify(url)})`;el.classList.add('has-image');el.setAttribute('aria-label','Podcast photograph')};
 const link=(label,url)=>{if(!/^https:\/\//i.test(str(url)))return null;const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;return a};
 const [home,host,about,social,guest,episodes]=await Promise.all([
  read('/content/homepage.json'),read('/content/host.json'),read('/content/about.json'),read('/content/social.json'),read('/content/guest-enquiry.json'),read('/content/episodes-index.json')]);
 
if (home?.website_logo) {
  const logo = document.getElementById('site-logo');
  const fallback = document.getElementById('logo-fallback');

  let src = String(home.website_logo).trim();

  if (src.startsWith('public/')) {
    src = '/' + src.slice(7);
  } else if (!src.startsWith('/') && !src.startsWith('https://')) {
    src = '/' + src;
  }

  if (logo) {
    logo.onload = () => {
      logo.hidden = false;
      if (fallback) fallback.hidden = true;
    };

    logo.src = src;
  }
}
if(home){const title=str(home.title);if(title){const h=document.querySelector('.hero h1');if(h){h.textContent=title}}assign('.hero-script',home.subtitle);assign('.hero-copy > p:nth-of-type(3)',home.description);photo('.hero-media',home.hero_image)}
 if(host){assign('.host h2',host.name);assign('.host-copy > p:nth-of-type(3)',host.biography);photo('.host-photo',host.portrait)}
 if(about){assign('.about-band h2',about.heading);assign('.about-band .narrow > p:nth-of-type(2)',about.description)}
 if(guest){assign('.guest-band h2',guest.heading);assign('.guest-band .narrow > p:nth-of-type(2)',guest.description);if(str(guest.email))window.CWB_CONTACT_EMAIL=str(guest.email)}
 if(social){const wrap=document.querySelector('.social-links');if(wrap){wrap.replaceChildren();let count=0;for(const [label,key] of [['YOUTUBE','youtube'],['INSTAGRAM','instagram'],['LINKEDIN','linkedin']]){const a=link(label,social[key]);if(a){wrap.appendChild(a);count++}}if(!count)wrap.textContent='Social channels coming soon.'}}
 if(Array.isArray(episodes)){
  const wrap=document.querySelector('.episode-grid');if(wrap){wrap.replaceChildren();const shown=episodes.filter(e=>e&&e.published===true).reverse();
   if(!shown.length){const p=document.createElement('p');p.textContent='New conversations coming soon.';wrap.appendChild(p)}
   for(const e of shown){const card=document.createElement('article');card.className='episode-card';const cover=document.createElement('div');cover.className='photo-placeholder episode-photo';cover.textContent='EPISODE THUMBNAIL';if(str(e.thumbnail))photoOn(cover,e.thumbnail);const body=document.createElement('div');body.className='episode-body';const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=[str(e.guest),str(e.profession)].filter(Boolean).join(' · ');const h=document.createElement('h3');h.textContent=str(e.title)||'New episode';const desc=document.createElement('p');desc.textContent=str(e.description);body.append(eyebrow,h,desc);const a=link('WATCH EPISODE →',e.youtube_url);if(a){a.className='pending';body.append(a)}else{const p=document.createElement('span');p.className='pending';p.textContent='EPISODE LINK COMING SOON';body.append(p)}card.append(cover,body);wrap.appendChild(card)}
  }
 }
 function photoOn(el,src){const u=str(src);if(!u.startsWith('/')&&!u.startsWith('https://'))return;el.style.backgroundImage=`url(${JSON.stringify(u)})`;el.classList.add('has-image');el.setAttribute('aria-label','Episode thumbnail')}
})();
