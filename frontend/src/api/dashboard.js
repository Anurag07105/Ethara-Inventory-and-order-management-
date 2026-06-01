import { apiClient } from './client';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchDashboardStats = async () => {
  return apiClient.get(API_ROUTES.DASHBOARD_STATS);
};