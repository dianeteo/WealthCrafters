import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { firebase_auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Input, Stack, Center, NativeBaseProvider,Text,Spacer } from 'native-base';
import { Button } from 'react-native-paper';
import { doc, setDoc } from '@firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (username.length == 0) {
      alert("Enter a username!");
    }   
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      await setDoc(doc(db, 'users', email), {
        username: username,
        email: email
      });
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
            <View style={{top:60}}>
            <Text style={{alignSelf:'center',fontSize:10,textAlign:'center',fontFamily:'Poppins'}}>Don't have an account? Key in your username, email and password and press the button below!</Text>
            <Button mode="contained" onPress={signUp} buttonColor="#f79256" style={{width:175,alignSelf:'center',top:10}}>Create account</Button>
            </View>
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
