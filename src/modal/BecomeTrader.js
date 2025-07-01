import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import Select from 'react-select'
import { Images } from "../data/Images";
import isEmpty from "is-empty";
import { requestTrader } from "../actions/copyTradeAction";
import { showToastMessage } from "../config/toast";
import fileObjectUrl from "../lib/fileObjectUrl";
import { FaPen } from "react-icons/fa6";



const BecomeTrader = (props) => {

    const initialValue = {
        name: "",
        tradePairs: [],
        description: "",
        showHistory: "",
        minInvest: "",
        minInvestPercen: "",
        profileImage: ''
    }
    const { getUser } = useSelector((state) => state.user);
    const { pairList } = useSelector((state) => state.pairList);
    const [pairs, setPairs] = useState([])
    const [error, setError] = useState({})
    const [formValue, setFormValue] = useState(initialValue)
    const [isLoading, setIsLoading] = useState(false)


    const [uploadedImage, setUploadedImage] = useState(null)
    const [isImageUpdated, setIsImageUpdated] = useState(false)
    const imageUploadRef = useRef(null);

    const handleCancelUploadedImage = () => {
        setIsImageUpdated(false)
        setUploadedImage(Images.uploadFile)
    }

    const handleUploadImage = () => {
        imageUploadRef.current.click();
    };

    const validateinputs = async () => {
        let error = {}
        if (isEmpty(formValue.name)) {
            error.name = "Name field is required"
        } if (isEmpty(formValue.tradePairs)) {
            error.tradePairs = "TradePairs field is required"
        } if (isEmpty(formValue.description)) {
            error.description = "Description field is required"
        } if (isEmpty(formValue.showHistory)) {
            error.showHistory = "ShowHistory field is required"
        } if (isEmpty(formValue.minInvest)) {
            error.minInvest = "Minimum invest field is required"
        }
        if (isEmpty(formValue.minInvestPercen)) {
            error.minInvest = "Minimum invest percentage field is required"
        }


        console.log("validateinputs", error);
        if (Object.keys(error).length > 0) {
            setError(error)
            return false
        }
        return true
    }
    const handleOnchange = (event) => {
        var inputRegex = /^[0-9A-Za-z\-\/\s]+$/;
        let numbersRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

        const { value, name } = event.target
        if (["name", "description"].includes(name) && !inputRegex.test(value) && value !== "") {
            return false
        } if (["minInvest"].includes(name) && !numbersRegex.test(value) && value !== "") {
            return false
        }
        setFormValue({ ...formValue, ...{ [name]: value } })
    }

    const becameATrader = async () => {
        try {
            setIsLoading(true)
            const isValid = await validateinputs();
            console.log("becameATraderbecameATrader", isValid);
            if (isValid) {
                let formaData = new FormData()
                formaData.append('name', formValue.name)
                for (let i = 0; i < formValue.tradePairs.length; i++) {
                    formaData.append('tradePairs', JSON.stringify(formValue.tradePairs[i]))
                }
                formaData.append('description', formValue.description)
                formaData.append('showHistory', formValue.showHistory)
                formaData.append('minInvest', formValue.minInvest)
                formaData.append('minInvestPercen', formValue.minInvestPercen)
                formaData.append('profileImage', formValue.profileImage)
                const { status, message, data, errors } = await requestTrader(formaData);
                setIsLoading(false)
                if (status) {
                    setFormValue(initialValue)
                    showToastMessage(message, 'success')
                    props.handleClose()
                } else {
                    setError(errors)
                    !isEmpty(message) && showToastMessage(message, 'error')
                }
            }
            setIsLoading(false)
        } catch (e) {
            console.log("becameATrader_err", e);
        }
    }

    useEffect(() => {
        if (!isEmpty(pairList)) {
            const getPairList = pairList.map((val) => {
                return {
                    label: val.tikerRoot,
                    value: val._id
                }
            })
            setPairs(getPairList)
        }
    }, [pairList])

    // console.log("pairList_data", formValue);
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={props.show}
                // show={true}
                onHide={() => { setFormValue(initialValue); props.handleClose() }}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={() => { setFormValue(initialValue); props.handleClose() }}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h4 className="mb-0 modal_title">Become a Master Trader</h4>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <p className="text_gray_sm">First Name</p>
                                <input type="text" maxLength="20" className="modal_input w-100 mt-2" value={firstName} onChange={(e) => {
                                    if (alfaRegex.test(e.target.value) || e.target.value == '') {
                                        setFirstName(e.target.value)
                                    }
                                }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.firstName}
                            </span>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className="text_gray_sm">Last Name</p>
                                <input type="text" maxLength="20" className="modal_input w-100 mt-2" value={lastName} onChange={(e) => {
                                    if (alfaRegex.test(e.target.value) || e.target.value == '') {
                                        setLastName(e.target.value)
                                    }
                                }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.lastName}
                            </span>
                        </div>
                        <div className="mt-4">
                            <button className="grad_btn2 grad_btn " onClick={() => { updateProfile() }}>
                                Update
                            </button>
                        </div>
                    </div> */}

                    <div className="bt_modal_body">
                        <div className="bt_input_section">
                            <label className="bt_label mb-2">Name <span className="text-danger">*</span></label>
                            <input
                                className="bt_input"
                                placeholder="Enter your name"
                                name="name"
                                value={formValue.name}
                                onChange={handleOnchange}
                            />
                            <p className="bt_error text-danger">{error?.name}</p>
                        </div>
                        <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Select your pairs</label>
                            {
                                pairs.length > 0 &&
                                <Select
                                    classNamePrefix="react_select_one"
                                    isMulti options={pairs}
                                    onChange={(e) => { setFormValue({ ...formValue, ...{ tradePairs: e } }) }}
                                />
                            }

                            <p className="bt_error text-danger">{error?.tradePairs}</p>
                        </div>

                        {/* <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Profile Image</label>

                            <div className="">
                                <div className="bt_profileImage_wrapper">
                                    <img src={uploadedImage ? uploadedImage : Images.profile} />
                                    <input
                                        ref={imageUploadRef}
                                        className="d-none"
                                        type="file"
                                        onChange={(e) => setUploadedImage(URL.createObjectURL(e.target.files[0]))}
                                    />
                                    <button
                                        className="image_upload_button"

                                        onClick={handleUploadImage}
                                    >
                                        <FaPen fontSize={12} />
                                    </button>
                                </div>
                            </div>
                            <p className="bt_error text-danger">{error?.tradePairs}</p>
                        </div> */}

                        <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Select trade history <span className="text-danger">*</span></label>
                            <div className="bt_tab_card">
                                <button
                                    name="showHistory"
                                    className={`${formValue.showHistory == 'only_trader' ? "active" : ""}`}
                                    onClick={() => setFormValue({ ...formValue, ...{ showHistory: "only_trader" } })}
                                >
                                    Master Trader
                                </button>
                                <button
                                    name="showHistory"
                                    className={`${formValue.showHistory == 'only_copier' ? "active" : ""}`}
                                    onClick={() => setFormValue({ ...formValue, ...{ showHistory: "only_copier" } })}
                                >Followers</button>
                            </div>
                            <p className="bt_error text-danger">{error?.showHistory}</p>
                        </div>
                        <div className="bt_input_section">
                            <label className="bt_label mb-2">Upload profile photo</label>

                            <button
                                className="bt_image_upload_btn"
                                onClick={handleUploadImage}
                            >
                                <input
                                    type="file"
                                    className="d-none"
                                    ref={imageUploadRef}
                                    onChange={(e) => {
                                        setFormValue({ ...formValue, ...{ ['profileImage']: e.target.files[0] } })
                                    }}
                                />

                                {formValue?.profileImage ?
                                    <div className="bt_uploaded_image_wrap">
                                        <img src={fileObjectUrl(formValue?.profileImage)} />
                                    </div> :
                                    <div>
                                        <img src={Images.uploadFile} />
                                    </div>}
                                <p>Click to upload your image</p>
                            </button>


                            <p className="bt_error text-danger">{error?.profileImage}</p>
                        </div>
                        <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Minimum Invest <span className="text-danger">*</span></label>
                            <input
                                className="bt_input"
                                placeholder="Enter your minInvest"
                                name="minInvest"
                                value={formValue.minInvest}
                                onChange={handleOnchange}
                            />
                            <p className="bt_error text-danger">{error?.minInvest}</p>
                        </div>
                        <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Minimum Invest (%) <span className="text-danger">*</span></label>
                            <input
                                className="bt_input"
                                placeholder="Enter your minInvest"
                                name="minInvestPercen"
                                value={formValue.minInvestPercen}
                                onChange={handleOnchange}
                            />
                            <p className="bt_error text-danger">{error?.minInvestPercen}</p>
                        </div>

                        <div className="bt_input_section mt-3">
                            <label className="bt_label mb-2">Description</label>
                            <textarea className="bt_textarea" name="description" placeholder="Enter your description" onChange={handleOnchange} value={formValue.description} />
                            <p className="bt_error text-danger">{error?.description}</p>
                        </div>

                        <div className="mt-4">
                            {
                                isLoading ? <button className="login_button_lg w-100">Loading...</button> :
                                    <button className="login_button_lg w-100" onClick={() => { becameATrader() }}>Submit</button>
                            }

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default BecomeTrader;
