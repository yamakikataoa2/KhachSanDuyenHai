import React, { lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { AdminRoute } from './ProtectedRoute';

const DashboardPage = lazy(() => import('../../views/pages/admin/DashboardPage'));
const RoomTypesPage = lazy(() => import('../../views/pages/admin/RoomTypesPage'));
const RoomsManagePage = lazy(() => import('../../views/pages/admin/RoomsManagePage'));
const ServicesPage = lazy(() => import('../../views/pages/admin/ServicesPage'));
const CombosManagePage = lazy(() => import('../../views/pages/admin/CombosManagePage'));
const ComboDetailsPage = lazy(() => import('../../views/pages/admin/ComboDetailsPage'));
const CustomersPage = lazy(() => import('../../views/pages/admin/CustomersPage'));
const StaffPage = lazy(() => import('../../views/pages/admin/StaffPage'));
const RolesPage = lazy(() => import('../../views/pages/admin/RolesPage'));
const BookingsManagePage = lazy(() => import('../../views/pages/admin/BookingsManagePage'));
const InvoicesManagePage = lazy(() => import('../../views/pages/admin/InvoicesManagePage'));
const ReportsPage = lazy(() => import('../../views/pages/admin/ReportsPage'));

export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminRoute><AdminLayout /></AdminRoute>,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'room-types', element: <RoomTypesPage /> },
            { path: 'rooms', element: <RoomsManagePage /> },
            { path: 'services', element: <ServicesPage /> },
            { path: 'combos', element: <CombosManagePage /> },
            { path: 'combo-details', element: <ComboDetailsPage /> },
            { path: 'customers', element: <CustomersPage /> },
            { path: 'staff', element: <StaffPage /> },
            { path: 'roles', element: <RolesPage /> },
            { path: 'bookings', element: <BookingsManagePage /> },
            { path: 'invoices', element: <InvoicesManagePage /> },
            { path: 'reports', element: <ReportsPage /> }
        ]
    }
];
