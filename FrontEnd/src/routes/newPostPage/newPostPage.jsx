// import { useState, useContext } from "react";
// import "./newPostPage.scss";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

// function NewPostPage() {
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState("");
//   const [wards, setWards] = useState([]); // State lưu trữ các phường
//   const [selectedDistrict, setSelectedDistrict] = useState(""); // Lưu quận đã chọn
//   const [selectedWard, setSelectedWard] = useState(""); // Lưu phường đã chọn
//   const navigate = useNavigate();

//   const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng
//   const userId = currentUser?.id; // Lấy userId từ context

//   // Dữ liệu các quận và phường, với district_id và ward_id
//   const districts = {
//     "TP.Thủ Đức, Tp.HCM": {
//       district_id: 1,
//       wards: [
//         { ward_id: 1, name: "Hiệp Bình Chánh" },
//         { ward_id: 2, name: "Linh Tây" },
//         { ward_id: 3, name: "Linh Đông" },
//         { ward_id: 4, name: "Linh Trung" },
//       ],
//     },
//     "Quận 9, Tp.HCM": {
//       district_id: 2,
//       wards: [
//         { ward_id: 5, name: "Long Trường" },
//         { ward_id: 6, name: "Tăng Nhơn Phú" },
//         { ward_id: 7, name: "Tân Phú" },
//         { ward_id: 8, name: "Phước Long B" },
//       ],
//     },
//     // Thêm các quận khác tại đây
//   };

//   // Cập nhật danh sách phường khi chọn quận
//   const handleDistrictChange = (e) => {
//     const selectedDistrict = e.target.value;
//     setSelectedDistrict(selectedDistrict); // Cập nhật quận đã chọn
//     const selectedDistrictData = districts[selectedDistrict] || {};
//     setWards(selectedDistrictData.wards || []);
//     setSelectedWard(""); // Reset phường khi đổi quận
//     document.getElementById("district_id").value =
//       selectedDistrictData.district_id; // Set district_id tự động
//   };

//   // Cập nhật phường đã chọn
//   const handleWardChange = (e) => {
//     setSelectedWard(e.target.value); // Cập nhật phường đã chọn
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const inputs = Object.fromEntries(formData);

//     if (!userId) {
//       setError("Không thể xác định người dùng. Vui lòng đăng nhập lại.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/properties/${userId}`,
//         {
// name: inputs.title,
// street: inputs.address,
// latitude: parseFloat(inputs.latitude),
// longitude: parseFloat(inputs.longitude),
// type: inputs.property,
// price: parseFloat(inputs.price),
// description: value,
// availability: true, // hoặc false nếu căn hộ không còn trống
// district_id: parseInt(inputs.district_id),
// ward_id: parseInt(inputs.ward_id),
// distance_school: inputs.school, // Giữ nguyên chuỗi
// distance_bus: inputs.bus, // Giữ nguyên chuỗi
// distance_food: inputs.restaurant, // Giữ nguyên chuỗi
// square: inputs.size,
// bedroom: parseInt(inputs.bedroom),
// bathroom: parseInt(inputs.bathroom),
//         }
//       );

//       navigate(`/${res.data.data.id}`);
//     } catch (err) {
//       console.error("Error response:", err.response || err); // Log lỗi chi tiết từ server
//       setError("Đã xảy ra lỗi, vui lòng thử lại");
//     }
//   };

