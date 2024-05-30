
import { View, Text, } from 'react-native'
import { React, useState } from 'react'
import color from '../Contants/color'
import { Box, Pressable, Image } from 'native-base'
const profileImage = require('../Assets/userPic.jpeg');
const verified = require('../Assets/verified.png');
import routes from '../Contants/routes';
import { useContext } from 'react';
import { PersonalDetailsContext } from '../Context/ProfileContext';
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeProfileCard = ({ navigation, isHomeNavigated, profileData }) => {
  const [isVerified, setIsVerified] = useState(profileData?.isVarified);
  if (isHomeNavigated) {
    return (
      <View style={{ height: "30%", backgroundColor: color.primary, width: '90%', borderRadius: 20 }}>
        <Box style={{ padding: 10 }}>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE)} style={{ justifyContent: 'space-between', height: '100%' }}>
            <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={profileImage}
                width={"10"} />
              <Box>
                <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                    {profileData?.name?.slice(0, 1)?.toUpperCase() + profileData?.name?.slice(1,)}</Text>
                  {isVerified && <Image source={verified} style={{ width: 20, height: 20, }} />}
                </Box>

                <Text style={{ fontSize: 14, color: 'white' }}>{profileData.email}</Text>
              </Box>
            </Box>
            <Box style={{ marginTop: 10, gap: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>🏠 {profileData.houseNo ? `H No-${profileData.houseNo}` : ''} ,{profileData.flateNo ? `F No-${profileData.flateNo}` : ''}, {profileData.addressLine} </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>📍 {profileData.city.cityName}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>📱 {profileData.firstMobileNumber}</Text>
            </Box>
            <Box style={{ alignSelf: 'center' }}>
            </Box>
          </Pressable>
        </Box>
      </View>
    )
  } else {
    return (
      <>
        <View style={{ height: "37%", backgroundColor: color.primary, width: '90%', borderRadius: 20 }}>
          <Box style={{ padding: 10 }}>
            <Pressable style={{ justifyContent: 'space-between', height: '100%' }}>
              <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={profileImage}
                  width={"10"} />
                <Box>
                  <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                      {profileData?.name?.slice(0, 1)?.toUpperCase() + profileData?.name?.slice(1,)}
                    </Text>
                    {isVerified && <Image source={verified} style={{ width: 20, height: 20, }} />}
                  </Box>

                  <Text style={{ fontSize: 14, color: 'white' }}>
                    {profileData?.email}
                  </Text>
                </Box>
              </Box>
              <Box style={{ marginTop: 8, gap: 2 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', height: 20 }}>
                  🏠 {profileData?.houseNo ? `H No-${profileData?.houseNo}` : ''}
                  {profileData?.flateNo ? `, F No-${profileData?.flateNo}` : ''}, {profileData?.addressLine}
                </Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', height: 23 }}>
                  📍 {profileData?.city?.cityName?.slice(0, 1)?.toUpperCase() + profileData?.city?.cityName?.slice(1,)}
                  -{profileData?.city?.countryId?.countryName}, {profileData?.pincode}
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, color: color.white, fontWeight: 'bold' }}>
                  📱 {profileData?.firstMobileNumber}
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, color: color.white, fontWeight: 'bold' }}>
                  📱 {profileData?.secondMobileNumber}
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, color: color.white, fontWeight: 'bold' }}>
                  Latitude: {profileData?.latitude}
                </Text>
                <Text style={{ fontSize: 17, marginLeft: 5, color: color.white, fontWeight: 'bold' }}>
                  Longitude: {profileData?.longitude}
                </Text>
              </Box>
              <Box style={{ alignSelf: 'center' }}>
              </Box>
            </Pressable>
          </Box>
        </View>

      </>
    )
  }

}

export default HomeProfileCard