import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import OpenAI from "openai";
import { analyzeEmotionsUsingLexicon } from "./services/emotions";

const server = createServer();

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("prompt", async (prompt) => {
    try {
      if (!prompt) return;
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        stream: true,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      });

      let content = '';

      for await (const chunk of stream) {
        if (chunk.choices[0]?.finish_reason) {
          const emotions = analyzeEmotionsUsingLexicon(content)
          socket.emit('response-completed', { emotions });
        } else {
          content += chunk.choices[0]?.delta?.content;
          socket.emit("prompt-response", chunk.choices[0]?.delta?.content);
        }
      }

    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () =>
    console.log(`Client disconnected: ${socket.id}`)
  );
});

const start = () => {
  server.listen(PORT, () => {
    console.log("Listening on port number 3000");
  });
};

start();
