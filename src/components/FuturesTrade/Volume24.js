import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setFuturesTicker, setFuturesTradePair } from "../../actions/FuturesReduxAction";
import isEmpty from 'is-empty';

export default function Volume24() {
    const [coinname, setCoiname] = useState('BTC/USDT')
    const navigate = useNavigate()
    const { tikerRoot } = useParams();
    const { derivativeList } = useSelector((state) => state.derivative);
    const { futuresPair, futuresTicker } = useSelector((state) => state.futures);

    const handlePairChange = (val) => {
        try {
            let pair = val.tikerRoot;
            let pairDetail = derivativeList.find((el) => el.tikerRoot == val.tikerRoot);
            localStorage.setItem("futurespair", pair);
            setFuturesTradePair(pairDetail);
            setFuturesTicker(pairDetail);
            navigate("/futures-trading/" + pair, { replace: true });
        } catch (err) {
            console.log(err, "handlePairChange__err");
        }
    };
    return (
        <div className='volumecard trade_card mb-2 vol_min_widt'>
            <div>
                <Dropdown className='selectcoindrop'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {tikerRoot}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {derivativeList.length > 0 ? derivativeList.map((val) => {
                            return (
                                <Dropdown.Item href="#" onClick={() => { handlePairChange(val) }}>{val.tikerRoot}</Dropdown.Item>
                            )
                        }) : ""}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='volumecardmid'>
                <div>
                    <p className={futuresTicker?.last > 0 ? 'vol-head green' : 'vol-head red'}>
                        {isEmpty(futuresTicker?.last) ? 0 :
                            parseFloat(futuresTicker?.last || 0).toFixed(futuresPair?.secondDecimal)
                        }
                    </p>
                    <p className='vol-bal '>
                        {isEmpty(futuresTicker?.last) ? 0 :
                            parseFloat(futuresTicker?.last || 0).toFixed(futuresPair?.secondDecimal)
                        }
                    </p>

                </div>
                <div>
                    <p className='vol-head'>24h Change</p>
                    <p className={futuresTicker?.changePrice > 0 ? 'vol-bal green' : 'vol-bal red'}>
                        {isEmpty(futuresTicker.changePrice) ? 0 :
                            parseFloat(futuresTicker.changePrice || 0).toFixed(futuresPair.secondDecimal)} ({parseFloat(futuresTicker.change).toFixed(2)}%)
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h High</p>
                    <p className='vol-bal'>
                        {isEmpty(futuresTicker?.high) ? 0 : parseFloat(futuresTicker?.high || 0).toFixed(futuresPair?.secondDecimal)}
                    </p>
                </div>

                <div>
                    <p className='vol-head'>24h Low</p>
                    <p className='vol-bal'>
                        {isEmpty(futuresTicker?.low) ? 0 :
                            parseFloat(futuresTicker?.low || 0).toFixed(futuresPair?.secondDecimal)
                        }
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({futuresPair?.firstCurrency})</p>
                    <p className='vol-bal'>
                        {isEmpty(futuresTicker?.volume || 0) ? 0 : parseFloat(futuresTicker?.volume).toFixed(futuresPair?.firstDecimal)}
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({futuresPair.secondCurrency})</p>
                    <p className='vol-bal'>{parseFloat(futuresTicker.deal || 0).toFixed(futuresPair.secondDecimal)}</p>
                </div>

            </div>
            <div>
            </div>
        </div>
    )
}
