const express = require("express")
const dotenv = require('dotenv')
const  cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello From codeX",
    
  })
  mode: 'no-cors'
});

app.post("/", async (req, res) => {
  
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
        bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
});

app.listen(4000, () => {
    console.log("App listening on port: ", 4000)
})
