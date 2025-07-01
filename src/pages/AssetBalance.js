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
import Deposit from "./DepositOld";
import Withdraw from "./Withdraw";
import { data } from "../data/data";

const assetBalanceData = [
  {
    id: 1,
    name: "Deposit",
    position: "left",
    linkTo: "/deposit",
    content: <Deposit />,
  },
  {
    id: 2,
    name: "Withdraw",
    position: "right",
    linkTo: "/withdraw",
    content: <Withdraw />,
  },
];

function AssetBalance(props) {
  const location = useLocation();
  console.log("lo", location.pathname);
  const [currentTabId, setCurrentTabId] = useState(null);

  const handleTabId = (value) => {
    if (value.linkTo === location.pathname) {
      setCurrentTabId(value.id);
    }
  };

  useEffect(() => {
    assetBalanceData.map((value) => {
      handleTabId(value);
    });
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Header
        theme={props?.theme}
        setTheme={props?.setTheme}
        handleThemeChange={props?.handleThemeChange}
      />
      <section className="custom_section">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center gap-2">
            <Link to="/" className="d-flex align-items-center ">
              Home Page
            </Link>
            <LiaGreaterThanSolid />
            <Link to="/asset">Asset</Link>
            <LiaGreaterThanSolid />
            <p>{location.pathname === "/deposit" ? "Deposit" : "Withdraw"}</p>
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-11 col-xxl-10 col-xxxl-9 mt-4">
              <div>
                <div className="row mx-auto">
                  <div className="col-12 col-lg-6 pe-lg-4">
                    <div className="dw_card h-100">
                      <div className="dw_card_head">
                        <div className="row mx-auto">
                          {assetBalanceData.map((value) => (
                            <div className="col-6 d-flex justify-content-center px-0">
                              <NavLink
                                to={value.linkTo}
                                className={`dw_card_tabs text-center ${value.position}`}
                              >
                                {value.name}
                              </NavLink>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="dw_card_body mt-4">
                        {assetBalanceData[currentTabId - 1] &&
                          assetBalanceData[currentTabId - 1].content}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 ps-lg-4 mt-4 mt-lg-0">
                    <div>
                      <div className="create_launch_card">
                        <h5>Tips</h5>
                        <p className="news_desc mt-4">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr, sed diam nonumy eirmod tempor invidunt ut
                          labore et dolore magna aliquyam erat, sed diam
                          voluptua. At vero eos et accusam et justo duo dolores
                          et ea rebum. Stet clita kasd gubergren, no sea
                          takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                          ipsum dolor sit amet, consetetur sadipscing elitr, sed
                          diam nonumy eirmod tempor invidunt ut labore et
                        </p>
                      </div>
                      {/* <div className="create_launch_card mt-4">
                        <h5>FAQ's</h5>

                        <div className="custom_accordion mt-4">
                          <Accordion>
                            {data.depositFaq.map((acc) => (
                              <Accordion.Item
                                eventKey={acc.id}
                                className="mb-3"
                              >
                                <Accordion.Header>
                                  {acc.question}
                                </Accordion.Header>
                                <Accordion.Body>{acc.answer}</Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AssetBalance;
