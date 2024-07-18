import { Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { View, Text, FlatList, ScrollView, Pressable, } from 'native-base';
import typography from '../../Contants/fonts';

import DashBoardChart from '../../Components/DashBoardChart'
import EarningCard from '../../Components/EarningCard';
import { TextInput } from 'react-native-gesture-handler';
export default function Dashboard() {
  const [amount, setAmount] = useState()
  const addSpacesBetweenCharacters = (text) => {
    return text.split('').join(' ');
  };
  return (
    <View bg={'white'} flex={1} alignItems={'center'} w={'100%'} >
      <ScrollView showsVerticalScrollIndicator={false} w={'90%'}>
        <View w={'100%'} gap={10} >
          <View w={'100%'} gap={5} >
            <EarningCard />
          </View>
          <DashBoardChart />
          <View gap={5}>
            <Text style={{ fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight }}>Withdraw Methods</Text>
            <TextInput
              style={{ borderRadius: 10, borderBottomWidth: 1, borderColor: 'lightgray', padding: 20, fontSize: typography.h2.fontSize, }}
              inputMode='numeric'
              keyboardType='numeric'
              placeholderTextColor='lightgray'
              placeholder='Enter Withdraw Amount '
              value={amount ? addSpacesBetweenCharacters(`₹ ${amount}`) : ''}
              onChangeText={(text) => setAmount(text.replace(/^₹\s?/, '').replace(/[^0-9]/g, ''))}
            />
            <Pressable onPress={() => console.log(amount)} bg={'black'} p={4} borderRadius={10} mb={5} justifyContent={'center'} alignItems={'center'} >
              <Text color={'white'} fontSize={typography.heading.fontSize} fontWeight={typography.bold.fontWeight}>Withdraw </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>

  )
}