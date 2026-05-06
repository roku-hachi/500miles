const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

//Handle User
router.get("/user/:id", userController.getUserById);
router.put(
  "/user/update/:idUser",
  uploadMiddleware.uploadAvatar,
  userController.updateUser,
);

//Handle post
router.post(
  "/post/add",
  authMiddleware.authMiddleware,
  uploadMiddleware.uploadImage,
  postController.createPost,
);
router.get("/post/list", postController.getPost);
router.get("/post/:idPost", postController.getPostById);
router.put(
  "/post/update/:idPost",
  uploadMiddleware.uploadImage,
  postController.updatePost,
);
router.delete(
  "/post/delete/:idPost",
  authMiddleware.authMiddleware,
  postController.deletePost,
);

//Handle comment
router.post(
  "/comment/add",
  authMiddleware.authMiddleware,
  commentController.createComment,
);
router.get("/comment/:postId", commentController.getComment);

module.exports = router;
