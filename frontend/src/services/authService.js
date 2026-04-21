import apiClient from './apiClient';

export const authService = {
  login: (tenDangNhap, matKhau) =>
    apiClient.post('/auth/login', { TenDangNhap: tenDangNhap, MatKhau: matKhau }),

  adminLogin: (tenDangNhap, matKhau) =>
    apiClient.post('/auth/admin-login', { TenDangNhap: tenDangNhap, MatKhau: matKhau }),

  register: (data) =>
    apiClient.post('/auth/register', data),

  logout: () =>
    apiClient.post('/auth/logout'),

  me: () =>
    apiClient.get('/auth/me'),

  changePassword: (matKhauCu, matKhauMoi) =>
    apiClient.put('/user/change-password', { MatKhauCu: matKhauCu, MatKhauMoi: matKhauMoi }),
};

export default authService;
