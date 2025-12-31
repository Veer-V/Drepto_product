import { LabTestDetail } from '../../types';

const LABTESTS_KEY = 'labtests_v2';

export function loadLabTests(): LabTestDetail[] {
  const raw = localStorage.getItem(LABTESTS_KEY);
  if (raw) return JSON.parse(raw);
  const initial: LabTestDetail[] = [];
  localStorage.setItem(LABTESTS_KEY, JSON.stringify(initial));
  return initial;
}

export function saveLabTests(items: LabTestDetail[]) {
  localStorage.setItem(LABTESTS_KEY, JSON.stringify(items));
}
