import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiBaseUrl } from '../Contants/api';

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

//-------------------------- Add a request interceptor ------------------------
axiosInstance.interceptors.request.use(
    async (config) => {
        const authTokens = await AsyncStorage.getItem('authTokens');
        if (authTokens) {
            // const parsedTokens = JSON.stringify(authTokens);
            config.headers.Authorization = `Bearer ${authTokens}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//------------------------ Add a response interceptor -----------------------
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized error globally if needed (like logging out the user)
        if (error.response.status === 401) {
            // Optionally, you can trigger a logout or show a message to the user
            // Example: window.location.pathname = '/login';  // Adjust based on your navigation
            console.log("Unauthorized access - please log in again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
