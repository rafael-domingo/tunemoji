require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.get('/chatgpt', async (req, res) => {
    console.log('hello')
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \Music for a sushi restaurant:",
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    });
    console.log(completion.data.choices[0].text);
})

module.exports = router;