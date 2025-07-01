import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import AddLiquidtyGraph from "../Graph/AddLiquidtyGraph";
import { useParams } from "react-router-dom";

const graphButtons = [
  {
    id: 1,
    name: "Volume",
  },
  {
    id: 2,
    name: "TVL",
  },
  {
    id: 3,
    name: "APR",
  },
];

const durations = [
  {
    id: 1,
    name: "Time",
  },
  {
    id: 2,
    name: "1D",
  },
  {
    id: 3,
    name: "1W",
  },
  {
    id: 3,
    name: "1D",
  },
  {
    id: 4,
    name: "1M",
  },
  {
    id: 5,
    name: "6M",
  },
  {
    id: 6,
    name: "1Y",
  },
  {
    id: 7,
    name: <IoMdArrowDropdown />,
  },
];

const TradeGraph = () => {
  const { tikerRoot } = useParams()
  const [currentButton, setCurrentButton] = useState(0);
  const [durationCurrentButton, setDurationCurrentButton] = useState(0);

  const handleButtonClick = (getIndex) => {
    setCurrentButton(getIndex);
  };

  const handleDurationClick = (getIndex) => {
    setDurationCurrentButton(getIndex);
  };
  return (
    <div className="trade_card">
      <div className="trade_graph">
        <div className="trade_graph_head d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between pb-4">
          <div>
            <p className="graph_gray_title">{tikerRoot} Chart</p>
          </div>
          <div className="trade_value_tabs d-flex align-items-center mt-3 mt-sm-0">
            {graphButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={`d-flex align-items-center justify-content-center trade_value_tabs_button ${
                  currentButton === index ? "active" : ""
                } `}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
        <div className="trade_graph_body pt-4">
          <AddLiquidtyGraph />
        </div>

        <div className="trade_graph_footer my-4">
          <div className="d-flex align-items-center justify-content-between trade_graph_buttons_wraper">
            {durations.map((buttons, index) => (
              <button
                key={index}
                className={`d-flex align-items-center justify-content-center trd_grp_duration_btns ${
                  durationCurrentButton === index ? "active" : ""
                }`}
                onClick={() => handleDurationClick(index)}
              >
                {buttons.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeGraph;
