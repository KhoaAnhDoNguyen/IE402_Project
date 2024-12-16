// import { useState, useEffect } from "react";
// import "./filter.scss";
// import { useSearchParams } from "react-router-dom";

// function Filter({ setFilteredProperties }) {
//   // Thêm prop setFilteredProperties
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [query, setQuery] = useState({
//     type: searchParams.get("type") || "",
//     city: searchParams.get("city") || "",
//     property: searchParams.get("property") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     bedroom: searchParams.get("bedroom") || "",
//   });

//   const handleChange = (e) => {
//     setQuery({
//       ...query,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFilter = async () => {
//     setSearchParams(query);

//     // Gửi yêu cầu đến API với các tham số từ query
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/properties/filter?districtId=1&type=Nhà trọ&minPrice=1000000&maxPrice=5000000`
//       );
//       const data = await response.json();
//       setFilteredProperties(data); // Truyền kết quả về ListPage qua setFilteredProperties
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//     }
//   };

//   return (
//     <div className="filter">
//       <h1>
//         Kết quả tìm kiếm cho <b>{searchParams.get("city")}</b>
//       </h1>
//       <div className="top">
//         <div className="item">
//           <label htmlFor="city">Địa điểm</label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             placeholder="Địa điểm"
//             onChange={handleChange}
//             defaultValue={query.city}
//           />
//         </div>
//       </div>
//       <div className="bottom">
//         <div className="item">
//           <label htmlFor="property">Loại</label>
//           <select
//             name="property"
//             id="property"
//             onChange={handleChange}
//             defaultValue={query.property}
//           >
//             <option value="">Chọn</option>
//             <option value="apartment">Nhà trọ</option>
//             <option value="house">Căn hộ</option>
//             <option value="condo">Chung cư mini</option>
//           </select>
//         </div>
//         <div className="item">
//           <label htmlFor="minPrice">Giá thấp nhất</label>
//           <input
//             type="number"
//             id="minPrice"
//             name="minPrice"
//             placeholder="Chọn"
//             onChange={handleChange}
//             defaultValue={query.minPrice}
//           />
//         </div>
//         <div className="item">
//           <label htmlFor="maxPrice">Giá cao nhất</label>
//           <input
//             type="text"
//             id="maxPrice"
//             name="maxPrice"
//             placeholder="Chọn"
//             onChange={handleChange}
//             defaultValue={query.maxPrice}
//           />
//         </div>
//         <div className="item">
//           <label htmlFor="bedroom">Phòng ngủ</label>
//           <input
//             type="text"
//             id="bedroom"
//             name="bedroom"
//             placeholder="Chọn"
//             onChange={handleChange}
//             defaultValue={query.bedroom}
//           />
//         </div>
//         <button onClick={handleFilter}>
//           <img src="/search.png" alt="" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Filter;

import { useState, useEffect } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

const districts = {
  "TP.Thủ Đức, Tp.HCM": {
    district_id: 1,
    wards: [
      { ward_id: 1, name: "Hiệp Bình Chánh" },
      { ward_id: 2, name: "Linh Tây" },
      { ward_id: 3, name: "Linh Đông" },
      { ward_id: 4, name: "Linh Trung" },
    ],
  },
  "Quận 9, Tp.HCM": {
    district_id: 2,
    wards: [
      { ward_id: 5, name: "Long Trường" },
      { ward_id: 6, name: "Tăng Nhơn Phú" },
      { ward_id: 7, name: "Tân Phú" },
      { ward_id: 8, name: "Phước Long B" },
    ],
  },
};

function Filter({ setFilteredProperties }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    districtId: searchParams.get("districtId") || "",

    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [wards, setWards] = useState([]);

  // Cập nhật danh sách phường/xã khi thay đổi quận/huyện
  useEffect(() => {
    if (query.districtId) {
      const districtName = Object.keys(districts).find(
        (key) => districts[key].district_id.toString() === query.districtId
      );
      if (districtName) {
        setWards(districts[districtName].wards);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  }, [query.districtId]);

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = async () => {
    setSearchParams(query);

    try {
      const response = await fetch(
        `http://localhost:3000/api/properties/filter?districtId=${query.districtId}&wardId=${query.wardId}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
      );
      const data = await response.json();
      setFilteredProperties(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="filter">
      <h1>Kết quả tìm kiếm</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="districtId">Quận/Huyện</label>
          <select
            name="districtId"
            id="districtId"
            onChange={handleChange}
            value={query.districtId}
          >
            <option value="">Chọn quận/huyện</option>
            {Object.keys(districts).map((key) => (
              <option
                key={districts[key].district_id}
                value={districts[key].district_id}
              >
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="wardId">Phường/Xã</label>
          <select
            name="wardId"
            id="wardId"
            onChange={handleChange}
            value={query.wardId}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.ward_id} value={ward.ward_id}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Loại bất động sản</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={query.type}
          >
            <option value="">Chọn</option>
            <option value="Nhà trọ">Nhà trọ</option>
            <option value="Căn hộ">Căn hộ</option>
            <option value="Chung cư mini">Chung cư mini</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Giá thấp nhất</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Chọn"
            onChange={handleChange}
            value={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Giá cao nhất</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Chọn"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
