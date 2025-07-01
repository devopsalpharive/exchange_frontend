import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";


import CoinPairs from "../../components/DerivativeTrade/CoinPairs";
import OrderBook from "../../components/DerivativeTrade/OrderBook";
import RecentTrades from "../../components/DerivativeTrade/RecentTrades";
import TradeValue from "../../components/DerivativeTrade/TradeValue";
import TradeOrder from "../../components/DerivativeTrade/TradeOrder";
import MarketNews from "../../components/DerivativeTrade/MarketNews";
import TradeGraph from "../../components/DerivativeTrade/TradeGraph";


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Volume24 from "../../components/DerivativeTrade/Volume24";


/**ACTIONS */
import { setDerivativeTicker, setDerivativeTradePair } from "../../actions/derivativeReduxAction";
import { isEmpty } from "../../lib/isEmpty";

const DerivativeTrade = (props) => {
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
          localStorage.setItem("derivativepair", pair);
          console.log(pairDetail, "pairDetail");
          setDerivativeTradePair(pairDetail);
          setDerivativeTicker(pairDetail);
          navigate("/derivative-trading/" + pair, { replace: true });
        } else {
          let currency = localStorage.getItem("derivativepair");
          let pairDetail = derivativeList.find((el) => el.tikerRoot == currency);
          if (isEmpty(pairDetail)) {
            let pair = `${derivativeList[0].tikerRoot}`;
            pairDetail = derivativeList.find((el) => el.tikerRoot == pair);
            localStorage.setItem("derivativepair", pair);
            setDerivativeTradePair(pairDetail);
            setDerivativeTicker(pairDetail);
            navigate("/derivative-trading/" + pair, { replace: true });
          }
          console.log(pairDetail, "pairDetail");
          setDerivativeTradePair(pairDetail);
          setDerivativeTicker(pairDetail);
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
      <section className="custom_section ">
        <div className="container trade-container py-4">
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
            <div className="marketnewsec ">
              <MarketNews />
            </div>
            <div className="tradevaluesec">
              <TradeValue />
            </div>
            <div className="recenttradesec dt_recent_trade">
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

export default DerivativeTrade;
