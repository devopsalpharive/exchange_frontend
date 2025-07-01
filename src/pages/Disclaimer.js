import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ReactHtmlParser from 'react-html-parser';
import LaunchpadFooter from "../Layout/LaunchpadFooter";
import { getCms } from "../actions/cmsAction";

const Disclaimer = (props) => {
  const [cmsData, setCmsData] = useState("");


  const getCmsData = async () => {
    try {
      const getData = await getCms({ page: "disclaimer" });
      if (getData.status) {
        setCmsData(getData.data.data)
      }
    } catch (e) {
      console.log("getCmsData_err", e);
    }
  }

  useEffect(() => {
    getCmsData()
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Header props={props} />
      <section className="min_ht_section ">
        <div className="container container80 min_pads">
          <h4 className="lnd_headings lnd_gradient">Disclaimer</h4>
          <div className="cms_content_div">
            <p>
              {
                cmsData && cmsData.ck &&
                ReactHtmlParser(
                  cmsData.ck
                )}
            </p>

            {/* <p className="desc mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus sed quam, exercitationem maxime iste ratione atque
            est eligendi nisi sint, voluptate rem a quisquam neque blanditiis!
            Error, pariatur ex. Quas voluptas soluta eos, perspiciatis
            distinctio minus consequatur eaque asperiores ex commodi maxime
            pariatur error illo iusto. Iure vel consequuntur ab.
          </p>{" "}
          <p className="desc mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            eaque eveniet adipisci culpa. Quas, provident? Nulla cupiditate
            inventore non, exercitationem quisquam fuga animi sed quos sit
            pariatur placeat! Quos, aliquam quidem. Eum numquam sed corporis
            libero totam, adipisci eaque atque saepe unde autem doloremque,
            nesciunt officiis officia nam qui voluptatem error facilis hic?
            Obcaecati, distinctio quod. Velit, obcaecati at accusantium
            veritatis unde rerum illo ex, eveniet fugiat non voluptatem maiores
            aliquid est tempore dolorem alias nemo odio. Debitis aperiam ipsa
            delectus culpa maxime iste tenetur similique dignissimos impedit
            voluptatibus eaque aspernatur, eos dolor dolorem veritatis quos
            repellat in magni. Ratione!
          </p>{" "}
          <p className="desc mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus sed quam, exercitationem maxime iste ratione atque
            est eligendi nisi sint, voluptate rem a quisquam neque blanditiis!
            Error, pariatur ex. Quas voluptas soluta eos, perspiciatis
            distinctio minus consequatur eaque asperiores ex commodi maxime
            pariatur error illo iusto. Iure vel consequuntur ab.
          </p>{" "}
          <p className="desc mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            eaque eveniet adipisci culpa. Quas, provident? Nulla cupiditate
            inventore non, exercitationem quisquam fuga animi sed quos sit
            pariatur placeat! Quos, aliquam quidem. Eum numquam sed corporis
            libero totam, adipisci eaque atque saepe unde autem doloremque,
            nesciunt officiis officia nam qui voluptatem error facilis hic?
            Obcaecati, distinctio quod. Velit, obcaecati at accusantium
            veritatis unde rerum illo ex, eveniet fugiat non voluptatem maiores
            aliquid est tempore dolorem alias nemo odio. Debitis aperiam ipsa
            delectus culpa maxime iste tenetur similique dignissimos impedit
            voluptatibus eaque aspernatur, eos dolor dolorem veritatis quos
            repellat in magni. Ratione!
          </p>{" "} */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Disclaimer;
