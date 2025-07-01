import React from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useSelector } from "react-redux";
import { FaBoxOpen } from "react-icons/fa6";
import { toCutOff } from "../../lib/Calculationlib";

const Balance = () => {
  const { userAsset } = useSelector((state) => state.user);
  return (
    <div className="table_div">


      <div className="balance_table">
        {" "}
        <div class="custom_tableWrap table_body_white">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Assets</th>
                <th className="text-center">Main balance</th>
                <th className="text-center">Spot Balance</th>
                <th className="text-center">Margin Balance</th>
                <th className="text-center">Margin Holding</th>
                {/* <th className="text-center">Derivative Balance</th>
                <th className="text-center">Futures Balance</th> */}
              </tr>
            </thead>
            <tbody>
              {userAsset?.assets?.length > 0 ? (
                userAsset?.assets?.map((record, index) => {
                  return (
                    <tr>
                      <td className="text-center">{record?.currencySymbol}</td>
                      <td className="text-center">
                        {isNaN(record?.balance)
                          ? 0
                          : toCutOff(record?.balance, (record?.pip))}
                      </td>
                      <td className="text-center">
                        {isNaN(record?.spotBalance)
                          ? 0
                          : toCutOff(record?.spotBalance, (record?.pip))}
                      </td>
                      <td className="text-center">
                        {isNaN(record?.marginBalance)
                          ? 0
                          : toCutOff(record?.marginBalance, (record?.pip))}
                      </td>
                      <td className="text-center">
                        {isNaN(record?.marginHolding)
                          ? 0
                          : toCutOff(record?.marginHolding, (record?.pip))}
                      </td>
                      {/* <td className="text-center">
                        {isNaN(record?.derivativeBalance)
                          ? 0
                          : toCutOff(record?.derivativeBalance, (record?.pip))}
                      </td>
                      <td className="text-center">
                        {isNaN(record?.futuresBalance)
                          ? 0
                          : toCutOff(record?.futuresBalance, (record?.pip))}
                      </td> */}
                    </tr>
                  );
                })
              ) : (
                // <tr>
                //   <td className="text-center" colSpan={9}>
                //     <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                //       <FaBoxOpen fontSize={35} />
                //       No Data Found
                //     </div>
                //   </td>
                // </tr>
                <></>
              )}
            </tbody>
          </table>
        </div>
        {userAsset.length <= 0 && <div className="table_nodata">
          <div className="d-flex align-items-center justify-center flex-column gap-3 ">
            <FaBoxOpen fontSize={35} />
            No Data Found
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Balance;
