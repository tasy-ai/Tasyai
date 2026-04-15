import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../../services/authService';

const AdminRoute = () => {
    const user = authService.getCurrentUser();

    // Check if user is logged in and is an admin
    if (!user || user.role !== 'admin') {
        // Not logged in or not an admin, redirect to login
        return <Navigate to="/admin/login" replace />;
    }

    // Authorized, render the child routes inside AdminLayout
    return <Outlet />;
};

export default AdminRoute;
