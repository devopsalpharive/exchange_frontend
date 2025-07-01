import React, { useState, useEffect } from 'react'
import { FaBoxOpen } from 'react-icons/fa6'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Marketcards(props) {
  const navigate = useNavigate();
  const { pairList } = useSelector((state) => state.pairList);

  console.log("Marketcards_pairListpairList", pairList);

  return (

    <div className='managedevices_page wallet_section'>
      <section
        className="wlt_asset_table sectionscroll"
      >
        <div className="custom_table">
          <div className="custom_tableWrap ">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">Instrument </th>
                  <th className="text-center">Market Price</th>
                  <th className="text-center">Change</th>
                  {/* <th className="text-center">Spread</th> */}
                  {/* <th className="text-center">Change</th>*/}
                </tr>
              </thead>
              <tbody>
                {pairList.length > 0 ?
                  pairList.map((record, index) => (
                    (index <= 9) &&
                    <tr>
                      <td>
                        {`${record.firstCurrency} - ${record.secondCurrency}`}
                      </td>
                      {/* <td>
                              <p className="sell_label">{record?.sell}</p>
                          </td>
                          <td>
                              <p className="buy_label">{record.buy}</p>
                          </td> */}
                      <td>
                        {record.marketPrice}
                      </td>
                      <td>
                        {record.change}
                      </td>

                    </tr>
                  ))
                  :
                  <tr>
                    <td className="text-center" colSpan={5}>
                      {" "}
                      <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                        <FaBoxOpen fontSize={35} />
                        No Data Found
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          {pairList && pairList?.length >= 10 &&
            <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
              <button
                className="grad_btn  px-4 fw_sm"
                onClick={() => {
                  navigate("/spot-trading")
                }}
              >
                Load More
              </button>

            </div>
          }
        </div>
      </section>
    </div>
  )
}
