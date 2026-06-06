import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const ApprovalPage = () => {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Approval Workflow</h1>
      </div>

      <Card title="Pending Approvals">
        <table>
          <thead>
            <tr>
              <th>RFQ</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Laptop Procurement</td>
              <td>ABC Tech</td>
              <td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <Button variant="success">Approve</Button>

                    <Button variant="danger">Reject</Button>
                  </div>
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default ApprovalPage;
