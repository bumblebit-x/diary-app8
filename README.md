# Praktikum Pertemuan 8 - Mobile Programming
## Diary App dengan Global State Management (Redux Toolkit + React-Redux)

### Identitas Mahasiswa
- **Nama:** Bembi Marvi Yuansa
- **NIM:** 2430511088
- **Kelas:** 5C
- **Program Studi:** Teknik Informatika - Universitas Muhammadiyah Sukabumi
- **Dosen Pengampu:** Prajoko, M.Kom

---

### Perbedaan Local State, Global Redux State, dan Persistent Database

| Aspek | Local State (`useState`) | Global Redux State (`Redux Toolkit`) | Persistent Database (`MySQL / SQLite / API`) |
| :--- | :--- | :--- | :--- |
| **Cakupan Data** | Terbatas hanya di dalam satu komponen/screen tempat state dideklarasikan. | Terpusat (*Single Source of Truth*) dan dapat diakses oleh seluruh komponen/screen dalam aplikasi. | Tersimpan secara eksternal atau di penyimpanan permanen perangkat/server lintas sesi. |
| **Ketahanan Data** | Hilang saat komponen *unmount* atau berpindah halaman. | Tersimpan di memori aplikasi selama aplikasi berjalan, namun **reset ke `initialState`** saat aplikasi di-reload/restart. | **Persisten (permanen)**; data tetap aman meskipun aplikasi ditutup atau perangkat dimatikan. |
| **Contoh pada `diary-app8`** | Input sementara pada form (`title`, `body`, `mood`) sebelum tombol simpan ditekan. | Daftar `entries`, status `liked` (favorit), dan `moodFilter` yang dipakai lintas screen (Home, Detail, Edit, Favorites). | Penyimpanan permanen seluruh catatan diary pengguna ke backend REST API & database MySQL. |
<img width="472" height="209" alt="Cuplikan layar 2026-11-18 000308" src="https://github.com/user-attachments/assets/27253e93-03fa-4ee0-8838-16bc158b0e16" />
<img width="469" height="285" alt="Cuplikan layar 2026-11-18 000300" src="https://github.com/user-attachments/assets/751100ec-56d3-4441-9885-a793e4525bf5" />
<img width="469" height="447" alt="Cuplikan layar 2026-11-18 000235" src="https://github.com/user-attachments/assets/147634f8-4a97-4e37-a5cd-5e0cf5a8d7fc" />
<img width="474" height="460" alt="Cuplikan layar 2026-11-18 000228" src="https://github.com/user-attachments/assets/b0c6ec54-6a84-4708-8dbe-afdcb444cb1e" />
<img width="467" height="284" alt="Cuplikan layar 2026-11-18 000220" src="https://github.com/user-attachments/assets/baa71e0a-d011-42f0-9317-6bab075f0bc2" />
<img width="468" height="808" alt="Cuplikan layar 2026-11-18 000205" src="https://github.com/user-attachments/assets/468c2d15-fb78-4a1c-bad7-45cb63c11a65" />
