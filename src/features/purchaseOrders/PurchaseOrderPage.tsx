import Card from "../../components/ui/Card";

const PurchaseOrderPage = () => {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Purchase Orders</h1>
      </div>

      <Card title="Generated Purchase Orders">
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Vendor</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>PO001</td>
              <td>ABC Tech</td>
              <td>₹50,000</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default PurchaseOrderPage;
