import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Box, Skeleton, ScrollView } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios';
import { apiBaseUrl, getAllNewOrders, updateNewOrdersStatus } from '../../Contants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const deliveryPersonId = 3;
const NewOrders = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDataNewOrders = async ({ deliveryPersonId, pageNumber, pageSize }) => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getAllNewOrders}${deliveryPersonId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const data = res?.data?.newOrders;
      if (data && data.length > 0) {
        return {
          orders: data,
          totalPages: res?.data?.totalPages,
          pageSize: res?.data?.pageSize
        };
      }
      throw new Error('No new orders found');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['newOrders', deliveryPersonId],
    queryFn: ({ pageParam = 0 }) =>
      getDataNewOrders({
        deliveryPersonId,
        pageNumber: pageParam,
        pageSize: 10
      }),
    enabled: !!deliveryPersonId,
    getNextPageParam: (lastPage, pages) => {
      const currentPage = pages?.length;
      return currentPage < lastPage?.totalPages ? currentPage : undefined;
    },
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRejectOrder = async (id) => {
    const payload = { status: 'DeliveryPersonRejected' };
    try {
      const response = await fetch(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      refetch();
      navigation.navigate(routes?.ASSIGN_ORDERS, { item: id });
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const handleAcceptOrder = async (id) => {
    const payload = { status: 'Assigned' };
    try {
      const response = await fetch(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      refetch();
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const renderOrderItem = ({ item }) => {
    const parseDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const date = dateTime?.toLocaleDateString();
      const time = dateTime?.toLocaleTimeString();
      return { date, time };
    };
    const { date: orderDate, time: orderTime } = parseDateTime(item?.order?.orderDate);
    const { date: assignmentDate, time: assignmentTime } = parseDateTime(item?.assignmentTime);

    return (
      <Box style={styles.orderBox}>
        <Box style={styles.orderBoxContent}>
          <Box style={styles.orderHeader}>
            <Box style={styles.orderIdBox}>
              <Text style={styles.orderIdText}>Order #{item?.order?.orderId}</Text>
            </Box>
            <Box style={styles.orderDateBox}>
              <Text style={styles.orderDateText}>{orderDate}</Text>
            </Box>
          </Box>
          <Box style={styles.orderDetails}>
            <Box style={styles.orderAddress}>
              <Text style={styles.orderAddressText} numberOfLines={4}>
                🏠 : {item?.order?.customerAddress?.houseNo ? `H-${item?.order?.customerAddress?.houseNo}` : ''}
                {item?.order?.customerAddress?.flatNo ? `, F-${item?.order?.customerAddress?.flatNo},` : ''}
                {item?.order?.customerAddress?.addressLine1}
              </Text>
              <Text style={styles.orderLocationText}>📍 : {item?.order?.customerAddress?.city?.cityName.toUpperCase()} , {item?.order?.customerAddress?.city?.countryId?.countryName.toUpperCase()}</Text>
              <Text style={styles.orderTimeText}>🕧 : {orderTime}</Text>
            </Box>
            <Box style={styles.orderActions}>
              <TouchableOpacity style={styles.rejectButton} onPress={() => handleRejectOrder(item?.orderAssignmentId)}>
                <Box style={styles.rejectButtonBox}>
                  <Text style={styles.rejectButtonText}>Reject</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptOrder(item.orderAssignmentId)}>
                <Box style={styles.acceptButtonBox}>
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  if (loading) {
    return (
      <ScrollView style={styles.skeletonScrollView}>
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
        <Skeleton style={styles.skeleton} />
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data || !data.pages || data.pages.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No new orders available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.pages.flatMap((page) => page.orders) || []}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
        scrollEventThrottle={20}
        renderItem={renderOrderItem}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.loader} color={color.primary} size={'large'} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red']}
          />
        }
      />
    </View>
  );
};

export default NewOrders;

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
  orderBox: {
    backgroundColor: 'white',
    borderWidth: 0.17,
    borderColor: color.primary,
    width: '90%',
    marginBottom: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  orderBoxContent: {
    padding: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderIdBox: {
    backgroundColor: color.primary,
    padding: 5,
    width: '30%',
    borderRadius: 15,
  },
  orderIdText: {
    color: 'white',
    fontWeight: '700',
    paddingLeft: 5,
  },
  orderDateBox: {
    padding: 5,
  },
  orderDateText: {
    color: 'black',
    fontWeight: '700',
  },
  orderDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  orderAddress: {
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  orderAddressText: {
    color: 'black',
    fontWeight: '700',
    width: '95%',
  },
  orderLocationText: {
    color: 'black',
    fontWeight: '700',
  },
  orderTimeText: {
    color: 'black',
    fontWeight: '700',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  rejectButton: {
    width: '40%',
  },
  rejectButtonBox: {
    backgroundColor: 'rgba(249, 84, 74, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
  },
  rejectButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  acceptButton: {
    width: '40%',
  },
  acceptButtonBox: {
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  skeletonScrollView: {
    width: '100%',
    backgroundColor: 'white',
  },
  skeleton: {
    height: 180,
    alignSelf: 'center',
    borderRadius: 20,
    width: '90%',
    my: 3,
  },
  loader: {
    marginVertical: 20,
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
