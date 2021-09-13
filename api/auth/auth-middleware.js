const { findBy } = require('../users/users-model')
const passwordSchema = require('../../schema/passwordSchema')

function restricted(req, res, next) {
  if (req.session.user){
    next()
  }else{
    next({ status: 401, message: "You shall not pass!" })
  }
}

async function checkUsernameFree(req, res, next) {
  const [user] = await findBy({ username: req.body.username });
  if (user){
    next({ status: 422, message: "Username taken" })
  }else{
    next()
  }
}

async function checkUsernameExists(req, res, next) {
  const [user] = await findBy({ username: req.body.username });
  if (user){
    next()
  }else{
    next({ status: 401, message: "Invalid credentials" })
  }
}

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
