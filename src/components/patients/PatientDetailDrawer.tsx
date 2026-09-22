'use client';

import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Activity, 
  Thermometer, 
  Wind, 
  Phone, 
  Mail, 
  ShieldAlert, 
  UserCheck, 
  Edit, 
  Trash2, 
  FileText,
  Clock,
  Bed,
  CheckCircle2
} from 'lucide-react';
import { Patient } from '@/types/hospital';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHospital } from '@/context/HospitalContext';
import { PatientModal } from './PatientModal';

interface PatientDetailDrawerProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

export const PatientDetailDrawer: React.FC<PatientDetailDrawerProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  const { deletePatient, updatePatient } = useHospital();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleDischarge = () => {
    updatePatient(patient.id, { status: 'Sorti' });
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Voulez-vous vraiment supprimer le dossier de ${patient.fullName} ?`)) {
      deletePatient(patient.id);
      onClose();
    }
  };

  const vitals = patient.vitalSigns || {
    bloodPressure: '120/80',
    heartRate: 72,
    temperature: 36.8,
    oxygenLevel: 98,
    lastUpdated: 'Aujourd\'hui',
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-slideInRight">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-sm">
                  {patient.fullName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{patient.fullName}</h3>
                    <Badge variant={patient.status}>{patient.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {patient.matricule} • {patient.age} ans • Groupe {patient.bloodGroup}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {/* Constantes Vitales */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Constantes Vitales en Temps Réel
                  </h4>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {vitals.lastUpdated}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                    <div className="flex items-center gap-1 text-rose-600 mb-1">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Pouls</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{vitals.heartRate}</span>
                    <span className="text-[10px] text-slate-500 ml-1">bpm</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                    <div className="flex items-center gap-1 text-blue-600 mb-1">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Tension</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{vitals.bloodPressure}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                    <div className="flex items-center gap-1 text-amber-600 mb-1">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Temp.</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{vitals.temperature}</span>
                    <span className="text-[10px] text-slate-500 ml-1">°C</span>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100">
                    <div className="flex items-center gap-1 text-teal-600 mb-1">
                      <Wind className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">SpO2</span>
                    </div>
                    <span className="text-base font-extrabold text-slate-900">{vitals.oxygenLevel}</span>
                    <span className="text-[10px] text-slate-500 ml-1">%</span>
                  </div>
                </div>
              </div>

              {/* Affectation et Localisation */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Pôle de Spécialité :</span>
                  <span className="font-bold text-slate-900">{patient.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Chambre & Lit :</span>
                  <span className="font-semibold text-slate-800">
                    {patient.roomNumber ? `${patient.roomNumber} - ${patient.bedNumber || 'Standard'}` : 'Non assigné'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Médecin Référent :</span>
                  <span className="font-semibold text-blue-700">
                    {patient.doctorAssignedName || 'Aucun'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Date d&apos;admission :</span>
                  <span className="font-mono text-slate-700">{patient.admissionDate}</span>
                </div>
              </div>

              {/* Allergies & Antécédents */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Allergies & Contre-indications
                  </h4>
                  {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.allergies.map((allergy, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold"
                        >
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Aucune allergie connue signalée.</p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Historique Médical & Observations
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    {patient.medicalHistory || 'Aucun antécédent particulier renseigné.'}
                  </div>
                </div>

                {patient.notes && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Notes de Surveillance
                    </h4>
                    <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/60 text-xs text-blue-900 leading-relaxed">
                      {patient.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Contacts */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Coordonnées & Proche
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{patient.phone || 'Non renseigné'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{patient.email || 'Non renseigné'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-0.5">
                      Contact d&apos;urgence ({patient.emergencyContact?.relationship})
                    </span>
                    <span className="font-bold text-slate-800">{patient.emergencyContact?.name}</span>
                    <span className="text-slate-500 ml-2">({patient.emergencyContact?.phone})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit className="w-3.5 h-3.5" />}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Modifier
                </Button>
                {patient.status !== 'Sorti' && (
                  <Button
                    variant="subtle"
                    size="sm"
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={handleDischarge}
                  >
                    Valider Sortie
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <PatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patientToEdit={patient}
      />
    </>
  );
};
