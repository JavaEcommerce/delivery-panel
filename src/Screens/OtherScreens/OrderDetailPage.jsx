import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import color from "../../Contants/color";
import { apiBaseUrl, updateNewOrdersStatus } from '../../Contants/api';
import axios from 'axios';
import DeliveryStatus from "../../Components/DeliveryStatus";


export default function OrderDetailPage({ navigation, route }) {
  const { item } = route.params

  
  return (
    <SafeAreaView style={{ backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
      <DeliveryStatus item={item} navigation={navigation}/>
    </SafeAreaView>
  );
}