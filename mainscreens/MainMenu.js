
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { firebase_auth } from '../config/firebase';


const MainMenu = () => {
  const navigation = useNavigation(); // Get the navigation object using the useNavigation hook

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        buttonColor="#1d4e89"
        style={{ marginBottom: 10 }}
        onPress={() => navigation.navigate("Financial Planner")} // Use the navigation object to navigate
        testID='financialPlannerButton'
      >
        Financial Planner
      </Button>
      <Button
        mode="contained"
        style={{ marginBottom: 10 }}
        buttonColor="#1d4e89"
        onPress={() => navigation.navigate("Chatbot")}
        testID="chatbotButton"
      >
        Financial Literacy
      </Button>
      <Button
        mode="contained"
        style={{ marginBottom: 10 }}
        buttonColor="#1d4e89"
        onPress={() => navigation.navigate("Investment Simulator")}
        testID="investmentSimulatorButton"
      >
        Investment Simulator
      </Button>
      <Button
        mode="contained"
        style={{ marginBottom: 10 }}
        buttonColor="#7dcfb6"
        onPress={() => firebase_auth.signOut()}
      >
        Sign Out
      </Button>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
