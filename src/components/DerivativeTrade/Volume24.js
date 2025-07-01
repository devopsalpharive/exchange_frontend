import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setDerivativeTicker, setDerivativeTradePair } from "../../actions/derivativeReduxAction";
import isEmpty from 'is-empty';

export default function Volume24() {
    const [coinname, setCoiname] = useState('BTC/USDT')
    const navigate = useNavigate()
    const { tikerRoot } = useParams();
    const { derivativeList, derivativePair, derivativeTicker } = useSelector((state) => state.derivative);

    const handlePairChange = (val) => {
        try {
            let pair = val.tikerRoot;
            let pairDetail = derivativeList.find((el) => el.tikerRoot == val.tikerRoot);
            localStorage.setItem("derivativepair", pair);
            setDerivativeTradePair(pairDetail);
            setDerivativeTicker(pairDetail);
            navigate("/derivative-trading/" + pair, { replace: true });
        } catch (err) {
            console.log(err, "handlePairChange__err");
        }
    };
    return (
        <div className='volumecard trade_card  vol_min_widt'>
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
                    <p className={derivativeTicker?.last > 0 ? 'vol-head green' : 'vol-head red'}>
                        {isEmpty(derivativeTicker?.last) ? 0 :
                            parseFloat(derivativeTicker?.last || 0).toFixed(derivativePair?.secondDecimal)
                        }
                    </p>
                    <p className='vol-bal '>
                        {isEmpty(derivativeTicker?.last) ? 0 :
                            parseFloat(derivativeTicker?.last || 0).toFixed(derivativePair?.secondDecimal)
                        }
                    </p>

                </div>
                <div>
                    <p className='vol-head'>24h Change</p>
                    <p className={derivativeTicker?.changePrice > 0 ? 'vol-bal green' : 'vol-bal red'}>
                        {isEmpty(derivativeTicker.changePrice) ? 0 :
                            parseFloat(derivativeTicker.changePrice || 0).toFixed(derivativePair.secondDecimal)} ({parseFloat(derivativeTicker.change).toFixed(2)}%)
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h High</p>
                    <p className='vol-bal'>
                        {isEmpty(derivativeTicker?.high) ? 0 : parseFloat(derivativeTicker?.high || 0).toFixed(derivativePair?.secondDecimal)}
                    </p>
                </div>

                <div>
                    <p className='vol-head'>24h Low</p>
                    <p className='vol-bal'>
                        {isEmpty(derivativeTicker?.low) ? 0 :
                            parseFloat(derivativeTicker?.low || 0).toFixed(derivativePair?.secondDecimal)
                        }
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({derivativePair?.firstCurrency})</p>
                    <p className='vol-bal'>
                        {isEmpty(derivativeTicker?.volume || 0) ? 0 : parseFloat(derivativeTicker?.volume).toFixed(derivativePair?.firstDecimal)}
                    </p>
                </div>
                <div>
                    <p className='vol-head'>24h Volume ({derivativePair.secondCurrency})</p>
                    <p className='vol-bal'>{parseFloat(derivativeTicker.deal || 0).toFixed(derivativePair.secondDecimal)}</p>
                </div>

            </div>
            <div>
            </div>
        </div>
    )
}
