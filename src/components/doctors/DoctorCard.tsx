'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Edit, 
  Trash2,
  Stethoscope
} from 'lucide-react';
import { Doctor, DoctorStatus } from '@/types/hospital';
import { Badge } from '@/components/ui/Badge';
import { useHospital } from '@/context/HospitalContext';

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
}

const DOCTOR_STATUSES: DoctorStatus[] = ['Disponible', 'En consultation', 'Au bloc', 'En congé'];

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onEdit,
  onDelete,
}) => {
  const { updateDoctor } = useHospital();

  const handleStatusChange = (status: DoctorStatus) => {
    updateDoctor(doctor.id, { status });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
              {doctor.fullName.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">
                {doctor.fullName}
              </h4>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">
                {doctor.specialty}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {doctor.matricule}
              </p>
            </div>
          </div>

          <Badge variant={doctor.status}>{doctor.status}</Badge>
        </div>

        {/* Doctor Stats (Experience, Patients, Rating) */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Expérience</span>
            <span className="font-bold text-slate-800">{doctor.experienceYears} ans</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Patients</span>
            <span className="font-bold text-slate-800">{doctor.patientsCount} suivis</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Avis</span>
            <span className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-current" />
              {doctor.rating}
            </span>
          </div>
        </div>

        {/* Meta Info: Shift, Room, Contact */}
        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Garde : <strong className="text-slate-800">{doctor.shiftHours}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Bureau : <strong className="text-slate-800">{doctor.roomNumber}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.email}</span>
          </div>
        </div>
      </div>

      {/* Footer: Quick Status dropdown + Edit/Delete */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Quick status selector */}
        <select
          value={doctor.status}
          onChange={(e) => handleStatusChange(e.target.value as DoctorStatus)}
          className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 outline-hidden font-medium"
        >
          {DOCTOR_STATUSES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(doctor)}
            title="Modifier le praticien"
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Retirer ${doctor.fullName} de la liste ?`)) {
                onDelete(doctor.id);
              }
            }}
            title="Supprimer"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
