const express = require('express')
const friendsController = require('../controllers/friendsController')


const friendsRouter = express.Router()

friendsRouter.post('/', friendsController.test) // creates new friend instance with pending status
friendsRouter.get('/pending', friendsController.test) // fetches friends of user with pending status
friendsRouter.delete('/key/:friendKeyPair', friendsController.test) // used when sending friend request to person


module.exports = friendsRouter;