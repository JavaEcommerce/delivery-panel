import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Box, Switch } from 'native-base';
import color from '../Contants/color';
import { apiBaseUrl, updateStatusByProfileId } from '../Contants/api';

const ActiveStatus = ({ profile }) => {
    const [isOnline, setIsOnline] = useState(profile.status === 'STATUS_ONLINE');
    const toggleOnline = async () => {
        setIsOnline(previousState => !previousState);

        const newStatus = !isOnline ? 'STATUS_ONLINE' : 'STATUS_OFFLINE';
        const payload = { status: newStatus };

        try {
            const response = await fetch(`${apiBaseUrl}${updateStatusByProfileId}3`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

        } catch (error) {
            console.error('Error updating status:', error.message);
            setIsOnline(previousState => !previousState);
        }
    };

    return (
        
        <View style={{ justifyContent: 'space-between', width: '90%', flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20, gap: 10 }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontWeight: "700" }}>{isOnline ? 'Hey 👋🏻' : 'Bye 👋🏻'}, {profile.name}</Text>
            </Box>
            <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Text style={{ fontWeight: "700" }}>{isOnline ? 'Online' : 'Offline'}</Text>
                <Switch
                    value={isOnline}
                    onValueChange={toggleOnline}
                    trackColor={{ false: 'green', true: color.primary }}
                />
            </Box>
        </View>
    );
}

export default ActiveStatus;