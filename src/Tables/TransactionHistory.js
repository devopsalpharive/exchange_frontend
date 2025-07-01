import React, { useEffect, useState, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Images } from "../data/Images";
import { passBookHistory, recentTranscations } from "../actions/userAction";
import { FaBoxOpen } from "react-icons/fa6";
import Select from "react-select";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { momentFormat } from "../lib/dateTimeHelper";
import isEmpty from "is-empty";
import { toCutOff } from "../lib/Calculationlib";


const typeOptions = [
  { value: 'credit', label: 'Credit' },
  { value: 'debit', label: 'Debit' },
  { value: 'all', label: 'All' },
];

const TransTypeEnum = {
  Deposit: 'Deposit',
  withdraw: 'Withdraw',
  margintrade: 'Margin trade',
  launchpad_claim: 'Launchpad Claim',
  launchpad_purchase: "Launchpad Purchase",
  futurestrade: "Futures Trade",
  derivativetrade: 'Derivative Trade',
  margintrade: 'Margin Trade',
  spottrade: "Spot Trade",
  staking: "Staking",
  Refferal: "Refferal",
  internaltransfer: "Internal Transfer"
}


const TransactionHistory = () => {

  const currency = useSelector((state) => state.currency);
  const { userAsset } = useSelector((state) => state.user);
  const [coinOptions, setCoin] = useState([])
  const [transcations, setTranscations] = useState([]);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);


  const getTranscations = async () => {
    try {
      console.log("getTranscations_coin", currency);
      let coinOptions = []
      currency?.currencyList?.map((e, i) => {
        if (e.currencySymbol != "") {
          if (coinOptions.filter((el) => el.value == e.currencySymbol).length == 0) {
            coinOptions.push({
              value: e.currencySymbol,
              label: e.currencySymbol
            })
          }
        }
        if (i == currency.currencyList.length - 1) {

          setCoin(coinOptions)
        }
      })
    } catch (e) {
      console.log("getTranscations_Err", e)
    }
  }
  const LoadMore = async () => {
    try {
      let Page = page + 1
      setPage(Page)
      let reqData = {
        page: Page,
        limit: limit,
        data: { startDate: startDate != null ? new Date(startDate).getTime() : '', endDate: endDate != null ? new Date(endDate).getTime() : '' },
        selectedType: selectedType,
        selectedCoin: selectedCoin,
      }
      const trans = await passBookHistory(reqData);

      if (trans.status) {
        setTranscations((prv) => [...prv, ...trans.data.data])
        setTotalCount(trans.data.count)
      }
    } catch (error) {
      console.log("LoadMore_err", error);
    }
  };

  const handleStartDateClick = () => {
    if (!startDateOpen) {
      startDateRef.current.input.click()
      setStartDateOpen(true);
    } else {
      setStartDateOpen(false);
    }
  }

  const handleEndDateClick = () => {
    if (!endDateOpen) {
      endDateRef.current.input.click();
      setEndDateOpen(true);
    } else {
      setEndDateOpen(false);
    }
  }

  const getDataByDate = async (data) => {
    try {
      let Page = 0 + 1
      setPage(Page)
      let reqData = {
        page: Page,
        limit: limit,
        data: data,
        selectedType: selectedType,
        selectedCoin: selectedCoin,
      }
      console.log("reqData-->", reqData);
      const trans = await passBookHistory(reqData)
      if (trans.status) {
        setTranscations(trans.data.data)
        setTotalCount(trans.data.count)
      }
    } catch (error) {
      console.log("getDataByDate_err", error);
    }
  }

  useEffect(() => {
    console.log("selectedType", selectedType);
    getDataByDate()
  }, [selectedType, selectedCoin])

  useEffect(() => {
    console.log("innn", currency);
    if (!isEmpty(currency)) {
      getTranscations(currency);
    }
  }, [currency]);


  const years = range(1950, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // console.log(coinOptions, 'coinOptions')

  // console.log('coinoptionss', coinOptions)

  return (
    <>
      <div className='tran_filtersec d-flex flex-wrap justify-content-between align-items-center gap-3 flex-wrap mb-3'>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="custom_datepicker position-relative">
            {" "}
            <img
              src={Images.calender}
              alt="calender"
              className="img-fluid calender_icon"
              onClick={handleStartDateClick}
            />
            <DatePicker
              ref={startDateRef}
              placeholderText="Start Date"
              selected={startDate}
              maxDate={new Date()}

              onKeyDown={(e) => {
                e.preventDefault()
              }}
              onChange={(date) => {
                setStartDate(date)
                if (date && endDate && date > endDate) {
                  setEndDate(null);
                }
                let reqData = { startDate: new Date(date).getTime(), endDate: endDate != null ? new Date(endDate).getTime() : 0 };
                getDataByDate(reqData)
              }}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="datepicker_custom_header d-flex align-items-center gap-2 justify-content-center">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="date_handle_button"
                  >
                    {"<"}
                  </button>
                  <select
                    className="decorated"
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="date_handle_button"
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
          <div className="custom_datepicker position-relative">
            {" "}
            <img
              src={Images.calender}
              alt="calender"
              className="img-fluid calender_icon"
              onClick={handleEndDateClick}
            />
            <DatePicker
              ref={endDateRef}
              placeholderText="End Date"
              selected={endDate}
              maxDate={new Date()}
              minDate={startDate}
              onKeyDown={(e) => {
                e.preventDefault()
              }}
              onChange={(date) => {
                setEndDate(date)
                // if (date && endDate && date > endDate) {
                // setStartDate(null);
                // }
                let reqData = { startDate: startDate != null ? new Date(startDate).getTime() : 0, endDate: new Date(date).getTime() }
                getDataByDate(reqData)
              }}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="datepicker_custom_header d-flex align-items-center gap-2 justify-content-center">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="date_handle_button"
                  >
                    {"<"}
                  </button>
                  <select
                    className="decorated"
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="date_handle_button"
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-4 new_react_select">
          <Select
            isSearchable={false}
            placeholder="Type"
            classNamePrefix="custom_rct_slt"
            name="type"
            onChange={(e) => { setSelectedType(e.value) }}
            options={typeOptions}
          />

          <Select
            isSearchable={false}
            placeholder="Coin"
            // menuIsOpen
            classNamePrefix="custom_rct_slt"
            name="type"
            onChange={(e) => { setSelectedCoin(e.value) }}
            options={coinOptions}
          />
        </div>

      </div>
      <div className="custom_table">
        <div className="custom_tableWrap ">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">S.no </th>
                <th className="text-center">Type </th>
                <th className="text-center">Currency Symbol</th>
                <th className="text-center">(Trade / Transfer) Type</th>
                <th className="text-center">Before Transaction</th>
                <th className="text-center">After Transaction</th>
                <th className="text-center">Date / Time</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transcations.length > 0 ?
                transcations.map((record, i = 0) => {
                  let currencyData = userAsset?.assets?.find((val) => (val._id == record.currencySymbol))
                  let transferType = TransTypeEnum[`${record?.transferType}`]
                  console.log(record?.transferType, 'record?.transferType')
                  return (
                    <tr>
                      <td>
                        {i + 1}
                      </td>
                      <td>
                        {record?.type?.charAt(0).toUpperCase() + record?.type?.slice(1)}
                      </td>
                      <td>
                        {record?.currencySymbol == "" ? "--" : record?.currencySymbol}
                      </td>
                      <td>
                        {/* {record?.transferType == "" ? "--" : record?.transferType?.charAt(0).toUpperCase() + record?.transferType?.slice(1)} */}
                        {transferType}
                      </td>
                      <td>
                        {record?.beforeBalance == "" ? "--" : toCutOff((record?.beforeBalance), currencyData?.pip)}

                      </td>
                      <td>
                        {record?.afterBalance == "" ? "--" : toCutOff((record?.afterBalance), currencyData?.pip)}
                      </td>
                      <td>
                        {momentFormat(record?.createdAt)}
                      </td>
                      <td>
                        <p className="">{toCutOff((record?.amount), currencyData?.pip)} {record?.currencySymbol}</p>
                      </td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="text-center" colSpan={7}>
                    {" "}
                    <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                      <FaBoxOpen fontSize={35} />
                      No Data Found
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          {
            console.log("ConditionPASSBOOK", transcations.length, transcations.length > 0, totalCount, transcations.length)
          }
        </div>

        {
          transcations.length > 0 && totalCount > transcations.length ? (
            <div className="d-flex justify-content-center">
              <button
                className="grad_btn  px-4 fw_sm mt_2rem"
                onClick={() => {
                  LoadMore()
                }}
              >
                Load More
              </button>
            </div>
          ) : <></>
        }
      </div>
    </>
  );
};

export default TransactionHistory;