//   return (
//     <div className="newPostPage">
//       <div className="formContainer">
//         <h1>Thêm bài đăng mới</h1>
//         <div className="wrapper">
//           <form onSubmit={handleSubmit}>
//             <div className="item">
//               <label htmlFor="title">Tiêu đề</label>
//               <input id="title" name="title" type="text" />
//             </div>
//             <div className="item"></div>
//             <div className="item">
//               <label htmlFor="price">Giá</label>
//               <input id="price" name="price" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="address">Địa chỉ</label>
//               <input id="address" name="address" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="district_id">Quận</label>
//               <select
//                 id="district_id"
//                 name="district_id"
//                 onChange={handleDistrictChange}
//                 value={selectedDistrict} // Set giá trị quận đã chọn
//               >
//                 <option value="TP.Thủ Đức, Tp.HCM">TP.Thủ Đức, Tp.HCM</option>
//                 <option value="Quận 9, Tp.HCM">Quận 9, Tp.HCM</option>
//                 {/* Thêm các quận khác tại đây */}
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="ward_id">Phường</label>
//               <select
//                 id="ward_id"
//                 name="ward_id"
//                 value={selectedWard} // Set giá trị phường đã chọn
//                 onChange={handleWardChange}
//               >
//                 {wards.map((ward, index) => (
//                   <option key={index} value={ward.ward_id}>
//                     {ward.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="item description">
//               <label htmlFor="desc">Mô tả</label>
//               <ReactQuill theme="snow" onChange={setValue} value={value} />
//             </div>
//             <div className="item">
//               <label htmlFor="bedroom">Số phòng ngủ</label>
//               <input min={1} id="bedroom" name="bedroom" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="bathroom">Số phòng tắm</label>
//               <input min={1} id="bathroom" name="bathroom" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="latitude">Vĩ độ</label>
//               <input id="latitude" name="latitude" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="longitude">Kinh độ</label>
//               <input id="longitude" name="longitude" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="type">Loại bất động sản</label>
//               <select name="property">
//                 <option value="apartment">Nhà trọ</option>
//                 <option value="house">Căn hộ</option>
//                 <option value="condo">Chung cư mini</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="size">Diện tích (m²)</label>
//               <input min={0} id="size" name="size" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="school">Trường học</label>
//               <input min={0} id="school" name="school" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="bus">Trạm xe bus</label>
//               <input min={0} id="bus" name="bus" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="restaurant">Quán ăn</label>
//               <input min={0} id="restaurant" name="restaurant" type="text" />
//             </div>
//             <button className="sendButton">Thêm bài đăng</button>
//             {error && <span className="error">{error}</span>}
//           </form>
//         </div>
//       </div>
//       <div className="sideContainer">
//         {images.map((image, index) => (
//           <img src={image} key={index} alt="" />
//         ))}
//         <UploadWidget
//           uwConfig={{
//             multiple: true,
//             cloudName: "lamadev",
//             uploadPreset: "estate",
//             folder: "posts",
//           }}
//           setState={setImages}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;

// import { useState, useContext } from "react";
// import "./newPostPage.scss";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

// function NewPostPage() {
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState([]); // Lưu các hình ảnh đã tải lên
//   const [error, setError] = useState("");
//   const [wards, setWards] = useState([]); // State lưu trữ các phường
//   const [selectedDistrict, setSelectedDistrict] = useState(""); // Lưu quận đã chọn
//   const [selectedWard, setSelectedWard] = useState(""); // Lưu phường đã chọn
//   const navigate = useNavigate();

//   const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng
//   const userId = currentUser?.id; // Lấy userId từ context

//   // Dữ liệu các quận và phường, với district_id và ward_id
//   const districts = {
//     "TP.Thủ Đức, Tp.HCM": {
//       district_id: 1,
//       wards: [
//         { ward_id: 1, name: "Hiệp Bình Chánh" },
//         { ward_id: 2, name: "Linh Tây" },
//         { ward_id: 3, name: "Linh Đông" },
//         { ward_id: 4, name: "Linh Trung" },
//       ],
//     },
//     "Quận 9, Tp.HCM": {
//       district_id: 2,
//       wards: [
//         { ward_id: 5, name: "Long Trường" },
//         { ward_id: 6, name: "Tăng Nhơn Phú" },
//         { ward_id: 7, name: "Tân Phú" },
//         { ward_id: 8, name: "Phước Long B" },
//       ],
//     },
//     // Thêm các quận khác tại đây
//   };

//   // Cập nhật danh sách phường khi chọn quận
//   const handleDistrictChange = (e) => {
//     const selectedDistrict = e.target.value;
//     setSelectedDistrict(selectedDistrict); // Cập nhật quận đã chọn
//     const selectedDistrictData = districts[selectedDistrict] || {};
//     setWards(selectedDistrictData.wards || []);
//     setSelectedWard(""); // Reset phường khi đổi quận
//     document.getElementById("district_id").value =
//       selectedDistrictData.district_id; // Set district_id tự động
//   };

//   // Cập nhật phường đã chọn
//   const handleWardChange = (e) => {
//     setSelectedWard(e.target.value); // Cập nhật phường đã chọn
//   };

