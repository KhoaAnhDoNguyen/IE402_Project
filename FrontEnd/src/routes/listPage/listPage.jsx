import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";

import { listData } from "../../lib/dummydata"; // import dữ liệu giả lập từ file dummydata

function ListPage() {
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <div>
            {listData.map((post) => (
              <Card key={post.id} item={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="mapContainer">{/* <Map items={listData} /> */}</div>
    </div>
  );
}

export default ListPage;
