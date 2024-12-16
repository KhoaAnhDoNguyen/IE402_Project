// export default ProfilePage;

// import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import List from "../../components/list/List";
// import { AuthContext } from "../../context/AuthContext";
// import "./profilePage.scss";

// function ProfilePage() {
//   const { currentUser } = useContext(AuthContext);
//   const [user, setUser] = useState(currentUser);
//   const [savedList, setSavedList] = useState([]);
//   const [rentedList, setRentedList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Nếu chưa có user, lấy thông tin từ localStorage
//     if (!user) {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }

//     // Lấy danh sách yêu thích từ API nếu người dùng đã đăng nhập
//     const fetchSavedList = async () => {
//       if (!user) return;

//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/favorites/${user.id}`
//         );
//         if (!response.ok) {
//           throw new Error("Không thể lấy danh sách yêu thích");
//         }
//         const data = await response.json();
//         console.log("Danh sách yêu thích:", data); // Log danh sách yêu thích
//         setSavedList(data.properties || []); // Đảm bảo data.properties là mảng
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách yêu thích:", error);
//         setError(error.message);
//       }
//     };

//     // Lấy danh sách đã thuê từ API
//     const fetchRentedList = async () => {
//       if (!user) return;

//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/bookings/${user.id}`
//         );
//         if (!response.ok) {
//           throw new Error("Không thể lấy danh sách đã thuê");
//         }
//         const data = await response.json();
//         const properties = data.properties || []; // Đảm bảo data.properties là mảng
//         console.log("Danh sách đã thuê:", data); // Log danh sách đã thuê
//         setRentedList(properties); // Lưu dữ liệu vào state
//       } catch (error) {
//         console.error("Lỗi khi lấy danh sách đã thuê:", error);
//         setError(error.message);
//       }
//     };

//     // Gọi API lấy danh sách yêu thích
//     fetchSavedList();
//     // Gọi API lấy danh sách đã thuê
//     fetchRentedList();
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

//           {/* Danh sách yêu thích */}
//           <div className="title">
//             <h1>Danh sách của tôi</h1>
//             <Link to="/add">
//               <button>Tạo bài đăng mới</button>
//             </Link>
//           </div>

//           {/* Danh sách đã lưu */}
//           <div className="title">
//             <h1>Danh sách đã lưu</h1>
//           </div>
//           {error ? (
//             <div className="error-message">{`Lỗi: ${error}`}</div>
//           ) : (
//             <List posts={savedList} />
//           )}

//           {/* Danh sách đã thuê */}
//           <div className="title">
//             <h1>Danh sách đã thuê</h1>
//           </div>
//           {error ? (
//             <div className="error-message">{`Lỗi: ${error}`}</div>
//           ) : (
//             <List posts={rentedList} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import List from "../../components/list/List";
import ListRent from "../../components/ListRent/ListRent";
import { AuthContext } from "../../context/AuthContext";
import "./profilePage.scss";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [savedList, setSavedList] = useState([]);
  const [rentedList, setRentedList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nếu chưa có user, lấy thông tin từ localStorage
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    // Lấy danh sách yêu thích từ API nếu người dùng đã đăng nhập
    const fetchSavedList = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/favorites/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách yêu thích");
        }
        const data = await response.json();
        console.log("Danh sách yêu thích:", data); // Log danh sách yêu thích
        setSavedList(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
        setError(error.message);
      }
    };

    // Gọi API danh sách đã thuê
    const fetchRentedList = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/bookings/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách đã thuê");
        }
        const data = await response.json();
        // Lọc bỏ các đối tượng có properties === null
        const filteredProperties = (data || []).filter(
          (item) => item.properties !== null
        );

        // console.log("Danh sách đã thuê:", data);
        setRentedList(filteredProperties);
        console.log(filteredProperties);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đã thuê:", error);
        setError(error.message);
      }
    };
    // Gọi API lấy danh sách yêu thích
    fetchSavedList();
    // Gọi API lấy danh sách đã thuê
    fetchRentedList();
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

          {/* Danh sách yêu thích */}
          <div className="title">
            <h1>Danh sách của tôi</h1>
            <Link to="/add">
              <button>Tạo bài đăng mới</button>
            </Link>
          </div>

          {/* Danh sách đã lưu */}
          <div className="title">
            <h1>Danh sách đã lưu</h1>
          </div>
          {error ? (
            <div className="error-message">{`Lỗi: ${error}`}</div>
          ) : (
            <List
              posts={savedList}
              onDelete={(id) =>
                setSavedList(savedList.filter((item) => item.id !== id))
              }
            />
          )}

          {/* Danh sách đã thuê */}
          <div className="title">
            <h1>Danh sách đã thuê</h1>
          </div>
          <ListRent
            posts={rentedList}
            onDelete={(id) =>
              setRentedList(rentedList.filter((item) => item.id !== id))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
