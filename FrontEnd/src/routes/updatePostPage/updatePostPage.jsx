import { useState, useEffect, useContext } from "react";
import "./updatePostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UpdatePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.id;

  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState([]); // New images
  const [existingImages, setExistingImages] = useState([]); // Existing images
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images marked for deletion

  const districts = {
    "TP.Thủ Đức, Tp.HCM": {
      district_id: 1,
      wards: [
        { ward_id: 1, name: "Hiệp Bình Chánh" },
        { ward_id: 2, name: "Linh Tây" },
        { ward_id: 3, name: "Linh Đông" },
        { ward_id: 4, name: "Linh Trung" },
        { ward_id: 9, name: "Thảo Điền" },
        { ward_id: 10, name: "Bình Thọ" },
      ],
    },
    "Quận 9, Tp.HCM": {
      district_id: 2,
      wards: [
        { ward_id: 5, name: "Long Trường" },
        { ward_id: 6, name: "Tăng Nhơn Phú" },
        { ward_id: 7, name: "Tân Phú" },
        { ward_id: 8, name: "Phước Long B" },
        { ward_id: 11, name: "Long Thạnh Mỹ" },
      ],
    },
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/properties/${id}`
        );
        setFormData(res.data);
        setExistingImages(res.data.images || []); // Set existing images
        setValue(res.data.description || "");
        const districtName = Object.keys(districts).find(
          (key) => districts[key].district_id === res.data.district_id
        );
        setSelectedDistrict(districtName || "");
        const ward = districts[districtName]?.wards.find(
          (w) => w.ward_id === res.data.ward_id
        );
        setSelectedWard(ward?.ward_id || "");
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Không thể tải dữ liệu bất động sản.");
      }
    };

    fetchProperty();
  }, [id]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    const selectedDistrictData = districts[selectedDistrict] || {};
    setWards(selectedDistrictData.wards || []);
    setSelectedWard(""); // Reset ward when changing district
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleImageUpload = (files) => {
    const uploadedImages = Array.from(files);
    setNewImages((prevImages) => [...prevImages, ...uploadedImages]); // Add new images
    setExistingImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = existingImages[index]; // Get the existing image
    if (imageToRemove) {
      setImagesToDelete((prev) => [...prev, imageToRemove]); // Mark for deletion
    }
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove from display
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
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

    if (!userId) {
      setError("Vui lòng đăng nhập.");
      return;
    }

    const updatedFormData = new FormData();
    imagesToDelete.forEach((image) => {
      updatedFormData.append("imagesToDelete", image.image_url); // Ảnh cần xóa
    });

    updatedFormData.append("name", name);
    updatedFormData.append("price", price);
    updatedFormData.append("street", street);
    updatedFormData.append("latitude", latitude);
    updatedFormData.append("longitude", longitude);
    updatedFormData.append("type", type);
    updatedFormData.append("description", value);
    updatedFormData.append("availability", true);
    updatedFormData.append(
      "district_id",
      districts[selectedDistrict]?.district_id
    );
    updatedFormData.append("ward_id", parseInt(selectedWard));
    updatedFormData.append("distance_school", distanceSchool);
    updatedFormData.append("distance_bus", distanceBus);
    updatedFormData.append("distance_food", distanceFood);
    updatedFormData.append("square", square);
    updatedFormData.append("bedroom", bedroom);
    updatedFormData.append("bathroom", bathroom);
    newImages.forEach((image) => {
      updatedFormData.append("images", image); // Ảnh mới
    });

    for (let pair of updatedFormData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // In ra tên và giá trị của mỗi cặp
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/properties/update/${id}`,
        updatedFormData
      );

      setSuccessMessage("Bài đăng đã được cập nhật thành công!");
      navigate(-1);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="updatePostPage">
      <div className="formContainer">
        <h1>Cập nhật bài đăng</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="name">Tiêu đề</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={formData.name || ""}
              required
            />
          </div>
          <div className="item">
            <label htmlFor="price">Giá</label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={formData.price || ""}
              required
            />
          </div>
          <div className="item">
            <label htmlFor="street">Địa chỉ</label>
            <input
              id="street"
              name="street"
              type="text"
              defaultValue={formData.street || ""}
              required
            />
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
              defaultValue={formData.bedroom || ""}
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
              defaultValue={formData.bathroom || ""}
              required
            />
          </div>
          <div className="item">
            <label htmlFor="latitude">Vĩ độ</label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              defaultValue={formData.latitude || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="longitude">Kinh độ</label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              defaultValue={formData.longitude || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="type">Loại bất động sản</label>
            <select name="property" defaultValue={formData.type || ""}>
              <option value="Nhà trọ">Nhà trọ</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Chung cư mini">Chung cư mini</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="size">Diện tích (m²)</label>
            <input
              min={0}
              id="size"
              name="size"
              type="text"
              defaultValue={formData.square || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="distance_school">Trường học</label>
            <input
              min={0}
              id="distance_school"
              name="distance_school"
              type="text"
              defaultValue={formData.distance_school || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="distance_bus">Trạm xe bus</label>
            <input
              min={0}
              id="distance_bus"
              name="distance_bus"
              type="text"
              defaultValue={formData.distance_bus || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="distance_food">Nhà hàng</label>
            <input
              min={0}
              id="distance_food"
              name="distance_food"
              type="text"
              defaultValue={formData.distance_food || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="images">Ảnh</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </div>
          {existingImages.length > 0 && (
            <div className="image-preview">
              {existingImages.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image.image_url || URL.createObjectURL(image)} // Use object URL for preview
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
          <button type="submit">Cập nhật bài đăng</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostPage;
