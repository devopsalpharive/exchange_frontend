import isEmpty from 'is-empty'
import React, { useEffect, useState } from 'react'
import { getCopierStats } from '../actions/copyTradeAction'
import { useParams } from "react-router-dom";
const CurrentCopiers = (props) => {
    const { type, id } = useParams();

    const [data, setDate] = useState({})

    const fetchCopierStats = async () => {
        try {
            const { status, data } = await getCopierStats(id);
            if (status) {
                // console.log("fetchCopierStats_data", data);
                setDate(data)
            }
        } catch (e) {
            console.log("fetchCopierStats_err", e);
        }
    }

    useEffect(() => {
        if (!isEmpty(id)) {
            fetchCopierStats()
        }
    }, [id])

    return (
        <div className='tcp_insight_cards'>

            <div className='tcp_insight_cards_header'>
                <p className='tcp_ic_header_title'>
                    Copiers
                </p>
                <div className='tcp_ic_header_count'>
                    {data?.curCopier}/{data?.totalCopier}
                </div>
            </div>

            <div className='tcp_insight_cards_body tcp_cc_cards_body'>
                <div className='tcp_insight_lv_pairs'>
                    {/* <div className='row'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Total AUM</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>${data?.totalAUM}</p>
                        </div>
                    </div> */}
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Profit and Loss</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className={`tcp_insight_lv_pairs_value ${data?.copiersTotalPnl > 0 ? 'profit' : 'loss'}`}>{parseFloat(data?.copiersTotalPnl).toFixed(2)} USDT</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Profit</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>

                            {/* use "loss" instead of "profit" here like this : "tcp_insight_lv_pairs_value loss"  */}

                            <p className='tcp_insight_lv_pairs_value'>
                                {data?.copiersProfitcount}
                            </p>

                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Loss</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>{data?.copierslossingcount}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Winning Percentage</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>{parseFloat(data?.copiersWinPercen).toFixed(2)} %</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <p className='tcp_insight_lv_pairs_label'>Losing Percentage</p>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <p className='tcp_insight_lv_pairs_value '>{parseFloat(data?.copierslossPercen).toFixed(2)} %</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CurrentCopiers