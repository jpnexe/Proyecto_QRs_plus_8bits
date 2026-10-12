import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { QROptions, BodyShape, EyeFrameShape, EyePupilShape, FrameStyle } from '../lib/qrEngine';

export interface QRCustomizerPanelProps {
  options: QROptions;
  onOptionsChange: (opts: QROptions) => void;
  logoUrl: string | null;
  onLogoChange: (url: string | null) => void;
}

const bodyShapesList: Array<{ id: BodyShape; label: string; icon: string }> = [
  { id: 'square', label: 'Cuadrado', icon: 'pixelarticons:checkbox' },
  { id: 'dots', label: 'Puntos', icon: 'pixelarticons:loader' },
  { id: 'rounded', label: 'Redondeado', icon: 'pixelarticons:check' },
  { id: 'diamond', label: 'Diamante', icon: 'pixelarticons:play' },
  { id: 'bars-horizontal', label: 'Barras H', icon: 'pixelarticons:menu' },
  { id: 'bars-vertical', label: 'Barras V', icon: 'pixelarticons:more-vertical' },
  { id: 'arcade-plus', label: 'Cruces', icon: 'pixelarticons:plus' },
  { id: 'teardrop', label: 'Hoja', icon: 'pixelarticons:drop' },
  { id: 'mosaic', label: 'Mosaico', icon: 'pixelarticons:grid' },
];

const eyeFrameShapesList: Array<{ id: EyeFrameShape; label: string }> = [
  { id: 'square', label: 'Cuadrado' },
  { id: 'rounded', label: 'Redondeado' },
  { id: 'circle', label: 'Circular' },
  { id: 'leaf', label: 'Hoja' },
  { id: 'shield', label: 'Escudo' },
  { id: 'diamond', label: 'Diamante' },
];

const eyePupilShapesList: Array<{ id: EyePupilShape; label: string }> = [
  { id: 'square', label: 'Cuadrado' },
  { id: 'rounded', label: 'Redondeado' },
  { id: 'circle', label: 'Circular' },
  { id: 'leaf', label: 'Hoja' },
  { id: 'diamond', label: 'Diamante' },
];

const framesList: Array<{ id: FrameStyle; label: string }> = [
  { id: 'none', label: 'Sin Marco' },
  { id: 'bottom-banner', label: 'Banner Inferior' },
  { id: 'top-banner', label: 'Banner Superior' },
  { id: 'phone', label: 'Dispositivo' },
];

const colorPalette = ['#000000', '#3B82F6', '#10B981', '#E03B24', '#F2C94C', '#56C596'];

