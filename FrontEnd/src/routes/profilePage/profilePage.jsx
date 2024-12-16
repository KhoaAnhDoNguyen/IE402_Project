// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import List from "../../components/list/List";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
// import "./profilePage.scss";

// function ProfilePage() {
//   const { currentUser } = useContext(AuthContext); // Lấy currentUser từ AuthContext
//   const [user, setUser] = useState(currentUser); // Khởi tạo state user bằng currentUser từ context
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Lấy thông tin người dùng từ localStorage nếu không có trong context
//     if (!user) {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, [user]);

//   return (
//     <div className="profilePage">
//       <div className="details">
//         <div className="wrapper">
//           <div className="title">
//             <h1>Thông tin tài khoản</h1>
//             <Link to="/profile/update">
//               <button>Cập nhật tài khoản</button>
//             </Link>
//           </div>
//           <div className="info">
//             {user ? (
//               <>
//                 <span>
//                   Ảnh đại diện:
//                   <img src={user.avatar || "/noavatar.jpg"} alt="Avatar" />
//                 </span>
//                 <span>
//                   Tên đăng nhập: <b>{user.username}</b>
//                 </span>
//                 <span>
//                   Email: <b>{user.email}</b>
//                 </span>
//                 <span>
//                   Số điện thoại: <b>{user.phone_number}</b>
//                 </span>
//                 <span>
//                   Vai trò: <b>{user.role}</b>
//                 </span>
//               </>
//             ) : (
//               <span>Đang tải thông tin người dùng...</span>
//             )}
//           </div>
//           <div className="title">
//             <h1>Danh sách của tôi</h1>
//             <Link to="/add">
//               <button>Tạo bài đăng mới</button>
//             </Link>
//           </div>
//           <List /> {/* Danh sách đã có dữ liệu tĩnh */}
//           <div className="title">
//             <h1>Danh sách đã lưu</h1>
//           </div>
//           <List /> {/* Dữ liệu tĩnh đã có trong List */}
//           <div className="title">
//             <h1>Danh sách đã thuê</h1>
//           </div>
//           <List />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import List from "../../components/list/List";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
// import "./profilePage.scss";

// function ProfilePage() {
//   const { currentUser } = useContext(AuthContext); // Lấy currentUser từ AuthContext
//   const [user, setUser] = useState(currentUser); // Khởi tạo state user bằng currentUser từ context
//   const [savedList, setSavedList] = useState([]); // State cho danh sách đã lưu
//   const [rentedList, setRentedList] = useState([]); // State cho danh sách đã thuê
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Lấy thông tin người dùng từ localStorage nếu không có trong context
//     if (!user) {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }

//     // Lấy danh sách đã lưu từ localStorage
//     const storedSavedList = JSON.parse(localStorage.getItem("savedList")) || [];
//     setSavedList(storedSavedList);

//     // Giả sử lấy danh sách đã thuê từ API hoặc localStorage
//     const storedRentedList =
//       JSON.parse(localStorage.getItem("rentedList")) || [];
//     setRentedList(storedRentedList);
//   }, [user]);

//   return (
//     <div className="profilePage">
//       <div className="details">
//         <div className="wrapper">
//           {/* Thông tin tài khoản */}
//           <div className="title">
//             <h1>Thông tin tài khoản</h1>
//             <Link to="/profile/update">
//               <button>Cập nhật tài khoản</button>
//             </Link>
//           </div>
//           <div className="info">
//             {user ? (
//               <>
//                 <span>
//                   Ảnh đại diện:
//                   <img src={user.avatar || "/noavatar.jpg"} alt="Avatar" />
//                 </span>
//                 <span>
//                   Tên đăng nhập: <b>{user.username}</b>
//                 </span>
//                 <span>
//                   Email: <b>{user.email}</b>
//                 </span>
//                 <span>
//                   Số điện thoại: <b>{user.phone_number}</b>
//                 </span>
//                 <span>
//                   Vai trò: <b>{user.role}</b>
//                 </span>
//               </>
//             ) : (
//               <span>Đang tải thông tin người dùng...</span>
//             )}
//           </div>
//           {/* Tạo bài đăng mới */}
//           <div className="title">
//             <h1>Danh sách của tôi</h1>
//             <Link to="/add">
//               <button>Tạo bài đăng mới</button>
//             </Link>
//           </div>
//           <List posts={[]} />{" "}
//           {/* Hiển thị danh sách bài đăng (tạm thời rỗng) */}
//           {/* Danh sách đã lưu */}
//           <div className="title">
//             <h1>Danh sách đã lưu</h1>
//           </div>
//           <List posts={savedList} />
//           {/* Danh sách đã thuê */}
//           <div className="title">
//             <h1>Danh sách đã thuê</h1>
//           </div>
//           <List posts={rentedList} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import "./profilePage.scss";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext); // Lấy currentUser từ AuthContext
  const [user, setUser] = useState(currentUser); // Khởi tạo state user bằng currentUser từ context
  const [savedList, setSavedList] = useState([]); // State cho danh sách đã lưu
  const [rentedList, setRentedList] = useState([]); // State cho danh sách đã thuê

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage nếu không có trong context
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    // Lấy danh sách đã lưu từ localStorage
    const storedSavedList = JSON.parse(localStorage.getItem("savedList")) || [];
    setSavedList(storedSavedList);

    // Giả sử lấy danh sách đã thuê từ API hoặc localStorage
    const storedRentedList =
      JSON.parse(localStorage.getItem("rentedList")) || [];
    setRentedList(storedRentedList);
  }, [user]);

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          {/* Thông tin tài khoản */}
          <div className="title">
            <h1>Thông tin tài khoản</h1>
            <Link to="/profile/update">
              <button>Cập nhật tài khoản</button>
            </Link>
          </div>
          <div className="info">
            {user ? (
              <>
                <span>
                  Ảnh đại diện:
                  <img src={user.avatar || "/noavatar.jpg"} alt="Avatar" />
                </span>
                <span>
                  Tên đăng nhập: <b>{user.username}</b>
                </span>
                <span>
                  Email: <b>{user.email}</b>
                </span>
                <span>
                  Số điện thoại: <b>{user.phone_number}</b>
                </span>
                <span>
                  Vai trò: <b>{user.role}</b>
                </span>
              </>
            ) : (
              <span>Đang tải thông tin người dùng...</span>
            )}
          </div>
          <div className="title">
            <h1>Danh sách của tôi</h1>{" "}
            <Link to="/add">
              <button>Tạo bài đăng mới</button>{" "}
            </Link>{" "}
          </div>
          {/* Danh sách đã lưu */}
          <div className="title">
            <h1>Danh sách đã lưu</h1>
          </div>
          <List posts={savedList} />
          {/* Danh sách đã thuê */}
          <div className="title">
            <h1>Danh sách đã thuê</h1>
          </div>
          <List posts={rentedList} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
