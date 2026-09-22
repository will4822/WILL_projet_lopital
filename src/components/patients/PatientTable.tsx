'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Patient, PatientStatus, Department } from '@/types/hospital';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PatientModal } from './PatientModal';
import { PatientDetailDrawer } from './PatientDetailDrawer';

const STATUS_TABS: { label: string; value: 'ALL' | PatientStatus }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Hospitalisé', value: 'Hospitalisé' },
  { label: 'Ambulatoire', value: 'Ambulatoire' },
  { label: 'Soins intensifs', value: 'Soins intensifs' },
  { label: 'Urgences', value: 'Urgence' },
  { label: 'Sorti', value: 'Sorti' },
];

export const PatientTable: React.FC = () => {
  const { patients, deletePatient, showToast } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | PatientStatus>('ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'fullName' | 'admissionDate' | 'age'>('admissionDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals / Drawer state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [selectedPatientForDrawer, setSelectedPatientForDrawer] = useState<Patient | null>(null);

  // Departments list for dropdown
  const departments = useMemo(() => {
    const set = new Set(patients.map((p) => p.department));
    return Array.from(set);
  }, [patients]);

  // Filter & Sort
  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => {
        // Search match
        const matchesSearch =
          p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.phone.includes(searchQuery);

        // Status match
        const matchesStatus = selectedStatus === 'ALL' || p.status === selectedStatus;

        // Department match
        const matchesDept = selectedDept === 'ALL' || p.department === selectedDept;

        return matchesSearch && matchesStatus && matchesDept;
      })
      .sort((a, b) => {
        if (sortField === 'fullName') {
          return sortOrder === 'asc'
            ? a.fullName.localeCompare(b.fullName)
            : b.fullName.localeCompare(a.fullName);
        }
        if (sortField === 'age') {
          return sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
        }
        // admissionDate
        return sortOrder === 'asc'
          ? a.admissionDate.localeCompare(b.admissionDate)
          : b.admissionDate.localeCompare(a.admissionDate);
      });
  }, [patients, searchQuery, selectedStatus, selectedDept, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: 'fullName' | 'admissionDate' | 'age') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Matricule', 'Nom Complet', 'Âge', 'Genre', 'Téléphone', 'Groupe Sanguin', 'Statut', 'Service', 'Chambre', 'Date Admission'];
    const rows = filteredPatients.map((p) => [
      p.matricule,
      `"${p.fullName}"`,
      p.age,
      p.gender,
      p.phone,
      p.bloodGroup,
      p.status,
      `"${p.department}"`,
      p.roomNumber || 'N/A',
      p.admissionDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `patients_medipulse_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      type: 'success',
      title: 'Export réussi',
      message: 'La liste des patients a été exportée au format CSV.',
    });
  };

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher par nom, matricule, téléphone..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden transition-all"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden focus:border-blue-500 font-medium"
          >
            <option value="ALL">Tous les Services</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <Button
            variant="outline"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportCSV}
            title="Exporter en CSV"
          >
            <span className="hidden sm:inline">Exporter</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            <span>Nouveau Patient</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {STATUS_TABS.map((tab) => {
          const isActive = selectedStatus === tab.value;
          const count =
            tab.value === 'ALL'
              ? patients.length
              : patients.filter((p) => p.status === tab.value).length;

          return (
            <button
              key={tab.value}
              onClick={() => {
                setSelectedStatus(tab.value);
                setCurrentPage(1);
              }}
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

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                  onClick={() => toggleSort('fullName')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Patient</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                  onClick={() => toggleSort('age')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Âge / Genre</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Service & Chambre</th>
                <th className="py-3.5 px-4">Médecin Assigné</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                  onClick={() => toggleSort('admissionDate')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Admission</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Aucun dossier patient ne correspond à ces critères.
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    onClick={() => setSelectedPatientForDrawer(patient)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs shrink-0">
                          {patient.fullName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block">
                            {patient.fullName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {patient.matricule} • Grp: {patient.bloodGroup}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{patient.age} ans</span>
                      <span className="text-slate-400 block text-[11px]">{patient.gender}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 font-medium block">{patient.phone || 'N/A'}</span>
                      <span className="text-slate-400 text-[11px] block truncate max-w-[140px]">{patient.email || ''}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={patient.status}>{patient.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">{patient.department}</span>
                      <span className="text-slate-500 text-[11px] block">
                        {patient.roomNumber ? `${patient.roomNumber} (${patient.bedNumber || 'Lit std'})` : 'Ambulatoire'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 font-medium">
                        {patient.doctorAssignedName || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {patient.admissionDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedPatientForDrawer(patient)}
                          title="Consulter le dossier"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPatientToEdit(patient)}
                          title="Modifier"
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Supprimer le dossier de ${patient.fullName} ?`)) {
                              deletePatient(patient.id);
                            }
                          }}
                          title="Supprimer"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Affichage de <strong className="text-slate-800">{filteredPatients.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> à{' '}
            <strong className="text-slate-800">
              {Math.min(currentPage * itemsPerPage, filteredPatients.length)}
            </strong>{' '}
            sur <strong className="text-slate-800">{filteredPatients.length}</strong> patients
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 font-semibold text-slate-700">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals & Drawer */}
      <PatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {patientToEdit && (
        <PatientModal
          isOpen={!!patientToEdit}
          onClose={() => setPatientToEdit(null)}
          patientToEdit={patientToEdit}
        />
      )}

      {selectedPatientForDrawer && (
        <PatientDetailDrawer
          patient={selectedPatientForDrawer}
          isOpen={!!selectedPatientForDrawer}
          onClose={() => setSelectedPatientForDrawer(null)}
        />
      )}
    </div>
  );
};
