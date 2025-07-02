const express = require('express')
const conversationsController = require('../controllers/conversationsController')

const conversationsRouter = express.Router()

conversationsRouter.get('/key/:userPairKey', conversationsController.test) // request conversation using user pair key
conversationsRouter.post('/key/:userPairKey', conversationsController.test) // create new message
conversationsRouter.get('/:id', conversationsController.test) // load conversation using conversation id

module.exports = conversationsRouter;