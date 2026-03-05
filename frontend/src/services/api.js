import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

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