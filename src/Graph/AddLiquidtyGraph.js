import React from "react";
import ReactApexChart from "react-apexcharts";

const AddLiquidtyGraph = () => {
  const lineData = {
    options: {
      colors: ["#FF1D7D", "#00DEA3", "#F3BA2F"],
      chart: {
        height: 300,
        type: "line",
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "text",
        categories: [
          "10/23",
          "10/24",
          "10/25",
          "10/26",
          "10/27",
          "10/28",
          "10/29",
          "10/30",
        ],
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontFamily: undefined,
          color: "#000",
        },
      },
    },
    fill: {
      colors: ["#000"],
    },

    series: [
      {
        name: "BNB",
        data: [44, 35, 44, 38, 40, 55, 52, 60, 65],
      },
      {
        name: "Polygon",
        data: [42, 40, 45, 38, 45, 42, 39, 55, 63],
      },
      {
        name: "Cron",
        data: [40, 33, 38, 42, 44, 50, 40, 52, 55],
      },
    ],
  };
  return (
    <div>
      <div id="chart" className="custom_apex_chart">
        <ReactApexChart
          options={lineData.options}
          series={lineData.series}
          type="line"
          height={330}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AddLiquidtyGraph;
