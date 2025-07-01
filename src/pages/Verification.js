import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../data/Images";
import SelectWithContent from "../components/SelectWithContent";
import { data } from "../data/data";
import { LuUpload } from "react-icons/lu";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import IndividualModal from "../modal/IndividualModal";
import DatePicker from "../components/Datepicker";
import countryList from "react-select-country-list";
import Form from "react-bootstrap/Form";
import { TbProgressAlert } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoReloadOutline } from "react-icons/io5";
import { IoReloadCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Synaps } from "@synaps-io/verify-sdk";

/** Config */
import { showToastMessage } from "../config/toast";

/** Actions */
import {
  SetApplicantIdaction,
  getAccessToken,
  userData,
  userKyc,
  userKycRatelimit,
  userKycSubmit,
  usergenerateUserSessionId,
} from "../actions/userAction";
import { isEmpty } from "../lib/isEmpty";
import VerificationModal from "../modal/VerificationModal";
import { createApplicant } from "../actions/SumsubAction";

const options1 = [
  { value: "Employee", label: "Employee" },
  { value: "Retiree", label: "Retiree" },
  {
    value: "Partner/shareholder/director",
    label: "Partner/shareholder/director",
  },
  { value: "Independent Professional", label: "Independent Professional" },
  { value: "Self-employed ", label: "Self-employed" },
  { value: "Student", label: "Student" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Homemaker", label: "Homemaker" },
  { value: "Other", label: "Other" },
];

const codeOptions = [
  // { value: 'panccard', label: 'Pan Card' },
  // { value: 'aadhar', label: 'Aadhar' },
  // { value: 'drivingLicence', label: 'Driving Licence' }
  { value: "Address proof", label: "Address proof" },
  { value: "Id proof", label: "Id proof" },
  // { value: 'drivingLicence', label: 'Driving Licence' }
];
let newWindow = window

const Verification = (props) => {
  const navigate = useNavigate();
  const { getUser } = useSelector((state) => state.user);
  const countryOptions = useMemo(() => countryList().getData(), []);
  // const numbers = /^[+]?([0-9]+(?:[0-9]*)?|\[0-9]+)$/;
  const numbers = /^-?(?:\d+(\.\d*)?|\.\d+)$/;
  const alfaRegex = /^[a-zA-Z0-9]*$/;

  const dobDateRef = useRef(null);
  const [dobDateOpen, setDobDateOpen] = useState(false);
  const registrationDateRef = useRef(null);
  const [registrationDateOpen, setRegistrationDateOpen] = useState(false);
  const [registrationDate, setRegistrationDate] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [currentSteps, setCurrentSteps] = useState(2);
  const [showIndividual, setShowIndividual] = useState(false);
  const [type, setType] = useState("individual"); // individual || corporate
  const [sessionId, setSessionId] = useState("");
  const [activeVerification, setActiveVerification] = useState(1);
  const [dob, setDob] = useState("");

  //dev murugavel
  const [individualverify, setIndividualverify] = useState({});
  const [entityverify, setEntityvefify] = useState({});
  const [individualerror, setIndividualerror] = useState({});
  const [entityerror, setEntityerror] = useState({});

  const [individualCheck, setIndividualCheck] = useState(false);
  const [entityCheck, setEntityCheck] = useState(false);

  const [conditionCheck, setconditionCheck] = useState(false);
  const [error, setError] = useState({});

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [check9, setCheck9] = useState(false);
  const [check10, setCheck10] = useState(false);
  const [check11, setCheck11] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [accessToken, setAccessToken] = useState("_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC05ZmNhYjU4Ni0yODA1LTQxZjEtODFmZC1jZDlhN2FmZDg0Y2QtdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2");

  const [show, setShow] = useState(false);
  const [typeOfKYC, setTypeOfKYC] = useState(true);

  // useEffect(() => {
  //   // Prevent multiple initializations with react strict mode
  //   // https://react.dev/learn/synchronizing-with-effects#fetching-data
  //   let init = true;

  //   Synaps.init({
  //     sessionId: sessionId,
  //     service: type,
  //     onFinish: () => {
  //       // handleClose();
  //       // alter("Hiiii");
  //       handleCloseIndividual();
  //     },
  //     onClose: () => {
  //       // alter("Hiiii");
  //       handleCloseIndividual();
  //     },
  //     mode: "modal",
  //   });
  //   return () => {
  //     init = false;
  //   };
  // }, [sessionId, type]);

  //   const handleOpen = () => {
  //     Synaps.show();
  //   };

  // useEffect(() => {
  //   if (show) {
  //     Synaps.show();
  //     //   handleClose();
  //   }
  // }, [show]);

  const handleDobDateClick = () => {
    if (!dobDateOpen) {
      // dobDateRef.current.input.click();
      setDobDateOpen(true);
    } else {
      setDobDateOpen(false);
    }
  };
  const handleRegistrationDateClick = () => {
    if (!registrationDateOpen) {
      registrationDateRef.current.input.click();
      setRegistrationDateOpen(true);
    } else {
      setRegistrationDateOpen(false);
    }
  };

  const handleShowIndividual = () => {
    console.log(
      "vadadfasdfadfadfasdfadsf",
      getUser?.kycLimit == 3 && getUser?.kycUpateTime > new Date().getTime(),
      getUser?.kycLimit
    );
    if (
      getUser &&
      getUser?.kycLimit == 3 &&
      getUser?.kycUpateTime > new Date().getTime()
    ) {
      showToastMessage("Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
    } else {
      setShowIndividual(true);
      // setShow(true);
      userKycRatelimit();
    }
  };
  const handleCloseIndividual = () => {
    // setShow(false);
    setShowIndividual(false);
  };

  const handleShowVerificationModal = () => {
    setShowVerificationModal(true);
  };
  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const getSessionId = async (type) => {
    try {
      const sessionId = await usergenerateUserSessionId(type);
      console.log("getSessionId_sessionId", sessionId);
      if (sessionId.status) {
        setSessionId(sessionId.data.synapsSessionId);
        return sessionId.data.synapsSessionId
        // handleShowIndividual();
      }
    } catch (e) {
      console.log("getSessionId_err", e);
    }
  };

  const Handleindivirtualverification = async () => {
    try {
      setIsLoading(true);
      const payload = {
        type: "individual",
        firstname: individualverify.firstname,
        lastname: individualverify.lastname,
        personalidentifercode: individualverify.personalidentifercode,
        personalIdentiferOccupation: individualverify.personalIdentiferOccupation,
        dob: individualverify.dob,
        address: individualverify.address,
        city: individualverify.city,
        country: individualverify.country,
        residenceaddress: individualverify.residenceaddress,
        residencecity: individualverify.residencecity,
        residencecountry: individualverify.residencecountry,
        occupation: individualverify.occupation,
        sourceoffunds: individualverify.sourceoffunds,
        monthlyincome: individualverify.monthlyincome,
        businessrelationship: individualverify.businessrelationship,
        volumeoftrade: individualverify.volumeoftrade,
        birthplace: individualverify.birthplace,
        individualCheck: individualCheck,
        check1: check1,
        check2: check2,
        check3: check3,
        check4: check4,
        check5: check5,
        check6: check6,
        check7: check7,
      };
      const individualKyc = await userKyc(payload);
      if (individualKyc.status) {
        setStatus("pending");
        setIsLoading(false);
        showToastMessage(individualKyc.message, "success");
      } else {
        setIsLoading(false);
        console.log("individualKyc.error.errors", individualKyc.errors);
        setIndividualerror(individualKyc.errors);
        individualKyc.message &&
          showToastMessage(individualKyc.message, "error");
      }
    } catch (e) {
      setIsLoading(false);
      console.log("Handleindivirtualverification_err", e);
    }
  };

  const Handleentityverification = async () => {
    try {
      setIsLoading(true);

      const payload = {
        type: "entity",
        companyname: entityverify.companyname,
        regno: entityverify.regno,
        regdate: entityverify.regdate,
        jurisdiction: entityverify.jurisdiction,
        headquateraddress: entityverify.headquateraddress,
        businesstype: entityverify.businesstype,
        fullname: entityverify.fullname,
        personalidnumber: entityverify.personalidnumber,
        address: entityverify.address,
        city: entityverify.city,
        country: entityverify.country,
        sourceoffunds: entityverify.sourceoffunds,
        annualturnover: entityverify.annualturnover,
        businessrelationship: entityverify.businessrelationship,
        volumeoftrade: entityverify.volumeoftrade,
        partnername: entityverify.partnername,
        partnercountry: entityverify.partnercountry,
        businessactivity: entityverify.businessactivity,
        entityCheck: entityCheck,
        check1: check1,
        check2: check2,
        check3: check3,
        check4: check4,
        check5: check5,
        check6: check6,
        check7: check7,
        check8: check8,
        check9: check9,
        check10: check10,
        check11: check11,
      };
      const entityverifyKyc = await userKyc(payload);
      if (entityverifyKyc.status) {
        setIsLoading(false);
        setStatus("pending");
        showToastMessage(entityverifyKyc.message, "success");
      } else {
        setIsLoading(false);
        console.log("individualKyc.error.errors", entityverifyKyc.errors);
        setEntityerror(entityverifyKyc.errors);
        entityverifyKyc.message &&
          showToastMessage(entityverifyKyc.message, "error");
      }
    } catch (e) {
      setIsLoading(false);
      console.log("Handleentityverification_err", e);
    }
  };

  const handleSynapysCheck = (event, type) => {
    try {
      console.log("handleSynapysCheck_data", event);
      if (type == "individual") {
        setIndividualCheck(event);
      } else {
        setEntityCheck(true);
      }
      setShowIndividual(event);
    } catch (e) {
      console.log("handleSynapysCheck_err", e);
    }
  };

  // Check periodically if the window is closed
  const checkWindowClosed = () => {
    setTimeout(() => {
      if (newWindow?.closed) {
        // clearInterval(checkWindowClosed);
        console.log('The new window has been closed.', newWindow?.closed);
        // You can add any additional logic here
        userData()
      } else {
        checkWindowClosed()
      }
    }, 1000);
  } // Check every second

  // useEffect(() => {
  //   console.log("getUser.synapsType", getUser);
  //   if (!isEmpty(getUser)) {
  //     if (!isEmpty(getUser.synapsType)) {
  //       getSessionId(getUser.synapsType);
  //     } else {
  //       getSessionId("individual");
  //     }
  //   }
  // }, [getUser]);

  const createSumsubAppicant = async () => {
    try {
      userKycRatelimit();
      const { status, message, result } = await createApplicant({ kycType: type });
      console.log("createSumsubAppicant_result", result);
      if (status) {
        setAccessToken(result?.token)
        setShowIndividual(true)
      }
    } catch (e) {
      console.log("createAppicant_err", e);
    }
  }

  const createAccessToken = async () => {
    try {
      userKycRatelimit();
      let { result, status } = await getAccessToken()
      console.log(result, "createAccessToken")
      if (status) {
        // this.setState({ accessToken: token })
        setAccessToken(result)
        return status
      }
    } catch (err) {
      console.log(err, "createAccessToken___err")
    }
  }

  useEffect(() => {
    checkWindowClosed()
  }, [newWindow])


  return (
    <Layout props={props}>
      {/* start of modal import */}
      {
        showIndividual &&
        <IndividualModal
          show={showIndividual}
          handleClose={handleCloseIndividual}
          type={type == "individual" ? type : "corporate"}
          id={sessionId && sessionId}
          accessToken={accessToken}
        />
      }


      <VerificationModal
        show={showVerificationModal}
        handleClose={handleCloseVerificationModal}
      />
      {/* end of modal import  */}
      <div>
        {/* {currentSteps === 1 && ( */}
        <div className="wallet_section">
          <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
            <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="wp_img_wrpr">
                <img
                  src={
                    getUser?.profileImage == ""
                      ? Images.profile
                      : getUser?.profileImage
                  }
                  alt="profile"
                  className="img_fit_container"
                />
              </div>
              <div className="">
                <div className="d-flex align-items-center gap-3 mb-2 ">
                  <p className="wp_gmail ">{getUser?.email}</p>
                  <button
                    className="border-0 outline-0 bg-transparent"
                    onClick={() => {
                      navigate("/myprofile");
                    }}>
                    <img
                      src={Images.gmailedit}
                      alt="edit"
                      className="img-fluid wp_gmail_edit"
                    />
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3  ">
                  <p className="lnd_grad_txt">UID : {getUser?.userId}</p>
                </div>
              </div>
            </div>

            <div className="wp_right mt-4 mt-sm-0">
              {/* <button
                className={
                  getUser?.kycStatus == "verified" ? "success_btn" : "red_btn"
                }>
                {getUser?.kycStatus == "notVerified"
                  ? "NOT VERIFIED"
                  : getUser?.kycStatus?.toUpperCase()}
              </button> */}
              <p className="veri_notVeri_btn mb-0">

                <span className="entity">
                  {/* {getUser?.synapsType?.toUpperCase()} */}
                  {
                    type != "" ? type?.toUpperCase() :
                      getUser?.sumsubType?.toUpperCase()
                  }
                </span>
              </p>
            </div>
          </div>
          {/* <div className="row mt-3">

            <div className="col-12 col-lg-6 mb-3">
              <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
                <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4">

                  <div className="">
                    <div className="d-flex align-items-center gap-3 mb-2 ">
                      <p className="wp_gmail ">Synaps ({getUser?.synapsType == "" ? "NOT VERIFIED" : getUser?.synapsType?.toUpperCase()})</p>
                    </div>
                  </div>
                </div>

                <div className="wp_right mt-4 mt-sm-0">
                  <button
                    className={
                      getUser?.synapsStatus == "verified" ? "success_btn" : "red_btn"
                    }
                  >
                    {getUser?.synapsStatus == "notVerified"
                      ? "NOT VERIFIED"
                      : getUser?.synapsStatus?.toUpperCase()}
                  </button>
                </div>
              </div>
            </div> */}

          {/* <div className="col-12 col-lg-6 mb-3">
              <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
                <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4">

                  <div className="">
                    <div className="d-flex align-items-center gap-3 mb-2 ">
                      <p className="wp_gmail ">Synaps (Entity)</p>
                    </div>
                  </div>
                </div>

                <div className="wp_right mt-4 mt-sm-0">
                  <button
                    className={
                      getUser?.kycStatus == "verified" ? "success_btn" : "red_btn"
                    }
                  >
                    {getUser?.kycStatus == "notVerified"
                      ? "NOT VERIFIED"
                      : getUser?.kycStatus?.toUpperCase()}
                  </button>
                </div>
              </div>
            </div> */}

          {/* </div> */}

          {/**Both internal and external kyc */}
          {/* {(getUser?.kycStatus == "pending" && (getUser?.synapsStatus == "notVerified" || getUser?.synapsStatus == 'pending' || getUser?.synapsStatus == 'resubmit')) ?

            <div className="wlt_balance mt_40 ">
              <>
                <p className="font_xs text-center">
                  Thank you for the information provided!
                </p>
                <p className="font_xs text-center">
                  The Humb Exchange team is already verifying the information in order to validate your trading account.
                </p>
                <p className="font_xs text-center">
                  You will be notified by email about the next steps.
                </p>
                <p className="font_xs text-center">
                  The trading contract becomes available in your trading account immediately after the data validation.
                </p>
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                  {
                    getUser?.synapsType == 'individual' ?
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          setType("individual");
                          handleShowIndividual()
                        }}
                      >
                        Individual
                      </button> :
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          setType("corporate");
                          handleShowIndividual()
                        }}
                      >
                        Entity
                      </button>
                  }
                </div>
                <p className="font_xs text-center">
                  If you are not finished submitting KYC via SYNAPS, please click the above button and submit.
                </p>
              </>

            </div>
            :
            getUser && getUser?.synapsStatus == "rejected" ?
              <>
                <div className="wlt_balance mt_40 ">
                  <div className="success_div_white">
                    <p className="font_xs text-center">Thank you for the information provided!</p>
                    <p className="font_xs text-center">Your KYC information was rejected!</p>
                  </div>
                </div>
              </>
              :
              <>
                {
                  getUser &&
                  getUser?.kycStatus == "approved" &&
                  <div className="wlt_balance mt_40 ">
                    <div className="success_div_white">
                      <p className="font_xs text-center">Thank you for the information provided!</p>
                      <p className="font_xs text-center">Your KYC information successfully Approved!</p>
                    </div>
                  </div>
                }

              </>
          } */}

          {/**External kyc */}
          {getUser?.sumsubStatus == "pending" ? (
          // {getUser?.synapsStatus == "pending" ? (
            <div className="wlt_balance mt_40 ">
              <>
                <div className="success_div_white d-flex align-items-center gap-3 justify-content-around">

                  <p className="font_xs text-nowrap text-center mb-0 fw-600">
                    KYC :
                    <p className="mb-0 kyc_status">
                      <img src={Images.pending} className="img-fluid img_src" />
                      <span className="ms-1">Pending</span>
                    </p>
                  </p>
                  <p className="font_xs text-center mb-0">

                    {/* Please complete your KYC process to proceed. */}
                    KYC is pending for approval
                  </p>
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                    {getUser?.synapsType == "individual" ? (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage("Maximum number of KYC attempts exceeded. Please try again after 24 hours.", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("individual");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Individual */}
                        Continue
                      </button>
                    ) : (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage(" Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("corporate");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Entity */}
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </>
            </div>
            ) : getUser && getUser?.sumsubStatus == "resubmit" ? (
          // ) : getUser && getUser?.synapsStatus == "resubmit" ? (
            <>
              <div className="wlt_balance mt_40 ">
                <div className="success_div_white d-flex align-items-center gap-3 justify-content-around">

                  <p className="font_xs text-nowrap text-center mb-0 fw-600">

                    KYC :
                    <p className="mb-0 kyc_status">
                      <img src={Images.refresh} className="img-fluid img_src" />
                      <span className="ms-1">Resubmit</span>
                    </p>
                  </p>
                  <p className="font_xs text-center mb-0">

                    {/* Please complete your KYC process to proceed. */}
                    KYC documents need to be re-submitted
                  </p>
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                    {getUser?.synapsType == "individual" ? (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage(" Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("individual");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Individual */}
                        Continue
                      </button>
                    ) : (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage(" Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("corporate");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Entity */}
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          // ) : getUser && getUser?.synapsStatus == "reset" ? (
            ) : getUser && getUser?.sumsubStatus == "reset" ? (
            <>
              <div className="wlt_balance mt_40 ">
                <div className="success_div_white d-flex align-items-center gap-3 justify-content-around">

                  <p className="font_xs text-nowrap text-center mb-0 fw-600">

                    KYC :

                    <p className="mb-0 kyc_status">
                      <img src={Images.resubmit} className="img-fluid img_src" />
                      <span className="ms-1">Reset</span>
                    </p>
                  </p>
                  <p className="font_xs text-center mb-0">

                    {/* Please complete your KYC process to proceed. */}
                    Your KYC needs to be carried out again
                  </p>
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                    {getUser?.synapsType == "individual" ? (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage(" Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("individual");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Individual */}
                        Continue
                      </button>
                    ) : (
                      <button
                        className={"red_btn"}
                        onClick={() => {
                          createAccessToken().then((result) => {
                            setShowIndividual(true)
                          }).catch((e) => console.log("createAccessToken_err", e))
                        }}
                        // onClick={() => {
                        //   if (
                        //     getUser &&
                        //     getUser?.kycLimit == 3 &&
                        //     getUser?.kycUpateTime > new Date().getTime()
                        //   ) {
                        //     showToastMessage(" Maximum number of KYC attempts exceeded. Please try again after 24 hours", "error");
                        //     return
                        //   }
                        //   userKycRatelimit();
                        //   setType("corporate");
                        //   // handleShowIndividual();
                        //   getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                        //     let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                        //     newWindow = window.open(url, "mywindow", "resizable=1");
                        //   }).catch((e) => console.error("er : ", e));
                        // }}
                      >
                        {/* Entity */}
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          // ) : getUser && getUser?.synapsStatus == "rejected" ? (
            ) : getUser && getUser?.sumsubStatus == "rejected" ? (
            <>
              <div className="wlt_balance mt_40 ">
                <div className="success_div_white d-flex align-items-center gap-3 justify-content-around">

                  <p className="font_xs text-nowrap text-center mb-0 fw-600">
                    KYC :
                    <p className="mb-0 kyc_status">
                      <img src={Images.pending} className="img-fluid img_src" />
                      <span className="ms-1">Rejected</span>
                    </p>
                  </p>
                  <p className="font_xs text-center mb-0">
                    {/* Your KYC information was rejected! */}
                    Your KYC information was rejected!

                  </p>
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                    <button className={"red_btn"}>
                      Rejected
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            getUser && getUser?.kycStatus == "approved" && (
              <>
                <div className="wlt_balance mt_40 ">
                  <div className="success_div_white d-flex align-items-center gap-3 justify-content-around">

                    <p className="font_xs text-nowrap text-center mb-0 fw-600">

                      KYC :
                      <p className="mb-0 kyc_status">
                        <img src={Images.approve} className="img-fluid img_src" />
                        <span className="ms-1">Approved</span>
                      </p>
                    </p>
                    <p className="font_xs text-center mb-0">
                      {/* Your KYC information successfully Approved! */}
                      Your KYC information successfully Approved!

                    </p>
                    <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 my-4">
                      <button
                        className={"red_btn"}
                      >
                        Approved
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>


        {getUser?.kycStatus == "notVerified" && status == "" && (
          <div className="wlt_balance mt_40 ">
            <div className="humb_terms_div">
              <div className="d-flex align-items-start gap-3">
                <label class="checkbox_container checkbox_container_fit mt-1">
                  <input
                    type="checkbox"
                    value={conditionCheck}
                    onChange={(e) => {
                      setError({});
                      setconditionCheck(e.target.checked);
                    }}
                  />
                  <span class="checkbox_checkmark"></span>
                </label>
                <p className="terms_p_sm">
                  I agree to comply with all Applicable Laws, Regulations &
                  Rules of my Jurisdiction & the Jurisdiction of HUMB Exchange
                </p>
              </div>
            </div>
            <div className="humb_terms_div_buttons mt-3">
              <Form>
                <Form.Check
                  // disabled={true}
                  type="radio"
                  id="Individual"
                  label="Individual"
                  name="group1"
                  className="mb-2"
                  onChange={() => {
                    setType("individual");
                    // getUser?.sumsubType = 'individual'
                  }}
                  checked={type == "individual" ? true : false}
                />
                <Form.Check
                  // disabled={false}
                  type="radio"
                  label="Entity"
                  id="entity"
                  name="group1"
                  onChange={() => {
                    setType("entity");
                    // getUser?.sumsubType = 'corporate'
                  }}
                  checked={type == "entity" ? true : false}
                />
              </Form>
              <p className="mt-2 text-danger">{error?.conditionCheck}</p>
              <button
                className="grn_grd_btn mt-3"
                onClick={async () => {
                  if (!conditionCheck) {
                    setError({ "conditionCheck": "Please agree the term & condition" })
                    return false
                  }
                  createSumsubAppicant()
                }}
                // onClick={
                //   async () => {
                //     let error = {};
                //     if (!conditionCheck) {
                //       error["conditionCheck"] =
                //         "Please agree the term & condition";
                //       setError(error);
                //       return false;
                //     }
                //     userKycRatelimit();
                //     getSessionId(type == "individual" ? "individual" : "entity").then((sessionId) => {
                //       let url = type == "individual" ? `https://verify.synaps.io/?service=indivdual&session_id=${sessionId}&lang=en` : `https://verify-corporate.synaps.io/?service=corporate&session_id=${sessionId}&lang=en`
                //       newWindow = window.open(url, "mywindow", "resizable=1");
                //     }).catch((e) => console.error("er : ", e));
                //   }
                // }
              >
                Start Verification
              </button>
            </div>
            {/* <div className="verification_tabs_header d-flex flex-wrap align-items-center gap-4 gap-md-5 mt-4">
              <button
                className={`verify_tab_choose ${activeVerification === 1 ? "active" : ""
                  }`}
                onClick={() => {
                  setType("individual"); getSessionId("individual"); setActiveVerification(1); setCheck1(false); setCheck2(false); setCheck3(false); setCheck4(false); setCheck5(false); setCheck6(false); setCheck7(false);
                  setCheck8(false); setCheck9(false); setCheck10(false); setCheck11(false); setIndividualCheck(false)
                  // setIndividualverify({ ...individualverify, ["dob"]: "" })
                }}
              >
                Individual Verification{" "}
              </button>
              <button
                className={`verify_tab_choose ${activeVerification === 2 ? "active" : ""
                  }`}
                onClick={() => {
                  setType("corporate"); getSessionId("entity"); setActiveVerification(2); setCheck1(false); setCheck2(false); setCheck3(false); setCheck4(false); setCheck5(false); setCheck6(false); setCheck7(false)
                  setCheck8(false); setCheck9(false); setCheck10(false); setCheck11(false); setIndividualCheck(false)
                }}
              >
                Entity Verification
              </button>
            </div> */}

            {/* <div className="verification_tabs_body mt-5 pb-4">
               INDIVIDUAL 
              {activeVerification === 1 ? (
                <div>
                  <div>
                    <p className="fw-bold">Personal Information</p>
                    <p className="mt-2 mb-4 verify_desc">
                      The data provided must be identical to those in the
                      identification document
                    </p>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4 mb-2 " >
                        <div className="verification_form_height">
                          <label>First Name</label>
                          <input
                            type="text"
                            placeholder="John"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.firstname}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["firstname"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["firstname"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["firstname"]: "Field is required" })
                              }
                            }}
                          />

                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.firstname}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label>Last Name</label>
                          <input
                            type="text"
                            placeholder="Doe"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.lastname}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["lastname"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["lastname"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["lastname"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.lastname}
                        </span>
                      </div>



                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Date Of Birth</label>
                          <div className="cred_dob_input kyc_input verify_date_picker ">
                            <div className="custom_datepicker position-relative">
                              <img
                                src={Images.calender}
                                alt="calender"
                                className="img-fluid calender_icon"
                                onClick={handleDobDateClick}
                              />
                              <DatePicker
                                type={type}
                                dateFormat="MMMM d, yyyy"
                                placeholder="DD/MM/YYYY"
                                maxDate={new Date()}
                                selected={!isEmpty(individualverify?.dob) ? new Date(individualverify.dob) : ''}
                                selectData={(date, errorMessage) => {
                                  console.log(date, 'DatePicker___DatePicker', individualverify)
                                  if (errorMessage == "") {
                                    setIndividualverify({ ...individualverify, ["dob"]: new Date(date).getTime() })
                                    if (date) {
                                      setIndividualerror({ ...individualerror, ["dob"]: "" })
                                    }
                                    else {
                                      setIndividualerror({ ...individualerror, ["dob"]: "Field is required" })
                                    }
                                  } else {
                                    setIndividualerror({ ...individualerror, ["dob"]: errorMessage })
                                  }

                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.dob}
                        </span>
                      </div>

                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Birth Place</label>
                          <input
                            type="text"
                            placeholder="XYZ"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.birthplace}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["birthplace"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["birthplace"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["birthplace"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.birthplace}
                        </span>
                      </div>

                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">
                            Personal Identifier
                          </label>
                          <div className="select_lg kyc_select verify_select">
                            <Select
                              options={codeOptions}
                              className=""
                              classNamePrefix="custom_rct_slt"
                              placeholder="Select Proof"
                              isSearchable={false}

                              value={!isEmpty(individualverify?.personalIdentiferOccupation) ? codeOptions.find((val) => (val.value == individualverify?.personalIdentiferOccupation)) : ''}
                              onChange={(e) => {
                                console.log("e.value", e?.value);
                                setIndividualverify({ ...individualverify, ["personalIdentiferOccupation"]: e?.value })
                                if (e?.value) {
                                  setIndividualerror({ ...individualerror, ["personalIdentiferOccupation"]: "" })
                                }
                                else {
                                  setIndividualerror({ ...individualerror, ["personalIdentiferOccupation"]: "Field is required" })
                                }
                              }}
                            />
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {individualerror?.personalIdentiferOccupation}
                            </span>
                          </div>
                        </div>

                      </div>

                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Personal Identifier Code</label>
                          <input
                            type="text"
                            placeholder="XYZ"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.personalidentifercode}
                            onChange={(e) => {
                              if (alfaRegex.test(e.target.value) || e.target.value == '') {
                                setIndividualverify({ ...individualverify, ["personalidentifercode"]: e?.target?.value })
                                if (e?.target?.value?.length > 0) {
                                  setIndividualerror({ ...individualerror, ["personalidentifercode"]: "" })
                                }
                                else {
                                  setIndividualerror({ ...individualerror, ["personalidentifercode"]: "Field is required" })
                                }
                              }
                            }
                            }
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.personalidentifercode}
                        </span>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="mt-4">
                    <p className="fw-bold">
                      Address (Address from ID document)
                    </p>
                    <div className="row mt-3">
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Address</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the address"
                            value={individualverify?.address}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["address"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["address"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["address"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.address}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">City</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the city"
                            value={individualverify?.city}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["city"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["city"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["city"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.city}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Country</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the country"
                            value={individualverify?.country}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["country"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["country"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["country"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.country}
                        </span>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="mt-3">
                    <p className="fw-bold">Residence Address</p>
                    <div className="row mt-3">
                      <div className="col-12 col-md-6 col-lg-4 mb-2 " >
                        <div className="verification_form_height">
                          <label className="fw_550">Address</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the residence Address"
                            value={individualverify?.residenceaddress}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["residenceaddress"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["residenceaddress"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["residenceaddress"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.residenceaddress}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">City</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the residence city"
                            value={individualverify?.residencecity}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["residencecity"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["residencecity"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["residencecity"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.residencecity}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">Country</label>
                          <input
                            type="text"
                            className="modal_input w-100 mt-2"
                            placeholder="Enter the residence country"
                            value={individualverify?.residencecountry}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["residencecountry"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["residencecountry"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["residencecountry"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.residencecountry}
                        </span>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="mt-3">
                    <p className="fw-bold mb-4">Financial Information</p>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">
                            Current Occupation (Please select the closest
                            option)
                          </label>

                          <div className="select_lg kyc_select verify_select">
                            <Select
                              options={options1}
                              className=""
                              classNamePrefix="custom_rct_slt"
                              placeholder="Select Current Occupation"
                              isSearchable={false}
                              value={!isEmpty(individualverify?.occupation) ? options1.find((val) => (val.value == individualverify?.occupation)) : ''}
                              onChange={(e) => {
                                console.log("e.value", e?.value);
                                setIndividualverify({ ...individualverify, ["occupation"]: e?.value })
                                if (e?.value) {
                                  setIndividualerror({ ...individualerror, ["occupation"]: "" })
                                }
                                else {
                                  setIndividualerror({ ...individualerror, ["occupation"]: "Field is required" })
                                }
                              }}
                            />
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {individualerror?.occupation}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="verification_form_height">
                          <label className="fw_550">
                            Source of Funds
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Source of Funds"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.sourceoffunds}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["sourceoffunds"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["sourceoffunds"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["sourceoffunds"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.sourceoffunds}
                        </span>
                      </div>

                    </div>{" "}
                    <div className="row">

                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="d-flex flex-column justify-content-between verification_form_height">
                          <label className="fw_550">
                            Purpose and nature of the business relationship
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Purpose of business relationship"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.businessrelationship}
                            onChange={(e) => {
                              setIndividualverify({ ...individualverify, ["businessrelationship"]: e?.target?.value })
                              if (e?.target?.value?.length > 0) {
                                setIndividualerror({ ...individualerror, ["businessrelationship"]: "" })
                              }
                              else {
                                setIndividualerror({ ...individualerror, ["businessrelationship"]: "Field is required" })
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.businessrelationship}
                        </span>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 mb-2 " >
                        <div className="d-flex flex-column justify-content-between verification_form_height">
                          <label className="fw_550">
                            Estimated annual volume to be traded
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Estimated annual volume to be traded"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.volumeoftrade}
                            onChange={(e) => {
                              if (numbers.test(e.target.value) || e.target.value == "") {
                                setIndividualverify({ ...individualverify, ["volumeoftrade"]: e?.target?.value })
                                if (e?.target?.value?.length > 0) {
                                  setIndividualerror({ ...individualerror, ["volumeoftrade"]: "" })
                                }
                                else {
                                  setIndividualerror({ ...individualerror, ["volumeoftrade"]: "Field is required" })
                                }
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.volumeoftrade}
                        </span>
                      </div>

                      <div className="col-12 col-md-6 col-lg-4 mb-2 ">
                        <div className="d-flex flex-column justify-content-between verification_form_height">
                          <label className="fw_550">
                            Monthly Income
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Monthly Income"
                            className="modal_input w-100 mt-2"
                            value={individualverify?.monthlyincome}
                            onChange={(e) => {
                              if (numbers.test(e.target.value) || e.target.value == "") {
                                setIndividualverify({ ...individualverify, ["monthlyincome"]: e?.target?.value })
                                if (e?.target?.value?.length > 0) {
                                  setIndividualerror({ ...individualerror, ["monthlyincome"]: "" })
                                }
                                else {
                                  setIndividualerror({ ...individualerror, ["monthlyincome"]: "Field is required" })
                                }
                              }
                            }}
                          />
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2 span_height">
                          {individualerror?.monthlyincome}
                        </span>
                      </div>


                    </div>{" "}

                  </div>
                  <div className="mt-3">
                    <p className="fw-bold">KYC</p>

                    <div className="d-flex align-items-center gap-3 mt-3">
                      {" "}
                      <div className="custom_toggle">
                        <label class="switch">
                          <input type="checkbox" checked={individualCheck} onChange={(e) => { handleSynapysCheck(e.target.checked, "individual") }} />
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <p className="gray_text_xs">Perform KYC via SYNAPS</p>
                    </div>
                    <span className="text-danger f-12 d-block text-left mt-2 ">
                      {individualerror?.individualCheck}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="fw-bold">Trading Conditions</p>
                    <p className="mt-2 mb-4 verify_desc">
                      By initiating a transaction, Please confirm that you
                      comply with the following information :
                    </p>
                    <div className="d-flex align-items-start gap-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check1} onChange={(e) => { setCheck1(e.target.checked); }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I agree to comply with all Applicable Laws, Regulations & Rules of my Jurisdiction & the Jurisdiction of HUMB Exchange
                      </p>
                    </div>
                    <div className="d-flex align-items-start gap-3 mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check2} onChange={(e) => { setCheck2(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I confirm that all Information provided during the KYC Process is accurate, truthful & complete
                      </p>

                    </div>{" "}
                    <div className="d-flex align-items-start gap-3 mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check3} onChange={(e) => { setCheck3(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I acknowledge that HUMB Exchange adheres to AML & CTF Regulations & that I will not engage in any activity that violates these Regulations.
                      </p>

                    </div>{" "}
                    <div className="d-flex align-items-start gap-3 mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check4} onChange={(e) => { setCheck4(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I understand that trading Cryptocurrencies involves significant Risk, including the Risk of Loss. I am fully aware of these Risks & Accept them.
                      </p>

                    </div>{" "}
                    <div className="d-flex align-items-start gap-3  mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check5} onChange={(e) => { setCheck5(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I agree not to engage in any Fraudulent, Deceptive or Manipulative Activity on HUMB Exchange
                      </p>
                    </div>{" "}
                    <div className="d-flex align-items-start gap-3  mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check6} onChange={(e) => { setCheck6(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I am responsible for maintaining the confidentiality of my Account Information, including my Password & for all activities that occur under my Account.
                      </p>
                    </div>
                    <div className="d-flex align-items-start gap-3  mt-3">
                      <label class="checkbox_container">
                        <input type="checkbox" value={check7} onChange={(e) => { setCheck7(e.target.checked) }} />
                        <span class="checkbox_checkmark"></span>
                      </label>
                      <p className="terms_p">
                        I consent to HUMB Exchange monitoring my Transactions for the purpose of preventing Fraud, Money Laundering & other Illegal Activities.
                      </p>

                    </div>
                  </div>
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {individualerror?.check}
                  </span>
                  <div className="mt-5 d-flex align-items-center justify-content-center">
                    {
                      isLoading ?
                        <button className="grn_grd_btn ">Loading...</button>
                        :
                        <button className="grn_grd_btn " onClick={() => { Handleindivirtualverification() }}>Send Form</button>
                    }

                  </div>
                </div>
              ) :
                 ENTITY 
                  (
                    <div>
                      <div>
                        <p className="fw-bold">Company Registration Details</p>
                        <p className="mt-2 mb-4 verify_desc">
                          The data provided must be identical to those in the
                          registration document
                        </p>
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label>
                                Company Name (Certificate of Incorporation
                                /Registration Number)
                              </label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Company Name"
                                value={entityverify?.companyname ? entityverify?.companyname : ""}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["companyname"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["companyname"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["companyname"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.companyname}
                            </span>

                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label>
                                Certificate of Incorporation/Registration Number
                              </label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Registration Number"
                                value={entityverify?.regno ? entityverify?.regno : ""}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["regno"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["regno"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["regno"]: "Field is required" })
                                  }
                                }}
                              />


                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {entityerror?.regno}
                            </span>

                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Registration Date</label>
                              <div className="cred_dob_input kyc_input ">
                                <div className="custom_datepicker position-relative">
                                  <img
                                    src={Images.calender}
                                    alt="calender"
                                    className="img-fluid calender_icon"
                                    onClick={handleRegistrationDateClick}
                                  />
                                  <DatePicker
                                    ref={registrationDateRef}
                                    placeholder="DD/MM/YYYY"
                                    selected={!isEmpty(entityverify?.regdate) ? new Date(entityverify.regdate) : ''}
                                    selectData={(date, errorMessage) => {
                                      if (errorMessage == "") {
                                        setEntityvefify({ ...entityverify, ["regdate"]: new Date(date).getTime() })
                                        if (date) {
                                          setEntityerror({ ...entityerror, ["regdate"]: "" })
                                        }
                                        else {
                                          setEntityerror({ ...entityerror, ["regdate"]: "Field is required" })
                                        }
                                      } else {
                                        setEntityerror({ ...entityerror, ["regdate"]: errorMessage })
                                      }

                                    }}
                                  />
                                </div>

                              </div>


                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.regdate}
                            </span>
                          </div>
                        </div>{" "}
                        <div className="row">

                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            {" "}
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Jurisdiction of Incorporation/Registration
                              </label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Jurisdiction of Incorporation"
                                value={entityverify?.jurisdiction}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["jurisdiction"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["jurisdiction"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["jurisdiction"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.jurisdiction}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label>Headquarter/Address</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Address"
                                value={entityverify?.headquateraddress}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["headquateraddress"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["headquateraddress"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["headquateraddress"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.headquateraddress}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label>Sector/Industry/Business Type</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Type"
                                value={entityverify?.businesstype}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["businesstype"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["businesstype"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["businesstype"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.businesstype}
                            </span>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <p className="fw-bold">
                          Legal representative of the company
                        </p>
                        <p className="mt-2 mb-4 verify_desc">
                          The data provided must be identical to those in the
                          personal documents
                        </p>
                        <div className="row mt-3">
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Full Name</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Fullname"
                                value={entityverify?.fullname}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["fullname"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["fullname"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["fullname"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.fullname}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Personal ID Number</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Personal ID Number"
                                value={entityverify?.personalidnumber}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["personalidnumber"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["personalidnumber"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["personalidnumber"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.personalidnumber}
                            </span>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <p className="fw-bold">
                          Address (Address from ID document)
                        </p>
                        <div className="row mt-3">
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Address</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Address"
                                value={entityverify?.address}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["address"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["address"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["address"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.address}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">City</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter City"
                                value={entityverify?.city}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["city"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["city"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["city"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.city}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Country</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter Country"
                                value={entityverify?.country}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["country"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["country"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["country"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.country}
                            </span>
                          </div>
                        </div>{" "}
                        <div className="row">

                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <p className="fw-bold">Company Financial Details</p>
                        <div className="row mt-4">
                          <div className="col-12 col-md-6">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Source of funds
                              </label>

                              <div className="select_lg kyc_select ">
                                <Select
                                  options={options1}
                                  className="mt-2"
                                  classNamePrefix="custom_rct_slt"
                                  placeholder="Select Source of Funds"
                                  isSearchable={false}
                                  value={!isEmpty(entityverify?.sourceoffunds) ? options1.find((val) => (val.value == entityverify?.sourceoffunds)) : ''}
                                  onChange={(e) => {
                                    console.log("e.value", e?.value);
                                    setEntityvefify({ ...entityverify, ["sourceoffunds"]: e?.value })
                                    if (e?.value) {
                                      setEntityerror({ ...entityerror, ["sourceoffunds"]: "" })
                                    }
                                    else {
                                      setEntityerror({ ...entityerror, ["sourceoffunds"]: "Field is required" })
                                    }
                                  }}
                                />

                              </div>
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.sourceoffunds}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 mt-4 mt-md-0">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Annual Turnover (Please enter the option
                                corresponding to the turnover for the completed
                                fiscal year,expressed in euros)
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Annual Turnover"
                                className="modal_input w-100 mt-2"
                                value={entityverify?.annualturnover}
                                onChange={(e) => {
                                  if (numbers.test(e.target.value) || e.target.value == "") {
                                    setEntityvefify({ ...entityverify, ["annualturnover"]: e?.target?.value })
                                    if (e?.target?.value?.length > 0) {
                                      setEntityerror({ ...entityerror, ["annualturnover"]: "" })
                                    }
                                    else {
                                      setEntityerror({ ...entityerror, ["annualturnover"]: "Field is required" })
                                    }
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.annualturnover}
                            </span>
                          </div>
                        </div>{" "}
                        <div className="row mt-4">
                          <div className="col-12 col-md-6">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Purpose and nature of the business relationship
                                (Please enter one or more options that describe the
                                reason for opening the account on the platform)
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Purpose and nature of the business relationship"
                                className="modal_input w-100 mt-2"
                                value={entityverify?.businessrelationship}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["businessrelationship"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["businessrelationship"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["businessrelationship"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.businessrelationship}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 mt-4 mt-md-0 ">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Estimated annual volume to be traded (Please enter
                                the range you estimate you will trade)
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Estimated annual volume to be traded"
                                className="modal_input w-100 mt-2"
                                value={entityverify?.volumeoftrade}
                                onChange={(e) => {
                                  if (numbers.test(e.target.value) || e.target.value == "") {
                                    setEntityvefify({ ...entityverify, ["volumeoftrade"]: e?.target?.value })
                                    if (e?.target?.value?.length > 0) {
                                      setEntityerror({ ...entityerror, ["volumeoftrade"]: "" })
                                    }
                                    else {
                                      setEntityerror({ ...entityerror, ["volumeoftrade"]: "Field is required" })
                                    }
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.volumeoftrade}
                            </span>
                          </div>
                        </div>{" "}
                      </div>{" "}
                      <div className="mt-3">
                        <p className="fw-bold">
                          Main Business Partner (Please fill in the relevant
                          information for the main business partner)
                        </p>
                        <div className="row mt-3">
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Name</label>
                              <input
                                type="text"
                                className="modal_input w-100 mt-2"
                                placeholder="Enter partner name"
                                value={entityverify?.partnername}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["partnername"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["partnername"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["partnername"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.partnername}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">
                                Country where the partner is registered
                              </label>
                              <input
                                type="text"
                                placeholder="Country where the partner"
                                className="modal_input w-100 mt-2"
                                value={entityverify?.partnercountry}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["partnercountry"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["partnercountry"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["partnercountry"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.partnercountry}
                            </span>
                          </div>
                          <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="d-flex flex-column justify-content-between verification_form_height">
                              <label className="fw_550">Business Activity</label>
                              <input
                                type="text"
                                placeholder="Enter Business Activity"
                                className="modal_input w-100 mt-2"
                                value={entityverify?.businessactivity}
                                onChange={(e) => {
                                  setEntityvefify({ ...entityverify, ["businessactivity"]: e?.target?.value })
                                  if (e?.target?.value?.length > 0) {
                                    setEntityerror({ ...entityerror, ["businessactivity"]: "" })
                                  }
                                  else {
                                    setEntityerror({ ...entityerror, ["businessactivity"]: "Field is required" })
                                  }
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2 span_height">
                              {entityerror?.businessactivity}
                            </span>

                          </div>
                        </div>{" "}

                      </div>
                      <div className="mt-3">
                        <p className="fw-bold">KYC</p>

                        <div className="d-flex align-items-center gap-3 mt-3">
                          {" "}
                          <div className="custom_toggle">
                            <label class="switch">
                              <input type="checkbox" checked={entityCheck} onChange={(e) => { handleSynapysCheck(e.target.checked, "entity") }} />
                              <span class="slider round"></span>
                            </label>
                          </div>
                          <p className="gray_text_xs">Perform KYC via SYNAPS</p>
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {entityerror?.entityCheck}
                        </span>
                      </div>
                      <div className="mt-5">
                        <p className="fw-bold">Trading Conditions</p>
                        <p className="mt-2 mb-4 verify_desc">
                          By initiating a transaction, Please confirm that you meet
                          and comply with,cummulatively, the following information:
                        </p>
                        <div className="d-flex align-items-start gap-3">
                          <label class="checkbox_container ">
                            <input type="checkbox" value={check1} onChange={(e) => { setCheck1(e.target.checked); }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">I am 18 years old</p>

                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3 mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check2} onChange={(e) => { setCheck2(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            I am the legal representative of the company for which I
                            am requesting the opening of the trading account
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3 mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check3} onChange={(e) => { setCheck3(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            All information I provide in the relationship with HUMB Exchange is correct
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3 mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check4} onChange={(e) => { setCheck4(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            I agree to the processing of my personal data in{" "}
                            accordance with the Personal Data Policy
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check5} onChange={(e) => { setCheck5(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            I declare under my own responsibility that I am the real{" "}
                            beneficiary of the legal entity of which the account is
                            being opened on the platform
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check6} onChange={(e) => { setCheck6(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            The funds used to carry out transactions through the HUMB Exchange platform do not come from illegal or illicit{" "}
                            activities
                          </p>

                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check7} onChange={(e) => { setCheck7(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            Trading through the HUMB Exchange platform does not{" "}
                            constitute money laundering or terrorism financing{" "}
                            activity
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check8} onChange={(e) => { setCheck8(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            You are the account holder and the account is not used{" "}
                            by another person
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check9} onChange={(e) => { setCheck9(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            You will not disclose your login credentials(username,
                            password or other information required to log into the
                            platform) to anyone else
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check10} onChange={(e) => { setCheck10(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            You understand and assume the risks arising from trading
                            holding digital assets on the HUMB Exchange platform
                          </p>

                        </div>{" "}
                        <span className="text-danger f-12 d-block text-left mt-2">
                        </span>
                        <div className="d-flex align-items-start gap-3  mt-3">
                          <label class="checkbox_container">
                            <input type="checkbox" value={check11} onChange={(e) => { setCheck11(e.target.checked) }} />
                            <span class="checkbox_checkmark"></span>
                          </label>
                          <p className="terms_p">
                            You will comply with the contractual provisions,
                            including those related to the prevention and combating{" "}
                            of money laundering and terrorism financing, and will
                            provide the data and information/documents that may be{" "}
                            requested during the business relationship ,necessary to
                            comply with the applicable legislation
                          </p>

                        </div>
                      </div>
                      <span className="text-danger f-12 d-block text-left mt-2">
                        {entityerror?.check}
                      </span>
                      <div className="mt-5 d-flex align-items-center justify-content-center">
                        {
                          isLoading ?
                            <button className="grn_grd_btn ">Loading...</button>
                            :
                            <button className="grn_grd_btn " onClick={() => { Handleentityverification() }}>Send Form</button>
                        }
                      </div>
                    </div>
                  )}
            </div> */}
          </div>
        )}{" "}
        {getUser?.kycStatus != "approved" ?
          <div className="wlt_balance mt-3 ">
            <div className="success_div_white d-flex align-items-start gap-2 justify-content-start">
              <p className="font_xs text-center mb-0 fw-600 text-nowrap">
                Note :
              </p>
              <p className="font_xs mb-0">
                {/* You have a limit of 3 attempts to submit your KYC. If you exceed this limit,
              you will be unable to submit your KYC for another 24 hours. */}
                Only 3 KYC verification attempts allowed within a 24-hours period. Please ensure all details are correct before submitting
              </p>
            </div>
          </div>
          :
          ""}
      </div>
    </Layout>
  );
};

export default Verification;
