import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'

// import lib
import config from "../../config/env";
// import { widget } from '../Chart/charting_library';
import { widget } from '../Chart/charting_library/charting_library.min';//for old version
import { isEmpty } from "../../lib/isEmpty";
import "./index.css";
import { useParams } from "react-router-dom";
const chartUrl = config.BASE_URL;

//   const { tikerRoot } = useParams();
//   const chartContainerRef = useRef();
//   const tvWidget = null;
//   // redux state 
//   const themeData = useSelector((state) => state.theme.theme);
//   const getLanguageFromURL = () => {
//     const regex = new RegExp('[\\?&]lang=([^&#]*)');
//     const results = regex.exec(window.location.search);
//     return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
//   }
//   useEffect(() => {
//     if (tvWidget !== null) {
//       tvWidget.remove();
//       tvWidget = null;
//     }
//   }, [])

//   const buildchart = (theme, pair) => {
//     const widgetOptions = {
//       symbol: pair,
//       // BEWARE: no trailing slash is expected in feed URL
//       datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
//       interval: props.interval,
//       container: chartContainerRef.current,
//       library_path: props.libraryPath,
//       locale: getLanguageFromURL() || "en",
//       disabled_features: ["use_localstorage_for_settings"],
//       enabled_features: ["study_templates"],
//       charts_storage_url: props.chartsStorageUrl,
//       charts_storage_api_version: props.chartsStorageApiVersion,
//       client_id: props.clientId,
//       user_id: props.userId,
//       fullscreen: props.fullscreen,
//       autosize: props.autosize,
//       studies_overrides: props.studiesOverrides,
//       theme: theme,
//       loading_screen: { backgroundColor: "#1a1b1c" },
//       // toolbar_bg: "#1a1b1c",
//       // overrides: {
//       //   "paneProperties.background": "#1a1b1c",
//       //   "paneProperties.vertGridProperties.color": "#2a2e2d",
//       //   "paneProperties.horzGridProperties.color": "#2a2e2d",
//       //   "symbolWatermarkProperties.transparency": 90,
//       //   "scalesProperties.textColor": "#AAA",
//       //   "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
//       //   "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
//       // },
//       // custom_indicators_getter: function (PineJS) {
//       //   return Promise.resolve([
//       //     {
//       //       name: "Custom Moving Average 123",
//       //       metainfo: {
//       //         _metainfoVersion: 52,
//       //         id: "Custom Moving Average@tv-basicstudies-1",
//       //         description: "Custom Moving Average",
//       //         shortDescription: "Custom MA",
//       //         format: { type: "inherit" },
//       //         linkedToSeries: true,
//       //         is_price_study: true,
//       //         plots: [
//       //           { id: "plot_0", type: "line" },
//       //           { id: "smoothedMA", type: "line" },
//       //         ],
//       //         defaults: {
//       //           styles: {
//       //             plot_0: {
//       //               linestyle: 0,
//       //               linewidth: 1,
//       //               plottype: 0,
//       //               trackPrice: false,
//       //               transparency: 0,
//       //               visible: true,
//       //               color: "#2196F3",
//       //             },
//       //             smoothedMA: {
//       //               linestyle: 0,
//       //               linewidth: 1,
//       //               plottype: 0,
//       //               trackPrice: false,
//       //               transparency: 0,
//       //               visible: true,
//       //               color: "#9621F3",
//       //             },
//       //           },
//       //           inputs: {
//       //             length: 9,
//       //             source: "close",
//       //             offset: 0,
//       //             smoothingLine: "SMA",
//       //             smoothingLength: 9,
//       //           },
//       //         },
//       //         styles: {
//       //           plot_0: { title: "Plot", histogramBase: 0, joinPoints: true },
//       //           smoothedMA: {
//       //             title: "Smoothed MA",
//       //             histogramBase: 0,
//       //             joinPoints: false,
//       //           },
//       //         },
//       //         inputs: [
//       //           {
//       //             id: "length",
//       //             name: "Length",
//       //             defval: 9,
//       //             type: "integer",
//       //             min: 1,
//       //             max: 10000,
//       //           },
//       //           {
//       //             id: "source",
//       //             name: "Source",
//       //             defval: "close",
//       //             type: "source",
//       //             options: [
//       //               "open",
//       //               "high",
//       //               "low",
//       //               "close",
//       //               "hl2",
//       //               "hlc3",
//       //               "ohlc4",
//       //             ],
//       //           },
//       //           {
//       //             id: "offset",
//       //             name: "Offset",
//       //             defval: 0,
//       //             type: "integer",
//       //             min: -10000,
//       //             max: 10000,
//       //           },
//       //           {
//       //             id: "smoothingLine",
//       //             name: "Smoothing Line",
//       //             defval: "SMA",
//       //             type: "text",
//       //             options: ["SMA", "EMA", "WMA"],
//       //           },
//       //           {
//       //             id: "smoothingLength",
//       //             name: "Smoothing Length",
//       //             defval: 9,
//       //             type: "integer",
//       //             min: 1,
//       //             max: 10000,
//       //           },
//       //         ],
//       //       },
//       //       constructor: function () {
//       //         this.init = function (context, input) {
//       //           this._context = context;
//       //         };

//       //         this.main = function (ctx, inputCallback) {
//       //           this._context = ctx;
//       //           this._input = inputCallback;

//       //           var source = PineJS.Std[this._input(1)](this._context);
//       //           // by default this is using the 'close' value
//       //           // which is the same as:
//       //           // var source = PineJS.Std.close(this._context);

//       //           var length = this._input(0);
//       //           var offset = this._input(2);
//       //           var smoothingLine = this._input(3);
//       //           var smoothingLength = this._input(4);

//       //           // Let the library know how many extra bars (beyond the required
//       //           // bars to render the chart) to download (if your indicator needs
//       //           // extra historical data)
//       //           this._context.setMinimumAdditionalDepth(length + smoothingLength);

//       //           var series = this._context.new_var(source);
//       //           var sma = PineJS.Std.sma(series, length, this._context);
//       //           var sma_series = this._context.new_var(sma);

//       //           var smoothedMA;
//       //           if (smoothingLine === "EMA") {
//       //             smoothedMA = PineJS.Std.ema(
//       //               sma_series,
//       //               smoothingLength,
//       //               this._context
//       //             );
//       //           } else if (smoothingLine === "WMA") {
//       //             smoothedMA = PineJS.Std.wma(
//       //               sma_series,
//       //               smoothingLength,
//       //               this._context
//       //             );
//       //           } else {  // if (smoothingLine === "SMA") {
//       //             smoothedMA = PineJS.Std.sma(
//       //               sma_series,
//       //               smoothingLength,
//       //               this._context
//       //             );
//       //           }

//       //           return [
//       //             { value: sma, offset: offset },
//       //             { value: smoothedMA, offset: offset },
//       //           ];

