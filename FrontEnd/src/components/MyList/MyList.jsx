import React from "react";
import "./myList.scss"; // Tạo file CSS riêng nếu cần tùy chỉnh giao diện
import MyCard from "../MyCard/MyCard";

function MyList({ posts = [], onDelete }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="myList-empty">Danh sách của bạn đang trống</div>;
  }

  return (
    <div className="myList">
      {posts.map((item) => (
        <MyCard
          key={item?.id || Math.random()}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MyList;
