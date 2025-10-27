# SiputTool — Versi Deploy-Ready (Bahasa Indonesia)

**SiputTool** adalah versi deploy-ready dari aplikasi growth TikTok yang _etis_ (tanpa auto-viewer). Aplikasi ini dibuat dengan **Vite + React + Tailwind CSS** dan siap di-deploy ke **Vercel**.

## Fitur utama
- Embed preview video TikTok (public URL)
- Generator hashtag & caption (demo)
- Kalender konten lokal (add/remove)
- Tips growth legal

## Cara cepat menjalankan (lokal)
1. Install dependency:
```bash
npm install
```
2. Jalankan development server:
```bash
npm run dev
```
3. Buka `http://localhost:5173`

## Cara deploy ke Vercel (sangat mudah)
1. Push repository ini ke GitHub.
2. Buka https://vercel.com, login, klik **New Project** → **Import from GitHub**.
3. Pilih repo yang berisi SiputTool.
4. Vercel otomatis mendeteksi build command `npm run build` dan output `dist`.
5. Klik Deploy — selesai. URL contoh: `https://siputtool.vercel.app`

> Catatan: Untuk mengaktifkan integrasi TikTok (analytics / posting otomatis) kamu perlu memasukkan OAuth keys dari TikTok Developer — ini **tidak** disertakan demi keamanan.

Jika mau, aku bisa bantu langkah demi langkah push ke GitHub dan deploy ke Vercel.
