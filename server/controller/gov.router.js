const express = require("express");

const {
  httpaddscheme,
  httpgetallscheme,
  httpgetschemebyid,
  httpschemedocbyid,
  httpsetstatus,
} = require("./gov.controller");
const govrouter = express.Router();

govrouter.post("/addscheme", httpaddscheme);
govrouter.get("/getallscheme", httpgetallscheme);
govrouter.post("/getschemebyid", httpgetschemebyid);
govrouter.post("/getschemedocdetail", httpschemedocbyid);
govrouter.post("/setstatus", httpsetstatus);

module.exports = govrouter;
