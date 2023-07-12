import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flex, Select } from 'native-base';
import { WebView } from 'react-native-webview';
import moment from 'moment';

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
  const currentDateTime = new Date();
  const currentTime = moment(currentDateTime.toLocaleDateString('en-US', {
    hour: "2-digit",
    minute: "2-digit",
  }), 'hh:mm A');
  const marketOpen = moment('9:30 PM', 'hh:mm A');
  const marketClose = moment('4:00 AM', 'hh:mm A');

  return (
    <View style={styles.container}>
      <WebView source={{ html: htmlOverviewContent }} />
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
});
