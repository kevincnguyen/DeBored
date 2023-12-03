import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    await client.connect();

    // Gets all users besides the current user
    const allUsers = await client
      .db("DeBored")
      .collection("Users")
      .find({}, { projection: { password: 0, friends: 0 } })
      .toArray();

    if (!allUsers) {
      throw new Error("No other users exist");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Potential friends found!",
        allUsers: allUsers,
      }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error finding possible friends: ${error}`,
      }),
    };
  }
};
