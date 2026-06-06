/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: "Admin",
  PROCUREMENT_OFFICER: "Procurement Officer",
  MANAGER: "Manager",
  VENDOR: "Vendor",
} as const;

/**
 * RFQ Status
 */
export const RFQ_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  CLOSED: "closed",
} as const;

/**
 * Quotation Status
 */
export const QUOTATION_STATUS = {
  SUBMITTED: "submitted",
  SHORTLISTED: "shortlisted",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
} as const;

/**
 * Approval Status
 */
export const APPROVAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

/**
 * Purchase Order Status
 */
export const PURCHASE_ORDER_STATUS = {
  GENERATED: "generated",
  SENT: "sent",
  ACCEPTED: "accepted",
  CLOSED: "closed",
} as const;

/**
 * Invoice Status
 */
export const INVOICE_STATUS = {
  GENERATED: "generated",
  EMAILED: "emailed",
  PRINTED: "printed",
  PAID: "paid",
} as const;

/**
 * Activity Actions
 */
export const ACTIVITY_ACTIONS = {
  USER_LOGIN: "USER_LOGIN",
  VENDOR_CREATED: "VENDOR_CREATED",
  VENDOR_UPDATED: "VENDOR_UPDATED",
  RFQ_CREATED: "RFQ_CREATED",
  RFQ_PUBLISHED: "RFQ_PUBLISHED",
  VENDOR_ASSIGNED_TO_RFQ:
    "VENDOR_ASSIGNED_TO_RFQ",
  QUOTATION_SUBMITTED:
    "QUOTATION_SUBMITTED",
  QUOTATION_COMPARISON_VIEWED:
    "QUOTATION_COMPARISON_VIEWED",
  APPROVAL_REQUESTED:
    "APPROVAL_REQUESTED",
  APPROVAL_APPROVED:
    "APPROVAL_APPROVED",
  APPROVAL_REJECTED:
    "APPROVAL_REJECTED",
  PURCHASE_ORDER_GENERATED:
    "PURCHASE_ORDER_GENERATED",
  PURCHASE_ORDER_SENT:
    "PURCHASE_ORDER_SENT",
  INVOICE_GENERATED:
    "INVOICE_GENERATED",
  INVOICE_PRINTED:
    "INVOICE_PRINTED",
  INVOICE_EMAILED:
    "INVOICE_EMAILED",
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
} as const;

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;