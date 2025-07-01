import React, { useEffect, useRef, useState } from "react";
import TradeValueInput from "../TradeValueInput";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ObjectIsempty, isEmpty } from "../../../lib/isEmpty";
import { ConvertingAmount, DerivativeOrderCost, calculateLiquidityPrice } from "../../../lib/Calculationlib";

/**ACTION */
import { OrderPlacing } from "../../../actions/FuturesAction";
import toast from "react-hot-toast";
import { encryptObject } from "../../../lib/CryptoJs";
import { useParams, useNavigate } from "react-router-dom";
import { showToastMessage } from "../../../lib/toast";


const initalFormvalue = {
  price: '0',
  quantity: '0',
  orderValue: '0',
  stopPrice: '0',
  leverage: 1,
  isTake: false,
  isStop: false,
  takeProfitPrice: '0',
  stopLossPrice: '0',
  typeTIF: 'GTC',
  expriy_date: null
}

const tifOptions = [
  {
    value: "GTC", label: "GTC",
  },
  {
    value: "IOC", label: "IOC",
  },
  {
    value: "FOK", label: "FOK",
  },
  {
    value: "GTD", label: "GTD",
  }
]
const tifOptions2 = [
  {
    value: "GTC", label: "GTC",
  },
  {
    value: "IOC", label: "IOC",
  },
  {
    value: "FOK", label: "FOK",
  }
]
const LimitCards = ({ buyorsell, orderType }) => {
  const { tikerRoot } = useParams()
  const navigate = useNavigate()
  const { priceConversionList } = useSelector((state) => (state.currency))
  const { getUser, userAsset } = useSelector((state) => (state.user))
  const { futuresPair, futuresTicker } = useSelector((state) => (state.futures))

  const [firstCurrency, setfirstCurrency] = useState({})
  const [secondCurrency, setsecondCurrency] = useState({})
  const [formValue, setFormValue] = useState(initalFormvalue)
  const [errors, setErrors] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [Fee, setFee] = useState('0')
  const [balPrecen, setBalPrecen] = useState('0')
  const [orderCost, setOrderCost] = useState('0')
  const [liqPrice, setLiqPrice] = useState('0')
  const [gainPrecn, setGainPercen] = useState('0')
  const [lossPrecn, setLossPercen] = useState('0')

  const dateRef = useRef(null);
  const [startTime, setStartTime] = useState("");

  const [balbtn, setBalbtn] = useState([
    {
      value: 25,
    },
    {
      value: 50,
    },
    {
      value: 75,
    },
    {
      value: 100,
    }
  ])

  const handleChange = (e) => {
    try {
      setErrors({})
      let FormValue = { ...formValue }
      const { name, value } = e.target
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (['price', 'quantity', 'takeProfitPrice', 'stopLossPrice', 'stopPrice'].includes(name) && !numbers.test(value) && value !== "") {
        return false
      }
      let orderValue
      let price = orderType == 'market' || orderType == 'stop' ? futuresPair.marketPrice : FormValue.price

      if (name == 'price') {
        if (balPrecen > 0) {
          FormValue = percentageValue(value, FormValue)
        } else {
          orderValue = value * FormValue.quantity
          orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(futuresPair.secondDecimal)
          FormValue = { ...FormValue, orderValue: orderValue }
        }

      } else if (name == 'quantity') {
        orderValue = value * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(futuresPair.secondDecimal)
        FormValue = { ...FormValue, orderValue: orderValue }
        setBalPrecen(0)
      }

      FormValue = { ...FormValue, [name]: value }
      // feeCalculation(FormValue)
      OrderCostSet(FormValue)
      LiqPriceSet(FormValue)
      setFormValue(FormValue)
    } catch (err) {
      console.log(err, 'handleChange__Err')
    }
  }

  const percentageValue = (value, FormValue) => {
    try {
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.futuresBalance * (balPrecen / 100))
        buyquantity = investBalance / parseFloat(value)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(futuresPair.firstDecimal)
        let orderValue = buyquantity * value
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(futuresPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
      }
      return FormValue
    } catch (err) {
      console.log(err, 'percentageValue__err')
    }
  }

  const handleRangeSlider = (getSliderValue) => {
    console.log(getSliderValue[1], 'getSliderValue[1]')
    let FormValue = { ...formValue }
    FormValue = { ...FormValue, leverage: getSliderValue[1] }
    setFormValue(FormValue)
    OrderCostSet(FormValue)
    LiqPriceSet(FormValue)
  };

  const handleBalanceprecn = (percentage) => {
    try {
      console.log(percentage, 'handleBalanceprecn')
      let FormValue = { ...formValue }
      let price = orderType == 'market' || orderType == 'stop' ? futuresTicker.marketPrice : formValue.price
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.futuresBalance * (parseFloat(percentage) / 100))
        buyquantity = investBalance / parseFloat(price)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(futuresPair.firstDecimal)
        let orderValue = buyquantity * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(futuresPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
        setFormValue(FormValue)
      } else if (buyorsell == 'sell') {
        let sellquantity = 0
        sellquantity = (firstCurrency.futuresBalance * (parseFloat(percentage) / 100))
        sellquantity = isNaN(sellquantity) ? 0 : parseFloat(sellquantity).toFixed(futuresPair.firstDecimal)
        let orderValue = sellquantity * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(futuresPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: sellquantity, orderValue: orderValue }
        setFormValue(FormValue)
      }
      OrderCostSet(FormValue)
      LiqPriceSet(FormValue)
      // feeCalculation(FormValue)
      setBalPrecen(percentage)
    } catch (err) {
      console.log(err, 'handleBalanceprecn__err')
    }
  }

  const InitalPriceSet = () => {
    let FormValue = { ...formValue }
    FormValue = { ...FormValue, ['price']: futuresTicker.marketPrice }
    setFormValue(FormValue)
    LiqPriceSet(FormValue)
  }

  const SetInitalData = () => {
    try {
      let FormValue = { ...initalFormvalue }
      FormValue = { ...FormValue, ['price']: futuresTicker.marketPrice, ['leverage']: 1 }
      setFormValue(FormValue)
      setFee('0')
      setisEdit(false)
      setOrderCost('0')
    } catch (err) {
      console.log(err, 'SetInitalData___err')
    }
  }

  const feeCalculation = (order_cost) => {
    try {
      let fee = order_cost * (futuresPair.open_fee / 100)
      fee = isNaN(fee) ? 0 : fee
      fee = parseFloat(fee).toFixed(futuresPair.feePrec)
      setFee(fee)
    } catch (err) {
      console.log(err, 'feeCalculation___err')
    }
  }

  const OrderCostSet = (formvalue) => {
    try {
      /**Order Cost */
      let order_cost = DerivativeOrderCost({
        price: formvalue.price,
        quantity: formvalue.quantity,
        leverage: formvalue.leverage
      })
      order_cost = isNaN(order_cost) ? 0 : order_cost
      order_cost = parseFloat(order_cost).toFixed(futuresPair.secondDecimal)
      console.log(order_cost, 'OrderCostSet')
      if (futuresPair.secondCurrency != futuresPair.profitCurrency) {
        order_cost = ConvertingAmount(futuresPair.secondCurrency, futuresPair.profitCurrency, order_cost, priceConversionList)
        order_cost = isNaN(order_cost) ? 0 : order_cost
        order_cost = parseFloat(order_cost).toFixed(futuresPair.secondDecimal)
      }
      console.log(order_cost, 'OrderCostSet1')
      setOrderCost(order_cost)
      feeCalculation(order_cost)
    } catch (err) {
      console.log(err, 'OCandLiqPriceCalculation__err')
    }
  }

  const LiqPriceSet = (formvalue) => {
    try {
      /**liq price*/
      let liqPrice = calculateLiquidityPrice({
        price: formvalue.price,
        leverage: formvalue.leverage,
        maintMargin: futuresPair.maintenanceMargin,
        type: buyorsell == 'buy' ? 'long' : 'short'
      })
      liqPrice = isNaN(liqPrice) ? 0 : liqPrice
      liqPrice = parseFloat(liqPrice).toFixed(futuresPair.secondDecimal)
      setLiqPrice(liqPrice)
    } catch (err) {
      console.log(err, 'OCandLiqPriceCalculation__err')
    }
  }

  const SetTakeProfit = (takeProfitPrice) => {
    try {
      let FormValue = { ...formValue }
      let error = { ...errors }
      let percentage = 0
      if (buyorsell == 'buy') {
        percentage = ((parseFloat(takeProfitPrice) - parseFloat(futuresPair.marketPrice)) / parseFloat(futuresPair.marketPrice)) * 100
      } else if (buyorsell == 'sell') {
        percentage = ((parseFloat(futuresPair.marketPrice) - parseFloat(takeProfitPrice)) / parseFloat(futuresPair.marketPrice)) * 100
      }
      console.log(percentage, 'SetTakeProfit')
      percentage = isNaN(percentage) ? 0 : percentage
      percentage = isNaN(percentage) ? 0 : percentage
      if (percentage > 100) {
        error = { ...error, 'takeProfitPrice': 'Take profit price should be with in 100 %' }
        setErrors(error)
        return false
      }
      FormValue = { ...FormValue, 'takeProfitPrice': takeProfitPrice }
      setFormValue(FormValue)
      setGainPercen(parseFloat(percentage).toFixed(2))
      CheckTpandSl('isTake', takeProfitPrice)
    } catch (err) {
      console.log(err, 'SetTakeProfit__err')
    }
  }

  const SetStopLoss = (stopLossPrice) => {
    try {
      let FormValue = { ...formValue }
      let error = { ...errors }
      let percentage = 0
      if (buyorsell == 'buy' && stopLossPrice != 0) {
        percentage = ((parseFloat(futuresPair.marketPrice) - parseFloat(stopLossPrice)) / parseFloat(futuresPair.marketPrice)) * 100
      } else if (buyorsell == 'sell' && stopLossPrice != 0) {
        percentage = ((parseFloat(stopLossPrice) - parseFloat(futuresPair.marketPrice)) / parseFloat(futuresPair.marketPrice)) * 100
      }
      console.log(percentage, 'SetTakeProfit')
      percentage = isNaN(percentage) ? 0 : percentage
      if (percentage > 100) {
        error = { ...error, 'stopLossPrice': 'Stop loss price should be with in 100 %' }
        setErrors(error)
        return false
      }
      FormValue = { ...FormValue, 'stopLossPrice': stopLossPrice }
      setFormValue(FormValue)
      setLossPercen(parseFloat(percentage).toFixed(2))
      CheckTpandSl('isStop', stopLossPrice)
    } catch (err) {
      console.log(err, 'SetTakeProfit__err')
    }
  }

  const SetGainAndLoss = (type, value) => {
    try {
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      let FormValue = { ...formValue }
      if (parseFloat(value) > 99 && type == 'isStop') {
        return false
      }
      if ((parseFloat(value) < 0 || parseFloat(value) > 100) || !numbers.test(value) && value != '') {
        console.log('SetGainAndLoss', value)
        return false
      }
      if (value == '') {
        let name = type == 'isTake' ? 'takeProfitPrice' : 'stopLossPrice'
        if (type == 'isTake') {
          setGainPercen(value)
        } else if (type == 'isStop') {
          setLossPercen(value)
        }
        FormValue = { ...FormValue, [name]: '' }
        setFormValue(FormValue)
        return false
      }
      let tpandSp

      if (buyorsell == 'buy' && type == 'isTake') {
        tpandSp = parseFloat(futuresPair.marketPrice) + ((parseFloat(futuresPair.marketPrice) * parseFloat(value)) / 100)
        setGainPercen(value)
        CheckTpandSl('isTake', tpandSp)
        FormValue = { ...FormValue, ['takeProfitPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'sell' && type == 'isTake') {
        tpandSp = parseFloat(futuresPair.marketPrice) - ((parseFloat(futuresPair.marketPrice) * parseFloat(value)) / 100)
        setGainPercen(value)
        CheckTpandSl('isTake', tpandSp)
        FormValue = { ...FormValue, ['takeProfitPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'buy' && type == 'isStop') {
        tpandSp = parseFloat(futuresPair.marketPrice) - ((parseFloat(futuresPair.marketPrice) * parseFloat(value)) / 100)
        setLossPercen(value)
        CheckTpandSl('isStop', tpandSp)
        FormValue = { ...FormValue, ['stopLossPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'sell' && type == 'isStop') {
        tpandSp = parseFloat(futuresPair.marketPrice) + ((parseFloat(futuresPair.marketPrice) * parseFloat(value)) / 100)
        setLossPercen(value)
        CheckTpandSl('isStop', tpandSp)
        FormValue = { ...FormValue, ['stopLossPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      setFormValue(FormValue)
    } catch (err) {
      console.log(err, 'SetGainAndLoss__err')
    }
  }

  const CheckTpandSl = (type, value) => {
    try {
      if (buyorsell == 'buy' && value < futuresTicker.marketPrice && type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': 'Take profit price must be greater than market price' } })
      }
      else if (buyorsell == 'sell' && value > futuresTicker.marketPrice && type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': 'Take profit price must be less than market price' } })
      } else if (type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': '' } })
      }

      if (buyorsell == 'buy' && value > futuresTicker.marketPrice && type == 'isStop') {
        setErrors({ ...errors, ...{ 'stopLossPrice': 'Stop Loss price must be less than market price' } })
      }
      else if (buyorsell == 'sell' && value < futuresTicker.marketPrice && type == 'isStop') {
        setErrors({ ...errors, ...{ 'stopLossPrice': 'Stop Loss price must be greater than market price' } })
      } else if (type == 'isStop') {
        setErrors({ ...errors, ...{ 'stopLossPrice': '' } })
      }


    } catch (err) {
      console.log(err, 'CheckTpandSl')
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
        leverage: formValue.leverage,
        isTake: formValue.isTake,
        isStop: formValue.isStop,
        takeProfitPrice: formValue.takeProfitPrice,
        stopLossPrice: formValue.stopLossPrice,
        orderType: orderType,
        pairId: futuresPair._id,
        buyorsell: buyorsell,
        typeTIF: formValue.typeTIF,
        expriy_date: formValue.expriy_date
      }
      // console.log(formValue, 'OrderPlacing')
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
        if (!isEmpty(message)) {
          toast.error(message)
        }
        if (!isEmpty(error)) {
          setErrors(error)
        }
        setisLoading(false)
      }
    } catch (err) {
      console.log(err, 'orderPlacing___err')
    }
  }

  const AssetSet = () => {
    try {
      if (!isEmpty(futuresPair)) {
        // let firstCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == futuresPair?.firstCurrencyId
        // );
        // setfirstCurrency(firstCurrencyData)
        // let secondCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == futuresPair?.secondCurrencyId
        // );
        // setsecondCurrency(secondCurrencyData)
        let firstCurrencyData = userAsset?.assets?.find(
          (val) => val._id.toString() == futuresPair?.firstCurrency
        );
        setfirstCurrency(firstCurrencyData)
        let secondCurrencyData = userAsset?.assets?.find(
          (val) => val._id.toString() == futuresPair?.secondCurrency
        );
        setsecondCurrency(secondCurrencyData)
      }

    } catch (err) {
      console.log(err, 'AssetSet__err')
    }
  }

  // useEffect(() => {
  //   if (!isEmpty(futuresTicker) && !isEdit) {
  //     InitalPriceSet()
  //   }
  // }, [futuresTicker])

  useEffect(() => {
    SetInitalData()
  }, [orderType, tikerRoot])

  useEffect(() => {
    if (!isEmpty(userAsset) && !isEmpty(tikerRoot)) {
      AssetSet()
    }
  }, [userAsset, tikerRoot])

  return (
    <div className="d-flex justify-content-between flex-column h-100">
      <div className="">

        {/**Stop Price */}
        {orderType == 'stop_limit' || orderType == 'stop' ?
          <div className="mt-3">
            <div className="trade_value_input_wrap">
              <div className="row h-100 mx-auto">
                <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                  <div className="h-100 d-flex align-items-center gap-3">
                    <label className="card_lbl">Stop price</label>
                    <input
                      type="text"
                      className="trade_value_input w-100 "
                      placeholder='Stop Price'
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
                      className="trade_value_input w-100"
                      placeholder={futuresPair.secondCurrency}
                      disabled={true}
                    />
                  </div>
                </div>

              </div>
              <span className="text-danger">{errors?.stopPrice}</span>
            </div>
          </div> : ''}


        {/**Price */}
        {orderType == 'limit' || orderType == 'stop_limit' ?
          <div className="mt-3">
            <div className="trade_value_input_wrap">
              <div className="row h-100 mx-auto">
                <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                  <div className="h-100 d-flex align-items-center gap-3">
                    <label className="card_lbl">Price</label>
                    <input
                      type="text"
                      className="trade_value_input w-100"
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
                      className="trade_value_input w-100"
                      disabled={true}
                      placeholder={futuresPair.secondCurrency}
                    />
                  </div>
                </div>

              </div>
              <span className="text-danger">{errors?.price}</span>
            </div>
          </div>
          : ''}


        {/**Quantity */}
        <div className="mt-3">
          <div className="trade_value_input_wrap">
            <div className="row h-100 mx-auto">
              <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
                <div className="h-100 d-flex align-items-center gap-3">
                  <label className="card_lbl">Quantity</label>
                  <input
                    type="text"
                    className="trade_value_input w-100"
                    placeholder={''}
                    name='quantity'
                    value={formValue.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0">
                <div className="coin_select">
                  <input
                    type="text"
                    className="trade_value_input w-100"
                    placeholder={futuresPair.firstCurrency}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <span className="text-danger">{errors?.quantity}</span>
        </div>
        <div className="mt-3 balbtnsec d-flex align-items-center gap-3 flex-wrap">

          {balbtn.map((e) => (
            <button
              className={`balbtn mar_balbtn ${balPrecen == e.value && "activebtn"}`}
              onClick={() => { handleBalanceprecn(e.value); setBalPrecen(e.value) }}>
              {e.value}%
            </button>
          ))}
          <div className="mt-4 pb-3 w-100">
            {orderType == 'limit' || orderType === 'stop_limit' ?
              <div>
                <div className="d-flex align-items-center gap-2 mb-3 lmcard_select">
                  <p className="slider_value_p">TIF :</p>
                  <Select
                    isSearchable={false}
                    // menuIsOpen={true}
                    options={orderType == 'limit' ? tifOptions : tifOptions2}
                    className=""
                    classNamePrefix="theme_select"
                    placeholder="Select"
                    onChange={(e) => {
                      let FormValue = { ...formValue }
                      FormValue = { ...FormValue, ['typeTIF']: e.value }
                      setFormValue(FormValue)
                    }}
                    value={!isEmpty(formValue?.typeTIF) ? tifOptions.find((val) => (val.value == formValue?.typeTIF)) : ""}
                  />
                </div>
                <span className="text-danger">{errors?.typeTIF}</span>
              </div>
              : ""}
            {formValue.typeTIF == 'GTD' ?
              <div>
                <div className="custom_datepicker red_datepicker lmcard_datepicker d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                  <p className="slider_value_p">Select Expire Date :</p>
                  <DatePicker
                    ref={dateRef}
                    placeholderText="DD/MM/YYYY "
                    minDate={new Date().getTime() + 3 * 86400000}
                    maxDate={new Date().getTime() + 30 * 86400000}
                    showTimeSelect
                    selected={
                      isEmpty(formValue.expriy_date) ? "" : new Date(formValue.expriy_date)
                    }
                    onChange={(date) => {
                      let FormValue = { ...formValue }
                      FormValue = { ...FormValue, ['expriy_date']: new Date(date).getTime() }
                      setFormValue(FormValue)
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <span className="text-danger">{errors?.expriy_date}</span>
              </div> : ""}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <p className="slider_value_p">Leverage :</p>
              <p className="slider_value_p">{formValue?.leverage} x</p>
            </div>
            <div className="custom_range_slider mt-3 ps-1 position-relative">
              <div className="slider_range_circle  position-absolute range_25" onClick={() => { handleRangeSlider([0, 25]); setFormValue({ ...formValue, ...{ leverage: 25 } }) }}></div>
              <div className="slider_range_circle  position-absolute range_50" onClick={() => { handleRangeSlider([0, 50]); setFormValue({ ...formValue, ...{ leverage: 50 } }) }}></div>
              <div className="slider_range_circle  position-absolute range_75" onClick={() => { handleRangeSlider([0, 75]); setFormValue({ ...formValue, ...{ leverage: 75 } }) }}></div>
              <div className="slider_range_circle  position-absolute range_100" onClick={() => { handleRangeSlider([0, 100]); setFormValue({ ...formValue, ...{ leverage: 100 } }) }}></div>
              <RangeSlider
                defaultValue={[1, formValue?.leverage]}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled={true}
                onInput={handleRangeSlider}
                value={[1, parseFloat(formValue?.leverage)]}
              />{" "}
            </div>
          </div>

        </div>
        <div className="tpsl_inputsec mt-4">
          <div className="row">

            <div className="col-sm-6">
              <div className="tp_sl_checksec mb-3">
                <label class="checkbox_container">
                  <input
                    type="checkbox"
                    checked={formValue.isTake}
                    onChange={(e) => {
                      let FormValue = { ...formValue }
                      FormValue = { ...FormValue, ['isTake']: e.target.checked, 'takeProfitPrice': '' }
                      setFormValue(FormValue)
                      setErrors({ ...errors, 'takeProfitPrice': '' })
                      setGainPercen('0')
                    }}
                  />
                  <span class="checkbox_checkmark"></span>
                </label>
                <p className="labelname ms-4">Take Profit</p>
              </div>
              {formValue?.isTake &&
                <>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Take Profit"
                      aria-label="Take Profit"
                      aria-describedby="basic-addon2"
                      value={formValue.takeProfitPrice}
                      name='takeProfitPrice'
                      onChange={(e) => {
                        let value = e.target.value
                        setErrors({ ...errors, 'takeProfitPrice': "" })
                        SetTakeProfit(value)
                        // handleChange(e)
                      }}
                    />
                    <span className="input-group-text" id="basic-addon2">{futuresPair.secondCurrency}</span>
                  </div>
                  <span className="text-danger">{errors?.takeProfitPrice}</span>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Gain"
                      aria-label="Gain"
                      aria-describedby="basic-addon2"
                      value={gainPrecn}
                      onChange={(e) => {
                        SetGainAndLoss('isTake', e.target.value)
                      }}
                    />
                    <span className="input-group-text" id="basic-addon2">%</span>
                  </div>
                </>
              }
            </div>


            <div className="col-sm-6 ">
              <div className="tp_sl_checksec mb-3">
                <label class="checkbox_container">
                  <input
                    type="checkbox"
                    checked={formValue.isStop}
                    onChange={(e) => {
                      let FormValue = { ...formValue }
                      FormValue = { ...FormValue, ['isStop']: e.target.checked, 'stopLossPrice': '' }
                      setFormValue(FormValue)
                      setErrors({ ...errors, 'stopLossPrice': '' })
                      setLossPercen('0')
                    }}
                  />
                  <span class="checkbox_checkmark"></span>
                </label>
                <p className="labelname ms-4">Stop Loss</p>
              </div>
              {formValue.isStop &&
                <>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Stop Loss"
                      aria-label="Stop Loss"
                      aria-describedby="basic-addon2"
                      value={formValue.stopLossPrice}
                      name='stopLossPrice'
                      onChange={(e) => {
                        let value = e.target.value
                        setErrors({ ...errors, 'stopLossPrice': "" })
                        SetStopLoss(value)
                        // handleChange(e)
                      }}
                    />
                    <span className="input-group-text" id="basic-addon2">{futuresPair.secondCurrency}</span>
                  </div>
                  <span className="text-danger">{errors?.stopLossPrice}</span>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Loss"
                      aria-label="Gain"
                      aria-describedby="basic-addon2"
                      value={lossPrecn}
                      onChange={(e) => {
                        SetGainAndLoss('isStop', e.target.value)
                      }}
                    />
                    <span className="input-group-text" id="basic-addon2">%</span>
                  </div>
                </>
              }
            </div>


          </div>

        </div>
        <div className="mt-4 trade_values_p">
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Available :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{buyorsell != 'buy' ?
                `${isEmpty(firstCurrency?.futuresBalance) ? 0 : parseFloat(firstCurrency?.futuresBalance)?.toFixed(firstCurrency?.pip)} ${futuresPair?.firstCurrency}` :
                `${isEmpty(secondCurrency?.futuresBalance) ? 0 : parseFloat(secondCurrency?.futuresBalance)?.toFixed(secondCurrency?.pip)} ${futuresPair?.secondCurrency}`}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Total :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{formValue.orderValue} {futuresPair.secondCurrency}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Liquidity Price :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end"> {liqPrice} {futuresPair.secondCurrency}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Order cost :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{orderCost} {futuresPair.profitCurrency}</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Estimated Fee :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{`${Fee} ${futuresPair.profitCurrency}`}</p>
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
          // onClick={() => { orderPlacing() }}
          onClick={() => {
            if (!isEmpty(getUser)) {
              if (getUser?.kycStatus != "approved") {
                showToastMessage("You are not eligible for trade before approval of KYC Information", "error");
                return false
              }
              orderPlacing()
            } else {
              sessionStorage.setItem('loginFrom', '/futures-trading/')
              navigate('/login')
            }
          }}
          disabled={isLoading ? true : false}
        >
          {/* {isLoading ? 'Loading...' : buyorsell == 'buy' ? 'Buy/Long' : 'Sell/Short'} */}
          {isEmpty(getUser) ? "Login" : isLoading ? 'Loading...' : buyorsell == 'buy' ? 'Buy/Long' : 'Sell/Short'}
        </button>
      </div>
    </div>
  );
};

export default LimitCards;
