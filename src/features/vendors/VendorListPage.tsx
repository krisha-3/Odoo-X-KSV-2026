import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";

import { getVendors, deleteVendor } from "./vendor.api";

import type { Vendor } from "./vendor.types";

interface Props {
  onAddVendor: () => void;
}

const VendorListPage = ({ onAddVendor }: Props) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    try {
      const response = await getVendors({
        page: 1,
        limit: 20,
      });

      setVendors(response.data.items);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDeleteVendor = async (vendorId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vendor?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVendor(vendorId);

      setVendors((prev) =>
        prev.filter((vendor) => vendor.vendorId !== vendorId),
      );
    } catch (error) {
      console.error("Failed to delete vendor", error);
    }
  };

  const columns = [
    {
      key: "vendorCode",
      title: "Vendor Code",
    },
    {
      key: "companyName",
      title: "Company Name",
    },
    {
      key: "contactPerson",
      title: "Contact Person",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "phoneNumber",
      title: "Phone Number",
    },
    {
      key: "status",
      title: "Status",
      render: (row: Vendor) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: Vendor) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => console.log("Edit Vendor:", row.vendorId)}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => handleDeleteVendor(row.vendorId)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Vendors</h1>

          <p className="page-description">
            Manage vendor registrations and supplier information.
          </p>
        </div>

        <Button onClick={onAddVendor}>
          + Add Vendor
        </Button>
      </div>

      <Card
        title="Vendor Directory"
        subtitle="Registered vendors in the system"
      >
        <DataTable
          columns={columns}
          data={vendors}
          loading={loading}
          emptyMessage="No vendors found"
        />
      </Card>
    </div>
  );
};

export default VendorListPage;