//       //           // This would also work if you didn't want to use an offset
//       //           // return [sma, smoothedMA];
//       //         };
//       //       },
//       //     },
//       //   ]);
//       // },
//       custom_indicators_getter: function (PineJS) {
//         return Promise.resolve([
//           {
//             name: "Custom Moving Average 123",
//             metainfo: {
//               _metainfoVersion: 53,
//               id: "Custom Moving Average@tv-basicstudies-1",
//               description: "Custom Moving Average",
//               shortDescription: "Custom MA",
//               format: { type: "inherit" },
//               linkedToSeries: true,
//               is_price_study: true,
//               plots: [
//                 // { id: "plot_0", type: "line" },
//                 // { id: "smoothedMA", type: "line" },
//                 // { id: "plusDI", type: "line" },  
//                 // { id: "minusDI", type: "line" },  
//                 // { id: "adx", type: "line" }, 
//                 // { id: "macdLine", type: "line" }, 
//                 // { id: "signalLine", type: "line" },  
//                 // { id: "histogram", type: "histogram" }, 
//                 { id: "plot_buy", type: "shapes" },
//                 { id: "plot_sell", type: "shapes" },
//                 { id: "plot_exit", type: "shapes" }
//               ],
//               defaults: {
//                 styles: {
//                   // plot_0: {
//                   //   linestyle: 0,
//                   //   linewidth: 1,
//                   //   plottype: 0,
//                   //   trackPrice: false,
//                   //   transparency: 0,
//                   //   visible: true,
//                   //   color: "#2196F3",
//                   // },
//                   // smoothedMA: {
//                   //   linestyle: 0,
//                   //   linewidth: 1,
//                   //   plottype: 0,
//                   //   trackPrice: false,
//                   //   transparency: 0,
//                   //   visible: true,
//                   //   color: "#9621F3",
//                   // },
//                   // plusDI: {
//                   //   color: "#00FF00",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 0,
//                   //   visible: true
//                   // },
//                   // minusDI: {
//                   //   color: "#FF0000",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 0,
//                   //   visible: true
//                   // },
//                   // adx: {
//                   //   color: "#0000FF",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 0,
//                   //   visible: true
//                   // },
//                   // macdLine: {
//                   //   color: "#2196F3",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 0,
//                   //   visible: true
//                   // },
//                   // signalLine: {
//                   //   color: "#FF4500",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 0,
//                   //   visible: true
//                   // },
//                   // histogram: {
//                   //   color: "#32CD32",
//                   //   linewidth: 1,
//                   //   linestyle: 0,
//                   //   plottype: 10,
//                   //   visible: true
//                   // },
//                   plot_buy: { plottype: 'shape_arrow_up', color: '#00FF00', size: 3, transparency: 0, visible: true, location: 'AboveBar' },
//                   plot_sell: { plottype: 'shape_arrow_down', color: '#FF0000', size: 3, transparency: 0, visible: true, location: 'AboveBar' },
//                   plot_exit: { plottype: 'shape_cross', color: '#FFA500', size: 3, transparency: 0, visible: true, location: 'AboveBar' },

//                 },
//                 precision: 2,
//                 inputs: {
//                   length: 9,
//                   source: "close",
//                   offset: 0,
//                   smoothingLine: "SMA",
//                   smoothingLength: 9,
//                   diLength: 14,
//                   adxSmoothing: 14,
//                   fastLength: 12,
//                   slowLength: 26,
//                   signalSmoothing: 9,

//                 },
//               },
//               // styles: {
//               //   plot_0: { title: "Plot", histogramBase: 0, joinPoints: true },
//               //   smoothedMA: {
//               //     title: "Smoothed MA",
//               //     histogramBase: 0,
//               //     joinPoints: false,
//               //   },
//               //   plusDI: { title: "+DI" },
//               //   minusDI: { title: "-DI" },
//               //   adx: { title: "ADX" },
//               //   macdLine: { title: "MACD Line" },
//               //   signalLine: { title: "Signal Line" },
//               //   histogram: { title: "Histogram" },

//               // },
//               inputs: [
//                 {
//                   id: "length",
//                   name: "Length",
//                   defval: 9,
//                   type: "integer",
//                   min: 1,
//                   max: 10000,
//                 },
//                 {
//                   id: "source",
//                   name: "Source",
//                   defval: "close",
//                   type: "source",
//                   options: [
//                     "open",
//                     "high",
//                     "low",
//                     "close",
//                     "hl2",
//                     "hlc3",
//                     "ohlc4",
//                   ],
//                 },
//                 {
//                   id: "offset",
//                   name: "Offset",
//                   defval: 0,
//                   type: "integer",
//                   min: -10000,
//                   max: 10000,
//                 },
//                 {
//                   id: "smoothingLine",
//                   name: "Smoothing Line",
//                   defval: "SMA",
//                   type: "text",
//                   options: ["SMA", "EMA", "WMA"],
//                 },
//                 {
//                   id: "smoothingLength",
//                   name: "Smoothing Length",
//                   defval: 9,
//                   type: "integer",
//                   min: 1,
//                   max: 10000,
//                 },
//                 { id: "diLength", name: "DI Length", defval: 14, type: "integer", min: 1, max: 100 },
//                 { id: "adxSmoothing", name: "ADX Smoothing", defval: 14, type: "integer", min: 1, max: 50 },
//                 { id: "fastLength", name: "MACD Fast Length", defval: 12, type: "integer", min: 1, max: 200 },
//                 { id: "slowLength", name: "MACD Slow Length", defval: 26, type: "integer", min: 1, max: 200 },
//                 { id: "signalSmoothing", name: "MACD Signal Smoothing", defval: 9, type: "integer", min: 1, max: 50 }
//               ],
//             },
//             constructor: function () {
//               this.init = function (context, input) {
//                 console.log("Custom indicator context and input initialized");
//                 console.log("Context data:", context);
//                 this._context = context;
//               };
//               this.main = function (ctx, inputCallback) {
//                 console.log("Custom indicator main function called");
//                 this._context = ctx;
//                 this._input = inputCallback;

//                 var sourceType = this._input(1);
//                 console.log("Source type selected:", sourceType);
//                 console.log("Available properties in symbol:", Object.keys(this._context.symbol));

//                 // Fetch the source using PineJS.Std if available
//                 var source = PineJS.Std[sourceType] ? PineJS.Std[sourceType](this._context) : null;

//                 if (source === null || isNaN(source)) {
//                   console.warn("PineJS.Std method did not return valid data. Attempting manual access...");
//                   console.log("Symbol object:", this._context.symbol);

//                   // Check if the sourceType exists as a property of the symbol
//                   if (this._context.symbol.hasOwnProperty(sourceType)) {
//                     source = this._context.symbol[sourceType];
//                     console.log(`Manually accessed source "${sourceType}":`, source);
//                   }

//                   // If still NaN, default to 'close'
//                   if (source === undefined || source === null || isNaN(source)) {
//                     console.warn(`Source type "${sourceType}" is not available. Defaulting to 'close'.`);
//                     source = this._context.symbol['close'];

