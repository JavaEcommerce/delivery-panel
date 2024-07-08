import React, { useState } from 'react';
import { TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button, Pressable, ScrollView, Text, View, } from 'native-base';
import { apiBaseUrl, updateProfileById } from '../../Contants/api';
import color from '../../Contants/color';
import { Entypo } from '@expo/vector-icons';
import { useProfile } from '../../Context/ProfileContext';

export default function PersonalDetails({ route, navigation }) {
  const { profileData, loading, error, refreshProfileData } = useProfile();

  const [name, setName] = useState(profileData.name);
  const [firstMobileNumber, setFirstMobileNumber] = useState(profileData.firstMobileNumber);
  const [city, setCityName] = useState(profileData.city.cityName);
  const [secondMobileNumber, setSecondMobileNumber] = useState(profileData.secondMobileNumber);
  const [pincode, setPincode] = useState(profileData.pincode);
  const [longitude, setLongitute] = useState(profileData.longitude.toString());
  const [latitude, setLatitude] = useState(profileData.latitude.toString());
  const [houseNo, setHouseNo] = useState(profileData.houseNo);
  const [flatNo, setFlatNo] = useState(profileData.flatNo);
  const [addressLine, setaddressLine] = useState(profileData.addressLine);
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")

  const handleUpdate = async () => {
    const updatedDetails = {
      name,
      firstMobileNumber,
      secondMobileNumber,
      city: {
        cityId: profileData.city.cityId
      },
      pincode,
      longitude,
      latitude,
      houseNo,
      flatNo,
      addressLine

    }

    try {
      const res = await axios.put(`${apiBaseUrl}${updateProfileById}3`, updatedDetails)

      alert('Profile updated successfully');
      navigation.navigate('My Profile', 'ok');

    }
    catch (error) {
      console.log(error, error.message);
      alert('Failed to updating profile', error);
      console.log(error)
    }
  };


  const validateEmail = (text) => {
    setEmail(text);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
  const validateName = (text) => {
    const alphabetic = /^[A-Za-z\s]*$/;
    setName(text);
    if (!alphabetic.test(text)) {
      setNameError('Please enter only alphabetic characters.');
    } else {
      setNameError('');
    }
  };

  return (
    <ScrollView>
      <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: color.white }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            height: "100%"

          }}
        >

          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
              width: "100%",
              height: "100%"

            }}

          >


            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}

              onChangeText={validateName}

            />
            {nameError ? <Text style={{ color: "red", paddingVertical: 3 }}>{nameError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              readOnly
              value={profileData.email}
              onChangeText={validateEmail}

              keyboardType="email-address"
            />
            {emailError ? <Text style={{ color: "red", paddingVertical: 3 }}>{emailError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="First Number"
              value={firstMobileNumber}
              onChangeText={setFirstMobileNumber}
              maxLength={10}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Number"
              value={secondMobileNumber}
              maxLength={10}
              onChangeText={setSecondMobileNumber}
              keyboardType="phone-pad"

            />
            <TextInput
              style={styles.input}
              placeholder="House No"
              value={houseNo}
              onChangeText={setHouseNo}


            />
            <TextInput
              style={styles.input}
              placeholder="Flate No"
              value={flatNo}
              onChangeText={setFlatNo}

            />
            <TextInput
              style={styles.input}
              placeholder=" Address Line"
              value={addressLine}
              onChangeText={setaddressLine}
            />
            <TextInput
              style={styles.input}
              placeholder="City Name"
              value={city}
              onChangeText={setCityName}


            />

            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="phone-pad"

            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="phone-pad"

            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={longitude}
              onChangeText={setLongitute}
              keyboardType="phone-pad"

            />



            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >

              <TouchableOpacity onPress={handleUpdate} style={{ width: "100%", justifyContent: "center", backgroundColor: color.primary, padding: 8, borderRadius: 5, alignItems: "center" }}><Text style={{ width: 80, color: color.white, fontSize: 20 }}>Update</Text></TouchableOpacity>


            </View>
          </View>
        </View>

      </View>
    </ScrollView>
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
    padding: 15,
    flexDirection: 'row',
    gap: 13,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 700
  },
});


