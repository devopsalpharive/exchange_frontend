import React, { useState } from 'react'
import Lottie from 'lottie-react'
import { FaArrowDown, FaPlus } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Select from 'react-select'



import Header from '../../Layout/Header'
import { Images } from '../../data/Images';
import bannerJson from "../../asset/json/traderdashboard.json";
import SelectCurrency from '../../modal/SelectCurrency';
import OpenOrders from '../../components/SpotTrade/OpenOrders';



const CurrencyConversion = (props) => {

  const [selectedTab, setSelectedTab] = useState('Instant')
  const [instantCardSwap, setInstantCardSwap] = useState(false)
  const [recurringCardSwap, setRecurringCardSwap] = useState(false)
  const [limitCardSwap, setLimitCardSwap] = useState(false)
  const [showSelectCurrency, setShowSelectCurrency] = useState(false)
  const [currencyList, setCurrencyList] = useState([
    {
      id: 1,
      image: Images.kh1,
      name: "Bitcoin"
    },
    {
      id: 2,
      image: Images.kh1,
      name: "Bitcoin"
    },
    {
      id: 3,
      image: Images.kh1,
      name: "Bitcoin"
    },
    {
      id: 4,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 5,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 6,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 7,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 8,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 9,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 10,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 11,
      image: Images.kh1,
      name: "Bitcoin"
    }, {
      id: 12,
      image: Images.kh1,
      name: "Bitcoin"
    },
  ])
  const [frequencyData, setFrequencyData] = useState([
    {
      id: 1,
      frequencyType: "Hourly",
      frequencyDay: null
    },
    {
      id: 2,
      frequencyType: "Daily",
      frequencyDay: null
    },
    {
      id: 3,
      frequencyType: "Weekly",
      frequencyDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
      id: 4,
      frequencyType: "Bi-Weekly",
      frequencyDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
      id: 4,
      frequencyType: "Monthly",
      frequencyDay: ['1', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', '11', '12', '13', '14',
        '15', '16', '17', '18', '19', '20', '21',
        '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    },
  ]);
  const [showFrequencySelection, setShowFrequencySelection] = useState(false)
  const [selectedFrequency, setSelectedFrequency] = useState('Monthly');

  const options = [
    { value: "7d", label: "Expires in 7 days" },
    { value: "10d", label: "Expires in 10 days" },
    { value: "1m", label: "Expires in 1 month" },
    { value: "1y", label: "Expires in 1 year" },
  ];

  console.log('frequencydata', frequencyData.filter((item) => item.frequencyType == 'Monthly' ? item.frequencyDay.map((mapItem) => <p>{mapItem}</p>) : item))

  const handleShowSelectCurrency = () => {
    setShowSelectCurrency(true)
  }
  const handleCloseSelectCurrency = () => {
    setShowSelectCurrency(false)
  }

  // const date = new Date('2024', '11');

  // function getDaysInMonth(month, year) {
  //   var date = new Date(year, month, 1);
  //   var days = [];
  //   while (date.getMonth() === month) {
  //     days.push(new Date(date));
  //     date.setDate(date.getDate() + 1);
  //   }
  //   return days;
  // }

  return (
    <div>

      {/* modal - start */}

      <SelectCurrency
        show={showSelectCurrency}
        handleClose={handleCloseSelectCurrency} />

      {/* modal - end */}

      <Header props={props} />

      <section className='custom_section screen_min_ht'>
        <div className="cover_banner_w100">
          <div className="container container80">
            <div className='row d-flex flex-column-reverse flex-lg-row'>
              <div className='col-12 col-lg-6 d-flex align-items-center'>
                <div className='banner_left '>
                  <h3 className='title launch_title'>
                    Currency Conversion
                  </h3>
                  <p className='desc pt-3 pb-4' >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="launch_banner_right d-flex justify-content-center justify-content-lg-end">
                  <Lottie
                    animationData={bannerJson}
                    className="copy_trade_json"
                    loop={true}
                  />
                </div>
              </div>
            </div>


          </div>
        </div>
        <div className='inner_body_section'>

          {selectedTab == 'Instant' ?
            <div className='container container80'>
              <div className='row justify-content-center'>
                <div className='col-xl-8 col-xxl-6'>
                  <div className='am_tabs justify-content-lg-center'>
                    {/* <button
                      className={`${selectedTab == 'Instant' ? "active" : ""}`}
                      onClick={() => setSelectedTab('Instant')}
                    >Instant</button> */}
                    {/* <button
                      className={`${selectedTab == 'Recurring' ? "active" : ""}`}
                      onClick={() => setSelectedTab('Recurring')}
                    >Recurring</button>
                    <button
                      className={`${selectedTab == 'Limit' ? "active" : ""}`}
                      onClick={() => setSelectedTab('Limit')}
                    >Limit</button> */}
                  </div>
                  <div className='converstion_tabs_body mt-5'>
                    <div className='conversion_card'>
                      <div className='conversion_card_sections'>
                        <div className='cc_left'>
                          <p className='tc_value_details_left_lite'>From</p>
                          <button
                            className='cc_currency_select'
                            onClick={handleShowSelectCurrency}
                          >
                            <div className='cc_currency_image'>
                              <img
                                src={Images.kh6}
                                alt='currency' />
                            </div>

                            <p className='cc_selected_name'>
                              USDT
                            </p>
                            <FaChevronDown fontSize={10} />
                          </button>
                        </div>
                        <div className='cc_right'>
                          <div className='cc_available'>
                            <p className='cc_available_text'>
                              Available
                            </p>
                            <p className='cc_available_value'>
                              <span className='me-1'>0</span>USDT
                            </p>
                            {/* <button className='cc_available_button'>
                              <FaPlus fontSize={14} />
                            </button> */}
                          </div>
                          <div className='cc_input_value_wrapper'>
                            <input
                              placeholder='0.01 - 2,900,000'
                              className='cc_required_value' />
                            <p className='cc_required_onchangevalue'><span className='me-1'>≈</span> $3,434,343</p>

                          </div>
                        </div>
                      </div>
                      <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>
                    </div>
                    <div className='conversion_card conversion_card_bottom'>
                      <button
                        className='cc_card_swap_button'
                        onClick={() => setInstantCardSwap(!instantCardSwap)}
                      >
                        <LuArrowDownUp fontSize={25} />
                      </button>
                      <div className='conversion_card_sections'>

                        <div className='cc_left'>
                          <p>To</p>
                          <button
                            className='cc_currency_select'
                            onClick={handleShowSelectCurrency}
                          >
                            <div className='cc_currency_image'>
                              <img
                                src={Images.kh6}
                                alt='currency' />
                            </div>

                            <p className='cc_selected_name'>
                              BNB
                            </p>
                            <FaChevronDown fontSize={10} />
                          </button>
                        </div>
                        <div className='cc_right'>
                          <div className='cc_available'>
                            <p className='cc_available_text'>
                              Available
                            </p>
                            <p className='cc_available_value'>
                              <span className='me-1'>0</span>BNB
                            </p>
                          </div>
                          <div className='cc_input_value_wrapper'>
                            <input
                              placeholder='0.000014 - 4,200'
                              className='cc_required_value' />
                            <p className='cc_required_onchangevalue'>
                              <span className='me-1'>≈</span> $3,434,343
                            </p>
                          </div>
                        </div>


                      </div>
                      <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>
                    </div>

                    <div className='mt-4'>
                      <div className='cc_converted_aprox_container'>
                        <p className='cc_converted_aprox_label'>Rate</p>
                        <p className='cc_converted_aprox_value'><span>1 BNB</span> ≈ <span>703.613 USDT</span> </p>
                      </div>
                      <button className='linear_btn'>Enter an amount</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='cc_bottom_section' >
                {/* <h5 className='mb-0 fw-bold '>Convert USDT (TetherUS) to other currencies
                </h5>
                <p className='mt-3 cc_bottom_section_desc'>
                  Swap your TetherUS to other currencies easily in one go!
                </p>
                <div className='cc_instant_currency_grid'>
                  {currencyList.map((item) =>
                  (
                    <div
                      key={item.id}
                      className='cc_instant_currency_grid_wrap'>
                      <div className='cc_instant_currency_grid_imgwrap'>
                        <img src={item.image} />
                      </div>
                      <p className='cc_instant_currency_grid_name'>{item.name}</p>
                    </div>
                  )
                  )}

                </div> */}
                <h5 className='mb-0 fw-bold '>Convert History
                </h5>

                <div className=" mt-4">
                  <div className="custom_tableWrap table_body_white ">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-center snum_width">S.no </th>
                          <th className="text-center">Date </th>
                          <th className="text-center">Wallet</th>
                          <th className="text-center"> Pair</th>
                          <th className="text-center">Sell</th>
                          <th className="text-center">Buy</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Expires</th>
                          <th className="text-center">Expiration</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td className="text-center snum_width">
                            1
                          </td>
                          <td className="text-center">
                            31-12-2024
                          </td>
                          <td className="text-center">
                            Wallet
                          </td>
                          <td className="text-center">
                            Pair
                          </td>
                          <td className="text-center">
                            Sell
                          </td>
                          <td className="text-center">
                            Buy
                          </td>
                          <td className="text-center">
                            Price
                          </td>
                          <td className="text-center">
                            Expires
                          </td>
                          <td className="text-center">
                            Expiration
                          </td>
                          <td className="text-center">
                            Action
                          </td>
                        </tr>

                        {/* :
                          <tr>
                            <td className="text-center" colSpan={7}>
                              {" "}
                              <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                                <FaBoxOpen fontSize={35} />
                                No Data Found
                              </div>
                            </td>
                          </tr> */}

                      </tbody>
                    </table>

                  </div>


                  {/* <div className="d-flex justify-content-center">
                      <button
                        className="grad_btn  px-4 fw_sm mt_2rem"
                        onClick={() => {
                          LoadMore()
                        }}
                      >
                        Load More
                      </button>
                    </div> */}

                </div>
              </div>
            </div>
            :
            selectedTab == 'Recurring' ?
              <div className='container container80'>
                <div className='row justify-content-center'>
                  <div className='col-xl-8 col-xxl-6'>
                    <div className='am_tabs justify-content-lg-center'>
                      <button
                        className={`${selectedTab == 'Instant' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Instant')}
                      >Instant</button>
                      <button
                        className={`${selectedTab == 'Recurring' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Recurring')}
                      >Recurring</button>
                      <button
                        className={`${selectedTab == 'Limit' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Limit')}
                      >Limit</button>
                    </div>
                    <div className='converstion_tabs_body mt-5'>
                      <div className='conversion_card'>
                        <div className='conversion_card_sections'>
                          <div className='cc_left'>
                            <p className='tc_value_details_left_lite'>From</p>
                            <button
                              className='cc_currency_select'
                              onClick={handleShowSelectCurrency}
                            >
                              <div className='cc_currency_image'>
                                <img
                                  src={Images.kh6}
                                  alt='currency' />
                              </div>

                              <p className='cc_selected_name'>
                                USDT
                              </p>
                              <FaChevronDown fontSize={10} />
                            </button>
                          </div>
                          <div className='cc_right'>
                            <div className='cc_available'>
                              <p className='cc_available_text'>
                                Available
                              </p>
                              <p className='cc_available_value'>
                                <span className='me-1'>0</span>USDT
                              </p>
                              {/* <button className='cc_available_button'>
                                <FaPlus fontSize={14} />
                              </button> */}
                            </div>
                            <div className='cc_input_value_wrapper'>
                              <input
                                placeholder='0.01 - 2,900,000'
                                className='cc_required_value' />
                              <p className='cc_required_onchangevalue'><span className='me-1'>≈</span> $3,434,343</p>

                            </div>
                          </div>
                        </div>
                        <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>
                      </div>
                      <div className='conversion_card conversion_card_bottom'>
                        <button
                          className='cc_card_swap_button'
                          onClick={() => setInstantCardSwap(!instantCardSwap)}
                        >
                          <LuArrowDownUp fontSize={25} />
                        </button>
                        <div className='conversion_card_sections'>

                          <div className='cc_left'>
                            <p>To</p>
                            <button
                              className='cc_currency_select'
                              onClick={handleShowSelectCurrency}
                            >
                              <div className='cc_currency_image'>
                                <img
                                  src={Images.kh6}
                                  alt='currency' />
                              </div>

                              <p className='cc_selected_name'>
                                BNB
                              </p>
                              <FaChevronDown fontSize={10} />
                            </button>
                          </div>
                          <div className='cc_right'>
                            <div className='cc_available'>
                              <p className='cc_available_text'>
                                Available
                              </p>
                              <p className='cc_available_value'>
                                <span className='me-1'>0</span>BNB
                              </p>
                            </div>
                            <div className='cc_input_value_wrapper'>
                              <input
                                placeholder='0.000014 - 4,200'
                                className='cc_required_value' />
                              <p className='cc_required_onchangevalue'>
                                <span className='me-1'>≈</span> $3,434,343
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>

                      </div>

                      <button
                        className='cc_frequency_section'
                        onClick={() => setShowFrequencySelection(!showFrequencySelection)}
                      >
                        <p className='cc_selected_frequency'>
                          Frequency
                        </p>

                        <button
                          className='cc_frequency_right'

                        >
                          <p>Hourly</p>
                          <FaChevronDown fontSize={10} />
                        </button>

                        {showFrequencySelection &&
                          <div className='cc_frequency_selection'>
                            <div className='row mx-auto'>
                              <div className='col-6 px-0'>
                                <div className='cc_frequency_type'>
                                  <p className='cc_frequency_selection_title'>
                                    Frequency
                                  </p>

                                  <div className='cc_frequency_type_list'>
                                    <button
                                      className={selectedFrequency == 'Hourly' ? "active" : ""}
                                      onClick={() => {
                                        setSelectedFrequency('Hourly');
                                        setShowFrequencySelection(false)
                                      }}>
                                      Hourly</button>

                                    <button
                                      className={selectedFrequency == 'Daily' ? "active" : ""}
                                      onClick={() => {
                                        setSelectedFrequency('Daily');
                                        setShowFrequencySelection(false)
                                      }}>Daily</button>

                                    <button
                                      className={selectedFrequency == 'Weekly' ? "active" : ""}
                                      onClick={() => {
                                        setSelectedFrequency('Weekly');
                                        setShowFrequencySelection(false)
                                      }}>Weekly</button>

                                    <button className={selectedFrequency == 'Bi-weekly' ? "active" : ""}
                                      onClick={() => {
                                        setSelectedFrequency('Bi-weekly');
                                        setShowFrequencySelection(false)
                                      }}>Bi-weekly</button>

                                    <button className={selectedFrequency == 'Monthly' ? "active" : ""}
                                      onClick={() => {
                                        setSelectedFrequency('Monthly');
                                        setShowFrequencySelection(false)
                                      }}>Monthly</button>

                                  </div>
                                </div>
                              </div>

                              <div className='col-6 px-0'>
                                <div className='cc_frequency_day'>
                                  <p className='cc_frequency_selection_title'>
                                    Day
                                  </p>

                                  <div className='cc_frequency_type_list'>
                                    <button>Monday</button>
                                    <button>Tuesday</button>
                                    <button>Wednesday</button>
                                    <button>Thursday</button>
                                    <button>Friday</button>
                                    <button>Saturday</button>
                                    <button>Sunday</button>

                                    {/* {frequencyData.filter((item) => item.frequencyType == selectedFrequency ? item?.frequencyDay?.length ? item?.frequencyDay.map((dayItem) => (<button>{dayItem}</button>)) : null : <></>)} */}

                                    {/* {frequencyData?.filter((item) => item.frequencyType == selectedFrequency)} */}

                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        }

                      </button>



                      <div className='mt-4'>
                        <div className='cc_converted_aprox_container'>
                          <p className='cc_converted_aprox_label'>Rate</p>
                          <p className='cc_converted_aprox_value'><span>1 BNB</span> ≈ <span>703.613 USDT</span> </p>
                        </div>
                        <button className='linear_btn'>Enter an amount</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='cc_bottom_section' >
                  <h5 className='mb-0 fw-bold '>Recurring Plans
                  </h5>

                  <div className=" mt-4">
                    <div className="custom_tableWrap table_body_white ">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center snum_width">S.no </th>
                            <th className="text-center">Create Time </th>
                            <th className="text-center">Next Invest Time</th>
                            <th className="text-center"> Frequency</th>
                            <th className="text-center">From</th>
                            <th className="text-center">To</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          <tr>
                            <td className="text-center snum_width">
                              1
                            </td>
                            <td className="text-center">
                              31-12-2024
                            </td>
                            <td className="text-center">
                              Next Invest Time
                            </td>
                            <td className="text-center">
                              Frequency
                            </td>
                            <td className="text-center">
                              From
                            </td>
                            <td className="text-center">
                              To
                            </td>
                            <td className="text-center">
                              Amount
                            </td>
                            <td className="text-center">
                              Action
                            </td>
                          </tr>

                          {/* :
                          <tr>
                            <td className="text-center" colSpan={7}>
                              {" "}
                              <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                                <FaBoxOpen fontSize={35} />
                                No Data Found
                              </div>
                            </td>
                          </tr> */}

                        </tbody>
                      </table>

                    </div>


                    {/* <div className="d-flex justify-content-center">
                      <button
                        className="grad_btn  px-4 fw_sm mt_2rem"
                        onClick={() => {
                          LoadMore()
                        }}
                      >
                        Load More
                      </button>
                    </div> */}

                  </div>
                </div>
              </div> :
              <div className='container container80'>
                <div className='row justify-content-center'>
                  <div className='col-xl-8 col-xxl-6'>
                    <div className='am_tabs justify-content-lg-center'>
                      <button
                        className={`${selectedTab == 'Instant' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Instant')}
                      >Instant</button>
                      <button
                        className={`${selectedTab == 'Recurring' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Recurring')}
                      >Recurring</button>
                      <button
                        className={`${selectedTab == 'Limit' ? "active" : ""}`}
                        onClick={() => setSelectedTab('Limit')}
                      >Limit</button>
                    </div>
                    <div className='converstion_tabs_body mt-5'>
                      <div className='conversion_card'>
                        <div className='conversion_card_sections'>
                          <div className='cc_left'>
                            <p className='tc_value_details_left_lite'>From</p>
                            <button
                              className='cc_currency_select'
                              onClick={handleShowSelectCurrency}
                            >
                              <div className='cc_currency_image'>
                                <img
                                  src={Images.kh6}
                                  alt='currency' />
                              </div>


                              <p className='cc_selected_name'>
                                USDT
                              </p>
                              <FaChevronDown fontSize={10} />
                            </button>
                          </div>
                          <div className='cc_right'>
                            <div className='cc_available'>
                              <p className='cc_available_text'>
                                Available
                              </p>
                              <p className='cc_available_value'>
                                <span className='me-1'>0</span>USDT
                              </p>
                              {/* <button className='cc_available_button'>
                                <FaPlus fontSize={14} />
                              </button> */}
                            </div>
                            <div className='cc_input_value_wrapper'>
                              <input
                                placeholder='0.01 - 2,900,000'
                                className='cc_required_value' />
                              <p className='cc_required_onchangevalue'><span className='me-1'>≈</span> $3,434,343</p>

                            </div>
                          </div>
                        </div>
                        <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>
                      </div>
                      <div className='conversion_card conversion_card_bottom'>
                        <button
                          className='cc_card_swap_button'
                          onClick={() => setInstantCardSwap(!instantCardSwap)}
                        >
                          <LuArrowDownUp fontSize={25} />
                        </button>
                        <div className='conversion_card_sections'>
                          <div className='cc_left'>
                            <p>To</p>
                            <button
                              className='cc_currency_select'
                              onClick={handleShowSelectCurrency}
                            >
                              <div className='cc_currency_image'>
                                <img
                                  src={Images.kh6}
                                  alt='currency' />
                              </div>

                              <p className='cc_selected_name'>
                                BNB
                              </p>
                              <FaChevronDown fontSize={10} />
                            </button>
                          </div>
                          <div className='cc_right'>
                            <div className='cc_available'>
                              <p className='cc_available_text'>
                                Available
                              </p>
                              <p className='cc_available_value'>
                                <span className='me-1'>0</span>BNB
                              </p>
                            </div>
                            <div className='cc_input_value_wrapper'>
                              <input
                                placeholder='0.000014 - 4,200'
                                className='cc_required_value' />
                              <p className='cc_required_onchangevalue'>
                                <span className='me-1'>≈</span> $3,434,343
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className='cc_danger_tag text-danger mt-2'>Amount is more than the maximum amount (4200 BNB).</p>

                      </div>

                      <div className='conversion_card conversion_card_bottom'>
                        <div className='conversion_card_sections'>
                          <div className='cc_left'>
                            <p>To</p>
                            <button
                              className='cc_currency_select'
                            >
                              <div className='cc_currency_image'>
                                <img
                                  src={Images.kh6}
                                  alt='currency' />
                              </div>

                              <p className='cc_selected_name'>
                                USDC
                              </p>
                            </button>
                          </div>
                          <div className='cc_right'>
                            <div className=''>
                              <Select
                                // menuIsOpen={true}
                                options={options}
                                isSearchable={false}
                                placeholder="Expires in 7 days"
                                classNamePrefix="react_select_two"
                              />
                            </div>
                            <div className='cc_input_value_wrapper'>
                              <input
                                placeholder='0.01 - 2,900,000'
                                className='cc_required_value' />
                              <p className='cc_required_onchangevalue'><span className='me-1'>≈</span> $3,434,343</p>

                            </div>
                          </div>
                        </div>
                      </div>



                      <div className='mt-4'>
                        <div className='cc_converted_aprox_container'>
                          <p className='cc_converted_aprox_label'>Rate</p>
                          <p className='cc_converted_aprox_value'><span>1 BNB</span> ≈ <span>703.613 USDT</span> </p>
                        </div>
                        <button className='linear_btn'>Place Order</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='cc_bottom_section' >
                  <h5 className='mb-0 fw-bold '>Open Orders
                  </h5>
                  {/* <p className='mt-3 cc_bottom_section_desc'>
                    Swap your TetherUS to other currencies easily in one go!
                  </p> */}
                  <div className='mt-4'>
                    <OpenOrders />
                  </div>
                </div>
              </div>
          }

        </div>

      </section>
    </div>
  )
}

export default CurrencyConversion