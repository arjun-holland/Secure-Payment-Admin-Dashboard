import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Automatically add Authorization token to requests
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
