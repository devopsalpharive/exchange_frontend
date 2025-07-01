import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { getAllFaq } from "../actions/FaqAction"
// import { showToastMessage } from "../../../admin/src/lib/toast";


const Faq = (props) => {

    const [records, setRecords] = useState([]);
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    console.log("logloglog", records);
    console.log("countcunt", count);


    const fetchFaqList = async (payload) => {
        try {
            const data = await getAllFaq(payload);
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
        console.log("entry for aolallalalal", page)
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
            <Header props={props} />
            <section className="min_ht_section ">
                <div className="container container80 min_pads">
                    <div className="row justify-content-center">
                        <div className="col-xxl-8">
                            <h4 className="lnd_headings lnd_gradient ">FAQ</h4>
                            <p className="faq_sub_desc">
                                Explore answers to common queries
                            </p>
                            <p className="faq_sub_desc">
                                If you still have doubts, please don't hesitate to  <Link className="contact_link" to='/contact-us'>contact us</Link>
                            </p>
                            <div className="">
                                <div className=" accordion_bg mt-4">
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
                                                        {
                                                            ReactHtmlParser(item.answer)
                                                        }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        })
                                        }
                                    </Accordion>
                                </div>
                            </div>
                            {count > records.length && (
                                <div className="mt-5 text-center">
                                    <button className="grad_btn"
                                        onClick={() => { LoadMore(page + 1) }}>
                                        Load More</button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Faq;




