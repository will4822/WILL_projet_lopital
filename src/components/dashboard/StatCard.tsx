import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  icon: LucideIcon;
  colorScheme: 'blue' | 'emerald' | 'indigo' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  colorScheme,
  onClick,
}) => {
  const schemeStyles = {
    blue: {
      bgIcon: 'bg-blue-50 text-blue-600 ring-blue-500/10',
      borderHover: 'hover:border-blue-200',
      accentGlow: 'group-hover:bg-blue-50/50',
    },
    emerald: {
      bgIcon: 'bg-emerald-50 text-emerald-600 ring-emerald-500/10',
      borderHover: 'hover:border-emerald-200',
      accentGlow: 'group-hover:bg-emerald-50/50',
    },
    indigo: {
      bgIcon: 'bg-indigo-50 text-indigo-600 ring-indigo-500/10',
      borderHover: 'hover:border-indigo-200',
      accentGlow: 'group-hover:bg-indigo-50/50',
    },
    amber: {
      bgIcon: 'bg-amber-50 text-amber-600 ring-amber-500/10',
      borderHover: 'hover:border-amber-200',
      accentGlow: 'group-hover:bg-amber-50/50',
    },
    rose: {
      bgIcon: 'bg-rose-50 text-rose-600 ring-rose-500/10',
      borderHover: 'hover:border-rose-200',
      accentGlow: 'group-hover:bg-rose-50/50',
    },
    purple: {
      bgIcon: 'bg-purple-50 text-purple-600 ring-purple-500/10',
      borderHover: 'hover:border-purple-200',
      accentGlow: 'group-hover:bg-purple-50/50',
    },
  };

  const current = schemeStyles[colorScheme];

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden',
        current.borderHover
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
          </div>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>

        <div className={cn('p-3 rounded-2xl ring-4 transition-transform duration-200 group-hover:scale-110 shrink-0', current.bgIcon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md text-[11px]',
              trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend.value}
          </span>
          <span className="text-slate-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
