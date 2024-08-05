import { TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Box, Text, } from 'native-base'
import color from '../Contants/color';
import typography from '../Contants/fonts';
import axios from 'axios';
import { useProfile } from '../Context/ProfileContext';
import { apiBaseUrl, getAllOrders, postAllOrder } from '../Contants/api';
export default function AllOrderCard({ item }) {
    const { profileData, loading, error, refreshProfileData } = useProfile();
    const postOrder = async () => {
        const object = {
            order: {
                orderId: item?.orderId
            },
            deliveryPerson: {
                deliveryPersonId: profileData.deliveryPersonId
            },
            assignmentType: "self"

        }
        const res = await axios.put(`${apiBaseUrl}${postAllOrder}${item.orderAssignmentId}`, object)
    }
    return (
        <>
            <Box style={{ backgroundColor: 'white', borderWidth: .17, borderColor: color.primary, width: '90%', marginBottom: 15, borderRadius: Platform == 'IOS' ? 20 : 10, justifyContent: 'center', alignSelf: 'center' }}>
                <Box style={{ height: 180, padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: 15 }}>
                            <Text style={{ color: "white", textAlign: 'center', fontWeight: typography.h1.fontWeight }}>#{item?.orderId}</Text>
                        </Box >
                    </Box>
                    <Box style={{ gap: 10, marginTop: 10 }}>
                        <Text style={{ color: "black", fontWeight: typography.bold.fontWeight, fontSize: typography.subtitle.fontSize }} numberOfLines={4}>
                            🏠 : {item?.customerAddress?.houseNo ? `H-${item?.customerAddress?.houseNo}` : ''}
                            {item?.customerAddress?.flatNo ? `, F-${item?.customerAddress?.flatNo},` : ''}
                            {item?.customerAddress?.addressLine1}
                        </Text>
                        <Text style={{ color: "black", fontWeight: typography.bold.fontWeight }}>🕒 : {item?.orderDate}</Text>
                    </Box>

                    <Box style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => postOrder()}>
                            <Box style={{ backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 20 }}>
                                <Text style={{ color: "white", textAlign: 'center', fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight }}> Add to bucket </Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
