import { useState } from 'react';
import plateImgUrl from '../assets/plate_900.png';

interface AzerbaijanLicensePlateProps {
  plateNumber?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OFFICIAL_PLATE_IMAGE_PATH = plateImgUrl;

export function AzerbaijanLicensePlate({ 
  plateNumber = '10 VX 900', 
  size = 'md',
  className = ''
}: AzerbaijanLicensePlateProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 min-w-[130px]',
    md: 'h-11 sm:h-12 min-w-[170px] sm:min-w-[190px]',
    lg: 'h-14 sm:h-16 min-w-[220px] sm:min-w-[260px]',
  };

  // If plate image loads cleanly (primary official visual)
  if (!imgError) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden shadow-md select-none transition-transform ${sizeClasses[size]} ${className}`}
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
        }}
      >
        <img
          src={OFFICIAL_PLATE_IMAGE_PATH}
          alt={`10 VX 900 Azərbaycan Dövlət Nömrə Nişanı`}
          className="h-full w-auto object-contain rounded-md"
          onError={() => setImgError(true)}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Resilient SVG / CSS fallback
  return (
    <div
      className={`inline-flex items-center bg-white text-slate-950 font-black tracking-wider rounded-md border-2 border-slate-900 shadow-lg select-none px-3 py-1 ${className}`}
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', monospace",
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.5)',
      }}
    >
      <div className="mr-2.5 flex flex-col items-center justify-center text-slate-900">
        <div className="w-5 h-3 rounded-[1px] overflow-hidden flex flex-col border border-slate-300">
          <div className="flex-1 bg-[#00b5e2]" />
          <div className="flex-1 bg-[#ef3340] relative flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white opacity-90" />
          </div>
          <div className="flex-1 bg-[#509e2f]" />
        </div>
        <span className="font-extrabold text-[10px] tracking-tighter leading-none mt-0.5">AZ</span>
      </div>
      <div className="font-mono font-extrabold tracking-wider text-base sm:text-lg">
        {plateNumber}
      </div>
    </div>
  );
}
