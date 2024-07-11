import { StyleSheet } from 'react-native';
import React from 'react';
import { Image, View, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import color from '../Contants/color'; 

export default function NoInternet() {
    return (
        <>
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Image
                        source={require('../Assets/123.png')}
                        alt='No Internet'
                        resizeMode='contain' 
                    />
                    <View justifyContent={'center'} alignItems={'center'} position={'absolute'} bottom={10}>
                        <Text fontSize={'md'} fontWeight={'bold'} color={'red.500'} >No Internet Connection 😓</Text>
                        <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>Check Your Internet Connection</Text>
                    </View>
                </View>
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
        color: 'black',
        fontWeight: 'bold',
    },
});
