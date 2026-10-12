import type { QROptions } from './qrEngine';

export interface QRHistoryItem {
  id: string;
  title: string;
  content: string;
  previewUrl: string;
  createdAt: string;
  options: QROptions;
}

const STORAGE_KEY = 'arcade_qr_history_v1';
const MAX_HISTORY_ITEMS = 10;

export function getHistory(): QRHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: QRHistoryItem): QRHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getHistory();
    const filtered = current.filter((i) => i.id !== item.id);
    const updated = [item, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function removeHistoryItem(id: string): QRHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
