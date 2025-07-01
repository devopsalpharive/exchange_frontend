import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";


import CoinPairs from "../../components/MarginTrade/CoinPairs";
import OrderBook from "../../components/MarginTrade/OrderBook";
import RecentTrades from "../../components/MarginTrade/RecentTrades";
import TradeValue from "../../components/MarginTrade/TradeValue";
import TradeOrder from "../../components/MarginTrade/TradeOrder";
import MarketNews from "../../components/MarginTrade/MarketNews";
import TradeGraph from "../../components/MarginTrade/TradeGraph";
import Volume24 from "../../components/MarginTrade/Volume24";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "is-empty";


/**ACTIONS */
import { setMarginTicker, setMarginTradePair } from "../../actions/MarginReduxAction";

const MarginTrading = (props) => {
  const { spotlayout } = useSelector((state) => state.spotlayout);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(spotlayout)
  const [pairs, setpairs] = useState("")

  const { tikerRoot } = useParams();
  const { marginList } = useSelector((state) => state.margin);
  useEffect(() => {
    setPairData();
  }, [tikerRoot, marginList]);

  const setPairData = () => {
    try {
      if (!isEmpty(marginList)) {
        if (isEmpty(tikerRoot)) {
          let pair = `${marginList[0].tikerRoot}`;
          let pairDetail = marginList.find((el) => el.tikerRoot == pair);
          localStorage.setItem("marginpair", pair);
          setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
          setMarginTradePair(pairDetail);
          setMarginTicker(pairDetail);
          navigate("/margin-trading/" + pair, { replace: true });
        } else {
          let currency = localStorage.getItem("marginpair");
          let pairDetail = marginList.find((el) => el.tikerRoot == currency);
          if (isEmpty(pairDetail)) {
            let pair = `${marginList[0].tikerRoot}`;
            pairDetail = marginList.find((el) => el.tikerRoot == pair);
            localStorage.setItem("marginpair", pair);
            setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
            setMarginTradePair(pairDetail);
            setMarginTicker(pairDetail);
            navigate("/margin-trading/" + pair, { replace: true });
          }
          setpairs(`${pairDetail.firstCurrency}/${pairDetail.secondCurrency}`)
          setMarginTradePair(pairDetail);
          setMarginTicker(pairDetail);
        }
      }
    } catch (err) {
      console.log(err, "setPairData__err");
    }
  };


  return (
    <div>
      <Header props={props} />
      <section className="custom_section margin_trade">
        <div className="container trade-container py-4">
          {/* <div className="spotheadsec">
          <h5 className="px-2 allpagehead">Margin Trading</h5>
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
            <div className="marketnewsec ">
              <MarketNews />
            </div>
            <div className="tradevaluesec">
              <TradeValue />
            </div>
            <div className="recenttradesec ">
              {/* <RecentTrades /> */}
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

export default MarginTrading;
