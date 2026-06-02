# Spesifikasi Teknis Portfolio: Garjita Adicandra

## 1. Konsep Desain & Estetika
- **Tema Visual:** Modern Black (Gelap, Minimalis, Sleek).
- **Palet Warna:** Dominasi Hitam (#000000) dan Abu-abu sangat gelap, dengan aksen kontras minimalis (seperti putih atau warna aksen desaturasi) untuk tipografi dan elemen interaktif.
- **Interaksi:** Menggunakan **GSAP (GreenSock Animation Platform)** untuk orchestrasi animasi yang halus dan performan.
- **Navigasi:** Berbasis **Slide Animation**. Transisi antar section atau halaman harus terasa seperti pergeseran linear (sliding), bukan sekadar perpindahan instan.

## 2. Arsitektur Teknologi (Tech Stack)
- **Frontend & Framework:** **Next.js** (App Router). Memanfaatkan Server Components untuk SEO dan optimasi performa.
- **Database:** **PostgreSQL**. Digunakan untuk menyimpan data proyek, konten blog teknis (AI/Web Dev), serta log interaksi jika diperlukan.
- **ORM:** Disarankan menggunakan Prisma atau Drizzle (sesuai pengalaman sebelumnya dengan Supabase/Prisma) untuk interaksi database yang type-safe.
- **Containerization:** **Docker**. Seluruh ekosistem (Next.js app, PostgreSQL, dan environment lainnya) harus terbungkus dalam container untuk konsistensi deployment dan development.

## 3. Fitur Utama & Struktur Halaman
- **Hero Section:** Animasi masuk berbasis GSAP yang memperkenalkan identitas sebagai mahasiswa IT UGM dengan spesialisasi AI.
- **Project Showcase:** List proyek (Chili Hub, Puskesmas Batulicin, AI Research) yang ditampilkan dengan efek slide horizontal atau vertikal yang dipicu oleh scroll (GSAP ScrollTrigger).
- **Leadership & Experience:** Section khusus untuk 180DC, Nesco 2026, dan AITF dengan layout yang bersih.
- **AI/Tech Blog:** Integrasi konten teknis mengenai Machine Learning dan Web Development.
- **Contact:** Form yang terhubung ke PostgreSQL untuk manajemen pesan masuk.

## 4. Instruksi Implementasi untuk LLM
- Gunakan **framer-motion** atau **GSAP** secara spesifik di dalam komponen React/Next.js. 
- Pastikan konfigurasi `Dockerfile` dan `docker-compose.yml` sudah mencakup environment Next.js dan instance PostgreSQL.
- Fokus pada *User Experience (UX)* yang responsif namun tetap mempertahankan nuansa "high-end" melalui durasi animasi yang tepat.