const express = require('express')
const usersController = require('../controllers/usersController')


const usersRouter = express.Router()

usersRouter.get('/', usersController.test) // fetches users with params ?firstName&lastName


module.exports = usersRouter;