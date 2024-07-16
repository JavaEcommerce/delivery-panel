
import React from 'react'
import typography from '../Contants/fonts'
import { View, Text } from 'native-base'
export default function EarningCard() {
    return (
        <>
            <Text style={{ fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight }}>Earnings</Text>
            <View flexDir={'row'} p={5} borderRadius={10} justifyContent={'space-between'} bg={'white'} borderWidth={.7} borderColor={'gray.300'}>
                <View justifyContent={'center'} alignItems={'center'}  >
                    <Text fontSize={typography.h1.fontSize}>$250</Text>
                    <Text fontSize={typography.body.fontSize} color={'gray.400'}>Amount</Text>
                </View>
                <View justifyContent={'center'} alignItems={'center'}  >
                    <Text fontSize={typography.h1.fontSize}>5</Text>
                    <Text fontSize={typography.body.fontSize} color={'gray.400'}>Orders</Text>
                </View>
                <View justifyContent={'center'} alignItems={'center'}  >
                    <Text fontSize={typography.h1.fontSize}>3.5</Text>
                    <Text fontSize={typography.body.fontSize} color={'gray.400'}> Star Rating</Text>
                </View>
            </View>
        </>
    )
}