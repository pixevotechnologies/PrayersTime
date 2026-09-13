import React from 'react';
import { Home, Clock, Compass, Calendar, Wrench } from 'lucide-react';

interface MobileBottomBarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentRoute, onNavigate }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'prayer-times', label: 'Prayers', icon: Clock },
    { id: 'qibla', label: 'Qibla', icon: Compass },
    { id: 'islamic-calendar', label: 'Calendar', icon: Calendar },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  return (
    <nav
      id="mobile-bottom-bar"
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#faf8f5]/95 dark:bg-[#0c1412]/95 backdrop-blur-lg border-t border-stone-200/90 dark:border-emerald-950/80 px-2 py-1.5 pb-safe shadow-lg transition-colors"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentRoute === tab.id || (tab.id === 'tools' && currentRoute.startsWith('tools'));

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-emerald-100 dark:bg-emerald-950/60' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
