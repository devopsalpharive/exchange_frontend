import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { useSelector } from "react-redux";

import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";

import ModalInput from "../components/ModalInput";

import MultiSelectAll from "./MultiSelectAll";

//Action
import { getUserOption } from "../actions/userAction";
import { AddWhiteListuser, RemoveWhiteListuser } from "../actions/launchpadAction";

import toast from "react-hot-toast";

const AddWhiteUser = ({ confirmShow, handleClose, saleId, data }) => {
    const { getUser } = useSelector((state) => state.user);

    const [userOptions, setUseroptions] = useState([])
    const [search, setSearch] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])



    const [selectedEmails, setSelectedEmails] = useState([]);

    // const handleEmailSelect = (item) => {
    //     console.log('seleee', selectedEmails.includes(item))
    //     if (selectedEmails.includes(item)) {
    //         setSelectedEmails((prev) => prev.filter !== item)
    //     } else {
    //         setSelectedEmails((prev) => [...prev, item])
    //     }
    // }
    const handleEmailSelect = (item) => {
        setSelectedEmails((prev) => [...prev, item])
    }

    const Onsearch = async (e) => {
        try {
            const { name, value } = e.target
            fetchuserOption(value)
            setSearch(value)
        } catch (err) {
            console.log(err, 'Onsearch')
        }
    }
    const fetchuserOption = async (search) => {
        try {
            let { status, result, message } = await getUserOption({ search: search })
            if (status) {
                setUseroptions(result)
            }
        } catch (err) {
            console.log(err, 'fetchuserOption__err')
        }
    }

    const AddWhiteList = async () => {
        try {
            let Data = selectedEmails.map((val) => val);
            console.log("AddWhiteListDataDataData", Data);
            let { status, message } = await AddWhiteListuser(saleId, { userList: Data }, getUser.secretKey)
            if (status) {
                toast.success(message)
                setSearch('')
                setUseroptions([])
                setSelectedEmails([])
                handleClose()
            } else {
                toast.error(message)
            }
        } catch (err) {
            console.log(err, 'AddWhiteList__err')
        }
    }
    
    const RemoveWhiteList = async (id) => {
        try {
            let { status, message } = await RemoveWhiteListuser({ saleId: saleId, whitelistUserId: id }, getUser.secretKey);
            if (status) {
                toast.success(message)
                setSearch('')
                setUseroptions([])
                setSelectedEmails([])
                handleClose()
            } else {
                toast.error(message)
            }
        } catch (e) {
            console.log(err, 'RemoveWhiteList__err')
        }
    }

    return (
        <div>
            <Modal
                centered
                size="md"

                backdrop="static"
                show={confirmShow}
                // show={true}
                onHide={() => {
                    setSearch('')
                    setUseroptions([])
                    setSelectedEmails([])
                    handleClose(false)

                }}
                className="custom_modal max_width_600"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={() => {
                        setSearch('')
                        setUseroptions([])
                        setSelectedEmails([])
                        handleClose(false)
                    }}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h5 className="mb-0">Add White list user</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column">
                        <p className="mb-0 mt-2 text-start h5_text_lg">Search user:</p>
                        {/* <div className="row addwhitecenter">
                            <div className="col-12 mb-3">
                                <input
                                    type="tesxt"
                                    placeholder="search user"
                                    className="trade_value_input_wrap border-0 outline-0 w-100 mt-2"
                                    onChange={(e) => {
                                        Onsearch(e);
                                    }}
                                    value={search}
                                />
                            </div>

                            <div className="col-6 mb-3">
                                <p className="mb-0 mt-2">Select White list user:</p>
                            </div>

                            <div className="col-6 mb-3">
                                <MultiSelectAll
                                    options={userOptions}
                                    setSelectedOptions={(data) => {
                                        console.log(data, 'setSelectedOptions')
                                        setSelectedOptions(data)
                                    }}
                                    selectedOptions={selectedOptions}
                                />
                            </div>
                        </div> */}
                        <div>
                            <input
                                type="text"
                                placeholder="Enter email address"
                                className="white_user_input border-0 outline-0 w-100 mt-2 mb-2"
                                onChange={(e) => {
                                    Onsearch(e);
                                }}
                                value={search}
                            />
                        </div>

                        {
                            selectedEmails && selectedEmails.length > 0 &&
                            <>
                                <p className="mb-0 mt-2 text-start mb-3 h5_text_lg">Selected Emails:</p>

                                <div className="white_list_email_wrapper">
                                    {
                                        selectedEmails && selectedEmails.length > 0 && selectedEmails.map((el, index) => (
                                            <button
                                                className="white_list_email selected d-flex align-items-center gap-3"
                                            >
                                                {el?.label}
                                                <IoClose fill="#fff" fontSize={19}
                                                    onClick={() => {
                                                        setSelectedEmails((prev) => prev.filter((item) => item.value !== el.value));
                                                    }}
                                                />
                                            </button>
                                        ))
                                    }
                                </div>
                            </>
                        }

                        {

                            userOptions && userOptions.length > 0 ?
                                <>
                                    <p className="mb-0 mt-2 text-start mb-3 h5_text_lg">Select white list user:</p>


                                    <div className="white_list_email_wrapper">
                                        {
                                            userOptions && userOptions.length > 0 && userOptions.map((value, index) => (
                                                <button
                                                    key={index}
                                                    className={`white_list_email ${selectedEmails.find((e) => e.value == value.value) ? "selected" : ""}`}
                                                    onClick={() => {
                                                        console.log("selectedEmails.includes(value.value)", selectedEmails, selectedEmails.find((e) => e.value == value.value));
                                                        if (!selectedEmails.find((e) => e.value == value.value)) {
                                                            handleEmailSelect(value)
                                                        }
                                                    }}>
                                                    {value.label}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </> : <p className="mb-3 mt-4 text-center">No records found</p>
                        }

                        <div className="d-flex align-items-center gap-4 mt-4">
                            <button
                                className="ml_cancel_button mt-2"
                                onClick={() => {
                                    setSearch('')
                                    setUseroptions([])
                                    setSelectedEmails([])
                                    handleClose()
                                }}
                            >
                                Close
                            </button>
                            <button
                                className="grad_btn grad_btn2 mt-2"
                                onClick={() => { AddWhiteList() }}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer className="justify-content-center">

                </Modal.Footer> */}
            </Modal>
        </div >
    );
};

export default AddWhiteUser;