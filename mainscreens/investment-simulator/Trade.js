import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Select, Spacer, Input, Icon, Button, Modal, FormControl } from 'native-base';
import { WebView } from 'react-native-webview';
import moment from 'moment-timezone';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { firebase_auth } from '../../config/firebase.js';
import { db } from '../../config/firebase.js';
import { doc, collection, setDoc, increment, limit, onSnapshot, query } from '@firebase/firestore';

const Trade = () => {
  const htmlOverviewContent = `<!-- TradingView Widget BEGIN -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js" async>
      {
        "width": "100%",
        "height": "82%",
        "defaultColumn": "overview",
        "defaultScreen": "most_capitalized",
        "market": "america",
        "showToolbar": true,
        "colorTheme": "light",
        "locale": "en"
      }
      </script>
    </div>
    <!-- TradingView Widget END -->`;

  // For styling where needed
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  // utc-4 timezone
  const currentDateTime = moment().tz('America/New_York');

  // Adjust currentDateTime to the nearest Monday at 9:30 AM
  const marketOpen = currentDateTime
    .clone()
    .startOf('isoWeek')
    .add(1, 'week')
    .day(1)
    .hour(9)
    .minute(30);

  const marketClose = moment.tz('16:00', 'HH:mm', 'America/New_York');

  const hoursDiff = marketOpen.diff(currentDateTime, 'hours');
  const minsDiff = marketOpen.diff(currentDateTime, 'minutes') - hoursDiff * 60;

  // current day
  const currentDay = currentDateTime.day();

  // checking day
  const isWeekday = currentDay >= 1 && currentDay <= 5;

  // market is open/closed for buying/selling
  const isMarketOpen =
    isWeekday &&
    currentDateTime.isAfter(marketOpen) &&
    currentDateTime.isBefore(marketClose);

  //for searching of stock price
  const [input, setInput] = useState('AAPL');

  const [selectedAction, setSelectedAction] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [price, setPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);

//limit to fetching of data: 100,000 per month, latency is 3642ms vs latency of trading view 15min
  const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://realstonks.p.rapidapi.com/'+input.toUpperCase(),
        headers: {
          'X-RapidAPI-Key': '3ad1624aefmsha92181de7226a34p176b9djsna0cd97eaf489',
          'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
        }
      };
    
      try {
        const response = await axios.request(options);
        console.log(response.data.price);
        setPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

  // references to firebase functions
    const usersCollectionRef = collection(db, 'users');
    const user = firebase_auth.currentUser;
    const userEmail = user.email;
    const userDocRef = doc(usersCollectionRef, userEmail);
    const userHoldingsCollectionRef = collection(userDocRef, 'holdings');
    const [userIndivHoldingRef, setUserIndivHoldingRef] = useState(null);

    //other required useStates
    const [holdings, setHoldings] = useState([]);
    const [indivHoldingsQuantity, setIndivHoldingsQuantity] = useState(0);
    const [userDetails, setUserDetails] = useState([]);
    const [userCash, setUserCash] = useState(0);

    useEffect(() => {
      if (input) {
        setUserIndivHoldingRef(doc(userHoldingsCollectionRef, input));
      }
    }, [input]);

    useEffect(() => {
      const unsubscribe = onSnapshot(query(userHoldingsCollectionRef, limit(20)), (snapshot) => {
        const holdingsData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        // const indivHoldingsQuantityData = holdingsData.map((doc) => ({
        //   quantity: doc.quantity,
        // }));
  
        setHoldings(holdingsData);
        // setIndivHoldingsQuantity(indivHoldingsQuantityData);
      });
  
      return () => unsubscribe();
    }, []);

      useEffect(() => {
      const unsubscribe = onSnapshot(query(usersCollectionRef, limit(20)), (snapshot) => {
        const userData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        // const indivHoldingsQuantityData = holdingsData.map((doc) => ({
        //   quantity: doc.quantity,
        // }));
  
        setUserDetails(userData);
        // setIndivHoldingsQuantity(indivHoldingsQuantityData);
      });
  
      return () => unsubscribe();
    }, []);

  //settling trading options & storing in firebase
    const confirmAction = async () => {

      const parsedQuantity = parseFloat(quantity);
      if (!input || !selectedAction || !quantity) {
        alert('Please fill in all required fields before clicking confirm!');
        return;
      } else if (isNaN(parsedQuantity)) {
        alert('Please enter a numeric quantity!');
        return;
      }

      if (selectedAction=="Buy") {
        for (let i = 0; i < userDetails.length; i++) {
          if (userDetails[i].email == userEmail) {
            setUserCash(userDetails[i].cash);
            console.log(userCash)
          }
          }

          const maxHoldings = Math.floor(parseFloat(userCash/price))

          if (parseFloat(quantity) > maxHoldings) {
            alert(`You can only buy a maximum of ${maxHoldings} ${input} holdings.`);
            return;
          }

        try { 
          await setDoc(userIndivHoldingRef, {
              price: price,
              quantity: increment(parseFloat(quantity))
          }, {merge: true});
          await setDoc(userDocRef, {
            email: userEmail,
            cash: increment((-parseFloat(quantity)*price).toFixed(2))
          }, {merge: true});
          alert('Bought ' + quantity + ' holdings of ' + input + ' at ' + price + ' USD');
          } catch (error) {
              console.log(error);
              alert('Failed to add to holdings: ' + error.message);
          }

      } else if (selectedAction=="Sell") {
        // calculate the maximum quantity they can sell, prevents user from selling more than they have
        for (let i = 0; i < holdings.length; i++) {
          if (holdings[i].id == input) {
            setIndivHoldingsQuantity(holdings[i].quantity);
          }
          }

        const maxSellQuantity = Math.max(0, indivHoldingsQuantity);

        if ( parseFloat(quantity) > maxSellQuantity) {
          alert(`You can sell a maximum of ${maxSellQuantity} ${input} holdings.`);
          return;
        };

        try { 
          await setDoc(userIndivHoldingRef, {
              price: price,
              quantity: increment(-parseFloat(quantity))
          }, {merge: true});
          await setDoc(userDocRef, {
            email: userEmail,
            cash: increment((parseFloat(quantity)*price).toFixed(2))
          }, {merge: true});
          alert('Sold ' + quantity + ' holdings of ' + input + ' at ' + price + ' USD');
      } catch (error) {
          console.log(error);
          alert('Failed to add to holdings: ' + error.message);
      }
      }
    
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <WebView source={{ html: htmlOverviewContent }} />
      <Modal size='xl' isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{input}</Modal.Header>
          <Modal.Body flexGrow={1}>
            <Flex direction="column" alignItems='center'>

            <Flex direction="row" alignItems={'center'}>
              <Text style={styles.header}>Search: </Text>
              <Input
              autoCapitalize={'characters'}
              value={input} 
              onChangeText={(text) => setInput(text.toUpperCase())} 
              onSubmitEditing={fetchData}
              placeholder="Search your desired holdings" 
              width="55%" 
              borderRadius="4" py="2.5" px="1" fontSize="10"
              InputLeftElement={<Icon m="2" ml="3" size="3" color="gray.400" as={<MaterialIcons name="search" />} />}/>
            </Flex>

            <FormControl mt='5'/>

            { input ? (<Text> <Text style={styles.currentPrice}> Current stock price:  </Text>{price} USD </Text>) : 
            (<Text style={styles.emptyField}>Please key in a ticker symbol to proceed!</Text>) }

            
            <FormControl mt='5'/>

            <Flex direction="row" alignItems={'center'}>
              <Text style={styles.modalNextAction}>Your next action:</Text>
              <Select 
              marginLeft={2}
              selectedValue={selectedAction}
              onValueChange={(action) => setSelectedAction(action)}
              placeholder="Buy/Sell" 
              width={150}>
                <Select.Item label="Buy" value="Buy" />
                <Select.Item label="Sell" value="Sell" />
              </Select>
            </Flex>

            <FormControl mt='5'/>

            <Flex direction="row" alignItems={'center'}>
              <Text style={styles.modalNextAction}>Quantity: </Text>
              <Input 
              value={quantity} 
              onChangeText={(number) => setQuantity(number)} 
              placeholder='Enter a numeric quantity'
              marginLeft={3}
              width="50%" ></Input>
            </Flex>

            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancel
              </Button>
              <Button bgColor='#f79256' onPress={() => {
              setModalVisible(false); confirmAction()
            }}>
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {true ? (
        <KeyboardAvoidingView style={[styles.textContainer, { bottom: screenHeight * 0.10 }]} behavior='padding'>
          <Flex direction="column" alignItems={'center'}>
            <Text style={styles.headingOpen}>
              Market is <Text style={{ color: 'green' }}>open.</Text>
            </Text>

            <Spacer h='10%'/>

            <Button marginTop={3} bgColor='#f79256' onPress={() => {
              setModalVisible(!modalVisible);
              }}>
              Buy/Sell
              </Button>
          </Flex>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView style={[styles.textContainer, { bottom: screenHeight * 0.13 }]}>
          <Text style={styles.closed}>Market is now closed.</Text>
          <Text style={styles.opensIn}>Opens in {`${hoursDiff}h ${minsDiff}min`}.</Text>
        </KeyboardAvoidingView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Trade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
  },
  headingOpen: {
    fontFamily: 'PoppinsSemi',
    fontSize: 18,
    alignSelf: 'center',
  },
  header: {
    right: 10,
    fontFamily: 'PoppinsSemi',
    fontSize: 15,
  },
  closed: {
    fontFamily: 'PoppinsSemi',
    fontSize: 15,
    color: '#FF0000',
  },
  opensIn: {
    fontFamily: 'PoppinsSemi',
    fontSize: 12,
  },
  currentPrice: {
    fontFamily: 'PoppinsSemi',
    fontSize: 13,
  },
  modalNextAction: {
    fontFamily: 'PoppinsSemi',
    fontSize: 13,
  }, 
  emptyField: {
    fontFamily: 'PoppinsSemi',
    fontSize: 13,
    color: '#FF0000',
  }
});
