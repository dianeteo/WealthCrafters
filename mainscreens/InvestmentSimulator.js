import { StyleSheet, View, Dimensions, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase_auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { doc, collection, setDoc, increment, limit, onSnapshot, query } from '@firebase/firestore';
import axios from 'axios';

const InvestmentSimulator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
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
