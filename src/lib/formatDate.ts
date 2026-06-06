/**
 * Format date as:
 * 06 Jun 2026
 */
export const formatDate = (
  date: string | Date
): string => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Format date and time as:
 * 06 Jun 2026, 10:30 AM
 */
export const formatDateTime = (
  date: string | Date
): string => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

/**
 * Format date for input fields
 * Example:
 * 2026-06-06
 */
export const formatDateForInput = (
  date: string | Date
): string => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(
    d.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    d.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Relative time
 * Example:
 * Just now
 * 5 minutes ago
 * 2 hours ago
 * 3 days ago
 */
export const formatRelativeTime = (
  date: string | Date
): string => {
  const now = new Date();
  const target = new Date(date);

  const diff =
    now.getTime() - target.getTime();

  const seconds = Math.floor(
    diff / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${
      minutes > 1 ? "s" : ""
    } ago`;
  }

  if (hours < 24) {
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } ago`;
  }

  return `${days} day${
    days > 1 ? "s" : ""
  } ago`;
};