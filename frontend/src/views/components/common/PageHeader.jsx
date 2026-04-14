import React from 'react';

export default function PageHeader({ title, description, icon, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-xl text-primary">{icon}</span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-on-surface font-notoSerif">{title}</h1>
          {description && <p className="text-sm text-on-surface-variant mt-1">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  );
}
