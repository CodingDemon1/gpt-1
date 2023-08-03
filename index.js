const express = require("express");
// const openai = require("openai");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

// Routes (Endpoints)
app.get("/", (req, res) => {
	res.send("Base Endpoint");
});

//OpenAI Config
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/query", async (req, res) => {
	try {
		const { prompt } = req.body;
		// const query = `${prompt} Explain it in details.`;

		// console.log(query);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 300,
			temperature: 0.7, // Adjust the value to control the randomness of the generated text
			//   stop: "\n",
		});

		let data = response.data.choices[0].text;
		console.log(data);

		res.status(200).send(data);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error.message });
	}
});

app.listen(port, () => {
	console.log(`Listening @ ${port}`);
});
