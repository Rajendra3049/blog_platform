const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRoutes } = require("./Routes/user.routes");
const { blogRoutes } = require("./Routes/blog.routes");

const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/user", userRoutes);
app.use("/", blogRoutes);

app.listen(8080, async () => {
  await connection;
  console.log("working fine on port 8080");
});
