import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Box, Switch } from 'native-base';
import color from '../Contants/color';
import { apiBaseUrl, updateStatusByProfileId } from '../Contants/api';
import typography from '../Contants/fonts';
import axiosInstance from '../Utils/useAxios';

const ActiveStatus = ({ profile }) => {


  const [isOnline, setIsOnline] = useState(profile.status =='STATUS_ONLINE');
  const [disable,setDisable] = useState(false)
  
  const toggleOnline = async () => {
    const newStatus = isOnline ? 'STATUS_ONLINE' : 'STATUS_OFFLINE';
    const payload = { status: newStatus };

    try {
        setDisable(true);
        // Use axiosInstance to send the PUT request
        const response = await axiosInstance.put(
            `${updateStatusByProfileId}3`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        setDisable(false);
        setIsOnline(previousState => !previousState);

        if (response.status !== 200) {
            throw new Error('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error.message);
    } finally {
        // Optionally re-enable the switch after a delay
        // setTimeout(() => setDisable(false), 4000);
    }
};

  
    
  return (

    <View style={{ justifyContent: 'space-between', width: '90%', flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20, gap: 10  }}>
      <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text  style={{ fontWeight: typography.bold.fontWeight,fontSize: typography.body.fontSize }}>{isOnline ? 'Hey 👋🏻' : 'Bye 👋🏻'}, {profile.name}</Text>
      </Box>
      <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontWeight: typography.bold.fontWeight,fontSize: typography.body.fontSize }}>{isOnline ? 'Online' : 'Offline'}</Text>
        <Switch
          value={isOnline}
          onValueChange={toggleOnline}
          trackColor={{ false: 'gray', true: color.primary }}
          isDisabled={disable}
        />
      </Box>
    </View>
  );
}

export default ActiveStatus;



