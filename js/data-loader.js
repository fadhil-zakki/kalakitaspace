/* data-loader.js — reads JSON files and renders HTML */

const DataLoader = {

  async load(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return await res.json();
    } catch (e) {
      console.warn('DataLoader:', e.message);
      return null;
    }
  },

  formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  },

  renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
    ).join('');
  },

  async renderProfile() {
    const data = await this.load('data/profile.json');
    if (!data) return;

    document.querySelectorAll('[data-profile]').forEach(el => {
      const key = el.dataset.profile;
      if (data[key] !== undefined) el.textContent = data[key];
    });

    const heroTitle = document.getElementById('hero-title');
    const heroSub = document.getElementById('hero-subtitle');
    if (heroTitle) heroTitle.textContent = data.hero_title;
    if (heroSub) heroSub.textContent = data.hero_subtitle;

    // Social links
    if (data.socials) {
      Object.entries(data.socials).forEach(([platform, url]) => {
        const el = document.querySelector(`[data-social="${platform}"]`);
        if (el) el.href = url;
      });
    }
  },

  async renderWorkshops() {
    const data = await this.load('data/workshops.json');
    const container = document.getElementById('workshops-grid');
    if (!data || !container) return;

    container.innerHTML = data.map(w => `
      <div class="card workshop-card" data-id="${w.id}">
        <div class="card-image">
          <img src="${w.image}" alt="${w.title}" onerror="this.src='assets/images/placeholder.svg'">
          <span class="card-badge">${w.duration}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${w.title}</h3>
          <p class="card-desc">${w.description}</p>
          <ul class="includes-list">
            ${w.includes.map(i => `<li>✓ ${i}</li>`).join('')}
          </ul>
          <div class="card-meta">
            <span class="capacity">👥 ${w.capacity}</span>
            <span class="schedule">📅 ${w.schedule}</span>
          </div>
          <div class="card-footer">
            <span class="price">${this.formatPrice(w.price)}<small>/orang</small></span>
            <button class="btn-book" onclick="bookWorkshop('${w.id}', '${w.title}', ${w.price})">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  async renderProducts() {
    const data = await this.load('data/products.json');
    const container = document.getElementById('products-grid');
    if (!data || !container) return;

    this._productsData = data;

    container.innerHTML = data.map(p => `
      <div class="card product-card" data-id="${p.id}">
        <div class="card-image">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/images/placeholder.svg'">
          ${p.badge ? `<span class="card-badge badge-accent">${p.badge}</span>` : ''}
          ${p.stock <= 5 && p.stock > 0 ? `<span class="stock-warning">Sisa ${p.stock}</span>` : ''}
          ${p.stock === 0 ? `<span class="out-of-stock">Habis</span>` : ''}
        </div>
        <div class="card-body">
          <div class="product-meta-top">
            <span class="material-tag">${p.material}</span>
            <span class="size-tag">${p.size}</span>
          </div>
          <h3 class="card-title">${p.name}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-footer">
            <span class="price">${this.formatPrice(p.price)}</span>
            <button class="btn-buy ${p.stock === 0 ? 'disabled' : ''}"
              ${p.stock === 0 ? 'disabled' : ''}
              onclick="addToCart('${p.id}')">
              ${p.stock === 0 ? 'Habis' : 'Beli'}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  async renderTestimonials() {
    const data = await this.load('data/testimonials.json');
    const container = document.getElementById('testimonials-grid');
    if (!data || !container) return;

    container.innerHTML = data.map(t => `
      <div class="testimonial-card">
        <div class="stars">${this.renderStars(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="avatar">${t.avatar}</div>
          <div>
            <strong>${t.name}</strong>
            <span>${t.role}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  async init() {
    await Promise.all([
      this.renderProfile(),
      this.renderWorkshops(),
      this.renderProducts(),
      this.renderTestimonials()
    ]);
  }
};
