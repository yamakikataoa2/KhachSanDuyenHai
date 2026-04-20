import apiClient from './apiClient';

export const adminService = {
  // Dashboard
  getDashboard: () => apiClient.get('/admin/dashboard'),

  // Services CRUD
  getServices: (params) => apiClient.get('/services', { params }),
  createService: (data) => apiClient.post('/admin/services', data),
  updateService: (id, data) => apiClient.put(`/admin/services/${id}`, data),
  deleteService: (id) => apiClient.delete(`/admin/services/${id}`),

  // Customers CRUD
  getCustomers: (params) => apiClient.get('/admin/customers', { params }),
  getCustomerDetail: (id) => apiClient.get(`/admin/customers/${id}`),
  createCustomer: (data) => apiClient.post('/admin/customers', data),
  updateCustomer: (id, data) => apiClient.put(`/admin/customers/${id}`, data),
  deleteCustomer: (id) => apiClient.delete(`/admin/customers/${id}`),

  // Staff CRUD
  getStaff: () => apiClient.get('/admin/staff'),
  getStaffDetail: (id) => apiClient.get(`/admin/staff/${id}`),
  createStaff: (data) => apiClient.post('/admin/staff', data),
  updateStaff: (id, data) => apiClient.put(`/admin/staff/${id}`, data),
  deleteStaff: (id) => apiClient.delete(`/admin/staff/${id}`),

  // Roles CRUD
  getRoles: () => apiClient.get('/admin/roles'),
  createRole: (data) => apiClient.post('/admin/roles', data),
  updateRole: (id, data) => apiClient.put(`/admin/roles/${id}`, data),
  deleteRole: (id) => apiClient.delete(`/admin/roles/${id}`),

  // User profile (admin of user)
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),

  // Invoices (Admin)
  getInvoices: (params) => apiClient.get('/admin/invoices', { params }),
};

export default adminService;
