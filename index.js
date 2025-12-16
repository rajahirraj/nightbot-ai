import express from "express";
import OpenAI from "openai";

const app = express(); // ✅ THIS WAS MISSING
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Nightbot AI is running");
});

app.get("/ai", async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.send("No message provided");

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: msg }],
      max_tokens: 60,
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    res.send("AI error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
