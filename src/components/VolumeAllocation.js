import React, { useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from "react-redux";
import Chart from 'react-apexcharts'
import isEmpty from 'is-empty'
import { useParams, useLocation } from "react-router-dom";

import { getVolumeBreakDown } from '../actions/copyTradeAction'

const VolumeAllocation = (props) => {

    const { type, id } = useParams();
    const { getUser } = useSelector((state) => state.user);
    console.log(type, id, "VolumeAllocation")
    const [state, setState] = React.useState({})

    const options = [
        { value: "7d", label: "Last 7D" },
        { value: "10d", label: "Last 10D" },
        { value: "1m", label: "Last 1M" },
        { value: "1y", label: "Last 1Y" },
    ];

    const fetchVolumeBreakDown = async (time) => {
        try {
            let payload = { strategyId: id, time: time, type: type }
            if (type == 'copier') {
                payload['id'] = isEmpty(getUser.userId) ? "" : getUser.userId
            }
            // console.log("-------------------------------------");
            // console.log("fetchVolumeBreakDown", payload);
            // console.log("-------------------------------------");
            const { status, message, data } = await getVolumeBreakDown(payload);
            if (status) {
                if (data.length > 0) {
                    const value = []
                    const label = []
                    data.forEach((item) => {
                        value.push(item.count);
                        label.push(item.symbol);
                    });
                    setState({
                        options: {
                            legend: { show: false },
                            dataLabels: { enabled: true },
                            onItemHover: { highlightDataSeries: true },
                            tooltip: { enabled: true },
                            stroke: { show: false, width: 0 },
                            labels: label
                        },
                        series: value,
                    })
                }
            }
        } catch (e) {
            console.log("fetchVolumeBreakDown_err", e);
        }
    }


    useEffect(() => {
        if (!isEmpty(id) && !isEmpty(type)) {
            console.log('getVolumeBreakDown_call')
            fetchVolumeBreakDown("7D")
        }
    }, [id, type, getUser])

    return (
        <div className='tcp_insight_cards'>

            <div className='tcp_insight_cards_header'>
                <p className='tcp_ic_header_title'>
                    Volume Allocation
                </p>
                <div className='tcp_ic_header_filter'>
                    <Select
                        // menuIsOpen={true}
                        options={options}
                        isSearchable={false}
                        placeholder="Last 7D"
                        classNamePrefix="react_select_two"
                        onChange={(e) => { fetchVolumeBreakDown(e.value.toUpperCase()) }}
                    />
                </div>
            </div>

            <div className='tcp_insight_cards_body'>
                <div className='tcp_insight_cards_graph'>
                    <div className='row align-items-center'>

                        <div className='col-md-8 col-lg-5 col-xl-4 col-xxl-5 d-flex justify-content-center mx-auto'>
                            <div className="donut custom_donut_chart">
                                {/* <p className='donut_center_text'>Volume</p> */}
                                {
                                    !isEmpty(state.series) && !isEmpty(state.options) ?
                                        <Chart
                                            type='donut'
                                            options={state.options}
                                            series={state.series}
                                        />
                                        :
                                        <p className='donut_center_text'>No data found</p>
                                }

                            </div>
                        </div>
                        {
                            !isEmpty(state.series) && !isEmpty(state.options) ?
                                <div className='col-md-12 col-lg-7 col-xl-8 col-xxl-7'>
                                    <div className='donut_legends_container'>
                                        <div className='row'>
                                            {state &&
                                                state?.series?.map((item, index) => {
                                                    return (
                                                        <div className='col-12 col-sm-6 mb-3 d-flex justify-content-center'>
                                                            <div className='dn_single_legends'>
                                                                {/* <div className='dn_legends_dot_bg' style={{ background: "#9F49A3" }}></div> */}
                                                                <p>{state.options.labels[index]}</p>
                                                                <p>{parseFloat(item).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div> :
                                <div>No Data found</div>
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default VolumeAllocation