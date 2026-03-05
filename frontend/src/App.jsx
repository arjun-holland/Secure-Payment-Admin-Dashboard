import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePayment from "./pages/CreatePayment";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">

        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col">

          <div className="text-2xl font-bold p-6 border-b border-gray-700">
            SecurePay
          </div>

          <nav className="flex flex-col p-4 gap-4">

            <Link
              to="/"
              className="hover:bg-gray-700 p-2 rounded transition"
            >
              Create Payment
            </Link>

            <Link
              to="/transactions"
              className="hover:bg-gray-700 p-2 rounded transition"
            >
              Transactions
            </Link>

          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">

          {/* Top Navbar */}
          <header className="bg-white shadow p-4 flex justify-between items-center">

            <h1 className="text-xl font-semibold">
              Secure Payment Admin Dashboard
            </h1>

            <div className="text-gray-500">
              Admin
            </div>

          </header>

          {/* Page Content */}
          <main className="p-6">

            <Routes>
              <Route path="/" element={<CreatePayment />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>

          </main>

        </div>

      </div>
    </Router>
  );
}

export default App;