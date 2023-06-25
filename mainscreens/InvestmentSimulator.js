
import { StyleSheet, View} from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

class InvestmentSimulator extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Code for Investment Simulator</Text>
            </View>
        )
    }
}

export default InvestmentSimulator;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });