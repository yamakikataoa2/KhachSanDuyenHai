import apiClient from './apiClient';

export const bookingService = {
  // User
  createBooking: (data) => apiClient.post('/user/bookings', data),
  getMyBookings: () => apiClient.get('/user/bookings'),
  getMyBookingDetail: (id) => apiClient.get(`/user/bookings/${id}`),

  // Service modification
  modifyService: (bookingId, data) => apiClient.post(`/bookings/${bookingId}/services`, data),
  calculateBill: (bookingId) => apiClient.get(`/bookings/${bookingId}/bill`),

  // Admin
  getAllBookings: (params) => apiClient.get('/admin/bookings', { params }),
  getBookingDetail: (id) => apiClient.get(`/admin/bookings/${id}`),
  updateBookingStatus: (id, data) => apiClient.put(`/admin/bookings/${id}/status`, data),
};

export default bookingService;
