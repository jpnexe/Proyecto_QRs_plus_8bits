import React, { useState, useMemo } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Icon } from '@iconify/react';
import { searchItems, type SearchableItem } from '../lib/searchEngine';

export interface QuickSearchProps {
  items: SearchableItem[];
  placeholder?: string;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  items,
  placeholder = 'Buscar estilos y tutoriales...',
}) => {
  const [query, setQuery] = useState('');
  const [parentRef] = useAutoAnimate<HTMLUListElement>();

  const filtered = useMemo(() => searchItems(items, query), [items, query]);

  return (
    <div className="w-full space-y-3 font-mono">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar estilos"
          className="w-full p-2.5 pl-9 pixel-box-sm bg-black/60 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
        <Icon
          icon="pixelarticons:search"
          width="16"
          height="16"
          className="absolute left-2.5 top-3 text-zinc-400 pointer-events-none"
        />
      </div>

      <ul ref={parentRef} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((item) => (
          <li key={item.id} className="pixel-box-sm bg-[#1c1c1e] p-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#E03B24] text-white pixel-box-sm">
                {item.tag}
              </span>
              <h4 className="font-bold text-white text-xs mt-1.5">{item.title}</h4>
              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{item.description}</p>
            </div>
            <a
              href={item.url}
              className="mt-3 text-[11px] font-bold text-[#F2C94C] hover:underline flex items-center gap-1"
            >
              <span>Abrir Detalles</span>
              <span>&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickSearch;
