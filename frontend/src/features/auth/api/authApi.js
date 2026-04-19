import axiosInstance from "../../../axios";

export const authApi = {
  // 1. The CSRF Handshake
  getCsrfCookie: async () => {
    return await axiosInstance.get('/sanctum/csrf-cookie');
  },

  // 2. Login
  login: async (credentials) => {
    await authApi.getCsrfCookie();
    return await axiosInstance.post('/login', credentials);
  },

  // 3. Register
  register: async (userData) => {
    await authApi.getCsrfCookie();
    return await axiosInstance.post('/register', userData);
  },

  // 4. Get Current User (to check if logged in)
  getUser: async () => {
    return await axiosInstance.get('/api/user');
  },

  // 5. Logout
  logout: async () => {
    return await axiosInstance.post('/logout');
  },

  // 6. Forgot Password
  forgotPassword: async (email) => {
    return await axiosInstance.post('/forgot-password', { email });
  },

  // 7. Update Profile
  updateProfile: async (profileData) => {
    const formData = new FormData();
    formData.append('name', profileData.name);
    if(profileData.image){
      formData.append('image', profileData.image);
    }
    formData.append('_method', 'PATCH');
    return await axiosInstance.post('/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 8. Change Password
  changePassword: async (passwordData) => {
    return await axiosInstance.patch('/user/change-password', passwordData);
  }
};