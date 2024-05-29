import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import routes from '../../Contants/routes';
import { Box, Button, Pressable, ScrollView, Skeleton, Text, View, useToast } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../Context/ProfileContext';
import HomeProfileCard from '../../Components/HomeProfileCard';

const Profile = ({ navigation }) => {
  const { profileData, loading, error, refreshProfileData } = useProfile();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      refreshProfileData();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.skeletonContainer}>
        <Skeleton w={'90%'} h={300} mt={5} borderRadius={20} />
        <Skeleton w={'90%'} h={100} mt={5} borderRadius={20} />
        <Skeleton w={'90%'} h={100} mt={5} borderRadius={20} />
        <Skeleton w={'90%'} h={100} mt={5} borderRadius={20} />
        <Skeleton w={'90%'} h={100} mt={5} borderRadius={20} />
      </SafeAreaView>
    );
  } else if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  } else if (!profileData) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>No profile data available.</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <HomeProfileCard navigation={navigation} profileData={profileData} />
        <Box shadow={1} alignItems={'center'} gap={3} justifyContent={'center'}>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE_PERSONAL_DETAILS, { profileData })} style={styles.pressable}>
            <Text fontWeight={'bold'}>Personal Detail</Text>
            <FontAwesome name="angle-right" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE_SECURITY_SCREEN)} style={styles.pressable}>
            <Text fontWeight={'bold'}>Security</Text>
            <FontAwesome name="angle-right" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE_TERM_CONDITION)} style={styles.pressable}>
            <Text fontWeight={'bold'}>Term & Conditions</Text>
            <FontAwesome name="angle-right" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE_TERM_CONDITION)} style={styles.pressable}>
            <Text fontWeight={'bold'}>Contact Us</Text>
            <FontAwesome name="angle-right" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.signOutPressable}>
            <Text fontWeight={'bold'} color={'white'}>SIGN OUT</Text>
            <Ionicons name="exit-outline" size={24} color="white" />
          </Pressable>
        </Box>
      </SafeAreaView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  skeletonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '90%',
    borderRadius: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signOutPressable: {
    width: '90%',
    borderRadius: 10,
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(249, 84, 74, 1)',
  },
});
