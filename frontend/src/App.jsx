import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CreatePayment from "./pages/CreatePayment";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated, logout, getCurrentUser } from "./services/auth";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          SecurePay
        </div>
        <nav className="flex flex-col p-4 gap-4">
          <Link to="/" className="hover:bg-gray-700 p-2 rounded transition">
            Create Payment
          </Link>
          <Link to="/transactions" className="hover:bg-gray-700 p-2 rounded transition">
            Transactions
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Secure Payment Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-gray-500">
              Welcome, {user?.username || "Admin"}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreatePayment />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;