import express from "express";
import OpenAI from "openai";

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Nightbot AI is running");
});

app.get("/ai", async (req, res) => {
  try {
    const msg = req.query.msg || "Say hello";
    if (msg.length > 200) return res.send("Message too long");

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a YouTube livestream assistant. Keep answers short." },
        { role: "user", content: msg }
      ],
      max_tokens: 60
    });

    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.send("AI error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
