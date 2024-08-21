import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import color from "../../Contants/color";
import { apiBaseUrl, getOrderDetail } from '../../Contants/api';
import axios from 'axios';
import DeliveryStatus from "../../Components/DeliveryStatus";
import OrderDetailCard from "../../Components/OrderDetailCard";
import { ScrollView } from "react-native-gesture-handler";
import { Skeleton, View } from "native-base";
import axiosInstance from "../../Utils/useAxios";

export default function OrderDetailPage({ navigation, route }) {
  const { item } = route.params;
  const orderId = item.orderId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`${getOrderDetail}${orderId}`);
        setData(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <View w={'90%'} py={5} justifyContent={'space-between'} h={'100%'}>
          <Skeleton bg={'gray.100'} borderRadius={10} h={100} />
          <Skeleton bg={'gray.100'} borderRadius={10} h={100} />
          <Skeleton bg={'gray.100'} borderRadius={10} h={100} />
          <Skeleton bg={'gray.100'} borderRadius={10} h={100} />
          <Skeleton bg={'gray.100'} borderRadius={10} h={100} />
          <Skeleton bg={'gray.100'} borderRadius={10} h={50} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <OrderDetailCard data={data} />
      <DeliveryStatus item={item} navigation={navigation} />
    </SafeAreaView>
  );
}
