const express = require("express");
const cors = require("cors");
const app = express();
const docrouter = require("./controller/document.router");
const govrouter = require("./controller/gov.router");
const router = require("./controller/userdoc.router");
const digirouter = require("./controller/digilocker.router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/document", docrouter);
app.use("/gov", govrouter);
app.use("/varify", router);
app.use("/digi", digirouter);

module.exports = app;
