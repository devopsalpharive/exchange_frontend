import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoStarFill } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { isEmpty } from "../../lib/isEmpty";

import { setSpotTicker, setSpotTradePair } from "../../actions/spotReduxAction";

const CoinPairs = () => {
  const navigate = useNavigate();
  const { tikerRoot } = useParams()
  const { spotPair, spotTicker } = useSelector((state) => state.spot);
  const { pairList } = useSelector((state) => state.pairList);
  const swiperRef = useRef(null);
  const [selectCurrency, setselectCurrency] = useState("All");
  const [pairData, setPairData] = useState([]);
  const [secondCurrencyList, setsecondCurrencyList] = useState([]);
  const [PairSearch, setPairSearch] = useState("");

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleselectCurrency = (getId) => {
    setselectCurrency(getId);
  };

  const handlePairSearch = (e) => {
    try {
      const query = e.target.value;
      setPairSearch(query);
      let regx = new RegExp(query, "i");

      if (pairList && pairList.length > 0) {
        if (!isEmpty(query)) {
          let FilterData = pairList.filter((val) => {
            let pairName = val.firstCurrency + "/" + val.secondCurrency;
            return pairName.match(regx);
          });
          setPairData(FilterData);
        } else {
          setPairData(pairList);
        }
      }
    } catch (err) {
      console.log(err, 'handlePairSearch___err')
    }
  };

  //useEffect

  useEffect(() => {
    if (!isEmpty(pairList)) {
      secondCurrencyArray();
      if (!isEmpty(PairSearch)) {
        let regx = new RegExp(PairSearch, "i");
        let FilterData = pairList.filter((val) => {
          let pairName = val.firstCurrency + "/" + val.secondCurrency;
          return pairName.match(regx);
        });
        setPairData(FilterData);
      } else {
        setPairData(pairList);
      }
    }
  }, [pairList]);

  const secondCurrencyArray = () => {
    try {
      let uniqueChars = ["All"];
      pairList.forEach((c) => {
        if (!uniqueChars.includes(c.secondCurrency)) {
          uniqueChars.push(c.secondCurrency);
        }
      });
      setsecondCurrencyList(uniqueChars);
    } catch (err) {
      console.log(err, "secondCurrencyArray___err");
    }
  };

  const handlePairChange = (val) => {
    try {
      let pair = val.tikerRoot;
      let pairDetail = pairList.find((el) => el.tikerRoot == val.tikerRoot);
      localStorage.setItem("curpair", pair);
      setSpotTradePair(pairDetail);
      setSpotTicker(pairDetail);
      navigate("/spot-trading/" + pair, { replace: true });
    } catch (err) {
      console.log(err, "handlePairChange__err");
    }
  };
  return (
    <div className="trade_card">
      <div className="h-100">
        <div className="trade_search d-flex align-items-center">
          <CiSearch className="trade_search_icon" />
          <input
            type="text"
            className="trade_search_input "
            placeholder="Search"
            onChange={handlePairSearch}
          />
        </div>

        <div className="coin_pairs_details ">
          <div className="cp_dtls_heads d-flex align-items-center position-relative trade_swiper">
            <Swiper
              slidesPerView={
                secondCurrencyList.length >= 3 ? 3 : secondCurrencyList.length
              }
              spaceBetween={20}
              pagination={false}
              centeredSlides={false}
              ref={swiperRef}
              navigation={{
                nextEl: ".swiper-button-next1",
                prevEl: ".swiper-button-prev1",
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {secondCurrencyList.length > 0
                ? secondCurrencyList.map((swipValue) => {
                  return (
                    <SwiperSlide>
                      <button
                        className={`border-0 mt-1  outline-0 bg-transparent d-flex align-items-center justify-content-center swiperTabs ${selectCurrency === swipValue ? "swiperActive" : ""
                          }`}
                        onClick={() => handleselectCurrency(swipValue)}
                      >
                        {swipValue}
                      </button>
                    </SwiperSlide>
                  );
                })
                : ""}
            </Swiper>
            <button
              className="swiper-button-prev1 border-0 outline-0 bg-transparent  position-absolute"
              onClick={() => goPrev()}
            >
              <FaCaretLeft />
            </button>
            <button
              className="swiper-button-next1  border-0 outline-0 bg-transparent  position-absolute "
              onClick={() => goNext()}
            >
              <FaCaretRight />
            </button>
          </div>
          <div className="cp_dtls_body">
            <div className="cp_dtls_body_top row mx-auto">
              <div className="col-4 px-0">
                <p>Pairs</p>
              </div>
              <div className="col-5 px-0">
                <p className="text-end me-3">Last Price</p>
              </div>
              <div className="col-3 px-0 ">
                <p className="text-end">Change</p>
              </div>
            </div>

            <div className="cp_dtsl_body_cont">
              {pairData.length > 0 &&
                pairData.map((val) => {
                  // console.log(val, 'pairData_coinpair')
                  if (
                    val.secondCurrency == selectCurrency ||
                    selectCurrency == "All"
                  ) {
                    return (
                      <div
                        className={`cp_dtls_body_bottom row mx-auto ${tikerRoot == val.tikerRoot ? "active" : ""}`}
                        // className="cp_dtls_body_bottom row mx-auto active"
                        onClick={() => {
                          handlePairChange(val);
                        }}
                      >
                        <div className="col-4 px-0">
                          <div className="d-flex align-items-center gap-2">

                            <p className="text-start" style={{ cursor: "pointer" }}>
                              {val?.firstCurrency}/{val?.secondCurrency}
                            </p>
                          </div>
                        </div>
                        <div className="col-5 px-0 ">
                          <p className="text-end me-3" style={{ cursor: "pointer" }}>
                            {isNaN(val?.last)
                              ? 0
                              : (val?.last).toFixed(val?.secondDecimal)}
                          </p>
                        </div>
                        <div className="col-3 px-0">
                          <p
                            className={`text-end ${val.change > 0 ? "val_green_txt" : "val_red_txt"
                              }`}
                            style={{ cursor: "pointer" }}
                          >
                            {isNaN(val?.change) ? 0 : val?.change?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  }
                })}



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPairs;
