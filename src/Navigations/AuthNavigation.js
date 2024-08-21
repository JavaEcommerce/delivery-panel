import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import Login from '../Screens/auth/Login';
import ROUTES from '../Contants/routes';
import ForgotPass from '../Screens/auth/ForgotPass';
import Registration from '../Screens/auth/Registration';
import color from '../Contants/color';
import BottomTabNavi from './BottomTabNavi';
import Onboarding from '../Screens/OtherScreens/Onboarding';
import { useCheckInternet } from '../Context/CheckInternet';
import NoInternet from '../Components/NoInternet';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function AuthNavigator() {
  const { isConnected } = useCheckInternet();
  const { authTokens, setAuthTokens,userInfo } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      // const token = await AsyncStorage.removeItem('authTokens');
      const token = await AsyncStorage.getItem('authTokens');
      if (token) {
        setInitialRoute(ROUTES.BOTTOM_TAB);
      } else {
        setInitialRoute("Onboarding");
      }
    };
    loadToken();
  }, []);

  if (!initialRoute) {
    return null; // or a loading spinner
  }

  if (!isConnected) {
    return <NoInternet />;
  } else {
    return (
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: color.primary,
          }
        }}
      >
        <Stack.Screen
          name={ROUTES.BOTTOM_TAB}
          component={BottomTabNavi}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPass}
        />
        <Stack.Screen
          name={ROUTES.REGISTER}
          component={Registration}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigator;
