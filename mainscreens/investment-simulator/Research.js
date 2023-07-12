import React from 'react';
import { View, WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const Research = () => {
    const htmlContent = `
      <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script id="tradingview-widget-loading-script" src="https://s3.tradingview.com/tv.js"></script>
        </head>
        <body>
          <div id="tradingview_37c2c"></div>
          <div class="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            </a>
          </div>
          <script>
            document.addEventListener("DOMContentLoaded", function() {
              createWidget();
            });
  
            function createWidget() {
              if (document.getElementById('tradingview_37c2c') && 'TradingView' in window) {
                new TradingView.widget({
                  autosize: true,
                  symbol: "NASDAQ:AAPL",
                  timezone: "Etc/UTC",
                  theme: "light",
                  style: "1",
                  locale: "en",
                  toolbar_bg: "#f1f3f6",
                  enable_publishing: false,
                  range: "YTD",
                  allow_symbol_change: true,
                  container_id: "tradingview_37c2c"
                });
              }
            }
          </script>
        </body>
      </html>
    `;
  
    return (
      <WebView source={{html: htmlContent}}/>
    );
    ;
  };
  
  export default Research;