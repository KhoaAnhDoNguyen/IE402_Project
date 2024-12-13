import { useState } from "react";
import "./profileUpdatePage.scss";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    // Gán dữ liệu mới vào các biến để debug (thay vì gửi lên server)
    console.log("Form data submitted:", { username, email, password, avatar });
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
              defaultValue="JohnDoe" // Giá trị mẫu để hiển thị không cần lấy từ currentUser
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue="johndoe@example.com" // Giá trị mẫu để hiển thị
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit">Cập nhật</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || "/noavatar.jpg"} alt="" className="avatar" />
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
