import { useState } from "react";

import "./App.css";

import AppShell from "./components/AppShell";

import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignUpPage";
import VendorListPage from "./features/vendors/VendorListPage";
import VendorFormPage from "./features/vendors/VendorFormPage";

type Page =
  | "dashboard"
  | "login"
  | "signup"
  | "vendors"
  | "vendorForm";

function App() {
  const [page, setPage] =
    useState<Page>("dashboard");

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginPage />;

      case "signup":
        return <SignupPage />;

      case "vendors":
        return <VendorListPage />;

      case "vendorForm":
        return <VendorFormPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppShell>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            setPage("login")
          }
        >
          Login
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            setPage("signup")
          }
        >
          Signup
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            setPage("vendors")
          }
        >
          Vendors
        </button>

        <button
          className="btn btn-primary"
          onClick={() =>
            setPage("vendorForm")
          }
        >
          Add Vendor
        </button>
      </div>

      {renderPage()}
    </AppShell>
  );
}

export default App;