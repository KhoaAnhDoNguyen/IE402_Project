import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate that password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
        phone_number: phoneNumber,
        role: 'both'
        // Role is set to 'both' by default in server.js
      });
      // Update user context and store user information in local storage
      updateUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user in local storage
      // Redirect to home page on successful registration
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.error || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Tạo tài khoản</h1>
          <input 
            name="username" 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            name="phone_number" 
            type="text" 
            placeholder="Số điện thoại" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Mật khẩu" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            name="confirm_password" 
            type="password" 
            placeholder="Xác nhận mật khẩu" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button disabled={isLoading}>Đăng ký</button>
          {error && <span>{error}</span>}
          <Link to="/login">Bạn đã có tài khoản?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;