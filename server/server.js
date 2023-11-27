const http = require("http");
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
const mongoose = require("mongoose");

const app = require("./app");
const { setupCronJob } = require("./middleware/cronJob");

const server = http.createServer(app);

const mongo_url = process.env.MONGO_URL;
mongoose.connection.once("open", () => {
  console.log("connection made successfully");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startserver() {
  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  setupCronJob();

  server.listen(PORT, () => {
    console.log("server is running on port ", PORT);
  });
}
startserver();
