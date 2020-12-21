var jwt = require('jsonwebtoken');
 
function generateToken(user) {

  if (!user) return null;
 
  var u = {
    username: user.username,
  };
 
  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 2 // expiration after 2 hours
  });
}

function getCleanUser(user) {
  if (!user) return null;
 
  return {
    username: user.username,
  };
}
 
module.exports = {
  generateToken,
  getCleanUser
}