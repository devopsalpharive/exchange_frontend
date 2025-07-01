import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Images } from "../data/Images";
import { recentTranscations } from "../actions/userAction";
import { FaBoxOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toCutOff } from "../lib/Calculationlib";
const RecentTransaction = () => {
  const [limit, setLimit] = useState(10);
  const [transcations, setTranscations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const [currentTable, setCurrentTable] = useState('fiat');

  const { userAsset } = useSelector((state) => state.user);

  const getTranscations = async (currentTable) => {
    try {
      let payload = { page: 1, limit: 10, type: currentTable };
      const trans = await recentTranscations(payload);
      if (trans.status) {
        console.log("trr", trans.data.data);
        setTranscations(trans.data.data);
        setTotalCount(trans.data.count);
      }
    } catch (e) {
      console.log("getTranscations_Err", e);
    }
  }

  const LoadMore = async () => {
    try {
      let Page = page + 1;
      setPage(Page);
      let reqData = {
        page: Page,
        limit: limit,
        type: currentTable
      };
      const trans = await recentTranscations(reqData);
      if (trans.status) {
        setTranscations(transcations.concat(trans.data.data));
      }
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  useEffect(() => {
    getTranscations(currentTable);
  }, [currentTable]);

  console.log("WAllet_page_userAssets", userAsset);

  return (
    <div className="custom_table ">
      <div className="d-flex flex-wrap align-items-center gap-3 my-4">
          {/* <button
            className={`tk_tab_btn ${currentTable === "fiat" ? "active" : ""}`}
            onClick={() => { setCurrentTable("fiat") }}>Fiat</button> */}
        <button
          className={`tk_tab_btn ${currentTable === "crypto" ? "active" : ""}`}
          onClick={() => { setCurrentTable("crypto") }}>Crypto</button>
        <button
          className={`tk_tab_btn ${currentTable === "internaltransfer" ? "active" : ""}`}
          onClick={() => { setCurrentTable("internaltransfer") }}>Internal Transfer</button>
      </div>
      {" "}

      <div className="custom_tableWrap ">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.no </th>
              <th className="text-center">Type </th>
              {currentTable == 'crypto' && <th className="text-center">Transfer Field</th>}
              {currentTable != 'fiat' && <th className="text-center">From</th>}
              {currentTable != 'fiat' && <th className="text-center">To</th>}
              {currentTable != 'internaltransfer' && <th className="text-center">Transaction Hash</th>}
              <th className="text-center">Date / Time</th>
              <th className="text-center">Status</th>
              <th className="text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transcations.length > 0 ?
              transcations.map((record, index) => {
                let currencyData = userAsset?.assets?.find((val) => (val._id == record.currencySymbol))
                return (
                  <tr>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {record?.type?.toUpperCase()}
                    </td>

                    {currentTable == 'crypto' && <td>
                      {record.transferType == "" ? "--" : record.transferType}
                    </td>}

                    {currentTable != 'fiat' && <td>
                      {record.from == "" ?
                        <p className="">{record?.fromWallet?.toUpperCase()}</p> :
                        <p className="">{record?.from}</p>}

                    </td>}

                    {currentTable != 'fiat' && <td>
                      {record.to == "" ?
                        <p className="">{record?.toWallet?.toUpperCase()}</p> :
                        <p className="">{record?.to}</p>}
                    </td>}

                    {currentTable != 'internaltransfer' && <td>
                      {record.hash == "" ? "--" : record.hash}
                    </td>}

                    <td>
                      {new Date(record.createdAt).toDateString()}
                    </td>
                    <td>
                      {record?.status.charAt(0).toUpperCase() + record?.status?.slice(1)}
                    </td>
                    <td>
                      <p className="">{toCutOff((record?.amount), currencyData?.pip)} {record?.currencySymbol}</p>
                    </td>
                  </tr>
                )
              })
              :
              <tr>
                <td className="text-center" colSpan={7}>
                  {" "}
                  <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                    <FaBoxOpen fontSize={35} />
                    No Data Found
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        transcations.length > 0 && totalCount > transcations.length ?
          <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
            <button
              className="grad_btn  px-4 fw_sm"
              onClick={() => {
                LoadMore();
              }}
            >
              Load More
            </button>
          </div> : ""
      }
    </div>
  );
};

export default RecentTransaction;
