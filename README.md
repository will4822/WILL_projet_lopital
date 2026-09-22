# 🏥 MediPulse HMS — Hospital Management System

Une application web moderne, responsive et complète de gestion hospitalière développée avec **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons** et **Recharts**, prête pour un déploiement instantané sur **Vercel**.

---

## ✨ Fonctionnalités Clés

### 1. 📊 Tableau de Bord (Dashboard)
- **Cartes KPI dynamiques** : Total des patients, Rendez-vous du jour, Médecins disponibles et Taux d'occupation des lits.
- **Graphiques interactifs (Recharts)** : Flux d'admissions / sorties / urgences sur 7 jours et répartition des patients par pôle de spécialité.
- **Widgets opérationnels** : Rendez-vous du jour avec actions rapides et dernières admissions avec accès direct au dossier patient.
- **Bannière d'alerte Triage / Urgences** en cas d'admissions critiques.

### 2. 🗂️ Gestion des Patients
- **Tableau complet** : Recherche en temps réel (nom, matricule, téléphone), filtres par statut (Hospitalisé, Ambulatoire, Soins Intensifs, Urgence, Sorti) et par service médical.
- **Tri dynamique** (nom, âge, date d'admission) et **pagination**.
- **Formulaire Modal complet** : Ajout & Modification de patient (coordonnées, groupe sanguin, chambre, médecin assigné, contact d'urgence, allergies, antécédents).
- **Dossier Clinique Latéral (Drawer)** : Visualisation détaillée des constantes vitales (Pouls, Tension, Température, SpO2), historique médical et validation de sortie.
- **Export CSV** en un clic.

### 3. 📅 Gestion des Rendez-vous (Appointments)
- **Bascule de vue** : Vue Cartes/Liste et Vue Planning Chronologique (Timeline du jour).
- **Filtres avancés** : Par statut (Confirmé, En attente, Terminé, Annulé), par praticien et par date.
- **Planification interactive** : Choix du médecin avec indicateur de disponibilité, créneau horaire, durée, type de consultation et motif.
- **Actions rapides** : Modification de statut en 1 clic (Terminé, Confirmé, Annulé).

### 4. 👨‍⚕️ Corps Médical & Praticiens
- **Annuaire des médecins** avec cartes détaillées : Spécialité, horaires de garde, numéro de bureau, note d'évaluation, nombre de patients suivis.
- **Changement de statut en temps réel** (Disponible, En consultation, Au bloc, En congé).
- **Filtres par spécialité** (Cardiologie, Neurologie, Pédiatrie, Chirurgie, Urgences, etc.).
- **Ajout & Édition de praticiens**.

### 5. 🛏️ Chambres & Gestion des Lits (Rooms & Wards)
- Suivi en direct de la capacité hospitalière et du taux d'occupation.
- Gestion lit par lit (Libre, Occupé, En nettoyage, Maintenance) avec indication du patient admis.

### 6. 💾 Persistance des données & Notifications
- Synchronisation automatique avec le **LocalStorage** : toutes vos créations, modifications et suppressions sont conservées entre les rechargements.
- Système de **Notifications Toasts** pour chaque action.
- Bouton de **réinitialisation des données de démo** dans la barre latérale et le menu mobile.

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement en développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 3. Build de production
```bash
npm run build
npm run start
```

---

## ☁️ Déploiement sur Vercel

1. Poussez le projet sur GitHub / GitLab / Bitbucket.
2. Rendez-vous sur [Vercel](https://vercel.com) et cliquez sur **Add New Project**.
3. Sélectionnez votre dépôt : le framework Next.js est automatiquement détecté.
4. Cliquez sur **Deploy**. Votre application est en ligne en moins d'une minute !

---

## 🛠️ Stack Technique

- **Framework** : Next.js 16 / React 19 (App Router)
- **Langage** : TypeScript
- **Style** : Tailwind CSS v4
- **Icônes** : Lucide-React
- **Graphiques** : Recharts
- **État & Données** : React Context API + LocalStorage
