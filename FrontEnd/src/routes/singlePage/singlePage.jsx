// Import các thành phần và thư viện cần thiết
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";

import DOMPurify from "dompurify";
import { useState } from "react";
import { singlePostData, userData } from "../../lib/dummydata"; // Sử dụng dữ liệu tĩnh
import CommentList from "../../components/comment/CommentList";

function SinglePage() {
  const post = singlePostData; // Lấy dữ liệu tĩnh từ `singlePostData`
  const [saved, setSaved] = useState(false); // Thiết lập trạng thái ban đầu của "Save"

  const handleSave = () => {
    // Thay đổi trạng thái "Save"
    setSaved((prev) => !prev);
  };

  return (
    <div className="container-1">
      <div className="singlePage">
        <div className="details">
          <div className="wrapper">
            {/* Slider hiển thị các hình ảnh từ `post.images` */}
            <Slider images={post.images} />

            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{post.address}</span>
                  </div>
                  <div className="price">$ {post.price}</div>
                  <button className="rentNowButton">Thuê ngay</button>
                </div>
                <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                </div>
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
            <p className="title">General</p>
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
              {/* <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>Minimum income required</p>
              </div>
            </div> */}
            </div>

            <p className="title">Diện tích</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.size} m²</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedRooms} phòng ngủ</span>
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
                  <p>{post.school}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Trạm xe bus</span>
                  <p>{post.bus}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="featureText">
                  <span>Quán ăn</span>
                  <p>{post.restaurant}</p>
                </div>
              </div>
            </div>

            <p className="title">Địa điểm</p>
            <div className="mapContainer">
              {/* Hiển thị bản đồ với các vị trí */}
              {/* <Map items={[post]} /> */}
            </div>

            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" />
                Gửi tin nhắn
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: saved ? "#fece51" : "white",
                }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          </div>
        </div>
        {/* <div class="commentSection"><CommentList /></div> */}
      </div>
      <div class="commentSection">
        <CommentList />
      </div>
    </div>
  );
}

export default SinglePage;
