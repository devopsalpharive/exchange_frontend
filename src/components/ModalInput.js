import React from "react";

const ModalInput = (props) => {
  const { name, type, placeholder, value, onChange } = props;
  return (
    <div className="mt-2">
      {" "}
      <input
        name={name}
        type={type}
        value={value}
        className="modal_input w-100"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default ModalInput;
