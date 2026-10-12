import { describe, it, expect } from 'vitest';
import { qrPresetSchema, guideSchema } from '../lib/schemas';
import classicArcade from '../content/presets/classic-arcade.json';
import cyberMatrix from '../content/presets/cyber-matrix.json';

describe('Content Collections & Zod Schemas (Fase 2 DoD)', () => {
  it('should validate classic-arcade preset against qrPresetSchema', () => {
    const result = qrPresetSchema.safeParse(classicArcade);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('classic-arcade');
      expect(result.data.errorCorrectionLevel).toBe('H');
    }
  });

  it('should validate cyber-matrix preset against qrPresetSchema', () => {
    const result = qrPresetSchema.safeParse(cyberMatrix);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tag).toBe('Cyberpunk');
    }
  });

  it('should reject presets with invalid errorCorrectionLevel', () => {
    const invalidPreset = {
      ...classicArcade,
      errorCorrectionLevel: 'INVALID_LEVEL',
    };
    const result = qrPresetSchema.safeParse(invalidPreset);
    expect(result.success).toBe(false);
  });

  it('should validate guide schema fields correctly', () => {
    const validGuide = {
      title: 'Guía de Prueba',
      description: 'Descripción breve',
      publishedDate: '2026-10-11',
      category: 'Tutorial',
      readTimeMinutes: 5,
    };
    const result = guideSchema.safeParse(validGuide);
    expect(result.success).toBe(true);
  });

  it('should reject guides with non-positive readTimeMinutes', () => {
    const invalidGuide = {
      title: 'Guía Inválida',
      description: 'Descripción breve',
      publishedDate: '2026-10-11',
      category: 'Tutorial',
      readTimeMinutes: -2,
    };
    const result = guideSchema.safeParse(invalidGuide);
    expect(result.success).toBe(false);
  });
});
