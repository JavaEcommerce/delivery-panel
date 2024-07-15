import { } from 'react-native'
import React from 'react'
import { BarChart } from "react-native-gifted-charts";
import { View, Text } from 'native-base';

export default function Dashboard() {
  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ];
  return (
    <View bg={'white'} flex={1} justifyContent={'center'} alignItems={'center'} w={'100%'} >
      <BarChart
        // width={'50%'}
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  )
}