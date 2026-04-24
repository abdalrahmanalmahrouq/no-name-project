import axiosInstance from "@/axios";

export function createResourceApi(basePath) {
  return {
    list: async () => {
      const { data } = await axiosInstance.get(basePath);
      return data.data;
    },
    create: async (payload) => {
      const { data } = await axiosInstance.post(basePath, payload);
      return data.data;
    },
    update: async (id, payload) => {
      const { data } = await axiosInstance.patch(`${basePath}/${id}`, payload);
      return data.data;
    },
    remove: async (id) => {
      return await axiosInstance.delete(`${basePath}/${id}`);
    },
  };
}
