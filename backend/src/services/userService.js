const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const checkEmail = async (email) => {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

module.exports = {
  checkEmail,
};
