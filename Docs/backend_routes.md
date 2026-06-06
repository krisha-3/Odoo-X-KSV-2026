GET    /health

POST   /auth/signup
POST   /auth/login
GET    /auth/me
POST   /auth/logout

GET    /vendors
POST   /vendors
GET    /vendors/{vendorId}
PATCH  /vendors/{vendorId}
DELETE /vendors/{vendorId}

GET    /rfqs
POST   /rfqs
GET    /rfqs/{rfqId}
PATCH  /rfqs/{rfqId}
POST   /rfqs/{rfqId}/publish
POST   /rfqs/{rfqId}/assign-vendors

GET    /quotations
POST   /quotations
GET    /quotations/{quotationId}
PATCH  /quotations/{quotationId}

GET    /rfqs/{rfqId}/quotation-comparison

GET    /approvals
POST   /approvals
POST   /approvals/{approvalId}/decision

GET    /purchase-orders
POST   /purchase-orders
GET    /purchase-orders/{purchaseOrderId}

GET    /invoices
POST   /invoices
GET    /invoices/{invoiceId}
GET    /invoices/{invoiceId}/pdf
POST   /invoices/{invoiceId}/email

GET    /activity-logs

GET    /dashboard/summary
GET    /dashboard/recent-activities

GET    /reports/procurement-summary
GET    /reports/vendor-performance
GET    /reports/monthly-spending