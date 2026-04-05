import { useState } from "react";
import { createPayment } from "../services/api";

function CreatePayment() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("txn_" + Date.now());

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await createPayment({
        name,
        amount,
        idempotencyKey
      });
      setResponse(res);
      // Removed automatic key regeneration and field clearing so users can test idempotency by clicking again 
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
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
          <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="text-xl font-bold text-green-800">Payment Successful!</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Transaction ID</span>
                <span className="font-semibold text-gray-900">{response.transactionId || response._id || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Amount</span>
                <span className="font-semibold text-gray-900">₹{response.amount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Status</span>
                <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full w-max">{response.status || "SUCCESS"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 mb-1">Idempotency Key Used</span>
                <span className="font-mono text-gray-700 bg-white border px-2 py-1 rounded inline-block w-max">{response.idempotencyKey}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePayment;