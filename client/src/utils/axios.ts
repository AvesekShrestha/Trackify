import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig | undefined;

    if (
      originalRequest &&
      error.response &&
      !(originalRequest as any)._retry
    ) {
      const isAccessTokenExpired =
        error.response.status === 401 &&
        (error.response.data as any)?.error === "AccessTokenExpired";

      if (isAccessTokenExpired) {
        (originalRequest as any)._retry = true;

        try {
          await axios.post(
            "http://localhost:8000/api/v1/auth/refresh",
            {},
            { withCredentials: true }
          );

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
