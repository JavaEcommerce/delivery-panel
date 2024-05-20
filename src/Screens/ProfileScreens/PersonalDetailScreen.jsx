import React, { useState } from 'react';
import { TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Button, Pressable, Text, View, } from 'native-base';
import { apiBaseUrl, updateProfileById } from '../../Contants/api';
import color from '../../Contants/color';
import { Entypo } from '@expo/vector-icons';

export default function PersonalDetails({ route, navigation }) {
  const { profileData } = route.params;
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [firstMobileNumber, setFirstMobileNumber] = useState(profileData.firstMobileNumber);
  const [secondMobileNumber, setSecondMobileNumber] = useState(profileData.secondMobileNumber);
  const [city, setCity] = useState(profileData.city.cityName);
  const [country, setCountry] = useState(profileData.city.countryId.countryName);
  const [pincode, setPincode] = useState(profileData.pincode);
  const [latitude, setLatitude] = useState(profileData.latitude);
  const [longitude, setLongitude] = useState(profileData.longitude);

  const handleUpdate = async () => {
    const updatedProfileData = {
      name,
      firstMobileNumber,
      secondMobileNumber,
      city: {
        cityId: profileData.city.cityId,
      },
      pincode,
      latitude,
      longitude,
    };

    try {
      const response = await axios.put(`${apiBaseUrl}${updateProfileById}${3}`, updatedProfileData);
      Alert.alert("Profile Updated");
      navigation.goBack();
    } catch (error) {
      console.error('Error', error);
      Alert.alert("Update Failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text p={2} color={color.primary} fontWeight={'700'}>Your ID : #{profileData.deliveryPersonId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter First Mobile Number"
        value={firstMobileNumber}
        onChangeText={setFirstMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Second Mobile Number"
        value={secondMobileNumber}
        onChangeText={setSecondMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your City Name"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Location Latitude"
        value={latitude.toString()}
        onChangeText={text => setLatitude(parseFloat(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Location Longitude"
        value={longitude.toString()}
        onChangeText={text => setLongitude(parseFloat(text))}
        keyboardType="numeric"
      />
      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Save All Changes</Text>
        <Entypo name="save" size={18} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    gap: 3
  },
  input: {
    // height: 40,
    borderColor: color.primary,
    color: 'black',
    fontWeight: '600',
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: color.primary,
    width: '100%',
    padding:15,
    flexDirection:'row',
    gap:13,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
},
buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight:700
},
});
