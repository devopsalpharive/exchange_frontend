import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import QRCode from "react-qr-code";
import CopyToClipboard from 'react-copy-to-clipboard'
import { showToastMessage } from '../lib/toast';
import isEmpty from 'is-empty';
import { EditApikey } from "../actions/ApikeyAction";
import OtpModal from '../modal/OtpModal'

import { Images } from "../data/Images";
const initalFormvalue = {
    status: "Inactive",
    reading: false,
    withdraw: false,
    spotAndmargin: false,
    derivativesAndfutures: false,
    ipRestriction: false,
    ipList: [],
    id: ''
}

const ApikeyList = (props) => {
    const { val, index } = props
    const [isApiEdited, setIsApiEdited] = useState(false);
    const [ip, setIp] = useState('')
    const [formValue, setFormvalue] = useState(initalFormvalue)
    const [errors, setErrors] = useState({})
    const [showOtp, setShowOtp] = useState(false)
    const [isResubmit, setIsResubmit] = useState(false);

    const handleCheck = (e) => {
        try {
            const { checked, name } = e.target
            setFormvalue((pervRecord) => {
                return { ...pervRecord, [name]: checked }
            })
        } catch (err) {
            console.log(err, 'handleCheck__err')
        }
    }
    const handleSave = async (otp) => {
        try {
            let reqData = { ...formValue, ['otp']: otp }
            const { success, status, result, message, error } = await EditApikey(reqData)
            if (success) {
                if (status == "OTP") {
                    showToastMessage(message, "success");
                    setShowOtp(true)
                } else {
                    showToastMessage(message, "success");
                    setFormvalue(result)
                    setIsApiEdited(false)
                    setShowOtp(false);
                    setIsResubmit(false)
                    return true
                }
            } else if (!success) {
                if (error.otp == "OTP is Expired") {
                    setIsResubmit(true)
                }
                setErrors(error)
                if (!isEmpty(message)) {
                    showToastMessage(message, "error");
                }
                return false
            }
        } catch (err) {
            console.log(err, 'handleSave__err')
        }
    }
    useEffect(() => {
        if (!isEmpty(val)) {
            setFormvalue((perRecord) => {
                return {
                    status: val.status,
                    reading: val.reading,
                    withdraw: val.withdraw,
                    spotAndmargin: val.spotAndmargin,
                    derivativesAndfutures: val.derivativesAndfutures,
                    ipRestriction: val.ipRestriction,
                    ipList: val.ipList,
                    id: val._id
                }
            })
        }
    }, [val])

    console.log(formValue, 'ApikeyList')
    return (
        <>
            <div className='col-12 mb-3'>
                <div className='empty_apicard '>
                    <div className='api_manage'>
                        <div className='api_manage-header d-flex align-items-center gap-4 justify-content-between'>
                            <div className='api_manage-heading'>{val.name}</div>
                            <div className='api_manage-header--right'>
                                {isApiEdited ?
                                    <div className='buttons d-flex align-items-center gap-3'>
                                        <button className='grn_grd_btn text-decoration-none' onClick={() => { handleSave(undefined) }}>Save</button>
                                        <button className='grn_grd_btn text-decoration-none' onClick={() => setIsApiEdited(false)}>Cancel</button>
                                    </div> :
                                    <button className='grn_grd_btn text-decoration-none' onClick={() => setIsApiEdited(true)}>Edit</button>
                                }

                            </div>
                        </div>
                        <div className='api_manage-body d-flex flex-wrap flex-xl-nowrap gap-5 mt-4'>
                            <div className='qr_with_text mx-auto me-xl-auto'>
                                {!isEmpty(val.secretKey) ?
                                    <>
                                        <div className="qr_code_wraper " >
                                            <QRCode
                                                size={256}
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                value={`{ apikey: ${val.apiKey}, secretKey: ${val.secretKey} }`}
                                                viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                        <div className='qr_text_wrapper d-flex align-items-center justify-content-center'>Scan to get address</div>
                                    </>

                                    :
                                    <div className="qr_code_wraper " >
                                        <img src={Images.qrcode_placeholder} />
                                    </div>
                                }


                            </div>
                            <div className='api_manage-body-content'>
                                <div>
                                    <p className='api_manage-body-label'>API Key</p>
                                    <div className='d-flex align-items-end gap-3'>
                                        <p className='api_manage-body-value mt-1'>{val.apiKey}</p>
                                        <CopyToClipboard
                                            text={val.apiKey}
                                            onCopy={() => { showToastMessage("Api key copied !", "success") }}
                                        >
                                            <button className='api__manage-button--copy'>
                                                Copy
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <p className='api_manage-body-label'>Secret Key</p>
                                    <p className='api_manage-body-value mt-1'>{isEmpty(val?.secretKey) ? "********" : val?.secretKey}</p>
                                </div>
                                <div className='mt-3'>
                                    <p className='api_manage-body-label'>API restrictions</p>
                                    <div className='row mt-3'>
                                        <div className='col-12 col-sm-6 col-md-4 mb-3 mb-sm-0'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container" >
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                        checked={formValue?.reading}
                                                        name='reading'
                                                        onChange={(e) => {
                                                            handleCheck(e)
                                                        }}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable Reading
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-6 col-md-4 mb-3 mb-md-0'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                        checked={formValue?.spotAndmargin}
                                                        name='spotAndmargin'
                                                        onChange={(e) => {
                                                            handleCheck(e)
                                                        }}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable Spot & Margin Trading
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-6 col-md-4 '>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                        checked={formValue?.derivativesAndfutures}
                                                        name='derivativesAndfutures'
                                                        onChange={(e) => {
                                                            handleCheck(e)
                                                        }}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable Derivatives & Futures Trading
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        {/* <div className='col-12 col-sm-6 col-md-4 mb-3 mb-sm-0'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable Futures
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-6 col-md-4 mb-3 mb-md-0'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Permits Universal Transfer
                                                </p>
                                            </div>
                                        </div> */}
                                        <div className='col-12 col-sm-6 col-md-4'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                        checked={formValue?.withdraw}
                                                        name='withdraw'
                                                        onChange={(e) => {
                                                            handleCheck(e)
                                                        }}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable withdrawal
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='row mt-3'>
                                        <div className='col-12 col-sm-6 col-md-4 mb-3 mb-sm-0'>
                                            <div className={`${!isApiEdited ? "opactiy_80" : ""} d-flex align-items-start gap-2 `}>
                                                <label class="checkbox_container">
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isApiEdited}
                                                    />
                                                    <span class="checkbox_checkmark"></span>
                                                </label>
                                                <p className="terms_p">
                                                    Enable Symbol Whitelist
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='mt-3'>
                                    <p className='api_manage-body-label'>IP Access restrictions</p>
                                    <div className='row mt-3'>
                                        <div className={`col-12 col-xl-10 col-xxl-8`}>
                                            <div
                                                className={`${!isApiEdited ? "opactiy_80" : ""} custom-control custom-radio mb-2 d-flex align-items-center`}
                                                onClick={() => {
                                                    if (!isApiEdited) {
                                                        return
                                                    }
                                                    setFormvalue((pervRecord) => {
                                                        return { ...pervRecord, 'ipRestriction': false, 'ipList': [] }
                                                    })
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    // id={`customRadio${index}3`}
                                                    // name={`customRadio${index}`}
                                                    disabled={!isApiEdited}
                                                    key={`customRadio${index}3`}
                                                    className={`${!isApiEdited ? "opactiy_80" : ""} custom_api_radio custom-control-input d-none`}
                                                    value={'false'}
                                                    checked={'false' == formValue?.ipRestriction.toString()}
                                                />
                                                <label
                                                    className={`${!isApiEdited ? "opactiy_80" : ""} custom-control-label custom_radio_label`}
                                                    for="customRadio3"
                                                >
                                                    Unrestricted (Less secure) <span>
                                                        This API Key allows access from any IP Address.This is not recommended.To protect the safety of your funds, if the IP is unrestricted and any permission other than Reading is enabled, this API Key will be deleted.
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-12 col-xl-10 col-xxl-8'>
                                            <div
                                                className={`${!isApiEdited ? "opactiy_80" : ""} custom-control custom-radio mb-2 d-flex align-items-center`}
                                                onClick={() => {
                                                    if (!isApiEdited) {
                                                        return
                                                    }
                                                    setFormvalue((pervRecord) => {
                                                        return { ...pervRecord, 'ipRestriction': true }
                                                    })
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    // id={`customRadio${index}4`}
                                                    key={`customRadio${index}4`}
                                                    disabled={!isApiEdited}
                                                    // name={`customRadio${index}`}
                                                    className={`${!isApiEdited ? "opactiy_80" : ""} custom_api_radio custom-control-input d-none`}
                                                    value={'true'}
                                                    checked={'true' == formValue?.ipRestriction.toString()}
                                                />
                                                <label
                                                    className={`${!isApiEdited ? "opactiy_80" : ""} custom-control-label custom_radio_label`}
                                                    for="customRadio4"
                                                >
                                                    Restrict access to trusted IP's only (Recommended)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {formValue?.ipRestriction ?
                                    <div className='row'>
                                        <div className='col-12 col-xl-10 col-xxl-8'>
                                            <div className='api_manage-ip-values'>
                                                {formValue.ipList && formValue.ipList.length > 0 ? formValue.ipList.map((value, i) => {
                                                    return (
                                                        <div className={`${!isApiEdited ? "opacity_80" : ""} api_manage-single-ip`}>
                                                            <p>{value}</p>
                                                            <button
                                                                disabled={!isApiEdited}
                                                                onClick={() => {
                                                                    setFormvalue((pervRecord) => {
                                                                        let ipList = pervRecord.ipList
                                                                        ipList.splice(i, 1)
                                                                        console.log({ ...pervRecord, 'ipList': ipList }, 'setFormvalue')
                                                                        return { ...pervRecord, 'ipList': ipList }
                                                                    })
                                                                }}>
                                                                <IoClose />
                                                            </button>
                                                        </div>
                                                    )
                                                }) : ""}
                                            </div>
                                        </div>
                                        {isApiEdited ? <div className='col-12 col-xl-10 col-xxl-8 mt-3'>
                                            <div className='api_manage-ip-input'>
                                                <input
                                                    disabled={!isApiEdited}
                                                    placeholder='When entering more than one IP Address, please separate them with spaces.'
                                                    onChange={(e) => {
                                                        setErrors({})
                                                        setIp(e.target.value)
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        let IpRegx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                                                        let error = { ...errors }
                                                        let findIndex = formValue?.ipList?.findIndex((val) => (val == ip))
                                                        if (isEmpty(ip)) {
                                                            error['ip'] = 'Please enter trusted IP addresses.'
                                                            setErrors(error)
                                                            return false
                                                        }
                                                        if (!IpRegx.test(ip)) {
                                                            error['ip'] = 'Invalid ip'
                                                            setErrors(error)
                                                            return false
                                                        }
                                                        if (findIndex != -1) {
                                                            error['ip'] = 'Ip address already exists'
                                                            setErrors(error)
                                                            return false
                                                        }
                                                        setFormvalue((pervRecord) => {
                                                            let ipList = pervRecord.ipList
                                                            ipList.push(ip)
                                                            console.log({ ...pervRecord, 'ipList': ipList }, 'setFormvalue')
                                                            return { ...pervRecord, 'ipList': ipList }
                                                        })
                                                        setIp('')
                                                    }}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                            <span className="text-danger mt-2">{errors?.ip}</span>
                                        </div> : ''}
                                    </div> :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OtpModal
                show={showOtp}
                handleClose={() => { setShowOtp(false); setIsResubmit(false) }}
                resendOtp={() => { handleSave(undefined) }}
                handleConfirm={(otp) => { return handleSave(otp) }}
                isResubmit={isResubmit}
                setIsResubmit={() => { setIsResubmit(false) }}
                errors={errors}
            />
        </>
    )
}

export default ApikeyList