const { adddata, returndata } = require("../model/digilocker.model.js");

const { getschemebyid } = require("../model/schemes.model");
async function httpadddata(req, res) {
  const body = req.body;
  const response = await adddata(body);
  console.log(response);
}
async function httpreturndata(req, res) {
  const { schemeid } = req.body;
  console.log(schemeid);
  const aadhar = 1234;
  const schemeresponse = await getschemebyid(schemeid);
  const schemedocument = schemeresponse.documents;
  console.log(schemedocument);
  const response = await returndata(aadhar, schemedocument);
  console.log(response);
  return res.status(200).json({
    response,
  });
}

module.exports = {
  httpadddata,
  httpreturndata,
};
