import Card from "../../components/ui/Card";

const quotations = [
  {
    vendor: "ABC Tech",
    price: "₹50,000",
    delivery: "10 Days",
  },
  {
    vendor: "XYZ Solutions",
    price: "₹47,000",
    delivery: "14 Days",
  },
  {
    vendor: "PQR Systems",
    price: "₹52,000",
    delivery: "8 Days",
  },
];

const QuotationComparisonPage = () => {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quotation Comparison</h1>
        </div>
      </div>

      <Card title="Compare Vendor Quotations">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Price</th>
              <th>Delivery</th>
            </tr>
          </thead>

          <tbody>
            {quotations.map((q) => (
              <tr key={q.vendor}>
                <td>{q.vendor}</td>
                <td>{q.price}</td>
                <td>{q.delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default QuotationComparisonPage;
