import React, { useState, useMemo, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useSelector } from "react-redux";
import { PiBank } from "react-icons/pi";
import {
  userAddBankDetails,
  userAssets,
  userData,
  userDeleteBankDetails,
  userUpdateBankDetails,
} from "../actions/userAction";
import Swal from 'sweetalert2';
import { showToastMessage } from "../config/toast";

const BankDetails = () => {
  const { getUser, userAsset } = useSelector((state) => state.user);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const initialData = {
    bankname: "",
    accountnumber: "",
    bankcode: "",
    holdername: "",
    country: "",
    city: "",
    bankAddress: "",
    bankAccountId: "",
  };
  const [bankDetailsValue, setBankDetailsValue] = useState(initialData);
  const [isEditData, setIsEditData] = useState(false);
  const [currencyId, setCurrencyId] = useState("");
  const [error, setError] = useState({});
  const [assets, setAssets] = useState([]);
  const [showbankform, setShowbankform] = useState(false)
  const [isLoader, setIsLoader] = useState(false)

  const changeHandler = (value) => {
    console.log("sdadsfadsfadf", value);
    setBankDetailsValue((prev) => ({ ...prev, country: value }));
  };
  const handleSelectChange = (value) => {
    console.log("sdadsfadsfadf", value);
    setCurrencyId(value);
  };

  const handleBankOnchange = (e) => {
    const { name, value } = e.target;

    setBankDetailsValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankAdded = async () => {
    try {
      setIsLoader(true)
      let payload = {
        bankName: bankDetailsValue.bankname,
        accountNo: bankDetailsValue.accountnumber,
        holderName: bankDetailsValue.holdername,
        bankcode: bankDetailsValue.bankcode,
        country: bankDetailsValue.country,
        city: bankDetailsValue.city,
        bankAddress: bankDetailsValue.bankAddress,
        currencyId: currencyId.currencyId,
        currencySymbol: currencyId.currencySymbol,
      };
      const addBank = await userAddBankDetails(payload);
      console.log("addBankaddBank", addBank);
      if (addBank.status) {
        setIsLoader(false)
        userData();
        userAssets({ userId: getUser?.userId });
        setBankDetailsValue(initialData);
        setAssets([]);
        setCurrencyId("");
        setShowbankform(false)
        showToastMessage(addBank.data.message, "success");
        setError({});
      } else {
        setIsLoader(false)
        console.log("addBankaddBankaddBank", addBank);
        setError(addBank.error.errors);
      }
      console.log("addBank_data", addBank);
    } catch (e) {
      setIsLoader(false)
      console.log("userAddBankDetails_err", e);
    }
  };

  const handleEditBankDetails = (getId) => {
    setIsEditData(true);
    setShowbankform(true)
    // setEditedBankId(getId);
    const editData = getUser?.bankAccounts?.filter(
      (item) => item._id === getId
    );
    console.log("handleEditBankDetailsgetId", editData);
    setBankDetailsValue({
      bankname: editData[0].bankName,
      accountnumber: editData[0].accountNo,
      bankcode: editData[0].bankcode,
      holdername: editData[0].holderName,
      country: editData[0].country,
      city: editData[0].city,
      bankAddress: editData[0].bankAddress,
      bankAccountId: getId,
    });
    setCurrencyId({
      currencyId: editData[0].currencyId,
      currencySymbol: editData[0].currencySymbol,
    });
  };

  const handleDeleteBankAccountDetails = async (id) => {
    try {
      Swal.fire({
        title: `Are you sure you want to delete this bank account ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continue",
        confirmButtonColor: '#ff602e',
        cancelButtonColor: '#570ebe',

      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteBank = await userDeleteBankDetails({ id: id });
          if (deleteBank.status) {
            userData();
            setIsEditData(false);
            setShowbankform(false)
            showToastMessage(deleteBank.data.message, "success")
          } else {
            console.log("deleteBank", addBank);
            deleteBank.data.message && showToastMessage(deleteBank.error.message, "error");
          }
        }
      });

    } catch (e) {
      console.log("handleDeleteBankAccountDetails_err", e);
    }
  }
  const handleBankUpdate = async () => {
    try {
      let payload = {
        bankName: bankDetailsValue.bankname,
        accountNo: bankDetailsValue.accountnumber,
        holderName: bankDetailsValue.holdername,
        bankcode: bankDetailsValue.bankcode,
        country: bankDetailsValue.country,
        city: bankDetailsValue.city,
        bankAddress: bankDetailsValue.bankAddress,
        currencyId: currencyId.currencyId,
        currencySymbol: currencyId.currencySymbol,
        bankAccountId: bankDetailsValue.bankAccountId,
      };
      const updateData = await userUpdateBankDetails(payload);
      if (updateData.status) {
        userData();
        userAssets({ userId: getUser?.userId });
        setBankDetailsValue(initialData);
        setAssets([]);
        setShowbankform(false)
        setCurrencyId("");
        showToastMessage(updateData.data.message, "success");
        setError({});
        setIsEditData(false)
      } else {
        console.log("addBankaddBankaddBank", updateData);
        setError(updateData.error.errors);
      }
    } catch (e) {
      console.log("handleBankUpdate_err", e);
    }
  };


  useEffect(() => {
    if (userAsset) {
      const filter = userAsset?.assets?.filter((el) => {
        return el.type == "fiat";
      });
      setAssets(filter);
    }
  }, [userAsset]);

  return (
    <div>


      <div className="mt-5">
        <div className=" row">
          <div className="col-12 col-xl-6 mb-4">
            <div className="bankcreatecard mb-3">
              <div>
                <p className="fw-bold">Add Bank Details</p>
              </div>
              <PiBank />
              <div className="mt-3 mt-sm-0">

                <button className="red_grad_btn3" onClick={() => { setShowbankform(true); setIsEditData(false); setBankDetailsValue(initialData) }} >Add</button>
              </div>
            </div>
          </div>
          {getUser && getUser?.bankAccounts?.length ? (
            getUser?.bankAccounts.map((item, index) => (
              <div className="col-12 col-xl-6 mb-4" key={index}>
                <div className="wallet_profile">
                  {console.log("itemsss", item)}
                  <div className="row mx-auto">
                    <div className="col-10 col-sm-5">
                      <p className="fw-bold">Bank Name</p>
                    </div>
                    <div className="col-1 ">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                      <p>{item.bankName}</p>
                    </div>
                  </div>
                  <div className="row mx-auto mt-3">
                    <div className="col-10 col-sm-5">
                      <p className="fw-bold">Account Number</p>
                    </div>
                    <div className="col-1">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                      <p>{item.accountNo}</p>
                    </div>
                  </div>{" "}
                  <div className="row mx-auto mt-3">
                    <div className="col-10 col-sm-5">
                      <p className="fw-bold">IFSC Code</p>
                    </div>
                    <div className="col-1">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                      <p>{item.bankcode}</p>
                    </div>
                  </div>{" "}
                  <div className="row mx-auto mt-3">
                    <div className="col-10 col-sm-5">
                      <p className="fw-bold">Holder Name</p>
                    </div>
                    <div className="col-1">
                      <p className="fw-bold">:</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                      <p>{item.holderName}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
                    <button
                      className="edit_btn_sm"
                      onClick={() => handleEditBankDetails(item._id)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="delete_btn_sm"
                      onClick={() => handleDeleteBankAccountDetails(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !showbankform &&
            <p className="wallet_profile text-center">No Banks were added</p>
          )}
        </div>
      </div>
      {showbankform &&
        <div className="wallet_profile">
          <div className="row ">
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Select Currency</label>
              <div className="select_lg kyc_select mt-2">
                {assets && (
                  <Select
                    options={assets}
                    className="mt-2"
                    classNamePrefix="custom_rct_slt"
                    placeholder={
                      currencyId?.currencySymbol != ""
                        ? currencyId?.currencySymbol
                        : "Select Currency"
                    }
                    isSearchable={false}
                    // value={{ label:  }}
                    onChange={(e) => {
                      setError({ ...error, ...{ currencySymbol: "" } })
                      handleSelectChange(e)
                    }}
                  />
                )}
                <span className="text-danger f-12 d-block text-left mt-2">
                  {error?.currencySymbol}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Holder Name</label>
              <input
                type="text"
                name="holdername"
                value={bankDetailsValue?.holdername}
                maxLength="20"
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ holderName: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.holderName}
              </span>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Bank Name</label>
              <input
                type="text"
                name="bankname"
                maxLength="20"
                value={bankDetailsValue?.bankname}
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ bankName: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.bankName}
              </span>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Account Number</label>
              <input
                type="text"
                name="accountnumber"
                maxLength="20"
                value={bankDetailsValue?.accountnumber}
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ accountNo: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.accountNo}
              </span>
            </div>{" "}
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">IFSC Code</label>
              <input
                type="text"
                name="bankcode"
                maxLength="20"
                value={bankDetailsValue?.bankcode}
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ bankcode: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.bankcode}
              </span>
            </div>{" "}
            {/* <div className="mb-4">
          <label className="fw-bold">Bank Code</label>
          <input type="text" className="modal_input w-100 mt-2" />
        </div>{" "} */}
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Bank Country</label>
              <div className="select_lg kyc_select mt-2">
                <Select
                  className="mt-2"
                  classNamePrefix="custom_rct_slt"
                  placeholder={
                    bankDetailsValue?.country != ""
                      ? bankDetailsValue?.country
                      : "Select Country"
                  }
                  isSearchable={true}
                  options={countryOptions}
                  // value={{ label: bankDetailsValue?.country }}
                  name="country"
                  onChange={(e) => {
                    changeHandler(e.label);
                    setError({ ...error, ...{ country: "" } })
                  }}
                />
                <span className="text-danger f-12 d-block text-left mt-2">
                  {error?.country}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Bank Address</label>
              <input
                type="text"
                name="bankAddress"
                maxLength="50"
                value={bankDetailsValue?.bankAddress}
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ bankAddress: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.bankAddress}
              </span>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <label className="fw-bold">Bank City</label>
              <input
                type="text"
                name="city"
                maxLength="15"
                value={bankDetailsValue?.city}
                className="modal_input focus_with_border w-100 mt-2"
                onChange={(e) => {
                  handleBankOnchange(e);
                  setError({ ...error, ...{ city: "" } })
                }}
              />
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.city}
              </span>
            </div>

            <div className="bankformbtn">
              {isEditData ? (
                <button
                  className="grn_grd_btn mt-3"
                  onClick={() => handleBankUpdate()}
                >
                  Update
                </button>
              ) : (
                <button className="grn_grd_btn mt-3" onClick={handleBankAdded} disabled={isLoader}>
                  {isLoader ? "Loading..." : "Add"}
                </button>
              )}
            </div>
          </div>

        </div>
      }
    </div>
  );
};

export default BankDetails;
