import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatVND, formatDate } from '../../../utils/formatters';
import invoiceService from '../../../services/invoiceService';
import StatusBadge from '../../components/common/StatusBadge';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchInvoices = async () => {
      try {
        const res = await invoiceService.getMyInvoices();
        if (isMounted) setInvoices(Array.isArray(res) ? res : res.data || []);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
        if (isMounted) setError('Không thể tải danh sách hóa đơn');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInvoices();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="animate-fade-in max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-2">Hóa đơn của tôi</h1>
        <p className="text-on-surface-variant mb-8">Xem và quản lý hóa đơn thanh toán</p>
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-12 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-notoSerif font-bold text-on-surface mb-2">Hóa đơn của tôi</h1>
      <p className="text-on-surface-variant mb-8">Xem và quản lý hóa đơn thanh toán</p>

      {error && (
        <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
        </div>
      )}

      {invoices.length === 0 && !error ? (
        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-16 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">receipt_long</span>
          <p className="text-on-surface-variant">Chưa có hóa đơn nào</p>
        </div>
      ) : (
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
                {invoices.map((inv, i) => (
                  <tr key={inv.MaHoaDon} className={`${i%2?'bg-surface-container-low/30':''} hover:bg-amber-50/40 transition-colors`}>
                    <td className="px-5 py-4 text-sm font-mono font-semibold text-primary">HD-{String(inv.MaHoaDon).padStart(4, '0')}</td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{formatDate(inv.NgayLap)}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-on-surface">{formatVND(inv.TongThanhToan)}</td>
                    <td className="px-5 py-4"><StatusBadge status={inv.TrangThaiThanhToan} /></td>
                    <td className="px-5 py-4 text-sm text-on-surface-variant">{inv.PhuongThucThanhToan || '—'}</td>
                    <td className="px-5 py-4">
                      <Link to={`/invoices/${inv.MaHoaDon}`} className="text-primary text-sm font-semibold hover:underline">Chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
