import React, { useContext, useEffect, useState } from "react";
import Hero from "./hero/Hero";
import Recent from "./recent/Recent";
// import "./homePage.scss";
import "../../components/common/footer/footer.css";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data from local storage
    }
  }, []);

  //console.log(user)

  return (
    <div className="homePage">
      {/* Hero Section */}
      <Hero />

      {/* Recent Properties Section */}
      <Recent />
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Bạn đang muốn tìm nhà?</h1>
              <p>
                Chúng tôi có thể giúp bạn biến ước mơ về một ngôi nhà mới thành
                hiện thực.
              </p>
              {user && <p>Xin chào, {user.username}!</p>} {/* Display username if available */}
            </div>
            <button className="btn5">Khám phá ngay</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;