export const QRCustomizerPanel: React.FC<QRCustomizerPanelProps> = ({
  options,
  onOptionsChange,
  logoUrl,
  onLogoChange,
}) => {
  const [activeTab, setActiveTab] = useState<'marco' | 'forma' | 'logo' | 'color'>('forma');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onLogoChange((ev.target?.result as string) || null);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 pixel-box-sm bg-black/40 p-4 font-mono text-xs">
      <div className="flex items-center gap-2 border-b-2 border-black pb-2">
        <span className="w-5 h-5 bg-[#E03B24] text-white flex items-center justify-center text-xs font-bold pixel-box-sm">
          2
        </span>
        <h3 className="text-xs font-bold uppercase text-zinc-200">
          Diseña tu código QR
        </h3>
      </div>

      <div className="flex gap-2 border-b-2 border-zinc-800 pb-2">
        {(['marco', 'forma', 'logo', 'color'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 pixel-box-sm font-bold uppercase text-[11px] ${
              activeTab === tab
                ? 'bg-[#3B82F6] text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'marco' && (
        <div className="space-y-3">
          <label className="font-bold text-zinc-300 block">Estilo de Marco:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {framesList.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onOptionsChange({ ...options, frameStyle: f.id })}
                className={`p-2 pixel-box-sm text-center font-bold text-[11px] ${
                  options.frameStyle === f.id ? 'bg-[#F2C94C] text-black' : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {options.frameStyle !== 'none' && (
            <div className="space-y-1 pt-1">
              <label className="text-[11px] text-zinc-400">Texto del Marco:</label>
              <input
                type="text"
                value={options.frameText}
                onChange={(e) => onOptionsChange({ ...options, frameText: e.target.value })}
                className="w-full p-2 pixel-box-sm bg-black/60 text-white text-xs"
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'forma' && (
        <div className="space-y-4">
          <div>
            <label className="font-bold text-zinc-300 block mb-1">Forma del cuerpo:</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {bodyShapesList.map((bs) => (
                <button
                  key={bs.id}
                  type="button"
                  onClick={() => onOptionsChange({ ...options, bodyShape: bs.id })}
                  className={`p-2 pixel-box-sm flex flex-col items-center gap-1 text-[10px] ${
                    options.bodyShape === bs.id
                      ? 'bg-[#10B981] text-black font-bold ring-1 ring-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Icon icon={bs.icon} width="16" height="16" />
                  <span className="truncate">{bs.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-2 pixel-box-sm bg-black/30 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-zinc-300">Tamaño de los puntos:</span>
              <span className="text-[#10B981] font-bold">{Math.round(options.dotScale * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.0"
              step="0.05"
              value={options.dotScale}
              onChange={(e) => onOptionsChange({ ...options, dotScale: parseFloat(e.target.value) })}
              className="w-full accent-[#10B981] cursor-pointer"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-300 block mb-1">Forma del marco del ojo:</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {eyeFrameShapesList.map((ef) => (
                <button
                  key={ef.id}
                  type="button"
                  onClick={() => onOptionsChange({ ...options, eyeFrameShape: ef.id })}
                  className={`p-1.5 pixel-box-sm text-center text-[10px] ${
                    options.eyeFrameShape === ef.id
                      ? 'bg-[#3B82F6] text-white font-bold ring-1 ring-white'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {ef.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-300 block mb-1">Forma del ojo (pupila):</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {eyePupilShapesList.map((ep) => (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => onOptionsChange({ ...options, eyePupilShape: ep.id })}
                  className={`p-1.5 pixel-box-sm text-center text-[10px] ${
                    options.eyePupilShape === ep.id
                      ? 'bg-[#F2C94C] text-black font-bold ring-1 ring-black'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {ep.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logo' && (
        <div className="space-y-3">
          <label className="font-bold text-zinc-300 block">Logotipo Central:</label>
          <div className="flex items-center gap-3">
            <label className="pixel-btn px-3 py-2 bg-[#10B981] text-black cursor-pointer font-bold">
              Subir Imagen / Logo
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
            {logoUrl && (
              <button
                type="button"
                onClick={() => onLogoChange(null)}
                className="pixel-btn px-3 py-2 bg-[#E03B24] text-white"
              >
                Eliminar Logo
              </button>
            )}
          </div>
          {logoUrl && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-zinc-400 text-xs">Vista previa del logo:</span>
              <img src={logoUrl} alt="" className="w-10 h-10 object-contain p-1 bg-white pixel-box-sm" />
            </div>
          )}
        </div>
      )}

      {activeTab === 'color' && (
        <div className="space-y-3">
          <div>
            <label className="font-bold text-zinc-300 block mb-1">Color de Puntos:</label>
            <div className="flex items-center gap-2">
              {colorPalette.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onOptionsChange({ ...options, color: { ...options.color, dark: c } })}
                  className={`w-6 h-6 pixel-box-sm ${options.color.dark === c ? 'ring-2 ring-white scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={options.color.dark}
                onChange={(e) => onOptionsChange({ ...options, color: { ...options.color, dark: e.target.value } })}
                className="w-7 h-7 cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-300 block mb-1">Color de Fondo:</label>
            <div className="flex items-center gap-2">
              {['#FFFFFF', '#101010', '#1c1c1e', '#f8fafc'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onOptionsChange({ ...options, color: { ...options.color, light: c } })}
                  className={`w-6 h-6 pixel-box-sm ${options.color.light === c ? 'ring-2 ring-white scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={options.color.light}
                onChange={(e) => onOptionsChange({ ...options, color: { ...options.color, light: e.target.value } })}
                className="w-7 h-7 cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCustomizerPanel;
