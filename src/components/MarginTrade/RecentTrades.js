import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { getRecentTrade } from "../../actions/spotTradeAction";
import { isEmpty } from "../../lib/isEmpty";
import SocketContext from "../../context/SocketContext";

const RecentTrades = () => {
  const socketContext = useContext(SocketContext);
  const { marginPair, marginTicker } = useSelector((state) => state.margin);
  const [recentTrade, setRecentTrade] = useState([])


  const SpotId = useRef('')

  useEffect(() => {
    if (!isEmpty(marginPair) && SpotId.current != marginPair._id) {
      SpotId.current = marginPair._id
    }
  }, [marginPair])

  useEffect(() => {
    fetchRecenTrade()
  }, [SpotId.current])


  useEffect(() => {
    socketContext.socket.on('recentTrade', (result) => {
      let tikerRoot = localStorage.getItem('marginpair')
      if (result.tikerRoot == tikerRoot) {
        console.log('recentTrade', result)
        setRecentTrade((prevRecord) => {
          if (result.type == 'whitebit') {
            if (isEmpty(prevRecord)) {
              return [...result.data].slice(0, 30)
            }
            return [...result.data, ...prevRecord].slice(0, 30)

          } else {
            return [...result.data].slice(0, 30)
          }
        })
      }
    })
  }, [socketContext])

  const fetchRecenTrade = async () => {
    try {
      if (!isEmpty(SpotId.current)) {
        let { status, result } = await getRecentTrade(SpotId.current)
        if (status) {
          setRecentTrade(result)
        } else {
          setRecentTrade([])
        }
      }

    } catch (err) {
      console.log(err, 'fetchRecenTrade__err')
    }
  }

  const z = (n) => {
    return ('0' + n).slice(-2);
  }
  return (
    <div className="trade_card">
      <div className="trade_title">Recent Trades</div>

      <div className="trade_table">
        <div className="trade_table_head ob_table_head">
          <div className="row mx-auto">
            <div className="col-4 px-0">
              <p className="text-start">Price</p>
            </div>
            <div className="col-4 ps-0 pe-2">
              <p className="text-end ">Amount</p>
            </div>
            <div className="col-4 px-0">
              <p className="text-end">Time</p>
            </div>
          </div>
        </div>
        <div className="trade_table_body recent_trades  ">
          <div>
            {recentTrade.length > 0 ? recentTrade.map((val) => {
              let dataTime = new Date(val?.createdAt);
              let time = z(dataTime.getUTCHours()) + ':' + z(dataTime.getUTCMinutes()) + ':' + z(dataTime.getUTCSeconds());
              return (
                <div className="row cp_dtls_body_bottom mx-auto px-0">
                  <div className="col-4 px-0">
                    <p className={`text-start ${val.Type === "buy"
                      ? "val_green_txt"
                      : "val_red_txt"
                      }`}>{isNaN(val?.price) ? 0 : (val?.price)?.toFixed(marginPair?.secondDecimal)}</p>
                  </div>
                  <div className="col-4 ps-0 pe-2">
                    <p
                      className={`text-end `}
                    >
                      {isNaN(val?.filledQuantity) ? 0 : (val?.filledQuantity)?.toFixed(marginPair?.firstDecimal)}
                    </p>
                  </div>{" "}
                  <div className="col-4 px-0">
                    <p className="text-end">{time}</p>
                  </div>
                </div>
              )
            }) : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTrades;
