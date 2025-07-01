import React, { useState } from "react";
import LimitContent from "./LimitContent";



const tradeValueData = [
  {
    id: 1,
    title: "Limit",
    content: <LimitContent orderType='limit' />,
  },
  {
    id: 2,
    title: "Market",
    content: <LimitContent orderType='market' />,
  },
  {
    id: 3,
    title: "Stop Limit",
    content: <LimitContent orderType='stop_limit' />,
  },
  {
    id: 4,
    title: "Stop Market",
    content: <LimitContent orderType='stop' />,
  },
];

const TradeValue = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabClick = (getIndex) => {
    console.log("getId", getIndex);
    setCurrentTabIndex(getIndex);
  };
  return (
    <div className="trade_card ">
      <div className="trade_value_tabs d-flex align-items-center">
        {tradeValueData.map((tabs, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`
             trade_value_tabs_button d-flex align-items-center justify-content-center ${currentTabIndex === index ? "active" : ""
              }`}
          >
            {tabs.title}
          </button>
        ))}
      </div>

      <div className="trade_value_tab_content mt-3">
        {tradeValueData[currentTabIndex] &&
          tradeValueData[currentTabIndex].content}
      </div>
    </div>
  );
};

export default TradeValue;
