import React, { useEffect, useLayoutEffect, useRef, useState, createRef, useCallback } from "react";
import Lottie from "lottie-react";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

import bannerJson from "../asset/json/launch.json";
import { data } from "../data/data";
import NewsCard from "../card/NewsCard";
import AssetCard from "../card/AssetCard";
import TokenCard from "../card/TokenCard";
import { Link } from "react-router-dom";
import CoinPairs from "../components/SpotTrade/CoinPairs";
import OrderBook from "../components/SpotTrade/OrderBook";
import YourPortfolio from "../components/SpotTrade/YourPortfolio";
import RecentTrades from "../components/SpotTrade/RecentTrades";
import TradeValue from "../components/SpotTrade/TradeValue";
import TradeOrder from "../components/SpotTrade/TradeOrder";
import MarketNews from "../components/SpotTrade/MarketNews";
import TradeGraph from "../components/SpotTrade/TradeGraph";
import Volume24 from "../components/SpotTrade/Volume24";
// import Chart from "../components/SpotTrade/Chart";
// import Chart from "../components/SpotTrade/Chart1";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "is-empty";

/**ACTIONS */
import { setSpotTicker, setSpotTradePair } from "../actions/spotReduxAction";




const SpotTrading = (props) => {
  const { spotlayout } = useSelector((state) => state.spotlayout);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tokenTabs, setTokenTabs] = useState(1);
  const [layout, setLayout] = useState(spotlayout)
  const { tikerRoot } = useParams();
  const { pairList } = useSelector((state) => state.pairList);
  const [pairs, setpairs] = useState("")



  useEffect(() => {
    setPairData();
  }, [tikerRoot, pairList]);

  const setPairData = () => {
    try {
      if (!isEmpty(pairList)) {
        if (isEmpty(tikerRoot)) {
          let pair = `${pairList[0].tikerRoot}`;
          let pairDetail = pairList.find((el) => el.tikerRoot == pair);
          console.log("pairDetail_data", pairDetail);
          localStorage.setItem("curpair", pair);
          setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
          setSpotTradePair(pairDetail);
          setSpotTicker(pairDetail);
          navigate("/spot-trading/" + pair, { replace: true });
        } else {
          let currency = localStorage.getItem("curpair");
          let pairDetail = pairList.find((el) => el.tikerRoot == currency);
          console.log("pairDetail_data1", pairDetail);
          if (isEmpty(pairDetail)) {
            let pair = `${pairList[0].tikerRoot}`;
            pairDetail = pairList.find((el) => el.tikerRoot == pair);
            localStorage.setItem("curpair", pair);

            setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
            setSpotTradePair(pairDetail);
            setSpotTicker(pairDetail);
            navigate("/spot-trading/" + pair, { replace: true });
          }
          setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
          setSpotTradePair(pairDetail);
          setSpotTicker(pairDetail);
        }
      }
    } catch (err) {
      console.log(err, "setPairData__err");
    }
  };

  const handleTokenTabs = (getId) => {
    setTokenTabs(getId);
  };



  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);



  const [tradeValueHeight, setTradeValueHeight] = useState(0)
  const tradeValueRef = useRef(null)



  console.log('refcheckd', tradeValueHeight)



  return (
    <div>
      <Header props={props} />
      <section className="custom_section">
        <div className="container trade-container py-4">
          {/* <div className="spotheadsec">
            <h5 className="px-2 allpagehead">Spot Trading</h5>
          </div> */}

          <div className={`spotgrid ${spotlayout == "second" ? "layout2" : 'layout1'} `}>
            <div className="coinpairs">
              <CoinPairs />
            </div>
            <div className="volumesec">
              <Volume24 pairs={pairs} />
            </div>
            <div className="graphsec">
              <TradeGraph />
            </div>
            <div className="orderbooksec">
              <OrderBook />
            </div>
            <div className="marketnewsec">
              <MarketNews />
            </div>
            <div className="tradevaluesec" >
              <TradeValue />
            </div>
            <div className="recenttradesec"
            // style={{ height: `${dimensions.height}px` }}
            >
              <RecentTrades />
            </div>
            <div className="tradeordersec">
              <TradeOrder />
            </div>

          </div>
          {/* <div className="row mt-4 mx-auto">
            <div className="col-12 col-md-6 col-xl-3 px-xl-0 order-1">
              <CoinPairs />
            </div>{" "}
            <div className="col-12 col-md-12 col-xl-6 px-xl-3 order-2 order-md-3 order-xl-2 mt-4 mt-xl-0">
              <Volume24 />
              <TradeGraph />
         
            </div>{" "}
            <div className="col-12 col-md-6 col-xl-3 px-xl-0 order-3 order-md-2 order-xl-3 mt-4 mt-sm-0">
              <OrderBook />
            </div>
          </div>{" "}
          <div className="row mt-4 mx-auto">
            <div className="col-12 col-md-6 col-xl-3 px-xl-0 order-1">
              <YourPortfolio />
              <MarketNews />
            </div>{" "}
            <div className="col-12 col-md-12 col-xl-6 px-xl-3 order-2 order-md-3 order-xl-2 mt-4 mt-xl-0">
              <TradeValue />
            </div>{" "}
            <div className="col-12 col-md-6 col-xl-3 px-xl-0 order-3 order-md-2 order-xl-3 mt-4 mt-md-0">
              <RecentTrades />
            </div>
          </div>
          <div className="row mt-4 mx-auto">
            <div className="col-12 col-xl-12  pe-xl-3 ">
              <TradeOrder />
            </div>{" "}

          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpotTrading;
