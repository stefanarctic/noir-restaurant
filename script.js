// Nav scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('mobileClose').addEventListener('click', closeMobile);
function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}

// Menu tabs
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Newsletter form
function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const origText = btn.textContent;
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#4a7c59';
  setTimeout(() => {
    btn.textContent = origText;
    btn.style.background = '';
    e.target.reset();
  }, 2500);
}

// Reservation form
function handleReservation(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Reservation Confirmed ✓';
  btn.style.background = '#4a7c59';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Confirm Reservation';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}

// Set min date for reservation
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Gallery lightbox with arrows
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

const galleryImages = Array.from(document.querySelectorAll('.gallery-popup'));
let currentGalleryIndex = 0;

function openGalleryLightbox(index) {
  currentGalleryIndex = index;
  const img = galleryImages[currentGalleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrevImage() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentGalleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
}

function showNextImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  const img = galleryImages[currentGalleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
}

galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => openGalleryLightbox(i));
});

lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  if (lightbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
  }
});

// Dish modal for menu items
const dishModal = document.getElementById('dishModal');
const dishModalClose = document.getElementById('dishModalClose');
const dishModalImg = document.getElementById('dishModalImg');
const dishModalTag = document.getElementById('dishModalTag');
const dishModalName = document.getElementById('dishModalName');
const dishModalDesc = document.getElementById('dishModalDesc');
const dishModalPrice = document.getElementById('dishModalPrice');
const dishModalBadge = document.getElementById('dishModalBadge');

document.querySelectorAll('.menu-popup').forEach(img => {
  img.addEventListener('click', () => {
    const card = img.closest('.menu-card');
    dishModalImg.src = img.src;
    dishModalImg.alt = img.alt;
    dishModalTag.textContent = card.querySelector('.menu-card-tag')?.textContent || '';
    dishModalName.textContent = card.querySelector('.menu-card-name')?.textContent || '';
    dishModalDesc.textContent = card.querySelector('.menu-card-desc')?.textContent || '';
    dishModalPrice.textContent = card.querySelector('.menu-price')?.textContent || '';
    const badgeEl = card.querySelector('.menu-badge');
    dishModalBadge.textContent = badgeEl?.textContent || '';
    dishModalBadge.style.display = badgeEl ? 'inline-block' : 'none';
    dishModal.classList.add('open');
    dishModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeDishModal() {
  dishModal.classList.remove('open');
  dishModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

dishModalClose.addEventListener('click', closeDishModal);
dishModal.addEventListener('click', (e) => {
  if (e.target === dishModal) closeDishModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dishModal.classList.contains('open')) closeDishModal();
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
