import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Marquee from "react-fast-marquee";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import bannerJson from "../asset/json/banner.json";
import graphJson from "../asset/json/graph.json";
import DJParty from "../asset/json/djparty.json";
import FactoryJson from "../asset/json/factory.json";
import uniqueJson from "../asset/json/unique.json";
import { Images } from "../data/Images";
import { data } from "../data/data";
import VideoSec from "../components/VideoSec";
import MedicalCard from "../components/MedicalCard";
import FeaturesCard from "../components/FeaturesCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import MarketCards from "../components/SpotTrade/card/MarketCards";
import Marketcards from "../components/Marketscard";
import { getCms } from "../actions/cmsAction";
import MarketLimit from "../modal/MarketLimit";
import { getTopGainers } from "../actions/userAction";
import AllCryptoTable from "../Tables/AllCryptoTable";
import TopGainers from "../components/TopGainer";

const Landing = (props) => {

  const navigate = useNavigate();
  const currentThemeRedux = useSelector((state) => state.theme.theme);
  const { getUser } = useSelector((state) => state.user);
  const { pairList } = useSelector((state) => state.pairList);
  // console.log("pairlisttttt", pairList);


  const [cmsData, setCmsData] = useState("");
  const [topGainers, setTopGainers] = useState([]);
  const [showMarketLimit, setShowMarketLimit] = useState(false);
  // console.log("topGainers", topGainers);

  const handleShowMarketLimit = () => {
    setShowMarketLimit(true)
  }
  const handleCloseMarketLimit = () => {
    setShowMarketLimit(false)
  }

  const getCmsData = async () => {
    try {
      const getData = await getCms({ page: "HomePage" });
      if (getData.status) {
        setCmsData(getData.data.data)
      }
      const topGainers = await getTopGainers();
      if (topGainers.status) {
        setTopGainers(topGainers.data)
      }
    } catch (e) {
      console.log("getCmsData_err", e);
    }
  }
  useEffect(() => {
    getCmsData()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>

      {/* modal import */}

      <MarketLimit show={showMarketLimit} handleClose={handleCloseMarketLimit} />
      <Header props={props} />

      {/* start of banner section */}
      <section className="custom_section">
        <div className="banner">
          <div className="container container80 banner_min_ht  pt-5 pt-lg-0">
            <div className="row pb-5 d-flex flex-column-reverse flex-lg-row">
              <div className="col-lg-6 d-flex align-items-center mt-5 mt-lg-0">
                <div className="banner_left">
                  <h3 className="title">{cmsData && cmsData?.content[0]?.heading}</h3>
                  <div className="d-flex align-items-center gap-3">
                    <p className="gradient_text">{cmsData && cmsData?.content[0]?.subHeading}</p>
                    <img
                      src={Images.candleStick}
                      alt="candlestick"
                      className="img-fluid candlestick_img"
                    />
                  </div>
                  <p className="desc py-4">
                    {cmsData && cmsData?.content[0]?.description}
                  </p>
                  {
                    getUser &&
                      getUser ? <button className="home__gradClipBtn" onClick={() => { navigate("/dashboard") }}>Get Started</button> :
                      <button className="home__gradClipBtn" onClick={() => { navigate("/register") }}>Get Started</button>
                  }
                </div>

                {/* <button className="btn btn-primary" onClick={handleShowMarketLimit}>Modal</button> */}
              </div>
              <div className="col-lg-6 h-100 d-flex justify-content-center">
                <div className="banner_right d-flex justify-content-center">
                  {/* {
                    cmsData && cmsData?.content[0]?.image != "" ?
                    <Lottie
                      animationData={cmsData.content[0].image}
                      className="bannerJson"
                      loop={true}
                    /> : <></>
                  } */}
                  <Lottie
                    animationData={bannerJson}
                    className="bannerJson"
                    loop={true} />
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        {/* end of banner section */}
        <div className="custom_marque position-relative">
          <Marquee>
            <div className="d-flex align-items-center marque_text_wrap">
              {pairList.length > 0 ? pairList.map((val) => {
                return (
                  <p className="marque_p1">{val.firstCurrency}/{val.secondCurrency} {val.last} ({val.change > 0 ? `+${val.change}%` : `${val.change}%`})</p>
                )
              }) : ""}

              {/* <p className="marque_p1">XRP $0.60 (+2.24%)</p>
              <p>SOL $0.60 (+2.24%)</p>
              <p>DOGE $0.60 (+2.24%)</p>
              <p>BTC $0.60 (+2.24%)</p>
              <p>XRP $0.60 (+2.24%)</p>
              <p>SOL $0.60 (+2.24%)</p>
              <p>DOGE $0.60 (+2.24%)</p> */}
            </div>
          </Marquee>
          {/* <div className="marque_elipse  position-absolute">
            <img src={Images.elipse} alt="elipse" className="img-fluid" />
          </div> */}
        </div>

        {/* start of exchange section */}
        <div className="container container80 banner_min_ht  pt-4 pt-lg-5 ">
          <div className="row  pb-lg-5 d-flex flex-column-reverse flex-lg-row">
            <div className="col-12">
              <div className="marketscardsec">
                <p className="fw-bold">Graph indicates if a Trading pair shows <span className='increase_span'>Upward</span>  Trend or <span className="decrease_span">Downward</span>  Trend</p>
                {/* <Marketcards /> */}
                <AllCryptoTable />
              </div>
            </div>

          </div>
        </div>

        <div className="exchange position-relative">
          <div className="exchange_elipse position-absolute">
            <img src={Images.elipse2} alt="elipse" className="img-fluid" />
          </div>
          <div className="container container80">
            <div className="row h-100">
              <div className="col-12 col-lg-6 d-flex align-items-center">
                <div>
                  <h4 className="lnd_headings">
                    <span className="lnd_grad_txt">{cmsData && cmsData?.content[1]?.heading?.split(' ')[0]}</span>&nbsp;
                    {cmsData && cmsData?.content[1]?.heading && cmsData?.content[1]?.heading?.split(' ').slice(1)?.join(' ')}
                  </h4>
                  <p className="desc sub_desc mt-4">
                    {cmsData && cmsData?.content[1]?.description}
                    {/* </p> */}
                    {/* <p className="desc sub_desc my-4"> */}

                  </p>

                  <Link to="/market-overview">
                    <button className="grad_btn mt-3">Explore</button>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-5 mt-lg-0  d-flex align-items-center justify-content-center">

                {/* {data.Exchange.map((val) => ( */}
                {/* {topGainers.map((val) => (
                    <TopGainers val={val} />

                  ))} */}

                <div className="home__factoryJson d-flex  justify-content-center">
                  <Lottie
                    animationData={uniqueJson}
                    loop={true}
                    className="custom_json"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* end of exchange section */}

        {/* start of mindmap */}

        <div className="mindmap position-relative pad_top_bot">
          <div className="position-absolute mindmap_tablet">
            <img src={Images.tablet} alt="tablet" className="img-fluid" />
          </div>
          <div className="position-absolute mindmap_tablet mindmap_tablet2 d-md-none">
            <img src={Images.tablet} alt="tablet" className="img-fluid" />
          </div>
          <div className="position-absolute mindmap_tablet mindmap_tablet3 d-md-none">
            <img src={Images.tablet} alt="tablet" className="img-fluid" />
          </div>
          <div className="container container80">
            <div className="row">
              <div className="col-12 d-md-none">
                <div>
                  <div className="d-flex justify-content-center mindmap_img_wrap position-relative">
                    <img
                      src={
                        currentThemeRedux === "dark"
                          ? Images.mindmap
                          : Images.mindmapLight
                      }
                      alt="mind map"
                      className="img-fluid mindmap_img"
                    />
                  </div>{" "}
                  <div className="mindmap_card  position-relative">
                    <h5>{cmsData && cmsData?.content[2]?.heading}</h5>
                    <p className="mt-1 mt-sm-2 mt-md-3">
                      {cmsData && cmsData?.content[2]?.description}
                    </p>
                  </div>
                  <div className="mindmap_bor_btm d-flex justify-content-center position-relative"></div>
                  <div className="mindmap_card">
                    <h5>{cmsData && cmsData?.content[3]?.description}</h5>
                    <p className="mt-1 mt-sm-2 mt-md-3">
                      {cmsData && cmsData?.content[3]?.description}
                    </p>
                  </div>
                  <div className="mindmap_bor_btm d-flex justify-content-center position-relative"></div>
                  <div className="mindmap_card ">
                    <h5>{cmsData && cmsData?.content[4]?.heading}</h5>
                    <p className="mt-1 mt-sm-2 mt-md-3">
                      {cmsData && cmsData?.content[4]?.description}
                    </p>
                  </div>
                  <div className="mindmap_bor_btm d-flex justify-content-center position-relative"></div>
                  <div className="mindmap_card ">
                    <h5>{cmsData && cmsData?.content[5]?.heading}</h5>
                    <p className="mt-1 mt-sm-2 mt-md-3">
                      {cmsData && cmsData?.content[5]?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 d-none d-md-flex justify-content-center align-items-center pe-0">
                <div className="mindmap_card">
                  <h5>{cmsData && cmsData?.content[2]?.heading}</h5>
                  <p className="mt-1 mt-sm-2 mt-lg-3">
                    {cmsData && cmsData?.content[2]?.description}
                  </p>
                </div>
              </div>
              <div className="col-4 d-none d-md-flex  justify-content-center px-0">
                <div>
                  <div className="mindmap_card">
                    <h5>{cmsData && cmsData?.content[3]?.heading}</h5>
                    <p className="mt-1 mt-sm-2 mt-lg-3">
                      {cmsData && cmsData?.content[3]?.description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center mindmap_img_wrap position-relative">
                    <img
                      src={
                        currentThemeRedux === "dark"
                          ? Images.mindmap
                          : Images.mindmapLight
                      }
                      alt="mind map"
                      className="img-fluid mindmap_img"
                    />
                  </div>
                  <div className="mindmap_card">
                    <h5>{cmsData && cmsData?.content[4]?.heading}</h5>
                    <p className="mt-1 mt-sm-2 mt-lg-3">
                      {cmsData && cmsData?.content[4]?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 d-none d-md-flex  justify-content-center align-items-center ps-0">
                {" "}
                <div className="mindmap_card">
                  <h5>{cmsData && cmsData?.content[5]?.heading}</h5>
                  <p className="mt-1 mt-sm-2 mt-lg-3">
                    {cmsData && cmsData?.content[5]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of mindmap */}

        {/* start of lab  */}

        <div className="lab_section py-3 py-lg-5 position-relative">
          <div className="position-absolute lab_tablet">
            <img src={Images.tablet} alt="tablet" className="img-fluid" />
          </div>
          <div className="position-absolute lab_tablet2">
            <img src={Images.tablet} alt="tablet" className="img-fluid" />
          </div>
          <div className="container container80">
            <div className="row">
              <div className="col-12 col-lg-6 d-flex justify-content-center">
                <div className="home__factoryJson d-flex justify-content-center">
                  <Lottie
                    animationData={graphJson}
                    loop={true}
                    className="custom_json"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex align-items-center mt-5">
                <div>
                  <h4 className="lnd_headings">
                    <span className="lnd_grad_txt">
                      {cmsData && cmsData?.content[6]?.heading?.split(' ')[0]}
                    </span> {cmsData && cmsData?.content[6]?.heading && cmsData?.content[6]?.heading?.split(' ').slice(1)?.join(' ')}{" "}
                    {/* <br />
                    amet, consetetur */}
                  </h4>
                  <p className="desc sub_desc mt-4">
                    {cmsData && cmsData?.content[6]?.description}
                    {/* </p> */}
                    {/* <p className="desc sub_desc mt-4"> */}

                  </p>
                  {/* <button className="grad_btn mt-5">Explore</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of lab */}

        {/* start of video  */}

        <div className="lab_section pad_top_bot position-relative">
          <div className="lab_sec_elipse position-absolute">
            <img src={Images.elipse2} alt="elipse" className="img-fluid" />
          </div>
          <div className="container container80 py-lg-4">
            <div className="row d-flex flex-column-reverse flex-lg-row ">
              <div className="col-12 col-lg-6 d-flex align-items-center pe-5">
                <div>
                  <h4 className="lnd_headings">
                    <span className="lnd_grad_txt">
                      {cmsData && cmsData?.content[7]?.heading?.split(' ')[0]}
                    </span> {cmsData && cmsData?.content[7]?.heading && cmsData?.content[7]?.heading?.split(' ').slice(1)?.join(' ')}{" "}
                    {/* <br />
                    amet, consetetur */}
                  </h4>
                  <p className="desc sub_desc mt-4">
                    {cmsData && cmsData?.content[7]?.description}
                    {/* </p> */}
                    {/* <p className="desc sub_desc mt-4"> */}
                  </p>
                  {/* <button className="grad_btn mt-5">Explore</button> */}
                </div>
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center ">
                <div>
                  {/* <VideoSec videos={ cmsData && cmsData?.content[7]?.image}/> */}
                  {cmsData &&
                    <iframe
                      className="land_video_iframe"
                      src={cmsData?.content[7]?.image}
                      // src={"http://200.140.70.162:3000/login"}
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of video */}

        {/* start of success */}
        {/* <div className="lab_section pb-5">
          <div className="container container80">
            <div className="row">
              <div className="col-12 col-lg-6 ">
                <div className="home__factoryJson">
                  <Lottie animationData={DJParty} loop={true} />
                </div>
              </div>
              <div className="col-12 col-lg-6  d-flex align-items-center ">
                <div>
                  <h4 className="lnd_headings">
                    <span className="lnd_grad_txt">Lorem</span> ipsum dolor sit{" "}
                    <br />
                    amet, consetetur
                  </h4>
                  <p className="desc sub_desc mt-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy
                  </p>
                  <p className="desc sub_desc mt-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                  <button className="grad_btn mt-5">Explore</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="home__cloudHolderSec pad_top_bot">
          <div className="container container80">
            <h4 className="lnd_headings text-center">
              {cmsData && cmsData?.content[8]?.heading}
            </h4>
            <p className="desc sub_desc mt-4 text-center feature_desc mx-auto">
              {cmsData && cmsData?.content[8]?.description}
            </p>

            <div className="row justify-content-center higher_top">
              <div className="col-lg-11 col-xxl-10">
                <div className="row">
                  {/* {data.featuresCard.map((item) => ( */}
                  <div className="col-xl-3 col-sm-6 col-12 mb-4 mb-xl-0">
                    {/* <FeaturesCard data={item} /> */}
                    <div className="home__featuresCard p-3 pb-5">
                      <img src={cmsData && cmsData?.content[9]?.image} className="img-fluid home_featureCardImg" />
                      <h6 className="m-0 home__featureCardTitle mt-4">{cmsData && cmsData?.content[9]?.heading}</h6>
                      <p className="m-0 home__featureCardHint mt-3">{cmsData && cmsData?.content[9]?.description}</p>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 col-12 mb-4 mb-xl-0">
                    <div className="home__featuresCard p-3 pb-5">
                      <img src={cmsData && cmsData?.content[10]?.image} className="img-fluid home_featureCardImg" />
                      <h6 className="m-0 home__featureCardTitle mt-4">{cmsData && cmsData?.content[10]?.heading}</h6>
                      <p className="m-0 home__featureCardHint mt-3">{cmsData && cmsData?.content[10]?.description}</p>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 col-12 mb-4 mb-xl-0">
                    <div className="home__featuresCard p-3 pb-5">
                      <img src={cmsData && cmsData?.content[11]?.image} className="img-fluid home_featureCardImg" />
                      <h6 className="m-0 home__featureCardTitle mt-4">{cmsData && cmsData?.content[11]?.heading}</h6>
                      <p className="m-0 home__featureCardHint mt-3">{cmsData && cmsData?.content[11]?.description}</p>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 col-12 mb-4 mb-xl-0">
                    <div className="home__featuresCard p-3 pb-5">
                      <img src={cmsData && cmsData?.content[12]?.image} className="img-fluid home_featureCardImg" />
                      <h6 className="m-0 home__featureCardTitle mt-4">{cmsData && cmsData?.content[12]?.heading}</h6>
                      <p className="m-0 home__featureCardHint mt-3">{cmsData && cmsData?.content[12]?.description}</p>
                    </div>

                  </div>
                  {/* ))} */}
                </div>
              </div>
            </div>


            <div className="home__factorySec higher_top">
              <div className="row">
                <div className="col-lg-6">
                  <div className="home__factoryJson">
                    <Lottie animationData={FactoryJson} loop={true} />
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <div >
                    <h4 className="lnd_headings ">
                      <span className="lnd_grad_txt">
                        {cmsData && cmsData?.content[13]?.heading?.split(' ')[0]}
                      </span> {cmsData && cmsData?.content[13]?.heading && cmsData?.content[13]?.heading?.split(' ').slice(1)?.join(' ')}
                    </h4>
                    <p className="desc sub_desc mt-4 ">
                      {cmsData && cmsData?.content[13]?.description}
                    </p>
                    <div className="d-flex gap-2  align-items-center mt-3 regmore_sec">
                      <Link target="_blank" to="https://humb.io/register.php" className="grad_btn">Register</Link>
                      <Link target="_blank" to="https://humb.io/bounty-faqscreen.php" className="grad_btn">Know More</Link>
                    </div>
                  </div>
                </div>

              </div>

              {/* <div className="row justify-content-center mt-2 ">
                <div className="col-lg-7">
                  <p className="desc sub_desc text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At accusam et justo duo
                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                    takimata sanctus est Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div> */}
              {/* <div className="row justify-content-center mt-5">
                <div className="col-lg-5 col-md-7 col-sm-9 col-10">

                </div>
              </div> */}

              {/* <div className="text-center mt-5">
                <button className="grad_btn mb-5">Explore</button>
              </div> */}

              <div className="row justify-content-between  higher_padBottom mt-5 mt-lg-0">
                <div className="col-lg-5 mb-5 mb-lg-0 d-flex align-items-center">
                  <div>
                    <h4 className="lnd_headings">
                      <span className="lnd_grad_txt">
                        {cmsData && cmsData?.content[14]?.heading?.split(' ')[0]}
                      </span>{cmsData && cmsData?.content[14]?.heading && cmsData?.content[14]?.heading?.split(' ').slice(1)?.join(' ')}
                    </h4>
                    <p className="desc sub_desc mt-4">
                      {cmsData && cmsData?.content[14]?.description}
                      {/* </p> */}
                      {/* <p className="desc sub_desc mt-3"> */}

                    </p>
                    <div className="d-flex gap-2 justify-content-start align-items-center mt-3 regmore_sec">
                      <Link target="_blank" to="https://humb.io/presale.php" className="grad_btn">Register Now</Link>
                      <Link target="_blank" to="https://humb.io/private-faqscreen.php" className="grad_btn">Know More</Link>
                    </div>
                  </div>
                  {/* <button className="grad_btn mt-4">Explore</button> */}
                </div>

                <div className="col-lg-6">
                  <img src={cmsData && cmsData?.content[14]?.image != "" ? cmsData?.content[14]?.image : Images.handHeart} className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home__partySec ">
          <div className="container container80">
            {/* <div className="row flex-column-reverse flex-lg-row">
              <div className="col-lg-6">
                <div className="home__factoryJson d-flex justify-content-center">
                  <Lottie animationData={DJParty} loop={true} />
                </div>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h4 className="lnd_headings">
                  <span className="lnd_grad_txt">Lorem</span>ipsum dolor sit
                  amet, consetetur
                </h4>
                <p className="desc sub_desc mt-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy
                </p>
                <p className="desc sub_desc mt-3">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
                <button className="grad_btn mt-4">Explore</button>
              </div>
            </div> */}

            <div className="row pb-3 pb-lg-5 flex-column-reverse flex-lg-row">
              <div className="col-12 col-lg-6 d-flex align-items-center mt-5 mt-lg-0">
                <div className="home__factoryJson">
                  <Lottie animationData={DJParty} loop={true} />
                </div>
              </div>
              <div className="col-12 col-lg-6  d-flex align-items-center ">
                <div>
                  <h4 className="lnd_headings">
                    <span className="lnd_grad_txt">
                      {cmsData && cmsData?.content[15]?.heading?.split(' ')[0]}
                    </span> {cmsData && cmsData?.content[15]?.heading && cmsData?.content[15]?.heading?.split(' ').slice(1)?.join(' ')}

                  </h4>
                  <p className="desc sub_desc mt-4">
                    {cmsData && cmsData?.content[15]?.description}
                  </p>
                  {/* <p className="desc sub_desc mt-4">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p> */}
                  {/* <button className="grad_btn mt-5">Explore</button> */}
                  <div className="d-flex gap-2 justify-content-start align-items-center mt-3 regmore_sec">
                    <Link target="_blank" to="https://humb.io/register.php" className="grad_btn">Register Now</Link>
                    <Link target="_blank" to="https://humb.io/public-faqscreen.php" className="grad_btn">Know More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home__bottomCardHeader  position-relative">
            <div className="medical_tablet position-absolute">
              <img src={Images.tablet} alt="tablet" className="img-fluid" />
            </div>
            <div className="medical_tablet2 position-absolute">
              <img src={Images.tablet} alt="tablet" className="img-fluid" />
            </div>

            <div className="container container80">
              <h4 className="lnd_headings home__bottomCardTitle ">
                {cmsData && cmsData?.content[16]?.heading}
              </h4>
              <p className="desc ">
                {cmsData && cmsData?.content[16]?.description}
              </p>

              <div className="d-flex gap-2 justify-content-start align-items-center mt-3 regmore_sec">
                <Link target="_blank" to="https://humb.io/register.php" className="grad_btn">Register Now</Link>
                <Link target="_blank" to="https://humb.io/ieo-faqscreen.php" className="grad_btn">Know More</Link>
              </div>
              {/* <div className="row mt-5">
                {cmsData && cmsData?.content?.map((item, index) => (
                  index == 17 || index == 18 || index == 19 ||
                    index == 20 || index == 21 || index == 22 ||
                    index == 23 || index == 24 ?
                    <div className="col-xl-3 col-lg-4  col-sm-6  mb-4">
                      <MedicalCard data={item} />
                    </div> : <></>
                ))}
              </div> */}

            </div>
          </div>
        </div>

        {/* <div className="home__footerAligner"></div> */}

        {/* end of success */}
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
