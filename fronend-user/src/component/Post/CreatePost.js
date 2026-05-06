import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import { useFile } from "../../hooks/useFile";
import "./CreatePost.css";
import { FaImage } from "react-icons/fa6";

const CreatePost = ({ setPosts, user, editPost, openEdit, setOpenEdit }) => {
  const { values, setValues, errors, setErrors, handleChange } = useForm({
    content: "",
  });
  const { files, handleFile } = useFile();
  const fileRef = useRef();
  useEffect(() => {
    if (editPost) {
      setValues({ content: editPost.content || "" });
    }
  }, [editPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    if (values.content === "") {
      errSubmit.content = "Please enter the content";
      flag = false;
    }
    if (!flag) {
      setErrors(errSubmit);
    } else {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("user_id", user.id);
      files.forEach((file) => {
        formData.append("image", file);
      });
      if (editPost) {
        api
          .put("/post/update/" + editPost.id, formData)
          .then((res) => {
            console.log(res);
            const updatePost = res.data;
            setPosts((prev) =>
              prev.map((post) =>
                post.id === updatePost.id ? updatePost : post,
              ),
            );
            values.content = "";
            setOpenEdit(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .post("/post/add", formData)
          .then((res) => {
            const newPost = res.data;
            setPosts((prev) => [newPost, ...prev]);
            setOpenEdit(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <div className="create-post-bar shadow-sm mb-4">
        <div className="d-flex align-items-center w-100">
          {/* Avatar */}
          <img
            src={`http://localhost:3002/${user.avatar}`}
            alt=""
            className="rounded-circle me-3"
            width="45"
            height="45"
          />

          {/* Fake input */}
          <div
            className="flex-grow-1 post-input"
            onClick={() => setOpenEdit(true)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            {user.user_name}, bạn đang nghĩ gì thế?
          </div>

          {/* Icons */}
          <div className="d-flex align-items-center ms-3 gap-3">
            <div>
              {/* input ẩn */}
              <input
                type="file"
                multiple
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleFile}
              />

              {/* icon */}
              <FaImage
                style={{ cursor: "pointer", fontSize: "30px" }}
                onClick={() => fileRef.current.click()}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Input thật */}
      {openEdit && (
        <div className="overlay" onClick={() => setOpenEdit(false)}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} style={{ height: "100%" }}>
              <textarea
                value={values.content}
                onChange={handleChange}
                name="content"
                style={{
                  width: "100%",
                  minHeight: "90%",
                  resize: "none",
                  overflow: "hidden",
                }}
              />
              <input type="file" multiple onChange={handleFile} />
              <button>Post</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
