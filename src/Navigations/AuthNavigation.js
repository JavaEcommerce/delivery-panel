import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '../Screens/auth/Login';
import ROUTES from '../Contants/routes';
import ForgotPass from '../Screens/auth/ForgotPass';
import Registration from '../Screens/auth/Registration';
import color from '../Contants/color';
import BottomTabNavi from './BottomTabNavi';
import Onboarding from '../Screens/OtherScreens/Onboarding';
import { useCheckInternet } from '../Context/CheckInternet';
import NoInternet from '../Components/NoInternet';

const Stack = createStackNavigator();

function AuthNavigator() {
  const {isConnected}=useCheckInternet()


  if(!isConnected){

    return(
      <NoInternet/>
    )
  }else{
    return (
      <Stack.Navigator 
        initialRouteName={"Onboarding"}
        screenOptions={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: color.primary,
          }
        }}
      >
        <Stack.Screen name={"Onboarding"} component={Onboarding} options={{ headerShown: false }} />
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
          name={ROUTES.BOTTOM_TAB} 
          component={BottomTabNavi}
          options={{ headerShown: false,
            gestureEnabled: false,
           }} 
        />
      </Stack.Navigator>
    );
  }
  
}


export default AuthNavigator;
