import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatVND } from '../../../utils/formatters';
import roomService from '../../../services/roomService';
import bookingService from '../../../services/bookingService';
import { useAuth } from '../../../store/AuthContext';

export default function BookingPage() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const comboState = location.state || {};
  
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState({ ngayNhan: '', ngayTra: '' });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  
  const [form, setForm] = useState({
    hoTen: '', email: '', phone: '', note: ''
  });
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill user data
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        hoTen: user.HoTen || '',
        email: user.Email || '',
        phone: user.SoDienThoai || ''
      }));
    }
  }, [user]);

  // Fetch available rooms when dates change
  useEffect(() => {
    if (dates.ngayNhan && dates.ngayTra) {
      if (new Date(dates.ngayNhan) >= new Date(dates.ngayTra)) {
        setErrorMessage('Ngày trả phòng phải sau ngày nhận phòng');
        setAvailableRooms([]);
        return;
      }
      setErrorMessage('');
      const fetchRooms = async () => {
        setLoadingRooms(true);
        try {
          const res = await roomService.getAvailableRooms(dates.ngayNhan, dates.ngayTra);
          setAvailableRooms(res || []);
          setSelectedRoomType(null);
        } catch (error) {
          console.error("Failed to fetch available rooms", error);
        } finally {
          setLoadingRooms(false);
        }
      };
      fetchRooms();
    }
  }, [dates.ngayNhan, dates.ngayTra]);

  // Group rooms by room type
  const roomTypes = useMemo(() => {
    const types = {};
    availableRooms.forEach(room => {
      const typeId = room.MaLoaiPhong;
      if (!types[typeId]) {
        types[typeId] = {
          MaLoaiPhong: typeId,
          TenLoai: room.loai_phong?.TenLoai,
          AnhDaiDien: room.loai_phong?.AnhDaiDien,
          SoNguoiToiDa: room.loai_phong?.SoNguoiToiDa,
          DienTich: room.loai_phong?.DienTich,
          GiaMacDinh: room.loai_phong?.GiaMacDinh,
          availableRooms: []
        };
      }
      types[typeId].availableRooms.push(room);
    });
    return Object.values(types);
  }, [availableRooms]);

  const handleBookingSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/booking' } });
      return;
    }

    const typeData = roomTypes.find(t => t.MaLoaiPhong === selectedRoomType);
    if (!typeData || typeData.availableRooms.length === 0) return;
    
    const assignedRoom = typeData.availableRooms[0];

    // Prepare payload
    const payload = {
      NgayNhan: dates.ngayNhan,
      NgayTra: dates.ngayTra,
      DsPhong: [{
         MaPhong: assignedRoom.MaPhong,
         GiaThue: typeData.GiaMacDinh,
         ThuocGoiCombo: comboState.selectedCombo ? 1 : 0
      }],
      GhiChu: form.note,
    };

    if (comboState.selectedCombo) {
      payload.MaGoi = comboState.selectedCombo.MaGoi;
      // If there are custom extra services not in combo, we could map to DsDichVu
      // But for simplicity let's stick to standard combo flow.
      if (comboState.customServices && comboState.selectedCombo.DanhSachDichVu) {
          const originalServiceIds = comboState.selectedCombo.DanhSachDichVu.map(s => s.MaDichVu);
          const extraServices = comboState.customServices.filter(s => !originalServiceIds.includes(s.MaDV));
          if (extraServices.length > 0) {
              payload.DsDichVu = extraServices.map(s => ({
                  MaDichVu: s.MaDV,
                  SoLuong: s.SoLuong
              }));
          }
      }
    }

    setBookingLoading(true);
    setErrorMessage('');
    try {
      await bookingService.createBooking(payload);
      setBookingSuccess(true);
      setStep(3);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Có lỗi xảy ra khi tạo đặt phòng.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-container-low py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-notoSerif text-on-surface mb-4">Đặt Phòng</h1>
          {comboState.selectedCombo && (
            <div className="mb-4 inline-block bg-primary-container/30 text-primary px-4 py-2 rounded-xl text-sm font-semibold">
              Kèm gói ưu đãi: {comboState.selectedCombo.TenGoi}
            </div>
          )}
          {/* Steps */}
          <div className="flex items-center gap-2 text-sm">
            {['Chọn phòng', 'Thông tin', 'Xác nhận'].map((s, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-2 ${step > i ? 'text-primary' : step === i + 1 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step > i ? 'bg-primary text-white' : step === i + 1 ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>{step > i ? '✓' : i + 1}</span>
                  {s}
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-primary' : 'bg-surface-container-high'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-8 py-10">
        {errorMessage && (
          <div className="mb-6 bg-error-container text-error px-4 py-3 rounded-xl text-sm shadow-sm border border-error/20">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Ngày nhận phòng</label>
                <input type="date" value={dates.ngayNhan} onChange={e => setDates({...dates, ngayNhan: e.target.value})} className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Ngày trả phòng</label>
                <input type="date" value={dates.ngayTra} onChange={e => setDates({...dates, ngayTra: e.target.value})} className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm transition-colors" />
              </div>
            </div>
            
            {(dates.ngayNhan && dates.ngayTra) && (
              <>
                <h2 className="text-xl font-notoSerif font-bold text-on-surface flex items-center justify-between">
                  Chọn loại phòng
                  {loadingRooms && <span className="text-sm font-normal text-on-surface-variant">Đang tải...</span>}
                </h2>
                
                {!loadingRooms && roomTypes.length === 0 ? (
                  <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-2xl">
                    Không có phòng trống trong khoảng thời gian này.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {roomTypes.map(room => (
                      <div key={room.MaLoaiPhong} onClick={() => setSelectedRoomType(room.MaLoaiPhong)}
                        className={`flex gap-5 p-4 rounded-2xl cursor-pointer transition-all border-2 ${selectedRoomType === room.MaLoaiPhong ? 'border-primary bg-amber-50/50' : 'border-transparent bg-surface-container-lowest hover:bg-surface-container-low/50 shadow-sm'}`}>
                        <img src={room.AnhDaiDien || 'https://via.placeholder.com/112x80'} alt={room.TenLoai} className="w-28 h-20 rounded-xl object-cover flex-shrink-0 bg-surface-container-high" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-on-surface font-notoSerif">{room.TenLoai}</h3>
                          <p className="text-xs text-on-surface-variant mt-0.5">{room.SoNguoiToiDa} khách • {room.DienTich}m²</p>
                          <p className="text-[10px] text-emerald-600 font-bold mt-1 inline-block bg-emerald-50 px-2 py-0.5 rounded-md">Còn {room.availableRooms.length} phòng</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-primary font-bold">{formatVND(room.GiaMacDinh)}</p>
                          <p className="text-[10px] text-on-surface-variant">/ đêm</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => selectedRoomType && setStep(2)} className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${selectedRoomType ? 'bg-primary text-white hover:bg-amber-900 shadow-md transform hover:-translate-y-0.5' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70'}`}>Tiếp tục</button>
              </>
            )}
            {!(dates.ngayNhan && dates.ngayTra) && (
              <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
                <span className="material-symbols-outlined text-3xl mb-2 opacity-30 block">event_available</span>
                Vui lòng chọn ngày nhận và trả phòng để xem phòng trống.
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 max-w-lg mx-auto">
            <h2 className="text-xl font-notoSerif font-bold text-on-surface">Thông tin khách hàng</h2>
            
            <div className="space-y-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20">
              {[
                { field: 'hoTen', label: 'Họ và tên', type: 'text' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phone', label: 'Số điện thoại', type: 'tel' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.field]} onChange={e => setForm({...form, [f.field]: e.target.value})} 
                         className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Ghi chú yêu cầu</label>
                <textarea value={form.note} onChange={e => setForm({...form, note: e.target.value})} rows="3"
                          className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm transition-colors resize-none" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-outline-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors">Quay lại</button>
              <button onClick={handleBookingSubmit} disabled={bookingLoading} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-amber-900 transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2">
                {bookingLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />}
                Xác nhận đặt
              </button>
            </div>
          </div>
        )}
        {step === 3 && bookingSuccess && (
          <div className="text-center py-12 max-w-md mx-auto animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
              <span className="material-symbols-outlined text-5xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h2 className="text-3xl font-notoSerif font-bold text-on-surface mb-3">Đặt phòng thành công!</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">Chúng tôi đã nhận được yêu cầu đặt phòng của bạn. Xác nhận chi tiết sẽ được thông báo sớm nhất.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/history" className="px-6 py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-md">Xem lịch sử đặt</Link>
              <Link to="/" className="px-6 py-3.5 border border-outline-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors">Về trang chủ</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
