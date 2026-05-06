const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const getUserById = async (id) => {
  return prisma.user.findFirst({
    where: { id },
  });
};

const updateUser = async (idUser, data) => {
  return prisma.user.update({
    where: {
      id: Number(idUser),
    },
    data: data,
  });
};

module.exports = {
  getUserById,
  updateUser,
};
