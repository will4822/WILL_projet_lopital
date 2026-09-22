'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search, 
  User, 
  CheckCircle2, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Phone, 
  CalendarDays, 
  ListFilter,
  Layers
} from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Appointment, AppointmentStatus } from '@/types/hospital';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AppointmentModal } from './AppointmentModal';
import { formatDate } from '@/lib/utils';

const STATUS_TABS: { label: string; value: 'ALL' | AppointmentStatus }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Confirmés', value: 'Confirmé' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Terminés', value: 'Terminé' },
  { label: 'Annulés', value: 'Annulé' },
];

export const AppointmentList: React.FC = () => {
  const { appointments, updateAppointment, deleteAppointment, doctors } = useHospital();

  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | AppointmentStatus>('ALL');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((a) => {
        const matchesSearch =
          a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.reason.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
        const matchesDoctor = selectedDoctorId === 'ALL' || a.doctorId === selectedDoctorId;
        const matchesDate = !selectedDate || a.date === selectedDate;

        return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
      })
      .sort((a, b) => {
        // Sort by date then time
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
  }, [appointments, searchQuery, selectedStatus, selectedDoctorId, selectedDate]);

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    updateAppointment(id, { status });
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par patient, praticien ou motif..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-hidden transition-all"
          />
        </div>

        {/* Filters and Add button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Doctor filter */}
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden font-medium"
          >
            <option value="ALL">Tous les praticiens</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.fullName}</option>
            ))}
          </select>

          {/* Date Picker Filter */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden"
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className="text-xs text-blue-600 hover:underline px-1"
            >
              Effacer date
            </button>
          )}

          {/* View mode toggle */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Planning
            </button>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Planifier RDV
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {STATUS_TABS.map((tab) => {
          const isActive = selectedStatus === tab.value;
          const count =
            tab.value === 'ALL'
              ? appointments.length
              : appointments.filter((a) => a.status === tab.value).length;

          return (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* View Content */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredAppointments.length === 0 ? (
            <div className="col-span-full py-16 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400 text-sm">
              Aucun rendez-vous trouvé avec ces filtres.
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Time & Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span>
                        {formatDate(apt.date)} à {apt.time} ({apt.durationMinutes} min)
                      </span>
                    </div>
                    <Badge variant={apt.status}>{apt.status}</Badge>
                  </div>

                  {/* Patient & Doctor details */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                          {apt.patientName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">
                            {apt.patientName}
                          </h4>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            {apt.patientPhone}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                        {apt.type}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-500">Praticien :</span>
                        <span className="font-bold text-blue-800">{apt.doctorName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Pôle :</span>
                        <span className="font-semibold text-slate-700">{apt.department}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/40">
                      <strong className="text-slate-800 block mb-0.5">Motif :</strong>
                      <p className="line-clamp-2">{apt.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between">
                  {/* Status quick switcher buttons */}
                  <div className="flex items-center gap-1.5">
                    {apt.status !== 'Terminé' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Terminé')}
                        title="Marquer Terminé"
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Terminé</span>
                      </button>
                    )}
                    {apt.status !== 'Confirmé' && apt.status !== 'Terminé' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Confirmé')}
                        title="Confirmer"
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirmer</span>
                      </button>
                    )}
                    {apt.status !== 'Annulé' && apt.status !== 'Terminé' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'Annulé')}
                        title="Annuler le rendez-vous"
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Annuler</span>
                      </button>
                    )}
                  </div>

                  {/* Edit & Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setAppointmentToEdit(apt)}
                      title="Modifier"
                      className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer ce rendez-vous ?`)) {
                          deleteAppointment(apt.id);
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
            ))
          )}
        </div>
      ) : (
        /* Timeline View */
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Planning Chronologique des Rendez-vous
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {filteredAppointments.length} créneaux prévus
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-blue-100 space-y-6 my-4">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-xl border border-slate-200/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-600 font-mono text-sm">{apt.time}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-slate-900 text-sm">{apt.patientName}</span>
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {apt.doctorName} ({apt.department}) — <span className="italic">{apt.reason}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAppointmentToEdit(apt)}
                    >
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <AppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {appointmentToEdit && (
        <AppointmentModal
          isOpen={!!appointmentToEdit}
          onClose={() => setAppointmentToEdit(null)}
          appointmentToEdit={appointmentToEdit}
        />
      )}
    </div>
  );
};
