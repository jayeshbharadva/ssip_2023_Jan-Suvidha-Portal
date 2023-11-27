const { MakeDOClist, FindDocument } = require("../model/DocDB.model");

async function varifydocument(req, res) {
  const name = res.user.name;
  const { docname, docnumber } = req.body;
  console.log(docname + " " + docnumber);
  console.log(name);
  const document = await FindDocument(docnumber, docname, name);
  console.log(document);
  if (document) {
    return res.status(200).json({
      success: true,
    });
  }
  return res.status(400).json({
    success: false,
  });
}

async function httpdoclist(req, res) {
  const body = req.body;
  console.log(body);
  const response = await MakeDOClist(body);
  console.log(response);
  return {
    success: true,
  };
}

module.exports = {
  varifydocument,
  httpdoclist,
};
