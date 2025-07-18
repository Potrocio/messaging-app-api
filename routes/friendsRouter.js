const express = require('express')
const friendsController = require('../controllers/friendsController')
const userController = require('../controllers/userController')


const friendsRouter = express.Router()

friendsRouter.post('/', userController.authenticateToken, friendsController.createNewFriendInstance) // creates new friend instance with pending status, using JWT id and friendId
friendsRouter.get('/', userController.authenticateToken, friendsController.retrieveAllFriends) // fetches friends
friendsRouter.patch('/', userController.authenticateToken, friendsController.acceptFriendRequest) // Accepts friend request
friendsRouter.get('/pending', userController.authenticateToken, friendsController.retrieveAllPendingFriends) // fetches friends of user with pending status
friendsRouter.delete('/key/:userKeyPair', userController.authenticateToken, friendsController.removeFriend) // Deletes friend instance

module.exports = friendsRouter;