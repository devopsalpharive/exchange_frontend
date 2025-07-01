import React, { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { userTicketList } from "../actions/supportTicketAxios";

const SupportTicketTable = (props) => {
  const { updatesData } = props
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState([]);

  const getTranscations = async () => {
    try {
      let payload = { page: page, limit: 10 };
      const trans = await userTicketList(payload);
      if (trans.status) {
        setResponse(trans.data);
        setTotalCount(trans.count);
      }
    } catch (e) {
      console.log("getTranscations_Err", e);
    }
  };


  const LoadMore = async () => {
    try {
      let Page = page + 1;
      setPage(Page);
      let reqData = {
        page: Page,
        limit: limit,
      };
      const trans = await userTicketList(reqData);
      if (trans.status) {
        setResponse((prev) => response.concat(trans.data));
      }
    } catch (err) {
      console.log(err, "LoadMore___err");
    }
  };

  useEffect(() => {
    getTranscations();
  }, [updatesData]);

  return (
    <div className="custom_table">
      {""}
      {/* <SupportChat/> */}
      <div className="custom_tableWrap ">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">S.no </th>
              <th className="text-center">Subject </th>
              <th className="text-center">Ticket ID</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
              {/* <th className="text-center">Date / Time</th> */}
            </tr>
          </thead>
          <tbody>
            {response?.length > 0 ?
              response.map((record, index) => (
                <tr>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {record?.subject}
                  </td>
                  <td>
                    {record.ticketId}
                  </td>
                  <td>
                    {record.status}
                  </td>
                  <td>
                    <Link to="/support-chat" state={{ ticketId: record.ticketId }} className="grn_grd_btn mt-3 text-decoration-none">Reply</Link>
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
      {response.length >= 10 && totalCount > response.length &&
        <div className="pt-4 pb-3 d-flex align-items-center justify-content-center">
          <button
            className="grad_btn  px-4 fw_sm"
            onClick={() => {
              LoadMore();
            }}
          >
            Load More
          </button>
        </div>
      }
    </div>
  );
};

export default SupportTicketTable;
