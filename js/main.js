/* main.js — navbar, cart, animations, booking form */

/* ── CART ──────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('yara_cart') || '[]');

function saveCart() {
  localStorage.setItem('yara_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId) {
  const products = DataLoader._productsData;
  if (!products) return;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart();
  showToast(`${product.name} ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartModal();
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) { modal.classList.add('open'); renderCartModal(); }
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.remove('open');
}

function renderCartModal() {
  const body = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Keranjang masih kosong 🛒</p>';
    if (total) total.textContent = '';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${DataLoader.formatPrice(item.price)} × ${item.qty}</span>
      </div>
      <div class="cart-item-actions">
        <span class="cart-item-subtotal">${DataLoader.formatPrice(item.price * item.qty)}</span>
        <button class="btn-remove" onclick="removeFromCart('${item.id}')">✕</button>
      </div>
    </div>
  `).join('');

  const grandTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (total) total.innerHTML = `Total: <strong>${DataLoader.formatPrice(grandTotal)}</strong>`;
}

function checkout() {
  if (cart.length === 0) return;
  const items = cart.map(i => `• ${i.name} x${i.qty}: ${DataLoader.formatPrice(i.price * i.qty)}`).join('\n');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = encodeURIComponent(
    `Halo Yara Pottery! Saya ingin memesan:\n\n${items}\n\nTotal: ${DataLoader.formatPrice(total)}\n\nMohon konfirmasi ketersediaan. Terima kasih!`
  );
  window.open(`https://wa.me/6285121240199?text=${msg}`, '_blank');
}

/* ── BOOKING ───────────────────────────────────────── */
function bookWorkshop(id, title, price) {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  document.getElementById('booking-title').textContent = title;
  document.getElementById('booking-price').textContent = DataLoader.formatPrice(price) + '/orang';
  document.getElementById('booking-workshop-id').value = id;
  document.getElementById('booking-workshop-name').value = title;
  modal.classList.add('open');
}

function closeBooking() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.remove('open');
}

function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('booking-name').value;
  const phone = document.getElementById('booking-phone').value;
  const date = document.getElementById('booking-date').value;
  const participants = document.getElementById('booking-participants').value;
  const workshopName = document.getElementById('booking-workshop-name').value;

  const msg = encodeURIComponent(
    `Halo Yara Pottery! Saya ingin mendaftar workshop:\n\n` +
    `🎨 Workshop: ${workshopName}\n` +
    `👤 Nama: ${name}\n` +
    `📱 No. HP: ${phone}\n` +
    `📅 Tanggal: ${date}\n` +
    `👥 Peserta: ${participants} orang\n\n` +
    `Mohon konfirmasi pendaftaran. Terima kasih!`
  );
  window.open(`https://wa.me/6285121240199?text=${msg}`, '_blank');
  closeBooking();
}

/* ── NAVBAR ────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  toggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggle?.classList.remove('open');
    });
  });
}

/* ── SMOOTH SCROLL ─────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── INTERSECTION OBSERVER (fade-in) ──────────────── */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ── TOAST ─────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ── CONTACT FORM ──────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const message = form.querySelector('[name="message"]').value;
    const msg = encodeURIComponent(`Halo! Saya ${name} ingin bertanya:\n\n${message}`);
    window.open(`https://wa.me/6285121240199?text=${msg}`, '_blank');
  });
}

/* ── TABS (Shop filter) ────────────────────────────── */
function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // future: filter logic
    });
  });
}

/* ── CLOSE MODALS ON BACKDROP CLICK ───────────────── */
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
}

/* ── SET MIN DATE FOR BOOKING ──────────────────────── */
function initDatepicker() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
}

/* ── INIT ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initSmoothScroll();
  initModals();
  initContactForm();
  initTabs();
  initDatepicker();

  await DataLoader.init();

  updateCartUI();
  initAnimations();
});
