import React from "react";
import { IconGraduationCap, IconDatabase } from "./Icons";

export default function Navbar({ isBackendConnected }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-brand">
          <div className="brand-icon-wrapper">
            <IconGraduationCap size={22} />
          </div>
          <div className="brand-meta">
            <h1>Sistem Administrasi Data Siswa</h1>
            <p>Portal Pengelolaan Data Induk Akademik &amp; Jurusan Siswa</p>
          </div>
        </div>

        <div className="nav-status">
          <div
            className={`system-status-chip ${
              isBackendConnected ? "status-online" : "status-offline"
            }`}
          >
            <span className="status-indicator"></span>
            <IconDatabase size={13} />
            <span>
              {isBackendConnected
                ? "Database PostgreSQL (5432) Terhubung"
                : "Server Backend Tidak Terjangkau"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