//                     if (source === undefined || source === null || isNaN(source)) {
//                       console.warn("No valid data found for 'close'. Skipping calculation.");
//                       return [];
//                     }
//                   }
//                 }

//                 console.log("Source data after accessing context:", source);

//                 // Proceed with calculations if the source is valid
//                 var length = this._input(0);
//                 var offset = this._input(2);
//                 var smoothingLine = this._input(3);
//                 var smoothingLength = this._input(4);
//                 var diLength = this._input(5);
//                 var adxSmoothing = this._input(6);
//                 var fastLength = this._input(7);
//                 var slowLength = this._input(8);
//                 var signalSmoothing = this._input(9);

//                 console.log("Inputs - Length:", length, "Offset:", offset, "Smoothing Line:", smoothingLine, "Smoothing Length:", smoothingLength);
//                 console.log("DI Length:", diLength, "ADX Smoothing:", adxSmoothing);
//                 console.log("MACD Fast Length:", fastLength, "MACD Slow Length:", slowLength, "MACD Signal Smoothing:", signalSmoothing);

//                 console.log("Context object:", this._context);


//                 // Calculate the required depth manually
//                 // var additionalDepth = length + smoothingLength;
//                 var additionalDepth = Math.max(length, smoothingLength, diLength, adxSmoothing, fastLength, slowLength, signalSmoothing) * 2;

//                 console.log("Required additional depth:", additionalDepth);

//                 if (typeof this._context.maxAdditionalDepth === 'function') {
//                   this._context.maxAdditionalDepth(additionalDepth);
//                   // console.log("Set max additional depth to:", additionalDepth);
//                 } else {
//                   console.warn("Method maxAdditionalDepth is not available. Ensure sufficient data through the datafeed.");
//                 }

//                 // Create a series from the source data
//                 var series = this._context.new_var(source);
//                 console.log("Series data:", series);

//                 var sma = PineJS.Std.sma(series, length, this._context);
//                 var sma_series = this._context.new_var(sma);

//                 console.log("SMA series:", sma_series);

//                 var smoothedMA;
//                 if (smoothingLine === "EMA") {
//                   smoothedMA = PineJS.Std.ema(sma_series, smoothingLength, this._context);
//                   console.log("EMA Smoothed MA series:", smoothedMA);
//                 } else if (smoothingLine === "WMA") {
//                   smoothedMA = PineJS.Std.wma(sma_series, smoothingLength, this._context);
//                   console.log("WMA Smoothed MA series:", smoothedMA);
//                 } else {
//                   smoothedMA = PineJS.Std.sma(sma_series, smoothingLength, this._context);
//                   console.log("SMA Smoothed MA series:", smoothedMA);
//                 }

//                 console.log("Smoothed MA series:", smoothedMA);

//                 // DMI calculations
//                 const high = PineJS.Std.high(this._context);
//                 const low = PineJS.Std.low(this._context);
//                 const close = PineJS.Std.close(this._context);

//                 console.log("High value:", high);
//                 console.log("Low value:", low);
//                 console.log("Close value:", close);


//                 // Update arrays if the close price is new
//                 if (data.close[data.close.length - 1] !== close) {
//                   data.high.push(high);
//                   data.low.push(low);
//                   data.close.push(close);

//                   // Keep data arrays within max length
//                   if (data.high.length > 100) data.high.shift();
//                   if (data.low.length > 100) data.low.shift();
//                   if (data.close.length > 100) data.close.shift();
//                   console.log("Updated High Array:", data.high);
//                   console.log("Updated Low Array:", data.low);
//                   console.log("Updated Close Array:", data.close);
//                 } else {
//                   return;
//                 }

//                 const { macdLine, signalLine, histogram } = this.calculateMACD(data.close, fastLength, slowLength, signalSmoothing);

//                 // DMI Calculation
//                 const { plusDI, minusDI, adx } = this.calculateDMI(data.high, data.low, data.close, diLength, adxSmoothing);


//                 // let plotBuy = new Array(data.close.length).fill(null);
//                 // let plotSell = new Array(data.close.length).fill(null);
//                 // let plotExit = new Array(data.close.length).fill(null);


//                 let plotBuy = [];
//                 let plotSell = [];
//                 let plotExit = [];
//                 let activePosition = null;

//                 for (let i = 1; i < data.close.length; i++) {
//                   const adxCrossAbove20 = adx[i] > 20 && adx[i - 1] <= 20;
//                   const plusDIAboveMinusDI = plusDI[i] > minusDI[i];
//                   const minusDIAbovePlusDI = minusDI[i] > plusDI[i];
//                   const macdCrossAboveSignal = macdLine[i] > signalLine[i] && macdLine[i - 1] <= signalLine[i - 1];
//                   const macdCrossBelowSignal = macdLine[i] < signalLine[i] && macdLine[i - 1] >= signalLine[i - 1];

//                   // console.log(`Index ${i} | adxCrossAbove20: ${adxCrossAbove20} | plusDIAboveMinusDI: ${plusDIAboveMinusDI} | macdCrossAboveSignal: ${macdCrossAboveSignal}`);
//                   // console.log(`Index ${i} | adxCrossAbove20: ${adxCrossAbove20} | minusDIAbovePlusDI: ${minusDIAbovePlusDI} | macdCrossBelowSignal: ${macdCrossBelowSignal}`);


//                   if (adxCrossAbove20 && plusDIAboveMinusDI && macdCrossAboveSignal) {
//                     plotBuy[i] = data.close[i];
//                     activePosition = 'buy';
//                     console.log(`Buy Signal at index ${i}: ${data.close[i]}`);
//                   }

//                   else if (adxCrossAbove20 && minusDIAbovePlusDI && macdCrossBelowSignal) {
//                     plotSell[i] = data.close[i];
//                     activePosition = 'sell';
//                     console.log(`Sell Signal at index ${i}: ${data.close[i]}`);
//                   }

//                   if (macdCrossBelowSignal || macdCrossAboveSignal) {
//                     plotExit[i] = data.close[i];
//                     console.log(`Exit Signal at index ${i}: ${data.close[i]}`);
//                   }
//                   // if (activePosition === 'buy' && macdCrossBelowSignal) {
//                   //   plotExit[i] = data.close[i];
//                   //   console.log(`Exit Buy Position at index ${i}: ${data.close[i]}`);
//                   //   activePosition = null;  // Reset position after exit
//                   // } else if (activePosition === 'sell' && macdCrossAboveSignal) {
//                   //   plotExit[i] = data.close[i];
//                   //   console.log(`Exit Sell Position at index ${i}: ${data.close[i]}`);
//                   //   activePosition = null;  // Reset position after exit
//                   // }
//                 }
//                 console.log("Buy Plot Array Before Filtering:", plotBuy);
//                 console.log("Sell Plot Array Before Filtering:", plotSell);
//                 console.log("Exit Plot Array Before Filtering:", plotExit);

