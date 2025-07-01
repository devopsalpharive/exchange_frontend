import React, { useEffect, useContext, useState, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useSelector } from "react-redux";
import { getuserPositionOrders, ClosepositionOrder } from "../../actions/DerivativeAction";
import { isEmpty } from "../../lib/isEmpty";
import { momentFormat } from "../../lib/dateTimeHelper";
import toast from "react-hot-toast";

import ConfirmModal from "../../modal/ConfirmModal";

import SocketContext from "../../context/SocketContext";
import { FaBoxOpen } from "react-icons/fa6";
import { ConvertingAmount, getPorfitCalculation } from "../../lib/Calculationlib";
import CloseOrder from "../../modal/CloseOrderModel";
import { capitalize } from "../../config/lib";

const dummyTable = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];
const PositionOrders = () => {
  const { priceConversionList } = useSelector((state) => (state.currency))
  const socketContext = useContext(SocketContext);
  const { derivativePair, derivativeTicker } = useSelector((state) => (state.derivative))
  const [positionOrder, setPositionOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(page);
  const [nextPage, setnextPage] = useState(true);
  const SpotId = useRef(derivativePair?._id);
  const [show, setShow] = useState(false)
  const [closeData, setCloseData] = useState({})
  const [errors, setErrors] = useState({})
  console.log(derivativePair, "derivativePair");

  useEffect(() => {
    if (!isEmpty(derivativePair) && SpotId.current != derivativePair._id) {
      SpotId.current = derivativePair._id;
    }
  }, [derivativePair]);

  useEffect(() => {
    if (!isEmpty(derivativeTicker)) {
      ArrangePositionOrder(derivativeTicker)
    }
  }, [derivativeTicker])

  useEffect(() => {
    let reqData = {
      page: 1,
      limit: limit,
    };
    fetchPositionOrder([], reqData);
  }, [SpotId.current]);

  useEffect(() => {
    socketContext.socket.on("DerivativePositionOrder", (result) => {
      setPositionOrder(result.data);
      setCount(result.count);
      setcurrentPage(result.currentPage);
      setnextPage(result.nextPage);
    });
  }, [socketContext]);

  const fetchPositionOrder = async (positionOrder, reqData) => {
    try {
      if (!isEmpty(SpotId.current)) {
        let { record, status, count, currentPage, nextPage } =
          await getuserPositionOrders(SpotId.current, reqData);
        // console.log(record, "getPositionOrder");
        if (status) {
          // console.log(record, "getPositionOrder");
          setPositionOrder([...positionOrder, ...record]);
          setCount(count);
          setcurrentPage(currentPage);
          setnextPage(nextPage);
        } else {
          setPositionOrder([]);
        }
      }
    } catch (err) {
      console.log(err, "fetchPositionOrder__err");
    }
  };

  const ShowConfirm = (orderData) => {
    try {
      setShow(true);
      setCloseData(orderData);
    } catch (err) {
      console.log(err, "ShowConfirm___err");
    }
  };

  const handleClose = () => {
    setShow(false);
    setCloseData({});
  };

  const ClosingPositionOrder = async (data) => {
    try {
      console.log(data, 'ClosingPositionOrder')
      let { status, message, errors } = await ClosepositionOrder(data);
      if (status) {
        toast.success(message);
        handleClose();
      } else if (!status) {
        toast.error(message);
        setErrors(errors)
      }
    } catch (err) {
      console.log(err, "CancelOrder___err");
    }
  };

  const LoadMore = async () => {
    try {
      let Page = page + 1;
      setPage(Page);
      let reqData = {
        page: Page,
        limit: limit,
      };
      fetchPositionOrder(positionOrder, reqData);
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  const ArrangePositionOrder = (result) => {
    try {
      if (positionOrder.length > 0) {
        let PositionData = [...positionOrder]
        PositionData.map((val, i) => {
          if (val.pairName == derivativePair.symbol) {
            val['close_price'] = result.marketPrice
            val['grossPandL'] = getPorfitCalculation(val?.price, val.close_price, val.positionFilled, val.buyorsell == 'buy' ? 'short' : 'long')
            if (derivativePair.secondCurrency != derivativePair.profitCurrency) {
              val['grossPandL'] = ConvertingAmount(derivativePair.secondCurrency, derivativePair.profitCurrency, val.grossPandL, priceConversionList)
            }
            // val['closeFee'] = (Math.abs(parseFloat(val.grossPandL)) * parseFloat(derivativePair.close_fee) / 100)
            // val['profirAndLoss'] = parseFloat(val.grossPandL) - parseFloat(val.closeFee)
            return val
          }
        })
        setPositionOrder(PositionData)
      }
    } catch (err) {
      console.log(err, 'ArrangePositionOrder__err')
    }
  }

  return (
    <div className="">
      {" "}
      {show && (
        <CloseOrder
          show={show}
          onClose={() => {
            handleClose();
          }}
          onConfirm={(data) => {
            ClosingPositionOrder(data)
          }}
          orderData={closeData}
          errors={errors}
          setErrors={(error) => {
            console.log(error, 'CloseOrder')
            setErrors(error)
          }}
          tradeType='derivative'
        />
      )}
      <div className="custom_tableWrap table_body_white">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Pair</th>
              <th className="text-center">Quantity / Remaining</th>
              <th className="text-center">Direction</th>
              <th className="text-center">Entry price</th>
              <th className="text-center">Market price</th>
              <th className="text-center">Take profit</th>
              <th className="text-center">Stop loss</th>
              <th className="text-center text-nowrap">Gross P/L</th>
              <th className="text-center">Close fee</th>
              {/* <th className="text-center">Net Profit</th> */}
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {positionOrder.length > 0 ? (
              positionOrder.map((val, index) => {
                let orderDate = momentFormat(val?.orderDate);
                let pairName = val?.firstCurrency + "/" + val?.secondCurrency;
                console.log(val, "PositionOrder");
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center"> {orderDate}</td>
                    <td className="text-center">{pairName}</td>
                    <td className="text-center">{val.positionFilled} / {val.balanceFilled}</td>
                    <td
                      className={
                        val.buyorsell == "buy"
                          ? "text-center table_buy_green"
                          : "text-center table_sell_red"
                      }
                    >
                      {capitalize(val.buyorsell)}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.price)
                        ? 0
                        : val?.price?.toFixed(derivativePair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val.close_price)
                        ? 0
                        : val.close_price?.toFixed(derivativePair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val.takeProfitPrice)
                        ? 0
                        : val.takeProfitPrice?.toFixed(derivativePair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val.stopLossPrice)
                        ? 0
                        : val.stopLossPrice?.toFixed(derivativePair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className={
                      val.grossPandL > 0
                        ? "text-center table_buy_green"
                        : "text-center table_sell_red"
                    }>
                      {isNaN(val.grossPandL)
                        ? 0
                        : val.grossPandL?.toFixed(derivativePair.secondDecimal)}{" "}
                      {derivativePair?.profitCurrency}
                    </td>
                    <td className="text-center table_sell_red">
                      {isNaN(val?.closeFee)
                        ? 0
                        : `-${parseFloat(val?.closeFee)?.toFixed(
                          derivativePair?.feePrec
                        )}`}{" "}
                      {derivativePair?.profitCurrency}
                    </td>
                    {/* <td className={
                      val.profirAndLoss > 0
                        ? "text-center table_buy_green"
                        : "text-center table_sell_red"
                    }>
                      {isNaN(val?.profirAndLoss)
                        ? 0
                        : `${parseFloat(val?.profirAndLoss)?.toFixed(
                          derivativePair?.feePrec
                        )}`}{" "}
                      {derivativePair?.profitCurrency}
                    </td> */}
                    <td className="text-center">
                      <button
                        className="grad_btn  px-4"
                        disabled={val.closed}
                        onClick={() => {
                          ShowConfirm(val);
                        }}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={9}>
                  <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                    <FaBoxOpen fontSize={35} />
                    No Data Found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
        {positionOrder?.lengh > 0 && count != positionOrder?.length && nextPage ? (
          <button
            className="grad_btn  px-4 fw_sm"
            onClick={() => {
              LoadMore();
            }}
          >
            Load More
          </button>
        ) : (
          <button
            className="grad_btn  px-4 fw_sm"
            onClick={() => {
              LoadMore();
            }}
            disabled
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default PositionOrders;
