import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

class MainMenu extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Button mode="contained"
                buttonColor="#00008b"
                style={{marginBottom:10}}
                onPress={()=>this.props.navigation.navigate("Financial Planner")}>Financial Planner</Button>
                <Button mode="contained"
                style={{marginBottom:10}}
                buttonColor="#00008b"
                onPress={()=>this.props.navigation.navigate("Financial Literacy")}>Financial Literacy</Button>
                <Button mode="contained"
                style={{marginBottom:10}}
                buttonColor="#00008b"
                onPress={()=>this.props.navigation.navigate("Investment Simulator")}>Investment Simulator</Button>
            </View>

        )
    }
}

export default MainMenu;

// export default function MainMenu({ navigation }) {
//   return (
//     <View style={styles.container}>
//         <Button mode='contained'>Financial Planner
//         onPress() = {() => navigation.navigate("Financial Planner")}</Button>
//         <Button mode='contained'>Financial Literacy</Button>
//         <Button mode='contained'>Investment Simulator</Button>
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