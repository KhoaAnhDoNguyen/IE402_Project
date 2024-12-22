// //Import các thành phần và thư viện cần thiết
// import "./singlePage.scss";
// import Slider from "../../components/slider/Slider";

// import DOMPurify from "dompurify";
// import { useState } from "react";
// import { singlePostData, userData } from "../../lib/dummydata"; // Sử dụng dữ liệu tĩnh
// import CommentList from "../../components/comment/CommentList";
// import Checkout from "../../components/payment/Checkout.jsx";

// function SinglePage() {
//   const post = singlePostData; // Lấy dữ liệu tĩnh từ `singlePostData`
//   const [saved, setSaved] = useState(false); // Thiết lập trạng thái ban đầu của "Save"
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//   const handleSave = () => {
//     // Thay đổi trạng thái "Save"
//     setSaved((prev) => !prev);
//   };
//   const handleRentNow = () => {
//     setIsPaymentModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsPaymentModalOpen(false);
//   };
//   // Giá trị thuê
//   const monthlyPrice = post.price;

//   return (
//     <div className="container-1">
//       <div className="singlePage">
//         <div className="details">
//           <div className="wrapper">
//             {/* Slider hiển thị các hình ảnh từ `post.images` */}
//             <Slider images={post.images} />

//             <div className="info">
//               <div className="top">
//                 <div className="post">
//                   <h1>{post.title}</h1>
//                   <div className="address">
//                     <img src="/pin.png" alt="" />
//                     <span>{post.address}</span>
//                   </div>
//                   <div className="price">$ {post.price}</div>
//                   <button className="rentNowButton" onClick={handleRentNow}>
//                     Thuê ngay
//                   </button>
//                 </div>
//                 <div className="user">
//                   <img src={userData.img} alt="" />
//                   <span>{userData.name}</span>
//                 </div>
//               </div>

//               <div
//                 className="bottom"
//                 dangerouslySetInnerHTML={{
//                   __html: DOMPurify.sanitize(post.description),
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className="features">
//           <div className="wrapper">
//             <p className="title">Tổng quan</p>
//             <div className="listVertical">
//               <div className="feature">
//                 <img src="/utility.png" alt="" />
//                 <div className="featureText">
//                   <span>Tiện ích</span>
//                   <p>Chủ sở hữu chịu trách nhiệm</p>
//                 </div>
//               </div>
//               <div className="feature">
//                 <img src="/pet.png" alt="" />
//                 <div className="featureText">
//                   <span>Vật nuôi</span>
//                   <p>Cho phép</p>
//                 </div>
//               </div>
//               {/* <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Income Policy</span>
//                 <p>Minimum income required</p>
//               </div>
//             </div> */}
//             </div>

//             <p className="title">Diện tích</p>
//             <div className="sizes">
//               <div className="size">
//                 <img src="/size.png" alt="" />
//                 <span>{post.size} m²</span>
//               </div>
//               <div className="size">
//                 <img src="/bed.png" alt="" />
//                 <span>{post.bedRooms} phòng ngủ</span>
//               </div>
//               <div className="size">
//                 <img src="/bath.png" alt="" />
//                 <span>{post.bathroom} phòng tắm</span>
//               </div>
//             </div>

//             <p className="title">Địa điểm gần đó</p>
//             <div className="listHorizontal">
//               <div className="feature">
//                 <img src="/school.png" alt="" />
//                 <div className="featureText">
//                   <span>Trường Học</span>
//                   <p>{post.school}</p>
//                 </div>
//               </div>
//               <div className="feature">
//                 <img src="/bus.png" alt="" />
//                 <div className="featureText">
//                   <span>Trạm xe bus</span>
//                   <p>{post.bus}</p>
//                 </div>
//               </div>
//               <div className="feature">
//                 <img src="/restaurant.png" alt="" />
//                 <div className="featureText">
//                   <span>Quán ăn</span>
//                   <p>{post.restaurant}</p>
//                 </div>
//               </div>
//             </div>

//             <p className="title">Địa điểm</p>
//             <div className="mapContainer">
//               {/* Hiển thị bản đồ với các vị trí */}
//               {/* <Map items={[post]} /> */}
//             </div>
//           </div>
//         </div>
//         {/* <div class="commentSection"><CommentList /></div> */}
//       </div>
//       <div class="commentSection">
//         <CommentList />
//       </div>

//       {isPaymentModalOpen && (
//         <div className="modalOverlay" onClick={handleCloseModal}>
//           <div
//             className="modalContent"
//             onClick={(e) => e.stopPropagation()} // Ngăn click lan ra ngoài
//           >
//             <Checkout onClose={handleCloseModal} monthlyPrice={monthlyPrice} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SinglePage;

////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Lấy ID từ URL
// import "./singlePage.scss";
// import Slider from "../../components/slider/Slider";
// import DOMPurify from "dompurify";
// import CommentList from "../../components/comment/CommentList";
// import Checkout from "../../components/payment/Checkout.jsx";

// function SinglePage() {
//   const { id } = useParams(); // Lấy ID từ URL
//   const [post, setPost] = useState(null); // State chứa dữ liệu bất động sản
//   const [saved, setSaved] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/properties/${id}`
//         ); // Gọi API dựa vào ID
//         const data = await response.json();
//         setPost(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching property:", error);
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   const handleSave = () => setSaved((prev) => !prev);
//   const handleRentNow = () => setIsPaymentModalOpen(true);
//   const handleCloseModal = () => setIsPaymentModalOpen(false);

