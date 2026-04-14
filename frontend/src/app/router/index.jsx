import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import NotFoundPage from '../../views/pages/errors/NotFoundPage';

export const router = createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes,
    {
        path: '*',
        element: <NotFoundPage />
    }
]);
