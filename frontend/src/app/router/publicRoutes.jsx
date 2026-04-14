import React, { lazy } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';

const HomePage = lazy(() => import('../../views/pages/public/HomePage'));
const RoomsPage = lazy(() => import('../../views/pages/public/RoomsPage'));
const RoomDetailPage = lazy(() => import('../../views/pages/public/RoomDetailPage'));
const CombosPage = lazy(() => import('../../views/pages/public/CombosPage'));
const ComboDetailPage = lazy(() => import('../../views/pages/public/ComboDetailPage'));
const BookingPage = lazy(() => import('../../views/pages/public/BookingPage'));
const BookingDetailPage = lazy(() => import('../../views/pages/public/BookingDetailPage'));
const LoginPage = lazy(() => import('../../views/pages/public/LoginPage'));
const RegisterPage = lazy(() => import('../../views/pages/public/RegisterPage'));
const ProfilePage = lazy(() => import('../../views/pages/public/ProfilePage'));
const HistoryPage = lazy(() => import('../../views/pages/public/HistoryPage'));
const InvoicesPage = lazy(() => import('../../views/pages/public/InvoicesPage'));
const InvoiceDetailPage = lazy(() => import('../../views/pages/public/InvoiceDetailPage'));
const AdminLoginPage = lazy(() => import('../../views/pages/public/AdminLoginPage'));

export const publicRoutes = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'rooms', element: <RoomsPage /> },
            { path: 'rooms/:id', element: <RoomDetailPage /> },
            { path: 'combos', element: <CombosPage /> },
            { path: 'combos/:id', element: <ComboDetailPage /> },
            { path: 'booking', element: <BookingPage /> },
            { path: 'booking/:id', element: <ProtectedRoute><BookingDetailPage /></ProtectedRoute> },
            { path: 'login', element: <GuestRoute><LoginPage /></GuestRoute> },
            { path: 'register', element: <GuestRoute><RegisterPage /></GuestRoute> },
            { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
            { path: 'history', element: <ProtectedRoute><HistoryPage /></ProtectedRoute> },
            { path: 'invoices', element: <ProtectedRoute><InvoicesPage /></ProtectedRoute> },
            { path: 'invoices/:id', element: <ProtectedRoute><InvoiceDetailPage /></ProtectedRoute> }
        ]
    },
    {
        path: '/admin/login',
        element: <AdminLoginPage />
    }
];
