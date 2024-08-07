import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Box } from "native-base";
import color from "../../Contants/color";
import { Platform } from "react-native";
import typography from "../../Contants/fonts";
import axios from "axios";
import { apiBaseUrl, getAllOrders } from "../../Contants/api";
import AllOrderCard from "../../Components/AllOrderCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFocusEffect } from '@react-navigation/native';

const AllOrders = ({ navigation }) => {
  const [isdata, setIsData] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // const getOrderData = async () => {
  //   const res = await axios.get(`${apiBaseUrl}${getAllOrders}`)
  //   setIsData(res?.data?.allOrders)

  // }
  // useEffect(() => {
  //   getOrderData()
  // },[])
  // const deliveryPersonId = 3;

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  const fetchAllOrders = async ({ pageNumber, pageSize }) => {
    try {
      const res = await axios.get(
        `${apiBaseUrl}${getAllOrders}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      if (res?.data?.allOrders) {
        const data = res?.data?.allOrders
        // console.log(data,"jjjjjj")
        
        return {
          all: data,
          totalPages: res.data.totalPages || 0,
        };
      }
    } catch (error) {
      console.error("Error fetching All Orders:", error);
      return {
        all: [],
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
    queryKey: ["allOrders"],
    queryFn: ({ pageParam = 0 }) =>
      fetchAllOrders({
        // deliveryPersonId,
        pageNumber: pageParam,
        pageSize: 5,
      }),
    // enabled: !!deliveryPersonId,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || typeof lastPage.totalPages !== "number") {
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

  const renderOrderItem = ({ item }) =>{
    return(
      <AllOrderCard item={item} navigation={navigation} />
    )
  };

  const objectData = data?.pages.flatMap((page) => page.all) ;
  // const newdATA=data?.pages[0]?.all
  // console.log(data,'lllllll')
  return (
    <View style={styles.container}>
      <FlatList
        data={objectData}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.8}
        scrollEventThrottle={20}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={color.primary} />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["red", "yellow"]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 15,
  },
  flatList: {
    width: "100%",
  },
});

export default AllOrders;
