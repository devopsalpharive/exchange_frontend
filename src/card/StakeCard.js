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
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




/** Config */
import { showToastMessage } from "../config/toast";
import { toFixedNumber, overNightCalculation } from "../config/lib";
import { toCutOff } from "../lib/Calculationlib";


const StakeCard = (props) => {
  const navigate = useNavigate()
  const { getUser } = useSelector((state) => state.user);

  const [addLiquidityShow, setAddLiquidityShow] = useState(false);
  const [unstakeShow, setUnstakeShow] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showStakeDetails, setShowStakeDetails] = useState(false)
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
      // console.log("REward_claimb_token", props?.val?.stakeEndDate, props?.val?.status && parseFloat(props?.val?.stakeEndDate) > new Date().getTime());
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
          console.log("calculateRewarsPercentagecalculateRewarsPercentage",claimbAmount, props?.val);
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
  }, [rewardAmount, addLiquidityShow, props])

  const unstakebtn = () => {

    if (props?.val?.status == false) {
      Swal.fire({
        title: "After unstake, the stake pool is removed from the page.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: '#ff602e',
        cancelButtonColor: '#570ebe',

      }).then((result) => {

        if (result.isConfirmed) {
          setUnstakeShow(true)
        } else if (result.isDenied) {
          // Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      setUnstakeShow(true)
    }

  }
  return (
    <div>
      {/* {
        console.log("REward_claimb", rewardAmount, props?.val?.stakeEndDate > new Date().getTime())
      } */}
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

      <div className="stake_card_animation_border">
        <div className="stake_card position-relative">

          {/* <div className="position-absolute stake_card_badge">{props?.val.duration} Days</div> */}

          {/* <div className="d-flex align-items-center gap-3">
          <img
            src={props.val.currencyimage}
            alt="coin"
            className="img-fluid stake_coin_img"
          />
          <p className="stake_title">{props?.val?.currencySymbol}</p>
        </div> */}

          <div className="stake_card_header d-flex  align-items-center justify-content-between gap-3">
            <div>
              <p className="stake_title">Earn {props?.val?.rewardTokenSymbol}</p>
              <p className="stake_subtitle">Stake {props?.val?.currencySymbol}
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
            <div className="d-flex align-items-center justify-content-between">
              <div className="stake_label">Locked Days</div>
              <div className=" stake_card_badge">{props?.val.duration} Days</div>
            </div>

            <div className="mt-4 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <AiOutlineCalculator className="me-2 mb-1 stake_gray_svg" />
                <p className="stake_label">APY</p>
              </div>
              <p className="stake_values">{props?.val?.apr} %</p>
            </div>

            <div className="mt-4">
              <p className="stake_title_bold_xs"><GiTwoCoins className="me-2 mb-1 stake_gray_svg" fontSize={19} />
                Stake <span>Earned</span></p>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <div>
                  <p className="earn_value_bold">{rewardAmount && rewardAmount == 0 ? rewardAmount : toCutOff(rewardAmount, (16))}</p>


                  <p className="earn_value_xs">
                    {props?.val?.rewardTokenSymbol}
                  </p>

                </div>
                {

                  (props?.val?.status == true && props?.val?.userPartispantAmount > 0 && complete) &&
                  <button className="grad_btn hover_opacity" onClick={() => checkEligibleToClaimb()}> Claim </button>
                }
              </div>
            </div>
            <div className="mt_2rem">
              {console.log("STAKE_ISSSUEEEE", props?.val, {
                endDate : props?.val?.stakeEndDate,
                amunt : props?.val?.userPartispantAmount
              })}
              {props && (new Date().getTime() > props?.val?.stakeEndDate && props?.val?.stakeEndDate != null && props?.val?.userPartispantAmount > 0) || (props?.val?.userPartispantAmount > 0 && props?.val?.status == false) ? (

                <button
                  className="stake_green_btn"
                  onClick={unstakebtn}
                >
                  <LiaLayerGroupSolid className="" fill="#fff" fontSize={20} />
                  UnStake
                </button>
              ) :

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
              }

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

              <div className="row mx-auto mt-3">
                <div className="col-6 px-0">
                  <div className="row mx-auto"  >
                    <div className="col-2 px-0">
                      <GiTwoCoins className="mb-2 stake_gray_svg" />
                    </div>
                    <div className="col-10 px-0">
                      <p className="stake_label">Claim Interval</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 pe-0">
                  <p className="stake_values text-end">
                    {props?.val?.redemptionPeriod} days
                  </p>
                </div>
              </div>

              <div className="row mx-auto mt-2">
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
                      <p className="stake_label">Total staked</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 pe-0">
                  <p className="stake_values text-end">
                    {props?.val?.totalSale?.toLocaleString('en-US')} {props?.val?.currencySymbol}
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
                (props && props?.val?.stakeEndDate > Date.now() && props?.val?.stakeEndDate != null && props?.val?.stakeEndDate != 0 && props?.val?.status == true) &&
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
                      <Countdown
                        date={props?.val?.stakeEndDate}
                        renderer={renderer}
                      />
                    </p>
                  </div>
                </div>
              }
              {/* <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center icon_btun-center mt_2rem   stake_btn ">
           

                {props && (new Date().getTime() > props?.val?.stakeEndDate && props?.val?.stakeEndDate != null) || (props?.val?.status == false) ? (

                  <button
                    className="grn_grd_btn"
                    onClick={() => setUnstakeShow(true)}
                  >
                    {" "}
                    UnStake
                  </button>
                ) : (

                  <button
                    className="grn_grd_btn"
                    onClick={() => handleAddLiquidityShow()}
                  >
                    Stake{" "}
                  </button>
                )}
                {
                  props?.val?.status == true &&
                  <button className=" gray_btn " onClick={() => checkEligibleToClaimb()}> Claim </button>
                }
              </div> */}
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeCard;
