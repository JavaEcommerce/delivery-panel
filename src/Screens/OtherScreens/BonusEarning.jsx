import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Box, View, Text, Skeleton, ScrollView } from "native-base";
import typography from "../../Contants/fonts";
import COLORS from "../../Contants/color";
import { Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import color from "../../Contants/color";
import { apiBaseUrl } from "../../Contants/api";
import { getBonus } from "../../Contants/api";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useProfile } from "../../Context/ProfileContext";


export default function BonusEarning() {
  const { profileData } = useProfile();
  const [refreshing, setRefreshing] = useState(false);
  const deliveryPersonId = profileData.deliveryPersonId;
  const [bonusData,setBonusData] = useState(null)

  const fetchBonusData = async ({ pageNumber, deliveryPersonId, pageSize }) => {
    try {
      const response = await axios.get(
        // `${apiBaseUrl}${getBonus}?deliveryPersonId=${deliveryPersonId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
        `https://bvzwr2c7mj3m.share.zrok.io/bonusPaymentHistory/?deliveryPersonId=3&pageNumber=${pageNumber}&pageSize=${pageSize}`

      );
      // const data = response?.data?.bonusPaymentHistoryResponseList;
      // console.log(response.data,'kkhhh')
      setBonusData(response?.data?.bonusPaymentHistoryResponseList)
      // console.log(data,'bksjcbk')
      return {
        // bonus: data,
        totalPages: response?.data?.totalPage || 0,
      };
    } catch (error) {
      console.error("Error fetching bonus history:", error.message);
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
    queryKey: ["BonusEarning", deliveryPersonId],
    queryFn: ({ pageParam = 0 }) =>
      fetchBonusData({
        deliveryPersonId,
        pageNumber: pageParam,
        pageSize: 5,
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

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // const getData = data?.pages.flatMap(page => page.bonus) || [];

  const renderItems = ({ item }) => {
    return (
      <View
        key={item.orderId}
        style={{
          backgroundColor: "white",
          padding: 10,
          marginBottom: 10,
          width: "100%",
          borderRadius: Platform.OS == "ios" ? 20 : 10,
          gap: 10,
          borderWidth: 1,
        }}
        borderColor={"gray.300"}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            gap={2}
          >
            <FontAwesome5
              name="gift"
              size={16}
              color={"rgba(249, 84, 74, 1)"}
            />
            <Text
              color={"rgba(249, 84, 74, 1)"}
              style={{
                fontWeight: typography.bold.fontWeight,
                fontSize: typography.mainHeading.fontSize,
              }}
            >
              {item.bonusPaymentId}
            </Text>
          </View>
          <Text>{item.paymentStatus}</Text>
        </View>

        <View
          style={{ flexDirection: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            style={{ fontSize: typography.subtitle.fontSize, color: "gray" }}
          >
            {item.paymentDate != null ? item.paymentDate : "15 july"}
          </Text>
          <Text
            color={color.primary}
            style={{
              fontWeight: typography.bold.fontWeight,
              fontSize: typography.mainHeading.fontSize,
            }}
          >
            + ${item.amountPaid}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          paddingTop: Platform.OS == "ios" ? 0 : 20,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {bonusData!=null ? (
          <FlatList
            data={bonusData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            style={{ width: "90%" }}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.8}
            scrollEventThrottle={20}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator color={color.primary} size={"large"} />
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[color.primary]}
              />
            }
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            w={"90%"}
            scrollIndicatorInsets={false}
          >
            <Skeleton borderRadius={10} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
            <Skeleton borderRadius={10} mt={3} h={100} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}
