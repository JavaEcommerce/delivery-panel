import { StyleSheet, Image, Linking } from 'react-native';
import React from 'react';
import { View, Text, Button, Pressable } from 'native-base';
import color from '../Contants/color';
const NoInternetImg = require('../Assets/deliveryPng.png')
export default function NoInternet() {
    return (
        <>
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Image
                        source={NoInternetImg}
                        style={{ width: 400, height: 400 }}
                        alt='No Internet'
                        resizeMode='contain' />
                    <View justifyContent={'center'} alignItems={'center'} position={'absolute'} bottom={10}>
                        <Text shadow={1} fontSize={'lg'} fontWeight={'bold'} color={'red.500'} >No Internet Connection 😓</Text>
                        <Text fontSize={'lg'} fontWeight={'bold'} color={color.primary}>Check Your Internet Connection</Text>
                    </View>
                </View>
                <Pressable py={4} borderRadius={20} position={'absolute'} bottom={10} w={'90%'} justifyContent={'center'} alignItems={'center'} onPress={() => Linking.openSettings()}>
                    <Text fontSize={'xl'} fontWeight={'semibold'} color={'white'}>Go to Setting</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        flex: 1,
        gap: 30,
        backgroundColor: color.primary,
    },
    innerContainer: {
        height: '80%',
        width: '100%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 0,
        gap: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noInternetText: {
        color: 'Black',
        fontWeight: typography.heading.fontWeight,
    },
});
