import { FlatList, } from 'react-native'
import React, { useState } from 'react'
import { Box, View, Text } from 'native-base'
import typography from '../../Contants/fonts';
import COLORS from '../../Contants/color';
import { Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import color from '../../Contants/color';
export default function BonusEarning() {
  const bonus = [
    {
      bonusAmount: 500.00,
      bonusType: 'Performance',
      date: '15 July 2024'
    },
    {
      bonusAmount: 300.00,
      bonusType: 'Referral',
      date: '15 July 2024'
    },
    {
      bonusAmount: 150.00,
      bonusType: 'High Rating',
      date: '15 July 2024'
    },
    {
      bonusAmount: 700.00,
      bonusType: 'Year-End',
      date: '15 July 2024'
    }
  ];

  const renderItems = ({ item }) => {
    return (
      <View key={item.orderId} style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, width: '100%', borderRadius: Platform == 'IOS' ? 20 : 10, gap: 10, borderWidth: 1, }} borderColor={'gray.300'} >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} gap={2}>
          <FontAwesome5 name="gift" size={16} color={'rgba(249, 84, 74, 1)'} />
          <Text color={'rgba(249, 84, 74, 1)'} style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize, }}>{item.bonusType}</Text>
        </View>
        <View style={{ flexDirection: 'row' }} justifyContent={'space-between'} alignItems={'center'}>
          <Text style={{ fontSize: typography.subtitle.fontSize, color: 'gray' }}>{item.date}</Text>
          <Text color={color.primary} style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize }}>+ ${item.bonusAmount}</Text>
        </View>

      </View>
    )
  }

  return (
    <View>
      <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <FlatList
          data={bonus}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          style={{ width: '90%', }}
        />

      </View>
    </View>
  )
}