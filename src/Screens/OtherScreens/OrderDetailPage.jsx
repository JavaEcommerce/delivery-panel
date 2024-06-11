import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Center,
  Box,
  TextInput,


} from "native-base";
import routes from "../../Contants/routes";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet } from "react-native";
import color from "../../Contants/color";
import { Actionsheet } from "native-base";
import { useDisclose } from "native-base";
import DropDownPicker from 'react-native-dropdown-picker';
import { apiBaseUrl, updateNewOrdersStatus } from '../../Contants/api';
import axios from 'axios';
import { TouchableOpacity, Alert } from "react-native"


export default function OrderDetailPage({ navigation, route }) {
  const { item } = route.params



  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Unable To Connect', value: 'UnableToConnect' },
    { label: 'Customer Rejected', value: 'CustomerRejected' },
    { label: 'Delivery Person Rejected', value: 'DeliveryPersonRejected' },
    { label: 'Delivered', value: 'Delivered' },
  ]);

  const handleUpdate = async (id) => {
    const updatedStatus = {
      status: value
    }
    try {
      const res = await axios.put(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, updatedStatus);
      alert("Status Updated");
      navigation.navigate()
    } catch (error) {
      alert('Failed to updating status', error);
      console.log(error);
      console.log(updatedStatus);
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: "100%", width: '90%', justifyContent: "flex-end" }}>
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: color.white,
    // gap: 5,
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
    // borderWidth: 1,
    borderColor: color.primary,

  },
  dropdownStyle: {
    backgroundColor: "red",
    p: 20
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primary,
    height: '100%'
  },

});