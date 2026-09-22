'use client';

import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Activity 
} from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Doctor, DoctorStatus, Department } from '@/types/hospital';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { DoctorModal } from '@/components/doctors/DoctorModal';
import { Button } from '@/components/ui/Button';

const STATUS_FILTERS: { label: string; value: 'ALL' | DoctorStatus }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Disponibles', value: 'Disponible' },
  { label: 'En consultation', value: 'En consultation' },
  { label: 'Au bloc', value: 'Au bloc' },
  { label: 'En congé', value: 'En congé' },
];

export default function DoctorsPage() {
  const { doctors, stats, deleteDoctor } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | DoctorStatus>('ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState<Doctor | null>(null);

  // Departments
  const departments = useMemo(() => {
    const set = new Set(doctors.map((d) => d.specialty));
    return Array.from(set);
  }, [doctors]);

  // Filtered Doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.phone.includes(searchQuery) ||
        doc.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'ALL' || doc.status === selectedStatus;
      const matchesDept = selectedDept === 'ALL' || doc.specialty === selectedDept;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [doctors, searchQuery, selectedStatus, selectedDept]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Corps Médical & Praticiens
            </h1>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {stats.availableDoctors} en service
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Annuaire du personnel médical, spécialités cliniques, créneaux de garde et disponibilité en temps réel.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Ajouter un Praticien
        </Button>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Médecins</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{stats.totalDoctors} praticiens</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Disponibles</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">{stats.availableDoctors} en poste</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-indigo-600 uppercase">Au bloc opératoire</span>
          <p className="text-xl font-bold text-indigo-700 mt-0.5">
            {doctors.filter((d) => d.status === 'Au bloc').length} chirurgiens
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-amber-600 uppercase">En consultation</span>
          <p className="text-xl font-bold text-amber-700 mt-0.5">
            {doctors.filter((d) => d.status === 'En consultation').length} praticiens
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, spécialité, bureau..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-hidden transition-all"
          />
        </div>

        {/* Department Filter */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden font-medium"
        >
          <option value="ALL">Toutes les spécialités</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {STATUS_FILTERS.map((tab) => {
          const isActive = selectedStatus === tab.value;
          const count =
            tab.value === 'ALL'
              ? doctors.length
              : doctors.filter((d) => d.status === tab.value).length;

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

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full py-16 bg-white rounded-2xl border border-slate-200/80 text-center text-slate-400 text-sm">
            Aucun praticien ne correspond à votre recherche.
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onEdit={(doc) => setDoctorToEdit(doc)}
              onDelete={(id) => deleteDoctor(id)}
            />
          ))
        )}
      </div>

      {/* Add / Edit Doctor Modal */}
      <DoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {doctorToEdit && (
        <DoctorModal
          isOpen={!!doctorToEdit}
          onClose={() => setDoctorToEdit(null)}
          doctorToEdit={doctorToEdit}
        />
      )}
    </div>
  );
}
