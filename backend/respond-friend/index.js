import {MongoClient} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event, context) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {senderId, recipientId, isAccepted } = JSON.parse(event.body)
        console.log(`senderId: ${senderId}, recipientId: ${recipientId}`)

        // Connect to MongoDB
        await client.connect()

        if (isAccepted) {
            // Put the friend relationship into MongoDB
            await client.db("DeBored").collection('Friend').insertOne({senderId, recipientId})
            await client.db("DeBored").collection('Friend').insertOne({recipientId, senderId})
        }
        
        // Delete request from the table
        await client.db("DeBored").collection('FriendRequest').deleteOne({senderId, recipientId})
        
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Friend request response success'})
        }

    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error accepting friend request: ${error}`})
        }
    }
}