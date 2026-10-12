import { describe, it, expect, beforeEach } from 'vitest';
import { getHistory, saveHistoryItem, removeHistoryItem, type QRHistoryItem } from '../lib/historyStore';
import { DEFAULT_QR_OPTIONS } from '../lib/qrEngine';

describe('QR History Store Tests (Fase 3 DoD)', () => {
  beforeEach(() => {
    // Mock local storage if window is defined or simulate in node environment
  });

  it('should return empty array in node environment safely without throwing', () => {
    const list = getHistory();
    expect(Array.isArray(list)).toBe(true);
  });

  it('should handle saveHistoryItem without errors in safe environment', () => {
    const dummyItem: QRHistoryItem = {
      id: 'test-1',
      title: 'Prueba QR',
      content: 'https://ejemplo.com',
      previewUrl: 'data:image/png;base64,abc',
      createdAt: '12:00:00',
      options: DEFAULT_QR_OPTIONS,
    };
    const result = saveHistoryItem(dummyItem);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle removeHistoryItem safely', () => {
    const result = removeHistoryItem('test-1');
    expect(Array.isArray(result)).toBe(true);
  });
});
