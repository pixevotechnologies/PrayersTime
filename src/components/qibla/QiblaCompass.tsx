import React, { useState, useEffect } from 'react';
import {
  Compass as CompassIcon,
  Navigation,
  Info,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { updateSeoTags } from '../../services/seoManager';
import { LocationData } from '../../types';
import { getQiblaInfo } from '../../services/prayerTimes';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';
import { useLanguage } from '../../services/i18n';

interface QiblaCompassProps {
  location: LocationData;
  onOpenLocationModal: () => void;
  onNavigate: (route: string) => void;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({
  location,
  onOpenLocationModal,
  onNavigate,
}) => {
  const { t } = useLanguage();
  const qibla = getQiblaInfo(location.latitude, location.longitude);
  const { heading, isSupported, permissionState, requestSensorPermission } =
    useDeviceOrientation();

  // Manual rotation fallback for desktop or when sensor is unsupported
  const [manualHeading, setManualHeading] = useState<number>(0);
  const [showCalibrationHelp, setShowCalibrationHelp] = useState(false);

  // If sensor is active and providing heading, use it; otherwise use manual heading for orientation preview
  const activeHeading = heading !== null ? heading : manualHeading;

  // The angle between current device heading and Qibla bearing
  const relativeQiblaAngle = (qibla.bearing - activeHeading + 360) % 360;
  const isAligned = Math.abs(relativeQiblaAngle) < 4 || Math.abs(relativeQiblaAngle - 360) < 4;

  useEffect(() => {
    updateSeoTags({
      title: `Qibla Direction & Online Compass — Kaaba Bearing ${qibla.bearing}° | Prayerstime`,
      description: `Accurate Qibla compass and bearing direction (${qibla.bearing}° ${qibla.cardinal}) towards the Kaaba in Makkah from ${location.city}, ${location.country}. Real-time compass sensor and visual alignment.`,
      canonicalPath: '/qibla',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Qibla Compass', path: '/qibla' },
      ],
    });
  }, [location.city, location.country, qibla.bearing, qibla.cardinal]);

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t('nav.qibla')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50">
          {t('qibla.title')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
          {location.city}, {location.country} — {qibla.bearing}° ({qibla.cardinal})
        </p>
      </div>

      {/* Sensor Permission / Status Notice */}
      {isSupported && permissionState === 'prompt' && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            For live compass movement as you turn your phone, tap below to grant orientation sensor access.
          </p>
          <button
            onClick={requestSensorPermission}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Enable Live Device Compass
          </button>
        </div>
      )}

      {(!isSupported || permissionState === 'denied' || permissionState === 'unsupported') && (
        <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-[#131f1c] border border-stone-200 dark:border-emerald-950 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-300">
          <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-stone-800 dark:text-stone-200 block">
              {permissionState === 'denied'
                ? 'Device orientation sensor permission was not granted.'
                : 'Desktop or hardware without compass magnetometer detected.'}
            </span>
            <p>
              Your exact Kaaba bearing is calculated mathematically at <strong>{qibla.bearing}°</strong> ({qibla.cardinal}). On desktop or without a magnetometer, the compass displays True North orientation with interactive manual alignment.
            </p>
          </div>
        </div>
      )}

      {/* Main Interactive Compass Dial Card */}
      <div className="rounded-3xl bg-[#fcfbf9] dark:bg-[#0e1715] p-6 sm:p-10 border border-stone-200 dark:border-emerald-900/40 shadow-lg text-center flex flex-col items-center space-y-6">
        {/* Alignment Status Banner */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            isAligned
              ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-500/20 animate-pulse'
              : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300'
          }`}
        >
          {isAligned ? (
            <>
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{t('qibla.facingKaaba')}</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {t('qibla.turnDevice')}
              </span>
            </>
          )}
        </div>

        {/* The Compass Stage */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center select-none">
          {/* Outer Compass Bezel */}
          <div className="absolute inset-0 rounded-full border-4 border-stone-200 dark:border-emerald-950 bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-[#111c19] dark:to-[#09110f] shadow-inner" />

          {/* Compass Dial Degree Ring */}
          <div
            className="absolute inset-2 rounded-full border border-stone-300 dark:border-emerald-900/40 transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${-activeHeading}deg)` }}
          >
            {/* Cardinal Points */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-black text-rose-600">
              N
            </span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-400">
              S
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
              E
            </span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
              W
            </span>

            {/* Qibla Indicator on the Dial */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none"
              style={{ transform: `rotate(${qibla.bearing}deg)` }}
            >
              <div className="mt-6 flex flex-col items-center">
                {/* Kaaba Icon Marker */}
                <div className="w-6 h-6 rounded-md bg-stone-900 dark:bg-black border border-amber-400 flex items-center justify-center shadow-md">
                  <div className="w-full h-1 bg-amber-400 mt-1" />
                </div>
                <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  Qibla
                </span>
              </div>
            </div>
          </div>

          {/* Center Qibla Needle Pointing to Kaaba */}
          <div
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: `rotate(${relativeQiblaAngle}deg)` }}
          >
            {/* Golden Pointer Needle */}
            <div className="w-2.5 h-28 sm:h-36 -mt-28 sm:-mt-36 bg-gradient-to-t from-emerald-600 to-amber-500 rounded-t-full shadow-lg flex items-start justify-center">
              <polygon points="0,0 8,14 -8,14" className="fill-amber-400 -mt-2" />
            </div>
          </div>

          {/* Center Hub */}
          <div className="relative z-20 w-12 h-12 rounded-full bg-emerald-800 text-white shadow-md flex items-center justify-center border-2 border-amber-400">
            <CompassIcon className="w-6 h-6 text-amber-300" />
          </div>
        </div>

        {/* Bearing & Metric Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md pt-2">
          <div className="p-3 rounded-2xl bg-[#f5f2ea] dark:bg-[#131f1c] border border-stone-200 dark:border-emerald-950">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">
              {t('qibla.bearing')}
            </span>
            <span className="text-lg sm:text-xl font-black font-mono text-emerald-800 dark:text-emerald-400">
              {qibla.bearing}°
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-[#f5f2ea] dark:bg-[#131f1c] border border-stone-200 dark:border-emerald-950">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">
              Direction
            </span>
            <span className="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100">
              {qibla.cardinal}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-[#f5f2ea] dark:bg-[#131f1c] border border-stone-200 dark:border-emerald-950">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">
              {t('qibla.distance')}
            </span>
            <span className="text-lg sm:text-xl font-black font-mono text-stone-900 dark:text-stone-100">
              {qibla.distanceKm.toLocaleString()} <span className="text-xs font-normal">km</span>
            </span>
          </div>
        </div>

        {/* Manual orientation slider for desktop simulation */}
        {(!heading || heading === 0) && (
          <div className="w-full max-w-sm pt-2 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Manual Heading (Desktop):</span>
              <span className="font-mono font-bold">{manualHeading}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={manualHeading}
              onChange={(e) => setManualHeading(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        )}

        {/* Action button: Calibration guide */}
        <button
          onClick={() => setShowCalibrationHelp(!showCalibrationHelp)}
          className="text-xs font-semibold text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>How to calibrate your device compass</span>
        </button>

        {showCalibrationHelp && (
          <div className="w-full max-w-md p-4 rounded-2xl bg-stone-100 dark:bg-[#131f1c] text-left text-xs text-stone-600 dark:text-stone-300 space-y-2 border border-stone-200 dark:border-stone-800 animate-in fade-in">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">
              Device Calibration Tips:
            </span>
            <ol className="list-decimal pl-4 space-y-1.5">
              <li>Keep your mobile phone flat on the palm of your hand.</li>
              <li>Move the device in a smooth <strong>figure-8 (∞) motion</strong> in the air 3 to 4 times.</li>
              <li>Keep away from magnetic phone cases, laptops, or large metal objects that disrupt the magnetometer sensor.</li>
              <li>Verify location permission is set to Precise in your browser settings.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Location information details */}
      <div className="p-4 rounded-2xl bg-[#f7f5f0] dark:bg-[#101a17] border border-stone-200 dark:border-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>
            {location.city}, {location.country} ({location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E)
          </span>
        </div>
        <button
          onClick={onOpenLocationModal}
          className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
        >
          {t('dash.changeLocation')}
        </button>
      </div>
    </div>
  );
};
