const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function retrieveUsersUsingQueryParameter(req, res) {
    try {
        const userId = req.user.id
        let { firstName, lastName } = req.query;

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

        const userKeyPairs = users.map((friend) => {
            const userA = userId < friend.id ? userId : friend.id;
            const userB = userId > friend.id ? userId : friend.id;
            return `${userA},${userB}`
        })

        const knownPeople = await prisma.friend.findMany({
            where: {
                userKeyPair: { in: userKeyPairs }
            },
            select: {
                userKeyPair: true
            }
        })

        const knownIds = knownPeople.map((keyPair) => {
            return keyPair.userKeyPair
        })


        const unknownUsers = userKeyPairs.filter((keyPair) => {
            if (!knownIds.includes(keyPair)) {
                return keyPair
            }
        })

        return res.status(200).json({ unknownUsers })

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