'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useHospital } from '@/context/HospitalContext';
import { Patient, PatientStatus, Gender, BloodGroup, Department } from '@/types/hospital';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientToEdit?: Patient | null;
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

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATUSES: PatientStatus[] = ['Hospitalisé', 'Ambulatoire', 'Soins intensifs', 'Sorti', 'Urgence'];

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  patientToEdit,
}) => {
  const { addPatient, updatePatient, doctors } = useHospital();

  const [formData, setFormData] = useState({
    fullName: '',
    age: 30,
    gender: 'Femme' as Gender,
    phone: '',
    email: '',
    bloodGroup: 'A+' as BloodGroup,
    status: 'Hospitalisé' as PatientStatus,
    department: 'Cardiologie' as Department,
    roomNumber: '',
    bedNumber: '',
    doctorAssignedId: '',
    admissionDate: new Date().toISOString().split('T')[0],
    emergencyName: '',
    emergencyPhone: '',
    emergencyRel: 'Famille',
    allergies: '',
    medicalHistory: '',
    notes: '',
  });

  useEffect(() => {
    if (patientToEdit) {
      setFormData({
        fullName: patientToEdit.fullName,
        age: patientToEdit.age,
        gender: patientToEdit.gender,
        phone: patientToEdit.phone,
        email: patientToEdit.email,
        bloodGroup: patientToEdit.bloodGroup,
        status: patientToEdit.status,
        department: patientToEdit.department,
        roomNumber: patientToEdit.roomNumber || '',
        bedNumber: patientToEdit.bedNumber || '',
        doctorAssignedId: patientToEdit.doctorAssignedId || '',
        admissionDate: patientToEdit.admissionDate,
        emergencyName: patientToEdit.emergencyContact?.name || '',
        emergencyPhone: patientToEdit.emergencyContact?.phone || '',
        emergencyRel: patientToEdit.emergencyContact?.relationship || 'Famille',
        allergies: (patientToEdit.allergies || []).join(', '),
        medicalHistory: patientToEdit.medicalHistory || '',
        notes: patientToEdit.notes || '',
      });
    } else {
      setFormData({
        fullName: '',
        age: 32,
        gender: 'Femme',
        phone: '',
        email: '',
        bloodGroup: 'O+',
        status: 'Hospitalisé',
        department: 'Cardiologie',
        roomNumber: 'Ch. 201',
        bedNumber: 'Lit A',
        doctorAssignedId: doctors[0]?.id || '',
        admissionDate: new Date().toISOString().split('T')[0],
        emergencyName: '',
        emergencyPhone: '',
        emergencyRel: 'Proche',
        allergies: '',
        medicalHistory: '',
        notes: '',
      });
    }
  }, [patientToEdit, isOpen, doctors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const assignedDoctor = doctors.find((d) => d.id === formData.doctorAssignedId);

    const allergiesArray = formData.allergies
      ? formData.allergies.split(',').map((a) => a.trim()).filter(Boolean)
      : [];

    const patientPayload = {
      fullName: formData.fullName.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      bloodGroup: formData.bloodGroup,
      status: formData.status,
      department: formData.department,
      roomNumber: formData.roomNumber.trim() || undefined,
      bedNumber: formData.bedNumber.trim() || undefined,
      doctorAssignedId: formData.doctorAssignedId || undefined,
      doctorAssignedName: assignedDoctor ? assignedDoctor.fullName : undefined,
      admissionDate: formData.admissionDate,
      emergencyContact: {
        name: formData.emergencyName.trim() || 'Non renseigné',
        phone: formData.emergencyPhone.trim() || formData.phone,
        relationship: formData.emergencyRel.trim() || 'Proche',
      },
      allergies: allergiesArray,
      medicalHistory: formData.medicalHistory.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      vitalSigns: patientToEdit?.vitalSigns || {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 36.8,
        oxygenLevel: 99,
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      },
    };

    if (patientToEdit) {
      updatePatient(patientToEdit.id, patientPayload);
    } else {
      addPatient(patientPayload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={patientToEdit ? 'Modifier le Dossier Patient' : 'Nouveau Dossier Patient'}
      subtitle="Saisissez les informations administratives et cliniques"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section Identité */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            1. Informations Personnelles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ex: Jean Dupont"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Genre
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                  className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white"
                >
                  <option value="Femme">Femme</option>
                  <option value="Homme">Homme</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 6 12 34 56 78"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="patient@email.com"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section Clinique & Affectation */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            2. Prise en Charge Clinique
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Statut d&apos;admission
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Département / Service
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Groupe Sanguin
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Médecin Référent
              </label>
              <select
                value={formData.doctorAssignedId}
                onChange={(e) => setFormData({ ...formData, doctorAssignedId: e.target.value })}
                className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white"
              >
                <option value="">-- Aucun médecin assigné --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.fullName} ({doc.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chambre
              </label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                placeholder="Ex: Ch. 302"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lit
              </label>
              <input
                type="text"
                value={formData.bedNumber}
                onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                placeholder="Ex: Lit A"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section Contact d'urgence & Antécédents */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
            3. Contact d&apos;Urgence & Antécédents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact d&apos;urgence (Nom)
              </label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                placeholder="Nom du proche"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone d&apos;urgence
              </label>
              <input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                placeholder="+33 6 ..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Allergies connues (séparées par virgule)
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="Ex: Pénicilline, Iode"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Antécédents médicaux & Notes cliniques
            </label>
            <textarea
              rows={2}
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              placeholder="Antécédents, traitements en cours, observations..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" size="md">
            {patientToEdit ? 'Enregistrer les modifications' : 'Créer le dossier patient'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
