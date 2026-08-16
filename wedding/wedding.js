// wedding.js
// Optional: set FORM_ENDPOINT to your Formspree/Netlify endpoint if you want real form submissions.
// Example (Formspree): https://formspree.io/f/{your-id}
const FORM_ENDPOINT = ''; // <-- paste your endpoint here

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const thanks = document.getElementById('thanks');
  const clearBtn = document.getElementById('clearBtn');
  const shareBtn = document.getElementById('shareBtn');
  const galleryImgs = document.querySelectorAll('.gallery .grid img');

  // Save to localStorage
  function saveToLocalStorage(payload){
    const key = 'wedding_rsvps';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({...payload, receivedAt: new Date().toISOString()});
    localStorage.setItem(key, JSON.stringify(existing));
  }

  // Post to endpoint (if configured)
  async function postToEndpoint(payload){
    if(!FORM_ENDPOINT) return {ok:false, error:'no-endpoint'};
    try{
      const res = await fetch(FORM_ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      return {ok: res.ok, status: res.status};
    }catch(err){
      return {ok:false, error:err.message};
    }
  }

  // Form submit
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const attending = form.attending.value;
      const guests = form.guests ? form.guests.value : 0;
      const dietary = form.dietary ? form.dietary.value.trim() : '';
      const message = form.message ? form.message.value.trim() : '';

      if(!name || !email || !attending){
        alert('Please complete name, email and attending selection.');
        return;
      }

      const payload = {name,email,attending,guests,dietary,message};

      saveToLocalStorage(payload);

      // Try to POST to endpoint if configured
      const postResult = await postToEndpoint(payload);

      // Show thank you
      form.classList.add('hidden');
      if(thanks) thanks.classList.remove('hidden');

      console.log('RSVP saved locally', payload, 'postResult', postResult);
    });

    clearBtn && clearBtn.addEventListener('click', ()=> form.reset());
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Share button (Web Share API fallback to copy)
  shareBtn && shareBtn.addEventListener('click', async ()=>{
    const shareData = {
      title: "Vinoth & Suji — We're Engaged!",
      text: "Join us to celebrate our engagement and wedding events",
      url: window.location.href
    };
    if (navigator.share) {
      try { await navigator.share(shareData); }
      catch(e){ /* user cancel */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard');
      } catch (e) {
        prompt('Copy this link:', shareData.url);
      }
    }
  });

  // Simple lightbox for gallery
  if(galleryImgs && galleryImgs.length){
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.background = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.padding = '20px';
    lightbox.style.boxSizing = 'border-box';
    lightbox.style.zIndex = 10000;
    lightbox.style.visibility = 'hidden';
    lightbox.style.opacity = 0;
    lightbox.style.transition = 'opacity .2s, visibility .2s';
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.borderRadius = '10px';
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    function showLightbox(src, alt){
      img.src = src;
      img.alt = alt || '';
      lightbox.style.visibility = 'visible';
      lightbox.style.opacity = 1;
    }
    function hideLightbox(){
      lightbox.style.opacity = 0;
      setTimeout(()=> lightbox.style.visibility = 'hidden', 200);
    }

    galleryImgs.forEach(i=>{
      i.style.cursor = 'zoom-in';
      i.addEventListener('click', ()=> showLightbox(i.src, i.alt));
    });
    lightbox.addEventListener('click', hideLightbox);
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') hideLightbox(); });
  }
});
