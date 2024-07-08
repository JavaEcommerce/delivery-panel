import { View, Text, Button } from 'react-native'
import React from 'react'
import color from '../Contants/color';
import PersonalDetails from '../Screens/ProfileScreens/PersonalDetailScreen';
import SecurityScreen from '../Screens/ProfileScreens/SecurityScreens';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/OtherScreens/Profile';
import routes from '../Contants/routes';
import TermsandCondition from '../Screens/ProfileScreens/Terms&Condition';

export default function ProfileNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: color.primary,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: color.primary,
      },
      headerBackTitleStyle: {
        color: color.primary,
      }
    }}>
      <Stack.Screen name={routes.PROFILE} component={Profile} options={{ headerShown: false }} />

      <Stack.Screen name={routes.PROFILE_PERSONAL_DETAILS} component={PersonalDetails} />

      <Stack.Screen name={routes.PROFILE_SECURITY_SCREEN} component={SecurityScreen} />

      <Stack.Screen name={routes.PROFILE_TERM_CONDITION} component={TermsandCondition} />
    </Stack.Navigator>
  )
}

