import QRCode from 'qrcode';

export type BodyShape = 
  | 'square' 
  | 'dots' 
  | 'rounded' 
  | 'diamond' 
  | 'bars-horizontal' 
  | 'bars-vertical' 
  | 'arcade-plus' 
  | 'teardrop' 
  | 'mosaic';

export type EyeFrameShape = 'square' | 'rounded' | 'circle' | 'leaf' | 'shield' | 'diamond';
export type EyePupilShape = 'square' | 'circle' | 'rounded' | 'leaf' | 'diamond';
export type FrameStyle = 'none' | 'bottom-banner' | 'top-banner' | 'phone';

export interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  width: number;
  margin: number;
  bodyShape: BodyShape;
  eyeFrameShape: EyeFrameShape;
  eyePupilShape: EyePupilShape;
  dotScale: number; // 0.4 to 1.0
  frameStyle: FrameStyle;
  frameText: string;
  logoUrl?: string | null;
  color: {
    dark: string;
    light: string;
  };
}

export const DEFAULT_QR_OPTIONS: QROptions = {
  errorCorrectionLevel: 'H',
  width: 512,
  margin: 3,
  bodyShape: 'square',
  eyeFrameShape: 'square',
  eyePupilShape: 'square',
  dotScale: 0.9,
  frameStyle: 'none',
  frameText: 'SCAN ME',
  logoUrl: null,
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
};

export function isFinderPattern(row: number, col: number, size: number): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

export function getBodyModuleSVG(
  shape: BodyShape,
  x: number,
  y: number,
  size: number,
  scale: number,
  color: string
): string {
  const s = size * Math.max(0.4, Math.min(1.0, scale));
  const offset = (size - s) / 2;
  const bx = x + offset;
  const by = y + offset;
  const half = s / 2;

  switch (shape) {
    case 'dots':
      return `<circle cx="${bx + half}" cy="${by + half}" r="${half}" fill="${color}" />`;
    case 'rounded':
      return `<rect x="${bx}" y="${by}" width="${s}" height="${s}" rx="${s * 0.35}" fill="${color}" />`;
    case 'diamond':
      return `<path d="M ${bx + half} ${by} L ${bx + s} ${by + half} L ${bx + half} ${by + s} L ${bx} ${by + half} Z" fill="${color}" />`;
    case 'bars-horizontal':
      return `<rect x="${x}" y="${by}" width="${size}" height="${s * 0.7}" rx="${s * 0.2}" fill="${color}" />`;
    case 'bars-vertical':
      return `<rect x="${bx}" y="${y}" width="${s * 0.7}" height="${size}" rx="${s * 0.2}" fill="${color}" />`;
    case 'arcade-plus': {
      const arm = s * 0.3;
      return `<path d="M ${bx + arm} ${by} H ${bx + s - arm} V ${by + arm} H ${bx + s} V ${by + s - arm} H ${bx + s - arm} V ${by + s} H ${bx + arm} V ${by + s - arm} H ${bx} V ${by + arm} H ${bx + arm} Z" fill="${color}" />`;
    }
    case 'teardrop':
      return `<path d="M ${bx} ${by + half} Q ${bx} ${by} ${bx + half} ${by} L ${bx + s} ${by} L ${bx + s} ${by + s} L ${bx} ${by + s} Z" fill="${color}" />`;
    case 'mosaic':
      return `<rect x="${bx}" y="${by}" width="${s}" height="${s}" transform="rotate(45 ${bx + half} ${by + half})" fill="${color}" />`;
    case 'square':
    default:
      return `<rect x="${bx}" y="${by}" width="${s}" height="${s}" fill="${color}" />`;
  }
}

type EyeShapeKind = EyeFrameShape | EyePupilShape;

/** Corner radii as fraction of size: [topLeft, topRight, bottomRight, bottomLeft] */
const EYE_RADII: Record<string, [number, number, number, number]> = {
  square: [0, 0, 0, 0],
  rounded: [0.3, 0.3, 0.3, 0.3],
  leaf: [0.5, 0, 0.5, 0],
  shield: [0, 0, 0.5, 0.5],
};

