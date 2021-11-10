const userModel = require("../models/userModel").userModel;

const findOrCreateGithubUser = (id, username, imageUrl) => {
  const user = getUserById(id);
  if (user) {
    return user;
  } else {
    return userModel.addOneWithIdAndUsername(id, username, imageUrl);
  }
}

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  const user = userModel.findById(id);
  return user;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  findOrCreateGithubUser,
  getUserByEmailIdAndPassword,
  getUserById,
};
