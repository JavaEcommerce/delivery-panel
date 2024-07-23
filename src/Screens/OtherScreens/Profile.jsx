import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import routes from '../../Contants/routes';
import { Box, Pressable, ScrollView, Skeleton, Text, View, useToast } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../Context/ProfileContext';
import HomeProfileCard from '../../Components/HomeProfileCard';
import typography from '../../Contants/fonts';
const Profile = ({ navigation, route }) => {
  const { profileData, loading, error, refreshProfileData } = useProfile();

  useFocusEffect(
    useCallback(() => {
      if (route?.params == 'ok') {
        refreshProfileData();
        navigation.setParams({ refresh: false });
      }
    }, [route.params])
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
        <View borderRadius={10} w={'90%'} flexDir={'row'} p={2} justifyContent={'space-between'} alignItems={'center'}>
          <Text style={{ fontSize: typography.heading.fontSize, fontWeight: typography.bold.fontWeight, }}> Setup Your Profile</Text>
          <Ionicons name="settings-outline" size={20} color="black" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}  style={{width:'90%',}}>

          <Box shadow={1} alignItems={'center'} gap={3} justifyContent={'center'}>
            <Pressable onPress={() => navigation.navigate(routes.PROFILE_PERSONAL_DETAILS, { profileData },)} style={styles.pressable}>
              <Text fontWeight={typography.bold.fontWeight}>Personal Detail</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate(routes.PROFILE_SECURITY_SCREEN)} style={styles.pressable}>
              <Text fontWeight={typography.bold.fontWeight}>Security</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate(routes.PROFILE_TERM_CONDITION)} style={styles.pressable}>
              <Text fontWeight={typography.bold.fontWeight}>Term & Conditions</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate(routes.PROFILE_CONTACT_US)} style={styles.pressable}>
              <Text fontWeight={typography.bold.fontWeight}>Contact Us</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate(routes.PROFILE_RETURN_POLICY)} style={styles.pressable}>
              <Text fontWeight={typography.bold.fontWeight}>Return Policy</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.signOutPressable}>
              <Text fontWeight={typography.bold.fontWeight} color={'white'}>SIGN OUT</Text>
              <Ionicons name="exit-outline" size={24} color="white" />
            </Pressable>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    gap: 25,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  skeletonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '100%',
    borderRadius: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  signOutPressable: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom:20,
    alignItems: 'center',
    backgroundColor: 'rgba(249, 84, 74, 1)',
  },
});
