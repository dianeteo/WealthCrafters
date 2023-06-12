import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from "./screens/MainMenu";
import FinancialPlanner from "./screens/FinancialPlanner";
import FinancialLiteracy from "./screens/FinancialLiteracy";
import InvestmentSimulator from './screens/InvestmentSimulator';
import Login from "./screens/login/login.js";
import React, { useEffect } from 'react';
import MyTabs from './NavigationContainer.js';
import { NativeBaseProvider } from 'native-base';
import User, { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './config/firebase.js';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Main Menu"
            component={MainMenu}
          />

          <Stack.Screen
            name="Financial Planner"
            component={MyTabs}
          />

          <Stack.Screen
          name="Financial Literacy"
          component={FinancialLiteracy}
          />

          <Stack.Screen
          name="Investment Simulator"
          component={InvestmentSimulator}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </NativeBaseProvider>
    )
  }

export default App;
