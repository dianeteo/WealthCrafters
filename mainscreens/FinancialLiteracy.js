
import { StyleSheet, View} from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import ChatBot from './financial-literacy/chatbot';

const FinancialLiteracy = () => {
      return (
        <ChatBot />
      )
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

