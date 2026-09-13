import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const iconDimensions = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      id="brand-logo-container"
    >
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#022c22] p-1.5 shadow-sm ring-1 ring-emerald-600/30 text-emerald-400"
        style={{ width: iconDimensions, height: iconDimensions }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Compass / Dial Ring */}
          <circle cx="50" cy="50" r="44" stroke="#10b981" strokeWidth="2.5" strokeOpacity="0.4" strokeDasharray="3 5" />
          <circle cx="50" cy="50" r="38" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.8" />
          
          {/* Directional Qibla Marker at top */}
          <polygon points="50,14 53,20 47,20" fill="#f59e0b" />
          
          {/* Subtle Crescent Lunar Curve */}
          <path
            d="M 55 24 C 38 24 26 36 26 52 C 26 67 38 78 53 78 C 60 78 66 75 71 71 C 60 72 51 63 51 52 C 51 40 59 31 71 31 C 66 26 60 24 55 24 Z"
            fill="#10b981"
            fillOpacity="0.35"
          />

          {/* Central Directional Kaaba Cube */}
          <g transform="translate(50, 50)">
            <polygon points="0,-11 9,-5 0,0 -9,-5" fill="#f59e0b" />
            <polygon points="-9,-5 0,0 0,11 -9,6" fill="#047857" />
            <polygon points="0,0 9,-5 9,6 0,11" fill="#065f46" />
            <polyline points="-9,-2 0,3 9,-2" stroke="#fef08a" strokeWidth="1" strokeOpacity="0.8" />
          </g>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-wider text-stone-900 dark:text-stone-50 font-sans text-base sm:text-lg">
            PRAYERS<span className="text-emerald-700 dark:text-emerald-400">TIME</span>
          </span>
          <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
            .ONLINE
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
            Your Daily Guide to Prayer & Faith
          </span>
        )}
      </div>
    </div>
  );
};
