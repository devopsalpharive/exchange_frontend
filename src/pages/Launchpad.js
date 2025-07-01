import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import bannerJson from "../asset/json/launch.json";
import { data } from "../data/data";
import NewsCard from "../card/NewsCard";
import AssetCard from "../card/AssetCard";
import TokenCard from "../card/TokenCard";
import { Link, useNavigate } from "react-router-dom";
import CreateToken from "../modal/CreateToken";
import { useSelector } from "react-redux";
import ReactDatatable from "@ashvin27/react-datatable";
import successJson from "../asset/json/launchloader.json";
import { Tooltip } from "react-tooltip";
import { PiSealWarning } from "react-icons/pi";

/** Actions */
import {
  launchpadApproveTokenList,
  launchpadList,
  launchpadRequestTokens,
  getuserLaunchpad
} from "../actions/launchpadAction";
/** Redux-Actions */
import { launchpadLists } from "../actions/launchpadReduxAction";
import { Images } from "../data/Images";
import WithdrawCrypto from "../modal/WithdrawCrypto";

//import component 
import ActiveLaunch from "../components/ActiveLaunchpad";
import CompletedLaunch from "../components/CompletedLaunchpad";
import UpcomingLaunch from "../components/UpcomingLaunchpad";
import isEmpty from "is-empty";
import { getCms } from "../actions/cmsAction";
import { showToastMessage } from "../config/toast";

