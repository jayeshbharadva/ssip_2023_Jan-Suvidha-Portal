const express = require("express");
const auth = require("../middleware/userauth");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  sendotp,
  varifyuser,
  varifyotp,
  documentupload,
  adduser,
  document,
  find,
  showappliedschmes,
  showlistofuser,
} = require("./document.controller");

const docrouter = express.Router();

docrouter.post("/sendotp", sendotp);
docrouter.post("/validation", varifyuser);
docrouter.post("/docupload", auth, upload.array("files"), documentupload);
docrouter.post("/adduser", adduser);
docrouter.post("/adddoc", document);
docrouter.post("/finduser", find);
docrouter.post("/varifyotp", varifyotp);
docrouter.get("/getscheme", auth, showappliedschmes);
docrouter.post("/userlist", showlistofuser);


module.exports = docrouter;
