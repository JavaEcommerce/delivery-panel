import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiBaseUrl, signin, signup, logoutAuth } from '../Contants/api';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import AuthNavigator from '../Navigations/AuthNavigation';
import routes from '../Contants/routes';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [authTokens, setAuthTokens] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useNavigation()

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${apiBaseUrl}${signin}`, credentials);
            const token = response?.data?.token;
            setAuthTokens(token);
            await AsyncStorage.setItem('authTokens', response?.data?.token);
            setUserInfo(jwtDecode(response?.data?.token));
            if (authTokens) {
               navigation.navigate(routes.BOTTOM_TAB)
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await axios.post(`${apiBaseUrl}${logoutAuth}`);
            setAuthTokens(null);
            setUserInfo(null);
            await AsyncStorage.removeItem('authTokens');
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const registerUser = async (userData) => {
        try {
            await axios.post(`${apiBaseUrl}${signup}`, userData);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('authTokens');
            if (token) {
                setAuthTokens(token);
                setUserInfo(jwtDecode(token));
            } else {
                setAuthTokens(null);
                setUserInfo(null);
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, [authTokens]);

    // if (isLoading) {
    //     // Return a loading indicator or splash screen while checking login status
    //     return <LoadingScreen />; // Replace with your loading component
    // }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, authTokens, registerUser, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
