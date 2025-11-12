import express from "express";

import morgan from "morgan";

const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!", "names": "Andy & Shreya" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/api/time", (req, res) => {
  res.json({"timezone": "UTC", "currentTime": new Date().toLocaleTimeString()});
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});