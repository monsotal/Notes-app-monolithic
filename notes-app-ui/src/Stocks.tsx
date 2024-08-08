import React, { useEffect } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

const Stocks: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.MediumWidget({
          "symbols": [
            ["S&P 500", "FOREXCOM:SPXUSD|12M"],
            ["Nasdaq 100", "FOREXCOM:NSXUSD|12M"],
            ["Gold", "COMEX:GC1!|12M"],
            ["Crude Oil", "NYMEX:CL1!|12M"]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": 400,
          "locale": "en",
          "colorTheme": "light",
          "autosize": true,
          "showVolume": false,
          "hideDateRanges": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "chartType": "line",
          "container_id": "tradingview_widget"
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Stocks Overview</h1>
      <div id="tradingview_widget"></div>
    </div>
  );
};

export default Stocks;