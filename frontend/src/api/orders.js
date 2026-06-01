import { apiClient } from './client';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchOrders = async ({ page = 1, pageSize = 10, search = '', status = '' }) => {
  const params = { page, page_size: pageSize };
  if (search) params.search = search;
  if (status) params.status = status;
  
  return apiClient.get(API_ROUTES.ORDERS, { params });
};

export const createOrder = async (data) => {
  return apiClient.post(API_ROUTES.ORDERS, data);
};

export const updateOrderStatus = async ({ id, status }) => {
  return apiClient.patch(`${API_ROUTES.ORDERS}/${id}/status`, { status });
};

export const deleteOrder = async (id) => {
  return apiClient.delete(`${API_ROUTES.ORDERS}/${id}`);
};
