import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import bannerJson from "../asset/json/stake.json";
import { data } from "../data/data";
import NewsCard from "../card/NewsCard";
import AssetCard from "../card/AssetCard";
import TokenCard from "../card/TokenCard";
import { Link } from "react-router-dom";
import StakeCard from "../card/StakeCard";
import { Images } from "../data/Images";
import { useSelector } from "react-redux";
import ReactDatatable from "@ashvin27/react-datatable";
import { FaList } from "react-icons/fa";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { FaSortDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa6";



/** Actions */
import { poolsDetails, stakingCurrency, stakingTranscationDetails } from "../actions/stakingAction";

/** Redex-Actions */
import { stakingPools, stakingCurrencies } from "../actions/stakingRedexAction";
import StakeCardList from "../card/StakeCardList";
import { Accordion } from "react-bootstrap";
import { FaAngleDown, FaAngleUp, FaSortUp } from "react-icons/fa6";
import { getCms } from "../actions/cmsAction";
import isEmpty from "is-empty";
import { momentFormat } from "../lib/dateTimeHelper";
import { toCutOff } from "../lib/Calculationlib";

const Stake = (props) => {
  const { pools } = useSelector((state) => state.staking);
  const { getUser } = useSelector((state) => state.user);
  const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag

  const [tokenTabs, setTokenTabs] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [stakePage, setStakePage] = useState(1);
  const [totalCount, setTotalcount] = useState(0);
  const [records, setRecords] = useState([]);
  const [stakeView, setStakeView] = useState("Grid");
  const [stakeStatus, setStakeStatus] = useState("Finished");
  const [showFilterData, setShowFilterData] = useState(false);
  const [cmsData, setCmsData] = useState("");
  const [filterData, setFilterData] = useState({
    stakeOnly: false,
    sortData: "none",
    search: ""
  })


  const handleTokenTabs = (getId) => {
    setTokenTabs(getId);
  };

  let columns = [
    {
      key: "Currency",
      text: "Currency",
      width: 150,
      className: "text-center w_150",
      align: "center",
      sortable: false,
      cell: (record) => {
        return <p>{record.currency.currencySymbol}</p>;
      },
    },
    {
      key: "Type",
      text: "Type",
      className: "text-center w_150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return <p>{record?.type?.toUpperCase()}</p>;
      },
    },
    {
      key: "Amount",
      text: "Amount",
      className: "text-center w_150",
      align: "center",
      width: 150,
      sortable: false,
      cell: (record) => {
        return <p>{toCutOff(record?.amount, record?.currency?.pip)}</p>;
      },
    },
    {
      key: "Date",
      text: "Date",
      className: "text-center w_150",
      width: 150,
      align: "center",
      sortable: false,
      cell: (record) => {
        return <p>{momentFormat(record?.createdAt)}</p>;
      },
    },
    // // {
    // //   key: "Pool ID",
    // //   text: "Pool ID",
    // //   className: "text-center w_150",
    // //   width: 150,
    // //   align: "center",
    // //   sortable: false,
    // //   cell: (record) => {
    // //     return <p>{record?.poolId}</p>;
    // //   },
    // // }
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

  const getCmsData = async () => {
    try {
      const getData = await getCms({ page: "Staking" });
      if (getData.status) {
        setCmsData(getData.data.data)
      }
    } catch (e) {
      console.log("getCmsData_err", e);
    }
  }

  const getPools = async (skip = 0, filterData) => {
    try {

      let payload = { skip: skip, limit: 8, page: stakePage, userId: getUser?.userId, filterData: filterData };
      const getData = await poolsDetails(payload);
      console.log("poolsDetails_data", getData);
      if (getData.status) {
        // setCount(getData?.data?.data?.filter((val) => ((val?.userPartispantAmount > 0 && val.status == false) || (val.status == true)))?.length);
        setCount(getData.data.count)
        if (skip >= 8) {
          let loadData = pools;
          stakingPools(loadData.concat(getData.data.data));
        } else {
          stakingPools(getData.data.data);
        }
      }
    } catch (e) {
      console.log("getPools_err", e);
    }
  };

  const getCurrency = async () => {
    try {
      const currency = await stakingCurrency();
      if (currency.status) {
        stakingCurrencies(currency.data);
      }
    } catch (e) {
      console.log("getCurrency_err", e);
    }
  };

  const fetchStakingTranscationList = async (payload) => {
    try {
      const data = await stakingTranscationDetails(payload, getUser.secretKey);
      // console.log("fetchStakingTranscationList", data);
      if (data.status) {
        setRecords(data.data.data)
        setTotalcount(data.data.count)
      }
    } catch (e) {
      console.log("fetchStakingList_err", e);
    }
  }

  const handlePagination = async (index) => {
    setPage(index.page_number)
    setLimit(index.page_size)
    let reqData = { limit: index.page_size, page: index.page_number, filterData: filterData }
    fetchStakingTranscationList(reqData)
  }


  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    getCurrency();
    if (!isEmpty(getUser)) {
      getPools(0, filterData);
    }
  }, [getUser, filterData]);

  useEffect(() => {
    let reqData = { limit: limit, page: page, }
    if (!isEmpty(getUser)) {
      fetchStakingTranscationList(reqData)
    }
    getCmsData()
  }, [getUser])

  return (
    <div>
      <Header props={props} />
      <section className="custom_section stake_page">
        {" "}
        <div className="stake_section">
          <div className="container container80 py-3">
            <div className="row d-flex flex-column-reverse flex-lg-row pt-3 pt-lg-0">
              <div className="col-12 col-lg-6 d-flex align-items-center mt-5 mt-lg-0">
                <div className="banner_left ">
                  <h3 className="title launch_title">
                    {cmsData && cmsData?.content[0]?.heading}
                    {/* {cmsData && cmsData?.content[0]?.heading.split(' ')[0]} <span className="lnd_grad_txt">{cmsData && cmsData?.content[0]?.heading.split(' ')[cmsData?.content[0]?.heading.split(' ').length -]}</span>
                    {cmsData && cmsData?.content[1]?.heading && cmsData?.content[1]?.heading?.split(' ').slice(1)?.join(' ')} */}
                  </h3>

                  <p className="desc py-4">
                    {cmsData && cmsData?.content[0]?.description}
                  </p>
                  {/* <div className="my-4">
                    <Link
                      to="/createlaunchpad"
                      className="home__gradClipBtn text-decoration-none"
                    >
                      Explore
                    </Link>
                  </div> */}
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="launch_banner_right d-flex justify-content-center position-relative">
                  <img
                    src={Images.stakeCoin5}
                    alt="coin"
                    className="pos_stake_coin_five position-absolute"
                  />
                  <img
                    src={Images.stakeCoin6}
                    alt="coin"
                    className="pos_stake_coin_six position-absolute"
                  />
                  <img
                    src={Images.stakeCoin2}
                    alt="coin"
                    className="pos_stake_coin_two position-absolute"
                  />{" "}
                  <img
                    src={Images.stakeCoin3}
                    alt="coin"
                    className="pos_stake_coin_three position-absolute"
                  />{" "}
                  <img
                    src={Images.stakeCoin7}
                    alt="coin"
                    className="pos_stake_coin_seven position-absolute"
                  />
                  <img
                    src={Images.stakeCoin8}
                    alt="coin"
                    className="pos_stake_coin_eight position-absolute"
                  />
                  <Lottie
                    animationData={bannerJson}
                    className="bannerJson stakeJson"
                    loop={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="news pad_top_bot">
          <div className="container container80">
            <h4 className="lnd_headings">
              <span className="lnd_grad_txt">{cmsData && cmsData?.content[1]?.heading.split(' ')[0]}</span> {cmsData && cmsData?.content[1]?.heading?.split(' ')?.slice(1)?.join(' ')}
            </h4>
            <p className="desc sub_desc mt-4">
              {cmsData && cmsData?.content[0]?.description}
            </p>


            <div className="stake_controls d-flex flex-wrap gap-4 align-items-center justify-content-between py-4">
              <div className="stake_controls_left d-flex flex-wrap align-items-center gap-4">
                <div className=" d-flex  align-items-center gap-2">
                  <button
                    className={`border-0 outline-0 stake_control_button ${stakeView === "Grid" ? "active" : ""}`}
                    onClick={() => setStakeView("Grid")}>
                    <RiLayoutGrid2Fill fontSize={19} />
                  </button>
                  <button
                    className={`border-0 outline-0 stake_control_button ${stakeView === "List" ? "active" : ""}`}
                    onClick={() => setStakeView("List")}>
                    <FaList />
                  </button>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className="custom_toggle custom_toggle_secondary">
                    <label class="switch">
                      <input
                        type="checkbox"
                        onChange={(e) => { setFilterData({ ...filterData, ...{ 'stakeOnly': e.target.checked } }) }}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <p className="toggle_text">Staked Only</p>
                </div>
              </div>
              <div className="stake_controls_right  d-flex flex-wrap align-items-center gap-3">
                <div>
                  <label className="stake_header_label">Sort By</label>
                  <div className="mt-1">
                    <button
                      className={`d-flex align-items-center justify-content-between stake_filter_header ${showFilterData ? "custom_border_radius" : ""}`}
                      onClick={() => setShowFilterData(!showFilterData)}>
                      <p>{filterData?.sortData != "" ? filterData?.sortData == 'apr' ? "APY" :
                        filterData?.sortData == 'totalSale' ? "Total Staked" : filterData?.sortData.toUpperCase()
                        : "Select"}</p>
                      {showFilterData ? <FaAngleUp fontSize={13} /> : <FaAngleDown fontSize={13} />}


                      <div className={`stake_filter_data_wrapper ${showFilterData ? "d-block border_radius_zero" : "d-none"}`}>
                        <ul onClick={(e) => {
                          setFilterData({ ...filterData, ...{ 'sortData': e.target.dataset.value } })
                        }}>
                          <li data-value={'none'}>None</li>
                          <li data-value={'apr'}>APY</li>
                          <li data-value={'totalSale'}>Total staked</li>
                          <li data-value={'latest'}>Latest</li>
                        </ul>
                      </div>
                    </button>

                  </div>
                </div>
                <div>
                  <label className="stake_header_label">Search</label>
                  <div
                    className="stake_search d-flex align-items-center justify-content-center gap-2 mt-1">
                    <FiSearch />
                    <input
                      placeholder="Search" value={filterData?.search} onChange={(e) => {
                        if (!htmlTagPattern.test(e.target.value)) {
                          setFilterData({ ...filterData, ...{ 'search': e.target.value } })
                        }
                      }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="stake_body">
              {
                stakeView === "Grid" ?
                  // <div className="stake_grid">
                  <div className="d-flex flex-wrap justify-content-center justify-content-lg-start  gap-4">

                    {
                      count > 0 ?
                        pools &&
                        pools.length > 0 &&
                        pools.map((val) => (
                          <>
                            {/* {((val?.userPartispantAmount > 0 && val.status == false) || (val.status == true)) && */}
                            <div className="">
                              <StakeCard val={val} getPools={() => { getPools(); fetchStakingTranscationList({ limit: limit, page: page, search: '' }) }} />
                            </div>
                            {/* } */}
                          </>
                        )) : <div className="p-4 text-center stake_card_list w-100 d-flex flex-column align-items-center gap-1">
                          <FaBoxOpen fontSize={23} />
                          No Stake pools present
                        </div>
                    }
                  </div>

                  :
                  <div className="stake_card_list">
                    {
                      count > 0 ?
                        pools &&
                        pools.length > 0 &&
                        pools.map((val) => (
                          <>
                            {/* {((val?.userPartispantAmount > 0 && val.status == false) || (val.status == true)) && */}
                            <div className="stake_card_list_div">
                              <StakeCardList val={val} getPools={() => { getPools(); fetchStakingTranscationList({ limit: limit, page: page, search: '' }) }} />
                            </div>
                            {/* } */}

                          </>
                        )) : <div className="p-4 d-flex flex-column align-items-center gap-1">
                          <FaBoxOpen fontSize={23} />
                          No Stake pools present
                        </div>
                    }
                  </div>
              }
              {console.log("pools_count", {
                pool: pools.length, count
              })}
            </div>

            {pools && pools.length >= 8 && count > pools.length && (
              <div className="d-flex justify-content-center mt-5">
                <button
                  className="grn_grd_btn "
                  onClick={() => {
                    setStakePage(stakePage + 1)
                    getPools(pools.length, filterData);
                  }}
                >
                  Load More
                </button>
              </div>
            )}
          </div >
        </div >
        <div className="container container80 pt-4">
          <div className="mb-4"><h3>Staking History</h3></div>
          <div className="card_table">
            <ReactDatatable
              config={config}
              records={records}
              columns={columns}
              dynamic={true}
              total_record={totalCount}
              onChange={(e) => {
                handlePagination(e);
              }}
            />
          </div>
        </div>
      </section >

      <Footer />
    </div >
  );
};

export default Stake;
