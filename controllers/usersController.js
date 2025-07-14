const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function retrieveUsersUsingQueryParameter(req, res) {
    try {
        let { firstName, lastName } = req.query;
        console.log(firstName, lastName)

        if (!firstName || !lastName) return res.status(400).json({ message: "Missing fields" })

        firstName = firstName.trim()
        lastName = lastName.trim()

        const users = await prisma.user.findMany({
            where: {
                firstName: {
                    equals: firstName,
                    mode: 'insensitive'
                },
                lastName: {
                    equals: lastName,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
            }
        })

        if (users.length === 0) return res.status(404).json({ message: "No users found" })

        return res.status(200).json({ users })

    } catch (error) {
        console.log("retrieveUsersUsingQueryParameter", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    retrieveUsersUsingQueryParameter
}