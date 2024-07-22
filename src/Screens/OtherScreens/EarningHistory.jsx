import { FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from 'native-base'
import typography from '../../Contants/fonts';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Pressable } from 'native-base';

export default function EarningHistory() {
  const [filter, setFilter] = useState(null)
  const option = [
    {
      label: 'Last Month',
      value: '1'
    },
    {
      label: 'Last 10 days',
      value: '2'
    },
    {
      label: 'Last week',
      value: '2'
    },
  ]
  const earnings = [
    {
      time: '10:00 AM',
      date: '15 July 2024 ',
      amount: 100.00,
      paymentStatus: 'Paid',
      orderId: 'ORD001'
    },
    {
      time: '11:30 AM',
      date: '15 July 2024',
      amount: 150.50,
      paymentStatus: 'Pending',
      orderId: 'ORD002'
    },
    {
      time: '01:00 PM',
      date: '15 July 2024',
      amount: 200.75,
      paymentStatus: 'Paid',
      orderId: 'ORD003'
    },
    {
      time: '02:45 PM',
      date: '15 July 2024',
      amount: 50.25,
      paymentStatus: 'Admin Pandings',
      orderId: 'ORD004'
    },
    {
      time: '02:45 PM',
      date: '15 July 2024',
      amount: 50.25,
      paymentStatus: 'Failed',
      orderId: 'ORD004'
    }
  ];
  const renderItems = ({ item }) => {
    let statusColor = '';
    switch (item.paymentStatus) {
      case 'Paid':
        statusColor = 'green';
        break;
      case 'Admin Pandings':
        statusColor = '#a77c18';
        break;
      case 'Pending':
        statusColor = '#ecbf58';
        break;
      case 'Failed':
        statusColor = 'red';
        break;
      default:
        statusColor = 'black';
    }

    return (
      <View key={item.orderId} style={{ paddingTop:Platform.OS=='ios'?0:20,backgroundColor: 'white', padding: 10, marginBottom: 10, width: '100%', borderRadius: Platform.OS == 'ios' ? 10 : 10, gap: 15, borderWidth: 1, }} borderColor={'gray.300'} >
        <View style={{ flexDirection: 'row' }} justifyContent={'space-between'} alignItems={'center'} >
          <Text style={{ padding: 4, color: 'black', borderRadius: Platform == 'IOS' ? 15 : 8, fontWeight: typography.h1.fontWeight, fontSize: typography.small.fontSize }}>#{item.orderId}</Text>
          <Text style={{ color: statusColor, fontSize: typography.small.fontSize, fontWeight: typography.bold.fontWeight }}>{item.paymentStatus}</Text>
        </View>
        <View style={{ flexDirection: 'row' }} justifyContent={'space-between'}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} justifyContent={'center'} >
            <Text style={{ fontSize: typography.subtitle.fontSize, color: 'gray' }}>{item.date} at </Text>
            <Text style={{ fontSize: typography.subtitle.fontSize, color: 'gray' }}>{item.time} </Text>
          </View>
          <Text style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize }}>${item.amount}</Text>
        </View>

      </View>
    )
  }
  const renderOptions = ({ item }) => {
    return (
      <>
        <Menu.Item onPress={() => setFilter(item.value)}>{item.label}</Menu.Item>
      </>
    )
  }

  return (

    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View w={'90%'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} pb={5}>
        <Text fontSize={typography.heading.fontSize} fontWeight={typography.heading.fontWeight}>Filter</Text>
        <Menu w="190" trigger={triggerProps => {
          return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>;
        }}>
          <FlatList
            data={option}
            scrollEnabled={false}
            renderItem={renderOptions} />
        </Menu>

      </View>
      <FlatList
        data={earnings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        style={{ width: '90%', }}

      />

    </View>

  )
}


const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    borderColor: 'gray',
    // backgroundColor: 'black',
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});