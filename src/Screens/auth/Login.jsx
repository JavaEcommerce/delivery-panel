import {React,useRef} from 'react';
import { ScrollView, View, Image, Text, TextInput,Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from the Expo Icons library
import routes from '../../Contants/routes';
import COLORS from '../../Contants/color';

const Login = ({ navigation }) => {
    const imageTranslateX = useRef(new Animated.Value(-30)).current; // Initial translation value

    const handleLoginPress = () => {
        Animated.timing(imageTranslateX, {
            toValue: 100, // Translate the image to the right by 100 units
            duration: 500, // Animation duration
            useNativeDriver: true, // Use native driver for performance
        }).start(); // Start the animation
        // Navigate to the home screen after animation completes
        setTimeout(() => {
            navigation.navigate(routes.BOTTOM_TAB);
        }, 500);
    };


    return (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            
            <Animated.View style={{ transform: [{ translateX: imageTranslateX }], width: '50%', height: '30%', position: 'relative' }}>
                <Image
                    source={require('../../Assets/deliveryPng.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </Animated.View>
            <View style={{ width: '80%', height: '50%', alignItems: 'center',marginTop:-60, justifyContent:  'space-between', padding: 10,paddingTop:30, borderRadius: 10, }}>
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
                    <View style={{width:'100%',}}>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}>
                            <Text style={{ color: 'black', textAlign:'right', fontWeight: 'bold', marginTop: 5, marginBottom:15 }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10, }}>
                    <Text > Don't have an account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.REGISTER)}>
                        <Text style={{ color: COLORS.primary, fontWeight: 'bold', marginLeft: 10 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        fontSize: 16,
    },
};

export default Login;
