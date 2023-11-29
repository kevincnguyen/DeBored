import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { requesterId, recipientId, response } = JSON.parse(event.body);
    console.log(
      `requesterId: ${requesterId}, recipientId: ${recipientId}, response: ${response}`
    );

    // Connect to MongoDB
    await client.connect();
    const usersCollection = client.db("DeBored").collection("Users");
    const friendsCollection = client.db("DeBored").collection("Friends");

    // Check if requesterId and recipientId are valid
    const requesterExists = await usersCollection.findOne({
      _id: new ObjectId(requesterId),
    });
    const recipientExists = await usersCollection.findOne({
      _id: new ObjectId(recipientId),
    });

    if (!requesterExists) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Invalid requesterId received: ${requesterId}`,
        }),
      };
    }
    if (!recipientExists) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Invalid recipientId received: ${recipientId}`,
        }),
      };
    }

    if (response === "SEND") {
      // Create friend requests
      const requesterFriendRequest = await friendsCollection.insertOne({
        requesterId: requesterId,
        recipientId: recipientId,
        status: "REQUESTED",
      });
      const recipientFriendRequest = await friendsCollection.insertOne({
        requesterId: requesterId,
        recipientId: recipientId,
        status: "PENDING",
      });

      // Update users with friend requests
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(requesterId) },
        { $push: { friends: requesterFriendRequest.insertedId } }
      );
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(recipientId) },
        { $push: { friends: recipientFriendRequest.insertedId } }
      );
    } else if (response === "ACCEPT") {
      // Update friend requests to accepted
      await friendsCollection.updateMany(
        {
          requesterId: requesterId,
          recipientId: recipientId,
        },
        { $set: { status: "ACCEPTED" } }
      );
    } else if (response === "REJECT") {
      // Delete friend requests
      const requesterFriendRequest = await friendsCollection.findOneAndDelete({
        requesterId: requesterId,
        recipientId: recipientId,
      });
      const recipientFriendRequest = await friendsCollection.findOneAndDelete({
        requesterId: requesterId,
        recipientId: recipientId,
      });

      // Delete friend requests  from users
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(requesterId) },
        { $pull: { friends: requesterFriendRequest._id } }
      );
      await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(recipientId) },
        { $pull: { friends: recipientFriendRequest._id } }
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successful ${response} friend request`,
      }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error with friend request: ${error}`,
      }),
    };
  }
};
