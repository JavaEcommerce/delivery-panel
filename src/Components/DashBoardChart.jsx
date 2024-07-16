import React from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { View,Text } from 'native-base'
import typography from '../Contants/fonts'
import color from '../Contants/color'
export default function DashBoardChart() {
  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: color.primary },
    { value: 745, label: 'W', frontColor: color.primary },
    { value: 820, label: 'T' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: color.primary },
    { value: 256, label: 'S' },
    { value: 300, label: 'S', frontColor: color.primary },
  ];
  return (
    <>
    <View w={'100%'} gap={5} >
            <Text style={{ fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight }}>Activities</Text>
            <BarChart
              // width={'50%'}
              isAnimated
              barWidth={22}
              noOfSections={4}
              barBorderRadius={4}
              frontColor="lightgray"
              data={barData}
              yAxisThickness={0}
              xAxisThickness={0}
              renderTooltip={(item, index) => {
                return (
                  <View
                    style={{
                      marginBottom: 5,
                      marginLeft: -6,
                      backgroundColor: color.primary,

                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}>
                    <Text color={'white'}>{item.value}</Text>
                  </View>
                )
              }}
            />
          </View>
    </>
    
  )
}