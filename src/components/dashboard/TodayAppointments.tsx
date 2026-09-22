'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Check, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Badge } from '@/components/ui/Badge';
import { AppointmentStatus } from '@/types/hospital';

export const TodayAppointments: React.FC = () => {
  const { appointments, updateAppointment } = useHospital();

  // Get appointments for today / recent
  const todayList = appointments.slice(0, 4);

  const handleStatusChange = (id: string, status: AppointmentStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    updateAppointment(id, { status });
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Rendez-vous du Jour</h3>
              <p className="text-xs text-slate-500">Consultations et bilans planifiés</p>
            </div>
          </div>
          <Link
            href="/appointments"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
          >
            <span>Voir tout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {todayList.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Aucun rendez-vous prévu aujourd&apos;hui.
            </div>
          ) : (
            todayList.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Heure</span>
                    <span className="text-xs font-extrabold text-blue-600">{apt.time}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{apt.patientName}</span>
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {apt.doctorName} • <span className="text-slate-700 font-medium">{apt.department}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5">
                      {apt.reason}
                    </p>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  {apt.status !== 'Terminé' && (
                    <button
                      onClick={(e) => handleStatusChange(apt.id, 'Terminé', e)}
                      title="Marquer comme terminé"
                      className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg border border-emerald-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {apt.status !== 'Confirmé' && apt.status !== 'Terminé' && (
                    <button
                      onClick={(e) => handleStatusChange(apt.id, 'Confirmé', e)}
                      title="Confirmer le rendez-vous"
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg border border-blue-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {apt.status !== 'Annulé' && apt.status !== 'Terminé' && (
                    <button
                      onClick={(e) => handleStatusChange(apt.id, 'Annulé', e)}
                      title="Annuler"
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
