import React from 'react';

export default function StatCard({ icon, label, value, subtitle, trend, trendUp, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-amber-50 text-primary',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    error: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] hover:shadow-[0_8px_32px_rgba(77,70,53,0.1)] transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.primary}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-0.5 ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            <span className="material-symbols-outlined text-sm">{trendUp ? 'trending_up' : 'trending_down'}</span>
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-on-surface-variant font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-on-surface">{value}</p>
      {subtitle && <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>}
    </div>
  );
}
