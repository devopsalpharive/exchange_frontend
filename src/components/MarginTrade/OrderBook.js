import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

/**ACTIONS */
import { getOrderBook } from "../../actions/spotTradeAction";
import isEmpty from "is-empty";
import SocketContext from "../../context/SocketContext";
import { LuLayoutList, LuLayoutPanelLeft, LuLayoutTemplate } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import { MARGIN_ORDERBOOK_PRICE } from "../../constant/Index";

const OrderBook = () => {
  const dispatch = useDispatch()
  const listRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const [layout, setLayout] = useState('all')
  const { marginPair, marginTicker } = useSelector((state) => state.margin);
  const [sellhover, setSellhover] = useState()
  const [buyhover, setBuyhover] = useState()
  const [averagevalue, setAveragevalue] = useState([])
  const [orderBook, setOrderBook] = useState({
    sellOrder: [],
    buyOrder: [],
  });

  const SpotId = useRef('')

  useEffect(() => {
    if (!isEmpty(marginPair) && SpotId.current != marginPair._id) {
      SpotId.current = marginPair._id
    }
  }, [marginPair])

  useEffect(() => {
    fetchOrderBook();
  }, [SpotId.current]);

  useEffect(() => {
    socketContext.socket.on("orderBook", (result) => {
      result = JSON.parse(result)
      let tikerRoot = localStorage.getItem('marginpair')
      if (result.tikerRoot == tikerRoot) {
        setOrderBook((pervRecord) => {
          let buyOrder = isEmpty(result?.buyOrder) ? [] : result?.buyOrder
          let sellOrder = isEmpty(result?.sellOrder) ? [] : result?.sellOrder
          return {
            buyOrder: buyOrder,
            sellOrder: sellOrder
          }
        });
      }

    });
  }, [socketContext]);

  //fetch function
  const fetchOrderBook = async () => {
    try {
      if (!isEmpty(SpotId.current)) {
        let { result, status } = await getOrderBook(SpotId.current);
        if (status) {
          let buyTotal = 0
          let sellTotal = 0
          let buyOrder = result.buyOrder.filter((val) => {
            buyTotal = parseFloat(val.total) + parseFloat(buyTotal);
            val.totalAmount = buyTotal;
            return val
          })
          let sellOrder = result.sellOrder.filter((val) => {
            sellTotal = parseFloat(val.total) + parseFloat(sellTotal);
            val.totalAmount = sellTotal;
            return val
          })
          setOrderBook({
            'buyOrder': buyOrder,
            'sellOrder': sellOrder
          });
        } else {
          setOrderBook([]);
        }
      }
    } catch (err) {
      console.log(err, "fetchOrderBook__err");
    }
  };

  useEffect(() => {
    const savedLayout = localStorage.getItem('orderlayout');
    if (savedLayout) {
      setLayout(savedLayout);
    }
  }, []);
  const layoutfn = (e) => {
    setLayout(e);

    localStorage.setItem('orderlayout', e)
  }
  const handleMouseEnter = (data, i, id) => {
    if (id == "sell") {
      setBuyhover()
      const selldatas = orderBook?.sellOrder.slice(i, orderBook.sellOrder.length)
      setSellhover(i);
      const pricevalue = selldatas.reduce((accumulator, currentItem) => accumulator + currentItem._id, 0) / (orderBook.sellOrder.length - i);
      const amountvalue = selldatas.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
      const totalvalue = selldatas.reduce((accumulator, currentItem) => accumulator + currentItem.totalAmount, 0);
      const Ordervalue = [pricevalue, amountvalue, totalvalue];
      setAveragevalue(Ordervalue)
    }
    else {
      setSellhover()
      const buydatas = orderBook?.buyOrder.slice(0, i + 1)
      setBuyhover(i + 1);
      const pricevalue = buydatas.reduce((accumulator, currentItem) => accumulator + currentItem._id, 0) / (i + 1);
      const amountvalue = buydatas.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
      const totalvalue = buydatas.reduce((accumulator, currentItem) => accumulator + currentItem.totalAmount, 0);
      const Ordervalue = [pricevalue, amountvalue, totalvalue];
      setAveragevalue(Ordervalue)
    }


  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [orderBook?.sellOrder]);

  const handleListRef = () => {
    listRef.current = null
  }

  return (
    <div className="trade_card orderbooktable">
      <div className="trade_title">Order Book</div>
      <div className="orderlayoutsec">
        <LuLayoutList className={layout == "all" && "active"} onClick={() => layoutfn("all")} />
        <LuLayoutPanelLeft className={layout == "loss" && "active"} onClick={() => layoutfn("loss")} />
        <LuLayoutTemplate className={layout == "profit" && "active"} onClick={() => layoutfn("profit")} />
      </div>

      <div className={`${(layout == "loss" || layout == "profit") && "ob_table_ht"} ob_table mt-0`}>
        <div className="ob_table_head">
          <div className="row mx-auto align-items-center">
            <div className="col-3 px-0">
              <p className="text-start">Price ({marginPair.secondCurrency})</p>
            </div>
            <div className="col-5 ps-2 pe-3">
              <p className="text-end">Amount ({marginPair.firstCurrency})</p>
            </div>
            <div className="col-4 px-0">
              <p className="text-end">Total ({marginPair.secondCurrency})</p>
            </div>
          </div>
        </div>
        <div className="ob_table_body position-relative">
          {(layout == "all" || layout == "loss") &&
            <div className="ob_table_loss d-flex flex-column-reverse justify-content-start px-0"
              ref={listRef}
              onMouseOver={handleListRef}
            >
              {orderBook?.sellOrder?.length > 0
                ? orderBook?.sellOrder?.map((val, i) => {
                  var lastindex = orderBook?.sellOrder.length;
                  var toam = orderBook?.sellOrder[lastindex - 1].totalAmount;
                  // var toam = orderBook?.sellOrder[0].totalAmount;
                  var precentage = (val.totalAmount / toam) * 100;
                  return (
                    <div
                      id="sell"
                      className={`ob_table_loss_cont position-relative orderbookprices ${sellhover >= i && "orderbookbg sellhover"}`}
                      onMouseEnter={() => handleMouseEnter(val, i, "sell")}
                      onMouseLeave={() => setSellhover()}
                      onClick={(e) => {
                        console.log("Evenet_orderBook", val);
                        dispatch({
                          type: MARGIN_ORDERBOOK_PRICE,
                          payload: val?._id
                        })
                      }}
                      style={{ cursor: "pointer" }}
                    >

                      <div
                        className="ob_table_loss_cont_bg position-absolute"
                        style={{ width: `${precentage}%` }}
                      ></div>
                      <div className="row mx-auto">
                        <div className="col-3 px-0">
                          <p className="text-start loss_value">{val?._id}</p>
                        </div>
                        <div className="col-5 ps-2 pe-3">
                          <p className="text-end">
                            {isNaN(val?.quantity)
                              ? 0
                              : val?.quantity?.toFixed(marginPair?.secondDecimal)}
                          </p>
                        </div>{" "}
                        <div className="col-4 px-0">
                          <p className="text-end">
                            {isNaN(val?.total)
                              ? 0
                              : val?.total?.toFixed(marginPair?.firstDecimal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
                : ""}
            </div>
          }
          {/* <div className="ob_table_loss d-flex flex-column justify-content-end">
            <div className="ob_table_loss_cont position-relative">
              <div
                className="ob_table_loss_cont_bg position-absolute"
                style={{ width: "100%" }}
              ></div>
              <div className="row mx-auto">
                <div className="col-4 px-0">
                  <p className="text-start loss_value">1</p>
                </div>
                <div className="col-4 px-2">
                  <p className="text-center">2</p>
                </div>{" "}
                <div className="col-4 px-0">
                  <p className="text-end">3</p>
                </div>
              </div>
            </div>

            <div className="ob_table_loss_cont position-relative">
              <div
                className="ob_table_loss_cont_bg position-absolute"
                style={{ width: "100%" }}
              ></div>
              <div className="row mx-auto">
                <div className="col-4 px-0">
                  <p className="text-start loss_value">1</p>
                </div>
                <div className="col-4 px-2">
                  <p className="text-center">2</p>
                </div>{" "}
                <div className="col-4 px-0">
                  <p className="text-end">3</p>
                </div>
              </div>
            </div>
          </div> */}
          {layout == "all" &&
            <div className="ob_table_profit_heads" >
              <div className="row mx-auto">
                <div className="col-4 px-0 d-flex flex-column align-items-start">
                  {/* <p>Last Price</p> */}
                  <p className="ob_table_prft_value">
                    {isNaN(marginTicker.last)
                      ? 0
                      : marginTicker?.last?.toFixed(marginPair?.secondDecimal)}
                  </p>
                </div>
                <div className="col-4 px-2  d-flex flex-column align-items-center">
                  {/* <p>USD</p>
                <p className="ob_table_prft_value mt-1">1.428</p> */}
                </div>
                <div className="col-4 px-0 d-flex flex-column align-items-end">
                  {/* <p>Change</p> */}
                  <p
                    className={
                      marginTicker.change > 0
                        ? "ob_change_val val_green_txt"
                        : "ob_change_val val_red_txt"
                    }
                  >
                    {isNaN(marginTicker?.change)
                      ? 0
                      : marginTicker?.change?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          }
          {(layout == "all" || layout == "profit") &&
            <div className="ob_table_profit " >
              {orderBook?.buyOrder?.length > 0
                ? orderBook?.buyOrder?.map((val, i) => {
                  var lastindex = orderBook?.buyOrder.length;
                  var toam = orderBook?.buyOrder[lastindex - 1].totalAmount;
                  var precentage = (val.totalAmount / toam) * 100;
                  return (
                    <div
                      id="buy"
                      className={`ob_table_profit_cont position-relative orderbookprices ${i < buyhover && "orderbookbg buyhover"}`}
                      onMouseEnter={() => handleMouseEnter(val, i, "buy")}
                      onMouseLeave={() => setBuyhover()}
                      onClick={(e) => {
                        console.log("Evenet_orderBook", val);
                        dispatch({
                          type: MARGIN_ORDERBOOK_PRICE,
                          payload: val?._id
                        })
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="ob_table_profit_bg position-absolute"
                        style={{ width: `${100}%` }}
                      ></div>
                      <div className="row mx-auto">
                        <div className="col-3 px-0">
                          <p className="text-start profit_value">{val?._id}</p>
                        </div>
                        <div className="col-5 ps-2 pe-3">
                          <p className="text-end">
                            {isNaN(val?.quantity)
                              ? 0
                              : val?.quantity?.toFixed(marginPair?.firstDecimal)}
                          </p>
                        </div>{" "}
                        <div className="col-4 px-0">
                          <p className="text-end">
                            {isNaN(val.total)
                              ? 0
                              : val.total?.toFixed(marginPair?.firstDecimal)}
                          </p>
                        </div>
                      </div>
                    </div>

                  );
                })
                : ""}

            </div>

          }
          <Tooltip
            anchorSelect=".orderbookprices"
            place="right"
            className="orderbooktooltip"
            clickable
          >
            <div>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <p className="label">Avg.Price:</p>
                <p className="value">~ {averagevalue[0]}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <p className="label">Sum USDT:</p>
                <p className="value">{averagevalue[1]}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <p className="label">Sum EUR:</p>
                <p className="value">{averagevalue[2]}</p>
              </div>
            </div>

          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
