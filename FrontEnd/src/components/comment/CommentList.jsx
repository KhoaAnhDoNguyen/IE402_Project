// import React, { useState } from "react";
// import Comment from "./Comment";
// import { commentsData as initialCommentsData } from "../../lib/dummydata";
// import "./Comment.scss";

// function CommentList() {
//   const [comments, setComments] = useState(initialCommentsData); // Khởi tạo trạng thái danh sách bình luận

//   // Hàm để thêm bình luận mới
//   const handleAddComment = (newCommentContent) => {
//     const newComment = {
//       id: comments.length + 1,
//       user: "Current User",
//       date: new Date().toLocaleDateString(),
//       rating: 5,
//       img: "https://example.com/user-avatar.png",
//       content: newCommentContent,
//       replies: [],
//     };
//     setComments([...comments, newComment]); // Cập nhật danh sách bình luận
//   };

//   // Hàm để thêm phản hồi cho một bình luận cụ thể
//   const handleAddReply = (commentId, replyContent) => {
//     const newReply = {
//       id: Math.random(),
//       user: "Current User",
//       date: new Date().toLocaleDateString(),
//       content: replyContent,
//       img: "https://example.com/user-avatar.png",
//     };

//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, replies: [...comment.replies, newReply] }
//           : comment
//       )
//     );
//   };

//   return (
//     <div className="commentList">
//       <h2>Bình luận</h2>
//       {comments.map((comment) => (
//         <Comment
//           key={comment.id}
//           comment={comment}
//           onAddReply={handleAddReply}
//         />
//       ))}
//       <AddCommentForm onAddComment={handleAddComment} />
//     </div>
//   );
// }

// function AddCommentForm({ onAddComment }) {
//   const [content, setContent] = useState("");

//   const handleSubmit = () => {
//     if (content.trim()) {
//       onAddComment(content);
//       setContent("");
//     }
//   };

//   return (
//     <div className="addComment">
//       <h3>Viết bình luận</h3>
//       <textarea
//         placeholder="Viết bình luận của bạn..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default CommentList;

// import React, { useState, useEffect } from "react";
// import Comment from "./Comment";
// import "./Comment.scss";

// function CommentList({ propertyId }) {
//   const [comments, setComments] = useState([]);

//   // Hàm để lấy danh sách bình luận
//   const fetchComments = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/reviews/${propertyId}`
//       );
//       const data = await response.json();
//       setComments(data); // Cập nhật danh sách bình luận từ API
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   // Gọi API khi component được mount
//   useEffect(() => {
//     fetchComments();
//   }, [propertyId]);

//   // Hàm để thêm bình luận mới
//   const handleAddComment = async (newCommentContent) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: 1, // Thay bằng ID người dùng hiện tại
//           propertyId,
//           comment: newCommentContent,
//           date: new Date().toISOString(), // Thêm ngày hiện tại
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setComments((prevComments) => [...prevComments, data]); // Cập nhật danh sách bình luận
//       } else {
//         console.error("Error adding comment:", data.error);
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   // Hàm để thêm phản hồi cho một bình luận cụ thể
//   const handleAddReply = (commentId, replyContent) => {
//     const newReply = {
//       id: Math.random(),
//       user: "Current User",
//       date: new Date().toLocaleDateString("vi-VN"), // Thêm ngày hiện tại
//       content: replyContent,
//       img: "https://example.com/user-avatar.png",
//     };

//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, replies: [...comment.replies, newReply] }
//           : comment
//       )
//     );
//   };

//   return (
//     <div className="commentList">
//       <h2>Bình luận</h2>
//       {comments.map((comment) => (
//         <Comment
//           key={comment.id}
//           review={comment}
//           onAddReply={handleAddReply}
//         />
//       ))}
//       <AddCommentForm onAddComment={handleAddComment} />
//     </div>
//   );
// }

// function AddCommentForm({ onAddComment }) {
//   const [content, setContent] = useState("");

//   const handleSubmit = () => {
//     if (content.trim()) {
//       onAddComment(content);
//       setContent("");
//     }
//   };

//   return (
//     <div className="addComment">
//       <h3>Viết bình luận</h3>
//       <textarea
//         placeholder="Viết bình luận của bạn..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default CommentList;

// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
// import Comment from "./Comment";
// import "./Comment.scss";

// function CommentList({ propertyId }) {
//   const { currentUser } = useContext(AuthContext); // Lấy thông tin người dùng hiện tại
//   const [comments, setComments] = useState([]);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/reviews/${propertyId}`
//       );

//       // Kiểm tra phản hồi từ API
//       if (!response.ok) {
//         const errorDetails = await response.text(); // Lấy thông tin lỗi từ API
//         throw new Error(
//           `HTTP Error: ${response.status} - ${response.statusText} \nDetails: ${errorDetails}`
//         );
//       }

//       const data = await response.json();
//       console.log("Fetched comments:", data); // Xem dữ liệu nhận được
//       setComments(data); // Cập nhật danh sách bình luận từ API
//     } catch (error) {
//       // Log lỗi chi tiết
//       console.error("Error fetching comments:", error.message);
//     }
//   };

//   // Gọi API khi component được mount
//   useEffect(() => {
//     fetchComments();
//   }, [propertyId]);

