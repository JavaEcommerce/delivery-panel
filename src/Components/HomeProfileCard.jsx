import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Box, Pressable, Image } from 'native-base';
import color from '../Contants/color';
import routes from '../Contants/routes';

const profileImage = require('../Assets/userPic.jpeg');
const verified = require('../Assets/verified.png');

const HomeProfileCard = ({ navigation, profile, isHomeNavigated }) => {
  const [isVerified, setIsVerified] = useState(profile?.isVarified);

  if (isHomeNavigated) {
    return (
      <View style={{ height: "30%", backgroundColor: color.primary, width: '90%', borderRadius: 20 }}>
        <Box style={{ padding: 10 }}>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE, profile)} style={{ justifyContent: 'space-between', height: '100%' }}>
            <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={profileImage}
                alt={profile?.name}
                width={"10"} />
              <Box>
                <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                  {profile?.name?.toUpperCase()} </Text>
                  {isVerified && <Image source={verified} style={{ width: 20, height: 20 }} />}
                </Box>

                <Text style={{ fontSize: 14, color: 'white' }}>{profile?.email}</Text>
              </Box>
            </Box>
            <Box style={{ marginTop: 10, gap: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>🏠 D-32 Ashoka Garden </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>📍 {profile?.city?.cityName} , {profile?.city?.countryId?.countryName}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>📱 {profile?.firstMobileNumber}</Text>
            </Box>
            <Box style={{ alignSelf: 'center' }}>
            </Box>
          </Pressable>
        </Box>
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor: color.primary, width: '90%', borderRadius: 20 }}>
        <Box style={{ padding: 10 }}>
          <Pressable style={{ justifyContent: 'space-between', }}>
            <Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={profileImage}
                alt={profile?.name}
                width={"10"} />
              <Box>
                <Box flexDir={'row'} justifyContent={"start"} alignItems={'center'}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                  {profile?.name?.toUpperCase()} </Text>
                  {isVerified && <Image source={verified} style={{ width: 20, height: 20 }} />}
                </Box>
                <Text style={{ fontSize: 14, color: 'white' }}>{profile?.email}</Text>
              </Box>
            </Box>
            <Box style={{ marginTop: 10, gap: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Home :  D-32 Ashoka Garden </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>City : {profile?.city?.cityName}, {profile?.city?.countryId?.countryName}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Pincode:  {profile?.pincode}</Text>
              <Box flexDir={'row'} gap={3}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Latitude : {profile?.latitude} ,</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Longitude : {profile?.longitude}</Text>
              </Box>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Mobile :  {profile?.firstMobileNumber}</Text>
            </Box>
            <Box style={{ alignSelf: 'center' }}>
            </Box>
          </Pressable>
        </Box>
      </View>
    );
  }
};

export default HomeProfileCard;
