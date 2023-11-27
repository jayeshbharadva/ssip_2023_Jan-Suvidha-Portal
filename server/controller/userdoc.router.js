const express = require("express");

const router = express.Router();
const auth = require("../middleware/userauth");
const { varifydocument, httpdoclist } = require("./userdoc.controller");

router.post("/varidydoc", auth, varifydocument);
router.post("/doclist", httpdoclist);

module.exports = router;
