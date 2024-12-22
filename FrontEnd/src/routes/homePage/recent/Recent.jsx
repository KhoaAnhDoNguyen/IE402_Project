// import React, { useState, useEffect } from "react";
// import "./recent.css";
// import RecentCard from "./RecentCard";

// const Recent = () => {
//   const [properties, setProperties] = useState([]); // Dữ liệu từ API
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const itemsPerPage = 3; // Số card mỗi trang

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/properties"); // Fetch từ API

//         const data = await response.json();
//         console.log("Dữ liệu trả về từ API:", data); // In dữ liệu ra console
//         setProperties(data); // Cập nhật state với dữ liệu từ API
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Tính toán các card hiển thị cho trang hiện tại
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = properties.slice(startIndex, endIndex);

//   // Xử lý điều hướng trang
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (endIndex < properties.length) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <section className="recent padding">
//       <div className="container">
//         <h1>Danh Sách Nhà Cho Thuê</h1>
//         {/* Hiển thị các card của trang hiện tại */}
//         <div className="recent-cards grid3">
//           {currentItems.map((property) => (
//             <RecentCard key={property.id} property={property} />
//           ))}
//         </div>
//         {/* Nút điều hướng trang */}
//         <div className="pagination flex">
//           <button
//             className="btn-pagination"
//             onClick={handlePrevious}
//             disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu
//           >
//             Trước đó
//           </button>
//           <span>Trang {currentPage}</span>
//           <button
//             className="btn-pagination"
//             onClick={handleNext}
//             disabled={endIndex >= properties.length} // Vô hiệu hóa nếu ở trang cuối
//           >
//             Tiếp theo
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Recent;

// import React, { useState, useEffect } from "react";
// import "./recent.css";
// import RecentCard from "./RecentCard";

// const Recent = () => {
//   const [properties, setProperties] = useState([]); // Dữ liệu từ API
//   const [savedList, setSavedList] = useState(() => {
//     return JSON.parse(localStorage.getItem("savedList")) || []; // Khởi tạo danh sách đã lưu
//   });
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const itemsPerPage = 3; // Số card mỗi trang

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/properties"); // Fetch từ API
//         const data = await response.json();
//         console.log("Dữ liệu trả về từ API:", data);
//         setProperties(data);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Hàm lưu bài viết vào danh sách đã lưu
//   const handleAddToSaved = (property) => {
//     setSavedList((prev) => {
//       const updatedList = [...prev, property];
//       localStorage.setItem("savedList", JSON.stringify(updatedList));
//       return updatedList;
//     });
//   };
//   // Hàm xóa bài viết khỏi danh sách đã lưu
//   const handleRemoveFromSaved = (property) => {
//     const newSavedList = savedList.filter((item) => item.id !== property.id);
//     setSavedList(newSavedList);
//     localStorage.setItem("savedList", JSON.stringify(newSavedList));
//   };
//   // Tính toán các card hiển thị cho trang hiện tại
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = properties.slice(startIndex, endIndex);

//   // Xử lý điều hướng trang
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (endIndex < properties.length) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <section className="recent padding">
//       <div className="container">
//         <h1>Danh Sách Nhà Cho Thuê</h1>
//         {/* Hiển thị các card của trang hiện tại */}
//         <div className="recent-cards grid3">
//           {currentItems.map((property) => (
//             <RecentCard
//               key={property.id}
//               property={property}
//               onAddToSaved={handleAddToSaved}
//               onRemoveFromSaved={handleRemoveFromSaved}
//             />
//           ))}
//         </div>
//         {/* Nút điều hướng trang */}
//         <div className="pagination flex">
//           <button
//             className="btn-pagination"
//             onClick={handlePrevious}
//             disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu
//           >
//             Trước đó
//           </button>
//           <span>Trang {currentPage}</span>
//           <button
//             className="btn-pagination"
//             onClick={handleNext}
//             disabled={endIndex >= properties.length} // Vô hiệu hóa nếu ở trang cuối
//           >
//             Tiếp theo
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Recent;

import React, { useState, useEffect } from "react";
import RecentCard from "./RecentCard";
import "./recent.css";

const Recent = () => {
  const [properties, setProperties] = useState([]); // Dữ liệu từ API
  const [savedList, setSavedList] = useState(() => {
    return JSON.parse(localStorage.getItem("savedList")) || []; // Khởi tạo danh sách đã lưu từ localStorage
  });
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 3; // Số card mỗi trang

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties"); // Fetch từ API
        const data = await response.json();
        console.log("Dữ liệu trả về từ API:", data);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Hàm lưu bài viết vào danh sách đã lưu
  const handleAddToSaved = (property) => {
    setSavedList((prev) => {
      const updatedList = [...prev, property];
      localStorage.setItem("savedList", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Hàm xóa bài viết khỏi danh sách đã lưu
  const handleRemoveFromSaved = (property) => {
    const newSavedList = savedList.filter((item) => item.id !== property.id);
    setSavedList(newSavedList);
    localStorage.setItem("savedList", JSON.stringify(newSavedList));
  };

  // Tính toán các card hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = properties.slice(startIndex, endIndex);

  // Xử lý điều hướng trang
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < properties.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section className="recent padding">
      <div className="container">
        <h1>Danh Sách Nhà Cho Thuê</h1>
        {/* Hiển thị các card của trang hiện tại */}
        <div className="recent-cards grid3">
          {currentItems.map((property) => (
            <RecentCard
              key={property.id}
              property={property}
              onAddToSaved={handleAddToSaved}
              onRemoveFromSaved={handleRemoveFromSaved}
            />
          ))}
        </div>
        {/* Nút điều hướng trang */}
        <div className="pagination flex">
          <button
            className="btn-pagination"
            onClick={handlePrevious}
            disabled={currentPage === 1} // Vô hiệu hóa nếu đang ở trang đầu
          >
            Trước đó
          </button>
          <span>Trang {currentPage}</span>
          <button
            className="btn-pagination"
            onClick={handleNext}
            disabled={endIndex >= properties.length} // Vô hiệu hóa nếu ở trang cuối
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
