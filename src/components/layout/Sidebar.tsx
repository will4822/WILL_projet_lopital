'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  BedDouble, 
  Activity, 
  ShieldAlert, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHospital } from '@/context/HospitalContext';

export const navigationItems = [
  {
    name: 'Tableau de bord',
    href: '/',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Patients',
    href: '/patients',
    icon: Users,
    badge: 'patientsCount',
  },
  {
    name: 'Rendez-vous',
    href: '/appointments',
    icon: Calendar,
    badge: 'todayAppointments',
  },
  {
    name: 'Médecins & Staff',
    href: '/doctors',
    icon: Stethoscope,
    badge: 'availableDoctors',
  },
  {
    name: 'Chambres & Lits',
    href: '/rooms',
    icon: BedDouble,
    badge: 'freeBeds',
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { stats, resetToDefaultData } = useHospital();

  const getBadgeValue = (badgeKey: string | null) => {
    if (!badgeKey) return null;
    if (badgeKey === 'patientsCount') return stats.totalPatients;
    if (badgeKey === 'todayAppointments') return stats.todayAppointments;
    if (badgeKey === 'availableDoctors') return `${stats.availableDoctors}/${stats.totalDoctors}`;
    if (badgeKey === 'freeBeds') return `${stats.freeBeds} libres`;
    return null;
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-100 border-r border-slate-800 shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Activity className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-base tracking-tight text-white">WILL HOSPITALIER</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-400">Système Hospitalier</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Menu Principal
        </div>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const badgeVal = getBadgeValue(item.badge);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group duration-150',
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-150 group-hover:scale-110',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  )}
                />
                <span>{item.name}</span>
              </div>
              {badgeVal !== null && (
                <span
                  className={cn(
                    'text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                  )}
                >
                  {badgeVal}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Hospital Quick Status Widget */}
      <div className="p-4 mx-3 my-2 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-800/40 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">Urgences & Garde</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Lits d&apos;urgence</span>
          <span className="font-semibold text-white">4 / 4 opérationnels</span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${stats.occupancyRate}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400">
          <span>Taux global :</span>
          <span className="text-blue-400 font-semibold">{stats.occupancyRate}%</span>
        </div>
      </div>

      {/* Reset & Footer */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">
            AD
          </div>
          <div>
            <p className="text-xs font-semibold text-white leading-tight">Admin Médical</p>
            <p className="text-[11px] text-slate-400">Poste Central</p>
          </div>
        </div>
        <button
          onClick={resetToDefaultData}
          title="Réinitialiser les données de démo"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