export function roundedRectPath(
  x: number,
  y: number,
  s: number,
  radii: [number, number, number, number]
): string {
  const [tl, tr, br, bl] = radii.map((r) => r * s) as [number, number, number, number];
  return `M ${x + tl} ${y} H ${x + s - tr} A ${tr} ${tr} 0 0 1 ${x + s} ${y + tr} V ${y + s - br} A ${br} ${br} 0 0 1 ${x + s - br} ${y + s} H ${x + bl} A ${bl} ${bl} 0 0 1 ${x} ${y + s - bl} V ${y + tl} A ${tl} ${tl} 0 0 1 ${x + tl} ${y} Z`;
}

/** Draws an eye shape either as an outline (stroke) or filled. */
export function eyeShapeSVG(
  kind: EyeShapeKind,
  x: number,
  y: number,
  s: number,
  paint: string
): string {
  const h = s / 2;
  if (kind === 'circle') {
    return `<circle cx="${x + h}" cy="${y + h}" r="${h}" ${paint} />`;
  }
  if (kind === 'diamond') {
    return `<path d="M ${x + h} ${y} L ${x + s} ${y + h} L ${x + h} ${y + s} L ${x} ${y + h} Z" stroke-linejoin="round" ${paint} />`;
  }
  const radii = EYE_RADII[kind] ?? EYE_RADII.square;
  return `<path d="${roundedRectPath(x, y, s, radii as [number, number, number, number])}" ${paint} />`;
}

export function renderEyeSVG(
  frameShape: EyeFrameShape,
  pupilShape: EyePupilShape,
  x: number,
  y: number,
  cellSize: number,
  color: string
): string {
  const half = cellSize / 2;
  const framePaint = `fill="none" stroke="${color}" stroke-width="${cellSize}"`;
  const frame = eyeShapeSVG(frameShape, x + half, y + half, 6 * cellSize, framePaint);
  const pupil = eyeShapeSVG(pupilShape, x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, `fill="${color}"`);
  return `${frame}\n${pupil}`;
}

function renderEyesGroup(
  qrSize: number,
  frameShape: EyeFrameShape,
  pupilShape: EyePupilShape,
  cellSize: number,
  offset: number,
  color: string
): string {
  const tl = renderEyeSVG(frameShape, pupilShape, offset, offset, cellSize, color);
  const tr = renderEyeSVG(frameShape, pupilShape, offset + (qrSize - 7) * cellSize, offset, cellSize, color);
  const bl = renderEyeSVG(frameShape, pupilShape, offset, offset + (qrSize - 7) * cellSize, cellSize, color);
  return `${tl}\n${tr}\n${bl}`;
}

