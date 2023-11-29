import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { id } = JSON.parse(event.body);
    console.log(`id: ${id}`);

    // Connect to MongoDB
    await client.connect();
    const usersCollection = client.db("DeBored").collection("Users");
    const friendsCollection = client.db("DeBored").collection("Friends");

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

    // Retrieve friend requests based on the user's array of request IDs
    const friendRequests = await friendsCollection
      .find({
        _id: { $in: user.friends },
      })
      .toArray();

    // Transform friend requests data to only containg information about the other user
    const transformedFriendRequests = friendRequests.map((request) => {
      const friendId =
        id === request.requesterId ? request.recipientId : request.requesterId;
      return { friendId: friendId.toString(), status: request.status };
    });

    // Retrieve user information for each friend
    const friendDetailsPromises = transformedFriendRequests.map(
      async (friendRequest) => {
        const friendDetails = await usersCollection.findOne(
          {
            _id: new ObjectId(friendRequest.friendId),
          },
          {
            projection: {
              _id: 1,
              email: 1,
              name: 1,
              bio: 1,
              profilePicURL: 1,
              instagram: 1,
              twitter: 1,
              facebook: 1,
              phone: 1,
              recentActivities: 1,
            },
          }
        );
        return {
          friend: friendDetails,
          status: friendRequest.status,
        };
      }
    );
    const friendDetails = await Promise.all(friendDetailsPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successful found friends and friend requests`,
        friendDetails,
      }),
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
