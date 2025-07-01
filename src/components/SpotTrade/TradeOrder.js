import React, { useEffect, useRef, useState } from "react";
import OpenOrders from "./OpenOrders";
import ClosedOrders from "./ClosedOrders";
import OrderHistory from "./OrderHistory";
import Balance from "./Balance";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";



const TradeOrder = () => {
  const { spotPair } = useSelector((state) => state.spot);
  const pairId = useRef('all');
  const [isSelect, setIsSelect] = useState(false)
  const setPairId = (value) => {
    try {
      setIsSelect(value)
      if (!value) {
        console.log(value, 'checkbox1', 'all')
        pairId.current = 'all'
      } else {
        console.log(value, 'checkbox2', spotPair._id)
        pairId.current = spotPair._id
      }
    } catch (err) {
      console.log(err, 'setPaiId__err')
    }
  }
  const tradeOrderData = [
    {
      id: 1,
      title: "Open Orders",
      content: <OpenOrders
        pairId={pairId.current}
        setPairId={(value) => {
          setPairId(value)
        }}
      />,
    },
    {
      id: 2,
      title: "Closed Orders",
      content: <ClosedOrders
        pairId={pairId.current}
        setPairId={(value) => {
          setPairId(value)
        }} />,
    },
    {
      id: 1,
      title: "Order History",
      content: <OrderHistory
        pairId={pairId.current}
        setPairId={(value) => {
          setPairId(value)
        }} />,
    },
    {
      id: 1,
      title: "Balance",
      content: <Balance />,
    },
  ];
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const handleOrderTabClick = (getIndex) => {
    console.log("getId", getIndex);
    setCurrentOrderIndex(getIndex);
  };
  console.log(isSelect, 'isSelect')
  return (
    <div className="trade_card">
      <div className="asset_checkbox d-flex align-items-center justify-content-end gap-2 mb-3">
        <div style={{ marginBottom: "2px" }}>
          <label class="checkbox_container">
            <input
              type="checkbox"
              onChange={() => {
                let IsSelect = !isSelect
                setPairId(IsSelect)
              }}
              checked={isSelect}
            // onChange={(e) => { props.onHideZero(e.target.checked) }}
            />
            <span class="checkbox_checkmark"></span>
          </label>
        </div>

        <p className="asset_checkbox_p">
          Hide Other Pairs
        </p>
      </div>
      <div className="trade_value_tabs trade_order_tabs d-flex align-items-center">
        {tradeOrderData.map((tabs, index) => (
          <button
            key={index}
            onClick={() => handleOrderTabClick(index)}
            className={`
         trade_value_tabs_button d-flex align-items-center justify-content-center ${currentOrderIndex === index ? "active" : ""}`}
          >
            {tabs.title}
          </button>
        ))}
      </div>

      <div className="trade_order_table_body">
        {tradeOrderData[currentOrderIndex] &&
          tradeOrderData[currentOrderIndex].content}
      </div>
    </div>
  );
};

export default TradeOrder;
