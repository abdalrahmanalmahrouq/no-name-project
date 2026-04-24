import axiosInstance from "@/axios";
import { createResourceApi } from "@/lib/resourceApi";

export const routinesApi = {
  ...createResourceApi("/api/routines"),
  toggle: async (id, body = {}) => {
    const { data } = await axiosInstance.post(
      `/api/routines/${id}/toggle`,
      body
    );
    return data.data;
  },
};
