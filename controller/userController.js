const { userModel } = require("../models/userModel");

const findOrCreateGithubUser = async (username, email, imageUrl) => {
  try { 
    const user = await getUserById(id);

    if (user) {
      return user;
    } else {
      user = await userModel.addOne(email, "NA", username, imageUrl);
      return user;
    }

  } catch (err) {
    throw err;
  }

}

const getUserByEmailAndPassword = async (email, password) => {
  try {
    let user = await userModel.findOne(email);
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

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  findOrCreateGithubUser,
  getUserByEmailAndPassword,
  getUserById,
};
