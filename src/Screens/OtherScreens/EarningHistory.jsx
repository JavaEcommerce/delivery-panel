import { FlatList,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, View, Text } from 'native-base'
import typography from '../../Contants/fonts';
import { Platform } from 'react-native';
export default function EarningHistory() {

  const earnings
    = [
      {
        time: '10:00 AM',
        date: '15 July 2024 ',
        amount: 100.00,
        paymentStatus: 'Paid',
        orderId: 'ORD001'
      },
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
        paymentStatus: 'Admin Pendings',
        orderId: 'ORD004'
      },
      {
        time: '02:45 PM',
        date: '15 July 2024',
        amount: 50.25,
        paymentStatus: 'Admin Pendings',
        orderId: 'ORD004'
      }
    ];

  const renderItems = ({ item }) => {

    let statusColor = '';

    switch (item.paymentStatus) {
      case 'Paid':
        statusColor = 'green';
        break;
      case 'Admin Pendings':
        statusColor = '#a77c18';
        break;
      case 'Pending':
        statusColor = '#ecbf58';
        break;
      default:
        statusColor = 'black';
    }
    return (
      <View key={item.orderId} style={{ backgroundColor: 'white', padding: 15, marginBottom: 10, width: '100%', borderRadius: Platform == 'IOS' ? 20 : 10, gap: 10, borderWidth: 1, }} borderColor={'gray.300'} >
        <View style={{ flexDirection: 'row' }} justifyContent={'space-between'} alignItems={'center'} >
          <Text borderRadius={Platform.OS = 'ios' ? 10 : 8} style={{  color: 'black', fontWeight: typography.h1.fontWeight, fontSize: typography.small.fontSize }}>#{item.orderId}</Text>
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
  return (

    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
         
      <FlatList
        data={earnings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        style={{ width: '90%' }}

      />
      
    </View>

  )
}