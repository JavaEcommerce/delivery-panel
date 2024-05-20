import React from 'react'
import { View, Text, Button, Pressable, } from 'native-base'
import routes from '../../Contants/routes'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import color from '../../Contants/color';


export default function OrderDetailPage({ navigation, route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={{backgroundColor:'white'}}>
            <View>
                <Pressable w={'10%'} p={3} justifyContent={'center'} bg={'white'} alignItems={'center'} onPress={() => navigation.navigate(routes.ASSIGN_ORDERS)}>
                    <Ionicons name="chevron-back" size={24} color={color.primary} />
                </Pressable>
                
                <Text>{item.Amount}</Text>
            </View>
        </SafeAreaView>
    )
}