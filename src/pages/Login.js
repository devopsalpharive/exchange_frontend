import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import Header from "../Layout/Header";
import { data } from "../data/data";
import { Images } from "../data/Images";
import greenJson from "../asset/json/green.json";
import PasswordInput from "../components/PasswordInput";
import logo from "../asset/images/logo.png";
import logoLight from "../asset/images/logoLight.png";
import axios from "axios";
import browser from "browser-detect";
import { FaSpinner } from "react-icons/fa";


/** Config */
import { showToastMessage } from "../config/toast";
import config from "../config/env";

/** Action */
import { userActivation, userLogin } from "../actions/userAction";
import Footer from "../Layout/Footer";
import OtpVerification from "../modal/Otpverification";
import isEmpty from "is-empty";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag
  const currentThemeRedux = useSelector((state) => state.theme.theme);

  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [loginHistory, setLoginHistory] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sendotp, setSendotp] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [mobileNumber, setMobileNumber] = useState("");
  // const [tryWithEmail, setTryWithEmail] = useState(false);

  const userActivate = async () => {
    try {
      let userId = location.pathname.split("/")[2];
      console.log("userId", userId);
      if (userId != undefined) {
        const activation = await userActivation(userId);
        if (activation.status) {
          showToastMessage(activation.data.message, "success");
          setCurrentLocation("/login")
          navigate("/login");
        } else {
          showToastMessage(activation.error.message, "error");
          navigate("/login");
        }
      }
    } catch (e) {
      console.log("userActivation_err", e);
    }
  };

  const login = async () => {
    setError({});
    setIsLoading(true);
    try {
      // Recaptcha ------->

      const captcha = await generateToken("open");
      if (!captcha) {
        showToastMessage("please verify captcha", "error");
        return false
      }

      //----------->

      const getData = await userLogin({ email, password, loginHistory }, "userLogin");
      // console.log("userLogin_data", getData);
      if (getData.status) {
        setIsLoading(false);
        if (getData?.data == "OTP") {
          setLoginType(getData.type)
          setMobileNumber(getData.mobileNumber)
          showToastMessage(getData.message, "success");
          setSendotp(true)
        }
        else {
          showToastMessage(getData.message, "success");
          const badge = document.querySelector('.grecaptcha-badge');
          if (badge) {
            badge.style.visibility = 'hidden';
          }
          const page = sessionStorage.getItem('loginFrom');

          if (page == null || page == undefined || page == '') {
            navigate("/wallet");
          } else { navigate(page) }
        }
      } else {
        setIsLoading(false);
        setError(getData.error);
        getData.message &&
          showToastMessage(getData.message, "error");
        // if (getData.message == "Error : Authenticate" || getData.message == "Error: Invalid parameter `To`: +0") {
        //   setTryWithEmail(true)
        // }
      }
    } catch (e) {
      console.log("userLogin_err", e);
    }
  };

  const getGeoInfo = async () => {
    try {
      const result = browser();
      // let history = await fetch("https://api.ipdata.co/?api-key=72a023c50b32f82ddaaa627630f42a50aa6b83359af7119ebae97ae8", { method: 'GET' })
      let history = await fetch(`https://ipapi.co/json/?key=${config.GOOGLE_KEY}`)
      console.log("getGeoInfo_data", history);
      if (history.ok) {
        history = await history.json()
        console.log("historyhistoryhistory02", history);
        setLoginHistory({
          countryName: history.country_name,
          countryCode: history.country_calling_code,
          ipaddress: history.ip,
          regionName: history.region,
          browserName: result.name,
          isMobile: result.mobile,
          os: result.os,
        })
      }
    } catch (e) {
      console.log("getGeoInfo_err", e);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    userActivate();
    getGeoInfo();
  }, []);

  const generateToken = (data) => {
    return new Promise((resolve, reject) => {
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge) {
        badge.style.visibility = 'visible';
      }
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${config.SITE_KEY}`;
      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(config.SITE_KEY).then((token) => {
            resolve(token);
          }).catch((error) => {
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
  console.log("history.response.data", loginHistory);

  return (
    // <GoogleReCaptchaProvider reCaptchaKey={config.SITE_KEY}>
    <div>
      <Header props={props} />
      <section className="custom_section loginmodule">
        <div className="container customcontainer py-4">
          <div className="row justify-content-center">
            <div className="col-12  col-xl-12 col-xxl-12">
              <div className="row mx-auto">
                <div className="col-12 col-lg-6   login_left_col">
                  <div className="login_left">
                    <Swiper
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      // autoplay={{
                      //   delay: 2500,
                      //   disableOnInteraction: false,
                      // }}
                      modules={[Pagination, Autoplay]}
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
                      {(currentLocation === "/login" ||
                        currentLocation?.split("/")[1] === "activation" ||
                        currentLocation === "/") && (
                          <div className="mt-4 mt-lg-3 mt-xxl-4">
                            <form onSubmit={(e) => { login(e) }}>
                              <div className="row">
                                <div className="col-12 col-md-8 mb-3">
                                  <div className="d-flex flex-column">
                                    <label className="label">Email Address</label>
                                    <input
                                      type="email"
                                      className="mt-3 mt-lg-2 mt-xxl-3 cred_input cred_input_new"
                                      placeholder="Enter Your Mail Address"
                                      value={email}
                                      onChange={(e) => {
                                        if (!htmlTagPattern.test(e.target.value)) {
                                          setEmail((e.target.value).toLowerCase());
                                        }
                                      }}
                                    />
                                    <p className=" error_text mt-2">{error?.email}</p>
                                  </div>
                                </div>
                                <div className="col-12 col-md-8 mb-3">

                                  <div className="d-flex flex-column ">
                                    <label className="label ">Password</label>

                                    <div className="password_input mt-3 mt-lg-2 mt-xxl-3">
                                      <PasswordInput
                                        name="password"
                                        placeholder="Enter Your Password"
                                        setPass={(e) => {
                                          setPassword(e);
                                        }}
                                      />
                                    </div>

                                    <p className=" error_text mt-2">
                                      {error?.password}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-12 col-md-8 mb-3">
                                  <div className="d-flex justify-content-end">
                                    <Link to="/forgotpassword" className="red_txt ">
                                      Forgot Password ?
                                    </Link>
                                  </div>
                                  <div className="mt-3">
                                    <Link className="text-decoration-none">
                                      {isLoading ? (
                                        <button className="login_button_lg w-100 d-flex justify-content-center align-items-center gap-2">
                                          <FaSpinner fontSize={16} fill="#fff" className="loading_rotate" />
                                          Loading
                                        </button>
                                      ) : (
                                        <button
                                          type="submit"
                                          className="login_button_lg w-100"
                                          onClick={(e) => {
                                            login(e);
                                          }}
                                        >
                                          Login
                                        </button>
                                      )}
                                    </Link>
                                  </div>
                                </div>
                              </div>


                            </form>

                            <div className="mt-3">
                              <p className="text-center white_link_text">
                                New User ?{" "}
                                <Link to="/register">Register Here</Link>
                              </p>
                            </div>
                          </div>
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
      {sendotp && <OtpVerification
        show={sendotp}
        handleClose={() => setSendotp(false)}
        location={currentLocation}
        data={{ email, password, loginHistory, mobileNumber }}
        resendOtp={login}
        type={loginType}
      />}
    </div>
    // </GoogleReCaptchaProvider>
  );
};

export default Login;
