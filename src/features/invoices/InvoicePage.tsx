import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const InvoicePage = () => {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Invoices</h1>
      </div>

      <Card title="Generated Invoices">
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>INV001</td>
              <td>ABC Tech</td>
              <td>₹50,000</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Button >Print</Button>

                  <Button variant="success">Email</Button>
                </div>
                <td></td>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default InvoicePage;
