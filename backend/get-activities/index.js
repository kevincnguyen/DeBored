import {MongoClient} from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

export const handler = async (event) => {
    // This line allows us to return from the function before the connection to MongoDB Atlas is closed
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        console.log(`Received event: ${JSON.stringify(event)}`)
        const {answers} = JSON.parse(event.body)
        await client.connect()
        const result = await client.db("DeBored").collection('Activities').findOne({answers : {$all: answers}})
        // need a collection of activities then, and also .findOne({answers: answers})?
        if (!result) {
            throw new Error('No activities available')
        }
        return {
            statusCode: 200,
            body: JSON.stringify({activity: result})
        }
    } catch(error) {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify({message: `Error finding activities: ${error}`})
        }
    }
}

// handler(JSON.stringify({answers: ["Outdoor", "Solo", "$"]})).then(console.log).catch(console.log)