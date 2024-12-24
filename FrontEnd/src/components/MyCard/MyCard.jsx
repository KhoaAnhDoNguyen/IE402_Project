// import React from "react";
// import "./mycard.scss"; // Tạo file CSS riêng nếu cần tùy chỉnh giao diện
// import { Link } from "react-router-dom";

// function MyCard({ item, onDelete }) {
//   if (!item) {
//     return null;
//   }

//   return (
//     <div className="myCard">
//       <Link to={`/${item.id}`} className="imageContainer">
//         <img
//           src={item.images?.[0]?.image_url || "/default-image.png"}
//           alt={item.name || "Property"}
//         />
//       </Link>
//       <div className="textContainer">
//         <h2 className="title">
//           <Link to={`/${item.id}`}>{item.name || "Unnamed Property"}</Link>
//         </h2>
//         <p className="address">
//           <img src="/pin.png" alt="Location" />
//           <span>
//             {item.street}, {item.wards?.name || "Ward"},{" "}
//             {item.districts?.name || "District"}
//           </span>
//         </p>
//         <p className="price">
//           {item.price ? `${item.price} VND` : "Contact for Price"}
//         </p>
//         <div className="bottom">
//           <div className="features">
//             <div className="feature">
//               <img src="/bed.png" alt="Bedrooms" />
//               <span>{item.bedroom || 0} phòng ngủ</span>
//             </div>
//             <div className="feature">
//               <img src="/bath.png" alt="Bathrooms" />
//               <span>{item.bathroom || 0} phòng tắm</span>
//             </div>
//           </div>
//           <div className="icons">
//             <button className="icon" onClick={handleDelete}>
//               <img src="/bin.png" alt="Delete" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyCard;
import React from "react";
import "./mycard.scss"; // Tạo file CSS riêng nếu cần tùy chỉnh giao diện
import { Link } from "react-router-dom";
function MyCard({ item, onDelete }) {
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

        onDelete(item.id); // Gọi callback để cập nhật danh sách
      } catch (error) {
        console.error("Lỗi khi xóa bất động sản:", error.message);
        alert("Đã xảy ra lỗi khi xóa bất động sản. Vui lòng thử lại.");
      }
    }
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
        <p className="price">
          {item.price ? `${item.price} VND` : "Contact for Price"}
        </p>
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
          <div className="icons">
            <button className="icon" onClick={handleDelete}>
              <img src="/bin.png" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
