import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../api/dashboard';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD],
    queryFn: fetchDashboardStats,
  });
};