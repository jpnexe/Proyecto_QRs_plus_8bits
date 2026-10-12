import { describe, it, expect } from 'vitest';
import { 
  generateQRDataURL, 
  generateQRSVG, 
  DEFAULT_QR_OPTIONS, 
  isFinderPattern,
  renderEyeSVG,
  renderFrameDecoration
} from '../lib/qrEngine';

describe('QR Engine Unit Tests with Full Geometry & Multi-Resolution', () => {
  it('should generate a valid data URL containing image data', async () => {
    const dataUrl = await generateQRDataURL('https://antigravity.google');
    expect(dataUrl).toContain('data:image/');
  });

  it('should generate valid SVG string containing <svg tag', async () => {
    const svg = await generateQRSVG('https://antigravity.google');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('should embed logo image element in SVG when logoUrl is provided', async () => {
    const fakeLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    const svg = await generateQRSVG('https://antigravity.google', {
      logoUrl: fakeLogo,
    });
    expect(svg).toContain('<image href="data:image/png;base64,');
  });

  it('should render custom circular dot shapes when bodyShape is dots', async () => {
    const svg = await generateQRSVG('https://antigravity.google', {
      bodyShape: 'dots',
      dotScale: 0.8,
    });
    expect(svg).toContain('<circle');
  });

  it('should render diamonds when bodyShape is diamond', async () => {
    const svg = await generateQRSVG('https://antigravity.google', {
      bodyShape: 'diamond',
    });
    expect(svg).toContain('<path d="M');
  });

  it('should render eye frame shapes and pupils properly', () => {
    const eyeSvg = renderEyeSVG('circle', 'circle', 0, 0, 10, '#000000');
    expect(eyeSvg).toContain('<circle');
  });

  it('should render frame decorations properly', () => {
    const frame = renderFrameDecoration('bottom-banner', 'SCAN ME', 512, { dark: '#000', light: '#fff' });
    expect(frame.svgWrapper).toContain('SCAN ME');
    expect(frame.viewBoxHeight).toBeGreaterThan(512);
  });

  it('should offset the QR below a top banner', () => {
    const frame = renderFrameDecoration('top-banner', 'HOLA', 512, { dark: '#000', light: '#fff' });
    expect(frame.svgWrapper).toContain('HOLA');
    expect(frame.qrY).toBeGreaterThan(0);
  });

  it('should wrap the QR inside a phone frame', () => {
    const frame = renderFrameDecoration('phone', 'SCAN', 512, { dark: '#000', light: '#fff' });
    expect(frame.viewBoxWidth).toBeGreaterThan(512);
    expect(frame.qrX).toBeGreaterThan(0);
  });

  it('should produce distinct SVG for every eye frame shape', () => {
    const shapes = ['square', 'rounded', 'circle', 'leaf', 'shield', 'diamond'] as const;
    const outputs = shapes.map((s) => renderEyeSVG(s, 'square', 0, 0, 10, '#000'));
    expect(new Set(outputs).size).toBe(shapes.length);
  });

  it('should produce distinct SVG for every pupil shape', () => {
    const shapes = ['square', 'rounded', 'circle', 'leaf', 'diamond'] as const;
    const outputs = shapes.map((s) => renderEyeSVG('square', s, 0, 0, 10, '#000'));
    expect(new Set(outputs).size).toBe(shapes.length);
  });

  it('should identify finder patterns accurately', () => {
    expect(isFinderPattern(0, 0, 21)).toBe(true);
    expect(isFinderPattern(0, 20, 21)).toBe(true);
    expect(isFinderPattern(20, 0, 21)).toBe(true);
    expect(isFinderPattern(10, 10, 21)).toBe(false);
  });

  it('should export DEFAULT_QR_OPTIONS matching specifications', () => {
    expect(DEFAULT_QR_OPTIONS.errorCorrectionLevel).toBe('H');
    expect(DEFAULT_QR_OPTIONS.width).toBe(512);
    expect(DEFAULT_QR_OPTIONS.bodyShape).toBe('square');
    expect(DEFAULT_QR_OPTIONS.dotScale).toBe(0.9);
  });
});
