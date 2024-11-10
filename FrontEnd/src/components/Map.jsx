import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Import CSS cho Mapbox

// Thiết lập access token của bạn
mapboxgl.accessToken = "pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw";

function Map() {
  const [showInfo, setShowInfo] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    // Khởi tạo bản đồ khi component được mount
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106.8004, 10.8701], // Tọa độ vị trí khởi đầu (có thể thay đổi)
      zoom: 15,
    });

    // Thêm điều khiển bản đồ
    map.addControl(new mapboxgl.NavigationControl());

    // Tạo marker cho Nhà Văn Hóa Sinh Viên
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([106.8039, 10.8624]) // Tọa độ Nhà Văn Hóa Sinh Viên
      .addTo(map);

    // Sự kiện click vào marker Nhà Văn Hóa Sinh Viên
    marker.getElement().addEventListener("click", () => {
      setShowInfo(true);
    });

    setMapInstance(map);

    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.longitude, position.coords.latitude];

      // Tạo marker cho vị trí người dùng
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userLocation)
        .addTo(map);

      // Tính toán đường đi từ vị trí hiện tại đến Nhà Văn Hóa Sinh Viên
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.join(",")};106.8039,10.8624?geometries=geojson&access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          if (data.routes.length > 0) {
            const route = data.routes[0].geometry.coordinates;

            // Vẽ đường đi trên bản đồ
            map.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route,
                },
              },
            });

            // Thêm layer đường đi
            map.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#FF0000", // Màu đỏ cho đường đi
                "line-width": 5,
              },
            });

            // Tự động zoom đến đường đi
            const bounds = new mapboxgl.LngLatBounds();
            route.forEach(coord => bounds.extend(coord));
            map.fitBounds(bounds, { padding: 20 });
          } else {
            console.error("Không tìm thấy đường đi");
          }
        })
        .catch(error => console.error("Lỗi khi gọi API Directions:", error));
    }, (error) => {
      console.error("Lỗi lấy vị trí hiện tại:", error);
    });

    // Dọn dẹp khi component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1>Hiển Thị Bản Đồ Sử Dụng Mapbox</h1>
      <div id="map" style={{ width: "100%", height: "80vh" }} />
      {showInfo && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x p-3 bg-light border rounded shadow" style={{ width: "300px", zIndex: 1000 }}>
          <button className="btn-close float-end" onClick={() => setShowInfo(false)}></button>
          <h5>Nhà Văn Hóa Sinh Viên</h5>
          <p>Thuộc Làng Đại Học Quốc Gia TP.HCM</p>
          <a href="http://hvsv.edu.vn/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Thông tin chi tiết
          </a>
        </div>
      )}
    </div>
  );
}

export default Map;
