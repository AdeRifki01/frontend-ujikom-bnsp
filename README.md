# Frontend - Antarmuka Pengguna Data Siswa (React.js)

Aplikasi Frontend berbasis React.js (Vite) untuk menampilkan dan mengelola Data Siswa secara interaktif. Berkomunikasi langsung dengan REST API Backend Express.js.

## Fitur Antarmuka
- **Read**: Tabel data siswa lengkap dengan nomor urut, kode unik, nama, alamat, tanggal, dan badge jurusan.
- **Create**: Modal form tambah data siswa baru dengan validasi interaktif.
- **Update**: Modal form edit data siswa dengan pre-filled data.
- **Delete**: Dialog konfirmasi penghapusan data siswa yang aman.
- **Search**: Pencarian real-time berdasarkan nama, kode siswa, atau jurusan.
- **Stats Dashboard**: Kartu ringkasan total siswa, jurusan, dan data terbaru.
- **Toast Notifications**: Notifikasi instan atas keberhasilan atau kegagalan aksi operasi data.
- **Backup File**: Tombol pemicu ekspor berkas data siswa ke server.

## Cara Instalasi & Menjalankan

1. Pastikan server backend sudah berjalan di `http://localhost:5000`.
2. Buka terminal di direktori frontend:
   ```bash
   npm install
   ```
3. Jalankan server pengembang React:
   ```bash
   npm run dev
   ```
4. Buka peramban (browser) di: `http://localhost:3000`.
