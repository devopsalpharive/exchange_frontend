/** import package */
import React, { useEffect, useState, useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import ReactDatatable from "@ashvin27/react-datatable";
import { CopyToClipboard } from "react-copy-to-clipboard";

/** local import */

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Images } from "../data/Images";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "../lib/isEmpty";
import { useSelector } from "react-redux";
import {
  getLaunchpadDetails,
  launchpadUserContribution,
  launchpadSaleFinalise,
  launchpadStopsale,
  launchpadUserpurchase,
  launchpadList,
  launchpadRewardClaimb,
  RemoveWhiteListuser,
} from "../actions/launchpadAction";
/** Redux */
import { launchpadLists } from "../actions/launchpadReduxAction";
import { getAllocationInfo } from "../hooks/launchpadHooks";
import toast from "react-hot-toast";
import AddWhiteUser from "../modal/AddWhiteListUser";
import Jurylist from "../components/Jurylist";
import copyIcon from '../asset/images/greencopy.svg'
import { showToastMessage } from "../lib/toast";
import { toFixedNumber } from "../config/lib";
import { dateTimeFormat, momentFormat } from "../lib/dateTimeHelper";

const Template2 = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getUser, userAsset } = useSelector((state) => state.user);
  const { id } = useParams();
  const [editDesc, setEditDesc] = useState(false);
  const [userDeposit, setUserDeposit] = useState(false);
  const [LaunchData, setLaunchData] = useState({});
  const [userContribution, setUserContribution] = useState({});
  const [amount, setAmount] = useState(0);
  const [errors, setError] = useState({});
  const [asset, setAsset] = useState({});
  const [allocation, setAllocation] = useState([]);
  const [totalAllocation, settotalAllocation] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [WhiteShow, setWhiteShow] = useState(false)
  const childSectionRef = useRef(null);

  const scrollToSection = () => {
    if (childSectionRef.current) {
      childSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  let config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    button: {
      excel: false,
      print: false,
    },
    show_pagination: true,
    show_info: false,
    show_length_menu: false,
    show_filter: false,
  };
  let columns = [
    {
      key: "sno",
      text: "S.No",
      width: 180,
      className: "table_p w230",
      align: "center",
      sortable: false,
      cell: (record, i) => {
        return <p className="">{i + 1}</p>;
      },
    },
    {
      key: "allocation",
      text: "Allocation",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record, i) => {
        // return <p className="">{toFixedNumber(record.allocation / 10 ** state?.tokenDecimal)}</p>;
        return <p className="">{record.allocation}</p>;
      },
    },
    {
      key: "unlockon",
      text: "Unlock On",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record, i) => {
        return <p className="">{new Date(record.unlockon).toUTCString()}</p>;
      },
    },
    {
      key: "Action",
      text: "Action",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record, i) => {
        return (
          <button
            className="tk_tab_btn"
            disabled={!record.isClaimed}
            onClick={() => {
              claimb();
            }}
          >
            {" "}
            {record.isDid ? "Claimed" : "Claim"}{" "}
          </button>
        );
      },
    },
  ];
  let columns1 = [
    {
      key: "sno",
      text: "S.No",
      width: 180,
      className: "table_p w230",
      align: "center",
      sortable: false,
      cell: (record, i) => {
        return <p className="">{i + 1}</p>;
      },
    },
    {
      key: "label",
      text: "Name",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false
    },

    {
      key: "Action",
      text: "Action",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record, i) => {
        return (
          <>
            {
              LaunchData?.launchStatus != 'Active' && LaunchData?.status != 'stop' && LaunchData?.status == 'finalize' ?
                "" :
                <button
                  className="delete_button"
                  onClick={() => { RemoveWhiteList(record.value) }}
                >
                  Remove
                </button>
            }
          </>
        );
      },
    },
  ];
  const handleEditDescClose = () => {
    setEditDesc(false);
  };
  const handleShowUserDeposit = () => {
    setUserDeposit(true);
  };
  const handleCloseUserDeposit = () => {
    setError({});
    setAmount(0);
    setUserDeposit(false);
  };

  const userContribute = async (saleId) => {
    try {
      const { status, result } = await launchpadUserContribution(saleId, getUser.secretKey);
      console.log("userContribute_saleInfo", result, status);
      if (status) {
        setUserContribution(result);
      }
    } catch (e) {
      console.log("userContribute_err", e);
    }
  };

  const userPartispate = async () => {
    try {
      let error = {};
      if (amount <= 0) {
        error.amount = "*Amount is required";
      }
      if (amount > 0 && amount > LaunchData.maximum) {
        error.amount = "*Amount is greater than maximum amount";
      }
      if (amount > 0 && amount < LaunchData.minimum) {
        error.amount = "*Amount is lesser than minimum amount";
      }
      if (amount > asset?.balance) {
        error.amount = "*Insufficient balance";
      }

      if (Object.keys(error).length == 0) {
        let payload = {
          amount: amount,
          saleId: LaunchData._id,
          userId: getUser.userId,
        };
        const { status, message, errors } = await launchpadUserpurchase(payload, getUser.secretKey);
        console.log("userPartispate_getData", status);
        if (status) {
          setAsset({ ...asset, ...{ balance: parseFloat(asset.balance) - parseFloat(amount) } })
          handleCloseUserDeposit();
          userContribute(id);
          toast.success(message);

          // showToastMessage(getData?.data?.message, "success");
        } else {
          // showToastMessage(getData?.error?.message, "error");
          toast.error(message)
        }
      } else {
        setError(error);
      }
    } catch (e) {
      console.log("userPartispate_err", e);
    }
  };

  const saleFinalise = async () => {
    try {
      const { status, message } = await launchpadSaleFinalise(LaunchData?._id, getUser.secretKeu);
      console.log("finalize_data", status, message);
      if (status) {
        fetchLaunchpadDetails(id);
        toast.success(message)
        // showToastMessage(finalize?.data?.message, "success");
      } else {
        toast.error(message)
        // showToastMessage(finalize?.error?.message, "error");
      }
    } catch (e) {
      console.log("launchpadSaleFinalise_err", e);
    }
  };

  const claimb = async () => {
    try {
      const { status, message, error } = await launchpadRewardClaimb(LaunchData?._id, getUser.secretKey);
      console.log("getClaimb_getClaimb", status);
      if (status) {
        fetchLaunchpadDetails(id);
        userContribute(id);
        toast.success(message)
        // showToastMessage(getClaimb?.data?.message, "success");
      } else {
        fetchLaunchpadDetails(id);
        userContribute(id);
        toast.error(message)
        // showToastMessage(getClaimb?.error.message, "error");
      }
    } catch (e) {
      console.log("claimb_err", e);
    }
  };
  const userStakeCoinAsset = () => {
    try {
      if (!isEmpty(userAsset)) {
        const data =
          userAsset &&
          userAsset.assets.filter(
            (el) => el.currencySymbol == LaunchData?.currency
          );
        console.log("userStakeCoinAsset_data", data, LaunchData?.currency);
        setAsset(data[0]);
      }
    } catch (e) {
      console.log("userStakeCoinAsset_err", e);
    }
  };

  const fetchLaunchpadDetails = async (id) => {
    try {
      let { status, result, message } = await getLaunchpadDetails(id);
      if (status) {
        const time = new Date().getTime();
        let launchStatus =
          time > result.startTime && time < result.endTime
            ? "Active"
            : time < result.startTime && time < result.endTime
              ? "Upcoming"
              : "Closed";
        result["launchStatus"] = launchStatus;
        setLaunchData(result);
      } else {
        setLaunchData({});
      }
    } catch (err) {
      console.log(err, "fetchLaunchpadDetails__Err");
    }
  };

  const handlePagination = async (index) => {
    setPage(index.page_number);
    setLimit(index.page_number * index.page_size);
    let skip = (index.page_number - 1) * limit
    let Limit = index.page_number * index.page_size
    let arr = [...totalAllocation]
    console.log(arr, arr.slice(skip, Limit), 'handlePagination', skip, limit, index.page_number)
    setAllocation(arr.slice(skip, Limit))
    // let reqData = {
    //   limit: index.page_size,
    //   page: index.page_number,
    //   search: search,
    // };
    // FetchPairList(reqData);
  };

  const RemoveWhiteList = async (whitelistId) => {
    try {
      let { status, message } = await RemoveWhiteListuser({ saleId: id, whitelistUserId: whitelistId }, getUser.secretKey);
      if (status) {
        toast.success(message)
        fetchLaunchpadDetails(id);
      } else {
        toast.error(message)
      }
    } catch (e) {
      console.log(e, 'RemoveWhiteList__err')
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isEmpty(state?.launchData)) {
      setLaunchData(state?.launchData);
    }
  }, [state]);

  useEffect(() => {
    if (!isEmpty(LaunchData)) {
      if (LaunchData.theme == '1') {
        navigate(`/launchPadDetail/rubby/${LaunchData.tokenSymbol}/${LaunchData._id}`)
      }
      else if (LaunchData.theme == '2') {
        console.log("Change")
        navigate(`/launchPadDetail/emerald/${LaunchData.tokenSymbol}/${LaunchData._id}`)
      }
    }
  }, [LaunchData])

  useEffect(() => {
    if (!isEmpty(LaunchData) && !isEmpty(getUser) && id != 'perview') {
      userContribute(id);
      userStakeCoinAsset();
    }

  }, [LaunchData, getUser])

  useEffect(() => {
    if (!isEmpty(id) && id != "perview") {
      fetchLaunchpadDetails(id);
    }
    // if (!isEmpty(id) && !isEmpty(getUser) && id != "perview") {
    //   userContribute(id, getUser?.userId);
    //   userStakeCoinAsset();
    // }
  }, [id, getUser, WhiteShow]);

  useEffect(() => {
    if (LaunchData?.isVesting != "disable" && LaunchData?.status == "finalize" && userContribution?.actualRewardOfLaunch > 0) {
      const getData = getAllocationInfo(
        userContribution?.actualRewardOfLaunch,
        userContribution?.userRewardOfLaunch,
        LaunchData?.vestingPeriod,
        LaunchData?.vestingPercentage,
        userContribution?.initalClaimed
      );
      settotalAllocation(getData)
      let arr = [...getData]
      console.log(getData, 'useEffect__getData')
      let skip = (page - 1) * limit
      setAllocation(arr.slice(skip, limit));
    }
  }, [LaunchData, userContribution])
  console.log(state, "Template", LaunchData);
  return (
    <div>
      <div>
        <AddWhiteUser
          confirmShow={WhiteShow}
          handleClose={() => { setWhiteShow(false) }}
          saleId={id}
        />
        <Modal
          centered
          size="md"
          backdrop="static"
          show={userDeposit}
          // show={true}

          onHide={handleCloseUserDeposit}
          className="custom_modal"
        >
          <button
            className="d-flex align-items-center justify-content-center modal_close_button"
            onClick={handleCloseUserDeposit}
          >
            <IoClose />
          </button>
          <Modal.Header closeButton>
            <h5 className="mb-0 model_head_grad">
              Buy {LaunchData?.tokenName}
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="">
              <div className="mt-2 d-flex flex-column">
                {/* <label className="label_orange">
                  Token Address
                </label> */}
                <input
                  type="number"
                  placeholder="Amount"
                  className="trade_value_input_wrap border-0 outline-0 w-100 mt-2"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <div
                  className={`d-flex flex-wrap gap-2 align-items-center mt-3 ${amount > 0
                    ? "justify-content-between"
                    : "justify-content-end"
                    }`}
                >
                  {!isEmpty(amount) && amount > 0 && (
                    <p className="white_text_xs ">{`${amount} ${LaunchData?.currency
                      // } : ${parseFloat(amount) * parseFloat(LaunchData?.presaleRate)
                      } : ${toFixedNumber(parseFloat(amount) * parseFloat(LaunchData?.presaleRate))}
                      ${LaunchData?.tokenSymbol}`}</p>
                  )}

                  <p className="green_text_xs ">
                    Balance : {asset?.balance} {LaunchData?.currency}
                  </p>
                </div>
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.amount}
                </span>
                <div className="row mt-4">
                  <div className="col-12 col-sm-5 ">
                    <p className=" label_gray ">Token Address </p>
                  </div>
                  <div className="col-12 col-sm-7 mt-2 mt-sm-0 d-flex align-items-center gap-2">
                    <p className="white_text_sm">
                      {/* {LaunchData?.contractAddress?.substring(0, 25)}.... */}
                      {
                        LaunchData?.contractAddress?.slice(0, Math.floor(LaunchData?.contractAddress?.length / 4 - 4)) + '...' + LaunchData?.contractAddress?.slice(15, Math?.floor(LaunchData?.contractAddress?.length / 2))
                      }
                    </p>
                    <button className="border-0 outline-0 bg-transparent p-0">
                      <CopyToClipboard
                        text={LaunchData?.contractAddress}
                        onCopy={() => showToastMessage("Address copied !", "success")}
                      >
                        <img src={copyIcon} style={{ width: "15px" }} />
                      </CopyToClipboard>

                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-sm-5 ">
                    <p className="label_gray">Status</p>
                  </div>
                  <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                    <p className="white_text_sm">
                      {LaunchData?.launchStatus}{" "}
                      <img
                        src={Images.activeicon}
                        className="img-fluid"
                        alt="active"
                        style={{ width: "12px" }}
                      />
                    </p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-sm-5">
                    <p className="label_gray">Minimum Buy</p>
                  </div>
                  <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                    <p className="white_text_sm">{`${LaunchData?.minimum} ${LaunchData?.currency}`}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-sm-5">
                    <p className="label_gray">Maximum Buy</p>
                  </div>
                  <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                    <p className="white_text_sm">{`${LaunchData?.maximum} ${LaunchData?.currency}`}</p>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12 col-sm-5">
                    <p className="label_gray">Your Purchased</p>
                  </div>
                  <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                    <p className="white_text_sm">{`${userContribution?.userSaleOfLaunch
                      ? userContribution?.userSaleOfLaunch
                      : 0
                      } ${LaunchData?.currency}`}</p>
                  </div>
                </div>

                {/* <input className="trade_value_input_wrap border-0 outline-0 w-100 mt-2" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} /> */}
                {/* <span className="text-danger f-12 d-block text-left mt-2">
           error
              </span> */}
              </div>
              {/* <input className="trade_value_input_wrap border-0 outline-0 w-100" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} /> */}
              {/* <span className="text-danger f-12 d-block text-left mt-2">
                {errors?.amount}
              </span> */}
              <div>
                <button
                  className="grad_btn grad_btn2 mt-5"
                  onClick={userPartispate}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Header props={props} />
      <section className="custom_section">
        <div className="template_banner_bg">
          <div className="container container90 py-3 py-lg-5">
            <div className="template_image_wraper_lg">
              {/* {console.log("LaunchData.bannerurlLaunchData.bannerurl", LaunchData)} */}
              <img
                src={LaunchData.bannerurl}
                alt="template"
                className="img_fit_container"
              />
            </div>
            <div className="temp_profile d-flex flex-column align-items-center ">
              <div className="temp_pfl_img_wrp">
                <img
                  src={
                    typeof LaunchData.logoUrl == "object"
                      ? URL.createObjectURL(LaunchData.logoUrl)
                      : LaunchData.logoUrl
                  }
                  alt="profile"
                  className="img_fit_container"
                />
              </div>
              <div className="mt_less">
                <h5 className="h5_text_lg text-center">
                  {LaunchData.tokenName} ({LaunchData.tokenSymbol})
                </h5>
                {/* <div className="d-flex align-items-center justify-content-center gap-2 temp_id ">
                  <p className="gray_text_xs">8xvghyt67hghlopqw32iok8</p>
                  <button className="border-0 outline-0 bg-transparent">
                    <MdContentCopy fontSize={18} />
                  </button>
                </div> */}
                <div className="footer__socialLinksHolder templates d-flex align-items-center justify-content-center gap-2 my-1">
                  <a
                    className="footer_social"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <img src={Images.facebook} className="img-fluid" />
                  </a>

                  <a
                    className="footer_social"
                    href="https://twitter.com"
                    target="_blank"
                  >
                    <img src={Images.x} className="img-fluid" />
                  </a>
                  <a
                    className="footer_social"
                    href="https://youtube.com"
                    target="_blank"
                  >
                    <img src={Images.youtube} className="img-fluid" />
                  </a>

                </div>
                <div className="d-flex justify-content-center gap-3 flex-wrap">

                  {
                    (LaunchData.launchStatus == 'Upcoming' && LaunchData.status != 'stop') || (id == 'perview') ?
                      <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                        Upcoming
                      </button> :
                      LaunchData?.userId == getUser?.userId ?
                        LaunchData.launchStatus == 'Active' && LaunchData.status != 'stop' ?
                          <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                            Sale In Live
                          </button> :
                          LaunchData.launchStatus != 'Active' && LaunchData.status != 'stop' && LaunchData.status != 'finalize' ?
                            <button
                              className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                              onClick={() => { saleFinalise() }}
                            >
                              Sale Finalize
                            </button> :
                            LaunchData.launchStatus != 'Active' && LaunchData.status != 'stop' && LaunchData.status == 'finalize' ?
                              <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3" disabled={true}>
                                Sale Finalized
                              </button>
                              :
                              <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                                Closed
                              </button>
                        : LaunchData?.userId != getUser?.userId ?
                          LaunchData.launchStatus == 'Active' && LaunchData.status == 'start' ?
                            <button
                              className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                              onClick={() => {
                                handleShowUserDeposit()
                              }}
                              disabled={id == 'perview' ? true : false}
                            >
                              Buy
                            </button> :
                            LaunchData.launchStatus != 'Active' && LaunchData.status == 'start' ?
                              <button
                                className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                                disabled={true}
                              >
                                Sale End
                              </button> :
                              LaunchData?.status == "finalize" &&
                                LaunchData?.saleStatus == "success" &&
                                userContribution?.userRewardOfLaunch > 0 ?
                                <button
                                  className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                                  onClick={() => {
                                    claimb()
                                  }}
                                >
                                  Claim {LaunchData?.tokenSymbol}
                                </button> :
                                (LaunchData?.status == "finalize" || LaunchData?.status == "stop") &&
                                  LaunchData?.saleStatus == "failure" &&
                                  userContribution?.userContribute > 0 ?
                                  <button
                                    className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                                    onClick={() => {
                                      claimb()
                                    }}
                                  >
                                    Claim {LaunchData.currency}
                                  </button> :
                                  userContribution?.userContribute > 0 ?
                                    <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                                      Claimed
                                    </button> : <></>
                          :
                          <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                            {LaunchData.launchStatus}
                          </button>
                  }
                  {LaunchData?.userId == getUser?.userId &&
                    LaunchData?.whitelistSale == 'enable' &&
                    (LaunchData?.launchStatus == 'Active' || LaunchData?.launchStatus == 'Upcoming')
                    ?
                    <button
                      className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3 ms-2"
                      onClick={() => {
                        setWhiteShow(true)
                      }}
                    >
                      Add Whitelist user
                    </button>
                    : ""}

                  {
                    LaunchData?.userId != getUser?.userId && getUser?.userRole?.toLowerCase() == ('Jury').toLowerCase() &&
                    <div onClick={scrollToSection}>
                      <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3" >Add Comments</button>
                    </div>
                  }

                  {/* {LaunchData?.userId == getUser?.userId &&
                    LaunchData?.launchStatus == "Active" &&
                    LaunchData?.status != "stop" ? (
                    <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                      Sale In Live
                    </button>
                  ) : LaunchData?.userId == getUser?.userId &&
                    LaunchData?.status != "stop" &&
                    LaunchData?.launchStatus != "Active" ? (
                    <button
                      className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                      onClick={() => {
                        saleFinalise();
                      }}
                    >
                      Sale Finalize
                    </button>
                  ) : LaunchData?.userId != getUser?.userId ? (
                    LaunchData?.status != "finalize" &&
                      LaunchData?.status != "stop" ? (
                      <button
                        className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                        onClick={() => {
                          handleShowUserDeposit();
                        }}
                        disabled={id == "perview" ? true : false}
                      >
                        Buy
                      </button>
                    ) :
                      LaunchData?.status != "finalize" && LaunchData?.status != "stop" && LaunchData?.launchStatus == "Closed" ?
                        <button
                          className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                          disabled={true}
                        >
                          Sale stop
                        </button> :
                        LaunchData?.status == "finalize" &&
                          LaunchData?.saleStatus == "success" &&
                          userContribution?.userSaleOfLaunch > 0 ? (
                          <button
                            className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                            onClick={() => {
                              claimb();
                            }}
                          >
                            Claim {LaunchData?.tokenSymbol}
                          </button>
                        ) : LaunchData?.status == "finalize" &&
                          LaunchData?.saleStatus == "failure" &&
                          userContribution?.userContribute > 0 ? (
                          <button
                            className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                            onClick={() => {
                              claimb();
                            }}
                          >
                            Claim
                          </button>
                        ) : LaunchData?.status == "stop" &&
                          userContribution?.userContribute > 0 ? (
                          <button
                            className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3"
                            onClick={() => {
                              claimb();
                            }}
                          >
                            Claim
                          </button>
                        ) : (
                          <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                            Claimed
                          </button>
                        )
                  ) : (
                    <button className="home__gradClipBtn pad_les_btn2 text-decoration-none mt-3">
                      Closed
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container container90 py-5">
          {/* start of web */}
          <div className="d-none d-lg-block">
            <div className="row continue_card_bg ">
              <div className="col-3 d-flex align-items-center justify-content-center period_card ">
                Sale Period
              </div>
              <div className="col-3 d-flex align-items-center justify-content-center period_card ">
                Status
              </div>{" "}
              <div className="col-3 d-flex align-items-center justify-content-center period_card">
                Sale Finalize
              </div>
              <div className="col-3 d-flex align-items-center justify-content-center period_card ">
                Sale Completion Status
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-3 d-flex flex-column align-items-center">
                <div>
                  <img
                    src={Images.verticalViolet}
                    alt="line"
                    className="img-fluid"
                  />
                </div>

                <div className="light_cards violet py-3 px-4 mt-2">
                  {LaunchData?.launchStatus == "Active" || LaunchData.launchStatus == 'Closed' ? (
                    <>
                      <p>{new Date(LaunchData?.startTime).toLocaleDateString()}</p>
                      <p> - {new Date(LaunchData?.endTime).toLocaleDateString()}</p>
                    </>
                  ) : (
                    <p>Upcoming</p>
                  )}
                </div>
              </div>
              <div className="col-3 d-flex flex-column align-items-center">
                <div>
                  <img
                    src={Images.verticalOrange}
                    alt="line"
                    className="img-fluid"
                  />
                </div>

                <div className="light_cards orange py-3 px-4 mt-2">
                  <p>
                    {LaunchData?.status == "stop"
                      ? "Sale has been stopped."
                      : LaunchData?.launchStatus == "Active"
                        ? "Sale is Live"
                        : LaunchData?.status == "finalize"
                          ? "Sale has been finalized."
                          :
                          LaunchData?.launchStatus == "Closed" ?
                            "Sale has been end."
                            : "Upcoming"}
                  </p>
                </div>
              </div>{" "}
              <div className="col-3 d-flex flex-column align-items-center">
                <div>
                  <img
                    src={Images.verticalRed}
                    alt="line"
                    className="img-fluid"
                  />
                </div>

                <div className="light_cards red py-3 px-4 mt-2">
                  <p>
                    {LaunchData?.status == "stop"
                      ? "--"
                      : LaunchData?.status == "finalize"
                        ? "Finalize"
                        : "Upcoming..."}
                  </p>
                </div>
              </div>{" "}
              <div className="col-3 d-flex flex-column align-items-center">
                <div>
                  <img
                    src={Images.verticalBlue}
                    alt="line"
                    className="img-fluid"
                  />
                </div>

                <div className="light_cards blue py-3 px-4 mt-2">
                  <p>
                    {!isEmpty(LaunchData?.saleStatus) &&
                      LaunchData?.saleStatus != ""
                      ? LaunchData?.saleStatus
                      : "Upcoming..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* start of web */}
          {/* start of mobile */}
          <div className="d-lg-none">
            <div className="mb-5 d-flex flex-column align-items-center ">
              <p className="period_card"> Sale Period</p>
              <div className="mt-2">
                <img
                  src={Images.verticalViolet}
                  alt="line"
                  className="img-fluid"
                />
              </div>
              <div className="light_cards violet py-3 px-4 mt-2">
                {LaunchData?.launchStatus == "Active" || LaunchData.launchStatus == 'Closed' ? (
                  <>
                    <p>{new Date(LaunchData?.startTime).toLocaleDateString()}</p>
                    <p className="mt-1">
                      {" "}
                      - {new Date(LaunchData?.endTime).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <p>Upcoming</p>
                )}
              </div>
            </div>
            <div className="mb-5 d-flex flex-column align-items-center ">
              <p className="period_card"> Status</p>
              <div className="mt-2">
                <img
                  src={Images.verticalOrange}
                  alt="line"
                  className="img-fluid"
                />
              </div>
              <div className="light_cards orange py-3 px-4 mt-2">
                <p>
                  {LaunchData?.status == "stop"
                    ? "Sale has been stopped."
                    : LaunchData?.launchStatus == "Active"
                      ? "Sale is Live"
                      : LaunchData?.status == "finalize"
                        ? "Sale has been finalized."
                        : LaunchData?.launchStatus == "Closed" ?
                          "Sale has been end."
                          : "Upcoming"}
                </p>
              </div>
            </div>{" "}
            <div className="mb-5 d-flex flex-column align-items-center ">
              <p className="period_card"> Sale Finalize</p>
              <div className="mt-2">
                <img
                  src={Images.verticalRed}
                  alt="line"
                  className="img-fluid"
                />
              </div>
              <div className="light_cards red py-3 px-4 mt-2">
                <p>
                  {LaunchData?.status == "stop"
                    ? "--"
                    : LaunchData?.status == "finalize"
                      ? "Finalize"
                      : "Upcoming..."}
                </p>
                {/* <p> - 2022-08-31 10:30:00</p> */}
              </div>
            </div>{" "}
            <div className="mb-5 d-flex flex-column align-items-center ">
              <p className="period_card"> Sale Completion Status</p>
              <div className="mt-2">
                <img
                  src={Images.verticalBlue}
                  alt="line"
                  className="img-fluid"
                />
              </div>
              <div className="light_cards blue py-3 px-4 mt-2">
                <p>
                  {!isEmpty(LaunchData?.saleStatus) &&
                    LaunchData?.saleStatus != ""
                    ? LaunchData?.saleStatus
                    : "Upcoming..."}
                </p>
                {/* <p> - 2022-08-31 10:30:00</p> */}
              </div>
            </div>
          </div>
          {/* end of mobile */}
          <div className="template_card mt_6rem">
            <div className="template_card_header d-flex align-items-center gap-4 p-3 p-md-4">
              <div className="subs_img_wrap">
                <img
                  src={
                    typeof LaunchData.logoUrl == "object"
                      ? URL.createObjectURL(LaunchData.logoUrl)
                      : LaunchData.logoUrl
                  }
                  alt="coin"
                  className="img_fit_container"
                />
              </div>
              <h5 className="h5_text_lg mb-0">Launchpad Details</h5>
            </div>
            <div className="template_card_body ld_subs_card p-3 p-md-4 py-xl-5">
              <div className="row">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Start Time
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {momentFormat(LaunchData?.startTime)}
                      {/* {new Date(LaunchData?.startTime).toLocaleDateString()} */}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      End Time
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {momentFormat(LaunchData?.endTime)}
                      {/* {new Date(LaunchData?.endTime).toLocaleDateString()} */}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0  d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Softcap
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.softCap} {LaunchData?.currency}{" "}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  {/* <div> */}
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      HardCap
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {LaunchData?.hardCap} {LaunchData?.currency}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Vesting Claim
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {/* {LaunchData?.isVesting ? "ENABLE" : "DISABLE"} */}
                      {LaunchData?.isVesting?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Listing
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData.listingOptions}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0  d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Listing price
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData.listingPrice}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Token Address
                    </p>

                    <div className="d-flex align-items-center gap-2 mt-2">


                      <p className="sub_crd_cnt  text-center ">
                        {/* {LaunchData?.contractAddress?.substring(0, 25)}.... */}
                        {
                          LaunchData?.contractAddress?.slice(0, Math.floor(LaunchData?.contractAddress?.length / 4 - 4)) + '...' + LaunchData?.contractAddress?.slice(18, Math?.floor(LaunchData?.contractAddress?.length / 2))
                        }

                      </p>
                      <button className="border-0 outline-0 bg-transparent p-0">
                        <CopyToClipboard
                          text={LaunchData?.contractAddress}
                          onCopy={() => showToastMessage("Address copied !", "success")}
                        >
                          <img src={copyIcon} style={{ width: "15px" }} />
                        </CopyToClipboard>

                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mt-4">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center ">
                      Access Type
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.whitelistSale ? "Public" : "Private"}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center ">
                      Status
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {isEmpty(LaunchData?.status)
                        ? "Upcoming"
                        : LaunchData?.status == "stop"
                          ? "Stop"
                          : LaunchData?.launchStatus}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center ">
                      Minimum Buy
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">{`${LaunchData?.minimum} ${LaunchData?.currency}`}</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center ">
                      Maximum Buy
                    </p>
                    <p className="sub_crd_cnt mt-2  text-center">{`${LaunchData?.maximum} ${LaunchData?.currency}`}</p>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                {id == "perview" ? (
                  ""
                ) : LaunchData?.userId != getUser?.userId ? (
                  <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                    <div>
                      <p className="desc sub_desc text-nowrap text-center">
                        Your Purchased
                      </p>
                      <p className="sub_crd_cnt mt-2 text-center">
                        {userContribution?.userSaleOfLaunch
                          ? userContribution?.userSaleOfLaunch
                          : 0}{" "}
                        {LaunchData?.currency}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <div>
                      <p className="desc sub_desc text-nowrap text-center">
                        Sale Contribution
                      </p>
                      <p className="sub_crd_cnt mt-2 text-center">
                        {userContribution?.totalSaleOfLaunch
                          ? userContribution?.totalSaleOfLaunch
                          : 0}{" "}
                        {LaunchData?.currency}
                      </p>
                    </div>
                  </div>
                )}
                {id == "perview"
                  ? ""
                  : LaunchData?.userId != getUser?.userId && (
                    <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                      <div>
                        <p className="desc sub_desc text-nowrap text-center">
                          Your Reward
                        </p>
                        <p className="sub_crd_cnt mt-2 text-center">
                          {userContribution?.actualRewardOfLaunch
                            ? userContribution?.actualRewardOfLaunch
                            : 0}{" "}
                          {LaunchData?.tokenSymbol}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {/* <div className="my-5">
            <h5 className="h5_text_lg mb-4">key Highlight :</h5>
            <div className="row mt-5">
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh1}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">1,000,000,000 TKB</h5>
                  <p className="sub_crd_cnt mt-2">Max Supply</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh2}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">
                    3.01% of Total Token Supply
                  </h5>
                  <p className="sub_crd_cnt mt-2">Initial Circulating Supply</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh3}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">1 TKB = 0.005 USDT</h5>
                  <p className="sub_crd_cnt mt-2">Price (USDT Subscription)</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh4}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">
                    3.01% of Total Token Supply
                  </h5>
                  <p className="sub_crd_cnt mt-2">Launchpad Allocation</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh5}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">10,000 TKB</h5>
                  <p className="sub_crd_cnt mt-2">Max Individual Allocation</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh6}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">No lockup</h5>
                  <p className="sub_crd_cnt mt-2">Token Vesting Period</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh7}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">Token Type</h5>
                  <p className="sub_crd_cnt mt-2">ERC20</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-4">
                <div className="corner_card p-4">
                  <img
                    src={Images.kh8}
                    alt="coin"
                    className="img-fluid img_w_80 mb-5"
                  />
                  <h5 className="h5_text_lg mb-4">
                    After the end of allocation period
                  </h5>
                  <p className="sub_crd_cnt mt-2">Token Distribution</p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="py-5">
            <h5 className="h5_text_lg mb-4">key Highlight :</h5>
            <div className="template_card ld_subs_card grad_bg p-3 p-md-4 py-xl-5 mt_40">
              <div className="row">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Max Supply
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.hardCap} {LaunchData?.tokenSymbol}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                  <div>
                    <p className="desc sub_desc  text-center ">
                      Price ({LaunchData?.tokenSymbol} Subscription)
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {`1 ${LaunchData?.currency} = ${LaunchData?.presaleRate} ${LaunchData?.tokenSymbol}`}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc  text-center ">
                      Launchpad Allocation ({LaunchData?.tokenSymbol} Sub.){" "}
                    </p>
                    <p className="sub_crd_cnt mt-2  text-center">
                      {LaunchData?.hardCap * LaunchData?.presaleRate}{" "}
                      {LaunchData?.tokenSymbol}
                    </p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Token
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.tokenName}
                    </p>
                  </div>
                </div>{" "}
                {/* <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Vesting Period</p>
                    <p className="sub_crd_cnt mt-2">10,000 TKB</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">
                      Max Individual Allocation (USDT Sub.)
                    </p>
                    <p className="sub_crd_cnt mt-2">No lockup</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Type</p>
                    <p className="sub_crd_cnt mt-2">ERC20</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Distribution</p>
                    <p className="sub_crd_cnt mt-2">
                      After the end of allocation period
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="row mt-4">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">
                      Token Vesting Period{" "}
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.isVesting?.toLowerCase() == "enable"
                        ? LaunchData?.vestingPeriod + " " + "days"
                        : "No lockup"}
                    </p>
                  </div>
                </div>{" "}
                {/* <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Vesting Period</p>
                    <p className="sub_crd_cnt mt-2">10,000 TKB</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">
                      Max Individual Allocation (USDT Sub.)
                    </p>
                    <p className="sub_crd_cnt mt-2">No lockup</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Type</p>
                    <p className="sub_crd_cnt mt-2">ERC20</p>
                  </div>
                </div>{" "}
                <div className="col-12 col-sm-6 col-lg-3 mt-4">
                  <div>
                    <p className="desc sub_desc ">Token Distribution</p>
                    <p className="sub_crd_cnt mt-2">
                      After the end of allocation period
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>{" "}
          {LaunchData?.userId != getUser?.userId ? (
            LaunchData?.status == "finalize" && LaunchData?.isVesting?.toLowerCase() == ('enable').toLowerCase() &&
            LaunchData?.saleStatus != "failure" && (
              <div className="project_desc margin_top">
                <h5 className="grad_title mb-4">Allocation</h5>
                <div className="custom_table ref_custom_table orange_theme">
                  {" "}
                  <ReactDatatable
                    config={config}
                    records={allocation}
                    columns={columns}
                    dynamic={true}
                    total_record={totalAllocation.length}
                    onChange={(e) => {
                      handlePagination(e);
                    }}
                  />
                </div>
              </div>
            )
          ) : (
            <></>
          )}
          <div className="row py-5 ">
            <div className="col-12 col-lg-6 pe-xl-4">
              <div className="template_card grad_bg p-3 p-sm-4 cms_content_div blog_div ">
                <h5 className="fw_700">
                  {!isEmpty(LaunchData?.contentOneTitle)
                    ? LaunchData?.contentOneTitle
                    : "Lorem ipsum dolor sit amet"}
                </h5>
                {LaunchData?.contentOne?.length > 0 ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: LaunchData?.contentOne }}
                  ></div>
                ) : (
                  <>
                    <p className="desc sub_desc mt-4">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita
                    </p>
                  </>
                )}

                <div className="d-flex justify-content-center mt-4">
                  <img
                    src={
                      typeof LaunchData.contentOneImg == "object"
                        ? URL.createObjectURL(LaunchData.contentOneImg)
                        : typeof LaunchData.contentOneImg == "string"
                          ? LaunchData.contentOneImg
                          : Images.templatetwo
                    }
                    // src={Images.templatetwo}
                    alt="template"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>{" "}
            <div className="col-12 col-lg-6 mt-5 mt-lg-0 ps-xl-4">
              <div className="template_card grad_bg p-3 p-sm-4 cms_content_div blog_div ">
                <h5 className="fw_700">
                  {!isEmpty(LaunchData?.contentTwoTitle)
                    ? LaunchData?.contentTwoTitle
                    : "Lorem ipsum dolor sit amet"}
                </h5>
                {LaunchData?.contentTwo?.length > 0 ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: LaunchData?.contentTwo }}
                  ></div>
                ) : (
                  <>
                    <p className="desc sub_desc mt-4">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet clita
                    </p>
                  </>
                )}
                <div className="d-flex justify-content-center mt-4">
                  <img
                    src={
                      typeof LaunchData.contentTwoImg == "object"
                        ? URL.createObjectURL(LaunchData.contentTwoImg)
                        : typeof LaunchData.contentTwoImg == "string"
                          ? LaunchData.contentTwoImg
                          : Images.templatethree
                    }
                    alt="template"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="h5_text_lg mb-4">Product Description :</h5>
              {/* <button className="border-0 outline-0 bg-transparent mb-4">
                {" "}
                Edit
              </button> */}
            </div>
            <div className="template_card grad_bg p-3 cms_content_div">
              {LaunchData?.description?.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: LaunchData?.description }}
                ></div>
              ) : (
                ""
              )}
              {/* <p className="desc sub_desc ">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet
              </p> */}
            </div>
          </div>{" "}
          <div className="py-5">
            <h5 className="h5_text_lg mb-4">Terms and Conditions :</h5>
            <div className="template_card grad_bg p-3 cms_content_div">
              {LaunchData?.terms?.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: LaunchData?.terms }}
                ></div>
              ) : (
                ""
              )}
              {/* <p className="desc sub_desc ">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet
              </p> */}
            </div>
          </div>
        </div>

        {
          LaunchData?.userId == getUser?.userId && LaunchData?.whitelistSale == 'enable' &&

          <div className="terms_cond margin_top">
            <h5 className="grad_title mb-4">Whitelist Users</h5>
            <div className="custom_table ref_custom_table">
              {" "}
              <ReactDatatable
                config={config}
                records={LaunchData?.whitelistUser}
                columns={columns1}
                dynamic={true}
                // total_record={userTokenCount}
                onChange={(e) => {
                  LoadMoreToken(e);
                }}
              />
            </div>
          </div>
        }

        <div className="d-flex align-items-center justify-content-center mt-4">
          <button
            className="grad_btn grad_btn2"
            onClick={() => {
              if (id != "perview") {
                navigate('/launchpad')
              } else {
                navigate('/createLaunchpad')
              }
            }}>
            Back</button></div>
        <div>
          {
            id != "perview" && <Jurylist ref={childSectionRef} launchpadId={id} />
          }

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Template2;
