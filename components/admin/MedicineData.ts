import { Medicine } from '../../types';

const MEDICINES_KEY = 'medicines_v2';

export function loadMedicines(): Medicine[] {
  const raw = localStorage.getItem(MEDICINES_KEY);
  if (raw) return JSON.parse(raw);
  const initial: Medicine[] = [];
  localStorage.setItem(MEDICINES_KEY, JSON.stringify(initial));
  return initial;
}

export function saveMedicines(items: Medicine[]) {
  localStorage.setItem(MEDICINES_KEY, JSON.stringify(items));
}
