import { View, Text } from 'react-native'
import React from 'react'
import { BarChart } from "react-native-gifted-charts";
import { View, Text } from 'native-base';
import color from '../../Contants/color';;
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
  const data = [
    1.3, 10, 20, 80, 50, 30, 35, 45, 30, 24, 23, 21, 19, 17, 16, 15, 14.5, 13,
    13, 13, 13, 13,
  ];
  return (
    <View bg={'white'} flex={1} alignItems={'center'} w={'100%'} >
      <View w={'90%'} gap={10} >
        <Text fontWeight={'bold'} fontSize={'lg'}>Your Activities</Text>
        <BarChart
          // width={'50%'}
          isAnimated
          barWidth={22}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
        // renderTooltip={(item, index) => {
        //   return (
        //     <View
        //       style={{
        //         marginBottom: 20,
        //         marginLeft: -6,
        //         backgroundColor: color.primary,

        //         paddingHorizontal: 6,
        //         paddingVertical: 4,
        //         borderRadius: 4,
        //       }}>
        //       <Text color={'white'}>{item.value}</Text>
        //     </View>
        //   )}}
        />
        
      </View>
    </View>
  )
}