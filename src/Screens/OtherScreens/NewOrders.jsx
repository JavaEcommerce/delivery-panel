import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Box, Skeleton, ScrollView, Button } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios';
import { apiBaseUrl, getAllNewOrders, updateNewOrdersStatus } from '../../Contants/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import NewOrderCard from '../../Components/NewOrderCard';
import LottieView from 'lottie-react-native';
const deliveryPersonId = 3;
const NewOrders = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDataNewOrders = async ({ deliveryPersonId, pageNumber, pageSize }) => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getAllNewOrders}${deliveryPersonId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const data = res?.data?.newOrders;
      if (data && data?.length > 0) {
        return {
          orders: data,
          totalPages: res?.data?.totalPages,
          pageSize: res?.data?.pageSize
        };
      }
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const renderOrderItem = ({ item }) => {
    return (
      <NewOrderCard item={item} navigation={navigation} refetch={refetch} />
    );
  };

  if (loading) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.skeletonScrollView}>
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
  if ((data?.pages[0]?.orders === 0 || data?.pages[0] === undefined)) {
    return (
      <View style={styles.noDataContainer}>

        <LottieView style={{ width: "100%", height: '40%', justifyContent: 'center', alignItems: 'center' }}
          source={require('../../Assets/Animation - 1718105818011.json')}
          autoPlay
          loop >
        </LottieView>
        <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', alignItems: 'center' }}>

          <Text>No orders right now 📦.</Text>
          <TouchableOpacity bg={'white'} onPress={() => refetch()}>
            <Ionicons name="reload" size={24} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages?.flatMap((page) => page?.orders) || []}
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
  skeletonScrollView: {
    width: '100%',
    backgroundColor: 'white',
  },
  skeleton: {
    height: 180,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
