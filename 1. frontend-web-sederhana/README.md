# Frontend Web Sederhana

Project ini adalah form pendaftaran sederhana yang dibangun dengan HTML, CSS, dan JavaScript murni. Form ini memiliki validasi input secara real-time dan tampilan yang modern dengan efek glassmorphism.

## Fitur

- **Validasi Form**: Validasi real-time untuk semua input field
  - Nama Lengkap: minimal 3 karakter
  - Email: format email yang valid
  - Password: minimal 8 karakter
  - Konfirmasi Password: harus sama dengan password

- **Tampilan Modern**:
  - Efek glassmorphism dengan backdrop blur
  - Gradien warna yang menarik
  - Animasi smooth pada interaksi
  - Responsive design untuk mobile dan desktop

- **Page Loader**: Animasi loading saat halaman dimuat

## Struktur File

- `index.html` - Struktur HTML form pendaftaran
- `style.css` - Stylesheet dengan efek glassmorphism dan animasi
- `script.js` - Logika validasi form dan interaksi

## Cara Menjalankan

1. Buka folder `1. frontend-web-sederhana`
2. Buka file `index.html` menggunakan web browser favorit Anda:
   - Double click file `index.html`, atau
   - Klik kanan pada file `index.html` dan pilih "Open with" > pilih browser Anda

## Cara Penggunaan

1. Isi form pendaftaran dengan data Anda:
   - Masukkan nama lengkap (minimal 3 karakter)
   - Masukkan email dengan format yang valid
   - Buat password (minimal 8 karakter)
   - Konfirmasi password (harus sama dengan password)

2. Klik tombol "Daftar"

3. Jika semua data valid, akan muncul pesan "Pendaftaran Berhasil"

4. Form akan otomatis reset setelah pendaftaran berhasil

## Teknologi yang Digunakan

- HTML5
- CSS3 dengan fitur:
  - CSS Grid dan Flexbox
  - Backdrop Filter
  - CSS Animations
  - CSS Variables
- JavaScript (ES6+)