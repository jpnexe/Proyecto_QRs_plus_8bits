import React from 'react';

export interface PixelButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'arcade-red' | 'arcade-gold';
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<PixelButtonProps['variant']>, string> = {
  primary: 'bg-[#3B82F6] text-white hover:bg-blue-600',
  secondary: 'bg-[#10B981] text-white hover:bg-emerald-600',
  'arcade-red': 'bg-[#E03B24] text-white hover:bg-red-600',
  'arcade-gold': 'bg-[#F2C94C] text-black hover:bg-yellow-400',
};

export const PixelButton: React.FC<PixelButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const chosenVariant = variantStyles[variant];

  return (
    <button
      className={`pixel-btn px-4 py-2 font-mono text-sm uppercase tracking-wider 
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none 
        ${chosenVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
