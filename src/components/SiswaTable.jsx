import React from "react";

export default function SiswaTable({ siswaList, loading, searchTerm, onSearchChange, onAddNew, onEdit, onDelete, onExport }) {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                    <h2>Daftar Data Siswa</h2>
                    <p>Kelola data siswa, informasi tanggal, alamat, dan program jurusan</p>
                </div>

                <div className="action-bar">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input type="text" className="search-input" placeholder="Cari nama, kode, jurusan..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={onExport} title="Ekspor data siswa ke file JSON">
                        📥 Backup JSON
                    </button>

                    <button type="button" className="btn btn-primary" onClick={onAddNew}>
                        ➕ Tambah Siswa
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Memuat data dari database...</p>
                    </div>
                ) : siswaList.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📂</div>
                        <h3>Tidak ada data siswa ditemukan</h3>
                        <p>{searchTerm ? "Tidak ada data yang cocok dengan kriteria pencarian Anda." : "Belum ada data siswa di basis data. Klik tombol Tambah Siswa untuk memulai."}</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: "60px" }}>No</th>
                                <th>Kode Siswa</th>
                                <th>Nama Siswa</th>
                                <th>Alamat Siswa</th>
                                <th>Tgl Siswa</th>
                                <th>Jurusan Siswa</th>
                                <th style={{ width: "160px", textAlign: "center" }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswaList.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <span className="code-badge">{item.kode_siswa}</span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{item.nama_siswa}</td>
                                    <td style={{ maxWidth: "250px", whiteSpace: "normal" }}>{item.alamat_siswa}</td>
                                    <td>{item.tgl_siswa}</td>
                                    <td>
                                        <span className="jurusan-tag">{item.nama_jurusan || item.kode_jurusan || "Jurusan"}</span>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <div className="actions-cell" style={{ justifyContent: "center" }}>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => onEdit(item)} title="Edit Data Siswa">
                                                ✏️ Edit
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(item)} title="Hapus Data Siswa">
                                                🗑️ Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
