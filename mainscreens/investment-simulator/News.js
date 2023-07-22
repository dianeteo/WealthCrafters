import React from 'react';
import { View, WebView } from 'react-native-webview';

const News = () => {
    const htmlContent = `
    <!-- TradingView Widget BEGIN -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
      {
      "feedMode": "all_symbols",
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "regular",
      "width": "100%",
      "height": "100%",
      "locale": "en"
    }
      </script>
    </div>
    <!-- TradingView Widget END -->
    `;
  
    return (
      <WebView source={{html: htmlContent}}/>
    );
    ;
  };
  
  export default News