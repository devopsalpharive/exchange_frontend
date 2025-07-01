import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function KycAlert() {
  return (
    <div>
      <div className="kyc_alert_card d-flex align-items-center justify-content-between">
        <div className='d-flex align-items-center gap-4'>
          <IoIosCloseCircle fill='#ff602e' fontSize={35} />
          <p className='mb-0'>Please Verify KYC </p>
        </div>
        <Link to="/verification">
          <button className="grn_grd_btn">Verify</button>
        </Link>
      </div>
    </div>
  )
}
