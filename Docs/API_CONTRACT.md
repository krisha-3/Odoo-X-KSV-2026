# VendorBridge API Contract

Version: 1.0  
Status: Frozen for Phase 1  
Backend: FastAPI + Pydantic + SQLAlchemy + MySQL + PyMySQL  
Frontend: React + Vite + TypeScript + TanStack Query  
Auth: JWT Bearer Token  
Database Name: `vendorbridge`

---

## 1. Purpose

This document is the single source of truth for all VendorBridge API communication between frontend and backend.

VendorBridge is a Procurement & Vendor Management ERP. The API must support this complete demo spine:

```text
Login -> Vendor Management -> RFQ Creation -> Vendor Assignment -> Quotation Submission -> Quotation Comparison -> Approval -> Purchase Order -> Invoice -> Activity Logs -> Reports
```

No developer or AI tool may rename fields, change routes, change response shape, or introduce new API conventions without team approval.

---

## 2. Global API Rules

### 2.1 Base URL

Local backend:

```text
http://localhost:8000
```

Frontend should store this as:

```text
VITE_API_BASE_URL=http://localhost:8000
```

### 2.2 API Versioning

For hackathon MVP, use unversioned routes:

```text
/vendors
/rfqs
/quotations
```

Optional scalable future versioning:

```text
/api/v1/vendors
```

Do not switch to `/api/v1` during the hackathon unless the whole team agrees.

### 2.3 Content Type

All normal request and response bodies use JSON:

```http
Content-Type: application/json
Accept: application/json
```

File/PDF endpoints may return:

```http
application/pdf
```

### 2.4 Authentication Header

Protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

### 2.5 Naming Rules

| Area | Case | Example |
|---|---|---|
| API JSON keys | camelCase | `purchaseOrderId` |
| Database columns | snake_case | `purchase_order_id` |
| Database tables | snake_case plural | `purchase_orders` |
| Python files/functions | snake_case | `create_purchase_order` |
| Python classes | PascalCase | `PurchaseOrderService` |
| React variables | camelCase | `selectedVendorId` |
| React components | PascalCase | `VendorListPage` |

### 2.6 Forbidden API Names

Do not use these in API JSON:

```text
vendor_id
rfq_id
quotation_id
purchase_order_id
VendorId
vendorID
supplierId
sellerId
quoteId
amount
```

Use these instead:

```text
vendorId
rfqId
quotationId
purchaseOrderId
totalAmount
```

---

## 3. Standard Response Shapes

### 3.1 Success Response

```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": {}
}
```

