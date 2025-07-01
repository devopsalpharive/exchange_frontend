import React, { useEffect, useState, useContext, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { getCloseOrders } from "../../actions/DerivativeAction";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/isEmpty";
import { momentFormat } from "../../lib/dateTimeHelper";
import SocketContext from "../../context/SocketContext";
import { FaBoxOpen } from "react-icons/fa6";
import { capitalize } from "../../config/lib";

const CloseOrders = () => {
  const socketContext = useContext(SocketContext);

  const { derivativePair } = useSelector((state) => (state.derivative))
  const [CloseOrder, setCloseOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(page);
  const [nextPage, setnextPage] = useState(true);
  const SpotId = useRef(derivativePair?._id);

  useEffect(() => {
    if (!isEmpty(derivativePair) && SpotId.current != derivativePair._id) {
      SpotId.current = derivativePair._id;
    }
  }, [derivativePair]);

  useEffect(() => {
    let reqData = {
      page: 1,
      limit: limit,
    };
    fetchCloseOrders([], reqData);
  }, [SpotId.current]);

  useEffect(() => {
    socketContext.socket.on("DerivativeClosedPosition", (result) => {
      setCloseOrder(result.data);
      setCount(result.count);
      setcurrentPage(result.currentPage);
      setnextPage(result.nextPage);
    });
  }, [socketContext]);

  const fetchCloseOrders = async (CloseOrder, reqData) => {
    try {
      if (!isEmpty(SpotId.current)) {
        let { record, status, count, currentPage, nextPage } =
          await getCloseOrders(SpotId.current, reqData);
        console.log(record, "getCloseOrders");
        if (status) {
          console.log(record, "getCloseOrders");
          setCloseOrder([...CloseOrder, ...record]);
          setCount(count);
          setcurrentPage(currentPage);
          setnextPage(nextPage);
        } else {
          setCloseOrder([]);
        }
      }
    } catch (err) {
      console.log(err, "fetchCloseOrders__err");
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
      fetchCloseOrders(CloseOrder, reqData);
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  return (
    <div className="">
      {" "}
      <div className="custom_tableWrap table_body_white">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Date</th>
              <th className="text-center">Pair</th>
              <th className="text-center">Direction</th>
              <th className="text-center">Entry price</th>
              <th className="text-center">Closing price</th>
              <th className="text-center">Close quantity</th>
              <th className="text-center">Gross P/L</th>
              <th className="text-center">Close fee</th>
              {/* <th className="text-center">Net profit</th> */}
              <th className="text-center">Balance ({derivativePair.profitCurrency})</th>
            </tr>
          </thead>
          <tbody>
            {CloseOrder.length > 0 ? (
              CloseOrder.map((record, index) => {
                let orderDate = momentFormat(record?.createdAt);
                // let pairName =
                //   record?.firstCurrency + "/" + record?.secondCurrency;
                return (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{orderDate}</td>
                    <td className="text-center">{record.pairName}</td>
                    {/* <td className="text-center">{record.or}</td> */}
                    <td
                      className="text-center"
                    >
                      {capitalize(record?.closing_direction)}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.entryPrice)
                        ? 0
                        : parseFloat(record?.entryPrice)?.toFixed(
                          derivativePair?.secondDecimal
                        )}{" "}
                      {derivativePair?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.closePrice)
                        ? 0
                        : parseFloat(record?.closePrice)?.toFixed(
                          derivativePair?.secondDecimal
                        )}{" "}
                      {derivativePair?.secondCurrency}
                    </td>
                    <td className="text-center">
                      {isNaN(record?.quantity)
                        ? 0
                        : parseFloat(record?.quantity)?.toFixed(
                          derivativePair?.firstDecimal
                        )}{" "}
                      {record?.firstCurrency}
                    </td>
                    <td className={record?.grossPandL > 0 ? "text-center table_buy_green" : 'text-center table_sell_red'}>
                      {isNaN(record?.grossPandL)
                        ? 0
                        : parseFloat(record?.grossPandL)?.toFixed(
                          derivativePair?.secondDecimal
                        )}{" "}
                      {derivativePair?.profitCurrency}
                    </td>
                    <td className="text-center table_sell_red">
                      {isNaN(record?.closeFee)
                        ? 0
                        : `-${parseFloat(record?.closeFee)?.toFixed(
                          derivativePair?.feePrec
                        )}`}{" "}
                      {derivativePair?.profitCurrency}
                    </td>
                    {/* <td className={record?.profirAndLoss > 0 ? "text-center table_buy_green" : 'text-center table_sell_red'}>
                      {isNaN(record?.profirAndLoss)
                        ? 0
                        : parseFloat(record?.profirAndLoss)?.toFixed(
                          derivativePair?.secondDecimal
                        )}{" "}
                      {derivativePair?.profitCurrency}
                    </td> */}
                    <td className={"text-center"}>
                      {isNaN(record?.afterBalance)
                        ? 0
                        : parseFloat(record?.afterBalance)?.toFixed(
                          derivativePair?.secondDecimal
                        )}{" "}
                      {derivativePair?.profitCurrency}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={8}>
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
        {nextPage && count != CloseOrder?.length && CloseOrder?.length > 0 ? (
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
    </div >
  );
};

export default CloseOrders;
