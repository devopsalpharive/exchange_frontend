import isEmpty from "is-empty";
import React, { useState, useEffect, useRef } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

// import options from "./data";
const MultiSelectAll = (props) => {
    //   const [selectedOptions, setSelectedOptions] = useState([]);
    const { selectedOptions, setSelectedOptions, options } = props
    const SetFn = useRef(false)
    useEffect(() => {
        // if (isEmpty(selectedOptions)) {
        setSelectedOptions([{ label: "All", value: "*" }, ...options]);
        // }
    }, [options]);
    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
        console.log(placeholderButtonLabel, value, "getDropdownButtonLabel")
        if (value && value?.some((o) => o.value === "*")) {
            return `${placeholderButtonLabel}: All`;
        } else {
            return `${placeholderButtonLabel}: ${value.length} selected`;
        }
    }

    function onChange(value, event) {
        if (event.action === "select-option" && event.option.value === "*") {
            setSelectedOptions(this.options);
        } else if (
            event.action === "deselect-option" &&
            event.option.value === "*"
        ) {
            setSelectedOptions([]);
        } else if (event.action === "deselect-option") {
            setSelectedOptions(value.filter((o) => o.value !== "*"));
        } else if (value.length === this.options.length - 1) {
            setSelectedOptions(this.options);
        } else {
            setSelectedOptions(value);
        }
    }

    return (
        // <ReactMultiSelectCheckboxes
        //     // {...props}
        //     className="react-select-container"
        //     classNamePrefix="react-select"
        //     options={[{ label: "All", value: "*" }, ...options]}
        //     placeholderButtonLabel="Email"
        //     getDropdownButtonLabel={getDropdownButtonLabel}
        //     value={selectedOptions}
        //     onChange={onChange}
        //     setState={setSelectedOptions}
        // />
        <div className="reactmulti-select">
            {/* <ReactMultiSelectCheckboxes
        className="react-select-container"
            classNamePrefix="react-multiselect"
        options={options1} /> */}
            <ReactMultiSelectCheckboxes
                // {...props}
                className="react-select-container"
                classNamePrefix="react-select"
                options={[{ label: "All", value: "*" }, ...options]}
                placeholderButtonLabel="Email"
                getDropdownButtonLabel={getDropdownButtonLabel}
                value={selectedOptions}
                onChange={onChange}
                setState={setSelectedOptions}
            />
        </div>
    );
};

export default MultiSelectAll;
