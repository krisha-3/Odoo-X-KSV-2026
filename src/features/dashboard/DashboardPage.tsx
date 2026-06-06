import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";

import {
  getDashboardSummary,
  getRecentActivities,
} from "./dashboard.api";

import type {
  DashboardSummary,
  RecentActivity,
} from "./dashboard.types";

const DashboardPage = () => {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [activities, setActivities] =
    useState<RecentActivity[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData =
      async (): Promise<void> => {
        try {
          const summaryResponse =
            await getDashboardSummary();

          const activitiesResponse =
            await getRecentActivities(10);

          setSummary(summaryResponse.data as DashboardSummary);

          setActivities(
            activitiesResponse.data.items
          );
        } catch (error) {
          console.error(
            "Failed to load dashboard",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboardData();
  }, []);

  const activityColumns = [
    {
      key: "actorName",
      title: "Actor",
    },
    {
      key: "action",
      title: "Action",
    },
    {
      key: "message",
      title: "Message",
    },
    {
      key: "createdAt",
      title: "Created At",
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">
            Dashboard Overview
          </div>

          <div className="page-description">
            Monitor procurement activities,
            approvals, vendors and invoices.
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="stats-grid">
        <Card>
          <div className="stat-label">
            Total Vendors
          </div>

          <div className="stat-value">
            {summary?.totalVendors ?? "-"}
          </div>
        </Card>

        <Card>
          <div className="stat-label">
            Active RFQs
          </div>

          <div className="stat-value">
            {summary?.activeRfqs ?? "-"}
          </div>
        </Card>

        <Card>
          <div className="stat-label">
            Pending Approvals
          </div>

          <div className="stat-value">
            {summary?.pendingApprovals ?? "-"}
          </div>
        </Card>

        <Card>
          <div className="stat-label">
            Purchase Orders
          </div>

          <div className="stat-value">
            {summary?.recentPurchaseOrders ??
              "-"}
          </div>
        </Card>

        <Card>
          <div className="stat-label">
            Invoices
          </div>

          <div className="stat-value">
            {summary?.recentInvoices ?? "-"}
          </div>
        </Card>
      </div>

      {/* MONTHLY SPENDING */}
      <Card
        title="Monthly Spending"
        subtitle="Current month procurement expenditure"
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          ₹
          {summary?.monthlySpending?.toLocaleString() ??
            "0"}
        </div>
      </Card>

      <div style={{ height: "24px" }} />

      {/* RECENT ACTIVITIES */}
      <Card
        title="Recent Activities"
        subtitle="Latest actions performed in the system"
      >
        <DataTable
          columns={activityColumns}
          data={activities}
          loading={loading}
          emptyMessage="No recent activities found"
        />
      </Card>
    </>
  );
};

export default DashboardPage;