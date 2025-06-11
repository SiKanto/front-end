# 🌐 Laporan Proyek Front End - KANTO: Web Application - User & Admin Panel

Proyek ini merupakan sistem aplikasi berbasis web yang terdiri dari dua bagian utama:
- **User App**: Aplikasi pengguna berbasis Vite, React, dan TypeScript.
- **Admin Panel**: Dashboard admin berbasis React, TailwindCSS, dan CRACO.

## 🧩 Overview

This project aims to build an interactive and responsive web application through a full-stack development workflow—starting from UI/UX design, front-end implementation, back-end integration, and final deployment.

---

## 🎨 UI/UX Design Process

### 1. 🎯 Research & Benchmarking
Pengembangan dimulai dengan riset mendalam untuk memahami kebutuhan pengguna dan merancang antarmuka yang intuitif. Proses benchmarking dilakukan terhadap aplikasi sejenis untuk memahami fitur dan alur pengguna yang ideal.

### 2. 🖌 Desain Prototipe dengan Figma
Desain antarmuka dibuat menggunakan Figma, mencakup:
- Tata letak halaman utama dan sidebar informasi tempat
- Warna, font, dan ikon yang konsisten dengan tema aplikasi
- Versi responsif untuk mobile dan desktop

![image](https://github.com/user-attachments/assets/867aea94-589b-4a27-a8da-c0868a34765e)
![image](https://github.com/user-attachments/assets/51dfd787-d0c1-48d0-b186-00a4d7876cb0)
![image](https://github.com/user-attachments/assets/ba30433b-6d5c-43f3-918d-c851b29b7c08)

Desain ini menjadi panduan utama dalam proses implementasi dan integrasi antarmuka.

---

## 💻 Tech Stack

| Layer         | Teknologi                         |
|--------------|------------------------------------|
| Frontend     | Vite, React, TypeScript            |
| Admin Panel  | React, TailwindCSS, CRACO          |
| Styling      | TailwindCSS, CSS Modules           |
| Peta         | Leaflet, React-Leaflet             |
| OAuth        | Google OAuth 2.0 via `@react-oauth/google` |
| Visualisasi  | Chart.js, React Chart.js 2         |
| Deployment   | Netlify (User), Railway (Backend)  |

---

## 🚀 Development Workflow

### 🧭 User App
Aplikasi pengguna dikembangkan untuk memberikan pengalaman interaktif dan nyaman menggunakan framework modern.

#### 🔨 Fitur-fitur:
- **Routing Dinamis**: Navigasi antar halaman dengan `react-router-dom` v6.
- **Animasi & Efek Scroll**: Diperkuat dengan `framer-motion` dan `react-transition-group`.
- **Peta Interaktif**: Tempat wisata ditampilkan melalui `leaflet` dan `react-leaflet`.
- **Login Google OAuth**: Autentikasi pengguna menggunakan `@react-oauth/google`.
- **Fitur Favorit**: Pengguna dapat menyimpan lokasi favorit melalui sistem `SavedPlacesContext`.
- **Konfigurasi Lingkungan**: `.env` digunakan untuk menyimpan variabel sensitif.

### 🛠 Admin Panel
Panel admin memudahkan monitoring dan pengelolaan konten serta pengguna.

#### 📊 Fitur-fitur:
- **Dashboard Monitoring**: Tampilkan statistik dan informasi data internal.
- **Manajemen Tiket & Destinasi**: Admin bisa mengedit data pengguna, destinasi, dan tiket.
- **Chart Visualisasi**: Statistik pengguna dan aktivitas divisualisasi dengan Chart.js.
- **Sistem Login/Register**: Autentikasi admin lengkap dengan reset password.
- **Komponen Modular**: Sidebar, Header, dan LoadingSpinner digunakan lintas halaman.

---

## 🧪 Testing & Review
Each component was tested during development for:
- Functional integrity
- UI responsiveness
- Consistency with Figma design

Regular code reviews ensured alignment between frontend and backend modules.

---

## 📦 Deployment

| Module      | Platform |
|-------------|----------|
| User App    | Netlify  |
| Admin Panel | [Optional Deployment] |
| Backend API | Railway  |

CI/CD setup ensures auto-deployments after merging updates to the main branch.

---

## 🔧 Maintenance & Monitoring

Setelah deployment:
- Performa dan error log dimonitor rutin.
- Perbaikan bug dan update fitur dilakukan secara berkala.
- Penyesuaian backend dilakukan agar tetap sesuai dengan struktur data frontend.

---

> Dibuat sebagai bagian dari pembelajaran dan pengembangan aplikasi berbasis modern stack dengan prinsip modular dan maintainable.

