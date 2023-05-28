import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import { Text, Button,Modal } from 'react-native-paper';


const Settings = () => {
    const [inputValue,setInputValue] = useState('')

    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            <Button></Button>
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