//                 const filteredPlotBuy = plotBuy.some(val => val !== null) ? plotBuy : null;
//                 const filteredPlotSell = plotSell.some(val => val !== null) ? plotSell : null;
//                 const filteredPlotExit = plotExit.some(val => val !== null) ? plotExit : null;

//                 console.log("Filtered Buy Signals for Plotting:", filteredPlotBuy);
//                 console.log("Filtered Sell Signals for Plotting:", filteredPlotSell);
//                 console.log("Filtered Exit Signals for Plotting:", filteredPlotExit);


//                 // if (adxCrossAbove20 && plusDIAboveMinusDI && macdCrossAboveSignal) {
//                 //   plotBuy.push({ index: i, value: data.close[i] });  // Add only the specific points
//                 //   console.log(`Buy Signal at index ${i}: ${data.close[i]}`);
//                 //   activePosition = 'buy';
//                 // }

//                 // if (adxCrossAbove20 && minusDIAbovePlusDI && macdCrossBelowSignal) {
//                 //   plotSell.push({ index: i, value: data.close[i] });
//                 //   console.log(`Sell Signal at index ${i}: ${data.close[i]}`);
//                 //   activePosition = 'sell';
//                 // }

//                 // if (macdCrossBelowSignal || macdCrossAboveSignal) {
//                 //   plotExit.push({ index: i, value: data.close[i] });
//                 //   console.log(`Exit Signal at index ${i}: ${data.close[i]}`);
//                 // }
//                 // }

//                 // const buySignal = plotBuy.length > 0 ? plotBuy : null;
//                 // const sellSignal = plotSell.length > 0 ? plotSell : null;
//                 // const exitSignal = plotExit.length > 0 ? plotExit : null;



//                 // // MACD Calculation
//                 // const fastEMA = PineJS.Std.ema(source, fastLength);
//                 // const slowEMA = PineJS.Std.ema(source, slowLength);
//                 // const macdLine = PineJS.Std.sub(fastEMA, slowEMA);
//                 // const signalLine = PineJS.Std.ema(macdLine, signalSmoothing);
//                 // const histogram = PineJS.Std.sub(macdLine, signalLine);

//                 // // DMI Calculation
//                 // // const high = PineJS.Std.high(ctx);
//                 // // const low = PineJS.Std.low(ctx);
//                 // const plusDM = PineJS.Std.max(PineJS.Std.sub(high, PineJS.Std.prev(high, 1)), 0);
//                 // const minusDM = PineJS.Std.max(PineJS.Std.sub(PineJS.Std.prev(low, 1), low), 0);
//                 // const tr = PineJS.Std.tr(ctx);
//                 // const atr = PineJS.Std.rma(tr, diLength);
//                 // const smoothedPlusDM = PineJS.Std.rma(plusDM, diLength);
//                 // const smoothedMinusDM = PineJS.Std.rma(minusDM, diLength);
//                 // const plusDI = PineJS.Std.mul(PineJS.Std.div(smoothedPlusDM, atr), 100);
//                 // const minusDI = PineJS.Std.mul(PineJS.Std.div(smoothedMinusDM, atr), 100);
//                 // const dx = PineJS.Std.mul(PineJS.Std.div(PineJS.Std.abs(PineJS.Std.sub(plusDI, minusDI)), PineJS.Std.add(plusDI, minusDI)), 100);
//                 // const adx = PineJS.Std.rma(dx, adxSmoothing);

//                 const scaleFactor = 1;
//                 return [
//                   // { value: sma, offset: offset },
//                   // { value: smoothedMA, offset: offset },
//                   // // { value: plusDI[plusDI.length - 1] * scaleFactor || NaN, offset: offset },
//                   // { value: minusDI[minusDI.length - 1] * scaleFactor || NaN, offset: offset },
//                   // { value: adx[adx.length - 1] * scaleFactor || NaN, offset: offset },
//                   // { value: macdLine[macdLine.length - 1] * scaleFactor || NaN, offset: offset },
//                   // { value: signalLine[signalLine.length - 1] * scaleFactor || NaN, offset: offset },
//                   // { value: histogram[histogram.length - 1] * scaleFactor || NaN, offset: offset },

//                   { value: filteredPlotBuy },
//                   { value: filteredPlotSell },
//                   // { value: filteredPlotExit },
//                 ];

//               };

//               this.calculateMACD = function (closePrices, fastPeriod, slowPeriod, signalPeriod) {
//                 const calculateEMA = (data, length) => {
//                   const k = 2 / (length + 1);
//                   const emaArray = [data[0]];
//                   for (let i = 1; i < data.length; i++) {
//                     emaArray.push(data[i] * k + emaArray[i - 1](1 - k));
//                   }
//                   return emaArray;
//                 };

//                 const fastEMA = calculateEMA(closePrices, fastPeriod);
//                 const slowEMA = calculateEMA(closePrices, slowPeriod);
//                 const macdLine = fastEMA.map((val, idx) => val - slowEMA[idx]);
//                 const signalLine = calculateEMA(macdLine, signalPeriod);
//                 const histogram = macdLine.map((val, idx) => val - signalLine[idx]);

//                 console.log("MACD Calculations:");
//                 console.log("MACD Line:", macdLine);
//                 console.log("Signal Line:", signalLine);
//                 console.log("Histogram:", histogram);


//                 return { macdLine, signalLine, histogram };
//               };

//               // Define Wilder's Moving Average (RMA) helper function
//               this.wildersRMA = function (arr, period) {
//                 const rma = [arr[0]];  // Start with the first value in the array
//                 for (let i = 1; i < arr.length; i++) {
//                   const smoothedValue = ((rma[i - 1] * (period - 1)) + arr[i]) / period;
//                   rma.push(smoothedValue);
//                 }
//                 return rma;
//               };

//               // Main calculateDMI function with Wilder's smoothing
//               this.calculateDMI = function (highPrices, lowPrices, closePrices, period, smoothingPeriod) {
//                 let plusDIArray = [];
//                 let minusDIArray = [];
//                 let adxArray = [];


//                 let trArray = [], plusDMArray = [], minusDMArray = [];
//                 console.log("Starting DMI calculation with input data:");
//                 console.log("High Prices:", highPrices);
//                 console.log("Low Prices:", lowPrices);
//                 console.log("Close Prices:", closePrices);
//                 console.log("Period:", period, "Smoothing Period:", smoothingPeriod);


//                 for (let i = 1; i < highPrices.length; i++) {
//                   // Step 1: Calculate True Range (TR), +DM, and -DM
//                   const TR = Math.max(
//                     highPrices[i] - lowPrices[i],
//                     Math.abs(highPrices[i] - closePrices[i - 1]),
//                     Math.abs(lowPrices[i] - closePrices[i - 1])
//                   );
//                   const plusDM = (highPrices[i] > highPrices[i - 1] && (highPrices[i] - highPrices[i - 1]) > (lowPrices[i - 1] - lowPrices[i]))
//                     ? highPrices[i] - highPrices[i - 1] : 0;
//                   const minusDM = (lowPrices[i - 1] > lowPrices[i] && (lowPrices[i - 1] - lowPrices[i]) > (highPrices[i] - highPrices[i - 1]))
//                     ? lowPrices[i - 1] - lowPrices[i] : 0;

