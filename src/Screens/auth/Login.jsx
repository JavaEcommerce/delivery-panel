import { React, useRef } from 'react';
import { ScrollView, View, Image, Text, TextInput, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from the Expo Icons library
import routes from '../../Contants/routes';
import COLORS from '../../Contants/color';
import { LinearGradient } from 'expo-linear-gradient';
import typography from '../../Contants/fonts';

const Login = ({ navigation }) => {
    const imageTranslateX = useRef(new Animated.Value(-30)).current;

    const handleLoginPress = () => {
        Animated.timing(imageTranslateX, {
            toValue: 100,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            navigation.navigate(routes.BOTTOM_TAB);
        }, 500);
    };


    return (
        // <LinearGradient
        //     colors={['#9ACA00', '#C2DF66', '#ffff']}
        //     style={{styles.container}}
        // >
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>

                <Animated.View style={{ transform: [{ translateX: imageTranslateX }], width: '50%', height: '30%', position: 'relative',}}>
                    <Image
                        source={require('../../Assets/deliveryPng.png')}
                        style={{ width: '100%', height: '100%', }}
                        resizeMode="contain"
                        alt='img'
                    />
                </Animated.View>
                <View style={{ width: '80%', height: '50%', alignItems: 'center', marginTop: -60, justifyContent: 'space-between', padding: 10, paddingTop: 30, borderRadius: 10, }}>
                    <View style={{ width: '100%', alignItems: 'center', padding: 20, borderRadius: 10, }}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.icon} />
                            <TextInput
                                placeholder="Email"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} style={styles.icon} />
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ width: '100%', }}>
                            <TouchableOpacity onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}>
                                <Text style={{ color: 'black', textAlign: 'right', fontWeight: typography.h6.fontWeight, marginTop: 5, marginBottom: 15, fontSize:typography.subtitle.fontSize }} >Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10, }}>
                        <Text style={{fontSize:typography.subtitle.fontSize}}> Don't have an account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
                            <Text style={{ color: COLORS.primary, fontWeight: typography.h6.fontWeight ,fontSize:typography.subtitle.fontSize, marginLeft: 10 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        // </LinearGradient>
    );
}

const styles = {
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontSize: typography.heading.fontSize,
    },
};

export default Login;
