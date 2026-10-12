import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Icon } from '@iconify/react';
import type { QRHistoryItem } from '../lib/historyStore';

export interface QRHistoryDrawerProps {
  history: QRHistoryItem[];
  onSelect: (item: QRHistoryItem) => void;
  onRemove: (id: string) => void;
}

export const QRHistoryDrawer: React.FC<QRHistoryDrawerProps> = ({
  history,
  onSelect,
  onRemove,
}) => {
  const [parentRef] = useAutoAnimate<HTMLUListElement>();

  if (history.length === 0) {
    return (
      <div className="p-4 pixel-box-sm text-center text-xs font-mono text-zinc-500 bg-black/20">
        No hay códigos en el historial todavía.
      </div>
    );
  }

  return (
    <ul ref={parentRef} className="space-y-2">
      {history.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between p-2 pixel-box-sm bg-black/30 hover:bg-black/50 text-xs font-mono"
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="flex items-center gap-2 truncate text-left flex-1 hover:text-[#3B82F6]"
          >
            <img src={item.previewUrl} alt="" className="w-8 h-8 pixel-box-sm bg-white" />
            <div className="truncate">
              <span className="font-bold text-zinc-200 block truncate">{item.title}</span>
              <span className="text-[10px] text-zinc-400">{item.createdAt}</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="p-1 text-zinc-400 hover:text-[#E03B24]"
            aria-label="Eliminar del historial"
          >
            <Icon icon="pixelarticons:trash" width="16" height="16" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default QRHistoryDrawer;
