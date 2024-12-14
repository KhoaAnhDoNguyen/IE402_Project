import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummydata";

function Navbar() {
  const [open, setOpen] = useState(false);
  const currentUser = userData; // Dữ liệu tĩnh

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/favicon.png" alt="" />
          <span>RentHouse</span>
        </a>
        {/* <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.img || "/noavatar.jpg"} alt="" />
            <span>{currentUser.name}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
