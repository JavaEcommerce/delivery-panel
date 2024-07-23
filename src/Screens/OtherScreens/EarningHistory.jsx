import { FlatList, StyleSheet, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Skeleton, Menu, Pressable, } from 'native-base';
import typography from '../../Contants/fonts';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { apiBaseUrl, paymentHistory } from '../../Contants/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useProfile } from '../../Context/ProfileContext';
import color from '../../Contants/color';
import EarningHistoryCard from '../../Components/EarningHistoryCard';



export default function EarningHistory() {
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { profileData } = useProfile();
  const deliveryPersonId = profileData?.deliveryPersonId;

  const options = [
    {
      label: 'Last Month',
      value: '1'
    },
    {
      label: 'Last 10 days',
      value: '2'
    },
    {
      label: 'Last week',
      value: '3'
    },
  ];

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  const fetchPaymentHistory = async ({ deliveryPersonId, pageNumber, pageSize }) => {
    try {
      const res = await axios.get(`${apiBaseUrl}${paymentHistory}${deliveryPersonId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
      if (res?.data?.flatPaymentHistoryResponseList) {
        const data = res.data.flatPaymentHistoryResponseList;
        return {
          log: data,
          totalPages: res.data.totalPages || 0,
        };
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return {
        log: [],
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
    queryKey: ['earningHistory', deliveryPersonId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPaymentHistory({
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

  const renderItems = ({ item }) => {
    if (item?.amountPaid) {
      return (
        <EarningHistoryCard item={item} />
      );
    }
  };

  const renderOptions = ({ item }) => (
    <Menu.Item onPress={() => setFilter(item.value)}>{item.label}</Menu.Item>
  );

  const objectData = data?.pages.flatMap(page => page.log) || [];

  

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={{ fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight }}>Filter</Text>
          <Menu w="190" trigger={triggerProps => (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Ionicons name="filter" size={20} color="black" />
            </Pressable>
          )}>
            <FlatList
              data={options}
              scrollEnabled={false}
              renderItem={renderOptions}
            />
          </Menu>
        </View>
        {
          loading ? (<>
            <View flex={1} w={'100%'} bg={'white'} alignItems={'center'} gap={5}>
              <Skeleton w={'90%'} borderRadius={10} h={100} />
              <Skeleton w={'90%'} borderRadius={10} h={100} />
              <Skeleton w={'90%'} borderRadius={10} h={100} />
              <Skeleton w={'90%'} borderRadius={10} h={100} />
              <Skeleton w={'90%'} borderRadius={10} h={100} />
              <Skeleton w={'90%'} borderRadius={10} h={100} />
            </View>
          </>) : (<>

            <FlatList
              data={objectData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
              onEndReached={loadMore}
              onEndReachedThreshold={0.8}
              scrollEventThrottle={20}
              ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color={color.primary} /> : null}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red', 'yellow']} />}
            />

          </>)
        }
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 5,
  },
  filterContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    fontSize: typography.heading.fontSize,
    fontWeight: typography.heading.fontWeight,
  },
  flatList: {
    marginTop: 10,
    width: '90%',
  },
  paymentItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: Platform.OS === 'ios' ? 10 : 10,
    gap: 15,
    borderWidth: 1,
    borderColor: 'gray.300',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    padding: 4,
    color: 'black',
    borderRadius: Platform.OS === 'ios' ? 15 : 8,
    fontWeight: typography.h1.fontWeight,
    fontSize: typography.small.fontSize,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentDate: {
    fontSize: typography.subtitle.fontSize,
    color: 'gray',
  },
  amountPaid: {
    fontWeight: typography.bold.fontWeight,
    fontSize: typography.mainHeading.fontSize,
  },
});
