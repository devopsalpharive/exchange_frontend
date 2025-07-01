import React, { useEffect, useRef, useState } from "react";
import { data } from "../data/data";
import { Images } from "../data/Images";
import MyProfileChange from "../modal/MyProfileChange";
import DeleteAccount from "../modal/DeleteAccount";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import BankDetails from "./BankDetails";
import { useLocation, Link, NavLink, useNavigate, useParams } from "react-router-dom";
/** Config */
import config from "../config/env";
import { updateUserProfile, updateVerificationActivate, updateVerificationEmail } from "../actions/userAction";
import ProfileName from "../modal/ProfileName";
import { showToastMessage } from "../config/toast";
import NewEmail from "../modal/NewEmail";
import isEmpty from "is-empty";
import CopyToClipboard from "react-copy-to-clipboard";
import { imageValidation } from "../hooks/imageValdationHook";

const MyProfile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { getUser } = useSelector((state) => state.user);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfileNameModal, setShowProfileNameModal] = useState(false);
  const [showProfileEmailModal, setShowProfileEmailModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [files, setFiles] = useState("");

  const profileImageChangeRef = useRef(null);
  const handleProfileImageChange = () => {
    profileImageChangeRef.current.click()
  }
  const handleProfileModalClose = () => {
    setShowProfileModal(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccount(false);
  };

  const updateProfile = async (image) => {
    try {
      // console.log("isValidisValid", image);
      const isValid = image.name.split(".")[image.name.split(".").length - 1];
      if (['png', 'jpg', 'jpeg'].includes(isValid)) {
        const formData = new FormData()
        formData.append("type", "profile")
        formData.append("image", image)
        const profile = await updateUserProfile(formData);
        if (profile.status) {
          showToastMessage(profile.data.message, 'success')
        } else {
          showToastMessage(profile.error.message, 'error')
        }
      } else {
        showToastMessage("Select valid file", "error")
      }


      // } else {
      //   showToastMessage("Invalid file formate. Upload PNG, JPG, JPEG files", 'error')
      // }
    } catch (e) {
      console.log("updateProfile_err", e);
    }
  }

  const verifyOldEmail = async () => {
    try {
      let userId = location.pathname.split("/")[2];
      if (!isEmpty(userId)) {
        console.log("verifyNewEmail_userId", userId);
        const verficationMain = await updateVerificationEmail({ token: userId });
        if (verficationMain.status) {
          showToastMessage(verficationMain.data.message, 'success');
        } else {
          showToastMessage(verficationMain.error.message, 'error')
        }
      }

    } catch (e) {
      console.log("verifyNewEmail_err", e);
    }
  }

  const verifyNewEmail = async () => {
    try {
      if (!isEmpty(userId)) {
        console.log("verifyNewEmail_userId", userId);
        const verficationMain = await updateVerificationActivate({ token: userId });
        if (verficationMain.status) {
          showToastMessage(verficationMain.data.message, 'success');
          navigate("/myprofile");
        } else {
          showToastMessage(verficationMain.error.message, 'error')
        }
      }

    } catch (e) {
      console.log("verifyNewEmail_err", e);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let pathname = location.pathname;
    if (pathname == '/verify-old-email/' + userId) {
      verifyOldEmail();
    } else if (pathname == '/verify-new-email/' + userId) {
      verifyNewEmail();
    }
  }, []);


  return (

    <Layout props={props}>

      <div className="my_profile">
        <div className="row">
          <div className="col-xl-6">
            <div className="mypfl_card d-flex align-items-center justify-content-between">
              <div className="wp_img_wrpr">
                <img
                  src={
                    getUser?.profileImage == ""
                      ? Images.profile
                      : getUser?.profileImage
                  }
                  alt="profile"
                  className="img_fit_container"
                />
              </div>
              <button className="grad_btn grad_btn2" onClick={handleProfileImageChange}>
                <input type="file" className="modal_input  w-100 mt-2 d-none" onChange={(e) => { updateProfile(e.target.files[0]) }} ref={profileImageChangeRef} />
                Change
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mypfl_card d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
              <div>
                <p className="fw-bold">
                  {getUser?.firstName} {getUser?.lastName}
                </p>
                <p className="mypfl_heading mt-2">Display name</p>
              </div>
              <div className="mt-3 mt-sm-0">
                <button className="grad_btn4" onClick={() => { setShowProfileNameModal(true) }}>Change</button>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mypfl_card d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
              <div>
                <p className="fw-bold">{getUser?.email}</p>
                <p className="mypfl_heading mt-2">Email Address</p>
              </div>
              <div className="mt-3 mt-sm-0">
                <button className="grad_btn4" onClick={() => { setShowProfileEmailModal(true) }}>Change</button>
              </div>
            </div>{" "}
          </div>
          <div className="col-xl-6">

            <div className="mypfl_card d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
              <div>
                <p className="fw-bold">{getUser?.userId}</p>
                <p className="mypfl_heading mt-2">User ID</p>
              </div>
            </div>{" "}
          </div>
          <div className="col-xl-6">
            <div className="mypfl_card d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
              <div>
                <p className="fw-bold">{getUser?.referralCode}</p>
                <p className="mypfl_heading mt-2">Referral Code</p>
              </div>
              <div className="mt-3 mt-sm-0">
                <CopyToClipboard
                  text={`${getUser?.referralCode}`}
                  onCopy={() => showToastMessage("Referral Code copied successfully!", "success")}
                >
                  <button className="grad_btn4">Copy</button>
                </CopyToClipboard>
                {/* <button className="grad_btn4">Copy</button> */}
              </div>
            </div>

          </div>
          <div className="col-xl-6">
            <div className="mypfl_card d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
              <div>
                <p className="fw-bold">Close Account</p>
              </div>
              <div className="mt-3 mt-sm-0">
                <button className="red_grad_btn3" onClick={() => { setShowDeleteAccount(true) }} >Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-5">
        <BankDetails />
      </div> */}

      <MyProfileChange
        profileData={profileData}
        showProfileModal={showProfileModal}
        handleProfileModalClose={handleProfileModalClose}
      />
      <DeleteAccount
        showDeleteAccount={showDeleteAccount}
        handleDeleteAccount={handleDeleteAccount}
        data={getUser}
      />
      <ProfileName
        data={getUser}
        show={showProfileNameModal}
        handleClose={() => { setShowProfileNameModal(false) }}
      />
      <NewEmail
        show={showProfileEmailModal}
        handleClose={() => { setShowProfileEmailModal(false) }}
      />

    </Layout>
  );
};

export default MyProfile;
