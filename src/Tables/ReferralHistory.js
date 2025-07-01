import React, { useEffect, useState, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Images } from "../data/Images";
import { getRefferalTranscations } from "../actions/userAction";
import range from "lodash/range";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";

const ReferralHistory = (props) => {
  const { getUser } = useSelector((state) => state.user);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  let columns = [
    {
      key: "createdAt",
      text: "Date",
      width: 180,
      className: "table_p w230",
      align: "center",
      sortable: false,
      cell: (record) => {
        return <p className="">{new Date(record?.createdAt).toLocaleString()}</p>;
      }
    },
    {
      key: "refferalType",
      text: "Type",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record) => {
        return <p className="">
          {record?.refferalType == "firstTrade" ? "Trade" :
            record?.refferalType == "firstDeposit" ? "Deposit" :
              record?.refferalType == "everyStaking" ? "Staking" : "--"
          }
        </p>;
      },
    },
    {
      key: "userId",
      text: "Referral User ID",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false,
      cell: (record) => {
        return <p className="">{record?.refferalUserId ? record?.refferalUserId : "--"}</p>;
      },
    },
    {
      key: "currency",
      text: "Currency",
      className: "table_p w150",
      align: "center",
      width: 100,
      sortable: false
    },
    {
      key: "amount",
      text: "Your Commission",
      className: "table_p w230",
      align: "center",
      width: 150,
      sortable: false
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
    show_info: true,
    show_length_menu: false,
    show_filter: false,
  };

  const fetchtranscationsList = async (payload, key) => {
    try {
      const data = await getRefferalTranscations(payload, key);
      console.log("fetchtranscationsList_data", data);
      if (data.status) {
        setRecords(data.result);
        setCount(data.count);
      }
    } catch (e) {
      console.log("getHistory_err", e);
    }
  };

  const handlePagination = async (index) => {
    setPage(index.page_number);
    setLimit(index.page_size);
    let reqData = {
      limit: index.page_size,
      page: index.page_number,
      search: search,
    };
    fetchDepositList(reqData);
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
  useEffect(() => {
    if (!isEmpty(getUser)) {
      let reqData = { limit: limit, page: page, startDate: 0, endDate: 0 };
      fetchtranscationsList(reqData, getUser.secretKey)
    }
  }, [getUser])


  return (
    <div className="custom_table ref_custom_table">

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

            // minDate={props?.minDate}
            maxDate={new Date()}
            ref={startDateRef}
            placeholderText="Start Date"
            selected={startDate}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onChange={(date) => {
              setStartDate(date);
              if (date && endDate && date > endDate) {
                setEndDate(null);
              }
              let reqData = { limit: limit, page: page, startDate: new Date(date).getTime(), endDate: endDate != null ? new Date(endDate).getTime() : 0 };
              fetchtranscationsList(reqData)
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

            minDate={startDate}
            maxDate={new Date()}
            ref={endDateRef}
            placeholderText="End Date"
            selected={endDate}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onChange={(date) => {
              setEndDate(date);
              let reqData = {
                limit: limit, page: page, startDate: startDate != null ? new Date(startDate).getTime() : 0,
                endDate: new Date(date).getTime()
              };
              fetchtranscationsList(reqData)
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
      <ReactDatatable
        config={config}
        records={records}
        columns={columns}
        dynamic={true}
        total_record={count}
        onChange={(e) => {
          handlePagination(e);
        }}
      />
    </div >
  );
};

export default ReferralHistory;


