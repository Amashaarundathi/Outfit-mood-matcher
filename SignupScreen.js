import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';

export default function SignupScreen({ onSignup, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const url = Platform.OS === 'android' ? 'http://10.0.2.2:5000/signup' : 'http://localhost:5000/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        onSwitchToLogin();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title={loading ? "Creating account..." : "Sign Up"} onPress={handleSignup} disabled={loading} />
      
      <Button title="Already have an account? Login" onPress={onSwitchToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});