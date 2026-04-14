import apiClient from './apiClient';

export const roomService = {
  // Public
  getRoomTypes: () => apiClient.get('/room-types'),
  getRoomTypeDetail: (id) => apiClient.get(`/room-types/${id}`),
  getRooms: (params) => apiClient.get('/rooms', { params }),
  getAvailableRooms: (ngayNhan, ngayTra) =>
    apiClient.get('/rooms/available', { params: { NgayNhan: ngayNhan, NgayTra: ngayTra } }),
  getRoomDetail: (id) => apiClient.get(`/rooms/${id}`),

  // Admin
  createRoomType: (data) => apiClient.post('/admin/room-types', data),
  updateRoomType: (id, data) => apiClient.put(`/admin/room-types/${id}`, data),
  deleteRoomType: (id) => apiClient.delete(`/admin/room-types/${id}`),
  createRoom: (data) => apiClient.post('/admin/rooms', data),
  updateRoom: (id, data) => apiClient.put(`/admin/rooms/${id}`, data),
  deleteRoom: (id) => apiClient.delete(`/admin/rooms/${id}`),
};

export default roomService;
