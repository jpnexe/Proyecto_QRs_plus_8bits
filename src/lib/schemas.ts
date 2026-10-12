import { z } from 'zod';

export const qrPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tag: z.string(),
  colors: z.object({
    dots: z.string(),
    background: z.string(),
    cornersSquare: z.string(),
    cornersDot: z.string(),
  }),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']),
  featured: z.boolean().default(false),
});

export type QrPreset = z.infer<typeof qrPresetSchema>;

export const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedDate: z.string(),
  category: z.string(),
  readTimeMinutes: z.number().int().positive(),
});

export type GuideMetadata = z.infer<typeof guideSchema>;
