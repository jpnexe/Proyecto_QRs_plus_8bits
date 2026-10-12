import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { qrPresetSchema, guideSchema } from './lib/schemas';

const presets = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/presets' }),
  schema: qrPresetSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: guideSchema,
});

export const collections = {
  presets,
  guides,
};
