import "./Comment.css";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import api from "../../utils/api";
const CommentList = ({ setOpenComment, post, user, comments, setComments }) => {
  const [activeReply, setActiveReply] = useState(null);

  return (
    <div className="overlay" onClick={() => setOpenComment(false)}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        {/* ===== POST CONTENT (optional) ===== */}
        <CreateComment post={post} user={user} setComments={setComments} />
        <hr />
        {/* ===== COMMENT LIST ===== */}
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              post={post}
              user={user}
              setComments={setComments}
              activeReply={activeReply}
              setActiveReply={setActiveReply}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
