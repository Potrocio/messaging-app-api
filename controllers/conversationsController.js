const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function test(req, res) {
    res.status(200).json({
        message: "Conversations controller works"
    })
}

module.exports = {
    test
}