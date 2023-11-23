import {MongoClient, ObjectId} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event, context) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {id, name, bio, password, profilePicURL, instagram, twitter,
                facebook, phone} = JSON.parse(event.body)
        await client.connect()
        // Updates the Users collection
        const result = await client.db("DeBored").collection('Users').updateOne({
            _id: ObjectId(id)}, { $set: {name: name, bio: bio, password: password,
            profilePicURL: profilePicURL, instagram: instagram, twitter: twitter,
            facebook: facebook, phone: phone}})
        if (!result) {
            throw new Error('User not found')
        }
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Profile successfully updated!'})
        }
    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error finding logged in user: ${error}`})
        }
    }
}
