import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setMarginTicker, setMarginTradePair } from "../../actions/MarginReduxAction";
import isEmpty from 'is-empty';

export default function Volume24(props) {
    const [coinname, setCoiname] = useState('BTC/USDT')
    const navigate = useNavigate()
    const { tikerRoot } = useParams();
    const { marginPair, marginTicker, marginList } = useSelector((state) => state.margin);

    const handlePairChange = (val) => {
        try {
            let pair = val.tikerRoot;
            let pairDetail = marginList.find((el) => el.tikerRoot == val.tikerRoot);
            localStorage.setItem("marginpair", pair);
            setMarginTradePair(pairDetail);
            setMarginTicker(pairDetail);
            navigate("/margin-trading/" + pair, { replace: true });
        } catch (err) {
            console.log(err, "handlePairChange__err");
        }
    };
    return (
        <div className='volumecard trade_card vol_min_widt'>
            <div>
                {/* <Dropdown className='selectcoindrop'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {props?.pairs}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {marginList.length > 0 ? marginList.map((val) => {
                            return (
                                <Dropdown.Item href="#" onClick={() => { handlePairChange(val) }}>{val.tikerRoot}</Dropdown.Item>
                            )
                        }) : ""}

                    </Dropdown.Menu>
                </Dropdown> */}
                <div className='graph_pair_batch'>
                    {props?.pairs}
                </div>
            </div>
            <div className='volumecardmid'>
                <div>
                    <p className={marginTicker.last > 0 ? 'vol-head green' : 'vol-head red'}>
                        {isEmpty(marginTicker.last) ? 0 : parseFloat(marginTicker.last || 0).toFixed(marginPair.secondDecimal)}
                    </p>
                    <p className='vol-bal '>
                        {isEmpty(marginTicker.last) ? 0 : parseFloat(marginTicker.last || 0).toFixed(marginPair.secondDecimal)}
                    </p>

                </div>
                <div>
                    <p className='vol-head'>24h Change</p>
                    <p className={marginTicker.changePrice > 0 ? 'vol-bal green' : 'vol-bal red'}>
                        {isEmpty(marginTicker.changePrice) ? 0 : parseFloat(marginTicker.changePrice || 0).toFixed(marginPair.secondDecimal)} ({isEmpty(marginTicker.change) ? 0 : parseFloat(marginTicker.change || 0).toFixed(2)}%)
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h High</p>
                    <p className='vol-bal'>{isEmpty(marginTicker.high) ? 0 : parseFloat(marginTicker.high || 0).toFixed(marginPair.secondDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Low</p>
                    <p className='vol-bal'>{isEmpty(marginTicker.low) ? 0 : parseFloat(marginTicker.low || 0).toFixed(marginPair.secondDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({marginPair.firstCurrency})</p>
                    <p className='vol-bal'>{isEmpty(marginTicker.volume) ? 0 : parseFloat(marginTicker.volume || 0).toFixed(marginPair.firstDecimal)}</p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({marginPair.secondCurrency})</p>
                    <p className='vol-bal'>{isEmpty(marginTicker.deal) ? 0 : parseFloat(marginTicker.deal || 0).toFixed(marginPair.secondDecimal)}</p>
                </div>

            </div>
            <div>

            </div>




        </div>
    )
}
