
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
import typography from "../Contants/fonts";
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

    <View style={{width: '90%'}}>
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
          dropDownContainerStyle={{
            backgroundColor: "#f2f2f2",
            borderWidth:0,
            borderRadius:10
          }}
          listItemLabelStyle={{
            color: "black",
            fontWeight:'bold',
          }} 
          translation={{
            PLACEHOLDER: "Update Order Status"
          }}
          selectedItemLabelStyle={styles.selectedValue}
        />
        <TouchableOpacity style={{ padding: 14, borderRadius: 10, backgroundColor: color.primary }} onPress={() => handleUpdate(item.orderAssignmentId)}>
          <Text style={{ color:'white',fontSize:typography.body.fontSize, }}>Update Status</Text>
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
    fontSize: typography.heading.fontSize,
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
    fontSize: typography.body.fontSize,
    fontWeight: typography.bold.fontWeight ,
    color: color.primary,
    height: '100%'
  },

});
