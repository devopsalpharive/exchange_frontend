import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoClose, IoTerminalSharp } from "react-icons/io5";
import isEmpty from "is-empty";




const CopyTradingPairs = (props) => {
    const { pairCollections, selectPairs, pairs } = props
    const [allPairs, setAllPairs] = useState([])
    const [selectedPairs, setselectedPairs] = useState([])


    const onHandleChange = (data) => {
        try {
            const isExist = selectedPairs.filter((el) => el.value == data.value)
            if (isEmpty(isExist)) {
                setselectedPairs((perRecord) => { return [...perRecord, data] })
            } else {
                setselectedPairs(selectedPairs.filter((el) => el.value !== data.value))
            }
        } catch (e) {
            console.log("onHandleChange_err", e);
        }
    }

    useEffect(() => {
        if (!isEmpty(pairCollections)) {
            setAllPairs(pairCollections)
        }
    }, [pairCollections])

    useEffect(() => {
        selectPairs(selectedPairs)
    }, [selectedPairs])

    useEffect(() => {
        if (!isEmpty(pairs)) {
            setselectedPairs(pairs)
        }
    }, [pairs])
    // console.log(pairCollections, 'pairCollections')
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
                    onClick={props.handleClose}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h4 className="mb-0 modal_title">Select copy trading pairs</h4>
                </Modal.Header>
                <Modal.Body>

                    <div className="mdl_selected_pairs_body ">



                        {
                            allPairs.length > 0 ? allPairs.map((item) => (
                                <button
                                    className={selectedPairs.filter((el) => el.value == item.value).length > 0 ? "active" : ""} //    add the condition inside the classname and add "active"   
                                    key={item.id}
                                    onClick={() => {
                                        onHandleChange(item)
                                    }}
                                >{item.pair}</button>
                            )) : "No pairs found"
                        }



                    </div>


                </Modal.Body>
            </Modal>
        </div >
    );
};

export default CopyTradingPairs;
