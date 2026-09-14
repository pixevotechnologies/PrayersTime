import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  X,
  Check,
  Star,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { LocationData } from '../../types';
import {
  GLOBAL_CITIES,
  searchCities,
  getFavoriteLocations,
  toggleFavoriteLocation,
  isLocationFavorite,
  resetFavoriteLocations,
} from '../../services/citiesData';

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
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favorites, setFavorites] = useState<LocationData[]>(() =>
    getFavoriteLocations()
  );

  // Sync favorites whenever modal is reopened
  useEffect(() => {
    if (isOpen) {
      setFavorites(getFavoriteLocations());
      setSearchQuery('');
      setGpsError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const searchResults = searchCities(searchQuery);

  // Filter favorites if user searches while in favorites tab
  const filteredFavorites = searchQuery.trim()
    ? favorites.filter((fav) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          fav.city.toLowerCase().includes(q) ||
          fav.country.toLowerCase().includes(q) ||
          (fav.region && fav.region.toLowerCase().includes(q))
        );
      })
    : favorites;

  const isCurrentLocFav = isLocationFavorite(currentLocation, favorites);

  const handleToggleFavorite = (
    e: React.MouseEvent,
    loc: LocationData
  ) => {
    e.stopPropagation();
    const updated = toggleFavoriteLocation(loc, favorites);
    setFavorites(updated);
  };

  const handleResetDefaultFavorites = () => {
    const defaults = resetFavoriteLocations();
    setFavorites(defaults);
  };

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
    <div
      id="location-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="location-modal-container"
        className="w-full max-w-xl rounded-3xl bg-[#fcfbf9] dark:bg-[#101a17] shadow-2xl border border-stone-200 dark:border-emerald-900/40 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-tight">
                Select Prayer Location
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Switch or favorite locations for quick daily access
              </p>
            </div>
          </div>
          <button
            id="btn-close-location-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search, GPS & View Tabs */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 space-y-3 bg-[#f7f5f0] dark:bg-[#0c1412]">
          {/* Current Active Location Card with Favorite Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-[#13221e]/90 border border-stone-200/80 dark:border-emerald-900/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  Current Location
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate block">
                  {currentLocation.city}
                  <span className="text-stone-400 dark:text-stone-500 font-normal">
                    {currentLocation.country ? `, ${currentLocation.country}` : ''}
                  </span>
                </span>
              </div>
            </div>

            <button
              id="btn-toggle-current-favorite"
              onClick={(e) => handleToggleFavorite(e, currentLocation)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isCurrentLocFav
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60'
                  : 'bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700'
              }`}
              title={isCurrentLocFav ? 'Saved in Favorites' : 'Add to Favorites'}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isCurrentLocFav
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-stone-400'
                }`}
              />
              <span className="hidden sm:inline">
                {isCurrentLocFav ? 'In Favorites' : 'Add to Favorites'}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-location-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city (e.g. Makkah, London, Istanbul, Jakarta)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#142320] text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Segmented Tabs & GPS Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            {/* Tabs: All Places vs Favorites */}
            <div
              id="location-filter-tabs"
              className="flex items-center p-1 rounded-xl bg-stone-200/70 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60"
            >
              <button
                id="tab-all-cities"
                onClick={() => setActiveTab('all')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-[#162723] text-emerald-800 dark:text-emerald-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                All Places
              </button>
              <button
                id="tab-favorite-cities"
                onClick={() => setActiveTab('favorites')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'bg-white dark:bg-[#162723] text-amber-700 dark:text-amber-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    activeTab === 'favorites'
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-stone-400'
                  }`}
                />
                <span>Favorites</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-[10px] font-mono">
                  {favorites.length}
                </span>
              </button>
            </div>

            {/* GPS Detection Button */}
            <button
              id="btn-detect-gps"
              onClick={handleUseGPS}
              disabled={isDetectingGPS}
              className="py-1.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation
                className={`w-3.5 h-3.5 ${isDetectingGPS ? 'animate-spin' : ''}`}
              />
              <span>
                {isDetectingGPS ? 'Detecting...' : 'Use Current GPS'}
              </span>
            </button>
          </div>

          {gpsError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 text-center font-medium bg-rose-50 dark:bg-rose-950/30 p-2 rounded-xl border border-rose-200 dark:border-rose-900/40">
              {gpsError}
            </p>
          )}
        </div>

        {/* Content Body: Favorites or All Cities */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: FAVORITES VIEW */}
          {activeTab === 'favorites' && (
            <div id="favorites-section" className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    Your Saved Favorites ({filteredFavorites.length})
                  </span>
                  <p className="text-[11px] text-stone-400">
                    Quickly toggle prayer times between your frequent places
                  </p>
                </div>

                {favorites.length > 0 && (
                  <button
                    onClick={handleResetDefaultFavorites}
                    className="text-[11px] font-semibold text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Restore Holy Sanctuaries (Makkah, Madinah, Jerusalem)"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore Defaults</span>
                  </button>
                )}
              </div>

              {filteredFavorites.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#121f1c]/40 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {searchQuery ? 'No matching favorites' : 'No Favorite Places Saved Yet'}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                      {searchQuery
                        ? `No saved favorites matched "${searchQuery}". Try switching to All Places.`
                        : 'Tap the star icon next to any city to pin your home, workplace, or travel destinations here.'}
                    </p>
                  </div>
                  {!searchQuery && (
                    <button
                      onClick={handleResetDefaultFavorites}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Pin Sacred Sanctuaries (Makkah, Madinah, Al-Quds)</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredFavorites.map((fav) => {
                    const isSelected =
                      currentLocation.city.toLowerCase() ===
                        fav.city.toLowerCase() &&
                      currentLocation.country.toLowerCase() ===
                        fav.country.toLowerCase();

                    return (
                      <div
                        key={`fav-${fav.city}-${fav.countryCode}`}
                        onClick={() => handleSelectCity(fav)}
                        className={`group relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 shadow-xs'
                            : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 hover:border-emerald-400 hover:shadow-xs'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                              {fav.city}
                            </span>
                            {isSelected && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider">
                                Active
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-500 dark:text-stone-400 block truncate mt-0.5">
                            {fav.region ? `${fav.region}, ` : ''}{fav.country}
                          </span>
                          <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono block mt-1">
                            {fav.timezone}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => handleToggleFavorite(e, fav)}
                            className="p-2 rounded-xl text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors cursor-pointer"
                            title="Remove from favorites"
                            aria-label={`Remove ${fav.city} from favorites`}
                          >
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ALL PLACES VIEW */}
          {activeTab === 'all' && (
            <div className="space-y-5">
              {/* Quick Favorites Row (when no search query) */}
              {!searchQuery.trim() && favorites.length > 0 && (
                <div id="quick-favorites-bar" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      Favorite Places
                    </span>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Manage ({favorites.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {favorites.map((fav) => {
                      const isSelected =
                        currentLocation.city.toLowerCase() ===
                        fav.city.toLowerCase();

                      return (
                        <button
                          key={`quick-fav-${fav.city}`}
                          onClick={() => handleSelectCity(fav)}
                          className={`group p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-200 font-bold'
                              : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold block truncate pr-1">
                              {fav.city}
                            </span>
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                          </div>
                          <span className="text-[10px] text-stone-400 block truncate mt-0.5">
                            {fav.country}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Popular Global Cities (when no search query) */}
              {!searchQuery.trim() && (
                <div id="popular-cities-bar" className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                    Popular Global Cities
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {GLOBAL_CITIES.slice(0, 9).map((city) => {
                      const isCurrent =
                        currentLocation.city.toLowerCase() ===
                        city.city.toLowerCase();
                      const isFav = isLocationFavorite(city, favorites);

                      return (
                        <div
                          key={city.city}
                          onClick={() => handleSelectCity(city)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                            isCurrent
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-white dark:bg-[#142320] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                          }`}
                        >
                          <div className="min-w-0 pr-1">
                            <span className="font-semibold block truncate">
                              {city.city}
                            </span>
                            <span className="text-[10px] text-stone-400 block truncate">
                              {city.country}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleToggleFavorite(e, city)}
                            className="p-1 rounded-md text-stone-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors shrink-0 cursor-pointer"
                            title={
                              isFav
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                            }
                            aria-label={`Toggle favorite for ${city.city}`}
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isFav
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-stone-400'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All / Filtered Cities List */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
                  {searchQuery.trim()
                    ? `Search Results (${searchResults.length})`
                    : 'All Global Cities'}
                </span>

                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-stone-500 text-xs space-y-2">
                    <p>No matching city found for "{searchQuery}".</p>
                    <p className="text-stone-400">
                      Try detecting your precise coordinates with the GPS button above.
                    </p>
                  </div>
                ) : (
                  searchResults.map((city) => {
                    const isSelected =
                      currentLocation.city.toLowerCase() ===
                      city.city.toLowerCase();
                    const isFav = isLocationFavorite(city, favorites);

                    return (
                      <div
                        key={`${city.city}-${city.countryCode}`}
                        onClick={() => handleSelectCity(city)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold'
                            : 'hover:bg-stone-100 dark:hover:bg-[#14221f] text-stone-800 dark:text-stone-200'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold truncate">
                              {city.city}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-stone-400 truncate">
                            {city.region ? `${city.region}, ` : ''}
                            {city.country} · {city.timezone}
                          </div>
                        </div>

                        {/* Favorite star toggle */}
                        <button
                          onClick={(e) => handleToggleFavorite(e, city)}
                          className="p-2 rounded-xl text-stone-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors shrink-0 cursor-pointer"
                          title={
                            isFav
                              ? 'Remove from favorites'
                              : 'Add to favorites'
                          }
                          aria-label={`Toggle favorite for ${city.city}`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFav
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-stone-400'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
