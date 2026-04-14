import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockInvoices, formatVND, formatDate } from '../../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const invoice = mockInvoices.find(i => i.MaHoaDon === id) || mockInvoices[0];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-8 py-12">
      <Link to="/invoices" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Danh sách hóa đơn
      </Link>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-8">
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-surface-container-high">
          <div>
            <p className="text-sm text-on-surface-variant font-mono">{invoice.MaHoaDon}</p>
            <h1 className="text-2xl font-notoSerif font-bold text-on-surface mt-1">Chi tiết hóa đơn</h1>
          </div>
          <StatusBadge status={invoice.TrangThaiThanhToan} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { label: 'Khách hàng', value: invoice.KhachHang },
            { label: 'Email', value: invoice.Email },
            { label: 'Số điện thoại', value: invoice.SoDienThoai },
            { label: 'Phiếu đặt', value: invoice.MaPhieuDat },
            { label: 'Ngày lập', value: formatDate(invoice.NgayLap) },
            { label: 'Phương thức', value: invoice.PhuongThucThanhToan },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">{item.label}</p>
              <p className="text-sm font-medium text-on-surface">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface-container-low rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-on-surface font-semibold">Tổng thanh toán</span>
            <span className="text-3xl font-bold text-primary">{formatVND(invoice.TongThanhToan)}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-amber-900 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">print</span> In hóa đơn
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant rounded-xl font-medium text-sm hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-lg">download</span> Tải PDF
          </button>
        </div>
      </div>
    </div>
  );
}
