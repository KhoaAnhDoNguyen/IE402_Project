// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";
// import Card from "../../components/card/Card";

// import { listData } from "../../lib/dummydata"; // import dữ liệu giả lập từ file dummydata

// function ListPage() {
//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           <div>
//             {listData.map((post) => (
//               <Card key={post.id} item={post} />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mapContainer">{/* <Map items={listData} /> */}</div>
//     </div>
//   );
// }

// export default ListPage;

// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";
// import Card from "../../components/card/Card";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// function ListPage() {
//   const [listData, setListData] = useState([]);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const districtId = searchParams.get("districtId") || "";
//       const type = searchParams.get("type") || "";
//       const minPrice = searchParams.get("minPrice") || "";
//       const maxPrice = searchParams.get("maxPrice") || "";

//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/properties/filter?districtId=${districtId}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}`
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setListData(data);
//         } else {
//           console.error("Error fetching properties:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           <div>
//             {listData.length > 0 ? (
//               listData.map((post) => <Card key={post.id} item={post} />)
//             ) : (
//               <p>Không tìm thấy kết quả phù hợp.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mapContainer">{/* Khu vực hiển thị bản đồ */}</div>
//     </div>
//   );
// }

// export default ListPage;

// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";
// import Card from "../../components/card/Card";
// import { useLocation, useSearchParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// function ListPage() {
//   const [listData, setListData] = useState([]);
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const districtId = searchParams.get("districtId") || "";
//       const type = searchParams.get("type") || "";
//       const minPrice = searchParams.get("minPrice") || "";
//       const maxPrice = searchParams.get("maxPrice") || "";

//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/properties/filter?districtId=${districtId}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}`
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setListData(data);
//         } else {
//           console.error("Error fetching properties:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     // Kiểm tra nếu có dữ liệu từ trang Hero truyền đến
//     if (location.state && location.state.properties) {
//       setListData(location.state.properties);
//     } else {
//       fetchData();
//     }
//   }, [location.state, searchParams]);

//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           <div>
//             {listData.length > 0 ? (
//               listData.map((post) => <Card key={post.id} item={post} />)
//             ) : (
//               <p>Không tìm thấy kết quả phù hợp.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mapContainer">{/* Khu vực hiển thị bản đồ */}</div>
//     </div>
//   );
// }

//export default ListPage;
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import "./listPage.scss";

function ListPage() {
  const location = useLocation();
  const initialProperties = location.state?.properties || []; // Dữ liệu từ Hero
  // const [properties, setProperties] = useState([]); // State để lưu các kết quả tìm kiếm
  const [properties, setProperties] = useState(initialProperties);
  useEffect(() => {
    if (location.state?.properties) {
      setProperties(location.state.properties);
    }
  }, [location.state]);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          {/* Truyền setProperties vào Filter */}
          <Filter setFilteredProperties={setProperties} />

          <div>
            {properties.length > 0 ? (
              properties.map((property) => (
                <Card key={property.id} item={property} />
              ))
            ) : (
              <p>Không có kết quả phù hợp.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mapContainer">{/* Khu vực hiển thị bản đồ */}</div>
    </div>
  );
}

export default ListPage;
