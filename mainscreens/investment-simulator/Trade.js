import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Select, Spacer } from 'native-base';
import { WebView } from 'react-native-webview';
import moment from 'moment-timezone';
import axios from 'axios';

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
  const [input, setInput] = useState('AAPL')

//limit to fetching of data: 100,000 per month, latency is 3642ms vs latency of trading view 15min
useEffect(() => {
    const fetchData = async () => {
        const options = {
          method: 'GET',
          url: 'https://realstonks.p.rapidapi.com/'+input,
          headers: {
            'X-RapidAPI-Key': '3ad1624aefmsha92181de7226a34p176b9djsna0cd97eaf489',
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
          }
        };
      
        try {
          const response = await axios.request(options);
          console.log(response.data.price);
        } catch (error) {
          console.error(error);
        }
      };
      
      //fetchData();     
    }, []);

  return (
    <View style={styles.container}>
      <WebView source={{ html: htmlOverviewContent }} />
      {true ? (
        <View style={[styles.textContainer, { bottom: screenHeight * 0.18 }]}>
          <Flex direction="column">
            <Text style={styles.headingOpen}>
              Market is <Text style={{ color: 'green' }}>open.</Text>
            </Text>
            <Spacer h="25%" />
            <Flex direction="row">
              <Text style={styles.header}>Your next action:</Text>
              <Select placeholder="Buy/Sell" width={150}>
                <Select.Item label="Buy" value="Buy" />
                <Select.Item label="Sell" value="Sell" />
              </Select>
            </Flex>
          </Flex>
        </View>
      ) : (
        <View style={[styles.textContainer, { bottom: screenHeight * 0.13 }]}>
          <Text style={styles.closed}>Market is now closed.</Text>
          <Text style={styles.opensIn}>Opens in {`${hoursDiff}h ${minsDiff}min`}.</Text>
        </View>
      )}
    </View>
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
  },
  headingOpen: {
    fontFamily: 'PoppinsSemi',
    fontSize: 15,
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
});
