import {MongoClient} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event, context) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {username, password} = JSON.parse(event.body)
        console.log(`username: ${username}, password: ${password}`)
        await client.connect()
        await client.db("DeBored").collection('Users').insertOne({username, password, friends: []})
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'User created'})
        }
    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error creating user: ${error}`})
        }
    }
}