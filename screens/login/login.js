import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { firebase_auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Input, Stack, Center, NativeBaseProvider } from 'native-base';
import { Button } from 'react-native-paper';


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
    <Stack space={3} w="80%" maxW="300px" mx="auto">
        <Input variant="rounded"
          borderColor="#f79256"
          bgColor="#fff"
          size="md"
          value={username}
          placeholder="Enter your username"
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />

        <Input variant="rounded"
          borderColor="#f79256"
          bgColor="#fff"
          size="md"
          value={email}
          placeholder="Enter your email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />

        <Input variant="rounded"
          borderColor="#f79256"
          bgColor="#fff"
          size="md"
          secureTextEntry={true}
          value={password}
          placeholder="Enter your password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <Button mode="contained" loading={loading} icon="refresh" buttonColor="#f79256">Loading</Button>
        ) : (
          <>
            <Button mode="contained" onPress={signIn} buttonColor="#f79256">Login</Button>
            <Button mode="contained" onPress={signUp} buttonColor="#f79256">Create account</Button>
          </>
        )}
    </Stack>
  );
};

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Login />
      </Center>
    </NativeBaseProvider>
  )
};

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
