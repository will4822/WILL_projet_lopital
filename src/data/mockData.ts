import { Patient, Doctor, Appointment, Room, ActivityLog } from '../types/hospital';

export const initialDoctors: Doctor[] = [
  {
    id: 'DOC-101',
    matricule: 'MED-4421',
    fullName: 'Dr. Sarah Benali',
    title: 'Chef de Service Cardiologie',
    specialty: 'Cardiologie',
    phone: '+33 6 12 34 56 78',
    email: 'sarah.benali@hopital-medipulse.fr',
    roomNumber: 'Bât A - 302',
    status: 'Disponible',
    shiftHours: '08:00 - 17:00',
    experienceYears: 14,
    patientsCount: 28,
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'DOC-102',
    matricule: 'MED-3890',
    fullName: 'Dr. Alexandre Mercier',
    title: 'Neurochirurgien Senior',
    specialty: 'Neurologie',
    phone: '+33 6 23 45 67 89',
    email: 'alexandre.mercier@hopital-medipulse.fr',
    roomNumber: 'Bât B - 410',
    status: 'Au bloc',
    shiftHours: '07:30 - 16:30',
    experienceYears: 18,
    patientsCount: 19,
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'DOC-103',
    matricule: 'MED-5122',
    fullName: 'Dr. Élodie Fontaine',
    title: 'Pédiatre Spécialiste',
    specialty: 'Pédiatrie',
    phone: '+33 6 34 56 78 90',
    email: 'elodie.fontaine@hopital-medipulse.fr',
    roomNumber: 'Bât C - 105',
    status: 'En consultation',
    shiftHours: '09:00 - 18:00',
    experienceYears: 9,
    patientsCount: 34,
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-f316f060773d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'DOC-104',
    matricule: 'MED-2719',
    fullName: 'Dr. Marc Dubois',
    title: 'Chirurgien Orthopédique',
    specialty: 'Orthopédie',
    phone: '+33 6 45 67 89 01',
    email: 'marc.dubois@hopital-medipulse.fr',
    roomNumber: 'Bât A - 215',
    status: 'Disponible',
    shiftHours: '08:00 - 16:00',
    experienceYears: 12,
    patientsCount: 22,
    rating: 4.7,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'DOC-105',
    matricule: 'MED-6043',
    fullName: 'Dr. Leila Zeroual',
    title: 'Urgentiste Référente',
    specialty: 'Urgences',
    phone: '+33 6 56 78 90 12',
    email: 'leila.zeroual@hopital-medipulse.fr',
    roomNumber: 'Urgences - Box 1',
    status: 'Disponible',
    shiftHours: '07:00 - 19:00',
    experienceYears: 11,
    patientsCount: 42,
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'DOC-106',
    matricule: 'MED-1934',
    fullName: 'Dr. Thomas Laurent',
    title: 'Spécialiste Médecine Interne',
    specialty: 'Médecine Interne',
    phone: '+33 6 67 89 01 23',
    email: 'thomas.laurent@hopital-medipulse.fr',
    roomNumber: 'Bât B - 208',
    status: 'En congé',
    shiftHours: '08:30 - 17:30',
    experienceYears: 15,
    patientsCount: 16,
    rating: 4.6,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=256'
  }
];

