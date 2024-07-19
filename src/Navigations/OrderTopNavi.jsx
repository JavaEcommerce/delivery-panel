import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import routes from '../Contants/routes';
import AllOrders from '../Screens/OtherScreens/AllOrders';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OrderHistory from '../Screens/OtherScreens/OrderHistory';
import color from '../Contants/color';
import NewOrders from '../Screens/OtherScreens/NewOrders';
import OrderDetailNavi from './OrderDetailNavi';

const Tab = createMaterialTopTabNavigator();

export default function OrderTopNavi({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: { backgroundColor: color.primary },
                tabBarStyle: { backgroundColor: 'white', paddingTop: insets.top, },
                tabBarItemStyle: { borderBottomColor: color.primary },


            }}
        >
            <Tab.Screen
                name={routes.ORDER_DETAIL_NAVIGATION}
                component={OrderDetailNavi}
                options={{
                    tabBarLabel: 'Active Orders',
                }}
            />
            <Tab.Screen
                name={routes.PENDINGS_ORDERS}
                component={NewOrders}
            />
            <Tab.Screen
                name={routes.All_ORDERS}
                component={AllOrders}
            />
            <Tab.Screen
                name={routes.ORDER_HISTORY}
                component={OrderHistory}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({});
