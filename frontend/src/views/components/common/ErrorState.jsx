import React from 'react';

export default function ErrorState({ 
  title = 'Đã xảy ra lỗi', 
  description = 'Không thể tải dữ liệu. Vui lòng thử lại sau.', 
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-error-container flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-error">error</span>
      </div>
      <h3 className="text-lg font-semibold text-on-surface mb-2 font-notoSerif">{title}</h3>
      <p className="text-on-surface-variant text-sm text-center max-w-md mb-6">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="flex items-center gap-2 px-6 py-2.5 bg-error text-on-error rounded-xl font-medium hover:bg-red-800 transition-colors text-sm">
          <span className="material-symbols-outlined text-lg">refresh</span>
          Thử lại
        </button>
      )}
    </div>
  );
}
