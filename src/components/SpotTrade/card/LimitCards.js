import React, { useEffect, useRef, useState } from "react";
import TradeValueInput from "../TradeValueInput";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSelector } from "react-redux";

import Select from "react-select";
import { isEmpty, ObjectIsempty } from "../../../lib/isEmpty";
import { OrderPlacing } from "../../../actions/spotTradeAction";
import { encryptObject } from "../../../lib/CryptoJs";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { showToastMessage } from "../../../lib/toast";

const initalFormvalue = {
  price: '0',
  quantity: '0',
  orderValue: '0',
  stopPrice: '0',
  volume: "0"
}
const LimitCards = ({ buyorsell, orderType, error }) => {
  const { tikerRoot } = useParams()
  const navigate = useNavigate()
  // const { firstCurrency, secondCurrency, getUser } = useSelector((state) => (state.user))

  const { userAsset, getUser } = useSelector((state) => (state.user))
  const { spotPair, spotTicker, spotOrderBookprice } = useSelector((state) => (state.spot))

  const [firstCurrency, setfirstCurrency] = useState({})
  const [secondCurrency, setsecondCurrency] = useState({})
  const [formValue, setFormValue] = useState(initalFormvalue)
  const [Fee, setFee] = useState('0')
  const [errors, setErrors] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const sliderRef = useRef(null);
  // const Price = useRef(null);
  const [isEdit, setisEdit] = useState(false)
  const [sliderValue, setSliderValue] = useState(0);
  const priceOptions = [
    { value: "USD", label: "USD" },
    { value: "ETH", label: "ETH" },
    { value: "CRON", label: "CRON" },
  ];
  const amountOptions = [
    { value: "btc", label: "BTC" },
    { value: "usd", label: "USD" },
  ];

  const SetInitalData = () => {
    try {
      console.log("Recall_SetInitalData")
      let FormValue = { ...initalFormvalue }
      FormValue = { ...FormValue, ['price']: spotTicker.marketPrice }
      setFormValue(FormValue)
      setSliderValue(0)
      setFee('0')
      setisEdit(false)
      setErrors({})
    } catch (err) {
      console.log(err, 'SetInitalData___err')
    }
  }

  const InitalDataSet = () => {
    try {
      let FormValue = { ...formValue }
      FormValue = { ...FormValue, ['price']: spotTicker.marketPrice }
      setFormValue(FormValue)
    } catch (err) {
      console.log(err, 'InitalDataSet__err')
    }
  }
  const handleRangeSlider = (getSliderValue) => {
    try {
      console.log(getSliderValue[1], 'getSliderValue[1]')
      let FormValue = { ...formValue }
      let price = orderType == 'market' || orderType == 'stop' ? spotTicker.marketPrice : formValue.price
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.spotBalance * (getSliderValue[1] / 100))
        buyquantity = investBalance / parseFloat(price)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(spotPair.firstDecimal)
        buyquantity = isFinite(buyquantity) ? buyquantity : 0
        let orderValue = buyquantity * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(spotPair.secondDecimal)
        orderValue = isFinite(orderValue) ? parseFloat(orderValue).toFixed(spotPair.secondDecimal) : 0
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
        setFormValue(FormValue)
      } else if (buyorsell == 'sell') {
        let sellquantity = 0
        sellquantity = (firstCurrency.spotBalance * (getSliderValue[1] / 100))
        sellquantity = isNaN(sellquantity) ? 0 : parseFloat(sellquantity).toFixed(spotPair.firstDecimal)
        sellquantity = isFinite(sellquantity) ? parseFloat(sellquantity).toFixed(spotPair.firstDecimal) : 0
        let orderValue = sellquantity * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(spotPair.secondDecimal)
        orderValue = isFinite(orderValue) ? parseFloat(orderValue).toFixed(spotPair.secondDecimal) : 0
        FormValue = { ...FormValue, ['quantity']: sellquantity, orderValue: orderValue }
        setFormValue(FormValue)
      }
      feeCalculation(FormValue)
      setSliderValue(getSliderValue[1]);
    } catch (err) {
      console.log(err, 'handleRangeSlider___err')
    }
  }

  const handleChange = (e) => {
    try {
      let FormValue = { ...formValue }
      const { name, value } = e.target
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (['price', 'quantity', 'orderValue', 'stopPrice'].includes(name) && !numbers.test(value) && value !== "") {
        return false
      }
      let orderValue
      let price = orderType == 'market' || orderType == 'stop' ? spotTicker.marketPrice : FormValue.price
      if (name == 'price') {
        if (sliderValue > 0) {
          FormValue = percentageValue(value, FormValue)
        } else {
          orderValue = value * FormValue.quantity
          orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(spotPair.secondDecimal)
          FormValue = { ...FormValue, orderValue: orderValue }
        }

      } else if (name == 'quantity') {
        orderValue = value * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(spotPair.secondDecimal)
        FormValue = { ...FormValue, orderValue: orderValue }
        setSliderValue(0)
      } else if (name == 'orderValue') {
        let quantity = value / price
        quantity = isNaN(quantity) ? 0 : parseFloat(quantity).toFixed(spotPair.firstDecimal)
        FormValue = { ...FormValue, quantity: quantity }
      }

      FormValue = { ...FormValue, [name]: value }
      setErrors({ ...errors, ...{ [name]: "" } })
      feeCalculation(FormValue)
      setFormValue(FormValue)
    } catch (err) {
      console.log(err, 'handleChange__Err')
    }
  }

  const percentageValue = (value, FormValue) => {
    try {
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.spotBalance * (sliderValue / 100))
        buyquantity = investBalance / parseFloat(value)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(spotPair.firstDecimal)
        let orderValue = buyquantity * value
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(spotPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
      }
      return FormValue
    } catch (err) {
      console.log(err, 'percentageValue__err')
    }
  }

  const feeCalculation = (FormValue) => {
    try {
      if (buyorsell == 'buy') {
        let Fee = calculateServiceFee({ price: FormValue.quantity, serviceFee: spotPair.takerFee })
        Fee = isNaN(Fee) ? 0 : parseFloat(Fee).toFixed(spotPair.feePrec)
        setFee(Fee)
      } else if (buyorsell == 'sell') {
        let Fee = calculateServiceFee({ price: FormValue.orderValue, serviceFee: spotPair.takerFee })
        Fee = isNaN(Fee) ? 0 : parseFloat(Fee).toFixed(spotPair.feePrec)
        setFee(Fee)
      }
    } catch (err) {
      console.log(err, 'feeCalculation___err')
    }
  }

  const calculateServiceFee = ({
    price,
    serviceFee
  }) => {
    try {
      price = parseFloat(price)
      serviceFee = parseFloat(serviceFee)
      console.log((price * (serviceFee / 100)), 'calculateServiceFee')
      return ((price * (serviceFee / 100)))
    } catch (err) {
      console.log(err, 'calculateServiceFee__err')
    }
  }


  const orderPlacing = async () => {
    try {
      if (!ObjectIsempty(errors)) {
        return false;
      }
      setisLoading(true)
      let payload = {
        quantity: formValue.quantity,
        pairId: spotPair._id,
        buyorsell: buyorsell,
        orderType: orderType,
        channel: 'trade'
      }
      console.log(formValue, 'OrderPlacing')
      if (orderType == 'stop_limit' || orderType == 'limit') {
        payload['price'] = formValue.price
      }

      if (orderType == 'stop_limit' || orderType == 'stop') {
        payload['stopPrice'] = formValue.stopPrice
      }
      console.log(payload, 'OrderPlacing')
      let token = encryptObject(payload, getUser.secretKey)
      let data = {
        token: token
      }
      let { status, message, error } = await OrderPlacing(data)
      if (status) {
        toast.success(message)
        setisLoading(false)
        SetInitalData()
      } else if (!status) {
        setisLoading(false)
        if (!isEmpty(message)) {
          toast.error(message)
        }
        if (!isEmpty(error)) {
          setErrors(error)
        }
      }
    } catch (err) {
      console.log(err, 'orderPlacing___err')
    }
  }

  const AssetSet = () => {
    try {
      console.log('AssetSet', spotPair, spotPair?.firstCurrencyId, spotPair?.secondCurrencyId, userAsset?.assets)
      if (!isEmpty(spotPair)) {
        // let firstCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == spotPair?.firstCurrency
        // );
        // setfirstCurrency(firstCurrencyData)
        // let secondCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == spotPair?.secondCurrency
        // );
        // setsecondCurrency(secondCurrencyData)
        let firstCurrencyData = userAsset?.assets?.find(
          (val) => val?.currencyId?.toString() == spotPair?.firstCurrencyId
        );
        console.log(firstCurrencyData, 'firstCurrencyData')
        setfirstCurrency(firstCurrencyData)
        let secondCurrencyData = userAsset?.assets?.find(
          (val) => val?.currencyId?.toString() == spotPair?.secondCurrencyId
        );
        console.log(secondCurrencyData, userAsset?.assets, 'secondCurrencyData', spotPair?.secondCurrencyId)
        setsecondCurrency(secondCurrencyData)
      }

    } catch (err) {
      console.log(err, 'AssetSet__err')
    }
  }

  useEffect(() => {
    if (!isEmpty(userAsset) && !isEmpty(spotPair)) {
      AssetSet()
    }
  }, [userAsset, spotPair])


  // useEffect(() => {
  //   console.log(spotTicker, isEdit, 'spotTicker,isEdit')
  //   if (!isEmpty(spotTicker) && !isEdit) {
  //     console.log(spotTicker, isEdit, 'spotTicker,isEdit')
  //     InitalDataSet()
  //   }
  // }, [spotTicker])

  useEffect(() => {
    SetInitalData()
  }, [orderType, tikerRoot])

  useEffect(() => {
    console.log(spotOrderBookprice, 'spotOrderBookprice')
    if (!isEmpty(spotOrderBookprice)) {
      console.log(spotOrderBookprice, 'spotOrderBookprice1')
      setisEdit(true)
      setFormValue({ ...formValue, ...{ price: spotOrderBookprice } })
    }
  }, [spotOrderBookprice])

  // console.log(formValue, 'OrderPlacing', spotTicker, firstCurrency, secondCurrency)
  return (
    <div className="trade_value_card">
      <div className="trade_value_body">

        {/**Stop Price */}
        {orderType == 'stop_limit' || orderType == 'stop' ?
          <div className="mb-3">
            <div className="trade_value_input_wrap">
              <div className="row h-100 mx-auto">
                <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                  <div className="h-100 d-flex align-items-center gap-3">
                    <label className="card_lbl">Stop price</label>
                    <input
                      type="text"
                      className="trade_value_input w-100 "
                      // placeholder='Stop Price'
                      name='stopPrice'
                      onChange={handleChange}
                      value={formValue.stopPrice}
                    />
                  </div>
                </div>
                <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0">
                  <div className="coin_select">
                    <input
                      type="text"
                      className="trade_value_input text_align_end w-100"
                      placeholder={spotPair.secondCurrency}
                      disabled={true}
                    />
                  </div>
                </div>

              </div>

            </div>
            <span className="text-danger mt-2">{errors?.stopPrice}</span>
          </div> : ''}


        {/**Price */}
        {orderType == 'limit' || orderType == 'stop_limit' ?
          <div className="mb-3">
            <div className="trade_value_input_wrap">
              <div className="row h-100 mx-auto">
                <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                  <div className="h-100 d-flex align-items-center gap-3">
                    <label className="card_lbl">Price</label>
                    <input
                      type="text"
                      className="trade_value_input w-100"
                      // placeholder='price'
                      onFocus={() => {
                        setisEdit(true)
                      }}
                      name='price'
                      onChange={handleChange}
                      value={formValue.price}
                    />
                  </div>
                </div>
                <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0">
                  <div className="coin_select">
                    <input
                      type="text"
                      className="trade_value_input text_align_end w-100"
                      placeholder={spotPair.secondCurrency}
                      disabled={true}
                    />
                  </div>
                </div>

              </div>

            </div>
            <p className="text-danger mt-2">{errors?.price}</p>
          </div>
          : ''}


        {/**Quantity */}
        <div className="mb-3">
          <div className="trade_value_input_wrap">
            <div className="row h-100 mx-auto">
              <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                <div className="h-100 d-flex align-items-center gap-3">
                  <label className="card_lbl">Quantity</label>
                  <input
                    type="text"
                    className="trade_value_input w-100"
                    // placeholder={'amount'}
                    name='quantity'
                    value={formValue.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0 ">
                <div className="coin_select">
                  <input
                    type="text"
                    className="trade_value_input text_align_end w-100"
                    placeholder={spotPair.firstCurrency}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <span className="text-danger mt-2">{errors?.quantity}</span>
        </div>

        {/** USDT    */}

        <div className="mb-3">
          <div className="trade_value_input_wrap">
            <div className="row h-100 mx-auto">
              <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                <div className="h-100 d-flex align-items-center gap-3">
                  <label className="card_lbl">Volume</label>
                  <input
                    type="text"
                    className="trade_value_input w-100"
                    placeholder="Volume"
                    name='orderValue'
                    value={formValue.orderValue}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0 ">
                <div className="coin_select">
                  <input
                    type="text"
                    className="trade_value_input text_align_end w-100"
                    placeholder={spotPair.secondCurrency}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <span className="text-danger mt-2">{errors?.volume}</span>
        </div>

        <div className="mt-4">
          <p className="slider_value_p">{sliderValue} %</p>

          <div className="custom_range_slider mt-3 ps-1 position-relative">
            {/* <div className={`${sliderValue >= 25 ? "active" : ""} slider_range_circle  position-absolute range_25`} onClick={() => { handleRangeSlider([0, 25]); setSliderValue(25) }}></div>
            <div className={`${sliderValue >= 50 ? "active" : ""} slider_range_circle  position-absolute range_50`} onClick={() => { handleRangeSlider([0, 50]); setSliderValue(50) }}></div>
            <div className={`${sliderValue >= 75 ? "active" : ""} slider_range_circle  position-absolute range_75`} onClick={() => { handleRangeSlider([0, 75]); setSliderValue(75) }}></div>
            <div className={`${sliderValue >= 100 ? "active" : ""} slider_range_circle  position-absolute range_100`} onClick={() => { handleRangeSlider([0, 100]); setSliderValue(100) }}></div> */}
            <RangeSlider
              defaultValue={[0, sliderValue]}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
              onInput={handleRangeSlider}
              value={[0, parseFloat(sliderValue)]}
            />{" "}
          </div>

          <div className="d-flex flex-wrap justify-content-between gap-2 range_select mt-3">
            <button className="" onClick={() => { handleRangeSlider([0, 0]); setSliderValue(0) }}>0</button>
            <button className="" onClick={() => { handleRangeSlider([0, 10]); setSliderValue(10) }}>10</button>
            <button className="" onClick={() => { handleRangeSlider([0, 20]); setSliderValue(20) }}>20</button>
            <button className="" onClick={() => { handleRangeSlider([0, 30]); setSliderValue(30) }}>30</button>
            <button className="" onClick={() => { handleRangeSlider([0, 40]); setSliderValue(40) }}>40</button>
            <button className="" onClick={() => { handleRangeSlider([0, 50]); setSliderValue(50) }}>50</button>
            <button className="" onClick={() => { handleRangeSlider([0, 60]); setSliderValue(60) }}>60</button>
            <button className="" onClick={() => { handleRangeSlider([0, 70]); setSliderValue(70) }}>70</button>
            <button className="" onClick={() => { handleRangeSlider([0, 80]); setSliderValue(80) }}>80</button>
            <button className="" onClick={() => { handleRangeSlider([0, 90]); setSliderValue(90) }}>90</button>
            <button className="" onClick={() => { handleRangeSlider([0, 100]); setSliderValue(100) }}>100</button>
          </div>
        </div>

        <div className="mt_40 trade_values_p">
          <div className="row">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p >Available :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{buyorsell != 'buy' ?
                `${isEmpty(firstCurrency?.spotBalance) ? 0 : parseFloat(firstCurrency?.spotBalance)?.toFixed(firstCurrency?.pip)} ${spotPair?.firstCurrency}` :
                `${isEmpty(secondCurrency?.spotBalance) ? 0 : parseFloat(secondCurrency?.spotBalance)?.toFixed(secondCurrency?.pip)} ${spotPair?.secondCurrency}`}</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Total :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{formValue.orderValue} {spotPair.secondCurrency}</p>
            </div>
          </div>{" "}
          {/* <div className="row mt-2">
            <div className="col-6">
              <p>Margin :</p>
            </div>{" "}
            <div className="col-6 d-flex justify-content-end">
              <p>0 BTC = 0 USD</p>
            </div>
          </div> */}
          <div className="row mt-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Estimated Fee :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{buyorsell == 'buy' ? `${Fee} ${spotPair.firstCurrency}` : `${Fee} ${spotPair.secondCurrency}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trade_value_button_wrp mt_40">
        <button
          className={`trade_value_button w-100 d-flex align-items-center justify-content-center ${buyorsell === "buy"
            ? "buy_button"
            : buyorsell === "sell"
              ? "sell_button"
              : ""
            }`}
          onClick={() => {
            if (!isEmpty(getUser)) {
              if (getUser?.kycStatus != "approved") {
                showToastMessage("You are not eligible for trade before approval of KYC Information", "error");
                return false
              }
              orderPlacing()
            } else {
              sessionStorage.setItem('loginFrom', '/spot-trading')
              navigate('/login')
            }
          }}
        // disabled={isLoading ? true : false}
        >
          {isEmpty(getUser) ? "Login" : isLoading ? 'Loading...' : buyorsell == 'buy' ? 'Buy' : 'Sell'}
        </button>
      </div>
    </div>
  );
};

export default LimitCards;
