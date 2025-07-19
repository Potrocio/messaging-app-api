const express = require('express')
const userController = require('../controllers/userController')


const userRouter = express.Router()

userRouter.post('/signup', userController.createUser) // creates new user instance
userRouter.post('/login', userController.AuthenticateUser) // authenticates user credentials
userRouter.get('/dashboard', userController.authenticateToken, userController.queryHomepageData) // fetches conversation previews and friends
userRouter.get('/settings', userController.authenticateToken, userController.queryUserSettings) // fetches current user settings
userRouter.patch('/settings', userController.authenticateToken, userController.updateUserSettings) // updates user settings
userRouter.get('/:id', userController.authenticateToken, userController.retrieveUser) // Retrieves single user "friend"

module.exports = userRouter;