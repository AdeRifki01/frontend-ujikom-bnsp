/**
 * File: src/services/api.js
 * Deskripsi: Modul layanan API untuk konsumsi Backend Express.js
 * Standar Kompetensi: J.620100.016.01 (Guidelines & Best Practices)
 */

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    /**
     * Helper request internal dengan penanganan respons
     */
    static async _request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || `HTTP Error ${response.status}: Terjadi kesalahan`;
                const error = new Error(errorMessage);
                error.status = response.status;
                error.errors = data.errors || [];
                throw error;
            }

            return data;
        } catch (error) {
            console.error(`[API Error] Gagal memanggil ${endpoint}:`, error.message);
            throw error;
        }
    }

    /**
     * Mengambil daftar data siswa (dengan opsi filter pencarian)
     * @param {string} [search]
     */
    static async getSiswa(search = '') {
        const query = search ? `?search=${encodeURIComponent(search)}` : '';
        return this._request(`/siswa${query}`);
    }

    /**
     * Mengambil detail satu siswa berdasarkan ID
     * @param {number} id
     */
    static async getSiswaById(id) {
        return this._request(`/siswa/${id}`);
    }

    /**
     * Menambahkan data siswa baru (Create)
     * @param {Object} payload { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, id_jurusan }
     */
    static async createSiswa(payload) {
        return this._request('/siswa', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }

    /**
     * Memperbarui data siswa (Update)
     * @param {number} id
     * @param {Object} payload
     */
    static async updateSiswa(id, payload) {
        return this._request(`/siswa/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    }

    /**
     * Menghapus data siswa (Delete)
     * @param {number} id
     */
    static async deleteSiswa(id) {
        return this._request(`/siswa/${id}`, {
            method: 'DELETE'
        });
    }

    /**
     * Mengambil daftar master jurusan
     */
    static async getJurusan() {
        return this._request('/jurusan');
    }

    /**
     * Memeriksa status kesehatan server backend
     */
    static async checkHealth() {
        return this._request('/health');
    }

    /**
     * Ekspor data ke file JSON di backend
     */
    static async exportToJson() {
        return this._request('/siswa/export/json');
    }
}

export default ApiService;
