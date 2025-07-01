import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Synaps from "@synaps-io/react-verify";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import SumsubWebSdk from '@sumsub/websdk-react'

import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";
import { SetApplicantIdaction, getAccessToken } from "../actions/userAction";
import isEmpty from "is-empty";
// import { Synaps } from "@synaps-io/verify-sdk";

const IndividualModal = (props) => {
  const { getUser } = useSelector((state) => state.user);

  const { show, handleClose, type, id, accessToken } = props;
  console.log(getUser, "IndividualModal", show, handleClose, type, id, accessToken);
  // Backup plan for entity
  {/* https://verify-corporate.synaps.io/?service=corporate&session_id=8a4c62ce-4c54-4b9b-934b-2f882fe8e6e8&lang=en */ }

  // useEffect(() => {
  //   // Prevent multiple initializations with react strict mode
  //   // https://react.dev/learn/synchronizing-with-effects#fetching-data
  //   let init = true;

  //   Synaps.init({
  //     sessionId: id,
  //     service: type,
  //     onFinish: () => {
  //       handleClose();
  //     },
  //     mode: "modal",
  //   });
  //   return () => {
  //     init = false;
  //   };
  // }, [id]);

  //   const handleOpen = () => {
  //     Synaps.show();
  //   };

  // useEffect(() => {
  //   if (show == true) {
  //     Synaps.show();
  //   //   handleClose();
  //   }
  // }, [show]);

  const SetApplicantId = async (applicantId) => {
    try {
      let data = {
        userId: getUser.userId,
        applicantId: applicantId
      }
      let result = await SetApplicantIdaction(data)
      if (result) {
        return true
      }

    } catch (err) {
      console.log(err, "createAccessToken___err")
    }
  }

  const createAccessToken = async () => {
    try {
      let token = await getAccessToken()
      console.log(token, "createAccessToken")
      if (token) {
        // this.setState({ accessToken: token })
        accessToken = token
        // return token
      }
    } catch (err) {
      console.log(err, "createAccessToken___err")
    }
  }

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={show}
        onHide={handleClose}
        className="custom_modal">
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={handleClose}>
          <IoClose />
        </button>
        {/* <Modal.Header closeButton>
          <h5 className="mb-0">Synaps verification</h5>
        </Modal.Header> */}
        <Modal.Body className="mt-4">
          <div className="modal_synap_cen">
            {/* <button onClick={handleOpen}>Start verification</button> */}
            {/* <Synaps
              sessionId={id}
              service={type}
              // sessionId={"6285973e-153a-4cfa-b514-44978bb97daa"}
              // service={"individual"}
              lang={"en"}
              onReady={() => { }}
              onFinish={() => {
                props.handleClose()
              }
              }
              color={{
                primary: "212b39",
                secondary: "ffffff"
              }}
              withFinishButton={true}
            /> */}

            {/* <Synaps
                            sessionId={"6285973e-153a-4cfa-b514-44978bb97daa"}
                            service={"individual"}
                            lang={"en"}
                            onReady={() => console.log("component ready")}
                            onFinish={() => console.log("user finish process")}
                            color={{
                                primary: "212b39",
                                secondary: "ffffff"
                            }}
                        /> */}

            {/* <iframe width="100%" height="300%"
              src={
                type == "individual" ?
                  `https://verify.synaps.io/?service=individual&session_id=${id}&lang=en` :
                  `https://verify-corporate.synaps.io/?service=corporate&session_id=${id}&lang=en`
              }>

            </iframe> */}
            <div className="sumsubweb_wrap w-100 ">


            {
              !isEmpty(accessToken) &&
              <SumsubWebSdk
              className=""
                testEnv={false}
                accessToken={accessToken}
                expirationHandler={async () => {
                  try {
                    console.log("onexpiration");
                    let token = await createAccessToken()
                    return token
                  } catch (err) {
                    console.log(err, "onexpiration")
                  }
                }}
                config={{
                  lang: "en-us"
                  // email: "test@gmail.com",
                  // phone: "0912234456"
                }}
                // options={{ addViewportTag: false, adaptIframeHeight: true }}
                onMessage={(data, payload) => {
                  console.log("SumsubWebSdk_onMessage", data, payload)
                  if (payload.applicantId) {
                    SetApplicantId(payload.applicantId)
                  }
                }}
                onError={(data) => console.log("onError", data)}
              />
            }
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IndividualModal;
