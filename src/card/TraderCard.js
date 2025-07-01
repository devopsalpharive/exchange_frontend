import React, { useState } from 'react'
import { Images } from '../data/Images'
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
import isEmpty from 'is-empty';
import { setViewers } from '../actions/copyTradeAction';
import { useSelector } from "react-redux";
import fileObjectUrl from '../lib/fileObjectUrl';

const TraderCard = (props) => {
    const { value } = props
    const navigate = useNavigate();
    const [isShowDropDown, setIsShowDropDown] = useState(false)
    console.log("TraderCard_value", value);
    const { getUser } = useSelector((state) => (state.user))
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
            <div
                onClick={() => {
                    UpdateViewuser(value.strategyId)
                }}
            >
                <div className='trader_card_heads'>
                    <div className='tc_head_left'>
                        <div className='tc_head_imagewrap'>
                            <img src={
                                isEmpty(value?.profileImage) ?
                                    Images.profile : fileObjectUrl(value?.profileImage)} />
                        </div>
                        <div className='tc_head_details'>
                            <p className='name'>{value?.name}</p>
                            {/* <p className='registered'>Registered 142days ago</p> */}
                            <p className='registered'>Registered {strategyAge(value?.createdAt)} ago</p>
                            <div className='percentage_details mt-1'>
                                <p className={value?.roi > 0 ? 'profit' : 'loss'}>
                                    {value?.roi > 0 ? `+${value?.roi?.toFixed(2)}` : `${value?.roi?.toFixed(2)}`}
                                </p> - ROI
                            </div>
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
                            <p className='tc_value_details_left_bold'>$ {value?.totalPandL?.toFixed(2)}</p>
                            <p className='tc_value_details_left_lite'>Total PnL</p>
                        </div>
                        <div className='tc_value_details_right'>
                            <p className='tc_value_details_left_bold text-end'>$ {value?.copiersTotalPnl?.toFixed(2)}</p>
                            <p className='tc_value_details_left_lite text-end'>Copier's PnL</p>
                        </div>
                    </div>

                    <div className='tc_value_details mt-4'>
                        <div className='tc_value_details_left'>
                            <p className='tc_value_details_left_bold'>$ {value?.totalAUM?.toFixed(2)}</p>
                            <p className='tc_value_details_left_lite'>AUM</p>
                        </div>
                        <div className='tc_value_details_right'>
                            <p className='tc_value_details_left_bold text-end'>{value?.curCopier}</p>
                            <p className='tc_value_details_left_lite text-end' >Followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='trader_card_footer mt-4'>
                {
                    isEmpty(getUser) ?
                        <button className='linear_btn'
                            onClick={() => {
                                navigate("/login")
                            }}
                        >
                            Login
                        </button> :
                        isEmpty(value?.copier) ?
                            <button className='linear_btn' onClick={() => { navigate("/copingTrade", { state: { data: value } }) }}>Follow</button> :
                            <button className='linear_btn' onClick={() => { navigate(`/copy/profile/copier/${value.strategyId}`) }}>Following</button>
                }
            </div>
        </div >

    )
}

export default TraderCard