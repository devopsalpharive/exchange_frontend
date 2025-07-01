import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import { Images } from "../data/Images";
import { FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { data } from "../data/data";
import { useLocation, Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";

import greenJson from "../asset/json/green.json";
import PasswordInput from "../components/PasswordInput";
import logo from "../asset/images/logo.png";
import logoLight from "../asset/images/logoLight.png";
import { checkExpireForgotPassword, forgotPassword, resetPassword } from "../actions/userAction";
import { showToastMessage } from "../config/toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ForgotPassword = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useParams();
  const currentThemeRedux = useSelector((state) => state.theme.theme);

  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  console.log("current location", location);

  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');


  const handlePasswordView = () => {
    setPasswordView(!passwordView)
  }
  const handleConfirmPasswordView = () => {
    setConfirmPasswordView(!confirmPasswordView)
  }


  const userForgot = async () => {
    try {
      const data = await forgotPassword({ email: email });
      if (data.status) {
        showToastMessage(data.message, "success")
        navigate("/login")
      } else {
        setError(data.errors)
        data.message && showToastMessage(data.message, "error")
      }
    } catch (e) {
      console.log("userForgot_err", e);
    }
  }

  const passwordReset = async () => {
    try {
      const data = await resetPassword({ authToken: authToken, password: password, confirmPassword: confirmPassword });
      if (data.status) {
        showToastMessage(data.message, "success")
        navigate("/login")
      } else {
        setError(data.errors);
        data.message && showToastMessage(data.message, "error")
      }
    } catch (e) {
      console.log("resetPassword_err", e);
    }
  }

  const forgotLinkExpire = async () => {
    try {
      if (location.pathname?.split('/').includes("reset-password")) {
        const isExpired = await checkExpireForgotPassword({ authToken: authToken });
        console.log("isExpiredisExpired", isExpired);
        if (!isExpired.status) {
          showToastMessage(isExpired.error.message, "error")
          navigate("/login")
        }
      }
    } catch (e) {
      console.log("forgotLinkExpire_err", e);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    forgotLinkExpire()
  }, []);

  return (
    <div>
      <Header props={props} />
      <section className="custom_section">
        <div className="container container80 py-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-12  col-xl-11 col-xxl-10">
              <div className="row mx-auto">
                <div className="col-12 col-lg-6  login_left_col">
                  <div className="login_left">
                    <Swiper
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="custom_swiper"
                    >
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
                            <div className="mt-4 mb-5">
                              <Lottie animationData={greenJson} loop={true} />
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
                    <h3 className="inr_title">Forgot Password</h3>

                    <div className="mt-5">
                      <div>


                        {
                          location.pathname == `/reset-password/${authToken}` ?
                            // location.pathname == `/reset-password/` ?
                            <>
                              <div className="d-flex flex-column mb-4">
                                <label className="label">Password</label>
                                {/* <input
                                  type="email"
                                  className="mt-3 cred_input"
                                  placeholder="Enter your password"
                                  onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <p className=" error_text mt-2">
                                  {error?.password}
                                </p> */}
                                <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                  <div className="row mx-auto h-100">
                                    <div className="col-11 ps-0">
                                      <div className="h-100">
                                        <input
                                          type={passwordView ? "text" : "password"}

                                          className="w-100"
                                          placeholder="Enter your password"
                                          onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1 pe-0 d-flex align-items-center justify-content-end">
                                      <button
                                        className="border-0 outline-0 bg-transparent"
                                        onClick={() => handlePasswordView()}
                                      >
                                        {passwordView ? <FaEye /> : <FaEyeSlash />}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <p className=" error_text mt-2">
                                  {error?.password}
                                </p>
                              </div>

                              <div className="d-flex flex-column mb-4">
                                <label className="label">Confirm Password</label>
                                {/* <input
                                  type="email"
                                  className="mt-3 cred_input"
                                  placeholder="Enter Confirm password"
                                  onChange={(e) => { setConfirmPassword(e.target.value) }}
                                /> */}

                                <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                  <div className="row mx-auto h-100">
                                    <div className="col-11 ps-0">
                                      <div className="h-100">
                                        <input
                                          type={confirmPasswordView ? "text" : "password"}
                                          className="w-100"
                                          placeholder="Enter your Confirm Password"
                                          onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-1 pe-0 d-flex align-items-center justify-content-end">
                                      <button
                                        className="border-0 outline-0 bg-transparent"
                                        onClick={() => handleConfirmPasswordView()}
                                      >
                                        {confirmPasswordView ? <FaEye /> : <FaEyeSlash />}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <p className=" error_text mt-2">
                                  {error?.confirmPassword}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button className="login_button_lg w-100" onClick={() => { passwordReset() }}>
                                  Reset Password
                                </button>
                              </div>
                            </> :
                            <>
                              <div className="d-flex flex-column mb-4">
                                <label className="label">Email Address</label>
                                <input
                                  type="email"
                                  className="mt-3 cred_input"
                                  placeholder="Enter your mail address"
                                  value={email}
                                  onChange={(e) => { setEmail(e.target.value?.toLowerCase()) }}
                                />
                                <p className=" error_text mt-2">
                                  {error?.email}
                                </p>
                              </div>

                              <div className="d-flex justify-content-end">
                                <Link to="/login" className="red_txt ">
                                  Back to Login
                                </Link>
                              </div>
                              <div className="mt-4">
                                <button className="login_button_lg w-100" onClick={() => { userForgot() }}>
                                  Submit
                                </button>
                              </div>
                            </>
                        }

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
