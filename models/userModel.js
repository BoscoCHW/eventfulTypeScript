const database = require("../database");
const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
    addOne: (email, password) => {
        const newUser = {
            id: database.length + 1,
            reminders: [],
            email,
            password
        };
        database.push(newUser);
        return newUser
    },
    addOneWithIdAndUsername: (id, username) => {
        const newUser = {
            id,
            username,
            reminders: []
        };
        database.push(newUser);
        return newUser
    }
  };
  
module.exports = { userModel };
  