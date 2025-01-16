import axios from "axios";

const client = axios.create({ baseURL: "" });

client.interceptors.request.use(
  async (config) => {
    const token = "get token here from local storage ore zustand";
    if (!config.headers.Authorization) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
