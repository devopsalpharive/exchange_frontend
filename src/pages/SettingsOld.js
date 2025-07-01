import React, { useEffect, useState } from "react";
import Select from "react-select";
import useThemeChange from "../hooks/useThemeChange";
import { useDispatch, useSelector } from "react-redux";

const SettingsOld = (props) => {
  const { theme, setTheme, handleThemeChange } = props;

  // end of theme change
  const languageOption = [
    {
      value: "english",
      label: "English",
    },
  ];
  const currencyOption = [
    {
      value: "usd",
      label: "USD",
    },
    {
      value: "inr",
      label: "INR",
    },
  ];

  // function handleThemeChange() {
  //   setTheme(theme === "light" ? "dark" : "light");
  //   dispatch({
  //     type: "themeChange",
  //     value: theme,
  //   });
  // }
  // useEffect(() => {
  //   document.body.setAttribute("data-theme", theme);
  //   dispatch({
  //     type: "themeChange",
  //     value: theme,
  //   });
  // }, [theme]);

  return (
    <div>
      {/* <button onClick={handleToggleTheme}>change</button> */}

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="setting_left wallet_profile">
            <h4 className="h5_text_lg mb-0">Settings</h4>
            <div className="row mt-4 align-items-center">
              <div className="col-6">
                <p className="fw_450">Languages</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <Select
                    isSearchable={false}
                    options={languageOption}
                    className="mt-2"
                    classNamePrefix="theme_select"
                    placeholder="English"
                    // menuIsOpen={true}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 align-items-center">
              <div className="col-6">
                <p className="fw_450">Currency conversion</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div>
                  <Select
                    isSearchable={false}
                    options={currencyOption}
                    className="mt-2"
                    classNamePrefix="theme_select"
                    placeholder="USD"
                    // menuIsOpen={true}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Currency conversion</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>{" "}
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Dark Theme</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={() => handleThemeChange()}
                      checked={theme === "dark"}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>{" "}
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Notification</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            {/* <h4 className="h5_text_lg mb-0 mt-5">Preference</h4>
            <div className="row mt-4 align-items-center">
              <div className="col-6">
                <p className="fw_450">UTC Time zone</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Shortcuts</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-5 mt-md-0">
          <div className="wallet_profile h-100">
            <h4 className="h5_text_lg mb-0">Privacy</h4>
            <div className="row mt-4 align-items-center">
              <div className="col-6">
                <p className="fw_450">Analytics</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Advertising</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsOld;
