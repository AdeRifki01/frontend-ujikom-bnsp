import React from "react";
import { IconUsers, IconBookOpen, IconUserCheck } from "./Icons";

export default function DashboardStats({ totalSiswa, totalJurusan, latestSiswa }) {
  return (
    <div className="stats-grid">
      <div className="kpi-card">
        <div className="kpi-content">
          <span className="kpi-label">Total Siswa Terdaftar</span>
          <span className="kpi-value">{totalSiswa}</span>
          <span className="kpi-subtext">Data tersimpan di PostgreSQL</span>
        </div>
        <div className="kpi-icon-box kpi-icon-blue">
          <IconUsers size={22} />
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-content">
          <span className="kpi-label">Program Jurusan</span>
          <span className="kpi-value">{totalJurusan}</span>
          <span className="kpi-subtext">Master keahlian terdaftar</span>
        </div>
        <div className="kpi-icon-box kpi-icon-emerald">
          <IconBookOpen size={22} />
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-content">
          <span className="kpi-label">Pendaftaran Terakhir</span>
          <span
            className="kpi-value"
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px"
            }}
            title={latestSiswa ? latestSiswa.nama_siswa : "-"}
          >
            {latestSiswa ? latestSiswa.nama_siswa : "-"}
          </span>
          <span className="kpi-subtext">
            {latestSiswa
              ? `Kode: ${latestSiswa.kode_siswa} • ${latestSiswa.nama_jurusan || ""}`
              : "Belum ada rekaman"}
          </span>
        </div>
        <div className="kpi-icon-box kpi-icon-indigo">
          <IconUserCheck size={22} />
        </div>
      </div>
    </div>
  );
}
