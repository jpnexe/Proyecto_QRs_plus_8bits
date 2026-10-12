import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export type DownloadResolution = 512 | 1024 | 2048;

export interface QRPreviewCardProps {
  dataUrl: string;
  onDownloadPNG: (resolution: DownloadResolution) => void;
  onDownloadSVG: () => void;
}

const resolutions: Array<{ value: DownloadResolution; label: string; desc: string }> = [
  { value: 512, label: 'Estándar', desc: '512px (Web)' },
  { value: 1024, label: 'Alta', desc: '1024px (HD)' },
  { value: 2048, label: 'Ultra', desc: '2048px (Impresión)' },
];

export const QRPreviewCard: React.FC<QRPreviewCardProps> = ({
  dataUrl,
  onDownloadPNG,
  onDownloadSVG,
}) => {
  const [selectedRes, setSelectedRes] = useState<DownloadResolution>(1024);

  return (
    <div className="flex flex-col items-center gap-4 pixel-box p-4 bg-[#1c1c1e]">
      <div className="p-3 bg-white pixel-box-sm flex items-center justify-center">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt="Código QR Generado"
            className="w-60 h-60 object-contain image-rendering-pixelated"
          />
        ) : (
          <div className="w-60 h-60 flex items-center justify-center text-xs font-mono text-zinc-500">
            Generando código...
          </div>
        )}
      </div>

      <div className="w-full space-y-2 font-mono text-xs">
        <label className="font-bold text-zinc-300 block text-center">Calidad de Descarga PNG:</label>
        <div className="grid grid-cols-3 gap-1.5">
          {resolutions.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setSelectedRes(r.value)}
              className={`p-1.5 pixel-box-sm text-center ${
                selectedRes === r.value ? 'bg-[#3B82F6] text-white font-bold ring-1 ring-white' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <div className="text-[11px]">{r.label}</div>
              <div className="text-[9px] opacity-80">{r.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full justify-center pt-1">
        <button
          type="button"
          onClick={() => onDownloadPNG(selectedRes)}
          aria-label="Descargar imagen PNG"
          className="pixel-btn px-4 py-2 bg-[#3B82F6] text-white text-xs font-mono flex items-center gap-1.5"
        >
          <Icon icon="pixelarticons:download" width="16" height="16" />
          <span>Bajar PNG ({selectedRes}px)</span>
        </button>
        <button
          type="button"
          onClick={onDownloadSVG}
          aria-label="Descargar vector SVG"
          className="pixel-btn px-4 py-2 bg-[#10B981] text-black text-xs font-mono flex items-center gap-1.5"
        >
          <Icon icon="pixelarticons:code" width="16" height="16" />
          <span>Bajar Vector SVG</span>
        </button>
      </div>
    </div>
  );
};

export default QRPreviewCard;
