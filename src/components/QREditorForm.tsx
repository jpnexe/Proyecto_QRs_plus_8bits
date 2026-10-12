import React from 'react';
import { Icon } from '@iconify/react';
import type { QRContentType } from '../lib/payloadFormatters';

export interface QREditorFormProps {
  contentType: QRContentType;
  onContentTypeChange: (type: QRContentType) => void;
  rawText: string;
  onTextChange: (text: string) => void;
}

const typeButtons: Array<{ id: QRContentType; label: string; icon: string }> = [
  { id: 'url', label: 'Enlace', icon: 'pixelarticons:link' },
  { id: 'text', label: 'Texto', icon: 'pixelarticons:notes' },
  { id: 'email', label: 'E-mail', icon: 'pixelarticons:mail' },
  { id: 'call', label: 'Llamada', icon: 'pixelarticons:phone' },
  { id: 'sms', label: 'SMS', icon: 'pixelarticons:message' },
  { id: 'vcard', label: 'V-card', icon: 'pixelarticons:contact' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'pixelarticons:chat' },
  { id: 'wifi', label: 'WI-FI', icon: 'pixelarticons:zap' },
  { id: 'pdf', label: 'PDF', icon: 'pixelarticons:file' },
  { id: 'app', label: 'Aplicación', icon: 'pixelarticons:device-phone' },
  { id: 'image', label: 'Imágenes', icon: 'pixelarticons:image' },
  { id: 'video', label: 'Vídeo', icon: 'pixelarticons:video' },
  { id: 'social', label: 'Redes sociales', icon: 'pixelarticons:user' },
  { id: 'event', label: 'Evento', icon: 'pixelarticons:calendar' },
  { id: 'code2d', label: 'Código 2D', icon: 'pixelarticons:script' },
];

export const QREditorForm: React.FC<QREditorFormProps> = ({
  contentType,
  onContentTypeChange,
  rawText,
  onTextChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {typeButtons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => onContentTypeChange(btn.id)}
            className={`pixel-btn py-2 px-2 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all ${
              contentType === btn.id
                ? 'bg-[#10B981] text-black font-extrabold ring-2 ring-black'
                : 'bg-[#1c1c1e] text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Icon icon={btn.icon} width="16" height="16" />
            <span className="truncate">{btn.label}</span>
          </button>
        ))}
      </div>

      <div className="pixel-box-sm bg-black/40 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#3B82F6] text-white flex items-center justify-center text-xs font-bold pixel-box-sm">
            1
          </span>
          <h3 className="text-xs font-mono font-bold uppercase text-zinc-200">
            Completa el contenido: {contentType.toUpperCase()}
          </h3>
        </div>

        <input
          type="text"
          value={rawText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={contentType === 'url' ? 'https://tudominio.com' : 'Ingresa el contenido aquí...'}
          className="w-full pixel-box-sm bg-black/70 p-2.5 font-mono text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
      </div>
    </div>
  );
};

export default QREditorForm;
