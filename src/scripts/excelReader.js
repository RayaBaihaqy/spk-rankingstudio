// src/scripts/excelReader.js
// Wrapper untuk parsing file Excel menggunakan SheetJS (xlsx)
// SheetJS di-load via CDN di index.astro

/**
 * Parse file Excel menjadi array of objects
 * @param {File} file - File Excel dari input
 * @returns {Promise<{headers: string[], rows: object[], rawRows: any[][]}>}
 */
export async function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Ambil sheet pertama
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Konversi ke JSON (baris pertama = header)
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        if (!jsonData || jsonData.length < 2) {
          reject(new Error('File Excel kosong atau hanya berisi header.'));
          return;
        }

        const headers = jsonData[0].map(h => String(h).trim()).filter(h => h !== '');
        const rawRows = jsonData.slice(1).filter(row =>
          row.some(cell => cell !== '' && cell !== null && cell !== undefined)
        );

        // Konversi ke array of objects
        const rows = rawRows.map(row => {
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = row[i] !== undefined ? row[i] : '';
          });
          return obj;
        });

        resolve({ headers, rows, rawRows });
      } catch (err) {
        reject(new Error('Gagal membaca file Excel: ' + err.message));
      }
    };

    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Validasi bahwa semua kolom mapping ada di header Excel
 */
export function validateMapping(mapping, headers) {
  const errors = [];
  Object.entries(mapping).forEach(([cKey, colName]) => {
    if (colName && !headers.includes(colName)) {
      errors.push(`Kolom "${colName}" tidak ditemukan di Excel.`);
    }
  });
  return errors;
}

/**
 * Extract data berdasarkan mapping kolom
 * @param {object[]} rows - Array of objects dari Excel
 * @param {string} studioCol - Nama kolom studio
 * @param {object} mapping - { c1: 'nama_kolom', c2: '...', ... }
 * @returns {{ studios: string[], matrixX: number[][] }}
 */
export function extractMappedData(rows, studioCol, mapping) {
  const studios = [];
  const matrixX = [];

  rows.forEach(row => {
    const studioName = String(row[studioCol] || '').trim();
    if (!studioName) return;

    studios.push(studioName);

    const criteriaValues = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].map(key => {
      const colName = mapping[key];
      const raw = row[colName];
      const parsed = parseFloat(String(raw).replace(/,/g, '.'));
      return isNaN(parsed) ? 0 : parsed;
    });

    matrixX.push(criteriaValues);
  });

  return { studios, matrixX };
}

/**
 * Export data ke file Excel menggunakan SheetJS
 */
export function exportToExcel(ranked, criteriaLabels, filename = 'Hasil_SPK_Studio_Animasi.xlsx') {
  const headers = ['Rank', 'Studio', ...criteriaLabels.map(c => c.label + ' (R)'), 'Nilai V'];
  const rows = ranked.map(item => [
    item.rank,
    item.name,
    ...item.r.map(v => parseFloat(v.toFixed(4))),
    parseFloat(item.v.toFixed(4)),
  ]);

  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Hasil SPK');
  XLSX.writeFile(wb, filename);
}