//   if (loading) return <div>Đang tải...</div>; // Hiển thị loading khi chờ dữ liệu

//   return (
//     post && (
//       <div className="container-1">
//         <div className="singlePage">
//           <div className="details">
//             <div className="wrapper">
//               {/* Hiển thị hình ảnh */}
//               <Slider images={post.images?.map((img) => img.image_url)} />

//               <div className="info">
//                 <div className="top">
//                   <div className="post">
//                     <h1>{post.name}</h1>
//                     <div className="address">
//                       <img src="/pin.png" alt="Location" />
//                       <span>
//                         {post.street}, {post.wards?.name},{" "}
//                         {post.wards?.districts?.name}
//                       </span>
//                     </div>
//                     <div className="price">$ {post.price}</div>
//                     <button className="rentNowButton" onClick={handleRentNow}>
//                       Thuê ngay
//                     </button>
//                   </div>
//                   <div className="user">
//                     <img src="/user.png" alt="User" />
//                     <span>{post.created_by}</span>
//                   </div>
//                 </div>

//                 {/* Mô tả */}
//                 <div
//                   className="bottom"
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(post.description),
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Tính năng bổ sung */}
//           <div className="features">
//             <div className="wrapper">
//               <p className="title">Tổng quan</p>
//               <div className="listVertical">
//                 <div className="feature">
//                   <img src="/size.png" alt="Size" />
//                   <span>{post.square} m²</span>
//                 </div>
//                 <div className="feature">
//                   <img src="/bed.png" alt="Bedrooms" />
//                   <span>{post.bedroom} phòng ngủ</span>
//                 </div>
//                 <div className="feature">
//                   <img src="/bath.png" alt="Bathrooms" />
//                   <span>{post.bathroom} phòng tắm</span>
//                 </div>
//               </div>

//               <p className="title">Địa điểm gần đó</p>
//               <div className="listHorizontal">
//                 <div className="feature">
//                   <img src="/school.png" alt="School" />
//                   <span>Trường học: {post.distance_school} km</span>
//                 </div>
//                 <div className="feature">
//                   <img src="/bus.png" alt="Bus Stop" />
//                   <span>Trạm xe bus: {post.distance_bus} km</span>
//                 </div>
//                 <div className="feature">
//                   <img src="/restaurant.png" alt="Restaurant" />
//                   <span>Quán ăn: {post.distance_food} km</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="commentSection">
//             <CommentList />
//           </div>
//         </div>

//         {isPaymentModalOpen && (
//           <div className="modalOverlay" onClick={handleCloseModal}>
//             <div className="modalContent" onClick={(e) => e.stopPropagation()}>
//               <Checkout onClose={handleCloseModal} monthlyPrice={post.price} />
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default SinglePage;

import { useParams } from "react-router-dom"; // Import useParams
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { userData } from "../../lib/dummydata"; // Dữ liệu tĩnh
import CommentList from "../../components/comment/CommentList";
import Checkout from "../../components/payment/Checkout.jsx";

function SinglePage() {
  const { id } = useParams(); // Lấy postId từ URL params
  const [post, setPost] = useState(null); // State lưu thông tin bài viết
  const [saved, setSaved] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Gọi API từ server hoặc theo cách tương tự như Recent
        const response = await fetch(
          `http://localhost:3000/api/properties/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched post data:", data);

        // Cập nhật state post
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost(); // Gọi API để lấy thông tin bài viết theo ID
  }, [id]);

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  const handleRentNow = () => {
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  if (!post) return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải

  const monthlyPrice = post.price;

  return (
    <div className="container-1">
      <div className="singlePage">
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images || []} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.name}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>
                      {post.street}, {post.wards?.name || "Ward"},{" "}
                      {post.wards?.districts?.name || "District"}
                    </span>
                  </div>
                  <div className="price">${post.price}</div>
                  <button className="rentNowButton" onClick={handleRentNow}>
                    Thuê ngay
                  </button>
                </div>
                {/* <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                </div> */}
              </div>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description),
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="features">
          <div className="wrapper">
            <p className="title">Tổng quan</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Tiện ích</span>
                  <p>Chủ sở hữu chịu trách nhiệm</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Vật nuôi</span>
                  <p>Cho phép</p>
                </div>
              </div>
            </div>

            <p className="title">Diện tích</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.square} </span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} phòng ngủ</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} phòng tắm</span>
              </div>
            </div>

            <p className="title">Địa điểm gần đó</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>Trường Học</span>
                  <p>{post.distance_school}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Trạm xe bus</span>
                  <p>{post.distance_bus}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="featureText">
                  <span>Quán ăn</span>
                  <p>{post.distance_food}</p>
                </div>
              </div>
            </div>

            <p className="title">Địa điểm</p>
            <div className="mapContainer">
              {/* Hiển thị bản đồ với các vị trí */}
            </div>
          </div>
        </div>

        {/* <div className="commentSection">
          <CommentList />
        </div> */}
      </div>
      <div className="commentSection">
        <CommentList propertyId={id} />
      </div>
      {isPaymentModalOpen && (
        <div className="modalOverlay" onClick={handleCloseModal}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()} // Ngăn click lan ra ngoài
          >
            <Checkout onClose={handleCloseModal} monthlyPrice={monthlyPrice} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
