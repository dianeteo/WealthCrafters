import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
//import { Text, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from "./screens/MainMenu";
import FinancialPlanner from "./screens/FinancialPlanner";
import FinancialLiteracy from "./screens/FinancialLiteracy";
import InvestmentSimulator from './screens/InvestmentSimulator';
import React from 'react';
import MyTabs from './NavigationContainer.js'

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
    )
  }
}

export default App;

// export default function MainMenu({ navigation }) {
//   return (
//     <View style={styles.container}>
//         <Button mode='contained' onPress={() => navigation.navigate("FinancialPlanner")}>Financial Planner</Button>
//         <Button mode='contained'>Financial Literacy</Button>
//         <Button mode='contained'>Investment Simulator</Button>
//         <StatusBar style="auto" />
//     </View>
//   )
// }

// const RootStack = createNativeStackNavigator();

// function App() {
//   return (
//     <SafeAreaView style={{flex:1}}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           {<Stack.Screen name="Main Menu" 
//             component={ MainMenu } 
//             options={{title:"Main Menu"}}/>}

//           <Stack.Screen name="Financial Planner" 
//             component={ FinancialPlanner } 
//             options={{title:"Financial Planner"}} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
