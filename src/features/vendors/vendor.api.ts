import apiClient from "../../lib/apiClient";

import type {
  VendorQueryParams,
  VendorListResponse,
  VendorResponse,
  CreateVendorRequest,
  CreateVendorResponse,
  UpdateVendorRequest,
  UpdateVendorResponse,
  DeleteVendorResponse,
} from "./vendor.types";

/**
 * GET /vendors
 */
export const getVendors = async (
  params?: VendorQueryParams
): Promise<VendorListResponse> => {
  const response =
    await apiClient.get<VendorListResponse>(
      "/vendors",
      {
        params,
      }
    );

  return response.data;
};

/**
 * GET /vendors/{vendorId}
 */
export const getVendorById = async (
  vendorId: string
): Promise<VendorResponse> => {
  const response =
    await apiClient.get<VendorResponse>(
      `/vendors/${vendorId}`
    );

  return response.data;
};

/**
 * POST /vendors
 */
export const createVendor = async (
  payload: CreateVendorRequest
): Promise<CreateVendorResponse> => {
  const response =
    await apiClient.post<CreateVendorResponse>(
      "/vendors",
      payload
    );

  return response.data;
};

/**
 * PUT /vendors/{vendorId}
 */
export const updateVendor = async (
  vendorId: string,
  payload: UpdateVendorRequest
): Promise<UpdateVendorResponse> => {
  const response =
    await apiClient.put<UpdateVendorResponse>(
      `/vendors/${vendorId}`,
      payload
    );

  return response.data;
};

/**
 * DELETE /vendors/{vendorId}
 */
export const deleteVendor = async (
  vendorId: string
): Promise<DeleteVendorResponse> => {
  const response =
    await apiClient.delete<DeleteVendorResponse>(
      `/vendors/${vendorId}`
    );

  return response.data;
};