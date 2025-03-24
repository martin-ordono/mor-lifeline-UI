import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8080"; // Replace with your API URL

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});


// Response Interceptor (For handling errors globally)
api.interceptors.response.use((response: AxiosResponse) => response, (error) => {
    if (error.response) {
      // Handle HTTP errors (4xx, 5xx)
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Generic API call handler
export const apiManager = {
  get: <T>(url: string, params?: object): Promise<T> =>
    api.get(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: object): Promise<T> =>
    api.post(url, data).then((res) => res.data),

  put: <T>(url: string, data?: object): Promise<T> =>
    api.put(url, data).then((res) => res.data),

  delete: <T>(url: string, data?: object): Promise<T> =>
    api.delete(url, data).then((res) => res.data),
};

export default api;
