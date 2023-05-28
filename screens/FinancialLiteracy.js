import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import React from 'react';
import { Text, Button } from 'react-native-paper';

class FinancialLiteracy extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Code for Financial Literacy</Text>
            </View>
        )
    }
}

export default FinancialLiteracy;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

