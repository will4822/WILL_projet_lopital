'use client';

import React from 'react';
import { AppointmentList } from '@/components/appointments/AppointmentList';
import { useHospital } from '@/context/HospitalContext';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AppointmentsPage() {
  const { stats, appointments } = useHospital();

  const confirmedCount = appointments.filter((a) => a.status === 'Confirmé').length;
  const pendingCount = appointments.filter((a) => a.status === 'En attente').length;
  const completedCount = appointments.filter((a) => a.status === 'Terminé').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Planning & Rendez-vous
          </h1>
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {appointments.length} créneaux
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Planification des consultations, synchronisation des agendas praticiens et gestion des statuts de rendez-vous.
        </p>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Aujourd&apos;hui</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.todayAppointments} prévus</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Confirmés</span>
          <p className="text-xl font-bold text-teal-700 mt-0.5">{confirmedCount} RDV</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">En attente</span>
          <p className="text-xl font-bold text-amber-700 mt-0.5">{pendingCount} RDV</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Terminés</span>
          <p className="text-xl font-bold text-blue-700 mt-0.5">{completedCount} honorés</p>
        </div>
      </div>

      {/* Main Appointments list / timeline */}
      <AppointmentList />
    </div>
  );
}
