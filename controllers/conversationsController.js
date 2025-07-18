const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function retrieveConversationUsingKey(req, res) {
    try {
        const { userKeyPair } = req.params;
        if (!userKeyPair) return res.status(400).json({ message: "Missing user pair key" })

        const conversation = await prisma.conversation.findUnique({
            where: {
                userKeyPair
            }
        })

        if (!conversation) return res.status(404).json({ message: "Conversation not found" })

        return res.status(200).json({ conversation })

    } catch (error) {
        console.log("retrieveConversationUsingKey", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

async function retrieveConversationUsingId(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id
            }
        })

        if (!conversation) return res.status(404).json({ message: "Conversation not found" })

        return res.status(200).json({ conversation })

    } catch (error) {
        console.log("retrieveConversationUsingId", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

async function createNewMessage(req, res) {

    try {
        const { userKeyPair, content } = req.body;

        if (!userKeyPair || !content) return res.status(400).json({ message: "Missing fields" })
        const userId = req.user.id
        console.log(userKeyPair, content, userId)

        // Extract the user Ids using the userKeyPair as reference and turn into a number
        const [userA, userB] = userKeyPair.split(',').map((userId) => {
            return Number(userId)
        })

        if (isNaN(userA) || isNaN(userB)) {
            return res.status(400).json({ message: "Invalid user Id" });
        }

        const receiverId = userId === userA ? userB : userA;

        const receiver = await prisma.user.findUnique({
            where: {
                id: receiverId
            },
            select: {
                id: true,
                firstName: true,
            }
        })

        // Check if the conversation already exists
        let conversation = await prisma.conversation.findUnique({
            where: { userKeyPair },
            select: { id: true }
        })

        // If conversation userKeyPair doesn't exist then create a new conversation Id with userA, userB, userKeyPair
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userA,
                    userB,
                    userKeyPair
                },
                select: { id: true }
            })
        }

        // Create new message using the conversation Id, senderId, content
        await prisma.message.create({
            data: {
                conversationId: conversation.id,
                senderId: userId,
                receiverFirstName: receiver.firstName,
                content
            }
        })

        return res.status(201).json({ conversation })

    } catch (error) {
        console.log("createNewMessage", error)
        res.status(503).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    retrieveConversationUsingKey,
    createNewMessage,
    retrieveConversationUsingId
}