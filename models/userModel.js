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
    addOne: (email, password, name, imageUrl) => {
        const newUser = {
            id: database.length + 1,
            name,
            email,
            password,
            reminders: [],
            role: 'user',
            imageUrl
        };
        database.push(newUser);
        return newUser
    },
    addOneWithIdAndUsername: (id, username, imageUrl) => {
        const newUser = {
            id,
            name: username,
            reminders: [],
            role: 'user',
            imageUrl
        };
        database.push(newUser);
        return newUser
    }
  };
  
module.exports = { userModel };
  