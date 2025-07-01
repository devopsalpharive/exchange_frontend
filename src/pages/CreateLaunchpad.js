import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { BiPlusCircle } from "react-icons/bi";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import CreateToken from "../modal/CreateToken";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../lib/isEmpty";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import JoditEditor from 'jodit-react';


import { Images } from "../data/Images";

/** Actions */
import {
  launchpadCurrencyList,
  launchpadList,
  launchpadCreation,
} from "../actions/launchpadAction";

/** Hooks */
import { UseTokenInfo } from "../hooks/useWeb3";

/** Validation */
import { launchpadValidations } from "../validations/LaunchpadValidations";

/** Config */
import { showToastMessage } from "../config/toast";
import { LAUNCH_CREATEDATA } from "../constant/Index";

function CreateLaunchpad(props) {
  const dispatch = useDispatch()
  const numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  const htmlTagPattern = /<[^>]*>/;
  const { approveTokens } = useSelector((state) => state.launchToken)
  const { getUser } = useSelector((state) => state.user);
  const { creationData } = useSelector((state) => state.launchpad);
  const imageUploadRef = useRef(null);
  const imageUploadwhitepaper = useRef(null);
  const dateRef = useRef(null);
  const endDateRef = useRef(null);
  const navigate = useNavigate();

  const [currentStep, setCurrentstep] = useState(1);
  const [isPancake, setIsPancake] = useState(true);
  const [isVested, setIsVested] = useState(false);
  const [currency, setCurrency] = useState("BUSD");
  const [selectedNetword, setSelectedNetwork] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [createTokenShow, setCreateTokenShow] = useState(false);
  const [error, setError] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const [tokenDetails, setTokenDetails] = useState("");
  // const [contractAddress, setContractAddress] = useState("")
  const [presaleRate, setPresalaRate] = useState(0);
  const [listingPrice, setListingPrice] = useState(0);
  const [softCap, setSoftCap] = useState(0);
  const [hardCap, setHardCap] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [listingOptions, setListingOptions] = useState("auto");
  const [lockingDays, setLockingdays] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [saleCreateFee, setSaleCreateFee] = useState(0);
  const [whitelistSale, setWhitelistSale] = useState("disable");
  const [vestingPeriod, setVestingPeriod] = useState(0);
  const [vestingPercentage, setVestingPercentage] = useState(0);
  const [bannerurl, setbannerurl] = useState("");
  const [logoUrl, setLogoUrl] = useState(0);
  const [whitepaper, setWhitepaper] = useState("");
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [reddit, setReddit] = useState("");
  const [youtube, setYoutube] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [terms, setTerms] = useState("");
  const [contentOneTit, setContentOneTit] = useState('')
  const [contentOneImg, setcontentOneImg] = useState(Images.noimage)
  const [contentOne, setcontentOne] = useState('')
  const [contentTwoTit, setContentTwoTit] = useState('')
  const [contentTwoImg, setcontentTwoImg] = useState(Images.noimage)
  const [contentTwo, setcontentTwo] = useState('')
  const [currentSelectTheme, setCurrentSelectTheme] = useState(2);
  const [templateTwoImage, setTemplateTwoImage] = useState(Images.noimage);
  const [templateThreeImage1, setTemplateThreeImage1] = useState(
    Images.noimage
  );
  const [templateThreeImage2, setTemplateThreeImage2] = useState(
    Images.noimage
  );

  // const [choosenFileName, setChoosenFileName] = useState('Choose File')

  const templateTwoUploadRef = useRef(null);
  const templateThreeUploadRef1 = useRef(null);
  const templateThreeUploadRef2 = useRef(null);

  const handleTemplateTwoImageUpload = () => {
    templateTwoUploadRef.current.click();
  };
  const handleTemplateThreeImageUpload1 = () => {
    templateThreeUploadRef1.current.click();
  };
  const handleTemplateThreeImageUpload2 = () => {
    templateThreeUploadRef2.current.click();
  };
  const handleCreateTokenClose = () => setCreateTokenShow(false);
  // const handleCreateTokenShow = () => setCreateTokenShow(true);
  const handleImageUpload = () => {
    imageUploadRef.current.click();
  };
  const handleImage = () => {
    imageUploadwhitepaper.current.click();
  };
  const handleDateClick = () => {
    if (!dateOpen) {
      dateRef.current.input.click();
      setDateOpen(true);
    } else {
      setDateOpen(false);
    }
  };
  const handleEndDateClick = () => {
    if (!endDateOpen) {
      endDateRef.current.input.click();
      setEndDateOpen(true);
    } else {
      setEndDateOpen(false);
    }
  };

  const getCurrencyies = async () => {
    try {
      // const { data, status } = await launchpadCurrencyList();
      const { data, status } = await launchpadCurrencyList();
      if (status) {
        setCurrencies(data)
        if (currentStep == 1) {
          setCurrency(data[0]);
        }
      }
    } catch (e) {
      console.log("getCurrencyies_err", e);
    }
  };

  // const getApproveTokenList = async () => {
  //   try {
  //     const { data, status } = await launchpadApproveTokenList();
  //     if (status) {
  //       setLaunchTokens(data);
  //       if (currentStep == 1) {
  //         setSelectedNetwork(data[0]);
  //       }

  //     }
  //   } catch (e) {
  //     console.log("getCurrencyies_err", e);
  //   }
  // };

  // const validateCustomToken = async (e, data) => {
  //   try {
  //     /** EVM STANDRAD TOKENS */
  //     if (e.length == 42) {
  //       let getTokenData = await UseTokenInfo(data.rpc, e)
  //       if (getTokenData.status) {
  //         setTokenDetails(getTokenData);
  //         setError("")
  //       } else { setError({ contractAddress: "* Invalid contract address" }); setTokenDetails({ tokenName: "", tokenSymbol: "", tokenDecimal: "", contractAddress: "" }); }
  //     } else {
  //       setTokenDetails("")
  //     }
  //   } catch (e) {
  //     console.log("validateCustomToken_err", e);
  //   }
  // }

  const validation = async (level) => {
    try {
      let data;
      if (level == 2) {
        data = {
          presaleRate,
          whitelistSale,
          softCap: parseFloat(softCap),
          hardCap: parseFloat(hardCap),
          minimum: parseFloat(minimum),
          maximum: parseFloat(maximum),
          listingOptions,
          lockingDays,
          listingPrice,
          startTime,
          endTime,
          isVested,
          vestingPeriod,
          vestingPercentage,
        };
      } else if (level == 3) {
        data = {
          bannerurl,
          logoUrl,
          whitepaper,
          website,
          facebook,
          twitter,
          github,
          telegram,
          instagram,
          discord,
          reddit,
          youtube,
        };
      } else if (level == 4) {
        data = {
          description,
          terms,
          currentSelectTheme,
        };
      }
      else if (level == 5) {
        data = {
          currentSelectTheme,
          contentOne,
          contentOneImg,
          contentOneTit,
          contentTwo,
          contentTwoImg,
          contentTwoTit
        };
      }
      const isValid = launchpadValidations(data, level);
      console.log("isValid_isValid", isValid);
      if (isValid.status) {
        setError(isValid.error);
      } else {
        if (currentSelectTheme == 1 && level == 4) {
          setCurrentstep(level + 2)
          return
        }
        setCurrentstep(level + 1);
      }
    } catch (e) {
      console.log("validation_err", e);
    }
  };

  const selectFileValidations = (file) => {
    try {
      const isValid = file.name.split(".")[file.name.split(".").length - 1];
      console.log(
        "isValid",
        file.name.split("."),
        file.name.split(".")[file.name.split(".").length - 1]
      );
      if (isValid == "pdf" || isValid.toUpperCase() == "PDF") {
        setWhitepaper(file);
      } else {
        showToastMessage("Select PDF file formate", "error");
      }
    } catch (e) {
      console.log("selectFileValidations_err", e);
    }
  };

  const onPerview = () => {
    try {
      let launchData = {
        presaleRate,
        whitelistSale,
        softCap,
        hardCap,
        minimum,
        maximum,
        listingOptions,
        lockingDays,
        listingPrice,
        startTime,
        endTime,
        isVested,
        vestingPeriod,
        vestingPercentage,
        bannerurl,
        logoUrl,
        whitepaper,
        website,
        facebook,
        twitter,
        github,
        telegram,
        instagram,
        discord,
        reddit,
        youtube,
        description,
        terms,
        currentSelectTheme,
        currency,
        selectedNetword,
        currentStep
      }
      dispatch({
        type: LAUNCH_CREATEDATA,
        payload: launchData
      })
      console.log(launchData, 'launchData')
      launchData['isVesting'] = isVested ? 'enable' : 'disable'
      launchData['contractAddress'] = selectedNetword.value
      launchData['tokenName'] = selectedNetword.tokenName
      launchData['tokenSymbol'] = selectedNetword.tokenSymbol
      launchData['currency'] = currency?.currencyName
      if (currentSelectTheme == 1) {
        navigate(`/launchPadDetail/rubby/${selectedNetword.tokenSymbol}/perview`, { state: { launchData: launchData } })
      }
      else if (currentSelectTheme == 2) {
        navigate(`/launchPadDetail/emerald/${selectedNetword.tokenSymbol}/perview`, { state: { launchData: launchData } })
      } else if (currentSelectTheme == 3) {
        navigate(`/launchPadDetail/sapphire/${selectedNetword.tokenSymbol}/perview`, { state: { launchData: launchData } })
      }
    } catch (err) {
      console.log(err, 'onPerview__err')
    }
  }

  const createLaunchpad = async () => {
    try {
      setIsLoader(true);
      const Formdata = new FormData();
      Formdata.append("userId", getUser?.userId);
      Formdata.append("currency", currency?.label);
      Formdata.append("tokenName", selectedNetword.tokenName);
      Formdata.append("tokenSymbol", selectedNetword.tokenSymbol);
      Formdata.append("tokenDecimal", selectedNetword.tokenDecimal);
      Formdata.append("contractAddress", selectedNetword.value);
      Formdata.append("presaleRate", presaleRate);
      Formdata.append("listingPrice", listingPrice);
      Formdata.append("softCap", softCap);
      Formdata.append("hardCap", hardCap);
      Formdata.append("minimum", minimum);
      Formdata.append("maximum", maximum);
      Formdata.append("listingOptions", listingOptions);
      Formdata.append("startTime", new Date(startTime).getTime());
      Formdata.append("endTime", new Date(endTime).getTime());
      Formdata.append("saleCreateFee", 10);
      Formdata.append("whitelistSale", whitelistSale);
      Formdata.append("isVesting", isVested ? "enable" : "disable");
      Formdata.append("website", website);
      Formdata.append("description", description);
      Formdata.append("logoUrl", logoUrl);
      Formdata.append("vestingPeriod", vestingPeriod);
      Formdata.append("vestingPercentage", vestingPercentage);
      Formdata.append("whitepaper", whitepaper);
      Formdata.append("facebook", facebook);
      Formdata.append("twitter", twitter);
      Formdata.append("github", github);
      Formdata.append("telegram", telegram);
      Formdata.append("instagram", instagram);
      Formdata.append("discord", discord);
      Formdata.append("reddit", reddit);
      Formdata.append("youtube", youtube);
      Formdata.append("terms", terms);
      Formdata.append("theme", currentSelectTheme);
      Formdata.append("bannerurl", bannerurl);
      Formdata.append("contentOneTitle", contentOneTit)
      Formdata.append("contentOneImg", contentOneImg)
      Formdata.append("contentOne", contentOne)
      Formdata.append("contentTwoTitle", contentTwoTit)
      Formdata.append("contentTwoImg", contentTwoImg)
      Formdata.append("contentTwo", contentTwo)
      // const launch = await launchpadCreation(Formdata);
      const { status, message, error } = await launchpadCreation(Formdata);
      if (status) {
        setIsLoader(false);
        showToastMessage(message, "success");
        navigate("/launchpad");
      } else {
        setError(error);
        setIsLoader(false);
        if (!isEmpty(message)) {
          showToastMessage(message, "error");
        }
        error && showToastMessage(message, "error");
      }
      console.log("launch", status, message, error);
    } catch (e) {
      console.log("createLaunchpad_err", e);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getCurrencyies();
    // getApproveTokenList();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);
  useEffect(() => {
    if (!isEmpty(creationData)) {
      setCurrency(creationData?.currency)
      setSelectedNetwork(creationData.selectedNetword)
      setPresalaRate(creationData.presaleRate)
      setWhitelistSale(creationData.whitelistSale)
      setSoftCap(creationData.softCap)
      setHardCap(creationData.hardCap)
      setMinimum(creationData.minimum)
      setMaximum(creationData.maximum)
      setListingOptions(creationData.listingOptions)
      setLockingdays(creationData.lockingDays)
      setListingPrice(creationData.listingPrice)
      setStartTime(creationData.startTime)
      setEndTime(creationData.endTime)
      setIsVested(creationData.isVested)
      setVestingPeriod(creationData.vestingPeriod)
      setVestingPercentage(creationData.vestingPercentage)
      setbannerurl(creationData.bannerurl)
      setLogoUrl(creationData.logoUrl)
      setWhitepaper(creationData.whitepaper)
      setWebsite(creationData.website)
      setFacebook(creationData.facebook)
      setTwitter(creationData.twitter)
      setGithub(creationData.github)
      setTelegram(creationData.telegram)
      setInstagram(creationData.instagram)
      setDiscord(creationData.discord)
      setReddit(creationData.reddit)
      setYoutube(creationData.youtube)
      setDescription(creationData.description)
      setTerms(creationData.terms)
      setCurrentSelectTheme(creationData.currentSelectTheme)
      setCurrentstep(creationData.currentStep)
    }
  }, [creationData])
  console.log("getUser_launchpage", getUser, selectedNetword, currentStep);
  return (
    <div>
      <Header props={props} />
      <section className="custom_section">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center gap-2">
            <Link to="/" className="d-flex align-items-center ">
              Home Page
            </Link>
            <LiaGreaterThanSolid />
            <Link to="/launchpad">Launchpad</Link>
          </div>

          <div className="mt-4">
            <h5 className="inr_title">Create Launchpad</h5>

            <p className="desc sub_desc">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea
            </p>
          </div>
          <div className="ongoing_sec form_sec">
            <div className="inner_bg mt-5">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-9 mx-auto">
                  <div className="create_launch_card">
                    <div className="row align-items-center pb-4">
                      <div className="col-12 col-md-6 mb-3 mb-md-0">
                        {/* <p className="bottom_text mb-0">
                              (*) is required field.
                            </p> */}
                      </div>
                    </div>
                    <div
                      id="firststep"
                      className={currentStep == 1 ? "d-block" : "d-none"}
                    >
                      {/* <div className="d-flex justify-content-end mb-4">
                        <button
                          className="grad_btn2 grad_btn d-flex align-items-center gap-2"
                          onClick={handleCreateTokenShow}
                        >
                          <BiPlusCircle /> Create Token
                        </button>
                      </div> */}
                      <div className="row  mt-3">
                        <div className="col-12 col-md-12">
                          <p className="input_desc_sm">Token Address*</p>
                          <div>
                            {/* <div className="row">
                              <div className="col-8 pe-0">
                                <div className="inputs input-groups">
                                  <InputGroup className="">
                                    <FormControl
                                      id="tokenaddress"
                                      placeholder=""
                                      aria-describedby="basic-addon2"
                                      onChange={(e) => { setContractAddress(e.target.value); validateCustomToken(e.target.value, currency) }}
                                    />
                                  </InputGroup>
                                  <span className="text-danger f-12 d-block text-left mt-2">
                                    {error?.contractAddress}
                                  </span>
                                </div>
                              </div>
                              <div className="col-4">
                                <Select
                                  isSearchable={false}
                                  options={currencies}
                                  className="mt-2"
                                  classNamePrefix="theme_select"
                                  placeholder={selectedNetword.label}
                                  onChange={(e) => { setSelectedNetwork(e); validateCustomToken(contractAddress, e) }}
                                // menuIsOpen={true}
                                />
                              </div>
                            </div> */}

                            <Select
                              isSearchable={false}
                              options={approveTokens}
                              className="mt-2"
                              classNamePrefix="theme_select"
                              placeholder={`Select token `}
                              value={
                                !isEmpty(selectedNetword)
                                  ? approveTokens.find(
                                    (val) => val._id == selectedNetword._id
                                  )
                                  : ""
                              }
                              onChange={(e) => {
                                console.log(e, "selectedNetword?.label");
                                setSelectedNetwork(e);
                              }}
                            // menuIsOpen={true}
                            />
                          </div>

                          {/* <div className=" my-1">
                            <p className="fees_txt_sm">Pool creation fee: 2%</p>
                          </div> */}
                        </div>

                        <div className="col-12 col-md-12 my-4">
                          <p className="white_txt_sm d-flex justify-content-between mt-0 mb-2">
                            <span className="desc_grey_txt ">Name :</span>
                            <span className="desc_grey_txt font_12">
                              {selectedNetword?.tokenName}
                            </span>
                          </p>

                          <p className="white_txt_sm d-flex justify-content-between mt-0 mb-2">
                            <span className="desc_grey_txt">Symbol :</span>
                            <span className="desc_grey_txt font_12">
                              {selectedNetword?.tokenSymbol}
                            </span>
                          </p>

                          <p className="white_txt_sm d-flex justify-content-between mt-0 mb-1">
                            <span className="desc_grey_txt">Decimals :</span>
                            <span className="desc_grey_txt font_12">
                              {selectedNetword?.tokenDecimal}
                            </span>
                          </p>
                        </div>

                        <div className="col-12 col-md-12 mb-1">
                          <p className="input_desc_sm">Currency</p>
                          <div className="d-flex mt-3 gap-2 flex-wrap">
                            {currencies &&
                              currencies.length > 0 &&
                              currencies.map((value) => (
                                <div
                                  className={
                                    value._id == currency?._id
                                      ? "currency_badge active me-2"
                                      : "currency_badge me-2"
                                  }
                                  value="ETH"
                                  onClick={() => {
                                    setCurrency(value);
                                  }}
                                >
                                  {value.value}
                                </div>
                              ))}
                          </div>
                          <div className="note_desc my-3">
                            <p>
                              Users will pay with {currency?.value} for your
                              token
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-12 col-md-12 mb-3 mt-2">
                          <p className="input_desc_sm mb-3">Fee Options</p>

                          <div className="custom-control custom-radio mb-2">
                            <input
                              type="checkbox"
                              id="customRadio1"
                              name="customRadio"
                              className="custom-control-input"
                              value={5}
                            // checked
                            />
                            <label
                              className="custom-control-label"
                              for="customRadio1"
                            >
                              1% USDC raised only <span>(recommended)</span>
                            </label>
                          </div>

                          <div className="custom-control custom-radio">
                            <input
                              type="checkbox"
                              id="customRadio2"
                              name="customRadio"
                              value={2}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              for="customRadio2"
                            >
                              {2}% USDC raised + 2% token sold
                            </label>
                          </div>
                        </div> */}

                        {/* {currency != "ETH" ? ( */}
                        <div className="col-12 col-md-12 mb-4 mt-4">
                          <div className="card_footer_form">
                            <div className="d-flex align-items-center justify-content-center">
                              <i
                                class="fa fa-exclamation-circle text-danger-war"
                                aria-hidden="true"
                              ></i>
                              <p className="mb-0 ps-3">
                                Do not use this currency for auto liquidity
                                tokens, or tokens that depend on W
                                {currency?.value} pair. It will lead to error
                                when finalizing the pool or transferring the
                                tokens (for example Liquidity Generator Token,
                                BabyToken, BuyBack Baby Token) <br />
                                Contact Space Launch for more information.
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* ) : (
                          <></>
                        )} */}

                        <div className="col-12 col-md-12 mb-4">
                          <div className="card_footer_form">
                            <p className="mb-0">
                              For auto listing, after you finalize the pool your
                              token will be auto listed on DEX.
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                          {/* {this.state.step1 ?  */}

                          <button
                            className="grad_btn"
                            onClick={() => {
                              setCurrentstep(2);
                            }}
                            disabled={isEmpty(selectedNetword)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      id="secondstep"
                      className={currentStep == 2 ? "d-block" : "d-none"}
                    >
                      <div className="row">
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm">Presale Rate*</p>
                          <div className="inputs input-groups mt-3">
                            <InputGroup className="">
                              <FormControl
                                id="presalerate"
                                placeholder=""
                                aria-describedby="basic-addon2"
                                value={presaleRate}
                                onChange={(e) => {
                                  const { value, name } = e.target;
                                  if (!numbers.test(value) && value !== "") {
                                    return false;
                                  }
                                  setPresalaRate(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.presaleRate}
                            </span>
                          </div>
                          <div className="note_desc my-3">
                            <p>
                              If I spend 1 {currency?.label} how many tokens
                              will I receive?
                            </p>
                          </div>
                        </div>

                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm mb-3">Whitelist</p>

                          <div className="custom-control custom-radio mb-2 d-flex align-items-center">
                            <input
                              type="radio"
                              id="customRadio3"
                              name="customRadio"
                              className="custom-control-input"
                              defaultChecked={
                                whitelistSale == "disable" ? true : false
                              }
                              onClick={(e) => {
                                setWhitelistSale("disable");
                              }}
                            />
                            <label
                              className="custom-control-label"
                              for="customRadio3"
                            >
                              Disable
                            </label>
                          </div>

                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="customRadio4"
                              name="customRadio"
                              className="custom-control-input"
                              defaultChecked={
                                whitelistSale == "enable" ? true : false
                              }
                              onClick={(e) => {
                                setWhitelistSale("enable");
                              }}
                              checked={whitelistSale == "enable" ? true : false}
                            />
                            <label
                              className="custom-control-label"
                              for="customRadio4"
                            >
                              Enable
                            </label>
                          </div>
                        </div>

                        <div className="col-12 col-md-12 mb-0">
                          <p className="input_desc_sm my-3">Soft Cap*</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="softcap"
                                placeholder=""
                                aria-describedby="basic-addon2"
                                value={softCap}
                                onChange={(e) => {
                                  const { value, name } = e.target;
                                  if (!numbers.test(value) && value !== "") {
                                    return false;
                                  }
                                  setSoftCap(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.softCap}
                            </span>
                          </div>
                          <div className="note_desc mt-1 mb-0">
                            <p>Soft Cap must be greater than are equal to 50% of Hard Cap</p>
                          </div>
                        </div>

                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Hard Cap *</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="hardcap"
                                placeholder=""
                                aria-describedby="basic-addon2"
                                value={hardCap}
                                onChange={(e) => {
                                  const { value, name } = e.target;
                                  if (!numbers.test(value) && value !== "") {
                                    return false;
                                  }
                                  setHardCap(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.hardCap}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">
                            Minimum Buy ({currency?.label})*
                          </p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="mincontribution"
                                placeholder=""
                                aria-describedby="basic-addon2"
                                value={minimum}
                                onChange={(e) => {
                                  const { value, name } = e.target;
                                  if (!numbers.test(value) && value !== "") {
                                    return false;
                                  }
                                  setMinimum(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.minimum}
                            </span>
                          </div>
                        </div>

                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">
                            Maximum Buy ({currency?.label})*
                          </p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="maxcontribution"
                                placeholder=""
                                aria-describedby="basic-addon2"
                                value={maximum}
                                onChange={(e) => {
                                  const { value, name } = e.target;
                                  if (!numbers.test(value) && value !== "") {
                                    return false;
                                  }
                                  setMaximum(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.maximum}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12 col-md-12 mb-3">
                        <p className="input_desc_sm mb-2">Listing Options</p>
                        <div className="d-flex">
                          <div
                            className={listingOptions == 'auto' ? "currency_badge  me-2 active" : "currency_badge  me-2 "}
                            onClick={(e) => { setIsPancake(true); setListingOptions('auto') }}
                          >
                            Auto
                          </div>
                          <div
                            className={listingOptions == 'manual' ? "currency_badge  me-2 active" : "currency_badge  me-2 "}
                            onClick={(e) => { setIsPancake(false); setListingOptions("manual") }}
                          >
                            Manual
                          </div>
                        </div>
                      </div> */}

                      {isPancake ? (
                        <>
                          {/* <div className="col-12 col-md-12 mb-3">
                            <p className="input_desc_sm my-3">Locking Days</p>
                            <div className="inputs input-groups">
                              <InputGroup className="">
                                <FormControl
                                  id="liquidity"
                                  placeholder="0"
                                  aria-describedby="basic-addon2"
                                  value={lockingDays}
                                  onChange={(e) => { numbers.test(e.target.value) == true && setLockingdays(e.target.value) }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.lockingDays}

                              </span>
                            </div>
                          </div> */}

                          <div className="col-12 col-md-12 mb-0">
                            <p className="input_desc_sm my-3">
                              Listing Rate per {currency?.label}
                            </p>
                            <div className="inputs input-groups">
                              <InputGroup className="">
                                <FormControl
                                  id="maxcontribution"
                                  placeholder=""
                                  aria-describedby="basic-addon2"
                                  value={listingPrice}
                                  onChange={(e) => {
                                    const { value, name } = e.target;
                                    if (!numbers.test(value) && value !== "") {
                                      return false;
                                    }
                                    setListingPrice(e.target.value);
                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.listingPrice}
                              </span>
                            </div>
                            <div className="note_desc mt-1 mb-1">
                              <p>
                                1 {currency?.label} = {listingPrice}{" "}
                                {selectedNetword?.tokenSymbol}
                              </p>
                            </div>
                          </div>
                          {/* <div className="col-12 col-md-12 mb-3">
                            <p className="input_desc_sm">Susiswap Liquidity</p>
                            <div className="inputs input-groups">
                              <InputGroup className="">
                                <FormControl
                                  id="liquidity"
                                  placeholder="0"
                                  aria-describedby="basic-addon2"
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left">
                                Error text
                              </span>
                            </div>
                          </div> */}
                        </>
                      ) : (
                        <></>
                      )}

                      {isPancake ? (
                        <div className="col-12 col-md-12 mb-2">
                          <div className="note_desc mt-1 mb-0">
                            <p>
                              Enter the percentage of raised funds that sholud
                              be allocated to Liquidity on (Min 51%, Max 100%)
                            </p>
                            <p>
                              If I spend 1 ETH on how many tokens will I
                              receive? Usually the amount is lower than presale
                              rate to allow for a higher listing price on
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="col-12 col-md-12 mb-0">
                        <p className="input_desc_sm fw-bold my-3">
                          Select Start time & End time (UTC)*
                        </p>
                      </div>

                      <div className="col-12 col-md-12 mb-3">
                        <p className="input_desc_sm mb-3">Start Time (UTC)*</p>
                        <div className="inputs input-groups date_inoput_grps">
                          {/* <DatePicker
                              minDate={new Date()}
                              showTimeSelect
                              dateFormat="MMMM d, yyyy h:mm aa"
                              onChange={(date) => setStartTime(new Date(date).getTime())}
                            /> */}
                          <div className="custom_datepicker red_datepicker position-relative w-100">
                            {" "}
                            <img
                              src={Images.calender}
                              alt="calender"
                              className="img-fluid calender_icon"
                              onClick={handleDateClick}
                            />
                            <DatePicker
                              ref={dateRef}
                              placeholderText={props.placeholder}
                              minDate={new Date()}
                              filterTime={filterPassedTime}
                              showTimeSelect
                              selected={
                                isEmpty(startTime) ? "" : new Date(startTime)
                              }
                              onChange={(date) => {
                                try {
                                  console.log(date, "DatePicker");
                                  setStartTime(new Date(date).getTime());
                                } catch (err) {
                                  console.log(err, "DatePicker___wrr");
                                }
                              }}
                              // onKeyDown={(e) => {
                              //   e.preventDefault();
                              // }}
                              dateFormat="MMMM d, yyyy h:mm aa"
                            />
                          </div>

                          {/* <div className='cur_pointer'>
                    <button variant="outline-secondary" className="trans_cal_btn">
                        <i class="far fa-calendar-alt"></i>
                    </button>
                </div> */}
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {error?.startTime}
                        </span>
                      </div>
                      <div className="col-12 col-md-12 mb-3">
                        <p className="input_desc_sm my-3">End Time (UTC)*</p>
                        <div className="inputs input-groups date_inoput_grps">
                          {/* <InputGroup className="datepicker_input" >
                            <DatePicker
                              minDate={new Date()}
                              showTimeSelect
                              dateFormat="MMMM d, yyyy h:mm aa"
                              onChange={(date) => setEndTime(new Date(date).getTime())}
                            />
                          </InputGroup> */}

                          <div className="custom_datepicker red_datepicker position-relative w-100">
                            {" "}
                            <img
                              src={Images.calender}
                              alt="calender"
                              className="img-fluid calender_icon"
                              onClick={handleEndDateClick}
                            />
                            <DatePicker
                              ref={endDateRef}
                              placeholderText={props.placeholder}
                              minDate={new Date()}
                              filterTime={filterPassedTime}
                              showTimeSelect
                              selected={
                                isEmpty(endTime) ? "" : new Date(endTime)
                              }
                              onChange={(date) => {
                                if (new Date(date).getTime() > startTime) {
                                  setEndTime(new Date(date).getTime());
                                  setError((pervRec) => {
                                    return { ...pervRec, ["endTime"]: "" };
                                  });
                                } else {
                                  setEndTime(new Date(date).getTime());
                                  setError((pervRec) => {
                                    return {
                                      ...pervRec,
                                      ["endTime"]:
                                        "end time must be greater than start time",
                                    };
                                  });
                                }
                              }}
                              // onKeyDown={(e) => {
                              //   e.preventDefault();
                              // }}
                              dateFormat="MMMM d, yyyy h:mm aa"
                            />
                          </div>
                          {/* <div className='cur_pointer'>
                    <button variant="outline-secondary" className="trans_cal_btn">
                        <i class="far fa-calendar-alt"></i>
                    </button>
                </div> */}
                        </div>
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {error?.endTime}
                        </span>
                      </div>

                      <div className="col-12 col-md-12">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            checked={isVested}
                            onChange={(e) => {
                              console.log("dafdsfadsfa", e.target.checked);
                              setIsVested(e.target.checked);
                            }}
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            for="customCheck1"
                          >
                            Using Vesting Contributor?
                          </label>
                        </div>
                      </div>

                      {isVested ? (
                        <>
                          <div className="col-12 col-md-12 mb-3 mt-4">
                            <p className="input_desc_sm my-3">
                              Vesting Period Days
                            </p>
                            <div className="inputs input-groups">
                              <InputGroup className="">
                                <FormControl
                                  id="liquiditylockingdays"
                                  placeholder=""
                                  aria-describedby="basic-addon2"
                                  value={vestingPeriod}
                                  onChange={(e) => {
                                    const { value, name } = e.target;
                                    if (!numbers.test(value) && value !== "") {
                                      return false;
                                    }
                                    setVestingPeriod(e.target.value);
                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.vestingPeriod}
                              </span>
                            </div>
                          </div>

                          <div className="col-12 col-md-12 mb-3 mt-4">
                            <p className="input_desc_sm my-3">
                              Rewards % per Vesting Period
                            </p>
                            <div className="inputs input-groups">
                              <InputGroup className="">
                                <FormControl
                                  id="liquiditylockingdays"
                                  placeholder=""
                                  aria-describedby="basic-addon2"
                                  value={vestingPercentage}
                                  onChange={(e) => {
                                    const { value, name } = e.target;
                                    if (!numbers.test(value) && value !== "") {
                                      return false;
                                    }
                                    setVestingPercentage(e.target.value);
                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.vestingPercentage}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      <div className="col-12 col-md-12 text-center mt-3 d-flex align-items-center justify-content-center ">
                        <button
                          className=" grad_btn3  me-3"
                          onClick={() => setCurrentstep(1)}
                        >
                          Back
                        </button>
                        <button
                          className="grad_btn grad_btn2 "
                          onClick={() => validation(currentStep)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <div
                      id="thirdstep"
                      className={currentStep == 3 ? "d-block" : "d-none"}
                    >
                      <div className="row create_lacuh_input">
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Banner url*</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolink1"
                                placeholder="https://image.app"
                                aria-describedby="basic-addon2"
                                value={bannerurl}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // console.log(e.target.value, "setbannerurl");
                                  // let regexQuery = "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, 'i');
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false
                                  // }
                                  setbannerurl(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.bannerurl}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-0">
                          <p className="input_desc_sm my-3">Logo Image*</p>
                          <div className={`inputs input-groups  ${logoUrl == "" ? "placeholder_text" : "value_text"}`}>
                            <InputGroup className="">
                              <FormControl
                                ref={imageUploadRef}
                                id="file"
                                type="file"
                                placeholder=""
                                className="d-none"
                                aria-describedby="basic-addon2"
                                onChange={(e) => {
                                  console.log("FILESSSSSSS", e.target.files[0]);
                                  let file = e.target.files[0]
                                  const isValid = file?.name.split(".")[file?.name.split(".").length - 1];
                                  if (['png', 'jpg', 'jpeg'].includes(isValid.toLowerCase())) {
                                    setLogoUrl(e.target.files[0]);
                                  } else {
                                    showToastMessage("Select a valid file format.", 'error')
                                  }


                                }}
                              />
                              <button
                                className={`border-0 outline-0 bg-transparent px-3 w-100 d-flex justify-content-start align-items-center`}
                                onClick={handleImageUpload}
                              >
                                {logoUrl == "" ? "Choose File " : logoUrl.name}
                              </button>
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.logoUrl}
                            </span>
                          </div>
                          <div className="note_desc mt-1 mb-0">
                            <p>
                              URL must be end with a supported image extension
                              .png, .jpg,
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-0">
                          <p className="input_desc_sm my-3">Whitepaper*</p>
                          <div className={`inputs input-groups ${whitepaper == "" ? "placeholder_text" : "value_text"}`}>
                            <InputGroup className="">
                              <FormControl
                                ref={imageUploadwhitepaper}
                                id="file"
                                type="file"
                                placeholder=""
                                className="d-none"
                                aria-describedby="basic-addon2"
                                onChange={(e) => {
                                  console.log("FILESSSSSSS", e.target.files[0]);
                                  selectFileValidations(e.target.files[0]);
                                }}
                              />
                              <button
                                className="border-0 outline-0 bg-transparent px-3 w-100 d-flex justify-content-start align-items-center"
                                onClick={handleImage}
                              >
                                {whitepaper == ""
                                  ? "Choose File "
                                  : whitepaper.name}
                              </button>
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.whitepaper}
                            </span>
                          </div>
                          <div className="note_desc mt-1 mb-0">
                            <p>
                              URL must be end with a supported image extension
                              .pdf,
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Website*</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolink1"
                                placeholder="https://Spacelaunch.app"
                                aria-describedby="basic-addon2"
                                value={website}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setWebsite(e.target.value);
                                  }
                                  // setWebsite(e.target.value);
                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.website}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Facebook</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkfb"
                                placeholder="https://facebook.com"
                                aria-describedby="basic-addon2"
                                value={facebook}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setFacebook(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.facebook}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Twitter</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolink2"
                                placeholder="https://twitter.com"
                                aria-describedby="basic-addon2"
                                value={twitter}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setTwitter(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.twitter}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Github</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkgit"
                                placeholder="https://github.com"
                                aria-describedby="basic-addon2"
                                value={github}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setGithub(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.github}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Telegram</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolink3"
                                placeholder="https://telegram.com"
                                aria-describedby="basic-addon2"
                                value={telegram}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setTelegram(e.target.value);;
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.telegram}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Instagram</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkinsta"
                                placeholder="https://instagram.com"
                                aria-describedby="basic-addon2"
                                value={instagram}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setInstagram(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.instagram}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Discord</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkdiscord"
                                placeholder="https://discord.com"
                                aria-describedby="basic-addon2"
                                value={discord}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setDiscord(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.discord}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Reddit</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkreddit"
                                placeholder="https://reddit.com"
                                aria-describedby="basic-addon2"
                                value={reddit}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setReddit(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.reddit}
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 mb-0">
                          <p className="input_desc_sm my-3">Youtube Video</p>
                          <div className="inputs input-groups">
                            <InputGroup className="">
                              <FormControl
                                id="logolinkyoutube"
                                placeholder="https://youtube.com"
                                aria-describedby="basic-addon2"
                                value={youtube}
                                onChange={(e) => {
                                  // const { value, name } = e.target;
                                  // let regexQuery =
                                  //   "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
                                  // let urlRegx = new RegExp(regexQuery, "i");
                                  // if (!urlRegx.test(value) && value !== "") {
                                  //   return false;
                                  // }
                                  if (!htmlTagPattern.test(e.target.value)) {
                                    setYoutube(e.target.value);
                                  }

                                }}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.youtube}
                            </span>
                          </div>

                          <div className="note_desc mt-1 mb-0">
                            {/* <p>Input your youtube URL</p> */}
                          </div>
                        </div>

                        <div className="col-12 col-md-12 text-center mt-5 d-flex flex-wrap align-items-center justify-content-center gap-3">
                          <button
                            className="grad_btn grad_btn3 "
                            onClick={() => setCurrentstep(2)}
                          >
                            Back
                          </button>

                          <button
                            className="grad_btn grad_btn2 "
                            onClick={() => validation(currentStep)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>{" "}
                    <div
                      id="fourthstep"
                      className={currentStep == 4 ? "d-block" : "d-none"}
                    >
                      <div className="row">
                        <div className="col-12 col-md-12 mb-0">
                          <p className="input_desc_sm my-3">Description</p>
                          {/* <div className="inputs input-groups text_are_grp">
                            <InputGroup className="">
                              <textarea
                                id="description"
                                rows="3"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </InputGroup>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.description}
                            </span>
                          </div> */}
                          <div className="custom_ck_editor position-relative">
                            {/* <div className="editor_watermark">
                              powered by humb
                            </div> */}

                            <CKEditor
                              // config={{ theme: "custom" }}
                              editor={ClassicEditor}
                              // value={description}
                              data={description}

                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                              }}
                              onChange={(event, editor) => {
                                console.log(editor.getData(), "ClassicEditor");
                                // console.log(editor, "ClassicEditor");
                                setDescription(editor.getData())

                                // setDescription(editor);
                              }}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </div>
                          <span className="text-danger f-12 d-block text-left mt-2">
                            {error?.description}
                          </span>
                        </div>
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">
                            Terms and Conditions
                          </p>
                          <div className="custom_ck_editor position-relative">
                            {/* <div className="editor_watermark">
                              powered by humb
                            </div> */}

                            <CKEditor
                              editor={ClassicEditor}
                              // value={terms}
                              data={terms}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                              }}
                              onChange={(event, editor) => {
                                console.log(editor.getData(), "ClassicEditor");
                                // console.log(editor, "ClassicEditor222");
                                setTerms(editor.getData());
                                // setTerms(editor);
                              }}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </div>
                          <span className="text-danger f-12 d-block text-left mt-2">
                            {error?.terms}
                          </span>
                        </div>{" "}
                        <div className="col-12 col-md-12 mb-3">
                          <p className="input_desc_sm my-3">Choose Template</p>
                          <div className="d-flex flex-wrap align-items-center gap-3">
                            <button
                              className={`tk_tab_btn  ${currentSelectTheme === 1 ? "active" : ""
                                }`}
                              onClick={() => setCurrentSelectTheme(1)}
                            >
                              Template 1
                            </button>
                            <button
                              className={`tk_tab_btn  ${currentSelectTheme === 2 ? "active" : ""
                                }`}
                              onClick={() => setCurrentSelectTheme(2)}
                            >
                              Template 2
                            </button>{" "}
                            <button
                              className={`tk_tab_btn  ${currentSelectTheme === 3 ? "active" : ""
                                }`}
                              onClick={() => setCurrentSelectTheme(3)}
                            >
                              Template 3
                            </button>
                          </div>
                          <span className="text-danger f-12 d-block text-left mt-2">
                            {error?.currentSelectTheme}
                          </span>
                        </div>
                        <div className="col-12 col-md-12 text-center mt-5 d-flex flex-wrap align-items-center justify-content-center gap-3">
                          <button
                            className="grad_btn grad_btn3 "
                            onClick={() => setCurrentstep(3)}
                          >
                            Back
                          </button>
                          <button
                            className="grad_btn grad_btn3"
                            onClick={() => {
                              let data = {
                                description,
                                terms,
                                currentSelectTheme
                              }

                              const isValid = launchpadValidations(data, currentStep)
                              if (isValid.status) {
                                setError(isValid.error);
                                return true
                              }
                              onPerview()
                            }
                            }
                          >
                            Preview
                          </button>
                          <button
                            className="grad_btn grad_btn2 "
                            onClick={() =>
                              // setCurrentstep(5)
                              validation(currentStep)
                            }
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      id="fifthstep"
                      className={currentStep == 5 ? "d-block" : "d-none"}
                    >
                      {currentSelectTheme === 2 ? (
                        <div className="row">
                          <div className="col-12 col-md-12 mb-3">
                            <p className="green_title my-3">Content </p>
                            <p className="input_desc_sm">Title</p>
                            <div className="inputs input-groups mt-3">
                              <InputGroup className="">
                                <FormControl
                                  type=""
                                  placeholder="Title"
                                  value={contentOneTit}
                                  aria-describedby="basic-addon2"
                                  onChange={(e) => {
                                    if (!htmlTagPattern.test(e.target.value)) {
                                      setContentOneTit(e.target.value)
                                    }

                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentOneTit}
                              </span>
                            </div>
                          </div>
                          <div className="col-12 col-md-12 mb-0">
                            <div>
                              <button
                                className="grad_btn"
                                onClick={handleTemplateTwoImageUpload}
                              >
                                Click to choose file
                              </button>
                              <div className="template_image_wrapper my-4">
                                <img
                                  src={typeof contentOneImg == 'object' ? URL.createObjectURL(contentOneImg) : contentOneImg}
                                  alt="No Image"
                                  className="img_fit_container"
                                />
                              </div>
                              <input
                                type="file"
                                className="d-none"
                                ref={templateTwoUploadRef}
                                onChange={(e) => {
                                  // setTemplateTwoImage(
                                  //   URL.createObjectURL(e.target.files[0])
                                  // )
                                  setcontentOneImg(e.target.files[0])
                                }
                                }
                              />
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentOneImg}
                              </span>
                            </div>
                            <div className="custom_ck_editor position-relative">
                              {/* <div className="editor_watermark">
                              powered by humb
                            </div> */}

                              <CKEditor

                                editor={ClassicEditor}
                                // value={contentOne}
                                data={contentOne}

                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  console.log(
                                    "Editor is ready to use!",
                                    editor
                                  );
                                }}
                                onChange={(event, editor) => {
                                  console.log(editor, "ClassicEditor333");
                                  // setcontentOne(editor)


                                  setcontentOne(editor.getData())
                                }}
                                onBlur={(event, editor) => {
                                  console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                  console.log("Focus.", editor);
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.contentOne}
                            </span>
                          </div>

                          <div className="col-12 col-md-12 text-center mt-5 d-flex flex-wrap align-items-center justify-content-center gap-3">
                            <button
                              className="grad_btn grad_btn3 "
                              onClick={() => setCurrentstep(4)}
                            >
                              Back
                            </button>
                            {/* <button
                              className="grad_btn grad_btn3"
                            // onClick={() => setCurrentstep(5)}
                            >
                              Preview
                            </button> */}
                            <button
                              className="grad_btn grad_btn2 "
                              onClick={() => validation(currentStep)}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ) : currentSelectTheme === 3 ? (
                        <div className="row">
                          <div className="col-12 col-md-12 mb-0">
                            <p className="green_title my-3">Content One</p>
                            <p className="input_desc_sm">Title</p>
                            <div className="inputs input-groups mt-3">
                              <InputGroup className="">
                                <FormControl
                                  type=""
                                  placeholder="Title"
                                  aria-describedby="basic-addon2"
                                  value={contentOneTit}
                                  onChange={(e) => {
                                    if (!htmlTagPattern.test(e.target.value)) {
                                      setContentOneTit(e.target.value)
                                    }

                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentOneTit}
                              </span>
                            </div>
                            <div className="mt-4">
                              <button
                                className="grad_btn"
                                onClick={handleTemplateThreeImageUpload1}
                              >
                                Click to choose file
                              </button>
                              <div className="template_image_wrapper my-4">
                                <img
                                  src={typeof contentOneImg == 'object' ? URL.createObjectURL(contentOneImg) : contentOneImg}
                                  alt="No Image"
                                  className="img_fit_container"
                                />
                              </div>
                              <input
                                type="file"
                                className="d-none"
                                ref={templateThreeUploadRef1}
                                onChange={(e) =>
                                  setcontentOneImg(e.target.files[0])
                                }
                              />
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentOneImg}
                              </span>
                            </div>
                            <div className="custom_ck_editor position-relative">
                              {/* <div className="editor_watermark">
                          powered by humb
                        </div> */}
                              <div className="custom_joditeditor">

                                <CKEditor
                                  editor={ClassicEditor}
                                  // value={contentOne}
                                  data={contentOne}

                                  onReady={(editor) => {
                                    console.log(
                                      "Editor is ready to use!",
                                      editor
                                    );
                                  }}
                                  onChange={(event, editor) => {
                                    console.log(editor, "ClassicEditor444");
                                    setcontentOne(editor.getData())
                                    // setcontentOne(editor)

                                  }}
                                  onBlur={(event, editor) => {
                                    console.log("Blur.", editor);
                                  }}
                                  onFocus={(event, editor) => {
                                    console.log("Focus.", editor);
                                  }}
                                />
                              </div>

                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.contentOne}
                            </span>
                          </div>
                          <div className="col-12 col-md-12 mb-0 mt-5">
                            <p className="green_title my-3">Content Two</p>
                            <p className="input_desc_sm">Title</p>
                            <div className="inputs input-groups mt-3">
                              <InputGroup className="">
                                <FormControl
                                  type=""
                                  placeholder="Title"
                                  aria-describedby="basic-addon2"
                                  value={contentTwoTit}
                                  onChange={(e) => {
                                    if (!htmlTagPattern.test(e.target.value)) {
                                      setContentTwoTit(e.target.value)
                                    }

                                  }}
                                />
                              </InputGroup>
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentTwoTit}
                              </span>
                            </div>

                            <div className="mt-4">
                              <button
                                className="grad_btn"
                                onClick={handleTemplateThreeImageUpload2}
                              >
                                Click to choose file
                              </button>
                              <div className="template_image_wrapper my-4">
                                <img
                                  src={typeof contentTwoImg == 'object' ? URL.createObjectURL(contentTwoImg) : contentTwoImg}
                                  alt="No Image"
                                  className="img_fit_container"
                                />
                              </div>
                              <input
                                type="file"
                                className="d-none"
                                ref={templateThreeUploadRef2}
                                onChange={(e) =>
                                  setcontentTwoImg(e.target.files[0])
                                }
                              />
                              <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.contentTwoImg}
                              </span>
                            </div>
                            <div className="custom_ck_editor position-relative">
                              {/* <div className="editor_watermark">
                          powered by humb
                        </div> */}

                              <CKEditor
                                editor={ClassicEditor}
                                // value={contentTwo}
                                data={contentTwo}

                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  console.log(
                                    "Editor is ready to use!",
                                    editor
                                  );
                                }}
                                onChange={(event, editor) => {
                                  console.log(editor, "ClassicEditor555");
                                  // setcontentTwo(editor)

                                  setcontentTwo(editor.getData())
                                }}
                                onBlur={(event, editor) => {
                                  console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                  console.log("Focus.", editor);
                                }}
                              />
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                              {error?.contentTwo}
                            </span>
                          </div>

                          <div className="col-12 col-md-12 text-center mt-5 d-flex flex-wrap align-items-center justify-content-center gap-3">
                            <button
                              className="grad_btn grad_btn3 "
                              onClick={() => setCurrentstep(4)}
                            >
                              Back
                            </button>
                            {/* <button
                              className="grad_btn grad_btn3"
                            // onClick={() => setCurrentstep(5)}
                            >
                              Preview
                            </button> */}
                            <button
                              className="grad_btn grad_btn2 "
                              onClick={() => validation(5)}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      id="sixthstep"
                      className={currentStep == 6 ? "d-block" : "d-none"}
                    >
                      <p className="white_txt_sm d-flex justify-content-between mt-0 mb-1">
                        {/* <span className='desc_grey_txt'>Deposit Token :</span>
            <span className='desc_grey_txt font_12'>{this.state.deposit} BTC</span> */}
                      </p>

                      {/* <p className='white_txt_sm d-flex justify-content-between mt-0 mb-1'>
            <span className='desc_grey_txt'>Factory Address :</span>
            <span className='desc_grey_txt font_12'>0xf4567uyht8956 
            <i class="fa fa-files-o pl-2 copy_hover" aria-hidden="true"></i>
            </span>
            </p> */}

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Token Name :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {selectedNetword?.tokenName}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Token Symbol :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {selectedNetword?.tokenSymbol}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Token Decimals :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {selectedNetword?.tokenDecimal}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Presale Rate :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {presaleRate} {currency?.label}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Sale Method : </span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {whitelistSale == "enable" ? "Private" : "Public"}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Softcap :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {softCap} {currency?.label}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Hardcap :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {hardCap} {currency?.label}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Minimum Buy :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {minimum} {currency?.label}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Maximum Buy :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {maximum} {currency?.label}
                        </span>
                      </p>
                      {isPancake ? (
                        <>
                          <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                            <span className="desc_grey_txt">
                              Listing Rate :
                            </span>
                            <span className="desc_grey_txt opacity_90 font_12">
                              {listingPrice} {currency?.label}
                            </span>
                          </p>
                          {/* <p className="white_txt_sm d-flex justify-content-between mt-0 mb-3">
                            <span className="desc_grey_txt">Liquidity :</span>
                            <span className="desc_grey_txt font_12">1%</span>
                          </p> */}

                          {/* <p className="white_txt_sm d-flex justify-content-between mt-0 mb-3">
                            <span className="desc_grey_txt">
                              Liquidity Lockup Time :
                            </span>
                            <span className="desc_grey_txt font_12">
                              {lockingDays} days
                            </span>
                          </p> */}
                        </>
                      ) : (
                        <></>
                      )}

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">Start Time :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {isEmpty(startTime)
                            ? ""
                            : new Date(startTime).toISOString()}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt">End Time :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          {isEmpty(endTime)
                            ? ""
                            : new Date(endTime).toISOString()}
                        </span>
                      </p>

                      <p className="white_txt_sm d-flex flex-column flex-sm-row gap-2 gap-sm-4 justify-content-between mt-0 mb-3">
                        <span className="desc_grey_txt" style={{ whiteSpace: "nowrap" }}>Website :</span>
                        <span className="desc_grey_txt opacity_90 font_12">
                          <a
                            href="#"
                            target="_blank"
                            className="link_grn_new link_brk_word"
                          >
                            {website}
                          </a>
                        </span>
                      </p>

                      <div className="mb-4 mt-4">
                        <div className="card_footer_form">
                          <div className="d-flex align-items-center justify-content-center">
                            <i
                              class="fa fa-exclamation-circle text-danger-war"
                              aria-hidden="true"
                            ></i>
                            <p className="mb-0 ps-3">
                              For tokens with burns, rebase or other special
                              transfers please ensure that you have a way to
                              whitelist multiple addresses or turn off the
                              special transfer events (By setting fees to 0 for
                              example for the duration of the presale)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-12">
                        <div className="note_desc mt-1 mb-1 text-center">
                          <p>Need 1 BTC to create launchpad.</p>
                        </div>
                      </div> */}

                      <div className="col-12 col-md-12 text-center mt-4 d-flex flex-column-reverse flex-sm-row gap-3 gap-sm-0 align-items-center justify-content-center">
                        <button
                          className=" grad_btn3  me-sm-3"
                          onClick={() => {
                            if (currentSelectTheme == 1) {
                              setCurrentstep(4)
                            } else {
                              setCurrentstep(5)
                            }

                          }}
                        >
                          Back
                        </button>

                        {/* <Link to="/launchpaddetail" className="orange_small_primary " onClick={()=>{this.setState({ currentStep: 3})}}>
                           Submit
                        </Link> */}

                        <button
                          className="grad_btn grad_btn2  "
                          onClick={createLaunchpad}
                        >
                          Proceed to Sale
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* modal */}

      <CreateToken
        createTokenShow={createTokenShow}
        handleCreateTokenClose={handleCreateTokenClose}
      />
    </div>
  );
}

export default CreateLaunchpad;