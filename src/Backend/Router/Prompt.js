const express = require("express");
const router = express.Router();
const { openaiApiKey } = require("../config");
const OpenAI = require('openai');


const openai = new OpenAI({ apiKey: openaiApiKey });

router.post('/message', async (req, res) => {
    try {
      const { message, prompt } = req.body;
  
      if (!message || !prompt) {
        return res.status(400).json({ error: 'Both message and prompt are required' });
      }
  
      // Call OpenAI API to generate response
      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-0125', // or any other model supported by OpenAI
        prompt: `${prompt}\nUser: ${message}\nBot:`,
        maxTokens: 150, // adjust based on the desired response length
        temperature: 0.7, // adjust for response creativity
      });
  
      // Extract the generated response from OpenAI's API response
      const botResponse = response.data.choices[0].text.trim();
  
      // Send the bot response back to the client
      res.json({ message: botResponse });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  module.exports = router;

