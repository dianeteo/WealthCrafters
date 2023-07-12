import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import InvestmentSimulator_Tabs from '../navigation/investment-simulator-nav/BottomTabNavigator';

const InvestmentSimulator = () => {
  return (
    <SafeAreaView style={{ flex:1 }}>
        <Text>Hello</Text>
    </SafeAreaView>
  );
  ;
};

export default InvestmentSimulator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
