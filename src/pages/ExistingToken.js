import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import Swal from 'sweetalert2'
// import react icons

import { LiaGreaterThanSolid } from "react-icons/lia";

// import local files

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ExistingTokenNext from "./ExistingTokenNext";
import { launchpadCurrencyList } from "../actions/launchpadAction";
import isEmpty from "is-empty";
import { tokenCreateRequestValidation } from "../validations/LaunchapadTokenValidation";
import { TokenCreateRequest } from "../actions/launchpadTokenAction";
import toast from "react-hot-toast";
import { UseTokenInfo } from "../hooks/useWeb3";
import PhoneInput from "react-phone-input-2";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { showToastMessage } from "../config/toast";


const tokenTypeOptions = [
  {
    label: "Utility Token", value: "utilitytoken"
  },
  {
    label: "Security Token", value: "securitytoken"
  }, {
    label: "Governance Token", value: "governancetoken"
  }, {
    label: "Membership Token", value: "membershiptoken"
  },
  {
    label: "Other", value: "Other"
  },
]
const entityTypes = [
  {
    label: "PVT. LTD", value: "pvt"
  },
  {
    label: "LTD", value: "ltd"
  }, {
    label: "LLC", value: "llc"
  }, {
    label: "LLP", value: "llp"
  },
  {
    label: "Other", value: "Other"
  },
]
const reissuableOption = [
  {
    label: "Yes", value: "yes"
  },
  {
    label: "No", value: "no"
  },
]

const InitialprojectInformation = {
  projectName: "",
  projectWebsite: "",
  whitepaper: "",
  description: "",
};

const InitialtokenDetails = {
  tokenName: "",
  tokenSymbol: "",
  tokenDecimal: 0,
  reissuable: "",
  tokenType: "",
  tokenTotalSupply: "",
  tokenCirculatingSupply: "",
  tokenContractAddress: "",
};

const InitialprojectTeam = {
  teamName: "",
  role: "",
  linkedInProfile: "",
  releventExperience: "",
};

const InitalcompanyLegalDetails = {
  companyName: "",
  companyEntityName: "",
  companyEntityType: "",
  countryOfRegistration: "",
  companyAddress: "",
  communicationAddress: "",
  phoneCode: "",
  phoneNumber: "",
  officialRepName: "",
  officialRepCode: '',
  officialRepno: "",
  officialRepEmail: "",
  countryCode: "us",
  officialcountryCode: "us"
};
const Initaltechnology = {
  type: "", // token // coin
  blockchainProtocol: "",
  tokenStandrad: "",
  consensusMechanism: "",
  mineable: "",
  miningAlgorihm: "",
  contractLanguage: "",
};
const Initaltokenomics = {
  intialTokenDistribution: "",
  tokenDistributionPlan: "",
  tokenReleaseSchedule: "",
};
const InitaluseCase = {
  targetType: "", // market || industry
  competitors: "",
  apartFromCompletitors: "",
};
const InitalregularCompliance = {
  tokenRegulatoryStatus: "",
  competitors: "",
};

const InitalroadmapAndMilestone = {
  developmentStage: "",
  roadMaps: "",
};

