'use client';

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  UserPlus, 
  CalendarPlus, 
  Sparkles, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useHospital } from '@/context/HospitalContext';
import { PatientModal } from '@/components/patients/PatientModal';
import { AppointmentModal } from '@/components/appointments/AppointmentModal';

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const { activityLogs, stats } = useHospital();
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Left: Mobile Hamburger & Hospital Brand on Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">WILL HOSPITALIER</span>
          </div>

          {/* Desktop Title & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Service Hospitalier Actif
            </div>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">
              {stats.activeInpatients} patients hospitalisés • {stats.availableDoctors} médecins disponibles
            </span>
          </div>
        </div>

        {/* Right: Actions, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action: New Patient Button */}
          <div className="relative">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowQuickAddMenu(!showQuickAddMenu)}
              className="hidden sm:inline-flex"
            >
              Action Rapide
            </Button>

            {/* Quick dropdown */}
            {showQuickAddMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowQuickAddMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-scaleUp">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Création rapide
                  </div>
                  <button
                    onClick={() => {
                      setShowQuickAddMenu(false);
                      setIsPatientModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-left transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-blue-600" />
                    <span>Nouveau Patient</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowQuickAddMenu(false);
                      setIsAppointmentModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-left transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-indigo-600" />
                    <span>Planifier Rendez-vous</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quick Action icon on mobile */}
          <Button
            variant="primary"
            size="icon"
            onClick={() => setIsPatientModalOpen(true)}
            className="sm:hidden w-9 h-9 rounded-xl"
            title="Ajouter un patient"
          >
            <UserPlus className="w-4 h-4" />
          </Button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {activityLogs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-scaleUp">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-900">Journal d&apos;activité</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      Temps réel
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                    {activityLogs.slice(0, 8).map((log) => (
                      <div key={log.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 leading-snug">{log.description}</p>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                              <span>{log.actor}</span>
                              <span>{log.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              DR
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Dr. Régulateur</p>
              <p className="text-[10px] text-slate-500">Coordination Médicale</p>
            </div>
          </div>
        </div>
      </header>

      {/* Modals triggered from Header */}
      <PatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
};
