import List from "../../components/list/List";
import "./profilePage.scss";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummydata"; // Dữ liệu người dùng

function ProfilePage() {
  const currentUser = userData;

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Thông tin tài khoản</h1>
            <Link to="/profile/update">
              <button>Cập nhật tài khoản</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Ảnh đại diện:
              <img src={currentUser.img || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Tên đăng nhập: <b>{currentUser.name}</b>
            </span>
            <button>Đăng xuất</button>
          </div>
          <div className="title">
            <h1>Danh sách của tôi</h1>
            <Link to="/add">
              <button>Tạo bài đăng mới</button>
            </Link>
          </div>
          <List /> {/* List đã có dữ liệu tĩnh */}
          <div className="title">
            <h1>Danh sách đã lưu</h1>
          </div>
          <List /> {/* Dữ liệu tĩnh đã có trong List */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
