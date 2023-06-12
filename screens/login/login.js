import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { firebase_auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behaviour="padding">
        <TextInput
          value={username}
          style={styles.input}
          placeholder="Enter your desired username!"
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          value={email}
          style={styles.input}
          placeholder="Enter your email!"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Enter your password!"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Create account" onPress={signUp} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4, 
    padding: 10,
    backgroundColor: '#fff'
  },

});
