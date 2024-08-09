

import { React, useState } from 'react'
import color from '../Contants/color'
import { Box, Pressable, Image, View, Text } from 'native-base'
const profileImage = require('../Assets/userPic.jpeg');
const verified = require('../Assets/verified.png');
import routes from '../Contants/routes';
import typography from '../Contants/fonts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const HomeProfileCard = ({ navigation, isHomeNavigated, profileData }) => {
  const [isVerified, setIsVerified] = useState(profileData?.verified);
  if (isHomeNavigated) {
    return (
      <View bg={color.black} style={{ width: '90%', borderRadius: 20 }}>
        <Box style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE)} style={{ justifyContent: 'space-between', }}>
            <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              {/* <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={profileImage}
                alt='Profile Picture'
                width={"10"} /> */}
              <Box borderWidth={1} px={6} py={3} borderColor={'gray.500'} borderRadius={100} justifyContent={'center'} alignItems={'center'}>
                <Text lineHeight={50} pt={3} style={{ fontWeight: typography.bold.fontWeight, fontSize: 60, color: color.primary }}>
                  {profileData?.name?.slice(0, 1)?.toUpperCase()}
                </Text>
              </Box>
              <Box>
                <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'} gap={3}>
                  <Text style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize, color: 'white' }}>
                    {profileData?.name?.slice(0, 1)?.toUpperCase() + profileData?.name?.slice(1,)}</Text>
                  {isVerified && <MaterialIcons name="verified" size={18} color={color.primary} />}
                </Box>
                <Text style={{ fontSize: 14, color: 'white' }}>{profileData.email}</Text>
              </Box>
            </Box>
            <Box style={{ marginTop: 10, gap: 5 }}>
              <Text style={{ fontSize: typography.body.fontSize, fontWeight: typography.bold.fontWeight, color: 'white' }}>🏠 : {profileData.houseNo ? `H No-${profileData.houseNo}` : ''} ,{profileData.flatNo ? `F No-${profileData.flatNo}` : ''}, {profileData.addressLine} </Text>
              <Text style={{ fontSize: typography.body.fontSize, fontWeight: typography.bold.fontWeight, color: 'white', }}>
                📍 : {profileData?.city?.cityName?.slice(0, 1)?.toUpperCase() + profileData?.city?.cityName?.slice(1,)}
                , {profileData?.city?.countryId?.countryName?.slice(0, 1)?.toUpperCase() + profileData?.city?.countryId?.countryName?.slice(1)} , {profileData?.pincode}
              </Text>
              <Text style={{ fontSize: typography.body.fontSize, fontWeight: typography.bold.fontWeight, color: 'white' }}>📱 : {profileData.firstMobileNumber}</Text>
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
        <View style={{ backgroundColor: color.black, width: '90%', borderRadius: 20, marginTop: 5 }}>
          <Box style={{ padding: 15 }}>
            <Pressable gap={3} style={{ justifyContent: 'space-between' }}>
              <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                {/* <Image
                  style={{ width: 90, height: 90, borderRadius: 50 }}
                  source={profileImage}
                  alt='Profile Picture'
                  width={"10"} /> */}
                <Box borderWidth={1} px={6} py={3} borderColor={'gray.500'} borderRadius={100} justifyContent={'center'} alignItems={'center'}>
                  <Text lineHeight={50} pt={3} style={{ fontWeight: typography.bold.fontWeight, fontSize: 60, color: color.primary }}>
                    {profileData?.name?.slice(0, 1)?.toUpperCase()}
                  </Text>
                </Box>
                <Box>
                  <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'} gap={3}>
                    <Text style={{ fontWeight: typography.bold.fontWeight, fontSize: typography.mainHeading.fontSize, color: 'white' }}>
                      {profileData?.name?.slice(0, 1)?.toUpperCase() + profileData?.name?.slice(1,)}
                    </Text>
                    {isVerified && <MaterialIcons name="verified" size={18} color={color.primary} />}
                  </Box>

                  <Text style={{ fontSize: typography.subtitle.fontSize, color: 'white' }}>
                    {profileData?.email}
                  </Text>
                </Box>
              </Box>
              <Box style={{ marginTop: 8, gap: 10 }}>
                <Text style={{ fontSize: typography.body.fontSize, fontWeight: typography.bold.fontWeight, color: 'white', }}>
                  🏠 : {profileData?.houseNo ? `H No-${profileData?.houseNo}` : ''}
                  {profileData?.flatNo ? `, F No-${profileData?.flatNo}` : ''}, {profileData?.addressLine}
                </Text>
                <Text style={{ fontSize: typography.body.fontSize, fontWeight: typography.bold.fontWeight, color: 'white', }}>
                  📍 : {profileData?.city?.cityName?.slice(0, 1)?.toUpperCase() + profileData?.city?.cityName?.slice(1,)}
                  , {profileData?.city?.countryId?.countryName?.slice(0, 1)?.toUpperCase() + profileData?.city?.countryId?.countryName?.slice(1)} , {profileData?.pincode}
                </Text>
                <View flexDir={'row'} gap={3}>
                  <Text style={{ fontSize: typography.body.fontSize, color: 'white', fontWeight: typography.bold.fontWeight }}>
                    📱 : {profileData?.firstMobileNumber}
                  </Text>
                  <Text style={{ fontSize: typography.body.fontSize, color: 'white', fontWeight: typography.bold.fontWeight }}>
                    📱 : {profileData?.secondMobileNumber}
                  </Text>
                </View>
                <View flexDir={'row'} gap={3}>
                  <Text style={{ fontSize: typography.body.fontSize, color: 'white', fontWeight: typography.bold.fontWeight }}>
                    🌍 : {profileData?.latitude}  Latitude
                  </Text>
                  <Text style={{ fontSize: typography.body.fontSize,  color: 'white', fontWeight: typography.bold.fontWeight }}>
                    🌍 : {profileData?.longitude} Longitude
                  </Text>
                </View>
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