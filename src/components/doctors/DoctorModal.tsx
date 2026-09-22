'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useHospital } from '@/context/HospitalContext';
import { Doctor, DoctorStatus, Department } from '@/types/hospital';

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorToEdit?: Doctor | null;
}

const DEPARTMENTS: Department[] = [
  'Cardiologie',
  'Neurologie',
  'Pédiatrie',
  'Chirurgie Générale',
  'Orthopédie',
  'Urgences',
  'Médecine Interne',
  'Radiologie',
  'Gynécologie-Obstétrique',
  'Oncologie',
];

const DOCTOR_STATUSES: DoctorStatus[] = ['Disponible', 'En consultation', 'Au bloc', 'En congé'];

export const DoctorModal: React.FC<DoctorModalProps> = ({
  isOpen,
  onClose,
  doctorToEdit,
}) => {
  const { addDoctor, updateDoctor } = useHospital();

  const [formData, setFormData] = useState({
    fullName: '',
    title: 'Médecin Spécialiste',
    specialty: 'Cardiologie' as Department,
    phone: '',
    email: '',
    roomNumber: 'Bât A - 101',
    status: 'Disponible' as DoctorStatus,
    shiftHours: '08:00 - 17:00',
    experienceYears: 10,
    patientsCount: 15,
    rating: 4.8,
  });

  useEffect(() => {
    if (doctorToEdit) {
      setFormData({
        fullName: doctorToEdit.fullName,
        title: doctorToEdit.title,
        specialty: doctorToEdit.specialty,
        phone: doctorToEdit.phone,
        email: doctorToEdit.email,
        roomNumber: doctorToEdit.roomNumber,
        status: doctorToEdit.status,
        shiftHours: doctorToEdit.shiftHours,
        experienceYears: doctorToEdit.experienceYears,
        patientsCount: doctorToEdit.patientsCount,
        rating: doctorToEdit.rating,
      });
    } else {
      setFormData({
        fullName: '',
        title: 'Praticien Hospitalier',
        specialty: 'Cardiologie',
        phone: '',
        email: '',
        roomNumber: 'Bât A - 201',
        status: 'Disponible',
        shiftHours: '08:00 - 17:00',
        experienceYears: 8,
        patientsCount: 0,
        rating: 4.9,
      });
    }
  }, [doctorToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const payload = {
      fullName: formData.fullName.trim().startsWith('Dr.')
        ? formData.fullName.trim()
        : `Dr. ${formData.fullName.trim()}`,
      title: formData.title.trim(),
      specialty: formData.specialty,
      phone: formData.phone.trim() || '+33 6 00 00 00 00',
      email: formData.email.trim() || 'praticien@medipulse.fr',
      roomNumber: formData.roomNumber.trim(),
      status: formData.status,
      shiftHours: formData.shiftHours.trim(),
      experienceYears: Number(formData.experienceYears),
      patientsCount: Number(formData.patientsCount),
      rating: Number(formData.rating),
    };

    if (doctorToEdit) {
      updateDoctor(doctorToEdit.id, payload);
    } else {
      addDoctor(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={doctorToEdit ? 'Modifier le Profil Praticien' : 'Ajouter un Praticien'}
      subtitle="Coordonnées, spécialité et statut de disponibilité"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nom et Prénom du Médecin *
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Sarah Benali ou Dr. Sarah Benali"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Titre / Fonction
            </label>
            <input
              type="text"
              placeholder="Ex: Chef de Service, Urgentiste..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Spécialité / Service *
            </label>
            <select
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value as Department })}
              className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Professionnel
            </label>
            <input
              type="email"
              placeholder="docteur@hopital-medipulse.fr"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Bureau / Salle
            </label>
            <input
              type="text"
              placeholder="Ex: Bât A - 302"
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Horaires / Garde
            </label>
            <input
              type="text"
              placeholder="Ex: 08:00 - 17:00"
              value={formData.shiftHours}
              onChange={(e) => setFormData({ ...formData, shiftHours: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Disponibilité initiale
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as DoctorStatus })}
              className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
            >
              {DOCTOR_STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Années d&apos;expérience
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note d&apos;évaluation
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" size="md">
            {doctorToEdit ? 'Enregistrer les modifications' : 'Ajouter le praticien'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
