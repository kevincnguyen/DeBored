import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { id, activity } = JSON.parse(event.body);
    console.log(`id: ${id}, activity : ${activity}`);

    // Connect to MongoDB
    await client.connect();
    const usersCollection = client.db("DeBored").collection("Users");

    // Retrieve the user
    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Invalid user ID received: ${id}`,
        }),
      };
    }

    // Append activities to user
    await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { recentActivities: activity } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Activity added successfully" }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error with getting friends: ${error}`,
      }),
    };
  }
};
