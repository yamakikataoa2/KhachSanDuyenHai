import React from 'react';
import { Link } from 'react-router-dom';
import { mockInvoices, formatVND, formatDate } from '../../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';

export default function InvoicesPage() {
  const userInvoices = mockInvoices.filter(i => i.KhachHang === 'Nguyễn Văn An' || true).slice(0, 5);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-2">Hóa đơn của tôi</h1>
      <p className="text-on-surface-variant mb-8">Xem và quản lý hóa đơn thanh toán</p>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-high/50">
                {['Mã hóa đơn', 'Ngày lập', 'Tổng tiền', 'Trạng thái', 'Phương thức', ''].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userInvoices.map((inv, i) => (
                <tr key={inv.MaHoaDon} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                  <td className="px-5 py-4 text-sm font-mono font-semibold text-primary">{inv.MaHoaDon}</td>
                  <td className="px-5 py-4 text-sm text-on-surface-variant">{formatDate(inv.NgayLap)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-on-surface">{formatVND(inv.TongThanhToan)}</td>
                  <td className="px-5 py-4"><StatusBadge status={inv.TrangThaiThanhToan} /></td>
                  <td className="px-5 py-4 text-sm text-on-surface-variant">{inv.PhuongThucThanhToan}</td>
                  <td className="px-5 py-4">
                    <Link to={`/invoices/${inv.MaHoaDon}`} className="text-primary text-sm font-semibold hover:underline">Chi tiết</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
