import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getPerformanceDetails } from '../actions/copyTradeAction';
import isEmpty from 'is-empty';

const TradePerformanceCard = (props) => {
    const { getUser } = useSelector((state) => state.user);
    const { type, id } = useParams();
    const [data, setData] = useState({})
    const options = [
        { value: "7d", label: "Last 7D" },
        { value: "10d", label: "Last 10D" },
        { value: "1m", label: "Last 1M" },
        { value: "1y", label: "Last 1Y" },
    ];

    const fetchPerformanceDetails = async (time = "") => {
        try {

            let payload = { strategyId: id, time: time == "" ? "7D" : time, type: type }
            if (type == 'copier') {
                payload['id'] = isEmpty(getUser.userId) ? "" : getUser.userId
            }
            // console.log("-------------------------------------");
            // console.log("fetchPerformanceDetailsfetchPerformanceDetails", payload);
            // console.log("-------------------------------------");
            const { status, message, data } = await getPerformanceDetails(payload);
            if (status) {
                setData(data)
            }
        } catch (e) {
            console.log("getRoi_err", e);
        }
    }

    useEffect(() => {
        if (!isEmpty(id) && !isEmpty(type)) {
            fetchPerformanceDetails("7D")
        }
    }, [id, type, getUser])

    return (
        <div className='tcp_insight_cards'>
            <div className='tcp_insight_cards_header'>
                <p className='tcp_ic_header_title'>
                    Performance
                </p>
                <div className='tcp_ic_header_filter'>
                    <Select
                        // menuIsOpen={true}
                        options={options}
                        isSearchable={false}
                        placeholder="Last 7D"
                        classNamePrefix="react_select_two"
                        onChange={(e) => { fetchPerformanceDetails(e.value.toUpperCase()) }}
                    />
                </div>
            </div>
            <div className='tcp_insight_cards_body'>
                <div className='tcp_insight_value_card'>

                    {/* use this className for loss - tcp_insight_value_loss */}

                    <div className={`tcp_insight_value`}>
                        <h5 className={`tcp_insight_value ${data?.returnOfInvestment > 0 ? 'profit' : 'loss'}`}>+ {parseFloat(data?.returnOfInvestment).toFixed(2)} %</h5>
                        <h5 className={`tcp_insight_value ${data?.totalPandL > 0 ? 'profit' : 'loss'}`}>$ {parseFloat(data?.totalPandL).toFixed(2)}</h5>
                    </div>


                    <div className='tcp_insight_value_label mt-2'>
                        <p>- ROI</p>
                        <p>Total profit</p>
                    </div>
                </div>
                <div className='tcp_insight_lv_pairs mt-4'>
                    <div className='row'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Win Rate</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value'>
                                {parseFloat(data?.winningPercentage).toFixed(2)} %
                            </p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Loss Rate</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>{parseFloat(data?.losingPercentage).toFixed(2)} %</p>
                        </div>
                    </div>
                    {type == 'trader' ? <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Total Followers</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>{data?.totalFollowers}</p>
                        </div>
                    </div>
                        :
                        ""}
                    {type == 'trader' ? <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Followers PnL's</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className={`tcp_insight_lv_pairs_value ${data?.followerPandL > 0 ? 'profit' : 'loss'}`}>{parseFloat(data?.followerPandL).toFixed(2)} USDT</p>
                        </div>
                    </div> :
                        ""
                    }

                </div>
                <div className='tcp_tp_progress_bars '>
                    {/* <div className='orange_bar'
                        style={{ width: `${data?.losingCount == 0 ? 1 : data?.losingCount}%` }}>

                    </div>
                    <div className='green_bar'
                        style={{ width: `${data?.profitCount == 0 ? 1 : data?.profitCount}%` }}>
                    </div> */}

                    {console.log('widthwidth', `${data?.profitCount == 0 ? 1 : data?.profitCount}%`)}
                    <div className='orange_bar'
                        style={{ width: `100%` }}>

                    </div>
                    <div className='green_bar'
                        style={{ width: `${data?.winningPercentage == 0 ? 1 : data?.winningPercentage}%` }}>
                    </div>
                </div>
                <div className='tcp_trade_values '>
                    <p className='tcp_trade_values_p'>Profitable trade : <span className='profit'> {data?.profitCount}</span></p>
                    <p className='tcp_trade_values_p'>Losing trade : <span className='loss'> {data?.losingCount}</span></p>
                </div>
            </div>
        </div>
    )
}

export default TradePerformanceCard