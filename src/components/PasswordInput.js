import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const PasswordInput = (props) => {
  const [passwordView, setPasswordView] = useState(false);
  const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag
  const [pass, setPass] = useState("")
  const handlePasswordView = () => {
    setPasswordView(!passwordView);
  };
  return (
    <div className="row mx-auto h-100">
      <div className="col-11 ps-0">
        <div className="h-100">
          <input
            type={passwordView ? "text" : "password"}
            name={props.name}
            className="w-100"
            placeholder={props.placeholder}
            value={pass}
            onChange={(e) => {
              console.log("htmlTagPatternhtmlTagPattern", htmlTagPattern.test(e.target.value));
              if (!htmlTagPattern.test(e.target.value)) {
                props.setPass(e.target.value);
                setPass(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className="col-1 pe-0 d-flex align-items-center justify-content-end">
        <button
          type="button"
          className="border-0 outline-0 bg-transparent"
          onClick={() => handlePasswordView()}
        >
          {" "}
          {passwordView ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
