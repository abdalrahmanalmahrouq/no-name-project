import axiosInstance from "@/axios";
import { createResourceApi } from "@/lib/resourceApi";

export const tasksApi = {
  ...createResourceApi("/api/tasks"),
  setStatus: async (id, status) => {
    const { data } = await axiosInstance.patch(
      `/api/tasks/${id}/status`,
      { status }
    );
    return data.data;
  },
};
