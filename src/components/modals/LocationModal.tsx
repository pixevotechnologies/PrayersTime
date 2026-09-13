import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  X,
  Check,
  Globe,
  Compass,
} from 'lucide-react';
import { LocationData } from '../../types';
import { GLOBAL_CITIES, searchCities } from '../../services/citiesData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  if (!isOpen) return null;

  const searchResults = searchCities(searchQuery);

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGPS(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGPS(false);
        const { latitude, longitude } = pos.coords;
        const autoLoc: LocationData = {
          city: 'My Current Location',
          country: 'Local GPS',
          countryCode: 'GPS',
          latitude,
          longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
          isAutoDetected: true,
        };
        onSelectLocation(autoLoc);
        onClose();
      },
      (err) => {
        setIsDetectingGPS(false);
        setGpsError(
          err.code === 1
            ? 'Location access was denied. Please pick a city from the list.'
            : 'Could not acquire precise GPS coordinates.'
        );
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSelectCity = (city: LocationData) => {
    onSelectLocation(city);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] shadow-2xl border border-stone-200 dark:border-emerald-900/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Select City or Location
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & GPS Action */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 space-y-3 bg-[#f7f5f0] dark:bg-[#0c1412]">
          {/* GPS Button */}
          <button
            onClick={handleUseGPS}
            disabled={isDetectingGPS}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Navigation className={`w-4 h-4 ${isDetectingGPS ? 'animate-spin' : ''}`} />
            <span>{isDetectingGPS ? 'Detecting Precise Location...' : 'Use Precise GPS Location'}</span>
          </button>

          {gpsError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 text-center font-medium">
              {gpsError}
            </p>
          )}

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city (e.g. Makkah, London, Jakarta)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#142320] text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Popular Cities & Results List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {searchQuery.trim() === '' && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
                Popular Cities
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GLOBAL_CITIES.slice(0, 9).map((city) => {
                  const isCurrent = currentLocation.city === city.city;
                  return (
                    <button
                      key={city.city}
                      onClick={() => handleSelectCity(city)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                      }`}
                    >
                      <span className="font-semibold block truncate">{city.city}</span>
                      <span className="text-[10px] text-stone-400 block truncate">{city.country}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filtered City Search List */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
              {searchQuery.trim() ? `Search Results (${searchResults.length})` : 'All Global Cities'}
            </span>

            {searchResults.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">
                No matching city found. You can try GPS detection above.
              </p>
            ) : (
              searchResults.map((city) => {
                const isSelected =
                  currentLocation.city.toLowerCase() === city.city.toLowerCase();
                return (
                  <button
                    key={`${city.city}-${city.countryCode}`}
                    onClick={() => handleSelectCity(city)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold'
                        : 'hover:bg-stone-100 dark:hover:bg-[#14221f] text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{city.city}</div>
                      <div className="text-xs text-stone-400">
                        {city.region ? `${city.region}, ` : ''}{city.country} · {city.timezone}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
