'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  BedDouble, 
  AlertTriangle, 
  UserPlus, 
  CalendarPlus, 
  Activity, 
  TrendingUp, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { AdmissionsChart } from '@/components/dashboard/AdmissionsChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { TodayAppointments } from '@/components/dashboard/TodayAppointments';
import { RecentPatientsTable } from '@/components/dashboard/RecentPatientsTable';
import { PatientModal } from '@/components/patients/PatientModal';
import { AppointmentModal } from '@/components/appointments/AppointmentModal';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { stats } = useHospital();
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tableau de Bord
            </h1>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Direct
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Supervision globale des flux cliniques, admissions, praticiens et occupation des lits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            leftIcon={<CalendarPlus className="w-4 h-4 text-indigo-600" />}
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            Planifier RDV
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsPatientModalOpen(true)}
          >
            Nouveau Patient
          </Button>
        </div>
      </div>

      {/* Emergency Banner if patients in emergency */}
      {stats.emergencyCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 text-white shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="font-bold text-sm">
                Alerte Service des Urgences : {stats.emergencyCount} patient(s) en prise en charge critique
              </p>
              <p className="text-xs text-rose-100">
                Lits de déchocage mobilisés et équipe de garde en alerte active.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold bg-white text-rose-700 px-3 py-1.5 rounded-xl">
            Triage Niveau 1
          </span>
        </div>
      )}

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          subtitle={`${stats.activeInpatients} actuellement hospitalisés`}
          trend={{ value: '+8.4%', isPositive: true, label: 'vs mois dernier' }}
          icon={Users}
          colorScheme="blue"
        />
        <StatCard
          title="Rendez-vous du Jour"
          value={stats.todayAppointments}
          subtitle={`${stats.pendingAppointments} en attente de validation`}
          trend={{ value: '+14%', isPositive: true, label: 'activité soutenue' }}
          icon={Calendar}
          colorScheme="indigo"
        />
        <StatCard
          title="Médecins Disponibles"
          value={`${stats.availableDoctors} / ${stats.totalDoctors}`}
          subtitle="Sur l'ensemble des départements"
          trend={{ value: '100%', isPositive: true, label: 'gardes assurées' }}
          icon={Stethoscope}
          colorScheme="emerald"
        />
        <StatCard
          title="Lits Libres"
          value={`${stats.freeBeds} / ${stats.totalBeds}`}
          subtitle={`Taux d'occupation : ${stats.occupancyRate}%`}
          trend={{ value: `${stats.occupancyRate}%`, isPositive: stats.occupancyRate < 90, label: 'occupation' }}
          icon={BedDouble}
          colorScheme="amber"
        />
      </div>

      {/* 2 Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdmissionsChart />
        </div>
        <div className="lg:col-span-1">
          <DepartmentChart />
        </div>
      </div>

      {/* 2 Operational Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayAppointments />
        <RecentPatientsTable />
      </div>

      {/* Quick Modals */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}
