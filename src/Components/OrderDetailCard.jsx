import { View, Text, FlatList, } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import color from '../Contants/color'

export default function OrderDetailCard(getData) {
    const data = getData?.data.productItemsList
    console.log(data, 'dataa')


    const renderItem = ({ item }) => {
        return (
            <>
                <View alignItems={'center'} alignSelf={'center'} justifyContent={'space-between'} mt={7} gap={5}>

                    <View borderBottomWidth={1} borderBottomColor={'gray.300'} w={'100%'} flexDir={'row'} justifyContent={'space-between'} py={3} >
                        <View gap={2}>
                            <Text color={'black'} fontSize={'xl'} fontWeight={'semibold'}>{item.itemName}</Text>
                            <Text fontSize={'xl'} fontWeight={'normal'}>Per Item Price : {item.perItemPrice}  x {item.itemQuantity}</Text>
                        </View>
                        <View gap={2} alignItems={'flex-end'}>
                            <Text fontSize={'xl'} fontWeight={'semibold'}>Total Price </Text>
                            <Text fontSize={'xl'} fontWeight={'normal'}>{item.totalItemPrice}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    }
    return (
        <>
            <View flex={1}>
                <FlatList
                    data={data}
                    width={'90%'}
                    renderItem={renderItem} />
                <View flexDir={'row'} w={'90%'} borderRadius={10} borderColor={'gray.300'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                    {data.length > 1 ?
                        (<>
                            <Text color={color.primary} fontSize={'lg'} fontWeight={'bold'}>All Items Price : </Text>
                        </>) : (<>
                            <Text color={color.primary} fontSize={'lg'} fontWeight={'bold'}>Item Price : </Text>
                        </>)}
                    <View bg={color.primary} borderRadius={5} px={3} py={1} alignItems={'center'} justifyContent={'center'}>
                        <Text color={'white'} fontSize={'lg'} fontWeight={'bold'}>{getData?.data.totalPrice}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}