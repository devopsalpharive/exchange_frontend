import React from "react";

import Chart from "./Chart";
const TradeGraph = () => {
  return (
    <div className="trade_card">
      <div className="trade_graph h-100">

        <div className="trade_graph_body ">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default TradeGraph;