### 3.2 Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Something went wrong",
    "details": null
  }
}
```

### 3.3 List Response

```json
{
  "success": true,
  "message": "Records fetched successfully",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 0,
      "totalPages": 0,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### 3.4 Empty Data Rule

For empty lists:

```json
{
  "success": true,
  "message": "No records found",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 0,
      "totalPages": 0,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

Never return `null` instead of an empty array for list results.

---

## 4. HTTP Status Code Rules

| Status | Meaning | Usage |
|---:|---|---|
| 200 | OK | Successful GET, PATCH, action endpoint |
| 201 | Created | Successful POST creating a new resource |
| 400 | Bad Request | Invalid state transition or bad input |
| 401 | Unauthorized | Missing/invalid/expired token |
| 403 | Forbidden | Logged in but role not allowed |
| 404 | Not Found | Resource does not exist or not visible to user |
| 409 | Conflict | Duplicate email, duplicate quotation, invalid duplicate action |
| 422 | Validation Error | Pydantic/body validation failed |
| 500 | Server Error | Unexpected backend error |

---

## 5. Error Codes

Use these stable error codes:

```text
VALIDATION_ERROR
AUTH_REQUIRED
INVALID_CREDENTIALS
TOKEN_EXPIRED
FORBIDDEN
NOT_FOUND
CONFLICT
DUPLICATE_EMAIL
DUPLICATE_QUOTATION
INVALID_STATUS_TRANSITION
RFQ_NOT_ASSIGNED_TO_VENDOR
APPROVAL_ALREADY_DECIDED
PO_ALREADY_GENERATED
INVOICE_ALREADY_GENERATED
PDF_GENERATION_FAILED
EMAIL_SEND_FAILED
INTERNAL_SERVER_ERROR
```

Example:

```json
{
  "success": false,
  "error": {
    "code": "RFQ_NOT_ASSIGNED_TO_VENDOR",
    "message": "You are not assigned to this RFQ",
    "details": null
  }
}
```

---

## 6. Roles and Permissions

### 6.1 Roles

```text
admin
procurement_officer
vendor
manager
```

### 6.2 Permission Matrix

| Feature | Admin | Procurement Officer | Vendor | Manager |
|---|---:|---:|---:|---:|
| Login | Yes | Yes | Yes | Yes |
| Dashboard | Yes | Yes | Limited | Yes |
| Manage users | Yes | No | No | No |
| Manage vendors | Yes | Yes | No | View only |
| Create RFQ | Yes | Yes | No | View only |
| Assign vendors | Yes | Yes | No | No |
| Submit quotation | No | No | Yes | No |
| Compare quotations | Yes | Yes | No | Yes |
| Approve/reject | Yes | No | No | Yes |
| Generate PO | Yes | Yes | No | No |
| Generate invoice | Yes | Yes | No | No |
| View own POs | No | No | Yes | No |
| Reports | Yes | Yes | No | Yes |

### 6.3 Security Rules

- Backend permission checks are mandatory.
- Frontend route guards are only for user experience.
- Vendor can only view RFQs assigned to their vendor account.
- Vendor cannot view other vendors' quotations.
- Vendor cannot submit quotation for an unassigned RFQ.
- Manager/admin only can approve or reject approvals.
- Procurement officer/admin only can generate purchase orders and invoices.
- Passwords must be hashed.
- `.env` files must never be committed.
- Error messages must not leak database internals.

---

## 7. Status Values

### 7.1 User Status

```text
active
inactive
blocked
```

### 7.2 Vendor Status

```text
active
inactive
pending
blocked
```

### 7.3 RFQ Status

```text
draft
published
closed
under_review
approved
rejected
po_created
cancelled
```

### 7.4 RFQ Vendor Invitation Status

```text
invited
viewed
submitted
expired
```

### 7.5 Quotation Status

```text
draft
submitted
shortlisted
rejected
accepted
```

### 7.6 Approval Status

```text
pending
approved
rejected
```

### 7.7 Purchase Order Status

```text
draft
issued
sent
cancelled
```

### 7.8 Invoice Status

```text
generated
emailed
printed
paid
cancelled
```

---

## 8. Common Object Shapes

### 8.1 User

```json
{
  "userId": "user_1",
  "name": "Admin User",
  "email": "admin@vendorbridge.com",
  "role": "admin",
  "status": "active",
  "createdAt": "2026-06-06T10:00:00Z",
  "updatedAt": "2026-06-06T10:00:00Z"
}
```

### 8.2 Vendor

```json
{
  "vendorId": "vendor_1",
  "companyName": "ABC Supplies Pvt Ltd",
  "category": "Hardware",
  "gstNumber": "24ABCDE1234F1Z5",
  "contactPerson": "Rahul Shah",
  "email": "vendor@example.com",
  "phone": "9876543210",
  "address": "Ahmedabad, Gujarat",
  "status": "active",
  "rating": 4.5,
  "createdAt": "2026-06-06T10:00:00Z",
  "updatedAt": "2026-06-06T10:00:00Z"
}
```

### 8.3 RFQ

```json
{
  "rfqId": "rfq_1",
  "title": "Office Laptop Procurement",
  "description": "Need laptops and accessories for new team",
  "deadline": "2026-06-20",
  "status": "published",
  "createdBy": "user_2",
  "items": [],
  "assignedVendors": [],
  "createdAt": "2026-06-06T10:00:00Z",
  "updatedAt": "2026-06-06T10:00:00Z"
}
```

### 8.4 RFQ Item

```json
{
  "rfqItemId": "rfq_item_1",
  "itemName": "Laptop",
  "description": "Business laptop",
  "quantity": 10,
  "unit": "piece",
  "expectedPrice": 50000
}
```

### 8.5 Quotation

```json
{
  "quotationId": "quotation_1",
  "rfqId": "rfq_1",
  "vendorId": "vendor_1",
  "vendorName": "ABC Supplies Pvt Ltd",
  "deliveryDays": 7,
  "subtotal": 480000,
  "taxAmount": 86400,
  "totalAmount": 566400,
  "notes": "Includes warranty",
  "status": "submitted",
  "items": [],
  "submittedAt": "2026-06-06T10:00:00Z",
  "createdAt": "2026-06-06T10:00:00Z",
  "updatedAt": "2026-06-06T10:00:00Z"
}
```

### 8.6 Quotation Item

```json
{
  "quotationItemId": "quotation_item_1",
  "rfqItemId": "rfq_item_1",
  "itemName": "Laptop",
  "unitPrice": 48000,
  "quantity": 10,
  "taxRate": 18,
  "subtotal": 480000,
  "taxAmount": 86400,
  "totalPrice": 566400
}
```

### 8.7 Approval

```json
{
  "approvalId": "approval_1",
  "quotationId": "quotation_1",
  "rfqId": "rfq_1",
  "requestedBy": "user_2",
  "approverId": "user_4",
  "status": "pending",
  "remarks": null,
  "createdAt": "2026-06-06T10:00:00Z",
  "decidedAt": null
}
```

### 8.8 Purchase Order

```json
{
  "purchaseOrderId": "po_1",
  "poNumber": "PO-2026-0001",
  "quotationId": "quotation_1",
  "vendorId": "vendor_1",
  "rfqId": "rfq_1",
  "status": "issued",
  "subtotal": 480000,
  "taxAmount": 86400,
  "totalAmount": 566400,
  "createdAt": "2026-06-06T10:00:00Z",
  "updatedAt": "2026-06-06T10:00:00Z"
}
```

### 8.9 Invoice

```json
{
  "invoiceId": "inv_1",
  "invoiceNumber": "INV-2026-0001",
  "purchaseOrderId": "po_1",
  "vendorId": "vendor_1",
  "status": "generated",
  "subtotal": 480000,
  "taxAmount": 86400,
  "totalAmount": 566400,
  "pdfUrl": "/invoices/inv_1/pdf",
  "createdAt": "2026-06-06T10:00:00Z",
  "emailedAt": null
}
```

### 8.10 Activity Log

```json
{
  "activityLogId": "log_1",
  "actorUserId": "user_2",
  "actorName": "Procurement Officer",
  "entityType": "rfq",
  "entityId": "rfq_1",
  "action": "RFQ_CREATED",
  "message": "RFQ created",
  "createdAt": "2026-06-06T10:00:00Z"
}
```

---

## 9. Query Parameters

### 9.1 Pagination

Supported on list endpoints:

```text
?page=1&pageSize=10
```

Rules:

```text
page minimum: 1
pageSize default: 10
pageSize maximum: 100
```

### 9.2 Search

```text
?search=laptop
```

Search should be case-insensitive where practical.

### 9.3 Sorting

```text
?sortBy=createdAt&sortOrder=desc
```

Allowed `sortOrder`:

```text
asc
desc
```

### 9.4 Filtering

Examples:

```text
/vendors?status=active&category=Hardware
/rfqs?status=published
/quotations?rfqId=rfq_1&status=submitted
/invoices?status=generated
```

---

## 10. Health Endpoint

### GET /health

Auth: Public

Response:

```json
{
  "success": true,
  "message": "VendorBridge API is healthy",
  "data": {
    "service": "vendorbridge-api",
    "status": "healthy",
    "database": "connected",
    "timestamp": "2026-06-06T10:00:00Z"
  }
}
```

---

## 11. Auth API

### POST /auth/signup

Auth: Public  
Roles allowed to create through MVP signup: `admin`, `procurement_officer`, `vendor`, `manager`  
Production note: later restrict role selection.

Request:

```json
{
  "name": "Procurement Officer",
  "email": "officer@vendorbridge.com",
  "password": "password123",
  "role": "procurement_officer"
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "user": {
      "userId": "user_2",
      "name": "Procurement Officer",
      "email": "officer@vendorbridge.com",
      "role": "procurement_officer",
      "status": "active"
    }
  }
}
```

### POST /auth/login

Auth: Public

Request:

```json
{
  "email": "officer@vendorbridge.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_access_token_here",
    "tokenType": "bearer",
    "expiresIn": 3600,
    "user": {
      "userId": "user_2",
      "name": "Procurement Officer",
      "email": "officer@vendorbridge.com",
      "role": "procurement_officer",
      "status": "active"
    }
  }
}
```

### GET /auth/me

Auth: Protected

Response:

```json
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": {
    "user": {
      "userId": "user_2",
      "name": "Procurement Officer",
      "email": "officer@vendorbridge.com",
      "role": "procurement_officer",
      "status": "active"
    }
  }
}
```

### POST /auth/logout

Auth: Protected

Response:

```json
{
  "success": true,
  "message": "Logout successful",
  "data": {}
}
```

### POST /auth/forgot-password

Auth: Public  
MVP behavior: simulate email and return success.

Request:

```json
{
  "email": "officer@vendorbridge.com"
}
```

Response:

```json
{
  "success": true,
  "message": "Password reset instructions sent if the email exists",
  "data": {}
}
```

---

## 12. Users API

### GET /users

Auth: Admin

Query:

```text
?page=1&pageSize=10&search=admin&role=admin&status=active
```

Response:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": {
    "items": [
      {
        "userId": "user_1",
        "name": "Admin User",
        "email": "admin@vendorbridge.com",
        "role": "admin",
        "status": "active",
        "createdAt": "2026-06-06T10:00:00Z",
        "updatedAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### PATCH /users/{userId}/status

Auth: Admin

Request:

```json
{
  "status": "blocked"
}
```

Response:

```json
{
  "success": true,
  "message": "User status updated successfully",
  "data": {
    "userId": "user_2",
    "status": "blocked"
  }
}
```

---

## 13. Vendors API

### GET /vendors

Auth: Admin, Procurement Officer, Manager(view)

Query:

```text
?page=1&pageSize=10&search=ABC&status=active&category=Hardware
```

Response:

```json
{
  "success": true,
  "message": "Vendors fetched successfully",
  "data": {
    "items": [
      {
        "vendorId": "vendor_1",
        "companyName": "ABC Supplies Pvt Ltd",
        "category": "Hardware",
        "gstNumber": "24ABCDE1234F1Z5",
        "contactPerson": "Rahul Shah",
        "email": "vendor@example.com",
        "phone": "9876543210",
        "address": "Ahmedabad, Gujarat",
        "status": "active",
        "rating": 4.5,
        "createdAt": "2026-06-06T10:00:00Z",
        "updatedAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /vendors

Auth: Admin, Procurement Officer

Request:

```json
{
  "companyName": "ABC Supplies Pvt Ltd",
  "category": "Hardware",
  "gstNumber": "24ABCDE1234F1Z5",
  "contactPerson": "Rahul Shah",
  "email": "vendor@example.com",
  "phone": "9876543210",
  "address": "Ahmedabad, Gujarat",
  "rating": 4.5
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Vendor created successfully",
  "data": {
    "vendorId": "vendor_1",
    "status": "active"
  }
}
```

### GET /vendors/{vendorId}

Auth: Admin, Procurement Officer, Manager(view)

Response:

```json
{
  "success": true,
  "message": "Vendor fetched successfully",
  "data": {
    "vendorId": "vendor_1",
    "companyName": "ABC Supplies Pvt Ltd",
    "category": "Hardware",
    "gstNumber": "24ABCDE1234F1Z5",
    "contactPerson": "Rahul Shah",
    "email": "vendor@example.com",
    "phone": "9876543210",
    "address": "Ahmedabad, Gujarat",
    "status": "active",
    "rating": 4.5,
    "createdAt": "2026-06-06T10:00:00Z",
    "updatedAt": "2026-06-06T10:00:00Z"
  }
}
```

### PATCH /vendors/{vendorId}

Auth: Admin, Procurement Officer

Request:

```json
{
  "companyName": "ABC Supplies Pvt Ltd",
  "category": "Hardware",
  "gstNumber": "24ABCDE1234F1Z5",
  "contactPerson": "Rahul Shah",
  "email": "vendor@example.com",
  "phone": "9876543210",
  "address": "Ahmedabad, Gujarat",
  "status": "active",
  "rating": 4.7
}
```

Response:

```json
{
  "success": true,
  "message": "Vendor updated successfully",
  "data": {
    "vendorId": "vendor_1",
    "status": "active"
  }
}
```

### DELETE /vendors/{vendorId}

Auth: Admin, Procurement Officer  
MVP behavior: soft delete or status change to `inactive`.

Response:

```json
{
  "success": true,
  "message": "Vendor deleted successfully",
  "data": {
    "vendorId": "vendor_1"
  }
}
```

---

## 14. RFQs API

### GET /rfqs

Auth: Admin, Procurement Officer, Manager, Vendor(limited assigned only)

Query:

```text
?page=1&pageSize=10&search=laptop&status=published
```

Response:

```json
{
  "success": true,
  "message": "RFQs fetched successfully",
  "data": {
    "items": [
      {
        "rfqId": "rfq_1",
        "title": "Office Laptop Procurement",
        "description": "Need laptops and accessories for new team",
        "deadline": "2026-06-20",
        "status": "published",
        "createdBy": "user_2",
        "createdAt": "2026-06-06T10:00:00Z",
        "updatedAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /rfqs

Auth: Admin, Procurement Officer

Request:

```json
{
  "title": "Office Laptop Procurement",
  "description": "Need laptops and accessories for new team",
  "deadline": "2026-06-20",
  "items": [
    {
      "itemName": "Laptop",
      "description": "Business laptop",
      "quantity": 10,
      "unit": "piece",
      "expectedPrice": 50000
    },
    {
      "itemName": "Mouse",
      "description": "Wireless mouse",
      "quantity": 10,
      "unit": "piece",
      "expectedPrice": 800
    }
  ],
  "vendorIds": ["vendor_1", "vendor_2"]
}
```

Response `201`:

```json
{
  "success": true,
  "message": "RFQ created successfully",
  "data": {
    "rfqId": "rfq_1",
    "status": "published"
  }
}
```

### GET /rfqs/{rfqId}

Auth: Admin, Procurement Officer, Manager, Vendor(if assigned)

Response:

```json
{
  "success": true,
  "message": "RFQ fetched successfully",
  "data": {
    "rfqId": "rfq_1",
    "title": "Office Laptop Procurement",
    "description": "Need laptops and accessories for new team",
    "deadline": "2026-06-20",
    "status": "published",
    "createdBy": "user_2",
    "items": [
      {
        "rfqItemId": "rfq_item_1",
        "itemName": "Laptop",
        "description": "Business laptop",
        "quantity": 10,
        "unit": "piece",
        "expectedPrice": 50000
      }
    ],
    "assignedVendors": [
      {
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "invitationStatus": "invited"
      }
    ],
    "createdAt": "2026-06-06T10:00:00Z",
    "updatedAt": "2026-06-06T10:00:00Z"
  }
}
```

### PATCH /rfqs/{rfqId}

Auth: Admin, Procurement Officer  
Allowed only before final closure/PO creation.

Request:

```json
{
  "title": "Office Laptop Procurement",
  "description": "Updated description",
  "deadline": "2026-06-25",
  "status": "draft"
}
```

Response:

```json
{
  "success": true,
  "message": "RFQ updated successfully",
  "data": {
    "rfqId": "rfq_1",
    "status": "draft"
  }
}
```

### POST /rfqs/{rfqId}/publish

Auth: Admin, Procurement Officer

Request:

```json
{}
```

Response:

```json
{
  "success": true,
  "message": "RFQ published successfully",
  "data": {
    "rfqId": "rfq_1",
    "status": "published"
  }
}
```

### POST /rfqs/{rfqId}/assign-vendors

Auth: Admin, Procurement Officer

Request:

```json
{
  "vendorIds": ["vendor_1", "vendor_2"]
}
```

Response:

```json
{
  "success": true,
  "message": "Vendors assigned successfully",
  "data": {
    "rfqId": "rfq_1",
    "assignedVendorIds": ["vendor_1", "vendor_2"],
    "status": "published"
  }
}
```

---

## 15. Quotations API

### GET /quotations

Auth: Admin, Procurement Officer, Manager, Vendor(own only)

Query:

```text
?page=1&pageSize=10&rfqId=rfq_1&vendorId=vendor_1&status=submitted
```

Response:

```json
{
  "success": true,
  "message": "Quotations fetched successfully",
  "data": {
    "items": [
      {
        "quotationId": "quotation_1",
        "rfqId": "rfq_1",
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "deliveryDays": 7,
        "subtotal": 480000,
        "taxAmount": 86400,
        "totalAmount": 566400,
        "status": "submitted",
        "submittedAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /quotations

Auth: Vendor

Rules:

- Vendor must be assigned to the RFQ.
- Vendor cannot submit quotation for another vendor.
- One submitted quotation per vendor per RFQ for MVP.
- Backend calculates subtotal, taxAmount, and totalAmount.

Request:

```json
{
  "rfqId": "rfq_1",
  "vendorId": "vendor_1",
  "deliveryDays": 7,
  "notes": "Includes warranty",
  "items": [
    {
      "rfqItemId": "rfq_item_1",
      "unitPrice": 48000,
      "quantity": 10,
      "taxRate": 18
    }
  ]
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Quotation submitted successfully",
  "data": {
    "quotationId": "quotation_1",
    "subtotal": 480000,
    "taxAmount": 86400,
    "totalAmount": 566400,
    "status": "submitted"
  }
}
```

### GET /quotations/{quotationId}

Auth: Admin, Procurement Officer, Manager, Vendor(owner only)

Response:

```json
{
  "success": true,
  "message": "Quotation fetched successfully",
  "data": {
    "quotationId": "quotation_1",
    "rfqId": "rfq_1",
    "vendorId": "vendor_1",
    "vendorName": "ABC Supplies Pvt Ltd",
    "deliveryDays": 7,
    "subtotal": 480000,
    "taxAmount": 86400,
    "totalAmount": 566400,
    "notes": "Includes warranty",
    "status": "submitted",
    "items": [
      {
        "quotationItemId": "quotation_item_1",
        "rfqItemId": "rfq_item_1",
        "itemName": "Laptop",
        "unitPrice": 48000,
        "quantity": 10,
        "taxRate": 18,
        "subtotal": 480000,
        "taxAmount": 86400,
        "totalPrice": 566400
      }
    ],
    "submittedAt": "2026-06-06T10:00:00Z",
    "createdAt": "2026-06-06T10:00:00Z",
    "updatedAt": "2026-06-06T10:00:00Z"
  }
}
```

### PATCH /quotations/{quotationId}

Auth: Vendor(owner only)  
Allowed only while quotation status is `draft`. For MVP, submitted quotations are not editable.

Request:

```json
{
  "deliveryDays": 8,
  "notes": "Updated delivery estimate"
}
```

Response:

```json
{
  "success": true,
  "message": "Quotation updated successfully",
  "data": {
    "quotationId": "quotation_1",
    "status": "draft"
  }
}
```

### GET /rfqs/{rfqId}/quotation-comparison

Auth: Admin, Procurement Officer, Manager

Response:

```json
{
  "success": true,
  "message": "Quotation comparison fetched successfully",
  "data": {
    "rfqId": "rfq_1",
    "rfqTitle": "Office Laptop Procurement",
    "quotations": [
      {
        "quotationId": "quotation_1",
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "totalAmount": 566400,
        "deliveryDays": 7,
        "vendorRating": 4.5,
        "isLowestPrice": true,
        "isFastestDelivery": true,
        "status": "submitted"
      }
    ]
  }
}
```

---

## 16. Approvals API

### GET /approvals

Auth: Admin, Manager, Procurement Officer(view own requests)

Query:

```text
?page=1&pageSize=10&status=pending
```

Response:

```json
{
  "success": true,
  "message": "Approvals fetched successfully",
  "data": {
    "items": [
      {
        "approvalId": "approval_1",
        "quotationId": "quotation_1",
        "rfqId": "rfq_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "totalAmount": 566400,
        "requestedBy": "user_2",
        "approverId": "user_4",
        "status": "pending",
        "remarks": null,
        "createdAt": "2026-06-06T10:00:00Z",
        "decidedAt": null
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /approvals

Auth: Admin, Procurement Officer

Request:

```json
{
  "quotationId": "quotation_1",
  "approverId": "user_4"
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Approval request created successfully",
  "data": {
    "approvalId": "approval_1",
    "status": "pending"
  }
}
```

### GET /approvals/{approvalId}

Auth: Admin, Manager, Procurement Officer(view own requests)

Response:

```json
{
  "success": true,
  "message": "Approval fetched successfully",
  "data": {
    "approvalId": "approval_1",
    "quotationId": "quotation_1",
    "rfqId": "rfq_1",
    "vendorName": "ABC Supplies Pvt Ltd",
    "totalAmount": 566400,
    "requestedBy": "user_2",
    "approverId": "user_4",
    "status": "pending",
    "remarks": null,
    "timeline": [
      {
        "status": "pending",
        "message": "Approval requested",
        "createdAt": "2026-06-06T10:00:00Z"
      }
    ],
    "createdAt": "2026-06-06T10:00:00Z",
    "decidedAt": null
  }
}
```

### POST /approvals/{approvalId}/decision

Auth: Admin, Manager

Request:

```json
{
  "status": "approved",
  "remarks": "Best price and acceptable delivery timeline"
}
```

Allowed `status` values:

```text
approved
rejected
```

Response:

```json
{
  "success": true,
  "message": "Approval decision submitted",
  "data": {
    "approvalId": "approval_1",
    "status": "approved"
  }
}
```

---

## 17. Purchase Orders API

### GET /purchase-orders

Auth: Admin, Procurement Officer, Vendor(own only)

Query:

```text
?page=1&pageSize=10&status=issued&vendorId=vendor_1
```

Response:

```json
{
  "success": true,
  "message": "Purchase orders fetched successfully",
  "data": {
    "items": [
      {
        "purchaseOrderId": "po_1",
        "poNumber": "PO-2026-0001",
        "quotationId": "quotation_1",
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "rfqId": "rfq_1",
        "status": "issued",
        "subtotal": 480000,
        "taxAmount": 86400,
        "totalAmount": 566400,
        "createdAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /purchase-orders

Auth: Admin, Procurement Officer

Rules:

- Quotation must be approved.
- Purchase order must not already exist for the quotation.
- Backend generates `poNumber`.

Request:

```json
{
  "quotationId": "quotation_1"
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Purchase order generated successfully",
  "data": {
    "purchaseOrderId": "po_1",
    "poNumber": "PO-2026-0001",
    "status": "issued"
  }
}
```

### GET /purchase-orders/{purchaseOrderId}

Auth: Admin, Procurement Officer, Vendor(owner only)

Response:

```json
{
  "success": true,
  "message": "Purchase order fetched successfully",
  "data": {
    "purchaseOrderId": "po_1",
    "poNumber": "PO-2026-0001",
    "quotationId": "quotation_1",
    "vendorId": "vendor_1",
    "vendorName": "ABC Supplies Pvt Ltd",
    "rfqId": "rfq_1",
    "status": "issued",
    "subtotal": 480000,
    "taxAmount": 86400,
    "totalAmount": 566400,
    "items": [
      {
        "itemName": "Laptop",
        "quantity": 10,
        "unitPrice": 48000,
        "taxRate": 18,
        "totalPrice": 566400
      }
    ],
    "createdAt": "2026-06-06T10:00:00Z",
    "updatedAt": "2026-06-06T10:00:00Z"
  }
}
```

### POST /purchase-orders/{purchaseOrderId}/send

Auth: Admin, Procurement Officer  
MVP behavior: simulate sending and update status to `sent`.

Request:

```json
{}
```

Response:

```json
{
  "success": true,
  "message": "Purchase order sent successfully",
  "data": {
    "purchaseOrderId": "po_1",
    "status": "sent"
  }
}
```

---

## 18. Invoices API

### GET /invoices

Auth: Admin, Procurement Officer, Vendor(own only)

Query:

```text
?page=1&pageSize=10&status=generated&vendorId=vendor_1
```

Response:

```json
{
  "success": true,
  "message": "Invoices fetched successfully",
  "data": {
    "items": [
      {
        "invoiceId": "inv_1",
        "invoiceNumber": "INV-2026-0001",
        "purchaseOrderId": "po_1",
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "status": "generated",
        "subtotal": 480000,
        "taxAmount": 86400,
        "totalAmount": 566400,
        "pdfUrl": "/invoices/inv_1/pdf",
        "createdAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### POST /invoices

Auth: Admin, Procurement Officer

Rules:

- Purchase order must exist.
- Invoice must not already exist for the purchase order.
- Backend generates `invoiceNumber`.

Request:

```json
{
  "purchaseOrderId": "po_1"
}
```

Response `201`:

```json
{
  "success": true,
  "message": "Invoice generated successfully",
  "data": {
    "invoiceId": "inv_1",
    "invoiceNumber": "INV-2026-0001",
    "status": "generated"
  }
}
```

### GET /invoices/{invoiceId}

Auth: Admin, Procurement Officer, Vendor(owner only)

Response:

```json
{
  "success": true,
  "message": "Invoice fetched successfully",
  "data": {
    "invoiceId": "inv_1",
    "invoiceNumber": "INV-2026-0001",
    "purchaseOrderId": "po_1",
    "vendorId": "vendor_1",
    "vendorName": "ABC Supplies Pvt Ltd",
    "status": "generated",
    "subtotal": 480000,
    "taxAmount": 86400,
    "totalAmount": 566400,
    "pdfUrl": "/invoices/inv_1/pdf",
    "items": [
      {
        "itemName": "Laptop",
        "quantity": 10,
        "unitPrice": 48000,
        "taxRate": 18,
        "totalPrice": 566400
      }
    ],
    "createdAt": "2026-06-06T10:00:00Z",
    "emailedAt": null
  }
}
```

### GET /invoices/{invoiceId}/pdf

Auth: Admin, Procurement Officer, Vendor(owner only)

Response:

```http
Content-Type: application/pdf
```

Fallback rule: if PDF generation fails, frontend should show printable invoice page.

### POST /invoices/{invoiceId}/email

Auth: Admin, Procurement Officer

MVP behavior: simulate email send and create activity log.

Request:

```json
{
  "emailTo": "vendor@example.com",
  "message": "Please find the attached invoice."
}
```

Response:

```json
{
  "success": true,
  "message": "Invoice email simulated successfully",
  "data": {
    "invoiceId": "inv_1",
    "status": "emailed",
    "emailedAt": "2026-06-06T10:00:00Z"
  }
}
```

### POST /invoices/{invoiceId}/mark-printed

Auth: Admin, Procurement Officer

Request:

```json
{}
```

Response:

```json
{
  "success": true,
  "message": "Invoice marked as printed",
  "data": {
    "invoiceId": "inv_1",
    "status": "printed"
  }
}
```

---

## 19. Activity Logs API

### GET /activity-logs

Auth: Admin, Procurement Officer, Manager  
Vendor may see own related logs only if implemented.

Query:

```text
?page=1&pageSize=10&entityType=rfq&entityId=rfq_1
```

Response:

```json
{
  "success": true,
  "message": "Activity logs fetched successfully",
  "data": {
    "items": [
      {
        "activityLogId": "log_1",
        "actorUserId": "user_2",
        "actorName": "Procurement Officer",
        "entityType": "rfq",
        "entityId": "rfq_1",
        "action": "RFQ_CREATED",
        "message": "RFQ created",
        "createdAt": "2026-06-06T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrevious": false
    }
  }
}
```

### 19.1 Required Activity Actions

```text
USER_LOGIN
VENDOR_CREATED
VENDOR_UPDATED
RFQ_CREATED
RFQ_PUBLISHED
VENDOR_ASSIGNED_TO_RFQ
QUOTATION_SUBMITTED
QUOTATION_COMPARISON_VIEWED
APPROVAL_REQUESTED
APPROVAL_APPROVED
APPROVAL_REJECTED
PURCHASE_ORDER_GENERATED
PURCHASE_ORDER_SENT
INVOICE_GENERATED
INVOICE_PRINTED
INVOICE_EMAILED
```

---

## 20. Dashboard API

### GET /dashboard/summary

Auth: Admin, Procurement Officer, Manager, Vendor(limited)

Response for admin/procurement/manager:

```json
{
  "success": true,
  "message": "Dashboard summary fetched successfully",
  "data": {
    "activeRfqs": 4,
    "pendingApprovals": 2,
    "recentPurchaseOrders": 3,
    "recentInvoices": 3,
    "totalVendors": 8,
    "monthlySpending": 1250000
  }
}
```

Response for vendor:

```json
{
  "success": true,
  "message": "Dashboard summary fetched successfully",
  "data": {
    "assignedRfqs": 2,
    "submittedQuotations": 1,
    "acceptedQuotations": 1,
    "purchaseOrders": 1
  }
}
```

### GET /dashboard/recent-activities

Auth: Admin, Procurement Officer, Manager, Vendor(limited)

Response:

```json
{
  "success": true,
  "message": "Recent activities fetched successfully",
  "data": {
    "items": [
      {
        "activityLogId": "log_1",
        "actorName": "Procurement Officer",
        "action": "RFQ_CREATED",
        "message": "RFQ created",
        "createdAt": "2026-06-06T10:00:00Z"
      }
    ]
  }
}
```

---

## 21. Reports API

### GET /reports/procurement-summary

Auth: Admin, Procurement Officer, Manager

Query:

```text
?fromDate=2026-06-01&toDate=2026-06-30
```

Response:

```json
{
  "success": true,
  "message": "Procurement summary fetched successfully",
  "data": {
    "totalRfqs": 10,
    "totalQuotations": 24,
    "approvedQuotations": 6,
    "purchaseOrdersGenerated": 6,
    "invoicesGenerated": 6,
    "totalSpending": 2400000
  }
}
```

### GET /reports/vendor-performance

Auth: Admin, Procurement Officer, Manager

Response:

```json
{
  "success": true,
  "message": "Vendor performance fetched successfully",
  "data": {
    "items": [
      {
        "vendorId": "vendor_1",
        "vendorName": "ABC Supplies Pvt Ltd",
        "rating": 4.5,
        "quotationsSubmitted": 5,
        "quotationsAccepted": 2,
        "averageDeliveryDays": 7,
        "totalBusinessValue": 1200000
      }
    ]
  }
}
```

### GET /reports/monthly-spending

Auth: Admin, Procurement Officer, Manager

Response:

```json
{
  "success": true,
  "message": "Monthly spending fetched successfully",
  "data": {
    "items": [
      {
        "month": "2026-06",
        "totalSpending": 1250000,
        "purchaseOrderCount": 4,
        "invoiceCount": 4
      }
    ]
  }
}
```

---

## 22. Attachments API Optional MVP

Attachments are optional. If time is short, keep only a placeholder field in RFQ UI and skip backend upload.

### POST /attachments

Auth: Admin, Procurement Officer, Vendor

Request type:

```http
multipart/form-data
```

Response:

```json
{
  "success": true,
  "message": "Attachment uploaded successfully",
  "data": {
    "attachmentId": "att_1",
    "fileName": "specification.pdf",
    "fileUrl": "/attachments/att_1"
  }
}
```

---

## 23. State Transition Rules

### 23.1 RFQ

```text
draft -> published
published -> under_review
under_review -> approved
under_review -> rejected
approved -> po_created
published -> closed
any non-final -> cancelled
```

### 23.2 Quotation

```text
draft -> submitted
submitted -> shortlisted
submitted -> rejected
shortlisted -> accepted
shortlisted -> rejected
```

### 23.3 Approval

```text
pending -> approved
pending -> rejected
```

No transition allowed after `approved` or `rejected`.

### 23.4 Purchase Order

```text
draft -> issued
issued -> sent
issued -> cancelled
```

### 23.5 Invoice

```text
generated -> emailed
generated -> printed
emailed -> paid
printed -> paid
any non-paid -> cancelled
```

---

## 24. Performance and Fast Response Rules

The backend should follow these rules for fast response and scalability:

1. Use pagination on all list endpoints.
2. Do not return huge nested objects in list endpoints.
3. Return details only in `GET /resource/{id}` endpoints.
4. Add database indexes for common filters:
   - `users.email`
   - `vendors.email`
   - `vendors.status`
   - `rfqs.status`
   - `quotations.rfq_id`
   - `quotations.vendor_id`
   - `approvals.status`
   - `purchase_orders.vendor_id`
   - `invoices.vendor_id`
   - `activity_logs.entity_type, activity_logs.entity_id`
5. Avoid N+1 queries in comparison, dashboard, and reports endpoints.
6. Calculate totals on backend, not only frontend.
7. Use frontend TanStack Query caching for list/detail screens.
8. Keep PDF generation on demand, not during every invoice list fetch.
9. Keep email as simulated/logged action for MVP unless SMTP is stable.

---

## 25. Validation Rules

### 25.1 Common Validation

```text
email: valid email format
password: minimum 8 characters
name: required, 2-100 characters
phone: 10-15 characters
quantity: greater than 0
unitPrice: greater than or equal to 0
taxRate: 0 to 100
deliveryDays: greater than 0
deadline: valid future or current date
remarks: maximum 500 characters
notes: maximum 1000 characters
```

### 25.2 Total Calculation

Backend calculation:

```text
itemSubtotal = unitPrice * quantity
itemTaxAmount = itemSubtotal * taxRate / 100
itemTotal = itemSubtotal + itemTaxAmount
subtotal = sum(itemSubtotal)
taxAmount = sum(itemTaxAmount)
totalAmount = subtotal + taxAmount
```

Frontend may preview totals, but backend is final authority.

---

## 26. Demo Seed Accounts

Use these accounts for demo and testing:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@vendorbridge.com` | `password123` |
| Procurement Officer | `officer@vendorbridge.com` | `password123` |
| Vendor | `vendor@vendorbridge.com` | `password123` |
| Manager | `manager@vendorbridge.com` | `password123` |

---

## 27. Frontend Integration Rules

1. All requests go through `apps/web/src/lib/apiClient.ts`.
2. Do not call `fetch` directly inside pages unless approved.
3. Store access token using `authStorage.ts`.
4. Use TanStack Query for server data.
5. Every API screen must have loading, error, empty, and success states.
6. Do not rename API response keys in frontend.
7. If backend returns `success: false`, display `error.message`.

---

## 28. Backend Implementation Rules

1. Routers live inside `apps/api/app/modules/<module>/router.py`.
2. Pydantic schemas live in `schemas.py`.
3. SQLAlchemy models live in `model.py`.
4. Business logic lives in `service.py`.
5. Auth helpers live in `app/core/security.py`.
6. Role checks live in `app/core/permissions.py`.
7. Database connection lives in `app/db/database.py`.
8. Do not return raw SQLAlchemy objects directly.
9. Convert all datetime values to ISO strings.
10. Use consistent success/error wrappers.

---

## 29. Contract Freeze Rule

This API contract is frozen for team development. Any change must be approved by all active members and updated in:

```text
docs/API_CONTRACT.md
docs/NAMING.md
docs/DECISIONS.md
```

Allowed without approval:

```text
- Adding optional response fields that do not break existing frontend code
- Adding new endpoints for bonus features after MVP works
```

Not allowed without approval:

```text
- Renaming fields
- Changing route names
- Changing status values
- Changing response wrapper
- Changing database technology
- Changing auth mechanism
```

---

## 30. MVP Endpoint Checklist

Phase 1:

```text
GET /health
POST /auth/signup
POST /auth/login
GET /auth/me
```

Phase 2:

```text
GET /dashboard/summary
GET /vendors
POST /vendors
GET /vendors/{vendorId}
PATCH /vendors/{vendorId}
```

Phase 3:

```text
GET /rfqs
POST /rfqs
GET /rfqs/{rfqId}
POST /rfqs/{rfqId}/assign-vendors
```

Phase 4:

```text
POST /quotations
GET /quotations
GET /rfqs/{rfqId}/quotation-comparison
```

Phase 5:

```text
POST /approvals
GET /approvals
POST /approvals/{approvalId}/decision
```

Phase 6:

```text
POST /purchase-orders
GET /purchase-orders/{purchaseOrderId}
POST /invoices
GET /invoices/{invoiceId}
GET /invoices/{invoiceId}/pdf
POST /invoices/{invoiceId}/email
```

Phase 7:

```text
GET /activity-logs
GET /dashboard/recent-activities
GET /reports/procurement-summary
GET /reports/vendor-performance
GET /reports/monthly-spending
```

---

## 31. AI Prompt Guardrail

Use this prompt when generating backend or frontend code:

```text
You are working on VendorBridge.
Follow docs/API_CONTRACT.md exactly.
Use MySQL + SQLAlchemy on the backend.
Use FastAPI response models with Pydantic.
API JSON must use camelCase.
Database columns must use snake_case.
Do not rename fields, routes, statuses, or response wrappers.
Do not introduce new libraries.
Work only inside the specified module path.
```