const Launchpad = (props) => {
  const navigate = useNavigate()
  const { launchpad } = useSelector((state) => state.launchpad);

  const { approveTokens } = useSelector((state) => state.launchToken)
  const { getUser } = useSelector((state) => state.user);
  const [tokenTabs, setTokenTabs] = useState(1);

  const [tokenApprovalTab, setTotalApprovalTab] = useState(1);

  const [pendingLaunchpad, setPending] = useState([]);
  const [pendingTokens, setPendingTokens] = useState([]);

  const [Launchpage, setLaunchpage] = useState(1)
  const [Launchlimit, setLaunchlimit] = useState(10)
  const [userLaunchCount, setuserLaunchCount] = useState(0)
  const [cmsData, setCmsData] = useState("");

  const [Tokenpage, setTokenpage] = useState(1)
  const [Tokenlimit, setTokenlimit] = useState(10)
  const [userTokenCount, setuserTokenCount] = useState(0)
  console.log(launchpad, getUser, 'Launchpad',)
  console.log(getUser, 'getUser',)

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
      key: "tokenName",
      text: "Token Name",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record, i) => {
        return <p className="">{record.tokenDetails.tokenName}</p>;
      },
    },
    {
      key: "tokenAddress",
      text: "Token Address",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record, i) => {
        return <p className="">{record?.tokenDetails?.tokenContractAddress ? record.tokenDetails.tokenContractAddress : "---"}</p>;
      }
    },
    {
      key: "tokenSymbol",
      text: "Token Symbol",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record, i) => {
        return <p className="">{record?.tokenDetails?.tokenSymbol}</p>;
      }
    },
    {
      key: "status",
      text: "Status",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return (
          <div className="d-flex justify-content-center">
            <div
              className={`launch_status_badge ${record.status == "approved"
                ? "approve"
                : record.status == "pending"
                  ? "pending"
                  : record.status == "rejected"
                    ? "rejected"
                    : ""
                }`}
            >
              {record.status.toUpperCase()}
            </div>
          </div>
        );
      },
    },
    {
      key: "reason",
      text: "Reason",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record, i) => {
        return (
          <div>
            {
              record?.reason == "" ? "--" :
                <>
                  <button className="reason_tooltip border-0 outline-0 bg-transparent"><PiSealWarning fill="#00d4ff" fontSize={25} />
                  </button>
                  <Tooltip
                    anchorSelect=".reason_tooltip"
                    place="bottom"
                    clickable
                    className="max_tooltip"
                  >
                    <div style={{ color: "#fff", maxWidth: "250px", }}>{record?.reason}</div>
                  </Tooltip>
                </>
            }
          </div>
        )
      }
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
      key: "tokenName",
      text: "Token Name",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false
    },
    {
      key: "contractAddress",
      text: "Token Address",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false
    },
    {
      key: "currency",
      text: "Currency",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false
    },
    {
      key: "adminApproval",
      text: "Status",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return (
          <div className="d-flex justify-content-center">
            <div
              className={`launch_status_badge ${record.adminApproval == "approved"
                ? "approve"
                : record.adminApproval == "pending"
                  ? "pending"
                  : record.adminApproval == "rejected"
                    ? "rejected"
                    : ""
                }`}
            >
              {record.adminApproval.toUpperCase()}
            </div>
          </div>
        );
      },
    },
    {
      key: "reason",
      text: "Reason",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record, i) => {
        return (
          <div>
            {
              record?.reason == "" ? "--" :
                <>
                  <button className="reason_tooltip border-0 outline-0 bg-transparent"><PiSealWarning fill="#00d4ff" fontSize={25} />
                  </button>
                  <Tooltip
                    anchorSelect=".reason_tooltip"
                    place="bottom"
                    clickable
                    className="max_tooltip"
                  >
                    <div style={{ color: "#fff", maxWidth: "250px", maxHeight: "250px", overflowY: "scroll" }}>{record?.reason}</div>
                  </Tooltip>
                </>
            }
          </div>
        )
      }
    },
  ];
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




  console.log("launchpadlaunchpadlaunchpad_redux", launchpad)

  const handleTokenTabs = (getId) => {
    setTokenTabs(getId);
  };
  const handleTokenApprovalTab = (getId) => {
    setTotalApprovalTab(getId);
  };

  const getlaunchpadList = async () => {
    try {
      const { status, message, result } = await launchpadList();
      if (status) {
        const time = new Date().getTime();
        launchpadLists(result);
      }
    } catch (e) {
      console.log("getlaunchpadList_err", e);
    }
  };

  const getCmsData = async () => {
    try {
      const getData = await getCms({ page: "LaunchPad" });
      if (getData.status) {
        setCmsData(getData.data.data)
      }
    } catch (e) {
      console.log("getCmsData_err", e);
    }
  }

  const requestLaunchToken = async (data, key) => {
    try {
      const { status, result, count, message } = await launchpadRequestTokens(data, key);
      console.log("launchpadRequestTokens_datarequestLaunchToken", { status, result, count, message });
      if (status) {
        // const filterData = data?.data.length > 0 ? data.data.filter((el) => { return el.userId == getUser.userId }) : []
        setPendingTokens(result)
        setuserTokenCount(count)
      }
    } catch (e) {
      console.log("requestLaunchToken_err", e);
    }
  }

  const fetchUserLanuch = async (data) => {
    try {
      const { status, result, message, count } = await getuserLaunchpad(data, getUser.secretKey)
      if (status) {
        setPending(result)
        setuserLaunchCount(count)
      }
    } catch (err) {
      console.log(err, 'fetchUserLanuch')
    }
  }

  const LoadMoreToken = async (index) => {
    try {
      console.log('LoadMoreToken', index)
      setTokenpage(index.page_number);
      setTokenlimit(index.page_size);
      let reqData = {
        limit: index.page_size,
        page: index.page_number
      };
      requestLaunchToken(reqData, getUser.secretKey);
    } catch (err) {
      console.log(err, 'LoadMoreToken__err')
    }
  }

  const LoadMoreLaunch = async (index) => {
    try {
      setLaunchpage(index.page_number);
      setLaunchlimit(index.page_size);
      let reqData = {
        limit: index.page_size,
        page: index.page_number
      };
      fetchUserLanuch(reqData);
    } catch (err) {
      console.log(err, 'LoadMoreToken__err')
    }
  }

  const navigateRequestTokenType = async (e) => {
    try {

      if (getUser && getUser.kycStatus == "approved") {
        navigate('/request-token-types')
      }
      else {
        showToastMessage('Please complete your KYC verification.', 'error')
      }

    } catch (err) {

    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getCmsData();
    getlaunchpadList();
    if (!isEmpty(getUser)) {
      let reqData = {
        page: Launchpage,
        limit: Launchlimit
      }

      let reqData1 = {
        page: Tokenpage,
        limit: Tokenlimit
      }
      requestLaunchToken(reqData, getUser.secretKey)
      fetchUserLanuch(reqData1)
      launchpadApproveTokenList(getUser.secretKey)
    }
  }, [getUser])
  return (
    <div>
      <Header props={props} />
      <section className="custom_section">
        {" "}
        <div className="lab_section py-3 py-lg-5">
          <div className="container container80 py-3 py-lg-5">
            <div className="row d-flex flex-column-reverse flex-lg-row pt-4">
              <div className="col-12 col-lg-6 d-flex align-items-center mt-5 mt-lg-0">
                <div className="banner_left ">
                  <h3 className="title launch_title">
                    {cmsData && cmsData?.content[0]?.heading.split(' ')[0] + "  " + cmsData?.content[0]?.heading.split(' ')[1]}
                    &nbsp; <span className="lnd_grad_txt">{cmsData && cmsData?.content[0]?.heading.split(' ')[2]}</span>
                  </h3>
                  <h3 className="title launch_title ">
                    {cmsData && cmsData?.content[0]?.subHeading}
                  </h3>
                  <p className="desc py-4">
                    {cmsData && cmsData?.content[0]?.description}
                  </p>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    {
                      getUser && getUser ?
                        // <Link
                        //   to="/request-token-types"
                        //   className="home__gradClipBtn text-decoration-none"
                        // >
                        //   Request Token
                        // </Link> 

                        <button
                          onClick={(e) => { navigateRequestTokenType(e) }}
                          className="home__gradClipBtn text-decoration-none"
                        >
                          Request Token
                        </button>

                        :
                        <button
                          onClick={() => {
                            sessionStorage.setItem('loginFrom', '/launchpad')
                            navigate('/login')
                          }}
                          className="home__gradClipBtn text-decoration-none"
                        >
                          Login
                        </button>
                    }

                    {approveTokens && approveTokens.length > 0 && (
                      <Link
                        to="/createlaunchpad"
                        className="home__gradClipBtn text-decoration-none"
                      >
                        Create Launchpad
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="launch_banner_right d-flex justify-content-center justify-content-lg-end">
                  <Lottie
                    animationData={bannerJson}
                    className="bannerJson"
                    loop={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          getUser && getUser && pendingTokens.length > 0 &&

          <div className="launchpad_table_card py-5">
            <div className="container container80">
              <div className=" d-flex flex-column align-items-center">
                <img
                  src={Images.logo}
                  alt="logo"
                  className="img-fluid launch_logo"
                />
                <h4 className="lnd_headings mt-4 d-flex flex-wrap align-items-center">
                  <span className="me-2 text_h4_orange">Discover </span>
                  {/* {tokenApprovalTab == 1 ? "Token " : ""} 
                  Approval Inprogress{" "} */}
                  & Track Healthcare Innovations!
                  {/* <Lottie
                    animationData={successJson}
                    className="launch_loader"
                    loop={true}
                  /> */}
                </h4>

              </div>
              <div>
                <div className="d-flex align-items-center justify-content-center gap-3 my-5">
                  <button
                    className={`tk_tab_btn ${tokenApprovalTab == 1 ? "active" : ""
                      }`}
                    onClick={() => {
                      handleTokenApprovalTab(1)
                    }}
                  >
                    Tokens
                  </button>
                  <button
                    className={`tk_tab_btn ${tokenApprovalTab == 2 ? "active" : ""
                      }`}
                    onClick={() => {
                      handleTokenApprovalTab(2)
                    }}
                  >
                    Launchpad
                  </button>

                </div>
                <div>

                  {tokenApprovalTab == 1 ? (
                    <div className="custom_table ref_custom_table">
                      {" "}
                      <ReactDatatable
                        config={config}
                        records={pendingTokens}
                        columns={columns}
                        dynamic={true}
                        total_record={userTokenCount}
                        onChange={(e) => {
                          LoadMoreToken(e);
                        }}
                      />
                    </div>
                  ) : <></>}

                  {tokenApprovalTab == 2 ? (
                    <div className="custom_table ref_custom_table">
                      {" "}
                      <ReactDatatable
                        config={config}
                        records={pendingLaunchpad}
                        columns={columns1}
                        dynamic={true}
                        total_record={userLaunchCount}
                        onChange={(e) => {
                          LoadMoreLaunch(e);
                        }}
                      />
                    </div>
                  ) : <></>}

                </div>
              </div>
            </div>
          </div>
        }


        <div className="news pad_top_bot">
          <div className="container container80">
            <h4 className="lnd_headings">
              <span className="lnd_grad_txt">{cmsData && cmsData?.content[1]?.heading?.split(' ')[0]}</span>
              &nbsp; {cmsData && cmsData?.content[1]?.heading?.split(' ').slice(1).join(" ")}
            </h4>
            <p className="desc sub_desc mt-4">
              {cmsData && cmsData?.content[1]?.description}
            </p>

            <div className="row mt-5">
              {cmsData && cmsData?.content.map((val, index) => (
                (index == 2 || index == 3 || index == 4 || index == 5) &&
                <div className="col-12 col-lg-6 mb-4  ">
                  <NewsCard val={val} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="assets pad_top_bot">
          {" "}
          <div className="container container80">
            <h4 className="lnd_headings">{cmsData && cmsData?.content[6]?.heading}</h4>
            <p className="desc sub_desc mt-4">
              {cmsData && cmsData?.content[6]?.description}
            </p>

            <div className="row mt-5">
              {data.asset.map((val) => (
                <div className="col-12  col-md-6 col-lg-4 col-xxl-3">
                  <AssetCard val={val} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="token pad_top_bot launchpad_assets">
          <div className="container container80">
            <h4 className="lnd_headings text-center">
              {cmsData && cmsData?.content[7]?.heading}
            </h4>
            <p className="desc sub_desc mt-4 text-center">
              {cmsData && cmsData?.content[7]?.description}
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 my-5">
              <button
                className={`tk_tab_btn ${tokenTabs == 1 ? "active" : ""}`}
                onClick={() => { handleTokenTabs(1) }}
              >
                Active
              </button>
              <button
                className={`tk_tab_btn ${tokenTabs == 2 ? "active" : ""}`}
                onClick={() => { handleTokenTabs(2) }}
              >
                Completed
              </button>
              <button
                className={`tk_tab_btn ${tokenTabs == 3 ? "active" : ""}`}
                onClick={() => { handleTokenTabs(3) }}
              >
                Upcoming
              </button>
            </div>

            {tokenTabs === 1 && (
              <ActiveLaunch />
            )}
            {tokenTabs === 2 && (
              <CompletedLaunch />
            )}
            {tokenTabs === 3 && (
              <UpcomingLaunch />
            )}

            {/* <div className="mt-5 d-flex justify-content-center">

              <button className="home__gradClipBtn " onClick={() => { navigate("/launchpadDetails") }}>See all</button>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Launchpad;
