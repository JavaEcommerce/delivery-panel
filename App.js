import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import AuthNavigator from './src/Navigations/AuthNavigation';
import { NativeBaseProvider, Box } from "native-base";
import { ProfileProvider } from './src/Context/ProfileContext';

export default function App() {
  return (
    <ProfileProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </ProfileProvider>
  );
}