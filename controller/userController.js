const { userModel } = require("../models/userModel");

const findOrCreateGithubUser = async (id, username, email, imageUrl) => {

  try { 
    const user = await userModel.findById(id);

    if (user) {
      return user;
    } else {
      if (email) {
        user = await userModel.addOne(id, email, "NA", username, imageUrl);
      } else {
        user = await userModel.addOne(id, "NA", "NA", username, imageUrl);
      }
      return user;
    }

  } catch (err) {
    throw err;
  }

}

const getUserByEmailAndPassword = async (email, password) => {
  try {
    let user = await userModel.findByEmail(email);
    if (user && isUserValid(user, password)) {
      return user;
    }
  } catch (err) {
    throw err;
  }
  
  return null;
};

const getUserById = async (id) => {

  try {
    const user = await userModel.findById(id);
    if (user) return user;
  } catch (err) {
    throw err;
  }
  return null;

};

const registerUser = async (email, password, name, imageUrl) => {
  try {
    const newUser = await userModel.addOne(null, email, password, name, imageUrl)
    return newUser
  } catch (err) {
    throw err;
  }
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  findOrCreateGithubUser,
  getUserByEmailAndPassword,
  getUserById,
  registerUser
};
