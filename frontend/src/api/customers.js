import { apiClient } from './client';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchCustomers = async ({ page = 1, pageSize = 10, search = '' }) => {
  return apiClient.get(API_ROUTES.CUSTOMERS, { 
    params: { 
      page, 
      page_size: pageSize, 
      email: search 
    } 
  });
};

export const createCustomer = async (data) => {
  return apiClient.post(API_ROUTES.CUSTOMERS, data);
};

export const updateCustomer = async ({ id, data }) => {
  return apiClient.put(`${API_ROUTES.CUSTOMERS}/${id}`, data);
};

export const deleteCustomer = async (id) => {
  return apiClient.delete(`${API_ROUTES.CUSTOMERS}/${id}`);
};
