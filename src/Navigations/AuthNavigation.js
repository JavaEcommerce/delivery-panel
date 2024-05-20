import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../Screens/auth/Login';
import ROUTES from '../Contants/routes';
import ForgotPass from '../Screens/auth/ForgotPass';
import Registration from '../Screens/auth/Registration';
import color from '../Contants/color';
import BottomTabNavi from './BottomTabNavi';
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: color.primary,
      }
    }}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPass} />
      <Stack.Screen name={ROUTES.REGISTER} component={Registration} />
      <Stack.Screen name={ROUTES.BOTTOM_TAB} component={BottomTabNavi}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;