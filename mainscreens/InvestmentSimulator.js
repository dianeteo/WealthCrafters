import { StyleSheet, View, Dimensions, Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase_auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { doc, collection, getDocs, setDoc, increment, limit, onSnapshot, query } from '@firebase/firestore';
import axios from 'axios';

const InvestmentSimulator = () => {

  // references to firebase functions
  const usersCollectionRef = collection(db, 'users');
  const user = firebase_auth.currentUser;
  const userEmail = user.email;
  const userDocRef = doc(usersCollectionRef, userEmail);
  const userHoldingsCollectionRef = collection(userDocRef, 'holdings');

  //other usestates
  const [holdings, setHoldings] = useState([]);
  const [userCash, setUserCash] = useState(0);
  const [userHoldingsValue, setUserHoldingsValue] = useState(0);
  const [price, setPrice] = useState(0);

  //limit to fetching of data: 100,000 per month, latency is 3642ms vs latency of trading view 15min
  const fetchAPIData = async (specificHolding) => {
    const options = {
      method: 'GET',
      url: 'https://realstonks.p.rapidapi.com/' + specificHolding,
      headers: {
        'X-RapidAPI-Key': '3ad1624aefmsha92181de7226a34p176b9djsna0cd97eaf489',
        'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      const price = response.data?.price ?? 0; // Use a default value of 0 if price is not available
      console.log(price); 
      return price; //return price!
    } catch (error) {
      console.log(error);
      return 0; 
    }
  };

  useEffect(() => {
    const fetchHoldingsData = async () => {
      try {
        const querySnapshot = await getDocs(query(userHoldingsCollectionRef, limit(20)));
        const holdingsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setHoldings(holdingsData);
      } catch (error) {
        console.error('Error fetching holdings data: ', error);
      }
    };

    fetchHoldingsData();

    const fetchUserCashData = async () => {
      try {
        const querySnapshot = await getDocs(query(usersCollectionRef, limit(20)));
        const usersData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        for (let i = 0; i < usersData.length; i++) {
          if (usersData[i].email == userEmail) {
            setUserCash(usersData[i].cash);
          }
        }
      } catch (error) {
        console.error('Error fetching user cash data: ', error);
    };
  };

    fetchUserCashData();
    console.log(holdings);

    const fetchHoldingsValue = async () => {
      try {
        let holdingsValueData = 0;

        for (let i = 0; i < holdings.length; i++) {
          const holdingPrice = await fetchAPIData(holdings[i].id);
          holdingsValueData += holdingPrice * holdings[i].quantity;
        }

        setUserHoldingsValue(holdingsValueData);
      } catch (error) {
        console.error('Error fetching holdings value: ', error);
      }
    };

    fetchHoldingsValue();

  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>${userCash+userHoldingsValue}</Text>
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
