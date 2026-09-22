'use client';

import React, { useState } from 'react';
import { 
  BedDouble, 
  Bed, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Wrench, 
  User, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { useHospital } from '@/context/HospitalContext';
import { Room, BedStatus, Bed as BedType } from '@/types/hospital';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const BED_STATUSES: BedStatus[] = ['Libre', 'Occupé', 'En nettoyage', 'Maintenance'];

export const RoomGrid: React.FC = () => {
  const { rooms, updateBedStatus, stats, patients } = useHospital();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterBedStatus, setFilterBedStatus] = useState<string>('ALL');

  const filteredRooms = rooms.filter((room) => {
    const matchesType = filterType === 'ALL' || room.type === filterType;
    const matchesBedStatus =
      filterBedStatus === 'ALL' ||
      room.beds.some((b) => b.status === filterBedStatus);
    return matchesType && matchesBedStatus;
  });

  const getBedStatusColor = (status: BedStatus) => {
    switch (status) {
      case 'Libre':
        return 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800';
      case 'Occupé':
        return 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-800';
      case 'En nettoyage':
        return 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-800';
      case 'Maintenance':
        return 'border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Capacité Totale</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalBeds} Lits</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-xs">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Lits Disponibles</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.freeBeds} Libres</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-blue-100 bg-blue-50/20 shadow-xs">
          <span className="text-xs font-semibold text-blue-600 uppercase">Lits Occupés</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">{stats.occupiedBeds} Patients</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Taux d&apos;Occupation</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.occupancyRate}%</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Filtrer par :</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden font-medium"
          >
            <option value="ALL">Tous les types de chambres</option>
            <option value="Soins Intensifs (ICU)">Soins Intensifs (ICU)</option>
            <option value="Chambre Particulière">Chambre Particulière</option>
            <option value="Chambre Double">Chambre Double</option>
            <option value="Urgences / Triage">Urgences / Triage</option>
          </select>

          <select
            value={filterBedStatus}
            onChange={(e) => setFilterBedStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 outline-hidden font-medium"
          >
            <option value="ALL">Tous les statuts de lits</option>
            {BED_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Libre</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Occupé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Nettoyage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Room Header */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{room.roomNumber}</h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Étage {room.floor}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{room.department}</p>
                </div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  {room.type}
                </span>
              </div>

              {/* Beds in this room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {room.beds.map((bed) => (
                  <div
                    key={bed.id}
                    className={`p-3.5 rounded-xl border transition-all ${getBedStatusColor(
                      bed.status
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4" />
                        <span className="font-bold text-xs">{bed.bedNumber}</span>
                      </div>
                      <Badge variant={bed.status} dot={false}>
                        {bed.status}
                      </Badge>
                    </div>

                    {bed.patientName ? (
                      <div className="text-xs my-2 p-2 rounded-lg bg-white/80 border border-slate-200/50">
                        <span className="text-[10px] text-slate-400 block font-semibold">Patient Admis :</span>
                        <span className="font-bold text-slate-900">{bed.patientName}</span>
                      </div>
                    ) : (
                      <div className="text-xs my-2 text-slate-500 italic py-1">
                        Aucun patient assigné
                      </div>
                    )}

                    {/* Status Changer */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-medium">Changer statut :</span>
                      <select
                        value={bed.status}
                        onChange={(e) =>
                          updateBedStatus(room.id, bed.id, e.target.value as BedStatus)
                        }
                        className="text-[11px] font-semibold bg-white border border-slate-200 rounded-md px-2 py-1 outline-hidden"
                      >
                        {BED_STATUSES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
