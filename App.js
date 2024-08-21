import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/Navigations/AuthNavigation';
import { NativeBaseProvider, Box } from "native-base";
import { ProfileProvider } from './src/Context/ProfileContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderHistoryProvider } from './src/Context/OrderContext';
import CheckInternetProvider from './src/Context/CheckInternet';
import { AuthProvider } from './src/Context/AuthContext';

const queryClient = new QueryClient()
export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <NativeBaseProvider>
          <CheckInternetProvider>
            <QueryClientProvider client={queryClient}>
              <ProfileProvider>
                <OrderHistoryProvider>
                  <AuthNavigator />
                </OrderHistoryProvider>
              </ProfileProvider>
            </QueryClientProvider>
          </CheckInternetProvider>
        </NativeBaseProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}