import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
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

export const createPayment = async ({
  name,
  userId,
  amount,
  idempotencyKey
}) => {

  const response = await API.post(
    "/payments",
    { name, userId, amount },
    {
      headers: {
        "Idempotency-Key": idempotencyKey
      }
    }
  );

  return response.data;
};

// NEW FUNCTION
export const getPayments = async () => {
  const response = await API.get("/payments");
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await API.delete(`/payments/${id}`);
  return response.data;
};