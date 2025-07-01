import React, { useEffect, useState, useRef } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Images } from "../data/Images";
import { TbMathGreater } from "react-icons/tb";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import EditDescription from "../modal/EditDescription";
import { data } from "../data/data";
import UserDeposit from "../modal/UserDeposit";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import isEmpty from "is-empty";
import ReactDatatable from "@ashvin27/react-datatable";
import LaunchpadFooter from "../Layout/LaunchpadFooter";
import copyIcon from '../asset/images/greencopy.svg'
import { CopyToClipboard } from "react-copy-to-clipboard";

/** Actions */
import {
  getLaunchpadDetails,
  launchpadSaleFinalise,
  launchpadStopsale,
  launchpadUserpurchase,
  launchpadList,
  launchpadRewardClaimb,
  launchpadUserContribution,
  RemoveWhiteListuser,
} from "../actions/launchpadAction";
/** Redux */
import { launchpadLists } from "../actions/launchpadReduxAction";
/** Config */
import { showToastMessage } from "../config/toast";
import { getAllocationInfo } from "../hooks/launchpadHooks";
import { toFixedNumber } from "../config/lib";
import toast from "react-hot-toast";
import AddWhiteUser from "../modal/AddWhiteListUser";
import Jurylist from "../components/Jurylist";
import { dateTimeFormat, momentFormat } from "../lib/dateTimeHelper";

