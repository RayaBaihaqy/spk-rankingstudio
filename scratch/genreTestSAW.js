import { runSAW } from '../src/scripts/saw.js';

// Example genre data (studios are genre names)
const studios = ['Action','Adventure','Comedy','Drama','Fantasy','Romance','Sci-Fi','Slice Life'];
const matrixX = [
  [-61997, 0, 0, -61997, 0, 0], // placeholder other criteria not needed, using only C4 values for demonstration
];
// Actually we need full 6 criteria values per item. We'll set dummy values for others.
const dummy = (val) => val;
const data = [
  {c1:0,c2:0,c3:0,c4:-61997,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:-102988,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:-25914,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:33120,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:9398,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:-103137,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:-61292,c5:0,c6:0},
  {c1:0,c2:0,c3:0,c4:-31507,c5:0,c6:0},
];
const matrix = data.map(d=>[d.c1,d.c2,d.c3,d.c4,d.c5,d.c6]);

const criteriaTypes = ['Benefit','Benefit','Benefit','Benefit','Benefit','Cost']; // matches sampleData definitions
const weights = [0.2,0.15,0.15,0.2,0.15,0.15];

const {matrixR, valuesV, ranked} = runSAW(studios, matrix, criteriaTypes, weights);

console.log('Normalized Matrix R (C4 column):');
console.table(matrixR.map(row=>({C4: row[3]})));
console.log('Ranked order:');
console.table(ranked.map(r=>({name:r.name, v:r.v.toFixed(4), rank:r.rank})));
