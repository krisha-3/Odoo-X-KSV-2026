import React from "react";

export type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "approved"
  | "rejected"
  | "paid"
  | "draft"
  | "completed"
  | "in-review";

interface StatusBadgeProps {
  status: StatusType | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
}) => {
  const normalizedStatus = status
    .toLowerCase()
    .replace(/\s+/g, "-");

  const getBadgeClass = () => {
    switch (normalizedStatus) {
      case "active":
      case "approved":
      case "paid":
      case "completed":
        return "badge badge-success";

      case "pending":
      case "in-review":
      case "draft":
        return "badge badge-warning";

      case "rejected":
      case "inactive":
        return "badge badge-danger";

      default:
        return "badge badge-primary";
    }
  };

  const formatLabel = (value: string) => {
    return value
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  return (
    <span className={getBadgeClass()}>
      {formatLabel(normalizedStatus)}
    </span>
  );
};

export default StatusBadge;