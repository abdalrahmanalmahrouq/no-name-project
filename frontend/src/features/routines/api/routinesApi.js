import axiosInstance from "../../../axios";

export const routinesApi = {
  list: async () => {
    const { data } = await axiosInstance.get("/api/routines");
    return data.data;
  },

  create: async (payload) => {
    const { data } = await axiosInstance.post("/api/routines", payload);
    return data.data;
  },

  update: async (id, payload) => {
    const { data } = await axiosInstance.patch(`/api/routines/${id}`, payload);
    return data.data;
  },

  remove: async (id) => {
    return await axiosInstance.delete(`/api/routines/${id}`);
  },

  toggle: async (id, body = {}) => {
    const { data } = await axiosInstance.post(
      `/api/routines/${id}/toggle`,
      body
    );
    return data.data;
  },
};
