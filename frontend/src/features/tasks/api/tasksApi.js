import axiosInstance from "../../../axios";

export const tasksApi = {
  list: async () => {
    const { data } = await axiosInstance.get("/api/tasks");
    return data.data;
  },

  create: async (payload) => {
    const { data } = await axiosInstance.post("/api/tasks", payload);
    return data.data;
  },

  update: async (id, payload) => {
    const { data } = await axiosInstance.patch(`/api/tasks/${id}`, payload);
    return data.data;
  },

  remove: async (id) => {
    return await axiosInstance.delete(`/api/tasks/${id}`);
  },

  setStatus: async (id, status) => {
    const { data } = await axiosInstance.patch(
      `/api/tasks/${id}/status`,
      { status }
    );
    return data.data;
  },
};
