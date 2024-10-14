import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css"; // Đảm bảo rằng bạn đã thêm CSS cho bản đồ

// Thiết lập access token của bạn
mapboxgl.accessToken = "";

function App() {
  useEffect(() => {
    // Khởi tạo bản đồ khi component được mount
    const map = new mapboxgl.Map({
      container: "map", // ID của div chứa bản đồ
      style: "mapbox://styles/mapbox/streets-v11", // Phong cách bản đồ
      center: [105.8342, 21.0285], // Kinh độ và vĩ độ của điểm giữa (Hà Nội, Việt Nam)
      zoom: 10, // Mức độ zoom
    });

    // Thêm điều khiển bản đồ
    map.addControl(new mapboxgl.NavigationControl());

    // Dọn dẹp khi component unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <h1>Hiển Thị Bản Đồ Sử Dụng Mapbox</h1>
      <div id="map" style={{ width: "100%", height: "100vh" }} />{" "}
      {/* Tạo div chứa bản đồ */}
    </div>
  );
}

export default App;
