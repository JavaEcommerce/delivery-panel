import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import color from '../Contants/color';
import axios from 'axios';
import { Dimensions, StyleSheet } from 'react-native';
import { apiBaseUrl, authenticateOTP, updateNewOrdersStatus } from '../Contants/api';
import routes from '../Contants/routes';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OtpSection({ route, navigation }) {
    const [OtpCode, setOtpCode] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(90);

    useEffect(() => {
        let timer;
        if (isResendDisabled) {
            timer = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 90;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isResendDisabled]);

    const optMatching = async () => {
        if (OtpCode.length > 0) {
            const payLoad = {
                otp: OtpCode,
                orderId: route.params.item.orderId,
                orderAssignmentId: route.params.item.orderAssignmentId
            };
            try {
                const sentOtp = await axios.post(`${apiBaseUrl}${authenticateOTP}`, payLoad);
                if (sentOtp.data.authenticated) {
                    alert('Order Confirmed');
                    navigation.navigate(routes.ASSIGN_ORDERS);
                } else {
                    alert('No Matched');
                }
            } catch (error) {
                console.error('OTP verification failed', error);
            }
        } else {
            alert('Enter OTP');
        }
    };

    const resendOTP = async (id) => {
        const updatedStatus = {
            status: 'Delivered'
        };
        try {
            setIsResendDisabled(true);
            await axios.put(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, updatedStatus);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'flex-start' }} >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../Assets/Animation - 1718104901501.json')}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            </View>
            <View bg={'white'} justifyContent={'center'} alignItems={'center'} gap={5} >
                <View flexDir={'row'} gap={2}>
                    <Text textAlign={'center'} fontWeight={'bold'} fontSize={'md'}>Enter</Text>
                    <Text textAlign={'center'} fontWeight={'bold'} fontSize={'md'} color={color.primary}>OTP</Text>
                    <Text textAlign={'center'} fontWeight={'bold'} fontSize={'md'}>to Confirm Order</Text>
                </View>
                <TextInput
                    style={{ backgroundColor: '#f2f2f2', width: '60%', height: 60, padding: 20, color: color.primary, borderRadius: 10 }}
                    inputMode="numeric"
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                    onChangeText={setOtpCode}
                    maxLength={6}
                    placeholder='Enter OTP' />
                <View flexDir={'row'} justifyContent={'space-between'}>
                    <Pressable
                        bg={color.primary}
                        p={3}
                        w={'30%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={10}
                        onPress={optMatching}
                    >
                        <Text fontWeight={'bold'} color={'white'}>Submit OTP</Text>
                    </Pressable>
                    <Pressable
                        flexDir={'row'}
                        w={'30%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={10}
                        onPress={() => resendOTP(route.params.item.orderAssignmentId)}
                        disabled={isResendDisabled}
                    >


                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap:5, alignItems: 'center' }}>
                            {isResendDisabled ? (
                                <>
                                    <Ionicons name="time" size={24} color="gray" />
                                    <Text fontWeight={'bold'} color='gray.400'>{` ${countdown}s`}</Text>
                                </>
                            ) : (
                                <Text fontWeight={'bold'} color='gray.400'>Resend OTP</Text>
                            )}
                        </View>

                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    lottie: {
        width: width * 0.8,
        height: height * 0.3,
    },
});
