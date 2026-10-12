export interface DesignTokenPalette {
  readonly primary: string;
  readonly secondary: string;
  readonly arcadeDark: string;
  readonly arcadeRed: string;
  readonly arcadeBlue: string;
  readonly arcadeGold: string;
  readonly arcadeMint: string;
}

export const PIXEL_ART_TOKENS: DesignTokenPalette = {
  primary: '#3B82F6',
  secondary: '#10B981',
  arcadeDark: '#101010',
  arcadeRed: '#E03B24',
  arcadeBlue: '#2B59C3',
  arcadeGold: '#F2C94C',
  arcadeMint: '#56C596',
} as const;

export interface PixelBorders {
  readonly border: string;
  readonly boxShadow: string;
  readonly imageRendering: string;
}

export const PIXEL_BORDER_RULES: PixelBorders = {
  border: '4px solid #000000',
  boxShadow: '4px 4px 0px #000000',
  imageRendering: 'pixelated',
} as const;
