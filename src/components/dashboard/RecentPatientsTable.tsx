'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, ArrowUpRight, Eye, Phone, Bed } from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Badge } from '@/components/ui/Badge';
import { Patient } from '@/types/hospital';
import { PatientDetailDrawer } from '@/components/patients/PatientDetailDrawer';

export const RecentPatientsTable: React.FC = () => {
  const { patients } = useHospital();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const recentList = patients.slice(0, 5);

  return (
    <>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Dernières Admissions</h3>
              <p className="text-xs text-slate-500">Patients récemment admis ou consultés</p>
            </div>
          </div>
          <Link
            href="/patients"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
          >
            <span>Voir tous les patients</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Patient</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3">Service & Chambre</th>
                <th className="py-3 px-3">Médecin Référent</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentList.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">
                        {patient.fullName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                          {patient.fullName}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {patient.matricule} • {patient.age} ans ({patient.gender === 'Homme' ? 'H' : 'F'})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={patient.status}>{patient.status}</Badge>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <span className="font-semibold text-slate-800">{patient.department}</span>
                      <span className="text-[11px] text-slate-500 block">
                        {patient.roomNumber ? `${patient.roomNumber} - ${patient.bedNumber || 'Lit standard'}` : 'Non hospitalisé'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-slate-700 font-medium">
                      {patient.doctorAssignedName || 'Non assigné'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatient(patient);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Drawer Details */}
      {selectedPatient && (
        <PatientDetailDrawer
          patient={selectedPatient}
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </>
  );
};
