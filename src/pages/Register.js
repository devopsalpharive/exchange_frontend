import React, { useEffect, useState } from "react";
import {
  useLocation,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

import greenJson from "../asset/json/green.json";
import Header from "../Layout/Header";
import PasswordInput from "../components/PasswordInput";
import { data } from "../data/data";
import { Images } from "../data/Images";
import logo from "../asset/images/logo.png";
import logoLight from "../asset/images/logoLight.png";
import Datepicker from "../components/Datepicker";

/** Actions */
import { userLogout, userRegister, userVerifiedMobile, verifyMobileNumber, verifyMobileNumberOtp } from "../actions/userAction";
/** Config */
import { showToastMessage } from "../config/toast";
import Footer from "../Layout/Footer";
import isEmpty from "is-empty";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import OtpVerification from "../modal/Otpverification";
import { MdContentPaste } from "react-icons/md";

// ----------------------->
/**Config */
import config from "../config/env";

//------------------------>

const Register = (props) => {
  const location = useLocation();
  const { code } = useParams();
  const navigate = useNavigate();
  const currentThemeRedux = useSelector((state) => state.theme.theme);
  let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verifyMobile, setVerifyMobile] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [sendotp, setSendotp] = useState(false);
  // const [isMobileStatus, setIsMobileStatus] = useState(false)

  const register = async () => {
    try {
      const captcha = await generateToken();
      if (!captcha) {
        showToastMessage("please verify captcha", "error");
        return false;
      }
      // if (isVerified || isMobileStatus == false) {
      // if (isVerified) {
      const userRegisteration = await userRegister({
        email,
        password,
        firstName,
        lastName,
        dob,
        mobileNumber,
        referenceCode,
        confirmPassword,
        countryCode,
      });
      console.log("userRegisteration", userRegisteration);
      if (userRegisteration.status) {
        const badge = document.querySelector(".grecaptcha-badge");
        if (badge) {
          badge.style.visibility = "hidden";
        }
        setIsLoading(true);
        showToastMessage(userRegisteration.message, "success");
        navigate("/login");
      } else {
        setIsLoading(false);
        setError(userRegisteration.data.errors);
      }
      // } else {
      //   setIsLoading(false);
      //   showToastMessage("Verify your mobile number.", "error");
      // }
    } catch (e) {
      console.log("register_err", e);
    }
  };

  // const handleReCaptcha = async () => {
  //   try {
  //     // console.log("executeRecaptcha", executeRecaptcha('register'));
  //     // if (!executeRecaptcha) {
  //     //   showToastMessage('Recaptcha m', 'error')
  //     //   // return '';
  //     // }
  //     console.log("aaa");
  //     const captcha = await executeRecaptcha('register')
  //     console.log("executeRecaptcha", captcha);
  //   } catch (err) {
  //     showToastMessage("Recaptcha error", 'error')
  //     // return ''
  //   }
  // }

  const checkMobile = async (value) => {
    try {
      const verifiedMobileNumber = await userVerifiedMobile({
        mobileNumber: value,
      });
      if (verifiedMobileNumber.status) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (e) {
      console.log("checkMobile_err", e);
    }
  };

  const getOtp = async () => {
    try {
      setVerifyMobile(true);
      const callOtp = await verifyMobileNumber({
        countryCode: countryCode,
        mobileNumber: mobileNumber,
      });
      console.log("getOtpgetOtpgetOtp", callOtp);
      if (callOtp.status) {
        setVerifyMobile(true);
        setSendotp(true);
        setError({});
        // showToastMessage(callOtp.message, "success");
        showToastMessage(
          `Insert 6-digit OTP sent via SMS on ${mobileNumber?.slice(0, 6)}XXXX`,
          "success"
        );
      } else {
        setVerifyMobile(false);
        setSendotp(false);
        setError(callOtp.errors);
      }
    } catch (e) {
      console.log("getOtp_err", e);
    }
  };

  const userReferalCode = async () => {
    try {
      let code = location.pathname.split("/")[2];
      console.log("userId", code);
      if (code != undefined) {
        setReferenceCode(code);
      }
    } catch (e) {
      console.log("userActivation_err", e);
    }
  };

  const handlePaste = async (event) => {
    if (!navigator.clipboard) {
      showToastMessage("Clipboard API not supported", "error");
      return;
    }
    if (!window.navigator.clipboard) {
      showToastMessage("Clipboard API not supported", "error");
      return;
    }
    window.navigator.clipboard.readText().then((data) => {
      if (data) {
        setReferenceCode(data);
        return;
      }
    });
    if (navigator) {
      let txt = await navigator.clipboard.readText();
      console.log("Text", txt);
      setReferenceCode(txt);
    }
  };

  useEffect(() => {
    if (!isEmpty(code)) {
      setReferenceCode(code);
    }
  }, [code]);

  const generateToken = () => {
    return new Promise((resolve, reject) => {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.style.visibility = "visible";
      }
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${config.SITE_KEY}`;
      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(config.SITE_KEY)
            .then((token) => {
              resolve(token);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  return (
    // <GoogleReCaptchaProvider reCaptchaKey={config.SITE_KEY} scriptProps={{ async: true }}>
    <div className="g-recaptcha" data-size="invisible">
      <Header props={props} />
      <section className="custom_section loginmodule">
        <div className="container customcontainer py-4">
          <div className="row justify-content-center">
            <div className="col-12  col-xl-12 col-xxl-12">
              <div className="row mx-auto ">
                <div className="col-12 col-lg-6  login_left_col ">
                  <div className="login_left ">
                    <Swiper
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      modules={[Pagination, Autoplay]}
                      className="custom_swiper">
                      {data.loginSwiper.map((val) => (
                        <SwiperSlide>
                          <div>
                            <div className="d-flex justify-content-center">
                              <img
                                src={logo}
                                alt="logo"
                                className="img-fluid login_logo"
                              />
                            </div>
                            <div className="mt-4 mb-5 mb-lg-4 mb-xxl-5 d-flex justify-content-center">
                              <Lottie
                                animationData={greenJson}
                                loop={true}
                                className="cred_page_lottie"
                              />
                            </div>
                            <div>
                              <h5 className="text-center h5_text_lg">
                                {val.title}
                              </h5>
                              <p className="p_text_sm text-center my-4">
                                {val.subtitle}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="col-12 col-lg-6 login_right_col mt-5 mt-lg-0">
                  <div>
                    <h3 className="inr_title">Welcome to Humb</h3>

                    <div className="login_tabs d-flex align-items-center gap-4 mt-4 mt-lg-3 mt-xxl-4">
                      <NavLink to="/login"> Login</NavLink>
                      <NavLink to="/register">Register</NavLink>
                    </div>

                    <div>
                      {(currentLocation === "/register" ||
                        currentLocation?.split("/")[1] === "register") && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                            }}>
                            <div className="row mt-4">
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column ">
                                  <label className="label">First Name</label>
                                  <input
                                    type="text"
                                    maxLength="15"
                                    pattern="^[^<>]*$"
                                    className="mt-3 mt-lg-2 mt-xxl-3 cred_input cred_input_new"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => {

                                      if (!htmlTagPattern.test(e.target.value)) {
                                        setFirstName(e.target.value)
                                        setError({ ...error, ...{ firstName: "" } })
                                      }


                                    }}

                                    autoComplete="off"
                                  />
                                  <p className=" error_text mt-2">
                                    {error?.firstName}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                  <label className="label">Last Name</label>
                                  <input
                                    type="text"
                                    maxLength="15"
                                    className="mt-3 mt-lg-2 mt-xxl-3 cred_input cred_input_new"
                                    placeholder="Enter your last name"
                                    onChange={(e) => {
                                      if (!htmlTagPattern.test(e.target.value)) {
                                        setLastName(e.target.value);
                                        setError({ ...error, ...{ lastName: "" } })
                                      }
                                      <html> </html>
                                    }}
                                    value={lastName}
                                    autoComplete="off"
                                  />
                                  <p className=" error_text mt-2">
                                    {error?.lastName}
                                  </p>
                                </div>{" "}
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                  <label className="label">DOB</label>

                                  <div className="mt-3 mt-lg-2 mt-xxl-3 cred_dob_input font">
                                    <Datepicker
                                      maxDate={new Date()}
                                      placeholder="DD/MM/YYYY"
                                      selectData={(e, errorMessage) => {
                                        console.log(e, "Datepicker_Datepicker");
                                        if (errorMessage == "") {
                                          setDob(new Date(e).getTime());
                                          setError({ ...error, ...{ dob: "" } });
                                        } else {
                                          setError({
                                            ...error,
                                            ...{ dob: errorMessage },
                                          });
                                        }
                                      }}
                                    />
                                  </div>

                                  <p className=" error_text mt-2">{error?.dob}</p>
                                </div>{" "}
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                  <label className="label">Email Address</label>
                                  <input
                                    type="email"
                                    value={email}
                                    className="mt-3 mt-lg-2 mt-xxl-3 cred_input cred_input_new"
                                    placeholder="Enter your mail address"
                                    onChange={(e) => {
                                      if (!htmlTagPattern.test(e.target.value)) {
                                        setEmail(e.target.value.toLowerCase());
                                        setError({ ...error, ...{ email: "" } })
                                      }

                                    }}
                                    autoComplete="off"
                                  />
                                  <p className=" error_text mt-2">
                                    {error?.email}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3 phone_sec">
                                <div className="d-flex flex-column">
                                  <label className="label">Contact Number</label>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="custom_phone_input font mt-3 mt-lg-2 mt-xxl-3">
                                      <PhoneInput
                                        countryCodeEditable={false}
                                        placeholder="Enter phone number"
                                        country={"us"}
                                        onChange={(value, event) => {
                                          const { dialCode } = event;
                                          let newPhoneNo = value;
                                          console.log(
                                            "PHONE INPUTS",
                                            value,
                                            event
                                          );
                                          checkMobile(
                                            newPhoneNo.slice(dialCode.length)
                                          );
                                          setMobileNumber(
                                            newPhoneNo.slice(dialCode.length)
                                          );
                                          setCountryCode(dialCode);
                                        }}
                                        // disabled={isVerified}
                                        autoFormat={true}
                                      />
                                    </div>
                                    {
                                      isVerified ?
                                        <button className="login_button_lg mt-3 mt-lg-2 mt-xxl-3" disabled={isVerified}>
                                          <GiConfirmed fill="#fff" fontSize={24} />
                                        </button> :
                                        <button className="login_button_lg mt-3 mt-lg-2 mt-xxl-3 d-flex align-items-center justify-content-center" onClick={() => { getOtp(); }} disabled={verifyMobile}>
                                          Verify
                                        </button>
                                    }

                                  </div>

                                  <p className=" error_text mt-2">
                                    {error?.mobileNumber}
                                  </p>
                                </div>
                              </div>

                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                  <label className="label">
                                    Referral Code (Optional)
                                  </label>
                                  <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                    <div className="row mx-auto h-100">
                                      <div className="col-11 ps-0">
                                        <div className="h-100">
                                          <input
                                            type="text"
                                            className="w-100"
                                            placeholder="Enter or paste your referral code"
                                            onChange={(e) => {
                                              if (isEmpty(code)) {
                                                if (
                                                  numbers.test(e.target.value) ||
                                                  e.target.value == ""
                                                )
                                                  setReferenceCode(
                                                    e.target.value
                                                  );
                                              }
                                            }}
                                            disabled={
                                              !isEmpty(code) ? true : false
                                            }
                                            autoComplete={"off"}
                                            value={referenceCode}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-1 pe-0 d-flex align-items-center justify-content-end">
                                        <button className="border-0 outline-0 bg-transparent">
                                          {isEmpty(code) ? (
                                            <MdContentPaste
                                              className="copy_svg"
                                              onClick={(e) => {
                                                handlePaste(e);
                                              }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>{" "}
                                  <p className=" error_text mt-2">
                                    {error?.referenceCode}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                  <label className="label ">Password</label>

                                  <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                    <PasswordInput
                                      name="password"
                                      placeholder="Enter your password"
                                      setPass={(e) => {
                                        // if (!htmlTagPattern.test(e)) {
                                        setPassword(e);
                                        setError({ ...error, ...{ password: "" } })
                                        // }
                                      }}
                                      autoComplete="off"
                                    />
                                  </div>

                                  <p className=" error_text mt-2">
                                    {error?.password}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex flex-column ">
                                  <label className="label">
                                    Confirm Password
                                  </label>
                                  <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                    <PasswordInput
                                      name="confirm password"
                                      placeholder="Enter your confirm password"
                                      setPass={(e) => {
                                        setConfirmPassword(e);
                                        setError({ ...error, ...{ confirmPassword: "" } })
                                      }}
                                    />
                                  </div>{" "}
                                  <p className=" error_text mt-2">
                                    {error?.confirmPassword}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12  mb-3 d-flex flex-wrap flex-sm-nowrap gap-3">
                                <Link className="text-decoration-none">
                                  {isLoading ? (
                                    <button className="login_button_lg ">
                                      Loading...
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      className="login_button_lg "
                                      onClick={() => {
                                        setIsLoading(true);
                                        setError({});
                                        register();
                                      }}>
                                      Register
                                    </button>
                                  )}
                                </Link>
                                <p className="reg_msg">(On successful registration account activation mail will be sent to your registered email id. Please check for mail in <span>spam</span>  folder if not seen in in-box)
                                </p>
                              </div>
                              {/* <div className="mt-2 text-center">

                              </div> */}
                              <div className="mt-3">
                                <p className="text-center white_link_text">
                                  Already have an account ?{" "}
                                  <Link to="/login">Login Here</Link>
                                </p>
                              </div>
                            </div>
                          </form>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <OtpVerification
        show={sendotp}
        handleClose={() => {
          setVerifyMobile(false);
          setSendotp(false);
        }} //setIsMobileStatus(true)
        location={currentLocation}
        data={{ countryCode: countryCode, mobileNumber: mobileNumber }}
        verified={(e) => {
          setIsVerified(e);
        }}
        type="mobile"
      />
    </div>
    // </GoogleReCaptchaProvider>
  );
};

export default Register;
