import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { GiConfirmed } from 'react-icons/gi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IoWarningOutline } from 'react-icons/io5'
import { PiSealWarningFill } from 'react-icons/pi'
import { FaBoxOpen } from 'react-icons/fa6'
import { getActivities } from '../actions/userAction'
import { useDispatch, useSelector } from "react-redux";
import isEmpty from 'is-empty'
import { momentFormat } from '../lib/dateTimeHelper'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";


export default function Manageactivity(props) {
  const [totalcount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getUser } = useSelector((state) => state.user);

  const navigate = useNavigate()

  const LoadMore = async () => {
    try {
      setIsLoading(true)
      let Page = page + 1;
      setPage(Page);
      let reqData = {
        page: Page,
        limit: limit,
      };
      const getData = await getActivities(reqData, getUser.secretKey);
      if (getData.status) {
        setIsLoading(false)
        setRecords(records.concat(getData.data.data));
        setTotalCount(getData.data.count)
      }
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  const fetchActivities = async (data) => {
    try {
      const getData = await getActivities(data, getUser.secretKey);
      if (getData.status) {
        setRecords(getData.data.data);
        setTotalCount(getData.data.count)
      }
    } catch (e) {
      console.log("getActivities_err", e);
    }
  }

  useEffect(() => {
    if (!isEmpty(getUser)) {
      let payload = { page: page, limit: limit };
      fetchActivities(payload)
    }
  }, [getUser])

  return (
    <div>
      <Layout props={props}>
        <div className='managedevices_page wallet_section'>
          <p className='page_main_head mb-3'>Account Activity Records</p>
          <section
            className="wlt_asset_table sectionscroll"
          >

            <div className="custom_table">
              <div className="custom_tableWrap ">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center">Date </th>
                      <th className="text-center">Source</th>

                      <th className="text-center">IP Address</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ?
                      records.map((record) => (

                        <tr>
                          <td>
                            {momentFormat(record?.createdDate)}
                            {/* {new Date(record.createdDate).toDateString()} */}
                          </td>
                          <td>
                            <p className="">
                              {record?.isMobile == "false" ? `Web/${record?.browserName}` : 'Mobile'}</p>
                          </td>
                          <td>
                            {record?.ipaddress}
                          </td>

                          <td>
                            {`${record?.regionName} / ${record?.countryName?.toUpperCase()}`}
                          </td>
                          <td>
                            <p className="">{record?.status?.charAt(0).toUpperCase() + record?.status?.slice(1)}</p>
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
                  {console.log("records && records.length >= 8 && totalcount > records.length", records.length >= 8 && records.length > totalcount,
                    records.length >= 8 && totalcount > records.length, totalcount)}
                </table>
              </div>
              {
                records && records.length >= 8 && totalcount > records.length && (
                  <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
                    {
                      isLoading ? <button className="grad_btn  px-4 fw_sm">Loading... </button> :
                        <button
                          className="grad_btn  px-4 fw_sm"
                          onClick={() => {
                            LoadMore();
                          }}
                        >  Load More</button>
                    }

                  </div>
                )
              }
            </div>


          </section>

          <button
            className="grad_btn  px-3 fw_sm mt-4 d-flex align-items-center gap-2"
            onClick={() => navigate(-1)}
          ><FaArrowLeft /> Back</button>
        </div>

      </Layout >


    </div >
  )
}
