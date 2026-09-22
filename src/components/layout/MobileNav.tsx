'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Activity, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationItems } from './Sidebar';
import { useHospital } from '@/context/HospitalContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { stats, resetToDefaultData } = useHospital();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-white p-6 shadow-2xl flex flex-col justify-between z-50 animate-slideInLeft">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-base text-white">MediPulse</h2>
                <p className="text-xs text-slate-400">Système Hospitalier</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-1.5">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer info & reset */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300">
            <div className="flex justify-between items-center mb-1">
              <span>Lits libres :</span>
              <span className="font-semibold text-emerald-400">{stats.freeBeds} / {stats.totalBeds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Médecins dispo :</span>
              <span className="font-semibold text-blue-400">{stats.availableDoctors}</span>
            </div>
          </div>

          <button
            onClick={() => {
              resetToDefaultData();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Réinitialiser la démo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
