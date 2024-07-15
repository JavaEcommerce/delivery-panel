import { View, Text, } from 'react-native'
import React, { createContext, useState ,useEffect,useContext} from 'react'
import NetInfo from '@react-native-community/netinfo'

const CheckInternetContext = createContext()
export const useCheckInternet = () => {
    return useContext(CheckInternetContext);
  };
export default function CheckInternetProvider({ children }) {
    const [isConnected, setIsConnected] = useState(true);
    try {
        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener(state => {
                setIsConnected(state.isConnected);
            });
            return () => {
                unsubscribe();
            };
        },[]);
    }
    catch (er) {
        console.log('Failed : ', er)
    }

    return (
        <CheckInternetContext.Provider value={{ isConnected }}>
            {children}
        </CheckInternetContext.Provider>
    )
}