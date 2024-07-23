import {  Platform } from 'react-native'
import React from 'react'
import { View,Text } from 'native-base';
import typography from '../Contants/fonts';
import color from '../Contants/color';

export default function EarningHistoryCard({ item }) {
    let statusColor = '';
    switch (item.paymentStatus) {
        case 'Paid':
            statusColor = 'green';
            break;
        case 'Admin Pandings':
            statusColor = '#a77c18';
            break;
        case 'Pending':
            statusColor = '#ecbf58';
            break;
        case 'Failed':
            statusColor = 'red';
            break;
        default:
            statusColor = 'black';
    }
    const [date, timeWithMs] = item?.paymentDate ? item?.paymentDate.split(' ') : '';
    const time = timeWithMs ? timeWithMs.split('.')[0] : 'null';
    return (
        <View key={item.orderId} style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, width: '100%', borderRadius: Platform.OS === 'ios' ? 10 : 10, gap: 15, borderWidth: 1 }} borderColor={'gray.300'}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ padding: 4, color: 'black', borderRadius: Platform.OS === 'ios' ? 15 : 8, fontWeight: typography.h1.fontWeight, fontSize: typography.small.fontSize }}>#ORD{item.orderAssignmentId}</Text>
                <Text style={{ color: statusColor, fontSize: typography.small.fontSize, fontWeight: typography.bold.fontWeight }}>{item.paymentStatus}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: typography.subtitle.fontSize, color: 'gray' }}>{date} at {time} </Text>
                </View>
                <Text style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize }}>${Math.abs(item.amountPaid)}</Text>
            </View>
        </View>
    )
}