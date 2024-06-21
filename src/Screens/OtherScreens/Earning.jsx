import { Box, Image, View, Text } from 'native-base';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../Contants/color';
const profileImage = require('../../Assets/icons8-checkmark-48.png');
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const paymentDetails = [
    {
        status: 'Completed',
        time: '2023-06-12 14:30',
        deliveryAddress: '1234 Main St, Springfield, USA'
    },
    {
        status: 'Pending',
        time: '2023-06-11 10:00',
        deliveryAddress: '5678 Elm St, Shelbyville, USA'
    },
    {
        status: 'Completed',
        time: '2023-06-11 10:00',
        deliveryAddress: '5678 Elm St, Shelbyville, USA'
    },
    {
        status: 'Pending',
        time: '2023-06-11 10:00',
        deliveryAddress: '5678 Elm St, Shelbyville, USA'
    },
    {
        status: 'Completed',
        time: '2023-06-11 10:00',
        deliveryAddress: '5678 Elm St, Shelbyville, USA'
    },
    {
        status: 'Completed',
        time: '2023-06-10 09:15',
        deliveryAddress: '9101 Oak St, Capital City, USA'
    }
];

renderItems = ({ item }) => {
    return (
        <View borderWidth={1} borderColor={'#6B8D00'} mt={2} borderRadius={20} p={3} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <View w={'80%'}>
                <Text fontSize={16} fontWeight={'semibold'} color={color.primary}>Time: {item.time}</Text>
                <Text fontSize={14} color={color.primary}>Delivery Address: {item.deliveryAddress}</Text>
            </View>
            {item.status === 'Completed' ? (
                <Feather name="check-circle" size={26} color={color.primary} />
            ) : (
                <AntDesign name="exclamationcircle" size={26} color={color.primary} />
            )}
        </View>

    )
}
export default function Earning({ navigation }) {
    return (

        <SafeAreaView style={styles.container}>

            <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 20, alignItems: 'center' }}>
                <View style={styles.toggleContainer}>
                    <View bg={'#C2DF66'} w={'50%'} p={5} borderRadius={20} justifyContent={'center'} alignItems={'center'}>
                        <Text fontWeight={'900'} fontSize={36} color={'white'}>
                            $ 450
                        </Text>
                        <View flexDir={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>
                            <Ionicons name="wallet" size={20} color="white" />
                            <Text fontWeight={'bold'} fontSize={16} justifyContent={'center'} alignItems={'center'} color={'white'}>
                                Your Income
                            </Text>

                        </View>
                    </View>
                    <View bg={'white'} w={'50%'} p={5} borderRadius={20} justifyContent={'center'} alignItems={'center'}>
                        <Text fontWeight={'900'} fontSize={36} color={color.primary}>
                            <AntDesign name="star" size={24} color={color.primary} />
                            <AntDesign name="star" size={24} color={color.primary} />
                            <AntDesign name="star" size={24} color={color.primary} />
          
                        </Text>
                        <View flexDir={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>
                            {/* <Ionicons name="wallet" size={20} color="#6B8D00" /> */}
                            <Fontisto name="smiley" size={20} color="#6B8D00" />
                            <Text fontWeight={'bold'} fontSize={16} justifyContent={'center'} alignItems={'center'} color={'#6B8D00'}>
                                Your Growth
                            </Text>

                        </View>
                    </View>

                </View>

                <Box style={{ padding: 10, height: '100%', width: '90%' }}>
                    <FlatList
                        data={paymentDetails}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItems} />
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
        flexDirection: 'row',
        width: '85%',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -50,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 100,
        gap: 5,
    },
    paymentDetailsContainer: {
        flexDirection: 'row',

        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    paymentDetailsText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
});


{/* <LinearGradient
                    colors={['#9ACA00', '#C2DF66', '#ffff']}
                ></LinearGradient> */}