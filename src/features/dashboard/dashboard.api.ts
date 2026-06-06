import apiClient from "../../lib/apiClient";

import type {
  DashboardSummaryResponse,
  RecentActivitiesResponse,
} from "./dashboard.types";

/**
 * GET /dashboard/summary
 */
export const getDashboardSummary =
  async (): Promise<DashboardSummaryResponse> => {
    const response = await apiClient.get(
      "/dashboard/summary"
    );

    return response.data;
  };

/**
 * GET /dashboard/recent-activities
 */
export const getRecentActivities =
  async (
    limit: number = 10
  ): Promise<RecentActivitiesResponse> => {
    const response = await apiClient.get(
      "/dashboard/recent-activities",
      {
        params: {
          limit,
        },
      }
    );

    return response.data;
  };