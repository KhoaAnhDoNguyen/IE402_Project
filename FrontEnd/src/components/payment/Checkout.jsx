import React, { useState } from "react";
import "./Checkout.scss"; // Đảm bảo bạn đã thêm file CSS phù hợp

const Checkout = ({ onClose, monthlyPrice }) => {
  const [rentalMonths, setRentalMonths] = useState(1); // Số tháng thuê mặc định là 1
  const [totalPrice, setTotalPrice] = useState(monthlyPrice); // Tổng tiền ban đầu

  // Xử lý thay đổi số tháng thuê
  const handleRentalMonthsChange = (event) => {
    const months = parseInt(event.target.value, 10); // Lấy giá trị từ dropdown
    setRentalMonths(months); // Cập nhật số tháng thuê
    setTotalPrice(months * monthlyPrice); // Tính tổng tiền
  };

  return (
    <div className="checkout-modal">
      <div className="iphone">
        <header className="header">
          <h1>Thanh toán</h1>
        </header>

        <form action="https://httpbin.org/post" className="form" method="POST">
          <div>
            <h2>Thông tin</h2>
            <div className="card">
              <address>
                Họ tên: Đỗ Nguyễn Anh Khoa
                <br />
                Email: 2152@gmail.com
                <br />
              </address>
            </div>
          </div>

          <fieldset>
            <legend>Phương thức thanh toán</legend>
            <div className="form__radios">
              <div className="form__radio">
                <label htmlFor="visa">
                  <div className="icon">
                    <img
                      src="/images/visa.png"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  Visa Payment
                </label>
                <input checked id="visa" name="payment-method" type="radio" />
              </div>
              <div className="form__radio" style={{ marginRight: -10 }}>
                <label htmlFor="paypal">
                  <div className="icon">
                    <img
                      src="/images/zalopay.png"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  ZaloPay
                </label>
                <input id="paypal" name="payment-method" type="radio" />
              </div>
              <div className="form__radio" style={{ marginRight: -24 }}>
                <label htmlFor="mastercard">
                  <div className="icon">
                    <img src="/images/momo.png" />
                  </div>
                  MoMo
                </label>
                <input id="mastercard" name="payment-method" type="radio" />
              </div>
            </div>
          </fieldset>

          <div>
            <div>
              <label htmlFor="rental-months">Số tháng thuê:</label>
              <select
                id="rental-months"
                value={rentalMonths}
                onChange={handleRentalMonthsChange}
              >
                {[...Array(12).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} tháng
                  </option>
                ))}
              </select>
            </div>
            <h2>Tổng tiền</h2>

            <table>
              <tbody>
                <tr>
                  <td>Giá tháng</td>
                  <td align="right">${monthlyPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Số tháng thuê</td>
                  <td align="right">{rentalMonths} tháng</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Tổng cộng</td>
                  <td align="right">${totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div>
            <button className="button button--full" type="submit">
              <svg className="icon">
                <use xlinkHref="#icon-shopping-bag" />
              </svg>
              Thanh toán
            </button>
          </div>
        </form>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Checkout;
