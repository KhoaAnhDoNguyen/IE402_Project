// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Heading from "../../../components/common/Heading";
// import "./hero.css";

// const Hero = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [query, setQuery] = useState({
//     districtId: searchParams.get("districtId") || "",
//     type: searchParams.get("type") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//   });

//   const navigate = useNavigate(); // Hook điều hướng

//   const handleChange = (e) => {
//     setQuery({
//       ...query,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSearch = async () => {
//     setSearchParams(query);

//     // Gửi yêu cầu API với query params
//     try {
//       const response = await fetch(
//         // `http://localhost:3000/api/properties/filter?districtId=${query.districtId}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
//         `http://localhost:3000/api/properties/filter?districtId=1&type=Nhà trọ&minPrice=1000000&maxPrice=5000000`
//       );
//       const data = await response.json();
//       console.log("Dữ liệu trả về từ API:", data);

//       // Chuyển đến ListPage và truyền kết quả qua state
//       navigate("/list", { state: { properties: data } });
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//     }
//   };

//   return (
//     <section className="hero">
//       <div className="container">
//         <Heading
//           title="Tìm Kiếm Nhà Của Bạn"
//           subtitle="Tìm bất động sản mới & nổi bật."
//         />

//         <form className="flex" onSubmit={(e) => e.preventDefault()}>
//           <div className="box">
//             <span>Thành phố/Quận</span>
//             <input
//               type="text"
//               placeholder="Địa điểm"
//               name="districtId"
//               value={query.districtId}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="box">
//             <span>Loại bất động sản</span>
//             <input
//               type="text"
//               placeholder="Loại"
//               name="type"
//               value={query.type}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="box">
//             <span>Giá tối thiểu</span>
//             <input
//               type="number"
//               placeholder="Giá thấp nhất"
//               name="minPrice"
//               value={query.minPrice}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="box">
//             <span>Giá tối đa</span>
//             <input
//               type="number"
//               placeholder="Giá cao nhất"
//               name="maxPrice"
//               value={query.maxPrice}
//               onChange={handleChange}
//             />
//           </div>
//           <button className="btn1" type="button" onClick={handleSearch}>
//             <i className="fa fa-search" style={{}}></i>
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Heading from "../../../components/common/Heading";
import "./hero.css";

const Hero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    districtId: searchParams.get("districtId") || "",
    wardId: searchParams.get("wardId") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const navigate = useNavigate();

  const districts = {
    "TP.Thủ Đức, Tp.HCM": {
      district_id: 1,
      wards: [
        { ward_id: 1, name: "Hiệp Bình Chánh" },
        { ward_id: 2, name: "Linh Tây" },
        { ward_id: 3, name: "Linh Đông" },
        { ward_id: 4, name: "Linh Trung" },
        { ward_id: 9, name: "Thảo Điền" },
        { ward_id: 10, name: "Bình Thọ" },
      ],
    },
    "Quận 9, Tp.HCM": {
      district_id: 2,
      wards: [
        { ward_id: 5, name: "Long Trường" },
        { ward_id: 6, name: "Tăng Nhơn Phú" },
        { ward_id: 7, name: "Tân Phú" },
        { ward_id: 8, name: "Phước Long B" },
        { ward_id: 11, name: "Long Thạnh Mỹ" },
      ],
    },
  };

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    setSearchParams(query);

    try {
      const response = await fetch(
        `http://localhost:3000/api/properties/filter?districtId=${query.districtId}&wardId=${query.wardId}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
      );
      const data = await response.json();
      console.log("Dữ liệu trả về từ API:", data);

      navigate("/list", { state: { properties: data } });
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <Heading
          title="Tìm Kiếm Nhà Của Bạn"
          subtitle="Tìm bất động sản mới & nổi bật."
        />

        <form className="flex" onSubmit={(e) => e.preventDefault()}>
          {/* Dropdown chọn Quận */}
          <div className="box">
            <span>Thành phố/Quận</span>
            <select
              name="districtId"
              value={query.districtId}
              onChange={handleChange}
            >
              <option value="">Chọn quận</option>
              {Object.entries(districts).map(([districtName, districtData]) => (
                <option
                  key={districtData.district_id}
                  value={districtData.district_id}
                >
                  {districtName}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown chọn Phường (dựa vào quận đã chọn) */}
          <div className="box">
            <span>Phường</span>
            <select
              name="wardId"
              value={query.wardId}
              onChange={handleChange}
              disabled={!query.districtId}
            >
              <option value="">Chọn phường</option>
              {query.districtId &&
                districts[
                  Object.keys(districts).find(
                    (key) =>
                      districts[key].district_id.toString() === query.districtId
                  )
                ]?.wards.map((ward) => (
                  <option key={ward.ward_id} value={ward.ward_id}>
                    {ward.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Dropdown chọn loại bất động sản */}
          <div className="box">
            <span>Loại bất động sản</span>
            <select name="type" value={query.type} onChange={handleChange}>
              <option value="">Chọn loại</option>
              <option value="Nhà trọ">Nhà trọ</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Chung cư mini">Chung cư mini</option>
            </select>
          </div>

          {/* Input giá tối thiểu */}
          <div className="box">
            <span>Giá tối thiểu</span>
            <input
              type="number"
              placeholder="Giá thấp nhất"
              name="minPrice"
              value={query.minPrice}
              onChange={handleChange}
            />
          </div>

          {/* Input giá tối đa */}
          <div className="box">
            <span>Giá tối đa</span>
            <input
              type="number"
              placeholder="Giá cao nhất"
              name="maxPrice"
              value={query.maxPrice}
              onChange={handleChange}
            />
          </div>

          <button className="btn1" type="button" onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
