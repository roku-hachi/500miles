import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";

const CommentReplies = ({ reply }) => {
  return (
    <div className=" mb-3 ms-5">
      <div className="d-flex">
        <img
          src={`http://localhost:3002/${reply.user.avatar}`}
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div className="flex-grow-1">
          <div className="bg-light p-2 rounded">
            <strong>{reply.user.user_name}</strong>
            <div>{reply.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplies;
