import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { userData } from "../../lib/dummydata"; // Dữ liệu tĩnh
import CommentList from "../../components/comment/CommentList";
import Checkout from "../../components/payment/Checkout.jsx";
import mapboxgl from "mapbox-gl"; // Import mapbox-gl

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw";

function SinglePage() {
  const { id } = useParams(); // Lấy postId từ URL params
  const [post, setPost] = useState(null); // State lưu thông tin bài viết
  const [saved, setSaved] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

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

  useEffect(() => {
    // Check if post and coordinates are available
    if (post && post.latitude && post.longitude) {
      // Initialize the map
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [post.longitude, post.latitude],
        zoom: 12,
        interactive: true,
      });

      // Add a marker at the post location
      new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat([post.longitude, post.latitude])
        .addTo(map);

      // Center the map on the marker initially
      map.setCenter([post.longitude, post.latitude]);

      // Cleanup function to remove the map on component unmount
      return () => {
        map.remove();
      };
    }
  }, [post]);

  if (!post) return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải

  const monthlyPrice = post.price;

  const handleDirections = () => {
    if (post && post.latitude && post.longitude) {
      navigate(`/map?lat=${post.latitude}&lng=${post.longitude}`); // Navigate to Map with lat/lng
    }
  };

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
                  <div className="price">{post.price} VNĐ</div>
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

            <p className="title">
              Địa điểm
              <button className="directionsButton" onClick={handleDirections}>
                Chỉ đường
              </button>
            </p>
            <div id="map" className="mapContainer"></div>
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
            <Checkout
              onClose={handleCloseModal}
              monthlyPrice={monthlyPrice}
              propertyId={id} // Truyền id làm prop
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePage;
