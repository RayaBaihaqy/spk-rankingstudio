import { SAMPLE_STUDIOS, CRITERIA_LABELS, DEFAULT_WEIGHTS } from '../src/scripts/sampleData.js';
import { runSAW } from '../src/scripts/saw.js';

const studios = SAMPLE_STUDIOS.map(s => s.name);
const matrixX = SAMPLE_STUDIOS.map(s => [s.c1, s.c2, s.c3, s.c4, s.c5, s.c6]);
const criteriaTypes = Object.values(CRITERIA_LABELS).map(c => c.type);
const weights = Object.values(DEFAULT_WEIGHTS);

const { matrixR, valuesV, ranked } = runSAW(studios, matrixX, criteriaTypes, weights);

console.log('Normalized Matrix (R):');
console.table(matrixR);
console.log('Values V:');
console.log(valuesV.map(v => v.toFixed(4)));
console.log('Ranked:');
console.table(ranked.map(r => ({ name: r.name, v: r.v.toFixed(4), rank: r.rank })));
