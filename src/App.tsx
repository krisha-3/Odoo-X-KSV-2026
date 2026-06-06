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

import { isAuthenticated } from "./lib/authStorage";
import { logout as apiLogout } from "./features/auth/auth.api";

function App() {
  const [page, setPage] =
    useState<Page>(
      isAuthenticated() ? "dashboard" : "login"
    );

  const [authenticated, setAuthenticated] =
    useState<boolean>(isAuthenticated());

  const renderPage = () => {
    switch (page) {
      case "login":
        return (
          <LoginPage
            onSuccess={() => {
              setPage("dashboard");
              setAuthenticated(true);
            }}
            onSignup={() =>
              setPage("signup")
            }
          />
        );

      case "signup":
        return (
          <SignupPage
            onSuccess={() =>
              setPage("login")
            }
            onSignin={() =>
              setPage("login")
            }
          />
        );

      case "vendors":
        return <VendorListPage />;

      case "vendorForm":
        return <VendorFormPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    // Render auth pages outside the main AppShell
    <>
      {page === "login" || page === "signup" ? (
        renderPage()
      ) : (
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

            {authenticated && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  try {
                    apiLogout();
                  } catch (e) {
                    // ignore
                  }

                  setAuthenticated(false);
                  setPage("login");
                }}
              >
                Logout
              </button>
            )}
          </div>

          {renderPage()}
        </AppShell>
      )}
    </>
  );
}

export default App;