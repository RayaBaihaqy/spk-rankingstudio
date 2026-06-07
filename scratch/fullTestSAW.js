import { SAMPLE_STUDIOS, DEFAULT_WEIGHTS } from '../src/scripts/sampleData.js';
import { runSAW } from '../src/scripts/saw.js';

// Prepare data
const studios = SAMPLE_STUDIOS.map(s => s.name);
const matrixX = SAMPLE_STUDIOS.map(s => [s.c1, s.c2, s.c3, s.c4, s.c5, s.c6]);
const criteriaTypes = ['Benefit','Benefit','Benefit','Benefit','Benefit','Cost']; // matches definitions
const weights = Object.values(DEFAULT_WEIGHTS);

const { matrixR, valuesV, ranked } = runSAW(studios, matrixX, criteriaTypes, weights);

console.log('--- Normalized C4 values (should be 0–1, no negatives) ---');
console.table(matrixR.map((row, i) => ({ genre: studios[i], C4: row[3] })));
console.log('--- Normalized C6 values (should not all be zero) ---');
console.table(matrixR.map((row, i) => ({ genre: studios[i], C6: row[5] })));
console.log('--- Ranking (V) ---');
console.table(ranked.map(r => ({ rank: r.rank, genre: r.name, V: r.v.toFixed(4) })));