//   // Xử lý tải ảnh lên và lưu trữ các URL và mô tả
//   const handleImageUpload = async (files) => {
//     try {
//       const formData = new FormData();
//       files.forEach((file) => {
//         formData.append("file", file);
//       });
//       const response = await axios.post(
//         "http://localhost:3000/api/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // Lưu URL và mô tả của ảnh vào state
//       const uploadedImages = response.data.map((imageData) => ({
//         image_url: imageData.imageUrl,
//         alt_text: imageData.altText, // Alt text cho hình ảnh
//       }));
//       setImages((prevImages) => [...prevImages, ...uploadedImages]);
//     } catch (err) {
//       console.error("Error uploading images:", err);
//       setError("Đã xảy ra lỗi khi tải ảnh lên.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const inputs = Object.fromEntries(formData);

//     if (!userId) {
//       setError("Không thể xác định người dùng. Vui lòng đăng nhập lại.");
//       return;
//     }

// try {
// const res = await axios.post(
//   `http://localhost:3000/api/properties/${userId}`,
//   {
//     name: inputs.title,
//     street: inputs.address,
//     latitude: parseFloat(inputs.latitude),
//     longitude: parseFloat(inputs.longitude),
//     type: inputs.property,
//     price: parseFloat(inputs.price),
//     description: value,
//     availability: true, // hoặc false nếu căn hộ không còn trống
//     district_id: parseInt(inputs.district_id),
//     ward_id: parseInt(inputs.ward_id),
//     distance_school: inputs.school, // Giữ nguyên chuỗi
//     distance_bus: inputs.bus, // Giữ nguyên chuỗi
//     distance_food: inputs.restaurant, // Giữ nguyên chuỗi
//     square: inputs.size,
//     bedroom: parseInt(inputs.bedroom),
//     bathroom: parseInt(inputs.bathroom),
//     images: images.map((image) => ({
//       image_url: image.image_url,
//       alt_text: image.alt_text,
//     })), // Lưu ảnh đã tải lên và alt_text
//   }
// );
//       navigate(`/${res.data.data.id}`);
//     } catch (err) {
//       console.error("Error response:", err.response || err); // Log lỗi chi tiết từ server
//       setError("Đã xảy ra lỗi, vui lòng thử lại");
//     }
//   };

//   return (
//     <div className="newPostPage">
//       <div className="formContainer">
//         <h1>Thêm bài đăng mới</h1>
//         <div className="wrapper">
//           <form onSubmit={handleSubmit}>
//             <div className="item">
//               <label htmlFor="title">Tiêu đề</label>
//               <input id="title" name="title" type="text" />
//             </div>
//             <div className="item"></div>
//             <div className="item">
//               <label htmlFor="price">Giá</label>
//               <input id="price" name="price" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="address">Địa chỉ</label>
//               <input id="address" name="address" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="district_id">Quận</label>
//               <select
//                 id="district_id"
//                 name="district_id"
//                 onChange={handleDistrictChange}
//                 value={selectedDistrict} // Set giá trị quận đã chọn
//               >
//                 <option value="TP.Thủ Đức, Tp.HCM">TP.Thủ Đức, Tp.HCM</option>
//                 <option value="Quận 9, Tp.HCM">Quận 9, Tp.HCM</option>
//                 {/* Thêm các quận khác tại đây */}
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="ward_id">Phường</label>
//               <select
//                 id="ward_id"
//                 name="ward_id"
//                 value={selectedWard} // Set giá trị phường đã chọn
//                 onChange={handleWardChange}
//               >
//                 {wards.map((ward, index) => (
//                   <option key={index} value={ward.ward_id}>
//                     {ward.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="item description">
//               <label htmlFor="desc">Mô tả</label>
//               <ReactQuill theme="snow" onChange={setValue} value={value} />
//             </div>
//             <div className="item">
//               <label htmlFor="bedroom">Số phòng ngủ</label>
//               <input min={1} id="bedroom" name="bedroom" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="bathroom">Số phòng tắm</label>
//               <input min={1} id="bathroom" name="bathroom" type="number" />
//             </div>
// <div className="item">
//   <label htmlFor="latitude">Vĩ độ</label>
//   <input id="latitude" name="latitude" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="longitude">Kinh độ</label>
//   <input id="longitude" name="longitude" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="type">Loại bất động sản</label>
//   <select name="property">
//     <option value="apartment">Nhà trọ</option>
//     <option value="house">Căn hộ</option>
//     <option value="condo">Chung cư mini</option>
//   </select>
// </div>
// <div className="item">
//   <label htmlFor="size">Diện tích (m²)</label>
//   <input min={0} id="size" name="size" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="school">Trường học</label>
//   <input min={0} id="school" name="school" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="bus">Trạm xe bus</label>
//   <input min={0} id="bus" name="bus" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="restaurant">Quán ăn</label>
//   <input min={0} id="restaurant" name="restaurant" type="text" />
// </div>
//             <button className="sendButton">Thêm bài đăng</button>
//             {error && <span className="error">{error}</span>}
//           </form>
//         </div>
//       </div>
//       <div className="sideContainer">
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image.image_url} alt={image.alt_text} />
//             <p>{image.alt_text}</p> {/* Hiển thị mô tả hình ảnh */}
//           </div>
//         ))}
//         <input
//           type="file"
//           multiple
//           onChange={(e) => handleImageUpload(e.target.files)}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;

