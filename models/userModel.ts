import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();



const userModel = {

  findByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (err) {
      throw err;
    }
  
  },

  findById: async (id: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    } catch (err) {
      throw err;
    }

  },
  addOne: async (id: string, email: string, password: string, name: string, imageUrl: string) => {
    
    const data: Prisma.UserUncheckedCreateInput = {
      name,
      email,
      password,
      role: 'user',
      imageUrl: imageUrl
    };

    if (id) {
      data.id = id
    }

    try{
      const newUser = await prisma.user.create({ data });
      return newUser;
    } catch (err) {
      throw err;
    }

  },
  
  updateOne: async (id: string, data) => {
    try {
      const user = await prisma.user.update({
        where: { id },
        data
      });
      return user;
    } catch (err) {
      throw err;
    }
    
  }
  
  };
  
export { userModel };
  