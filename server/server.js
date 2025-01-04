const express = require ("express");
const app = express();
const cors = require ("cors");
const corsOptions = {
  origin: "http://localhost:5173"
}

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({"fruits": ["apple", "banana", "orange"]});
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening from port: ${port}`);
})