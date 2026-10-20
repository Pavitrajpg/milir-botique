const WHATSAPP_NUMBER = "918098098143";
const FALLBACK_IMG = "assets/img/editorial-wide-maroon.webp";
const imageA = FALLBACK_IMG, imageB = FALLBACK_IMG, imageC = FALLBACK_IMG;
const defaultProducts = [
 {id:"b1",name:"Earthy Elegance",category:"Jaipur Cotton",type:"Boutique",price:0,image:"assets/posts/earthy-elegance.webp",position:"center",tag:"Latest collection",description:"Jaipur Cotton kurta set in olive with a cream floral print and matching dupatta. A perfect blend of tradition and modern style for every occasion."},
 {id:"b2",name:"Olive Bloom",category:"Kurta Sets",type:"Boutique",price:0,image:"assets/posts/olive-bloom.webp",position:"center",tag:"Latest collection",description:"Graceful floral prints, soothing olive tones and elegant detailing, with a long dupatta. Perfect for festive occasions."},
 {id:"b3",name:"Timeless Tradition",category:"Kurta Sets",type:"Boutique",price:0,image:"assets/posts/timeless-tradition.webp",position:"center",tag:"Latest collection",description:"Rooted in culture and designed with elegance: a deep red kurta set with embroidered flowers and a block-printed dupatta."},
 {id:"b4",name:"Indigo Elegance",category:"Mal Chanderi",type:"Boutique",price:0,image:"assets/posts/indigo-elegance.webp",position:"center",tag:"Latest collection",description:"A navy and ivory printed Mal Chanderi set with dupatta. Perfect for festive celebrations, special occasions or everyday elegance."},
 {id:"b5",name:"Timeless Grace",category:"Mal Chanderi",type:"Boutique",price:0,image:"assets/posts/timeless-grace.webp",position:"center",tag:"Latest collection",description:"A soft grey Mal Chanderi set with multicolour embroidery on the yoke and sleeves. Perfect for festive celebrations."},
 {id:"b6",name:"Pastel Grace",category:"Kurta Sets",type:"Boutique",price:0,image:"assets/posts/pastel-grace.webp",position:"center",tag:"Latest collection",description:"A pale green set with delicate floral embroidery and a graceful silhouette, perfect for festive occasions."},
 {id:"p6",name:"Temple Layered Haram Set",category:"Rental Jewellery",type:"Rental",price:1200,image:"assets/img/rental-temple-haram.webp",position:"50% 35%",tag:"Rental enquiry",description:"A layered temple-style haram with choker, maang tikka and bangles. Rental price is illustrative: confirm deposit, terms and availability.",mock:true},
 {id:"p7",name:"Kundan Bridal Set",category:"Rental Jewellery",type:"Rental",price:1400,image:"assets/img/rental-kundan-bridal.webp",position:"50% 40%",tag:"Rental enquiry",description:"A kundan necklace and jhumka set for bridal looks. Rental terms and availability are confirmed by the team.",mock:true},
 {id:"p8",name:"Pearl & Gold Bridal Set",category:"Rental Jewellery",type:"Rental",price:950,image:"assets/img/rental-pearl-gold.webp",position:"50% 35%",tag:"Rental enquiry",description:"Pearl-drop earrings, necklace and maang tikka. Rental terms and availability are confirmed by the team.",mock:true}
];
const defaultJewellery = defaultProducts.filter(p=>p.type==="Rental");
let products = readStore("milir_products_v2", defaultProducts);
let jewellery = readStore("milir_jewellery_v2", defaultJewellery);
let cart = readStore("milir_cart", []);
let savedEnquiries = readStore("milir_enquiries", []);
let currentFilter = "All";
let adminTab = "products";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function readStore(key,fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch{return fallback}}
function writeStore(key,value){localStorage.setItem(key,JSON.stringify(value))}
function money(n){return n?"₹"+Number(n).toLocaleString("en-IN"):"On enquiry"}
function safe(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(window._toastTimer);window._toastTimer=setTimeout(()=>t.classList.remove("show"),2800)}
function productCard(p){return `<article class="product-card" data-id="${safe(p.id)}"><div class="product-image"><img src="${safe(p.image||imageA)}" alt="${safe(p.name)}" style="object-position:${safe(p.position||"center")}" onerror="this.src='${imageB}'"><span class="product-tag">${safe(p.tag||"Milir edit")}</span><button class="product-heart" aria-label="View ${safe(p.name)}" data-view="${safe(p.id)}">↗</button></div><div class="product-info"><span class="product-category">${safe(p.category)}${p.mock?' · MOCKUP':''}</span><h3>${safe(p.name)}</h3><div class="product-price-row"><span class="product-price">${p.price?money(p.price)+" <small>"+(p.type==="Rental"?"indicative / enquiry":"illustrative")+"</small>":"Price on enquiry"}</span><button class="quick-add" data-view="${safe(p.id)}">View details</button></div></div></article>`}
function renderProducts(){const q=($("#productSearch")?.value||"").toLowerCase();const list=products.filter(p=>p.type!=="Rental"&&(currentFilter==="All"||p.category===currentFilter)&&(`${p.name} ${p.category} ${p.description}`).toLowerCase().includes(q));$("#productGrid").innerHTML=list.length?list.map(productCard).join(""):'<p class="empty-state">No pieces match that search. Try another name or category.</p>';$("#jewelleryGrid").innerHTML=jewellery.map(productCard).join("")}
function findProduct(id){return [...products,...jewellery].find(p=>p.id===id)}
function openProduct(id){const p=findProduct(id);if(!p)return;$("#modalContent").innerHTML=`<div class="detail-layout"><img src="${safe(p.image||imageA)}" alt="${safe(p.name)}" style="object-position:${safe(p.position||"center")}" onerror="this.src='${imageB}'"><div><p class="eyebrow">${safe(p.category)} · ${p.mock?"CONCEPT MOCKUP":"CATALOGUE ITEM"}</p><h2 id="modalTitle">${safe(p.name)}</h2><div class="detail-price">${p.price?money(p.price)+' <small style="font-size:.65rem;font-weight:400">'+(p.type==="Rental"?"indicative rental enquiry":"illustrative price")+"</small>":"Price on enquiry"}</div><p>${safe(p.description)}</p><p class="demo-note">${p.mock?"This is a prototype image and price, not confirmation of physical inventory.":"From Milir's latest collection. Please confirm sizes, colours, price and availability with the team."}</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="btn btn-dark" data-add="${safe(p.id)}">Add to demo bag</button><button class="btn btn-outline" data-enquire="${safe(p.id)}">Enquire on WhatsApp</button></div></div></div>`;openOverlay("productModal")}
function openOverlay(id){const el=$("#"+id);el.classList.add("open");el.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeOverlay(id){const el=$("#"+id);el.classList.remove("open");el.setAttribute("aria-hidden","true");if(!$(".overlay.open"))document.body.style.overflow=""}
function addToCart(id){const p=findProduct(id);if(!p)return;const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id:p.id,qty:1});writeStore("milir_cart",cart);renderCart();toast("Added to your demo bag.")}
function renderCart(){const count=cart.reduce((n,x)=>n+x.qty,0);$("#cartCount").textContent=count;const items=cart.map(item=>{const p=findProduct(item.id);if(!p)return"";return `<div class="cart-row"><img src="${safe(p.image||imageA)}" alt=""><div><h4>${safe(p.name)}</h4><small>${money(p.price)} · ${p.type==="Rental"?"rental enquiry":"mock product"}</small><div class="quantity-control"><button data-qty="${safe(p.id)}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${safe(p.id)}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${safe(p.id)}" aria-label="Remove item">×</button></div>`}).join("");$("#cartItems").innerHTML=items||'<p class="empty-state">Your bag is waiting for something lovely.</p>';$("#cartTotal").textContent=money(cart.reduce((n,x)=>{const p=findProduct(x.id);return n+(p?p.price*x.qty:0)},0))}
function openWhatsApp(message){window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer")}
function productEnquiry(p){openWhatsApp(`Hello Milir! I'm enquiring about: ${p.name}. ${p.price?`The website shows an illustrative price of ${money(p.price)}. `:''}Please confirm actual availability, price and details.`)}
function buildEnquiry(){const f=$("#enquiryForm");const d=new FormData(f);return {name:d.get("name"),phone:d.get("phone"),interest:d.get("interest"),date:d.get("date"),message:d.get("message")}}
function enquiryMessage(e){return `Hello Milir Boutique & Rental Jewels!%0AEnquiry from: ${e.name}%0APhone: ${e.phone}%0AInterested in: ${e.interest}%0APreferred date: ${e.date||"Not specified"}%0ADetails: ${e.message||"Please share details."}`.replaceAll("%0A","\n")}
function renderAdmin(){const panel=$("#adminPanel");if(adminTab==="products"){panel.innerHTML=`<h3>Catalogue items</h3><form class="admin-form" id="addProductForm"><input name="name" required placeholder="Product name"><select name="category"><option>Ethnic Sets</option><option>Kurtas</option><option>Sarees</option><option>Rental Jewellery</option></select><input name="price" type="number" min="0" required placeholder="Illustrative price in ₹"><select name="type"><option value="Boutique">Boutique product</option><option value="Rental">Rental jewellery</option></select><button class="btn btn-dark" type="submit">Add demo item</button></form><div style="margin-top:20px">${products.map(p=>`<div class="admin-row"><span>${safe(p.name)}<br><small>${money(p.price)} · ${safe(p.category)}</small></span><button data-delete-product="${safe(p.id)}">Delete</button></div>`).join("")}</div><p class="fine-print">Changes are saved in this browser only.</p>`}else if(adminTab==="enquiries"){panel.innerHTML=`<h3>Enquiries on this device</h3>${savedEnquiries.length?savedEnquiries.map(e=>`<div class="admin-row"><span><b>${safe(e.name)}</b><br>${safe(e.interest)} · ${safe(e.phone)}<br><small>${safe(e.date||"No date")} — ${safe(e.message||"")}</small></span><button data-delete-enquiry="${safe(e.id)}">Delete</button></div>`).join(""):'<p class="empty-state">No demo enquiries recorded on this device yet.</p>'}<button class="admin-action" id="exportEnquiries">Export enquiries JSON</button>`}else{panel.innerHTML=`<h3>Contact details</h3><p>Current demo WhatsApp number: <b>+91 80980 98143</b></p><p class="demo-note">To change the business contact number, update WHATSAPP_NUMBER in app.js and the displayed number in index.html. A production admin panel needs authenticated server-side storage.</p><button class="admin-action" id="resetDemo">Reset local demo catalogue</button>`}}
function init(){renderProducts();renderCart();$("#year").textContent=new Date().getFullYear();$("#preferredDate").min=new Date().toISOString().slice(0,10);
$("#menuToggle").addEventListener("click",()=>{const open=$("#mainNav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));$("#menuToggle").textContent=open?"×":"☰"});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");$("#menuToggle").textContent="☰"}));
$("#productFilters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;currentFilter=b.dataset.filter;$$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#productSearch").addEventListener("input",renderProducts);$("#searchToggle").addEventListener("click",()=>{$("#productSearch").focus();$("#shop").scrollIntoView({behavior:"smooth"})});
document.addEventListener("click",e=>{const view=e.target.closest("[data-view]");if(view){openProduct(view.dataset.view);return}const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);closeOverlay("productModal");return}const enq=e.target.closest("[data-enquire]");if(enq){productEnquiry(findProduct(enq.dataset.enquire));return}const close=e.target.closest("[data-close]");if(close){closeOverlay(close.dataset.close);return}const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(x=>x.id===qty.dataset.qty);if(item){item.qty+=Number(qty.dataset.delta);if(item.qty<1)cart=cart.filter(x=>x.id!==item.id);writeStore("milir_cart",cart);renderCart()}return}const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(x=>x.id!==rem.dataset.remove);writeStore("milir_cart",cart);renderCart();return}const svc=e.target.closest("[data-service]");if(svc){$("#interestSelect").value=svc.dataset.service;$("#appointment").scrollIntoView({behavior:"smooth"});return}const tab=e.target.closest("[data-admin-tab]");if(tab){adminTab=tab.dataset.adminTab;$$("[data-admin-tab]").forEach(x=>x.classList.toggle("active",x===tab));renderAdmin();return}const del=e.target.closest("[data-delete-product]");if(del){products=products.filter(p=>p.id!==del.dataset.deleteProduct);writeStore("milir_products_v2",products);renderProducts();renderAdmin();toast("Demo product removed.");return}const de=e.target.closest("[data-delete-enquiry]");if(de){savedEnquiries=savedEnquiries.filter(x=>x.id!==de.dataset.deleteEnquiry);writeStore("milir_enquiries",savedEnquiries);renderAdmin();return}});
["productModal","cartDrawer","adminModal"].forEach(id=>$("#"+id).addEventListener("click",e=>{if(e.target.id===id)closeOverlay(id)}));
$("#cartOpen").addEventListener("click",()=>{renderCart();openOverlay("cartDrawer")});$("#cartClear").addEventListener("click",()=>{cart=[];writeStore("milir_cart",cart);renderCart()});
$("#cartCheckout").addEventListener("click",()=>{if(!cart.length){toast("Add an item first.");return}const lines=cart.map(x=>{const p=findProduct(x.id);return p?`• ${p.name} × ${x.qty} (${p.price?money(p.price)+' indicative':'price on enquiry'})`:null}).filter(Boolean).join("\n");openWhatsApp(`Hello Milir! I'd like to enquire about these website selections:\n${lines}\nPlease confirm actual availability, final prices and order/rental terms.`)});
$("#enquiryForm").addEventListener("submit",e=>{e.preventDefault();const data=buildEnquiry();if(!/^[0-9+\s()-]{7,}$/.test(data.phone)){ $("#formFeedback").textContent="Please enter a valid phone number.";return}data.id="e"+Date.now();savedEnquiries.unshift(data);writeStore("milir_enquiries",savedEnquiries);$("#formFeedback").textContent="Your draft is ready. WhatsApp will open so you can review and send it.";openWhatsApp(enquiryMessage(data));});
$("#copyEnquiry").addEventListener("click",async()=>{const f=$("#enquiryForm");if(!f.reportValidity())return;const msg=enquiryMessage(buildEnquiry());try{await navigator.clipboard.writeText(msg);$("#formFeedback").textContent="Enquiry copied. You can paste it into WhatsApp."}catch{$("#formFeedback").textContent=msg}});
$("#whatsappFab").addEventListener("click",()=>openWhatsApp("Hello Milir! I'd like to enquire about your boutique, rental jewellery or beauty services."));
$$('a[href="#admin"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();adminTab="products";renderAdmin();openOverlay("adminModal")}));
$("#adminPanel").addEventListener("submit",e=>{if(e.target.id!=="addProductForm")return;e.preventDefault();const d=new FormData(e.target);const p={id:"custom"+Date.now(),name:d.get("name"),category:d.get("category"),type:d.get("type"),price:Number(d.get("price")),image:imageA,position:"center",tag:"Admin demo",description:"Demo item added through local admin preview. Replace with accurate product details and approved product photography.",mock:true};products.unshift(p);if(p.type==="Rental")jewellery.unshift(p);writeStore("milir_products_v2",products);writeStore("milir_jewellery_v2",jewellery);renderProducts();renderAdmin();toast("Demo item added locally.")});
$("#adminPanel").addEventListener("click",e=>{if(e.target.id==="exportEnquiries"){const blob=new Blob([JSON.stringify(savedEnquiries,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="milir-demo-enquiries.json";a.click();URL.revokeObjectURL(url)}if(e.target.id==="resetDemo"){localStorage.removeItem("milir_products_v2");localStorage.removeItem("milir_jewellery_v2");products=defaultProducts;jewellery=defaultJewellery;writeStore("milir_products_v2",products);writeStore("milir_jewellery_v2",jewellery);renderProducts();renderAdmin();toast("Catalogue reset.")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".overlay.open").forEach(o=>closeOverlay(o.id))});
}
init();
/* ---------- Cursor-scrubbed film hero ---------- */
(function initHero(){
  const canvas=document.getElementById("heroCanvas"); if(!canvas) return;
  const hero=canvas.closest(".hero-film"), hint=document.getElementById("heroHint");
  const ctx=canvas.getContext("2d"); const N=60, FOCUS_X=0.62, ZOOM=1.2; // zoom anchors to the top so the generator's corner mark falls outside the frame
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchOnly=matchMedia("(hover: none)").matches;
  const frames=new Array(N).fill(null); let poster=null;
  let cur=0, target=0, running=false, last=0, dpr=1, W=0, H=0, hinted=false, autoT=0;
  const src=i=>"assets/hero/f"+String(i+1).padStart(3,"0")+".webp";
  function load(u,cb){const im=new Image();im.decoding="async";im.onload=()=>cb(im);im.src=u}
  function size(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=Math.max(1,Math.round(r.width*dpr));H=Math.max(1,Math.round(r.height*dpr));if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H}}
  function cover(im,alpha){const s=Math.max(W/im.naturalWidth,H/im.naturalHeight)*ZOOM,w=im.naturalWidth*s,h=im.naturalHeight*s;ctx.globalAlpha=alpha;ctx.drawImage(im,-(w-W)*FOCUS_X,0,w,h)}
  function nearest(i,dir){for(let k=0;k<N;k++){const j=i+dir*k;if(j>=0&&j<N&&frames[j])return frames[j]}return null}
  function draw(){
    size(); ctx.clearRect(0,0,W,H);
    const i0=Math.floor(cur),f=cur-i0,a=frames[i0]||nearest(i0,-1)||nearest(i0,1)||poster;
    if(!a) return; cover(a,1);
    const b=f>0.02?(frames[Math.min(i0+1,N-1)]):null; if(b) cover(b,f); ctx.globalAlpha=1;
  }
  function tick(t){
    const dt=Math.min(0.05,(t-last)/1000||0.016); last=t;
    if(touchOnly&&!reduce&&!pointerActive){autoT+=dt;target=(Math.sin(autoT*0.5-1.57)+1)/2*(N-1)*0.55}
    cur+=(target-cur)*(1-Math.exp(-dt*5.5)); draw();
    if(Math.abs(target-cur)>0.01||(touchOnly&&!reduce)) requestAnimationFrame(tick); else running=false;
  }
  function go(){if(!running){running=true;last=performance.now();requestAnimationFrame(tick)}}
  let pointerActive=false;
  function aim(e){
    if(reduce) return; const r=hero.getBoundingClientRect();
    const x=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));
    target=x*(N-1); pointerActive=true; go();
    if(!hinted&&hint){hinted=true;hint.classList.add("gone")}
  }
  hero.addEventListener("pointermove",aim);
  hero.addEventListener("pointerdown",aim);
  hero.addEventListener("pointerleave",()=>{pointerActive=false;if(!touchOnly)target=0;go()});
  hero.addEventListener("pointercancel",()=>{pointerActive=false;go()});
  addEventListener("resize",()=>draw());
  load("assets/hero/poster.webp",im=>{poster=im;draw()});
  if(!reduce){
    // load frames outward from the idle pose so the first movement is already smooth
    let idx=0;(function next(){if(idx>=N)return;const i=idx++;load(src(i),im=>{frames[i]=im;if(i===0||i%10===0)draw();next()});})();
    (function more(){let k=0;while(k++<2&&idx<N){const i=idx++;load(src(i),im=>{frames[i]=im})}})();
    if(touchOnly) go();
  }
})();
