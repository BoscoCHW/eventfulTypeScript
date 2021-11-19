// const database = require("../database");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userModel = {
    findOne: async (email) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
      } catch (err) {
        throw err;
      }
   
    },
    findById: async (id) => {
      try {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
      } catch (err) {
        throw err;
      }

    },
    addOne: async (email, password, name, imageUrl) => {
        const data = {
            name,
            email,
            password,
            role: 'user',
            imageUrl: imageUrl
        };
        try{
          const newUser = await prisma.user.create({ data });
          return newUser;
        } catch (err) {
          throw err;
        }
 
    }
  
  };
  
module.exports = { userModel };
  