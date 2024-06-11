import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import color from '../../Contants/color';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    fetch('https://your-api-endpoint/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Success', 'Password reset link has been sent to your email');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to send password reset link');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Submit" onPress={handleForgotPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems:'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width:'90%',
    height: 40,
    borderColor: color.primary,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});
