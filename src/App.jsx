import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import SiswaTable from './components/SiswaTable';
import SiswaFormModal from './components/SiswaFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ToastNotification from './components/ToastNotification';
import ApiService from './services/api';

export default function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [jurusanList, setJurusanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Modal State
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Muat data dari Backend Express.js
  const fetchData = useCallback(async (searchQuery = '') => {
    try {
      setLoading(true);
      const res = await ApiService.getSiswa(searchQuery);
      if (res && res.data) {
        setSiswaList(res.data);
      }
      setIsBackendConnected(true);
    } catch (error) {
      setIsBackendConnected(false);
      showToast(`Gagal terhubung ke backend: ${error.message}`, 'danger');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Muat master jurusan
  const fetchJurusan = useCallback(async () => {
    try {
      const res = await ApiService.getJurusan();
      if (res && res.data) {
        setJurusanList(res.data);
      }
    } catch (error) {
      console.warn('Gagal memuat master jurusan dari backend:', error.message);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    fetchData();
    fetchJurusan();
  }, [fetchData, fetchJurusan]);

  // Handle Search Input Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchTerm);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchData]);

  // Create or Update Siswa
  const handleFormSubmit = async (formData) => {
    try {
      if (editTarget && editTarget.id) {
        // Update (PUT)
        await ApiService.updateSiswa(editTarget.id, formData);
        showToast(`Data siswa "${formData.nama_siswa}" berhasil diperbarui!`, 'success');
      } else {
        // Create (POST)
        await ApiService.createSiswa(formData);
        showToast(`Siswa baru "${formData.nama_siswa}" berhasil ditambahkan!`, 'success');
      }
      fetchData(searchTerm);
    } catch (error) {
      showToast(error.message, 'danger');
      throw error;
    }
  };

  // Delete Siswa
  const handleDeleteConfirm = async (id) => {
    try {
      await ApiService.deleteSiswa(id);
      showToast('Data siswa berhasil dihapus dari database.', 'success');
      fetchData(searchTerm);
    } catch (error) {
      showToast(`Gagal menghapus data: ${error.message}`, 'danger');
      throw error;
    }
  };

  // Export JSON (Memenuhi Unit Akses File)
  const handleExport = async () => {
    try {
      const res = await ApiService.exportToJson();
      showToast(`Backup berhasil disimpan ke server: ${res.filePath}`, 'success');
    } catch (error) {
      showToast(`Gagal mengekspor data: ${error.message}`, 'danger');
    }
  };

  return (
    <div>
      <Navbar isBackendConnected={isBackendConnected} />

      <main className="app-container">
        {/* Ringkasan Statistik */}
        <DashboardStats
          totalSiswa={siswaList.length}
          totalJurusan={jurusanList.length}
          latestSiswa={siswaList.length > 0 ? siswaList[0] : null}
        />

        {/* Tabel Utama CRUD Data Siswa */}
        <SiswaTable
          siswaList={siswaList}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={() => {
            setEditTarget(null);
            setFormModalOpen(true);
          }}
          onEdit={(siswa) => {
            setEditTarget(siswa);
            setFormModalOpen(true);
          }}
          onDelete={(siswa) => {
            setDeleteTarget(siswa);
          }}
          onExport={handleExport}
        />
      </main>

      {/* Modal Form Tambah / Edit */}
      <SiswaFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editTarget}
        jurusanList={jurusanList}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        siswaData={deleteTarget}
      />

      {/* Notifikasi Toast */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
