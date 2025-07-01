import React, { useEffect, useState } from "react";
import { Images } from "../data/Images";
import AddLiquidity from "../modal/AddLiquidity";
import ClaimDetails from "../modal/ClaimDetails";
import Unstake from "../modal/Unstake";
import { AiOutlineCalculator } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaLayerGroup } from "react-icons/fa";
import { GrStakeholder } from "react-icons/gr";
import { IoIosShareAlt } from "react-icons/io";
import { TfiTimer } from "react-icons/tfi";
import { FaCubes } from "react-icons/fa";
import Countdown, { zeroPad } from "react-countdown";
import { FaPeopleArrows } from "react-icons/fa";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



/** Config */
import { showToastMessage } from "../config/toast";
import { overNightCalculation, toFixedNumber } from "../config/lib";
import Swal from "sweetalert2";
import { toCutOff } from "../lib/Calculationlib";


const StakeCardList = (props) => {
  // console.log("StakeCard_propsprops", props);
  const { getUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [addLiquidityShow, setAddLiquidityShow] = useState(false);
  const [unstakeShow, setUnstakeShow] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [showStakeDetails, setShowStakeDetails] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0);
  const [complete, setComplete] = useState(false)

  const handleAddLiquidityShow = () => {
    setAddLiquidityShow(true);
  };
  const handleAddLiquidityClose = () => {
    setAddLiquidityShow(false);
  };
  const unstakeClose = () => {
    setUnstakeShow(false);
  };
  const handleClaimClose = () => {
    setShowClaim(false);
  };

  const checkEligibleToClaimb = () => {
    try {
      if (props && props?.val?.userPartispantAmount > 0) {
        setShowClaim(true);
      } else {
        showToastMessage("* Please Stake", "error");
      }
    } catch (e) {
      console.log("checkEligibleToClaimb_err", e);
    }
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setComplete(true)
    } else {
      // Render a countdown
      return <span>
        {zeroPad(days)} d : {zeroPad(hours)} h :  {zeroPad(minutes)} m : {zeroPad(seconds)} s
      </span>
    }
  }

  const calculateRewarsPercentage = async () => {
    try {
      // console.log("REward_claimb_token", props?.val?.stakeEndDate);
      const timer = setTimeout(() => {
        if (props?.val?.status && props?.val?.stakeEndDate > new Date().getTime()) {
          const dateDiffer = (new Date().getTime() - props?.val?.claimbDate) / 1000
          let apyPercentage = props?.val?.apr / (86400 * 365);
          apyPercentage = toFixedNumber(apyPercentage)

          apyPercentage = props?.val?.duration * parseFloat(apyPercentage)
          let value = props?.val?.userPartispantAmount * apyPercentage / 100;
          value = dateDiffer * value
          value = toFixedNumber(value)
          setRewardAmount(parseFloat(value))
          // console.log("REward_claimb_token1", value);
        } else {
          /** APY CALCULATION */
          const days = overNightCalculation(props?.val?.claimbDate, props?.val?.stakeEndDate);
          let apyPercengate = props?.val?.apr / 365;
          apyPercengate = props?.val?.duration * apyPercengate
          let claimbAmount = (parseFloat(props?.val?.userPartispantAmount) * parseFloat(apyPercengate) / 100) * days
          setRewardAmount(parseFloat(claimbAmount))
        }
      }, 1000);

      return () => clearTimeout(timer);
    } catch (e) {
      console.log("calculateRewarsPercentage_err", e);
    }
  }

  useEffect(() => {
    calculateRewarsPercentage()
  }, [rewardAmount, addLiquidityShow])

  const unstakebtn = () => {

    Swal.fire({
      title: "After unstake, the stake pool is removed from the page.",
      icon: "info",
      // showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: '#ff602e',
      cancelButtonColor: '#570ebe',

    }).then((result) => {

      if (result.isConfirmed) {
        setUnstakeShow(true)
        // Swal.fire("Deleted All APIs!", "", "success");
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  return (
    <div>
      <AddLiquidity
        addLiquidityShow={addLiquidityShow}
        handleAddLiquidityClose={handleAddLiquidityClose}
        data={props?.val}
        getPools={() => {
          props.getPools();
        }}
      />
      <Unstake
        addLiquidityShow={unstakeShow}
        handleAddLiquidityClose={unstakeClose}
        data={props?.val}
        getPools={() => {
          props.getPools();
        }}
      />
      <ClaimDetails
        showClaim={showClaim}
        handleClaimClose={handleClaimClose}
        data={props?.val}
        getPools={() => {
          props.getPools();
        }}
      />

      <div className="stake_card_list_container">
        <div className={`stake_card_list_header ${showStakeDetails ? "enable_border" : ""}`} >
          <div className="d-flex align-items-start justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="stake_card_list_image_wrapper">
                <img src={props.val.currencyimage} className="img_fit_container" />
              </div>
              <div>
                <p className="stake_list_title">Earn {props?.val?.rewardTokenSymbol}</p>
                <p className="stake_subtitle">Stake {props?.val?.currencySymbol}
                </p>
              </div>
            </div>
            {/* <div className="d-none d-lg-block">
                            <p className="stake_title_bold_xs"><GiTwoCoins className="me-2 mb-1 stake_gray_svg" fontSize={19} />
                                Stake <span>Earned</span></p>
                            <div className="d-flex align-items-center justify-content-between gap-4 mt-1">
                                <div>
                                    <p className="earn_value_bold">0</p>
                                    <p className="earn_value_xs">
                                        0 USD
                                    </p>
                                </div>
                                {
                                    props?.val?.status == true &&
                                    <button className="grad_btn hover_opacity" onClick={() => checkEligibleToClaimb()}> Claim </button>
                                }

                            </div>

                        </div> */}
            <div className="d-none d-sm-flex flex-column align-items-start justify-content-between">
              <div className="d-flex align-items-center">
                <AiOutlineCalculator className="me-2 mb-1 stake_gray_svg" />
                <p className="stake_label">APY</p>
              </div>
              <p className="stake_values mt-2">{props?.val?.apr} %</p>
            </div>
            <div className="d-none d-md-flex flex-column align-items-start">
              <p className="stake_label">  <GiTwoCoins className="mb-2 me-2 stake_gray_svg" fontSize={17} />Minimum stake</p>
              <p className="stake_values mt-2">
                {props?.val?.minimumStake} {props?.val?.currencySymbol}
              </p>
            </div>
            <div className="d-none d-lg-flex flex-column align-items-start">
              <p className="stake_label"><FaPeopleArrows className="mb-1 me-1 stake_gray_svg" /> Total staked</p>
              <p className="stake_values mt-2">
                {props?.val?.totalSale?.toLocaleString('en-US')} {props?.val?.currencySymbol}
              </p>
            </div>
            <div className="d-none d-lg-flex flex-column">
              <p className="stake_label"><FaCubes className="mb-2 me-2 stake_gray_svg" /> Locked Days</p>
              <p className="stake_values mt-2">{props?.val?.duration} Days</p>
            </div>
            <button className="green_button_bg_none "

              onClick={() => setShowStakeDetails(!showStakeDetails)}>
              {showStakeDetails ?
                <>Hide <FaAngleUp className="ms-2" /></>
                : <>Details <FaAngleDown className="ms-2" /></>
              }
            </button>
          </div>


        </div>
        {showStakeDetails ?
          <div className="stake_card_list_body d-flex flex-wrap align-items-center justify-content-center justify-content-xl-between gap-4 gap-md-5">
            <div className="stake_card_list_value_wrapper">

              <div className="row mx-auto">
                <div className="col-6 px-0">
                  <div className="row mx-auto"  >
                    <div className="col-2 px-0">
                      <GiTwoCoins className="mb-2 stake_gray_svg" />
                    </div>
                    <div className="col-10 px-0">
                      <p className="stake_label">Minimum stake</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 pe-0">
                  <p className="stake_values text-end">
                    {props?.val?.minimumStake} {props?.val?.currencySymbol}
                  </p>
                </div>
              </div>
              <div className="row mx-auto mt-2">
                <div className="col-6 px-0">
                  <div className="row mx-auto"  >
                    <div className="col-2 px-0">
                      <FaPeopleArrows className="mb-2 stake_gray_svg" fontSize={15} />
                    </div>
                    <div className="col-10 px-0">
                      <p className="stake_label">Claimb Interval</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 pe-0">
                  <p className="stake_values text-end">
                    {props?.val?.redemptionPeriod} Days
                  </p>
                </div>
              </div>
              <div className="row mx-auto mt-2">
                <div className="col-6 px-0">
                  <div className="row mx-auto"  >
                    <div className="col-2 px-0">
                      <FaCubes className="mb-2 stake_gray_svg" />
                    </div>
                    <div className="col-10 px-0">
                      <p className="stake_label">Stakers</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 pe-0">
                  <p className="stake_values text-end">{props?.val?.totalusers}</p>
                </div>
              </div>
              {
                (props?.val?.stakeEndDate != null && props?.val?.stakeEndDate != 0 && props?.val?.status == true) &&

                <div className="row mx-auto mt-2">
                  <div className="col-4 px-0">
                    <div className="row mx-auto"  >
                      <div className="col-2 px-0">
                        <TfiTimer className=" mb-2 stake_gray_svg" fontSize={15} />
                      </div>
                      <div className="col-10 px-0">
                        <p className="stake_label">Ends In</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 pe-0">
                    <p className="stake_values text_highlight text-end">
                      {
                        new Date().getTime() > props?.val?.stakeEndDate ? 0 :

                          <Countdown
                            date={props?.val?.stakeEndDate}
                            renderer={renderer}
                          />
                      }
                    </p>
                  </div>
                </div>
              }

            </div>

            <div className="stake_card_list_buttons_wrapper">
              <div className="">
                <p className="stake_title_bold_xs"><GiTwoCoins className="me-2 mb-1 stake_gray_svg" fontSize={19} />
                  Stake <span>Earned</span></p>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 mt-1">
                  <div>
                    <p className="earn_value_bold">{toCutOff(rewardAmount, (11))}</p>
                    <p className="earn_value_xs">
                      {props?.val?.rewardTokenSymbol}
                    </p>
                  </div>
                  {
                    props?.val?.status == true &&
                    <button className="grad_btn hover_opacity" onClick={() => checkEligibleToClaimb()}> Claim </button>
                  }

                </div>

              </div>

            </div>
            <div className="stake_card_list_buttons_wrapper">
              <p className="stake_subtitle">Stake to enjoy more rewards & benefit!
              </p>
              <div className="mt-4">
                {/* {props && (new Date().getTime() > props?.val?.stakeEndDate && props?.val?.stakeEndDate != null) || (props?.val?.status == false) ? ( */}
                {props && (new Date().getTime() > props?.val?.stakeEndDate && props?.val?.stakeEndDate != null && props?.val?.userPartispantAmount > 0) || (props?.val?.userPartispantAmount > 0 && props?.val?.status == false) ? (

                  <button
                    className="stake_green_btn"
                    // onClick={() => setUnstakeShow(true)}
                    onClick={unstakebtn}
                  >
                    <LiaLayerGroupSolid className="" fill="#fff" fontSize={20} />
                    UnStake
                  </button>
                ) : (

                  getUser && getUser ?
                    <button
                      className="stake_green_btn"
                      onClick={() => handleAddLiquidityShow()}
                    >
                      <FaLayerGroup className="me-1" fill="#fff" fontSize={13} /> Stake
                    </button> :
                    <button
                      className="stake_green_btn"
                      onClick={() => {
                        sessionStorage.setItem('loginFrom', '/staking')
                        navigate('/login')
                      }}
                    >
                      <FaLayerGroup className="me-1" fill="#fff" fontSize={13} /> Login
                    </button>
                )}

              </div>

            </div>

          </div> : null}





        {/* <div className="stake_card_header d-flex  align-items-center justify-content-between gap-3">
            <div>
              <p className="stake_title">{props?.val?.currencySymbol}</p>
              <p className="stake_subtitle">Lorem ipsum
              </p>
            </div>

            <div className="stake_card_prfl_wrapper">
              <img
                src={props.val.currencyimage}
                alt=""
                className="img_fit_container"
              />
            </div>

          </div>

          <div className="stake_card_body position-relative">
            <div className="d-flex align-items-center justify-content-end">
              <div className=" stake_card_badge">{props?.val.duration} Days</div>
            </div>

            <div className="mt-4 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <AiOutlineCalculator className="me-2 mb-1 stake_gray_svg" />
                <p className="stake_label">APR</p>
              </div>
              <p className="stake_values">{props?.val?.apr} %</p>
            </div>

            <div className="mt-4">
              <p className="stake_title_bold_xs"><GiTwoCoins className="me-2 mb-1 stake_gray_svg" fontSize={19} />
                Stake <span>Earned</span></p>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <div>
                  <p className="earn_value_bold">0</p>
                  <p className="earn_value_xs">
                    0 USD
                  </p>
                </div>
                {
                  props?.val?.status == true &&
                  <button className="grad_btn hover_opacity" onClick={() => checkEligibleToClaimb()}> Claim </button>
                }

              </div>
            </div>
            <div className="mt_2rem">
              {props && (new Date().getTime() > props?.val?.stakeEndDate && props?.val?.stakeEndDate != null) || (props?.val?.status == false) ? (

                <button
                  className="stake_green_btn"
                  onClick={() => setUnstakeShow(true)}
                >
                  {" "}
                  UnStake
                </button>
              ) : (

                <button
                  className="stake_green_btn"
                  onClick={() => handleAddLiquidityShow()}
                >
                  Stake{" "}
                </button>
              )}

            </div>


          </div>
          <div className="stake_card_footer">
            <div className="d-flex justify-content-end">
              <button className="green_button_bg_none "
                onClick={() => setShowStakeDetails(!showStakeDetails)}>
                {showStakeDetails ?
                  <>Hide <FaAngleUp className="ms-2" /></>
                  : <>Details <FaAngleDown className="ms-2" /></>
                }
              </button>
            </div>

            {showStakeDetails ? <div>

              <div className="d-flex align-items-center justify-content-between mt-4">
                <p className="stake_label">Minimum stake</p>
                <p className="stake_values text-end">
                  {props?.val?.minimumStake} {props?.val?.currencySymbol}
                </p>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-2">
                <p className="stake_label"> Total Share</p>
                <p className="stake_values">
                  {props?.val?.totalSale?.toFixed(3)} {props?.val?.currencySymbol}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <p className="stake_label">Stakers</p>
                <p className="stake_values">{props?.val?.totalusers}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <p className="stake_label">Ends In</p>
                <p className="stake_values">13 h : 20 m : 10 s</p>
              </div>
       
            </div> : null}
          </div> */}
      </div>
    </div>
  );
};

export default StakeCardList;
