import React, { useEffect, useState } from 'react'
import Header from '../../Layout/Header'
import Lottie from "lottie-react";
import bannerJson from "../../asset/json/traderdashboard.json";
import { Images } from '../../data/Images';
import TraderCard from '../../card/TraderCard';
import BecomeTrader from '../../modal/BecomeTrader';
import Footer from '../../Layout/Footer';
import ProfileDetails from '../../components/ProfileDetails';
import CopierTraderCard from '../../card/CopierTradeCard';
import { getCopierTrades } from '../../actions/copyTradeAction';
import { useSelector } from 'react-redux';
import isEmpty from 'is-empty';


const TraderDashboard = (props) => {

    const [records, setRecords] = useState([])
    const { getUser } = useSelector((state) => state.user);
    // const [showBecomeTrader, setShowBecomeTrader] = useState(false)


    // const handleShowBecomeTrader = () => {
    //     setShowBecomeTrader(true)
    // }

    // const handleCloseBecomeTrader = () => {
    //     setShowBecomeTrader(false)
    // }

    const fetchCopierTraders = async () => {
        try {
            const { data, status, message } = await getCopierTrades({ skip: records.length, limit: 10 }, getUser.secretKey);
            if (status) {
                setRecords(data)
            }
        } catch (e) {
            console.log("fetchCopierTraders_err", e);
        }
    }
    useEffect(() => {
        if (!isEmpty(getUser)) {
            fetchCopierTraders()
        }

    }, [getUser])

    return (
        <div>

            {/* modal import - start */}

            {/* <BecomeTrader
                show={showBecomeTrader}
                handleClose={handleCloseBecomeTrader} /> */}

            {/* modal import -end */}

            <Header props={props} />
            <section className="custom_section">
                <div className="cover_banner_w100">
                    <div className="container container80">
                        <div className='row d-flex flex-column-reverse flex-lg-row'>
                            <div className='col-12 col-lg-6 d-flex align-items-center'>
                                <div className='banner_left '>
                                    <h3 className='title launch_title'>
                                        Trader Dashboard
                                    </h3>
                                    <p className='desc pt-3 pb-4' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </p>
                                    {/* <div className='d-flex flex-wrap align-items-center gap-3 mb-5 mb-lg-0'>
                                        <button className='button_primary'>
                                            Go to Trader Dashboard
                                        </button>
                                    </div> */}
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
                        <h4 className='lnd_headings'> My Trading Dashboard</h4>
                        <div className='row'>
                            <div className='col-12 col-lg-9 '>
                                <p className='desc sub_desc'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            </div>
                        </div>

                        <div className='mt-5'>

                        </div>



                        <div className='mt-5 traders_section'>
                            <ProfileDetails data={records} copyType="copier" page='copydash' />

                            <div className='traders_section_body mt-5'>
                                {records && records?.strategyData?.length > 0 ?
                                    records?.strategyData.map((value) => (
                                        <CopierTraderCard data={value} />
                                    )) :
                                    <p>No data found</p>
                                }
                            </div>

                            {
                                records && records.strategyData >= 10 && records.count > records.strategyData.length &&
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

export default TraderDashboard