import React from "react";

// const menuItems = [
//   { label: "Dashboard", icon: "📊", active: true },
//   { label: "Vendors", icon: "🏢" },
//   { label: "RFQs", icon: "📄" },
//   { label: "Quotations", icon: "💰" },
//   { label: "Approvals", icon: "✅" },
//   { label: "Purchase Orders", icon: "🛒" },
//   { label: "Invoices", icon: "🧾" },
//   { label: "Activity Logs", icon: "📋" },
//   { label: "Reports", icon: "📈" },
// ];

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "📊",
  },
  {
    key: "vendors",
    label: "Vendors",
    icon: "🏢",
  },
  {
    key: "rfqs",
    label: "RFQs",
    icon: "📄",
  },
  {
    key: "quotations",
    label: "Quotations",
    icon: "💰",
  },
  {
    key: "approvals",
    label: "Approvals",
    icon: "✅",
  },
  {
    key: "purchaseOrders",
    label: "Purchase Orders",
    icon: "🛒",
  },
  {
    key: "invoices",
    label: "Invoices",
    icon: "🧾",
  },
  {
    key: "reports",
    label: "Reports",
    icon: "📈",
  },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <div className="sidebar-logo">VendorBridge</div>

          <div className="sidebar-subtitle">Procurement ERP</div>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-section">
          <div className="sidebar-section-title">MAIN MENU</div>

          {/* {menuItems.map((item) => (
            <div
              key={item.label}
              className={`sidebar-item ${item.active ? "active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>

              <span className="sidebar-label">{item.label}</span>
            </div>
          ))} */}
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`sidebar-item ${
                currentPage === item.key ? "active" : ""
              }`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>

              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "14px",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            Procurement Officer
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Manage RFQs, quotations and approvals.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
