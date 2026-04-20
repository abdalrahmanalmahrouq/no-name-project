import axiosInstance from '@/axios';

export const aiApi = {
  sendMessage: (message, history = []) =>
    axiosInstance.post('/api/ai/chat', { message, history }),
};
