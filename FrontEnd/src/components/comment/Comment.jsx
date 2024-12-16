// import React, { useState } from "react";
// import "./Comment.scss";

// function Comment({ review, onAddReply }) {
//   const [replyContent, setReplyContent] = useState(""); // Nội dung phản hồi
//   const [showReplyForm, setShowReplyForm] = useState(false); // Trạng thái hiển thị form phản hồi

//   const handleReplySubmit = () => {
//     if (replyContent.trim()) {
//       onAddReply(review.id, replyContent); // Gọi hàm thêm phản hồi từ props
//       setReplyContent(""); // Xóa nội dung phản hồi sau khi gửi
//       setShowReplyForm(false); // Ẩn form phản hồi
//     }
//   };

//   return (
//     <div className="comment">
//       {/* Hiển thị thông tin người dùng */}
//       <div className="comment-header">
//         <img
//           className="user-avatar"
//           src={
//             review.user?.avatar ||
//             "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//           }
//           alt={review.user?.username || "Người dùng ẩn danh"}
//         />
//         <div className="user-info">
//           <h4 className="user-name">
//             {review.user?.username || "Người dùng ẩn danh"}
//           </h4>
//           <span className="comment-date">
//             {new Date(review.date).toLocaleDateString("vi-VN")}
//           </span>
//         </div>
//       </div>

//       {/* Nội dung bình luận */}
//       <div className="comment-content">
//         <p>{review.comment}</p>
//       </div>

//       {/* Nút trả lời */}
//       <div className="comment-actions">
//         <button onClick={() => setShowReplyForm(!showReplyForm)}>
//           Trả lời
//         </button>
//       </div>

//       {/* Form trả lời */}
//       {showReplyForm && (
//         <div className="reply-form">
//           <textarea
//             placeholder="Viết phản hồi của bạn..."
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//           />
//           <button onClick={handleReplySubmit}>Gửi</button>
//         </div>
//       )}

//       {/* Danh sách phản hồi */}
//       {review.replies && review.replies.length > 0 && (
//         <div className="replies">
//           {review.replies.map((reply) => (
//             <div key={reply.id} className="reply">
//               <div className="reply-header">
//                 <img
//                   className="user-avatar"
//                   src={
//                     reply.img ||
//                     "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//                   }
//                   alt={reply.username || "Người dùng ẩn danh"}
//                 />
//                 <div className="user-info">
//                   <h5 className="user-name">
//                     {reply.user || "Người dùng ẩn danh"}
//                   </h5>
//                   <span className="reply-date">{reply.date}</span>
//                 </div>
//               </div>
//               <div className="reply-content">
//                 <p>{reply.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Comment;

// import React, { useState } from "react";
// import dayjs from "dayjs";
// import "./Comment.scss";

// function Comment({ review, onAddReply }) {
//   const [replyContent, setReplyContent] = useState(""); // Nội dung phản hồi
//   const [showReplyForm, setShowReplyForm] = useState(false); // Trạng thái hiển thị form phản hồi

//   const handleReplySubmit = () => {
//     if (replyContent.trim()) {
//       onAddReply(review.id, replyContent); // Gọi hàm thêm phản hồi từ props
//       setReplyContent(""); // Xóa nội dung phản hồi sau khi gửi
//       setShowReplyForm(false); // Ẩn form phản hồi
//     }
//   };

//   return (
//     <div className="comment">
//       {/* Hiển thị thông tin người dùng */}
//       <div className="comment-header">
//         <img
//           className="user-avatar"
//           src={
//             review.user?.avatar ||
//             "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//           }
//           alt={review.user?.username || "Người dùng ẩn danh"}
//         />
//         <div className="user-info">
//           <h4 className="user-name">
//             {review.user?.username || "Người dùng ẩn danh"}
//           </h4>
//           <span className="comment-date">
//             {dayjs(review.date).isValid()
//               ? dayjs(review.date).format("DD/MM/YYYY")
//               : "Ngày không hợp lệ"}
//           </span>
//         </div>
//       </div>

//       {/* Nội dung bình luận */}
//       <div className="comment-content">
//         <p>{review.comment}</p>
//       </div>

//       {/* Nút trả lời */}
//       <div className="comment-actions">
//         <button onClick={() => setShowReplyForm(!showReplyForm)}>
//           Trả lời
//         </button>
//       </div>

//       {/* Form trả lời */}
//       {showReplyForm && (
//         <div className="reply-form">
//           <textarea
//             placeholder="Viết phản hồi của bạn..."
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//           />
//           <button onClick={handleReplySubmit}>Gửi</button>
//         </div>
//       )}

//       {/* Danh sách phản hồi */}
//       {review.replies && review.replies.length > 0 && (
//         <div className="replies">
//           {review.replies.map((reply) => (
//             <div key={reply.id} className="reply">
//               <div className="reply-header">
//                 <img
//                   className="user-avatar"
//                   src={
//                     reply.img ||
//                     "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//                   }
//                   alt={reply.user || "Người dùng ẩn danh"}
//                 />
//                 <div className="user-info">
//                   <h5 className="user-name">
//                     {reply.user || "Người dùng ẩn danh"}
//                   </h5>
//                   <span className="reply-date">{reply.date}</span>
//                 </div>
//               </div>
//               <div className="reply-content">
//                 <p>{reply.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Comment;

