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
            tabBarOptions={{
                style: { backgroundColor: 'white', paddingTop: insets.top },
                indicatorStyle: {
                    borderBottomColor: color.primary,
                    borderBottomWidth: 2,
                },
                scrollEnabled: true,
                tabStyle: { width: 150 },
            }}
        >
            <Tab.Screen
                name={routes.ASSIGN_ORDERS}
                component={OrderDetailNavi}
                initialParams={{ navigation }}
            />
            <Tab.Screen
                name={routes.PENDINGS_ORDERS}
                component={NewOrders}
                initialParams={{ navigation }}
            />
            <Tab.Screen
                name={routes.All_ORDERS}
                component={AllOrders}
                initialParams={{ navigation }}
            />
            <Tab.Screen
                name={routes.ORDER_HISTORY}
                component={OrderHistory}
                initialParams={{ navigation }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({});
