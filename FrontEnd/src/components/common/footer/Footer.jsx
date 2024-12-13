import React from "react";
// import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <div className="logo-text">
                <img src="../favicon.png" alt="" />
                <span className="renthome">RentHouse</span>
              </div>
              <p>
                Mang đến giải pháp thuê nhà nhanh chóng, tiện lợi với đa dạng
                lựa chọn từ căn hộ, nhà riêng đến phòng trọ. Giao diện thân
                thiện, tính năng tìm kiếm thông minh, cùng bộ lọc chi tiết giúp
                dễ dàng tìm được nơi ở lý tưởng theo nhu cầu cá nhân. Cam kết
                dịch vụ chuyên nghiệp, hỗ trợ tận tâm, mang đến trải nghiệm thuê
                nhà an toàn, đơn giản. Truy cập ngay để khám phá hàng ngàn bất
                động sản mới nhất và lựa chọn không gian sống phù hợp!
              </p>

              {/* <div className="input flex">
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
              </div> */}
            </div>
          </div>

          {/* {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>
      </footer>
      <div className="legal">
        <span>© 2024 RentHouse.</span>
      </div>
    </>
  );
};

export default Footer;