export const initialPatients: Patient[] = [
  {
    id: 'PAT-001',
    matricule: 'PAT-8812',
    fullName: 'Claire Dupont',
    age: 42,
    gender: 'Femme',
    phone: '+33 6 78 90 12 34',
    email: 'claire.dupont@email.com',
    bloodGroup: 'A+',
    status: 'Hospitalisé',
    department: 'Cardiologie',
    roomNumber: 'Ch. 302',
    bedNumber: 'Lit A',
    doctorAssignedId: 'DOC-101',
    doctorAssignedName: 'Dr. Sarah Benali',
    admissionDate: '2026-09-18',
    emergencyContact: {
      name: 'Julien Dupont',
      phone: '+33 6 78 90 12 35',
      relationship: 'Époux'
    },
    allergies: ['Pénicilline', 'Aspirine'],
    medicalHistory: 'Hypertension artérielle sous traitement depuis 2021. Arythmie sinusale détectée en 2024.',
    notes: 'Surveillance tensionnelle bi-quotidienne. Régime hyposodé.',
    vitalSigns: {
      bloodPressure: '128/84',
      heartRate: 74,
      temperature: 36.8,
      oxygenLevel: 98,
      lastUpdated: '2026-09-21 08:30'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'PAT-002',
    matricule: 'PAT-7741',
    fullName: 'Mohamed Kassimi',
    age: 58,
    gender: 'Homme',
    phone: '+33 6 89 01 23 45',
    email: 'm.kassimi@email.com',
    bloodGroup: 'O+',
    status: 'Soins intensifs',
    department: 'Chirurgie Générale',
    roomNumber: 'SI-04',
    bedNumber: 'Lit 1',
    doctorAssignedId: 'DOC-104',
    doctorAssignedName: 'Dr. Marc Dubois',
    admissionDate: '2026-09-20',
    emergencyContact: {
      name: 'Fatima Kassimi',
      phone: '+33 6 89 01 23 46',
      relationship: 'Fille'
    },
    allergies: ['Latex'],
    medicalHistory: 'Post-opératoire immédiat suite à chirurgie abdominale laparoscopique.',
    notes: 'Drainage actif. Perfusion antalgique continue. Glycémie à surveiller.',
    vitalSigns: {
      bloodPressure: '115/70',
      heartRate: 88,
      temperature: 37.4,
      oxygenLevel: 96,
      lastUpdated: '2026-09-21 09:15'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'PAT-003',
    matricule: 'PAT-6623',
    fullName: 'Léa Bernard',
    age: 7,
    gender: 'Femme',
    phone: '+33 6 90 12 34 56',
    email: 'parents.bernard@email.com',
    bloodGroup: 'B+',
    status: 'Hospitalisé',
    department: 'Pédiatrie',
    roomNumber: 'Ch. 104',
    bedNumber: 'Lit B',
    doctorAssignedId: 'DOC-103',
    doctorAssignedName: 'Dr. Élodie Fontaine',
    admissionDate: '2026-09-19',
    emergencyContact: {
      name: 'Sophie Bernard',
      phone: '+33 6 90 12 34 56',
      relationship: 'Mère'
    },
    allergies: ['Arachides'],
    medicalHistory: 'Crise d\'asthme sévère déclenchée par épisode viral.',
    notes: 'Aérosols bronchodilatateurs 3x/jour. Évolution favorable.',
    vitalSigns: {
      bloodPressure: '100/65',
      heartRate: 95,
      temperature: 37.1,
      oxygenLevel: 99,
      lastUpdated: '2026-09-21 07:45'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'PAT-004',
    matricule: 'PAT-5534',
    fullName: 'Jean-Pierre Moreau',
    age: 67,
    gender: 'Homme',
    phone: '+33 6 01 23 45 67',
    email: 'jp.moreau@email.com',
    bloodGroup: 'AB-',
    status: 'Ambulatoire',
    department: 'Neurologie',
    doctorAssignedId: 'DOC-102',
    doctorAssignedName: 'Dr. Alexandre Mercier',
    admissionDate: '2026-09-21',
    emergencyContact: {
      name: 'Hélène Moreau',
      phone: '+33 6 01 23 45 68',
      relationship: 'Épouse'
    },
    allergies: ['Iode'],
    medicalHistory: 'Bilan de céphalées récidivantes et vertiges. IRM cérébrale programmée.',
    notes: 'Consultation externe. En attente des résultats d\'imagerie.',
    vitalSigns: {
      bloodPressure: '135/88',
      heartRate: 68,
      temperature: 36.6,
      oxygenLevel: 98,
      lastUpdated: '2026-09-21 10:00'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'PAT-005',
    matricule: 'PAT-4418',
    fullName: 'Camille Roche',
    age: 29,
    gender: 'Femme',
    phone: '+33 6 12 98 76 54',
    email: 'camille.roche@email.com',
    bloodGroup: 'O-',
    status: 'Urgence',
    department: 'Urgences',
    roomNumber: 'Box Urg. 3',
    bedNumber: 'Lit 3',
    doctorAssignedId: 'DOC-105',
    doctorAssignedName: 'Dr. Leila Zeroual',
    admissionDate: '2026-09-21',
    emergencyContact: {
      name: 'Damien Roche',
      phone: '+33 6 12 98 76 55',
      relationship: 'Frère'
    },
    allergies: [],
    medicalHistory: 'Traumatisme de la cheville droite suite à un accident sportif.',
    notes: 'Radiographie effectuée : entorse stade 2 sans fracture déplacée. Attelle posée.',
    vitalSigns: {
      bloodPressure: '122/78',
      heartRate: 82,
      temperature: 36.9,
      oxygenLevel: 100,
      lastUpdated: '2026-09-21 10:45'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'PAT-006',
    matricule: 'PAT-3387',
    fullName: 'Antoine Girard',
    age: 51,
    gender: 'Homme',
    phone: '+33 6 23 87 65 43',
    email: 'antoine.girard@email.com',
    bloodGroup: 'A-',
    status: 'Sorti',
    department: 'Orthopédie',
    doctorAssignedId: 'DOC-104',
    doctorAssignedName: 'Dr. Marc Dubois',
    admissionDate: '2026-09-15',
    emergencyContact: {
      name: 'Nathalie Girard',
      phone: '+33 6 23 87 65 44',
      relationship: 'Épouse'
    },
    allergies: ['Sulfamides'],
    medicalHistory: 'Méniscectomie sous arthroscopie. Rééducation démarrée.',
    notes: 'Sortie validée avec ordonnance d\'antalgiques et séances de kinésithérapie.',
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: 70,
      temperature: 36.7,
      oxygenLevel: 99,
      lastUpdated: '2026-09-20 16:00'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'APT-101',
    patientId: 'PAT-001',
    patientName: 'Claire Dupont',
    patientPhone: '+33 6 78 90 12 34',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Sarah Benali',
    department: 'Cardiologie',
    date: '2026-09-21',
    time: '11:00',
    durationMinutes: 30,
    type: 'Suivi médical',
    status: 'Confirmé',
    reason: 'Échocardiographie de contrôle et ajustement posologique bêta-bloquants'
  },
  {
    id: 'APT-102',
    patientId: 'PAT-004',
    patientName: 'Jean-Pierre Moreau',
    patientPhone: '+33 6 01 23 45 67',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Alexandre Mercier',
    department: 'Neurologie',
    date: '2026-09-21',
    time: '14:30',
    durationMinutes: 45,
    type: 'Consultation générale',
    status: 'En attente',
    reason: 'Consultation post-IRM et évaluation neurologique complète'
  },
  {
    id: 'APT-103',
    patientId: 'PAT-003',
    patientName: 'Léa Bernard',
    patientPhone: '+33 6 90 12 34 56',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Élodie Fontaine',
    department: 'Pédiatrie',
    date: '2026-09-21',
    time: '15:15',
    durationMinutes: 30,
    type: 'Suivi médical',
    status: 'Confirmé',
    reason: 'Contrôle auscultation pulmonaire avant autorisation de sortie'
  },
  {
    id: 'APT-104',
    patientId: 'PAT-005',
    patientName: 'Camille Roche',
    patientPhone: '+33 6 12 98 76 54',
    doctorId: 'DOC-105',
    doctorName: 'Dr. Leila Zeroual',
    department: 'Urgences',
    date: '2026-09-21',
    time: '09:30',
    durationMinutes: 30,
    type: 'Urgence',
    status: 'Terminé',
    reason: 'Prise en charge traumatologique aiguë cheville droite'
  },
  {
    id: 'APT-105',
    patientId: 'PAT-002',
    patientName: 'Mohamed Kassimi',
    patientPhone: '+33 6 89 01 23 45',
    doctorId: 'DOC-104',
    doctorName: 'Dr. Marc Dubois',
    department: 'Chirurgie Générale',
    date: '2026-09-22',
    time: '08:45',
    durationMinutes: 40,
    type: 'Suivi médical',
    status: 'Confirmé',
    reason: 'Visite de contrôle post-opératoire aux soins intensifs'
  },
  {
    id: 'APT-106',
    patientId: 'PAT-006',
    patientName: 'Antoine Girard',
    patientPhone: '+33 6 23 87 65 43',
    doctorId: 'DOC-104',
    doctorName: 'Dr. Marc Dubois',
    department: 'Orthopédie',
    date: '2026-09-25',
    time: '10:00',
    durationMinutes: 30,
    type: 'Consultation générale',
    status: 'Confirmé',
    reason: 'Vérification cicatrisation et amplitude articulaire genou droit'
  }
];

export const initialRooms: Room[] = [
  {
    id: 'ROOM-1',
    roomNumber: 'SI-01 à SI-04',
    floor: 1,
    type: 'Soins Intensifs (ICU)',
    department: 'Chirurgie Générale',
    beds: [
      { id: 'BED-101', bedNumber: 'Lit 1', status: 'Occupé', patientId: 'PAT-002', patientName: 'Mohamed Kassimi' },
      { id: 'BED-102', bedNumber: 'Lit 2', status: 'Libre' },
      { id: 'BED-103', bedNumber: 'Lit 3', status: 'En nettoyage' },
      { id: 'BED-104', bedNumber: 'Lit 4', status: 'Libre' }
    ]
  },
  {
    id: 'ROOM-2',
    roomNumber: 'Chambre 302',
    floor: 3,
    type: 'Chambre Double',
    department: 'Cardiologie',
    beds: [
      { id: 'BED-201', bedNumber: 'Lit A', status: 'Occupé', patientId: 'PAT-001', patientName: 'Claire Dupont' },
      { id: 'BED-202', bedNumber: 'Lit B', status: 'Libre' }
    ]
  },
  {
    id: 'ROOM-3',
    roomNumber: 'Chambre 104',
    floor: 1,
    type: 'Chambre Particulière',
    department: 'Pédiatrie',
    beds: [
      { id: 'BED-301', bedNumber: 'Lit A', status: 'Occupé', patientId: 'PAT-003', patientName: 'Léa Bernard' }
    ]
  },
  {
    id: 'ROOM-4',
    roomNumber: 'Box Urgences',
    floor: 0,
    type: 'Urgences / Triage',
    department: 'Urgences',
    beds: [
      { id: 'BED-401', bedNumber: 'Lit 1', status: 'Libre' },
      { id: 'BED-402', bedNumber: 'Lit 2', status: 'Libre' },
      { id: 'BED-403', bedNumber: 'Lit 3', status: 'Occupé', patientId: 'PAT-005', patientName: 'Camille Roche' },
      { id: 'BED-404', bedNumber: 'Lit 4', status: 'Maintenance' }
    ]
  }
];

export const admissionsTrendData = [
  { date: '15 Sep', admissions: 14, sorties: 12, urgences: 8 },
  { date: '16 Sep', admissions: 18, sorties: 15, urgences: 11 },
  { date: '17 Sep', admissions: 22, sorties: 19, urgences: 14 },
  { date: '18 Sep', admissions: 25, sorties: 20, urgences: 16 },
  { date: '19 Sep', admissions: 20, sorties: 24, urgences: 12 },
  { date: '20 Sep', admissions: 28, sorties: 22, urgences: 18 },
  { date: '21 Sep', admissions: 31, sorties: 25, urgences: 21 },
];

export const departmentStatsData = [
  { name: 'Cardiologie', patients: 28, fill: '#3b82f6' },
  { name: 'Pédiatrie', patients: 34, fill: '#06b6d4' },
  { name: 'Urgences', patients: 42, fill: '#ef4444' },
  { name: 'Chirurgie', patients: 22, fill: '#8b5cf6' },
  { name: 'Neurologie', patients: 19, fill: '#10b981' },
  { name: 'Médecine Interne', patients: 16, fill: '#f59e0b' }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-09-21 10:45',
    action: 'CREATE',
    category: 'PATIENT',
    description: 'Admission en urgence de Camille Roche (Box Urg. 3)',
    actor: 'Dr. Leila Zeroual'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-09-21 10:00',
    action: 'UPDATE',
    category: 'APPOINTMENT',
    description: 'Rendez-vous confirmé pour Claire Dupont (Cardiologie)',
    actor: 'Secrétariat Médical'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-09-20 16:00',
    action: 'STATUS_CHANGE',
    category: 'PATIENT',
    description: 'Sortie d\'hospitalisation validée pour Antoine Girard',
    actor: 'Dr. Marc Dubois'
  }
];
