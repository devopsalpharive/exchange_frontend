import React from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Images } from "../data/Images";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";


const AllCryptoTable = () => {
  const navigate = useNavigate();
  const { pairList } = useSelector((state) => state.pairList);
  console.log("AllCryptoTable_pairList", pairList)
  let columns = [
    {
      key: "tradingPair",
      text: "Trading Pair",
      width: 150,
      className: "table_p w150",
      align: "center",
      sortable: false,
      cell: (record) => {
        return (
          <div className="d-flex align-items-center justify-content-center gap-2">
            {/* <img
              src={Images.stakeCoin1}
              alt="btc"
              className="img-fluid mo_coin_img"
            /> */}
            <p className="mo_coin_name">{record?.firstCurrency}/{record?.secondCurrency}</p>
            {/* <div className="act_coinBatch ms-1">Bitcoin</div> */}
          </div>
        );
      },
    },
    {
      key: "lastPrice",
      text: "Last Price",
      className: "table_p w150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return <p className="mo_dollarPercent">{record?.last}</p>;
      },
    },
    {
      key: "24hChange",
      text: "24h change",
      className: "table_p w150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return <p className={record?.change > 0 ? `mo_status_value positive` : `mo_status_value negative`}>{record?.change > 0 ? `+${record?.change}` : record?.change} %</p>;
      },
    },
    {
      key: "vol",
      text: "Vol",
      className: "table_p w150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return <p className="mo_dollarPercent">{record?.volume}</p>;
      },
    },
    // {
    //   key: "marketCap",
    //   text: "Market cap",
    //   className: "table_p w150",
    //   align: "center",
    //   width: 150,
    //   sortable: false,
    //   cell: (record) => {
    //     return <p className="mo_dollarPercent">$1,298,278</p>;
    //   },
    // },
    {
      key: "actions",
      text: "Action",
      className: "table_p w150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return (
          <p
            className="mo_status_value positive"
            style={{ cursor: "pointer" }}
            onClick={() => {
              // navigate("/spot-trading/" + record?.tikerRoot, { replace: true });
              navigate("/spot-trading/" + record?.tikerRoot);

            }}
          >
            Trade
          </p>)
      },
    },
    {
      key: "graph",
      text: "Graph",
      className: "table_p w150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return (<img src={record?.change > 0 ? Images.increase : Images.decrease} alt="increase" style={{ width: "80px" }} />)
      },
    },
  ];

  let config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    button: {
      excel: false,
      print: false,
    },
    show_pagination: false,
    show_info: false,
    show_length_menu: false,
    show_filter: false,
  };

  return (
    <div className="custom_table ref_custom_table">
      {" "}
      <ReactDatatable
        config={config}
        records={pairList}
        columns={columns}
      />
    </div>
  );
};

export default AllCryptoTable;
