// import React from "react";
// import { list } from "../../../lib/Data";

// const RecentCard = () => {
//   return (
//     <>
//       <div className="content grid3 mtop">
//         {list.map((val, index) => {
//           const { cover, category, location, name, price, type } = val;
//           return (
//             <div className="box shadow" key={index}>
//               <div className="img">
//                 <img src={cover} alt="" />
//               </div>
//               <div className="text">
//                 <div className="category flex">
//                   <span
//                     style={{
//                       background:
//                         category === "For Sale" ? "#25b5791a" : "#ff98001a",
//                       color: category === "For Sale" ? "#25b579" : "#ff9800",
//                     }}
//                   >
//                     {category}
//                   </span>
//                   <i className="fa fa-heart"></i>
//                 </div>
//                 <h4>{name}</h4>
//                 <p>
//                   <i className="fa fa-location-dot"></i> {location}
//                 </p>
//               </div>
//               <div className="button flex">
//                 <div>
//                   <button className="btn2">{price}</button>{" "}
//                   {/* <label htmlFor="">/sqft</label> */}
//                 </div>
//                 <span>{type}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default RecentCard;

import React, { useState, useEffect } from "react";

const RecentCard = () => {
  const [properties, setProperties] = useState([]); // State để lưu dữ liệu properties
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties"); // URL API
        const data = await response.json();
        setProperties(data); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Hiển thị loading khi đang tải dữ liệu
  }

  return (
    <div className="content grid3 mtop">
      {properties.map((property, index) => {
        const {
          id,
          name,
          street,
          price,
          type,
          wards: {
            name: wardName,
            districts: { name: districtName },
          },
          images,
        } = property;

        return (
          <div className="box shadow" key={id}>
            <div className="img">
              <img
                src={images?.[0]?.image_url || "default-image.jpg"} // Hiển thị ảnh đầu tiên hoặc ảnh mặc định
                alt={images?.[0]?.alt_text || name}
              />
            </div>
            <div className="text">
              <div className="category flex">
                <span
                  style={{
                    background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
                    color: type === "For Sale" ? "#25b579" : "#ff9800",
                  }}
                >
                  {type}
                </span>
                <i className="fa fa-heart"></i>
              </div>
              <h4>{name}</h4>
              <p>
                <i className="fa fa-location-dot"></i> {street}, {wardName},{" "}
                {districtName}
              </p>
            </div>
            <div className="button flex">
              <div>
                <button className="btn2">${price}</button>
              </div>
              <span>{type}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentCard;
