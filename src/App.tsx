// import "./App.css";

// const stats = [
//   {
//     title: "Total Vendors",
//     value: "128",
//     change: "+12%",
//   },
//   {
//     title: "Active RFQs",
//     value: "42",
//     change: "+8%",
//   },
//   {
//     title: "Pending Approvals",
//     value: "18",
//     change: "-2%",
//   },
//   {
//     title: "Purchase Orders",
//     value: "76",
//     change: "+15%",
//   },
//   {
//     title: "Invoices",
//     value: "154",
//     change: "+21%",
//   },
// ];

// const rfqs = [
//   {
//     id: "RFQ-1001",
//     title: "Office Laptop Procurement",
//     vendor: "ABC Technologies",
//     status: "Pending",
//   },
//   {
//     id: "RFQ-1002",
//     title: "Office Furniture",
//     vendor: "WoodCraft Pvt Ltd",
//     status: "Approved",
//   },
//   {
//     id: "RFQ-1003",
//     title: "Cloud Infrastructure",
//     vendor: "Azure Services",
//     status: "Review",
//   },
// ];

// const invoices = [
//   {
//     id: "INV-2001",
//     vendor: "ABC Technologies",
//     amount: "₹4,25,000",
//     status: "Paid",
//   },
//   {
//     id: "INV-2002",
//     vendor: "WoodCraft Pvt Ltd",
//     amount: "₹1,85,000",
//     status: "Pending",
//   },
//   {
//     id: "INV-2003",
//     vendor: "Azure Services",
//     amount: "₹3,60,000",
//     status: "Paid",
//   },
// ];

// function App() {
//   return (
//     <div className="app-layout">
//       {/* SIDEBAR */}
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <div>
//             <div className="sidebar-logo">
//               VendorBridge
//             </div>

//             <div className="sidebar-subtitle">
//               Procurement ERP
//             </div>
//           </div>
//         </div>

//         <div className="sidebar-menu">
//           <div className="sidebar-item active">
//             📊 <span className="sidebar-label">Dashboard</span>
//           </div>

//           <div className="sidebar-item">
//             🏢 <span className="sidebar-label">Vendors</span>
//           </div>

//           <div className="sidebar-item">
//             📄 <span className="sidebar-label">RFQs</span>
//           </div>

//           <div className="sidebar-item">
//             💰 <span className="sidebar-label">Quotations</span>
//           </div>

//           <div className="sidebar-item">
//             ✅ <span className="sidebar-label">Approvals</span>
//           </div>

//           <div className="sidebar-item">
//             🛒{" "}
//             <span className="sidebar-label">
//               Purchase Orders
//             </span>
//           </div>

//           <div className="sidebar-item">
//             🧾 <span className="sidebar-label">Invoices</span>
//           </div>

//           <div className="sidebar-item">
//             📈 <span className="sidebar-label">Reports</span>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <div className="main-wrapper">
//         {/* TOPBAR */}
//         <header className="topbar">
//           <div>
//             <div className="topbar-title">
//               Procurement Dashboard
//             </div>

//             <div className="topbar-subtitle">
//               Welcome back, Procurement Officer
//             </div>
//           </div>

//           <div className="topbar-user">
//             <div className="user-avatar">P</div>

//             <div className="user-info">
//               <div className="user-name">
//                 Pavan
//               </div>

//               <div className="user-role">
//                 Procurement Officer
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* CONTENT */}
//         <main className="page-content">
//           <div className="page-header">
//             <div>
//               <div className="page-title">
//                 Dashboard Overview
//               </div>

//               <div className="page-description">
//                 Monitor procurement operations,
//                 approvals and vendor activities.
//               </div>
//             </div>

//             <button className="btn btn-primary">
//               + Create RFQ
//             </button>
//           </div>

//           {/* STATS */}
//           <div className="stats-grid">
//             {stats.map((item) => (
//               <div
//                 key={item.title}
//                 className="stat-card"
//               >
//                 <div className="stat-label">
//                   {item.title}
//                 </div>

//                 <div className="stat-value">
//                   {item.value}
//                 </div>

//                 <div className="stat-growth">
//                   {item.change}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* GRID */}
//           <div className="dashboard-grid">
//             <div className="dashboard-section">
//               <div className="section-title">
//                 Recent RFQs
//               </div>

//               <div className="table-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>RFQ ID</th>
//                       <th>Title</th>
//                       <th>Vendor</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {rfqs.map((rfq) => (
//                       <tr key={rfq.id}>
//                         <td>{rfq.id}</td>
//                         <td>{rfq.title}</td>
//                         <td>{rfq.vendor}</td>
//                         <td>
//                           <span className="badge badge-warning">
//                             {rfq.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             <div className="dashboard-section">
//               <div className="section-title">
//                 Quick Actions
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "12px",
//                 }}
//               >
//                 <button className="btn btn-primary">
//                   Create Vendor
//                 </button>

//                 <button className="btn btn-success">
//                   Create RFQ
//                 </button>

//                 <button className="btn btn-warning">
//                   Compare Quotations
//                 </button>

//                 <button className="btn btn-danger">
//                   Pending Approvals
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* INVOICES */}
//           <div
//             className="dashboard-section"
//             style={{ marginTop: "24px" }}
//           >
//             <div className="section-title">
//               Recent Invoices
//             </div>

//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Invoice</th>
//                     <th>Vendor</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {invoices.map((invoice) => (
//                     <tr key={invoice.id}>
//                       <td>{invoice.id}</td>
//                       <td>{invoice.vendor}</td>
//                       <td>{invoice.amount}</td>
//                       <td>
//                         <span className="badge badge-success">
//                           {invoice.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

import AppShell from "./components/AppShell";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import StatusBadge from "./components/ui/StatusBadge";

function App() {
  return (
    <AppShell>
      <Card
        title="VendorBridge ERP"
        subtitle="Component Test"
      >
        <p>
          If you can see this card,
          AppShell is working.
        </p>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "12px",
          }}
        >
          <Button>
            Primary
          </Button>

          <Button variant="success">
            Success
          </Button>

          <Button variant="warning">
            Warning
          </Button>

          <Button variant="danger">
            Danger
          </Button>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "12px",
          }}
        >
          <StatusBadge status="approved" />
          <StatusBadge status="pending" />
          <StatusBadge status="rejected" />
        </div>
      </Card>
    </AppShell>
  );
}

export default App;