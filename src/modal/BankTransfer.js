import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import ModalInput from "../components/ModalInput";

/** Config */
import config from "../config/env";
import { depositRequest } from "../actions/depositAction";
import toast from "react-hot-toast";
import isEmpty from "is-empty";

const BankTransfer = (props) => {
  const { data } = props
  const fileRef = useRef(null);
  const [chooseFile, setChooseFile] = useState("");
  const [amount, setAmount] = useState("");
  const [transcationNo, setTranscationNo] = useState("");
  const [errors, setError] = useState({});

  console.log("BankTransfer", props.data);
  const handleFileChoosen = () => {
    fileRef.current.click();
  };

  const handleBankTransferClose = () => {
    setTranscationNo(""); setAmount(""); setChooseFile(""); setError("");
    props.handleBankTransferClose();
    // props.setShowPaymentProcess(true);
  };

  const selectChange = async (e) => {
    try {
      const { files } = e.target
      var filesize = files[0].size
      let error = {}
      console.log('handleFile', files, filesize)
      let validFile = ["png", "jpeg", "jpg"];
      if (!validFile.some((val) => (files[0].type.includes(val)))) {
        error['file'] = 'Enter Valid File'
      } else if (filesize > 500000) {
        error['file'] = 'Image Size should be less than 500000 Kb'
      } else {
        error['file'] = ''
        setChooseFile(files[0])
      }
      setError(error)
    } catch (e) {
      console.log("selectChange_err", e);
    }
  }

  const deposit = async () => {
    try {
      const fromData = new FormData()
      fromData.append("transactionAmount", amount)
      fromData.append("transactionNo", transcationNo)
      fromData.append("transactionFile", chooseFile)
      fromData.append("currencyId", props?.data?.currencyId)
      const { status, error, message } = await depositRequest(fromData);
      if (status) {
        toast.success(message)
        handleBankTransferClose()
        // props.setShowPaymentProcess(true);
      } else {
        if (!isEmpty(message)) {
          toast.error(message)
        }
        setError(error)
      }
      // console.log("deposit_request", request)
    } catch (e) {
      console.log("deposit_err", e);
    }
  }

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.bankTransfer}
        onHide={handleBankTransferClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={handleBankTransferClose}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Bank Transfer</h5>
        </Modal.Header>
        <Modal.Body>
          <div
            className="
          "
          >
            <div className="d-flex flex-column align-items-start gap-3">
              <div className="row">
                <div className="col-10 col-sm-5">
                  <p className="fw-bold">Bank Name </p>
                </div>
                <div className="col-2 col-sm-1 d-none d-sm-block">
                  <p className="fw-bold ">:</p>
                </div>
                <div className="col-12 col-sm-6">
                  {/* <p>{config.adminBank.bankName}</p> */}
                  <p>{data?.bankDetails?.bankName}</p>
                </div>
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Bank Code</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  {/* <p>{config.adminBank.bankCode}</p> */}
                  <p>{data?.bankDetails?.country}</p>
                </div>{" "}

                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Holder Name</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  <p>{data?.bankDetails?.accountHolderName}</p>
                </div>{""}

                {
                  data?.value == "EUR" &&
                  <>
                    <div className="col-10 col-sm-5 mt-3">
                      <p className="fw-bold">IBAN</p>
                    </div>
                    <div className="col-1 mt-3 d-none d-sm-block">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-sm-3">
                      <p>{data?.bankDetails?.iban}</p>
                    </div>
                    <div className="col-10 col-sm-5 mt-3">
                      <p className="fw-bold">BIC</p>
                    </div>
                    <div className="col-1 mt-3 d-none d-sm-block">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-sm-3">
                      <p>{data?.bankDetails?.bic}</p>
                    </div>
                  </>
                }
                {
                  data?.value != "EUR" &&
                  <>
                    <div className="col-10 col-sm-5 mt-3">
                      <p className="fw-bold">Account Number </p>
                    </div>
                    <div className="col-1 mt-3 d-none d-sm-block">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-sm-3">
                      <p>{config.adminBank.accountNo}</p>
                      <p>{data.bankDetails?.accountNumber}</p>
                    </div>
                  </>
                }

              </div>

              {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">Transaction Number</label>
                <input
                  type="text"
                  className="cred_input mt-3"
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => { setTranscationNo(e.target.value) }}
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.transactionNo}
                </span>
              </div> */}
              {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">Transaction Amount</label>
                <input
                  type="number"
                  className="cred_input mt-3"
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => { setAmount(e.target.value) }}
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.transactionAmount}
                </span>
              </div> */}
              {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">
                  Bank transfer receipt/Proof of the transaction
                </label>
                <button
                  className="mt-3 grad_btn d-flex align-items-center justify-content-center gap-3"
                  onClick={handleFileChoosen}
                >
                  {" "}
                  <IoMdCloudUpload fill="#fff" fontSize={30} />{" "}
                  {chooseFile?.name?.slice(0, 15)}{" "}
                  {chooseFile?.name?.length > 15 ? "..." : ""}
                  {chooseFile?.name?.length > 15
                    ? chooseFile?.name?.slice(chooseFile.length - 6, chooseFile.length)
                    : "Select file"}
                </button>
                <input
                  type="file"
                  className="d-none"
                  ref={fileRef}
                  onChange={(e) => {
                    selectChange(e)
                  }}
                  name="upload"
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.file}
                </span>
              </div> */}
            </div>

            <p className="mt-3 fw-bold lnd_grad_txt " style={{ width: "fit-content" }}>Bank Address</p>
            <div className="d-flex flex-column align-items-start gap-3 mt-3">
              <div className="row">
                <div className="col-10 col-sm-5">
                  <p className="fw-bold">Line 1 </p>
                </div>
                <div className="col-2 col-sm-1 d-none d-sm-block">
                  <p className="fw-bold ">:</p>
                </div>
                <div className="col-12 col-sm-6">
                  {/* <p>{config.adminBank.bankName}</p> */}
                  <p>{data?.bankDetails?.bankAddress?.line1}</p>
                </div>

                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">City</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  {/* <p>{config.adminBank.accountNo}</p> */}
                  <p>{data?.bankDetails?.bankAddress?.city}</p>
                </div>{" "}
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Postal Code</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  {/* <p>{config.adminBank.holderName}</p> */}
                  <p>{data?.bankDetails?.bankAddress?.postalCode}</p>
                </div>
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Country</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  {/* <p>{config.adminBank.holderName}</p> */}
                  <p>{data?.bankDetails?.bankAddress?.country}</p>
                </div>


                {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">Transaction Number</label>
                <input
                  type="text"
                  className="cred_input mt-3"
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => { setTranscationNo(e.target.value) }}
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.transactionNo}
                </span>
              </div> */}
                {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">Transaction Amount</label>
                <input
                  type="number"
                  className="cred_input mt-3"
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => { setAmount(e.target.value) }}
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.transactionAmount}
                </span>
              </div> */}
                {/* <div className="d-flex flex-column w-100">
                <label className="fw-bold">
                  Bank transfer receipt/Proof of the transaction
                </label>
                <button
                  className="mt-3 grad_btn d-flex align-items-center justify-content-center gap-3"
                  onClick={handleFileChoosen}
                >
                  {" "}
                  <IoMdCloudUpload fill="#fff" fontSize={30} />{" "}
                  {chooseFile?.name?.slice(0, 15)}{" "}
                  {chooseFile?.name?.length > 15 ? "..." : ""}
                  {chooseFile?.name?.length > 15
                    ? chooseFile?.name?.slice(chooseFile.length - 6, chooseFile.length)
                    : "Select file"}
                </button>
                <input
                  type="file"
                  className="d-none"
                  ref={fileRef}
                  onChange={(e) => {
                    selectChange(e)
                  }}
                  name="upload"
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {errors?.file}
                </span>
              </div> */}
              </div>{""}
            </div>

            {/* <div>
              <button
                className="grad_btn grad_btn2 mt-5"
                onClick={deposit}
              >
                Submit
              </button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BankTransfer;
