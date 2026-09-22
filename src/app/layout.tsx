import type { Metadata } from 'next';
import './globals.css';
import { HospitalProvider } from '@/context/HospitalContext';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'MediPulse HMS - Système de Gestion Hospitalière',
  description: 'Application moderne de gestion hospitalière : patients, rendez-vous, médecins, lits et statistiques en temps réel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full antialiased bg-slate-50 text-slate-900">
        <HospitalProvider>
          <AppLayout>{children}</AppLayout>
        </HospitalProvider>
      </body>
    </html>
  );
}
