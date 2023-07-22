import { StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase_auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { doc, collection, getDocs, setDoc, increment, limit, onSnapshot, query } from '@firebase/firestore';
import axios from 'axios';
import { Flex, Spacer, Box, Center } from 'native-base';
import { Table, Row } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';

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

  const myRef = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      borderWidth: 0,
      borderRadius: 0,
      borderColor: "#22D3EE"
    };
    myRef.current.setNativeProps({
      style: styleObj
    });
  }, [myRef]);

  const totalAccountValue = userCash + userHoldingsValue
  const percentageChange = ((totalAccountValue - 1000000) / 1000000 * 100).toFixed(2);

  const CustomRow = ({ symbol, price, quantity, total }) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{symbol}</DataTable.Cell>
        <DataTable.Cell>{price}</DataTable.Cell>
        <DataTable.Cell>{quantity}</DataTable.Cell>
        <DataTable.Cell>{total}</DataTable.Cell>
      </DataTable.Row>
    );
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor='#FFFFFF'>
      <Flex direction='column'>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.title1}>WealthCrafter's</Text>
      <Text style={styles.title2}>Investment Simulator</Text>
      <Spacer h='1%'/>
      <Text style={styles.comeback}>Come back daily to check your account's growth.</Text>

      <Spacer h='3%'/>

      <Center>
      <Box width="90%" bg="#1d4e89" p="4" shadow={2} _text={{
      fontFamily: 'Poppins',
      fontSize: "sm",
      fontWeight: "bold",
      color: "#fbd1a2"
    }} ref={myRef}>
        CURRENT ACCOUNT VALUE:
        <Text style={styles.accountValue}>${totalAccountValue}<Text style={styles.usd}> USD</Text></Text>
        <Text style={styles.percentage}>{percentageChange} %</Text>
      </Box>
      </Center>

      <Spacer h='3%'/>

      <Center>
      <Box width="90%" bg="#1d4e89" p="4" shadow={2} _text={{
      fontFamily: 'Poppins',
      fontSize: "sm",
      fontWeight: "bold",
      color: "#fbd1a2"
    }} ref={myRef}>
        LIQUID CASH:
        <Text style={styles.accountValue}>${userCash}<Text style={styles.usd}> USD</Text></Text>
      </Box>
      </Center>

      <Spacer h='1%'/>

      <ScrollView>
      <DataTable style={styles.tableContainer}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Symbol</DataTable.Title>
            <DataTable.Title>Current Price</DataTable.Title>
            <DataTable.Title>Quantity</DataTable.Title>
            <DataTable.Title>Total Value</DataTable.Title>
          </DataTable.Header>
          {holdings.map((holding) => (
            <CustomRow
              key={holding.id}
              symbol={holding.id}
              price={holding.price}
              quantity={holding.quantity}
              total={holding.quantity * holding.price}
            />
          ))}
        </DataTable>
        </ScrollView>

      </Flex>
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
  welcome: {
    fontFamily: 'PoppinsSemi',
    fontSize: 18,
    marginLeft: 20,
    color:'#808080'
  },
  title1: {
    fontFamily: 'PoppinsSemi',
    fontSize: 25,
    marginLeft: 20,
    color: '#f79256'
  },
  title2: {
    fontFamily: 'PoppinsSemi',
    fontSize: 30,
    marginLeft: 20
  },
  comeback: {
    fontFamily: 'Poppins',
    fontSize: 12,
    marginLeft: 20
  },
  accountValue: {
    fontFamily: 'PoppinsSemi',
    fontSize: 45,
    color:'#FFFFFF'
  },
  usd: {
    fontFamily: 'Poppins',
    fontSize: 30,
    color:'#FFFFFF'
  },
  percentage: {
    fontFamily: 'PoppinsSemi',
    fontSize: 15,
    color:'#7dcfb6',
    alignSelf:'center'
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tableContainer: {
    padding: 20,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});
