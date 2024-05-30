import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import { Box, Skeleton, View, ScrollView } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiBaseUrl, getAllActiveOrders } from '../../Contants/api';
import { useFocusEffect } from '@react-navigation/native';

const deliveryPersonId = 3;

const ActiveOrders = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const fetchActiveOrder = async ({ deliveryPersonId, pageNumber, pageSize }) => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getAllActiveOrders}${deliveryPersonId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      if (res.data && res.data.assignedOrders) {
        const data = res.data.assignedOrders;
        return {
          orders: data,
          totalPages: res.data.totalPages || 0,
        };
      }
    } catch (error) {
      return {
        orders: [],
        totalPages: 0,
      };
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['activeOrders', deliveryPersonId],
    queryFn: ({ pageParam = 0 }) =>
      fetchActiveOrder({
        deliveryPersonId,
        pageNumber: pageParam,
        pageSize: 10,
      }),
    enabled: !!deliveryPersonId,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || typeof lastPage.totalPages !== 'number') {
        return undefined;
      }
      const currentPage = pages.length;
      return currentPage < lastPage.totalPages ? currentPage : undefined;
    },
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderOrderItem = ({ item }) => {
    const parseDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return { date, time };
    };

    const { date: orderDate } = parseDateTime(item?.orderDate);
    const { date: assignmentDate } = parseDateTime(item?.assignmentTime);

    return (
      <Box style={styles.orderContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.ORDER_DETAIL, { item })}>
          <Box style={styles.orderContent}>
            <Box style={styles.orderHeader}>
              <Box style={styles.orderId}>
                <Text style={styles.orderIdText}>#{item?.orderId}</Text>
              </Box>
              <Box style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>{item?.status}</Text>
              </Box>
            </Box>
            <Box style={styles.orderDetails}>
              <Text style={styles.orderAddress} numberOfLines={4}>
                🏠 : {item?.customerAddress?.houseNo ? `H-${item?.customerAddress?.houseNo}` : ''}
                {item?.customerAddress?.flatNo ? `, F-${item?.customerAddress?.flatNo},` : ''}
                {item?.customerAddress?.addressLine1}
              </Text>
              <Text style={styles.orderDate}>🗓️ : {orderDate}</Text>
              <Text style={styles.orderPhone}>📱 : {item?.customerAddress?.pocPhoneNo}</Text>
            </Box>
            <Box style={styles.orderAmountContainer}>
              <Text style={styles.orderAmountLabel}> Total Amount :</Text>
              <Box style={styles.orderAmount}>
                <Text style={styles.orderAmountText}>$ {item?.totalAmount}</Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  if (loading) {
    return (
      <View bg={'white'} flex={1} alignItems={'center'} py={3}>
        <ScrollView w={'90%'} scrollIndicatorInsets={false}>
          <Skeleton borderRadius={10} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
        </ScrollView>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const orders = data?.pages?.flatMap((page) => page.orders) || [];

  if (orders.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No active orders available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
        scrollEventThrottle={20}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.loader} color={color.primary} size={'large'} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red']} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  flatList: {
    width: '100%',
  },
  orderContainer: {
    backgroundColor: 'white',
    borderWidth: 0.17,
    borderColor: color.primary,
    width: '90%',
    marginBottom: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  orderContent: {
    padding: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    backgroundColor: color.primary,
    padding: 5,
    width: '30%',
    borderRadius: 15,
  },
  orderIdText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
  },
  orderStatus: {
    padding: 5,
  },
  orderStatusText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '900',
  },
  orderDetails: {
    gap: 10,
    marginTop: 10,
  },
  orderAddress: {
    color: 'black',
    fontWeight: '700',
    width: '95%',
  },
  orderDate: {
    color: 'black',
    fontWeight: '700',
  },
  orderPhone: {
    color: 'black',
    fontWeight: '700',
  },
  orderAmountContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  orderAmountLabel: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
  },
  orderAmount: {
    width: '40%',
    alignSelf: 'center',
    backgroundColor: color.primary,
    padding: 15,
    borderRadius: 20,
  },
  orderAmountText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
  },
  loader: {
    marginVertical: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActiveOrders;
