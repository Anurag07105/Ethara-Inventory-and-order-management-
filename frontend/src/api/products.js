import { apiClient } from './client';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchProducts = async ({ page = 1, pageSize = 10, search = '' }) => {
  return apiClient.get(API_ROUTES.PRODUCTS, { params: { page, page_size: pageSize, name: search } });
};

export const createProduct = async (data) => {
  return apiClient.post(API_ROUTES.PRODUCTS, data);
};

export const deleteProduct = async (id) => {
  return apiClient.delete(`${API_ROUTES.PRODUCTS}/${id}`);
};