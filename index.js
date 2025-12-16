import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Nightbot AI is running");
});

app.get("/ai", async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.send("No message");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: msg }),
      }
    );

    const data = await response.json();
    res.send(data[0]?.generated_text || "No reply");
  } catch (err) {
    console.error(err);
    res.send("AI error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
