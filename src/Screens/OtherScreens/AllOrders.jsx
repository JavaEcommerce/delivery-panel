import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Box } from 'native-base';
import color from '../../Contants/color';
const profileImage = require('../../Assets/right.png');


const AllOrders = () => {
  // Sample demo data for pending orders
  const pendingOrders = [
    {
      id: '1',
      address: '123 Main Street',
      timestamp: '10:00 AM',
      Amount: 100
    },

    {
      id: '2',
      address: '123 Main Street',
      timestamp: '10:00 AM',
      Amount: 100
    },
    {
      id: '3',
      address: '123 Main Street',
      timestamp: '10:00 AM',
      Amount: 100
    },
    {
      id: '4',
      address: '123 Main Street',
      timestamp: '10:00 AM',
      Amount: 100
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={pendingOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

// Render item for FlatList
const renderOrderItem = ({ item }) => (
  <Box style={{ backgroundColor: 'white', borderWidth: .17, borderColor: color.primary, width: '90%', marginBottom: 15, borderRadius: 20, justifyContent: 'center', alignSelf: 'center' }}>
    <Box style={{ height: 180, padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: '15' }}>
          <Text style={{ color: "white", textAlign: 'center', fontWeight: '900' }}>#{item.id}</Text>
        </Box >
        <Box style={{ padding: 5 }}>
          <Text style={{ color: "black", textAlign: 'center', fontWeight: '900' }}>{item.status}</Text>
        </Box >
      </Box>
      <Box style={{ gap: 10, marginTop: 10 }}>
        <Text style={{ color: "black", fontWeight: '700' }}>Address : {item.address}</Text>
        <Text style={{ color: "black", fontWeight: '700' }}>Time: {item.timestamp}</Text>
      </Box>

      <Box style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => handleAcceptOrder(item.id)}>
          <Box style={{ backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>

            <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: '700' }}> Add to bucket </Text>
          </Box>
        </TouchableOpacity>

        {/* <TouchableOpacity style={{ width: '45%' }} onPress={() => handleRejectOrder(item.id)}>
          <Box style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>
            <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: '700' }}> Reject </Text>
          </Box>
        </TouchableOpacity> */}
      </Box>

    </Box>
  </Box>
);

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
