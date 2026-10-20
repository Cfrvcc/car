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
  size = 'sm',
  className = ''
}: AzerbaijanLicensePlateProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-12 sm:h-14',
  };

  // If plate image loads cleanly (primary official visual)
  if (!imgError) {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden shadow-sm select-none transition-transform active:scale-95 ${sizeClasses[size]} ${className}`}
      >
        <img
          src={OFFICIAL_PLATE_IMAGE_PATH}
          alt="10 VX 900 Azərbaycan Dövlət Qeydiyyat Nişanı"
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
      className={`inline-flex items-center bg-white text-slate-950 font-black tracking-wider rounded-lg border border-slate-800 shadow-sm select-none px-2.5 py-1 ${sizeClasses[size]} ${className}`}
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', monospace",
      }}
    >
      <div className="mr-2 flex flex-col items-center justify-center text-slate-900">
        <div className="w-4 h-2.5 rounded-[1px] overflow-hidden flex flex-col border border-slate-300">
          <div className="flex-1 bg-[#00b5e2]" />
          <div className="flex-1 bg-[#ef3340] relative flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-white opacity-95" />
          </div>
          <div className="flex-1 bg-[#509e2f]" />
        </div>
        <span className="font-extrabold text-[8px] tracking-tight leading-none mt-0.5 text-slate-800">AZ</span>
      </div>
      <div className="font-mono font-black tracking-wider text-xs sm:text-sm text-slate-950">
        {plateNumber}
      </div>
    </div>
  );
}
