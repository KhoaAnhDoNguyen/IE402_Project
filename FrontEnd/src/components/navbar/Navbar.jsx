import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext); // Lấy currentUser và updateUser
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa dữ liệu người dùng khỏi local storage
    updateUser(null); // Cập nhật AuthContext về trạng thái không có người dùng
    navigate("/"); // Điều hướng đến trang chính
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/favicon.png" alt="" />
          <span>RentHouse</span>
        </Link>
      </div>
      <div className="right">
        {currentUser ? ( // Sử dụng currentUser từ AuthContext
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt="User Avatar"
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Tài khoản</span>
            </Link>
            <button onClick={handleLogout}>Đăng xuất</button>{" "}
            {/* Nút đăng xuất */}
          </div>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register" className="register">
              Đăng ký
            </Link>
          </>
        )}
        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <img src="/menu.png" alt="Menu" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
