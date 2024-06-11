import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl, getOrderHistory } from '../Contants/api';
import { useInfiniteQuery } from '@tanstack/react-query'; // Import useInfiniteQuery

const OrderHistoryContext = createContext();
const deliveryPersonId=3
const OrderHistoryProvider = ({ children }) => {
  const fetchOrderHistory = async ({ pageParam = 0 }) => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getOrderHistory}?pageNumber=${pageParam}&pageSize=5`);
      return {
        orderItems: res?.data?.deliveryPersonWorkHistory,
        totalPages: res?.data?.totalPages || 0,
      };
    } catch (error) {
      console.error('Error fetching order history:', error.message);
      throw new Error('Failed to fetch order history');
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['OrderHistory', deliveryPersonId],
    queryFn: fetchOrderHistory,
    getNextPageParam: (lastPage, pages) => {
      return pages.length < lastPage.totalPages ? pages.length : undefined;
    },
  });
  const reFetchOrderHistory=()=>{
    fetchOrderHistory()
  }
  


  return (
    <OrderHistoryContext.Provider
      value={{
        orderItems: data?.pages.flatMap(page => page.orderItems) || [],
        isLoading: status === 'loading',
        isError: status === 'error',
        error: error?.message || null,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        reFetchOrderHistory
       
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export { OrderHistoryContext, OrderHistoryProvider };
