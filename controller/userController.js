const userModel = require("../models/userModel").userModel;

const findOrCreateHithubUser = (id, username) => {
  const user = getUserById(id);
  if (user) {
    return user;
  } else {
    return userModel.addOneWithIdAndUsername(id, username);
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
  let user
  try {
    user = userModel.findById(id);
  } catch (e) {
    console.log(e)
    return null
  }
  return user;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  findOrCreateHithubUser,
  getUserByEmailIdAndPassword,
  getUserById,
};
