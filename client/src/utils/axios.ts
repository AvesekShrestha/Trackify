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
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response) {
            const status = error.response.status;
            const code = (error.response.data as any)?.code;

            if (status === 401 && !originalRequest._retry) {
                if (code === "TOKEN_EXPIRED") {
                    originalRequest._retry = true;

                    try {
                        await axios.post(
                            "http://localhost:8000/api/v1/auth/refresh",
                            {},
                            { withCredentials: true }
                        );
                        return api(originalRequest);
                    } catch (refreshError) {
                        console.error("Refresh token failed:", refreshError);
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                }

                // ===== NO TOKEN or INVALID TOKEN =====
                else if (code === "NO_TOKEN" || code === "INVALID_TOKEN") {
                    try {
                        await axios.post(
                            "http://localhost:8000/api/v1/auth/logout",
                            {},
                            { withCredentials: true }
                        );
                    } catch (logoutErr) {
                        console.warn("Logout failed:", logoutErr);
                    }
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;

