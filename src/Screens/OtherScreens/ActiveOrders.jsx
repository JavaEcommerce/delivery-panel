import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import { Box, Skeleton, View, ScrollView, Image } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiBaseUrl, getAllActiveOrders } from '../../Contants/api';
import { useFocusEffect } from '@react-navigation/native';
import ActiveOrderCard from '../../Components/ActiveOrderCard';
import LottieView from 'lottie-react-native';
import typography from '../../Contants/fonts';
const activeOrderImg = require('../../Assets/ActiveOrder.jpg');
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
    return (
      <ActiveOrderCard item={item} navigation={navigation} />
    );
  };

  if (loading) {
    return (
      <View bg={'white'} flex={1} alignItems={'center'} py={3}>
        <ScrollView showsVerticalScrollIndicator={false} w={'90%'} scrollIndicatorInsets={false}>
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
        <LottieView style={{ width: "100%", height: '40%', }} 
        source={require('../../Assets/Animation - 1718104901501.json')}
          autoPlay
          loop >
        </LottieView>
        <Text style={{fontWeight:typography.heading.fontWeight,fontSize:typography.heading.fontSize}}>No order right now 📦.</Text>
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
  imgStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 5 / 5,
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export default ActiveOrders;