//   // Hàm để thêm bình luận mới
//   const handleAddComment = async (newCommentContent) => {
//     if (!currentUser) {
//       alert("Bạn cần đăng nhập để bình luận.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/api/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: currentUser.id, // Lấy ID từ currentUser
//           propertyId,
//           comment: newCommentContent,
//           date: new Date().toISOString(), // Thêm ngày hiện tại
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setComments((prevComments) => [...prevComments, data]); // Cập nhật danh sách bình luận
//       } else {
//         console.error("Error adding comment:", data.error);
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   // Hàm để thêm phản hồi cho một bình luận cụ thể
//   const handleAddReply = (commentId, replyContent) => {
//     const newReply = {
//       id: Math.random(),
//       user: currentUser?.name || "Người dùng ẩn danh", // Hiển thị tên người dùng hoặc mặc định
//       date: new Date().toLocaleDateString("vi-VN"), // Thêm ngày hiện tại
//       content: replyContent,
//       img: currentUser?.avatar || "https://example.com/default-avatar.png", // Hiển thị avatar
//     };

//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, replies: [...comment.replies, newReply] }
//           : comment
//       )
//     );
//   };

//   return (
//     <div className="commentList">
//       <h2>Bình luận</h2>
//       {comments.map((comment) => (
//         <Comment
//           key={comment.id}
//           review={comment}
//           onAddReply={handleAddReply}
//         />
//       ))}
//       <AddCommentForm onAddComment={handleAddComment} />
//     </div>
//   );
// }

// function AddCommentForm({ onAddComment }) {
//   const [content, setContent] = useState("");

//   const handleSubmit = () => {
//     if (content.trim()) {
//       onAddComment(content);
//       setContent("");
//     }
//   };

//   return (
//     <div className="addComment">
//       <h3>Viết bình luận</h3>
//       <textarea
//         placeholder="Viết bình luận của bạn..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Gửi</button>
//     </div>
//   );
// }

// export default CommentList;

// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import Comment from "./Comment";
// import "./Comment.scss";

// function CommentList({ propertyId }) {
//   const { currentUser } = useContext(AuthContext);
//   const [comments, setComments] = useState([]);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/reviews/${propertyId}`
//       );

//       if (!response.ok) {
//         const errorDetails = await response.text();
//         throw new Error(
//           `HTTP Error: ${response.status} - ${response.statusText} \nDetails: ${errorDetails}`
//         );
//       }

//       const data = await response.json();
//       console.log("Fetched comments:", data);
//       setComments(
//         data.map((comment) => ({ ...comment, replies: comment.replies || [] }))
//       ); // Khởi tạo replies nếu undefined
//     } catch (error) {
//       console.error("Error fetching comments:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [propertyId]);

//   const handleAddComment = async (newCommentContent) => {
//     if (!currentUser) {
//       alert("Bạn cần đăng nhập để bình luận.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/api/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: currentUser.id,
//           propertyId,
//           comment: newCommentContent,
//           date: new Date().toISOString(),
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setComments((prevComments) => [
//           ...prevComments,
//           { ...data, replies: [] },
//         ]);
//       } else {
//         console.error("Error adding comment:", data.error);
//       }
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleAddReply = (commentId, replyContent) => {
//     const newReply = {
//       id: Math.random(),
//       user: currentUser?.name || "Người dùng ẩn danh",
//       date: new Date().toLocaleDateString("vi-VN"),
//       content: replyContent,
//       img: currentUser?.avatar || "https://example.com/default-avatar.png",
//     };

//     setComments((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, replies: [...comment.replies, newReply] }
//           : comment
//       )
//     );
//   };

//   return (
//     <div className="commentList">
//       <h2>Bình luận</h2>
//       {comments.map((comment) => (
//         <Comment
//           key={comment.id}
//           review={comment}
//           onAddReply={handleAddReply}
//         />
//       ))}
//       <AddCommentForm onAddComment={handleAddComment} />
//     </div>
//   );
// }

// function AddCommentForm({ onAddComment }) {
//   const [content, setContent] = useState("");

//   const handleSubmit = () => {
//     if (content.trim()) {
//       onAddComment(content);
//       setContent("");
//     }
//   };

//   return (
//     <div className="addComment">
//       <h3>Viết bình luận</h3>
//       <textarea
//         placeholder="Viết bình luận của bạn..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Gửi</button>
//     </div>
//   );
// }

// export default CommentList;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Comment from "./Comment";
import "./Comment.scss";

function CommentList({ propertyId }) {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/${propertyId}`
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText} \nDetails: ${errorDetails}`
        );
      }

      const data = await response.json();
      console.log("Fetched comments:", data);
      setComments(
        data.map((comment) => ({ ...comment, replies: [] })) // Khởi tạo replies rỗng
      );
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [propertyId]);

  const handleAddComment = async (newCommentContent) => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          propertyId,
          comment: newCommentContent,
          date: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Đảm bảo dữ liệu nhận về có thông tin người dùng và bình luận
        setComments((prevComments) => [
          ...prevComments,
          {
            ...data,
            user: {
              username: currentUser.username,
              avatar: currentUser.avatar,
            }, // Thêm thông tin người dùng vào bình luận
            replies: [],
          },
        ]);
      } else {
        console.error("Error adding comment:", data.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReply = (commentId, replyContent) => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để phản hồi.");
      return;
    }

    const newReply = {
      id: Math.random(),
      user: currentUser?.name || "Người dùng ẩn danh",
      date: new Date().toLocaleDateString("vi-VN"),
      content: replyContent,
      img: currentUser?.avatar || "https://example.com/default-avatar.png",
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  return (
    <div className="commentList">
      <h2>Bình luận</h2>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          review={comment}
          onAddReply={handleAddReply}
        />
      ))}
      <AddCommentForm onAddComment={handleAddComment} />
    </div>
  );
}

function AddCommentForm({ onAddComment }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onAddComment(content);
      setContent("");
    }
  };

  return (
    <div className="addComment">
      <h3>Viết bình luận</h3>
      <textarea
        placeholder="Viết bình luận của bạn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Gửi</button>
    </div>
  );
}

export default CommentList;
