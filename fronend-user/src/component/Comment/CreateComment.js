import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";

const CreateComment = ({ setComments, post, user }) => {
  const { values, setValues, errors, setErrors, handleChange } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    if (values.comment === "") {
      errSubmit.comment = "Please enter a comment";
      flag = false;
    }
    if (!flag) {
      setErrors(errSubmit);
    } else {
      const data = {
        content: values.comment,
        user_id: user.id,
        post_id: post.id,
        parent_id: null,
      };
      api
        .post("/comment/add", data)
        .then((res) => {
          const newComment = res.data;
          setComments((prev) => [newComment, ...prev]);
          values.comment = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Bạn đang nghĩ gì?"
          className="form-control"
          style={{ resize: "none" }}
          name="comment"
          onChange={handleChange}
          value={values.comment}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreateComment;
