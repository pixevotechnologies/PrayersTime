import React from 'react';
import {
  X,
  Sliders,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Database,
  RefreshCw,
  CheckCircle2,
  Wifi,
  WifiOff,
  Trash2,
} from 'lucide-react';
import { AppSettings, CalculationMethodName, LocationData, MadhabType } from '../../types';
import { CALCULATION_METHOD_LABELS } from '../../services/prayerTimes';
import { soundService } from '../../services/soundService';
import { useLanguage } from '../../services/i18n';
import { useTheme } from '../../services/themeContext';
import { DEFAULT_LOCATION } from '../../services/citiesData';
import { usePrayerCache } from '../../hooks/usePrayerCache';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  location?: LocationData;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  location = DEFAULT_LOCATION,
}) => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isOnline = useOnlineStatus();
  const { status: cacheStatus, isSyncing, syncMessage, syncCache, clearCache } = usePrayerCache(
    location,
    settings
  );

  if (!isOpen) return null;

  const handleMethodChange = (method: CalculationMethodName) => {
    onUpdateSettings({ ...settings, method });
  };

  const handleMadhabChange = (madhab: MadhabType) => {
    onUpdateSettings({ ...settings, madhab });
  };

  const handleTimeFormatChange = (timeFormat: '12h' | '24h') => {
    onUpdateSettings({ ...settings, timeFormat });
  };

  const handleHijriAdjustmentChange = (adjustment: number) => {
    onUpdateSettings({ ...settings, hijriAdjustment: adjustment });
  };

  const handleAudioTypeChange = (audioAthan: 'athan' | 'chime' | 'mute') => {
    onUpdateSettings({ ...settings, audioAthan });
  };

  const handleVolumeChange = (vol: number) => {
    onUpdateSettings({ ...settings, audioVolume: vol });
  };

  const handleTestAudio = () => {
    if (settings.audioAthan === 'chime') {
      soundService.playChime(settings.audioVolume);
    } else if (settings.audioAthan === 'athan') {
      soundService.playAthanSample(settings.audioVolume);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] shadow-2xl border border-stone-200 dark:border-emerald-900/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('settings.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* 0. Appearance / Theme */}
          <div className="space-y-2 pb-4 border-b border-stone-200 dark:border-stone-800">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('theme.appearance')}
            </label>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Choose your visual theme or sync automatically with your device system preferences.
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 ring-2 ring-amber-400/40 font-bold'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-amber-500' : 'text-stone-400'}`} />
                <span className="text-xs font-semibold">{t('theme.light')}</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 font-bold'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-stone-400'}`} />
                <span className="text-xs font-semibold">{t('theme.dark')}</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  theme === 'system'
                    ? 'bg-emerald-900/30 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/40 font-bold'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
                <span className="text-xs font-semibold">{t('theme.system')}</span>
              </button>
            </div>
          </div>

          {/* 1. Calculation Method */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('settings.calcMethod')}
            </label>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Select the scientific convention adopted by your regional religious authority.
            </p>
            <select
              value={settings.method}
              onChange={(e) => handleMethodChange(e.target.value as CalculationMethodName)}
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#142320] text-stone-900 dark:text-stone-100 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              {Object.entries(CALCULATION_METHOD_LABELS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} ({item.region})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Juristic Method (Asr) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('settings.juristic')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleMadhabChange('shafi')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  settings.madhab === 'shafi'
                    ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="block font-semibold">{t('set.standard')}</span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  Shafi'i, Maliki, Hanbali (Shadow = 1x)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleMadhabChange('hanafi')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  settings.madhab === 'hanafi'
                    ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="block font-semibold">{t('set.hanafi')}</span>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  Hanafi school (Shadow = 2x)
                </span>
              </button>
            </div>
          </div>

          {/* 3. Time Display Format */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('set.timeFormat')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTimeFormatChange('12h')}
                className={`py-2 px-3 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                  settings.timeFormat === '12h'
                    ? 'bg-emerald-700 text-white font-bold border-emerald-600'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t('set.format12')}
              </button>
              <button
                type="button"
                onClick={() => handleTimeFormatChange('24h')}
                className={`py-2 px-3 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                  settings.timeFormat === '24h'
                    ? 'bg-emerald-700 text-white font-bold border-emerald-600'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t('set.format24')}
              </button>
            </div>
          </div>

          {/* 4. Hijri Calendar Sighting Adjustment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                {t('set.hijriAdj')}
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {settings.hijriAdjustment > 0 ? `+${settings.hijriAdjustment}` : settings.hijriAdjustment} days
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Align with local Hilal moon sightings if your country's moon declaration differs by 1 or 2 days.
            </p>
            <div className="flex items-center justify-between gap-1">
              {[-2, -1, 0, 1, 2].map((adj) => (
                <button
                  key={adj}
                  type="button"
                  onClick={() => handleHijriAdjustmentChange(adj)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                    settings.hijriAdjustment === adj
                      ? 'bg-emerald-700 text-white border-emerald-600'
                      : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {adj > 0 ? `+${adj}` : adj}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Prayer Sound & Volume */}
          <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {t('settings.notifications')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleAudioTypeChange('athan')}
                className={`py-2 px-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                  settings.audioAthan === 'athan'
                    ? 'bg-emerald-700 text-white font-bold border-emerald-600'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t('set.athanTone')}
              </button>
              <button
                type="button"
                onClick={() => handleAudioTypeChange('chime')}
                className={`py-2 px-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                  settings.audioAthan === 'chime'
                    ? 'bg-emerald-700 text-white font-bold border-emerald-600'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t('set.chimeTone')}
              </button>
              <button
                type="button"
                onClick={() => handleAudioTypeChange('mute')}
                className={`py-2 px-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                  settings.audioAthan === 'mute'
                    ? 'bg-stone-700 text-white font-bold border-stone-600'
                    : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {t('set.muteTone')}
              </button>
            </div>

            {settings.audioAthan !== 'mute' && (
              <div className="flex items-center gap-3 pt-2">
                <Volume2 className="w-4 h-4 text-stone-400" />
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={settings.audioVolume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 accent-emerald-600 cursor-pointer"
                  aria-label="Audio volume"
                />
                <button
                  type="button"
                  onClick={handleTestAudio}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 text-xs font-semibold cursor-pointer"
                >
                  <Play className="w-3 h-3 text-emerald-600" />
                  <span>{t('set.testTone')}</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. PWA Offline Storage & 30-Day Prayer Cache */}
          <div className="space-y-3 pt-3 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                PWA Offline Support & Cache
              </label>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isOnline
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                }`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-600" />
                    <span>Offline Active</span>
                  </>
                )}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-[#13201d] border border-stone-200 dark:border-emerald-900/40 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                      30-Day Local Prayer Cache
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      {cacheStatus.daysCached > 0 ? `${cacheStatus.daysCached} Days Stored` : 'Offline Ready'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Prayer times API responses and calendar schedules are cached locally on your device for at least 30 days (stored for 35 days). You can use all prayer calculations, countdowns, and tools offline without any internet connection.
                  </p>
                </div>
              </div>

              {/* Cache Details Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-lg bg-white dark:bg-[#0e1715] border border-stone-200/60 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Cache Duration</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    35 Days (Guaranteed ≥ 30d)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-[#0e1715] border border-stone-200/60 dark:border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Data Source</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 capitalize">
                    {cacheStatus.source === 'api' ? 'Aladhan API Verified' : 'Local Astronomical'}
                  </span>
                </div>
              </div>

              {syncMessage && (
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                  {syncMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => syncCache(true)}
                  disabled={isSyncing}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing 30 Days...' : 'Refresh 30-Day Cache'}</span>
                </button>
                <button
                  type="button"
                  onClick={clearCache}
                  title="Clear offline cache"
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-rose-600 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-[#f7f5f0] dark:bg-[#0c1412] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {t('modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
