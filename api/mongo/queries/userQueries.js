const User = require('../models/users');

async function addUser(username, password) {
  try {
    const user = new User({username, password});
    await user.save();
    return true;
  } catch (error) {
    return false;
  }
}

async function compare(username, password){
  try {
    const user = await User.findOne({username, password});
    if(user) return true;
    return false;
  } catch (error) {
    return false;
  }
}


module.exports = { addUser, compare };
