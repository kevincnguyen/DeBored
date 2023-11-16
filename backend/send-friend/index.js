import {MongoClient} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event, context) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        // Get information from request
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {senderId, recipientId} = JSON.parse(event.body)
        console.log(`senderId: ${senderId}, recipientId: ${recipientId}`)

        // Connect to MongoDB
        await client.connect()

        // Put the friend request into MongoDB
        await client.db("DeBored").collection('FriendRequests').insertOne({senderId, recipientId});
        
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Friend request send'})
        }
    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error accepting friend request: ${error}`})
        }
    }
}