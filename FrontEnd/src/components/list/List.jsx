// import React from "react";
// import "./list.scss";
// import Card from "../card/Card";

// function List({ posts = [] }) {
//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <div className="list-empty">Danh sách rỗng</div>;
//   }

//   return (
//     <div className="list">
//       {posts.map((item) => (
//         <Card key={item?.id || Math.random()} item={item || {}} />
//       ))}
//     </div>
//   );
// }

// export default List;
import React from "react";
import "./list.scss";
import Card from "../card/Card";

function List({ posts = [], onDelete }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="list-empty">Danh sách rỗng</div>;
  }

  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item?.id || Math.random()} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default List;
