'use client';

import React from 'react';
import { PatientTable } from '@/components/patients/PatientTable';
import { Users, HeartPulse, UserCheck, Bed } from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';

export default function PatientsPage() {
  const { stats, patients } = useHospital();

  const icuCount = patients.filter((p) => p.status === 'Soins intensifs').length;
  const outpatientCount = patients.filter((p) => p.status === 'Ambulatoire').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestion des Dossiers Patients
          </h1>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {stats.totalPatients} dossiers
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Recherche multicritère, admission, suivi des constantes vitales, historique et statut d&apos;hospitalisation.
        </p>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Hospitalisés</span>
          <p className="text-xl font-bold text-blue-700 mt-0.5">{stats.activeInpatients} patients</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Ambulatoire</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">{outpatientCount} patients</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Soins Intensifs (ICU)</span>
          <p className="text-xl font-bold text-purple-700 mt-0.5">{icuCount} patients</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Urgences actives</span>
          <p className="text-xl font-bold text-rose-700 mt-0.5">{stats.emergencyCount} patients</p>
        </div>
      </div>

      {/* Main Table */}
      <PatientTable />
    </div>
  );
}
