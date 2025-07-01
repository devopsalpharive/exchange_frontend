import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";


import CoinPairs from "../../components/FuturesTrade/CoinPairs";
import OrderBook from "../../components/FuturesTrade/OrderBook";
import RecentTrades from "../../components/FuturesTrade/RecentTrades";
import TradeValue from "../../components/FuturesTrade/TradeValue";
import TradeOrder from "../../components/FuturesTrade/TradeOrder";
import MarketNews from "../../components/FuturesTrade/MarketNews";
import TradeGraph from "../../components/FuturesTrade/TradeGraph";


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Volume24 from "../../components/FuturesTrade/Volume24";


/**ACTIONS */
import { setFuturesTicker, setFuturesTradePair } from "../../actions/FuturesReduxAction";
import { isEmpty } from "../../lib/isEmpty";

const FuturesTrade = (props) => {
  const { spotlayout } = useSelector((state) => state.spotlayout);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(spotlayout)

  const { tikerRoot } = useParams();
  const { derivativeList } = useSelector((state) => state.derivative);
  console.log(derivativeList, 'derivativeList')
  useEffect(() => {
    setPairData();
  }, [tikerRoot, derivativeList]);

  const setPairData = () => {
    try {
      if (!isEmpty(derivativeList)) {
        if (isEmpty(tikerRoot)) {
          let pair = `${derivativeList[0].tikerRoot}`;
          let pairDetail = derivativeList.find((el) => el.tikerRoot == pair);
          localStorage.setItem("futurespair", pair);
          console.log(pairDetail, "pairDetail");
          setFuturesTradePair(pairDetail);
          setFuturesTicker(pairDetail);
          navigate("/futures-trading/" + pair, { replace: true });
        } else {
          let currency = localStorage.getItem("futurespair");
          let pairDetail = derivativeList.find((el) => el.tikerRoot == currency);
          if (isEmpty(pairDetail)) {
            let pair = `${derivativeList[0].tikerRoot}`;
            pairDetail = derivativeList.find((el) => el.tikerRoot == pair);
            localStorage.setItem("futurespair", pair);
            setFuturesTradePair(pairDetail);
            setFuturesTicker(pairDetail);
            navigate("/futures-trading/" + pair, { replace: true });
          }
          console.log(pairDetail, "pairDetail");
          setFuturesTradePair(pairDetail);
          setFuturesTicker(pairDetail);
        }
      }
    } catch (err) {
      console.log(err, "setPairData__err");
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  return (
    <div>
      <Header props={props} />
      <section className="custom_section margin_trade">
        <div className="container container100 py-4">
          {/* <div className="spotheadsec">
          <h5 className="px-2 allpagehead">Derivative Trading</h5>
          </div> */}

          <div className={`spotgrid ${spotlayout == "second" ? "layout2" : 'layout1'} `}>
            <div className="coinpairs">
              <CoinPairs />
            </div>
            <div className="volumesec">
              <Volume24 />
            </div>
            <div className="graphsec">

              <TradeGraph />
            </div>
            <div className="orderbooksec">
              <OrderBook />
            </div>
            <div className="marketnewsec mt_marketnew">
              <MarketNews />
            </div>
            <div className="tradevaluesec">
              <TradeValue />
            </div>
            <div className="recenttradesec mt_recent_trade">
              <RecentTrades />
            </div>
            <div className="tradeordersec">
              <TradeOrder />
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FuturesTrade;
