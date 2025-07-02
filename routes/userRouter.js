const express = require('express')
const userController = require('../controllers/userController')


const userRouter = express.Router()

userRouter.post('/signup', userController.test)
userRouter.post('/login', userController.test)
userRouter.get('/dashboard', userController.test) // fetches conversation previews and friends
userRouter.get('/settings', userController.test)
userRouter.patch('/settings', userController.test)

module.exports = userRouter;