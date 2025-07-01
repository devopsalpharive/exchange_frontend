import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getReturnOfInvestmentChart } from '../actions/copyTradeAction';
import isEmpty from 'is-empty';
import { useParams } from "react-router-dom";


const ROIcard = () => {
    const { type, id } = useParams();
    const { getUser } = useSelector((state) => state.user);
    const options = [
        { value: "7d", label: "Last 7D" },
        { value: "10d", label: "Last 10D" },
        { value: "1m", label: "Last 1M" },
        { value: "1y", label: "Last 1Y" },
    ];

    const currentThemeRedux = useSelector((state) => state.theme.theme);

    const [RoiChart, setRoiChart] = useState({
        values: [],
        labels: []
    });
    const ChartData = {
        series: [{
            name: 'series1',
            data: RoiChart.values
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
                foreColor: "#77777a"
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#1DB500"],
            stroke: {
                curve: 'smooth'
            },
            // xaxis: {
            //     // type: 'datetime',
            //     type: '',
            //     categories: RoiChart.labels
            // },
            yaxis: {
                categories: RoiChart.labels
            },

            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
                theme: true,
                // fillSeriesColor: true,
                style: {
                    fontSize: '12px',
                },
                // onDatasetHover: {
                //     highlightDataSeries: true,
                // },
            },
            grid: {
                show: false
            },
        },
    }

    useEffect(() => {
        if (!isEmpty(type) && !isEmpty(id)) {
            fetchROIChart()
        }
    }, [type, id, getUser])

    const fetchROIChart = async (time = "") => {
        try {
            const payload = { strategyId: id, time: time == "" ? "7D" : time, type: type }
            if (type == 'copier') {
                payload['id'] = isEmpty(getUser.userId) ? "" : getUser.userId
            }
            console.log("-------------------------------------");
            console.log("fetchVolumeBreakDown", payload);
            console.log("-------------------------------------");
            const { status, message, data } = await getReturnOfInvestmentChart(payload);
            if (status) {
                setRoiChart(data)
            }
        } catch (e) {
            console.log("getRoi_err", e);
        }
    }


    return (
        <div className='tcp_insight_cards'>
            <div className='tcp_insight_cards_header'>
                <p className='tcp_ic_header_title'>
                    ROI
                </p>
                <div className='tcp_ic_header_filter'>
                    <Select
                        // menuIsOpen={true}
                        options={options}
                        isSearchable={false}
                        placeholder="Last 7D"
                        classNamePrefix="react_select_two"
                        onChange={(e) => { fetchROIChart(e.value.toUpperCase()) }}
                    />
                </div>
            </div>
            <div className='tcp_insight_cards_body'>
                <div className='tcp_insight_cards_graph'>
                    <div id="chart">
                        <ReactApexChart
                            options={ChartData.options}
                            series={ChartData.series}
                            type="area" height={350}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ROIcard