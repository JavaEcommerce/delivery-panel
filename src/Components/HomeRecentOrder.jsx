import { View, TouchableOpacity, Skeleton } from 'react-native'
import {React,useContext} from 'react'
import { Box,Text } from 'native-base'
import color from '../Contants/color'
import { OrderHistoryContext } from '../Context/OrderContext'
import { useInfiniteQuery } from '@tanstack/react-query'

const HomeRecentOrder = ({item}) => {

    let statusColor = '';
    switch (item.status) {
        case 'DELIVERED':
            statusColor = 'green';
            break;
        case 'DELIVERY_PERSON_REJECTED':
            statusColor = 'red';
            break;
        case 'UNABLE_TO_CONNECT':
            statusColor = '#fab005';
            break;
        case 'CUSTOMER_REJECTED':
            statusColor = 'red';
            break;
        default:
            statusColor = 'black';
    }
    const parseDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { date, time };
    };
    const { date: orderDate, time: orderTime } = parseDateTime(item.order.orderDate);


    return (
        <>
            <Box
                style={{
                    backgroundColor: 'white',
                    borderWidth: 0.17,
                    borderColor: color.primary,
                    width: '90%',
                    marginBottom: 15,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <>
                    <Box style={{ padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 0 }}>
                        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box px={5} style={{ backgroundColor: color.primary, padding: 5,  borderRadius: 15 }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>#{item.order.orderId}</Text>
                            </Box>
                            <Box style={{ padding: 5 }}>
                                <Text style={{ color: statusColor, textAlign: 'center', fontWeight: '900', fontSize: 12 }}>{item.status}</Text>
                            </Box>
                        </Box>
                        <Box style={{ gap: 5, marginTop: 10 }}>

                            <Text style={{ color: 'black', fontWeight: '300' }}>Time: {orderTime}, Date: {orderDate}</Text>

                            <Text style={{ color: 'black', fontWeight: '300' }}>Address : {item.order.customerAddress.addressLine1}</Text>
                        </Box>
                        <Box style={{ flexDirection: "column", gap: 5 }}>
                            <Box style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 2, }}>
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>Total Amount:</Text>
                                <Box bg={color.primary} borderRadius={10}>
                                <Text fontSize={18} color={'white'} fontWeight={'bold'} p={1} px={3}>$ {item.order.totalAmount}</Text>
                                </Box>
                            </Box>

                            {item.status == 'DELIVERED' ? (
                                <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>Payment : Cash On Delivery</Text>
                                </Box>)
                                : (<Box style={{ width: '100%', alignSelf: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>Cancelled</Text>
                                </Box>)}
                        </Box>
                    </Box>
                </>
            </Box>

        </>
    )
}

export default HomeRecentOrder