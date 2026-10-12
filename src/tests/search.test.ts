import { describe, it, expect } from 'vitest';
import { searchItems, type SearchableItem } from '../lib/searchEngine';

describe('Search Engine Unit Tests (Fase 4 DoD)', () => {
  const mockItems: SearchableItem[] = [
    {
      id: 'classic-arcade',
      title: 'Classic Arcade 8-Bit',
      description: 'Estilo tradicional en negro y rojo vibrante.',
      tag: 'Retro',
      url: '/presets/classic-arcade',
    },
    {
      id: 'cyber-matrix',
      title: 'Cyber Matrix Emerald',
      description: 'Pantallas de fósforo verde y terminales.',
      tag: 'Cyberpunk',
      url: '/presets/cyber-matrix',
    },
    {
      id: 'retro-gold',
      title: 'Arcade Gold Quest',
      description: 'Monedas doradas de 16 bits para acabado premium.',
      tag: 'Gold',
      url: '/presets/retro-gold',
    },
  ];

  it('should return all items when search query is empty', () => {
    const results = searchItems(mockItems, '');
    expect(results).toHaveLength(3);
  });

  it('should match items by title case-insensitively', () => {
    const results = searchItems(mockItems, 'cyber');
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('cyber-matrix');
  });

  it('should match items by tag', () => {
    const results = searchItems(mockItems, 'Gold');
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('retro-gold');
  });

  it('should match items by description', () => {
    const results = searchItems(mockItems, 'fósforo');
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe('cyber-matrix');
  });

  it('should return empty list when no matches exist', () => {
    const results = searchItems(mockItems, 'nonexistent_query_xyz');
    expect(results).toHaveLength(0);
  });
});
