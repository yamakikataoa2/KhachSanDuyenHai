import apiClient from './apiClient';

export const invoiceService = {
  // User
  getMyInvoices: () => apiClient.get('/user/invoices'),
  getMyInvoiceDetail: (id) => apiClient.get(`/user/invoices/${id}`),

  // Admin
  getAllInvoices: (params) => apiClient.get('/admin/invoices', { params }),
  getInvoiceDetail: (id) => apiClient.get(`/admin/invoices/${id}`),
  createInvoice: (data) => apiClient.post('/admin/invoices', data),
  updateInvoice: (id, data) => apiClient.put(`/admin/invoices/${id}`, data),
  deleteInvoice: (id) => apiClient.delete(`/admin/invoices/${id}`),
};

export default invoiceService;
