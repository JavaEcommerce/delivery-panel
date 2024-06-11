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
        <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: 15 }}>
          <Text style={{ color: "white", textAlign: 'center', fontWeight: 900 }}>#{item.id}</Text>
        </Box >
        <Box style={{ padding: 5 }}>
          <Text style={{ color: "black", textAlign: 'center', fontWeight: 900 }}>{item.status}</Text>
        </Box >
      </Box>
      <Box style={{ gap: 10, marginTop: 10 }}>
        <Text style={{ color: "black", fontWeight: 700 }}>Address : {item.address}</Text>
        <Text style={{ color: "black", fontWeight: 700 }}>Time: {item.timestamp}</Text>
      </Box>

      <Box style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => handleAcceptOrder(item.id)}>
          <Box style={{ backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>

            <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: 700 }}> Add to bucket </Text>
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

// import { View, Text,StyleSheet,TouchableOpacity,Alert } from 'react-native'
// import React,{useState} from 'react'
// import DropDownPicker from 'react-native-dropdown-picker';
// import color from "../../Contants/color";
// import { apiBaseUrl, getOrderHistory } from '../../Contants/api';
// import axios from 'axios';
// import { OrderHistoryContext } from "../../Context/OrderContext";
// import { useContext } from "react";


// export default function AllOrders() {
//   const { orderItems, } = useContext(OrderHistoryContext);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Unable To Connect', value: 'Unable To Connect' },
//     { label: 'Customer Rejected', value: 'Customer Rejected' },
//     { label: 'Delivery Person Rejected', value: 'Delivery Person Rejected' },
//     { label: 'Delivered', value: 'Delivered' },
//   ]);
//   // console.log(orderItems)
//   const handleUpdate= async(id)=>{
//     const updatedStatus = {
//       status: value
//     }
//     try{
//       const res = await axios.put(`${apiBaseUrl}${getOrderHistory}${id}`, updatedStatus)
//       Alert.alert("Status Updated")
//       console.log(res)
//     }catch(err){
//       Alert.alert("Status Not Updated",err)
//     }
//   }

//   return (
//     <View  style={styles.container} >
//       <Text style={styles.header}>Set Status</Text>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         containerStyle={styles.dropdownContainer}
//         style={styles.dropdown}
//         dropDownStyle={styles.dropdownStyle}
//       />
//       <Text style={styles.selectedValue} >Selected Value: {value}</Text>
//       <TouchableOpacity style={{padding:5,borderRadius:10,backgroundColor:color.primary}} onPress={()=>handleUpdate(orderItems.orderAssignmentId)}>
//         <Text style={{color:color.white}}>Update Status</Text>
//       </TouchableOpacity>
//     </View>

//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//     justifyContent:"flex-end",
//   },
//   header: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   dropdownContainer: {
//     height: 40,
//     width: 200,
//     borderColor:"red",
//     zIndex:2

//   },
//   dropdown: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'green',
//   },
//   dropdownStyle: {
//     backgroundColor: '#c12626',
//   },
//   selectedValue: {
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

