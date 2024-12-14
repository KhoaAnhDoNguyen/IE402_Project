import React from "react";
import Heading from "../../../components/common/Heading";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Tìm Kiếm Nhà Của Bạn "
            subtitle="Tìm bất động sản mới & nổi bật."
          />

          <form className="flex">
            <div className="box">
              <span>Thành phố/Đường</span>
              <input type="text" placeholder="Địa điểm" />
            </div>
            <div className="box">
              <span>Loại bất động sản</span>
              <input type="text" placeholder="Loại" />
            </div>
            <div className="box">
              <span>Mức giá</span>
              <input type="text" placeholder="Giá" />
            </div>
            {/* <div className="box">
              <h4>Advance Filter</h4>
            </div> */}
            <button className="btn1">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
