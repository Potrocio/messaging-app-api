const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function createNewFriendInstance(req, res) {
    try {
        const user = req.user;
        const friendId = Number(req.body.friendId);

        if (!friendId) return res.status(400).json({ message: "Missing friendId" })

        const userA = user.id < friendId ? user.id : friendId;
        const userB = user.id > friendId ? user.id : friendId;
        const userKeyPair = `${userA},${userB}`

        const existing = await prisma.friend.findUnique({
            where: {
                userKeyPair
            }
        })

        if (existing) return res.status(409).json({ message: "Already friends with user" })

        await prisma.friend.create({
            data: {
                userA,
                userB,
                userKeyPair,
                status: "pending",
                requestedBy: user.id
            }
        })

        res.status(201).json({ message: "Friend instance created" })

    } catch (error) {
        console.log("createNewFriendInstance", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

async function retrieveAllPendingFriends(req, res) {
    // find all user friend instances that are pending
    // find out which ones you sent vs which ones were requested
    // find the user id and name of all of the friends
    // return a list that has objects which have friendId, firstName, lastName, requestedBy
    try {
        const user = req.user;

        const pendingFriends = await prisma.friend.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { userA: user.id },
                            { userB: user.id }
                        ]
                    },
                    { status: "pending" }
                ]
            },
            select: {
                userA: true,
                userB: true,
                requestedBy: true
            }
        })

        if (pendingFriends.length === 0) return res.status(404).json({ message: "No pending requests" })

        const friendsList = pendingFriends.map((friend) => {
            const friendId = friend.userA == user.id ? friend.userB : friend.userA
            const requestedBy = friend.requestedBy
            return {
                friendId,
                requestedBy
            };
        })

        const friendIds = friendsList.map((friend) => {
            return friend.friendId
        })

        const friendData = await prisma.user.findMany({
            where: {
                id: { in: friendIds }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true
            }
        })

        return res.status(200).json({
            friendsList,
            friendData
        })

    } catch (error) {
        console.log("retrieveAllPendingFriends", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

async function removeFriend(req, res) {
    try {
        const { userKeyPair } = req.params;
        if (!userKeyPair) return res.status(400).json({ message: "Missing userKeyPair param" })

        const friendInstanceExists = await prisma.friend.findUnique({
            where: {
                userKeyPair
            }
        })

        if (!friendInstanceExists) return res.status(404).json({ message: "Friend instance does not exist" })

        await prisma.friend.delete({
            where: {
                userKeyPair
            }
        })

        res.status(200).json({ message: "Friend removed successfully" })

    } catch (error) {
        console.log("removeFriend", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    createNewFriendInstance,
    retrieveAllPendingFriends,
    removeFriend
}