import { describe, it, expect } from 'vitest';
import { PixelButton } from '../components/PixelButton';
import { IconGallery } from '../components/IconGallery';

describe('Component Integrity & Contracts (Fase 1 DoD)', () => {
  it('should export PixelButton with defined functional component', () => {
    expect(PixelButton).toBeDefined();
    expect(typeof PixelButton).toBe('function');
  });

  it('should export IconGallery with defined functional component', () => {
    expect(IconGallery).toBeDefined();
    expect(typeof IconGallery).toBe('function');
  });
});
