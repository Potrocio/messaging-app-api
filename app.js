const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./routes/userRouter')
const usersRouter = require('./routes/usersRouter')
const friendsRouter = require('./routes/friendsRouter')
const conversationsRouter = require('./routes/conversationsRouter')

const app = express()
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/users', usersRouter)
app.use('/api/friends', friendsRouter)
app.use('/api/conversations', conversationsRouter)




const PORT = process.env.PORT || 4044

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})