import {MongoClient} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event, context) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {name, bio, password, passConfirm, profilePicURL, instagram, twitter,
                facebook, phone} = JSON.parse(event.body)
        console.log(`email: ${email}, password: ${password}`)
        // await client.connect()
        // const result = await client.db("DeBored").collection('Users').findOne({email: email})
        
        if (!result) {
            throw new Error('User is not logged in')
            // Not sure if this is correct error
        }
        return {
            // statusCode: 200,
            // body: JSON.stringify({activity: result})
        }
    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error finding logged in user: ${error}`})
        }
    }
}
