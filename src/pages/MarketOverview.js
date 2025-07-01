import React, { useEffect, useState, useContext, useMemo } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import NewListing from "../components/NewListing";
import HotCoins from "../components/HotCoins";
import TopGainerCoins from "../components/TopGainerCoins";
import AllCryptoTable from "../Tables/AllCryptoTable";
import SocketContext from '../context/SocketContext';

/** Actions */
import { getMarketOverview } from "../actions/spotTradeAction";

const MarketOverview = (props) => {

  const [newListing, setNewListing] = useState([]);
  const [hotCoin, setHotCoin] = useState([]);
  const [topGainer, setTopGainer] = useState([]);

  const socketContext = useContext(SocketContext);

  const fetchMarketOverview = async () => {
    try {
      const { record, status, message } = await getMarketOverview();
      if (status) {
        // console.log("fetchMarketOverview_data", record, status)
        setNewListing(record[0].newListing)
        setHotCoin(record[0].hotCoins)
        setTopGainer(record[0].topGainer)
      } else {
        message && showToastMessage(message, 'error')
      }
    } catch (e) {
      console.log("getMarketOverview_err", e);
    }
  }

  // useEffect(() => {
  //   socketContext.socket.on('marketOverview', (result) => {
  //     console.log("fetchMarketOverview_data", result)
  //     setNewListing(result[0].newListing)
  //     setHotCoin(result[0].hotCoins)
  //     setTopGainer(result[0].topGainer)
  //   })
  // }, [socketContext])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchMarketOverview()
  }, []);

  return (
    <div>
      <Header props={props} />
      <section className="min_ht_section">
        <div className="container container90 py-4">
          <h5 className="">Market Overview</h5>
          <div className="row mt-4">
            <div className="col-12 col-md-6 col-xl-4 col-xxl-3">
              <NewListing records={newListing} />
            </div>{" "}
            <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mt-4 mt-md-0">
              <HotCoins records={hotCoin} />
            </div>{" "}
            <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mt-4 mt-xl-0">
              <TopGainerCoins records={topGainer} />
            </div>

          </div>
          <div className="act_table">
            <h5 className="py-4">All Crypto</h5>
            <AllCryptoTable />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MarketOverview;
