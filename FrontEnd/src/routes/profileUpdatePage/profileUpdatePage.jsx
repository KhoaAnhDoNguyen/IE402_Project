import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "", // Keep this empty for security
        phone_number: currentUser.phone_number || "",
        role: currentUser.role || "",
      });
    }
  }, [currentUser]);

  const handleImageUpload = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Vui lòng chọn một hình ảnh hợp lệ.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password, phone_number, role } =
      Object.fromEntries(formData);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/update/${currentUser?.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        updateUser({ ...currentUser, ...result.data });
        alert("Cập nhật thành công!"); // Show alert on success
        setError("");
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
            <input
              id="password"
              name="password"
              type="password"
              placeholder="************"
            />
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
        {imagePreview && (
          <img src={imagePreview} alt="Avatar Preview" className="avatarPreview" />
        )}
      </div>
    </div>
  );
}

export default ProfileUpdatePage;