// Dashboard Summary
export interface DashboardSummary {
  activeRfqs: number;
  pendingApprovals: number;
  recentPurchaseOrders: number;
  recentInvoices: number;
  totalVendors: number;
  monthlySpending: number;
}

// Vendor Dashboard Summary
export interface VendorDashboardSummary {
  assignedRfqs: number;
  submittedQuotations: number;
  acceptedQuotations: number;
  purchaseOrders: number;
}

// Recent Activity Item
export interface RecentActivity {
  activityLogId: string;
  actorName: string;
  action:
    | "USER_LOGIN"
    | "VENDOR_CREATED"
    | "VENDOR_UPDATED"
    | "RFQ_CREATED"
    | "RFQ_PUBLISHED"
    | "VENDOR_ASSIGNED_TO_RFQ"
    | "QUOTATION_SUBMITTED"
    | "QUOTATION_COMPARISON_VIEWED"
    | "APPROVAL_REQUESTED"
    | "APPROVAL_APPROVED"
    | "APPROVAL_REJECTED"
    | "PURCHASE_ORDER_GENERATED"
    | "PURCHASE_ORDER_SENT"
    | "INVOICE_GENERATED"
    | "INVOICE_PRINTED"
    | "INVOICE_EMAILED";
  message: string;
  createdAt: string;
}

// API Response Wrapper
export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data:
    | DashboardSummary
    | VendorDashboardSummary;
}

export interface RecentActivitiesResponse {
  success: boolean;
  message: string;
  data: {
    items: RecentActivity[];
  };
}