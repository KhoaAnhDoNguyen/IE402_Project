import "./list.scss";
import Card from "../card/Card";
import { listData } from "../../lib/dummydata"; // Import dữ liệu tĩnh

function List({ posts = listData }) {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
