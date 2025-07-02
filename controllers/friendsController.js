const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

function test(req, res) {
    return res.status(200).json({
        message: "Friends route works"
    })
}

module.exports = {
    test
}