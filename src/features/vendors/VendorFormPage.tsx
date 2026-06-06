import { useState } from "react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import {
  createVendor,
} from "./vendor.api";

const VendorFormPage = () => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      companyName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      gstNumber: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response =
        await createVendor(
          formData
        );

      if (response.success) {
        alert(
          "Vendor created successfully"
        );

        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phoneNumber: "",
          gstNumber: "",
          address: "",
          city: "",
          state: "",
          country: "India",
          pincode: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create vendor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Add Vendor
          </h1>

          <p className="page-description">
            Register a new supplier in
            the procurement system.
          </p>
        </div>
      </div>

      <Card
        title="Vendor Information"
        subtitle="Enter vendor details"
      >
        <form
          onSubmit={handleSubmit}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            <div>
              <label>
                Company Name
              </label>

              <input
                name="companyName"
                value={
                  formData.companyName
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>
                Contact Person
              </label>

              <input
                name="contactPerson"
                value={
                  formData.contactPerson
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>
                Phone Number
              </label>

              <input
                name="phoneNumber"
                value={
                  formData.phoneNumber
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>
                GST Number
              </label>

              <input
                name="gstNumber"
                value={
                  formData.gstNumber
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>
                Pincode
              </label>

              <input
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div
              style={{
                gridColumn:
                  "span 2",
              }}
            >
              <label>
                Address
              </label>

              <input
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>City</label>

              <input
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div>
              <label>State</label>

              <input
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "12px",
            }}
          >
            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Vendor"}
            </Button>

            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VendorFormPage;