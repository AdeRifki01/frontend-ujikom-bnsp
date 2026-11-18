import React from 'react';

export default function DashboardStats({ totalSiswa, totalJurusan, latestSiswa }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <p>Total Data Siswa</p>
          <h3>{totalSiswa}</h3>
        </div>
        <div className="stat-icon stat-blue">
          👥
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <p>Program Keahlian / Jurusan</p>
          <h3>{totalJurusan}</h3>
        </div>
        <div className="stat-icon stat-green">
          🏛️
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <p>Siswa Terakhir Ditambahkan</p>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {latestSiswa ? latestSiswa.nama_siswa : '-'}
          </h3>
        </div>
        <div className="stat-icon stat-amber">
          ✨
        </div>
      </div>
    </div>
  );
}
