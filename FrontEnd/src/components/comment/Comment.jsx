// import React, { useState } from "react";
// import "./Comment.scss";

// function Comment({ comment }) {
//   const [showReply, setShowReply] = useState(false);
//   const [replyContent, setReplyContent] = useState("");
//   const [userRating, setUserRating] = useState(comment.rating);

//   const handleReplyToggle = () => {
//     setShowReply(!showReply);
//   };

//   // Function to handle Enter key press in reply box
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Prevent newline in textarea
//       handleReplySubmit();
//     }
//   };

//   return (
//     <div className="comment">
//       <div className="userInfo">
//         <img src={comment.img} alt="avatar" className="avatar" />

//         <div className="userDetails">
//           <strong>{comment.user}</strong>
//           <span>{comment.date}</span>

//         </div>
//       </div>
//       <p>{comment.content}</p>
//       {comment.replies &&
//         comment.replies.map((reply) => (
//           <div key={reply.id} className="reply">
//             <div className="replyUserInfo">
//               <img src={reply.img} alt="avatar" className="avatar" />
//               <div className="replyDetails">
//                 <strong>{reply.user}</strong>
//                 <span>{reply.date}</span>
//               </div>
//             </div>
//             <p>{reply.content}</p>
//           </div>
//         ))}
//       <button onClick={handleReplyToggle}>Reply</button>
//       {showReply && (
//         <div className="replyBox">
//           <textarea
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//             onKeyDown={handleKeyDown} // Add onKeyDown event
//             placeholder="Write your reply..."
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Comment;

import React, { useState } from "react";
import "./Comment.scss";

function Comment({ comment, onAddReply }) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [userRating, setUserRating] = useState(comment.rating);

  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onAddReply(comment.id, replyContent); // Thêm phản hồi mới cho bình luận hiện tại
      setReplyContent("");
      setShowReply(false);
    }
  };

  // Xử lý phím Enter trong ô trả lời
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  return (
    <div className="comment">
      <div className="userInfo">
        <img src={comment.img} alt="avatar" className="avatar" />
        <div className="userDetails">
          <strong>{comment.user}</strong>
          <span>{comment.date}</span>
        </div>
      </div>
      <p>{comment.content}</p>
      {comment.replies &&
        comment.replies.map((reply) => (
          <div key={reply.id} className="reply">
            <div className="replyUserInfo">
              <img src={reply.img} alt="avatar" className="avatar" />
              <div className="replyDetails">
                <strong>{reply.user}</strong>
                <span>{reply.date}</span>
              </div>
            </div>
            <p>{reply.content}</p>
          </div>
        ))}
      <button className="btn-reply" onClick={handleReplyToggle}>
        Reply
      </button>
      {showReply && (
        <div className="replyBox">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your reply..."
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
