// import { Link } from "react-router-dom";
// import "./card.scss";

// function Card({ item }) {
//   if (!item) {
//     return null; // Nếu item undefined hoặc null, không hiển thị gì cả
//   }
//   console.log("save", item.id);
//   return (
//     <div className="card">
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
//           {item.price ? `$ ${item.price}` : "Contact for Price"}
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
//             <button className="icon">
//               <img src="/save.png" alt="Save" />
//             </button>
//             {/* <button className="icon">
//               <img src="/chat.png" alt="Chat" />
//             </button> */}
//           </div>
//         </div>
//         ;
//       </div>
//     </div>
//   );
// }

// export default Card;

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Đường dẫn tới AuthContext
import "./card.scss";

function Card({ item, onDelete }) {
  const { currentUser } = useContext(AuthContext); // Lấy thông tin user từ AuthContext

  if (!item) {
    return null; // Không hiển thị gì nếu item undefined/null
  }
  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return `${price.toLocaleString("vi-VN")} VNĐ`; // Định dạng số theo tiếng Việt
  };
  const handleRemoveFavorite = async () => {
    try {
      if (!currentUser || !currentUser.id) {
        alert("Bạn cần đăng nhập để thực hiện thao tác này.");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id, // Lấy userId từ AuthContext
          propertyId: item.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove favorite");
      }

      const result = await response.json();
      console.log(result.message);
      onDelete(item.id); // Gọi hàm onDelete để cập nhật danh sách
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Không thể xóa mục yêu thích. Vui lòng thử lại sau.");
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
          {item.price ? formatPrice(item.price) : "Contact for Price"}
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
            <button
              className="icon"
              onClick={handleRemoveFavorite}
              title="Xóa khỏi yêu thích"
            >
              <img src="/save.png" alt="Remove from Favorites" />
            </button>
            {/* <button className="icon">
              <img src="/chat.png" alt="Chat" />
            </button> */}
          </div>
        </div>
        ;
      </div>
    </div>
  );
}

export default Card;
