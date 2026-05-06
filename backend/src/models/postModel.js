const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createPost = async (data) => {
  return prisma.post.create({
    data,
    include: {
      user: true,
    },
  });
};

const getPost = async () => {
  return prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

const getPostById = async (idPost) => {
  return prisma.post.findFirst({
    where: {
      id: idPost,
    },
  });
};

const updatePost = async (idPost, data) => {
  return prisma.post.update({
    where: {
      id: idPost,
    },
    data: data,
    include: {
      user: true,
    },
  });
};

const deletePost = async (idPost) => {
  await prisma.comment.deleteMany({
    where: {
      post_id: idPost,
    },
  });
  return prisma.post.delete({
    where: {
      id: idPost,
    },
  });
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};
