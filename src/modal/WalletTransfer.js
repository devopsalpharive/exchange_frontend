import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import Lottie from "lottie-react";
import paymentProcess from "../asset/json/paymentprocess.json";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

/** Actions */
import { userWalletTransfer } from "../actions/userAction";
import { showToastMessage } from "../config/toast";
import { FaArrowDown } from "react-icons/fa";
import isEmpty from "is-empty";

const WalletEnum = {
  'main': 'balance',
  'spot': 'spotBalance',
  'margin': 'marginBalance',
  'derivative': 'derivativeBalance',
  'futures': 'futuresBalance'
}

const WalletTransfer = (props) => {
  const numbers = /^-?(?:\d+(\.\d*)?|\.\d+)$/;
  const { show, handleClose, data } = props;
  const { getUser } = useSelector((state) => state.user);

  const [transferTo, setTransferTo] = useState({ value: "spot", label: "Spot" })
  const [transferFrom, setTransferFrom] = useState({ value: "main", label: "Main" })
  const initialData = [
    { value: "main", label: "Main" },
    { value: "spot", label: "Spot" },
    { value: "margin", label: "Margin" },
    // { value: "derivative", label: "Derivative" },
    // { value: "futures", label: "Futures" },
  ]
  const [amount, setAmount] = useState(0)
  const [walletOne, setWalletOne] = useState(initialData);
  const [walletTwo, setWalletTwo] = useState([
    { value: "spot", label: "Spot" },
    { value: "margin", label: "Margin" }
  ]);
  const [error, setError] = useState({});

  const walletTransfer = async () => {
    try {
      let errors = {}
      if (isEmpty(amount) || amount == 0) {
        errors.amount = "* Amount is required"
      } if (isEmpty(transferTo?.value)) {
        errors.transferTo = "* Transfer To is required"
      } if (isEmpty(transferFrom?.value)) {
        errors.transferFrom = "* Transfer From is required"
      }
      setError(errors)
      if (Object.keys(errors).length > 0) {
        return false
      }
      let payload = {
        userId: getUser.userId,
        symbol: data.currencySymbol,
        transferFrom: transferFrom?.value,
        transferTo: transferTo?.value,
        amount: amount
      }
      console.log("WalletTransfer_data", payload)
      Swal.fire({
        title: `Are you Sure you want to move ${amount} ${data?.currencyName} from ${transferFrom?.label} to ${transferTo?.label} Account`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continue",
        confirmButtonColor: '#ff602e',
        cancelButtonColor: '#570ebe',

      }).then(async (result) => {

        if (result.isConfirmed) {
          const transfer = await userWalletTransfer(payload, getUser.secretKey);
          if (transfer.status) {
            closeModal()
            setAmount(0)
            showToastMessage(transfer.message, 'success')
          } else {
            console.log("errorerror", transfer.errors);
            setError(transfer.errors)
            transfer?.message && showToastMessage(transfer.message, 'error')
          }
        } else if (result.isDenied) {

        }
      });

    } catch (e) {
      console.log("walletTransfer_err", e);
    }
  }

  const onChangeSelect = async (data) => {
    try {
      const fiterData = initialData.filter((e) => e.label != data.label)
      console.log("fiterData", fiterData)
      setWalletTwo(fiterData)
      setTransferFrom(data)
      setTransferTo(fiterData[0])
    } catch (e) {
      console.log("onChangeSelect_err", e);
    }
  }

  const onChangeSelectTo = async (data) => {
    try {
      const fiterData = initialData.filter((e) => e.label != data.label)
      console.log("onChangeSelectTo_fiterData", fiterData)
      setWalletOne(fiterData)
      setTransferTo(data)
      if (data.value == transferFrom.value) {
        setTransferFrom(fiterData[0])
      }
    } catch (e) {
      console.log("onChangeSelect_err", e);
    }
  }

  const closeModal = () => {
    setWalletOne(initialData);
    setWalletTwo(initialData);
    setTransferTo({ value: "spot", label: "Spot" });
    setTransferFrom({ value: "main", label: "Main" });
    setAmount(0);
    setError({});
    props.handleClose()
  }

  console.log(data, "data?.currencyName")

  useEffect(() => {
    if (!isEmpty(data)) {
      setAmount(data?.balance)
    }
  }, [data])

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(transferFrom)) {
      setAmount(data[WalletEnum[`${transferFrom?.value}`]])
    }
  }, [transferFrom])

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={show}
        // show={true}
        onHide={closeModal}
        className="custom_modal tranfer_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={closeModal}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Wallet Transfer ({data?.currencyName})</h5>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="asset_checkbox d-flex align-items-center justify-content-end gap-2">
            <div style={{ marginBottom: "2px" }}>
              <label class="checkbox_container">
                <input type="checkbox"
                />
                <span class="checkbox_checkmark"></span>
              </label>
            </div>

            <p className="asset_checkbox_p">
              All
            </p>
          </div> */}
          <div className="d-flex flex-column align-items-center">

            <div className="w-100 d-flex flex-column">
              <p className="orange_p text-end"> Balance : <span className="orange_p">{data[WalletEnum[`${transferFrom?.value}`]]}</span></p>
              <label className="mt-2">
                Transfer Amount<span className="text-danger"> *</span>
              </label>
              <div className="d-flex align-items-end gap-3">
                <input type="text" className="modal_input mt-2 w-100" value={amount} min={0} onChange={(e) => {
                  if (numbers.test(e.target.value) || e.target.value == "") {
                    if (e.target.value == "") {
                      setError({ ...error, ...{ amount: "Amount is required" } })
                    } else {
                      setError({ ...error, ...{ amount: "" } })
                    }
                    setAmount(e.target.value)
                  }
                }} />
                <button className="grn_grd_btn text-decoration-none" onClick={() => { setAmount(data[WalletEnum[`${transferFrom?.value}`]]) }}>Max</button>
              </div>

              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.amount}
              </span>
            </div>
            <div className="mt-3 w-100">
              <label>From</label>
              <Select
                options={walletOne}
                className="mt-2"
                classNamePrefix="custom_rct_slt"
                value={transferFrom}
                onChange={(e) => {
                  setError({ ...error, ...{ transferFrom: "" } })
                  onChangeSelect(e);
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.transferFrom}
              </span>
            </div>{" "}
            <div className="transfericonsec mt-5 mb-2">
              <FaArrowDown fill="#fff" />
            </div>

            <div className="mt-3 w-100">
              <label>To</label>
              <Select
                options={walletTwo}
                className="mt-2"
                classNamePrefix="custom_rct_slt"
                value={transferTo}
                onChange={(e) => {
                  setError({ ...error, ...{ transferTo: "" } })
                  onChangeSelectTo(e);
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.transferTo}
              </span>
            </div>
            <div className="mt-4">
              <button className="grad_btn grad_btn2 mt-4" onClick={() => { walletTransfer() }}>
                Transfer
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WalletTransfer;
