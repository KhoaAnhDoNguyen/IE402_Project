import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest"; // Ensure this points to your API utility
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      // Update user context and store user information in local storage
      updateUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user in local storage

      navigate("/"); // Navigate to the home page on successful login
    } catch (err) {
      setError(err.response?.data?.error || "Login failed"); // Handle errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Chào mừng quay trở lại</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={50}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Đăng nhập</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Bạn"} chưa có tài khoản?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;