import { useEffect, useState } from "react";
import { getPayments } from "../services/api";

function Transactions() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        All Transactions
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="min-w-full text-left">

          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Idempotency Key</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-mono text-sm">
                  {p.transactionId}
                </td>

                <td className="p-3">
                  {p.userId}
                </td>

                <td className="p-3">
                  ₹{p.amount}
                </td>

                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    {p.status}
                  </span>
                </td>

                <td className="p-3 font-mono text-xs text-gray-600">
                  {p.idempotencyKey}
                </td>

                <td className="p-3 text-gray-500 text-sm">
                  {new Date(p.createdAt).toLocaleString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Transactions;