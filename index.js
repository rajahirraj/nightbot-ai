import express from "express";

const app = express();   // ✅ THIS LINE WAS MISSING

app.get("/", (req, res) => {
  res.send("Nightbot AI is running");
});

app.get("/ai", (req, res) => {
  res.send("AI endpoint working");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
