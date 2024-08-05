import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Box } from 'native-base';
import color from '../../Contants/color';
import { Platform } from 'react-native';
import typography from '../../Contants/fonts';
import axios from 'axios';
import { apiBaseUrl, getAllOrders } from '../../Contants/api';
import AllOrderCard from '../../Components/AllOrderCard';

const AllOrders = () => {
  const [data, setData] = useState()

  const getOrderData = async () => {
    const res = await axios.get(`${apiBaseUrl}${getAllOrders}`)
    setData(res?.data?.allOrders)
    
  }
  useEffect(() => {
    getOrderData()
  },[])
  


  const renderOrderItem = ({ item }) => (

    <AllOrderCard item={item} />
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />

    </View>
  );
}


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
});

export default AllOrders;
