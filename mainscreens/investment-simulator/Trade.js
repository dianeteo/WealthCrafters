import { React } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const Trade = () => {
    const htmlOverviewContent = `<!-- TradingView Widget BEGIN -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js" async>
      {
      "width": "100%",
      "height": "85%",
      "defaultColumn": "overview",
      "defaultScreen": "most_capitalized",
      "market": "america",
      "showToolbar": true,
      "colorTheme": "light",
      "locale": "en"
    }
      </script>
    </div>
    <!-- TradingView Widget END -->`
    return (
            <WebView source={{html:htmlOverviewContent}}/>
    )
}

export default Trade;