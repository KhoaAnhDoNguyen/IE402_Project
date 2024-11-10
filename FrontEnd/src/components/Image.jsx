import React, { useState, useEffect } from 'react';

function Image() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [images, setImages] = useState([]); // State để lưu danh sách hình ảnh

  // Xử lý sự kiện thay đổi file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Kiểm tra định dạng file
    if (selectedFile) {
      const fileType = selectedFile.type;
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

      // Nếu file không phải là ảnh, cảnh báo người dùng
      if (!allowedTypes.includes(fileType)) {
        alert('Please upload an image file (png, jpg, jpeg, gif, or webp).');
        setFile(null); // Reset lại file nếu không hợp lệ
        setImagePreview(null); // Reset lại ảnh xem trước
      } else {
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile)); // Tạo URL cho ảnh xem trước
      }
    }
  };

  // Xử lý tải ảnh lên
  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          setUploadSuccess('Image uploaded successfully!');
          fetchImages(); // Lấy tất cả hình ảnh sau khi upload thành công
        } else {
          setUploadSuccess('Error uploading image.');
        }
        console.log('Upload response:', data);
      } catch (error) {
        setUploadSuccess('Error uploading image.');
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  // Fetch tất cả hình ảnh từ server
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/images');
      const data = await response.json();
      if (response.ok) {
        setImages(data); // Lưu danh sách hình ảnh vào state
      } else {
        console.error('Error fetching images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Gọi fetchImages khi component được mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upload Image</h2>
      
      {/* Input file */}
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg, .gif, .webp"
        />
      </div>

      {/* Upload button */}
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>

      {/* Hiển thị ảnh xem trước nếu có */}
      {imagePreview && (
        <div className="mt-4">
          <h3>Image Preview:</h3>
          <img
            src={imagePreview}
            alt="Preview"
            className="img-fluid"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {uploadSuccess && (
        <div className="mt-4">
          <div className={`alert ${uploadSuccess.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
            {uploadSuccess}
          </div>
        </div>
      )}

      {/* Hiển thị tất cả hình ảnh từ bảng 'images' */}
      <div className="mt-5">
        <h3>All Images</h3>
        <div className="row">
          {images.map((image) => (
            <div className="col-md-4" key={image.id}>
              <div className="card mb-4">
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Image'}
                  className="card-img-top"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Image;
