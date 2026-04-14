import React from 'react';

const statusConfig = {
  'Đã thanh toán': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Chưa thanh toán': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Đang xử lý': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Đã hủy': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  'Đã xác nhận': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Chờ xác nhận': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Đã nhận phòng': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Đã trả phòng': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  'Hoạt động': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Đang làm việc': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Nghỉ phép': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Tạm dừng': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

const defaultConfig = { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || defaultConfig;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
