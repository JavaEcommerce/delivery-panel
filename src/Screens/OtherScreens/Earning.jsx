import { Box } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../Contants/color';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Contants/routes';
const profileImage = require('../../Assets/userPic.jpeg');
const verified = require('../../Assets/verified.png');
export default function Earning({ navigation }) {
    const [isVerified, setIsVerified] = useState(true); // State for verification status

    const recentOrders = [
        {
            id: '1',
            status: 'Delivered',
            address: '123 Main Street',
            timestamp: '10:00 AM',
            paymentMethod: 'Credit Card'
        },
        {
            id: '2',
            status: 'Pending',
            address: '456 Elm Street',
            timestamp: '11:30 AM',
            paymentMethod: 'Cash On Delivery'
        },
        {
            id: '3',
            status: 'Cancelled',
            address: '789 Oak Street',
            timestamp: '1:00 PM',
            paymentMethod: 'PayPal'
        },
        {
            id: '4',
            status: 'Delivered',
            address: '101 Maple Avenue',
            timestamp: '2:30 PM',
            paymentMethod: 'Credit Card'
        },
        {
            id: '5',
            status: 'Pending',
            address: '202 Pine Street',
            timestamp: '4:00 PM',
            paymentMethod: 'Cash On Delivery'
        },
        {
            id: '6',
            status: 'Cancelled',
            address: '303 Cedar Street',
            timestamp: '5:30 PM',
            paymentMethod: 'PayPal'
        },
    ];


    const renderOrderItem = ({ item }) => {
        let statusColor = '';
        switch (item.status) {
            case 'Delivered':
                statusColor = color.primary;
                break;
            case 'Pending':
                statusColor = '#fab005';
                break;
            case 'Cancelled':
                statusColor = 'red';
                break;
            default:
                statusColor = 'black';
        }

        return (
            <Box
                style={{
                    backgroundColor: 'white',
                    borderWidth: 0.17,
                    borderColor: color.primary,
                    width: '90%',
                    marginBottom: 15,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <TouchableOpacity>
                    <Box style={{ height: 180, padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: 15 }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 900 }}>#{item.id}</Text>
                            </Box>
                            <Box style={{ padding: 5 }}>
                                <Text style={{ color: statusColor, textAlign: 'center', fontWeight: 900 }}>{item.status}</Text>
                            </Box>
                        </Box>
                        <Box style={{ gap: 10, marginTop: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 700 }}>Address : {item.address}</Text>
                            <Text style={{ color: 'black', fontWeight: 700 }}>Time: {item.timestamp}</Text>
                        </Box>
                        <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 20 }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 900 }}>Payment : {item.paymentMethod}</Text>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </Box>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 20, }}>
                <View style={styles.toggleContainer}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, color: 'black', letterSpacing: 2 }}>
                        Balance </Text>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 56, color: color.primary, letterSpacing: 2 }}>
                        $450 </Text>
                </View>
                <Box style={{ padding: 10, height: '100%' }}>
                    <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    </Box>
                </Box>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: color.primary,
        justifyContent: 'space-between',
        paddingTop: 100
    },
    toggleContainer: {
        justifyContent: 'center',
        width: '80%',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -50,
        backgroundColor: 'white',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        zIndex: 100,

        gap: 10,
    },
});
