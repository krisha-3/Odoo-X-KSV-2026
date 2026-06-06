import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  actions,
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || actions) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  margin: 0,
                  marginBottom: "4px",
                }}
              >
                {title}
              </h3>
            )}

            {subtitle && (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default Card;