// import React, { useState } from "react";
// import dayjs from "dayjs";
// import "./Comment.scss";

// function Comment({ review, onAddReply }) {
//   const [replyContent, setReplyContent] = useState(""); // Nội dung phản hồi
//   const [showReplyForm, setShowReplyForm] = useState(false); // Trạng thái hiển thị form phản hồi

//   const handleReplySubmit = () => {
//     if (replyContent.trim()) {
//       onAddReply(review.id, replyContent); // Gọi hàm thêm phản hồi từ props
//       setReplyContent(""); // Xóa nội dung phản hồi sau khi gửi
//       setShowReplyForm(false); // Ẩn form phản hồi
//     }
//   };

//   return (
//     <div className="comment">
//       {/* Hiển thị thông tin người dùng */}
//       <div className="comment-header">
//         <img
//           className="user-avatar"
//           src={
//             review.user?.avatar ||
//             "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//           }
//           alt={review.user?.username || "Người dùng ẩn danh"}
//         />
//         <div className="user-info">
//           <h4 className="user-name">
//             {review.user?.username || "Người dùng ẩn danh"}
//           </h4>
//           <span className="comment-date">
//             {dayjs(review.date).isValid()
//               ? dayjs(review.date).format("DD/MM/YYYY")
//               : "Ngày không hợp lệ"}
//           </span>
//         </div>
//       </div>

//       {/* Nội dung bình luận */}
//       <div className="comment-content">
//         <p>{review.comment}</p>
//       </div>

//       {/* Nút trả lời */}
//       <div className="comment-actions">
//         <button onClick={() => setShowReplyForm(!showReplyForm)}>
//           Trả lời
//         </button>
//       </div>

//       {/* Form trả lời */}
//       {showReplyForm && (
//         <div className="reply-form">
//           <textarea
//             placeholder="Viết phản hồi của bạn..."
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//           />
//           <button onClick={handleReplySubmit}>Gửi</button>
//         </div>
//       )}

//       {/* Danh sách phản hồi */}
//       {Array.isArray(review.replies) && review.replies.length > 0 && (
//         <div className="replies">
//           {review.replies.map((reply) => (
//             <div key={reply.id} className="reply">
//               <div className="reply-header">
//                 <img
//                   className="user-avatar"
//                   src={
//                     reply.img ||
//                     "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
//                   }
//                   alt={reply.username || "Người dùng ẩn danh"}
//                 />
//                 <div className="user-info">
//                   <h5 className="user-name">
//                     {reply.username || "Người dùng ẩn danh"}
//                   </h5>
//                   <span className="reply-date">{reply.date}</span>
//                 </div>
//               </div>
//               <div className="reply-content">
//                 <p>{reply.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Comment;

import React, { useState } from "react";
import dayjs from "dayjs";
import "./Comment.scss";

function Comment({ review, onAddReply }) {
  const [replyContent, setReplyContent] = useState(""); // Nội dung phản hồi
  const [showReplyForm, setShowReplyForm] = useState(false); // Trạng thái hiển thị form phản hồi

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onAddReply(review.id, replyContent); // Gọi hàm thêm phản hồi từ props
      setReplyContent(""); // Xóa nội dung phản hồi sau khi gửi
      setShowReplyForm(false); // Ẩn form phản hồi
    }
  };

  return (
    <div className="comment">
      {/* Hiển thị thông tin người dùng */}
      <div className="comment-header">
        <img
          className="user-avatar"
          src={
            review.user?.avatar ||
            "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
          }
          alt={review.user?.username || "Người dùng ẩn danh"}
        />
        <div className="user-info">
          <h4 className="user-name">
            {review.user?.username || "Người dùng ẩn danh"}
          </h4>
          <span className="comment-date">
            {dayjs(review.date).isValid()
              ? dayjs(review.date).format("DD/MM/YYYY")
              : "Ngày không hợp lệ"}
          </span>
        </div>
      </div>

      {/* Nội dung bình luận */}
      <div className="comment-content">
        <p>{review.comment}</p>
      </div>

      {/* Nút trả lời */}
      <div className="comment-actions">
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          Trả lời
        </button>
      </div>

      {/* Form trả lời */}
      {showReplyForm && (
        <div className="reply-form">
          <textarea
            placeholder="Viết phản hồi của bạn..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={handleReplySubmit}>Gửi</button>
        </div>
      )}

      {/* Danh sách phản hồi */}
      {Array.isArray(review.replies) && review.replies.length > 0 && (
        <div className="replies">
          {review.replies.map((reply) => (
            <div key={reply.id} className="reply">
              <div className="reply-header">
                <img
                  className="user-avatar"
                  src={
                    reply.img ||
                    "https://icon-library.com/images/user-icon-image/user-icon-image-25.jpg"
                  }
                  alt={reply.username || "Người dùng ẩn danh"}
                />
                <div className="user-info">
                  <h5 className="user-name">{reply.user}</h5>
                  <span className="reply-date">{reply.date}</span>
                </div>
              </div>
              <div className="reply-content">
                <p>{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
