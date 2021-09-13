const { findBy } = require('../users/users-model')
const passwordSchema = require('../../schema/passwordSchema')
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  if (req.session.user){
    next()
  }else{
    next({ status: 401, message: "You shall not pass!" })
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  const [user] = await findBy({ username: req.body.username });
  if (user){
    next({ status: 422, message: "Username taken" })
  }else{
    next()
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  const [user] = await findBy({ username: req.body.username });
  if (user){
    next()
  }else{
    next({ status: 401, message: "Invalid credentials" })
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
async function checkPasswordLength(req, res, next) {
  try {
    await passwordSchema.validate(req.body)
    next()
  } catch (err) {
    next({ status: 422, message: err.errors[0] })
  }
}

module.exports = {
  restricted, 
  checkUsernameFree, 
  checkUsernameExists, 
  checkPasswordLength
}
