const express = require('express')
const conversationsController = require('../controllers/conversationsController')
const userController = require('../controllers/userController')

const conversationsRouter = express.Router()

conversationsRouter.get('/key/:userKeyPair', userController.authenticateToken, conversationsController.retrieveConversationUsingKey) // request conversation using user key pair, used when clicking on a friend or sending new message
conversationsRouter.post('/key/:userKeyPair', userController.authenticateToken, conversationsController.createNewMessage) // create new message, and use existing conversation or create new conversation if it doesn't exist
conversationsRouter.get('/:id', userController.authenticateToken, conversationsController.retrieveConversationUsingId) // load conversation using conversation id, when clicking on conversation preview

module.exports = conversationsRouter;