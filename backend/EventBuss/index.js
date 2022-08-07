const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:4001"],
  })
);

const services = {
  posts: "http://localhost:4000/events",
  comments: "http://localhost:4001/events",
};
app.post("/events", async (req, res) => {
  const { event } = req.body;
  try {
    await axios.post(services.posts, event);
    await axios.post(services.comments, event);
  } catch (error) {
    console.log("error", error);
  }
  res.send({ ok: "event emmited from eventbuss" });
});

app.listen(4002, () => console.log("Event Buss listening at 4002"));
