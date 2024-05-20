import { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, RefreshControl, Animated } from 'react-native';
import { Box, Skeleton, ScrollView } from 'native-base';
import color from '../../Contants/color';
import routes from '../../Contants/routes';
import axios from 'axios'
import { apiBaseUrl, getAllNewOrders } from '../../Contants/api';
import { SafeAreaView } from 'react-native-safe-area-context';


const NewOrders = ({ navigation }) => {
  const [orderData, setOrderData] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getDataNewOrders();
  }, []);

  const getDataNewOrders = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}${getAllNewOrders}5`);
      const data = res.data;
      setOrderData(data);

    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setloading(true)
    }
  };

  const handleRejectOrder = async (id) => {
    const payload = { status: 'DeliveryPersonRejected' };
    try {
      const response = await fetch(`https://61a3-2405-201-3037-e07c-bd41-63f3-b946-bd06.ngrok-free.app/orderAssignments/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      getDataNewOrders()
      navigation.navigate(routes.ASSIGN_ORDERS, { item });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }

    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const handleAcceptOrder = async (id) => {
    const payload = { status: 'Assigned' };
    try {
      const response = await fetch(`https://61a3-2405-201-3037-e07c-bd41-63f3-b946-bd06.ngrok-free.app/orderAssignments/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      getDataNewOrders()
      if (!response.ok) {
        throw new Error('Failed to update status');
      }

    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getDataNewOrders();
    }, 500);
  };


  const renderOrderItem = ({ item }) => {
    const parseDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return { date, time };
    };
    const { date: orderDate, time: orderTime } = parseDateTime(item.order.orderDate);
    const { date: assignmentDate, time: assignmentTime } = parseDateTime(item.assignmentTime);

    return (

      <Box style={{ backgroundColor: 'white', borderWidth: .17, borderColor: color.primary, width: '90%', marginBottom: 15, borderRadius: 20, justifyContent: 'center', alignSelf: 'center' }} >
        <Box style={{ padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: '15' }}>
              <Text style={{ color: 'white', fontWeight: '700', paddingLeft: 5 }}>Order #{item.order.orderId}</Text>
            </Box >
            <Box style={{ padding: 5 }}>
              {/* <Text style={{ color: "black", textAlign: 'center', fontWeight: '900' }}>{item.status}</Text> */}
              <Text style={{ color: "black", fontWeight: '700' }}> {orderDate}</Text>

            </Box >
          </Box>
          <Box style={{ flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: 20 }}>
            <Box style={{ justifyContent: 'space-around', width: '100%', gap: 10, }}>
              <Text style={{ color: "black", fontWeight: '700', width: '95%' }} numberOfLines={4}>
                🏠 : {item.order.customerAddress.houseNo ? `H-${item.order.customerAddress.houseNo}` : ''}
                {item.order.customerAddress.flatNo ? `, F-${item.order.customerAddress.flatNo},` : ''}
                {item.order.customerAddress.addressLine1}
              </Text>
              <Text style={{ color: "black", fontWeight: '700' }}>📍 : {item.order.customerAddress.city.cityName.toUpperCase()} , {item.order.customerAddress.city.countryId.countryName.toUpperCase()}</Text>
              <Text style={{ color: "black", fontWeight: '700' }}>🕧 : {orderTime}</Text>
            </Box>

            <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20, width: '100%', }}>
              <TouchableOpacity style={{ width: '40%' }} onPress={() => handleRejectOrder(item.orderAssignmentId)}>
                <Box style={{ backgroundColor: `rgba(249, 84, 74, 1)`, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>
                  <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: '700' }}> Reject </Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '40%' }} onPress={() => handleAcceptOrder(item.orderAssignmentId)}>
                <Box style={{ backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>
                  <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: '700' }}> Accept </Text>
                </Box>
              </TouchableOpacity>

            </Box>
          </Box>
        </Box>
      </Box >

    );
  }

  if (loading) {
    return (
      <ScrollView style={{ width: '100%', backgroundColor: 'white' }} >
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
        <Skeleton height={180} alignSelf={'center'} borderRadius={20} width="90%" my={3} />
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={orderData}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderAssignmentId.toString()}
          style={styles.flatList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['red']}
            />
          } />
      </View>
    );
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
  flatList: {
    width: '100%',
  },
});

export default NewOrders;
