import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon = 'inbox', 
  title = 'Chưa có dữ liệu', 
  description = 'Không tìm thấy nội dung nào phù hợp.', 
  actionLabel, 
  actionTo,
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-on-surface mb-2 font-notoSerif">{title}</h3>
      <p className="text-on-surface-variant text-sm text-center max-w-md mb-6">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button onClick={onAction} className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-medium hover:bg-amber-900 transition-colors text-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
