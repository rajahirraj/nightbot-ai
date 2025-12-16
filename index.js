app.get("/ai", async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.send("No message provided");

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: msg }],
      max_tokens: 60
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error("OPENAI ERROR:", error.message);
    res.send("AI error");
  }
});
