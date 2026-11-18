import React, { useState, useEffect } from 'react';

export default function SiswaFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  jurusanList
}) {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    id_jurusan: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        kode_siswa: initialData.kode_siswa || '',
        nama_siswa: initialData.nama_siswa || '',
        alamat_siswa: initialData.alamat_siswa || '',
        tgl_siswa: initialData.tgl_siswa || '',
        id_jurusan: initialData.id_jurusan ? String(initialData.id_jurusan) : ''
      });
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        id_jurusan: jurusanList.length > 0 ? String(jurusanList[0].id) : ''
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
      newErrors.kode_siswa = 'Kode siswa wajib diisi';
    }
    if (!formData.nama_siswa.trim()) {
      newErrors.nama_siswa = 'Nama siswa wajib diisi';
    }
    if (!formData.alamat_siswa.trim()) {
      newErrors.alamat_siswa = 'Alamat siswa wajib diisi';
    }
    if (!formData.tgl_siswa) {
      newErrors.tgl_siswa = 'Tanggal siswa wajib dipilih';
    }
    if (!formData.id_jurusan) {
      newErrors.id_jurusan = 'Jurusan siswa wajib dipilih';
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
      // Error ditangani oleh parent toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditMode ? 'Edit Data Siswa' : 'Tambah Data Siswa Baru'}</h3>
          <button type="button" className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* a. Kode Siswa */}
            <div className="form-group">
              <label className="form-label">
                Kode Siswa <span className="required-star">*</span>
              </label>
              <input
                type="text"
                name="kode_siswa"
                className="form-control"
                placeholder="Contoh: SIS-006"
                value={formData.kode_siswa}
                onChange={handleChange}
                autoFocus
              />
              {errors.kode_siswa && (
                <div className="form-error">{errors.kode_siswa}</div>
              )}
            </div>

            {/* b. Nama Siswa */}
            <div className="form-group">
              <label className="form-label">
                Nama Siswa <span className="required-star">*</span>
              </label>
              <input
                type="text"
                name="nama_siswa"
                className="form-control"
                placeholder="Nama lengkap siswa"
                value={formData.nama_siswa}
                onChange={handleChange}
              />
              {errors.nama_siswa && (
                <div className="form-error">{errors.nama_siswa}</div>
              )}
            </div>

            {/* c. Alamat Siswa */}
            <div className="form-group">
              <label className="form-label">
                Alamat Siswa <span className="required-star">*</span>
              </label>
              <textarea
                name="alamat_siswa"
                className="form-control"
                placeholder="Alamat domisili siswa..."
                value={formData.alamat_siswa}
                onChange={handleChange}
              />
              {errors.alamat_siswa && (
                <div className="form-error">{errors.alamat_siswa}</div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* d. Tgl Siswa */}
              <div className="form-group">
                <label className="form-label">
                  Tgl Siswa <span className="required-star">*</span>
                </label>
                <input
                  type="date"
                  name="tgl_siswa"
                  className="form-control"
                  value={formData.tgl_siswa}
                  onChange={handleChange}
                />
                {errors.tgl_siswa && (
                  <div className="form-error">{errors.tgl_siswa}</div>
                )}
              </div>

              {/* e. Jurusan Siswa */}
              <div className="form-group">
                <label className="form-label">
                  Jurusan Siswa <span className="required-star">*</span>
                </label>
                <select
                  name="id_jurusan"
                  className="form-control"
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
                  <div className="form-error">{errors.id_jurusan}</div>
                )}
              </div>
            </div>
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
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Menyimpan...' : isEditMode ? 'Simpan Perubahan' : 'Tambah Siswa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
