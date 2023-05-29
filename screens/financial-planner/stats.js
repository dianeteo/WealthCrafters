import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import { Text, Button,Modal } from 'react-native-paper';
import CalculatorPopup from './calculatorpopup';


const Stats = () => {
    const [inputValue,setInputValue] = useState('')

    return (
        <View style={styles.container}>
            <CalculatorPopup style={{
                
            }} />
            <Button></Button>
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }

})

export default Stats