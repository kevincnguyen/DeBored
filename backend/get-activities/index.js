import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getActivity(answers) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are hired to give activity suggestions to people who are bored. You will be given their responses for their requirements of activities you will generate. you will return a JSON object of the format {activity_suggestions: [LIST OF SUGGESTED ACTIVITIES HERE]}",
      },
      { role: "user", content: JSON.stringify(answers) },
    ],
    model: "gpt-4-1106-preview",
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0]);
  return JSON.parse(completion.choices[0].message.content)[
    "activity_suggestions"
  ];
}

export const handler = async (event) => {
  try {
    console.log(`Received event: ${JSON.stringify(event)}`);
    const { answers } = JSON.parse(event.body);

    if (!answers) {
      throw new Error("No activities available");
    }
    const activity = await getActivity(answers);
    return {
      statusCode: 200,
      body: JSON.stringify({ activity: activity }),
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Error finding activities: ${error}` }),
    };
  }
};

// handler(JSON.stringify({answers: ["Outdoor", "Solo", "$"]})).then(console.log).catch(console.log)
