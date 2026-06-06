import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";

const rfqs = [
  {
    rfqId: "RFQ001",
    title: "Laptop Procurement",
    quantity: 20,
    deadline: "10 Jun 2026",
    status: "active",
  },
  {
    rfqId: "RFQ002",
    title: "Office Chairs",
    quantity: 50,
    deadline: "15 Jun 2026",
    status: "pending",
  },
];

const RFQListPage = () => {
  const columns = [
    { key: "rfqId", title: "RFQ ID" },
    { key: "title", title: "Title" },
    { key: "quantity", title: "Quantity" },
    { key: "deadline", title: "Deadline" },
    {
      key: "status",
      title: "Status",
      render: (row: any) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">RFQs</h1>
          <p className="page-description">Manage procurement requests.</p>
        </div>

        <Button>+ Create RFQ</Button>
      </div>

      <Card title="RFQ Directory">
        <DataTable columns={columns} data={rfqs} />
      </Card>
    </>
  );
};

export default RFQListPage;
