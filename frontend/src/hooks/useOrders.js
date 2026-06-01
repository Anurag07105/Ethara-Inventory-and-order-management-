import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, createOrder, updateOrderStatus, deleteOrder } from '../api/orders';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useOrders = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, params],
    queryFn: () => fetchOrders(params),
    keepPreviousData: true,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};
