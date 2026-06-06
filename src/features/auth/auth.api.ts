import apiClient from "../../lib/apiClient";

import {
  setAccessToken,
  setRefreshToken,
  setUser,
  clearAuthStorage,
} from "../../lib/authStorage";

import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "./auth.types";

/**
 * Login
 * POST /auth/login
 */
export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response =
    await apiClient.post<LoginResponse>(
      "/auth/login",
      payload
    );

  const data = response.data;

  if (data.success) {
    setAccessToken(
      data.data.accessToken
    );

    setRefreshToken(
      data.data.refreshToken
    );

    setUser(data.data.user);
  }

  return data;
};

/**
 * Signup
 * POST /auth/signup
 */
export const signup = async (
  payload: SignupRequest
): Promise<SignupResponse> => {
  const response =
    await apiClient.post<SignupResponse>(
      "/auth/signup",
      payload
    );

  return response.data;
};

/**
 * Forgot Password
 * POST /auth/forgot-password
 */
export const forgotPassword =
  async (
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response =
      await apiClient.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        payload
      );

    return response.data;
  };

/**
 * Refresh Access Token
 * POST /auth/refresh-token
 */
export const refreshToken =
  async (
    payload: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response =
      await apiClient.post<RefreshTokenResponse>(
        "/auth/refresh-token",
        payload
      );

    if (response.data.success) {
      setAccessToken(
        response.data.data.accessToken
      );
    }

    return response.data;
  };

/**
 * Logout
 */
export const logout = (): void => {
  clearAuthStorage();
};