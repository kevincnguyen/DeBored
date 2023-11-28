import { MongoClient } from "mongodb";
import AWS from "aws-sdk";

const client = new MongoClient(process.env.MONGODB_URI);
const s3 = new AWS.S3();
const bucket = "debored-profile-pictures";

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { email, password, name } = JSON.parse(event.body);
    console.log(`email: ${email}, password: ${password}, name: ${name}`);
    await client.connect();

    // Insert the user document in order to retrieve the generated MongoDB ID
    const user = {
      email,
      password,
      name,
      bio: "",
      profilePicURL: "", // placeholder
      instagram: "",
      twitter: "",
      facebook: "",
      phone: "",
      recentActivities: [],
    };
    const result = await client
      .db("DeBored")
      .collection("Users")
      .insertOne(user);

    // Convert MongoDB ID to String
    const userId = result.insertedId.toString();

    // Copy in S3
    const sourceKey = "default.jpg";
    const destinationKey = `user-profiles/${userId}/profile-pic.jpg`;
    const copyParams = {
      Bucket: bucket,
      CopySource: `/${bucket}/${sourceKey}`,
      Key: destinationKey,
    };
    await s3.copyObject(copyParams).promise();

    // Update the user document in MongoDB with new S3 URL
    await client
      .db("DeBored")
      .collection("Users")
      .updateOne(
        { _id: result.insertedId },
        {
          $set: {
            profilePicURL: `https://${bucket}.s3.amazonaws.com/${destinationKey}`,
          },
        }
      );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User created",
        user: {
          ...user,
          profilePicURL: `https://${bucket}.s3.amazonaws.com/${destinationKey}`,
        },
      }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error creating user: ${error}`,
      }),
    };
  }
};
