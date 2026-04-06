let currentSlide = 0;
let totalSlides = 0;

function openPopup(title, desc, techs = [], links = [], images = []) {
  document.getElementById('popup').classList.add('active');
  document.getElementById('popup-title').innerText = title;
  document.getElementById('popup-desc').innerText = desc;

  // Tech tags
  const techContainer = document.getElementById('popup-tech');
  techContainer.innerHTML = techs.map(t =>
    `<span class="text-xs px-2 py-1 rounded border border-[#39FF14]/40 text-[#39FF14]">${t}</span>`
  ).join('');

  // Links
  const linkContainer = document.getElementById('popup-links');
  linkContainer.innerHTML = links.map(l =>
    `<a href="${l.url}" target="_blank" class="neon-btn text-sm inline-block">${l.label}<span></span></a>`
  ).join('');

  // Carousel
  currentSlide = 0;
  totalSlides = images.length || 1;
  const slidesEl = document.getElementById('popup-slides');
  const dotsEl = document.getElementById('popup-dots');

  const imgs = images.length ? images : ['https://via.placeholder.com/600x300'];
  slidesEl.style.width = `${imgs.length * 100}%`;
  slidesEl.innerHTML = imgs.map(src =>
   `<div style="width:${100 / imgs.length}%;height:100%;flex-shrink:0;overflow:hidden;">
      <img src="${src}" onclick="zoomImage(this.src)" style="cursor:zoom-in;width:100%;height:100%;object-fit:cover;display:block;">
    </div>`
  ).join('');

  dotsEl.innerHTML = imgs.map((_, i) =>
    `<div class="w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-[#39FF14]' : 'bg-gray-600'}"></div>`
  ).join('');

  totalSlides = imgs.length;
  updateCarousel();
}

function slideCarousel(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
}

function updateCarousel() {
  const slidesEl = document.getElementById('popup-slides');
  slidesEl.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
  document.querySelectorAll('#popup-dots div').forEach((dot, i) => {
    dot.className = `w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-[#39FF14]' : 'bg-gray-600'}`;
  });
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('popup').addEventListener('click', function(e) {
    if (e.target.id === 'popup') closePopup();
  });
});

function zoomImage(src) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
  overlay.innerHTML = `<img src="${src}" style="max-width:90vw;max-height:90vh;object-fit:contain;border:1px solid #39FF14;">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

let currentWire = 0;
const totalWires = 5;

function slideWire(dir) {
  currentWire = (currentWire + dir + totalWires) % totalWires;
  const slidesEl = document.getElementById('wire-slides');
  slidesEl.style.transform = `translateX(-${currentWire * 20}%)`;
  document.querySelectorAll('#wire-dots div').forEach((dot, i) => {
    dot.className = `w-2 h-2 rounded-full transition-all ${i === currentWire ? 'bg-[#39FF14]' : 'bg-gray-600'}`;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});