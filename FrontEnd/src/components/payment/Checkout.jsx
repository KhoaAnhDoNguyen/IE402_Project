// import React, { useState } from "react";
// import "./Checkout.scss"; // Đảm bảo bạn đã thêm file CSS phù hợp

// const Checkout = ({ onClose, monthlyPrice }) => {
//   const [rentalMonths, setRentalMonths] = useState(1); // Số tháng thuê mặc định là 1
//   const [totalPrice, setTotalPrice] = useState(monthlyPrice); // Tổng tiền ban đầu

//   // Xử lý thay đổi số tháng thuê
//   const handleRentalMonthsChange = (event) => {
//     const months = parseInt(event.target.value, 10); // Lấy giá trị từ dropdown
//     setRentalMonths(months); // Cập nhật số tháng thuê
//     setTotalPrice(months * monthlyPrice); // Tính tổng tiền
//   };

//   return (
//     <div className="checkout-modal">
//       <div className="iphone">
//         <header className="header">
//           <h1>Thanh toán</h1>
//         </header>

//         <form action="https://httpbin.org/post" className="form" method="POST">
//           <div>
//             <h2>Thông tin</h2>
//             <div className="card">
//               <address>
//                 Họ tên: Đỗ Nguyễn Anh Khoa
//                 <br />
//                 Email: 2152@gmail.com
//                 <br />
//               </address>
//             </div>
//           </div>

//           <fieldset>
//             <legend>Phương thức thanh toán</legend>
//             <div className="form__radios">
//               <div className="form__radio">
//                 <label htmlFor="visa">
//                   <div className="icon">
//                     <img
//                       src="/images/visa.png"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         objectFit: "contain",
//                       }}
//                     />
//                   </div>
//                   Visa Payment
//                 </label>
//                 <input checked id="visa" name="payment-method" type="radio" />
//               </div>
//               <div className="form__radio" style={{ marginRight: -10 }}>
//                 <label htmlFor="paypal">
//                   <div className="icon">
//                     <img
//                       src="/images/zalopay.png"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         objectFit: "contain",
//                       }}
//                     />
//                   </div>
//                   ZaloPay
//                 </label>
//                 <input id="paypal" name="payment-method" type="radio" />
//               </div>
//               <div className="form__radio" style={{ marginRight: -24 }}>
//                 <label htmlFor="mastercard">
//                   <div className="icon">
//                     <img src="/images/momo.png" />
//                   </div>
//                   MoMo
//                 </label>
//                 <input id="mastercard" name="payment-method" type="radio" />
//               </div>
//             </div>
//           </fieldset>

//           <div>
//             <div>
//               <label htmlFor="rental-months">Số tháng thuê:</label>
//               <select
//                 id="rental-months"
//                 value={rentalMonths}
//                 onChange={handleRentalMonthsChange}
//               >
//                 {[...Array(12).keys()].map((i) => (
//                   <option key={i + 1} value={i + 1}>
//                     {i + 1} tháng
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <h2>Tổng tiền</h2>

//             <table>
//               <tbody>
//                 <tr>
//                   <td>Giá tháng</td>
//                   <td align="right">${monthlyPrice.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td>Số tháng thuê</td>
//                   <td align="right">{rentalMonths} tháng</td>
//                 </tr>
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td>Tổng cộng</td>
//                   <td align="right">${totalPrice.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>

//           <div>
//             <button className="button button--full" type="submit">
//               <svg className="icon">
//                 <use xlinkHref="#icon-shopping-bag" />
//               </svg>
//               Thanh toán
//             </button>
//           </div>
//         </form>
//         <button className="close-modal" onClick={onClose}>
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate và useParams
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext để lấy currentUser
import "./Checkout.scss"; // Đảm bảo bạn đã thêm file CSS phù hợp

const Checkout = ({ onClose, monthlyPrice, propertyId }) => {
  const { currentUser } = useContext(AuthContext); // Lấy currentUser từ AuthContext
  const [rentalMonths, setRentalMonths] = useState(1); // Số tháng thuê mặc định là 1
  const [totalPrice, setTotalPrice] = useState(monthlyPrice); // Tổng tiền ban đầu
  const [paymentMethod, setPaymentMethod] = useState("visa"); // Phương thức thanh toán mặc định là Visa
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleRentalMonthsChange = (event) => {
    const months = parseInt(event.target.value, 10); // Lấy giá trị từ dropdown
    setRentalMonths(months); // Cập nhật số tháng thuê
    setTotalPrice(months * monthlyPrice); // Tính tổng tiền
  };
  console.log("id thuê", propertyId);
  const handlePayment = async () => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để thực hiện thanh toán.");
      return;
    }

    try {
      // Gửi yêu cầu thanh toán tới API
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id, // Lấy user_id từ currentUser
          property_id: propertyId, // Sử dụng propertyId từ prop
          revenue: totalPrice,
          payment_method: paymentMethod,
          rent_month: rentalMonths,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Đặt nhà thành công"); // Thông báo đặt nhà thành công
        navigate("/profile"); // Chuyển hướng đến trang profilePage
        onClose(); // Đóng modal thanh toán
      } else {
        alert("Thanh toán thất bại: " + data.message); // Thông báo lỗi thanh toán
      }
    } catch (error) {
      console.error("Lỗi xử lý thanh toán:", error);
      alert("Lỗi khi xử lý thanh toán");
    }
  };

  return (
    <div className="checkout-modal iphone">
      <header className="header">
        <h1>Thanh toán</h1>
      </header>

      <form className="form">
        <div>
          <h2>Thông tin</h2>
          <div className="card">
            <address>
              Họ tên: {currentUser?.username || "Không xác định"} <br />
              Email: {currentUser?.email || "Không xác định"} <br />
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
                    style={{ width: 27, height: 27 }}
                    src="/images/visa.png"
                    alt="Visa"
                  />
                </div>
                Visa Payment
              </label>
              <input
                checked={paymentMethod === "visa"}
                id="visa"
                name="payment-method"
                type="radio"
                onChange={() => setPaymentMethod("visa")}
              />
            </div>
            <div className="form__radio">
              <label htmlFor="Zalo">
                <div className="icon">
                  <img
                    style={{ width: 50, height: 50 }}
                    src="/images/zalopay.png"
                    alt="ZaloPay"
                  />
                </div>
                ZaloPay
              </label>
              <input
                className="paymentZalo"
                checked={paymentMethod === "Zalo"}
                id="Zalo"
                name="payment-method"
                type="radio"
                onChange={() => setPaymentMethod("Zalo")}
              />
            </div>
            <div className="form__radio">
              <label htmlFor="momo">
                <div className="icon">
                  <img src="/images/momo.png" alt="MoMo" />
                </div>
                MoMo
              </label>
              <input
                className="paymentMomo"
                checked={paymentMethod === "momo"}
                id="momo"
                name="payment-method"
                type="radio"
                onChange={() => setPaymentMethod("momo")}
              />
            </div>
          </div>
        </fieldset>

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
            <tr>
              <td>
                <strong>Tổng</strong>
              </td>
              <td align="right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="button" onClick={handlePayment}>
          Thanh toán
        </button>
      </form>

      <button className="close-modal" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Checkout;
