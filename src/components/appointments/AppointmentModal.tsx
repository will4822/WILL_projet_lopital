'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useHospital } from '@/context/HospitalContext';
import { Appointment, AppointmentStatus, AppointmentType, Department } from '@/types/hospital';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentToEdit?: Appointment | null;
}

const APPOINTMENT_TYPES: AppointmentType[] = [
  'Consultation générale',
  'Suivi médical',
  'Urgence',
  'Chirurgie',
  'Examen / Bilan',
];

const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  'Confirmé',
  'En attente',
  'Terminé',
  'Annulé',
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointmentToEdit,
}) => {
  const { addAppointment, updateAppointment, patients, doctors } = useHospital();

  const [formData, setFormData] = useState({
    patientId: '',
    customPatientName: '',
    customPatientPhone: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    durationMinutes: 30,
    type: 'Consultation générale' as AppointmentType,
    status: 'Confirmé' as AppointmentStatus,
    reason: '',
    notes: '',
  });

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        patientId: appointmentToEdit.patientId || 'custom',
        customPatientName: appointmentToEdit.patientName,
        customPatientPhone: appointmentToEdit.patientPhone,
        doctorId: appointmentToEdit.doctorId,
        date: appointmentToEdit.date,
        time: appointmentToEdit.time,
        durationMinutes: appointmentToEdit.durationMinutes,
        type: appointmentToEdit.type,
        status: appointmentToEdit.status,
        reason: appointmentToEdit.reason,
        notes: appointmentToEdit.notes || '',
      });
    } else {
      setFormData({
        patientId: patients[0]?.id || '',
        customPatientName: '',
        customPatientPhone: '',
        doctorId: doctors[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        time: '11:00',
        durationMinutes: 30,
        type: 'Consultation générale',
        status: 'Confirmé',
        reason: '',
        notes: '',
      });
    }
  }, [appointmentToEdit, isOpen, patients, doctors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let patientName = formData.customPatientName;
    let patientPhone = formData.customPatientPhone;
    let patientId = formData.patientId;

    if (formData.patientId && formData.patientId !== 'custom') {
      const p = patients.find((pat) => pat.id === formData.patientId);
      if (p) {
        patientName = p.fullName;
        patientPhone = p.phone;
        patientId = p.id;
      }
    }

    if (!patientName.trim()) return;

    const doc = doctors.find((d) => d.id === formData.doctorId) || doctors[0];

    const appointmentPayload = {
      patientId: patientId || 'PAT-EXT',
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim() || '+33 6 00 00 00 00',
      doctorId: doc.id,
      doctorName: doc.fullName,
      department: doc.specialty,
      date: formData.date,
      time: formData.time,
      durationMinutes: Number(formData.durationMinutes),
      type: formData.type,
      status: formData.status,
      reason: formData.reason.trim() || 'Consultation de routine',
      notes: formData.notes.trim() || undefined,
    };

    if (appointmentToEdit) {
      updateAppointment(appointmentToEdit.id, appointmentPayload);
    } else {
      addAppointment(appointmentPayload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appointmentToEdit ? 'Modifier le Rendez-vous' : 'Planifier un Rendez-vous'}
      subtitle="Sélectionnez le praticien, la date et le motif de consultation"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Patient concerné *
          </label>
          <select
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.matricule}) - {p.department}
              </option>
            ))}
            <option value="custom">+ Patient externe / Nouveau non enregistré</option>
          </select>

          {formData.patientId === 'custom' && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                required
                placeholder="Nom complet du patient"
                value={formData.customPatientName}
                onChange={(e) => setFormData({ ...formData, customPatientName: e.target.value })}
                className="text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
              <input
                type="tel"
                placeholder="Téléphone de contact"
                value={formData.customPatientPhone}
                onChange={(e) => setFormData({ ...formData, customPatientPhone: e.target.value })}
                className="text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Médecin Spécialiste *
          </label>
          <select
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fullName} — {doc.specialty} ({doc.status})
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Heure *
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Durée (minutes)
            </label>
            <select
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>1 heure</option>
            </select>
          </div>
        </div>

        {/* Type & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Type de consultation
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as AppointmentType })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
            >
              {APPOINTMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as AppointmentStatus })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-white"
            >
              {APPOINTMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reason / Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Motif de la consultation *
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Contrôle tensionnel, Bilan sanguin, Douleurs thoraciques..."
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes complémentaires / Instructions
          </label>
          <textarea
            rows={2}
            placeholder="Consignes particulières, antécédents utiles..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden resize-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary" size="md">
            {appointmentToEdit ? 'Mettre à jour' : 'Confirmer le Rendez-vous'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
