const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

function test(req, res) {
    return res.status(200).json({
        message: "Users route works"
    })
}

module.exports = {
    test
}