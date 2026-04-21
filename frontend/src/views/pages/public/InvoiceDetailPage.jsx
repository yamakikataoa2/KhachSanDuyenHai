import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatVND, formatDate } from '../../../utils/formatters';
import invoiceService from '../../../services/invoiceService';
import StatusBadge from '../../components/common/StatusBadge';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchInvoice = async () => {
      try {
        const res = await invoiceService.getMyInvoiceDetail(id);
        if (isMounted) setInvoice(res);
      } catch (err) {
        console.error('Failed to fetch invoice:', err);
        if (isMounted) setError('Không thể tải chi tiết hóa đơn');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInvoice();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto px-8 py-12">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow" />
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto px-8 py-12">
        <Link to="/invoices" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
          <span className="material-symbols-outlined text-lg">arrow_back</span> Danh sách hóa đơn
        </Link>
        <div className="bg-error-container text-error px-6 py-8 rounded-2xl text-center">
          <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
          <p>{error || 'Không tìm thấy hóa đơn'}</p>
        </div>
      </div>
    );
  }

  const khachHang = invoice.phieu_dat?.khach_hang;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-8 py-12">
      <Link to="/invoices" className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-6 transition-colors">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Danh sách hóa đơn
      </Link>
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_2px_12px_rgba(77,70,53,0.06)] p-8">
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-surface-container-high">
          <div>
            <p className="text-sm text-on-surface-variant font-mono">HD-{String(invoice.MaHoaDon).padStart(4, '0')}</p>
            <h1 className="text-2xl font-notoSerif font-bold text-on-surface mt-1">Chi tiết hóa đơn</h1>
          </div>
          <StatusBadge status={invoice.TrangThaiThanhToan} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { label: 'Khách hàng', value: khachHang?.HoTen || '—' },
            { label: 'Email', value: khachHang?.Email || '—' },
            { label: 'Số điện thoại', value: khachHang?.SoDienThoai || '—' },
            { label: 'Phiếu đặt', value: invoice.MaPhieuDat ? `PD-${String(invoice.MaPhieuDat).padStart(3, '0')}` : '—' },
            { label: 'Ngày lập', value: invoice.NgayLap ? formatDate(invoice.NgayLap) : '—' },
            { label: 'Phương thức', value: invoice.PhuongThucThanhToan || '—' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mb-1">{item.label}</p>
              <p className="text-sm font-medium text-on-surface">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Chi tiết phiếu đặt nếu có */}
        {invoice.phieu_dat && (
          <div className="bg-surface-container-low rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Chi tiết đặt phòng</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] uppercase text-on-surface-variant font-semibold mb-0.5">Nhận phòng</p>
                <p className="text-on-surface">{formatDate(invoice.phieu_dat.NgayNhanDuKien)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-on-surface-variant font-semibold mb-0.5">Trả phòng</p>
                <p className="text-on-surface">{formatDate(invoice.phieu_dat.NgayTraDuKien)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-on-surface-variant font-semibold mb-0.5">Trạng thái đặt</p>
                <StatusBadge status={invoice.phieu_dat.TrangThai} />
              </div>
              <div>
                <p className="text-[10px] uppercase text-on-surface-variant font-semibold mb-0.5">Số khách</p>
                <p className="text-on-surface">{invoice.phieu_dat.SoNguoiO || '—'} người</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-surface-container-low rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-on-surface font-semibold">Tổng thanh toán</span>
            <span className="text-3xl font-bold text-primary">{formatVND(invoice.TongThanhToan)}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-amber-900 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">print</span> In hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
}
