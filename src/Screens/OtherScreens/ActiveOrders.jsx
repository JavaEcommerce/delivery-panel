import { React, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { Box, Skeleton, Button, View, ScrollView } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios';
import { apiBaseUrl, getAllActiveOrders } from '../../Contants/api';
const ActiveOrders = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState()
  const [loading, setloading] = useState(false)

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchActiveOrder();
    }, 500);
  };


  useEffect(() => {
    fetchActiveOrder()
  }, [data])



  const fetchActiveOrder = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getAllActiveOrders}5`);
      const data = res.data;
      setData(data);
      console.log(data,'++++++')
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setloading(true)
    }
  };

  const renderOrderItem = ({ item }) => {

    const parseDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return { date, time };
    };

    const { date: orderDate, time: orderTime } = parseDateTime(item.orderDate);
    const { date: assignmentDate, time: assignmentTime } = parseDateTime(item.assignmentTime);

    return (
      <Box style={{ backgroundColor: 'white', borderWidth: 0.17, borderColor: color.primary, width: '90%', marginBottom: 15, borderRadius: 20, justifyContent: 'center', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate(routes.ORDER_DETAIL, { item })}>
          <Box style={{ padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: 15 }}>
                <Text style={{ color: "white", textAlign: 'center', fontWeight: '900' }}>#{item.orderId}</Text>
              </Box>
              <Box style={{ padding: 5 }}>
                <Text style={{ color: "black", textAlign: 'center', fontWeight: '900' }}>{item.status}</Text>
              </Box>
            </Box>
            <Box style={{ gap: 10, marginTop: 10 }}>
              <Text style={{ color: "black", fontWeight: '700', width: '95%' }} numberOfLines={4}>
                🏠 : {item.customerAddress.houseNo ? `H-${item.customerAddress.houseNo}` : ''}
                {item.customerAddress.flatNo ? `, F-${item.customerAddress.flatNo},` : ''}
                {item.customerAddress.addressLine1}
              </Text>
              <Text style={{ color: "black", fontWeight: '700' }}>🗓️ : {orderDate}</Text>
              {/* <Text style={{ color: "black", fontWeight: '700' }}>Order Time: {orderTime}</Text> */}
              <Text style={{ color: "black", fontWeight: '700' }}>📱 : {item.customerAddress.pocPhoneNo}</Text>
            </Box>
            <Box style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 20 }}>
              <Text style={{ fontSize: 18, color: "black", textAlign: 'center', fontWeight: '700' }}> Total Amount :</Text>
              <Box style={{ width: '40%', alignSelf: 'center', backgroundColor: color.primary, padding: 15, borderRadius: 20 }}>
                <Text style={{ color: "white", textAlign: 'center', fontWeight: '900' }}>$ {item.totalAmount}</Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  if (!loading) {
    return (
      <View bg={'white'} flex={1} alignItems={'center'} py={3}>
        <ScrollView w={'90%'} scrollIndicatorInsets={false} >
          <Skeleton borderRadius={10} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />
          <Skeleton borderRadius={10} mt={3} h={200} />

        </ScrollView>
      </View>

    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          style={styles.flatList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['red']}
            />
          }
        />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatList: {
    width: '100%',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActiveOrders;








