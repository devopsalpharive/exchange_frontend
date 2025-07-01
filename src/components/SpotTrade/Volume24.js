import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setSpotTicker, setSpotTradePair } from "../../actions/spotReduxAction";
import isEmpty from 'is-empty';
export default function Volume24(props) {
    const navigate = useNavigate()
    const { tikerRoot } = useParams()
    const { spotPair, spotTicker } = useSelector((state) => state.spot);
    const { pairList } = useSelector((state) => (state.pairList));

    const handlePairChange = (val) => {
        try {
            let pair = val.tikerRoot;
            let pairDetail = pairList.find((el) => el.tikerRoot == val.tikerRoot);
            localStorage.setItem("curpair", pair);
            setSpotTradePair(pairDetail);
            setSpotTicker(pairDetail);
            navigate("/spot-trading/" + pair, { replace: true });
        } catch (err) {
            console.log(err, "handlePairChange__err");
        }
    };

    return (
        <div className='volumecard trade_card  vol_min_widt'>
            <div>

                <div className='graph_pair_batch'>
                    {props?.pairs}
                </div>


                {/* old dropdown - start */}

                {/* <Dropdown className='selectcoindrop'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {props?.pairs}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {pairList.length > 0 ? pairList.map((val) => {
                            return (
                                <Dropdown.Item href="#" onClick={() => { handlePairChange(val) }}>{val.tikerRoot}</Dropdown.Item>
                            )
                        }) : ""}

                    </Dropdown.Menu>
                </Dropdown> */}

                {/* old dropdown - end */}

            </div>
            <div className='volumecardmid'>
                <div>
                    <p className={spotTicker.last > 0 ? 'vol-head green' : 'vol-head red'}>
                        {isEmpty(spotTicker?.last) ? 0 : parseFloat(spotTicker.last || 0).toFixed(spotPair?.secondDecimal)}
                    </p>
                    <p className='vol-bal '>
                        {isEmpty(spotTicker?.last) ? 0 : parseFloat(spotTicker.last || 0).toFixed(spotPair?.secondDecimal)}
                    </p>

                </div>
                <div>
                    <p className='vol-head'>24h Change</p>
                    <p className={spotTicker.changePrice > 0 ? 'vol-bal green' : 'vol-bal red'}>
                        {isEmpty(spotTicker?.changePrice) ? 0 : parseFloat(spotTicker.changePrice || 0).toFixed(spotPair?.secondDecimal)} ({isEmpty(spotTicker?.changePrice) ? 0 : parseFloat(spotTicker.change || 0).toFixed(2)}%)
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h High</p>
                    <p className='vol-bal'>{isEmpty(spotTicker?.high) ? 0 : parseFloat(spotTicker.high || 0).toFixed(spotPair?.secondDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Low</p>
                    <p className='vol-bal'>{isEmpty(spotTicker?.low) ? 0 : parseFloat(spotTicker.low || 0).toFixed(spotPair?.secondDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({spotPair?.firstCurrency})</p>
                    <p className='vol-bal'>{isEmpty(spotTicker?.volume) ? 0 : parseFloat(spotTicker.volume || 0).toFixed(spotPair?.firstDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({spotPair?.secondCurrency})</p>
                    <p className='vol-bal'>{isEmpty(spotTicker?.deal) ? 0 : parseFloat(spotTicker.deal || 0).toFixed(spotPair?.secondDecimal)}</p>
                </div>

            </div>
            <div>

            </div>




        </div >
    )
}
