import { useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { signup } from "./auth.api";

import type { UserRole } from "./auth.types";

const SignupPage = () => {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [role, setRole] =
    useState<UserRole>(
      "Procurement Officer"
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await signup({
          fullName,
          email,
          password,
          confirmPassword,
          role,
        });

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccess(
        "Account created successfully."
      );

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <Card
        title="Create Account"
        subtitle="Register for VendorBridge ERP"
        className="auth-card"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(
                  event.target.value
                )
              }
              placeholder="Enter full name"
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              marginTop: "16px",
            }}
          >
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter email"
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              marginTop: "16px",
            }}
          >
            <label className="form-label">
              Role
            </label>

            <select
              value={role}
              onChange={(event) =>
                setRole(
                  event.target
                    .value as UserRole
                )
              }
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="Procurement Officer">
                Procurement Officer
              </option>

              <option value="Vendor">
                Vendor
              </option>
            </select>
          </div>

          <div
            className="form-group"
            style={{
              marginTop: "16px",
            }}
          >
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              marginTop: "16px",
            }}
          >
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm password"
              required
            />
          </div>

          {error && (
            <div
              style={{
                marginTop: "16px",
                color: "#ef4444",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                marginTop: "16px",
                color: "#10b981",
              }}
            >
              {success}
            </div>
          )}

          <div
            style={{
              marginTop: "24px",
            }}
          >
            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;