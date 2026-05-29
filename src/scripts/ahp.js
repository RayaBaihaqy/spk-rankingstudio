// src/scripts/ahp.js
// Implementasi metode AHP (Analytic Hierarchy Process)

// Saaty Random Index untuk n = 1..10
const RI_TABLE = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

/**
 * Isi nilai resiprokal pada matriks pairwise
 * Upper triangle diisi user, lower triangle di-auto-fill
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function fillReciprocal(matrix) {
  const n = matrix.length;
  const m = matrix.map(row => [...row]);
  for (let i = 0; i < n; i++) {
    m[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (m[i][j] !== 0) {
        m[j][i] = 1 / m[i][j];
      } else {
        m[j][i] = 1;
        m[i][j] = 1;
      }
    }
  }
  return m;
}

/**
 * Normalisasi matriks pairwise per kolom
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function normalizeMatrix(matrix) {
  const n = matrix.length;
  const colSums = Array.from({ length: n }, (_, j) =>
    matrix.reduce((sum, row) => sum + row[j], 0)
  );
  return matrix.map(row =>
    row.map((val, j) => colSums[j] === 0 ? 0 : val / colSums[j])
  );
}

/**
 * Hitung Priority Vector = rata-rata baris dari normalized matrix
 * @param {number[][]} normMatrix
 * @returns {number[]}
 */
export function calcPriorityVector(normMatrix) {
  const n = normMatrix.length;
  return normMatrix.map(row => row.reduce((s, v) => s + v, 0) / n);
}

/**
 * Hitung Lambda Max
 * @param {number[][]} matrix - full pairwise matrix
 * @param {number[]} weights - priority vector
 * @returns {number}
 */
export function calcLambdaMax(matrix, weights) {
  const n = matrix.length;
  let lambdaMax = 0;
  for (let j = 0; j < n; j++) {
    const colSum = matrix.reduce((sum, row) => sum + row[j], 0);
    lambdaMax += colSum * weights[j];
  }
  return lambdaMax;
}

/**
 * Hitung Consistency Index CI = (λmax - n) / (n - 1)
 */
export function calcCI(lambdaMax, n) {
  if (n <= 1) return 0;
  return (lambdaMax - n) / (n - 1);
}

/**
 * Hitung Consistency Ratio CR = CI / RI
 */
export function calcCR(ci, n) {
  if (n <= 2) return 0;
  const ri = n <= 10 ? RI_TABLE[n - 1] : 1.49;
  return ri === 0 ? 0 : ci / ri;
}

/**
 * Run full AHP pipeline dari upper-triangle matrix
 * @param {number[][]} upperMatrix - n×n, upper triangle filled by user
 * @returns {{ weights, CR, CI, lambdaMax, isConsistent, fullMatrix, normMatrix }}
 */
export function runAHP(upperMatrix) {
  const n = upperMatrix.length;
  const full = fillReciprocal(upperMatrix);
  const norm = normalizeMatrix(full);
  const weights = calcPriorityVector(norm);
  const lambdaMax = calcLambdaMax(full, weights);
  const ci = calcCI(lambdaMax, n);
  const cr = calcCR(ci, n);
  return {
    weights,
    CR: cr,
    CI: ci,
    lambdaMax,
    isConsistent: cr <= 0.1,
    fullMatrix: full,
    normMatrix: norm
  };
}

/**
 * Parse nilai Saaty dari string (misal "1/3" → 0.333)
 */
export function parseSaaty(val) {
  if (typeof val === 'number') return val;
  const s = String(val);
  if (s.includes('/')) {
    const [num, den] = s.split('/').map(Number);
    return den !== 0 ? num / den : 1;
  }
  return parseFloat(s) || 1;
}

/**
 * Format nilai untuk display (misal 0.333 → "1/3")
 */
export function formatSaaty(val) {
  if (!val || val === 0) return '1';
  if (val >= 1) return Math.round(val).toString();
  const denom = Math.round(1 / val);
  return `1/${denom}`;
}

/**
 * Semua opsi nilai Saaty yang valid (1/9 hingga 9)
 */
export const SAATY_OPTIONS = [
  { value: 9,           label: '9 — Mutlak lebih penting' },
  { value: 8,           label: '8' },
  { value: 7,           label: '7 — Sangat lebih penting' },
  { value: 6,           label: '6' },
  { value: 5,           label: '5 — Lebih penting' },
  { value: 4,           label: '4' },
  { value: 3,           label: '3 — Sedikit lebih penting' },
  { value: 2,           label: '2' },
  { value: 1,           label: '1 — Sama pentingnya' },
  { value: 1/2,         label: '1/2' },
  { value: 1/3,         label: '1/3 — Sedikit kurang penting' },
  { value: 1/4,         label: '1/4' },
  { value: 1/5,         label: '1/5 — Kurang penting' },
  { value: 1/6,         label: '1/6' },
  { value: 1/7,         label: '1/7 — Sangat kurang penting' },
  { value: 1/8,         label: '1/8' },
  { value: 1/9,         label: '1/9 — Mutlak kurang penting' },
];
