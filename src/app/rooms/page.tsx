'use client';

import React from 'react';
import { RoomGrid } from '@/components/rooms/RoomGrid';
import { BedDouble, ShieldCheck, Activity } from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';

export default function RoomsPage() {
  const { stats } = useHospital();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Chambres, Lits & Unités de Soins
          </h1>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {stats.freeBeds} lits disponibles
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Suivi de l&apos;occupation des lits en temps réel, unités de soins intensifs (ICU), chambres particulières et maintenance.
        </p>
      </div>

      {/* Main Room Grid */}
      <RoomGrid />
    </div>
  );
}
