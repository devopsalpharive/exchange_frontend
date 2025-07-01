import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Images } from "../data/Images";
import MyAssetTable from "../Tables/MyAssetTable";
import RecentTransaction from "../Tables/RecentTransaction";
import { useSelector } from "react-redux";

/** Action */
import { userAssets } from "../actions/userAction";
/** Config */
import { priceConversion } from "../config/lib";
import WalletTransfer from "../modal/WalletTransfer";
import isEmpty from "is-empty";
import KycAlert from "../components/KycAlert";
import Announcementscard from "../components/Announcementcard";
import { RiShieldUserLine, RiVipCrown2Line } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import { showToastMessage } from "../config/toast";
import { toCutOff } from "../lib/Calculationlib";
import { strategyAge } from "../lib/dateTimeHelper";

const Dash = (props) => {
  const navigate = useNavigate();
  const { getUser } = useSelector((state) => state.user);
  const { userAsset } = useSelector((state) => state.user);
  const { myStrategy } = useSelector((state) => state.copyTrade);
  const [hideBalance, setHideBalance] = useState(true);
  const [assets, setAssets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [convertSymbol, setConvertSymbol] = useState("USDT");
  const [isWalletTransfer, setIsWalletTransfer] = useState(false);
  const [spotBalance, setSpotbalance] = useState(0);
  const [marginBalance, setMarginbalance] = useState(0);
  const [derivativeBalance, setDerivativebalance] = useState(0);
  const [futuresBalance, setFuturesbalance] = useState(0);
  const [mainBalance, setMainbalance] = useState(0);

  // const [convertSymbol, setConvertSymbol] = useState("USD");

  useEffect(() => {
    if (!isEmpty(userAsset.assets)) {
      console.log("WALLETTABLE", userAsset);
      setAssets(userAsset.assets)
      setTotalBalance(userAsset.totalBalance);
      setMainbalance(userAsset.mainBalance);
      setSpotbalance(userAsset.spotBalance);
      setMarginbalance(userAsset.marginBalance);
      setDerivativebalance(userAsset.derivativeBalance);
      setFuturesbalance(userAsset.futuresBalance);
    }
  }, [userAsset]);

  const getUserAsset = async () => {
    try {
      const getAsset = await userAssets(getUser);
      console.log("getAssetgetAsset", getAsset);
      if (getAsset.status) {
        setAssets(getAsset.data.assets);
        setTotalBalance(getAsset.data.totalBalance);
      }
    } catch (e) {
      console.log("getUserAsset_err", e);
    }
  };

  const handleCloseWalletTransfer = () => {
    setIsWalletTransfer(false);
  };

  useEffect(() => {
    if (getUser?.userId) {
      getUserAsset();
    }
  }, [getUser, isWalletTransfer]);

  // console.log("scrolll", document.getElementById("asset_content"));
  // const [activeSection, setActiveSection] = useState("");
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = document.querySelectorAll(".sectionscroll");
  //     console.log("sectionss", sections);
  //     let currentSection = "";
  //     sections.forEach((section) => {
  //       const sectionTop = section.offsetTop;
  //       if (window.scrollY >= sectionTop - 50) {
  //         currentSection = section.getAttribute("id");
  //       }
  //     });

  //     setActiveSection(currentSection);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // console.log("elemeenee", activeSection);

  return (
    <Layout props={props}>
      {/* start of import modal */}

      {/* <WalletTransfer
        show={isWalletTransfer}
        handleClose={handleCloseWalletTransfer}
      /> */}

      {/* end of import modal */}
      <div className="wallet_section">
        {/* <div className="row">
          <div className="col-xl-6 mb-3">
            <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
              <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4 w-100">
                <div className="wp_img_wrpr">
                  <img
                    src={getUser?.profileImage ? getUser?.profileImage : Images.profile}
                    alt="profile"
                    className="img_fit_container"
                  />
                </div>
                <div className="text-center text-md-start">
                  <div className="d-flex align-items-center gap-3 mb-2 ">
                    <p className="wp_gmail ">{getUser?.email}</p>
                    <button className="border-0 outline-0 bg-transparent" onClick={() => { navigate("/myprofile") }}>
                      <img
                        src={Images.gmailedit}
                        alt="edit"
                        className="img-fluid wp_gmail_edit"
                      />
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-3  ">
                    <p className="lnd_grad_txt">UID : {getUser?.userId}</p>
                    <button className="border-0 outline-0 bg-transparent">
                      <img
                        src={Images.copy}
                        alt="edit"
                        className="img-fluid wp_gmail_edit"
                      />
                    </button>
                  </div>
                  <div className="wp_right mt-2">
                    <Link to="/myprofile">
                      <button className="grad_btn3">My Profile</button>
                    </Link>
                  </div>
                </div >
              </div >

            </div >
          </div >

          <p>No need start</p>

          <div className='col-xl-2 col-lg-4 mb-3'>
            <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-center flex-column flex-sm-row h-100'>
              <div className="d-flex  flex-column align-items-center  gap-2">
                <RiShieldUserLine fontSize={30} />
                <div>
                  <p className='secu_head mb-2'>User Type</p>
                  <p className='secu_desc mb-0 text-center'>Personal</p>
                </div>
              </div>
            </div>
          </div>

          <p>No need end</p>

          <p>No need start</p>

          <div className='col-xl-2 col-lg-4 mb-3'>
            <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-center flex-column flex-sm-row h-100'>
              <div className="d-flex flex-column align-items-center gap-2">
                <RiVipCrown2Line fontSize={30} />
                <div>
                  <p className='secu_head mb-2'>VIP Level</p>
                  <p className='secu_desc mb-0 text-center'>Regular</p>
                </div>
              </div>
            </div>
          </div>

          <p>No need end</p>

          <div className='col-xl-2 col-lg-4 mb-3'>
            <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-center flex-column flex-sm-row h-100'>
              <div className="d-flex flex-column align-items-center gap-2">
                <TbUsersGroup fontSize={30} />
                <div>
                  <p className='secu_head mb-2'>User Roles</p>
                  <p className='secu_desc mb-0 text-center'>{getUser?.userRole ? (getUser?.userRole)?.toUpperCase() : "Trader"}</p>
                </div>
              </div>
            </div>
          </div>



          <div className="col-12 col-xl-6 mb-3">

            <section
              className="wlt_balance sectionscroll wallet_depWid_sec"
              id="asset_content1"
            >
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div className="wallet_balance_all ">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <p>Estimated Balance</p>
                    <img
                      src={hideBalance ? Images.eyeIcon : Images.eyeIconSlash}
                      alt="view"
                      className="img-fluid wlt_view_icn"
                      onClick={() => {
                        setHideBalance(!hideBalance);
                      }}
                    />
                  </div>
                  <p> <span className="lnd_grad_txt">Main Balance : </span>{hideBalance ? toCutOff(totalBalance, 2) : '********'} {userAsset?.convertCurrency}</p>
                  <p> <span className="lnd_grad_txt">Spot Balance : </span>{hideBalance ? toCutOff(spotBalance, 2) : "*******"} {userAsset?.convertCurrency}</p>
                  <p> <span className="lnd_grad_txt">Margin Balance : </span>{hideBalance ? toCutOff(marginBalance, 2) : '********'} {userAsset?.convertCurrency}</p>

                </div>

              </div>
              <div className="d-flex flex-column flex-sm-row  align-items-center h-100 justify-content-between" >

                <p>No need start</p>

                <div className="wlt_bal_left">
                  <div className="d-flex align-items-center gap-3">
                    <p>Estimated Balance</p>
                    <img
                      src={hideBalance ? Images.eyeIcon : Images.eyeIconSlash}
                      alt="view"
                      className="img-fluid wlt_view_icn"
                      onClick={() => {
                        setHideBalance(!hideBalance);
                      }}
                    />
                  </div>
                  <div className="mt-3 d-flex align-items-end gap-2">
                    <h2 className="fw-bold mb-0">
                      {hideBalance ? toCutOff(mainBalance, 2) : "****"}
                    </h2>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img src={Images.approx} alt="approx" className="img-fluid" />
                    <p className="p_450">{hideBalance ? totalBalance : "****"}</p>
                    <p className="wallet_coin_name">{userAsset?.convertCurrency}</p>
                  </div>
                </div>

                <p>No need end</p>

                <div className="wlt_bal_right d-flex flex-column  mt-0 mt-sm-0">
                  <button
                    className="grn_grd_btn text-decoration-none text-center"
                    state={assets}
                    onClick={() => {
                      getUser?.kycStatus == "approved" ? navigate('/deposit') : showToastMessage("Please complete your kyc verification.", "error")
                    }}
                  >
                    Deposit
                  </button>
                  <button
                    className="grn_grd_btn mt-3 text-decoration-none text-center"
                    onClick={() => {
                      getUser?.kycStatus == "approved" ? navigate('/withdraw') : showToastMessage("Please complete your kyc verification.", "error")
                    }}
                  >
                    Withdraw
                  </button>

                </div>
              </div>

            </section>
          </div>

          <p>No need start</p>

          <div className="col-12 col-xl-6 mb-3">
            <Announcementscard />

          </div>

          <p>No need end</p>



        </div >
        <div className="row">
          <div className="col-xl-4">
            <div className="wallet_profile">
              <div className="db_ct_heads">
                <div className="tc_head_details">
                  <p className="name">Name</p>
                  <p className="registered">
                    Registered 13 days 2 hours ago
                  </p>
                  <div class="percentage_details mt-1"><p class="profit">--1729.10</p> - ROI</div>
                </div>
              </div>
              <div class="trader_card_body mt-3">
                <div class="tc_value_details">
                  <div class="tc_value_details_left">
                    <p class="tc_value_details_left_bold">$ -2886527879.25</p>
                    <p class="tc_value_details_left_lite">Total PnL</p>
                  </div>
                  <div class="tc_value_details_right">
                    <p class="tc_value_details_left_bold text-end">$ 0.00</p>
                    <p class="tc_value_details_left_lite text-end">Copier's PnL</p>
                  </div>
                </div>
                <div class="tc_value_details mt-4">
                  <div class="tc_value_details_left">
                    <p class="tc_value_details_left_bold">$ 0.00</p>
                    <p class="tc_value_details_left_lite">AUM</p>
                  </div>
                  <div class="tc_value_details_right">
                    <p class="tc_value_details_left_bold text-end">2</p>
                    <p class="tc_value_details_left_lite text-end">Followers</p>
                  </div>
                </div>
              </div>
              <div class="trader_card_footer mt-4">
                <button class="linear_btn"
                >
                  Following
                </button>
              </div>

            </div>
          </div>
        </div> */}






        <div div className="row " >
          <div className="col-xl-6 mb-4 mb-xl-0">
            <div className="row h-100">
              <div className="col-12 mb-4">
                <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
                  <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4 w-100">
                    <div className="wp_img_wrpr">
                      <img
                        src={getUser?.profileImage ? getUser?.profileImage : Images.profile}
                        alt="profile"
                        className="img_fit_container"
                      />
                    </div>
                    <div className="text-center text-md-start">
                      <div className="d-flex align-items-center gap-3 mb-2 ">
                        <p className="wp_gmail ">{getUser?.email}</p>
                        <button className="border-0 outline-0 bg-transparent" onClick={() => { navigate("/myprofile") }}>
                          <img
                            src={Images.gmailedit}
                            alt="edit"
                            className="img-fluid wp_gmail_edit"
                          />
                        </button>
                      </div>
                      <div className="d-flex align-items-center gap-3  ">
                        <p className="lnd_grad_txt">UID : {getUser?.userId}</p>
                        <button className="border-0 outline-0 bg-transparent">
                        </button>
                      </div>
                      <div className="wp_right mt-2">
                        <Link to="/myprofile">
                          <button className="grad_btn3">My Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-12 ">
                <section
                  className="wlt_balance sectionscroll wallet_depWid_sec"
                  id="asset_content1"
                >
                  <div className="d-flex flex-wrap justify-content-between gap-3">
                    <div className="wallet_balance_all ">
                      <div className="d-flex align-items-center gap-3 mb-3 mb-xxl-5">
                        <h6 className="mb-0">Estimated Balance</h6>
                        <img
                          src={hideBalance ? Images.eyeIcon : Images.eyeIconSlash}
                          alt="view"
                          className="img-fluid wlt_view_icn"
                          onClick={() => {
                            setHideBalance(!hideBalance);
                          }}
                        />
                      </div>
                      <p> <span className="lnd_grad_txt">Main Balance : </span>{hideBalance ? toCutOff(totalBalance, 2) : '********'} {userAsset?.convertCurrency}</p>
                      <p> <span className="lnd_grad_txt">Spot Balance : </span>{hideBalance ? toCutOff(spotBalance, 2) : "*******"} {userAsset?.convertCurrency}</p>
                      <p> <span className="lnd_grad_txt">Margin Balance : </span>{hideBalance ? toCutOff(marginBalance, 2) : '********'} {userAsset?.convertCurrency}</p>

                    </div>

                  </div>
                  <div className="d-flex flex-column flex-sm-row  align-items-center h-100 justify-content-between" >

                    <div className="wlt_bal_right d-flex flex-column  mt-0 mt-sm-0">
                      <button
                        className="grn_grd_btn text-decoration-none text-center"
                        state={assets}
                        onClick={() => {
                          getUser?.kycStatus == "approved" ? navigate('/deposit') : showToastMessage("Please complete your kyc verification.", "error")
                        }}
                      >
                        Deposit
                      </button>
                      <button
                        className="grn_grd_btn mt-3 text-decoration-none text-center"
                        onClick={() => {
                          getUser?.kycStatus == "approved" ? navigate('/withdraw') : showToastMessage("Please complete your kyc verification.", "error")
                        }}
                      >
                        Withdraw
                      </button>

                    </div>
                  </div>

                </section>
              </div>
            </div>
          </div>
          {!isEmpty(myStrategy) ?
            <div className="col-xl-4 mb-4 mb-xl-0">
              <div className="wlt_balance  h-100">
                <div className="db_ct_title">
                  <h5 className="lnd_grad_txt mb-2">Master Trader</h5>
                </div>
                <div className="db_ct_heads d-flex justify-content-between mt-3">
                  <div className="tc_head_details">
                    <p className="name">{myStrategy?.name}</p>
                    <p className="registered">
                      Registered {strategyAge(myStrategy?.createdAt)} ago
                    </p>
                    <div class="percentage_details mt-1">
                      <p class={`${myStrategy?.roi > 0 ? 'profit' : 'loss'}`}>{myStrategy?.roi > 0 ? `+${myStrategy?.roi?.toFixed(2)}` : `${myStrategy?.roi?.toFixed(2)}`}</p> - ROI</div>
                  </div>
                  <button
                    className="grn_grd_btn text-decoration-none text-center"
                    style={{ height: "fit-content" }}
                    onClick={() => {
                      navigate(`/copy/profile/trader/${myStrategy.strategyId}`)
                      // navigate('/copy-trade')
                    }}
                  >
                    View
                  </button>
                </div>
                <div class="trader_card_body dash_trader_card_body  mt-4">
                  <div class="tc_value_details">
                    <div class="tc_value_details_left">
                      <p class="tc_value_details_left_bold">$  {myStrategy?.totalPandL?.toFixed(2)}</p>
                      <p class="tc_value_details_left_lite">Total PnL</p>
                    </div>
                    <div class="tc_value_details_right">
                      <p class="tc_value_details_left_bold text-end">$ {myStrategy?.copiersTotalPnl?.toFixed(2)}</p>
                      <p class="tc_value_details_left_lite text-end">Copier's PnL</p>
                    </div>
                  </div>
                  <div class="tc_value_details mt-4">
                    <div class="tc_value_details_left">
                      <p class="tc_value_details_left_bold">$ {myStrategy?.totalAUM?.toFixed(2)}</p>
                      <p class="tc_value_details_left_lite">AUM</p>
                    </div>
                    <div class="tc_value_details_right">
                      <p class="tc_value_details_left_bold text-end">{myStrategy?.curCopier}</p>
                      <p class="tc_value_details_left_lite text-end">Followers</p>
                    </div>
                  </div>
                </div>
                {/* <div class="trader_card_footer mt-4">
                <button class="linear_btn"
                >
                  Following
                </button>
              </div> */}

              </div>
            </div> : ""}

          <div className='col-xl-2 col-lg-4 '>
            <div className='wv_card d-flex  mb-3 secu_sec gap-2 align-items-center justify-content-center flex-column flex-sm-row '>
              <div className="d-flex flex-column align-items-center gap-2">
                <TbUsersGroup fontSize={30} />
                <div>
                  <p className='secu_head mb-2'>User Roles</p>
                  <p className='secu_desc mb-0 text-center'>{getUser?.userRole ? (getUser?.userRole)?.toUpperCase() : "Trader"}</p>
                </div>
              </div>
            </div>
          </div>


        </div >







        {/* <div className="mb-3">
          <KycAlert/>
        </div> */}





      </div >
    </Layout >
  );
};

export default Dash;