// import { useState, useContext } from "react";
// import "./newPostPage.scss";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

// function NewPostPage() {
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState([]); // Selected images
//   const [error, setError] = useState("");
//   const [wards, setWards] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedWard, setSelectedWard] = useState("");
//   const navigate = useNavigate();

//   const { currentUser } = useContext(AuthContext);
//   const userId = currentUser?.id;

//   // District and ward data
//   const districts = {
//     "TP.Thủ Đức, Tp.HCM": {
//       district_id: 1,
//       wards: [
//         { ward_id: 1, name: "Hiệp Bình Chánh" },
//         { ward_id: 2, name: "Linh Tây" },
//         { ward_id: 3, name: "Linh Đông" },
//         { ward_id: 4, name: "Linh Trung" },
//       ],
//     },
//     "Quận 9, Tp.HCM": {
//       district_id: 2,
//       wards: [
//         { ward_id: 5, name: "Long Trường" },
//         { ward_id: 6, name: "Tăng Nhơn Phú" },
//         { ward_id: 7, name: "Tân Phú" },
//         { ward_id: 8, name: "Phước Long B" },
//       ],
//     },
//   };

//   const handleDistrictChange = (e) => {
//     const district = e.target.value;
//     setSelectedDistrict(district);
//     setWards(districts[district]?.wards || []);
//     setSelectedWard("");
//   };

//   const handleWardChange = (e) => {
//     setSelectedWard(e.target.value);
//   };

//   const handleImageSelection = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       setError("Người dùng chưa đăng nhập. Vui lòng đăng nhập lại.");
//       return;
//     }

//     const formData = new FormData(e.target);
//     formData.append("description", value);
//     formData.append("userId", userId);

//     // Append images to the formData
//     images.forEach((image) => formData.append("images", image));

//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/properties/${userId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       navigate(`/${res.data.data.id}`);
//     } catch (err) {
//       console.error("Error:", err.response || err);
//       setError("Đã xảy ra lỗi khi tạo bài đăng.");
//     }
//   };

