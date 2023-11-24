import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const handler = async (event, context) => {
  // This line allows us to return from the function before the connection to MongoDB Atlas is closed
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { email, password, name } = JSON.parse(event.body);
    console.log(`email: ${email}, password: ${password}, name: ${name}`);
    await client.connect();
    const user = {
      email,
      password,
      name,
      bio: "",
      profilePicURL: "",
      instagram: "",
      twitter: "",
      facebook: "",
      phone: "",
    };
    await client.db("DeBored").collection("Users").insertOne(user);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created", user: user }),
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
