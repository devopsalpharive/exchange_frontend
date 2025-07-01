import React, { useEffect, useState, useContext, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { getTradeHistory } from "../../actions/spotTradeAction";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/isEmpty";
import { momentFormat } from "../../lib/dateTimeHelper";
import SocketContext from "../../context/SocketContext";
import { FaBoxOpen } from "react-icons/fa6";
import { capitalize } from "../../config/lib";

const CloseOrders = ({ pairId, setPairId }) => {
  const socketContext = useContext(SocketContext);

  // const { spotPair, spotTicker } = useSelector((state) => state.spot);
  const { pairList } = useSelector((state) => state.pairList);
  const [CloseOrder, setCloseOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(page);
  const [nextPage, setnextPage] = useState(true);
  // const SpotId = useRef(spotPair?._id);

  // useEffect(() => {
  //   if (!isEmpty(spotPair) && SpotId.current != spotPair._id) {
  //     SpotId.current = spotPair._id;
  //   }
  // }, [spotPair]);

  useEffect(() => {
    let reqData = {
      page: 1,
      limit: limit,
    };
    fetchTradeHistory([], reqData);
  }, [pairId]);

  useEffect(() => {
    socketContext.socket.on("tradeHistory", (result) => {
      setPairId(false)
      setCloseOrder(result.data);
      setCount(result.count);
      setcurrentPage(result.currentPage);
      setnextPage(result.nextPage);
    });
  }, [socketContext]);

  const fetchTradeHistory = async (CloseOrder, reqData) => {
    try {
      if (!isEmpty(pairId)) {
        let { record, status, count, currentPage, nextPage } =
          await getTradeHistory(pairId, reqData);
        console.log(record, "getOpenOrders");
        if (status) {
          console.log(record, "getOpenOrders");
          setCloseOrder([...CloseOrder, ...record]);
          setCount(count);
          setcurrentPage(currentPage);
          setnextPage(nextPage);
        } else {
          setCloseOrder([]);
        }
      }
    } catch (err) {
      console.log(err, "fetchTradeHistory__err");
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
      fetchTradeHistory(CloseOrder, reqData);
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  return (
    <div className="table_div">
      {" "}
      <div className="custom_tableWrap table_body_white">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center snum_width">S.No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Pair</th>
              <th className="text-center">Type</th>
              <th className="text-center">Buy/Sell</th>
              <th className="text-center">Price</th>
              <th className="text-center">Filled</th>
              <th className="text-center">Fee</th>
              <th className="text-center">Order Value</th>
            </tr>
          </thead>
          <tbody>
            {CloseOrder.length > 0 ? (
              CloseOrder.map((record, index) => {
                let orderDate = momentFormat(record?.createdAt);
                let pairName =
                  record?.firstCurrency + "/" + record?.secondCurrency;
                let spotPair = pairList.find((val) => (val?._id?.toString() == record?.pairId?.toString()));
                return (
                  <tr>
                    <td className="text-center snum_width">{index + 1}</td>
                    <td className="text-center">{orderDate}</td>
                    <td className="text-center">{pairName}</td>
                    <td className="text-center">{record.orderType}</td>
                    {/* <td className="text-center">{record.or}</td> */}
                    <td
                      className={
                        record?.buyorsell == "buy"
                          ? "text-center table_buy_green"
                          : " text-center table_sell_red"
                      }
                    >
                      {capitalize(record?.buyorsell)}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.ExecutedPrice)
                        ? 0
                        : parseFloat(record?.ExecutedPrice)?.toFixed(
                          spotPair?.secondDecimal
                        )}{" "}
                      {record?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.filledQuantity)
                        ? 0
                        : parseFloat(record?.filledQuantity)?.toFixed(
                          spotPair?.firstDecimal
                        )}{" "}
                      {record?.firstCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.Fees)
                        ? 0
                        : parseFloat(record?.Fees)?.toFixed(
                          spotPair?.feePrec
                        )}{" "}
                      {record?.buyorsell == "buy"
                        ? record?.firstCurrency
                        : record?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.orderValue)
                        ? 0
                        : parseFloat(record?.orderValue)?.toFixed(
                          spotPair?.secondDecimal
                        )}{" "}
                      {record?.secondCurrency}
                    </td>
                  </tr>
                );
              })
            ) : (
              // <tr>
              //   <td className="text-center" colSpan={8}>
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
      {CloseOrder.length <= 0 && <div className="table_nodata">
        <div className="d-flex align-items-center justify-center flex-column gap-3 ">
          <FaBoxOpen fontSize={35} />
          No Data Found
        </div>
      </div>}
      <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
        {nextPage ? (
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

export default CloseOrders;
