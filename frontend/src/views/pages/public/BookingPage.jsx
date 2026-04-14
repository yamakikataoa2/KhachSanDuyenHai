import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockRooms, formatVND } from '../../../data/mockData';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-container-low py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-notoSerif text-on-surface mb-4">Đặt Phòng</h1>
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
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Ngày nhận phòng</label>
                <input type="date" className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">Ngày trả phòng</label>
                <input type="date" className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
            </div>
            <h2 className="text-xl font-notoSerif font-bold text-on-surface">Chọn loại phòng</h2>
            <div className="space-y-4">
              {mockRooms.map(room => (
                <div key={room.MaLoaiPhong} onClick={() => setSelected(room.MaLoaiPhong)}
                  className={`flex gap-5 p-4 rounded-2xl cursor-pointer transition-all border-2 ${selected === room.MaLoaiPhong ? 'border-primary bg-amber-50/50' : 'border-transparent bg-surface-container-lowest hover:bg-surface-container-low'}`}>
                  <img src={room.AnhDaiDien} alt={room.TenLoai} className="w-28 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-on-surface font-notoSerif">{room.TenLoai}</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">{room.SoNguoiToiDa} khách • {room.DienTich}m²</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-primary font-bold">{formatVND(room.GiaMacDinh)}</p>
                    <p className="text-[10px] text-on-surface-variant">/ đêm</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => selected && setStep(2)} className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${selected ? 'bg-primary text-white hover:bg-amber-900 shadow-md' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'}`}>Tiếp tục</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 max-w-lg mx-auto">
            <h2 className="text-xl font-notoSerif font-bold text-on-surface">Thông tin khách hàng</h2>
            {[{l:'Họ và tên',p:'Nhập họ tên',t:'text'},{l:'Email',p:'email@example.com',t:'email'},{l:'Số điện thoại',p:'0901234567',t:'tel'},{l:'Ghi chú',p:'Yêu cầu đặc biệt (tùy chọn)',t:'text'}].map((f,i) => (
              <div key={i}>
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-2">{f.l}</label>
                <input type={f.t} placeholder={f.p} className="w-full bg-surface-container-high/60 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-primary text-sm" />
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-outline-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors">Quay lại</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-md">Xác nhận</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="text-center py-12 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h2 className="text-2xl font-notoSerif font-bold text-on-surface mb-3">Đặt phòng thành công!</h2>
            <p className="text-on-surface-variant mb-8">Chúng tôi đã nhận được yêu cầu đặt phòng. Xác nhận sẽ được gửi qua email trong ít phút.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/history" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-amber-900 transition-colors shadow-md">Xem lịch sử đặt</Link>
              <Link to="/" className="px-6 py-3 border border-outline-variant rounded-xl text-sm font-medium hover:bg-surface-container-high transition-colors">Về trang chủ</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
