// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import axios from "axios";
// import { apiBaseUrl, updateNewOrdersStatus } from "../Contants/api";
// import color from "../Contants/color";
// import routes from "../Contants/routes";

// export default function DeliveryStatus({ item, navigation }) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Unable To Connect', value: 'UnableToConnect' },
//     { label: 'Customer Rejected', value: 'CustomerRejected' },
//     { label: 'Delivered', value: 'Delivered' },
//   ]);

//   const handleUpdate = async (id) => {
//     const updatedStatus = { status: value };
//     try {
//       if (value === 'Delivered') {
//         navigation.navigate(routes.OTP_SCREEN, { item });
//       }
//       await axios.put(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, updatedStatus);
//       alert("Status Updated");
//       navigation.navigate(routes.ASSIGN_ORDERS);
//     } catch (error) {
//       alert('Failed to update status');
//       console.log(error);
//     }
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.container}>
//         <DropDownPicker
//           open={open}
//           value={value}
//           items={items}
//           setOpen={setOpen}
//           setValue={setValue}
//           setItems={setItems}
//           containerStyle={styles.dropdownContainer}
//           style={styles.dropdown}
//           dropDownStyle={styles.dropdownStyle}
//           selectedItemLabelStyle={styles.selectedValue}
//           labelStyle={styles.dropdownLabel}
//           placeholderStyle={styles.placeholderStyle}
//           listItemContainerStyle={styles.listItemContainer}
//           listItemLabelStyle={styles.listItemLabel}
//           dropDownContainerStyle={styles.dropDownContainer}
//         />
//         <TouchableOpacity style={styles.button} onPress={() => handleUpdate(item.orderAssignmentId)}>
//           <Text style={styles.buttonText}>Update Status</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: "100%",
//     width: '90%',
//     justifyContent: "flex-end",
//   },
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: color.white,
//     marginVertical: 20,
//     padding: 10,
//     borderRadius: 10,
//     // shadowColor: "#000",
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.84,
//     // elevation: 5,
//   },
//   dropdownContainer: {
//     width: '70%',
//   },
//   dropdown: {
//     backgroundColor: color.white,
//     borderWidth: 1,
//     borderColor: color.primary,
//     borderRadius: 8,
//   },
//   dropdownStyle: {
//     backgroundColor: color.white,
//   },
//   selectedValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: color.primary,
//   },
//   dropdownLabel: {
//     color: color.primary,
//   },
//   placeholderStyle: {
//     color: 'gray',
//   },
//   listItemContainer: {
//     backgroundColor: color.white,
//     borderBottomColor: color.primary,
//   },
//   listItemLabel: {
//     color: color.primary,
//   },
//   dropDownContainer: {
//     borderColor: color.primary,
//   },
//   button: {
//     padding: 14,
//     borderRadius: 10,
//     backgroundColor: color.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: color.white,
//     fontWeight: 'bold',
//   },
// });












import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Center,
  Box,
  TextInput,
  Actionsheet,
} from "native-base";
import { StyleSheet } from "react-native";
import color from "../Contants/color";
import routes from "../Contants/routes";
import DropDownPicker from 'react-native-dropdown-picker';
import { apiBaseUrl, updateNewOrdersStatus } from '../Contants/api';
import axios from 'axios';
import { TouchableOpacity, Alert } from "react-native"
import OtpSection from "./OtpSection";
export default function DeliveryStatus({ item, navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Unable To Connect', value: 'UnableToConnect' },
    { label: 'Customer Rejected', value: 'CustomerRejected' },
    { label: 'Delivered', value: 'Delivered' },
  ]);
  const handleUpdate = async (id) => {

    if (value === 'Delivered') {
      const updatedStatus = {
        status: value
      }
      try {
        navigation.navigate(routes.OTP_SCREEN, { item }, { navigation });
        const res = await axios.put(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, updatedStatus);
      } catch (error) {
        alert('Failed to updating status', error);
        console.log(error);
      }
    }
    else {
      const updatedStatus = {
        status: value
      }
      try {
        const res = await axios.put(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, updatedStatus);
        alert("Status Updated");
        navigation.navigate(routes.ASSIGN_ORDERS)
      } catch (error) {
        alert('Failed to updating status', error);
        console.log(error);
      }
    }

  }
  return (

    <View style={{width: '90%' }}>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownStyle={styles.dropdownStyle}
          selectedItemLabelStyle={styles.selectedValue}
        />
        <TouchableOpacity style={{ padding: 14, borderRadius: 10, backgroundColor: color.primary }} onPress={() => handleUpdate(item.orderAssignmentId)}>
          <Text style={{ color: color.white }}>Update Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: color.white,
    marginVertical: 20
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  dropdownContainer: {
    height: 40,
    width: 250,

  },
  dropdown: {
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.primary,


  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primary,
    height: '100%'
  },

});
