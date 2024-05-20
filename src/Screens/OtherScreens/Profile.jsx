import { StyleSheet, SafeAreaView, } from 'react-native'
import { React, useState, useEffect,useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import routes from '../../Contants/routes'
import { Box, Pressable, Text } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import color from '../../Contants/color';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useProfile } from '../../Context/ProfileContext';
import HomeProfileCard from '../../Components/HomeProfileCard';

const Profile = ({ navigation }) => {
  const { profileData, loading, error, refreshProfileData } = useProfile();

  useFocusEffect(
    useCallback(() => {
      refreshProfileData();
    }, [])
  );
 

  return (
    <SafeAreaView style={{ justifyContent: 'space-around', flex: 1, backgroundColor: 'white', alignItems: 'center', }}>
      {profileData && <HomeProfileCard navigation={navigation} profile={profileData} />}
      <Box shadow={1} alignItems={'center'} gap={3} justifyContent={'center'}>
        <Pressable onPress={() => navigation.navigate(routes.PROFILE_PERSONAL_DETAILS,{ profileData })} w={'90%'} borderRadius={10} h={"60"} flexDir={'row'} justifyContent={'space-between'} px={10} alignItems={'center'} bg={'white'} >
          <Text fontWeight={'bold'}>Personal Detail</Text>
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.PROFILE_SECURITY_SCREEN)} w={'90%'} borderRadius={10} h={"60"} flexDir={'row'} justifyContent={'space-between'} px={10} alignItems={'center'} bg={'white'} >
          <Text fontWeight={'bold'}>Security</Text>
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.PROFILE_TERM_CONDITION)} w={'90%'} borderRadius={10} h={"60"} flexDir={'row'} justifyContent={'space-between'} px={10} alignItems={'center'} bg={'white'} >
          <Text fontWeight={'bold'}>Term & Conditions</Text>
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate(routes.PROFILE_TERM_CONDITION)} w={'90%'} borderRadius={10} h={"60"} flexDir={'row'} justifyContent={'space-between'} px={10} alignItems={'center'} bg={'white'} >
          <Text fontWeight={'bold'}>Contact Us</Text>
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
        <Pressable w={'90%'} borderRadius={10} h={"12%"} flexDir={'row'} justifyContent={'space-between'} gap={3} px={10} alignItems={'center'} bg={`rgba(249, 84, 74, 1)`} >
          <Text fontWeight={'bold'} color={'white'}>SIGN OUT</Text>
          <Ionicons name="exit-outline" size={24} color="white" />
        </Pressable>
      </Box>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})