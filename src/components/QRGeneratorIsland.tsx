import React, { useState, useEffect, useCallback } from 'react';
import { generateQRDataURL, generateQRSVG, DEFAULT_QR_OPTIONS, type QROptions } from '../lib/qrEngine';
import { getHistory, saveHistoryItem, removeHistoryItem, type QRHistoryItem } from '../lib/historyStore';
import type { QRContentType } from '../lib/payloadFormatters';
import QREditorForm from './QREditorForm';
import QRCustomizerPanel from './QRCustomizerPanel';
import QRPreviewCard, { type DownloadResolution } from './QRPreviewCard';
import QRHistoryDrawer from './QRHistoryDrawer';

export const QRGeneratorIsland: React.FC = () => {
  const [contentType, setContentType] = useState<QRContentType>('url');
  const [text, setText] = useState<string>('https://astro.build');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<QROptions>(DEFAULT_QR_OPTIONS);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const updateQR = useCallback(async () => {
    if (!text.trim()) return;
    try {
      const opts: QROptions = {
        ...options,
        width: 512,
        logoUrl,
        errorCorrectionLevel: logoUrl ? 'H' : options.errorCorrectionLevel,
      };
      const url = await generateQRDataURL(text, opts);
      const svg = await generateQRSVG(text, opts);
      setDataUrl(url);
      setSvgString(svg);
    } catch {
      // Defensive fallback
    }
  }, [text, options, logoUrl]);

  useEffect(() => {
    updateQR();
  }, [updateQR]);

  const handleDownloadPNG = async (resolution: DownloadResolution): Promise<void> => {
    try {
      const highResOpts: QROptions = {
        ...options,
        width: resolution,
        logoUrl,
        errorCorrectionLevel: logoUrl ? 'H' : options.errorCorrectionLevel,
      };
      const highResUrl = await generateQRDataURL(text, highResOpts);
      const link = document.createElement('a');
      link.download = `qr-arcade-${resolution}px-${Date.now()}.png`;
      link.href = highResUrl;
      link.click();
      persistItem();
    } catch {
      // Defensive fallback
    }
  };

  const handleDownloadSVG = (): void => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `qr-arcade-vector-${Date.now()}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    persistItem();
  };

  const persistItem = (): void => {
    const newItem: QRHistoryItem = {
      id: `qr-${Date.now()}`,
      title: text.slice(0, 24),
      content: text,
      previewUrl: dataUrl,
      createdAt: new Date().toLocaleTimeString(),
      options: { ...options, logoUrl },
    };
    const updated = saveHistoryItem(newItem);
    setHistory(updated);
  };

  const handleSelectHistory = (item: QRHistoryItem): void => {
    setText(item.content);
    setOptions(item.options);
    setLogoUrl(item.options.logoUrl || null);
  };

  const handleRemoveHistory = (id: string): void => {
    const updated = removeHistoryItem(id);
    setHistory(updated);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4 pixel-box p-6 bg-[#1c1c1e]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#3B82F6] font-mono">
            Configuración & Diseño
          </h2>
          <QREditorForm
            contentType={contentType}
            onContentTypeChange={setContentType}
            rawText={text}
            onTextChange={setText}
          />
          <QRCustomizerPanel
            options={options}
            onOptionsChange={setOptions}
            logoUrl={logoUrl}
            onLogoChange={setLogoUrl}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <QRPreviewCard
            dataUrl={dataUrl}
            onDownloadPNG={handleDownloadPNG}
            onDownloadSVG={handleDownloadSVG}
          />
          <div className="pixel-box p-4 bg-[#1c1c1e] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F2C94C] font-mono">
              Historial de Creación Local
            </h3>
            <QRHistoryDrawer
              history={history}
              onSelect={handleSelectHistory}
              onRemove={handleRemoveHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorIsland;
