const router = require('express').Router();
const bcrypt = require('bcryptjs')
const { checkUsernameFree, 
  checkUsernameExists, 
  checkPasswordLength 
} = require('./auth-middleware');
const { add, findBy } = require('../users/users-model')

router.post(
  '/register', 
  checkPasswordLength,
  checkUsernameFree,  
  async (req, res, next) => {
    try {
      const { username, password } = req.body
      const hash = bcrypt.hashSync(password)
      const newUser = await add({ username, password: hash })
      res.status(200).json(newUser)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/login', checkUsernameExists, async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const [user] = await findBy({username})
    if (bcrypt.compareSync(password, user.password)){
      req.session.user = user
      res.status(200).json({ message: `Welcome ${username}!`})
    }else{
      next({ status: 401, message: "Invalid credentials" })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  if (req.session.user){
    req.session.destroy(err => {
      if (err){
        next(err)
      }else{
        res.status(200).json({ message: "logged out" })
      }
    })
  }else{
    res.status(200).json({ message: "no session" })
  }
})
 
module.exports = router;
