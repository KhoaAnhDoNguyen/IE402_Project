// import { useState, useEffect } from "react";
// import "./profileUpdatePage.scss";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";

// function ProfileUpdatePage() {
//   const [error, setError] = useState("");
//   const [avatar, setAvatar] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role: "",
//   });
//   const [userId, setUserId] = useState(null);

//   // Lấy thông tin người dùng từ localStorage khi component được tải
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setUserData({
//         username: user.username,
//         email: user.email,
//         password: "", // Giữ password trống để người dùng nhập lại
//         phone_number: user.phone_number,
//         role: user.role,
//       });
//       setUserId(user.id); // Giả sử ID người dùng được lưu trong đối tượng "user"
//       console.log("User from localStorage:", user); // In ra thông tin người dùng từ localStorage
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { username, email, password, phone_number, role } =
//       Object.fromEntries(formData);

//     // Tạo dữ liệu cập nhật
//     const updatedData = {
//       username,
//       email,
//       password,
//       phone_number,
//       role,
//       avatar: avatar[0] || "", // Đảm bảo avatar là một đường dẫn URL
//     };

//     try {
//       if (!userId) {
//         setError("User ID không tìm thấy.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:3000/api/update/${userId}`,
//         {
//           method: "PUT", // Hoặc PATCH tùy theo cách cấu hình backend của bạn
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         // Cập nhật thành công
//         console.log("User updated successfully:", result);

//         // Cập nhật lại dữ liệu người dùng trong localStorage
//         const updatedUser = {
//           ...result.data,
//           avatar: updatedData.avatar || result.data?.avatar || "", // Nếu không có avatar thì dùng giá trị mặc định
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));

//         // Nếu có cần cập nhật trong context, gọi updateUser ở đây.
//       } else {
//         // Nếu có lỗi, hiển thị thông báo lỗi
//         setError(result.error || "Có lỗi xảy ra khi cập nhật");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       setError("Có lỗi xảy ra khi cập nhật");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="profileUpdatePage">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Cập nhật tài khoản</h1>
//           <div className="item">
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               defaultValue={userData.username} // Giá trị từ localStorage
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               defaultValue={userData.email} // Giá trị từ localStorage
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="password">Password</label>
//             <input id="password" name="password" type="password" />
//           </div>
//           <div className="item">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               defaultValue={userData.phone_number}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="role">Role</label>
//             <input
//               id="role"
//               name="role"
//               type="text"
//               defaultValue={userData.role}
//             />
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Đang cập nhật..." : "Cập nhật"}
//           </button>
//           {error && <span>{error}</span>}
//         </form>
//       </div>
//       <div className="sideContainer">
//         <img
//           src={avatar[0] || "/noavatar.jpg"}
//           alt="Avatar"
//           className="avatar"
//         />
//         <UploadWidget
//           uwConfig={{
//             cloudName: "lamadev",
//             uploadPreset: "estate",
//             multiple: false,
//             maxImageFileSize: 2000000,
//             folder: "avatars",
//           }}
//           setState={setAvatar}
//         />
//       </div>
//     </div>
//   );
// }

// export default ProfileUpdatePage;

// import { useState, useEffect } from "react";
// import "./profileUpdatePage.scss";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";

// function ProfileUpdatePage() {
//   const [error, setError] = useState("");
//   const [avatar, setAvatar] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role: "",
//   });
//   const [userId, setUserId] = useState(null);

//   // Lấy thông tin người dùng từ localStorage khi component được tải
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setUserData({
//         username: user.username,
//         email: user.email,
//         password: "", // Giữ password trống để người dùng nhập lại
//         phone_number: user.phone_number,
//         role: user.role,
//       });
//       setUserId(user.id); // Giả sử ID người dùng được lưu trong đối tượng "user"
//       setAvatar([user.avatar || ""]);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { username, email, password, phone_number, role } =
//       Object.fromEntries(formData);

//     // Tạo dữ liệu cập nhật
//     const updatedData = {
//       username,
//       email,
//       password,
//       phone_number,
//       role,
//       avatar: avatar[0] || "", // Đảm bảo avatar là một đường dẫn URL
//     };

//     try {
//       if (!userId) {
//         setError("User ID không tìm thấy.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:3000/api/update/${userId}`,
//         {
//           method: "PUT", // Hoặc PATCH tùy theo cách cấu hình backend của bạn
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         console.log("User updated successfully:", result);

//         // Cập nhật lại dữ liệu người dùng trong localStorage
//         const updatedUser = {
//           ...result.data,
//           avatar: updatedData.avatar || result.data?.avatar || "",
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));

//         // Cập nhật state để giao diện thay đổi ngay lập tức
//         setUserData({
//           username: updatedUser.username,
//           email: updatedUser.email,
//           password: "",
//           phone_number: updatedUser.phone_number,
//           role: updatedUser.role,
//         });

//         if (updatedUser.avatar) {
//           setAvatar([updatedUser.avatar]);
//         }

//         setError(""); // Xóa thông báo lỗi nếu có
//       } else {
//         setError(result.error || "Có lỗi xảy ra khi cập nhật.");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       setError("Có lỗi xảy ra khi cập nhật.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="profileUpdatePage">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Cập nhật tài khoản</h1>
//           <div className="item">
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               defaultValue={userData.username}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               defaultValue={userData.email}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="password">Password</label>
//             <input id="password" name="password" type="password" />
//           </div>
//           <div className="item">
//             <label htmlFor="phone_number">Phone Number</label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               type="text"
//               defaultValue={userData.phone_number}
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="role">Role</label>
//             <input
//               id="role"
//               name="role"
//               type="text"
//               defaultValue={userData.role}
//             />
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? "Đang cập nhật..." : "Cập nhật"}
//           </button>
//           {error && <span className="errorMessage">{error}</span>}
//         </form>
//       </div>
//       <div className="sideContainer">
//         <img
//           src={avatar[0] || "/noavatar.jpg"}
//           alt="Avatar"
//           className="avatar"
//         />
//         <UploadWidget
//           uwConfig={{
//             cloudName: "lamadev",
//             uploadPreset: "estate",
//             multiple: false,
//             maxImageFileSize: 2000000,
//             folder: "avatars",
//           }}
//           setState={setAvatar}
//         />
//       </div>
//     </div>
//   );
// }

// export default ProfileUpdatePage;

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import "./profileUpdatePage.scss";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext); // Sử dụng AuthContext
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
  });

  // Khởi tạo dữ liệu người dùng từ AuthContext
  useEffect(() => {
    if (currentUser) {
      setUserData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        phone_number: currentUser.phone_number || "",
        role: currentUser.role || "",
      });
      setAvatar([currentUser.avatar || ""]);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password, phone_number, role } =
      Object.fromEntries(formData);

    // Tạo dữ liệu cập nhật
    const updatedData = {
      username,
      email,
      password,
      phone_number,
      role,
      avatar: avatar[0] || "",
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/update/${currentUser?.id}`, // Lấy ID từ context
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("User updated successfully:", result);

        // Cập nhật thông tin người dùng thông qua AuthContext
        updateUser({ ...currentUser, ...updatedData });

        setError(""); // Xóa thông báo lỗi
      } else {
        setError(result.error || "Có lỗi xảy ra khi cập nhật.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Cập nhật tài khoản</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={userData.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={userData.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              defaultValue={userData.phone_number}
            />
          </div>
          {/* <div className="item">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              name="role"
              type="text"
              defaultValue={userData.role}
            />
          </div> */}
          <button type="submit" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
          {error && <span className="errorMessage">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || "/noavatar.jpg"}
          alt="Avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "lamadev",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
