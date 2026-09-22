'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { departmentStatsData } from '@/data/mockData';
import { Building2 } from 'lucide-react';

export const DepartmentChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-[360px] flex items-center justify-center">
        <div className="text-slate-400 text-sm">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Patients par Service</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Répartition active</span>
        </div>
        <p className="text-xs text-slate-500 mt-2 mb-4">
          Volume de prise en charge clinique par pôle de spécialité
        </p>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentStatsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#1e293b',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val) => [`${val} patients`, 'Prise en charge']}
              />
              <Bar dataKey="patients" radius={[0, 8, 8, 0]}>
                {departmentStatsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-xl bg-slate-50">
          <span className="text-slate-400 block text-[11px]">Pôle le plus sollicité</span>
          <span className="font-bold text-slate-800">Urgences (42 pts)</span>
        </div>
        <div className="p-2 rounded-xl bg-blue-50/50">
          <span className="text-blue-500 block text-[11px]">Spécialité pédiatrique</span>
          <span className="font-bold text-blue-900">34 enfants suivis</span>
        </div>
      </div>
    </div>
  );
};
