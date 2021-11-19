const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const reminderModel = {

    findById: async (id) => {
      try {
        const reminder = await prisma.reminder.findUnique({ where: { id } });
        return reminder;
      } catch (err) {
        throw err;
      }
    },

    findByUser: async (userId) => {
      try {
        const reminders = await prisma.reminder.findMany({ where: { userId } })
        return reminders 
      } catch (err) {
        throw err;
      }

    },

    addOne: async (userId, title, description) => {
      
        const data = {
          userId,
          title,
          description,
        };

        try{
          const newReminder = await prisma.reminder.create({ data });
          return newReminder;
        } catch (err) {
          throw err;
        }
 
    },

    updateOne: async (id, data) => {
      try {
        const Reminder = await prisma.reminder.update({
          where: { id },
          data
        });
        return Reminder
      } catch (err) {
        throw err;
      }
      
    },

    deleteOne: async (id) => {
      try {
        const user = await prisma.reminder.delete({ where: { id } });
        return user
      } catch (err) {
        throw err;
      }
      
    }
  
  };
  
module.exports = { reminderModel };
  