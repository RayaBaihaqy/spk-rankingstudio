// src/scripts/saw.js
// Implementasi metode SAW (Simple Additive Weighting)

/**
 * Normalisasi matriks keputusan X menjadi R
 * @param {number[][]} matrix - 2D array [studio][kriteria] (nxm)
 * @param {string[]} types - Array tipe kriteria: 'Benefit' atau 'Cost' (panjang m)
 * @returns {number[][]} matrixR - Matriks ternormalisasi
 */
export function normalizeMatrix(matrix, types) {
  const n = matrix.length;    // jumlah studio
  const m = types.length;     // jumlah kriteria

  // Hitung max dan min per kolom (per kriteria)
  const maxPerCol = Array.from({ length: m }, (_, j) =>
    Math.max(...matrix.map(row => row[j]))
  );
  const minPerCol = Array.from({ length: m }, (_, j) =>
    Math.min(...matrix.map(row => row[j]))
  );


  // Normalisasi
  const matrixR = matrix.map(row =>
    row.map((val, j) => {
      if (types[j] === 'Benefit') {
        // Benefit: min‑max normalization
        const denom = maxPerCol[j] - minPerCol[j];
        return denom === 0 ? 0 : (val - minPerCol[j]) / denom;
      } else {
        // Cost: (max - value) / (max - min)
        const denom = maxPerCol[j] - minPerCol[j];
        return denom === 0 ? 0 : (maxPerCol[j] - val) / denom;
      }
    })
  );
  return matrixR;
}

/**
 * Hitung nilai preferensi akhir V (perkalian R × bobot, lalu dijumlahkan)
 * @param {number[][]} matrixR - Matriks normalisasi
 * @param {number[]} weights - Array bobot [w1, w2, ..., wm]
 * @returns {number[]} arrayV - Nilai akhir per studio
 */
export function calculateV(matrixR, weights) {
  return matrixR.map(row =>
    row.reduce((sum, rij, j) => sum + rij * weights[j], 0)
  );
}

/**
 * Ranking studio berdasarkan nilai V (descending)
 * @param {string[]} studios - Array nama studio
 * @param {number[]} valuesV - Array nilai V
 * @param {number[][]} matrixR - Matriks R (untuk tampilan)
 * @param {number[][]} matrixX - Matriks X original (untuk tampilan)
 * @returns {object[]} Array hasil terurut dengan rank, nama, nilai, dll.
 */
export function rankResults(studios, valuesV, matrixR, matrixX) {
  const combined = studios.map((name, i) => ({
    originalIndex: i,
    name,
    v: valuesV[i],
    r: matrixR[i],
    x: matrixX[i],
    rank: 0,
  }));

  // Sort descending by V
  combined.sort((a, b) => b.v - a.v);

  // Assign rank
  combined.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return combined;
}

/**
 * Jalankan seluruh pipeline SAW
 * @param {string[]} studios
 * @param {number[][]} matrixX
 * @param {string[]} criteriaTypes
 * @param {number[]} weights
 * @returns {{ matrixR, valuesV, ranked }}
 */
export function runSAW(studios, matrixX, criteriaTypes, weights) {
  const matrixR = normalizeMatrix(matrixX, criteriaTypes);
  const valuesV = calculateV(matrixR, weights);
  const ranked = rankResults(studios, valuesV, matrixR, matrixX);
  return { matrixR, valuesV, ranked };
}

/**
 * Format angka dengan presisi yang tepat
 */
export function formatNumber(val, decimals = 4) {
  if (val === null || val === undefined || isNaN(val)) return '-';
  return parseFloat(val.toFixed(decimals)).toString();
}

export function formatNumberDisplay(val, unit = '') {
  if (val === null || val === undefined || isNaN(val)) return '-';
  if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M' + (unit ? ' ' + unit : '');
  if (val >= 1000) return (val / 1000).toFixed(1) + 'K' + (unit ? ' ' + unit : '');
  return val.toString() + (unit ? ' ' + unit : '');
}
