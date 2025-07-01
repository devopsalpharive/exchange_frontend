import React, { useEffect, useState } from 'react'
import Header from '../../Layout/Header'
import Lottie from "lottie-react";
import bannerJson from "../../asset/json/copyTrade.json";
import { Images } from '../../data/Images';
import TraderCard from '../../card/TraderCard';
import { useSelector } from "react-redux";
import isEmpty from 'is-empty';
import BecomeTrader from '../../modal/BecomeTrader';
import Footer from '../../Layout/Footer';
import { useNavigate } from 'react-router-dom'
import NoData from '../../components/NoData';


const CopyTrade = (props) => {

    const { allStrategy } = useSelector((state) => state.copyTrade);
    const [showBecomeTrader, setShowBecomeTrader] = useState(false)
    const [strategy, setStrategy] = useState([])

    const navigate = useNavigate()


    const handleShowBecomeTrader = () => {
        setShowBecomeTrader(true)
    }

    const handleCloseBecomeTrader = () => {
        setShowBecomeTrader(false)
    }

    useEffect(() => {
        if (!isEmpty(allStrategy)) {
            setStrategy(allStrategy)
        }
    }, [allStrategy])
    console.log("allStrategy_allStrategy", strategy, allStrategy);

    return (
        <div>

            {/* modal import - start */}

            <BecomeTrader
                show={showBecomeTrader}
                handleClose={handleCloseBecomeTrader} />

            {/* modal import -end */}

            <Header props={props} />
            <section className="custom_section">
                <div className="cover_banner_w100">
                    <div className="container container80">
                        <div className='row d-flex flex-column-reverse flex-lg-row'>
                            <div className='col-12 col-lg-6 d-flex align-items-center'>
                                <div className='banner_left '>
                                    <h3 className='title launch_title'>
                                        Boost your earnings <br />
                                        with copy trading
                                    </h3>
                                    <p className='desc pt-3 pb-4' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </p>
                                    <div className='d-flex flex-wrap align-items-center gap-3 mb-5 mb-lg-0'>
                                        <button
                                            className='button_primary'
                                            onClick={() => navigate('/copier-dashboard')}
                                        >
                                            Go to Trader Dashboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                                <div className="launch_banner_right d-flex justify-content-center justify-content-lg-end">
                                    <Lottie
                                        animationData={bannerJson}
                                        className="copy_trade_json"
                                        loop={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='inner_body_section'>
                    <div className="container container80">
                        <h4 className='lnd_headings text-center'> Humb Copy Trading Guide</h4>
                        <div className='row'>
                            <div className='col-12 col-lg-9 col-xl-8 col-xxl-6 d-flex justify-content-center mx-auto'>
                                <p className='desc sub_desc text-center'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            </div>
                        </div>

                        <div className='card_lg mt-5 mx-auto' >
                            <div className='row'>
                                <div className='col-7'>
                                    <div className=''>
                                        <p className='card_lg_grad_text mt-3'>Humb</p>
                                        <p className='card_lg_text_lg'>Copy Trading</p>
                                        <p className='card_lg_text_gray mt-3'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>

                                        <div className='card_lg_button'>
                                            <button
                                                className='button_primary'
                                                onClick={handleShowBecomeTrader}
                                            >Become a Master Trader
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-5 d-flex justify-content-end'>
                                    <div className='card_lg_right d-flex flex-column justify-content-between'>
                                        <img src={Images.becomeTrader} className='card_lg_image' />
                                        <img src={Images.humbColor} className='card_lg_logo ms-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 traders_section'>
                            <h4 className='lnd_headings'>Spot Copy Trading</h4>
                            <p className='desc sub_desc'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</p>
                            <div className='traders_section_header mt-4'>
                                {/* <button>
                                    Top MasterTrader
                                </button> */}
                                {/* <button className='active'>
                                    All Traders
                                </button> */}
                            </div>

                            {/* old code - hide by hariharan - start */}

                            {/* <div className='traders_section_body mt-4'>
                                {
                                    !strategy && strategy.length > 0 ? strategy.map((value) => (
                                        <TraderCard value={value} />
                                    )) :
                                        <div>
                                            <NoData />
                                        </div>
                                }
                            </div> */}

                            {/* old code - hide by hariharan - end */}

                            {strategy && strategy.length > 0 ?
                                <div className='traders_section_body mt-4'>
                                    {strategy.map((value) => (
                                        <TraderCard value={value} />
                                    ))
                                    }
                                </div> :
                                <NoData />
                            }




                            {
                                allStrategy && allStrategy.length >= 10 && allStrategy.count > allStrategy.length &&
                                <div className='mt-5 d-flex justify-content-center'>
                                    <button className='grad_btn  px-4 fw_sm'>Load More</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </section >

            <Footer />
        </div >
    )
}

export default CopyTrade