const InitalcommunityEngagement = {
  activitOfCommunity: "",
  support: "",
};
const InitalcontactInformations = {
  contactPerson: "",
  role: "",
  email: "",
  phoneNumber: "",
  phoneCode: ""
};
const InitalpartnershipAndCollaborions = {
  strategicPartnerships: "",
  regulatoryCompliance: "",
};
const InitalFormvalue = {
  // type: 'existing',
  chain: "",
  additionalInformations: "",
  securityAndAudits: "",
  networkId: "",
};
const ExistingToken = (props) => {
  const navigate = useNavigate();
  const { type } = useParams();
  const currentThemeRedux = useSelector((state) => state.theme);
  const { getUser } = useSelector((state) => state.user);
  const numbersRegex = /^\d+$/;
  const [errors, setError] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [network, setNetwork] = useState([]);
  const [formValue, setFormValue] = useState(InitalFormvalue);
  const [projectInformation, setProjectInformation] = useState(InitialprojectInformation);
  const [tokenDetails, setTokenDetails] = useState([InitialtokenDetails]);
  const [projectTeam, setProjectTeam] = useState([InitialprojectTeam]);
  const [companyLegalDetails, setCompanyLegalDetails] = useState(InitalcompanyLegalDetails);
  const [technology, setTechnology] = useState(Initaltechnology);
  const [tokenomics, setTokenomics] = useState(Initaltokenomics);
  const [useCase, setUseCase] = useState(InitaluseCase);
  const [regularCompliance, setRegularCompliance] = useState(InitalregularCompliance);
  const [roadmapAndMilestone, setRoadmapAndMilestone] = useState(InitalroadmapAndMilestone);
  const [communityEngagement, setCommunityEngagement] = useState(InitalcommunityEngagement);
  const [contactInformations, setContactInformations] = useState(InitalcontactInformations);
  const [partnershipAndCollaborions, setPartnershipAndCollaborions] = useState(InitalpartnershipAndCollaborions);
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [countryCode, setCountryCode] = useState("");
  const [currentTab, setcurrentTab] = useState(1);

  const countryOptions = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);



  useEffect(() => {
    getCurrencyies();
  }, []);

  const getCurrencyies = async () => {
    try {
      const { data, status } = await launchpadCurrencyList();
      if (status) {
        setCurrencies(data);
      }
    } catch (e) {
      console.log("getCurrencyies_err", e);
    }
  };

  const handleExistingNext = async () => {
    // navigate("/existing-token-next");
    let Formdata = {
      type:
        type == "existing-token"
          ? "existing"
          : type == "new-token"
            ? "newToken"
            : "alreadyMinted",
      projectInformation: projectInformation,
      tokenDetails: tokenDetails,
      projectTeam: projectTeam,
      companyLegalDetails: companyLegalDetails,
      technology: technology,
      tokenomics: tokenomics,
      useCase: useCase,
      regularCompliance: regularCompliance,
      roadmapAndMilestone: roadmapAndMilestone,
      communityEngagement: communityEngagement,
      contactInformations: contactInformations,
      ...formValue,
    };
    let { status, error } = await tokenCreateRequestValidation(
      Formdata,
      currentTab
    );
    setError(error);
    // console.log(isValid,'isValid')
    if (status) {
      setcurrentTab(2);
    } else if (!status) {
      showToastMessage('User missed some fields', 'error')
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ChangeProjectInformation = (e) => {
    try {
      setError({});
      // let regexQuery = "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
      // let urlRegx = new RegExp(regexQuery, "i");
      let stringQuery = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      let stringRegx = new RegExp(stringQuery, "i");
      const { name, value } = e.target;
      console.log(
        ["projectName"].includes(name) &&
        stringQuery.test(value) &&
        value !== "",
        "ChangeProjectInformation"
      );
      // if (["projectWebsite", "whitepaper"].includes(name) && !urlRegx.test(value) && value !== "") {
      //   return false;
      // }
      if (["projectName", "description"].includes(name) && stringQuery.test(value) && value !== "") {
        return false;
      }
      setProjectInformation((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeTokenDetails = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (["tokenDecimal", "tokenTotalSupply", "tokenCirculatingSupply"].includes(name) && !numbers.test(value) && value !== "") {
        return false;
      }
      console.log('ChangeTokenDetails', name, value)
      setTokenDetails((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeProjectTeam = (type, value, index) => {
    try {
      setError({});
      var heading = [...projectTeam.slice(0, index), ...[{ ...projectTeam[index], [type]: value }], ...projectTeam.slice(index + 1, projectTeam.length)];
      setProjectTeam(heading)
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeCompanyLegalDetails = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (
        ["phoneNumber", "officialRepno"].includes(name) &&
        !numbers.test(value) &&
        value !== ""
      ) {
        return false;
      }
      setCompanyLegalDetails((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeTechnology = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setTechnology((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeTokenomics = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      // intialTokenDistribution: "",
      // tokenDistributionPlan: "",
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (["intialTokenDistribution"].includes(name) && !numbers.test(value) && value !== "") {
        return false;
      }
      setTokenomics((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeUseCase = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setUseCase((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeRegularCompliance = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setRegularCompliance((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeRoadmapAndMilestone = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setRoadmapAndMilestone((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChangeCommunityEngagement = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setCommunityEngagement((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const ChnageContactInformations = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
      if (
        ["phoneNumber"].includes(name) &&
        !numbers.test(value) &&
        value !== ""
      ) {
        return false;
      }
      setContactInformations((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };
  const ChangePartnershipAndCollaborions = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setPartnershipAndCollaborions((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const handleChange = (e) => {
    try {
      setError({});
      const { name, value } = e.target;
      setFormValue((pervRecor) => {
        return { ...pervRecor, [name]: value };
      });
    } catch (err) {
      console.log(err, "ChangeProjectInformation__err");
    }
  };

  const validateCustomToken = async (token, data) => {
    try {
      let error = {
        tokenDetails: {},
      };
      /** EVM STANDRAD TOKENS */
      if (token.length == 42) {
        let getTokenData = await UseTokenInfo(data.rpc, token);
        if (getTokenData.status) {
          setTokenDetails((pervRecor) => {
            return {
              ...pervRecor,
              ['tokenContractAddress']: token,
              ["tokenName"]: getTokenData.name,
              ["tokenSymbol"]: getTokenData.symbol,
              ["tokenDecimal"]: getTokenData.decimals,
              ["tokenTotalSupply"]: getTokenData.totalSupply,
            };
          });
          setError({});
        } else {
          error.tokenDetails.tokenContractAddress =
            "* Invalid contract address";
          setError(error);
          setTokenDetails((pervRecor) => {
            return {
              ...pervRecor,
              ['tokenContractAddress']: token,
              ["tokenName"]: "",
              ["tokenSymbol"]: "",
              ["tokenDecimal"]: "",
              ["tokenTotalSupply"]: ""
            };
          });
        }
      } else {
        console.log('validateCustomToken', token)
        error.tokenDetails.tokenContractAddress =
          "* Invalid contract address";
        setError(error);
        setTokenDetails((pervRecor) => {
          return {
            ...pervRecor,
            ['tokenContractAddress']: token,
            ["tokenName"]: "",
            ["tokenSymbol"]: "",
            ["tokenDecimal"]: "",
            ["tokenTotalSupply"]: ""
          };
        });
      }
    } catch (e) {
      console.log("validateCustomToken_err", e);
    }
  };

  const handleExistingSubmit = async () => {
    let Formdata = {
      type:
        type == "existing-token"
          ? "existing"
          : type == "new-token"
            ? "newToken"
            : "alreadyMinted",
      projectInformation: projectInformation,
      tokenDetails: tokenDetails,
      projectTeam: projectTeam,
      companyLegalDetails: companyLegalDetails,
      technology: technology,
      tokenomics: tokenomics,
      useCase: useCase,
      regularCompliance: regularCompliance,
      roadmapAndMilestone: roadmapAndMilestone,
      communityEngagement: communityEngagement,
      contactInformations: contactInformations,
      partnershipAndCollaborions: partnershipAndCollaborions,
      ...formValue,
    };
    console.log(Formdata, "handleExistingSubmit");

    let { status, errors, message } = await TokenCreateRequest(Formdata, getUser.secretKey);
    if (status) {

      /** success alert */
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Congratulations!",
        text: "We have received your Request for Listing on HUMB Launchpad.Our Panel will review your Project Details & contact you soon!",
        showConfirmButton: false,
        timer: 1500
      });
      /** success alert */
      setError({});
      navigate("/request-token-types");
    } else if (!status) {
      if (!isEmpty(message)) {
        toast.error(message);
      }
      if (!isEmpty(errors)) {
        showToastMessage('User missed some fields', 'error')
        setError(errors);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  };

  return (
    <div>
      <Header props={props} />
      {
        console.log("ExistingToken_propss", formValue, currencies)

      }
      <section className="custom_section">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center justify-content-between ">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Link to="/" className="d-flex align-items-center ">
                Home Page
              </Link>
              <LiaGreaterThanSolid />
              <Link to="/launchpad">Launchpad</Link>
              <LiaGreaterThanSolid />
              <Link to="/request-token-types">Request token types</Link>
              <LiaGreaterThanSolid />
              <Link to={`/launchTokens/${type}`}>
                {type == "existing-token"
                  ? "Existing Tokens"
                  : type == "new-token"
                    ? "New Token"
                    : "Already Minted"}
              </Link>
            </div>
            <Link to="/request-token-types">Back</Link>
          </div>

          {currentTab == 1 ? (
            <div className="mt-4 launch_form_wrapper">
              <h4 className="lnd_headings">
                {type == "existing-token"
                  ? "Existing Tokens"
                  : type == "new-token"
                    ? "New Token"
                    : "Already Minted"}
              </h4>
              {type == "new-token" ? (
                <>
                  <h5 className="green_title mt-4">
                    New Tokens to be Minted :
                  </h5>
                  <p className="desc sub_desc w-75">
                    a) For the New Tokens to be Minted we need the Details about
                    the Project.
                  </p>
                  <p className="desc sub_desc w-75">
                    b) We also need to collect the Details about the Team’s Plan
                    about the Token so that wecan use the Details to mint the
                    Token.
                  </p>
                </>
              ) : type == "existing-token" ? (
                <p className="desc sub_desc w-75">
                  For the Projects that are listed on other Exchanges we need to
                  collect the Details aboutwhere they are listed and what was
                  their Trading Volume for the Last 6 Months / 1 Year.
                </p>
              ) : (
                <>
                  <h5 className="green_title mt-4">
                    New Tokens to be Minted :
                  </h5>
                  <p className=" desc sub-desc w-75">
                    a) For the New Tokens that have already been minted by the
                    Projects Tech Team, we willneed the Technical Details about
                    the Token so that we can integrate it within the Launchpad.
                  </p>
                  <p className="sub-desc w-75">
                    b) We will also need the Project Team to send the Tokens to
                    their HUMB Exchange Wallet, so that the Sale can be
                    conducted.
                  </p>
                </>
              )}{" "}
              {/* <p className="desc sub_desc w-75 mt-4">
                Data that needs to be collected through the form:
              </p> */}
              <div >
                <h5 className="green_title mt-4">Project Information :</h5>

                <div className="d-flex flex-column mt-4 ">
                  <label>Project Name : </label>
                  <input
                    type="text"
                    name="projectName"
                    value={projectInformation.projectName}
                    onChange={(e) => {
                      ChangeProjectInformation(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Project Name"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.projectInformation?.projectName}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Project Website :  </label>
                  <input
                    type="text"
                    name="projectWebsite"
                    value={projectInformation.projectWebsite}
                    onChange={(e) => {
                      ChangeProjectInformation(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Project Website"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.projectInformation?.projectWebsite}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>WhitePaper Link : </label>
                  <input
                    type="text"
                    name="whitepaper"
                    value={projectInformation.whitepaper}
                    onChange={(e) => {
                      ChangeProjectInformation(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="WhitePaper Link"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.projectInformation?.whitepaper}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Brief Description of the Project:</label>
                  <textarea
                    name="description"
                    value={projectInformation.description}
                    onChange={(e) => {
                      ChangeProjectInformation(e);
                    }}
                    className="frm_inpt frm_txtarea mt-3"
                    placeholder="Description"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.projectInformation?.description}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title mt-4">Token Details :</h5>

                <div className="d-flex flex-column mt-4 ">
                  <label>Blockchain / Network :</label>

                  {
                    console.log("Blockchain / Network :", currencies, formValue?.chain)
                  }
                  <div className="select_lg select_lg_sm select_launch_token">
                    <Select
                      options={currencies}

                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      classNamePrefix="custom_rct_slt"
                      value={
                        currencies &&
                          formValue?.chain &&
                          !isEmpty(formValue?.chain)
                          ? currencies.find(
                            (val) => val._id == formValue?.chain
                          )
                          : ""
                      }
                      placeholder={
                        currencies &&
                          formValue?.chain &&
                          !isEmpty(formValue?.chain)
                          ? currencies.find(
                            (val) => val.value == formValue?.chain
                          )
                          : ""
                      }
                      onChange={(e) => {
                        console.log(
                          e,
                          "Select currency",
                          e.networkId._id,
                          e.networkId,
                          e._id
                        );
                        setError({})
                        setNetwork(e.networkId);
                        setFormValue((pervRecor) => {
                          return {
                            ...pervRecor,
                            ["chain"]: e._id,
                            ["networkId"]: e.networkId._id,
                          };
                        });
                        console.log("validateCustomToken_checkChain", e);
                        validateCustomToken(
                          tokenDetails?.tokenContractAddress,
                          e
                        );
                      }}
                    />
                  </div>

                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.chain}
                  </span>
                </div>
                {type && type !== "new-token" && (
                  <>
                    <div className="d-flex flex-column mt-4 ">
                      <label>Token Contract Address : <span>(Contract address has to be paste)</span> </label>
                      <input
                        type="text"
                        name="tokenContractAddress"
                        value={tokenDetails.tokenContractAddress}
                        onChange={(e) => {
                          if (isEmpty(formValue.chain)) {
                            setError((pervRecor) => {
                              let tokenDetails = {}
                              tokenDetails['tokenContractAddress'] = 'Please select the currency'
                              return { ...pervRecor, ['tokenDetails']: tokenDetails }
                            })
                            return false
                          }
                          // ChangeTokenDetails(e);
                          validateCustomToken(e.target.value, network);
                        }}
                        className="frm_inpt mt-3"
                        placeholder="Token Contract Address"
                      />
                      <span className="text-danger f-12 d-block text-left mt-2">
                        {errors?.tokenDetails?.tokenContractAddress}
                      </span>
                    </div>
                  </>
                )}
                <div className="d-flex flex-column mt-4 ">
                  <label>Token Name :</label>
                  <input
                    type="text"
                    name="tokenName"
                    value={tokenDetails.tokenName}
                    onChange={(e) => {
                      ChangeTokenDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Token Name"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenDetails?.tokenName}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Token Decimal :</label>
                  <input
                    type="text"
                    name="tokenDecimal"
                    value={tokenDetails.tokenDecimal}
                    onChange={(e) => {
                      if (numbersRegex.test(e.target.value) || e.target.value == "") {
                        ChangeTokenDetails(e);
                      }

                    }}
                    className="frm_inpt mt-3"
                    placeholder="Token Decimal"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenDetails?.tokenDecimal}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Token Symbol : </label>
                  <input
                    type="text"
                    name="tokenSymbol"
                    value={tokenDetails.tokenSymbol}
                    onChange={(e) => {
                      ChangeTokenDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Token Symbol"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenDetails?.tokenSymbol}
                  </span>
                </div>
                {type && type !== "new-token" && (
                  <div className="d-flex flex-column mt-4 ">
                    <label>
                      Token Type : <span>(e.g., utility, security, governance){" "}</span>
                    </label>
                    {/* <input
                      type="text"
                      name="tokenType"
                      value={tokenDetails.tokenType}
                      onChange={(e) => {
                        ChangeTokenDetails(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Token Type"
                    /> */}
                    <div className="select_lg select_lg_sm select_launch_token">
                      <Select
                        options={tokenTypeOptions}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        value={
                          !isEmpty(tokenDetails?.tokenType)
                            ? tokenTypeOptions.find(
                              (val) => val.value == tokenDetails?.tokenType
                            )
                            : ""}
                        classNamePrefix="custom_rct_slt"
                        placeholder="Select "
                        onChange={(e) => {
                          setTokenDetails((pervRecor) => {
                            return { ...pervRecor, ['tokenType']: e.value };
                          });
                        }}
                      />
                    </div>
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.tokenDetails?.tokenType}
                    </span>
                  </div>
                )}
                <div className="d-flex flex-column mt-4 ">
                  <label>Total Token Supply :</label>
                  <input
                    type="text"
                    name="tokenTotalSupply"
                    value={tokenDetails.tokenTotalSupply}
                    onChange={(e) => {
                      ChangeTokenDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Total Token Supply"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenDetails?.tokenTotalSupply}
                  </span>
                </div>
                {type && type !== "new-token" ? (
                  <div className="d-flex flex-column mt-4 ">
                    <label>Circulating Supply :</label>
                    <input
                      type="text"
                      name="tokenCirculatingSupply"
                      value={tokenDetails.tokenCirculatingSupply}
                      onChange={(e) => {
                        ChangeTokenDetails(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Circulating Supply"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.tokenDetails?.tokenCirculatingSupply}
                    </span>
                  </div>
                ) : (
                  <div className="d-flex flex-column mt-4 ">
                    <label>Reissuable:</label>
                    {/* <input
                      type="text"
                      name="reissuable"
                      value={tokenDetails.reissuable}
                      onChange={(e) => {
                        ChangeTokenDetails(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Reissuable"
                    /> */}
                    <div className="select_lg select_lg_sm select_launch_token">
                      <Select
                        options={reissuableOption}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        classNamePrefix="custom_rct_slt"
                        placeholder="Select "
                        onChange={(e) => {
                          setTokenDetails((pervRecor) => {
                            return { ...pervRecor, ['reissuable']: e.value };
                          });
                        }}
                      />
                    </div>
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.tokenDetails?.reissuable}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="mt-5 d-flex flex-wrap align-items-center justify-content-between gap-3">

                  <h5 className="green_title ">Project Team : </h5>
                  {/* {
                    team.length <= 4 &&
                    <button className="orange_border_button" onClick={() => { setTeam(team.concat(InitialprojectTeam)) }}><FaPlus /> Add Team Member</button>
                  } */}

                </div>
                {
                  [...Array(projectTeam.length)].map((data, index) => (
                    <div className="team_layout_bg mt-4">
                      <h5 className="green_title ">Team {index + 1}</h5>
                      <div className="d-flex flex-column mt-4 ">
                        <label>Name :</label>
                        <input
                          type="text"
                          name="teamName"
                          value={projectTeam[index]?.teamName}
                          onChange={(e) => {
                            ChangeProjectTeam("teamName", e.target.value, index)
                          }}
                          className="frm_inpt mt-3"
                          placeholder="Name"
                        />
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {errors?.projectTeam?.length > 0 && errors?.projectTeam[index]?.teamName}
                        </span>
                      </div>

                      <div className="d-flex flex-column mt-4 ">
                        <label>Roles of Core Team Members :</label>
                        <input
                          type="text"
                          name="role"
                          value={projectTeam[index]?.role}
                          onChange={(e) => {
                            ChangeProjectTeam("role", e.target.value, index)
                          }}
                          className="frm_inpt mt-3"
                          placeholder="Roles of Core Team Members"
                        />
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {errors?.projectTeam?.length > 0 && errors?.projectTeam[index]?.role}
                        </span>
                      </div>
                      <div className="d-flex flex-column mt-4 ">
                        <label>LinkedIn Profile : <span>(LinkedIn profile link has to be paste)</span> </label>
                        <input
                          type="text"
                          name="linkedInProfile"
                          value={projectTeam[index]?.linkedInProfile}
                          // value={projectTeam.linkedInProfile}
                          onChange={(e) => {
                            ChangeProjectTeam("linkedInProfile", e.target.value, index)
                          }}
                          className="frm_inpt mt-3"
                          placeholder="LinkedIn Profile"
                        />
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {errors?.projectTeam?.length > 0 && errors?.projectTeam[index]?.linkedInProfile}
                        </span>
                      </div>
                      <div className="d-flex flex-column mt-4 ">
                        <label>
                          Relevant Experience in Blockchain/Cryptocurrency Industry :{" "}
                        </label>
                        <textarea
                          name="releventExperience"
                          value={projectTeam[index]?.releventExperience}
                          // value={projectTeam.releventExperience}
                          onChange={(e) => {
                            ChangeProjectTeam("releventExperience", e.target.value, index)
                          }}
                          className="frm_inpt frm_txtarea mt-3"
                          placeholder="Experience"
                        />
                        <span className="text-danger f-12 d-block text-left mt-2">
                          {errors?.projectTeam?.length > 0 && errors?.projectTeam[index]?.releventExperience}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-3 justify-content-end mt-4">
                        {
                          index != 4 &&
                          <button className="orange_border_button" onClick={() => { setProjectTeam(projectTeam.concat(InitialprojectTeam)) }}><FaPlus /> Add Team Member </button>
                        }
                        {
                          index != 0 &&
                          <button className="orange_border_button_invert" onClick={() => { setProjectTeam(projectTeam.filter((e, ind) => ind != index)) }}><FaTrash /> Delete</button>
                        }
                      </div>

                    </div>
                  ))
                }


              </div>




              <div>
                <h5 className="green_title mt-5">
                  Company / Legal Entity Details :
                </h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Company Common Name / Business Name :</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyLegalDetails.companyName}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Company Common Name / Business Name"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.companyName}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Company / Legal Entity Name :</label>
                  <input
                    type="text"
                    name="companyEntityName"
                    value={companyLegalDetails.companyEntityName}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Company / Legal Entity Name"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.companyEntityName}
                  </span>

                </div>
                {type && type !== "new-token" && (
                  <div className="d-flex flex-column mt-4 ">
                    <label>Company / Legal Entity Type :</label>
                    {/* <input
                      type="text"
                      name="companyEntityType"
                      value={companyLegalDetails.companyEntityType}
                      onChange={(e) => {
                        ChangeCompanyLegalDetails(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Company / Legal Entity Type"
                    /> */}
                    <div className="select_lg select_lg_sm select_launch_token ">
                      <Select
                        options={entityTypes}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        value={
                          !isEmpty(companyLegalDetails?.companyEntityType)
                            ? entityTypes.find(
                              (val) => val.value == companyLegalDetails?.companyEntityType
                            )
                            : ""}
                        classNamePrefix="custom_rct_slt"
                        placeholder="Select "
                        onChange={(e) => {
                          setCompanyLegalDetails((pervRecor) => {
                            return { ...pervRecor, ['companyEntityType']: e.value };
                          });
                        }}
                      />
                    </div>
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.companyLegalDetails?.companyEntityType}
                    </span>
                  </div>
                )}
                <div className="d-flex flex-column mt-4 ">
                  <label>Country of Registration : </label>
                  {/* <input
                    type="text"
                    value={companyLegalDetails.countryOfRegistration}
                    name="countryOfRegistration"
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Country of Registration"
                  /> */}
                  <div className="select_lg select_lg_sm select_launch_token">
                    <Select
                      // menuIsOpen
                      className="mt-2"
                      classNamePrefix="custom_rct_slt"
                      placeholder="Country of Registration"
                      isSearchable={true}
                      options={countryOptions}
                      value={
                        !isEmpty(companyLegalDetails?.countryOfRegistration)
                          ? countryOptions.find(
                            (val) => val.label == companyLegalDetails?.countryOfRegistration
                          )
                          : ""}
                      name="country"
                      onChange={(e) => {
                        console.log(e, 'OnChangeCountry')
                        setCompanyLegalDetails((pervRecor) => {
                          return { ...pervRecor, ['countryOfRegistration']: e.label }
                        })
                        // changeHandler(e.label);
                      }}
                    />
                  </div>
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.countryOfRegistration}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Registered Office Address : </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={companyLegalDetails.companyAddress}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Registered Office Address"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.companyAddress}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    Communication Office Address (if different than Registered
                    Office) :{" "}
                  </label>
                  <input
                    type="text"
                    name="communicationAddress"
                    value={companyLegalDetails.communicationAddress}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Communication Office Address"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.communicationAddress}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    Registered Office Phone Number (if available) :{" "}
                  </label>
                  {/* <input
                    type="text"
                    name="phoneNumber"
                    value={companyLegalDetails.phoneNumber}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Registered Office Phone Number"
                  /> */}
                  {console.log("companyLegalDetails.countyCode", companyLegalDetails.officialcountryCode, 'companyLegalDetails.phoneCode', companyLegalDetails.phoneCode)}
                  <div className="custom_phone_input phone_input_sm  mt-3">
                    <PhoneInput
                      placeholder="Enter Phone Number"
                      country={companyLegalDetails.countryCode}
                      countryCodeEditable={false}
                      onChange={(value, event) => {
                        const { dialCode, countryCode } = event;
                        console.log(dialCode.length, value.length, "companyLegalDetails.countryCode")
                        if (value.length < dialCode.length) {
                          return false
                        }

                        let newPhoneNo = value
                        console.log("PHONE INPUTS", value, event, countryCode);
                        // setMobileNumber(value);
                        // setCountryCode(event.dialCode);
                        setCompanyLegalDetails((pervRecor) => {
                          return { ...pervRecor, ['phoneCode']: dialCode, ['phoneNumber']: newPhoneNo.slice(dialCode.length), ['countryCode']: countryCode }
                        })
                      }}
                      value={companyLegalDetails.phoneCode + companyLegalDetails.phoneNumber}
                    />
                  </div>

                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.phoneNumber}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>Official Representative Name : </label>
                  <input
                    type="text"
                    name="officialRepName"
                    value={companyLegalDetails.officialRepName}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Official Representative Name"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.officialRepName}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Official Representative Phone Number : </label>
                  {/* <input
                    type="text"
                    name="officialRepno"
                    value={companyLegalDetails.officialRepno}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Official Representative Phone Number"
                  /> */}
                  <div className="custom_phone_input phone_input_sm mt-3">
                    <PhoneInput
                      placeholder="Enter Phone Number"
                      country={companyLegalDetails.officialcountryCode}
                      countryCodeEditable={false}
                      onChange={(value, event) => {
                        const { dialCode, countryCode } = event;
                        let newPhoneNo = value
                        console.log("PHONE INPUTS", value, event);
                        // setMobileNumber(value);
                        // setCountryCode(event.dialCode);
                        setCompanyLegalDetails((pervRecor) => {
                          return {
                            ...pervRecor, ['officialRepCode']: dialCode, ['officialRepno']: newPhoneNo.slice(dialCode.length),
                            ['officialcountryCode']: countryCode
                          }
                        })
                      }}
                      value={companyLegalDetails.officialRepCode + companyLegalDetails.officialRepno}
                    />
                  </div>
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.officialRepno}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>Official Representative Email :</label>
                  <input
                    type="text"
                    name="officialRepEmail"
                    value={companyLegalDetails.officialRepEmail}
                    onChange={(e) => {
                      ChangeCompanyLegalDetails(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Official Representative Email"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.companyLegalDetails?.officialRepEmail}
                  </span>
                </div>
              </div>
              <div className="my-5 d-flex justify-content-center">
                <button className="grn_grd_btn" onClick={handleExistingNext}>
                  {" "}
                  Next
                </button>
              </div>
            </div>
          ) : currentTab == 2 ? (
            <div className="mt-4 launch_form_wrapper">
              <h4 className="lnd_headings"> {type == "existing-token"
                ? "Existing Tokens"
                : type == "new-token"
                  ? "New Token"
                  : "Already Minted"}</h4>
              <p className="desc sub_desc w-75">
                For the Projects that are listed on other Exchanges we need to
                collect the Details aboutwhere they are listed and what was
                their Trading Volume for the Last 6 Months / 1 Year.
              </p>{" "}
              {/* <p className="desc sub_desc w-75 mt-4">
                Data that needs to be collected through the form:
              </p> */}
              {type && type !== "new-token" && (
                <div>
                  <h5 className="green_title mt-4">Technology :</h5>
                  <div className="d-flex flex-column mt-4 ">
                    <label>Token or Coin ? : </label>
                    <input
                      type="text"
                      name="type"
                      value={technology.type}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Token or Coin"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.type}
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-4 ">
                    <label>
                      Blockchain Protocol/Platform Used (if Token) :
                    </label>
                    <input
                      type="text"
                      value={technology.blockchainProtocol}
                      name="blockchainProtocol"
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Blockchain Protocol/Platform"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.blockchainProtocol}
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-4 ">
                    <label>Token Standard Used (if Token) : </label>
                    <input
                      type="text"
                      name="tokenStandrad"
                      value={technology.tokenStandrad}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Token Standard Used (if Token) :"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.tokenStandrad}
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-4 ">
                    <label>Consensus Mechanism (if Coin ):</label>
                    <input
                      type="text"
                      name="consensusMechanism"
                      value={technology.consensusMechanism}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Consensus Mechanism (if Coin)"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.consensusMechanism}
                    </span>
                  </div>{" "}
                  <div className="d-flex flex-column mt-4 ">
                    <label>Mineable? (if Coin) : </label>
                    <input
                      type="text"
                      name="mineable"
                      value={technology.mineable}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Mineable? (if Coin)"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.mineable}
                    </span>
                  </div>{" "}
                  <div className="d-flex flex-column mt-4 ">
                    <label>
                      If Mineable & Consensus Mechanism is Proof of Work then
                      which Mining Algorithm?:{" "}
                    </label>
                    <input
                      type="text"
                      name="miningAlgorihm"
                      value={technology.miningAlgorihm}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="If Mineable & Consensus Mechanism is Proof of Work then which Mining Algorithm"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.miningAlgorihm}
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-4 ">
                    <label>
                      Smart Contract Language/Framework (if applicable) :
                    </label>
                    <input
                      name="contractLanguage"
                      value={technology.contractLanguage}
                      onChange={(e) => {
                        ChangeTechnology(e);
                      }}
                      type="text"
                      className="frm_inpt mt-3"
                      placeholder="Smart Contract Language/Framework (if applicable)"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.technology?.contractLanguage}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-5">
                <h5 className="green_title mt-4">Tokenomics :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Initial Token Distribution :</label>
                  <input
                    type="text"
                    name="intialTokenDistribution"
                    value={tokenomics.intialTokenDistribution}
                    onChange={(e) => {
                      ChangeTokenomics(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Initial Token Distribution"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenomics?.intialTokenDistribution}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Token Distribution Plan : </label>
                  <input
                    type="text"
                    value={tokenomics.tokenDistributionPlan}
                    name="tokenDistributionPlan"
                    onChange={(e) => {
                      ChangeTokenomics(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Token Distribution Plan"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenomics?.tokenDistributionPlan}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Token Release Schedule (if applicable) :</label>
                  <input
                    type="text"
                    value={tokenomics.tokenReleaseSchedule}
                    name="tokenReleaseSchedule"
                    onChange={(e) => {
                      ChangeTokenomics(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Token Release Schedule (if applicable)"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.tokenomics?.tokenReleaseSchedule}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title">Use Case & Utility :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Target Market/Industry :</label>
                  <input
                    type="text"
                    value={useCase.targetType}
                    name="targetType"
                    onChange={(e) => {
                      ChangeUseCase(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Target Market/Industry"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.useCase?.targetType}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Competitors (if any ) :</label>
                  <input
                    type="text"
                    value={useCase.competitors}
                    name="competitors"
                    onChange={(e) => {
                      ChangeUseCase(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Competitors (if any )"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.useCase?.competitors}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    What sets your project apart from competitors? :
                  </label>
                  <input
                    type="text"
                    name="apartFromCompletitors"
                    value={useCase.apartFromCompletitors}
                    onChange={(e) => {
                      ChangeUseCase(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="What sets your project apart from competitors"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.useCase?.apartFromCompletitors}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title">Regulatory Compliance :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    Have legal opinions been obtained regarding the token's
                    regulatory status? :
                  </label>
                  <input
                    type="text"
                    name="tokenRegulatoryStatus"
                    value={regularCompliance.tokenRegulatoryStatus}
                    onChange={(e) => {
                      ChangeRegularCompliance(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Have legal opinions been obtained regarding the token's regulatory status"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.regularCompliance?.tokenRegulatoryStatus}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Any regulatory compliance measures taken? :</label>
                  <input
                    type="text"
                    name="competitors"
                    value={regularCompliance.competitors}
                    onChange={(e) => {
                      ChangeRegularCompliance(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Any regulatory compliance measures taken"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.regularCompliance?.competitors}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title">Partnerships & Collaborations :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    List any strategic partnerships or collaborations (if
                    applicable) :
                  </label>
                  <input
                    type="text"
                    name="strategicPartnerships"
                    value={partnershipAndCollaborions.strategicPartnerships}
                    onChange={(e) => {
                      ChangePartnershipAndCollaborions(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="List any strategic partnerships or collaborations (if applicable)"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.partnershipAndCollaborions?.strategicPartnerships}
                  </span>
                </div>
                {type && type == "new-token" && (
                  <div className="d-flex flex-column mt-4 ">
                    <label>Any regulatory compliance measures taken? :</label>
                    <input
                      type="text"
                      name="regulatoryCompliance"
                      value={partnershipAndCollaborions.regulatoryCompliance}
                      className="frm_inpt mt-3"
                      placeholder="Any regulatory compliance measures taken"
                      onChange={(e) => {
                        ChangePartnershipAndCollaborions(e);
                      }}
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.partnershipAndCollaborions?.regulatoryCompliance}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h5 className="green_title">Roadmap & Milestones :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Current Development Stage :</label>
                  <input
                    type="text"
                    name="developmentStage"
                    value={roadmapAndMilestone.developmentStage}
                    onChange={(e) => {
                      ChangeRoadmapAndMilestone(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Current Development Stage"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.roadmapAndMilestone?.developmentStage}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Roadmap for the next 6-12 months :</label>
                  <input
                    type="text"
                    name="roadMaps"
                    value={roadmapAndMilestone.roadMaps}
                    onChange={(e) => {
                      ChangeRoadmapAndMilestone(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Roadmap for the next 6-12 months"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.roadmapAndMilestone?.roadMaps}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title ">Community Engagement :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Size & Activity of Community :</label>
                  <input
                    type="text"
                    name="activitOfCommunity"
                    value={communityEngagement.activitOfCommunity}
                    onChange={(e) => {
                      ChangeCommunityEngagement(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Size & Activity of Community"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.communityEngagement?.activitOfCommunity}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Community Support/Engagement Strategy :</label>
                  <input
                    type="text"
                    name="support"
                    value={communityEngagement.support}
                    onChange={(e) => {
                      ChangeCommunityEngagement(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Community Support/Engagement Strategy"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.communityEngagement?.support}
                  </span>
                </div>
              </div>
              {type && type != "new-token" && (
                <div className="mt-5">
                  <h5 className="green_title ">Security & Audits :</h5>
                  <div className="d-flex flex-column mt-4 ">
                    <label>
                      Has the project undergone any security audits? If yes,
                      please provide details :
                    </label>
                    <input
                      type="text"
                      name="securityAndAudits"
                      value={formValue.securityAndAudits}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="frm_inpt mt-3"
                      placeholder="Has the project undergone any security audits? If yes, please provide details"
                    />
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {errors?.securityAndAudits}
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-5">
                <h5 className="green_title ">Additional Information :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>
                    Any other relevant information you'd like to share :
                  </label>
                  <input
                    type="text"
                    value={formValue.additionalInformations}
                    name="additionalInformations"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Any other relevant information you'd like to share"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.additionalInformations}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <h5 className="green_title ">Contact Information :</h5>
                <div className="d-flex flex-column mt-4 ">
                  <label>Name of Contact Person :</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={contactInformations.contactPerson}
                    onChange={(e) => {
                      ChnageContactInformations(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Name of Contact Person"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.contactInformations?.contactPerson}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Role :</label>
                  <input
                    type="text"
                    name="role"
                    value={contactInformations.role}
                    onChange={(e) => {
                      ChnageContactInformations(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Role :"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.contactInformations?.role}
                  </span>
                </div>{" "}
                <div className="d-flex flex-column mt-4 ">
                  <label>Email :</label>
                  <input
                    type="text"
                    name="email"
                    value={contactInformations.email}
                    onChange={(e) => {
                      ChnageContactInformations(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Email"
                  />
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.contactInformations?.email}
                  </span>
                </div>
                <div className="d-flex flex-column mt-4 ">
                  <label>Phone Number :</label>
                  {/* <input
                    type="text"
                    name="phoneNumber"
                    value={contactInformations.phoneNumber}
                    onChange={(e) => {
                      ChnageContactInformations(e);
                    }}
                    className="frm_inpt mt-3"
                    placeholder="Phone Number"
                  /> */}
                  <div className="custom_phone_input phone_input_sm mt-3">
                    <PhoneInput
                      placeholder="Enter Phone Number"
                      country={"us"}
                      countryCodeEditable={false}
                      onChange={(value, event) => {
                        const { dialCode } = event;
                        let newPhoneNo = value
                        console.log("PHONE INPUTS", value, event);
                        // setMobileNumber(value);
                        // setCountryCode(event.dialCode);
                        setContactInformations((pervRecor) => {
                          return { ...pervRecor, ['phoneNumber']: newPhoneNo.slice(dialCode.length), ['phoneCode']: dialCode }
                        })
                      }}
                      value={contactInformations.phoneCode + contactInformations.phoneNumber}
                    />
                  </div>
                  <span className="text-danger f-12 d-block text-left mt-2">
                    {errors?.contactInformations?.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="my-5 d-flex justify-content-center">
                <button
                  className="grn_grd_btn me-3"
                  onClick={() => {
                    setcurrentTab(1);
                    setFormValue((pervRecor) => {
                      return {
                        ...pervRecor,
                        ["chain"]: formValue.chain,
                        ["networkId"]: formValue.networkId,
                      };
                    })
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }}
                >
                  {" "}
                  Back
                </button>
                <button className="grn_grd_btn" onClick={handleExistingSubmit}>
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExistingToken;
