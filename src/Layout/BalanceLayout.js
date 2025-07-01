import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import Accordion from "react-bootstrap/Accordion";

import "react-datepicker/dist/react-datepicker.css";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { BiPlusCircle } from "react-icons/bi";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Link, NavLink, useLocation } from "react-router-dom";
import { data } from "../data/data";
import Layout from "./Layout";
import isEmpty from "is-empty";
import { getAllFaq } from "../actions/FaqAction"


const assetBalanceData = [
  {
    id: 1,
    name: "Deposit",
    position: "left",
    linkTo: "/deposit",
  },
  {
    id: 2,
    name: "Withdraw",
    position: "right",
    linkTo: "/withdraw",
  },
];

function BalanceLayout({ children, props, tokentype, DepositData, statustype }) {
  const location = useLocation(null);
  console.log(props, "tokentypetokentype", DepositData, tokentype.type);


  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)



  const fetchFaqList = async (payload) => {
    try {
      const data = await getAllFaq(payload);   //getAllFaq Action Call  
      console.log("datadata", data);
      setCount(data.count)

      if (data.status) {
        const faqRecords = [...records, ...data.data.data]
        setRecords(faqRecords);
      }
    } catch (e) {
      console.log("fetchFaqList_err", e);
    }
  }




  const LoadMore = (pageNo) => {
    try {
      let payload = {
        page: pageNo,
        limit: limit,
      }
      fetchFaqList(payload);
      setPage(pageNo);
    } catch (err) {
      console.log("LoadMore_Err", err);
    }
  };



  useEffect(() => {
    fetchFaqList({
      page: page,
      limit: limit,
    });
  }, []);


  return (
    <div>
      {/* <Header props={props} /> */}
      <Layout props={props}>
        <section >
          {/* <div className="container container80 py-5"> */}
          {/* <div className="bread_crumbs d-flex align-items-center gap-2">
            <Link to="/" className="d-flex align-items-center ">
              Home Page
            </Link>
            <LiaGreaterThanSolid />
            <Link to="/wallet">Asset</Link>
            <LiaGreaterThanSolid />
            <p>{location.pathname === "/deposit" ? "Deposit" : "Withdraw"}</p>
          </div> */}

          <div className="row justify-content-center">
            <div className="col-11 col-xxl-10 col-xxxl-9 mt-4">
              <div>
                <div className="row mx-auto">
                  <div className="col-12 col-lg-6 pe-lg-4">
                    <div className="dw_card dw_cardstyle h-100">
                      <div className="dw_card_head">
                        <div className="row mx-auto wallet_tab_wrapper">
                          {assetBalanceData.map((value) => (
                            <div className="col-6 d-flex justify-content-center px-0 ">
                              <NavLink
                                to={value.linkTo}
                                className={`dw_card_tabs  text-center ${value.position}`}
                              >
                                {value.name}
                              </NavLink>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="dw_card_body mt-4">{children}</div>
                    </div>
                  </div>


                  <div className="col-12 col-lg-6 ps-lg-4 mt-4 mt-lg-0">
                    <div>
                      {
                        !isEmpty(tokentype?.type) && !isEmpty(DepositData) &&
                        <div className="create_launch_card">
                          <h5>Tips</h5>
                          {
                            statustype == "Deposit" && !isEmpty(DepositData) &&
                            <>
                              {(tokentype.type == "crypto" || tokentype.type == "token") &&
                                <>
                                  <p className="news_desc mt-2">
                                    1. This is a {DepositData?.currencySymbol} ({DepositData?.chainName}) address only. {statustype} only {DepositData?.currencySymbol} Coin.
                                  </p>
                                  <p className=" news_desc mt-2">
                                    2. Your {statustype} will be reflected inside your
                                    account  "After receiving 1 confirmation" on the blockchain.
                                  </p>
                                  <p className=" news_desc mt-2">
                                    3. A deposit fee of {DepositData.depositFee} {DepositData?.currencySymbol} will be deducted from the deposited amount.
                                  </p>
                                  <p className="news_desc mt-2">
                                    4. Minimum deposit limit {DepositData?.minimumDeposit} {DepositData?.currencySymbol}
                                  </p>
                                  <p className="news_desc mt-2">
                                    5. Maximum deposit limit {DepositData?.maximumDeposit} {DepositData?.currencySymbol}
                                  </p>
                                  <p className="news_desc mt-2">
                                    6. Your deposit amount should be within the minimum and maximum limit.
                                  </p>
                                  <p className="news_desc mt-2">
                                    {/* 7. If it's not within these limits. We will not guarantee your amount */}
                                    7. We will not guarantee your amount, If it's not within the above limits.
                                  </p>

                                </>
                              }
                              {tokentype.type == "fiat" &&
                                <>
                                  <p className="news_desc mt-2">
                                    1. This is a {DepositData?.currencySymbol} address only. {statustype} only {DepositData?.currencySymbol} Coin.
                                  </p>
                                  <p className=" news_desc mt-2">
                                    2. Deposit fee {DepositData.depositFee} will be detect from the deposited amount
                                  </p>
                                  <p className="news_desc mt-2">
                                    3. Minimum deposit limit {DepositData?.minimumDeposit} {DepositData?.currencySymbol}
                                  </p>
                                  <p className="news_desc mt-2">
                                    4. Maximum deposit limit {DepositData?.maximumDeposit} {DepositData?.currencySymbol}
                                  </p>
                                  <p className="news_desc mt-2">
                                    5. Your deposit amount should be within the minimum and maximum limit.
                                  </p>
                                  <p className="news_desc mt-2">
                                    6. If it's not within these limit. We will not guarantee for your amount
                                  </p>
                                  <p className="news_desc mt-2">
                                    {/* 7. If it's not within these limits. We will not guarantee your amount */}
                                    7. We will not guarantee your amount, If it's not within the above limits.
                                  </p>
                                </>
                              }
                            </>

                          }
                          {statustype == "Withdraw" && !isEmpty(DepositData) &&
                            <>
                              {tokentype.type == "fiat" &&
                                <>
                                  <>
                                    <p className="news_desc mt-2">
                                      1. Minimum withdraw limit {DepositData?.minimumWithdrawal} {DepositData?.currencySymbol}
                                    </p>
                                    <p className="news_desc mt-2">
                                      2. Maximum withdraw limit {DepositData?.maximumWithdrawal} {DepositData?.currencySymbol}
                                    </p>
                                    <p className="news_desc mt-2">
                                       {/* 3. Submit your withdraw your received mail can approve (or) cancel */}
                                    3. On submit of withdrawal check mail sent to registered email id for OTP
                                    </p>
                                    {/* <p className="news_desc mt-2">
                                      4. Your withdraw is pending means after approved by admin only collect the amount.
                                    </p> */}
                                    <p className="news_desc mt-2">
                                      4. Withdrawal fee {DepositData.withdrawalFee} {DepositData?.currencySymbol} will be detect from the withdraw amount
                                    </p>
                                  </>

                                </>
                              }

                              {(tokentype.type == "crypto" || tokentype.type == "token") &&
                                <>
                                  <p className="news_desc mt-2">
                                    1. Minimum withdraw limit {DepositData?.minimumWithdrawal} {DepositData?.currencySymbol}
                                  </p>
                                  <p className="news_desc mt-2">
                                    2. Maximum withdraw limit {DepositData?.maximumWithdrawal} {DepositData?.currencySymbol}
                                  </p>
                                  <p className=" news_desc mt-2">
                                    {/* 3. Submit your withdraw your received mail can approve (or) cancel */}
                                    3. On submit of withdrawal check mail sent to registered email id for OTP
                                  </p>
                                  <p className=" news_desc mt-2">
                                    4. Withdrawal fee {DepositData.withdrawalFee} {DepositData?.currencySymbol} will be detect from the withdraw amount
                                  </p>
                                </>
                              }
                            </>
                          }


                        </div>

                      }



                      {
                        statustype == "Deposit" && !isEmpty(tokentype?.type) && !isEmpty(DepositData) &&
                        (tokentype.type == "crypto" || tokentype.type == "token") &&
                        <div className="create_launch_card mt-4">
                          <h5>Notes</h5>
                          {
                            statustype == "Deposit" && !isEmpty(DepositData) &&
                            <>
                              {(tokentype.type == "crypto" || tokentype.type == "token") &&
                                <>
                                  {
                                    tokentype.type == "token" ?
                                      <p className="news_desc mt-2">
                                        {/* Ensure the deposit {DepositData?.currencySymbol} IN {DepositData?.chainName},
                                        user mistakely wrong with this fund are not refund. */}
                                        Ensure {DepositData?.currencySymbol}  are deposited in {DepositData?.chainName} network.
                                        If user wrongly deposits fund in another network the fund cannot be traced and HUMB will not be liable for the same.
                                      </p> :
                                      <p className="news_desc mt-2">
                                         Ensure {DepositData?.currencySymbol}  are deposited in {DepositData?.chainName} network.
                                        If user wrongly deposits fund in another network the fund cannot be traced and HUMB will not be liable for the same.

                                        {/* Ensure the deposit {DepositData?.currencySymbol},
                                        which the user mistakenly made with this fund, is not refunded. */}
                                      </p>
                                  }
                                </>
                              }
                            </>
                          }
                        </div>
                      }
                      {/* <div className="create_launch_card mt-4">
                        <h5>FAQ's</h5>

                        <div className="custom_accordion  mt-4">
                          <div className="faq_sec_scroll">
                            <Accordion>
                              {records && records.length && records.map((item) => {
                                return (
                                  <Accordion.Item
                                    eventKey={item._id}
                                    className="mb-3"
                                  >
                                    <Accordion.Header>
                                      {item.question}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      {item.answer}
                                    </Accordion.Body>
                                  </Accordion.Item>
                                )
                              })
                              }
                            </Accordion>
                          </div>
                          {count > records.length && (
                            <div className="mt-5 text-center">
                              <button className="grad_btn"
                                onClick={() => { LoadMore(page + 1) }}
                              > Load More</button>
                            </div>
                          )}
                        </div>
                      </div> */}
                    </div>
                  </div>




                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
        {/* <Footer /> */}
      </Layout>
    </div>
  );
}

export default BalanceLayout;
