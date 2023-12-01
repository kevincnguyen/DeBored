import { MongoClient, ObjectId } from "mongodb";
import AWS from "aws-sdk";

const client = new MongoClient(process.env.MONGODB_URI);
const s3 = new AWS.S3();
const bucket = "debored-profile-pictures";

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const {
      id,
      name,
      bio,
      password,
      image,
      instagram,
      twitter,
      facebook,
      phone,
      location,
    } = JSON.parse(event.body);

    await client.connect();

    // Checks if there was a file upload
    if (image) {
      // Decode the base64-encoded file data
      const fileData = Buffer.from(image, "base64");

      // Generate the S3 key based on the user ID
      const key = `user-profiles/${id}/profile-pic.jpg`;

      // Upload the new file over the existing one in S3
      const params = {
        Bucket: bucket,
        Key: key,
        Body: fileData,
        ContentType: `image/jpg`,
      };
      await s3.upload(params).promise();
    }

    // Build the update fields object, checking if each field exists
    const updateFields = {
      ...(name && { name: name }),
      ...(bio && { bio: bio }),
      ...(password && { password: password }),
      ...(instagram && { instagram: instagram }),
      ...(twitter && { twitter: twitter }),
      ...(facebook && { facebook: facebook }),
      ...(phone && { phone: phone }),
      ...(location && { location: location }),
    };

    // Updates the Users collection
    const result = await client
      .db("DeBored")
      .collection("Users")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: updateFields,
        }
      );

    if (!result) {
      throw new Error("User not found");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Profile successfully updated!" }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error finding logged in user: ${error}`,
      }),
    };
  }
};
