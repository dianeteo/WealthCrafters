import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, Button } from 'react-native-paper';

class Login extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Code for Financial Planner</Text>
            </View>
            
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });