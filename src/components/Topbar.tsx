import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          Procurement Dashboard
        </div>

        <div className="topbar-subtitle">
          Welcome back, Procurement Officer
        </div>
      </div>

      <div className="topbar-right">
        <input
          type="text"
          className="topbar-search"
          placeholder="Search vendors, RFQs, invoices..."
        />

        <button
          className="btn btn-primary"
          style={{
            padding: "10px 18px",
          }}
        >
          + Create RFQ
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            P
          </div>

          <div className="user-info">
            <div className="user-name">
              Pavan
            </div>

            <div className="user-role">
              Procurement Officer
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;