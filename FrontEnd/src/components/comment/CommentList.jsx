// import React from "react";
// import Comment from "./Comment";
// import { commentsData } from "../../lib/dummydata";
// import "./Comment.scss";

// function CommentList() {
//   return (
//     <div className="commentList">
//       <h2>User Reviews</h2>
//       {commentsData.map((comment) => (
//         <Comment key={comment.id} comment={comment} />
//       ))}
//       <div className="addComment">
//         <h3>Write a review</h3>
//         <textarea placeholder="Write your comment..." />
//       </div>
//     </div>
//   );
// }

// export default CommentList;

import React, { useState } from "react";
import Comment from "./Comment";
import { commentsData as initialCommentsData } from "../../lib/dummydata";
import "./Comment.scss";

function CommentList() {
  const [comments, setComments] = useState(initialCommentsData); // Khởi tạo trạng thái danh sách bình luận

  // Hàm để thêm bình luận mới
  const handleAddComment = (newCommentContent) => {
    const newComment = {
      id: comments.length + 1,
      user: "Current User",
      date: new Date().toLocaleDateString(),
      rating: 5,
      img: "https://example.com/user-avatar.png",
      content: newCommentContent,
      replies: [],
    };
    setComments([...comments, newComment]); // Cập nhật danh sách bình luận
  };

  // Hàm để thêm phản hồi cho một bình luận cụ thể
  const handleAddReply = (commentId, replyContent) => {
    const newReply = {
      id: Math.random(),
      user: "Current User",
      date: new Date().toLocaleDateString(),
      content: replyContent,
      img: "https://example.com/user-avatar.png",
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
          comment={comment}
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CommentList;
