/**
 * Vendor Status
 */
export type VendorStatus =
  | "active"
  | "inactive"
  | "blacklisted";

/**
 * Vendor
 */
export interface Vendor {
  vendorId: string;
  vendorCode: string;

  companyName: string;
  contactPerson: string;

  email: string;
  phoneNumber: string;

  gstNumber: string;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  status: VendorStatus;

  createdAt: string;
  updatedAt: string;
}

/**
 * Create Vendor Request
 */
export interface CreateVendorRequest {
  companyName: string;
  contactPerson: string;

  email: string;
  phoneNumber: string;

  gstNumber: string;

  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

/**
 * Update Vendor Request
 */
export interface UpdateVendorRequest {
  companyName?: string;
  contactPerson?: string;

  email?: string;
  phoneNumber?: string;

  gstNumber?: string;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;

  status?: VendorStatus;
}

/**
 * Vendor List Response
 */
export interface VendorListResponse {
  success: boolean;
  message: string;
  data: {
    items: Vendor[];
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * Vendor Details Response
 */
export interface VendorResponse {
  success: boolean;
  message: string;
  data: Vendor;
}

/**
 * Create Vendor Response
 */
export interface CreateVendorResponse {
  success: boolean;
  message: string;
  data: Vendor;
}

/**
 * Update Vendor Response
 */
export interface UpdateVendorResponse {
  success: boolean;
  message: string;
  data: Vendor;
}

/**
 * Delete Vendor Response
 */
export interface DeleteVendorResponse {
  success: boolean;
  message: string;
  data: {
    vendorId: string;
  };
}

/**
 * Vendor Query Parameters
 */
export interface VendorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: VendorStatus;
}