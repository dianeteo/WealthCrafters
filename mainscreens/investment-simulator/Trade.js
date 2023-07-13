import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Select } from 'native-base';
import { WebView } from 'react-native-webview';
import moment from 'moment-timezone';

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

  // Get current timing to check if market is open for buying/selling
  const currentDateTime = moment().tz('America/New_York');
  const marketOpen = moment.tz('09:30', 'HH:mm', 'America/New_York');
  const marketClose = moment.tz('04:00', 'HH:mm', 'America/New_York');

  const isMarketOpen = currentDateTime.isAfter(marketOpen) && currentDateTime.isBefore(marketClose);

  const hoursDiff = marketOpen.diff(currentDateTime, "hours")
  const minsDiff = marketOpen.diff(currentDateTime, "minutes") - hoursDiff*60


  return (
    <View style={styles.container}>
      <WebView source={{ html: htmlOverviewContent }} />
      { isMarketOpen ? (
        <View style={[styles.textContainer, { bottom: screenHeight * 0.20 }]}>
          <Flex direction='row'>
            <Text style={styles.header}>Your next action:</Text>
            <Select
              placeholder="Buy/Sell"
              width={150}>
              <Select.Item label="Buy" value="Buy" />
              <Select.Item label="Sell" value="Sell" />
            </Select>
          </Flex>
        </View>
      ) : <View style={[styles.textContainer, { bottom: screenHeight * 0.13 }]}>
        <Text style={styles.closed}>Market is now closed.</Text>
        <Text style={styles.opensIn}>Opens in {`${hoursDiff}h ${minsDiff}min`}.</Text>
      </View>
      }
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
  }
});