export interface FrameLayout {
  svgWrapper: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
  qrX: number;
  qrY: number;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function frameText(label: string, cx: number, cy: number, size: number, fill: string): string {
  return `<text x="${cx}" y="${cy}" font-family="monospace" font-weight="900" font-size="${size}" fill="${fill}" text-anchor="middle" dominant-baseline="central" letter-spacing="2">${label}</text>`;
}

function bannerLayout(top: boolean, label: string, width: number, color: { dark: string; light: string }): FrameLayout {
  const bannerH = Math.round(width * 0.16);
  const gap = Math.round(width * 0.03);
  const bannerY = top ? 0 : width + gap;
  const fontSize = Math.round(width * 0.06);
  const svgWrapper = `<rect x="0" y="${bannerY}" width="${width}" height="${bannerH}" rx="${bannerH * 0.2}" fill="${color.dark}" />
${frameText(label, width / 2, bannerY + bannerH / 2, fontSize, color.light)}`;
  return {
    svgWrapper,
    viewBoxWidth: width,
    viewBoxHeight: width + gap + bannerH,
    qrX: 0,
    qrY: top ? bannerH + gap : 0,
  };
}

function phoneLayout(label: string, width: number, color: { dark: string; light: string }): FrameLayout {
  const side = Math.round(width * 0.08);
  const top = Math.round(width * 0.16);
  const bottom = Math.round(width * 0.22);
  const w = width + side * 2;
  const h = width + top + bottom;
  const notchW = width * 0.3;
  const svgWrapper = `<rect x="0" y="0" width="${w}" height="${h}" rx="${side * 1.6}" fill="${color.dark}" />
<rect x="${(w - notchW) / 2}" y="${top * 0.35}" width="${notchW}" height="${top * 0.25}" rx="${top * 0.125}" fill="${color.light}" opacity="0.35" />
${frameText(label, w / 2, top + width + bottom / 2, Math.round(width * 0.06), color.light)}`;
  return { svgWrapper, viewBoxWidth: w, viewBoxHeight: h, qrX: side, qrY: top };
}

export function renderFrameDecoration(
  style: FrameStyle,
  text: string,
  width: number,
  color: { dark: string; light: string }
): FrameLayout {
  const label = escapeXml(text || 'SCAN ME');
  if (style === 'bottom-banner') return bannerLayout(false, label, width, color);
  if (style === 'top-banner') return bannerLayout(true, label, width, color);
  if (style === 'phone') return phoneLayout(label, width, color);
  return { svgWrapper: '', viewBoxWidth: width, viewBoxHeight: width, qrX: 0, qrY: 0 };
}

function resolveOptions(options: Partial<QROptions>): QROptions {
  return {
    ...DEFAULT_QR_OPTIONS,
    ...options,
    color: { ...DEFAULT_QR_OPTIONS.color, ...(options.color || {}) },
  };
}

function renderLogoSVG(opts: QROptions): string {
  if (!opts.logoUrl) return '';
  const lSize = opts.width * 0.22;
  const lPos = (opts.width - lSize) / 2;
  const pad = 4;
  return `<rect x="${lPos - pad}" y="${lPos - pad}" width="${lSize + pad * 2}" height="${lSize + pad * 2}" fill="${opts.color.light}" stroke="${opts.color.dark}" stroke-width="2" rx="4" />
<image href="${opts.logoUrl}" x="${lPos}" y="${lPos}" width="${lSize}" height="${lSize}" preserveAspectRatio="xMidYMid meet" />`;
}

function renderQRCore(text: string, opts: QROptions): string {
  const qr = QRCode.create(text, { errorCorrectionLevel: opts.logoUrl ? 'H' : opts.errorCorrectionLevel });
  const size = qr.modules.size;
  const cellSize = opts.width / (size + opts.margin * 2);
  const offset = opts.margin * cellSize;

  let bodySvg = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (qr.modules.get(r, c) && !isFinderPattern(r, c, size)) {
        bodySvg += getBodyModuleSVG(opts.bodyShape, offset + c * cellSize, offset + r * cellSize, cellSize, opts.dotScale, opts.color.dark);
      }
    }
  }

  const eyesSvg = renderEyesGroup(size, opts.eyeFrameShape, opts.eyePupilShape, cellSize, offset, opts.color.dark);
  return `<rect width="${opts.width}" height="${opts.width}" fill="${opts.color.light}" />
${bodySvg}
${eyesSvg}
${renderLogoSVG(opts)}`;
}

export interface QRSVGResult {
  svg: string;
  width: number;
  height: number;
}

export function buildQRSVG(text: string, options: Partial<QROptions> = {}): QRSVGResult {
  const opts = resolveOptions(options);
  const layout = renderFrameDecoration(opts.frameStyle, opts.frameText, opts.width, opts.color);
  const { viewBoxWidth: w, viewBoxHeight: h } = layout;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="${opts.color.light}" />
${layout.svgWrapper}
<g transform="translate(${layout.qrX} ${layout.qrY})">
${renderQRCore(text, opts)}
</g>
</svg>`;
  return { svg, width: w, height: h };
}

export async function generateQRSVG(
  text: string,
  options: Partial<QROptions> = {}
): Promise<string> {
  return buildQRSVG(text, options).svg;
}

export async function generateQRDataURL(
  text: string,
  options: Partial<QROptions> = {}
): Promise<string> {
  const { svg, width, height } = buildQRSVG(text, options);
  if (typeof document === 'undefined') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo inicializar canvas 2D');

  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        resolve();
      };
      img.onerror = () => reject(new Error('Fallo al renderizar SVG en canvas'));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }

  return canvas.toDataURL('image/png');
}
