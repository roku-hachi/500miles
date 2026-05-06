import { AiOutlineLike } from "react-icons/ai";
import "./PostCard.css";
import { FaRegCommentDots, FaRegShareSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import CommentList from "../Comment/CommentList";
import api from "../../utils/api";
const PostCard = ({
  post,
  user,
  setPosts,
  editPost,
  setEditPost,
  setOpenEdit,
}) => {
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalMain, setTotalMain] = useState("");
  useEffect(() => {
    api
      .get("/comment/" + post.id)
      .then((res) => {
        setComments(res.data.comments);
        setTotalMain(res.data.totalMain);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (id) => {
    api
      .delete("/post/delete/" + post.id)
      .then((res) => {
        console.log(res);
        setPosts((prev) => prev.filter((post) => post.id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    if (post.user_id === user.id) {
      setEditPost(post);
      setOpenEdit(true);
    }
  };
  return (
    <>
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body p-3">
          {/* Header */}
          <div className="d-flex align-items-start justify-content-between">
            <div className="d-flex">
              <img
                src={`http://localhost:3002/${post.user?.avatar}`}
                alt=""
                className="rounded-circle me-2"
                width="45"
                height="45"
              />
              <div>
                <div className="fw-bold">{post.user?.user_name}</div>
                <div className="text-muted small">{post.time} · 🌐</div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-light btn-sm me-1"
                onClick={() => handleEdit(post.id)}
              >
                •••
              </button>
              <button className="btn btn-light btn-sm" onClick={handleDelete}>
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mt-3">
            <p className="mb-2">{post.content}</p>
          </div>
        </div>

        {/* Image */}
        {post.image?.length > 0 && (
          <div className="post-images">
            <div className="row g-1 m-0">
              {post.image.map((img, index) => (
                <div
                  key={index}
                  className={post.image.length === 1 ? "col-12" : "col-6"}
                >
                  <img
                    src={`http://localhost:3002/${img}`}
                    alt=""
                    className="w-100 post-img"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="card-body pt-2 pb-2">
          <div className="d-flex justify-content-between text-muted small">
            <div>👍 ❤️ {post.likes}</div>
            <div>
              {totalMain} bình luận · {post.shares} chia sẻ
            </div>
          </div>

          <hr className="my-2" />

          <div className="d-flex justify-content-around text-muted">
            <button className="btn btn-light w-100 d-flex justify-content-center align-items-center">
              <AiOutlineLike /> Like
            </button>
            <button
              className="btn btn-light w-100 d-flex justify-content-center align-items-center"
              onClick={() => setOpenComment(true)}
            >
              <FaRegCommentDots /> Comment
            </button>
            <button className="btn btn-light w-100 d-flex justify-content-center align-items-center">
              <FaRegShareSquare /> Share
            </button>
          </div>
        </div>
      </div>
      {openComment && (
        <CommentList
          setOpenComment={setOpenComment}
          post={post}
          user={user}
          comments={comments}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PostCard;
