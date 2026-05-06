const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const createComment = async (data) => {
  return prisma.comment.create({
    data,
    include: {
      user: true,
    },
  });
};

const getComment = async (postId) => {
  return prisma.comment.findMany({
    where: {
      post_id: Number(postId),
      parent_id: null,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      user: true,
      replies: {
        orderBy: {
          id: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });
};

const totalMain = async (postId) => {
  return prisma.comment.count({
    where: {
      post_id: Number(postId),
      parent_id: null,
    },
  });
};

const totalReplies = async (postId) => {
  return prisma.comment.count({
    where: {
      post_id: Number(postId),
      NOT: {
        parent_id: null,
      },
    },
  });
};

module.exports = {
  createComment,
  getComment,
  totalMain,
  totalReplies,
};
