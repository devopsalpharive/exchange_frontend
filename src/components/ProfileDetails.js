import React from 'react'
import { Images } from '../data/Images'
import { useNavigate, useParams } from "react-router-dom";
import isEmpty from 'is-empty';
import { useSelector } from "react-redux";
import { updatecopiedStrategy } from '../actions/copyTradeAction';
import { showToastMessage } from '../config/toast';
import fileObjectUrl from '../lib/fileObjectUrl';

const ProfileDetails = (props) => {
    const navigate = useNavigate();
    const { type } = useParams()
    const { data, copyType, Refetch, isCopier, page } = props
    const { getUser } = useSelector((state) => state.user);

    // console.log("ProfileDetails_data_uiiiiiiiiiiii", data, isCopier, props);

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

    const unFollowStrategy = async () => {
        try {
            console.log("unFollowStrategy_unFollowStrategy", data._id);
            if (isEmpty(data._id)) {
                showToastMessage("Copy id must be required.", "success");
                return false
            }
            const { status, message, errors } = await updatecopiedStrategy({
                _id: data._id,
                status: data.status == 'active' ? "inactive" : "active"
            }, getUser.secretKey);
            if (status) {
                showToastMessage(message, "success")
                Refetch()
            } else {
                showToastMessage(message, "error")
            }
        } catch (e) {
            console.log("unFollowStrategy_err", e);
        }
    }

    // console.log("datadatargxfgfdfddatadatadatadata", data);
    return (
        <div className='prof_dtls_card'>
            <div className='pdc_left'>
                <div className='pdc_profile_wraper'>
                    <img
                        src={
                            copyType == "copier" ?
                                isEmpty(getUser?.profileImage) ?
                                    Images.profile : getUser?.profileImage :
                                isEmpty(data?.profileImage) ?
                                    Images.profile : fileObjectUrl(data?.profileImage)}
                        alt='profile' />
                </div>
                <div className='pdc_name_details'>
                    <h5 className='pdc_name_details_h5'>{
                        copyType == "copier" ? `${getUser?.firstName} ${getUser?.lastName}`
                            :
                            data?.name

                    }</h5>
                    {
                        page == "dash" &&
                        <p className='pdc_name_details_register'>Registered {strategyAge(data?.createdAt)} ago</p>
                    }
                    <p className='pdc_ro_value mt-1'>
                        <span className={data?.roi > 0 ? 'profit' : 'loss'}>
                            {data?.roi ? data?.roi > 0 ? `+${data?.roi.toFixed(2)} %` : `${data?.roi.toFixed(2)} %` : 0.00}
                        </span>
                        - ROI</p>
                    {/* 
                    <div className='pdc_labels_container mt-3'>
                        <div className='pdc_labels'>Stable</div>
                        <div className='pdc_labels'>Long Term Trader</div>
                        <div className='pdc_labels'>High Profit</div>
                    </div> */}
                </div>
            </div>

            <div className='pdc_right'>
                {
                    !isEmpty(type) && type == 'copier' && data.status == 'active' ?
                        <button
                            className='linear_button_lg'
                            onClick={() => {
                                unFollowStrategy()
                            }}
                        >
                            UnFollow
                        </button> :
                        !isEmpty(type) && type == 'trader' && isCopier ?
                            <button
                                className='linear_button_lg'
                                onClick={() => {
                                    navigate(`/copy/profile/copier/${data.strategyId}`)
                                }}
                            >
                                Following
                            </button> :
                            !isEmpty(type) && ((type == 'copier' && data.status == 'inactive') || (type == 'trader' && data?.userId != getUser?.userId)) ?
                                <button
                                    className='linear_button_lg'
                                    onClick={() => {
                                        if (type == 'copier') {
                                            unFollowStrategy()
                                        } else if (type == 'trader') {
                                            navigate("/copingTrade", { state: { data: data } })
                                        }
                                    }}>
                                    Follow
                                </button> : ""
                }


                {/* this button for following - start */}

                {/* <button className='border_button_orange'>Following</button> */}

                {/* this button for following - end */}


                {/* this label for total pnl - start */}

                {
                    page == "copydash" &&
                    <div className='total_pnl_value'>
                        <p className='value'>{data?.totalPandL}</p>
                        <p className='label '>Total PnL</p>
                    </div>
                }


                {/* this label for total pnl - end */}
            </div>
        </div >
    )
}

export default ProfileDetails