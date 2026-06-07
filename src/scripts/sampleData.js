// src/scripts/sampleData.js
// Data sample 30 studio animasi untuk demo/testing tanpa upload Excel

export const SAMPLE_STUDIOS = [
  { name: "Madhouse",         c1: 8.12, c2: 2850000, c3: 112, c4: 8.5,  c5: 520000, c6: 28 },
  { name: "Mappa",            c1: 7.98, c2: 3120000, c3: 48,  c4: 12.1, c5: 680000, c6: 14 },
  { name: "Wit Studio",       c1: 8.05, c2: 2240000, c3: 32,  c4: 9.8,  c5: 430000, c6: 11 },
  { name: "Ufotable",         c1: 8.52, c2: 3450000, c3: 38,  c4: 5.2,  c5: 920000, c6: 18 },
  { name: "Kyoto Animation",  c1: 8.48, c2: 2980000, c3: 62,  c4: 4.8,  c5: 870000, c6: 22 },
  { name: "Bones",            c1: 7.85, c2: 1980000, c3: 88,  c4: 11.2, c5: 350000, c6: 16 },
  { name: "Production I.G",   c1: 7.72, c2: 1650000, c3: 156, c4: 14.3, c5: 280000, c6: 20 },
  { name: "J.C.Staff",        c1: 7.21, c2: 1420000, c3: 198, c4: 22.5, c5: 180000, c6: 8  },
  { name: "Shaft",            c1: 7.68, c2: 1320000, c3: 74,  c4: 18.4, c5: 210000, c6: 9  },
  { name: "A-1 Pictures",     c1: 7.45, c2: 1880000, c3: 145, c4: 19.8, c5: 310000, c6: 12 },
  { name: "Trigger",          c1: 7.92, c2: 1540000, c3: 28,  c4: 10.5, c5: 295000, c6: 7  },
  { name: "CloverWorks",      c1: 7.78, c2: 1720000, c3: 42,  c4: 13.2, c5: 265000, c6: 10 },
  { name: "David Production", c1: 7.95, c2: 1460000, c3: 56,  c4: 9.1,  c5: 385000, c6: 13 },
  { name: "Doga Kobo",        c1: 7.34, c2: 820000,  c3: 48,  c4: 16.7, c5: 145000, c6: 5  },
  { name: "OLM",              c1: 6.85, c2: 1120000, c3: 142, c4: 28.4, c5: 95000,  c6: 3  },
  { name: "Toei Animation",   c1: 7.05, c2: 2450000, c3: 312, c4: 25.8, c5: 420000, c6: 15 },
  { name: "Sunrise",          c1: 7.38, c2: 1750000, c3: 188, c4: 21.3, c5: 265000, c6: 11 },
  { name: "Studio Deen",      c1: 6.92, c2: 980000,  c3: 168, c4: 29.5, c5: 88000,  c6: 4  },
  { name: "Brains Base",      c1: 7.15, c2: 720000,  c3: 68,  c4: 20.1, c5: 112000, c6: 5  },
  { name: "Brain's Base",     c1: 7.22, c2: 750000,  c3: 72,  c4: 18.9, c5: 125000, c6: 6  },
  { name: "White Fox",        c1: 7.82, c2: 1280000, c3: 22,  c4: 7.8,  c5: 320000, c6: 8  },
  { name: "P.A. Works",       c1: 7.56, c2: 1050000, c3: 44,  c4: 15.6, c5: 185000, c6: 7  },
  { name: "Kinema Citrus",    c1: 7.65, c2: 920000,  c3: 28,  c4: 12.8, c5: 195000, c6: 6  },
  { name: "8-Bit",            c1: 7.18, c2: 680000,  c3: 32,  c4: 17.4, c5: 98000,  c6: 4  },
  { name: "feel.",            c1: 7.02, c2: 580000,  c3: 54,  c4: 24.3, c5: 72000,  c6: 3  },
  { name: "TMS Entertainment",c1: 7.35, c2: 1150000, c3: 98,  c4: 20.8, c5: 168000, c6: 7  },
  { name: "Satelight",        c1: 7.08, c2: 680000,  c3: 72,  c4: 22.1, c5: 82000,  c6: 3  },
  { name: "Manglobe",         c1: 7.88, c2: 850000,  c3: 18,  c4: 8.2,  c5: 245000, c6: 7  },
  { name: "Gainax",           c1: 8.02, c2: 1480000, c3: 42,  c4: 11.5, c5: 480000, c6: 12 },
  { name: "Gonzo",            c1: 6.78, c2: 720000,  c3: 88,  c4: 32.5, c5: 65000,  c6: 2  },
];

export const CRITERIA_LABELS = {
  c1: { label: 'C1 - Skor MAL',      type: 'Benefit', desc: 'Rating rata-rata (0-10)',      unit: 'poin',   min: 0, max: 10, step: 0.01 },
  c2: { label: 'C2 - Members',       type: 'Benefit', desc: 'Jumlah member MAL',            unit: 'orang',  min: 0, max: 99999999, step: 1 },
  c3: { label: 'C3 - Produktivitas', type: 'Benefit', desc: 'Total jumlah anime diproduksi',unit: 'judul',  min: 0, max: 9999, step: 1 },
  c4: { label: 'C4 - Rasio Flop',    type: 'Benefit', desc: '% anime dengan skor < 6',     unit: '%',      min: 0, max: 100, step: 0.1 },
  c5: { label: 'C5 - Favorites',     type: 'Benefit', desc: 'Total favorites di MAL',       unit: 'orang',  min: 0, max: 99999999, step: 1 },
  c6: { label: 'C6 - Masterpiece',   type: 'Cost',    desc: 'Jumlah anime dengan skor ≥ 8', unit: 'judul', min: 0, max: 9999, step: 1 }
};

export const DEFAULT_WEIGHTS = {
  c1: 0.20,
  c2: 0.15,
  c3: 0.15,
  c4: 0.20,
  c5: 0.15,
  c6: 0.15,
};
