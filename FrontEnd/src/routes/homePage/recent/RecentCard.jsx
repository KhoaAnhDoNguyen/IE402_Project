// import React from "react";
// import { Link } from "react-router-dom";

// const RecentCard = ({ property }) => {
//   if (!property) return null; // Kiểm tra nếu không có dữ liệu

//   const {
//     id, // Thêm id để dùng trong đường link
//     name,
//     street,
//     price,
//     type,
//     wards: {
//       name: wardName,
//       districts: { name: districtName },
//     },
//     images,
//   } = property;

//   return (
//     <Link to={`/${id}`} className="recentCard-link">
//       {/* Đặt toàn bộ card trong Link */}
//       <div className="box shadow">
//         <div className="img">
//           <img
//             src={images?.[0]?.image_url || "default-image.jpg"} // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
//             alt={images?.[0]?.alt_text || name}
//           />
//         </div>
//         <div className="text">
//           <div className="category flex">
//             <span
//               style={{
//                 background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
//                 color: type === "For Sale" ? "#25b579" : "#ff9800",
//               }}
//             >
//               {type}
//             </span>
//             <i className="fa fa-heart"></i>
//           </div>
//           <h4>{name}</h4>
//           <p>
//             <i className="fa fa-location-dot"></i> {street}, {wardName},{" "}
//             {districtName}
//           </p>
//         </div>
//         <div className="button flex">
//           <div>
//             <button className="btn2">${price}</button>
//           </div>
//           <span>{type}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RecentCard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const RecentCard = ({ property, onAddToSaved }) => {
//   const [isLiked, setIsLiked] = useState(false); // Trạng thái trái tim

//   if (!property) return null;

//   const {
//     id,
//     name,
//     street,
//     price,
//     type,
//     wards: {
//       name: wardName,
//       districts: { name: districtName },
//     },
//     images,
//   } = property;

//   // Xử lý khi nhấn vào trái tim
//   const handleLike = (e) => {
//     e.preventDefault(); // Ngăn Link kích hoạt
//     setIsLiked(!isLiked); // Đổi trạng thái

//     if (!isLiked) {
//       onAddToSaved(property); // Thêm bài viết vào danh sách đã lưu
//     } else {
//       onRemoveFromSaved(property); // Bỏ bài viết khỏi danh sách đã lưu
//     }
//   };
//   return (
//     <Link to={`/${id}`} className="recentCard-link">
//       <div className="box shadow">
//         <div className="img">
//           <img src={images?.[0]?.image_url || "default-image.jpg"} alt={name} />
//         </div>
//         <div className="text">
//           <div className="category flex">
//             <span
//               style={{
//                 background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
//                 color: type === "For Sale" ? "#25b579" : "#ff9800",
//               }}
//             >
//               {type}
//             </span>
//             <i
//               className={`fa fa-heart ${isLiked ? "liked" : ""}`} // Thêm class 'liked'
//               onClick={handleLike}
//               style={{ color: isLiked ? "red" : "gray", cursor: "pointer" }}
//             ></i>
//           </div>
//           <h4>{name}</h4>
//           <p>
//             <i className="fa fa-location-dot"></i> {street}, {wardName},{" "}
//             {districtName}
//           </p>
//         </div>
//         <div className="button flex">
//           <div>
//             <button className="btn2">${price}</button>
//           </div>
//           <span>{type}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RecentCard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const RecentCard = ({ property, onAddToSaved, onRemoveFromSaved }) => {
//   const [isLiked, setIsLiked] = useState(false); // Trạng thái trái tim

//   if (!property) return null;

//   const {
//     id,
//     name,
//     street,
//     price,
//     type,
//     wards: {
//       name: wardName,
//       districts: { name: districtName },
//     },
//     images,
//   } = property;

//   // Xử lý khi nhấn vào trái tim
//   const handleLike = (e) => {
//     e.preventDefault(); // Ngăn Link kích hoạt
//     setIsLiked(!isLiked); // Đổi trạng thái

//     if (!isLiked) {
//       onAddToSaved(property); // Thêm bài viết vào danh sách đã lưu
//     } else {
//       onRemoveFromSaved(property); // Bỏ bài viết khỏi danh sách đã lưu
//     }
//   };

//   return (
//     <Link to={`/${id}`} className="recentCard-link">
//       <div className="box shadow">
//         <div className="img">
//           <img src={images?.[0]?.image_url || "default-image.jpg"} alt={name} />
//         </div>
//         <div className="text">
//           <div className="category flex">
//             <span
//               style={{
//                 background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
//                 color: type === "For Sale" ? "#25b579" : "#ff9800",
//               }}
//             >
//               {type}
//             </span>
//             <i
//               className={`fa fa-heart ${isLiked ? "liked" : ""}`}
//               onClick={handleLike}
//               style={{ color: isLiked ? "red" : "gray", cursor: "pointer" }}
//             ></i>
//           </div>
//           <h4>{name}</h4>
//           <p>
//             <i className="fa fa-location-dot"></i> {street}, {wardName},{" "}
//             {districtName}
//           </p>
//         </div>
//         <div className="button flex">
//           <div>
//             <button className="btn2">${price}</button>
//           </div>
//           {/* <span>{type}</span> */}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RecentCard;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const RecentCard = ({ property, isLiked, onAddToSaved, onRemoveFromSaved }) => {
  const { currentUser } = useContext(AuthContext); // Lấy thông tin user từ AuthContext
  const {
    id,
    name,
    street,
    price,
    type,
    wards: {
      name: wardName,
      districts: { name: districtName },
    },
    images,
  } = property;

  const handleLike = (e) => {
    e.preventDefault();
    if (!currentUser)
      return alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    if (isLiked) {
      onRemoveFromSaved(id);
    } else {
      onAddToSaved(id);
    }
  };

  return (
    <Link to={`/${id}`} className="recentCard-link">
      <div className="box shadow">
        <div className="img">
          <img src={images?.[0]?.image_url || "default-image.jpg"} alt={name} />
        </div>
        <div className="text">
          <div className="category flex">
            <span
              style={{
                background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
                color: type === "For Sale" ? "#25b579" : "#ff9800",
              }}
            >
              {type}
            </span>
            <i
              className={`fa fa-heart ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
              style={{ color: isLiked ? "red" : "gray", cursor: "pointer" }}
            ></i>
          </div>
          <h4>{name}</h4>
          <p>
            <i className="fa fa-location-dot"></i> {street}, {wardName},{" "}
            {districtName}
          </p>
        </div>
        <div className="button flex">
          <div>
            <button className="btn2">{price} VNĐ</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentCard;