//                   // Collect values for smoothing
//                   trArray.push(TR);
//                   plusDMArray.push(plusDM);
//                   minusDMArray.push(minusDM);
//                 }

//                 // Step 2: Apply Wilder's RMA for smoothing TR, +DM, and -DM
//                 const smoothedTR = this.wildersRMA(trArray, period);
//                 const smoothedPlusDM = this.wildersRMA(plusDMArray, period);
//                 const smoothedMinusDM = this.wildersRMA(minusDMArray, period);

//                 // Step 3: Calculate +DI and -DI
//                 for (let i = 0; i < smoothedTR.length; i++) {
//                   const plusDI = (smoothedPlusDM[i] / smoothedTR[i]) * 100;
//                   const minusDI = (smoothedMinusDM[i] / smoothedTR[i]) * 100;

//                   plusDIArray.push(plusDI);
//                   minusDIArray.push(minusDI);

//                   // Step 4: Calculate DX and ADX using Wilder's smoothing
//                   if (i >= period) {
//                     const DX = Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
//                     const adxSmoothed = this.wildersRMA([DX], smoothingPeriod)[0];
//                     adxArray.push(adxSmoothed);
//                   }
//                 }

//                 return {
//                   plusDI: plusDIArray,
//                   minusDI: minusDIArray,
//                   adx: adxArray
//                 };
//               };

//             },

//           },

//         ]);

//       }
//     };

//     const tvWidget = new widget(widgetOptions);

//     tvWidget.onChartReady(() => {
//       tvWidget.headerReady().then(() => {
//         const button = tvWidget.createButton();
//         button.setAttribute("title", "Click to show a notification popup");
//         button.classList.add("apply-common-tooltip");
//         button.addEventListener("click", () =>
//           tvWidget.showNoticeDialog({
//             title: "Notification",
//             body: "TradingView Charting Library API works correctly",
//             callback: () => {
//               console.log("Noticed!");
//             },
//           })
//         );

//         // button.innerHTML = "Check API";
//       });
//     });

//     return () => {
//       tvWidget.remove();
//     };
//   }
//   useEffect(() => {
//     if (!isEmpty(tikerRoot)) {
//       let themeValue = "White";
//       if (themeData == "light") {
//         themeValue = "White";
//       } else if (themeData == "dark") {
//         themeValue = "Dark";
//       }
//       buildchart(themeValue, tikerRoot);
//     }
//   }, [tikerRoot, themeData]);

//   return <div ref={chartContainerRef} className={"TVChartContainer"} />;
// };

