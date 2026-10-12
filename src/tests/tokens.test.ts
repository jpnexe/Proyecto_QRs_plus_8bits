import { describe, it, expect } from 'vitest';
import { PIXEL_ART_TOKENS, PIXEL_BORDER_RULES } from '../lib/tokens';

describe('Pixel Art Design Tokens & Config (Fase 1 DoD)', () => {
  it('should define primary and secondary brand colors according to DESIGN.md', () => {
    expect(PIXEL_ART_TOKENS.primary).toBe('#3B82F6');
    expect(PIXEL_ART_TOKENS.secondary).toBe('#10B981');
  });

  it('should define the arcade palette colors correctly', () => {
    expect(PIXEL_ART_TOKENS.arcadeDark).toBe('#101010');
    expect(PIXEL_ART_TOKENS.arcadeRed).toBe('#E03B24');
    expect(PIXEL_ART_TOKENS.arcadeGold).toBe('#F2C94C');
  });

  it('should enforce mandatory pixel art CSS border rules', () => {
    expect(PIXEL_BORDER_RULES.border).toBe('4px solid #000000');
    expect(PIXEL_BORDER_RULES.boxShadow).toBe('4px 4px 0px #000000');
    expect(PIXEL_BORDER_RULES.imageRendering).toBe('pixelated');
  });
});
