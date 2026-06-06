import { useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { login } from "./auth.api";

type Props = {
  onSuccess?: () => void;
  onSignup?: () => void;
};

const LoginPage = ({ onSuccess, onSignup }: Props) => {
  const [email, setEmail] =
    useState<string>("");

  const [password, setPassword] =
    useState<string>("");

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      if (!response.success) {
        setError(
          response.message ||
            "Login failed"
        );
        return;
      }

      console.log(
        "Login successful",
        response
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <Card
        title="VendorBridge ERP"
        subtitle="Sign in to continue"
        className="auth-card"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              className="form-label"
            >
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
              placeholder="Enter your email"
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              marginTop: "16px",
            }}
          >
            <label
              className="form-label"
            >
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
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div
              style={{
                marginTop: "16px",
                color: "#ef4444",
                fontSize: "14px",
              }}
            >
              {error}
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
                ? "Signing In..."
                : "Sign In"}
            </Button>
          </div>

          <div
            style={{
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={() =>
                  onSignup && onSignup()
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  cursor: "pointer",
                }}
              >
                Create account
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;