import React, { useEffect, useState } from "react";
import Select from "react-select";
import useThemeChange from "../hooks/useThemeChange";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { updateUserSettings } from "../actions/userAction";
import isEmpty from "is-empty";

const Settings = (props) => {
  const { theme, setTheme, handleThemeChange } = props;
  const { getUser } = useSelector((state) => state.user);
  const [Theme, settheme] = useState(theme)

  useEffect(() => {
    console.log(getUser?.userTheme, 'getUser?.userTheme')
    if (!isEmpty(getUser?.userTheme)) {
      settheme(getUser?.userTheme)
    }
  }, [getUser])

  const languageOption = [
    {
      value: "English",
      label: "English",
    },
  ];
  const languageOption2 = [
    {
      value: "english",
      label: "English",
    },
    {
      value: "thai",
      label: "Thai",
    },
  ];
  const currencyOption = [
    {
      value: "usd",
      label: "USD",
    },
    {
      value: "eur",
      label: "EUR",
    },
    {
      value: "usdt",
      label: "USDT",
    },
  ];

  const userSettings = async (data) => {
    try {
      console.log("update_data", data);
      const update = await updateUserSettings(data, getUser.secretKey);
      console.log("update_data", update);
      // if(update)
    } catch (e) {
      console.log("userSettings_err", e);
    }
  };

  console.log("theme", theme);
  return (
    <Layout props={props}>
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
                    placeholder={getUser?.language?.charAt(0).toUpperCase() + getUser?.language?.slice(1)}
                    // menuIsOpen={true}
                    onChange={(e) => {
                      userSettings({ type: "language", value: e.label.toLowerCase() });
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-6 d-flex justify-content-end">
                <div>
                  <Select
                    isSearchable={false}
                    options={languageOption2}
                    className="mt-2"
                    classNamePrefix="theme_select2"
                    placeholder="English"
                    // menuIsOpen={true}
                  />
                </div>
              </div> */}
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
                    placeholder={getUser?.convertCurrency?.toUpperCase()}
                    // menuIsOpen={true}
                    onChange={(e) => {
                      userSettings({
                        type: "currencyConvertion",
                        value: e.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>{" "}
            {/* <div className="row mt_35 align-items-center">
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
            </div>{" "} */}
            <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">{theme == "light" ? "Dark Theme" : "Light Theme"}</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={theme && theme == 'dark' ? true : false}
                      onChange={(e) => {
                        console.log(e.target.checked, 'e.target.checked')
                        handleThemeChange()
                        if (e.target.checked) {
                          console.log(e.target.checked, 'e.target.checked')
                          setTheme('dark')
                          userSettings({ type: "theme", value: "dark" })
                        } else {
                          setTheme('light')
                          userSettings({ type: "theme", value: "light" })
                        }
                      }}
                    // defaultChecked={Theme && Theme == 'dark' ? true : false}

                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>{" "}
            {/* <div className="row mt_35 align-items-center">
              <div className="col-6">
                <p className="fw_450">Notification</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        userSettings({
                          type: "notification",
                          value: e.target.checked
                        });
                      }}
                      checked={getUser?.notification}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-md-6 mt-5 mt-md-0">
          {/* <div className="wallet_profile h-100">
            <h4 className="h5_text_lg mb-0">Privacy</h4>
            <div className="row mt-4 align-items-center">
              <div className="col-6">
                <p className="fw_450">Analytics</p>
              </div>{" "}
              <div className="col-6 d-flex justify-content-end">
                <div className="custom_toggle">
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        userSettings({
                          type: "analytics",
                          value: e.target.checked,
                        });
                      }}
                      checked={getUser?.analytics}
                    />
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
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        userSettings({
                          type: "advertising",
                          value: e.target.checked,
                        });
                      }}
                      checked={getUser?.advertising}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
