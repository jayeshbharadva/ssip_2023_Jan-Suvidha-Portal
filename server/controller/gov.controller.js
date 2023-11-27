const {
  addscheme,
  getallscheme,
  getschemebyid,
} = require("../model/schemes.model");
const { setstatus } = require("../model/gov.model");

async function httpaddscheme(req, res) {
  const { schemeid, schemename, LastDate, documents, userdetail } = req.body;
  const lastDateObject = new Date(LastDate);

  const newScheme = {
    schemeid,
    schemename,
    LastDate: lastDateObject,
    documents,
    userdetail,
  };
  const response = await addscheme(newScheme);
  if (!response.ok) {
    let message = "";
    if (response.error == 11000) {
      message = "Please try different SchemeId";
    } else {
      message = "Some error while uploading data. Please Try again";
    }
    return res.status(400).json({
      message: message,
      success: false,
    });
  }
  return res.status(201).json({
    success: true,
    message: "Scheme added successfully",
  });
}

async function httpgetallscheme(req, res) {
  const response = await getallscheme();
  return res.status(200).json({
    data: response,
  });
}

async function httpgetschemebyid(req, res) {
  const { schemeid } = req.body;
  console.log(schemeid);
  const resposne = await getschemebyid(schemeid);
  console.log(resposne);
}

async function httpschemedocbyid(req, res) {
  const { schemeid } = req.body;
  const response = await getschemebyid(schemeid);
  console.log(response);
  return res.status(200).json({
    documents: response.documents,
    details: response.userdetail,
    success: true,
  });
}

async function httpsetstatus(req, res) {
  const { aadhar, schemeid, approvalStatus, remarks } = req.body;
  console.log(aadhar + " " + schemeid + " " + approvalStatus);
  const response = await setstatus(aadhar, schemeid, approvalStatus, remarks);
  console.log(response);
  return res.status(200).json({
    status: response.status,
  });
}

module.exports = {
  httpaddscheme,
  httpgetallscheme,
  httpgetschemebyid,
  httpschemedocbyid,
  httpsetstatus,
};
