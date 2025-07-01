import React, { useEffect, useContext, useState, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useSelector } from "react-redux";
import { CancelTrade, getOpenOrders } from "../../actions/MarginAction";
import { isEmpty } from "../../lib/isEmpty";
import { momentFormat } from "../../lib/dateTimeHelper";
import toast from "react-hot-toast";

import ConfirmModal from "../../modal/ConfirmModal";

import SocketContext from "../../context/SocketContext";
import { FaBoxOpen } from "react-icons/fa6";
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
const OpenOrders = () => {
  const socketContext = useContext(SocketContext);
  const { marginPair } = useSelector((state) => (state.margin))
  const [openOrder, setOpenOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(page);
  const [nextPage, setnextPage] = useState(true);
  const [confirmShow, setconfirmShow] = useState(false);
  const [cancelOrderId, setcancelOrderId] = useState("");
  const SpotId = useRef(marginPair?._id);

  useEffect(() => {
    if (!isEmpty(marginPair) && SpotId.current != marginPair._id) {
      SpotId.current = marginPair._id;
    }
  }, [marginPair]);

  useEffect(() => {
    let reqData = {
      page: 1,
      limit: limit,
    };
    fetchOpenOrder([], reqData);
  }, [SpotId.current]);

  useEffect(() => {
    socketContext.socket.on("MarginopenOrder", (result) => {
      setOpenOrder(result.data);
      setCount(result.count);
      setcurrentPage(result.currentPage);
      setnextPage(result.nextPage);
    });
  }, [socketContext]);

  const fetchOpenOrder = async (openOrder, reqData) => {
    try {
      if (!isEmpty(SpotId.current)) {
        let { record, status, count, currentPage, nextPage } =
          await getOpenOrders(SpotId.current, reqData);
        console.log(record, "getOpenOrders");
        if (status) {
          console.log(record, "getOpenOrders");
          setOpenOrder([...openOrder, ...record]);
          setCount(count);
          setcurrentPage(currentPage);
          setnextPage(nextPage);
        } else {
          setOpenOrder([]);
        }
      }
    } catch (err) {
      console.log(err, "fetchOpenOrder__err");
    }
  };

  const ShowConfirm = (orderId) => {
    try {
      setconfirmShow(true);
      setcancelOrderId(orderId);
    } catch (err) {
      console.log(err, "ShowConfirm___err");
    }
  };

  const handleClose = () => {
    setconfirmShow(false);
    setcancelOrderId("");
  };

  const CancelOrder = async (orderId) => {
    try {
      let { status, message } = await CancelTrade(orderId);
      if (status) {
        toast.success(message);
        handleClose();
      } else if (!status) {
        toast.error(message);
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
      fetchOpenOrder(openOrder, reqData);
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  return (
    <div className="table_div">
      {" "}
      {confirmShow && (
        <ConfirmModal
          confirmShow={confirmShow}
          handleClose={() => {
            handleClose();
          }}
          handleCancel={(orderId) => {
            CancelOrder(orderId);
          }}
          orderId={cancelOrderId}
        />
      )}
      <div className="custom_tableWrap table_body_white">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Pair</th>
              <th className="text-center">Type</th>
              <th className="text-center">Side</th>
              <th className="text-center">Price</th>
              <th className="text-center">Amount</th>
              <th className="text-center text-nowrap">Filled / Remaining</th>
              <th className="text-center">Order Value</th>
              <th className="text-center">T/P</th>
              <th className="text-center">S/L</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {openOrder.length > 0 ? (
              openOrder.map((val, index) => {
                let orderDate = momentFormat(val?.orderDate);
                let pairName = val?.firstCurrency + "/" + val?.secondCurrency;
                let Remaining = val?.quantity - val?.filledQuantity;
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center"> {orderDate}</td>
                    <td className="text-center">{pairName}</td>
                    <td className="text-center">{capitalize(val.orderType)}</td>
                    <td
                      className={
                        val.buyorsell == "buy"
                          ? "text-center table_buy_green"
                          : "table_sell_red text-center "
                      }
                    >
                      {capitalize(val.buyorsell)}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.price)
                        ? 0
                        : val?.price?.toFixed(marginPair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.quantity)
                        ? 0
                        : val?.quantity?.toFixed(marginPair.firstDecimal)}{" "}
                      {val?.firstCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.filledQuantity)
                        ? 0
                        : parseFloat(val?.filledQuantity)?.toFixed(
                          marginPair?.firstDecimal
                        )}
                      /
                      {isNaN(Remaining)
                        ? 0
                        : parseFloat(Remaining)?.toFixed(
                          marginPair?.firstDecimal
                        )}{" "}
                      {val?.firstCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.orderValue)
                        ? 0
                        : val?.orderValue?.toFixed(marginPair.secondDecimal)}{" "}
                      {val?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(val?.takeProfitPrice) || val?.takeProfitPrice == 0
                        ? "-"
                        : `${val?.takeProfitPrice?.toFixed(marginPair.secondDecimal)} ${val?.secondCurrency}`}{" "}

                    </td>
                    <td className="text-center">
                      {isNaN(val?.stopLossPrice) || val?.stopLossPrice == 0
                        ? "-"
                        : `${val?.stopLossPrice?.toFixed(marginPair.secondDecimal)} ${val?.secondCurrency}`}{" "}
                    </td>
                    <td className="text-center">
                      <button
                        className="grad_btn  px-4"
                        onClick={() => {
                          ShowConfirm(val?._id);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              // <tr>
              //   <td className="text-center" colSpan={9}>
              //     <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
              //       <FaBoxOpen fontSize={35} />
              //       No Data Found
              //     </div>
              //   </td>
              // </tr>
              <></>
            )}
          </tbody>
        </table>
      </div>
      {openOrder.length <= 0 && <div className="table_nodata">
        <div className="d-flex align-items-center justify-center flex-column gap-3 ">
          <FaBoxOpen fontSize={35} />
          No Data Found
        </div>
      </div>}
      <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
        {openOrder?.length > 0 && count != openOrder?.length && nextPage ? (
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

export default OpenOrders;
