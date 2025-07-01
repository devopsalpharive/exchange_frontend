import React, { useState } from "react";
import Select from "react-select";

import { Images } from "../data/Images";
import SelectWithContent from "../components/SelectWithContent";
import { data } from "../data/data";
import { LuUpload } from "react-icons/lu";

const networkOptions = [
  { value: "india", label: "India" },
  { value: "us", label: "US" },
  { value: "uae", label: "UAE" },
];

const VerificationOld = () => {
  const [verified, setVerified] = useState(false);
  const [currentSteps, setCurrentSteps] = useState(1);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = (val) => {
    if (val === 4 && selectedPhoto === null) {
      setError("* Please choose the Photo type");
      return;
    } else {
      setError(null);
    }
    if (val === 3 && selectedID === null) {
      setError("* Please choose the ID type");
      return;
    } else {
      setError(null);
    }
    if (val === 5) {
      setCurrentSteps(1);
      setVerified(true);
      return;
    }

    setCurrentSteps(val);
  };

  const handleIdChoose = (id) => {
    setSelectedID(id);
  };
  const handlePhotoChoose = (id) => {
    setSelectedPhoto(id);
  };

  const handlePrevious = (id) => {
    setCurrentSteps(id);
  };
  console.log(selectedID, "selectedID");
  return (
    <>
      {currentSteps === 1 && (
        <div className="wallet_section">
          <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
            <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="wp_img_wrpr">
                <img
                  src={Images.profile}
                  alt="profile"
                  className="img_fit_container"
                />
              </div>
              <div className="">
                <div className="d-flex align-items-center gap-3 mb-2 ">
                  <p className="wp_gmail ">Demo@gmail.com</p>
                  <button className="border-0 outline-0 bg-transparent">
                    <img
                      src={Images.gmailedit}
                      alt="edit"
                      className="img-fluid wp_gmail_edit"
                    />
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3  ">
                  <p className="lnd_grad_txt">UID : 52124832</p>
                  <button className="border-0 outline-0 bg-transparent">
                    <img
                      src={Images.copy}
                      alt="edit"
                      className="img-fluid wp_gmail_edit"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="wp_right mt-4 mt-sm-0">
              {verified ? (
                <button className="success_btn">Verified</button>
              ) : (
                <button className="red_btn">Unverified</button>
              )}
            </div>
          </div>

          <div className="wlt_balance mt_40 ">
            <h5 className="h5_text_lg">
              Lorem ipsum dolor sit amet, consetetur sadipscing
            </h5>
            <p className="mt-4 lnd_grad_txt_xs ">Required :</p>
            <p className="desc sub_desc mt-2">
              {" "}
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </p>
            <p className="desc sub_desc mt-2">
              {" "}
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </p>{" "}
            <p className="desc sub_desc mt-2">
              {" "}
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </p>
            <button
              className="grn_grd_btn mt-5"
              onClick={() => handleVerify(2)}
            >
              Verify
            </button>
          </div>
        </div>
      )}
      {currentSteps === 2 && (
        <div className="wlt_balance mt_40 ">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-xxl-6">
              <h5 className="h5_text_lg">Document Verification</h5>
              <div className="mt_40">
                <label className="label_txt_sm">Issuing country/region</label>
                <SelectWithContent
                  placeholder="India"
                  options={networkOptions}
                />
              </div>{" "}
              <div className="mt_40">
                <label className="label_txt_sm">ID Type</label>

                {data.idType.map((value) => (
                  <div
                    className={`id_type d-flex align-items-center justify-content-between mt-3 ${
                      selectedID === value.id ? "active" : ""
                    }`}
                    key={value.id}
                    onClick={() => handleIdChoose(value.id)}
                  >
                    <p>{value.type}</p>

                    {selectedID === value.id && (
                      <img
                        src={Images.tick}
                        alt={value.type}
                        className="img-fluid"
                      />
                    )}
                  </div>
                ))}

                {error && <p className="text-danger mt-2">{error}</p>}
              </div>{" "}
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <button
                  className="back_btn mt-5"
                  onClick={() => handlePrevious(1)}
                >
                  Back
                </button>
                <button
                  className="grn_grd_btn mt-5"
                  onClick={() => handleVerify(3)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {currentSteps === 3 && (
        <div className="wlt_balance mt_40 ">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-xxl-6">
              <h5 className="h5_text_lg">Document Verification</h5>
              <div className="mt_40">
                <label className="label_txt_sm">Photo Type</label>

                {data.photoType.map((value) => (
                  <div
                    className={`id_type d-flex align-items-center justify-content-between mt-3 ${
                      selectedPhoto === value.id ? "active" : ""
                    }`}
                    key={value.id}
                    onClick={() => handlePhotoChoose(value.id)}
                  >
                    <p>{value.type}</p>

                    {selectedPhoto === value.id && (
                      <img
                        src={Images.tick}
                        alt={value.type}
                        className="img-fluid"
                      />
                    )}
                  </div>
                ))}

                {error && <p className="text-danger mt-2">{error}</p>}
              </div>{" "}
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <button
                  className="back_btn mt-5"
                  onClick={() => handlePrevious(2)}
                >
                  Back
                </button>
                <button
                  className="grn_grd_btn mt-5"
                  onClick={() => handleVerify(4)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentSteps === 4 && (
        <div className="wlt_balance mt_40 ">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-xxl-6">
              <h5 className="h5_text_lg">Upload Photos</h5>
              <div className="mt_40">
                <label className="label_txt_sm">Upload</label>

                <div className="upload_img_wrp position-relative mt-4">
                  <div className="position-absolute upload_content d-flex flex-column align-items-center gap-2">
                    <LuUpload color="#fff" fontSize={30} />
                    <p className="fw-bold">Upload</p>
                  </div>
                </div>

                {error && <p className="text-danger mt-2">{error}</p>}
              </div>{" "}
              <div className="d-flex align-items-center gap-3">
                <button
                  className="back_btn mt-5"
                  onClick={() => handlePrevious(3)}
                >
                  Back
                </button>
                <button
                  className="grn_grd_btn mt-5"
                  onClick={() => handleVerify(5)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationOld;
