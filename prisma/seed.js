const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const database = require("../database")

async function main() {
  // populate the database with demo data
  // npx prisma db seed

  for (user of database) {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      imageUrl: user.imageUrl
    }

    const create = []
    if (user.reminder?.length !== 0) {
      for (reminder of user.reminders) {
        const reminderData = {
          title: reminder.title,
          description: reminder.description,
          completed: reminder.completed
        }
        create.push(reminderData)
      }
      data.reminders = { create }
    }

    const returnedUser = await prisma.user.upsert({
      where: {email: user.email},
      update: {},
      create: data
    })

    console.log(`${returnedUser.name} has been added to the database.`)
  }
  
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })