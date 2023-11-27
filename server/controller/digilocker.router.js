const express = require("express");

const { httpadddata, httpreturndata } = require("./digilocker.controller");

const digirouter = express.Router();

digirouter.post("/digilocker", httpadddata);
digirouter.post("/getdata", httpreturndata);

module.exports = digirouter;