const Chart = (props) => {
  const { tikerRoot } = useParams();

  const tvWidget = null;
  const chartContainerRef = useRef();
  // redux state 
  const themeData = useSelector((state) => state.theme.theme);
  // const themeData = 'dark'

  const [data] = useState({ high: [], low: [], close: [] });
  const [customSignals] = useState({ buySignals: [], sellSignals: [], exitSignals: [] });

  // const [tvWidget, setTvWidget] = useState(null);

  // function
  const getLanguageFromURL = () => {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }


  const buildchart = (theme, pair) => {
    console.log("Datafeed URL:", props.datafeedUrl);
    const widgetOptions = {
      symbol: pair,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
      interval: props.interval,
      container_id: props.containerId,
      library_path: props.libraryPath,

      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings', 'header_screenshot'],
      enabled_features: ['study_templates', 'custom_indicators'],
      charts_storage_url: props.chartsStorageUrl,
      charts_storage_api_version: props.chartsStorageApiVersion,
      client_id: props.clientId,
      user_id: props.userId,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      studies_overrides: props.studiesOverrides,
      loading_screen: { backgroundColor: "#000" },
      theme: theme,
      toolbar_bg: "#000",
      overrides: {
        "paneProperties.background": "#000",
        "paneProperties.vertGridProperties.color": "#2a2e2d",
        "paneProperties.horzGridProperties.color": "#2a2e2d",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
        "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
      },

      custom_indicators_getter: function (PineJS) {
        return Promise.resolve([
          {
            name: "DMI & MACD Trading Strategy",
            metainfo: {
              _metainfoVersion: 53,
              id: 'DMIMACDStrategy@tv-basicstudies-1',
              name: 'DMI & MACD Strategy',
              description: 'Trading strategy using DMI and MACD',
              shortDescription: 'DMI & MACD',
              // id: "Custom Moving Average@tv-basicstudies-1",
              // description: "Custom Moving Average",
              // shortDescription: "Custom MA",
              format: { type: "inherit" },
              linkedToSeries: true,
              is_price_study: true,
              plots: [
                // { id: "plot_0", type: "line" },
                // { id: "smoothedMA", type: "line" },
                // { id: "plusDI", type: "line" },  
                // { id: "minusDI", type: "line" },  
                // { id: "adx", type: "line" }, 
                // { id: "macdLine", type: "line" }, 
                // { id: "signalLine", type: "line" },  
                // { id: "histogram", type: "histogram" }, 
                { id: "plot_buy", type: "shapes" },
                { id: "plot_sell", type: "shapes" },
                { id: "plot_exit", type: "shapes" }
              ],
              defaults: {
                styles: {
                  // plot_0: {
                  //   linestyle: 0,
                  //   linewidth: 1,
                  //   plottype: 0,
                  //   trackPrice: false,
                  //   transparency: 0,
                  //   visible: true,
                  //   color: "#2196F3",
                  // },
                  // smoothedMA: {
                  //   linestyle: 0,
                  //   linewidth: 1,
                  //   plottype: 0,
                  //   trackPrice: false,
                  //   transparency: 0,
                  //   visible: true,
                  //   color: "#9621F3",
                  // },
                  // plusDI: {
                  //   color: "#00FF00",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 0,
                  //   visible: true
                  // },
                  // minusDI: {
                  //   color: "#FF0000",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 0,
                  //   visible: true
                  // },
                  // adx: {
                  //   color: "#0000FF",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 0,
                  //   visible: true
                  // },
                  // macdLine: {
                  //   color: "#2196F3",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 0,
                  //   visible: true
                  // },
                  // signalLine: {
                  //   color: "#FF4500",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 0,
                  //   visible: true
                  // },
                  // histogram: {
                  //   color: "#32CD32",
                  //   linewidth: 1,
                  //   linestyle: 0,
                  //   plottype: 10,
                  //   visible: true
                  // },
                  plot_buy: { plottype: 'shape_arrow_up', color: '#00FF00', size: 3, transparency: 0, visible: true, location: 'AboveBar' },
                  plot_sell: { plottype: 'shape_arrow_down', color: '#FF0000', size: 3, transparency: 0, visible: true, location: 'AboveBar' },
                  plot_exit: { plottype: 'shape_cross', color: '#FFA500', size: 3, transparency: 0, visible: true, location: 'AboveBar' },

                },
                precision: 2,
                inputs: {
                  length: 9,
                  source: "close",
                  offset: 0,
                  smoothingLine: "SMA",
                  smoothingLength: 9,
                  diLength: 14,
                  adxSmoothing: 14,
                  fastLength: 12,
                  slowLength: 26,
                  signalSmoothing: 9,

                },
              },
              // styles: {
              //   plot_0: { title: "Plot", histogramBase: 0, joinPoints: true },
              //   smoothedMA: {
              //     title: "Smoothed MA",
              //     histogramBase: 0,
              //     joinPoints: false,
              //   },
              //   plusDI: { title: "+DI" },
              //   minusDI: { title: "-DI" },
              //   adx: { title: "ADX" },
              //   macdLine: { title: "MACD Line" },
              //   signalLine: { title: "Signal Line" },
              //   histogram: { title: "Histogram" },

              // },
              inputs: [
                {
                  id: "length",
                  name: "Length",
                  defval: 9,
                  type: "integer",
                  min: 1,
                  max: 10000,
                },
                {
                  id: "source",
                  name: "Source",
                  defval: "close",
                  type: "source",
                  options: [
                    "open",
                    "high",
                    "low",
                    "close",
                    "hl2",
                    "hlc3",
                    "ohlc4",
                  ],
                },
                {
                  id: "offset",
                  name: "Offset",
                  defval: 0,
                  type: "integer",
                  min: -10000,
                  max: 10000,
                },
                {
                  id: "smoothingLine",
                  name: "Smoothing Line",
                  defval: "SMA",
                  type: "text",
                  options: ["SMA", "EMA", "WMA"],
                },
                {
                  id: "smoothingLength",
                  name: "Smoothing Length",
                  defval: 9,
                  type: "integer",
                  min: 1,
                  max: 10000,
                },
                { id: "diLength", name: "DI Length", defval: 14, type: "integer", min: 1, max: 100 },
                { id: "adxSmoothing", name: "ADX Smoothing", defval: 14, type: "integer", min: 1, max: 50 },
                { id: "fastLength", name: "MACD Fast Length", defval: 12, type: "integer", min: 1, max: 200 },
                { id: "slowLength", name: "MACD Slow Length", defval: 26, type: "integer", min: 1, max: 200 },
                { id: "signalSmoothing", name: "MACD Signal Smoothing", defval: 9, type: "integer", min: 1, max: 50 }
              ],
            },
            constructor: function () {
              this.init = function (context, input) {
                console.log("Custom indicator context and input initialized");
                console.log("Context data:", context);
                this._context = context;
              };
              this.main = function (ctx, inputCallback) {
                console.log("Custom indicator main function called");
                this._context = ctx;
                this._input = inputCallback;

                var sourceType = this._input(1);
                console.log("Source type selected:", sourceType);
                console.log("Available properties in symbol:", Object.keys(this._context.symbol));

                // Fetch the source using PineJS.Std if available
                var source = PineJS.Std[sourceType] ? PineJS.Std[sourceType](this._context) : null;

                if (source === null || isNaN(source)) {
                  console.warn("PineJS.Std method did not return valid data. Attempting manual access...");
                  console.log("Symbol object:", this._context.symbol);

                  // Check if the sourceType exists as a property of the symbol
                  if (this._context.symbol.hasOwnProperty(sourceType)) {
                    source = this._context.symbol[sourceType];
                    console.log(`Manually accessed source "${sourceType}":`, source);
                  }

                  // If still NaN, default to 'close'
                  if (source === undefined || source === null || isNaN(source)) {
                    console.warn(`Source type "${sourceType}" is not available. Defaulting to 'close'.`);
                    source = this._context.symbol['close'];

                    if (source === undefined || source === null || isNaN(source)) {
                      console.warn("No valid data found for 'close'. Skipping calculation.");
                      return [];
                    }
                  }
                }

                console.log("Source data after accessing context:", source);

                // Proceed with calculations if the source is valid
                var length = this._input(0);
                var offset = this._input(2);
                var smoothingLine = this._input(3);
                var smoothingLength = this._input(4);
                var diLength = this._input(5);
                var adxSmoothing = this._input(6);
                var fastLength = this._input(7);
                var slowLength = this._input(8);
                var signalSmoothing = this._input(9);

                console.log("Inputs - Length:", length, "Offset:", offset, "Smoothing Line:", smoothingLine, "Smoothing Length:", smoothingLength);
                console.log("DI Length:", diLength, "ADX Smoothing:", adxSmoothing);
                console.log("MACD Fast Length:", fastLength, "MACD Slow Length:", slowLength, "MACD Signal Smoothing:", signalSmoothing);

                console.log("Context object:", this._context);


                // Calculate the required depth manually
                // var additionalDepth = length + smoothingLength;
                var additionalDepth = Math.max(length, smoothingLength, diLength, adxSmoothing, fastLength, slowLength, signalSmoothing) * 2;

                console.log("Required additional depth:", additionalDepth);

                if (typeof this._context.maxAdditionalDepth === 'function') {
                  this._context.maxAdditionalDepth(additionalDepth);
                  // console.log("Set max additional depth to:", additionalDepth);
                } else {
                  console.warn("Method maxAdditionalDepth is not available. Ensure sufficient data through the datafeed.");
                }

                // Create a series from the source data
                var series = this._context.new_var(source);
                console.log("Series data:", series);

                var sma = PineJS.Std.sma(series, length, this._context);
                var sma_series = this._context.new_var(sma);

                console.log("SMA series:", sma_series);

                var smoothedMA;
                if (smoothingLine === "EMA") {
                  smoothedMA = PineJS.Std.ema(sma_series, smoothingLength, this._context);
                  console.log("EMA Smoothed MA series:", smoothedMA);
                } else if (smoothingLine === "WMA") {
                  smoothedMA = PineJS.Std.wma(sma_series, smoothingLength, this._context);
                  console.log("WMA Smoothed MA series:", smoothedMA);
                } else {
                  smoothedMA = PineJS.Std.sma(sma_series, smoothingLength, this._context);
                  console.log("SMA Smoothed MA series:", smoothedMA);
                }

                console.log("Smoothed MA series:", smoothedMA);

                // DMI calculations
                const high = PineJS.Std.high(this._context);
                const low = PineJS.Std.low(this._context);
                const close = PineJS.Std.close(this._context);

                console.log("High value:", high);
                console.log("Low value:", low);
                console.log("Close value:", close);


                // Update arrays if the close price is new
                if (data.close[data.close.length - 1] !== close) {
                  data.high.push(high);
                  data.low.push(low);
                  data.close.push(close);

                  // Keep data arrays within max length
                  if (data.high.length > 100) data.high.shift();
                  if (data.low.length > 100) data.low.shift();
                  if (data.close.length > 100) data.close.shift();
                  console.log("Updated High Array:", data.high);
                  console.log("Updated Low Array:", data.low);
                  console.log("Updated Close Array:", data.close);
                } else {
                  return;
                }

                const { macdLine, signalLine, histogram } = this.calculateMACD(data.close, fastLength, slowLength, signalSmoothing);

                // DMI Calculation
                const { plusDI, minusDI, adx } = this.calculateDMI(data.high, data.low, data.close, diLength, adxSmoothing);


                // let plotBuy = new Array(data.close.length).fill(null);
                // let plotSell = new Array(data.close.length).fill(null);
                // let plotExit = new Array(data.close.length).fill(null);


                let plotBuy = [];
                let plotSell = [];
                let plotExit = [];
                let activePosition = null;

                for (let i = 1; i < data.close.length; i++) {
                  const adxCrossAbove20 = adx[i] > 20 && adx[i - 1] <= 20;
                  const plusDIAboveMinusDI = plusDI[i] > minusDI[i];
                  const minusDIAbovePlusDI = minusDI[i] > plusDI[i];
                  const macdCrossAboveSignal = macdLine[i] > signalLine[i] && macdLine[i - 1] <= signalLine[i - 1];
                  const macdCrossBelowSignal = macdLine[i] < signalLine[i] && macdLine[i - 1] >= signalLine[i - 1];

                  // console.log(`Index ${i} | adxCrossAbove20: ${adxCrossAbove20} | plusDIAboveMinusDI: ${plusDIAboveMinusDI} | macdCrossAboveSignal: ${macdCrossAboveSignal}`);
                  // console.log(`Index ${i} | adxCrossAbove20: ${adxCrossAbove20} | minusDIAbovePlusDI: ${minusDIAbovePlusDI} | macdCrossBelowSignal: ${macdCrossBelowSignal}`);


                  if (adxCrossAbove20 && plusDIAboveMinusDI && macdCrossAboveSignal) {
                    plotBuy[i] = data.close[i];
                    activePosition = 'buy';
                    console.log(`Buy Signal at index ${i}: ${data.close[i]}`);
                  }

                  else if (adxCrossAbove20 && minusDIAbovePlusDI && macdCrossBelowSignal) {
                    plotSell[i] = data.close[i];
                    activePosition = 'sell';
                    console.log(`Sell Signal at index ${i}: ${data.close[i]}`);
                  }

                  if (macdCrossBelowSignal || macdCrossAboveSignal) {
                    plotExit[i] = data.close[i];
                    console.log(`Exit Signal at index ${i}: ${data.close[i]}`);
                  }
                  // if (activePosition === 'buy' && macdCrossBelowSignal) {
                  //   plotExit[i] = data.close[i];
                  //   console.log(`Exit Buy Position at index ${i}: ${data.close[i]}`);
                  //   activePosition = null;  // Reset position after exit
                  // } else if (activePosition === 'sell' && macdCrossAboveSignal) {
                  //   plotExit[i] = data.close[i];
                  //   console.log(`Exit Sell Position at index ${i}: ${data.close[i]}`);
                  //   activePosition = null;  // Reset position after exit
                  // }
                }
                console.log("Buy Plot Array Before Filtering:", plotBuy);
                console.log("Sell Plot Array Before Filtering:", plotSell);
                console.log("Exit Plot Array Before Filtering:", plotExit);

                const filteredPlotBuy = plotBuy.some(val => val !== null) ? plotBuy : null;
                const filteredPlotSell = plotSell.some(val => val !== null) ? plotSell : null;
                const filteredPlotExit = plotExit.some(val => val !== null) ? plotExit : null;

                console.log("Filtered Buy Signals for Plotting:", filteredPlotBuy);
                console.log("Filtered Sell Signals for Plotting:", filteredPlotSell);
                console.log("Filtered Exit Signals for Plotting:", filteredPlotExit);


                // if (adxCrossAbove20 && plusDIAboveMinusDI && macdCrossAboveSignal) {
                //   plotBuy.push({ index: i, value: data.close[i] });  // Add only the specific points
                //   console.log(`Buy Signal at index ${i}: ${data.close[i]}`);
                //   activePosition = 'buy';
                // }

                // if (adxCrossAbove20 && minusDIAbovePlusDI && macdCrossBelowSignal) {
                //   plotSell.push({ index: i, value: data.close[i] });
                //   console.log(`Sell Signal at index ${i}: ${data.close[i]}`);
                //   activePosition = 'sell';
                // }

                // if (macdCrossBelowSignal || macdCrossAboveSignal) {
                //   plotExit.push({ index: i, value: data.close[i] });
                //   console.log(`Exit Signal at index ${i}: ${data.close[i]}`);
                // }
                // }

                // const buySignal = plotBuy.length > 0 ? plotBuy : null;
                // const sellSignal = plotSell.length > 0 ? plotSell : null;
                // const exitSignal = plotExit.length > 0 ? plotExit : null;



                // // MACD Calculation
                // const fastEMA = PineJS.Std.ema(source, fastLength);
                // const slowEMA = PineJS.Std.ema(source, slowLength);
                // const macdLine = PineJS.Std.sub(fastEMA, slowEMA);
                // const signalLine = PineJS.Std.ema(macdLine, signalSmoothing);
                // const histogram = PineJS.Std.sub(macdLine, signalLine);

                // // DMI Calculation
                // // const high = PineJS.Std.high(ctx);
                // // const low = PineJS.Std.low(ctx);
                // const plusDM = PineJS.Std.max(PineJS.Std.sub(high, PineJS.Std.prev(high, 1)), 0);
                // const minusDM = PineJS.Std.max(PineJS.Std.sub(PineJS.Std.prev(low, 1), low), 0);
                // const tr = PineJS.Std.tr(ctx);
                // const atr = PineJS.Std.rma(tr, diLength);
                // const smoothedPlusDM = PineJS.Std.rma(plusDM, diLength);
                // const smoothedMinusDM = PineJS.Std.rma(minusDM, diLength);
                // const plusDI = PineJS.Std.mul(PineJS.Std.div(smoothedPlusDM, atr), 100);
                // const minusDI = PineJS.Std.mul(PineJS.Std.div(smoothedMinusDM, atr), 100);
                // const dx = PineJS.Std.mul(PineJS.Std.div(PineJS.Std.abs(PineJS.Std.sub(plusDI, minusDI)), PineJS.Std.add(plusDI, minusDI)), 100);
                // const adx = PineJS.Std.rma(dx, adxSmoothing);

                const scaleFactor = 1;
                return [
                  // { value: sma, offset: offset },
                  // { value: smoothedMA, offset: offset },
                  // // { value: plusDI[plusDI.length - 1] * scaleFactor || NaN, offset: offset },
                  // { value: minusDI[minusDI.length - 1] * scaleFactor || NaN, offset: offset },
                  // { value: adx[adx.length - 1] * scaleFactor || NaN, offset: offset },
                  // { value: macdLine[macdLine.length - 1] * scaleFactor || NaN, offset: offset },
                  // { value: signalLine[signalLine.length - 1] * scaleFactor || NaN, offset: offset },
                  // { value: histogram[histogram.length - 1] * scaleFactor || NaN, offset: offset },

                  { value: filteredPlotBuy },
                  { value: filteredPlotSell },
                  // { value: filteredPlotExit },
                ];

              };

              this.calculateMACD = function (closePrices, fastPeriod, slowPeriod, signalPeriod) {
                const calculateEMA = (data, length) => {
                  const k = 2 / (length + 1);
                  const emaArray = [data[0]];
                  for (let i = 1; i < data.length; i++) {
                    emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
                  }
                  return emaArray;
                };

                const fastEMA = calculateEMA(closePrices, fastPeriod);
                const slowEMA = calculateEMA(closePrices, slowPeriod);
                const macdLine = fastEMA.map((val, idx) => val - slowEMA[idx]);
                const signalLine = calculateEMA(macdLine, signalPeriod);
                const histogram = macdLine.map((val, idx) => val - signalLine[idx]);

                console.log("MACD Calculations:");
                console.log("MACD Line:", macdLine);
                console.log("Signal Line:", signalLine);
                console.log("Histogram:", histogram);


                return { macdLine, signalLine, histogram };
              };

              // Define Wilder's Moving Average (RMA) helper function
              this.wildersRMA = function (arr, period) {
                const rma = [arr[0]];  // Start with the first value in the array
                for (let i = 1; i < arr.length; i++) {
                  const smoothedValue = ((rma[i - 1] * (period - 1)) + arr[i]) / period;
                  rma.push(smoothedValue);
                }
                return rma;
              };

              // Main calculateDMI function with Wilder's smoothing
              this.calculateDMI = function (highPrices, lowPrices, closePrices, period, smoothingPeriod) {
                let plusDIArray = [];
                let minusDIArray = [];
                let adxArray = [];


                let trArray = [], plusDMArray = [], minusDMArray = [];
                console.log("Starting DMI calculation with input data:");
                console.log("High Prices:", highPrices);
                console.log("Low Prices:", lowPrices);
                console.log("Close Prices:", closePrices);
                console.log("Period:", period, "Smoothing Period:", smoothingPeriod);


                for (let i = 1; i < highPrices.length; i++) {
                  // Step 1: Calculate True Range (TR), +DM, and -DM
                  const TR = Math.max(
                    highPrices[i] - lowPrices[i],
                    Math.abs(highPrices[i] - closePrices[i - 1]),
                    Math.abs(lowPrices[i] - closePrices[i - 1])
                  );
                  const plusDM = (highPrices[i] > highPrices[i - 1] && (highPrices[i] - highPrices[i - 1]) > (lowPrices[i - 1] - lowPrices[i]))
                    ? highPrices[i] - highPrices[i - 1] : 0;
                  const minusDM = (lowPrices[i - 1] > lowPrices[i] && (lowPrices[i - 1] - lowPrices[i]) > (highPrices[i] - highPrices[i - 1]))
                    ? lowPrices[i - 1] - lowPrices[i] : 0;

                  // Collect values for smoothing
                  trArray.push(TR);
                  plusDMArray.push(plusDM);
                  minusDMArray.push(minusDM);
                }

                // Step 2: Apply Wilder's RMA for smoothing TR, +DM, and -DM
                const smoothedTR = this.wildersRMA(trArray, period);
                const smoothedPlusDM = this.wildersRMA(plusDMArray, period);
                const smoothedMinusDM = this.wildersRMA(minusDMArray, period);

                // Step 3: Calculate +DI and -DI
                for (let i = 0; i < smoothedTR.length; i++) {
                  const plusDI = (smoothedPlusDM[i] / smoothedTR[i]) * 100;
                  const minusDI = (smoothedMinusDM[i] / smoothedTR[i]) * 100;

                  plusDIArray.push(plusDI);
                  minusDIArray.push(minusDI);

                  // Step 4: Calculate DX and ADX using Wilder's smoothing
                  if (i >= period) {
                    const DX = Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
                    const adxSmoothed = this.wildersRMA([DX], smoothingPeriod)[0];
                    adxArray.push(adxSmoothed);
                  }
                }

                return {
                  plusDI: plusDIArray,
                  minusDI: minusDIArray,
                  adx: adxArray
                };
              };

            },

          },

        ]);

      }


    };
    if (theme == "White") {
      delete widgetOptions.toolbar_bg;
      delete widgetOptions.overrides;
    }
    console.log("thtme", theme);

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        // button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };

    // const tvWidget = new widget(widgetOptions);
    // const tvWidgetInstance = new widget(widgetOptions);

    // tvWidgetInstance.onChartReady(() => {

    //   tvWidgetInstance.headerReady().then(() => {
    //     const button = tvWidgetInstance.createButton();
    //     button.setAttribute('title', 'Click to show a notification popup');
    //     button.classList.add('apply-common-tooltip');
    //     button.addEventListener('click', () => tvWidgetInstance.showNoticeDialog({
    //       title: 'Notification',
    //       body: 'TradingView Charting Library API works correctly',
    //       callback: () => {
    //       },
    //     }));
    //   });
    // });
    // setTvWidget(tvWidgetInstance);
  }

  useEffect(() => {
    if (tvWidget !== null) {
      tvWidget.remove();
      tvWidget = null;
    }
  }, [])

  // useEffect(() => {
  //   return () => {
  //     if (tvWidget) {
  //       tvWidget.remove();
  //       setTvWidget(null);
  //     }
  //   };
  // }, [tvWidget]);

  useEffect(() => {
    if (!isEmpty(tikerRoot)) {
      let themeValue = "White";
      if (themeData == "light") {
        themeValue = "White";
      } else if (themeData == "dark") {
        themeValue = "Dark";
      }
      buildchart(themeValue, tikerRoot);
    }
  }, [tikerRoot, themeData]);


  return (
    <div
      id={props.containerId}
      className={'TVChartContainer'}
    />
  )
}

Chart.propTypes = {
  symbol: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  containerId: PropTypes.string.isRequired,
  datafeedUrl: PropTypes.string.isRequired,
  libraryPath: PropTypes.string.isRequired,
  chartsStorageUrl: PropTypes.string.isRequired,
  chartsStorageApiVersion: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  fullscreen: PropTypes.string.isRequired,
  autosize: PropTypes.string.isRequired,
  studiesOverrides: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  pair: PropTypes.string.isRequired,
};

Chart.defaultProps = {
  symbol: 'USDT_EUR',
  interval: '5',
  containerId: 'tv_chart_container',
  datafeedUrl: chartUrl + "/derivative/chart",
  libraryPath: '/charting_library/', //live
  chartsStorageUrl: '',
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},

};

export default Chart;