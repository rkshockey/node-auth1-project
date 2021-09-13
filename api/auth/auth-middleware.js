const { findBy } = require('../users/users-model')
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  console.log('restricted wired')
  next()
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree(req, res, next) {
  console.log('checkUserFree wired')
  console.log(findBy())
  next()
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists(req, res, next) {
  console.log('checkUsernameExists wired')
  console.log(findBy())
  next()
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  console.log('checkPasswordLength wired')
  next()
}

module.exports = {
  restricted, 
  checkUsernameFree, 
  checkUsernameExists, 
  checkPasswordLength
}
