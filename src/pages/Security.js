import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { GiConfirmed } from 'react-icons/gi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IoWarningOutline } from 'react-icons/io5'
import { PiSealWarningFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "is-empty";
import { Disable2fa, Enable2fa, get2faCode, update2faType } from '../actions/userAction'
import { showToastMessage } from '../config/toast'
import { FaCheckCircle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { FaCopy } from 'react-icons/fa6'
import QRCode from "react-qr-code";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import OtpInput from 'react-otp-input';
import CopyToClipboard from 'react-copy-to-clipboard'
import Select from 'react-select'
import { validation } from '../validations/SecurityValidation'






export default function Security(props) {


  const authOptions = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'email', label: 'Email' },
    { value: 'googel2fa', label: 'Google' },
  ];

  const [type, setType] = useState("")
  const { getUser } = useSelector((state) => state.user);
  const [googleAuthVerify, setGoogleAuthVerify] = useState(false)
  const [passwordView, setPasswordView] = useState(false);
  const [code, setCode] = useState("");
  const [secretData, setSecretData] = useState({})
  const [checkValue, setcheckValue] = useState(false)
  const [error, setError] = useState({})
  const updateType = async (types) => {
    try {
      const update = await update2faType(types, getUser.secretKey);
      console.log("typetypetype_update", update);
      if (update.status) {
        setType(types);
        showToastMessage(update.message, 'success')
      } else {
        setType(type);
        showToastMessage(update.message, 'error')
      }
    } catch (e) {
      console.log("updateType_err", e);
    }
  }

  const handlePasswordView = () => {
    setPasswordView(!passwordView);
  };

  const fetch2fa = async () => {
    try {
      const { status, result } = await get2faCode(getUser.secretKey)
      if (status) {
        console.log(result, 'fetch2fa')
        setSecretData(result)
        if (result.twoFaStatus == 'enabled') {
          setGoogleAuthVerify(true)
        }
      }
    } catch (err) {
      console.log(err, 'fetch2fa__err')
    }
  }

  const enableTwoFa = async () => {
    // setLoader(true)

    let reqData = {
      "secret": secretData.secret,
      "uri": secretData.uri,
      "code": code,
      "checkValue": checkValue
    }
    let validationError = validation(reqData)
    if (!isEmpty(validationError)) {
      setError(validationError)
      // setLoader(false)
      return
    }

    try {
      const { status, error, message, result } = await Enable2fa(reqData, getUser.secretKey);
      // setLoader(loading)
      if (status) {
        showToastMessage(message, 'success')
        setCode('')
        setSecretData(result)
        setGoogleAuthVerify(true)
      } else {
        if (error) {
          setError(error)
        } else if (error) {
          showToastMessage(message, 'error')
        }
      }
    }
    catch (err) { }
  }

  const disableTwoFa = async () => {
    // setLoader(true)
    let reqData = {
      "secret": secretData.secret,
      "uri": secretData.uri,
      "code": code
    }
    let validationError = validation(reqData)
    if (!isEmpty(validationError)) {
      setError(validationError)
      // setLoader(false)
      return
    }

    try {
      const { status, error, message, result } = await Disable2fa(reqData, getUser.secretKey);
      // setLoader(loading)
      if (status) {
        showToastMessage(message, 'success',)
        setCode('')
        setSecretData(result)
        setGoogleAuthVerify(false)
      } else {
        if (error) {
          setValidateError(error)
        } else if (error) {
          showToastMessage(message, 'error')
        }
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    console.log(getUser, 'getUser?.userTheme')
    setType(getUser?.tfaType)
    if (!isEmpty(getUser)) {
      fetch2fa()
    }
  }, [getUser])

  return (
    <div>
      <Layout props={props}>
        <div className='security_page'>
          <div className='row'>

            {/* <div className='col-12 mb-3'>
              <div className='security_card d-flex align-items-center justify-content-between'>
                <p className='headname'>Security Checkup</p>
                <div className=' d-flex align-items-center gap-2'>
                  <IoIosCloseCircleOutline fill='#ff4629' fontSize={30} />
                  <GiConfirmed fill='#13b900' fontSize={30} />
                  <button className="grn_grd_btn">Check</button>
                </div>
              </div>
            </div> */}

            <div className='col-12 mb-3'>
              <div className='security_card'>
                <div className='d-flex align-items-center justify-content-between flex-wrap gap-2'>
                  <p className='headname'>Two-Factor Authentication (2FA)</p>
                  {/* <div className='d-flex align-items-center gap-2'>
                    <p>Email</p>
                    <div className="custom_toggle">
                      <label class="switch">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            console.log(e.target.checked, 'e.target.checked')
                            if (e.target.checked) {
                              console.log(e.target.checked, 'e.target.checked')
                              setType('mobile')
                              updateType({ type: "mobile" })
                            } else {
                              setType('email')
                              updateType({ type: "email" })
                            }
                          }}
                          checked={type && type == 'mobile' ? true : false}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <p>Phone Number</p>
                  </div> */}
                  <div className=" new_react_select min_widt_200 d-flex align-items-center gap-3">
                    {/* <Select
                      isSearchable={false}
                      placeholder="Type"
                      classNamePrefix="custom_rct_slt"
                      name="type"
                      options={authOptions}
                    /> */}
                    <p className='verify_desc'>Choose Authentication</p>
                    <Select
                      isSearchable={false}
                      placeholder="Select"
                      classNamePrefix="custom_rct_slt"
                      options={
                        getUser && getUser?.mobileNumber === "" || getUser?.mobileNumber === 0 ?
                          authOptions.filter((el) => el.value != "mobile")
                          : authOptions
                      }
                      onChange={(e) => { updateType({ type: e.value }) }}
                      value={
                        !isEmpty(type)
                          ? authOptions.find(
                            (val) => val.value == type
                          )
                          : ""
                      }
                    />
                  </div>

                </div>


                <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3 h-100'>
                  <PiSealWarningFill fill='#ff602e' fontSize={25} />
                  <p>To increase your account security, it is recommended that you enable 2FA.</p>

                </div>
                <div className='row mt-4'>
                  <div className='col-xl-6 mb-3'>
                    <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-between flex-column flex-sm-row h-100'>
                      <div>
                        <p className='secu_head mb-2'>Email
                          {
                            getUser && getUser.emailStatus == "verified" ?
                              <span className='statussecu  ms-2'> <GiConfirmed fill='#13b900' fontSize={15} className='me-2' />{type == 'email' ? 'On' : 'Off'} </span>
                              :
                              <span className='statussecu  ms-2'><IoIosCloseCircleOutline fill='#ff4629' fontSize={15} className='me-2' /></span>
                          }
                        </p>
                        <p className='secu_desc mb-0'>Use your email to protect your account and transactions.</p>

                      </div>
                      <div>
                        <Link to="/email-management" className="grn_grd_btn text-decoration-none">Manage</Link>

                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 mb-3'>
                    <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-between flex-column flex-sm-row h-100'>
                      <div>
                        <p className='secu_head mb-2'>Phone Number

                          {
                            getUser && getUser.mobileStatus == "verified" ?
                              <span className='statussecu  ms-2'> <GiConfirmed fill='#13b900' fontSize={15} className='me-2' />{type == 'mobile' ? 'On' : 'Off'} </span>
                              :
                              <span className='statussecu  ms-2'><IoIosCloseCircleOutline fill='#ff4629' fontSize={15} className='me-2' /></span>
                          }
                        </p>
                        <p className='secu_desc mb-0'>Use your phone number to protect your account and transactions.</p>
                      </div>
                      <div>
                        <Link to='/number-management' className="grn_grd_btn text-decoration-none">Manage</Link>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>
            <div className='col-12 mb-3'>
              <div className='security_card'>
                <p className='headname d-flex flex-wrap gap-1 align-items-center'>Google Authentication :
                  <span className={`d-flex align-items-center ${googleAuthVerify ? "google_verify" : "google_unverify"}`}>
                    {googleAuthVerify ?
                      <span className='d-flex align-items-center'>
                        <FaCheckCircle />Enabled
                      </span> :
                      <span className='d-flex align-items-center'>
                        <CgDanger />Disabled
                      </span>}
                  </span></p>
                {/* <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3'>
                  <PiSealWarningFill fill='#ff602e' fontSize={25} />
                  <p>To increase your account security, it is recommended that you enable 2FA.</p>

                </div> */}
                <div className='d-flex flex-wrap align-items-start gap-4 gap-md-5 mt-4'>
                  {/* <div className='col-xl-6 mb-3'>
                    <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-between flex-column flex-sm-row h-100'>
                      <div>
                        <p className='secu_head mb-2'>My Devices </p>
                        <p className='secu_desc mb-0'>Manage devices that have login status, and view your device history.</p>

                      </div>
                      <div>
                        <Link to='/managedevice' className="grn_grd_btn text-decoration-none">Manage</Link>

                      </div>
                    </div>
                  </div> */}
                  <div className=''>
                    <div className='qr_with_text'>
                      <div className="qr_code_wraper w-100">
                        {!isEmpty(secretData) ?
                          <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={secretData?.uri}
                            viewBox={`0 0 256 256`}
                          /> : ""}
                        {/* <img
                          src={secretData?.imageUrl}
                          alt="calender"
                          className="img-fluid"
                        // onClick={handleStartDateClick}
                        /> */}
                      </div>
                      <div className='qr_text_wrapper d-flex align-items-center justify-content-center'>Scan to get address</div>
                      {/* <p className='google_desc mb-1'>Write down 2FA code for withdraw crypto</p> */}
                      {/* <div className="d-flex align-items-center gap-2  mt-3">
                        <label class="checkbox_container">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setcheckValue(e.target.checked)
                            }}
                            checked={checkValue}
                          />
                          <span class="checkbox_checkmark"></span>
                        </label>
                        <p className="terms_p pt-1">
                          I Have Backed Up The Secret Code
                        </p>

                      </div>{" "} */}
                      {/* <button className=' google_btn mt-3'><FaCopy />Copy</button> */}

                    </div>
                  </div>
                  {/* <div className='col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mb-3'> */}
                  <div className='  mb-3'>

                    <div className='google_auth_form'>
                      <div className="d-flex flex-column ">
                        <label className="label ">Your 32 Digit Security Code</label>

                        <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                          <div className="row mx-auto h-100">
                            <div className="col-11 ps-0">
                              <div className="h-100">
                                <input
                                  type={"text"}
                                  name={'secret'}
                                  className="w-100"
                                  placeholder=''
                                  value={secretData?.secret}
                                />
                              </div>
                            </div>
                            <div className="col-1 pe-0 d-flex align-items-center justify-content-end">
                              <button
                                type="button"
                                className="border-0 outline-0 bg-transparent"
                                onClick={() => handlePasswordView()}
                              >
                                <CopyToClipboard
                                  text={secretData?.secret}
                                  onCopy={() => showToastMessage("The secret code has been copied !", "success")}
                                >
                                  <FaCopy />
                                </CopyToClipboard>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column mt-3">
                        <label className="label">Enter 6 Digit Google Authentication Code</label>

                        <div className="custom_otp_input google_otp  mt-4">
                          <OtpInput
                            shouldAutoFocus={true}
                            value={code}
                            onChange={(e) => { setCode(e) }}
                            numInputs={6}
                            // renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                          />
                        </div>
                        <p className=" error_text mt-2">{error?.code}</p>
                      </div>
                      <div className="d-flex align-items-center gap-2  mt-3">
                        <label class="checkbox_container">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setcheckValue(e.target.checked)
                            }}
                            checked={checkValue}
                          />
                          <span class="checkbox_checkmark"></span>
                        </label>
                        <p className="terms_p pt-1">
                          I Have Backed Up The Secret Code
                        </p>
                      </div>{" "}
                      <p className=" error_text mt-2">{error?.checkValue}</p>
                      {secretData.twoFaStatus == 'enabled' ?
                        <button
                          className='grn_grd_btn mt-3'
                          onClick={() => {
                            disableTwoFa()
                          }}
                        >
                          Disable
                        </button> :
                        <button
                          className='grn_grd_btn mt-3'
                          onClick={() => {
                            enableTwoFa()
                          }}
                        >
                          Enable
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 mb-3'>
              <div className='security_card'>
                <p className='headname'>Devices and Activities</p>
                {/* <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3'>
                  <PiSealWarningFill fill='#ff602e' fontSize={25} />
                  <p>To increase your account security, it is recommended that you enable 2FA.</p>

                </div> */}
                <div className='row mt-4'>
                  {/* <div className='col-xl-6 mb-3'>
                    <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-between flex-column flex-sm-row h-100'>
                      <div>
                        <p className='secu_head mb-2'>My Devices </p>
                        <p className='secu_desc mb-0'>Manage devices that have login status, and view your device history.</p>

                      </div>
                      <div>
                        <Link to='/managedevice' className="grn_grd_btn text-decoration-none">Manage</Link>

                      </div>
                    </div>
                  </div> */}
                  <div className='col-xl-6 mb-3'>
                    <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-between flex-column flex-sm-row h-100'>
                      <div>
                        <p className='secu_head text-center text-sm-start'>Account Activity</p>
                        <p className='secu_desc mb-0 mt-3'>Last login: {getUser && new Date(getUser?.loginHistory?.createdDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <div className='mb-3 d-flex justify-content-center justify-content-sm-end'>
                          <Link to='/manageactivity' className="grn_grd_btn text-decoration-none">More</Link>
                        </div>
                        <p className='secu_desc mb-0 '>Check Suspicious Account Activity</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            </div>
          </div>

        </div>

      </Layout >


    </div >
  )
}
