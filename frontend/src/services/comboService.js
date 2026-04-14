import apiClient from './apiClient';

export const comboService = {
  // Public
  getCombos: (params) => apiClient.get('/combos', { params }),
  getComboDetail: (id) => apiClient.get(`/combos/${id}`),
  getComboPreview: (id) => apiClient.get(`/combo/${id}/preview`),

  // Admin CRUD
  createCombo: (data) => apiClient.post('/admin/combos', data),
  updateCombo: (id, data) => apiClient.put(`/admin/combos/${id}`, data),
  deleteCombo: (id) => apiClient.delete(`/admin/combos/${id}`),

  // Combo service CRUD
  addServiceToCombo: (comboId, data) => apiClient.post(`/admin/combos/${comboId}/services`, data),
  updateComboService: (comboId, serviceId, data) => apiClient.put(`/admin/combos/${comboId}/services/${serviceId}`, data),
  removeServiceFromCombo: (comboId, serviceId) => apiClient.delete(`/admin/combos/${comboId}/services/${serviceId}`),
};

export default comboService;
