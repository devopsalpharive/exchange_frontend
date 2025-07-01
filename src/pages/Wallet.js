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
import { showToastMessage } from "../config/toast";
import { toCutOff } from "../lib/Calculationlib";

const Wallet = (props) => {
  const navigate = useNavigate();

  const { getUser } = useSelector((state) => state.user);
  const { userAsset } = useSelector((state) => state.user);
  const [hideBalance, setHideBalance] = useState(true);
  const [assets, setAssets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [mainBalance, setMainbalance] = useState(0);
  const [spotBalance, setSpotbalance] = useState(0);
  const [marginBalance, setMarginbalance] = useState(0);
  const [derivativeBalance, setDerivativebalance] = useState(0);
  const [futuresBalance, setFuturesbalance] = useState(0);
  const [isWalletTransfer, setIsWalletTransfer] = useState(false);
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isEmpty(userAsset.assets)) {
      // console.log("WALLETTABLE", userAsset);
      setAssets(userAsset.assets);
      setTotalBalance(userAsset.totalBalance);
    }
  }, [userAsset]);

  const getUserAsset = async () => {
    try {
      let payload = { userId: getUser?.userId, search: search, hideZeroBalance: hideZeroBalance }
      const getAsset = await userAssets(payload);
      console.log("getUserAsset_getAssetgetAsset", payload);
      if (getAsset.status) {
        setAssets(getAsset.data.assets);
        setTotalBalance(getAsset.data.totalBalance);
        setMainbalance(getAsset.data.mainBalance);
        setSpotbalance(getAsset.data.spotBalance);
        setMarginbalance(getAsset.data.marginBalance);
        setDerivativebalance(getAsset.data.derivativeBalance);
        setFuturesbalance(getAsset.data.futuresBalance);
      }
    } catch (e) {
      console.log("getUserAsset_err", e);
    }
  };

  const handleCloseWalletTransfer = () => {
    let payload = { userId: getUser?.userId, search: search, hideZeroBalance: hideZeroBalance }
    getUserAsset(payload);
    setIsWalletTransfer(false);
  };

  useEffect(() => {
    if (getUser?.userId) {
      getUserAsset();
    }
  }, [getUser, isWalletTransfer, hideZeroBalance, search]);

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
        <div className="row">
          <div className="col-xl-6 mb-3">
            <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between h-100" >
              <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4 w-100">
                <div className="wp_img_wrpr">
                  <img
                    src={
                      getUser?.profileImage ? getUser?.profileImage : Images.profile
                    }
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
                      {/* <img
                        src={Images.copy}
                        alt="edit"
                        className="img-fluid wp_gmail_edit"
                      /> */}
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
          <div className="col-12 col-xl-6 mb-3">
            <section
              className="wlt_balance   sectionscroll wallet_depWid_sec"
              id="asset_content1"
            >
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div className="wallet_balance_all">
                  {/* <div className="d-flex align-items-center gap-2 mt-3">
                    <img src={Images.approx} alt="approx" className="img-fluid" />
                    <p className="p_450">{hideBalance ? totalBalance : "****"}</p>
                    <p className="wallet_coin_name">{userAsset?.convertCurrency}</p>
                  </div> */}
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
                  <p> <span className="lnd_grad_txt">Main Balance : </span>{hideBalance ? toCutOff(totalBalance, 2) : '*******'} {userAsset?.convertCurrency}</p>
                  <p > <span className="lnd_grad_txt">Spot Balance : </span>{hideBalance ? toCutOff(spotBalance, 2) : "*******"} {userAsset?.convertCurrency}</p>
                  <p> <span className="lnd_grad_txt">Margin Balance : </span>{hideBalance ? toCutOff(marginBalance, 2) : "*******"} {userAsset?.convertCurrency}</p>

                </div>
                {/* <div className="wallet_balance_all mt-3">

                  <p> <span className="lnd_grad_txt">Derivative Balance : </span>{toCutOff(derivativeBalance, 2)}</p>
                  <p> <span className="lnd_grad_txt">Futures Balance : </span>{toCutOff(futuresBalance, 2)}</p>
                </div> */}
              </div>
              <div className="d-flex flex-column flex-sm-row  align-items-start justify-content-between">
                {/* <div className="wlt_bal_left">
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
                    <h2 className="fw-bold mb-0" style={{ lineHeight: "2rem" }}>
                      {hideBalance ? toCutOff(mainBalance, 2) : "****"}
                    </h2>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img src={Images.approx} alt="approx" className="img-fluid" />
                    <p className="p_450">{hideBalance ? totalBalance : "****"}</p>
                    <p className="wallet_coin_name">{userAsset?.convertCurrency}</p>
                  </div>

                </div> */}
                <div className="wlt_bal_right d-flex flex-column  mt-0 mt-sm-0" >
                  <button
                    // to="/deposit"
                    className="grn_grd_btn text-decoration-none text-center"
                    state={assets}
                    onClick={() => {
                      getUser?.kycStatus == "approved" ? navigate('/deposit') : showToastMessage("Please complete your KYC verification.", "error")
                    }}
                  >
                    Deposit
                  </button>
                  <button
                    // to="/withdraw"
                    // className="gray_btn mt-3 text-decoration-none text-center"
                    className="grn_grd_btn text-decoration-none text-center mt-3"
                    onClick={() => {
                      getUser?.kycStatus == "approved" ? navigate('/withdraw') : showToastMessage("Please complete your KYC verification.", "error")
                    }}
                  >
                    Withdraw
                  </button>
                  {/* <button
              className="gray_btn mt-3 text-decoration-none text-center"
              onClick={handleShowWalletTransfer}
            >
              Transfer
            </button> */}
                </div>
              </div>

            </section>

          </div>

        </div>
        {getUser?.kycStatus == "notVerified" ? <div className="mb-3">
          <KycAlert />
        </div> : ""}

        <div className="wlt_verification">
          <div className="row">
            <div className="col-12 col-xl-4 mb-3">
              <div className="wv_card d-flex flex-column justify-content-between gap-3 h-100">
                <div>
                  <h6 className="h6_550">Identity Verification</h6>
                  <p className="desc_xs ">
                    {
                      getUser?.kycStatus == "approved" ? "Congratulations! Your KYC verification has been successfully completed." :
                        "We need to perform a thorough Identity Verification in order to comply with the KYC Requirements."
                    }

                  </p>
                </div>
                <div>
                  {
                    getUser?.kycStatus == "approved" ? <button className="grn_grd_btn ">Verified</button> :
                      <Link to="/verification">
                        <button className="grn_grd_btn ">Verify</button>
                      </Link>
                  }
                </div>

              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-3">
              <div className="wv_card h-100 d-flex flex-column justify-content-between gap-3">
                <div>
                  <h6 className="h6_550">Deposit</h6>
                  <p className="desc_xs">
                    Start growing your wealth today with quick, secure deposits!
                  </p>
                </div>

                <div>
                  <button className="grn_grd_btn " onClick={() => {
                    getUser?.kycStatus == "approved" ? navigate('/deposit') : showToastMessage("Please complete your kyc verification.", "error")
                  }}>
                    Deposit Crypto / Fiat
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4 mb-3">
              <div className="wv_card h-100 d-flex flex-column justify-content-between gap-3">
                <div>
                  <h6 className="h6_550">Trade</h6>
                  <p className="desc_xs">
                    Real-time trading, limitless potential – make every move count!
                  </p>
                </div>
                <div>
                  <button className="grn_grd_btn mt-3" onClick={() => { navigate('/spot-trading') }}> Start Trading</button>
                </div>
              </div>
            </div>
          </div>
        </div>



        <section
          className="wlt_asset_table sectionscroll"
          id="asset_content2"
        >
          {/* <h5 className="h5_text_lg">My Asset</h5> */}
          <MyAssetTable
            data={assets}
            handleCloseWalletTransfer={handleCloseWalletTransfer}
            onHideZero={(val) => { setHideZeroBalance(Boolean(val)) }}
            onSearch={(val) => { setSearch(val) }}
          />
        </section>

        <section
          className="wlt_asset_table recenttrans_table mt_40 sectionscroll"
          id="asset_content3"
        >
          <h5 className="h5_text_lg">Recent Transactions</h5>
          <RecentTransaction />
        </section>
      </div>
    </Layout>
  );
};

export default Wallet;
