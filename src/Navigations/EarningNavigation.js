import { StyleSheet ,LogBox} from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Dashboard from '../Screens/OtherScreens/Dashboard';
import EarningHistory from '../Screens/OtherScreens/EarningHistory';
import BonusEarning from '../Screens/OtherScreens/BonusEarning';
import { View, Text } from 'native-base';
import routes from '../Contants/routes';
import color from '../Contants/color';
import NoInternet from '../Components/NoInternet';

const Tab = createMaterialTopTabNavigator();

export default function EarningNavigation({ navigation }) {
    const insets = useSafeAreaInsets();
    return (
        <View bg={'white'} flex={1}  >

            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: [styles.containerStyle, { marginTop: insets.top, marginBottom: insets.bottom,overflow:'hidden' }],
                    tabBarIndicatorStyle: styles.indicator,
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#a6a6a6',
                    tabBarLabelStyle: styles.label,
                    

                }}
                // tabBarOptions={{
                //     scrollEnabled: true,
                //   }}
            >
                <Tab.Screen
                    name={routes.EARNING_DASHBOARD}
                    component={Dashboard}
                    options={{
                        tabBarLabel: 'Dashboard',

                    }}
                />

                <Tab.Screen

                    name={routes.EARNING_HISTORY}
                    component={EarningHistory}
                    options={{
                        tabBarLabel: 'Logs',
                    }}
                />
                <Tab.Screen

                    name={routes.EARNING_BONUS}
                    component={BonusEarning}
                    options={{
                        tabBarLabel: 'Bonus',
                    }}
                />
            </Tab.Navigator>

        </View>
    );
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: color.primary,
        position: 'absolute',
        zIndex: -1,
        bottom: '15%',
        left: "1%",
        justifyContent: 'center',
        alignItems: 'center',
        width: '31%',
        height: '70%',
        borderRadius: 7,
    },
    containerStyle: {
        backgroundColor: 'black',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
