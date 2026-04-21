# 🏺 Yara Pottery — Website Workshop & Shop

Website keramik handmade berbasis JSON, tanpa database. Semua konten dikelola melalui file JSON.

---

## 📁 Struktur Folder

```
portfolio/
├── index.html          ← Halaman utama (jangan diubah strukturnya)
├── README.md           ← Panduan ini
│
├── css/
│   └── style.css       ← Ubah tampilan, warna, font di sini
│
├── js/
│   ├── data-loader.js  ← Engine: baca JSON → render HTML
│   └── main.js         ← Navbar, cart, booking, animasi
│
├── data/               ← ✏️ EDIT INI UNTUK UPDATE KONTEN
│   ├── profile.json    ← Nama, bio, kontak, social media
│   ├── workshops.json  ← Daftar kelas workshop
│   ├── products.json   ← Produk keramik untuk dijual
│   └── testimonials.json ← Ulasan pelanggan
│
└── assets/
    ├── images/
    │   ├── placeholder.svg     ← Gambar default
    │   └── projects/           ← Foto workshop & produk
    ├── videos/
    ├── icons/favicon.svg
    └── fonts/
```

---

## ✏️ Cara Update Konten

### 1. Update Info Studio (`data/profile.json`)
```json
{
  "name": "Nama Studio Anda",
  "tagline": "Tagline Anda",
  "bio": "Deskripsi studio...",
  "email": "email@anda.com",
  "phone": "+62 ...",
  "location": "Kota Anda",
  "socials": {
    "instagram": "https://instagram.com/...",
    "whatsapp": "https://wa.me/62..."
  },
  "hero_title": "Judul Hero",
  "hero_subtitle": "Subtitle Hero"
}
```

### 2. Update Workshop (`data/workshops.json`)
Tambah atau edit item dalam array:
```json
{
  "id": "w5",                        ← ID unik
  "title": "Nama Workshop",
  "description": "Deskripsi...",
  "duration": "3 jam",
  "capacity": "8 orang",
  "price": 350000,                   ← Harga dalam Rupiah
  "image": "assets/images/projects/nama-foto.jpg",
  "schedule": "Setiap Sabtu",
  "includes": ["Item 1", "Item 2"],  ← Yang termasuk
  "category": "workshop"
}
```

### 3. Update Produk (`data/products.json`)
```json
{
  "id": "p7",
  "name": "Nama Produk",
  "description": "Deskripsi...",
  "price": 185000,
  "image": "assets/images/projects/foto-produk.jpg",
  "category": "product",
  "badge": "New",    ← "Bestseller" / "New" / "Limited" / "" (kosong)
  "stock": 10,       ← 0 = Habis
  "material": "Stoneware",
  "size": "300ml"
}
```

### 4. Update Testimonial (`data/testimonials.json`)
```json
{
  "name": "Nama Pelanggan",
  "role": "Peserta Workshop",
  "text": "Ulasan pelanggan...",
  "rating": 5,       ← 1-5 bintang
  "avatar": "NP"     ← Inisial 2 huruf
}
```

---

## 🖼️ Cara Tambah Foto

1. Simpan foto di `assets/images/projects/`
2. Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Ukuran ideal: **800×600px** untuk kartu workshop/produk
4. Update path di file JSON yang sesuai

---

## 🎨 Cara Ubah Warna & Tampilan (`css/style.css`)

Cari bagian `:root` di awal file:
```css
:root {
  --bg:          #FFF0E0;   /* Background utama */
  --clay:        #C8956C;   /* Warna aksen utama */
  --clay-dark:   #9E6744;   /* Warna aksen gelap */
  --clay-light:  #E8C4A0;   /* Warna aksen terang */
  --text:        #2C1A0E;   /* Warna teks */
}
```

---

## 🛒 Cara Kerja Sistem Belanja

### Produk (Shop)
- Klik **Beli** → produk masuk keranjang (localStorage)
- Klik ikon 🛒 → buka keranjang
- Klik **Checkout via WA** → otomatis buka WhatsApp dengan pesan pesanan

### Workshop (Booking)
- Klik **Daftar Sekarang** → form pendaftaran terbuka
- Isi nama, nomor WA, tanggal, jumlah peserta
- Klik **Daftar via WhatsApp** → otomatis buka WhatsApp

### Update Nomor WhatsApp
Cari `6281234567890` di file `js/main.js` dan ganti dengan nomor Anda (format: 62xxxxxxxxx tanpa +).

---

## 🚀 Cara Jalankan

### Lokal (Development)
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js
npx serve .

# Menggunakan VS Code
Install ekstensi "Live Server" → klik kanan index.html → Open with Live Server
```

> ⚠️ **Jangan** buka `index.html` langsung di browser (file://) karena fetch JSON tidak akan bekerja. Gunakan server lokal.

### Deploy ke Hosting
Upload semua file ke hosting (Netlify, Vercel, GitHub Pages, atau hosting biasa).

---

## 📞 Bantuan

Untuk pertanyaan teknis, hubungi developer melalui email atau WhatsApp.
