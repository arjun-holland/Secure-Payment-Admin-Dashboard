import { useState } from "react";
import { createPayment } from "../services/api";

function CreatePayment() {

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("txn_" + Date.now());

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !userId || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await createPayment({
        name,
        userId,
        amount,
        idempotencyKey
      });
      setResponse(res);
    } catch (error) {
      alert("Payment failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateKey = () => {
    setIdempotencyKey("txn_" + Date.now());  // returns the current timestamp in milliseconds.
  };

  return (
    <div className="max-w-xl">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Create Payment (Idempotent API)
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter name"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">User ID</label>

            <input
              value={userId}
              onChange={(e)=>setUserId(e.target.value)}
              placeholder="Enter user id"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount</label>

            <input
              type="number"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Idempotency Key</label>

            <input
              value={idempotencyKey}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />

            <button
              type="button"
              onClick={regenerateKey}
              className="text-blue-600 text-sm mt-1"
            >
              Generate New Key
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Send Payment Request"}
          </button>
        </form>

        {response && (
          <div className="mt-6 bg-gray-100 p-3 rounded">
            <h3 className="font-semibold mb-2">Transaction Response</h3>

            <pre className="text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>

          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePayment;