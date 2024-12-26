// import { Link } from "react-router-dom";
// import "./cardrent.scss"; // Tái sử dụng CSS của Card

// function CardRent({ item }) {
//   if (!item) {
//     return null; // Nếu item undefined hoặc null, không hiển thị gì cả
//   }

//   return (
// <div className="card">
//   <Link to={`/${item.properties.id}`} className="imageContainer">
//     <img
//       src={item.properties.images?.[0]?.image_url || "/default-image.png"}
//       alt={item.properties.name || "Property"}
//     />
//   </Link>
//   <div className="textContainer">
//     <h2 className="title">
//       <Link to={`/${item.properties.id}`}>
//         {item.properties.name || "Unnamed Property"}
//       </Link>
//     </h2>
//     <p className="address">
//       <img src="/pin.png" alt="Location" />
//       <span>
//         {item.properties.street}, {item.properties.wards?.name || "Ward"},{" "}
//         {item.properties.districts?.name || "District"}
//       </span>
//     </p>
//     <p className="price">
//       {item.properties.price
//         ? `${item.properties.price.toLocaleString()} VND`
//         : "Liên hệ để biết giá"}
//     </p>
//     <p className="rent-month">
//       Tháng thuê: {item.rent_month || "Không xác định"}
//     </p>
//     <p className="revenue">
//       Tổng tiền: {item.revenue.toLocaleString()} VND
//     </p>
//   </div>
//       <div className="icons">
//         <button className="icon">
//           <img src="/bin.png" alt="Save" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CardRent;
import { Link } from "react-router-dom";
import React from "react";
import "./cardrent.scss";

function CardRent({ item, onDelete }) {
  if (!item) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/bookings/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      const result = await response.json();
      console.log(result.message);
      onDelete(item.id); // Gọi hàm onDelete để cập nhật danh sách
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.properties.id}`} className="imageContainer">
        <img
          src={item.properties.images?.[0]?.image_url || "/default-image.png"}
          alt={item.properties.name || "Property"}
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.properties.id}`}>
            {item.properties.name || "Unnamed Property"}
          </Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>
            {item.properties.street}, {item.properties.wards?.name || "Ward"},{" "}
            {item.properties.wards?.districts?.name || "District"}
          </span>
        </p>
        <p className="price">
          {item.properties.price
            ? `${item.properties.price.toLocaleString()} VND`
            : "Liên hệ để biết giá"}
        </p>
        <p className="rent-month">
          Tháng thuê: {item.rent_month || "Không xác định"}
        </p>
        <p className="revenue">
          Tổng tiền: {item.revenue.toLocaleString()} VNĐ
        </p>
      </div>
      <div className="icons">
        <button className="icon" onClick={handleDelete}>
          <img src="/bin.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default CardRent;
