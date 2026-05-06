import CommentReplies from "./CommentReplies";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";

const Comment = ({
  comment,
  user,
  post,
  setComments,
  activeReply,
  setActiveReply,
}) => {
  const { values, errors, setErrors, handleChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    if (values.comment === "") {
      errSubmit.comment = "Please enter your replies";
      flag = false;
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      const data = {
        content: values.comment,
        post_id: post.id,
        user_id: user.id,
        parent_id: comment.id,
      };
      api
        .post("/comment/add", data)
        .then((res) => {
          const newReplies = res.data;
          setComments((prev) => {
            return prev.map((reply) => {
              return reply.id === comment.id
                ? { ...reply, replies: [newReplies, ...(reply.replies || [])] }
                : reply;
            });
          });
          setActiveReply(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="d-flex mb-3">
        <img
          src={`http://localhost:3002/${comment.user.avatar}`}
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div className="flex-grow-1">
          <div className="bg-light p-2 rounded">
            <strong>{comment.user.user_name}</strong>
            <div>{comment.content}</div>
          </div>
          <div className="small text-muted mt-1">
            <span style={{ cursor: "pointer" }}>Like</span> ·{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                setActiveReply(activeReply === comment.id ? null : comment.id)
              }
            >
              Reply
            </span>
          </div>
          {activeReply === comment.id && (
            <div>
              <form className="d-flex mt-2 " onSubmit={handleSubmit}>
                <input
                  className="form-control form-control-sm"
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                />
                <button className="btn btn-primary btn-sm ms-2">Gửi</button>
              </form>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => {
        return <CommentReplies reply={reply} />;
      })}
    </>
  );
};

export default Comment;
