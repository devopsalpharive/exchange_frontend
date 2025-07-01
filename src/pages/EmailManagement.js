import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { IoMail } from 'react-icons/io5'
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import OtpVerification from '../modal/Otpverification';
import Changemailnumber from '../modal/Changemailnumber';
import NewEmail from '../modal/NewEmail';

export default function EmailManagement(props) {
  const [otpmodal, setOtpmodal] = useState(false)
  const [changemodal, setChangemodal] = useState(false)

  const { getUser } = useSelector((state) => state.user);

  const editemail = () => {
    Swal.fire({
      title: "Are You Sure You Want to Change Your Email Address?",
      icon: "warning",

      showCancelButton: true,
      confirmButtonText: "Continue",
      confirmButtonColor: '#ff602e',
      cancelButtonColor: '#570ebe',

    }).then((result) => {

      if (result.isConfirmed) {
        setChangemodal(true)
        // Swal.fire("Deleted All APIs!", "", "success");
      } else if (result.isDenied) {

      }
    });

  }
  return (
    <div>
      <Layout props={props}>
        <div className='security_subpages email_management'>
          <p className='page_main_head mb-3'>Email verification</p>

          <div>
          </div>


          <div className='email_card wv_card email_list d-flex align-items-start justify-content-between gap-5'>

            <div className='d-flex gap-4'>
              <IoMail fontSize={22} />
              <div>
                <p className='mailid mb-2'>{getUser && getUser?.email}</p>
                <p className='maildate'>Added : {getUser && new Date(getUser?.updatedAt).toDateString()}</p>
              </div>
            </div>
            <div className='editsec'>
              <FiEdit fontSize={22} onClick={editemail} />
            </div>


          </div>
          <div className='email_card wv_card email_list d-flex flex-column flex-wrap  gap-2 mt-3'>

            <p className='fw-bold orange_p'>Note :</p>
            <p className='font_size_15'>    withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email.</p>

          </div>


        </div>
        {/* <OtpVerification show={otpmodal} handleClose={() => setOtpmodal(false)} /> */}
        <NewEmail
          show={changemodal}
          handleClose={() => { setChangemodal(false) }}
          data={getUser}
        />
        {/* <Changemailnumber type={"email"} show={changemodal} handleClose={() => setChangemodal(false)} /> */}
      </Layout>


    </div>
  )
}
