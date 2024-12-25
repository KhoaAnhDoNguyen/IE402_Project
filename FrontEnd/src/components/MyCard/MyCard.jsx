import React from "react";
import "./mycard.scss";
import { Link } from "react-router-dom";

function MyCard({ item, onDelete, onUpdate }) {
  if (!item) {
    return null;
  }

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xóa bất động sản này?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/properties/${item.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Xóa bất động sản thất bại");
        }

        onDelete(item.id);
      } catch (error) {
        console.error("Lỗi khi xóa bất động sản:", error.message);
        alert("Đã xảy ra lỗi khi xóa bất động sản. Vui lòng thử lại.");
      }
    }
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return `${price.toLocaleString("vi-VN")} VND`; // Định dạng số theo tiếng Việt
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img
          src={item.images?.[0]?.image_url || "/default-image.png"}
          alt={item.name || "Property"}
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.name || "Unnamed Property"}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>
            {item.street}, {item.wards?.name || "Ward"},{" "}
            {item.wards?.districts?.name || "District"}
          </span>
        </p>
        <p className="price">{formatPrice(item.price)}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bedrooms" />
              <span>{item.bedroom || 0} phòng ngủ</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bathrooms" />
              <span>{item.bathroom || 0} phòng tắm</span>
            </div>
          </div>
          <div className="actions">
            <Link to={`/update/${item.id}`} className="update-btn">
              Cập nhật
            </Link>
            <button className="delete-btn" onClick={handleDelete}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
