import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import React from 'react';
import { Text, Button } from 'react-native-paper';
import CalculatorPopup from './financial-planner/calculatorpopup.js'

class FinancialPlanner extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <CalculatorPopup />


            </View>
        )
    }
}

export default FinancialPlanner;

// export default function FinancialPlanner() {
//   return (
//     <View style={styles.container}>
//         <Text>Code for Financial Planner</Text>
//         <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});