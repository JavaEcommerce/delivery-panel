import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import routes from '../Contants/routes';
import Home from '../Screens/OtherScreens/Home';
import Profile from '../Screens/OtherScreens/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import color from '../Contants/color';
import { Foundation } from '@expo/vector-icons';
import OrderTopNavi from '../Navigations/OrderTopNavi';
import ProfileNavigation from './ProfileNavigation';
import EarningNavigation from './EarningNavigation';
const Tab = createBottomTabNavigator();


function BottomTabNavi() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { height: '10%' },
                headerShown: false,
                tabBarActiveTintColor: color.primary,
                tabBarInActiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '400',
                },
                tabBarIcon: ({ color, size, focused }) => {
                    if (route.name === routes.HOME) {
                        return focused ? <Ionicons name="home" size={20} color={color} /> : <Ionicons name="home-outline" size={20} color='black' />;
                    } else if (route.name === routes.ORDER) {
                        return focused ? <FontAwesome5 name="box-open" size={20} color={color} /> : <Feather name="box" size={20} color='black' />;
                    } else if (route.name === routes.PROFILE_NAVIGATION) {
                        return focused ? <FontAwesome name="user" size={20} color={color} /> : <FontAwesome name="user-o" size={20} color='black' />;
                    } else if (route.name === routes.EARNING) {
                        return focused ? <Foundation name="dollar" size={28} color={color} /> : <Feather name="dollar-sign" size={20} color='black' />;
                    }
                }
            })}>

            <Tab.Screen name={routes.HOME} component={Home} />
            <Tab.Screen name={routes.ORDER} component={OrderTopNavi} />
            <Tab.Screen name={routes.EARNING} component={EarningNavigation} />
            <Tab.Screen name={routes.PROFILE_NAVIGATION} component={ProfileNavigation}
                options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
}


export default BottomTabNavi;