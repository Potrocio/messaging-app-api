const express = require('express')
const usersController = require('../controllers/usersController')
const userController = require("../controllers/userController")


const usersRouter = express.Router()

usersRouter.get('/', userController.authenticateToken, usersController.retrieveUsersUsingQueryParameter) // fetches users with query parameters ?firstName&lastName


module.exports = usersRouter;