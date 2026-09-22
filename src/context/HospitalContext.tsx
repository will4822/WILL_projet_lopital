'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  Patient, 
  Doctor, 
  Appointment, 
  Room, 
  HospitalStats, 
  ActivityLog,
  BedStatus
} from '../types/hospital';
import { 
  initialPatients, 
  initialDoctors, 
  initialAppointments, 
  initialRooms,
  initialActivityLogs 
} from '../data/mockData';
import { generateId } from '../lib/utils';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface HospitalContextType {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  rooms: Room[];
  activityLogs: ActivityLog[];
  stats: HospitalStats;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Patient CRUD
  addPatient: (patient: Omit<Patient, 'id' | 'matricule'>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  getPatientById: (id: string) => Patient | undefined;
  
  // Doctor CRUD
  addDoctor: (doctor: Omit<Doctor, 'id' | 'matricule'>) => Doctor;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  getDoctorById: (id: string) => Doctor | undefined;
  
  // Appointment CRUD
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  // Room Management
  updateBedStatus: (roomId: string, bedId: string, status: BedStatus, patientId?: string, patientName?: string) => void;
  
  // Reset
  resetToDefaultData: () => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PATIENTS: 'medipulse_patients_v1',
  DOCTORS: 'medipulse_doctors_v1',
  APPOINTMENTS: 'medipulse_appointments_v1',
  ROOMS: 'medipulse_rooms_v1',
  LOGS: 'medipulse_logs_v1',
};

export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      const storedPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      const storedDoctors = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      const storedAppointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      const storedRooms = localStorage.getItem(STORAGE_KEYS.ROOMS);
      const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);

      if (storedPatients) setPatients(JSON.parse(storedPatients));
      if (storedDoctors) setDoctors(JSON.parse(storedDoctors));
      if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
      if (storedRooms) setRooms(JSON.parse(storedRooms));
      if (storedLogs) setActivityLogs(JSON.parse(storedLogs));
    } catch (e) {
      console.error('Erreur chargement localStorage:', e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
    } catch (e) {
      console.error('Erreur sauvegarde localStorage:', e);
    }
  }, [patients, doctors, appointments, rooms, activityLogs, isClient]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = generateId('TOAST');
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (
    action: ActivityLog['action'],
    category: ActivityLog['category'],
    description: string,
    actor: string = 'Administrateur'
  ) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);
    const newLog: ActivityLog = {
      id: generateId('LOG'),
      timestamp,
      action,
      category,
      description,
      actor,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Patients
  const addPatient = (patientData: Omit<Patient, 'id' | 'matricule'>): Patient => {
    const newId = generateId('PAT');
    const matricule = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      ...patientData,
      id: newId,
      matricule,
      admissionDate: patientData.admissionDate || new Date().toISOString().split('T')[0],
    };
    setPatients((prev) => [newPatient, ...prev]);
    logActivity('CREATE', 'PATIENT', `Nouveau dossier patient créé : ${newPatient.fullName} (${newPatient.department})`);
    showToast({
      type: 'success',
      title: 'Patient ajouté',
      message: `${newPatient.fullName} a été enregistré avec succès.`,
    });
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          logActivity('UPDATE', 'PATIENT', `Mise à jour du dossier de ${updated.fullName}`);
          showToast({
            type: 'info',
            title: 'Patient mis à jour',
            message: `Les modifications pour ${updated.fullName} ont été enregistrées.`,
          });
          return updated;
        }
        return p;
      })
    );
  };

  const deletePatient = (id: string) => {
    const patientToDelete = patients.find((p) => p.id === id);
    setPatients((prev) => prev.filter((p) => p.id !== id));
    if (patientToDelete) {
      logActivity('DELETE', 'PATIENT', `Suppression du dossier patient : ${patientToDelete.fullName}`);
      showToast({
        type: 'warning',
        title: 'Patient supprimé',
        message: `Le dossier de ${patientToDelete.fullName} a été retiré.`,
      });
    }
  };

  const getPatientById = (id: string) => patients.find((p) => p.id === id);

  // Doctors
  const addDoctor = (doctorData: Omit<Doctor, 'id' | 'matricule'>): Doctor => {
    const newId = generateId('DOC');
    const matricule = `MED-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDoctor: Doctor = {
      ...doctorData,
      id: newId,
      matricule,
      patientsCount: doctorData.patientsCount || 0,
      rating: doctorData.rating || 4.8,
    };
    setDoctors((prev) => [newDoctor, ...prev]);
    logActivity('CREATE', 'DOCTOR', `Nouveau médecin ajouté : ${newDoctor.fullName} (${newDoctor.specialty})`);
    showToast({
      type: 'success',
      title: 'Médecin enregistré',
      message: `${newDoctor.fullName} est maintenant ajouté à l'annuaire médical.`,
    });
    return newDoctor;
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const updated = { ...d, ...updates };
          logActivity('UPDATE', 'DOCTOR', `Mise à jour statut/profil de ${updated.fullName}`);
          showToast({
            type: 'info',
            title: 'Médecin mis à jour',
            message: `Profil de ${updated.fullName} actualisé.`,
          });
          return updated;
        }
        return d;
      })
    );
  };

  const deleteDoctor = (id: string) => {
    const docToDelete = doctors.find((d) => d.id === id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    if (docToDelete) {
      logActivity('DELETE', 'DOCTOR', `Retrait du praticien : ${docToDelete.fullName}`);
      showToast({
        type: 'warning',
        title: 'Médecin supprimé',
        message: `${docToDelete.fullName} a été retiré de l'équipe.`,
      });
    }
  };

  const getDoctorById = (id: string) => doctors.find((d) => d.id === id);

  // Appointments
  const addAppointment = (appointmentData: Omit<Appointment, 'id'>): Appointment => {
    const newId = generateId('APT');
    const newAppointment: Appointment = {
      ...appointmentData,
      id: newId,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    logActivity(
      'CREATE', 
      'APPOINTMENT', 
      `Rendez-vous planifié : ${newAppointment.patientName} avec ${newAppointment.doctorName} le ${newAppointment.date} à ${newAppointment.time}`
    );
    showToast({
      type: 'success',
      title: 'Rendez-vous planifié',
      message: `Rendez-vous confirmé pour ${newAppointment.patientName}.`,
    });
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, ...updates };
          logActivity('STATUS_CHANGE', 'APPOINTMENT', `Statut rendez-vous de ${updated.patientName} : ${updated.status}`);
          showToast({
            type: 'info',
            title: 'Rendez-vous actualisé',
            message: `Statut mis à jour : ${updated.status}`,
          });
          return updated;
        }
        return a;
      })
    );
  };

  const deleteAppointment = (id: string) => {
    const appt = appointments.find((a) => a.id === id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    if (appt) {
      logActivity('DELETE', 'APPOINTMENT', `Annulation/Suppression du rendez-vous de ${appt.patientName}`);
      showToast({
        type: 'warning',
        title: 'Rendez-vous supprimé',
        message: `Le rendez-vous a été retiré.`,
      });
    }
  };

  // Rooms
  const updateBedStatus = (
    roomId: string,
    bedId: string,
    status: BedStatus,
    patientId?: string,
    patientName?: string
  ) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          beds: room.beds.map((bed) => {
            if (bed.id !== bedId) return bed;
            return {
              ...bed,
              status,
              patientId: status === 'Libre' ? undefined : (patientId ?? bed.patientId),
              patientName: status === 'Libre' ? undefined : (patientName ?? bed.patientName),
            };
          }),
        };
      })
    );
    logActivity('STATUS_CHANGE', 'ROOM', `Statut du lit mis à jour vers: ${status}`);
    showToast({
      type: 'info',
      title: 'Lit actualisé',
      message: `Statut du lit changé en : ${status}`,
    });
  };

  const resetToDefaultData = () => {
    setPatients(initialPatients);
    setDoctors(initialDoctors);
    setAppointments(initialAppointments);
    setRooms(initialRooms);
    setActivityLogs(initialActivityLogs);
    try {
      localStorage.removeItem(STORAGE_KEYS.PATIENTS);
      localStorage.removeItem(STORAGE_KEYS.DOCTORS);
      localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
      localStorage.removeItem(STORAGE_KEYS.ROOMS);
      localStorage.removeItem(STORAGE_KEYS.LOGS);
    } catch (e) {
      console.error(e);
    }
    showToast({
      type: 'info',
      title: 'Données réinitialisées',
      message: 'Les données de démonstration ont été restaurées.',
    });
  };

  // Compute live statistics
  const stats: HospitalStats = useMemo(() => {
    const totalPatients = patients.length;
    const activeInpatients = patients.filter((p) => p.status === 'Hospitalisé' || p.status === 'Soins intensifs').length;
    const todayStr = new Date().toISOString().split('T')[0];
    
    // We treat appointments with today's date (or 2026-09-21) as today's
    const todayAppointments = appointments.filter((a) => a.date === todayStr || a.date === '2026-09-21').length;
    const pendingAppointments = appointments.filter((a) => a.status === 'En attente').length;
    
    const availableDoctors = doctors.filter((d) => d.status === 'Disponible').length;
    const totalDoctors = doctors.length;

    let totalBeds = 0;
    let occupiedBeds = 0;
    rooms.forEach((r) => {
      r.beds.forEach((b) => {
        totalBeds++;
        if (b.status === 'Occupé') occupiedBeds++;
      });
    });

    const freeBeds = totalBeds - occupiedBeds;
    const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
    const emergencyCount = patients.filter((p) => p.status === 'Urgence').length;

    return {
      totalPatients,
      activeInpatients,
      todayAppointments,
      pendingAppointments,
      availableDoctors,
      totalDoctors,
      totalBeds,
      occupiedBeds,
      freeBeds,
      occupancyRate,
      emergencyCount,
    };
  }, [patients, doctors, appointments, rooms]);

  return (
    <HospitalContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        rooms,
        activityLogs,
        stats,
        toasts,
        showToast,
        removeToast,
        addPatient,
        updatePatient,
        deletePatient,
        getPatientById,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        getDoctorById,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        updateBedStatus,
        resetToDefaultData,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
