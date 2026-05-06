import { useEffect, useState } from "react";
import CreatePost from "../../component/Post/CreatePost";
import PostCard from "../../component/Post/PostCard";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get("/post/list")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* Feed */}
          <div className="col-lg-8">
            <CreatePost
              setPosts={setPosts}
              user={user}
              editPost={editPost}
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
            />

            {posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  user={user}
                  setPosts={setPosts}
                  setEditPost={setEditPost}
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                />
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <Profile user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