const LaunchPadDetails = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, userAsset } = useSelector((state) => state.user);
  const [editDesc, setEditDesc] = useState(false);
  const [userDeposit, setUserDeposit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [errors, setError] = useState({});
  const [userContribution, setUserContribution] = useState({});
  const [asset, setAsset] = useState({});
  const [allocation, setAllocation] = useState([]);
  const [LaunchData, setLaunchData] = useState({});
  const [totalAllocation, settotalAllocation] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [WhiteShow, setWhiteShow] = useState(false)
  console.log("stateetee", LaunchData);
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

  console.log("LaunchPadDetails0", LaunchData);
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
          toast.success(message)
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
      const { status, message } = await launchpadSaleFinalise(LaunchData?._id, getUser.secretKey);
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
    setLimit(10);
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
    console.log(LaunchData?.isVesting, LaunchData?.status, userContribution?.actualRewardOfLaunch, 'Whitelist')
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
      let Limit = page * limit
      setAllocation(arr.slice(skip, Limit));
    }
  }, [userContribution])


  useEffect(() => {
    setTimeout(() => {
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
        let Limit = page * limit
        setAllocation(arr.slice(skip, Limit));
      }
    }, 1000)
  }, [totalAllocation])

  useEffect(() => {
    if (!isEmpty(state?.launchData)) {
      setLaunchData(state?.launchData);
    }
  }, [state]);

  useEffect(() => {
    if (!isEmpty(LaunchData)) {
      if (LaunchData.theme == "2") {
        navigate(
          `/launchPadDetail/emerald/${LaunchData.tokenSymbol}/${LaunchData._id}`
        );
      } else if (LaunchData.theme == "3") {
        navigate(
          `/launchPadDetail/sapphire/${LaunchData.tokenSymbol}/${LaunchData._id}`
        );
      }
    }
  }, [LaunchData]);

  useEffect(() => {
    if (!isEmpty(id) && id != "perview") {
      fetchLaunchpadDetails(id);
    }
  }, [id, getUser, WhiteShow]);

  useEffect(() => {
    if (!isEmpty(getUser) && id != 'perview') {
      userContribute(id);

    }
  }, [id, getUser])

  useEffect(() => {
    if (!isEmpty(LaunchData))
      userStakeCoinAsset();
  }, [LaunchData, userAsset])

  return (
    <div>
      {/* start of modal import */}
      <EditDescription
        editDesc={editDesc}
        handleEditDescClose={handleEditDescClose}
      />
      {/* <UserDeposit show={userDeposit} handleClose={handleCloseUserDeposit} setAmount={setAmount} userPartispate={userPartispate}/> */}
      {/* Deposit-Modeel start */}
      <div>
        <AddWhiteUser
          confirmShow={WhiteShow}
          handleClose={() => { setWhiteShow(false) }}
          saleId={id}
          data={getUser}
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
                      {/* {
                        LaunchData?.contractAddress?.slice(0, Math.floor(LaunchData?.contractAddress?.length / 3 - 4)) + '...' + LaunchData?.contractAddress?.slice(14, Math?.floor(LaunchData?.contractAddress?.length / 2))
                      } */}
                    </p>
                    <button className="border-0 outline-0 bg-transparent p-0 ">
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
                      {id == 'perview' ?
                        "Upcoming" :
                        isEmpty(LaunchData?.status)
                          ? "Upcoming"
                          : LaunchData?.status == "stop"
                            ? "Stop"
                            : LaunchData?.launchStatus}{""}
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
      {/* Deposit-Modeel start */}
      {/* end of modal import  */}
      <Header props={props} />
      <section className="custom_section ">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center gap-2">
            {/* <p className="d-flex align-items-center gap-2">
              Home Page <LiaGreaterThanSolid /> Launchpad
            </p> */}
            <Link to="/" className="d-flex align-items-center ">
              Home Page
            </Link>

            <LiaGreaterThanSolid />
            <Link to="/launchpad">Launchpad</Link>
            <LiaGreaterThanSolid />
            {/* <Link to="/launchpaddetails">Launchpad details</Link> */}
            <p>{LaunchData?.tokenName}</p>
          </div>
          <h5 className="grad_title mt-5 mb-4">{LaunchData?.tokenName}</h5>
          <div className="row mb-3">
            <div className="col-12 col-sm-4 col-xl-3 d-flex align-items-center ">
              <div>
                <div className="tk_card_img_wrp ld_tk_card_img_wrp">
                  <img
                    src={
                      typeof LaunchData.logoUrl == "object"
                        ? URL.createObjectURL(LaunchData.logoUrl)
                        : LaunchData.logoUrl
                    }
                    alt="space"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-8 col-xl-9 d-flex align-items-center  mt-4 mt-sm-0 ps-xxl-4">
              <div>
                <p className="white_bold_sm">{LaunchData?.tokenName}</p>

                <p className="desc sub_desc  py-3  ">
                  {LaunchData?.description?.length > 0 ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: LaunchData?.description,
                      }}
                    ></div>
                  ) : (
                    ""
                  )}
                </p>
                {/* <div className="d-flex justify-content-end mb-3">
                  <button
                    className=" edit_btn d-flex align-items-center justify-content-center"
                    onClick={handleEditDescShow}
                  >
                    <MdEdit />
                  </button>
                </div> */}
                <div className="footer__socialLinksHolder d-flex justify-content-start  align-items-center gap-3">

                  <a
                    className="footer_social"
                    href={LaunchData?.facebook}
                    target="_blank"
                  >
                    <img src={Images.facebook} className="img-fluid" />
                  </a>

                  <a
                    className="footer_social"
                    href={LaunchData?.twitter}
                    target="_blank"
                  >
                    <img src={Images.x} className="img-fluid" />
                  </a>
                  <a
                    className="footer_social"
                    href={LaunchData?.youtube}
                    target="_blank"
                  >
                    <img src={Images.youtube} className="img-fluid" />
                  </a>

                </div>
                { }
                <div className="d-flex align-items-center gap-3 flex-wrap mt-5">


                  {
                    (LaunchData.launchStatus == 'Upcoming' && LaunchData.status != 'stop') || (id == 'perview') ?
                      <div className="">
                        <button className="grad_btn">Upcoming</button>
                      </div> :
                      LaunchData?.userId == getUser?.userId ?
                        LaunchData.launchStatus == 'Active' && LaunchData.status != 'stop' ?
                          <div className="">
                            <button className="grad_btn">Sale in Live</button>
                          </div> :
                          LaunchData.launchStatus != 'Active' && LaunchData.status != 'stop' && LaunchData.status != 'finalize' ?
                            <div className="">
                              <button
                                className="grad_btn"
                                onClick={() => { saleFinalise() }}
                              >
                                Sale Finalize
                              </button>
                            </div> :
                            LaunchData.launchStatus != 'Active' && LaunchData.status != 'stop' && LaunchData.status == 'finalize' ?
                              <div className="mt-5">
                                <button className="grad_btn" disabled={true}>
                                  Sale Finalized
                                </button>
                              </div> :
                              // "" :
                              <div className="">
                                <button className="grad_btn">
                                  Closed
                                </button>
                              </div>
                        : LaunchData?.userId != getUser?.userId ?
                          LaunchData.launchStatus == 'Active' && LaunchData.status == 'start' ?
                            <div className="">
                              <button
                                className="grad_btn"
                                onClick={() => {
                                  handleShowUserDeposit()
                                }}
                                disabled={id == 'perview' ? true : false}
                              >
                                Buy
                              </button>
                            </div> :
                            LaunchData.launchStatus != 'Active' && LaunchData.status == 'start' ?
                              <div className="">
                                <button
                                  className="grad_btn"
                                  disabled={true}
                                >
                                  Sale End
                                </button>
                              </div> :
                              LaunchData?.status == "finalize" &&
                                LaunchData?.saleStatus == "success" &&
                                userContribution?.userRewardOfLaunch > 0 ?
                                <div className="">
                                  <button
                                    className="grad_btn"
                                    onClick={() => {
                                      claimb()
                                    }}
                                  >
                                    Claim {LaunchData?.tokenSymbol}
                                  </button>
                                </div> :
                                (LaunchData?.status == "finalize" || LaunchData?.status == "stop") &&
                                  LaunchData?.saleStatus == "failure" && userContribution?.userContribute > 0 ?

                                  <div className="">
                                    <button
                                      className="grad_btn"
                                      onClick={() => {
                                        claimb()
                                      }}
                                    >
                                      Claim {LaunchData.currency}
                                    </button>
                                  </div> :
                                  <div className="">
                                    <button
                                      className="grad_btn"
                                    >
                                      Claimed
                                    </button>
                                  </div>
                          :
                          <div className="">
                            <button
                              className="grad_btn"
                            >
                              {LaunchData.launchStatus}
                            </button>
                          </div>
                  }
                  {LaunchData?.userId == getUser?.userId &&
                    LaunchData?.whitelistSale == 'enable' &&
                    (LaunchData?.launchStatus == 'Active' || LaunchData?.launchStatus == 'Upcoming')
                    ?
                    <div className=" ">
                      <button
                        className="grad_btn"
                        onClick={() => {
                          setWhiteShow(true)
                        }}
                      >
                        Add Whitelist user
                      </button>
                    </div>
                    : ''}
                  {/* {LaunchData?.userId == getUser?.userId &&
                  LaunchData?.launchStatus == "Active" &&
                  LaunchData?.status != "stop" ? (
                  <div className="mt-5">
                    <button className="grad_btn">Sale In Live</button>
                  </div>
                ) : LaunchData?.userId == getUser?.userId &&
                  LaunchData?.status != "stop" &&
                  LaunchData?.launchStatus != "Active" ? (
                  <div className="mt-5">
                    <button className="grad_btn" onClick={saleFinalise}>
                      Sale Finalize
                    </button>
                  </div>
                ) : LaunchData?.userId != getUser?.userId ? (
                  <div className="mt-5 d-flex flex-wrap align-items-center gap-4">
                    {LaunchData?.status != "finalize" &&
                      LaunchData?.status != "stop" &&
                      LaunchData?.launchStatus == "Active" ? (
                      <button
                        className="grad_btn"
                        onClick={handleShowUserDeposit}
                        disabled={id == "perview" ? true : false}
                      >
                        BUY
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
                          <button className="grad_btn" onClick={claimb}>
                            Claim {LaunchData?.tokenSymbol}
                          </button>
                        ) : LaunchData?.status == "finalize" &&
                          LaunchData?.saleStatus == "failure" &&
                          userContribution?.userContribute > 0 ? (
                          <button className="grad_btn" onClick={claimb}>
                            Claim
                          </button>
                        ) : LaunchData?.status == "stop" &&
                          userContribution?.userContribute > 0 ? (
                          <button className="grad_btn" onClick={claimb}>
                            Claim {LaunchData?.tokenSymbol}
                          </button>
                        ) : (
                          <button className="grad_btn">Claimed</button>
                        )}
                  </div>
                ) : (
                  <button className=" mt-5 grad_btn">Closed</button>
                )} */}
                  {
                    LaunchData?.userId != getUser?.userId && getUser?.userRole?.toLowerCase() == ('Jury')?.toLowerCase() &&
                    <div onClick={scrollToSection} className="">
                      <button className="grad_btn add_btn" >Add Comments</button>
                    </div>
                  }

                </div>
              </div>
            </div>
          </div>
          <div className="exchange_card ld_subs_card margin_top">
            <div className="row  mx-auto">
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Start Time</p>
                  <p className="sub_crd_cnt mt-2 text-center text-sm-start">
                    {momentFormat(LaunchData?.startTime)}
                    {/* {new Date(LaunchData?.startTime)?.toLocaleDateString()} */}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center   mt-4 mt-sm-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">End Time</p>
                  <p className="sub_crd_cnt mt-2 text-center ">
                    {momentFormat(LaunchData?.endTime)}
                    {/* {new Date(LaunchData?.endTime)?.toLocaleDateString()} */}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center   mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center r">Softcap</p>
                  <p className="sub_crd_cnt mt-2  text-center">
                    {LaunchData?.softCap} {LaunchData?.currency}{" "}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center   mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">HardCap</p>
                  <p className="sub_crd_cnt mt-2 text-center ">
                    {LaunchData?.hardCap} {LaunchData?.currency}
                  </p>
                </div>
              </div>

            </div>
            <div className="row mx-auto mt-4">
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Vesting Claim</p>
                  <p className="sub_crd_cnt mt-2 text-center ">
                    {LaunchData?.isVesting?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center  mt-4 mt-sm-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Listing</p>
                  <p className="sub_crd_cnt mt-2 text-center ">
                    {LaunchData?.listingOptions?.toUpperCase()}
                  </p>
                </div>
              </div>
              {/* <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-4">
                <p className="desc sub_desc text-nowrap">
                  Liquidity Lockup Time</p>
                <p className="sub_crd_cnt">30 Days</p>
              </div> */}
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center   mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">
                    Listing Price
                  </p>
                  <p className="sub_crd_cnt mt-2 text-center">{LaunchData?.listingPrice}</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center  mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Token Address</p>
                  <div className="d-flex align-items-center gap-3 mt-2">

                    <p className="sub_crd_cnt mt-2  text-center  word_break_all">
                      {/* {LaunchData?.contractAddress?.substring(0, 25)}..... */}
                      {
                        LaunchData?.contractAddress?.slice(0, Math.floor(LaunchData?.contractAddress?.length / 4 - 4)) + '...' + LaunchData?.contractAddress?.slice(18, Math?.floor(LaunchData?.contractAddress?.length / 2))
                      }
                    </p>
                    <button className="border-0 outline-0 bg-transparent p-0 mt-1">
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
            <div className="row mx-auto mt-4">

              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Access Type</p>
                  <p className="sub_crd_cnt mt-2 text-center">
                    {LaunchData?.whitelistSale ? "Public" : "Private"}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center">Status</p>
                  <p className="sub_crd_cnt mt-2">
                    {isEmpty(LaunchData.status) ? "Upcoming" : LaunchData?.status == "stop"
                      ? "Stop"
                      : LaunchData?.launchStatus}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center ">Minimum Buy</p>
                  <p className="sub_crd_cnt mt-2 text-center">{`${LaunchData?.minimum} ${LaunchData?.currency}`}</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                <div>
                  <p className="desc sub_desc text-nowrap text-center">Maximum Buy</p>
                  <p className="sub_crd_cnt mt-2 text-center ">{`${LaunchData?.maximum} ${LaunchData?.currency}`}</p>
                </div>
              </div>
            </div>
            <div className="row mx-auto mt-4">
              {id == "perview" ? (
                ""
              ) : LaunchData?.userId != getUser?.userId ? (

                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">Your Purchased</p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {userContribution?.userSaleOfLaunch
                        ? userContribution?.userSaleOfLaunch
                        : 0}{" "}
                      {LaunchData?.currency}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                  <div>
                    <p className="desc sub_desc text-nowrap">Sale Contribution</p>
                    <p className="sub_crd_cnt mt-2 text-center ">
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
                      <p className="desc sub_desc text-nowrap text-center">Your Reward</p>
                      <p className="sub_crd_cnt">
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

          <div className="timeline margin_top">
            <h5 className="grad_title mb-4">Timeline</h5>
            <div className={`d-flex align-items-center gap-4  `}>
              <div>
                <img
                  src={Images.tick}
                  alt="tick"
                  className="img-fluid tick_img"
                />
              </div>

              <div>
                <p className="subs_heads">Sale Period</p>
                <p className="desc sub_desc">
                  {LaunchData?.launchStatus == "Active" || LaunchData.launchStatus == 'Closed'
                    ? `${new Date(
                      LaunchData?.startTime
                    ).toUTCString()} - ${new Date(
                      LaunchData?.endTime
                    ).toUTCString()}`
                    : "Upcoming"}
                </p>
              </div>
            </div>
            <div
              className={
                LaunchData?.status == "stop"
                  ? `d-flex align-items-center gap-4 mt-3 ${LaunchData?.status == "stop" ? "" : "opacity30"
                  }`
                  : LaunchData?.launchStatus == "Active"
                    ? `d-flex align-items-center gap-4 mt-3 ${LaunchData?.launchStatus == "Active" ? "" : "opacity30"
                    }`
                    : `d-flex align-items-center gap-4 mt-3 ${LaunchData?.status == "finalize" ? "" : "opacity30"
                    }`
              }
            >
              <div>
                <img
                  src={Images.tick}
                  alt="tick"
                  className="img-fluid tick_img"
                />
              </div>

              <div>
                <p className="subs_heads">Status</p>
                <p className="desc sub_desc">
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
            </div>
            <div
              className={`d-flex align-items-center gap-4 mt-3 ${LaunchData?.status == "finalize" ? "" : "opacity30"
                }`}
            >
              <div>
                <img
                  src={Images.tick}
                  alt="tick"
                  className="img-fluid tick_img"
                />
              </div>

              <div>
                <p className="subs_heads">Sale Finalize</p>
                <p className="desc sub_desc">
                  {LaunchData?.status == "stop"
                    ? "--"
                    : LaunchData?.status == "finalize"
                      ? "Finalize"
                      : "Upcoming..."}
                </p>
              </div>
            </div>
            <div
              className={`d-flex align-items-center gap-4 mt-3 ${!isEmpty(LaunchData?.saleStatus) &&
                LaunchData.status != "stop" &&
                LaunchData?.saleStatus != ""
                ? ""
                : "opacity30"
                }`}
            >
              <div>
                <img
                  src={Images.tick}
                  alt="tick"
                  className="img-fluid tick_img"
                />
              </div>

              <div>
                <p className="subs_heads">Sale Completion Status</p>
                <p className="desc sub_desc">
                  {!isEmpty(LaunchData?.saleStatus) &&
                    LaunchData?.saleStatus != ""
                    ? LaunchData?.saleStatus
                    : "Upcoming..."}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="project_desc margin_top">
            <h5 className="grad_title mb-4">Project Description</h5>
            <p className="desc sub_desc">
              {state?.description}
            </p>
          </div> */}

          {LaunchData?.userId != getUser?.userId ? (
            LaunchData?.status == "finalize" && LaunchData?.isVesting?.toLowerCase() == ('enable')?.toLowerCase() &&
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
          <div className="key_htls margin_top">
            <h5 className="grad_title mb-4">Key Highlight</h5>
            <div className="exchange_card ld_subs_card">
              <div className="row w-100 mx-auto">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">Max Supply </p>
                    <p className="sub_crd_cnt mt-2 text-center ">
                      {LaunchData?.hardCap} {LaunchData?.tokenSymbol}
                    </p>
                  </div>
                </div>
                {/* <div className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-4">
                  <p className="desc sub_desc text-nowrap">Initial Circulating Supply </p>
                  <p className="sub_crd_cnt">3.01% of Total Token Supply</p>
                </div> */}
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center  mt-4 mt-sm-0">
                  <div>
                    <p className="desc sub_desc  text-center">
                      Price ({LaunchData?.tokenSymbol} Subscription)
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">{`1 ${LaunchData?.currency} = ${LaunchData?.presaleRate} ${LaunchData?.tokenSymbol}`}</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc  text-center">
                      Launchpad Allocation ({LaunchData?.tokenSymbol} Sub.){" "}
                    </p>
                    <p className="sub_crd_cnt mt-2  text-center">
                      {LaunchData?.hardCap * LaunchData?.presaleRate}{" "}
                      {LaunchData?.tokenSymbol}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-lg-0">
                  <div>
                    <p className="desc sub_desc text-nowrap text-center">Token</p>
                    <p className="sub_crd_cnt mt-2 text-center">{LaunchData?.tokenName}</p>
                  </div>
                </div>
              </div>
              <div className="row mx-auto mt-4">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center ">
                  <div>
                    <p className="desc sub_desc  text-center">
                      Token Vesting Period{" "}
                    </p>
                    <p className="sub_crd_cnt mt-2 text-center">
                      {LaunchData?.isVesting?.toLowerCase() == ("enable")?.toLowerCase()
                        ? LaunchData?.vestingPeriod + " " + "days"
                        : "No lockup"}
                    </p>
                  </div>
                </div>
                {LaunchData?.isVesting == "enable" && (
                  <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center mt-4 mt-sm-0">
                    <div>
                      <p className="desc sub_desc text-nowrap text-center">
                        Token Distribution{" "}
                      </p>
                      <p className="sub_crd_cnt mt-2 text-center ">
                        {LaunchData?.vestingPercentage}% of Total Token Supply
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="terms_cond margin_top">
            <h5 className="grad_title mb-4">Terms and Conditions</h5>
            <p className="desc sub_desc">
              {LaunchData?.terms?.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: LaunchData?.terms }}
                ></div>
              ) : (
                ""
              )}
            </p>
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
              className="grad_btn grad_btn2 "
              onClick={() => {
                if (id != "perview") {
                  navigate('/launchpad')
                } else {
                  navigate('/createLaunchpad')
                }
              }}>Back</button>
          </div>
        </div>
        <div>
          {
            id != "perview" && <Jurylist ref={childSectionRef} launchpadId={id} />
          }
        </div>
      </section >
      <LaunchpadFooter data={LaunchData} />
      {/* <Footer data={state} /> */}
    </div >
  );
};

export default LaunchPadDetails;