//   return (
//     <div className="newPostPage">
//       <div className="formContainer">
//         <h1>Thêm bài đăng mới</h1>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="item">
//             <label htmlFor="title">Tiêu đề</label>
//             <input id="title" name="name" type="text" required />
//           </div>
//           <div className="item">
//             <label htmlFor="price">Giá</label>
//             <input id="price" name="price" type="number" required />
//           </div>
//           <div className="item">
//             <label htmlFor="address">Địa chỉ</label>
//             <input id="address" name="street" type="text" required />
//           </div>
//           <div className="item">
//             <label htmlFor="district_id">Quận</label>
//             <select
//               id="district_id"
//               name="district_id"
//               onChange={handleDistrictChange}
//               value={selectedDistrict}
//               required
//             >
//               <option value="">Chọn quận</option>
//               {Object.keys(districts).map((district, index) => (
//                 <option key={index} value={district}>
//                   {district}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="item">
//             <label htmlFor="ward_id">Phường</label>
//             <select
//               id="ward_id"
//               name="ward_id"
//               onChange={handleWardChange}
//               value={selectedWard}
//               required
//             >
//               <option value="">Chọn phường</option>
//               {wards.map((ward, index) => (
//                 <option key={index} value={ward.ward_id}>
//                   {ward.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="item description">
//             <label htmlFor="desc">Mô tả</label>
//             <ReactQuill theme="snow" onChange={setValue} value={value} />
//           </div>
//           <div className="item">
//             <label htmlFor="bedroom">Số phòng ngủ</label>
//             <input id="bedroom" name="bedroom" type="number" min={1} required />
//           </div>
//           <div className="item">
//             <label htmlFor="bathroom">Số phòng tắm</label>
//             <input
//               id="bathroom"
//               name="bathroom"
//               type="number"
//               min={1}
//               required
//             />
//           </div>
// <div className="item">
//   <label htmlFor="latitude">Vĩ độ</label>
//   <input id="latitude" name="latitude" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="longitude">Kinh độ</label>
//   <input id="longitude" name="longitude" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="type">Loại bất động sản</label>
//   <select name="property">
//     <option value="apartment">Nhà trọ</option>
//     <option value="house">Căn hộ</option>
//     <option value="condo">Chung cư mini</option>
//   </select>
// </div>
// <div className="item">
//   <label htmlFor="size">Diện tích (m²)</label>
//   <input min={0} id="size" name="size" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="school">Trường học</label>
//   <input min={0} id="school" name="school" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="bus">Trạm xe bus</label>
//   <input min={0} id="bus" name="bus" type="text" />
// </div>
// <div className="item">
//   <label htmlFor="restaurant">Quán ăn</label>
//   <input min={0} id="restaurant" name="restaurant" type="text" />
// </div>
//           <div className="item">
//             <label htmlFor="images">Ảnh</label>
//             <input
//               id="images"
//               name="images"
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageSelection}
//             />
//           </div>
//           <button type="submit">Đăng bài</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;

// import { useState, useContext } from "react";
// import "./newPostPage.scss";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// function NewPostPage() {
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState("");
//   const [wards, setWards] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedWard, setSelectedWard] = useState("");
//   const navigate = useNavigate();

//   const { currentUser } = useContext(AuthContext);
//   const userId = currentUser?.id;

//   const districts = {
//     "TP.Thủ Đức, Tp.HCM": {
//       district_id: 1,
//       wards: [
//         { ward_id: 1, name: "Hiệp Bình Chánh" },
//         { ward_id: 2, name: "Linh Tây" },
//         { ward_id: 3, name: "Linh Đông" },
//         { ward_id: 4, name: "Linh Trung" },
//       ],
//     },
//     "Quận 9, Tp.HCM": {
//       district_id: 2,
//       wards: [
//         { ward_id: 5, name: "Long Trường" },
//         { ward_id: 6, name: "Tăng Nhơn Phú" },
//         { ward_id: 7, name: "Tân Phú" },
//         { ward_id: 8, name: "Phước Long B" },
//       ],
//     },
//   };

//   const handleDistrictChange = (e) => {
//     const district = e.target.value;
//     setSelectedDistrict(district);
//     setWards(districts[district]?.wards || []);
//     setSelectedWard("");
//   };

//   const handleWardChange = (e) => {
//     setSelectedWard(e.target.value);
//   };

//   const handleImageSelection = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       setError("Người dùng chưa đăng nhập. Vui lòng đăng nhập lại.");
//       return;
//     }

//     const formData = new FormData(e.target);
//     formData.append("description", value);
//     formData.append("userId", userId);

//     images.forEach((image) => formData.append("images", image));

//     try {
//       const res = await axios.post(
//         `http://localhost:3000/api/properties/${userId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       navigate(`/${res.data.data.id}`);
//     } catch (err) {
//       console.error("Error:", err.response || err);
//       setError("Đã xảy ra lỗi khi tạo bài đăng.");
//     }
//   };

