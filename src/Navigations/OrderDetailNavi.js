import { View, Text, Button } from 'react-native';
import React from 'react';
import color from '../Contants/color';
import { createStackNavigator } from '@react-navigation/stack';
import routes from '../Contants/routes';
import ActiveOrders from '../Screens/OtherScreens/ActiveOrders';
import OrderDetailPage from '../Screens/OtherScreens/OrderDetailPage';
import OtpSection from '../Components/OtpSection';

export default function OrderDetailNavi() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={({
                headerTintColor: color.primary,
                headerStatusBarHeight: 10,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTitleStyle: {
                    color: color.primary,
                },
                headerBackTitleStyle: {
                    color: color.primary,
                },
            })}
        >
            <Stack.Screen name={routes.ASSIGN_ORDERS} component={ActiveOrders} options={{ headerShown: false }} />
            <Stack.Screen name={routes.ORDER_DETAIL} component={OrderDetailPage} />
            <Stack.Screen name={routes.OTP_SCREEN} component={OtpSection} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}


