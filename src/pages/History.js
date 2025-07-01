import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { IoMail } from 'react-icons/io5'
import { FiEdit } from "react-icons/fi";
import TransactionHistory from '../Tables/TransactionHistory';


export default function History(props) {
  return (
    <div>
      {/* <NewEmail
        cryptoTransfer={cryptoTransfer}
        handleCryptoTransferClose={handleCryptoTransferClose}
        data={DepositData}
      /> */}
      <Layout props={props}>
        <div className='security_subpages wallet_section'>
          <p className='page_main_head mb-3'>Passbook History</p>
          <section
            className="wlt_asset_table recenttrans_table mt_40 sectionscroll"
          >
            <TransactionHistory />
          </section>
        </div>
      </Layout>
    </div>
  )
}
