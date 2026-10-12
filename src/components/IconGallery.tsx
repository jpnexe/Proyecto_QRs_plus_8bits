import React from 'react';
import { Icon } from '@iconify/react';
import { CodeIcon, CheckCircleIcon } from '@primer/octicons-react';
import QrCodeLineIcon from 'remixicon-react/QrCodeLineIcon';

export interface IconGalleryProps {
  statusText?: string;
}

export const IconGallery: React.FC<IconGalleryProps> = ({ 
  statusText = 'Iconos Activos' 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 pixel-box bg-[#1c1c1e]">
      <div className="flex items-center gap-2 text-[#3B82F6]">
        <CodeIcon size={24} />
        <span className="text-xs font-semibold">Octicons</span>
      </div>
      <div className="flex items-center gap-2 text-[#10B981]">
        <QrCodeLineIcon size={24} />
        <span className="text-xs font-semibold">RemixIcon</span>
      </div>
      <div className="flex items-center gap-2 text-[#F2C94C]">
        <Icon icon="pixelarticons:check" width="24" height="24" />
        <span className="text-xs font-semibold">Iconify Pixel</span>
      </div>
      <div className="ml-auto flex items-center gap-1 text-emerald-400 text-xs">
        <CheckCircleIcon size={16} />
        <span>{statusText}</span>
      </div>
    </div>
  );
};

export default IconGallery;
