/**
 * User Roles
 */
export type UserRole =
  | "Admin"
  | "Procurement Officer"
  | "Manager"
  | "Vendor";

/**
 * User Information
 */
export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login Response Data
 */
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Login Response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

/**
 * Signup Request
 */
export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

/**
 * Signup Response
 */
export interface SignupResponse {
  success: boolean;
  message: string;
  data: User;
}

/**
 * Forgot Password Request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Forgot Password Response
 */
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Refresh Token Response
 */
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

/**
 * Auth State
 */
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}