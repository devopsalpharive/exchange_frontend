import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";

/** Hooks */
import { UseTokenInfo } from "../hooks/useWeb3";
import { launchpadCurrencyList, launchpadRequestToken } from "../actions/launchpadAction";

/** Config */
import { showToastMessage } from "../config/toast";
import isEmpty from "is-empty";

const CreateToken = (props) => {

  const [tokenDetails, setTokenDetails] = useState("")
  const [error, setError] = useState({});
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState("BUSD");
  const [contractAddress, setContractAddress] = useState("");
  const [whitePaperText, setWhitePaperText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const whitePaperRef = useState(null);




  const validateCustomToken = async (e, data) => {
    try {
      /** EVM STANDRAD TOKENS */
      if (e.length == 42) {
        let getTokenData = await UseTokenInfo(data.rpc, e)
        if (getTokenData.status) {
          setTokenDetails(getTokenData);
          setError("")
        } else { setError({ tokenContractAddress: "* Invalid contract address" }); setTokenDetails({ name: "", symbol: "", decimals: "", contractAddress: "" }); }
      } else {
        setTokenDetails({ name: "", symbol: "", decimals: "" })
      }
    } catch (e) {
      console.log("validateCustomToken_err", e);
    }
  }

  const getCurrencyies = async () => {
    try {
      const { data, status } = await launchpadCurrencyList();
      if (status) {
        setCurrencies(data); setCurrency(data[0]); setSelectedNetwork(data[0])
      }
    } catch (e) {
      console.log("getCurrencyies_err", e);
    }
  }

  const requestToken = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("tokenContractAddress", contractAddress)
      formData.append("currency", selectedNetwork._id)
      formData.append("tokenName", !isEmpty(tokenDetails?.name) ? tokenDetails?.name : "")
      formData.append("tokenSymbol", !isEmpty(tokenDetails?.symbol) ? tokenDetails?.symbol : "")
      formData.append("tokenDecimal", !isEmpty(tokenDetails?.decimals) ? tokenDetails?.decimals : "")
      formData.append("whitepaper", whitePaperText)

      const request = await launchpadRequestToken(formData);
      if (request.status) {
        showToastMessage(request.data.message, 'success');
        setContractAddress(""); setTokenDetails("");
        setIsLoading(false)
        props.handleClose()
      } else {
        setError(request.error.error); setIsLoading(false);
        request.error.message && showToastMessage(request.error.message, 'error');
      }
      console.log("requestToken", request);
    } catch (e) {
      console.log("requestToken_err", e);
    }
  }


  const handleWhitepaperRef = () => {
    whitePaperRef.current.click()
  }
  const selectFileValidations = (file) => {
    try {
      const isValid = file.name.split(".")[file.name.split(".").length - 1]
      console.log("isValid", file.name.split("."), file.name.split(".")[file.name.split(".").length - 1]);
      if (isValid == 'pdf' || isValid.toUpperCase() == "PDF") {
        setWhitePaperText(file)
      } else {
        showToastMessage("Select PDF file formate", 'error')
      }
    } catch (e) {
      console.log("selectFileValidations_err", e);
    }
  }

  useEffect(() => {
    getCurrencyies()
  }, []);

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.show}
        onHide={props.handleClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => {
            setContractAddress(""); setTokenDetails(""); setError(""); setWhitePaperText(""); setIsLoading(false)
            props.handleClose()
          }}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Request a Token</h5>
        </Modal.Header>
        <Modal.Body>
          <div
            className="
          "
          >
            <div>
              <label>
                Currency<span className="text-danger">*</span>
              </label>
              {
                currencies.length > 0 ?
                  <Select
                    options={currencies}
                    className="mt-2"
                    classNamePrefix="custom_rct_slt"
                    placeholder={selectedNetwork?.label}
                    onChange={(e) => { setSelectedNetwork(e); validateCustomToken(contractAddress, e) }}
                  />
                  : "No currencies found"
              }

            </div>
            <div className="mt-3 d-flex flex-column">
              <label>
                ContractAddress<span className="text-danger">*</span>
              </label>
              <ModalInput placeholder="Enter contract address" type="text" value={contractAddress}
                onChange={(e) => { setContractAddress(e.target.value); validateCustomToken(e.target.value, currency) }} />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.tokenContractAddress}
              </span>
            </div>

            <div className="mt-3 d-flex flex-column">
              <label>
                Name<span className="text-danger">*</span>
              </label>
              <ModalInput placeholder="Enter token name" type="text" value={tokenDetails?.name} />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.tokenName}
              </span>
            </div>
            <div className="mt-3 d-flex flex-column">
              <label>
                Symbol<span className="text-danger">*</span>
              </label>
              <ModalInput placeholder="Enter token symbol" type="text" value={tokenDetails?.symbol} />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.tokenSymbol}
              </span>
            </div>
            <div className="mt-3 d-flex flex-column">
              <label>
                Decimals<span className="text-danger">*</span>
              </label>
              <ModalInput placeholder="Enter token decimals" type="text" value={tokenDetails?.decimals} />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.tokenDecimal}
              </span>
            </div>
            <div className="mt-3 d-flex flex-column">
              <label>
                White Paper<span className="text-danger">*</span>
              </label>
              <button className="modal_input w-100 mt-2 text-start" onClick={handleWhitepaperRef}>
                {whitePaperText == "" ? "Select file" : whitePaperText.name}
              </button>
              <input type="file" className="d-none" pattern=".+\.pdf$" ref={whitePaperRef} onChange={(e) => { selectFileValidations(e.target.files[0]) }} />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.whitepaper}
              </span>
            </div>

            {/* <div className="d-flex align-items-center gap-2 mt-4">
              <label class="custom_chechbox">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>

              <p>Implement Humb System?</p>
            </div> */}

            <div>
              {
                isLoading ?
                  <button className="grad_btn grad_btn2 mt-4" onClick={requestToken}>
                    Loading...
                  </button> :
                  <button
                    className="grad_btn grad_btn2 mt-4"
                    onClick={requestToken}
                  >
                    Submit
                  </button>
              }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateToken;
