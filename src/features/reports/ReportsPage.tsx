import Card from "../../components/ui/Card";

const ReportsPage = () => {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
      </div>

      <div className="stats-grid">
        <Card>
          <div className="stat-label">Total Vendors</div>

          <div className="stat-value">128</div>
        </Card>

        <Card>
          <div className="stat-label">Total RFQs</div>

          <div className="stat-value">42</div>
        </Card>

        <Card>
          <div className="stat-label">Monthly Spending</div>

          <div className="stat-value">₹8.5L</div>
        </Card>
      </div>
    </>
  );
};

export default ReportsPage;
