import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native'; // Import Picker
import { Ionicons } from '@expo/vector-icons';
import routes from '../../Contants/routes';
import COLORS from '../../Contants/color';
import DatePicker from 'react-native-modern-datepicker'
import { ScrollView } from 'native-base';
import { useProfile } from '../../Context/ProfileContext';
const Registration = ({ navigation }) => {
    const { addDeliveryPerson } = useProfile();
    const [dob, setDob] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleDateSelect = (date) => {
        setDob(date);
    };
    const selectGender = (gender) => {
        setSelectedGender(gender);
    };
    const handleRegister = async () => {
        const personData = {
          firstName,
          lastName,
          email,
          mobileNumber,
          gender: selectedGender,
          dob
        };
        try {
          await addDeliveryPerson(personData);
          navigation.navigate(routes.HOME_TAB);
        } catch (error) {
          console.error('Registration failed:', error.message);
        }
      };

      return (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{ width: '50%', height: '30%', position: 'relative' }}>
            <Image
              source={require('../../Assets/deliveryPng.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View style={{ width: '80%', height: '60%', alignItems: 'center', marginTop: -60, justifyContent: 'center', padding: 10, paddingTop: 30, borderRadius: 10 }}>
            <View style={{ width: '100%', alignItems: 'center', padding: 20, borderRadius: 10 }}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color={COLORS.primary} style={styles.icon} />
                <TextInput
                  placeholder="First Name"
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color={COLORS.primary} style={styles.icon} />
                <TextInput
                  placeholder="Last Name"
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={24} color={COLORS.primary} style={styles.icon} />
                <TextInput
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  style={styles.input}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>
              <View style={[styles.inputContainer, styles.genderInput]}>
                <Ionicons name="transgender-outline" size={24} color={COLORS.primary} style={styles.icon} />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                  <TouchableOpacity onPress={() => selectGender('Male')} style={styles.radioButton}>
                    <View style={[styles.radioInner, selectedGender === 'Male' && styles.radioSelected]} />
                    <Text style={styles.radioButtonLabel}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectGender('Female')} style={styles.radioButton}>
                    <View style={[styles.radioInner, selectedGender === 'Female' && styles.radioSelected]} />
                    <Text style={styles.radioButtonLabel}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectGender('Other')} style={styles.radioButton}>
                    <View style={[styles.radioInner, selectedGender === 'Other' && styles.radioSelected]} />
                    <Text style={styles.radioButtonLabel}>Other</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
    
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.primary} style={styles.icon} onPress={() => setModalVisible(true)} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <TextInput
                    placeholder="Date of Birth"
                    editable={false}
                    value={dob}
                    style={styles.input}
                  />
                </TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>Select Date of Birth</Text>
                      <DatePicker
                        mode="calendar"
                        onSelectedChange={(date) => handleDateSelect(date)}
                        style={styles.datePicker}
                      />
                      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 10 }}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <Text style={{ color: COLORS.primary, fontWeight: 'bold', marginLeft: 10 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    genderInput: {
        justifyContent: 'space-between'
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    input: {
        paddingLeft: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 40,
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    datePicker: {
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginRight: 20,
        marginLeft: 20
    },
    radioInner: {
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 2,
        padding: 2,
        borderColor: COLORS.primary,
        marginRight: 10,
    },
    radioSelected: {
        backgroundColor: COLORS.primary,
    },
    radioButtonLabel: {
        fontSize: 16,
    },
    scrollViewContent: {
        flexDirection: 'row', // Ensure items are arranged horizontally
        alignItems: 'center', // Align items in the center of the ScrollView
    },
});

export default Registration;
