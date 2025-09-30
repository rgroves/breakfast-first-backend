import express from 'express';
import { HashbrownOpenAI } from '@hashbrownai/openai';

const app = express()
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  console.log('Received request to /');
  res.send(`OK: We're here for breakfast!`)
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})

app.get('/chat', async (req, res) => {
  console.log('Received GET request to /chat');
  res.send('Hello World from GET /chat!')
});

app.post('/chat', async (req, res) => {
  console.log('Received POST request to /chat');
  const stream = HashbrownOpenAI.stream.text({
    apiKey: process.env.OPENAI_API_KEY,
    request: req.body, // must be Chat.Api.CompletionCreateParams
  });

  res.header('Content-Type', 'application/octet-stream');

  for await (const chunk of stream) {
    res.write(chunk); // Pipe each encoded frame as it arrives
  }

  res.end();
});
