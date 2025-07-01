import React, { useEffect, useState, useContext, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { getorderHistory } from "../../../actions/spotTradeAction";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../lib/isEmpty";
import { momentFormat } from "../../../lib/dateTimeHelper";
import SocketContext from "../../../context/SocketContext";
import { FaBoxOpen } from "react-icons/fa6";
import { capitalize } from "../../../config/lib";
import { getCopyOrderHistory } from "../../../actions/copyTradeAction";
import { useParams } from "react-router-dom";
const OrderHistory = () => {
    const { type, id } = useParams();
    const socketContext = useContext(SocketContext);
    const { pairList } = useSelector((state) => state.pairList);
    const { getUser } = useSelector((state) => state.user);
    // const { spotPair, spotTicker } = useSelector((state) => state.spot);
    const [orderHistory, setorderHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(0);
    const [currentPage, setcurrentPage] = useState(page);
    const [nextPage, setnextPage] = useState(true);
    // const SpotId = useRef(spotPair?._id);

    // useEffect(() => {
    //     if (!isEmpty(spotPair) && SpotId.current != spotPair._id) {
    //         SpotId.current = spotPair._id;
    //     }
    // }, [spotPair]);

    useEffect(() => {
        let reqData = {
            page: 1,
            limit: limit,
        };
        fetchorderHistory([], reqData);
    }, []);

    useEffect(() => {
        socketContext.socket.on("copyorderHistory", (result) => {
            if (result.strategyId.toString() == id.toString()) {
                setorderHistory(result.data);
                setCount(result.count);
                setcurrentPage(result.currentPage);
                setnextPage(result.nextPage);
            }
        });
    }, [socketContext]);

    const fetchorderHistory = async (orderHistory, reqData) => {
        try {
            let data = {
                ...reqData,
                type: type,
                strategyId: id,
                userId: type == 'copier' ? getUser.userId : '',
                pairId: "all"
            }
            let { record, status, count, currentPage, nextPage } = await getCopyOrderHistory(data);
            console.log(record, "getOpenOrders");
            if (status) {
                console.log(record, "getOpenOrders");
                setorderHistory([...orderHistory, ...record]);
                setCount(count);
                setcurrentPage(currentPage);
                setnextPage(nextPage);
            } else {
                setorderHistory([]);
            }
        } catch (err) {
            console.log(err, "fetchorderHistory__err");
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
            fetchorderHistory(orderHistory, reqData);
        } catch (err) {
            console.log(err, "LoadMore___err");
        }
    };

    console.log('orderhistoyrkisdfdsfe', orderHistory)
    return (
        <div className="table_div">

            <div className="custom_tableWrap table_body_white">
                <table className="table ">
                    <thead>
                        <tr>
                            <th className="text-center snum_width">S.No</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Pair</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Buy/Sell</th>
                            <th className="text-center">Executed Price</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center text-nowrap">Executed / Remaining</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Fee</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.length > 0 ? (
                            orderHistory.map((record, index) => {
                                let orderDate = momentFormat(record?.orderDate);
                                let pairName =
                                    record?.firstCurrency + "/" + record?.secondCurrency;
                                let ExecutedPrice =
                                    record?.filledQuantity > 0
                                        ? Number(
                                            record?.averageTotal / record?.filledQuantity
                                        )?.toFixed(2)
                                        : 0;
                                console.log(ExecutedPrice, "ExecutedPrice");
                                let Remaining = record?.quantity - record?.filledQuantity;
                                let spotPair = pairList.find((val) => (val?._id?.toString() == record?.pairId?.toString()))
                                return (
                                    <>
                                        <tr>
                                            <td className="text-center snum_width">{index + 1}</td>
                                            <td className="text-center">{orderDate}</td>
                                            <td className="text-center">{pairName}</td>
                                            <td className="text-center">{capitalize(record?.orderType)}</td>
                                            <td
                                                className={
                                                    record?.buyorsell == "buy"
                                                        ? "text-center table_buy_green"
                                                        : "text-center table_sell_red"
                                                }
                                            >
                                                {capitalize(record?.buyorsell)}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(ExecutedPrice)
                                                    ? 0
                                                    : parseFloat(ExecutedPrice)?.toFixed(
                                                        spotPair?.secondDecimal
                                                    )}{" "}
                                                {record?.secondCurrency}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(record?.price)
                                                    ? 0
                                                    : parseFloat(record?.price)?.toFixed(
                                                        spotPair?.secondDecimal
                                                    )}{" "}
                                                {record?.secondCurrency}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(record?.quantity)
                                                    ? 0
                                                    : parseFloat(record?.quantity)?.toFixed(
                                                        spotPair?.firstDecimal
                                                    )}{" "}
                                                {record?.firstCurrency}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(record?.filledQuantity)
                                                    ? 0
                                                    : parseFloat(record?.filledQuantity)?.toFixed(
                                                        spotPair?.firstDecimal
                                                    )}
                                                /
                                                {isNaN(Remaining)
                                                    ? 0
                                                    : parseFloat(Remaining)?.toFixed(
                                                        spotPair?.firstDecimal
                                                    )}{" "}
                                                {record?.firstCurrency}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(record?.orderValue)
                                                    ? 0
                                                    : parseFloat(record?.orderValue)?.toFixed(
                                                        spotPair?.secondDecimal
                                                    )}{" "}
                                                {record?.secondCurrency}
                                            </td>
                                            <td className="text-center">
                                                {isNaN(record?.Fees)
                                                    ? 0
                                                    : parseFloat(record?.Fees)?.toFixed(
                                                        spotPair?.feePrec
                                                    )}{" "}
                                                {record.buyorsell == 'buy' ? record?.firstCurrency : record?.secondCurrency}
                                            </td>
                                            <td className="text-center">
                                                {record.status}
                                            </td>
                                        </tr>
                                    </>
                                );
                            })
                        ) :
                            // (
                            //   <tr>
                            //     <td className="text-center" style={{ verticalAlign: "middle" }} colSpan={12}>
                            //       <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                            //         <FaBoxOpen fontSize={35} />
                            //         No Data Found
                            //       </div>
                            //     </td>
                            //   </tr>
                            // )
                            <></>
                        }
                    </tbody>
                </table>

            </div>

            {orderHistory.length <= 0 && <div className="table_nodata">
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

export default OrderHistory;