//   return (
//     <div className="newPostPage">
//       <div className="formContainer">
//         <div className="wrapper">
//           <h1>Thêm bài đăng mới</h1>
//           {error && <p className="error">{error}</p>}
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="item">
//               <label htmlFor="title">Tiêu đề</label>
//               <input id="title" name="name" type="text" required />
//             </div>
//             <div className="item">
//               <label htmlFor="price">Giá</label>
//               <input id="price" name="price" type="number" required />
//             </div>
//             <div className="item">
//               <label htmlFor="address">Địa chỉ</label>
//               <input id="address" name="street" type="text" required />
//             </div>
//             <div className="item">
//               <label htmlFor="district_id">Quận</label>
//               <select
//                 id="district_id"
//                 name="district_id"
//                 onChange={handleDistrictChange}
//                 value={selectedDistrict}
//                 required
//               >
//                 <option value="">Chọn quận</option>
//                 {Object.keys(districts).map((district, index) => (
//                   <option key={index} value={district}>
//                     {district}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="ward_id">Phường</label>
//               <select
//                 id="ward_id"
//                 name="ward_id"
//                 onChange={handleWardChange}
//                 value={selectedWard}
//                 required
//               >
//                 <option value="">Chọn phường</option>
//                 {wards.map((ward, index) => (
//                   <option key={index} value={ward.ward_id}>
//                     {ward.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="item description">
//               <label htmlFor="desc">Mô tả</label>
//               <ReactQuill theme="snow" onChange={setValue} value={value} />
//             </div>
//             <div className="item">
//               <label htmlFor="bedroom">Số phòng ngủ</label>
//               <input
//                 id="bedroom"
//                 name="bedroom"
//                 type="number"
//                 min={1}
//                 required
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="bathroom">Số phòng tắm</label>
//               <input
//                 id="bathroom"
//                 name="bathroom"
//                 type="number"
//                 min={1}
//                 required
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="latitude">Vĩ độ</label>
//               <input id="latitude" name="latitude" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="longitude">Kinh độ</label>
//               <input id="longitude" name="longitude" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="type">Loại bất động sản</label>
//               <select name="property">
//                 <option value="apartment">Nhà trọ</option>
//                 <option value="house">Căn hộ</option>
//                 <option value="condo">Chung cư mini</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="size">Diện tích (m²)</label>
//               <input min={0} id="size" name="size" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="school">Trường học</label>
//               <input min={0} id="school" name="school" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="bus">Trạm xe bus</label>
//               <input min={0} id="bus" name="bus" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="restaurant">Quán ăn</label>
//               <input min={0} id="restaurant" name="restaurant" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="images">Ảnh</label>
//               <input
//                 id="images"
//                 name="images"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageSelection}
//               />
//             </div>
//             <button type="submit" className="sendButton">
//               Đăng bài
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

import { useState, useContext } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

