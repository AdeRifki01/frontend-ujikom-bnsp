import React, { useState } from 'react';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3>Konfirmasi Penghapusan</h3>
          <button type="button" className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '28px 24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
          <p style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '8px' }}>
            Apakah Anda yakin ingin menghapus data siswa ini?
          </p>
          <div style={{
            background: '#f8fafc',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginTop: '12px'
          }}>
            <p style={{ fontWeight: 700, color: '#0f172a' }}>{siswaData.nama_siswa}</p>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Kode: {siswaData.kode_siswa} | {siswaData.nama_jurusan}</p>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '12px' }}>
            Data yang dihapus dari database tidak dapat dikembalikan.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? 'Menghapus...' : 'Ya, Hapus Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
