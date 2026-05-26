// src/scripts/state.js
// Wrapper untuk sessionStorage - state management antar komponen

const PREFIX = 'spk_';

export const STATE_KEYS = {
  RAW_DATA: 'rawData',        // Array of objects dari Excel
  COL_MAPPING: 'colMapping',  // { c1: 'kolom_excel', c2: '...', ... }
  STUDIO_NAMES: 'studioNames',// Array of studio name strings
  WEIGHTS: 'weights',         // { c1: 0.2, c2: 0.2, ... }
  MATRIX_X: 'matrixX',        // 2D array nilai kriteria [studio][kriteria]
  RESULTS: 'results',         // { matrixR, matrixV, ranked }
};

export function setData(key, value) {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('[SPK State] Failed to set:', key, e);
  }
}

export function getData(key) {
  try {
    const raw = sessionStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('[SPK State] Failed to get:', key, e);
    return null;
  }
}

export function removeData(key) {
  sessionStorage.removeItem(PREFIX + key);
}

export function clearAll() {
  Object.values(STATE_KEYS).forEach(key => {
    sessionStorage.removeItem(PREFIX + key);
  });
}

export function hasData(key) {
  return sessionStorage.getItem(PREFIX + key) !== null;
}
