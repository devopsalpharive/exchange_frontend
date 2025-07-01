import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { getRecentTrade } from "../../actions/spotTradeAction";
import { isEmpty } from "../../lib/isEmpty";
import SocketContext from "../../context/SocketContext";

const RecentTrades = () => {
  const socketContext = useContext(SocketContext);
  const { spotPair, spotTicker } = useSelector((state) => (state.spot))
  const [recentTrade, setRecentTrade] = useState([])


  const SpotId = useRef('')

  const [recentTradeHeight, setRecentTradeHeight] = useState(0)

  useEffect(() => {
    if (!isEmpty(spotPair) && SpotId.current != spotPair._id) {
      SpotId.current = spotPair._id
    }
  }, [spotPair])

  useEffect(() => {
    fetchRecenTrade()
  }, [SpotId.current])


  useEffect(() => {
    socketContext.socket.on('recentTrade', (result) => {
      // console.log(result, 'socketContext.socket', result.tikerRoot == spotPair.tikerRoot)
      let tikerRoot = localStorage.getItem('curpair')
      if (result.tikerRoot == tikerRoot) {
        // console.log('recentTrade', result)
        setRecentTrade((prevRecord) => {
          // console.log(prevRecord, 'prevRecord')
          if (result.type == 'whitebit') {
            if (isEmpty(prevRecord)) {
              return [...result.data].slice(0, 30)
            }
            return [...result.data, ...prevRecord].slice(0, 30)

          } else {
            return [...result.data].slice(0, 30)
          }

          // return [...result.data].slice(0, 30)
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
    <div className="trade_card " >
      <div className="trade_title">Recent Trades</div>

      <div className="trade_table"  >
        <div className="trade_table_head ob_table_head">
          <div className="row mx-auto">
            <div className="col-4 px-0">
              <p className="text-start">Price</p>
            </div>
            <div className="col-4 ps-0 pe-2">
              <p className="text-end">Amount</p>
            </div>
            <div className="col-4 px-0">
              <p className="text-end">Time</p>
            </div>
          </div>
        </div>
        <div
          className="trade_table_body recent_trades"
          style={{ maxHeight: `${recentTradeHeight - 35 - 16 - 42 - 20 - 15}px` }}
        >
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
                      }`}>{isNaN(val?.price) ? 0 : (val?.price)?.toFixed(spotPair?.secondDecimal)}</p>
                  </div>
                  <div className="col-4 ps-0 pe-2">
                    <p
                      className={`text-end `}
                    >
                      {isNaN(val?.filledQuantity) ? 0 : (val?.filledQuantity)?.toFixed(spotPair?.firstDecimal)}
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
