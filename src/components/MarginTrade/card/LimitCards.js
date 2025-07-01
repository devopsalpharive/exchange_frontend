import React, { useEffect, useRef, useState } from "react";
import TradeValueInput from "../TradeValueInput";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ObjectIsempty, isEmpty } from "../../../lib/isEmpty";
import { MarginOrderCost, calculateLiquidityPrice } from "../../../lib/Calculationlib";

/**ACTION */
import { OrderPlacing } from "../../../actions/MarginAction";
import toast from "react-hot-toast";
import { encryptObject } from "../../../lib/CryptoJs";
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
  stopLossPrice: '0'
}
const LimitCards = ({ buyorsell, orderType }) => {
  const { getUser, userAsset } = useSelector((state) => (state.user))
  const { marginPair, marginTicker, marginOrderbookPrice } = useSelector((state) => (state.margin))
  const { tikerRoot } = useParams()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initalFormvalue)

  const [firstCurrency, setfirstCurrency] = useState({})
  const [secondCurrency, setsecondCurrency] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [Fee, setFee] = useState('0')
  const [balPrecen, setBalPrecen] = useState('0')
  const [orderCost, setOrderCost] = useState('0')
  const [liqPrice, setLiqPrice] = useState('0')
  const [gainPrecn, setGainPercen] = useState('0')
  const [lossPrecn, setLossPercen] = useState('0')
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
      let FormValue = { ...formValue }
      const { name, value } = e.target
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (['price', 'quantity', 'orderValue', 'takeProfitPrice', 'stopLossPrice', 'stopPrice'].includes(name) && !numbers.test(value) && value !== "") {
        return false
      }
      let orderValue
      let price = orderType == 'market' || orderType == 'stop' ? marginPair.marketPrice : FormValue.price

      if (name == 'price') {
        if (balPrecen > 0) {
          FormValue = percentageValue(value, FormValue)
        } else {
          orderValue = value * FormValue.quantity
          orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(marginPair.secondDecimal)
          FormValue = { ...FormValue, orderValue: orderValue }
        }

      } else if (name == 'quantity') {
        orderValue = value * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(marginPair.secondDecimal)
        FormValue = { ...FormValue, orderValue: orderValue }
        setBalPrecen(0)
      } else if (name == 'orderValue') {
        let quantity = value / price
        quantity = isNaN(quantity) ? 0 : parseFloat(quantity).toFixed(marginPair.firstDecimal)
        FormValue = { ...FormValue, 'quantity': quantity }
      }

      FormValue = { ...FormValue, [name]: value }
      feeCalculation(FormValue)
      OrderCostSet(FormValue)
      LiqPriceSet(FormValue)
      setFormValue(FormValue)
      setErrors({ ...errors, ...{ [name]: '' } })
    } catch (err) {
      console.log(err, 'handleChange__Err')
    }
  }

  const percentageValue = (value, FormValue) => {
    try {
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.marginBalance * (balPrecen / 100))
        buyquantity = investBalance / parseFloat(value)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(marginPair.firstDecimal)
        let orderValue = buyquantity * value
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(marginPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
      }
      return FormValue
    } catch (err) {
      console.log(err, 'percentageValue__err')
    }
  }

  const handleRangeSlider = (getSliderValue) => {
    if (getSliderValue[1] == 0) {
      return false
    }
    console.log(getSliderValue[1], 'getSliderValue[1]_margin')
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
      let price = orderType == 'market' || orderType == 'stop' ? marginTicker.marketPrice : formValue.price
      if (buyorsell == 'buy') {
        let buyquantity = 0
        let investBalance = (secondCurrency.marginBalance * (parseFloat(percentage) / 100))
        buyquantity = investBalance / parseFloat(price)
        buyquantity = isNaN(buyquantity) ? 0 : parseFloat(buyquantity).toFixed(marginPair.firstDecimal)
        let orderValue = buyquantity * price
        orderValue = isNaN(orderValue) ? 0 : parseFloat(orderValue).toFixed(marginPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: buyquantity, orderValue: orderValue }
        setFormValue(FormValue)
      } else if (buyorsell == 'sell') {
        let sellquantity = 0
        sellquantity = (firstCurrency.marginBalance * (parseFloat(percentage) / 100))
        sellquantity = isNaN(sellquantity) ? 0 : parseFloat(sellquantity).toFixed(marginPair.firstDecimal)
        let orderValue = sellquantity * price
        orderValue = isNaN(orderValue) ? 0 : orderValue.toFixed(marginPair.secondDecimal)
        FormValue = { ...FormValue, ['quantity']: parseFloat(sellquantity), orderValue: orderValue }
        setFormValue(FormValue)
      }
      OrderCostSet(FormValue)
      LiqPriceSet(FormValue)
      feeCalculation(FormValue)
      setBalPrecen(percentage)
    } catch (err) {
      console.log(err, 'handleBalanceprecn__err')
    }
  }

  const InitalPriceSet = () => {
    let FormValue = { ...formValue }
    FormValue = { ...FormValue, ['price']: marginTicker.marketPrice }
    setFormValue(FormValue)
    LiqPriceSet(FormValue)
  }

  const SetInitalData = () => {
    try {
      let FormValue = { ...initalFormvalue }
      FormValue = { ...FormValue, ['price']: marginTicker.marketPrice, ['leverage']: 1 }
      setFormValue(FormValue)
      setFee('0')
      setisEdit(false)
      setOrderCost('0')
    } catch (err) {
      console.log(err, 'SetInitalData___err')
    }
  }

  const feeCalculation = (FormValue) => {
    try {
      if (buyorsell == 'buy') {
        let Fee = calculateServiceFee({ price: FormValue.quantity, serviceFee: marginPair.takerFee })
        Fee = isNaN(Fee) ? 0 : parseFloat(Fee).toFixed(marginPair.feePrec)
        setFee(Fee)
      } else if (buyorsell == 'sell') {
        let Fee = calculateServiceFee({ price: FormValue.orderValue, serviceFee: marginPair.takerFee })
        Fee = isNaN(Fee) ? 0 : parseFloat(Fee).toFixed(marginPair.feePrec)
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
    price = parseFloat(price)
    serviceFee = parseFloat(serviceFee)
    console.log((price * (serviceFee / 100)), 'calculateServiceFee')
    return ((price * (serviceFee / 100)))
  }

  const OrderCostSet = (formvalue) => {
    try {
      /**Order Cost */
      let order_cost = MarginOrderCost({
        price: formvalue.price,
        quantity: formvalue.quantity,
        leverage: formvalue.leverage,
        side: buyorsell == 'buy' ? 'long' : 'short'
      })
      order_cost = isNaN(order_cost) ? 0 : order_cost
      if (buyorsell == 'buy') {
        order_cost = parseFloat(order_cost).toFixed(marginPair.secondDecimal)
      } else if (buyorsell == 'sell') {
        order_cost = parseFloat(order_cost).toFixed(marginPair.firstDecimal)
      }
      setOrderCost(order_cost)
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
        maintMargin: marginPair.maintenanceMargin,
        type: buyorsell == 'buy' ? 'long' : 'short'
      })
      liqPrice = isNaN(liqPrice) ? 0 : liqPrice
      liqPrice = parseFloat(liqPrice).toFixed(marginPair.secondDecimal)
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
        percentage = ((parseFloat(takeProfitPrice) - parseFloat(marginPair.marketPrice)) / parseFloat(marginPair.marketPrice)) * 100
      } else if (buyorsell == 'sell') {
        percentage = ((parseFloat(marginPair.marketPrice) - parseFloat(takeProfitPrice)) / parseFloat(marginPair.marketPrice)) * 100
      }
      console.log(percentage, 'SetTakeProfit')
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
        percentage = ((parseFloat(marginPair.marketPrice) - parseFloat(stopLossPrice)) / parseFloat(marginPair.marketPrice)) * 100
      } else if (buyorsell == 'sell' && stopLossPrice != 0) {
        percentage = ((parseFloat(stopLossPrice) - parseFloat(marginPair.marketPrice)) / parseFloat(marginPair.marketPrice)) * 100
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
        tpandSp = parseFloat(marginPair.marketPrice) + ((parseFloat(marginPair.marketPrice) * parseFloat(value)) / 100)
        setGainPercen(value)
        CheckTpandSl('isTake', tpandSp)
        FormValue = { ...FormValue, ['takeProfitPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'sell' && type == 'isTake') {
        tpandSp = parseFloat(marginPair.marketPrice) - ((parseFloat(marginPair.marketPrice) * parseFloat(value)) / 100)
        setGainPercen(value)
        CheckTpandSl('isTake', tpandSp)
        FormValue = { ...FormValue, ['takeProfitPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'buy' && type == 'isStop') {
        tpandSp = parseFloat(marginPair.marketPrice) - ((parseFloat(marginPair.marketPrice) * parseFloat(value)) / 100)
        setLossPercen(value)
        CheckTpandSl('isStop', tpandSp)
        FormValue = { ...FormValue, ['stopLossPrice']: isNaN(tpandSp) ? 0 : tpandSp }
      }
      if (buyorsell == 'sell' && type == 'isStop') {
        tpandSp = parseFloat(marginPair.marketPrice) + ((parseFloat(marginPair.marketPrice) * parseFloat(value)) / 100)
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
      if (buyorsell == 'buy' && value < marginTicker.marketPrice && type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': 'Take profit price must be greater than market price' } })
      }
      else if (buyorsell == 'sell' && value > marginTicker.marketPrice && type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': 'Take profit price must be less than market price' } })
      } else if (type == 'isTake') {
        setErrors({ ...errors, ...{ 'takeProfitPrice': '' } })
      }

      if (buyorsell == 'buy' && value > marginTicker.marketPrice && type == 'isStop') {
        setErrors({ ...errors, ...{ 'stopLossPrice': 'Stop Loss price must be less than market price' } })
      }
      else if (buyorsell == 'sell' && value < marginTicker.marketPrice && type == 'isStop') {
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
        pairId: marginPair._id,
        buyorsell: buyorsell,
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
      if (!isEmpty(marginPair)) {
        // let firstCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == marginPair?.firstCurrencyId
        // );
        // setfirstCurrency(firstCurrencyData)
        // let secondCurrencyData = userAsset?.assets?.find(
        //   (val) => val.currencyId.toString() == marginPair?.secondCurrencyId
        // );
        // setsecondCurrency(secondCurrencyData)
        let firstCurrencyData = userAsset?.assets?.find(
          (val) => val._id.toString() == marginPair?.firstCurrency
        );
        setfirstCurrency(firstCurrencyData)
        let secondCurrencyData = userAsset?.assets?.find(
          (val) => val._id.toString() == marginPair?.secondCurrency
        );
        setsecondCurrency(secondCurrencyData)
      }

    } catch (err) {
      console.log(err, 'AssetSet__err')
    }
  }

  // useEffect(() => {
  //   if (!isEmpty(marginTicker) && !isEdit) {
  //     InitalPriceSet()
  //   }
  // }, [marginTicker])

  useEffect(() => {
    SetInitalData()
  }, [orderType, tikerRoot])

  useEffect(() => {
    if (!isEmpty(userAsset) && !isEmpty(tikerRoot)) {
      AssetSet()
    }
  }, [userAsset, tikerRoot])

  useEffect(() => {
    if (!isEmpty(marginOrderbookPrice)) {
      setisEdit(true)
      setFormValue({ ...formValue, ...{ price: marginOrderbookPrice } })
    }
  }, [marginOrderbookPrice])

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
                      placeholder={marginPair.secondCurrency}
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
          <div className="mb-3">
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
                      placeholder={marginPair.secondCurrency}
                      disabled={true}
                    />
                  </div>
                </div>

              </div>
              <span className="text-danger">{errors?.price}</span>
            </div>
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
                    placeholder={marginPair.firstCurrency}
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
        </div>
        <div className="mt-3">
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
                    placeholder={marginPair.secondCurrency}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <span className="text-danger mt-2">{errors?.volume}</span>
        </div>
        <div className="mt-4 pb-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <p className="slider_value_p">Leverage :</p>
            <p className="slider_value_p">{formValue?.leverage} x</p>
          </div>

          <div className="custom_range_slider mt-3 ps-1 position-relative">
            {/* <div className="slider_range_circle  position-absolute range_25" onClick={() => { handleRangeSlider([0, 25]); setFormValue({ ...formValue, ...{ leverage: 25 } }) }}></div>
            <div className="slider_range_circle  position-absolute range_50" onClick={() => { handleRangeSlider([0, 50]); setFormValue({ ...formValue, ...{ leverage: 50 } }) }}></div>
            <div className="slider_range_circle  position-absolute range_75" onClick={() => { handleRangeSlider([0, 75]); setFormValue({ ...formValue, ...{ leverage: 75 } }) }}></div>
            <div className="slider_range_circle  position-absolute range_100" onClick={() => { handleRangeSlider([0, 100]); setFormValue({ ...formValue, ...{ leverage: 100 } }) }}></div> */}
            <RangeSlider
              defaultValue={[1, formValue?.leverage]}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
              onInput={handleRangeSlider}
              value={[1, parseFloat(formValue?.leverage)]}
              max={marginPair.max_leverage}
            />{" "}
          </div>
          <div className="d-flex flex-wrap justify-content-between gap-2 range_select mt-3">
            {/* <button className="" onClick={() => { handleRangeSlider([0, 0]); setFormValue({ ...formValue, ...{ leverage: 0 } }) }}>0</button> */}
            <button className="" onClick={() => { handleRangeSlider([0, 10]); setFormValue({ ...formValue, ...{ leverage: 10 } }) }}>10</button>
            <button className="" onClick={() => { handleRangeSlider([0, 20]); setFormValue({ ...formValue, ...{ leverage: 20 } }) }}>20</button>
            <button className="" onClick={() => { handleRangeSlider([0, 30]); setFormValue({ ...formValue, ...{ leverage: 30 } }) }}>30</button>
            <button className="" onClick={() => { handleRangeSlider([0, 40]); setFormValue({ ...formValue, ...{ leverage: 40 } }) }}>40</button>
            <button className="" onClick={() => { handleRangeSlider([0, 50]); setFormValue({ ...formValue, ...{ leverage: 50 } }) }}>50</button>
            <button className="" onClick={() => { handleRangeSlider([0, 60]); setFormValue({ ...formValue, ...{ leverage: 60 } }) }}>60</button>
            <button className="" onClick={() => { handleRangeSlider([0, 70]); setFormValue({ ...formValue, ...{ leverage: 70 } }) }}>70</button>
            <button className="" onClick={() => { handleRangeSlider([0, 80]); setFormValue({ ...formValue, ...{ leverage: 80 } }) }}>80</button>
            <button className="" onClick={() => { handleRangeSlider([0, 90]); setFormValue({ ...formValue, ...{ leverage: 90 } }) }}>90</button>
            <button className="" onClick={() => { handleRangeSlider([0, 100]); setFormValue({ ...formValue, ...{ leverage: 100 } }) }}>100</button>

          </div>
        </div>
        <div className="tpsl_inputsec mt-2">
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
                    <span className="input-group-text" id="basic-addon2">{marginPair.secondCurrency}</span>
                  </div>
                  <span className="text-danger">{errors?.takeProfitPrice}</span>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Profit"
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
                    <span className="input-group-text" id="basic-addon2">{marginPair.secondCurrency}</span>
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
        <div className="mt-2 trade_values_p">
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Available :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{buyorsell != 'buy' ?
                `${isEmpty(firstCurrency?.marginBalance) ? 0 : parseFloat(firstCurrency?.marginBalance)?.toFixed(firstCurrency?.pip)} ${marginPair?.firstCurrency}` :
                `${isEmpty(secondCurrency?.marginBalance) ? 0 : parseFloat(secondCurrency?.marginBalance)?.toFixed(secondCurrency?.pip)} ${marginPair?.secondCurrency}`}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Total :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{formValue.orderValue} {marginPair.secondCurrency}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Liquidity Price :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{liqPrice} {marginPair.secondCurrency}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Ordercost :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{orderCost} {buyorsell == 'buy' ? marginPair.secondCurrency : marginPair.firstCurrency}</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-5 col-sm-4 col-xl-6 col-xxl-5 col-xxxl-4">
              <p>Estimated Fee :</p>
            </div>{" "}
            <div className="col-7 col-sm-8 col-xl-6 col-xxl-7 col-xxxl-8 d-flex justify-content-end">
              <p style={{ wordBreak: "break-all" }} className="text-end">{buyorsell == 'buy' ? `${Fee} ${marginPair.firstCurrency}` : `${Fee} ${marginPair.secondCurrency}`}</p>
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
              sessionStorage.setItem('loginFrom', '/margin-trading')
              navigate('/login')
            }
          }}
          disabled={isLoading ? true : false}
        >
          {/* {isLoading ? 'Loading...' : buyorsell == 'buy' ? 'Buy' : 'Sell'} */}
          {isEmpty(getUser) ? "Login" : isLoading ? 'Loading...' : buyorsell == 'buy' ? 'Buy' : 'Sell'}
        </button>
      </div>
    </div>
  );
};

export default LimitCards;
