import React from 'react';
import { cn } from '@/lib/utils';
import { PatientStatus, DoctorStatus, AppointmentStatus, BedStatus } from '@/types/hospital';

type BadgeVariant = 
  | PatientStatus 
  | DoctorStatus 
  | AppointmentStatus 
  | BedStatus 
  | 'default'
  | 'primary'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger';

interface BadgeProps {
  variant?: BadgeVariant | string;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
  dot = true,
}) => {
  const getStyle = (v: string) => {
    switch (v) {
      // Patient Statuses
      case 'Hospitalisé':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'Ambulatoire':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'Soins intensifs':
        return 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20';
      case 'Sorti':
        return 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20';
      case 'Urgence':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';

      // Doctor Statuses
      case 'Disponible':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'En consultation':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'Au bloc':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20';
      case 'En congé':
        return 'bg-slate-100 text-slate-600 border-slate-200 ring-slate-500/20';

      // Appointment Statuses
      case 'Confirmé':
        return 'bg-teal-50 text-teal-700 border-teal-200 ring-teal-500/20';
      case 'En attente':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'Terminé':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'Annulé':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';

      // Bed Statuses
      case 'Libre':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'Occupé':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'En nettoyage':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'Maintenance':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';

      case 'primary':
        return 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/20';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'danger':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20';
    }
  };

  const getDotColor = (v: string) => {
    switch (v) {
      case 'Hospitalisé':
      case 'Occupé':
      case 'Terminé':
        return 'bg-blue-500';
      case 'Ambulatoire':
      case 'Disponible':
      case 'Libre':
      case 'success':
        return 'bg-emerald-500';
      case 'Soins intensifs':
      case 'Au bloc':
        return 'bg-purple-500';
      case 'Urgence':
      case 'Annulé':
      case 'Maintenance':
      case 'danger':
        return 'bg-rose-500';
      case 'En consultation':
      case 'En attente':
      case 'En nettoyage':
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-xs transition-colors',
        getStyle(variant),
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', getDotColor(variant))} />}
      {children}
    </span>
  );
};
