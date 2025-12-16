app.get("/ai", async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) return res.send("No message");

    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: msg,
          options: { wait_for_model: true } // 👈 IMPORTANT
        }),
      }
    );

    const data = await hfResponse.json();
    console.log("HF RESPONSE:", data);

    // Handle different HF response shapes
    if (Array.isArray(data) && data[0]?.generated_text) {
      return res.send(data[0].generated_text);
    }

    if (data.generated_text) {
      return res.send(data.generated_text);
    }

    if (data.error) {
      return res.send("Model loading, try again");
    }

    res.send("No reply");
  } catch (err) {
    console.error("HF ERROR:", err);
    res.send("AI error");
  }
});
