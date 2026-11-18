import React, { useState, useEffect } from "react";
import { IconX } from "./Icons";

export default function SiswaFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  jurusanList
}) {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    kode_siswa: "",
    nama_siswa: "",
    alamat_siswa: "",
    tgl_siswa: "",
    id_jurusan: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        kode_siswa: initialData.kode_siswa || "",
        nama_siswa: initialData.nama_siswa || "",
        alamat_siswa: initialData.alamat_siswa || "",
        tgl_siswa: initialData.tgl_siswa || "",
        id_jurusan: initialData.id_jurusan ? String(initialData.id_jurusan) : ""
      });
    } else {
      setFormData({
        kode_siswa: "",
        nama_siswa: "",
        alamat_siswa: "",
        tgl_siswa: "",
        id_jurusan: jurusanList.length > 0 ? String(jurusanList[0].id) : ""
      });
    }
    setErrors({});
  }, [initialData, isOpen, jurusanList]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.kode_siswa.trim()) {
      newErrors.kode_siswa = "Kode siswa wajib diisi";
    }
    if (!formData.nama_siswa.trim()) {
      newErrors.nama_siswa = "Nama siswa wajib diisi";
    }
    if (!formData.alamat_siswa.trim()) {
      newErrors.alamat_siswa = "Alamat domisili siswa wajib diisi";
    }
    if (!formData.tgl_siswa) {
      newErrors.tgl_siswa = "Tanggal siswa wajib dipilih";
    }
    if (!formData.id_jurusan) {
      newErrors.id_jurusan = "Program jurusan wajib dipilih";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        id_jurusan: parseInt(formData.id_jurusan, 10)
      });
      onClose();
    } catch (err) {
      // Ditangani oleh toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3 className="modal-title">
            {isEditMode ? "Perbarui Informasi Siswa" : "Tambah Data Siswa Baru"}
          </h3>
          <button
            type="button"
            className="modal-close-icon"
            onClick={onClose}
            title="Tutup formulir"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-content-area">
            {/* a. Kode Siswa */}
            <div className="field-group">
              <label className="field-label">
                Kode Siswa <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="kode_siswa"
                className={`field-input ${errors.kode_siswa ? "has-error" : ""}`}
                placeholder="Contoh: SIS-006"
                value={formData.kode_siswa}
                onChange={handleChange}
                autoFocus
              />
              {errors.kode_siswa && (
                <div className="field-feedback-error">{errors.kode_siswa}</div>
              )}
            </div>

            {/* b. Nama Siswa */}
            <div className="field-group">
              <label className="field-label">
                Nama Lengkap Siswa <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="nama_siswa"
                className={`field-input ${errors.nama_siswa ? "has-error" : ""}`}
                placeholder="Masukkan nama lengkap siswa sesuai identitas"
                value={formData.nama_siswa}
                onChange={handleChange}
              />
              {errors.nama_siswa && (
                <div className="field-feedback-error">{errors.nama_siswa}</div>
              )}
            </div>

            {/* c. Alamat Siswa */}
            <div className="field-group">
              <label className="field-label">
                Alamat Domisili Siswa <span className="asterisk">*</span>
              </label>
              <textarea
                name="alamat_siswa"
                className={`field-textarea ${errors.alamat_siswa ? "has-error" : ""}`}
                placeholder="Alamat jalan, kelurahan, kota/kabupaten..."
                value={formData.alamat_siswa}
                onChange={handleChange}
              />
              {errors.alamat_siswa && (
                <div className="field-feedback-error">{errors.alamat_siswa}</div>
              )}
            </div>

            <div className="field-grid-halves">
              {/* d. Tgl Siswa */}
              <div className="field-group">
                <label className="field-label">
                  Tanggal Siswa <span className="asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="tgl_siswa"
                  className={`field-input ${errors.tgl_siswa ? "has-error" : ""}`}
                  value={formData.tgl_siswa}
                  onChange={handleChange}
                />
                {errors.tgl_siswa && (
                  <div className="field-feedback-error">{errors.tgl_siswa}</div>
                )}
              </div>

              {/* e. Jurusan Siswa */}
              <div className="field-group">
                <label className="field-label">
                  Program Jurusan <span className="asterisk">*</span>
                </label>
                <select
                  name="id_jurusan"
                  className={`field-select ${errors.id_jurusan ? "has-error" : ""}`}
                  value={formData.id_jurusan}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih Jurusan --</option>
                  {jurusanList.map((jurusan) => (
                    <option key={jurusan.id} value={jurusan.id}>
                      {jurusan.nama_jurusan} ({jurusan.kode_jurusan})
                    </option>
                  ))}
                </select>
                {errors.id_jurusan && (
                  <div className="field-feedback-error">{errors.id_jurusan}</div>
                )}
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
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting
                ? "Menyimpan Data..."
                : isEditMode
                ? "Simpan Perubahan"
                : "Simpan Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