function NewPostPage() {
  const [value, setValue] = useState(""); // Mô tả nội dung bất động sản
  const [images, setImages] = useState([]); // Hình ảnh đã tải lên
  const [error, setError] = useState(""); // Lỗi
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo thành công
  const [wards, setWards] = useState([]); // Các phường
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Quận đã chọn
  const [selectedWard, setSelectedWard] = useState(""); // Phường đã chọn
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng từ context
  const userId = currentUser?.id; // Lấy userId từ context

  // Dữ liệu các quận và phường
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

  // Cập nhật district_id và ward_id với giá trị ID thực tế
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    const selectedDistrictData = districts[selectedDistrict] || {};
    setWards(selectedDistrictData.wards || []);
    setSelectedWard(""); // Reset phường khi đổi quận
    document.getElementById("district_id").value =
      selectedDistrictData.district_id;
  };

  // Cập nhật phường đã chọn
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value); // Cập nhật phường đã chọn
  };

  const handleImageUpload = (files) => {
    // Kiểm tra nếu `files` là mảng và gán vào state `images`
    setImages(Array.from(files)); // Chuyển `files` (mảng `FileList`) thành mảng
  };

  // Chuyển latitude và longitude thành số trước khi thêm vào formData
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lấy giá trị name từ form
    const name = e.target.name.value;
    // Kiểm tra giá trị của name
    if (!name || name.trim() === "") {
      console.log("Name is required!");
      // Bạn có thể hiển thị thông báo lỗi cho người dùng ở đây
      alert("Name is required!");
      return; // Không gửi dữ liệu nếu name không hợp lệ
    }
    // Khởi tạo một đối tượng FormData
    const formData = new FormData();

    // Chuẩn hóa dữ liệu từ form và thêm vào formData
    formData.append("name", e.target.name.value);
    formData.append("street", e.target.street.value);
    formData.append("latitude", parseFloat(e.target.latitude.value));
    formData.append("longitude", parseFloat(e.target.longitude.value));
    formData.append("type", e.target.property.value);
    formData.append("price", parseFloat(e.target.price.value));
    formData.append("description", value);
    formData.append("availability", true);
    formData.append("district_id", districts[selectedDistrict]?.district_id);
    formData.append("ward_id", parseInt(e.target.ward_id.value));
    formData.append("distance_school", e.target.distance_school.value);
    formData.append("distance_bus", e.target.distance_bus.value);
    formData.append("distance_food", e.target.distance_food.value);
    formData.append("square", e.target.size.value);
    formData.append("bedroom", parseInt(e.target.bedroom.value));
    formData.append("bathroom", parseInt(e.target.bathroom.value));

    // Kiểm tra ảnh
    if (!images.length) {
      setError("Vui lòng tải lên ít nhất một ảnh.");
      return;
    }

    // Xử lý FormData cho ảnh
    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image); // Thêm mỗi ảnh vào formData
      } else {
        setError("Tệp ảnh không hợp lệ.");
        return;
      }
    });

    // Kiểm tra userId
    if (!userId) {
      setError("Vui lòng đăng nhập.");
      return;
    }

    // Kiểm tra các giá trị trong formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // In ra tên và giá trị của mỗi cặp
    }

    // Gửi request tạo bài đăng bất động sản và tải ảnh
    try {
      const res = await axios.post(
        `http://localhost:3000/api/properties/${userId}`, // Endpoint backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo gửi dữ liệu dưới dạng multipart/form-data
          },
        }
      );
      // Chuyển hướng đến trang chi tiết bất động sản vừa tạo
      // navigate(`/${res.data.id}`);
    } catch (err) {
      console.error("Error response:", err.response || err);

      // Hiển thị lỗi chi tiết
      if (err.response) {
        setError(
          `Đã xảy ra lỗi: ${err.response.data.message || "Vui lòng thử lại."}`
        );
      } else if (err.request) {
        setError("Không nhận được phản hồi từ server. Vui lòng thử lại sau.");
      } else {
        setError(`Lỗi không xác định: ${err.message}`);
      }
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Thêm bài đăng mới</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            {/* Form Inputs */}
            <div className="item">
              <label htmlFor="name">Tiêu đề</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Giá</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="street">Địa chỉ</label>
              <input id="street" name="street" type="text" />
            </div>
            <div className="item">
              <label htmlFor="district_id">Quận</label>
              <select
                id="district_id"
                name="district_id"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                required
              >
                <option value="TP.Thủ Đức, Tp.HCM">TP.Thủ Đức, Tp.HCM</option>
                <option value="Quận 9, Tp.HCM">Quận 9, Tp.HCM</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="ward_id">Phường</label>
              <select
                id="ward_id"
                name="ward_id"
                value={selectedWard}
                onChange={handleWardChange}
                required
              >
                {wards.map((ward, index) => (
                  <option key={index} value={ward.ward_id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="item description">
              <label htmlFor="desc">Mô tả</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Số phòng ngủ</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Số phòng tắm</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                required
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Vĩ độ</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Kinh độ</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Loại bất động sản</label>
              <select name="property">
                <option value="Nhà trọ">Nhà trọ</option>
                <option value="Căn hộ">Căn hộ</option>
                <option value="Chung cư mini">Chung cư mini</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="size">Diện tích (m²)</label>
              <input min={0} id="size" name="size" type="text" />
            </div>
            <div className="item">
              <label htmlFor="distance_school">Trường học</label>
              <input
                min={0}
                id="distance_school"
                name="distance_school"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="distance_bus">Trạm xe bus</label>
              <input
                min={0}
                id="distance_bus"
                name="distance_bus"
                type="text"
              />
            </div>
            <div className="item">
              <label htmlFor="distance_food">Nhà hàng</label>
              <input
                min={0}
                id="distance_food"
                name="distance_food"
                type="text"
              />
            </div>
            {/* Image Upload */}
            <div className="item">
              <label htmlFor="images">Ảnh</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button type="submit">Đăng bài</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
