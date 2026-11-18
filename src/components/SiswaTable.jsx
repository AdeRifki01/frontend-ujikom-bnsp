import React from "react";
import {
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconX,
  IconBookOpen,
  IconCalendar
} from "./Icons";

// Helper inisial nama (2 huruf)
function getInitials(name = "") {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Helper format tanggal ramah dibaca (ID)
function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
}

export default function SiswaTable({
  siswaList,
  loading,
  searchTerm,
  onSearchChange,
  onAddNew,
  onEdit,
  onDelete
}) {
  return (
    <div className="main-card">
      {/* Header & Filter Toolbar */}
      <div className="main-card-header">
        <div className="card-heading">
          <h2>Daftar Induk Siswa</h2>
          <p>Rekapitulasi lengkap data siswa, tanggal pendaftaran, alamat, dan jurusan</p>
        </div>

        <div className="toolbar">
          <div className="search-wrapper">
            <span className="search-icon-adornment">
              <IconSearch size={16} />
            </span>
            <input
              type="text"
              className="search-field"
              placeholder="Cari nama, kode, jurusan..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => onSearchChange("")}
                title="Bersihkan pencarian"
              >
                <IconX size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddNew}
            title="Tambah data siswa baru"
          >
            <IconPlus size={15} />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading-box">
            <div className="clean-spinner"></div>
            <p>Memuat data siswa dari basis data...</p>
          </div>
        ) : siswaList.length === 0 ? (
          <div className="table-empty-box">
            <div className="empty-icon-circle">
              <IconSearch size={22} />
            </div>
            <h3>Tidak Ada Data yang Sesuai</h3>
            <p>
              {searchTerm
                ? `Tidak ditemukan siswa dengan kata kunci "${searchTerm}". Silakan periksa kembali ejaan Anda.`
                : "Belum ada catatan siswa di database. Silakan klik tombol 'Tambah Siswa' untuk menambahkan data pertama."}
            </p>
          </div>
        ) : (
          <table className="sim-table">
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>No</th>
                <th style={{ width: "120px" }}>Kode Siswa</th>
                <th>Nama Lengkap</th>
                <th>Alamat Domisili</th>
                <th style={{ width: "140px" }}>Tanggal Terdata</th>
                <th style={{ width: "160px" }}>Program Jurusan</th>
                <th style={{ width: "130px", textAlign: "center" }}>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {siswaList.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", color: "var(--text-subtle)", fontSize: "0.8rem" }}>
                    {index + 1}
                  </td>
                  <td>
                    <span className="code-tag">{item.kode_siswa}</span>
                  </td>
                  <td>
                    <div className="user-identity">
                      <div className="user-avatar">{getInitials(item.nama_siswa)}</div>
                      <div className="user-name-box">
                        <span className="user-full-name">{item.nama_siswa}</span>
                        <span className="user-sub-id">ID: #{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ maxWidth: "260px", color: "var(--text-muted)", fontSize: "0.83rem" }}>
                    {item.alamat_siswa}
                  </td>
                  <td>
                    <div className="date-cell">
                      <IconCalendar size={13} className="date-icon" />
                      <span>{formatDateIndo(item.tgl_siswa)}</span>
                    </div>
                  </td>
                  <td>
                    <span className="jurusan-badge">
                      <IconBookOpen size={12} />
                      <span>{item.nama_jurusan || item.kode_jurusan || "Umum"}</span>
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="row-actions" style={{ justifyContent: "center" }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => onEdit(item)}
                        title="Perbarui informasi siswa ini"
                      >
                        <IconEdit size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-subtle-danger btn-sm"
                        onClick={() => onDelete(item)}
                        title="Hapus data siswa ini"
                      >
                        <IconTrash size={13} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Info Rekapitulasi */}
      {!loading && siswaList.length > 0 && (
        <div className="table-footer">
          <span>
            Menampilkan <strong>{siswaList.length}</strong> catatan siswa
            {searchTerm && ` (disaring berdasarkan "${searchTerm}")`}
          </span>
          <span>Sistem Informasi Akademik • Siap Uji Asesmen</span>
        </div>
      )}
    </div>
  );
}
