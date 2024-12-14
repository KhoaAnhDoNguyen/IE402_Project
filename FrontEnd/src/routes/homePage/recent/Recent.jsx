// import React from "react";
// import Heading from "../../../components/common/Heading";
// import "./recent.css";
// import RecentCard from "./RecentCard";

// const Recent = () => {
//   return (
//     <>
//       <section className="recent padding">
//         <div className="container">
//           <h1>Danh Sách Nhà Cho Thuê</h1>
//           <RecentCard />
//         </div>
//       </section>
//     </>
//   );
// };

// export default Recent;
import React, { useState } from "react";
import Heading from "../../../components/common/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";

const Recent = () => {
  const [visibleItems, setVisibleItems] = useState(3); // Số lượng phần tử hiển thị ban đầu
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở rộng (nếu true, hiển thị tất cả)

  const handleShowMore = () => {
    if (isExpanded) {
      // Nếu đã mở rộng, thu gọn về số phần tử ban đầu
      setVisibleItems(3);
    } else {
      // Nếu chưa mở rộng, hiển thị thêm phần tử
      setVisibleItems((prev) => prev + 3);
    }
    setIsExpanded((prev) => !prev); // Đổi trạng thái mở rộng
  };

  return (
    <>
      <section className="recent padding">
        <div className="container">
          <h1>Danh Sách Nhà Cho Thuê</h1>
          {/* Render các card theo số lượng phần tử hiện tại */}
          <div className="recent-cards">
            {Array.from({ length: visibleItems }).map((_, index) => (
              <RecentCard key={index} />
            ))}
          </div>
          {/* Nút Show More hoặc Collapse */}
          <div className="btn-more">
            <button className="show-more" onClick={handleShowMore}>
              {isExpanded ? "Thu Gọn" : "Hiển thị thêm"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recent;
