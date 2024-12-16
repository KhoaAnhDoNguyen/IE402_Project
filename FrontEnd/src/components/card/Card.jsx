// import { Link } from "react-router-dom";
// import "./card.scss";

// function Card({ item }) {
//   return (
//     <div className="card">
//       <Link to={`/${item.id}`} className="imageContainer">
//         <img src={item.images[0]} alt="" />
//       </Link>
//       <div className="textContainer">
//         <h2 className="title">
//           <Link to={`/${item.id}`}>{item.name}</Link>
//         </h2>
//         <p className="address">
//           <img src="/pin.png" alt="" />
//           <span>{item.address}</span>
//         </p>
//         <p className="price">$ {item.price}</p>
//         <div className="bottom">
//           <div className="features">
//             <div className="feature">
//               <img src="/bed.png" alt="" />
//               <span>{item.bedroom} bedroom</span>
//             </div>
//             <div className="feature">
//               <img src="/bath.png" alt="" />
//               <span>{item.bathroom} bathroom</span>
//             </div>
//           </div>
//           <div className="icons">
//             <div className="icon">
//               <img src="/save.png" alt="" />
//             </div>
//             <div className="icon">
//               <img src="/chat.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;

import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img
          src={item.images?.[0]?.image_url || "/default-image.png"}
          alt={item.name || "Property"}
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.name || "Unnamed Property"}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>
            {item.street}, {item.wards?.name || "Ward"},{" "}
            {item.districts?.name || "District"}
          </span>
        </p>
        <p className="price">
          {item.price ? `$ ${item.price}` : "Contact for Price"}
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Bedrooms" />
              <span>{item.bedroom || 0} phòng ngủ</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bathrooms" />
              <span>{item.bathroom || 0} phòng tắm</span>
            </div>
          </div>
          <div className="icons">
            <button className="icon">
              <img src="/save.png" alt="Save" />
            </button>
            {/* <button className="icon">
              <img src="/chat.png" alt="Chat" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
