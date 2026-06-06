import React from "react";

type ButtonVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "secondary";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const variantClass = {
    primary: "btn-primary",
    success: "btn-success",
    warning: "btn-warning",
    danger: "btn-danger",
    secondary: "btn-secondary",
  }[variant];

  return (
    <button
      className={`btn ${variantClass} ${className}`}
      style={{
        width: fullWidth ? "100%" : undefined,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;