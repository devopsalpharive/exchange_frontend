import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

import LaunchpadFooter from "../Layout/LaunchpadFooter";

const StakeTermsConditions = (props) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <div>
      <Header props={props} />
      <section className="custom_section ">
        <div className="container container80 py-5">
          <h4 className="lnd_headings lnd_gradient">
            Staking Terms and Conditions
          </h4>
          <h5 className="mt-4 fw-bold">1. Definitions</h5>
          <p className="desc mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus sed quam, exercitationem maxime iste ratione atque
            est eligendi nisi sint, voluptate rem a quisquam neque blanditiis!
            Error, pariatur ex. Quas voluptas soluta eos, perspiciatis
            distinctio minus consequatur eaque asperiores ex commodi maxime
            pariatur error illo iusto. Iure vel consequuntur ab.
          </p>{" "}
          <h5 className="mt-4 fw-bold">2. Operations</h5>
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
          <h5 className="mt-4 fw-bold">3. Definitions</h5>
          <p className="desc mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus sed quam, exercitationem maxime iste ratione atque
            est eligendi nisi sint, voluptate rem a quisquam neque blanditiis!

            Error, pariatur ex. Quas voluptas soluta eos, perspiciatis
            distinctio minus consequatur eaque asperiores ex commodi maxime
            pariatur error illo iusto. Iure vel consequuntur ab.
          </p>{" "}
          <h5 className="mt-4 fw-bold">4 Operations</h5>
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StakeTermsConditions;
