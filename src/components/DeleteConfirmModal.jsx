import React, { useState } from "react";
import { IconAlertTriangle, IconX } from "./Icons";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  siswaData
}) {
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !siswaData) return null;

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await onConfirm(siswaData.id);
      onClose();
    } catch (err) {
      // Ditangani oleh toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "440px" }}>
        <div className="modal-head">
          <h3 className="modal-title">Konfirmasi Penghapusan</h3>
          <button
            type="button"
            className="modal-close-icon"
            onClick={onClose}
            title="Tutup dialog"
          >
            <IconX size={18} />
          </button>
        </div>

        <div className="modal-content-area danger-notice-panel">
          <div className="danger-icon-badge">
            <IconAlertTriangle size={24} />
          </div>

          <h4 className="danger-title">Hapus Data Siswa Terpilih?</h4>
          <p className="danger-description">
            Tindakan ini akan menghapus rekaman siswa secara permanen dari basis data PostgreSQL.
          </p>

          <div className="student-delete-preview">
            <div className="preview-name">{siswaData.nama_siswa}</div>
            <div className="preview-meta">
              Kode: <strong>{siswaData.kode_siswa}</strong> • Program: {siswaData.nama_jurusan || "-"}
            </div>
          </div>
        </div>

        <div className="modal-action-bar">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
            disabled={submitting}
          >
            Batalkan
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? "Memproses..." : "Ya, Hapus Permanen"}
          </button>
        </div>
      </div>
    </div>
  );
}
