import React, { useEffect, useState } from "react";

import { Images } from "../data/Images";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";

const TopGainers = (props) => {
    const { val } = props
    const { currencyList } = useSelector((state) => (state.currency))
    const [firstCurrency, setFirstCurrency] = useState({})
    const [secondCurrency, setSecondCurrency] = useState({})
    useEffect(() => {
        if (!isEmpty(val) && !isEmpty(currencyList)) {
            let firstCurrency = currencyList.find((vals) => (vals.currencySymbol == val.firstCurrency))
            setFirstCurrency(firstCurrency)
            let secondCurrency = currencyList.find((vals) => (vals.currencySymbol == val.secondCurrency))
            setSecondCurrency(secondCurrency)
        }
    }, [val, currencyList])

    // console.log(firstCurrency, secondCurrency, 'TopGainers')
    return (
        <>
            <div className="exchange_card">
                <div className="row mx-auto">
                    <div className="col-2 px-0 d-flex align-items-center">
                        <div className="ec_image_one_wrapper">
                            <img
                                src={Images?.sol}
                                alt={val.type}
                                className={`img_fit_container`}
                            />
                        </div>
                        <div className="ec_image_two_wrapper">
                            <img
                                src={Images?.bnb}
                                alt={val.type}
                                className={`img_fit_container`}
                            />
                        </div>
                    </div>
                    <div className="col-4 pe-0 d-flex align-items-center ps-md-4">
                        <div>
                            <p className="text_bold_sm">{val.firstCurrency} - {val.secondCurrency}</p>
                            {/* <p className="text_light_xs">{val.short}</p> */}
                        </div>
                    </div>
                    <div className="col-3 pe-0 d-flex align-items-center">
                        <div>
                            <p className="text_bold_md">{val.marketPrice}</p>
                            <p
                                className={`${val.change > 0
                                    ? "text_green_xs"
                                    : "text_red_xs"
                                    }`}
                            >
                                {val.change} %
                            </p>
                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                        {val.change > 0 ?
                            <div>
                                <img
                                    src={Images.increase}
                                    alt={val.type}
                                    className="img-fluid"
                                />
                            </div> :
                            <div>
                                <img
                                    src={Images.decrease}
                                    alt={val.type}
                                    className="img-fluid"
                                />
                            </div>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default TopGainers;