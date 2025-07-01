import React, { useState } from 'react'
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import Layout from '../Layout/Layout'
import { IoMail } from 'react-icons/io5'
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import AddPhonenumber from '../modal/AddPhonenumber';
import OtpVerification from '../modal/Otpverification';
import Changemailnumber from '../modal/Changemailnumber';
import { oldMobileOtp, verifyOldMobileOtp } from '../actions/userAction';
import { showToastMessage } from '../config/toast';
import { FaPhone } from "react-icons/fa6";



export default function NumberManagement(props) {
  const location = useLocation();
  const { getUser } = useSelector((state) => state.user);

  const [addnumber, setAddnumber] = useState(false);
  const [otpmodal, setOtpmodal] = useState(false);
  const [changemodal, setChangemodal] = useState(false);

  const editMobileNumber = () => {
    Swal.fire({
      title: "Are You Sure You Want to Change Your Phone Number?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continue",
      confirmButtonColor: '#ff602e',
      cancelButtonColor: '#570ebe',

    }).then((result) => {

      if (result.isConfirmed) {
        getOldOtp()
        // Swal.fire("Deleted All APIs!", "", "success");
      } else if (result.isDenied) {

      }
    });

  }

  const getOldOtp = async () => {
    try {
      const mobileVerify = await oldMobileOtp();
      if (mobileVerify.status) {
        setOtpmodal(true);
        showToastMessage(mobileVerify.data.message, 'success')
      } else {
        showToastMessage(mobileVerify.error.message, 'error')
      }
    } catch (e) {
      console.log("getOldOtp_err", e);
    }
  }



  return (
    <div>
      {/* <NewEmail
        cryptoTransfer={cryptoTransfer}
        handleCryptoTransferClose={handleCryptoTransferClose}
        data={DepositData}
      /> */}
      <Layout props={props}>
        <div className='security_subpages email_management'>
          <p className='page_main_head mb-3'>Phone Number Verification</p>

          {/* {
            getUser && getUser?.mobileNumber === "" || getUser?.mobileNumber === 0 &&
            <div className='mb-3'>
              <p>Phone number verification adds another layer of security to your withdrawals and Humb account.</p>
              <button className="grn_grd_btn mt-3" onClick={() => setAddnumber(true)}>Add Phone Number</button>
            </div>
          } */}



          <div className='email_card wv_card email_list d-flex align-items-start justify-content-between gap-5'>

            <div className='d-flex gap-4'>
              {/* <IoMail fontSize={22} /> */}
              <FaPhone fontSize={18} className='mt-1' />
              {
                getUser && getUser?.mobileNumber === "" || getUser?.mobileNumber === 0 ?
                  <div>
                    <p className='mailid mb-2'>Add new mobile number</p>
                  </div>
                  :
                  <div>
                    <p className='mailid mb-2'>+{getUser?.countryCode} {getUser?.mobileNumber}</p>
                    <p className='maildate'>Added: {getUser && new Date(getUser?.updatedAt).toDateString()}</p>
                  </div>
              }

            </div>
            {
              getUser && getUser?.mobileNumber === "" || getUser?.mobileNumber === 0 ?
                <div className='editsec'>
                  <FiEdit fontSize={22} onClick={() => { setChangemodal(true) }} />
                </div> :
                <div className='editsec'>
                  <FiEdit fontSize={22} onClick={editMobileNumber} />
                </div>
            }



          </div>

          <div className='email_card wv_card email_list d-flex flex-column flex-wrap  gap-2 mt-3'>

            <p className='fw-bold orange_p'>Note :</p>
            <p className='font_size_15'>    withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email.</p>

          </div>

        </div>

        <AddPhonenumber
          show={addnumber}
          handleDeleteAccount={() => setAddnumber(false)}
        />
        {
          otpmodal &&
          <OtpVerification
            show={otpmodal}
            handleClose={() => setOtpmodal(false)}
            location={location.pathname}
            newOtpModel={() => { setChangemodal(true) }}
            type="mobile"
            data={
              { mobileNumber: `+${getUser?.countryCode} ${getUser?.mobileNumber}` }
            }
          />
        }


        <Changemailnumber type={"number"} show={changemodal} handleClose={() => setChangemodal(false)} />

      </Layout>


    </div>
  )
}
