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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng từ context
  const userId = currentUser?.id; // Lấy userId từ context

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

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    const selectedDistrictData = districts[selectedDistrict] || {};
    setWards(selectedDistrictData.wards || []);
    setSelectedWard(""); // Reset phường khi đổi quận
    document.getElementById("district_id").value =
      selectedDistrictData.district_id;
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value); // Cập nhật phường đã chọn
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files);
    setImages((prevImages) => [...prevImages, ...newImages]); // Kết hợp các ảnh mới với ảnh đã có
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Xóa ảnh tại chỉ mục
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Ngăn nhấn nhiều lần
    setIsSubmitting(true);

    const name = e.target.name.value;
    const price = parseFloat(e.target.price.value);
    const street = e.target.street.value;
    const latitude = parseFloat(e.target.latitude.value);
    const longitude = parseFloat(e.target.longitude.value);
    const type = e.target.property.value;
    const distanceSchool = e.target.distance_school.value;
    const distanceBus = e.target.distance_bus.value;
    const distanceFood = e.target.distance_food.value;
    const square = e.target.size.value;
    const bedroom = parseInt(e.target.bedroom.value);
    const bathroom = parseInt(e.target.bathroom.value);

    if (!name || name.trim() === "") {
      alert("Tên là bắt buộc!");
      return;
    }

    if (!images.length) {
      setError("Vui lòng tải lên ít nhất một ảnh.");
      return;
    }

    if (!userId) {
      setError("Vui lòng đăng nhập.");
      return;
    }

    const formData = new FormData(); // Sử dụng FormData để gửi dữ liệu
    formData.append("name", name);
    formData.append("price", price);
    formData.append("street", street);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("type", type);
    formData.append("description", value);
    formData.append("availability", true);
    formData.append("district_id", districts[selectedDistrict]?.district_id);
    formData.append("ward_id", parseInt(selectedWard));
    formData.append("distance_school", distanceSchool);
    formData.append("distance_bus", distanceBus);
    formData.append("distance_food", distanceFood);
    formData.append("square", square);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    images.forEach((image) => {
      formData.append("images", image); // Giả sử backend yêu cầu tên trường là "images"
    });

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
        `http://localhost:3000/api/properties/${userId}`,
        formData
      );

      setSuccessMessage("Bài đăng đã được tạo thành công!");
      //navigate(`/${res.data.id}`); // Chuyển hướng đến trang chi tiết bất động sản vừa tạo
    } catch (err) {
      let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";

      if (err.response) {
        console.error("Error response:", err.response.data);
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        console.error("No response received:", err.request);
        errorMessage =
          "Không nhận được phản hồi từ server. Vui lòng thử lại sau.";
      } else {
        console.error("Error message:", err.message);
        errorMessage = `Lỗi không xác định: ${err.message}`;
      }

      setError(errorMessage);
    } finally {
    setIsSubmitting(false); // Reset trạng thái
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
                {wards.map((ward) => (
                  <option key={ward.ward_id} value={ward.ward_id}>
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
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="remove-button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
