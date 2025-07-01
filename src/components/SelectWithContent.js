import React from "react";
import Select from "react-select";

const SelectWithContent = (props) => {
  const handleSelectChange = (e) => {
    console.log("eval", e.value);
    if (props.setPaymentMode) {
      props.setPaymentMode(e);
    }
  };
  return (
    <div className="select_lg">
      <Select
        options={props.options}
        className="mt-2"
        classNamePrefix="custom_rct_slt"
        placeholder={props.placeholder}
        isSearchable={false}
        // menuIsOpen={true}
        value={
          !props?.paymentMode?.value
            ? { label: "Select", value: "" }
            : props?.paymentMode
        }
        onChange={(e) => handleSelectChange(e)}
      />
    </div>
  );
};

export default SelectWithContent;
