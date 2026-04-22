import axiosInstance from '@/axios';

export const aiApi = {
  sendMessage: (message, history = [], { authenticated = false } = {}) => {
    const url = authenticated ? '/api/ai/chat/me' : '/api/ai/chat';
    return axiosInstance.post(url, { message, history });
  },
};
