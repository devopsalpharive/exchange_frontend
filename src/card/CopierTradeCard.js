import React, { useState } from 'react'
import { Images } from '../data/Images'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { setViewers } from '../actions/copyTradeAction';
import isEmpty from 'is-empty';
import { useSelector } from 'react-redux';
import fileObjectUrl from '../lib/fileObjectUrl';


const CopierTraderCard = (props) => {

    const { data } = props
    const { getUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [isShowDropDown, setIsShowDropDown] = useState(false)

    const strategyAge = (createdDate) => {
        try {

            let diffTime = Math.abs(new Date(createdDate).getTime() - new Date().getTime());
            let days = diffTime / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let secs = (minutes % 1) * 60;
            [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
            console.log(days + 'days', hours + 'h', minutes + 'm', secs + 's');
            var age = days == 0 ? `${hours} hours` : `${days} days ${hours} hours`
            return age
        } catch (e) {
            console.log('strategyAge_err', e)
        }
    }

    const UpdateViewuser = async (strategyId) => {
        try {
            if (!isEmpty(getUser)) {
                let { status, message } = await setViewers(strategyId)
                if (status) {
                    navigate(`/copy/profile/trader/${strategyId}`)
                }
            } else {
                navigate(`/copy/profile/trader/${strategyId}`)
            }

        } catch (err) {
            console.log(err, 'UpdateViewuser__err')
        }
    }

    return (
        <div className='trader_card'>
            <div className='trader_card_heads'>
                <div className='tc_head_left'>
                    <div className='tc_head_imagewrap'>
                        <img src={isEmpty(data?.profileImage) ? Images.profile : fileObjectUrl(data?.profileImage)} />
                    </div>
                    <div className='tc_head_details'>
                        <p className='name'>{data?.name}</p>
                        <p className='registered'>Registered {strategyAge(data?.createdAt)} ago</p>
                        {/* <div className='percentage_details mt-1'>
                            <p className='profit'>+47.36%</p> - ROI
                        </div> */}
                    </div>
                </div>

                {/* <div className='tc_head_right'>
                    <p>High Profit</p>
                </div> */}

                {/* section for trader dashboard card - start */}

                {/* <button className='tc_head_right_dropdown' onClick={() => setIsShowDropDown(!isShowDropDown)}>
                    <BsThreeDotsVertical />



                    <div className={`tc_head_right_dropdown_options ${isShowDropDown ? "d-block" : "d-none"}`}>
                        <ul>
                            <li>Follow</li>
                            <li>Options</li>
                        </ul>
                    </div>
                </button> */}

                {/* section for trader dashboard card - end */}
            </div>


            <div className='trader_card_body mt-3'>
                <div className='tc_value_details'>
                    <div className='tc_value_details_left'>
                        <p className='tc_value_details_left_bold'>${data?.totalPnl ? parseFloat(data?.totalPnl).toFixed(2) : 0}</p>
                        <p className='tc_value_details_left_lite'>Total PnL</p>
                    </div>
                    <div className='tc_value_details_right'>
                        <p className='tc_value_details_left_bold text-end'>{data?.roi ? parseFloat(data?.roi).toFixed(2) : 0} %</p>
                        <p className='tc_value_details_left_lite text-end'>ROI</p>
                    </div>
                </div>

                <div className='tc_value_details mt-4'>
                    <div className='tc_value_details_left'>
                        <p className='tc_value_details_left_bold'>${parseFloat(data?.totalAUM).toFixed(2)}</p>
                        <p className='tc_value_details_left_lite'>AUM</p>
                    </div>
                    <div className='tc_value_details_right'>
                        <p className='tc_value_details_left_bold text-end'>{data?.curCopier}</p>
                        <p className='tc_value_details_left_lite text-end' >Followers</p>
                    </div>
                </div>
            </div>

            <div className='trader_card_footer mt-4'>
                {/* <button className='linear_btn'>Follow</button> */}

                {/* section for trader dashboard card - start */}

                <div className='row w-100 mx-auto'>
                    <div className='col-sm-6 ps-0'>
                        <button
                            className='linear_btn'
                            onClick={() => {
                                UpdateViewuser(data.strategyId)
                            }}>
                            View Traders
                        </button>
                    </div>
                    <div className='col-sm-6  mt-3 mt-sm-0 pe-0'>
                        <button
                            className='border_button_orange_sm w-100'
                            onClick={() => {
                                navigate(`/copy/profile/copier/${data.strategyId}`)
                            }}>
                            View Copier
                        </button>
                    </div>
                </div>


                {/* section for trader dashboard card - end */}

            </div>
        </div >
    )
}

export default CopierTraderCard