import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { GiConfirmed } from 'react-icons/gi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IoWarningOutline } from 'react-icons/io5'
import { PiSealWarningFill } from 'react-icons/pi'
import { FaBoxOpen } from 'react-icons/fa6'

export default function Managedevices(props) {
  const [nextPage, setnextPage] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [history, setHistory] = useState([
  
  ])
  const LoadMore = async () => {
    try {
      let Page = page + 1;
      setPage(Page);
      let reqData = {
        page: Page,
        limit: limit,
      };
      fetchorderHistory(orderHistory, reqData);
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };
  return (
    <div>
      <Layout props={props}>
        <div className='managedevices_page wallet_section'>
          <p className='page_main_head mb-3'>My Devices</p>
          <section
            className="wlt_asset_table sectionscroll"
          >

            <div className="custom_table">
              <div className="custom_tableWrap ">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center">Device </th>
                      <th className="text-center">Last Login</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">IP Address</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ?
                      history.map((record) => (

                        <tr>
                          <td>
                            {record.device}
                          </td>
                          <td>
                     
                             
                              <p className="">{record?.lastlogin}</p>
                          </td>
                          <td>
                              <p className="">{record.location}</p>
                          </td>
                          <td>
                            {record.ipaddress}
                          </td>
                          <td>
                            {record.action}
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
              {history.length > 0 &&
                <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
                  {nextPage ? (
                    <button
                      className="grad_btn  px-4 fw_sm"
                      onClick={() => {
                        LoadMore();
                      }}
                    >
                      Load More
                    </button>
                  ) : (
                    <button
                      className="grad_btn  px-4 fw_sm"
                      onClick={() => {
                        LoadMore();
                      }}
                      disabled
                    >
                      Load More
                    </button>
                  )}
                </div>
              }
            </div>
          </section>


        </div>

      </Layout>


    </div>
  )
}
