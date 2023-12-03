import { MongoClient, ObjectId } from "mongodb";
import AWS from "aws-sdk";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
	try{
		console.log(`Received event: ${JSON.stringify(event)}`)
		const {id} = JSON.parse(event.body)
		await client.connect()
		// Finds the current user
		const result = await client.db("DeBored").collection('Users').findOne({ "_id": ObjectId(id) })
		if (!result) {
			throw new Error('Current user not found')
		}

		// Gets all users besides the current user
		const allUsers = await client.db("Debored").collection('Users').find(
			{ "_id": { "$ne": ObjectId(id)}}).toArray()
		if (!allUsers) {
			throw new Error('No other users exist')
		}
		return {
			statusCode: 200,
			body: JSON.stringify({message: 'Potential friends found!'})
		}
	} catch(error) {
		console.log(`Error: ${error}`)
		return {
			statusCode: 400,
			body: JSON.stringify({message: `Error finding possible friends: ${error}`})
		}
	}
};
