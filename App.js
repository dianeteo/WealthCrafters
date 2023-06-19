import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from "./screens/MainMenu";
import FinancialPlanner from "./screens/FinancialPlanner";
import FinancialLiteracy from "./screens/FinancialLiteracy";
import InvestmentSimulator from './screens/InvestmentSimulator';
import Login from "./screens/login/login.js";
import React, { useEffect, useState } from 'react';
import MyTabs from './NavigationContainer.js';
import { NativeBaseProvider } from 'native-base';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './config/firebase.js';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Navigation from './ButtonNavigation';


const Stack = createNativeStackNavigator();

const LoggedInStack = createNativeStackNavigator();  

const LoggedIn = () => {
  return (
    <NativeBaseProvider>
      <LoggedInStack.Navigator>
        <LoggedInStack.Screen name="Main Menu" component={MainMenu} options={{ headerShown: false }}/>
        <LoggedInStack.Screen name="Financial Planner" component={Navigation} options={{ headerShown: false }}/>
        <LoggedInStack.Screen name="Financial Literacy" component={FinancialLiteracy} options={{ headerShown: false }}/>
        <LoggedInStack.Screen name="Investment Simulator" component={InvestmentSimulator} options={{ headerShown: false }}/>
      </LoggedInStack.Navigator>
    </NativeBaseProvider>
  );
};

const NotLoggedInStack = createNativeStackNavigator();

const NotLoggedIn = () => {
  return (
    <NativeBaseProvider>
      <NotLoggedInStack.Navigator>
        <NotLoggedInStack.Screen name="Log In" component={Login} options={{ headerShown: false }}/>
        <NotLoggedInStack.Screen name="Main Menu" component={MainMenu} options={{ headerShown: false }}/>
        <NotLoggedInStack.Screen name="Financial Planner" component={Navigation} options={{ headerShown: false }}/>
        <NotLoggedInStack.Screen name="Financial Literacy" component={FinancialLiteracy} options={{ headerShown: false }}/>
        <NotLoggedInStack.Screen name="Investment Simulator" component={InvestmentSimulator} options={{ headerShown: false }}/>
      </NotLoggedInStack.Navigator>
    </NativeBaseProvider>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  SplashScreen.preventAutoHideAsync();
  const [loaded] = Font.useFonts({ 
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    LatoBlack: require('./assets/fonts/Lato-Black.ttf'),
    LatoBold: require('./assets/fonts/Lato-Bold.ttf'),
    Lato: require('./assets/fonts/Lato-Regular.ttf'),
    PoppinsSemi: require('./assets/fonts/Poppins-SemiBold.ttf'),
    MontserratSemi: require ('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf')
    });

  if (!loaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? <Stack.Screen name="Main Menu" component={LoggedIn} /> : <Stack.Screen name="Login" component={NotLoggedIn} />}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;