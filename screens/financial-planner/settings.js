import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import { Text, Button,Modal } from 'react-native-paper';





const Settings = () => {
    const [inputValue,setInputValue] = useState('')
    const data = {
        id: 3,
        description: 'food',
        amount: 10.0,
        created_at: new Date(),
        created_by: 3,
    }
    
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default Settings