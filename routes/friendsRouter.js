const express = require('express')
const friendsController = require('../controllers/friendsController')
const userController = require('../controllers/userController')


const friendsRouter = express.Router()

friendsRouter.post('/', userController.authenticateToken, friendsController.createNewFriendInstance) // creates new friend instance with pending status, using JWT id and friendId
friendsRouter.get('/pending', userController.authenticateToken, friendsController.retrieveAllPendingFriends) // fetches friends of user with pending status
friendsRouter.delete('/key/:userKeyPair', userController.authenticateToken, friendsController.removeFriend) // Deletes friend instance

// Maybe I should add an accept friend request route


module.exports = friendsRouter;