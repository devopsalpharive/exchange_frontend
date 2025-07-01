import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Images } from "../data/Images";
import { getMonth, getYear, parse, isValid } from "date-fns";
import range from "lodash/range";

const Datepicker = (props) => {

  const dateRef = useRef(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [startDate, setStartDate] = useState("");

  const handleDateClick = () => {
    if (!dateOpen) {
      dateRef.current.input.click();
      setDateOpen(true);
    } else {
      setDateOpen(false);
    }
  };
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

  const handleChangeRaw = (date) => {

    let inputValue = date.currentTarget.value.replace(/\D/g, ''); // Remove any non-digit characters

    if (inputValue.length >= 2) {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
    } if (inputValue.length >= 5) {
      inputValue = inputValue.slice(0, 5) + '/' + inputValue.slice(5, 9);
    }

    // Update the input field with the formatted value
    date.currentTarget.value = inputValue;

    const datePattern = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Pattern: DD/MM/YYYY
    const maxDate = new Date();

    if (datePattern?.test(inputValue)) {
      console.log(inputValue)
      const [day, month, year] = inputValue?.split("/");
      const newRaw = new Date(`${year}-${month}-${day}T00:00:00`); // Ensure the format is YYYY-MM-DD

      if (!isNaN(newRaw) && newRaw <= maxDate) {
        setStartDate(newRaw);
        props.selectData(newRaw, "");
        // console.log("newRawnewRaw1", newRaw, newRaw <= maxDate)
      } else if (newRaw > maxDate) {
        setStartDate(newRaw)
        props.selectData(newRaw, "Date exceeds the maximum allowed date.");
        // console.log("newRawnewRaw11", newRaw, newRaw <= maxDate)
      } else {
        // console.log("newRawnewRaw111", newRaw, newRaw <= maxDate)
        setStartDate(newRaw)
        props.selectData(newRaw, "Invalid date.");
      }
    } else {
      setStartDate("")
      props.selectData(startDate, "Invalid date format. Please enter date as DD/MM/YYYY.");
    }
  };

  useEffect(()=> {
    setStartDate("")
  },[props?.type])
  return (
    <div className="custom_datepicker position-relative">
      {" "}
      <img
        src={Images.calender}
        alt="calender"
        className="img-fluid calender_icon"
        onClick={handleDateClick}
      />
      <DatePicker

        minDate={props?.minDate}
        maxDate={props?.maxDate}
        ref={dateRef}
        placeholderText={props.placeholder}
        selected={startDate}
        // onKeyDown={(e) => {
        //   e.preventDefault();
        // }}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          setStartDate(date);
          props.selectData(date, "");
        }}
        onChangeRaw={(e) => {
          if (e.currentTarget.value != undefined) {
            handleChangeRaw(e)
          }
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
  );
};

export default Datepicker;






