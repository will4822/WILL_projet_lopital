export type Gender = 'Homme' | 'Femme' | 'Autre';

export type PatientStatus = 'Hospitalisé' | 'Ambulatoire' | 'Soins intensifs' | 'Sorti' | 'Urgence';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Department = 
  | 'Cardiologie'
  | 'Neurologie'
  | 'Pédiatrie'
  | 'Chirurgie Générale'
  | 'Orthopédie'
  | 'Urgences'
  | 'Médecine Interne'
  | 'Radiologie'
  | 'Gynécologie-Obstétrique'
  | 'Oncologie';

export interface VitalSigns {
  bloodPressure: string; // e.g. "120/80"
  heartRate: number;     // bpm
  temperature: number;   // °C
  oxygenLevel: number;   // %
  lastUpdated: string;
}

export interface Patient {
  id: string;
  matricule: string;
  fullName: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  bloodGroup: BloodGroup;
  status: PatientStatus;
  department: Department;
  roomNumber?: string;
  bedNumber?: string;
  doctorAssignedId?: string;
  doctorAssignedName?: string;
  admissionDate: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  allergies?: string[];
  medicalHistory?: string;
  notes?: string;
  vitalSigns?: VitalSigns;
  avatarUrl?: string;
}

export type DoctorStatus = 'Disponible' | 'En consultation' | 'Au bloc' | 'En congé';

export interface Doctor {
  id: string;
  matricule: string;
  fullName: string;
  title: string; // e.g. "Dr. Spécialiste"
  specialty: Department;
  phone: string;
  email: string;
  roomNumber: string;
  status: DoctorStatus;
  shiftHours: string; // e.g. "08h00 - 16h00"
  experienceYears: number;
  patientsCount: number;
  rating: number; // e.g. 4.9
  avatarUrl?: string;
}

export type AppointmentStatus = 'Confirmé' | 'En attente' | 'Terminé' | 'Annulé';
export type AppointmentType = 'Consultation générale' | 'Suivi médical' | 'Urgence' | 'Chirurgie' | 'Examen / Bilan';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  department: Department;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
}

export type RoomType = 'Soins Intensifs (ICU)' | 'Chambre Particulière' | 'Chambre Double' | 'Urgences / Triage' | 'Maternité';
export type BedStatus = 'Libre' | 'Occupé' | 'En nettoyage' | 'Maintenance';

export interface Bed {
  id: string;
  bedNumber: string;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  department: Department;
  beds: Bed[];
}

export interface HospitalStats {
  totalPatients: number;
  activeInpatients: number;
  todayAppointments: number;
  pendingAppointments: number;
  availableDoctors: number;
  totalDoctors: number;
  totalBeds: number;
  occupiedBeds: number;
  freeBeds: number;
  occupancyRate: number;
  emergencyCount: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE';
  category: 'PATIENT' | 'APPOINTMENT' | 'DOCTOR' | 'ROOM';
  description: string;
  actor: string;
}
