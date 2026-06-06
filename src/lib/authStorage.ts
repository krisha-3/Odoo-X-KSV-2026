import { STORAGE_KEYS } from "./constants";

export interface AuthUser {
  userId: string;
  fullName: string;
  email: string;
  role:
    | "Admin"
    | "Procurement Officer"
    | "Manager"
    | "Vendor";
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Access Token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(
    STORAGE_KEYS.ACCESS_TOKEN
  );
};

export const setAccessToken = (
  token: string
): void => {
  localStorage.setItem(
    STORAGE_KEYS.ACCESS_TOKEN,
    token
  );
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(
    STORAGE_KEYS.ACCESS_TOKEN
  );
};

/**
 * Refresh Token
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(
    STORAGE_KEYS.REFRESH_TOKEN
  );
};

export const setRefreshToken = (
  token: string
): void => {
  localStorage.setItem(
    STORAGE_KEYS.REFRESH_TOKEN,
    token
  );
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(
    STORAGE_KEYS.REFRESH_TOKEN
  );
};

/**
 * User
 */
export const getUser = (): AuthUser | null => {
  const user =
    localStorage.getItem(
      STORAGE_KEYS.USER
    );

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
};

export const setUser = (
  user: AuthUser
): void => {
  localStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify(user)
  );
};

export const removeUser = (): void => {
  localStorage.removeItem(
    STORAGE_KEYS.USER
  );
};

/**
 * Authentication Helpers
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const clearAuthStorage = (): void => {
  removeAccessToken();
  removeRefreshToken();
  removeUser();
};