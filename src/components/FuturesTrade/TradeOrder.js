import React, { useState } from "react";
import PositionOrders from "./Position";
import OpenOrders from "./OpenOrders";
import ClosedOrders from "./ClosedOrders";
import OrderHistory from "./OrderHistory";
import Balance from "./Balance";


const tradeOrderData = [
  {
    id: 1,
    title: "Position",
    content: <PositionOrders />,
  },
  {
    id: 2,
    title: "Open Orders",
    content: <OpenOrders />,
  },
  {
    id: 2,
    title: "Closed Orders",
    content: <ClosedOrders />,
  },
  {
    id: 1,
    title: "Order History",
    content: <OrderHistory />,
  },
  {
    id: 1,
    title: "Balance",
    content: <Balance />,
  },
];

const TradeOrder = () => {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const handleOrderTabClick = (getIndex) => {
    console.log("getId", getIndex);
    setCurrentOrderIndex(getIndex);
  };
  return (
    <div className="trade_card">
      <div className="trade_value_tabs trade_order_tabs d-flex align-items-center">
        {tradeOrderData.map((tabs, index) => (
          <button
            key={index}
            onClick={() => handleOrderTabClick(index)}
            className={`
         trade_value_tabs_button d-flex align-items-center justify-content-center ${currentOrderIndex === index ? "active" : ""
              }`}
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
