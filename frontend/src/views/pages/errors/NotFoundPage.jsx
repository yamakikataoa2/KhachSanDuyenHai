
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-container-lowest text-on-surface">
      <h1 className="text-9xl font-bold text-primary font-notoSerif">404</h1>
      <p className="mt-4 text-2xl font-medium text-on-surface-variant">Trang bạn tìm kiếm không tồn tại</p>
      <Link to="/" className="mt-8 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-amber-900 transition-all shadow-xl hover:-translate-y-1">
        Trở về Trải nghiệm
      </Link>
    </div>
  );
}
