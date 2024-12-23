// import React from "react";
// import "./listrent.scss"; // Tái sử dụng CSS của List
// import CardRent from "../CardRent/CardRent";

// function ListRent({ posts = [] }) {
//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <div className="list-empty">Danh sách thuê trống</div>;
//   }

//   return (
//     <div className="list">
//       {posts.map((item) => (
//         <CardRent key={item?.id || Math.random()} item={item || {}} />
//       ))}
//     </div>
//   );
// }

// export default ListRent;
import React from "react";
import CardRent from "../CardRent/CardRent";
import "./listrent.scss";

function ListRent({ posts = [], onDelete }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="list-empty">Danh sách thuê trống</div>;
  }

  return (
    <div className="list">
      {posts.map((item) => (
        <CardRent key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ListRent;
